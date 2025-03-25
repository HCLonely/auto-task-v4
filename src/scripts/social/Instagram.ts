/*
 * @Author       : HCLonely
 * @Date         : 2021-09-29 12:54:16
 * @LastEditTime : 2022-02-06 11:48:26
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/social/Instagram.ts
 * @Description  : Instagram 关注&取关用户
 */

import Social from './Social';
import echoLog from '../echoLog';
import throwError from '../tools/throwError';
import httpRequest from '../tools/httpRequest';
import { unique, delay } from '../tools/tools';
import __ from '../tools/i18n';
import { globalOptions } from '../globalOptions';

/**
 * Instagram类用于处理Instagram用户的关注和取关操作。
 *
 * @class Instagram
 * @extends Social
 *
 * @property {instagramTasks} tasks - 当前的Instagram任务。
 * @property {instagramTasks} whiteList - 白名单中的Instagram用户。
 * @private
 * @property {cache} #cache - 存储Instagram用户缓存的对象。
 * @private
 * @property {auth} #auth - 存储Instagram授权信息的对象。
 * @private
 * @property {boolean} #initialized - 模块是否已初始化的标志。
 *
 * @method init - 初始化Instagram模块，验证用户信息并获取授权。
 * @returns {Promise<boolean>} - 返回一个Promise，表示初始化的结果。
 *
 * @method #getUserInfo - 获取用户信息，验证Instagram的授权。
 * @param {string} [name='instagram'] - Instagram用户名，默认为'instagram'。
 * @returns {Promise<string | boolean>} - 返回一个Promise，表示获取用户信息的结果。
 *
 * @method #followUser - 关注指定的Instagram用户。
 * @param {string} name - Instagram用户名。
 * @returns {Promise<boolean>} - 返回一个Promise，表示关注操作的结果。
 *
 * @method #unfollowUser - 取关指定的Instagram用户。
 * @param {string} name - Instagram用户名。
 * @returns {Promise<boolean>} - 返回一个Promise，表示取关操作的结果。
 *
 * @method toggle - 切换Instagram用户的关注状态。
 * @param {Object} options - 选项对象。
 * @param {boolean} [options.doTask=true] - 指示是否执行任务，true表示执行，false表示取消。
 * @param {Array<string>} [options.userLinks=[]] - Instagram用户链接数组。
 * @returns {Promise<boolean>} - 返回一个Promise，表示操作的结果。
 *
 * @method #setCache - 设置缓存，将指定的名称与ID进行关联。
 * @param {string} name - 要缓存的名称。
 * @param {string} id - 要缓存的ID。
 * @returns {void} - 无返回值。
 */
class Instagram extends Social {
  tasks: instagramTasks;
  whiteList: instagramTasks;
  #cache: cache = GM_getValue<cache>('instagramCache') || {};
  #auth: auth = {};
  #initialized = false;

  /**
   * 创建一个Instagram实例。
   *
   * @constructor
   * @description
   * 此构造函数初始化Instagram类的实例，设置默认任务模板和白名单。
   * 默认任务模板包含一个空的用户数组，用于存储Instagram相关的任务信息。
   * 白名单将从GM_getValue中获取，如果没有找到，则使用默认任务模板。
   */
  constructor() {
    super();
    const defaultTasksTemplate: instagramTasks = {
      users: []
    };
    this.tasks = defaultTasksTemplate;
    this.whiteList = { ...defaultTasksTemplate, ...(GM_getValue<whiteList>('whiteList')?.instagram || {}) };
  }

  /**
   * 初始化Instagram模块，验证用户信息并获取授权。
   *
   * @async
   * @function init
   * @returns {Promise<boolean>} - 返回一个Promise，表示初始化的结果。
   *                              - true: 初始化成功
   *                              - false: 初始化失败，toggle方法不可用
   *
   * @description
   * 该方法首先检查模块是否已初始化。如果已初始化，则直接返回true。
   * 然后调用`#getUserInfo`方法验证用户信息。如果验证成功，记录成功日志并将初始化状态设置为true。
   * 如果验证失败，记录错误日志并返回false。
   * 如果在执行过程中发生错误，将抛出错误并返回false。
   */
  async init(): Promise<boolean> {
    try {
      if (this.#initialized) {
        return true;
      }
      const isVerified = await this.#getUserInfo();
      if (isVerified) {
        echoLog({}).success(__('initSuccess', 'Instagram'));
        this.#initialized = true;
        return true;
      }
      echoLog({}).error(__('initFailed', 'Instagram'));
      return false;
    } catch (error) {
      throwError(error as Error, 'Instagram.init');
      return false;
    }
  }

  /**
   * 获取用户信息，验证Instagram的授权。
   *
   * @async
   * @function #getUserInfo
   * @param {string} [name='instagram'] - Instagram用户名，默认为'instagram'。
   * @returns {Promise<string | boolean>} - 返回一个Promise，表示获取用户信息的结果。
   *                                        - 当name为'instagram'时：
   *                                          - true: Token有效
   *                                          - false: Token失效
   *                                        - 当name不为'instagram'时：
   *                                          - string: 返回Instagram用户ID
   *                                          - false: 获取用户ID失败
   *
   * @description
   * 该方法首先检查缓存中是否存在用户ID。如果存在且name不为'instagram'，则直接返回用户ID。
   * 否则，发送HTTP请求获取用户信息。如果请求成功且返回的URL包含登录页面，则记录错误并返回false。
   * 如果返回的状态为200，则提取csrf_token和rollout_hash，并在name为'instagram'时更新授权信息。
   * 如果name不为'instagram'，则提取用户ID并缓存。如果获取失败，则记录错误并返回false。
   * 如果在执行过程中发生错误，将抛出错误并返回false。
   */
  async #getUserInfo(name = 'instagram'): Promise<string | boolean> {
    try {
      const logStatus = echoLog({ type: name === 'instagram' ? 'verifyingInsAuth' : 'gettingInsUserId', text: name });
      const userId = this.#cache[name];
      if (userId && name !== 'instagram') {
        logStatus.success();
        return userId;
      }
      const { result, statusText, status, data } = await httpRequest({
        url: `https://www.instagram.com/${name}/`,
        method: 'GET'
      });
      if (result === 'Success') {
        if (data?.finalUrl.includes('accounts/login')) {
          logStatus.error(`Error:${__('loginIns')}`, true);
          return false;
        } else if (data?.finalUrl.includes('www.instagram.com/challenge')) {
          logStatus.error(`Error:${__('insBanned')}`);
          return false;
        }
        if (data?.status === 200) {
          const csrftoken: string | undefined = data.responseText.match(/"csrf_token":"(.+?)"/)?.[1];
          const hash: string | undefined = data.responseText.match(/"rollout_hash":"(.+?)"/)?.[1];
          if (name === 'instagram') {
            if (csrftoken && hash) {
              this.#auth = { csrftoken, hash };
              return true;
            }
            return false;
          }
          // this.#auth.csrftoken = csrftoken || this.#auth.csrftoken;
          // this.#auth.hash = csrftoken || this.#auth.hash;
          const id = data.responseText.match(/"profilePage_([\d]+?)"/)?.[1];
          if (id) {
            this.#setCache(name, id);
            logStatus.success();
            return id;
          }
          logStatus.error('Error: Get ins data error!');
          return false;
        }
        logStatus.error(`${result}:${statusText}(${status})`);
        return false;
      }
      return false;
    } catch (error) {
      throwError(error as Error, 'Instagram.getUserInfo');
      return false;
    }
  }

  /**
   * 关注指定的Instagram用户。
   *
   * @async
   * @function #followUser
   * @param {string} name - Instagram用户名。
   * @returns {Promise<boolean>} - 返回一个Promise，表示关注操作的结果。
   *                              - true: 关注成功
   *                              - false: 关注失败
   *
   * @description
   * 该方法首先通过调用`#getUserInfo`获取用户的ID。如果获取失败，则返回false。
   * 然后发送POST请求以关注该用户，使用相应的请求头和数据。
   * 如果请求成功且返回结果为'Success'，并且状态码为200且响应结果为'following'，则记录成功日志并返回true。
   * 如果请求失败或返回的状态不符合预期，则记录错误信息并返回false。
   * 如果在执行过程中发生错误，将抛出错误并返回false。
   */
  async #followUser(name: string): Promise<boolean> {
    try {
      const id: string | boolean = await this.#getUserInfo(name);
      if (!id) return false;
      const logStatus = echoLog({ type: 'followingIns', text: name });
      const { result, statusText, status, data } = await httpRequest({
        url: `https://www.instagram.com/web/friendships/${id}/follow/`,
        method: 'POST',
        dataType: 'json',
        headers: {
          'x-csrftoken': this.#auth.csrftoken as string,
          origin: 'https://www.instagram.com',
          referer: `https://www.instagram.com/${name}/`,
          'content-type': 'application/x-www-form-urlencoded',
          'sec-fetch-site': 'same-origin',
          'x-instagram-ajax': this.#auth.hash as string
        }
      });
      if (result === 'Success') {
        if (data?.status === 200 && data.response?.result === 'following') {
          logStatus.success();
          this.tasks.users = unique([...this.tasks.users, name]);
          return true;
        }
        logStatus.error(`Error:${data?.response?.feedback_message || (`${data?.statusText}(${data?.status})`)}`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'Instagram.followUser');
      return false;
    }
  }

  /**
   * 取关指定的Instagram用户。
   *
   * @async
   * @function #unfollowUser
   * @param {string} name - Instagram用户名。
   * @returns {Promise<boolean>} - 返回一个Promise，表示取关操作的结果。
   *                              - true: 取关成功
   *                              - false: 取关失败
   *
   * @description
   * 该方法首先检查用户是否在白名单中，如果在白名单中，则直接返回true。
   * 然后通过调用`#getUserInfo`获取用户的ID。如果获取失败，则返回false。
   * 发送POST请求以取关该用户，使用相应的请求头和数据。
   * 如果请求成功且返回结果为'Success'，并且状态码为200且响应结果为'ok'，则记录成功日志并返回true。
   * 如果请求失败或返回的状态不符合预期，则记录错误信息并返回false。
   * 如果在执行过程中发生错误，将抛出错误并返回false。
   */
  async #unfollowUser(name: string): Promise<boolean> {
    try {
      if (this.whiteList.users.includes(name)) {
        echoLog({ type: 'whiteList', text: 'Instagram.unfollowUser', id: name });
        return true;
      }
      const id: string | boolean = await this.#getUserInfo(name);
      if (!id) return false;
      const logStatus = echoLog({ type: 'unfollowingIns', text: name });
      const { result, statusText, status, data } = await httpRequest({
        url: `https://www.instagram.com/web/friendships/${id}/unfollow/`,
        method: 'POST',
        dataType: 'json',
        headers: {
          'x-csrftoken': this.#auth.csrftoken as string,
          origin: 'https://www.instagram.com',
          referer: `https://www.instagram.com/${name}/`,
          'content-type': 'application/x-www-form-urlencoded',
          'sec-fetch-site': 'same-origin',
          'x-instagram-ajax': this.#auth.hash as string
        }
      });
      if (result === 'Success') {
        if (data?.status === 200 && data.response?.status === 'ok') {
          logStatus.success();
          return true;
        }
        logStatus.error(`Error:${data?.statusText}(${data?.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'Instagram.unfollowUser');
      return false;
    }
  }

  /**
   * 切换Instagram用户的关注状态。
   *
   * @async
   * @function toggle
   * @param {Object} options - 选项对象。
   * @param {boolean} [options.doTask=true] - 指示是否执行任务，true表示执行，false表示取消。
   * @param {Array<string>} [options.userLinks=[]] - Instagram用户链接数组。注意: 不接受用户名数组。
   * @returns {Promise<boolean>} - 返回一个Promise，表示操作的结果。
   *                              - true: 操作成功
   *                              - false: 操作失败
   *
   * @description
   * 该方法统一处理Instagram相关任务，根据传入的参数决定是关注还是取关用户。
   * 首先检查模块是否已初始化，如果未初始化，则返回false。
   * 根据`doTask`和全局选项判断是否执行任务。
   * 如果执行任务，则获取实际用户参数并逐个处理关注或取关操作。
   * 最后返回所有操作的结果，如果在执行过程中发生错误，将抛出错误并返回false。
   */
  async toggle({
    doTask = true,
    userLinks = []
  }: {
    doTask: boolean,
    userLinks?: Array<string>
    }): Promise<boolean> {
    try {
      if (!this.#initialized) {
        echoLog({ text: __('needInit') });
        return false;
      }
      const prom = [];
      if (
        (doTask && !globalOptions.doTask.instagram.users) ||
        (!doTask && !globalOptions.undoTask.instagram.users)
      ) {
        echoLog({ type: 'globalOptionsSkip', text: 'instagram.users' });
      } else {
        const realUsers = this.getRealParams('users', userLinks, doTask,
          (link) => link.match(/https:\/\/www\.instagram\.com\/(.+)?\//)?.[1]);
        if (realUsers.length > 0) {
          for (const username of realUsers) {
            if (doTask) {
              prom.push(this.#followUser(username));
            } else {
              prom.push(this.#unfollowUser(username));
            }
            await delay(1000);
          }
        }
      }
      return await Promise.all(prom).then(() => true);
    } catch (error) {
      throwError(error as Error, 'Instagram.toggleUsers');
      return false;
    }
  }

  /**
   * 设置缓存，将指定的名称与ID进行关联。
   *
   * @function #setCache
   * @param {string} name - 要缓存的名称。
   * @param {string} id - 要缓存的ID。
   * @returns {void} - 无返回值。
   *
   * @description
   * 该方法将{name}与{id}的对应关系存储在缓存中，并使用`GM_setValue`将缓存保存到存储中。
   * 如果在设置缓存过程中发生错误，将抛出错误并记录错误信息。
   */
  #setCache(name: string, id: string): void {
    try {
      this.#cache[name] = id;
      GM_setValue('instagramCache', this.#cache);
    } catch (error) {
      throwError(error as Error, 'Instagram.setCache');
    }
  }
}

export default Instagram;

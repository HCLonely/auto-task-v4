/*
 * @Author       : HCLonely
 * @Date         : 2021-10-04 10:36:57
 * @LastEditTime : 2024-07-02 10:38:06
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-v4/src/scripts/social/Twitter.ts
 * @Description  : Twitter 关注/取关用户,转推/取消转推推文
 */

import Social from './Social';
import echoLog from '../echoLog';
import throwError from '../tools/throwError';
import httpRequest from '../tools/httpRequest';
import { unique, delay } from '../tools/tools';
import __ from '../tools/i18n';
import { globalOptions } from '../globalOptions';
/**
 * Twitter类用于处理与Twitter相关的任务，包括关注/取关用户和转推/取消转推推文。
 *
 * @class Twitter
 * @extends Social
 *
 * @property {twitterTasks} tasks - 存储当前的Twitter任务，包括用户、转推和点赞。
 * @property {twitterTasks} whiteList - 存储白名单用户和推文。
 * @private
 * @property {string} #verifyId - Twitter验证ID。
 * @private
 * @property {auth} #auth - 存储Twitter的身份验证信息。
 * @private
 * @property {cache} #cache - 存储用户ID的缓存。
 * @private
 * @property {boolean} #initialized - 模块是否已初始化的标志。
 *
 * @constructor
 * @description 创建一个Twitter实例，初始化任务模板和白名单。
 *
 * @async
 * @function init
 * @returns {Promise<boolean>} - 返回初始化结果，true表示成功，false表示失败。
 *
 * @async
 * @function #verifyAuth
 * @returns {Promise<boolean>} - 返回Token验证结果，true表示有效，false表示无效。
 *
 * @async
 * @function #updateAuth
 * @returns {Promise<boolean>} - 返回更新Token的结果，true表示成功，false表示失败。
 *
 * @async
 * @function #toggleUser
 * @param {Object} options - 选项对象。
 * @param {string} options.name - Twitter用户名。
 * @param {boolean} [options.doTask=true] - 是否执行任务，true表示关注，false表示取关。
 * @param {boolean} [options.verify=false] - 是否用于验证Token。
 * @returns {Promise<boolean>} - 返回操作结果，true表示成功，false表示失败。
 *
 * @async
 * @function userName2id
 * @param {string} name - Twitter用户名。
 * @returns {Promise<string | false>} - 返回用户ID或false。
 *
 * @async
 * @function #toggleRetweet
 * @param {Object} options - 选项对象。
 * @param {string} options.retweetId - 推文的ID。
 * @param {boolean} [options.doTask=true] - 是否执行转推任务。
 * @returns {Promise<boolean>} - 返回操作结果，true表示成功，false表示失败。
 *
 * @async
 * @function toggle
 * @param {Object} options - 选项对象。
 * @param {boolean} [options.doTask=true] - 是否执行任务。
 * @param {Array<string>} [options.userLinks=[]] - Twitter用户链接数组。
 * @param {Array<string>} [options.retweetLinks=[]] - 推文链接数组。
 * @returns {Promise<boolean>} - 返回操作结果，true表示成功，false表示失败。
 *
 * @function #setCache
 * @param {string} name - 要缓存的Twitter用户名。
 * @param {string} id - 要缓存的Twitter用户ID。
 * @returns {void} - 无返回值。
 */
class Twitter extends Social {
  tasks: twitterTasks;
  whiteList: twitterTasks;
  #verifyId = globalOptions.other.twitterVerifyId;
  #auth: auth = GM_getValue<auth>('twitterAuth') || {};
  #cache: cache = GM_getValue<cache>('twitterCache') || {};
  #initialized = false;

  /**
   * 创建一个Twitter实例。
   *
   * @constructor
   * @description
   * 此构造函数初始化Twitter类的实例，设置默认任务模板和白名单。
   * 默认任务模板包含空的用户、转发和点赞数组，用于存储Twitter相关的任务信息。
   * 白名单将从GM_getValue中获取，如果没有找到，则使用默认任务模板。
   */
  constructor() {
    super();
    const defaultTasksTemplate: twitterTasks = {
      users: [], retweets: [], likes: []
    };
    this.tasks = defaultTasksTemplate;
    this.whiteList = { ...defaultTasksTemplate, ...(GM_getValue<whiteList>('whiteList')?.twitter || {}) };
  }

  /**
   * 初始化Twitter模块，验证用户身份并获取授权。
   *
   * @async
   * @function init
   * @returns {Promise<boolean>} - 返回一个Promise，表示初始化的结果。
   *                              - true: 初始化成功
   *                              - false: 初始化失败，toggle方法不可用
   *
   * @description
   * 该方法首先检查模块是否已初始化。如果已初始化，则直接返回true。
   * 然后检查身份验证信息是否完整。如果不完整，则调用`#updateAuth`方法获取新的授权信息。
   * 如果身份验证成功，则记录成功日志并将初始化状态设置为true。
   * 如果身份验证失败，则清除存储的身份验证信息，并尝试再次更新授权。
   * 如果在执行过程中发生错误，将抛出错误并返回false。
   */
  async init(): Promise<boolean> {
    try {
      if (this.#initialized) {
        return true;
      }
      if (!this.#auth.ct0) {
        if (await this.#updateAuth()) {
          this.#initialized = true;
          return true;
        }
        return false;
      }
      const isVerified = await this.#verifyAuth();
      if (isVerified) {
        echoLog({}).success(__('initSuccess', 'Twitter'));
        this.#initialized = true;
        return true;
      }
      GM_setValue('twitterAuth', null);
      if (await this.#updateAuth()) {
        echoLog({}).success(__('initSuccess', 'Twitter'));
        this.#initialized = true;
        return true;
      }
      echoLog({}).error(__('initFailed', 'Twitter'));
      return false;
    } catch (error) {
      throwError(error as Error, 'Twitter.init');
      return false;
    }
  }

  /**
   * 验证Twitter的身份验证Token是否有效。
   *
   * @async
   * @function #verifyAuth
   * @returns {Promise<boolean>} - 返回一个Promise，表示Token验证的结果。
   *                              - true: Token有效
   *                              - false: Token失效
   *
   * @description
   * 该方法通过调用`#toggleUser`方法来检测Token的有效性。
   * 如果调用成功且返回结果为true，则表示Token有效；如果发生错误，则记录错误信息并返回false。
   * 如果在执行过程中发生错误，将抛出错误并返回false。
   */
  async #verifyAuth(): Promise<boolean> {
    try {
      return await this.#toggleUser({ name: 'verify', doTask: true, verify: true });
    } catch (error) {
      throwError(error as Error, 'Twitter.verifyAuth');
      return false;
    }
  }

  /**
   * 更新Twitter的身份验证Token。
   *
   * @async
   * @function #updateAuth
   * @returns {Promise<boolean>} - 返回一个Promise，表示更新操作的结果。
   *                              - true: 更新Token成功
   *                              - false: 更新Token失败
   *
   * @description
   * 该方法通过打开Twitter网站的设置页面来更新Token。
   * 使用`GM_cookie.list`方法获取当前的cookie信息，如果成功获取到`ct0`和`twid`的值，则更新存储的身份验证信息。
   * 如果用户未登录，则记录错误信息并返回false。
   * 如果在执行过程中发生错误，将抛出错误并返回false。
   */
  async #updateAuth(): Promise<boolean> {
    try {
      const logStatus = echoLog({ text: __('updatingAuth', 'Twitter') });
      return await new Promise((resolve) => {
        // eslint-disable-next-line camelcase
        GM_cookie.list({ url: 'https://x.com/settings/account' }, async (cookies, error) => {
          if (!error) {
            const [ct0, isLogin] = cookies.map((cookie) => (['ct0', 'twid'].includes(cookie.name) ? cookie.value : null)).filter((cookie) => cookie);

            if (isLogin && ct0) {
              GM_setValue('twitterAuth', { ct0 });
              this.#auth = { ct0 };
              logStatus.success();
              resolve(await this.#verifyAuth());
            } else {
              logStatus.error(__('needLogin'));
              resolve(false);
            }
          } else {
            logStatus.error('Error: Update twitter auth failed!');
            resolve(false);
          }
        });
      });
    } catch (error) {
      throwError(error as Error, 'Twitter.updateToken');
      return false;
    }
  }

  /**
   * 处理Twitter用户任务，关注或取关指定的用户。
   *
   * @async
   * @function #toggleUser
   * @param {Object} options - 选项对象。
   * @param {string} options.name - Twitter用户名。
   * @param {boolean} [options.doTask=true] - 指示是否执行任务，true表示关注，false表示取关。
   * @param {boolean} [options.verify=false] - 指示是否用于验证Token，true表示验证，false表示处理用户任务。
   * @returns {Promise<boolean>} - 返回一个Promise，表示操作的结果。
   *                              - true: 操作成功
   *                              - false: 操作失败
   *
   * @description
   * 该方法根据传入的参数处理Twitter用户的关注或取关任务。
   * 如果`doTask`为false且用户在白名单中，则直接返回true。
   * 通过调用`#verifyId`或`userName2id`方法获取用户ID，如果获取失败则返回false。
   * 根据`doTask`的值构建相应的请求数据，并发送POST请求到Twitter API。
   * 如果请求成功且返回结果为'Success'，并且状态码为200，则记录成功日志并更新任务列表。
   * 如果请求失败或返回的状态不符合预期，则记录错误信息并返回false。
   * 如果在执行过程中发生错误，将抛出错误并返回false。
   */
  async #toggleUser({ name, doTask = true, verify = false }: { name: string, doTask: boolean, verify?: boolean }): Promise<boolean> {
    try {
      if (!doTask && !verify && this.whiteList.users.includes(name)) {
        echoLog({ type: 'whiteList', text: 'Twitter.unfollowUser', id: name });
        return true;
      }
      const userId: string | boolean = verify ? this.#verifyId : (await this.userName2id(name));
      if (!userId) return false;
      const logStatus = verify ?
        echoLog({ text: __('verifyingAuth', 'Twitter') }) :
        echoLog({ type: `${doTask ? '' : 'un'}followingTwitterUser`, text: name });
      const { result, statusText, status, data } = await httpRequest({
        url: `https://x.com/i/api/1.1/friendships/${doTask ? 'create' : 'destroy'}.json`,
        method: 'POST',
        headers: {
          authorization: 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA',
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-csrf-token': this.#auth.ct0 as string
        },
        responseType: 'json',
        /* eslint-disable camelcase */
        data: $.param({
          include_profile_interstitial_type: 1,
          include_blocking: 1,
          include_blocked_by: 1,
          include_followed_by: 1,
          include_want_retweets: 1,
          include_mute_edge: 1,
          include_can_dm: 1,
          include_can_media_tag: 1,
          skip_status: 1,
          id: userId
        })
        /* eslint-enable camelcase */
      });
      if (result === 'Success') {
        if (data?.status === 200) {
          logStatus.success();
          if (doTask && !verify) {
            this.tasks.users = unique([...this.tasks.users, name]);
          }
          return true;
        }
        if (verify && data?.status === 403 && data.response?.errors?.[0]?.code === 158) {
          logStatus.success();
          return true;
        }
        logStatus.error(`Error:${data?.statusText}(${data?.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'Twitter.toggleUser');
      return false;
    }
  }

  /**
   * 通过用户名获取Twitter用户的ID。
   *
   * @async
   * @function userName2id
   * @param {string} name - Twitter用户名。
   * @returns {Promise<string | false>} - 返回一个Promise，表示获取操作的结果。
   *                                      - string: 获取成功，返回用户ID
   *                                      - false: 获取失败
   *
   * @description
   * 该方法首先检查缓存中是否存在对应的用户ID。如果存在，则直接返回该ID。
   * 如果不存在，则发送GET请求到Twitter的GraphQL API以获取用户信息。
   * 如果请求成功且返回结果为'Success'，并且状态码为200，则提取用户ID并缓存。
   * 如果获取失败或返回的状态不符合预期，则记录错误信息并返回false。
   * 如果在执行过程中发生错误，将抛出错误并返回false。
   */
  async userName2id(name: string): Promise<string | false> {
    try {
      const logStatus = echoLog({ type: 'gettingTwitterUserId', text: name });
      const userId = this.#cache[name];
      if (userId) {
        logStatus.success();
        return userId;
      }
      const { result, statusText, status, data } = await httpRequest({
        url: (
          'https://x.com/i/api/graphql/mCbpQvZAw6zu_4PvuAUVVQ/UserByScreenName' +
          `?variables=%7B%22screen_name%22%3A%22${name}%22%2C%22withSafetyModeUserFields%22%3Atrue%2C%22withSuperFollowsUserFields%22%3Atrue%7D`
        ),
        method: 'GET',
        headers: {
          authorization: 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA',
          'content-type': 'application/json',
          referer: `https://x.com/${name}`,
          'x-csrf-token': this.#auth.ct0 as string
        },
        responseType: 'json'
      });
      if (result === 'Success') {
        if (data?.status === 200) {
          let response = data.response || (typeof data.responseText === 'object' ? data.responseText : null);
          if (!response) {
            try {
              response = JSON.parse(data.responseText);
            } catch (error) {
              response = null;
            }
          }
          const userId = String(response?.data?.user?.result?.rest_id); // eslint-disable-line camelcase
          if (userId) {
            this.#setCache(name, userId);
            logStatus.success();
            return userId;
          }
          logStatus.error(`Error:${data.statusText}(${data.status})`);
          return false;
        }
        logStatus.error(`Error:${data?.statusText}(${data?.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'Twitter.getUserId');
      return false;
    }
  }

  /**
   * 处理转推任务，关注或撤销转推指定的推文。
   *
   * @async
   * @function #toggleRetweet
   * @param {Object} options - 选项对象。
   * @param {string} options.retweetId - 推文的ID。
   * @param {boolean} [options.doTask=true] - 指示是否执行转推任务，true表示转推，false表示撤销转推。
   * @returns {Promise<boolean>} - 返回一个Promise，表示操作的结果。
   *                              - true: 操作成功
   *                              - false: 操作失败
   *
   * @description
   * 该方法根据传入的参数处理转推任务。
   * 如果`doTask`为false且推文在白名单中，则直接返回true。
   * 发送POST请求到Twitter API以执行转推或撤销转推操作。
   * 如果请求成功且返回结果为'Success'，并且状态码为200或403（表示已撤销转推），则记录成功日志并更新任务列表。
   * 如果请求失败或返回的状态不符合预期，则记录错误信息并返回false。
   * 如果在执行过程中发生错误，将抛出错误并返回false。
   */
  async #toggleRetweet({ retweetId, doTask = true }: { retweetId: string, doTask: boolean }): Promise<boolean> {
    try {
      if (!doTask && this.whiteList.retweets.includes(retweetId)) {
        echoLog({ type: 'whiteList', text: 'Twitter.unretweet', id: retweetId });
        return true;
      }
      const logStatus = echoLog({ type: `${doTask ? '' : 'un'}retweetting`, text: retweetId });
      const { result, statusText, status, data } = await httpRequest({
        url: `https://x.com/i/api/graphql/${doTask ? 'ojPdsZsimiJrUGLR1sjUtA/CreateRetweet' : 'iQtK4dl5hBmXewYZuEOKVw/DeleteRetweet'}`,
        method: 'POST',
        headers: {
          authorization: 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA',
          'Content-Type': 'application/json',
          'x-csrf-token': this.#auth.ct0 as string
        },
        // eslint-disable-next-line max-len
        data: `{"variables":{"tweet_id":"${retweetId}","dark_request":false},"queryId":"${doTask ? 'ojPdsZsimiJrUGLR1sjUtA' : 'iQtK4dl5hBmXewYZuEOKVw'}"}`,
        responseType: 'json'
      });
      if (result === 'Success') {
        if (data?.status === 200 || (data?.status === 403 && data.response?.errors?.[0]?.code === 327)) {
          logStatus.success();
          if (doTask) this.tasks.retweets = unique([...this.tasks.retweets, retweetId]);
          return true;
        }
        logStatus.error(`Error:${data?.statusText}(${data?.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'Twitter.toggleRetweet');
      return false;
    }
  }

  /**
   * 统一处理Twitter相关任务，关注或取消关注指定的用户和推文。
   *
   * @async
   * @function toggle
   * @param {Object} options - 选项对象。
   * @param {boolean} [options.doTask=true] - 指示是否执行任务，true表示执行，false表示取消。
   * @param {Array<string>} [options.userLinks=[]] - Twitter用户链接数组。
   * @param {Array<string>} [options.retweetLinks=[]] - 推文链接数组。
   * @returns {Promise<boolean>} - 返回一个Promise，表示操作的结果。
   *                              - true: 操作成功
   *                              - false: 操作失败
   *
   * @description
   * 该方法根据传入的参数处理Twitter相关任务。
   * 首先检查模块是否已初始化，如果未初始化，则返回false。
   * 根据`doTask`和全局选项判断是否执行用户关注或取消关注的任务。
   * 如果执行任务，则获取实际的用户参数，并逐个处理关注或取消关注操作。
   * 同样处理推文的转推或取消转推操作。
   * 最后返回所有操作的结果，如果在执行过程中发生错误，将抛出错误并返回false。
   */
  async toggle({
    doTask = true,
    userLinks = [],
    retweetLinks = []
  }: {
    doTask: boolean,
    userLinks?: Array<string>,
    retweetLinks?: Array<string>
  }): Promise<boolean> {
    try {
      if (!this.#initialized) {
        echoLog({ text: __('needInit') });
        return false;
      }

      const prom = [];

      if (
        (doTask && !globalOptions.doTask.twitter.users) ||
        (!doTask && !globalOptions.undoTask.twitter.users)
      ) {
        echoLog({ type: 'globalOptionsSkip', text: 'twitter.users' });
      } else {
        const realUsers = this.getRealParams('users', userLinks, doTask, (link) => link.match(/https:\/\/x\.com\/(.+)/)?.[1] || link.match(/https:\/\/twitter\.com\/(.+)/)?.[1]);
        if (realUsers.length > 0) {
          for (const user of realUsers) {
            prom.push(this.#toggleUser({ name: user, doTask }));
            await delay(1000);
          }
        }
      }
      if (
        (doTask && !globalOptions.doTask.twitter.retweets) ||
        (!doTask && !globalOptions.undoTask.twitter.retweets)
      ) {
        echoLog({ type: 'globalOptionsSkip', text: 'twitter.retweets' });
      } else {
        const realRetweets = this.getRealParams('retweets', retweetLinks, doTask,
          (link) => link.match(/https:\/\/x\.com\/.*?\/status\/([\d]+)/)?.[1] || link.match(/https:\/\/twitter\.com\/.*?\/status\/([\d]+)/)?.[1]);
        if (realRetweets.length > 0) {
          for (const retweet of realRetweets) {
            prom.push(this.#toggleRetweet({ retweetId: retweet, doTask }));
            await delay(1000);
          }
        }
      }
      return Promise.all(prom).then(() => true);
    } catch (error) {
      throwError(error as Error, 'Twitter.toggle');
      return false;
    }
  }

  /**
   * 设置缓存，将指定的用户名与用户ID进行关联。
   *
   * @function #setCache
   * @param {string} name - 要缓存的Twitter用户名。
   * @param {string} id - 要缓存的Twitter用户ID。
   * @returns {void} - 无返回值。
   *
   * @description
   * 该方法将用户名与用户ID的对应关系存储在缓存中，并使用`GM_setValue`将缓存保存到存储中。
   * 如果在设置缓存过程中发生错误，将抛出错误并记录错误信息。
   */
  #setCache(name: string, id: string): void {
    try {
      this.#cache[name] = id;
      GM_setValue('twitterCache', this.#cache);
    } catch (error) {
      throwError(error as Error, 'Twitter.setCache');
    }
  }
}
export default Twitter;

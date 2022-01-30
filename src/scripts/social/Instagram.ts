/*
 * @Author       : HCLonely
 * @Date         : 2021-09-29 12:54:16
 * @LastEditTime : 2022-01-30 11:58:18
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

const defaultTasksTemplate: instagramTasks = { users: [] };
const defaultTasks = JSON.stringify(defaultTasksTemplate);
class Instagram extends Social {
  tasks: instagramTasks = JSON.parse(defaultTasks);
  whiteList: instagramTasks = { ...JSON.parse(defaultTasks), ...GM_getValue<whiteList>('whiteList')?.instagram };
  #cache: cache = GM_getValue<cache>('instagramCache') || {};
  #auth: auth = {};
  #initialized = false;

  async init(): Promise<boolean> {
    /**
     * @description: 验证及获取Auth
     * @return true: 初始化完成 | false: 初始化失败，toggle方法不可用
     */
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

  async #getUserInfo(name = 'instagram'): Promise<string | boolean> {
    /**
     * @internal
     * @description 获取用户id, name === 'instagram'时验证Auth
     * @param {string} name instagram用户名
     * @return name === 'instagram' 时返回 true: Token有效 | false: Token失效
     * @return name !== 'instagram' 时返回 string: instagram用户id | false: 获取用户id失败
     */
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

  async #followUser(name: string): Promise<boolean> {
    /**
     * @internal
     * @description 关注instagram用户
     * @param name: instagram用户名
     * @return true: 关注成功 | false: 关注失败
     */
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
        logStatus.error(`Error:${data?.response?.feedback_message || (`${data?.statusText}(${data?.status})`)}`); // eslint-disable-line camelcase
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'Instagram.followUser');
      return false;
    }
  }

  async #unfollowUser(name: string): Promise<boolean> {
    /**
     * @internal
     * @description 取关instagram用户
     * @param name: instagram用户名
     * @return true: 取关成功 | false: 取关失败
     */
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

  async toggle({
    doTask = true,
    userLinks = []
  }: {
    doTask: boolean,
    userLinks?: Array<string>
    }): Promise<boolean> {
    /**
     * @description 公有方法，统一处理Instagram相关任务
     * @param {boolean} doTask true: 做任务 | false: 取消任务
     * @param {?Array} userLinks Instagram用户链接数组。注意: 不接受用户名数组
     */
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
      // TODO: 返回值处理
      return await Promise.all(prom).then(() => true);
    } catch (error) {
      throwError(error as Error, 'Instagram.toggleUsers');
      return false;
    }
  }
  #setCache(name: string, id: string): void {
    /**
     * @internal
     * @description 缓存{name}与{id}的对应关系
     * @return {void}
     */
    try {
      this.#cache[name] = id;
      GM_setValue('instagramCache', this.#cache);
    } catch (error) {
      throwError(error as Error, 'Instagram.setCache');
    }
  }
}

export default Instagram;

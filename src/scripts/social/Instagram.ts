/*
 * @Author       : HCLonely
 * @Date         : 2021-09-29 12:54:16
 * @LastEditTime : 2021-11-05 10:42:22
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/social/Instagram.ts
 * @Description  : Instagram 关注&取关用户
 */

import Social from './Social';
import echoLog from '../echoLog';
import throwError from '../tools/throwError';
import httpRequest from '../tools/httpRequest';
import getI18n from '../i18n/i18n';
import { unique, delay } from '../tools/tools';

const defaultTasks: instagramTasks = { users: [] };
class Instagram extends Social {
  tasks = defaultTasks;
  whiteList: instagramTasks = GM_getValue<whiteList>('whiteList')?.instagram || defaultTasks; // eslint-disable-line new-cap
  #cache: cache = GM_getValue<cache>('instagramCache') || {}; // eslint-disable-line new-cap
  #auth: auth = {};
  #initialized = false;

  async init(): Promise<boolean> {
    try {
      if (this.#initialized) {
        return true;
      }
      const isVerified = await this.#getUserInfo();
      if (isVerified) {
        echoLog({ text: 'Init instagram success!' });
        this.#initialized = true;
        return true;
      }
      echoLog({ text: 'Init instagram failed!' });
      return false;
    } catch (error) {
      throwError(error as Error, 'Instagram.init');
      return false;
    }
  }

  async #getUserInfo(name = 'instagram'): Promise<string | boolean> {
    try {
      const logStatus = echoLog({ type: name === 'instagram' ? 'getInsInfo' : 'getInsUserId', text: name });
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
          logStatus.error(`Error:${getI18n('loginIns')}`, true);
          return false;
        } else if (data?.finalUrl.includes('www.instagram.com/challenge')) {
          logStatus.error(`Error:${getI18n('insBanned')}`);
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
    try {
      const id: string | boolean = await this.#getUserInfo(name);
      if (!id) return false;
      const logStatus = echoLog({ type: 'followIns', text: name });
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
    try {
      if (this.whiteList.users.includes(name)) {
        // TODO: 直接echo
        echoLog({ type: 'whiteList', text: name });
        return true;
      }
      const id: string | boolean = await this.#getUserInfo(name);
      if (!id) return false;
      const logStatus = echoLog({ type: 'unfollowIns', text: name });
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

  // 改成处理任务
  async toggle({
    doTask = true,
    userLinks = []
  }: {
    doTask: boolean,
    userLinks: Array<string>
    }): Promise<boolean> {
    try {
      if (!this.#initialized) {
        echoLog({ type: 'text', text: '请先初始化' });
        return false;
      }
      const prom = [];
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
      // TODO: 返回值处理
      return await Promise.all(prom).then(() => true);
    } catch (error) {
      throwError(error as Error, 'Instagram.toggleUsers');
      return false;
    }
  }
  #setCache(name: string, id: string): void {
    try {
      this.#cache[name] = id;
      GM_setValue('instagramCache', this.#cache); // eslint-disable-line new-cap
    } catch (error) {
      throwError(error as Error, 'Instagram.setCache');
    }
  }
}

export default Instagram;

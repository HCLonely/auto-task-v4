/* eslint-disable import/no-unresolved, import/extensions */
/*
 * @Author       : HCLonely
 * @Date         : 2021-09-29 12:54:16
 * @LastEditTime : 2021-10-28 16:32:27
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

class Instagram extends Social {
  // TODO: 任务识别
  constructor(id: string) {
    super();
    this.tasks = GM_getValue<socialTasks>(`Instagram-${id}`) || { users: [] }; // eslint-disable-line new-cap
    this.whiteList = GM_getValue<whiteList>('whiteList')?.instagram || { users: [] }; // eslint-disable-line new-cap
  }

  async init(): Promise<boolean> {
    try {
      const isVerified = await this.getUserInfo();
      if (isVerified) {
        echoLog({ text: 'Init instagram success!' });
        return true;
      }
      echoLog({ text: 'Init instagram failed!' });
      return false;
    } catch (error) {
      throwError(error, 'Instagram.init');
      return false;
    }
  }

  async getUserInfo(name = 'instagram'): Promise<string | boolean> {
    try {
      const logStatus = echoLog({ type: name === 'instagram' ? 'getInsInfo' : 'getInsUserId', text: name });
      const { result, statusText, status, data } = await httpRequest({
        url: `https://www.instagram.com/${name}/`,
        method: 'GET'
      });
      if (result === 'Success') {
        if (data.finalUrl.includes('accounts/login')) {
          logStatus.error(`Error:${getI18n('loginIns')}`, true);
          return false;
        } else if (data.finalUrl.includes('www.instagram.com/challenge')) {
          logStatus.error(`Error:${getI18n('insBanned')}`);
          return false;
        }
        if (data.status === 200) {
          const csrftoken: string = data.responseText.match(/"csrf_token":"(.+?)"/)?.[1];
          const hash: string = data.responseText.match(/"rollout_hash":"(.+?)"/)?.[1];
          if (name === 'instagram') {
            if (csrftoken && hash) {
              this.auth = { csrftoken, hash };
              return true;
            }
            return false;
          }
          this.auth.csrftoken = csrftoken || this.auth.csrftoken;
          this.auth.hash = csrftoken || this.auth.hash;
          const id: string = data.responseText.match(/"profilePage_([\d]+?)"/)?.[1];
          if (id) {
            logStatus.success();
            return id;
          }
          logStatus.error('Error: Get ins data error!');
          return false;
        }
        logStatus.error(`${result}:${statusText}(${status})`);
        return false;
      }
    } catch (error) {
      throwError(error, 'Instagram.getUserInfo');
      return false;
    }
  }

  async followUser(name: string): Promise<boolean> {
    try {
      const id: string | boolean = await this.getUserInfo(name);
      if (!id) return false;
      const logStatus = echoLog({ type: 'followIns', text: name });
      const { result, statusText, status, data } = await httpRequest({
        url: `https://www.instagram.com/web/friendships/${id}/follow/`,
        method: 'POST',
        dataType: 'json',
        headers: {
          'x-csrftoken': this.auth.csrftoken,
          origin: 'https://www.instagram.com',
          referer: `https://www.instagram.com/${name}/`,
          'content-type': 'application/x-www-form-urlencoded',
          'sec-fetch-site': 'same-origin',
          'x-instagram-ajax': this.auth.hash
        }
      });
      if (result === 'Success') {
        if (data.status === 200 && data.response?.result === 'following') {
          logStatus.success();
          this.tasks.users = unique([...this.tasks.users, name]);
          return true;
        }
        logStatus.error(`Error:${data.response?.feedback_message || (`${data.statusText}(${data.status})`)}`); // eslint-disable-line camelcase
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error, 'Instagram.followUser');
      return false;
    }
  }

  async unfollowUser(name: string): Promise<boolean> {
    try {
      if (this.whiteList.users.includes(name)) {
        // TODO: 直接echo
        echoLog({ type: 'whiteList', text: name });
        return true;
      }
      const id: string | boolean = await this.getUserInfo(name);
      if (!id) return false;
      const logStatus = echoLog({ type: 'unfollowIns', text: name });
      const { result, statusText, status, data } = await httpRequest({
        url: `https://www.instagram.com/web/friendships/${id}/unfollow/`,
        method: 'POST',
        dataType: 'json',
        headers: {
          'x-csrftoken': this.auth.csrftoken,
          origin: 'https://www.instagram.com',
          referer: `https://www.instagram.com/${name}/`,
          'content-type': 'application/x-www-form-urlencoded',
          'sec-fetch-site': 'same-origin',
          'x-instagram-ajax': this.auth.hash
        }
      });
      if (result === 'Success') {
        if (data.status === 200 && data.response?.status === 'ok') {
          logStatus.success();
          return true;
        }
        logStatus.error(`Error:${data.statusText}(${data.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error, 'Instagram.unfollowUser');
      return false;
    }
  }

  // 改成处理任务
  async toggle({ doTask = true, users = [], userLinks = [] }: { doTask: boolean, users: Array<string>, userLinks: Array<string> }): Promise<boolean> {
    try {
      const prom = [];
      const realUsers = this.getRealParams('users', users, userLinks, doTask,
        (link) => link.match(/https:\/\/www\.instagram\.com\/(.+)?\//)?.[1]);
      if (realUsers.length > 0) {
        for (const username of realUsers) {
          prom.push(this[doTask ? 'followUser' : 'unfollowUser'](username));
          await delay(1000);
        }
      }
      // TODO: 返回值处理
      return await Promise.all(prom).then(() => true);
    } catch (error) {
      throwError(error, 'Instagram.toggleUsers');
      return false;
    }
  }
}

export default Instagram;

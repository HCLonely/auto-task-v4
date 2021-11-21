/*
 * @Author       : HCLonely
 * @Date         : 2021-10-04 10:36:57
 * @LastEditTime : 2021-11-21 12:38:20
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/social/Twitter.ts
 * @Description  : Twitter 关注/取关用户,转推/取消转推推文
 ! 功能验证
 */

import Social from './Social';
import echoLog from '../echoLog';
import throwError from '../tools/throwError';
import httpRequest from '../tools/httpRequest';
import { unique, delay } from '../tools/tools';
import __ from '../tools/i18n';

const defaultTasks: twitterTasks = { users: [], retweets: [], likes: [] };
class Twitter extends Social {
  tasks = { ...defaultTasks };
  whiteList: twitterTasks = GM_getValue<whiteList>('whiteList')?.twitter || { ...defaultTasks }; // eslint-disable-line new-cap
  #verifyId = '783214';
  #auth: auth = GM_getValue<auth>('twitterAuth') || {}; // eslint-disable-line new-cap
  #cache: cache = GM_getValue<cache>('twitterCache') || {}; // eslint-disable-line new-cap
  #initialized = false;

  // TODO: 任务识别
  constructor(verifyId?: string) {
    super();
    if (verifyId) {
      this.#verifyId = verifyId;
    }
  }

  // 通用化,log
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
        echoLog({ text: __('initSuccess', 'Twitter') });
        this.#initialized = true;
        return true;
      }
      GM_setValue('twitterAuth', null); // eslint-disable-line new-cap
      if (await this.#updateAuth()) {
        echoLog({ text: __('initSuccess', 'Twitter') });
        this.#initialized = true;
        return true;
      }
      echoLog({ text: __('initFailed', 'Twitter') });
      return false;
    } catch (error) {
      throwError(error as Error, 'Twitter.init');
      return false;
    }
  }

  async #verifyAuth(): Promise<boolean> {
    try {
      return await this.#toggleUser({ name: 'verify', doTask: true, verify: true });
    } catch (error) {
      throwError(error as Error, 'Twitter.verifyAuth');
      return false;
    }
  }

  // TODO: 添加跳转
  async #updateAuth(): Promise<boolean> {
    try {
      const logStatus = echoLog({ text: __('updatingAuth', 'Twitter') });
      return await new Promise((resolve) => {
        const newTab = GM_openInTab('https://twitter.com/settings/account?k#auth', // eslint-disable-line new-cap
          { active: true, insert: true, setParent: true });
        newTab.onclose = async () => {
          const auth = GM_getValue<auth>('twitterAuth'); // eslint-disable-line new-cap
          if (auth) {
            this.#auth = auth;
            logStatus.success();
            resolve(await this.#verifyAuth());
          } else {
            logStatus.error('Error: Update twitter auth failed!');
            resolve(false);
          }
        };
      });
    } catch (error) {
      throwError(error as Error, 'Twitter.updateToken');
      return false;
    }
  }

  async #toggleUser({ name, doTask = true, verify = false }: { name: string, doTask: boolean, verify?: boolean }): Promise<boolean> {
    try {
      if (!doTask && !verify && this.whiteList.users.includes(name)) {
        // TODO: 直接echo
        echoLog({ type: 'whiteList', text: name });
        return true;
      }
      const userId: string | boolean = verify ? this.#verifyId : (await this.#getUserId(name));
      if (!userId) return false;
      const logStatus = verify ?
        echoLog({ text: __('verifyingAuth', 'Twitter') }) :
        echoLog({ type: `${doTask ? '' : 'un'}followingTwitterUser`, text: name });
      const { result, statusText, status, data } = await httpRequest({
        url: `https://api.twitter.com/1.1/friendships/${doTask ? 'create' : 'destroy'}.json`,
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

  async #getUserId(name: string): Promise<string | false> {
    try {
      const logStatus = echoLog({ type: 'gettingTwitterUserId', text: name });
      const userId = this.#cache[name];
      if (userId) {
        logStatus.success();
        return userId;
      }
      const { result, statusText, status, data } = await httpRequest({
        url: (
          'https://api.twitter.com/graphql/-xfUfZsnR_zqjFd-IfrN5A/UserByScreenName' +
          `?variables=%7B%22screen_name%22%3A%22${name}%22%2C%22withHighlightedLabel%22%3Atrue%7D`
        ),
        method: 'GET',
        headers: {
          authorization: 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA',
          'content-type': 'application/json'
        },
        responseType: 'json',
        anonymous: true
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
          const userId = String(response?.data?.user?.rest_id); // eslint-disable-line camelcase
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

  async #toggleRetweet({ retweetId, doTask = true }: { retweetId: string, doTask: boolean }): Promise<boolean> {
    try {
      if (!doTask && this.whiteList.retweets.includes(retweetId)) {
        // TODO: 直接echo
        echoLog({ type: 'whiteList', text: retweetId });
        return true;
      }
      const logStatus = echoLog({ type: `${doTask ? '' : 'un'}retweetting`, text: retweetId });
      const { result, statusText, status, data } = await httpRequest({
        url: `https://api.twitter.com/1.1/statuses/${doTask ? '' : 'un'}retweet.json`,
        method: 'POST',
        headers: {
          authorization: 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA',
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-csrf-token': this.#auth.ct0 as string
        },
        data: $.param({
          tweet_mode: 'extended', // eslint-disable-line camelcase
          id: retweetId
        }),
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
      const realUsers = this.getRealParams('users', userLinks, doTask, (link) => link.match(/https:\/\/twitter\.com\/(.+)/)?.[1]);
      const realRetweets = this.getRealParams('retweets', retweetLinks, doTask,
        (link) => link.match(/https:\/\/twitter\.com\/.*?\/status\/([\d]+)/)?.[1]);
      if (realUsers.length > 0) {
        for (const user of realUsers) {
          prom.push(this.#toggleUser({ name: user, doTask }));
          await delay(1000);
        }
      }
      if (realRetweets.length > 0) {
        for (const retweet of realRetweets) {
          prom.push(this.#toggleRetweet({ retweetId: retweet, doTask }));
          await delay(1000);
        }
      }
      // TODO: 返回值处理
      return Promise.all(prom).then(() => true);
    } catch (error) {
      throwError(error as Error, 'Twitter.toggle');
      return false;
    }
  }
  #setCache(name: string, id: string): void {
    try {
      this.#cache[name] = id;
      GM_setValue('twitterCache', this.#cache); // eslint-disable-line new-cap
    } catch (error) {
      throwError(error as Error, 'Twitter.setCache');
    }
  }
}

export default Twitter;

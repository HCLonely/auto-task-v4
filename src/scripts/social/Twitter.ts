/*
 * @Author       : HCLonely
 * @Date         : 2021-10-04 10:36:57
 * @LastEditTime : 2022-06-06 09:42:50
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/social/Twitter.ts
 * @Description  : Twitter 关注/取关用户,转推/取消转推推文
 */

import Social from './Social';
import echoLog from '../echoLog';
import throwError from '../tools/throwError';
import httpRequest from '../tools/httpRequest';
import { unique, delay } from '../tools/tools';
import __ from '../tools/i18n';
import { globalOptions } from '../globalOptions';

class Twitter extends Social {
  tasks: twitterTasks;
  whiteList: twitterTasks;
  #verifyId = globalOptions.other.twitterVerifyId;
  #auth: auth = GM_getValue<auth>('twitterAuth') || {};
  #cache: cache = GM_getValue<cache>('twitterCache') || {};
  #initialized = false;

  constructor() {
    super();
    const defaultTasksTemplate: twitterTasks = {
      users: [], retweets: [], likes: []
    };
    this.tasks = defaultTasksTemplate;
    this.whiteList = { ...defaultTasksTemplate, ...(GM_getValue<whiteList>('whiteList')?.twitter || {}) };
  }
  async init(): Promise<boolean> {
    /**
     * @description: 验证及获取Auth
     * @return true: 初始化完成 | false: 初始化失败，toggle方法不可用
    */
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

  async #verifyAuth(): Promise<boolean> {
    /**
     * @internal
     * @description 检测Twitter Token是否失效
     * @return true: Token有效 | false: Token失效
    */
    try {
      return await this.#toggleUser({ name: 'verify', doTask: true, verify: true });
    } catch (error) {
      throwError(error as Error, 'Twitter.verifyAuth');
      return false;
    }
  }

  async #updateAuth(): Promise<boolean> {
    /**
     * @internal
     * @description 通过打开Twitter网站更新Token.
     * @return true: 更新Token成功 | false: 更新Token失败
    */
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

  async #toggleUser({ name, doTask = true, verify = false }: { name: string, doTask: boolean, verify?: boolean }): Promise<boolean> {
    /**
     * @internal
     * @description 处理Twitter用户任务
     * @param name Twitter用户名
     * @param doTask true: 关注 | false: 取关
     * @param verify true: 用于验证Token | false: 处理用户任务
     * @return true: 成功 | false: 失败
    */
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

  async userName2id(name: string): Promise<string | false> {
    /**
     * @description 通过用户名获取Id
     * @param name 用户名
     * @return {string}: 获取成功，返回用户Id | false: 获取失败
    */
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

  async #toggleRetweet({ retweetId, doTask = true }: { retweetId: string, doTask: boolean }): Promise<boolean> {
    /**
     * @internal
     * @description 处理转推任务
     * @param retweetId 推文Id
     * @param doTask true: 转推 | false: 撤销转推
     * @return true: 成功 | false: 失败
    */
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

  async toggle({
    doTask = true,
    userLinks = [],
    retweetLinks = []
  }: {
    doTask: boolean,
    userLinks?: Array<string>,
    retweetLinks?: Array<string>
  }): Promise<boolean> {
    /**
     * @description 公有方法，统一处理Twitter相关任务
     * @param {boolean} doTask true: 做任务 | false: 取消任务
     * @param {?Array} userLinks Twitter用户链接数组。
     * @param {?Array} retweetLinks 推文链接数组。
    */
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
        const realUsers = this.getRealParams('users', userLinks, doTask, (link) => link.match(/https:\/\/x\.com\/(.+)/)?.[1]);
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
          (link) => link.match(/https:\/\/x\.com\/.*?\/status\/([\d]+)/)?.[1]);
        if (realRetweets.length > 0) {
          for (const retweet of realRetweets) {
            prom.push(this.#toggleRetweet({ retweetId: retweet, doTask }));
            await delay(1000);
          }
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
    /**
     * @internal
     * @description 缓存用户名与用户Id的对应关系
     * @return {void}
    */
    try {
      this.#cache[name] = id;
      GM_setValue('twitterCache', this.#cache);
    } catch (error) {
      throwError(error as Error, 'Twitter.setCache');
    }
  }
}
export default Twitter;

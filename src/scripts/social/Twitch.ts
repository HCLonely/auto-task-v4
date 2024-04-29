/*
 * @Author       : HCLonely
 * @Date         : 2021-10-04 10:00:41
 * @LastEditTime : 2023-01-19 17:08:17
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/social/Twitch.ts
 * @Description  : Twitch 关注/取关频道
 */

import Social from './Social';
import echoLog from '../echoLog';
import throwError from '../tools/throwError';
import httpRequest from '../tools/httpRequest';
import { unique, delay } from '../tools/tools';
import __ from '../tools/i18n';
import { globalOptions } from '../globalOptions';

class Twitch extends Social {
  tasks: twitchTasks;
  whiteList: twitchTasks;
  #auth: auth = GM_getValue<auth>('twitchAuth') || {};
  #cache: cache = GM_getValue<cache>('twitchCache') || {};
  #initialized = false;
  #integrityToken!: string;

  constructor() {
    super();
    const defaultTasksTemplate: twitchTasks = {
      channels: []
    };
    this.tasks = defaultTasksTemplate;
    this.whiteList = { ...defaultTasksTemplate, ...(GM_getValue<whiteList>('whiteList')?.twitch || {}) };
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
      if (!this.#auth.authToken || !this.#auth.clientId || !this.#auth.clientVersion || !this.#auth.deviceId || !this.#auth.clientSessionId) {
        if (await this.#updateAuth()) {
          this.#initialized = true;
          return true;
        }
        return false;
      }
      const isVerified: boolean = await this.#verifyAuth(true);
      if (isVerified) {
        echoLog({}).success(__('initSuccess', 'Twitch'));
        this.#initialized = true;
        return true;
      }
      GM_setValue('twitchAuth', null);
      if (await this.#updateAuth()) {
        echoLog({}).success(__('initSuccess', 'Twitch'));
        this.#initialized = true;
        return true;
      }
      echoLog({}).error(__('initFailed', 'Twitch'));
      return false;
    } catch (error) {
      throwError(error as Error, 'Twitch.init');
      return false;
    }
  }

  async #verifyAuth(isFirst: boolean): Promise<boolean> {
    /**
     * @internal
     * @description 检测Twitch Token是否失效
     * @return true: Token有效 | false: Token失效
    */
    try {
      const logStatus = echoLog({ text: __('verifyingAuth', 'Twitch') });
      const { result, statusText, status, data } = await httpRequest({
        url: 'https://gql.twitch.tv/gql',
        method: 'POST',
        dataType: 'json',
        headers: { Authorization: `OAuth ${this.#auth.authToken}`, 'Client-Id': this.#auth.clientId as string },
        data: (
          '[{"operationName":"FrontPageNew_User","variables":{"limit":1},"extensions":{"persistedQuery":{"version":1,' +
          '"sha256Hash":"64bd07a2cbaca80699d62636d966cf6395a5d14a1f0a14282067dcb28b13eb11"}}}]'
        )
      });
      if (result === 'Success') {
        if (data?.status === 200 && data.response?.[0]?.data?.currentUser) {
          await this.#integrity(isFirst);
          logStatus.success();
          return true;
        }
        logStatus.error(`Error:${data?.statusText}(${data?.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'Twitch.verifyAuth');
      return false;
    }
  }

  async #integrity(isFirst = true, ct = ''): Promise<boolean> {
    /**
     * @internal
     * @description 完整性检查
     * @return true | false
     */
    try {
      const logStatus = echoLog({ text: __('checkingTwitchIntegrity') });
      if (isFirst &&
        (!this.#auth.authToken || !this.#auth.clientId || !this.#auth.clientVersion || !this.#auth.deviceId || !this.#auth.clientSessionId)) {
        return await this.#updateAuth(false);
      }
      const { result, statusText, status, data } = await httpRequest({
        url: 'https://gql.twitch.tv/integrity',
        method: 'POST',
        dataType: 'json',
        anonymous: true,
        headers: {
          Origin: 'https://www.twitch.tv',
          Referer: 'https://www.twitch.tv/',
          Authorization: `OAuth ${this.#auth.authToken}`,
          'Client-Id': this.#auth.clientId as string,
          'Client-Version': this.#auth.clientVersion as string,
          'X-Device-Id': this.#auth.deviceId as string,
          'Client-Session-Id': this.#auth.clientSessionId as string,
          'x-kpsdk-ct': ct
        }
      });
      if (result === 'Success') {
        if (!ct && data?.responseHeaders?.['x-kpsdk-ct']) {
          return await this.#integrity(isFirst, data.responseHeaders['x-kpsdk-ct']);
        }
        if (data?.status === 200 && data.response?.token) {
          this.#integrityToken = data.response.token;
          logStatus.success();
          return true;
        }
        logStatus.error(`Error:${data?.statusText}(${data?.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'Twitch.integrity');
      return false;
    }
  }

  async #updateAuth(isFirst = true): Promise<boolean> {
    /**
     * @internal
     * @description 通过打开Twitch网站更新Token.
     * @return true: 更新Token成功 | false: 更新Token失败
    */
    try {
      const logStatus = echoLog({ text: __('updatingAuth', 'Twitch') });
      return await new Promise((resolve) => {
        const newTab = GM_openInTab('https://www.twitch.tv/#auth',
          { active: true, insert: true, setParent: true });
        newTab.onclose = async () => {
          const auth = GM_getValue<auth>('twitchAuth');
          if (auth) {
            this.#auth = auth;
            logStatus.success();
            resolve(await this.#verifyAuth(isFirst));
          } else {
            logStatus.error('Error: Update twitch auth failed!');
            resolve(false);
          }
        };
      });
    } catch (error) {
      throwError(error as Error, 'Twitch.updateAuth');
      return false;
    }
  }

  async #toggleChannel({ name, doTask = true }: { name: string, doTask: boolean }): Promise<boolean> {
    /**
     * @internal
     * @description 处理Twitch频道任务
     * @param name Twitch频道名
     * @param doTask true: 订阅频道 | false: 退订频道
     * @return true: 成功 | false: 失败
    */
    try {
      if (!doTask && this.whiteList.channels.includes(name)) {
        echoLog({ type: 'whiteList', text: 'Twitch.unfollowChannel', id: name });
        return true;
      }
      const channelId: string | boolean = await this.#getChannelId(name);
      if (!channelId) return false;
      const logStatus = echoLog({ type: `${doTask ? '' : 'un'}followingTwitchChannel`, text: name });
      const followData: string = (
        `[{"operationName":"FollowButton_FollowUser","variables":{"input":{"disableNotifications":false,"targetID":"${channelId}` +
        '"}},"extensions":{"persistedQuery":{"version":1,"sha256Hash":"800e7346bdf7e5278a3c1d3f21b2b56e2639928f86815677a7126b093b2fdd08"}}}]'
      );
      const unfollowData: string = (
        `[{"operationName":"FollowButton_UnfollowUser","variables":{"input":{"targetID":"${channelId}"}},` +
        '"extensions":{"persistedQuery":{"version":1,"sha256Hash":"f7dae976ebf41c755ae2d758546bfd176b4eeb856656098bb40e0a672ca0d880"}}}]'
      );
      const { result, statusText, status, data } = await httpRequest({
        url: 'https://gql.twitch.tv/gql',
        method: 'POST',
        dataType: 'json',
        anonymous: true,
        headers: {
          Origin: 'https://www.twitch.tv',
          Referer: 'https://www.twitch.tv/',
          Authorization: `OAuth ${this.#auth.authToken}`,
          'Client-Id': this.#auth.clientId as string,
          'Client-Version': this.#auth.clientVersion as string,
          'X-Device-Id': this.#auth.deviceId as string,
          'Client-Session-Id': this.#auth.clientSessionId as string,
          'Client-Integrity': this.#integrityToken
        },
        data: doTask ? followData : unfollowData
      });
      if (result === 'Success') {
        if (data?.status === 200 && (data.response?.[0] && !data.response[0].errors)) {
          logStatus.success();
          if (doTask) {
            this.tasks.channels = unique([...this.tasks.channels, name]);
          }
          return true;
        }
        logStatus.error(`Error:${data?.response?.[0].errors?.[0]?.message || `${data?.statusText}(${data?.status})`}`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'Twitch.toggleChannel');
      return false;
    }
  }

  async #getChannelId(name: string): Promise<string | false> {
    /**
     * @internal
     * @description 通过频道名获取频道Id
     * @param name 频道名
     * @return {string}: 获取成功，返回频道Id | false: 获取失败
    */
    try {
      const logStatus = echoLog({ type: 'gettingTwitchChannelId', text: name });
      const channelId = this.#cache[name];
      if (channelId) {
        logStatus.success();
        return channelId;
      }
      const { result, statusText, status, data } = await httpRequest({
        url: 'https://gql.twitch.tv/gql',
        method: 'POST',
        headers: { Authorization: `OAuth ${this.#auth.authToken}`, 'Client-Id': this.#auth.clientId as string },
        responseType: 'json',
        data: (
          `[{"operationName":"ActiveWatchParty","variables":{"channelLogin":"${name}"},` +
          '"extensions":{"persistedQuery":{"version":1,"sha256Hash":"4a8156c97b19e3a36e081cf6d6ddb5dbf9f9b02ae60e4d2ff26ed70aebc80a30"}}}]'
        )
      });
      if (result === 'Success') {
        if (data?.status === 200) {
          const channelId = data.response?.[0]?.data?.user?.id;
          if (channelId) {
            this.#setCache(name, String(channelId));
            logStatus.success();
            return channelId;
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
      throwError(error as Error, 'Twitch.getChannelId');
      return false;
    }
  }

  async toggle({
    doTask = true,
    channelLinks = []
  }: {
    doTask: boolean,
    channelLinks?: Array<string>
  }): Promise<boolean> {
    /**
     * @description 公有方法，统一处理Twitch相关任务
     * @param {boolean} doTask true: 做任务 | false: 取消任务
     * @param {?Array} channelLinks Twitch链接数组。
    */
    try {
      if (!this.#initialized) {
        echoLog({ text: __('needInit') });
        return false;
      }
      const prom = [];
      if (
        (doTask && !globalOptions.doTask.twitch.channels) ||
        (!doTask && !globalOptions.undoTask.twitch.channels)
      ) {
        echoLog({ type: 'globalOptionsSkip', text: 'twitch.channels' });
      } else {
        const realChannels = this.getRealParams('channels', channelLinks, doTask,
          (link) => link.match(/https:\/\/(www\.)?twitch\.tv\/(.+)/)?.[2]);
        if (realChannels.length > 0) {
          for (const channel of realChannels) {
            prom.push(this.#toggleChannel({ name: channel, doTask }));
            await delay(1000);
          }
        }
      }
      // TODO: 返回值处理
      return Promise.all(prom).then(() => true);
    } catch (error) {
      throwError(error as Error, 'Twitch.toggle');
      return false;
    }
  }
  #setCache(name: string, id: string): void {
    /**
     * @internal
     * @description 缓存频道名与频道Id的对应关系
     * @return {void}
    */
    try {
      this.#cache[name] = id;
      GM_setValue('twitchCache', this.#cache);
    } catch (error) {
      throwError(error as Error, 'Twitch.setCache');
    }
  }
}
// unsafeWindow.Twitch = Twitch;
export default Twitch;

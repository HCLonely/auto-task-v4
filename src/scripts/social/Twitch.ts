/*
 * @Author       : HCLonely
 * @Date         : 2021-10-04 10:00:41
 * @LastEditTime : 2021-12-24 17:47:27
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
import globalOptions from '../globalOptions';

const defaultTasks: twitchTasks = { channels: [] };
class Twitch extends Social {
  tasks = { ...defaultTasks };
  whiteList: twitchTasks = GM_getValue<whiteList>('whiteList')?.twitch || { ...defaultTasks }; // eslint-disable-line new-cap
  #auth: auth = GM_getValue<auth>('twitchAuth') || {}; // eslint-disable-line new-cap
  #cache: cache = GM_getValue<cache>('twitchCache') || {}; // eslint-disable-line new-cap
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
      if (!this.#auth.authToken) {
        if (await this.#updateAuth()) {
          this.#initialized = true;
          return true;
        }
        return false;
      }
      const isVerified: boolean = await this.#verifyAuth();
      if (isVerified) {
        echoLog({ html: `<li><font class="success">${__('initSuccess', 'Twitch')}</font></li>` });
        this.#initialized = true;
        return true;
      }
      GM_setValue('twitchAuth', null); // eslint-disable-line new-cap
      if (await this.#updateAuth()) {
        echoLog({ html: `<li><font class="success">${__('initSuccess', 'Twitch')}</font></li>` });
        this.#initialized = true;
        return true;
      }
      echoLog({ html: `<li><font class="success">${__('initFailed', 'Twitch')}</font></li>` });
      return false;
    } catch (error) {
      throwError(error as Error, 'Twitch.init');
      return false;
    }
  }

  async #verifyAuth(): Promise<boolean> {
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

  async #updateAuth(): Promise<boolean> {
    /**
     * @internal
     * @description 通过打开Twitch网站更新Token.
     * @return true: 更新Token成功 | false: 更新Token失败
     */
    try {
      const logStatus = echoLog({ text: __('updatingAuth', 'Twitch') });
      return await new Promise((resolve) => {
        const newTab = GM_openInTab('https://www.twitch.tv/#auth', // eslint-disable-line new-cap
          { active: true, insert: true, setParent: true });
        newTab.onclose = async () => {
          const auth = GM_getValue<auth>('twitchAuth'); // eslint-disable-line new-cap
          if (auth) {
            this.#auth = auth;
            logStatus.success();
            resolve(await this.#verifyAuth());
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
        '"}},"extensions":{"persistedQuery":{"version":1,"sha256Hash":"3efee1acda90efdff9fef6e6b4a29213be3ee490781c5b54469717b6131ffdfe"}}}]'
      );
      const unfollowData: string = (
        `[{"operationName":"FollowButton_UnfollowUser","variables":{"input":{"targetID":"${channelId}"}},` +
        '"extensions":{"persistedQuery":{"version":1,"sha256Hash":"d7fbdb4e9780dcdc0cc1618ec783309471cd05a59584fc3c56ea1c52bb632d41"}}}]'
      );
      const { result, statusText, status, data } = await httpRequest({
        url: 'https://gql.twitch.tv/gql',
        method: 'POST',
        dataType: 'json',
        headers: { Authorization: `OAuth ${this.#auth.authToken}` },
        data: doTask ? followData : unfollowData
      });
      if (result === 'Success') {
        if (data?.status === 200) {
          logStatus.success();
          if (doTask) {
            this.tasks.channels = unique([...this.tasks.channels, name]);
          }
          return true;
        }
        logStatus.error(`Error:${data?.statusText}(${data?.status})`);
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
          const channelId = String(data.response?.[0]?.data?.user?.id);
          if (channelId) {
            this.#setCache(name, channelId);
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
      GM_setValue('twitchCache', this.#cache); // eslint-disable-line new-cap
    } catch (error) {
      throwError(error as Error, 'Twitch.setCache');
    }
  }
}

export default Twitch;

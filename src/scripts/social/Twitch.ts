/*
 * @Author       : HCLonely
 * @Date         : 2021-10-04 10:00:41
 * @LastEditTime : 2021-10-30 21:03:46
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/social/Twitch.ts
 * @Description  : Twitch 关注/取关频道
 */

import Social from './Social';
import echoLog from '../echoLog';
import throwError from '../tools/throwError';
import httpRequest from '../tools/httpRequest';
import { unique, delay } from '../tools/tools';

class Twitch extends Social {
  tasks: twitchTasks;
  whiteList: twitchTasks;

  // TODO: 任务识别
  constructor(id: string) {
    super();
    this.tasks = GM_getValue<twitchTasks>(`Twitch-${id}`) || { channels: [] }; // eslint-disable-line new-cap
    this.whiteList = GM_getValue<whiteList>('whiteList')?.twitch || { channels: [] }; // eslint-disable-line new-cap
    this.auth = GM_getValue<auth>('twitchAuth') || {}; // eslint-disable-line new-cap
  }

  // 通用化,log
  async init(): Promise<boolean> {
    try {
      if (!this.auth.authToken) {
        echoLog({ type: 'updateTwitchAuth' });
        if (await this.updateAuth()) {
          this.initialized = true;
          return true;
        }
        return false;
      }
      const isVerified: boolean = await this.verifyAuth();
      if (isVerified) {
        echoLog({ text: 'Init twitch success!' });
        this.initialized = true;
        return true;
      }
      GM_setValue('twitchAuth', { auth: null }); // eslint-disable-line new-cap
      if (await this.updateAuth()) {
        echoLog({ text: 'Init twitch success!' });
        this.initialized = true;
        return true;
      }
      echoLog({ text: 'Init twitch failed!' });
      return false;
    } catch (error) {
      throwError(error as Error, 'Twitch.init');
      return false;
    }
  }

  async verifyAuth(): Promise<boolean> {
    try {
      const logStatus = echoLog({ type: 'text', text: 'verifyTwitchAuth' });
      const { result, statusText, status, data } = await httpRequest({
        url: 'https://gql.twitch.tv/gql',
        method: 'POST',
        dataType: 'json',
        headers: { Authorization: `OAuth ${this.auth.authToken}`, 'Client-Id': this.auth.clientId as string },
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

  async updateAuth():Promise<boolean> {
    try {
      const logStatus = echoLog({ type: 'text', text: 'updateTwitchAuth' });
      return await new Promise((resolve) => {
        const newTab = GM_openInTab('https://www.twitch.tv/#auth', // eslint-disable-line new-cap
          { active: true, insert: true, setParent: true });
        newTab.onclose = async () => {
          const auth = GM_getValue<auth>('twitchAuth'); // eslint-disable-line new-cap
          if (auth) {
            this.auth = auth;
            logStatus.success();
            resolve(await this.verifyAuth());
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

  async toggleChannel({ name, doTask = true }: { name: string, doTask: boolean }): Promise<boolean> {
    try {
      if (!doTask && this.whiteList.channels.includes(name)) {
        // TODO: 直接echo
        echoLog({ type: 'whiteList', text: name });
        return true;
      }
      const channelId: string | boolean = await this.getChannelId(name);
      if (!channelId) return false;
      const logStatus = echoLog({ type: `${doTask ? '' : 'un'}followTwitchChannel`, text: name });
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
        headers: { Authorization: `OAuth ${this.auth.authToken}` },
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

  async getChannelId(name: string): Promise<string | boolean> {
    try {
      const logStatus = echoLog({ type: 'getTwitchChannelId', text: name });
      const { result, statusText, status, data } = await httpRequest({
        url: 'https://gql.twitch.tv/gql',
        method: 'POST',
        headers: { Authorization: `OAuth ${this.auth.authToken}`, 'Client-Id': this.auth.clientId as string },
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
    channels = [],
    channelLinks = []
  }: {
    doTask: boolean,
    channels: Array<string>,
    channelLinks: Array<string>
  }): Promise<boolean> {
    try {
      if (!this.initialized) {
        echoLog({ type: 'text', text: '请先初始化' });
        return false;
      }
      const prom = [];
      const realChannels = this.getRealParams('channels', channels, channelLinks, doTask,
        (link) => link.match(/https:\/\/www\.twitch\.tv\/(.+)/)?.[1]);
      if (realChannels.length > 0) {
        for (const channel of realChannels) {
          prom.push(this.toggleChannel({ name: channel, doTask }));
          await delay(1000);
        }
      }
      // TODO: 返回值处理
      return Promise.all(prom).then(() => true);
    } catch (error) {
      throwError(error as Error, 'Twitch.toggle');
      return false;
    }
  }
}

export default Twitch;

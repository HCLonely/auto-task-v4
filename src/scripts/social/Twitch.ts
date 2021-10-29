/* eslint-disable import/no-unresolved, import/extensions */
/*
 * @Author       : HCLonely
 * @Date         : 2021-10-04 10:00:41
 * @LastEditTime : 2021-10-28 16:40:38
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/social/Twitch.ts
 * @Description  : Twitch 关注/取关频道
 */

import Social from './Social';
import echoLog from '../echoLog';
import throwError from '../tools/throwError';
import httpRequest from '../tools/httpRequest';
import getI18n from '../i18n/i18n';
import { unique, delay } from '../tools/tools';

declare const commonOptions: {
  headers?: {
    'Client-ID': string
  }
};

class Twitch extends Social {
  // TODO: 任务识别
  constructor(id: string) {
    super();
    this.tasks = GM_getValue<socialTasks>(`Twitch-${id}`) || { channels: [] }; // eslint-disable-line new-cap
    this.whiteList = GM_getValue<whiteList>('whiteList')?.twitch || { channels: [] }; // eslint-disable-line new-cap
    this.auth = GM_getValue<auth>('twitchAuth') || {}; // eslint-disable-line new-cap
  }

  // 通用化,log
  async init(): Promise<boolean> {
    try {
      const isVerified: boolean = await this.verifyToken();
      if (isVerified) {
        echoLog({ text: 'Init twitch success!' });
        return true;
      }
      echoLog({ text: 'Init twitch failed!' });
      return false;
    } catch (error) {
      throwError(error, 'Twitch.init');
      return false;
    }
  }

  async verifyToken(): Promise<boolean> {
    try {
      const logStatus = echoLog({ type: 'text', text: 'verifyTwitchAuth' });
      const { result, statusText, status, data } = await httpRequest({
        url: 'https://gql.twitch.tv/gql',
        method: 'POST',
        dataType: 'json',
        headers: { Authorization: `OAuth ${this.auth.authToken}`, 'Client-Id': this.auth.clientId },
        data: (
          '[{"operationName":"FrontPageNew_User","variables":{"limit":1},"extensions":{"persistedQuery":{"version":1,' +
          '"sha256Hash":"64bd07a2cbaca80699d62636d966cf6395a5d14a1f0a14282067dcb28b13eb11"}}}]'
        )
      });
      if (result === 'Success') {
        if (data.status === 200 && data.response?.[0]?.data?.currentUser) {
          logStatus.success();
          return true;
        }
        logStatus.error(`Error:${data.statusText}(${data.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error, 'Twitch.verifyToken');
      return false;
    }
  }

  // 优化自动更新
  updateToken(notice: boolean): void {
    try {
      const authToken = Cookies.get('auth-token');
      const isLogin = !!Cookies.get('login');
      if (authToken && isLogin) {
        this.auth.authToken = authToken;
        this.auth.clientId = commonOptions?.headers['Client-ID'];
        // GM_setValue('twitchInfo', twitchInfo)
        if (notice) {
          Swal.fire({
            title: getI18n('updateTwitchInfoSuccess'),
            icon: 'success'
          });
        }
      } else {
        if (notice) {
          Swal.fire({
            title: getI18n('needLogin'),
            icon: 'warning'
          });
        }
      }
    } catch (error) {
      throwError(error, 'Twitch.updateToken');
      if (notice) {
        Swal.fire({
          title: getI18n('updateTwitchInfoError'),
          icon: 'error'
        });
      }
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
        if (data.status === 200) {
          logStatus.success();
          if (doTask) {
            this.tasks.channels = unique([...this.tasks.channels, name]);
          }
          return true;
        }
        logStatus.error(`Error:${data.statusText}(${data.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error, 'Twitch.toggleChannel');
      return false;
    }
  }

  async getChannelId(name: string): Promise<string | boolean> {
    try {
      const logStatus = echoLog({ type: 'getTwitchChannelId', text: name });
      const { result, statusText, status, data } = await httpRequest({
        url: 'https://gql.twitch.tv/gql',
        method: 'POST',
        headers: { Authorization: `OAuth ${this.auth.authToken}`, 'Client-Id': this.auth.clientId },
        responseType: 'json',
        data: (
          `[{"operationName":"ActiveWatchParty","variables":{"channelLogin":"${name}"},` +
          '"extensions":{"persistedQuery":{"version":1,"sha256Hash":"4a8156c97b19e3a36e081cf6d6ddb5dbf9f9b02ae60e4d2ff26ed70aebc80a30"}}}]'
        )
      });
      if (result === 'Success') {
        if (data.status === 200) {
          const channelId = String(data.response?.[0]?.data?.user?.id);
          if (channelId) {
            logStatus.success();
            return channelId;
          }
          logStatus.error(`Error:${data.statusText}(${data.status})`);
          return false;
        }
        logStatus.error(`Error:${data.statusText}(${data.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error, 'Twitch.getChannelId');
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
      throwError(error, 'Twitch.toggle');
      return false;
    }
  }
}

export default Twitch;
/*
function updateTwitchInfo(notice) {
  try {
    const authToken = Cookies.get('auth-token')
    const isLogin = !!Cookies.get('login')
    if (authToken && isLogin) {
      twitchInfo.authToken = authToken
      twitchInfo.isLogin = isLogin
      twitchInfo.clientId = commonOptions?.headers['Client-ID']
      twitchInfo.updateTime = new Date().getTime()
      GM_setValue('twitchInfo', twitchInfo)
      if (notice) {
        Swal.fire({
          title: getI18n('updateTwitchInfoSuccess'),
          icon: 'success'
        })
      }
    } else {
      if (notice) {
        Swal.fire({
          title: getI18n('needLogin'),
          icon: 'warning'
        })
      }
    }
  } catch (e) {
    if (debug) console.error(e)
    if (notice) {
      Swal.fire({
        title: getI18n('updateTwitchInfoError'),
        icon: 'error'
      })
    }
  }
}

*/

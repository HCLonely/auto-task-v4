/*
 * @Author       : HCLonely
 * @Date         : 2021-09-30 09:43:32
 * @LastEditTime : 2021-10-29 19:41:40
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/social/Reddit.ts
 * @Description  : Reddit 订阅&取消订阅
 */

import Social from './Social';
import echoLog from '../echoLog';
import throwError from '../tools/throwError';
import httpRequest from '../tools/httpRequest';
import getI18n from '../i18n/i18n';
import { unique, delay } from '../tools/tools';

class Reddit extends Social {
  // TODO: 任务识别
  constructor(id: string) {
    super();
    this.tasks = GM_getValue<socialTasks>(`Reddit-${id}`) || { reddits: [] }; // eslint-disable-line new-cap
    this.whiteList = GM_getValue<whiteList>('whiteList')?.reddit || { reddits: [] }; // eslint-disable-line new-cap
    this.auth = GM_getValue<auth>('redditAuth') || {}; // eslint-disable-line new-cap
  }

  // 通用化
  async init(): Promise<boolean> {
    try {
      const isVerified: boolean = await this.updateToken();
      if (isVerified) {
        echoLog({ text: 'Init reddit success!' });
        return true;
      }
      echoLog({ text: 'Init reddit failed!' });
      return false;
    } catch (error) {
      throwError(error, 'Reddit.init');
      return false;
    }
  }

  async updateToken(): Promise<boolean> {
    try {
      const logStatus = echoLog({ type: 'text', text: 'updateRedditInfo' });
      const { result, statusText, status, data } = await httpRequest({
        url: 'https://www.reddit.com/',
        method: 'GET',
        nochche: true,
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      if (result === 'Success') {
        if (data.status === 200) {
          if (data.responseText.includes('www.reddit.com/login/')) {
            logStatus.error(`Error:${getI18n('loginReddit')}`, true);
            return false;
          }
          const [, accessToken] = data.responseText.match(/"accessToken":"(.*?)","expires":"(.*?)"/) || [];
          if (accessToken) {
            this.auth.token = accessToken;
            logStatus.success();
            return true;
          }
          logStatus.error('Error: Parameter "accessToken" not found!');
          return false;
        }
        logStatus.error(`Error:${data.statusText}(${data.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error, 'Reddit.updateToken');
      return false;
    }
  }

  async toggleTask({ name, doTask = true }: { name: string, doTask: boolean }): Promise<boolean> {
    try {
      if (!doTask && this.whiteList.reddits.includes(name)) {
        // TODO: 直接echo
        echoLog({ type: 'whiteList', text: name });
        return true;
      }
      let type: string = doTask ? 'joinReddit' : 'leaveReddit';
      if (/^u_/.test(name)) {
        type = doTask ? 'followRedditUser' : 'unfollowRedditUser';
      }
      const logStatus = echoLog({ type, text: name });

      const { result, statusText, status, data } = await httpRequest({
        url: 'https://oauth.reddit.com/api/subscribe?redditWebClient=desktop2x&app=desktop2x-client-production&raw_json=1&gilding_detail=1',
        method: 'POST',
        headers: { authorization: `Bearer ${this.auth.token}`, 'content-type': 'application/x-www-form-urlencoded' },
        data: $.param({
          action: doTask ? 'sub' : 'unsub',
          sr_name: name, // eslint-disable-line camelcase
          api_type: 'json' // eslint-disable-line camelcase
        })
      });
      if (result === 'Success') {
        if (data.status === 200) {
          logStatus.success();
          if (doTask) this.tasks.reddits = unique([...this.tasks.reddits, name]);
          return true;
        }
        logStatus.error(`Error:${data.statusText}(${data.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error, 'Reddit.toggleTask');
      return false;
    }
  }

  async toggle({
    doTask = true,
    reddits = [],
    redditLinks = []
  }: {
    doTask: boolean,
    reddits: Array<string>,
    redditLinks: Array<string>
  }): Promise<boolean> {
    try {
      const prom: Array<Promise<boolean>> = [];
      const realReddits: Array<string> = this.getRealParams('reddits', reddits, redditLinks, doTask,
        (link) => {
          const name = link.match(/https?:\/\/www\.reddit\.com\/r\/([^/]*)/)?.[1];
          const userName = link.match(/https?:\/\/www\.reddit\.com\/user\/([^/]*)/)?.[1];
          if (userName) {
            return name || userName;
          }
          return name;
        });
      if (realReddits.length > 0) {
        for (const name of realReddits) {
          prom.push(this.toggleTask({ name, doTask }));
          await delay(1000);
        }
      }
      // TODO: 返回值处理
      return await Promise.all(prom).then(() => true);
    } catch (error) {
      throwError(error, 'Reddit.toggle');
      return false;
    }
  }
}

export default Reddit;

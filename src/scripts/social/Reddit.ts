/*
 * @Author       : HCLonely
 * @Date         : 2021-09-30 09:43:32
 * @LastEditTime : 2022-01-30 11:58:34
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/social/Reddit.ts
 * @Description  : Reddit 订阅&取消订阅
 */

import Social from './Social';
import echoLog from '../echoLog';
import throwError from '../tools/throwError';
import httpRequest from '../tools/httpRequest';
import __ from '../tools/i18n';
import { unique, delay } from '../tools/tools';
import { globalOptions } from '../globalOptions';

const defaultTasksTemplate: redditTasks = { reddits: [] };
const defaultTasks = JSON.stringify(defaultTasksTemplate);
class Reddit extends Social {
  tasks: redditTasks = JSON.parse(defaultTasks);
  whiteList: redditTasks = { ...JSON.parse(defaultTasks), ...GM_getValue<whiteList>('whiteList')?.reddit };
  #auth!: auth;
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
      const isVerified: boolean = await this.#updateAuth();
      if (isVerified) {
        echoLog({}).success(__('initSuccess', 'Reddit'));
        this.#initialized = true;
        return true;
      }
      echoLog({}).error(__('initFailed', 'Reddit'));
      return false;
    } catch (error) {
      throwError(error as Error, 'Reddit.init');
      return false;
    }
  }

  async #useBeta(): Promise<boolean> {
    /**
     * @description: 切换Reddit网站为新版，此脚本使用新版API
     * @return true: 切换成功 | false: 切换失败
     */
    try {
      const logStatus = echoLog({ text: __('changingRedditVersion') });
      GM_setValue('redditAuth', null);
      return await new Promise((resolve) => {
        const newTab = GM_openInTab('https://www.reddit.com/#auth',
          { active: true, insert: true, setParent: true });
        newTab.onclose = async () => {
          logStatus.success();
          resolve(await this.#updateAuth(true));
        };
      });
    } catch (error) {
      throwError(error as Error, 'Reddit.useBeta');
      return false;
    }
  }
  async #updateAuth(beta = false): Promise<boolean> {
    /**
     * @internal
     * @description 通过打开Reddit网站更新Token.
     * @return true: 更新Token成功 | false: 更新Token失败
     */
    try {
      const logStatus = echoLog({ text: __('updatingAuth', 'Reddit') });
      const { result, statusText, status, data } = await httpRequest({
        url: 'https://www.reddit.com/',
        method: 'GET',
        nochche: true,
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      if (result === 'Success') {
        if (data?.responseText.includes('www.reddit.com/login/')) {
          logStatus.error(`Error:${__('loginReddit')}`, true);
          return false;
        }
        if (data?.status === 200) {
          if (data.responseText.includes('redesign-beta-optin-btn') && !beta) {
            return await this.#useBeta();
          }
          const accessToken = data.responseText.match(/"accessToken":"(.*?)","expires":"(.*?)"/)?.[1];
          if (accessToken) {
            this.#auth = { token: accessToken };
            logStatus.success();
            return true;
          }
          logStatus.error('Error: Parameter "accessToken" not found!');
          return false;
        }
        logStatus.error(`Error:${data?.statusText}(${data?.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'Reddit.updateAuth');
      return false;
    }
  }

  async toggleTask({ name, doTask = true }: { name: string, doTask: boolean }): Promise<boolean> {
    /**
     * @internal
     * @description 处理Reddit任务
     * @param name Reddit用户名或版块名
     * @param doTask true: 做任务 | false: 取消任务
     * @return true: 成功 | false: 失败
     */
    try {
      if (!doTask && this.whiteList.reddits.includes(name)) {
        echoLog({ type: 'whiteList', text: 'Reddit.undoTask', id: name });
        return true;
      }
      let type: string = doTask ? 'joiningReddit' : 'leavingReddit';
      if (/^u_/.test(name)) {
        type = doTask ? 'followingRedditUser' : 'unfollowingRedditUser';
      }
      const logStatus = echoLog({ type, text: name });

      const { result, statusText, status, data } = await httpRequest({
        url: 'https://oauth.reddit.com/api/subscribe?redditWebClient=desktop2x&app=desktop2x-client-production&raw_json=1&gilding_detail=1',
        method: 'POST',
        headers: { authorization: `Bearer ${this.#auth.token}`, 'content-type': 'application/x-www-form-urlencoded' },
        data: $.param({
          action: doTask ? 'sub' : 'unsub',
          sr_name: name, // eslint-disable-line camelcase
          api_type: 'json' // eslint-disable-line camelcase
        })
      });
      if (result === 'Success') {
        if (data?.status === 200) {
          logStatus.success();
          if (doTask) this.tasks.reddits = unique([...this.tasks.reddits, name]);
          return true;
        }
        logStatus.error(`Error:${data?.statusText}(${data?.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'Reddit.toggleTask');
      return false;
    }
  }

  async toggle({
    doTask = true,
    redditLinks = []
  }: {
    doTask: boolean,
    redditLinks?: Array<string>
    }): Promise<boolean> {
    /**
     * @description 公有方法，统一处理Reddit相关任务
     * @param {boolean} doTask true: 做任务 | false: 取消任务
     * @param {?Array} redditLinks Reddit链接数组。
     */
    try {
      if (!this.#initialized) {
        echoLog({ text: __('needInit') });
        return false;
      }
      const prom: Array<Promise<boolean>> = [];
      if (
        (doTask && !globalOptions.doTask.reddit.reddits) ||
        (!doTask && !globalOptions.undoTask.reddit.reddits)
      ) {
        echoLog({ type: 'globalOptionsSkip', text: 'reddit.reddits' });
      } else {
        const realReddits: Array<string> = this.getRealParams('reddits', redditLinks, doTask,
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
      }
      // TODO: 返回值处理
      return await Promise.all(prom).then(() => true);
    } catch (error) {
      throwError(error as Error, 'Reddit.toggle');
      return false;
    }
  }
}

export default Reddit;

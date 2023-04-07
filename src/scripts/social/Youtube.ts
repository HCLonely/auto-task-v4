/*
 * @Author       : HCLonely
 * @Date         : 2021-10-04 12:18:06
 * @LastEditTime : 2023-03-20 15:33:15
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/social/Youtube.ts
 * @Description  : Youtube 订阅/取消订阅频道，点赞/取消点赞视频
 */

// eslint-disable-next-line
/// <reference path = "Youtube.d.ts" />

import Social from './Social';
import echoLog from '../echoLog';
import throwError from '../tools/throwError';
import httpRequest from '../tools/httpRequest';
import __ from '../tools/i18n';
import { unique, delay } from '../tools/tools';
import { globalOptions } from '../globalOptions';

const defaultTasksTemplate: youtubeTasks = { channels: [], likes: [] };
const defaultTasks = JSON.stringify(defaultTasksTemplate);

const getInfo = async function (link: string, type: string): Promise <youtubeInfo> {
  /**
   * @internal
   * @description 获取请求参数
   * @param link link
   * @param type 任务类型
   * @return {youtubeInfo}: 获取成功，返回请求参数 | false: 获取失败
  */
  try {
    const logStatus = echoLog({ text: __('gettingYtbToken') });
    const { result, statusText, status, data } = await httpRequest({
      url: link,
      method: 'GET'
    });
    if (result === 'Success') {
      if (data?.status === 200) {
        if (data.responseText.includes('accounts.google.com/ServiceLogin?service=youtube')) {
          logStatus.error(`Error:${__('loginYtb')}`, true);
          return { needLogin: true };
        }
        const apiKey = data.responseText.match(/"INNERTUBE_API_KEY":"(.*?)"/)?.[1];
        const context: string = (
          (
            data.responseText.match(/\(\{"INNERTUBE_CONTEXT":([\w\W]*?)\}\)/) ||
        data.responseText.match(/"INNERTUBE_CONTEXT":([\w\W]*?\}),"INNERTUBE/)
          )?.[1] || '{}'
        );
        const { client, request } = JSON.parse(context);
        if (apiKey && client && request) {
          client.hl = 'en';
          if (type === 'channel') {
            const channelId = data.responseText.match(/<meta itemprop="channelId" content="(.+?)">/)?.[1];
            if (channelId) {
              logStatus.success();
              return { params: { apiKey, client, request, channelId } };
            }
            logStatus.error('Error: Get "channelId" failed!');
            return {};
          } else if (type === 'likeVideo') {
            const videoId = data.responseText.match(/<link rel="shortlinkUrl" href="https:\/\/youtu\.be\/(.*?)">/)?.[1];
            const likeParams = data.responseText.match(/"likeParams":"(.*?)"/)?.[1];
            if (videoId) {
              logStatus.success();
              return { params: { apiKey, client, request, videoId, likeParams } };
            }
            logStatus.error('Error: Get "videoId" failed!');
            return {};
          }
          logStatus.error('Error: Unknown type');
          return {};
        }
        logStatus.error('Error: Parameter "apiKey" not found!');
        return {};
      }
      logStatus.error(`Error:${data?.statusText}(${data?.status})`);
      return {};
    }
    logStatus.error(`${result}:${statusText}(${status})`);
    return {};
  } catch (error) {
    throwError(error as Error, 'Youtube.getInfo');
    return {};
  }
};

class Youtube extends Social {
  tasks: youtubeTasks = JSON.parse(defaultTasks);
  whiteList: youtubeTasks = { ...JSON.parse(defaultTasks), ...GM_getValue<whiteList>('whiteList')?.youtube };
  #auth: auth = GM_getValue<auth>('youtubeAuth') || {};
  #initialized = false;
  #verifyChannel = `https://www.youtube.com/channel/${globalOptions.other.youtubeVerifyChannel}`;

  async init(): Promise<boolean> {
    /**
     * @description: 验证及获取Auth
     * @return true: 初始化完成 | false: 初始化失败，toggle方法不可用
    */
    try {
      if (this.#initialized) {
        return true;
      }
      if (!this.#auth.PAPISID) {
        if (await this.#updateAuth()) {
          this.#initialized = true;
          return true;
        }
        return false;
      }
      const isVerified: boolean = await this.#verifyAuth();
      if (isVerified) {
        echoLog({}).success(__('initSuccess', 'Youtube'));
        this.#initialized = true;
        return true;
      }
      GM_setValue('youtubeAuth', null);
      if (await this.#updateAuth()) {
        echoLog({}).success(__('initSuccess', 'Youtube'));
        this.#initialized = true;
        return true;
      }
      echoLog({}).error(__('initFailed', 'Youtube'));
      return false;
    } catch (error) {
      throwError(error as Error, 'Youtube.init');
      return false;
    }
  }

  async #verifyAuth(): Promise<boolean> {
    /**
     * @internal
     * @description 检测Youtube Token是否失效
     * @return true: Token有效 | false: Token失效
    */
    try {
      return await this.#toggleChannel({ link: this.#verifyChannel, doTask: true, verify: true });
    } catch (error) {
      throwError(error as Error, 'Youtube.verifyAuth');
      return false;
    }
  }
  /*
  async #updateAuth(): Promise<boolean> {
    /**
     * @internal
     * @description 通过打开Youtube网站更新Token.
     * @return true: 更新Token成功 | false: 更新Token失败
    /
    try {
      const logStatus = echoLog({ text: __('updatingAuth', 'Youtube') });
      return await new Promise((resolve) => {
        const newTab = GM_openInTab('https://www.youtube.com/#auth',
          { active: true, insert: true, setParent: true });
        newTab.onclose = async () => {
          const auth = GM_getValue<auth>('youtubeAuth');
          if (auth) {
            this.#auth = auth;
            logStatus.success();
            this.#verifyAuth().then((result) => { resolve(result); });
          } else {
            logStatus.error('Error: Update youtube auth failed!');
            resolve(false);
          }
        };
      });
    } catch (error) {
      throwError(error as Error, 'Discord.updateAuth');
      return false;
    }
  }
  */
  async #updateAuth(): Promise<boolean> {
    /**
     * @internal
     * @description 通过打开Youtube网站更新Token.
     * @return true: 更新Token成功 | false: 更新Token失败
    */
    try {
      const logStatus = echoLog({ text: __('updatingAuth', 'Youtube') });

      const PAPISID: string | undefined = await new Promise((resolve, reject) => {
        // eslint-disable-next-line camelcase
        GM_cookie.list({ url: 'https://www.youtube.com/', name: '__Secure-3PAPISID' }, (cookies, error) => {
          if (error) {
            reject(error);
          }
          resolve(cookies[0]?.value);
        });
      });
      if (PAPISID) {
        GM_setValue('youtubeAuth', { PAPISID });
        this.#auth = { PAPISID };
        logStatus.success();
        return this.#verifyAuth();
      }
      logStatus.error('Error: Update youtube auth failed!');
      return false;
    } catch (error) {
      throwError(error as Error, 'Discord.updateAuth');
      return false;
    }
  }

  #getInfo(link: string, type: string): Promise<youtubeInfo> {
    return getInfo(link, type);
  }

  async #toggleChannel({ link, doTask = true, verify = false }: { link: string, doTask: boolean, verify?: boolean }): Promise<boolean> {
    /**
     * @internal
     * @description 处理Youtube频道任务
     * @param link Youtube频道链接
     * @param doTask true: 订阅频道 | false: 退订频道
     * @param verify true: 用于验证Token | false: 处理频道任务
     * @return true: 成功 | false: 失败
    */
    try {
      const { params, needLogin } = await this.#getInfo(link, 'channel');
      const { apiKey, client, request, channelId } = params || {};

      if (needLogin) {
        echoLog({ html: __('loginYtb') });
        return false;
      }
      if (!(apiKey && client && request && channelId)) {
        echoLog({ text: '"getYtbToken" failed' });
        return false;
      }

      if (!doTask && !verify && this.whiteList.channels.includes(channelId)) {
        echoLog({ type: 'whiteList', text: 'Youtube.unfollowChannel', id: channelId });
        return true;
      }

      const logStatus = verify ?
        echoLog({ text: __('verifyingAuth', 'Youtube') }) :
        echoLog({ type: doTask ? 'followingYtbChannel' : 'unfollowingYtbChannel', text: channelId });
      const nowTime = parseInt(String(new Date().getTime() / 1000), 10);
      const { result, statusText, status, data } = await httpRequest({
        url: `https://www.youtube.com/youtubei/v1/subscription/${doTask ? '' : 'un'}subscribe?key=${apiKey}`,
        method: 'POST',
        headers: {
          origin: 'https://www.youtube.com',
          referer: `https://www.youtube.com/channel/${channelId}`,
          'content-type': 'application/json',
          'x-goog-authuser': '0',
          'x-goog-visitor-id': client?.visitorData,
          'x-origin': 'https://www.youtube.com',
          authorization: `SAPISIDHASH ${nowTime}_${sha1(`${nowTime} ${this.#auth.PAPISID} https://www.youtube.com`)}`
        },
        data: JSON.stringify({
          context: {
            client,
            request: {
              sessionId: request?.sessionId,
              internalExperimentFlags: [],
              consistencyTokenJars: []
            },
            user: {}
          },
          channelIds: [channelId],
          params: doTask ? 'EgIIAhgA' : 'CgIIAhgA'
        })
      });
      if (result === 'Success') {
        if (data?.status === 200) {
          if (
            (
              doTask &&
              (/"subscribed": true/.test(data.responseText) || data.responseText.includes('The subscription already exists'))
            ) || (!doTask && /"subscribed": false/.test(data.responseText))
          ) {
            logStatus.success();
            if (doTask && !verify) {
              this.tasks.channels = unique([...this.tasks.channels, link]);
            }
            return true;
          }
          if (verify && data.responseText.includes('You may not subscribe to yourself')) {
            logStatus.success();
            return true;
          }
          logStatus.error(__('tryUpdateYtbAuth'), true);
          return false;
        }
        logStatus.error(`Error:${data?.statusText}(${data?.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'Youtube.toggleChannel');
      return false;
    }
  }

  async #toggleLikeVideo({ link, doTask = true }: { link: string, doTask: boolean }): Promise<boolean> {
    /**
     * @internal
     * @description 处理Youtube视频点赞任务
     * @param link Youtube视频链接
     * @param doTask true: 点赞 | false: 取消点赞
     * @return true: 成功 | false: 失败
    */
    try {
      const { params, needLogin } = await this.#getInfo(link, 'likeVideo');
      const { apiKey, client, request, videoId, likeParams } = params || {};

      if (needLogin) {
        echoLog({ html: `${__('loginYtb')}` });
        return false;
      }

      if (!(apiKey && client && request && videoId && likeParams)) {
        echoLog({ text: '"getYtbToken" failed' });
        return false;
      }

      if (!doTask && this.whiteList.likes.includes(videoId)) {
        echoLog({ type: 'whiteList', text: 'Youtube.unlikeVideo', id: videoId });
        return true;
      }

      const logStatus = echoLog({ type: doTask ? 'likingYtbVideo' : 'unlikingYtbVideo', text: videoId });
      const nowTime = parseInt(String(new Date().getTime() / 1000), 10);
      const likeVideoData: likeVideoData = {
        context: {
          client,
          request: {
            sessionId: request.sessionId,
            internalExperimentFlags: [],
            consistencyTokenJars: []
          },
          user: {}
        },
        target: {
          videoId
        }
      };
      if (doTask) {
        if (likeParams) {
          likeVideoData.params = likeParams;
        } else {
          logStatus.error('Empty likeParams');
          return false;
        }
      }
      const { result, statusText, status, data } = await httpRequest({
        url: `https://www.youtube.com/youtubei/v1/like/${doTask ? '' : 'remove'}like?key=${apiKey}`,
        method: 'POST',
        headers: {
          origin: 'https://www.youtube.com',
          referer: `https://www.youtube.com/watch?v=${videoId}`,
          'content-type': 'application/json',
          'x-goog-authuser': '0',
          'x-goog-visitor-id': client.visitorData,
          'x-origin': 'https://www.youtube.com',
          authorization: `SAPISIDHASH ${nowTime}_${sha1(`${nowTime} ${this.#auth.PAPISID} https://www.youtube.com`)}`
        },
        data: JSON.stringify(likeVideoData)
      });
      if (result === 'Success') {
        if (data?.status === 200) {
          if (
            (doTask && data.responseText.includes('Added to Liked videos')) ||
            (!doTask &&
              (data.responseText.includes('Removed from Liked videos') || data.responseText.includes('Dislike removed'))
            )
          ) {
            logStatus.success();
            if (doTask) this.tasks.likes = unique([...this.tasks.likes, link]);
            return true;
          }
          logStatus.error(__('tryUpdateYtbAuth'), true);
          return false;
        }
        logStatus.error(`Error:${data?.statusText}(${data?.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'Youtube.toggleLikeVideo');
      return false;
    }
  }

  async toggle({
    doTask = true,
    channelLinks = [],
    videoLinks = []
  }: {
    doTask: boolean,
    channelLinks?: Array<string>,
    videoLinks?: Array<string>
  }): Promise<boolean> {
    /**
     * @description 公有方法，统一处理Youtube相关任务
     * @param {boolean} doTask true: 做任务 | false: 取消任务
     * @param {?Array} channelLinks Youtube频道链接数组。
     * @param {?Array} videoLinks Youtube视频推文链接数组。
    */
    try {
      if (!this.#initialized) {
        echoLog({ text: __('needInit') });
        return false;
      }
      const prom = [];

      if (
        (doTask && !globalOptions.doTask.youtube.channels) ||
        (!doTask && !globalOptions.undoTask.youtube.channels)
      ) {
        echoLog({ type: 'globalOptionsSkip', text: 'youtube.channels' });
      } else {
        const realChannels = this.getRealParams('channels', channelLinks, doTask, (link) => {
          if (/^https:\/\/(www\.)?google\.com.*?\/url\?.*?url=https:\/\/www\.youtube\.com\/.*/.test(link)) {
            return link.match(/url=(https:\/\/www\.youtube\.com\/.*)/)?.[1];
          }
          return link;
        });
        if (realChannels.length > 0) {
          for (const channel of realChannels) {
            prom.push(this.#toggleChannel({ link: channel, doTask }));
            await delay(1000);
          }
        }
      }
      if (
        (doTask && !globalOptions.doTask.youtube.likes) ||
        (!doTask && !globalOptions.undoTask.youtube.likes)
      ) {
        echoLog({ type: 'globalOptionsSkip', text: 'youtube.likes' });
      } else {
        const realLikes = this.getRealParams('likes', videoLinks, doTask, (link) => {
          if (/^https:\/\/(www\.)?google\.com.*?\/url\?.*?url=https:\/\/www\.youtube\.com\/.*/.test(link)) {
            return link.match(/url=(https:\/\/www\.youtube\.com\/.*)/)?.[1];
          }
          return link;
        });
        if (realLikes.length > 0) {
          for (const video of realLikes) {
            prom.push(this.#toggleLikeVideo({ link: video, doTask }));
            await delay(1000);
          }
        }
      }
      // TODO: 返回值处理
      return Promise.all(prom).then(() => true);
    } catch (error) {
      throwError(error as Error, 'Youtube.toggle');
      return false;
    }
  }
}

// Debug
// unsafeWindow.Youtube = Youtube;

export { Youtube, getInfo };

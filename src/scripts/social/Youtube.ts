/*
 * @Author       : HCLonely
 * @Date         : 2021-10-04 12:18:06
 * @LastEditTime : 2021-11-08 13:38:54
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
import getI18n from '../i18n/i18n';
import { unique, delay } from '../tools/tools';

const defaultTasks: youtubeTasks = { channels: [], likes: [] };
class Youtube extends Social {
  tasks = { ...defaultTasks };
  whiteList: youtubeTasks = GM_getValue<whiteList>('whiteList')?.youtube || { ...defaultTasks }; // eslint-disable-line new-cap
  #auth: auth = GM_getValue<auth>('youtubeAuth') || {}; // eslint-disable-line new-cap
  #initialized = false;
  #verifyChannel = 'https://www.youtube.com/channel/UCBR8-60-B28hp2BmDPdntcQ';

  // TODO: 任务识别
  constructor(verifyChannel?: string) {
    super();
    if (verifyChannel) {
      this.#verifyChannel = verifyChannel;
    }
  }

  // 通用化,log
  async init(): Promise<boolean> {
    try {
      if (this.#initialized) {
        return true;
      }
      if (!this.#auth.PAPISID) {
        echoLog({ type: 'updateYoutubeAuth' });
        if (await this.#updateAuth()) {
          this.#initialized = true;
          return true;
        }
        return false;
      }
      const isVerified: boolean = await this.#verifyAuth();
      if (isVerified) {
        echoLog({ text: 'Init youtube success!' });
        this.#initialized = true;
        return true;
      }
      GM_setValue('youtubeAuth', null); // eslint-disable-line new-cap
      if (await this.#updateAuth()) {
        echoLog({ text: 'Init youtube success!' });
        this.#initialized = true;
        return true;
      }
      echoLog({ text: 'Init youtube failed!' });
      return false;
    } catch (error) {
      throwError(error as Error, 'Youtube.init');
      return false;
    }
  }

  async #verifyAuth(): Promise<boolean> {
    try {
      return await this.#toggleChannel({ link: this.#verifyChannel, doTask: true, verify: true });
    } catch (error) {
      throwError(error as Error, 'Youtube.verifyAuth');
      return false;
    }
  }
  async #updateAuth(): Promise<boolean> {
    try {
      const logStatus = echoLog({ type: 'text', text: 'updateYoutubeAuth' });
      return await new Promise((resolve) => {
        const newTab = GM_openInTab('https://www.youtube.com/#auth', // eslint-disable-line new-cap
          { active: true, insert: true, setParent: true });
        newTab.onclose = async () => {
          const auth = GM_getValue<auth>('youtubeAuth'); // eslint-disable-line new-cap
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

  async #getInfo(link: string, type: string): Promise<youtubeInfo> {
    try {
      const logStatus = echoLog({ type: 'text', text: 'getYtbToken' });
      const { result, statusText, status, data } = await httpRequest({
        url: link,
        method: 'GET'
      });
      if (result === 'Success') {
        if (data?.status === 200) {
          if (data.responseText.includes('accounts.google.com/ServiceLogin?service=youtube')) {
            logStatus.error(`Error:${getI18n('loginYtb')}`, true);
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
  }

  async #toggleChannel({ link, doTask = true, verify = false }: { link: string, doTask: boolean, verify?: boolean }): Promise<boolean> {
    try {
      const { params, needLogin } = await this.#getInfo(link, 'channel');
      const { apiKey, client, request, channelId } = params || {};

      if (needLogin) {
        echoLog({ type: 'custom', text: getI18n('loginYtb') });
        return false;
      }
      if (!(apiKey && client && request && channelId)) {
        echoLog({ type: 'custom', text: '"getYtbToken" failed' });
        return false;
      }

      if (!doTask && !verify && this.whiteList.channels.includes(channelId)) {
        // TODO: 直接echo
        echoLog({ type: 'whiteList', text: channelId });
        return true;
      }

      const logStatus = verify ?
        echoLog({ type: 'text', text: 'verifyYoutubeAuth' }) :
        echoLog({ type: doTask ? 'followYtbChannel' : 'unfollowYtbChannel', text: channelId });
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
          logStatus.error(getI18n('tryUpdateYtbAuth'), true);
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
    try {
      const { params, needLogin } = await this.#getInfo(link, 'likeVideo');
      const { apiKey, client, request, videoId, likeParams } = params || {};

      if (needLogin) {
        echoLog({ type: 'text', text: `${getI18n('loginYtb')}` });
        return false;
      }

      if (!(apiKey && client && request && videoId && likeParams)) {
        echoLog({ type: 'text', text: '"getYtbToken" failed' });
        return false;
      }

      if (!doTask && this.whiteList.likes.includes(videoId)) {
        // TODO: 直接echo
        echoLog({ type: 'whiteList', text: link });
        return true;
      }

      const logStatus = echoLog({ type: doTask ? 'likeYtbVideo' : 'unlikeYtbVideo', text: videoId });
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
          logStatus.error(getI18n('tryUpdateYtbAuth'), true);
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
    try {
      if (!this.#initialized) {
        echoLog({ type: 'text', text: '请先初始化' });
        return false;
      }
      const prom = [];
      const realChannels = this.getRealParams('channels', channelLinks, doTask, (link) => {
        if (/^https:\/\/www\.google\.com.*?\/url\?.*?url=https:\/\/www.youtube.com\/.*/.test(link)) {
          return link.match(/url=(https:\/\/www.youtube.com\/.*)/)?.[1];
        }
        return link;
      });
      const realLikes = this.getRealParams('likes', videoLinks, doTask, (link) => {
        if (/^https:\/\/www\.google\.com.*?\/url\?.*?url=https:\/\/www.youtube.com\/.*/.test(link)) {
          return link.match(/url=(https:\/\/www.youtube.com\/.*)/)?.[1];
        }
        return link;
      });
      if (realChannels.length > 0) {
        for (const channel of realChannels) {
          prom.push(this.#toggleChannel({ link: channel, doTask }));
          await delay(1000);
        }
      }
      if (realLikes.length > 0) {
        for (const video of realLikes) {
          prom.push(this.#toggleLikeVideo({ link: video, doTask }));
          await delay(1000);
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
export default Youtube;

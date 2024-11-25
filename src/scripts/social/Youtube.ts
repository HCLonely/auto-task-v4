/*
 * @Author       : HCLonely
 * @Date         : 2021-10-04 12:18:06
 * @LastEditTime : 2022-02-06 11:50:05
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

/**
 * 获取YouTube视频或频道的信息。
 *
 * @async
 * @function getInfo
 * @param {string} link - 要请求的YouTube链接。
 * @param {string} type - 任务类型，可能的值包括'channel'和'likeVideo'。
 * @returns {Promise<youtubeInfo>} - 返回一个Promise，表示获取操作的结果。
 *                                   - {youtubeInfo}: 获取成功，返回请求参数
 *                                   - false: 获取失败
 *
 * @description
 * 该函数通过发送GET请求到指定的YouTube链接来获取相关信息。
 * 如果请求成功且返回状态为200，则解析响应文本以提取所需的参数。
 * 根据任务类型，分别处理频道ID或视频ID的获取。
 * 如果在获取过程中发生错误，将记录错误信息并返回空对象。
 */
const getInfo = async function (link: string, type: string): Promise<youtubeInfo> {
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
            const channelId = data.responseText.match(/"channelId":"(.+?)"/)?.[1];
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

/**
 * @class Youtube
 * @extends Social
 * @description 处理YouTube相关的任务，包括订阅/取消订阅频道和点赞/取消点赞视频。
 *
 * @property {youtubeTasks} tasks - 存储当前的YouTube任务信息，包括频道和点赞数组。
 * @property {youtubeTasks} whiteList - 存储白名单任务信息。
 * @private
 * @property {auth} #auth - 存储YouTube的身份验证信息。
 * @private
 * @property {boolean} #initialized - 表示YouTube模块是否已初始化。
 * @private
 * @property {string} #verifyChannel - 用于验证频道的URL。
 *
 * @constructor
 * @description 创建一个Youtube实例，初始化任务模板和白名单。
 *
 * @async
 * @function init
 * @returns {Promise<boolean>} - 返回初始化结果，true表示成功，false表示失败。
 *
 * @async
 * @function #verifyAuth
 * @returns {Promise<boolean>} - 验证身份验证Token的有效性，true表示有效，false表示无效。
 *
 * @async
 * @function #updateAuth
 * @returns {Promise<boolean>} - 更新身份验证Token，true表示成功，false表示失败。
 *
 * @async
 * @function #getInfo
 * @param {string} link - 要获取信息的YouTube链接。
 * @param {string} type - 请求的信息类型，可能的值包括'video'和'channel'。
 * @returns {Promise<youtubeInfo>} - 返回获取操作的结果，成功返回信息，失败返回false。
 *
 * @async
 * @function #toggleChannel
 * @param {Object} options - 选项对象。
 * @param {string} options.link - 要处理的YouTube频道链接。
 * @param {boolean} [options.doTask=true] - 是否执行任务，true表示关注，false表示退订。
 * @param {boolean} [options.verify=false] - 是否用于验证Token。
 * @returns {Promise<boolean>} - 返回操作结果，true表示成功，false表示失败。
 *
 * @async
 * @function #toggleLikeVideo
 * @param {Object} options - 选项对象。
 * @param {string} options.link - 要点赞的YouTube视频链接。
 * @param {boolean} [options.doTask=true] - 是否执行任务，true表示点赞，false表示取消点赞。
 * @returns {Promise<boolean>} - 返回操作结果，true表示成功，false表示失败。
 *
 * @async
 * @function toggle
 * @param {Object} options - 选项对象。
 * @param {boolean} [options.doTask=true] - 是否执行任务，true表示执行，false表示取消。
 * @param {Array<string>} [options.channelLinks=[]] - YouTube频道链接数组。
 * @param {Array<string>} [options.videoLinks=[]] - YouTube视频链接数组。
 * @returns {Promise<boolean>} - 返回操作结果，true表示成功，false表示失败。
 */
class Youtube extends Social {
  tasks: youtubeTasks;
  whiteList: youtubeTasks;
  #auth: auth = GM_getValue<auth>('youtubeAuth') || {};
  #initialized = false;
  #verifyChannel = `https://www.youtube.com/channel/${globalOptions.other.youtubeVerifyChannel}`;

  /**
   * 创建一个Youtube实例。
   *
   * @constructor
   * @description
   * 此构造函数初始化Youtube类的实例，设置默认任务模板和白名单。
   * 默认任务模板包含空的频道和点赞数组，用于存储Youtube相关的任务信息。
   * 白名单将从GM_getValue中获取，如果没有找到，则使用默认任务模板。
   */
  constructor() {
    super();
    const defaultTasksTemplate: youtubeTasks = {
      channels: [], likes: []
    };
    this.tasks = defaultTasksTemplate;
    this.whiteList = { ...defaultTasksTemplate, ...(GM_getValue<whiteList>('whiteList')?.youtube || {}) };
  }

  /**
   * 初始化Youtube模块，验证用户身份并获取授权。
   *
   * @async
   * @function init
   * @returns {Promise<boolean>} - 返回一个Promise，表示初始化的结果。
   *                              - true: 初始化成功
   *                              - false: 初始化失败，toggle方法不可用
   *
   * @description
   * 该方法首先检查模块是否已初始化。如果已初始化，则直接返回true。
   * 然后检查身份验证信息是否完整。如果不完整，则调用`#updateAuth`方法获取新的授权信息。
   * 如果身份验证成功，则记录成功日志并将初始化状态设置为true。
   * 如果身份验证失败，则清除存储的身份验证信息，并尝试再次更新授权。
   * 如果在执行过程中发生错误，将抛出错误并返回false。
   */
  async init(): Promise<boolean> {
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
  /**
 * 验证Youtube的身份验证Token是否有效。
 *
 * @async
 * @function #verifyAuth
 * @returns {Promise<boolean>} - 返回一个Promise，表示Token验证的结果。
 *                              - true: Token有效
 *                              - false: Token失效
 *
 * @description
 * 该方法通过调用`#toggleChannel`方法来检测Token的有效性。
 * 如果调用成功且返回结果为true，则表示Token有效；如果发生错误，则记录错误信息并返回false。
 * 如果在执行过程中发生错误，将抛出错误并返回false。
 */
  async #verifyAuth(): Promise<boolean> {
    try {
      return await this.#toggleChannel({ link: this.#verifyChannel, doTask: true, verify: true });
    } catch (error) {
      throwError(error as Error, 'Youtube.verifyAuth');
      return false;
    }
  }

  /**
   * 更新Youtube的身份验证Token。
   *
   * @async
   * @function #updateAuth
   * @returns {Promise<boolean>} - 返回一个Promise，表示更新操作的结果。
   *                              - true: 更新Token成功
   *                              - false: 更新Token失败
   *
   * @description
   * 该方法通过获取Youtube网站的cookie来更新Token。
   * 如果成功获取到`__Secure-3PAPISID`的值，则将其存储在`youtubeAuth`中，并更新内部的`#auth`属性。
   * 如果用户未登录，则记录错误信息并返回false。
   * 如果在执行过程中发生错误，将抛出错误并返回false。
   */
  async #updateAuth(): Promise<boolean> {
    try {
      const logStatus = echoLog({ text: __('updatingAuth', 'Youtube') });
      return await new Promise((resolve) => {
        // eslint-disable-next-line camelcase
        GM_cookie.list({ url: 'https://www.youtube.com/@YouTube' }, async (cookies, error) => {
          if (!error) {
            const PAPISID = cookies.find((cookie) => cookie.name === '__Secure-3PAPISID')?.value;

            if (PAPISID) {
              GM_setValue('youtubeAuth', { PAPISID });
              this.#auth = { PAPISID };
              logStatus.success();
              resolve(await this.#verifyAuth());
            } else {
              logStatus.error(__('needLogin'));
              resolve(false);
            }
          } else {
            logStatus.error('Error: Update youtube auth failed!');
            resolve(false);
          }
        });
        /*
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
        */
      });
    } catch (error) {
      throwError(error as Error, 'Youtube.updateAuth');
      return false;
    }
  }

  /**
   * 获取指定YouTube链接的信息。
   *
   * @async
   * @function #getInfo
   * @param {string} link - 要获取信息的YouTube链接。
   * @param {string} type - 请求的信息类型，可能的值包括'video'和'channel'。
   * @returns {Promise<youtubeInfo>} - 返回一个Promise，表示获取操作的结果。
   *                                   - {youtubeInfo}: 获取成功，返回请求参数
   *                                   - false: 获取失败
   *
   * @description
   * 该方法调用外部的`getInfo`函数来获取指定YouTube链接的信息。
   * 如果获取成功，则返回相应的信息；如果获取失败，则返回false。
   * 在获取过程中，如果发生错误，将抛出错误并返回false。
   */
  #getInfo(link: string, type: string): Promise<youtubeInfo> {
    return getInfo(link, type);
  }

  /**
   * 切换YouTube频道的订阅状态，关注或退订指定的频道。
   *
   * @async
   * @function #toggleChannel
   * @param {Object} options - 选项对象。
   * @param {string} options.link - 要处理的YouTube频道链接。
   * @param {boolean} [options.doTask=true] - 指示是否执行任务，true表示关注频道，false表示退订频道。
   * @param {boolean} [options.verify=false] - 指示是否用于验证Token，true表示验证，false表示处理频道任务。
   * @returns {Promise<boolean>} - 返回一个Promise，表示操作的结果。
   *                              - true: 操作成功
   *                              - false: 操作失败
   *
   * @description
   * 该方法根据传入的参数处理YouTube频道的关注或退订任务。
   * 如果需要登录，则显示登录提示并返回false。
   * 如果获取频道信息失败，则记录错误信息并返回false。
   * 根据`doTask`的值构建相应的请求数据，并发送POST请求到YouTube API。
   * 如果请求成功且返回结果为'Success'，并且状态码为200，则记录成功日志并更新任务列表。
   * 如果请求失败或返回的状态不符合预期，则记录错误信息并返回false。
   * 如果在执行过程中发生错误，将抛出错误并返回false。
   */
  async #toggleChannel({ link, doTask = true, verify = false }: { link: string, doTask: boolean, verify?: boolean }): Promise<boolean> {
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
        url: `https://www.youtube.com/youtubei/v1/subscription/${doTask ? '' : 'un'}subscribe?key=${apiKey}&prettyPrint=false`,
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
              (/"subscribed":true/.test(data.responseText) || data.responseText.includes('The subscription already exists'))
            ) || (!doTask && /"subscribed":false/.test(data.responseText))
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

  /**
   * 处理YouTube视频的点赞任务。
   *
   * @async
   * @function #toggleLikeVideo
   * @param {Object} options - 选项对象。
   * @param {string} options.link - 要点赞的YouTube视频链接。
   * @param {boolean} [options.doTask=true] - 指示是否执行任务，true表示点赞，false表示取消点赞。
   * @returns {Promise<boolean>} - 返回一个Promise，表示操作的结果。
   *                              - true: 操作成功
   *                              - false: 操作失败
   *
   * @description
   * 该方法根据传入的参数处理YouTube视频的点赞或取消点赞任务。
   * 首先调用`#getInfo`方法获取视频信息，如果需要登录，则提示用户登录并返回false。
   * 如果获取信息失败或参数不完整，则记录错误信息并返回false。
   * 根据`doTask`的值构建相应的请求数据，并发送POST请求到YouTube API。
   * 如果请求成功且返回结果为'Success'，并且状态码为200，则记录成功日志并更新任务列表。
   * 如果请求失败或返回的状态不符合预期，则记录错误信息并返回false。
   * 如果在执行过程中发生错误，将抛出错误并返回false。
   */
  async #toggleLikeVideo({ link, doTask = true }: { link: string, doTask: boolean }): Promise<boolean> {
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

  /**
   * 统一处理YouTube相关任务，关注或取消关注指定的频道和视频。
   *
   * @async
   * @function toggle
   * @param {Object} options - 选项对象。
   * @param {boolean} [options.doTask=true] - 指示是否执行任务，true表示执行，false表示取消。
   * @param {Array<string>} [options.channelLinks=[]] - YouTube频道链接数组。
   * @param {Array<string>} [options.videoLinks=[]] - YouTube视频链接数组。
   * @returns {Promise<boolean>} - 返回一个Promise，表示操作的结果。
   *                              - true: 操作成功
   *                              - false: 操作失败
   *
   * @description
   * 该方法根据传入的参数处理YouTube相关任务。
   * 首先检查模块是否已初始化，如果未初始化，则返回false。
   * 根据`doTask`和全局选项判断是否执行频道关注或取消关注的任务。
   * 如果执行任务，则获取实际的频道参数，并逐个处理关注或取消关注操作。
   * 同样处理视频的点赞或取消点赞操作。
   * 最后返回所有操作的结果，如果在执行过程中发生错误，将抛出错误并返回false。
   */
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
      return Promise.all(prom).then(() => true);
    } catch (error) {
      throwError(error as Error, 'Youtube.toggle');
      return false;
    }
  }
}
export { Youtube, getInfo };

/* eslint-disable new-cap */
/*
 * @Author       : HCLonely
 * @Date         : 2021-10-04 16:07:55
 * @LastEditTime : 2024-11-12 20:38:21
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-v4/src/scripts/social/Steam.ts
 * @Description  : steam相关功能
 */
// eslint-disable-next-line
/// <reference path = "Steam.d.ts" />

import Social from './Social';
import echoLog from '../echoLog';
import throwError from '../tools/throwError';
import httpRequest from '../tools/httpRequest';
import __ from '../tools/i18n';
import { unique, delay } from '../tools/tools';
import { globalOptions } from '../globalOptions';
import SteamASF from './SteamASF';

/**
 * Steam类用于处理与Steam相关的功能，包括身份验证、加入/退出组、管理愿望单、关注游戏等操作。
 *
 * @class Steam
 * @extends Social
 *
 * @property {steamTasks} tasks - 存储Steam相关的任务信息。
 * @property {steamTasks} whiteList - 存储白名单中的任务信息。
 * @property {steamCache} #cache - 存储Steam相关的缓存信息。
 * @property {auth} #auth - 存储身份验证信息。
 * @property {boolean} #storeInitialized - 标记Steam商店是否已初始化。
 * @property {boolean} #communityInitialized - 标记Steam社区是否已初始化。
 * @property {string} #area - 当前地区的代码。
 * @property {string} #areaStatus - 当前地区状态。
 * @property {SteamASF} #ASF - 存储ASF实例。
 *
 * @method init 初始化Steam模块，验证及获取身份验证信息。
 * @param {string} [type='all'] - 初始化类型，默认为'all'。可选值包括'store'和'community'。
 * @returns {Promise<boolean>} - 返回一个Promise，表示初始化是否成功。
 * @throws {Error} - 如果在初始化过程中发生错误，将抛出错误。
 *
 * @method #refreshToken 刷新Steam的身份验证令牌。
 * @param {('steamStore' | 'steamCommunity')} type - 指定要刷新令牌的类型，默认为'steamStore'。
 * @returns {Promise<boolean>} - 返回一个Promise，表示刷新操作的结果。
 * @throws {Error} - 如果在刷新过程中发生错误，将抛出错误。
 *
 * @method #setStoreToken 设置Steam商店或社区的Token。
 * @param {storeTokenParam} param - 包含设置Token所需的参数。
 * @param {('steamStore' | 'steamCommunity')} type - 指定Token类型，可以是'steamStore'或'steamCommunity'。
 * @returns {Promise<boolean>} - 返回一个Promise，表示设置Token的结果。
 * @throws {Error} - 如果在设置Token过程中发生错误，将抛出错误。
 *
 * @method #updateStoreAuth 更新Steam商店的身份验证Token。
 * @param {boolean} [retry=false] - 是否为重试操作，默认为false。
 * @returns {Promise<boolean>} - 返回一个Promise，表示更新Token的结果。
 * @throws {Error} - 如果在更新过程中发生错误，将抛出错误。
 *
 * @method #updateStoreAuthTab 更新Steam商店的身份验证标签页。
 * @returns {Promise<boolean>} - 返回一个Promise，表示更新操作的结果。
 * @throws {Error} - 如果在更新过程中发生错误，将抛出错误。
 *
 * @method #updateCommunityAuthTab 更新Steam社区的身份验证标签页。
 * @returns {Promise<boolean>} - 返回一个Promise，表示更新操作的结果。
 * @throws {Error} - 如果在更新过程中发生错误，将抛出错误。
 *
 * @method #getUserLink 获取Steam用户链接并更新Steam社区的身份验证信息。
 * @param {boolean} [retry=false] - 是否为重试请求，默认为false。
 * @returns {Promise<boolean>} - 返回一个Promise，表示获取用户链接的结果。
 * @throws {Error} - 如果在获取过程中发生错误，将抛出错误。
 *
 * @method #updateCommunityAuth 更新Steam社区的身份验证信息。
 * @param {string} url - 要请求的Steam社区URL。
 * @returns {Promise<boolean>} - 返回一个Promise，表示更新操作的结果。
 * @throws {Error} - 如果在更新过程中发生错误，将抛出错误。
 *
 * @method #getAreaInfo 获取当前购物车地区及可更换的地区。
 * @returns {Promise<areas>} - 返回一个Promise，包含当前地区和可更换地区的信息。
 * @throws {Error} - 如果在获取过程中发生错误，将抛出错误。
 *
 * @method #changeArea 更换Steam的地区。
 * @param {string} [area] - 目标地区的代码，如果未提供，则自动获取可用地区。
 * @returns {Promise<boolean | string>} - 返回一个Promise，表示更换地区的结果。
 * @throws {Error} - 如果在更换过程中发生错误，将抛出错误。
 *
 * @method #joinGroup 加入指定的Steam组。
 * @param {string} groupName - 要加入的Steam组的名称。
 * @returns {Promise<boolean>} - 返回一个Promise，表示加入操作的结果。
 * @throws {Error} - 如果在加入过程中发生错误，将抛出错误。
 *
 * @method #leaveGroup 退出指定的Steam组。
 * @param {string} groupName - 要退出的Steam组的名称。
 * @returns {Promise<boolean>} - 返回一个Promise，表示退出操作的结果。
 * @throws {Error} - 如果在退出过程中发生错误，将抛出错误。
 *
 * @method #getGroupId 获取指定Steam组的ID。
 * @param {string} groupName - 要获取ID的Steam组名称。
 * @returns {Promise<false | string>} - 返回一个Promise，表示获取操作的结果。
 * @throws {Error} - 如果在获取过程中发生错误，将抛出错误。
 *
 * @method #joinOfficialGroup 加入指定的Steam官方组。
 * @param {string} gameId - 要加入的Steam游戏的ID。
 * @returns {Promise<boolean>} - 返回一个Promise，表示加入操作的结果。
 * @throws {Error} - 如果在加入过程中发生错误，将抛出错误。
 *
 * @method #leaveOfficialGroup 退出指定的Steam官方组。
 * @param {string} gameId - 要退出的Steam游戏的ID。
 * @returns {Promise<boolean>} - 返回一个Promise，表示退出操作的结果。
 * @throws {Error} - 如果在退出过程中发生错误，将抛出错误。
 *
 * @method #getOfficialGroupId 获取指定Steam游戏的官方组ID。
 * @param {string} gameId - Steam游戏的ID。
 * @returns {Promise<false | string>} - 返回一个Promise，表示获取操作的结果。
 * @throws {Error} - 如果在获取过程中发生错误，将抛出错误。
 *
 * @method #addToWishlist 将指定的游戏添加到Steam的愿望单。
 * @param {string} gameId - Steam游戏的AppId。
 * @returns {Promise<boolean>} - 返回一个Promise，表示添加操作的结果。
 * @throws {Error} - 如果在添加过程中发生错误，将抛出错误。
 *
 * @method #removeFromWishlist 从Steam愿望单移除游戏。
 * @param {string} gameId - Steam游戏的AppId。
 * @returns {Promise<boolean>} - 返回一个Promise，表示移除操作的结果。
 * @throws {Error} - 如果在移除过程中发生错误，将抛出错误。
 *
 * @method #toggleFollowGame 关注或取关指定的Steam游戏。
 * @param {string} gameId - Steam游戏的AppId。
 * @param {boolean} doTask - true表示关注游戏，false表示取关游戏。
 * @returns {Promise<boolean>} - 返回一个Promise，表示操作的结果。
 * @throws {Error} - 如果在操作过程中发生错误，将抛出错误。
 *
 * @method #isFollowedGame 判断指定的Steam游戏是否已被关注。
 * @param {string} gameId - Steam游戏的AppId。
 * @returns {Promise<boolean | 'areaLocked'>} - 返回一个Promise，表示关注状态。
 * @throws {Error} - 如果在判断过程中发生错误，将抛出错误。
 *
 * @method #toggleForum 订阅或取消订阅Steam论坛。
 * @param {string} gameId - Steam游戏的AppId。
 * @param {boolean} [doTask=true] - true表示订阅论坛，false表示取消订阅论坛。
 * @returns {Promise<boolean>} - 返回一个Promise，表示操作的结果。
 * @throws {Error} - 如果在操作过程中发生错误，将抛出错误。
 *
 * @method #getForumId 获取指定Steam游戏的论坛ID。
 * @param {string} gameId - Steam游戏的AppId。
 * @returns {Promise<false | string>} - 返回一个Promise，表示获取操作的结果。
 * @throws {Error} - 如果在获取过程中发生错误，将抛出错误。
 *
 * @method #toggleFavoriteWorkshop 收藏或取消收藏指定的Steam创意工坊物品。
 * @param {string} id - 创意工坊物品的ID。
 * @param {boolean} [doTask=true] - true表示收藏物品，false表示取消收藏物品。
 * @returns {Promise<boolean>} - 返回一个Promise，表示操作的结果。
 * @throws {Error} - 如果在操作过程中发生错误，将抛出错误。
 *
 * @method #getWorkshopAppId 获取创意工坊物品的AppId。
 * @param {string} id - 创意工坊物品的ID。
 * @returns {Promise<false | string>} - 返回一个Promise，表示获取操作的结果。
 * @throws {Error} - 如果在获取过程中发生错误，将抛出错误。
 *
 * @method #voteUpWorkshop 点赞创意工坊物品。
 * @param {string} id - 创意工坊物品的ID。
 * @returns {Promise<boolean>} - 返回一个Promise，表示点赞操作的结果。
 * @throws {Error} - 如果在点赞过程中发生错误，将抛出错误。
 *
 * @method #toggleCurator 关注或取关指定的Steam鉴赏家、开发商或发行商。
 * @param {string} curatorId - 鉴赏家的ID。
 * @param {boolean} [doTask=true] - true表示关注，false表示取关。
 * @returns {Promise<boolean>} - 返回一个Promise，表示操作的结果。
 * @throws {Error} - 如果在操作过程中发生错误，将抛出错误。
 *
 * @method getCuratorId 获取Steam开发商或发行商的鉴赏家ID。
 * @param {string} path - 鉴赏家的类型（如开发商或发行商）。
 * @param {string} name - 鉴赏家的名称。
 * @returns {Promise<false | string>} - 返回一个Promise，表示获取操作的结果。
 * @throws {Error} - 如果在获取过程中发生错误，将抛出错误。
 *
 * @method #toggleCuratorLike 处理Steam鉴赏家的点赞或取关操作。
 * @param {string} link - 鉴赏家的链接，包含类型和名称，以'/'分隔。
 * @param {boolean} [doTask=true] - true表示关注，false表示取关，默认为true。
 * @returns {Promise<boolean>} - 返回一个Promise，表示操作的结果。
 * @throws {Error} - 如果在处理过程中发生错误，将抛出错误。
 *
 * @method #getAnnouncementParams 获取Steam通知所需的参数。
 * @param {string} appId - Steam游戏的AppId。
 * @param {string} viewId - Steam通知的ID。
 * @returns {Promise<announcementParams | {}>} - 返回一个Promise，表示获取操作的结果。
 * @throws {Error} - 如果在获取过程中发生错误，将抛出错误。
 *
 * @method #likeAnnouncement 点赞Steam通知。
 * @param {string} id - Steam游戏的AppId和Steam通知的ID，以'/'分隔。
 * @returns {Promise<boolean>} - 返回一个Promise，表示点赞操作的结果。
 * @throws {Error} - 如果在点赞过程中发生错误，将抛出错误。
 *
 * @method #appid2subid 将Steam游戏的AppId转换为SubId。
 * @param {string} id - Steam游戏的AppId。
 * @returns {Promise<string | false>} - 返回一个Promise，表示转换操作的结果。
 * @throws {Error} - 如果在转换过程中发生错误，将抛出错误。
 *
 * @method #getLicenses 获取Steam用户的许可证信息。
 * @returns {Promise<Array<number> | false>} - 返回一个Promise，表示获取操作的结果。
 * @throws {Error} - 如果在获取过程中发生错误，将抛出错误。
 *
 * @method #addLicense 添加Steam许可证。
 * @param {string} id - 要添加的许可证ID，格式为'appid-xxxx'或'subid-xxxx,xxxx'。
 * @returns {Promise<boolean>} - 返回一个Promise，表示添加操作的结果。
 * @throws {Error} - 如果在添加过程中发生错误，将抛出错误。
 *
 * @method #addFreeLicense 添加免费Steam游戏许可证。
 * @param {string} id - Steam游戏的subid。
 * @param {logStatus} [logStatusPre] - 可选的日志状态，用于记录操作状态。
 * @returns {Promise<boolean>} - 返回一个Promise，表示添加操作的结果。
 * @throws {Error} - 如果在添加过程中发生错误，将抛出错误。
 *
 * @method #requestPlayTestAccess 请求Steam游戏的试玩访问权限。
 * @param {string} id - Steam游戏的AppId。
 * @returns {Promise<boolean>} - 返回一个Promise，表示请求操作的结果。
 * @throws {Error} - 如果在请求过程中发生错误，将抛出错误。
 *
 * @method toggle 切换Steam相关任务的执行状态。
 * @param {Object} options - 任务选项对象。
 * @param {boolean} [options.doTask=true] - true表示执行任务，false表示取消任务。
 * @param {Array<string>} [options.groupLinks=[]] - 需要处理的Steam群组链接数组。
 * @param {Array<string>} [options.officialGroupLinks=[]] - 需要处理的官方群组链接数组。
 * @param {Array<string>} [options.wishlistLinks=[]] - 需要处理的愿望清单链接数组。
 * @param {Array<string>} [options.followLinks=[]] - 需要处理的关注链接数组。
 * @param {Array<string>} [options.forumLinks=[]] - 需要处理的论坛链接数组。
 * @param {Array<string>} [options.workshopLinks=[]] - 需要处理的创意工坊链接数组。
 * @param {Array<string>} [options.workshopVoteLinks=[]] - 需要处理的创意工坊投票链接数组。
 * @param {Array<string>} [options.curatorLinks=[]] - 需要处理的鉴赏家链接数组。
 * @param {Array<string>} [options.curatorLikeLinks=[]] - 需要处理的鉴赏家点赞链接数组。
 * @param {Array<string>} [options.announcementLinks=[]] - 需要处理的公告链接数组。
 * @param {Array<string>} [options.licenseLinks=[]] - 需要处理的许可证链接数组。
 * @param {Array<string>} [options.playtestLinks=[]] - 需要处理的试玩链接数组。
 * @returns {Promise<boolean>} - 返回一个Promise，表示操作的结果。
 * @throws {Error} - 如果在执行过程中发生错误，将抛出错误。
 */
class Steam extends Social {
  tasks: steamTasks;
  whiteList: steamTasks;
  #cache: steamCache = { ...{
    group: {},
    officialGroup: {},
    forum: {},
    workshop: {},
    curator: {}
  }, ...GM_getValue<steamCache>('steamCache') };
  #auth: auth = {};
  #storeInitialized = false;
  #communityInitialized = false;
  #area = 'CN';
  #areaStatus = 'end';
  #ASF!: SteamASF;

  /**
   * 创建一个Steam实例。
   *
   * @constructor
   * @description
   * 此构造函数初始化Steam类的实例，设置默认任务模板和白名单。
   * 默认任务模板包含多个空数组，用于存储Steam相关的任务信息。
   * 白名单将从GM_getValue中获取，如果没有找到，则使用默认任务模板。
   */
  constructor() {
    super();
    const defaultTasksTemplate: steamTasks = {
      groups: [],
      officialGroups: [],
      wishlists: [],
      follows: [],
      forums: [],
      workshops: [],
      workshopVotes: [],
      curators: [],
      curatorLikes: [],
      announcements: [],
      licenses: [],
      playtests: []
    };
    this.tasks = defaultTasksTemplate;
    this.whiteList = { ...defaultTasksTemplate, ...(GM_getValue<whiteList>('whiteList')?.steam || {}) };
  }
  /**
   * 初始化Steam模块，验证及获取身份验证信息。
   *
   * @async
   * @function init
   * @param {string} [type='all'] - 初始化类型，默认为'all'。可选值包括'store'和'community'。
   * @returns {Promise<boolean>} - 返回一个Promise，表示初始化是否成功。
   *                              - true: 初始化完成
   *                              - false: 初始化失败
   * @throws {Error} - 如果在初始化过程中发生错误，将抛出错误。
   *
   * @description
   * 该函数根据传入的类型初始化Steam模块。
   * 如果ASF（Auto-Steam-Farm）启用且相关配置存在，则初始化ASF实例。
   * 如果类型为'store'，则更新Steam商店的身份验证信息。
   * 如果类型为'community'，则更新Steam社区的身份验证信息。
   * 如果两者都已初始化，则返回成功信息。
   * 如果任何步骤失败，函数将记录错误信息并返回false。
   */
  async init(type = 'all'): Promise<boolean> {
    try {
      if (globalOptions.ASF.AsfEnabled && globalOptions.ASF.AsfIpcUrl && globalOptions.ASF.AsfIpcPassword) {
        this.#ASF = new SteamASF();
        if (await this.#ASF.init()) {
          this.#storeInitialized = true;
          this.#communityInitialized = true;
          return true;
        }
        return false;
      }
      if (type === 'store') {
        if (this.#storeInitialized) {
          return true;
        }
        let storeInitialized = await this.#updateStoreAuth();
        if (!storeInitialized) {
          storeInitialized = await this.#updateStoreAuthTab();
        }
        this.#storeInitialized = storeInitialized;
        if (!this.#storeInitialized) {
          echoLog({}).error(__('initFailed', 'Steam'));
          return false;
        }
        echoLog({}).success(__('initSuccess', 'SteamStore'));
        return true;
      }
      if (type === 'community') {
        if (this.#communityInitialized) {
          return true;
        }
        let communityInitialized = await this.#getUserLink();
        if (!communityInitialized) {
          communityInitialized = await this.#updateCommunityAuthTab();
          GM_setValue('steamCommunityAuth', null);
        }
        this.#communityInitialized = communityInitialized;
        if (!this.#communityInitialized) {
          echoLog({}).error(__('initFailed', 'Steam'));
          return false;
        }
        echoLog({}).success(__('initSuccess', 'SteamCommunity'));
        return true;
      }

      if (this.#storeInitialized && this.#communityInitialized) {
        echoLog({}).success(__('initSuccess', 'Steam'));
        return true;
      }
      echoLog({}).error(__('initFailed', 'Steam'));
      return false;
    } catch (error) {
      throwError(error as Error, 'Steam.init');
      return false;
    }
  }

  /**
   * 刷新Steam的身份验证令牌。
   *
   * @async
   * @function #refreshToken
   * @param {('steamStore' | 'steamCommunity')} type - 指定要刷新令牌的类型，默认为'steamStore'。
   * @returns {Promise<boolean>} - 返回一个Promise，表示刷新操作的结果。
   *                              - true: 刷新成功
   *                              - false: 刷新失败
   * @throws {Error} - 如果在刷新过程中发生错误，将抛出错误。
   *
   * @description
   * 该函数通过发送POST请求到Steam的登录接口来刷新身份验证令牌。
   * 函数首先构建请求的表单数据，并设置请求头信息。
   * 如果请求成功且返回结果为'Success'，则进一步检查响应数据是否成功。
   * 如果成功，则调用`#setStoreToken`方法设置新的Token，并返回true。
   * 如果任何步骤失败，函数将记录错误信息并返回false。
   */
  async #refreshToken(type: 'steamStore' | 'steamCommunity' = 'steamStore'): Promise<boolean> {
    try {
      const host = {
        steamStore: 'store.steampowered.com',
        steamCommunity: 'steamcommunity.com'
      };
      const logStatus = echoLog({ text: __('refreshingToken', __(type)) });
      const formData = new FormData();
      formData.append('redir', `https://${host[type]}/`);
      const { result, statusText, status, data } = await httpRequest({
        url: 'https://login.steampowered.com/jwt/ajaxrefresh',
        method: 'POST',
        responseType: 'json',
        headers: {
          Host: 'login.steampowered.com',
          Origin: `https://${host[type]}`,
          Referer: `https://${host[type]}/`
        },
        data: formData
      });
      if (result === 'Success') {
        if (data?.response?.success) {
          if (await this.#setStoreToken(data.response as storeTokenParam, type)) {
            logStatus.success();
            return true;
          }
          logStatus.error('Error');
          return false;
        }
        logStatus.error(`Error:${data?.statusText}(${data?.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'Steam.refreshToken');
      return false;
    }
  }
  /**
   * 设置Steam商店或社区的Token。
   *
   * @async
   * @function #setStoreToken
   * @param {storeTokenParam} param - 包含设置Token所需的参数，包括steamID、nonce、redir和auth。
   * @param {('steamStore' | 'steamCommunity')} type - 指定Token类型，可以是'steamStore'或'steamCommunity'。
   * @returns {Promise<boolean>} - 返回一个Promise，表示设置Token的结果。
   *                              - true: 设置Token成功
   *                              - false: 设置Token失败
   * @throws {Error} - 如果在设置Token过程中发生错误，将抛出错误。
   *
   * @description
   * 该函数通过发送POST请求到指定的Steam URL来设置Token。
   * 函数首先构建请求的表单数据，然后发送请求。
   * 如果请求成功且返回结果为'Success'，并且状态为200，则返回true。
   * 如果请求失败或返回的结果不为'Success'，则记录错误信息并返回false。
   */
  async #setStoreToken(param: storeTokenParam, type: 'steamStore' | 'steamCommunity'): Promise<boolean> {
    try {
      const host = {
        steamStore: 'store.steampowered.com',
        steamCommunity: 'steamcommunity.com'
      };
      const logStatus = echoLog({ text: __('settingToken', __(type)) });
      const formData = new FormData();
      formData.append('steamID', param.steamID);
      formData.append('nonce', param.nonce);
      formData.append('redir', param.redir);
      formData.append('auth', param.auth);
      const { result, statusText, status, data } = await httpRequest({
        url: `https://${host[type]}/login/settoken`,
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          Host: host[type],
          Origin: `https://${host[type]}`
          // Referer: `https://${host[type]}/login`
        },
        data: formData
      });
      if (result === 'Success') {
        if (data?.status === 200) {
          logStatus.success();
          return true;
        }
        logStatus.error(`Error:${data?.statusText}(${data?.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'Steam.setStoreToken');
      return false;
    }
  }
  /**
   * 更新Steam商店的身份验证Token。
   *
   * @async
   * @function #updateStoreAuth
   * @param {boolean} [retry=false] - 是否为重试操作，默认为false。
   * @returns {Promise<boolean>} - 返回一个Promise，表示更新Token的结果。
   *                              - true: 更新Token成功
   *                              - false: 更新Token失败
   * @throws {Error} - 如果在更新过程中发生错误，将抛出错误。
   *
   * @description
   * 该函数通过发送GET请求到Steam商店的URL来更新身份验证Token。
   * 如果请求成功且状态为200，函数会检查响应文本中是否包含'data-miniprofile='。
   * 如果没有找到，函数会尝试刷新Token并进行重试。
   * 如果成功获取到'sessionID'，则将其存储并返回true。
   * 如果请求状态为301或302，表示需要重定向，函数同样会尝试刷新Token并处理重试逻辑。
   * 如果请求失败或发生异常，函数会记录错误并返回false。
   */
  async #updateStoreAuth(retry = false): Promise<boolean> {
    try {
      const logStatus = echoLog({ text: __('updatingAuth', __('steamStore')) });
      const { result, statusText, status, data } = await httpRequest({
        url: 'https://store.steampowered.com/',
        method: 'GET',
        headers: {
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
          'Sec-Fetch-Dest': 'document',
          'Sec-Fetch-Mode': 'navigate',
          'Upgrade-Insecure-Requests': '1'
        },
        fetch: false,
        redirect: 'manual'
      });
      if (data?.status === 200) {
        if (!data.responseText.includes('data-miniprofile=')) {
          if (await this.#refreshToken('steamStore')) {
            logStatus.warning(__('retry'));
            if (retry) {
              logStatus.error(`Error:${__('needLoginSteamStore')}`, true);
              return false;
            }
            return this.#updateStoreAuth(true);
          }
          logStatus.error(`Error:${__('needLoginSteamStore')}`, true);
          return false;
        }
        const storeSessionID = data.responseText.match(/g_sessionID = "(.+?)";/)?.[1];
        if (storeSessionID) {
          this.#auth.storeSessionID = storeSessionID;
          logStatus.success();
          return true;
        }
        logStatus.error('Error: Get "sessionID" failed');
        return false;
      }
      if ([301, 302].includes(data?.status as number)) {
        if (await this.#refreshToken('steamStore')) {
          logStatus.warning(__('retry'));
          if (retry) {
            logStatus.error(`Error:${__('needLoginSteamStore')}`, true);
            return false;
          }
          return this.#updateStoreAuth(true);
        }
        logStatus.error(`Error:${__('needLoginSteamStore')}`, true);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'Steam.updateStoreAuth');
      return false;
    }
  }
  /**
   * 通过打开新标签页更新Steam商店的身份验证。
   *
   * @async
   * @function #updateStoreAuthTab
   * @returns {Promise<boolean>} - 返回一个Promise，表示更新操作的结果。
   *                              - true: 更新成功
   *                              - false: 更新失败
   * @throws {Error} - 如果在更新过程中发生错误，将抛出错误。
   *
   * @description
   * 该函数通过打开一个新的浏览器标签页来更新Steam商店的身份验证信息。
   * 首先，记录更新状态。然后，打开Steam商店的URL。
   * 使用`GM_addValueChangeListener`监听`steamStoreAuth`的值变化。
   * 如果新值与旧值不同且存在新值，则更新存储的会话ID，并记录成功信息。
   * 如果更新失败，则记录错误信息。
   * 最后，关闭新标签页并返回更新结果。
   */
  async #updateStoreAuthTab(): Promise<boolean> {
    try {
      const logStatus = echoLog({ text: __('updatingAuth', __('steamStoreTab')) });
      return await new Promise((resolve) => {
        GM_deleteValue('steamStoreAuth');
        GM_setValue('ATv4_updateStoreAuth', true);
        const newTab = GM_openInTab('https://store.steampowered.com/', { active: true, setParent: true });
        newTab.name = 'ATv4_updateStoreAuth';
        const listenerId = GM_addValueChangeListener<auth|null>('steamStoreAuth', (key, oldValue, newValue) => {
          GM_removeValueChangeListener(listenerId);
          GM_deleteValue('ATv4_updateStoreAuth');
          newTab?.close();
          if (newValue && JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
            this.#auth.storeSessionID = newValue.storeSessionID;
            logStatus.success();
            resolve(true);
            return;
          }
          logStatus.error('Failed');
          resolve(false);
        });
        newTab.onclose = () => {
          GM_deleteValue('ATv4_updateStoreAuth');
        };
      });
    } catch (error) {
      throwError(error as Error, 'Steam.updateStoreAuthTab');
      return false;
    }
  }
  /**
   * 通过打开新标签页更新Steam社区的身份验证。
   *
   * @async
   * @function #updateCommunityAuthTab
   * @returns {Promise<boolean>} - 返回一个Promise，表示更新操作的结果。
   *                              - true: 更新成功
   *                              - false: 更新失败
   * @throws {Error} - 如果在更新过程中发生错误，将抛出错误。
   *
   * @description
   * 该函数通过打开Steam社区的URL来更新身份验证信息。
   * 首先，记录更新状态。然后，删除之前存储的' steamCommunityAuth'值。
   * 打开一个新的浏览器标签页，并使用`GM_addValueChangeListener`监听' steamCommunityAuth'的值变化。
   * 如果新值与旧值不同且存在新值，则更新存储的`steam64Id`和`communitySessionID`，并记录成功信息。
   * 如果更新失败，则记录错误信息。
   * 最后，关闭新标签页并返回更新结果。
   */
  async #updateCommunityAuthTab(): Promise<boolean> {
    try {
      const logStatus = echoLog({ text: __('updatingAuth', __('steamCommunityTab')) });
      return await new Promise((resolve) => {
        GM_deleteValue('steamCommunityAuth');
        GM_setValue('ATv4_updateCommunityAuth', true);
        const newTab = GM_openInTab('https://steamcommunity.com/my', { active: true, setParent: true });
        newTab.name = 'ATv4_updateCommunityAuth';
        const listenerId = GM_addValueChangeListener<auth | null>('steamCommunityAuth', (key, oldValue, newValue) => {
          GM_removeValueChangeListener(listenerId);
          GM_deleteValue('ATv4_updateCommunityAuth');
          newTab?.close();
          if (newValue && JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
            this.#auth.steam64Id = newValue.steam64Id;
            this.#auth.communitySessionID = newValue.communitySessionID;
            logStatus.success();
            resolve(true);
            return;
          }
          logStatus.error('Failed');
          resolve(false);
        });
        newTab.onclose = () => {
          GM_deleteValue('ATv4_updateCommunityAuth');
        };
      });
    } catch (error) {
      throwError(error as Error, 'Steam.updateCommunityAuthTab');
      return false;
    }
  }

  /**
   * 获取Steam用户链接并更新Steam社区的身份验证信息。
   *
   * @async
   * @function #getUserLink
   * @param {boolean} [retry=false] - 是否为重试请求，默认为false。
   * @returns {Promise<boolean>} - 返回一个Promise，表示获取用户链接的结果。
   *                              - true: 获取成功并更新身份验证信息
   *                              - false: 获取失败或需要登录
   * @throws {Error} - 如果在获取过程中发生错误，将抛出错误。
   *
   * @description
   * 该函数通过发送GET请求到Steam社区的URL来获取用户链接。
   * 如果请求成功且状态为200，函数会检查响应的最终URL是否需要登录。
   * 如果需要登录，则记录错误并返回false。
   * 如果成功获取到`steam64Id`和`communitySessionID`，则将其存储并返回true。
   * 如果状态为302，表示需要刷新令牌，函数会尝试刷新并重试获取用户链接。
   * 如果状态为301，函数会根据重定向的URL进行相应处理。
   * 如果请求失败或发生异常，函数会记录错误并返回false。
   */
  async #getUserLink(retry = false): Promise<boolean> {
    try {
      const logStatus = echoLog({ text: __('gettingUserLink') });
      const { result, statusText, status, data } = await httpRequest({
        url: 'https://steamcommunity.com/my',
        method: 'GET',
        headers: {
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
          'Sec-Fetch-Dest': 'document',
          'Sec-Fetch-Mode': 'navigate',
          'Upgrade-Insecure-Requests': '1'
        },
        fetch: false,
        redirect: 'manual'
      });
      if (data?.status === 200) {
        if (data.finalUrl.includes('https://steamcommunity.com/login/home')) {
          logStatus.error(`Error:${__('needLoginSteamCommunity')}`, true);
          return false;
        }
        const steam64Id = data.responseText.match(/g_steamID = "(.+?)";/)?.[1];
        const communitySessionID = data.responseText.match(/g_sessionID = "(.+?)";/)?.[1];
        if (steam64Id) this.#auth.steam64Id = steam64Id;
        if (communitySessionID) {
          this.#auth.communitySessionID = communitySessionID;
          logStatus.success();
          return true;
        }
        logStatus.error('Error: Get "sessionID" failed');
        return false;
      }
      if (data?.status === 302) {
        if (await this.#refreshToken('steamCommunity')) {
          if (retry) {
            logStatus.error(`Error:${__('needLoginSteamCommunity')}`, true);
            return false;
          }
          logStatus.warning(__('retry'));
          return this.#getUserLink(true);
        }
        logStatus.error(`Error:${__('needLoginSteamCommunity')}`, true);
        return false;
      }
      const location = data?.finalUrl || data?.responseHeaders?.split('\n')
        ?.find((header: string) => (header.includes('location') ? header.replace('loctation:', '').trim() : null));
      if (data?.status === 301) {
        if (location?.includes('steamcommunity.com/id')) {
          logStatus.success();
          return await this.#updateCommunityAuth(location);
        }
        if (location?.includes('steamcommunity.com/login/home')) {
          logStatus.error(`Error:${__('needLoginSteamCommunity')}`, true);
          return false;
        }
        if (location?.includes('steamcommunity.com/my')) {
          if (retry) {
            logStatus.error(`Error:${__('redirect')}`, true);
            return false;
          }
          logStatus.warning(__('retry'));
          return await this.#getUserLink(true);
        }
        logStatus.error(`Error: 301 (${location})`, true);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'Steam.updateCommunityAuth');
      return false;
    }
  }

  /**
   * 更新Steam社区的身份验证信息。
   *
   * @async
   * @function #updateCommunityAuth
   * @param {string} url - 要请求的Steam社区URL。
   * @returns {Promise<boolean>} - 返回一个Promise，表示更新操作的结果。
   *                              - true: 更新成功
   *                              - false: 更新失败
   * @throws {Error} - 如果在更新过程中发生错误，将抛出错误。
   *
   * @description
   * 该函数通过发送GET请求到指定的Steam社区URL来更新身份验证信息。
   * 如果请求成功且返回结果为'Success'，函数会检查响应的状态码。
   * 如果状态码为200，进一步检查最终URL是否需要登录。
   * 如果需要登录，则记录错误并返回false。
   * 如果成功获取到`steam64Id`和`communitySessionID`，则将其存储并返回true。
   * 如果请求失败或发生异常，函数会记录错误并返回false。
   */
  async #updateCommunityAuth(url: string): Promise<boolean> {
    try {
      const logStatus = echoLog({ text: __('updatingAuth', __('steamCommunity')) });
      const { result, statusText, status, data } = await httpRequest({
        url,
        method: 'GET',
        headers: {
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
          'Cache-Control': 'max-age=0',
          'Sec-Fetch-Dest': 'document',
          'Sec-Fetch-Mode': 'navigate',
          'Upgrade-Insecure-Requests': '1'
        }
      });
      if (result === 'Success') {
        if (data?.status === 200) {
          if (data.finalUrl.includes('https://steamcommunity.com/login/home')) {
            logStatus.error(`Error:${__('needLoginSteamCommunity')}`, true);
            return false;
          }
          const steam64Id = data.responseText.match(/g_steamID = "(.+?)";/)?.[1];
          const communitySessionID = data.responseText.match(/g_sessionID = "(.+?)";/)?.[1];
          if (steam64Id) this.#auth.steam64Id = steam64Id;
          if (communitySessionID) {
            this.#auth.communitySessionID = communitySessionID;
            logStatus.success();
            return true;
          }
          logStatus.error('Error: Get "sessionID" failed');
          return false;
        }
        logStatus.error(`Error:${data?.statusText}(${data?.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'Steam.updateCommunityAuth');
      return false;
    }
  }

  /**
   * 获取当前购物车地区及可更换的地区（需自备梯子）。
   *
   * @async
   * @function #getAreaInfo
   * @returns {Promise<areas>} - 返回一个Promise，包含当前地区和可更换地区的信息。
   *                             - currentArea: 当前地区的国家代码
   *                             - areas: 可更换的地区列表
   * @throws {Error} - 如果在获取过程中发生错误，将抛出错误。
   *
   * @description
   * 该函数通过发送GET请求到Steam购物车的URL来获取用户的地区信息。
   * 如果请求成功且状态为200，函数会解析响应中的购物车配置和用户信息。
   * 如果成功获取到用户的当前地区和可更换地区，则返回这些信息。
   * 如果在解析过程中发生错误，或没有找到可更换的地区，函数将记录错误并返回空对象。
   * 如果请求失败，函数将记录错误信息并返回空对象。
   */
  async #getAreaInfo(): Promise<areas> {
    try {
      const logStatus = echoLog({ text: __('gettingAreaInfo') });
      const { result, statusText, status, data } = await httpRequest({
        url: 'https://store.steampowered.com/cart/',
        method: 'GET'
      });
      if (result === 'Success') {
        if (data?.status === 200) {
          const cartConfigRaw = data.responseText.match(/data-cart_config="(.*?)"/)?.[1];
          const temp = document.createElement('div');
          temp.innerHTML = cartConfigRaw || '{}';
          const cartConfigStr = temp.textContent || temp.innerText;
          let cartConfig;
          try {
            cartConfig = JSON.parse(cartConfigStr);
          } catch (error) {
            logStatus.error('Error: get country info filed');
            console.error(error);
            return {};
          }

          if (!cartConfig.rgUserCountryOptions) {
            logStatus.warning('Warning: Area cannot be changed');
            return {};
          }
          const userInfoRaw = data.responseText.match(/data-userinfo="(.*?)"/)?.[1];
          const temp1 = document.createElement('div');
          temp1.innerHTML = userInfoRaw || '{}';
          const userInfoStr = temp1.textContent || temp1.innerText;
          let userInfo;
          try {
            userInfo = JSON.parse(userInfoStr);
          } catch (error) {
            logStatus.error('Error: get country info filed');
            console.error(error);
            return {};
          }

          const currentArea = userInfo.country_code;
          const areas = Object.keys(cartConfig.rgUserCountryOptions).filter((area) => area !== 'help');
          if (currentArea && areas.length > 0) {
            this.#area = currentArea;
            logStatus.success();
            return { currentArea, areas };
          }
          logStatus.error('Error: get country info filed');
          return {};
        }
        logStatus.error(`Error:${data?.statusText}(${data?.status})`);
        return {};
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return {};
    } catch (error) {
      throwError(error as Error, 'Steam.getAreaInfo');
      return {};
    }
  }

  /**
   * 更换Steam的地区。
   *
   * @async
   * @function #changeArea
   * @param {string} [area] - 目标地区的代码，如果未提供，则自动获取可用地区。
   * @returns {Promise<boolean | string>} - 返回一个Promise，表示更换地区的结果。
   *                                        - true: 当前地区已是目标地区
   *                                        - 'skip': 当前地区不需要更换
   *                                        - false: 更换地区失败
   *                                        - string: 更换成功后返回当前地区代码
   * @throws {Error} - 如果在更换过程中发生错误，将抛出错误。
   *
   * @description
   * 该函数用于更换Steam的地区设置。首先检查当前地区状态，如果状态为'waiting'，则等待状态改变。
   * 如果当前地区已是目标地区，或者未指定目标地区且当前地区不是中国，则直接返回true。
   * 如果未指定目标地区，则调用`#getAreaInfo`获取当前地区和可用地区的信息。
   * 如果当前地区不是中国，则记录状态为'skip'并返回'skip'。
   * 如果没有可用的其他地区，则记录状态为'noAnotherArea'并返回false。
   * 如果目标地区有效，则发送POST请求以更换地区。
   * 如果请求成功且状态为200，则检查当前地区是否已更换为目标地区。
   * 如果更换成功，记录状态为'success'并返回当前地区；否则记录错误并返回'CN'。
   * 如果请求失败，记录错误信息并返回'CN'。
   */
  async #changeArea(area?: string): Promise<boolean | string> {
    try {
      if (this.#areaStatus === 'waiting') {
        await new Promise((resolve) => {
          const checker = setInterval(() => {
            if (this.#areaStatus !== 'waiting') {
              clearInterval(checker);
              resolve(true);
            }
          });
        });
      }
      if (this.#area === area || (!area && this.#area !== 'CN')) {
        return true;
      }
      this.#areaStatus = 'waiting';
      let aimedArea = area;
      if (!aimedArea) {
        const { currentArea, areas } = await this.#getAreaInfo();
        if (!currentArea || !areas) {
          this.#areaStatus = 'error';
          return false;
        }
        if (currentArea !== 'CN') {
          this.#areaStatus = 'skip';
          echoLog({ text: 'notNeededChangeArea' });
          return 'skip';
        }
        const anotherArea = areas.filter((area) => area && area !== 'CN');
        if (!anotherArea || anotherArea.length === 0) {
          this.#areaStatus = 'noAnotherArea';
          echoLog({ text: 'noAnotherArea' });
          return false;
        }
        [aimedArea] = anotherArea;
      }
      const logStatus = echoLog({ text: __('changingArea', aimedArea) });
      const { result, statusText, status, data } = await httpRequest({
        url: 'https://store.steampowered.com/country/setcountry',
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        data: $.param({ cc: aimedArea, sessionid: this.#auth.storeSessionID })
      });
      if (result === 'Success') {
        if (data?.status === 200 && data.responseText === 'true') {
          const { currentArea } = await this.#getAreaInfo();
          if (currentArea === aimedArea) {
            this.#areaStatus = 'success';
            logStatus.success();
            return currentArea;
          }
          this.#areaStatus = 'error';
          logStatus.error('Error: change country filed');
          return 'CN';
        }
        this.#areaStatus = 'error';
        logStatus.error(`Error:${data?.statusText}(${data?.status})`);
        return 'CN';
      }
      this.#areaStatus = 'error';
      logStatus.error(`${result}:${statusText}(${status})`);
      return 'CN';
    } catch (error) {
      this.#areaStatus = 'error';
      throwError(error as Error, 'Steam.changeArea');
      return false;
    }
  }

  /**
   * 加入指定的Steam组。
   *
   * @async
   * @function #joinGroup
   * @param {string} groupName - 要加入的Steam组的名称。
   * @returns {Promise<boolean>} - 返回一个Promise，表示加入操作的结果。
   *                              - true: 加入成功
   *                              - false: 加入失败
   * @throws {Error} - 如果在加入过程中发生错误，将抛出错误。
   *
   * @description
   * 该函数首先检查是否存在ASF实例。如果存在，则调用ASF的`joinGroup`方法尝试加入组。
   * 如果加入成功，则将组名添加到任务列表中并返回true。
   * 如果ASF不存在，则记录加入组的状态，并发送POST请求到Steam社区的组URL。
   * 如果请求成功且返回结果为'Success'，则进一步检查响应状态。
   * 如果状态为200且响应文本不包含'grouppage_join_area'，则记录成功信息并返回true。
   * 如果请求失败或返回的结果不为'Success'，则记录错误信息并返回false。
   */
  async #joinGroup(groupName: string): Promise<boolean> {
    try {
      if (this.#ASF) {
        if (await this.#ASF.joinGroup(groupName)) {
          this.tasks.groups = unique([...this.tasks.groups, groupName]);
          return true;
        }
        return false;
      }
      const logStatus = echoLog({ type: 'joiningSteamGroup', text: groupName });
      const { result, statusText, status, data } = await httpRequest({
        url: `https://steamcommunity.com/groups/${groupName}`,
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        data: $.param({ action: 'join', sessionID: this.#auth.communitySessionID })
      });
      if (result === 'Success') {
        if (data?.status === 200 && !data.responseText.includes('grouppage_join_area')) {
          logStatus.success();
          this.tasks.groups = unique([...this.tasks.groups, groupName]);
          return true;
        }
        logStatus.error(`Error:${data?.statusText}(${data?.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'Steam.joinGroup');
      return false;
    }
  }

  /**
   * 退出指定的Steam组。
   *
   * @async
   * @function #leaveGroup
   * @param {string} groupName - 要退出的Steam组的名称。
   * @returns {Promise<boolean>} - 返回一个Promise，表示退出操作的结果。
   *                              - true: 退出成功
   *                              - false: 退出失败
   * @throws {Error} - 如果在退出过程中发生错误，将抛出错误。
   *
   * @description
   * 该函数首先检查要退出的组是否在白名单中。如果在白名单中，直接返回true。
   * 如果存在ASF实例，则调用ASF的`leaveGroup`方法尝试退出组。
   * 如果ASF不存在，则调用`#getGroupId`方法获取组ID。
   * 如果获取组ID失败，则返回false。
   * 然后，发送POST请求到Steam社区的URL以执行退出操作。
   * 如果请求成功且返回结果为'Success'，则进一步检查响应状态。
   * 如果状态为200且响应文本中不再包含该组的链接，则记录成功信息并返回true。
   * 如果请求失败或返回的结果不为'Success'，则记录错误信息并返回false。
   */
  async #leaveGroup(groupName: string): Promise<boolean> {
    try {
      if (this.whiteList.groups.includes(groupName)) {
        echoLog({ type: 'whiteList', text: 'Steam.leaveGroup', id: groupName });
        return true;
      }
      if (this.#ASF) {
        return await this.#ASF.leaveGroup(groupName);
      }
      const groupId = await this.#getGroupId(groupName);
      if (!groupId) return false;
      const logStatus = echoLog({ type: 'leavingSteamGroup', text: groupName });
      const { result, statusText, status, data } = await httpRequest({
        url: `https://steamcommunity.com/profiles/${this.#auth.steam64Id}/home_process`,
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        data: $.param({ sessionID: this.#auth.communitySessionID, action: 'leaveGroup', groupId })
      });
      if (result === 'Success') {
        if (data?.status === 200 && data.finalUrl.includes('groups') &&
          $(data.responseText.replace(/<img.*?>/g, '').toLowerCase())
            .find(`a[href='https://steamcommunity.com/groups/${groupName.toLowerCase()}']`).length === 0) {
          logStatus.success();
          return true;
        }
        logStatus.error(`Error:${data?.statusText}(${data?.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'Steam.leaveGroup');
      return false;
    }
  }

  /**
   * 获取指定Steam组的ID。
   *
   * @async
   * @function #getGroupId
   * @param {string} groupName - 要获取ID的Steam组名称。
   * @returns {Promise<false | string>} - 返回一个Promise，表示获取操作的结果。
   *                                      - false: 获取失败
   *                                      - string: 获取成功，返回组ID
   * @throws {Error} - 如果在获取过程中发生错误，将抛出错误。
   *
   * @description
   * 该函数首先检查缓存中是否存在指定组的ID。如果存在，则直接返回该ID并记录成功状态。
   * 如果缓存中不存在，则发送GET请求到Steam社区的组页面以获取组的ID。
   * 如果请求成功且返回结果为'Success'，则进一步检查响应状态。
   * 如果状态为200，函数会从响应文本中提取组ID，并将其存储到缓存中。
   * 如果成功获取到组ID，则记录成功信息并返回该ID。
   * 如果请求失败或返回的结果不为'Success'，则记录错误信息并返回false。
   */
  async #getGroupId(groupName: string): Promise<false | string> {
    try {
      const logStatus = echoLog({ type: 'gettingSteamGroupId', text: groupName });
      const groupId = this.#cache.group[groupName];
      if (groupId) {
        logStatus.success();
        return groupId;
      }
      const { result, statusText, status, data } = await httpRequest({
        url: `https://steamcommunity.com/groups/${groupName}`,
        method: 'GET',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
      });
      if (result === 'Success') {
        if (data?.status === 200) {
          const groupId = data.responseText.match(/OpenGroupChat\( '([0-9]+)'/)?.[1];
          if (groupId) {
            this.#setCache('group', groupName, groupId);
            logStatus.success();
            return groupId;
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
      throwError(error as Error, 'Steam.getGroupID');
      return false;
    }
  }

  /**
   * 加入指定的Steam官方组。
   *
   * @async
   * @function #joinOfficialGroup
   * @param {string} gameId - 要加入的Steam游戏的ID。
   * @returns {Promise<boolean>} - 返回一个Promise，表示加入操作的结果。
   *                              - true: 加入成功
   *                              - false: 加入失败
   * @throws {Error} - 如果在加入过程中发生错误，将抛出错误。
   *
   * @description
   * 该函数用于加入指定的Steam官方组。如果存在ASF实例，则调用ASF的`joinGroup`方法尝试加入组。
   * 如果加入成功，则将组ID添加到任务列表中并返回true。
   * 如果ASF不存在，则记录加入组的状态，并发送GET请求到Steam社区的组URL。
   * 如果请求成功且返回结果为'Success'，则进一步检查响应状态。
   * 如果状态为200且响应文本不包含'id="publicGroupJoin"'，则记录成功信息并返回true。
   * 如果请求失败或返回的结果不为'Success'，则记录错误信息并返回false。
   */
  async #joinOfficialGroup(gameId: string): Promise<boolean> {
    try {
      if (this.#ASF) {
        if (await this.#ASF.joinGroup(gameId)) {
          this.tasks.officialGroups = unique([...this.tasks.officialGroups, gameId]);
          return true;
        }
        return false;
      }
      const logStatus = echoLog({ type: 'joiningSteamOfficialGroup', text: gameId });
      const { result, statusText, status, data } = await httpRequest({
        url: `https://steamcommunity.com/games/${gameId}?action=join&sessionID=${this.#auth.communitySessionID}`,
        method: 'GET',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
      });
      if (result === 'Success') {
        if (data?.status === 200 && !data.responseText.includes('id="publicGroupJoin"')) {
          logStatus.success();
          this.tasks.officialGroups = unique([...this.tasks.officialGroups, gameId]);
          const groupId = data.responseText.match(/steam:\/\/friends\/joinchat\/([0-9]+)/)?.[1];
          if (groupId) {
            this.#setCache('officialGroup', gameId, groupId);
          }
          return true;
        }
        logStatus.error(`Error:${data?.statusText}(${data?.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'Steam.joinOfficialGroup');
      return false;
    }
  }

  /**
   * 退出指定的Steam官方组。
   *
   * @async
   * @function #leaveOfficialGroup
   * @param {string} gameId - 要退出的Steam游戏的ID。
   * @returns {Promise<boolean>} - 返回一个Promise，表示退出操作的结果。
   *                              - true: 退出成功
   *                              - false: 退出失败
   * @throws {Error} - 如果在退出过程中发生错误，将抛出错误。
   *
   * @description
   * 该函数用于退出指定的Steam官方组。首先检查该组是否在白名单中，如果在，则直接返回true。
   * 如果存在ASF实例，则调用ASF的`leaveGroup`方法尝试退出组。
   * 如果ASF不存在，则调用`#getOfficialGroupId`方法获取组的ID。
   * 如果获取组ID失败，则返回false。
   * 然后，发送POST请求到Steam社区的URL以执行退出操作。
   * 如果请求成功且返回结果为'Success'，则进一步检查响应状态。
   * 如果状态为200且响应文本中不再包含该组的链接，则记录成功信息并返回true。
   * 如果请求失败或返回的结果不为'Success'，则记录错误信息并返回false。
   */
  async #leaveOfficialGroup(gameId: string): Promise<boolean> {
    try {
      if (this.whiteList.officialGroups.includes(gameId)) {
        echoLog({ type: 'whiteList', text: 'Steam.leaveOfficialGroup', id: gameId });
        return true;
      }
      if (this.#ASF) {
        return await this.#ASF.leaveGroup(gameId);
      }
      const groupId = await this.#getOfficialGroupId(gameId);
      if (!groupId) return false;
      const logStatus = echoLog({ type: 'leavingSteamOfficialGroup', text: gameId });
      const { result, statusText, status, data } = await httpRequest({
        url: `https://steamcommunity.com/profiles/${this.#auth.steam64Id}/home_process`,
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        data: $.param({ sessionID: this.#auth.communitySessionID, action: 'leaveGroup', groupId })
      });
      if (result === 'Success') {
        if (data?.status === 200) {
          const { result: resultR, statusText: statusTextR, status: statusR, data: dataR } = await httpRequest({
            url: `https://steamcommunity.com/games/${gameId}`,
            method: 'GET',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
          });
          if (resultR === 'Success') {
            if (dataR?.status === 200 && dataR.responseText.includes('id="publicGroupJoin"')) {
              logStatus.success();
              return true;
            }
            logStatus.error(`Error:${dataR?.statusText}(${dataR?.status})`);
            return false;
          }
          logStatus.error(`${resultR}:${statusTextR}(${statusR})`);
          return false;
        }
        logStatus.error(`Error:${data?.statusText}(${data?.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'Steam.leaveOfficialGroup');
      return false;
    }
  }

  /**
   * 获取指定Steam游戏的官方组ID。
   *
   * @async
   * @function #getOfficialGroupId
   * @param {string} gameId - Steam游戏的ID。
   * @returns {Promise<false | string>} - 返回一个Promise，表示获取操作的结果。
   *                                      - false: 获取失败
   *                                      - string: 获取成功，返回组ID
   * @throws {Error} - 如果在获取过程中发生错误，将抛出错误。
   *
   * @description
   * 该函数用于将Steam游戏ID转换为对应的官方组ID，以便于退出官方组。
   * 首先，检查缓存中是否存在该游戏的组ID。如果存在，则直接返回该ID并记录成功状态。
   * 如果缓存中不存在，则发送GET请求到Steam社区的游戏页面以获取组ID。
   * 如果请求成功且返回结果为'Success'，则进一步检查响应状态。
   * 如果状态为200，函数会从响应文本中提取组ID，并将其存储到缓存中。
   * 如果成功获取到组ID，则记录成功信息并返回该ID。
   * 如果请求失败或返回的结果不为'Success'，则记录错误信息并返回false。
   */
  async #getOfficialGroupId(gameId: string): Promise<false | string> {
    try {
      const logStatus = echoLog({ type: 'gettingSteamOfficialGroupId', text: gameId });
      const groupId = this.#cache.officialGroup[gameId];
      if (groupId) {
        logStatus.success();
        return groupId;
      }
      const { result, statusText, status, data } = await httpRequest({
        url: `https://steamcommunity.com/games/${gameId}`,
        method: 'GET',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
      });
      if (result === 'Success') {
        if (data?.status === 200) {
          const groupId = data.responseText.match(/steam:\/\/friends\/joinchat\/([0-9]+)/)?.[1];
          if (groupId) {
            this.#setCache('officialGroup', gameId, groupId);
            logStatus.success();
            return groupId;
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
      throwError(error as Error, 'Steam.getGroupID');
      return false;
    }
  }

  /**
   * 将指定的游戏添加到Steam的愿望单。
   *
   * @async
   * @function #addToWishlist
   * @param {string} gameId - Steam游戏的AppId。
   * @returns {Promise<boolean>} - 返回一个Promise，表示添加操作的结果。
   *                              - true: 添加成功
   *                              - false: 添加失败
   * @throws {Error} - 如果在添加过程中发生错误，将抛出错误。
   *
   * @description
   * 该函数用于将指定的游戏添加到Steam的愿望单。
   * 如果存在ASF实例，则调用ASF的`addToWishlist`方法尝试添加游戏。
   * 如果添加成功，则将游戏ID添加到任务列表中并返回true。
   * 如果ASF不存在，则发送POST请求到Steam的API以添加游戏到愿望单。
   * 如果请求成功且返回结果为'Success'，并且状态为200且响应中表示添加成功，则记录成功信息并返回true。
   * 如果请求失败或返回的结果不为'Success'，则记录错误信息并返回false。
   * 如果在添加过程中发生错误，函数将捕获异常并记录错误信息。
   */
  async #addToWishlist(gameId: string): Promise<boolean> {
    try {
      if (this.#ASF) {
        if (await this.#ASF.addToWishlist(gameId)) {
          this.tasks.wishlists = unique([...this.tasks.wishlists, gameId]);
          return true;
        }
        return false;
      }
      const logStatus = echoLog({ type: 'addingToWishlist', text: gameId });
      const { result, data } = await httpRequest({
        url: 'https://store.steampowered.com/api/addtowishlist',
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        data: $.param({ sessionid: this.#auth.storeSessionID, appid: gameId }),
        dataType: 'json'
      });
      if (result === 'Success' && data?.status === 200 && data.response?.success === true) {
        logStatus.success();
        this.tasks.wishlists = unique([...this.tasks.wishlists, gameId]);
        return true;
      }
      const { result: resultR, statusText: statusTextR, status: statusR, data: dataR } = await httpRequest({
        url: `https://store.steampowered.com/app/${gameId}`,
        method: 'GET'
      });
      if (resultR === 'Success') {
        if (dataR?.status === 200) {
          if (this.#area === 'CN' && dataR.responseText.includes('id="error_box"')) {
            logStatus.warning(__('changeAreaNotice'));
            if (!(await this.#changeArea())) return false;
            return await this.#addToWishlist(gameId);
          }
          if (dataR.responseText.includes('class="queue_actions_ctn"') && dataR.responseText.includes('class="already_in_library"')) {
            logStatus.success();
            this.tasks.wishlists = unique([...this.tasks.wishlists, gameId]);
            return true;
          } else if (
            (dataR.responseText.includes('class="queue_actions_ctn"') &&
              dataR.responseText.includes('id="add_to_wishlist_area_success" style="display: none;')) ||
            !dataR.responseText.includes('class="queue_actions_ctn"')
          ) {
            logStatus.error(`Error:${dataR.statusText}(${dataR.status})`);
            return false;
          }
          logStatus.success();
          this.tasks.wishlists = unique([...this.tasks.wishlists, gameId]);
          return true;
        }
        logStatus.error(`Error:${dataR?.statusText}(${dataR?.status})`);
        return false;
      }
      logStatus.error(`${resultR}:${statusTextR}(${statusR})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'Steam.addToWishlist');
      return false;
    }
  }

  /**
   * 从Steam愿望单移除游戏。
   *
   * @async
   * @function #removeFromWishlist
   * @param {string} gameId - Steam游戏的AppId。
   * @returns {Promise<boolean>} - 返回一个Promise，表示移除操作的结果。
   *                              - true: 移除成功
   *                              - false: 移除失败
   * @throws {Error} - 如果在移除过程中发生错误，将抛出错误。
   *
   * @description
   * 该函数用于从Steam的愿望单中移除指定的游戏。
   * 首先检查游戏ID是否在白名单中，如果在，则直接返回true。
   * 如果存在ASF实例，则调用ASF的`removeFromWishlist`方法尝试移除游戏。
   * 如果ASF不存在，则发送POST请求到Steam的API以移除游戏。
   * 如果请求成功且返回结果为'Success'，并且状态为200且响应中表示移除成功，则记录成功信息并返回true。
   * 如果请求失败，函数会检查响应状态并根据需要进行地区更换。
   * 如果在移除过程中发生错误，函数将捕获异常并记录错误信息。
   */
  async #removeFromWishlist(gameId: string): Promise<boolean> {
    try {
      if (this.whiteList.wishlists.includes(gameId)) {
        echoLog({ type: 'whiteList', text: 'Steam.removeFromWishlist', id: gameId });
        return true;
      }
      if (this.#ASF) {
        return await this.#ASF.removeFromWishlist(gameId);
      }
      const logStatus = echoLog({ type: 'removingFromWishlist', text: gameId });
      const { result, data } = await httpRequest({
        url: 'https://store.steampowered.com/api/removefromwishlist',
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        data: $.param({ sessionid: this.#auth.storeSessionID, appid: gameId }),
        dataType: 'json'
      });
      if (result === 'Success' && data?.status === 200 && data.response?.success === true) {
        logStatus.success();
        return true;
      }
      const { result: resultR, statusText: statusTextR, status: statusR, data: dataR } = await httpRequest({
        url: `https://store.steampowered.com/app/${gameId}`,
        method: 'GET'
      });
      if (resultR === 'Success') {
        if (dataR?.status === 200) {
          if (this.#area === 'CN' && dataR.responseText.includes('id="error_box"')) {
            logStatus.warning(__('changeAreaNotice'));
            const result = await this.#changeArea();
            if (!result || result === 'CN' || result === 'skip') return false;
            return await this.#removeFromWishlist(gameId);
          }
          if (dataR.responseText.includes('class="queue_actions_ctn"') &&
            (dataR.responseText.includes('ds_owned_flag ds_flag') || dataR.responseText.includes('add_to_wishlist_area'))
          ) {
            logStatus.success();
            return true;
          }
          logStatus.error(`Error:${dataR.statusText}(${dataR.status})`);
          return false;
        }
        logStatus.error(`Error:${dataR?.statusText}(${dataR?.status})`);
        return false;
      }
      logStatus.error(`${resultR}:${statusTextR}(${statusR})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'Steam.removeFromWishlist');
      return false;
    }
  }

  /**
   * 关注或取关指定的Steam游戏。
   *
   * @async
   * @function #toggleFollowGame
   * @param {string} gameId - Steam游戏的AppId。
   * @param {boolean} doTask - true表示关注游戏，false表示取关游戏。
   * @returns {Promise<boolean>} - 返回一个Promise，表示操作的结果。
   *                              - true: 操作成功
   *                              - false: 操作失败
   * @throws {Error} - 如果在操作过程中发生错误，将抛出错误。
   *
   * @description
   * 该函数用于关注或取关指定的Steam游戏。
   * 首先检查是否需要取关，如果游戏ID在白名单中，则直接返回true。
   * 如果存在ASF实例，则调用ASF的`toggleFollowGame`方法进行操作。
   * 如果操作成功，则更新任务列表并返回true。
   * 如果ASF不存在，则构建请求数据并发送POST请求到Steam的关注游戏接口。
   * 如果请求成功且返回结果为'Success'，并且状态为200且响应文本为'true'，则记录成功信息并返回true。
   * 如果请求失败，函数会检查当前地区是否被锁定，并根据需要进行地区更换。
   * 如果操作失败，记录错误信息并返回false。
   */
  async #toggleFollowGame(gameId: string, doTask: boolean): Promise<boolean> {
    try {
      if (!doTask && this.whiteList.follows.includes(gameId)) {
        echoLog({ type: 'whiteList', text: 'Steam.unfollowGame', id: gameId });
        return true;
      }
      if (this.#ASF) {
        if (await this.#ASF.toggleFollowGame(gameId, doTask)) {
          if (doTask) this.tasks.follows = unique([...this.tasks.follows, gameId]);
          return true;
        }
        return false;
      }
      const logStatus = echoLog({ type: `${doTask ? '' : 'un'}followingGame`, text: gameId });
      const requestData: followGameRequestData = { sessionid: this.#auth.storeSessionID as string, appid: gameId };
      if (!doTask) requestData.unfollow = '1';
      const { result, data } = await httpRequest({
        url: 'https://store.steampowered.com/explore/followgame/',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        data: $.param(requestData)
      });
      if (result === 'Success' && data?.status === 200 && data.responseText === 'true') {
        logStatus.success();
        return true;
      }
      const followed = await this.#isFollowedGame(gameId);
      if (this.#area === 'CN' && followed === 'areaLocked') {
        logStatus.warning(__('changeAreaNotice'));
        if (!(await this.#changeArea())) return false;
        return await this.#removeFromWishlist(gameId);
      }
      if (doTask === followed) {
        logStatus.success();
        if (doTask) this.tasks.follows = unique([...this.tasks.follows, gameId]);
        return true;
      }
      logStatus.error(`Error:${data?.statusText}(${data?.status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'Steam.toggleFollowGame');
      return false;
    }
  }

  /**
   * 判断指定的Steam游戏是否已被关注。
   *
   * @async
   * @function #isFollowedGame
   * @param {string} gameId - Steam游戏的AppId。
   * @returns {Promise<boolean | 'areaLocked'>} - 返回一个Promise，表示关注状态。
   *                                               - true: 已关注
   *                                               - 'areaLocked': 游戏因地区限制被锁定
   *                                               - false: 未关注
   * @throws {Error} - 如果在判断过程中发生错误，将抛出错误。
   *
   * @description
   * 该函数通过发送GET请求到Steam游戏的页面来判断游戏是否已被关注。
   * 如果请求成功且状态为200，函数会检查当前地区是否为中国，并判断响应文本中是否包含错误信息。
   * 如果游戏因地区限制被锁定，则返回'areaLocked'。
   * 如果游戏的关注按钮处于活动状态，则返回true，表示已关注。
   * 如果游戏未被关注，则返回false。
   * 如果请求失败或发生异常，函数将记录错误并返回false。
   */
  async #isFollowedGame(gameId: string): Promise<boolean | 'areaLocked'> {
    try {
      const { result, data } = await httpRequest({
        url: `https://store.steampowered.com/app/${gameId}`,
        method: 'GET'
      });
      if (result === 'Success') {
        if (data?.status === 200) {
          if (this.#area === 'CN' && data.responseText.includes('id="error_box"')) {
            return 'areaLocked';
          }
          if ($(data.responseText.replace(/<img.*?>/g, ''))
            .find('.queue_control_button.queue_btn_follow>.btnv6_blue_hoverfade.btn_medium.queue_btn_active')
            .css('display') !== 'none') {
            return true;
          }
          return false;
        }
        return false;
      }
      return false;
    } catch (error) {
      throwError(error as Error, 'Steam.isFollowedGame');
      return false;
    }
  }

  /**
   * 订阅或取消订阅Steam论坛。
   *
   * @async
   * @function #toggleForum
   * @param {string} gameId - Steam游戏的AppId。
   * @param {boolean} [doTask=true] - true表示订阅论坛，false表示取消订阅论坛。
   * @returns {Promise<boolean>} - 返回一个Promise，表示操作的结果。
   *                              - true: 操作成功
   *                              - false: 操作失败
   * @throws {Error} - 如果在操作过程中发生错误，将抛出错误。
   *
   * @description
   * 该函数用于订阅或取消订阅指定Steam游戏的论坛。
   * 如果doTask为false且游戏ID在白名单中，则直接返回true。
   * 函数首先调用`#getForumId`获取论坛ID，如果未获取到ID，则返回false。
   * 然后，构建请求并发送POST请求到Steam论坛的订阅接口。
   * 如果请求成功且返回结果为'Success'，并且状态为200且响应中表示操作成功，则记录成功信息并返回true。
   * 如果请求失败或返回的结果不为'Success'，则记录错误信息并返回false。
   * 如果在操作过程中发生错误，函数将捕获异常并记录错误信息。
   */
  async #toggleForum(gameId: string, doTask = true): Promise<boolean> {
    try {
      if (!doTask && this.whiteList.forums.includes(gameId)) {
        echoLog({ type: 'whiteList', text: 'Steam.unsubscribeForum', id: gameId });
        return true;
      }
      const forumId = await this.#getForumId(gameId);
      if (!forumId) return false;
      const logStatus = echoLog({ type: `${doTask ? '' : 'un'}subscribingForum`, text: gameId });
      const [id, feature] = forumId.split('_');
      const { result, statusText, status, data } = await httpRequest({
        url: `https://steamcommunity.com/forum/${id}/General/${doTask ? '' : 'un'}subscribe/${feature || '0'}/`,
        method: 'POST',
        responseType: 'json',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        data: $.param({ sessionid: this.#auth.communitySessionID })
      });
      if (result === 'Success') {
        if (data?.status === 200 && (data.response?.success === 1 || data.response?.success === 29)) {
          if (doTask) {
            this.tasks.forums = unique([...this.tasks.forums, gameId]);
          }
          logStatus.success();
          return true;
        }
        logStatus.error(`Error:${data?.statusText}(${data?.status})`);
        return true;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return true;
    } catch (error) {
      throwError(error as Error, 'Steam.toggleForum');
      return true;
    }
  }

  /**
   * 获取指定Steam游戏的论坛ID。
   *
   * @async
   * @function #getForumId
   * @param {string} gameId - Steam游戏的AppId。
   * @returns {Promise<false | string>} - 返回一个Promise，表示获取操作的结果。
   *                                      - false: 获取失败
   *                                      - string: 获取成功，返回论坛ID
   * @throws {Error} - 如果在获取过程中发生错误，将抛出错误。
   *
   * @description
   * 该函数用于将Steam游戏的AppId转换为对应的论坛ID。
   * 首先检查缓存中是否存在该游戏的论坛ID。如果存在，则直接返回该ID并记录成功状态。
   * 如果缓存中不存在，则发送GET请求到Steam社区的讨论页面以获取论坛ID。
   * 如果请求成功且返回结果为'Success'，则进一步检查响应状态。
   * 如果状态为200，函数会从响应文本中提取论坛ID，并将其存储到缓存中。
   * 如果成功获取到论坛ID，则记录成功信息并返回该ID。
   * 如果请求失败或返回的结果不为'Success'，则记录错误信息并返回false。
   */
  async #getForumId(gameId: string): Promise<false | string> {
    try {
      const logStatus = echoLog({ type: 'gettingForumId', text: gameId });
      const forumId = this.#cache.forum[gameId];
      if (forumId) {
        logStatus.success();
        return forumId;
      }
      const { result, statusText, status, data } = await httpRequest({
        url: `https://steamcommunity.com/app/${gameId}/discussions/`,
        method: 'GET'
      });
      if (result === 'Success') {
        if (data?.status === 200) {
          const forumId = data.responseText?.match(/General_([\d]+(_[\d]+)?)/)?.[1];
          if (forumId) {
            this.#setCache('forum', gameId, forumId);
            logStatus.success();
            return forumId;
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
      throwError(error as Error, 'Steam.getForumId');
      return false;
    }
  }

  /**
   * 收藏或取消收藏指定的Steam创意工坊物品。
   *
   * @async
   * @function #toggleFavoriteWorkshop
   * @param {string} id - 创意工坊物品的ID。
   * @param {boolean} [doTask=true] - true表示收藏物品，false表示取消收藏物品。
   * @returns {Promise<boolean>} - 返回一个Promise，表示操作的结果。
   *                              - true: 操作成功
   *                              - false: 操作失败
   * @throws {Error} - 如果在操作过程中发生错误，将抛出错误。
   *
   * @description
   * 该函数用于收藏或取消收藏指定的Steam创意工坊物品。
   * 首先检查是否需要执行操作，如果不需要且物品ID在白名单中，则直接返回true。
   * 然后获取创意工坊物品的应用ID，如果未获取到ID，则返回false。
   * 根据操作类型构建请求并发送POST请求到Steam社区的收藏接口。
   * 如果请求成功且返回结果为'Success'，并且状态为200且响应中没有错误信息，则记录成功信息并返回true。
   * 如果请求失败或返回的结果不为'Success'，则记录错误信息并返回false。
   * 如果在操作过程中发生错误，函数将捕获异常并记录错误信息。
   */
  async #toggleFavoriteWorkshop(id: string, doTask = true): Promise<boolean> {
    try {
      if (!doTask && this.whiteList.workshops.includes(id)) {
        echoLog({ type: 'whiteList', text: 'Steam.unfavoriteWorkshop', id });
        return true;
      }
      const appid = await this.#getWorkshopAppId(id);
      if (!appid) return false;
      const logStatus = echoLog({ type: doTask ? 'favoritingWorkshop' : 'unfavoritingWorkshop', text: id });
      const { result, statusText, status, data } = await httpRequest({
        url: `https://steamcommunity.com/sharedfiles/${doTask ? '' : 'un'}favorite`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        data: $.param({ id, appid, sessionid: this.#auth.communitySessionID })
      });
      if (result === 'Success') {
        if (data?.status === 200 && !data.responseText) {
          if (doTask) {
            this.tasks.workshops = unique([...this.tasks.workshops, id]);
          }
          logStatus.success();
          return true;
        }
        logStatus.error(`Error:${data?.statusText}(${data?.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'Steam.toggleFavoriteWorkshop');
      return false;
    }
  }

  /**
   * 获取创意工坊物品的AppId。
   *
   * @async
   * @function #getWorkshopAppId
   * @param {string} id - 创意工坊物品的ID。
   * @returns {Promise<false | string>} - 返回一个Promise，表示获取操作的结果。
   *                                      - string: 获取成功，返回AppId
   *                                      - false: 获取失败
   * @throws {Error} - 如果在获取过程中发生错误，将抛出错误。
   *
   * @description
   * 该函数通过发送GET请求到Steam创意工坊的URL来获取指定物品的AppId。
   * 首先，记录获取状态并检查缓存中是否存在该物品的AppId。
   * 如果缓存中存在，则直接返回该AppId并记录成功状态。
   * 如果缓存中不存在，则发送HTTP请求获取物品的详细信息。
   * 如果请求成功且状态为200，函数会从响应文本中提取AppId并将其缓存。
   * 如果成功获取到AppId，则记录成功信息并返回该AppId。
   * 如果请求失败或返回的结果不符合预期，则记录错误信息并返回false。
   */
  async #getWorkshopAppId(id: string): Promise<false | string> {
    try {
      const logStatus = echoLog({ type: 'gettingWorkshopAppId', text: id });
      const appId = this.#cache.workshop[id];
      if (appId) {
        logStatus.success();
        return appId;
      }
      const { result, statusText, status, data } = await httpRequest({
        url: `https://steamcommunity.com/sharedfiles/filedetails/?id=${id}`,
        method: 'GET'
      });
      if (result === 'Success') {
        if (data?.status === 200) {
          const appId = data.responseText.match(/<input type="hidden" name="appid" value="([\d]+?)" \/>/)?.[1];
          if (appId) {
            this.#setCache('workshop', id, appId);
            logStatus.success();
            return appId;
          }
          logStatus.error('Error: getWorkshopAppId failed');
          return false;
        }
        logStatus.error(`Error:${data?.statusText}(${data?.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'Steam.getWorkshopAppId');
      return false;
    }
  }

  /**
   * 点赞创意工坊物品。
   *
   * @async
   * @function #voteUpWorkshop
   * @param {string} id - 创意工坊物品的ID。
   * @returns {Promise<boolean>} - 返回一个Promise，表示点赞操作的结果。
   *                              - true: 点赞成功
   *                              - false: 点赞失败
   * @throws {Error} - 如果在点赞过程中发生错误，将抛出错误。
   *
   * @description
   * 该函数通过发送POST请求到Steam社区的点赞接口来对指定的创意工坊物品进行点赞。
   * 首先，记录点赞状态并构建请求数据，包括物品ID和会话ID。
   * 如果请求成功且返回结果为'Success'，则进一步检查响应状态。
   * 如果状态为200且响应中表示点赞成功，则记录成功信息并返回true。
   * 如果请求失败或返回的结果不符合预期，则记录错误信息并返回false。
   * 如果在点赞过程中发生错误，函数将捕获异常并记录错误信息。
   */
  async #voteUpWorkshop(id: string): Promise<boolean> {
    try {
      const logStatus = echoLog({ type: 'votingUpWorkshop', text: id });
      const { result, statusText, status, data } = await httpRequest({
        url: 'https://steamcommunity.com/sharedfiles/voteup',
        method: 'POST',
        responseType: 'json',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        data: $.param({ id, sessionid: this.#auth.communitySessionID })
      });
      if (result === 'Success') {
        if (data?.status === 200 && data.response?.success === 1) {
          logStatus.success();
          return true;
        }
        logStatus.error(`Error:${data?.statusText}(${data?.status})`);
        return true;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return true;
    } catch (error) {
      throwError(error as Error, 'Steam.voteupWorkshop');
      return true;
    }
  }

  /**
   * 关注或取关指定的Steam鉴赏家、开发商或发行商。
   *
   * @async
   * @function #toggleCurator
   * @param {string} curatorId - 鉴赏家的ID。
   * @param {boolean} [doTask=true] - true表示关注，false表示取关。
   * @returns {Promise<boolean>} - 返回一个Promise，表示操作的结果。
   *                              - true: 关注成功
   *                              - false: 关注失败
   * @throws {Error} - 如果在操作过程中发生错误，将抛出错误。
   *
   * @description
   * 该函数用于关注或取关指定的Steam鉴赏家、开发商或发行商。
   * 如果doTask为false且鉴赏家ID在白名单中，则直接返回true。
   * 如果存在ASF实例，则调用ASF的`toggleCurator`方法进行操作。
   * 如果ASF不存在，则发送POST请求到Steam的关注接口。
   * 如果请求成功且返回结果为'Success'，并且状态为200且响应中表示操作成功，则记录成功信息并返回true。
   * 如果请求失败或返回的结果不为'Success'，则记录错误信息并返回false。
   * 如果在操作过程中发生错误，函数将捕获异常并记录错误信息。
   */
  async #toggleCurator(curatorId: string, doTask = true): Promise<boolean> {
    try {
      if (!doTask && this.whiteList.curators.includes(curatorId)) {
        echoLog({ type: 'whiteList', text: 'Steam.unfollowCurator', id: curatorId });
        return true;
      }
      if (this.#ASF) {
        return await this.#ASF.toggleCurator(curatorId, doTask);
      }
      const logStatus = echoLog({ type: doTask ? 'followingCurator' : 'unfollowingCurator', text: curatorId });
      const { result, statusText, status, data } = await httpRequest({
        url: 'https://store.steampowered.com/curators/ajaxfollow',
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        data: $.param({ clanid: curatorId, sessionid: this.#auth.storeSessionID, follow: doTask }),
        dataType: 'json'
      });
      if (result === 'Success') {
        if (data?.status === 200 && data.response?.success?.success === 1) {
          logStatus.success();
          return true;
        }
        logStatus.error(`Error:${data?.statusText}(${data?.response?.success}` || `${data?.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'Steam.toggleCurator');
      return false;
    }
  }

  /**
   * 获取Steam开发商或发行商的鉴赏家ID。
   *
   * @async
   * @function getCuratorId
   * @param {string} path - 鉴赏家的类型（如开发商或发行商）。
   * @param {string} name - 鉴赏家的名称。
   * @returns {Promise<false | string>} - 返回一个Promise，表示获取操作的结果。
   *                                      - string: 转换成功，返回鉴赏家ID
   *                                      - false: 转换失败
   * @throws {Error} - 如果在获取过程中发生错误，将抛出错误。
   *
   * @description
   * 该函数通过发送GET请求到Steam的URL来获取指定开发商或发行商的鉴赏家ID。
   * 首先，记录获取状态并检查缓存中是否存在该鉴赏家的ID。
   * 如果缓存中存在，则直接返回该ID并记录成功状态。
   * 如果缓存中不存在，则发送HTTP请求获取鉴赏家的详细信息。
   * 如果请求成功且返回结果为'Success'，则进一步检查响应状态。
   * 如果状态为200，函数会从响应文本中提取鉴赏家ID，并将其存储到缓存中。
   * 如果成功获取到鉴赏家ID，则记录成功信息并返回该ID。
   * 如果请求失败或返回的结果不符合预期，则记录错误信息并返回false。
   */
  async getCuratorId(path: string, name: string): Promise<false | string> {
    try {
      const logStatus = echoLog({ type: 'gettingCuratorId', text: `${path}/${name}` });
      const curatorId = this.#cache.curator[`${path}/${name}`];
      if (curatorId) {
        logStatus.success();
        return curatorId;
      }
      const { result, statusText, status, data } = await httpRequest({
        url: `https://store.steampowered.com/${path}/${name}`,
        method: 'GET',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
      });
      if (result === 'Success') {
        if (data?.status === 200) {
          const curatorId = data.responseText.match(/g_pagingData.*?"clanid":([\d]+)/)?.[1];
          if (curatorId) {
            this.#setCache('curator', `${path}/${name}`, curatorId);
            logStatus.success();
            return curatorId;
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
      throwError(error as Error, 'Steam.getCuratorID');
      return false;
    }
  }

  /**
   * 处理Steam鉴赏家的点赞或取关操作。
   *
   * @async
   * @function #toggleCuratorLike
   * @param {string} link - 鉴赏家的链接，包含类型和名称，以'/'分隔。
   * @param {boolean} [doTask=true] - true表示关注，false表示取关，默认为true。
   * @returns {Promise<boolean>} - 返回一个Promise，表示操作的结果。
   *                              - true: 操作成功
   *                              - false: 操作失败
   * @throws {Error} - 如果在处理过程中发生错误，将抛出错误。
   *
   * @description
   * 该函数用于处理Steam鉴赏家的相关任务。首先，将链接分割为路径和名称。
   * 如果路径或名称无效，则记录错误并返回false。
   * 然后，调用`getCuratorId`方法获取鉴赏家的ID。
   * 如果成功获取到ID，则调用`#toggleCurator`方法执行关注或取关操作。
   * 如果在处理过程中发生任何错误，函数将捕获异常并记录错误信息。
   */
  async #toggleCuratorLike(link: string, doTask = true): Promise<boolean> {
    try {
      const [path, name] = link.split('/');
      if (!(path && name)) {
        echoLog({ text: __('errorLink', link) });
        return false;
      }
      const curatorId = await this.getCuratorId(path, name);
      if (curatorId) {
        return await this.#toggleCurator(curatorId, doTask);
      }
      return false;
    } catch (error) {
      throwError(error as Error, 'Steam.toggleCuratorLike');
      return false;
    }
  }

  /**
   * 获取Steam通知所需的参数。
   *
   * @async
   * @function #getAnnouncementParams
   * @param {string} appId - Steam游戏的AppId。
   * @param {string} viewId - Steam通知的ID。
   * @returns {Promise<announcementParams | {}>} - 返回一个Promise，表示获取操作的结果。
   *                                              - 成功时返回包含clanId和gid的对象
   *                                              - 失败时返回空对象
   * @throws {Error} - 如果在获取过程中发生错误，将抛出错误。
   *
   * @description
   * 该函数通过发送GET请求到Steam的API来获取点赞Steam通知所需的参数。
   * 首先，记录获取状态并构建请求的URL。
   * 如果请求成功且返回结果为'Success'，则进一步检查响应状态。
   * 如果状态为200且响应中表示成功，则提取clanId和gid并返回。
   * 如果获取失败或返回的结果不符合预期，则记录错误信息并返回空对象。
   * 如果在获取过程中发生错误，函数将捕获异常并记录错误信息。
   */
  async #getAnnouncementParams(appId: string, viewId: string): Promise<announcementParams> {
    try {
      const logStatus = echoLog({ type: 'gettingAnnouncementParams', text: appId, id: viewId });
      const { result, statusText, status, data } = await httpRequest({
        // eslint-disable-next-line max-len
        url: `https://store.steampowered.com/events/ajaxgetpartnerevent?appid=${appId}&announcement_gid=${viewId}&lang_list=6_0&last_modified_time=0&origin=https:%2F%2Fstore.steampowered.com&for_edit=false`,
        method: 'GET',
        responseType: 'json',
        headers: {
          Host: 'store.steampowered.com',
          Referer: `https://store.steampowered.com/news/app/${appId}/view/${viewId}`
        }
      });
      if (result === 'Success') {
        if (data?.status === 200 && data?.response?.success === 1) {
          /*
          if (this.#area === 'CN' && data.responseText.includes('id="error_box"')) {
            logStatus.warning(__('changeAreaNotice'));
            if (!(await this.#changeArea())) return {};
            return await this.#getAnnouncementParams(appId, viewId);
          }
          */
          const { clanid, gid } = data.response.event?.announcement_body || {};
          if (clanid) {
            logStatus.success();
            return { clanId: clanid, gid };
          }
          logStatus.error(`Error:${data.statusText}(${data.status})`);
          return {};
        }
        logStatus.error(`Error:${data?.statusText}(${data?.status})`);
        return {};
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return {};
    } catch (error) {
      throwError(error as Error, 'Steam.likeAnnouncement');
      return {};
    }
  }

  /**
   * 点赞Steam通知。
   *
   * @async
   * @function #likeAnnouncement
   * @param {string} id - Steam游戏的AppId和Steam通知的ID，以'/'分隔。
   * @returns {Promise<boolean>} - 返回一个Promise，表示点赞操作的结果。
   *                              - true: 点赞成功
   *                              - false: 点赞失败
   * @throws {Error} - 如果在点赞过程中发生错误，将抛出错误。
   *
   * @description
   * 该函数用于对指定的Steam通知进行点赞。首先，将传入的ID分割为AppId和viewId。
   * 如果AppId或viewId无效，则记录错误并返回false。
   * 然后，调用`#getAnnouncementParams`方法获取所需的参数，包括clanId和gid。
   * 如果未获取到clanId，则返回false。
   * 接着，发送POST请求到Steam的点赞接口，携带必要的请求头和数据。
   * 如果请求成功且返回结果为'Success'，并且状态为200且响应中表示点赞成功，则记录成功信息并返回true。
   * 如果请求失败或返回的结果不符合预期，则记录错误信息并返回false。
   * 如果在点赞过程中发生错误，函数将捕获异常并记录错误信息。
   */
  async #likeAnnouncement(id: string):Promise<boolean> {
    try {
      const [appId, viewId] = id.split('/');
      if (!(appId && viewId)) {
        echoLog({}).error(`${__('missParams')}(id)`);
        return false;
      }
      const { clanId, gid } = await this.#getAnnouncementParams(appId, viewId);
      if (!clanId) {
        return false;
      }
      const logStatus = echoLog({ type: 'likingAnnouncement', text: appId, id: viewId });
      const { result, statusText, status, data } = await httpRequest({
        url: `https://store.steampowered.com/updated/ajaxrateupdate/${gid || viewId}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          Host: 'store.steampowered.com',
          Origin: 'https://store.steampowered.com',
          Referer: `https://store.steampowered.com/news/app/${appId}/view/${viewId}`
        },
        data: $.param({
          sessionid: this.#auth.storeSessionID,
          voteup: 1,
          clanid: clanId,
          ajax: 1
        }),
        dataType: 'json'
      });
      if (result === 'Success') {
        if (data?.status === 200 && data.response.success === 1) {
          logStatus.success();
          return true;
        }
        logStatus.error(`Error:${data?.statusText}(${data?.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'Steam.likeAnnouncement');
      return false;
    }
  }

  /**
   * 将Steam游戏的AppId转换为SubId。
   *
   * @async
   * @function #appid2subid
   * @param {string} id - Steam游戏的AppId。
   * @returns {Promise<string | false>} - 返回一个Promise，表示转换操作的结果。
   *                                      - string: 转换成功，返回SubId
   *                                      - false: 转换失败
   * @throws {Error} - 如果在转换过程中发生错误，将抛出错误。
   *
   * @description
   * 该函数通过发送GET请求到Steam的应用页面来获取对应的SubId。
   * 首先，记录获取状态并发送请求。
   * 如果请求成功且状态为200，函数会检查响应文本以确定游戏是否已拥有。
   * 如果游戏已拥有，则返回false。
   * 如果当前地区为中国且响应中包含错误信息，则尝试更换地区并重试获取SubId。
   * 如果成功获取到SubId，则返回该值。
   * 如果请求失败或返回的结果不符合预期，则记录错误信息并返回false。
   * 如果在转换过程中发生错误，函数将捕获异常并记录错误信息。
   */
  async #appid2subid(id: string): Promise<string | false> {
    try {
      const logStatus = echoLog({ type: 'gettingSubid', text: id });
      const { result, statusText, status, data } = await httpRequest({
        url: `https://store.steampowered.com/app/${id}`,
        method: 'GET',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
      });
      if (result === 'Success') {
        if (data?.status === 200) {
          if (data.responseText.includes('ds_owned_flag ds_flag') || data.responseText.includes('class="already_in_library"')) {
            logStatus.success(__('owned'));
            return false;
          }
          if (this.#area === 'CN' && data.responseText.includes('id="error_box"')) {
            logStatus.warning(__('changeAreaNotice'));
            const result = await this.#changeArea();
            if (!result || result === 'CN' || result === 'skip') return false;
            return await this.#appid2subid(id);
          }
          let subid = data.responseText.match(/name="subid" value="([\d]+?)"/)?.[1];
          if (subid) {
            logStatus.success();
            return subid;
          }
          subid = data.responseText.match(/AddFreeLicense\(\s*(\d+)/)?.[1];
          if (subid) {
            logStatus.success();
            return subid;
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
      throwError(error as Error, 'Steam.appid2subid');
      return false;
    }
  }

  /**
   * 获取Steam用户的游戏许可证信息。
   *
   * @async
   * @function #getLicenses
   * @returns {Promise<Array<number> | false>} - 返回一个Promise，表示获取操作的结果。
   *                                              - Array<number>: 成功时返回许可证ID数组
   *                                              - false: 获取失败
   * @throws {Error} - 如果在获取过程中发生错误，将抛出错误。
   *
   * @description
   * 该函数通过发送GET请求到Steam的动态商店用户数据接口来获取用户的许可证信息。
   * 首先，记录获取状态并发送请求。
   * 如果请求成功且返回结果为'Success'，则进一步检查响应状态。
   * 如果状态为200，函数会返回用户拥有的许可证ID数组。
   * 如果获取失败或返回的结果不符合预期，则记录错误信息并返回false。
   * 如果在获取过程中发生错误，函数将捕获异常并记录错误信息。
   */
  async #getLicenses(): Promise<Array<number> | false> {
    try {
      const logStatus = echoLog({ text: __('gettingLicenses') });
      const { result, statusText, status, data } = await httpRequest({
        url: `https://store.steampowered.com/dynamicstore/userdata/?t=${new Date().getTime()}`,
        method: 'GET',
        responseType: 'json'
      });
      if (result === 'Success') {
        if (data?.status === 200) {
          logStatus.success();
          // return [...data.responseText.matchAll(/RemoveFreeLicense\([\s]*?([\d]+)/g)].map((arr) => arr[1]).filter((subid) => subid);
          return data.response?.rgOwnedPackages;
        }
        logStatus.error(`Error:${data?.statusText}(${data?.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'Steam.getLicenses');
      return false;
    }
  }

  /**
   * 添加Steam游戏许可证。
   *
   * @async
   * @function #addLicense
   * @param {string} id - 要添加的许可证ID，格式为'appid-xxxx'或'subid-xxxx,xxxx'。
   * @returns {Promise<boolean>} - 返回一个Promise，表示添加操作的结果。
   *                              - true: 添加成功
   *                              - false: 添加失败
   * @throws {Error} - 如果在添加过程中发生错误，将抛出错误。
   *
   * @description
   * 该函数用于添加指定的Steam许可证。首先检查是否存在ASF实例，如果存在，则调用ASF的`addLicense`方法。
   * 如果许可证ID的类型为'appid'，则调用`#appid2subid`方法获取对应的SubId。
   * 如果获取成功，则记录添加状态并发送GET请求到Steam应用页面以验证许可证是否已添加。
   * 如果许可证ID的类型为'subid'，则检查当前地区是否为中国，如果是，则尝试更换地区。
   * 然后逐个添加SubId，并记录每个添加操作的状态。
   * 最后，检查已添加的许可证是否成功，并返回操作结果。
   */
  async #addLicense(id: string): Promise<boolean> {
    try {
      if (this.#ASF) {
        return await this.#ASF.addLicense(id);
      }
      const [type, ids] = id.split('-');
      if (type === 'appid') {
        const subid = await this.#appid2subid(ids);
        if (!subid) return false;
        const logStatus = echoLog({ type: 'addingFreeLicense', text: ids });
        if (!await this.#addFreeLicense(subid, logStatus)) return false;

        const { result, statusText, status, data } = await httpRequest({
          url: `https://store.steampowered.com/app/${ids}`,
          method: 'GET'
        });
        if (result === 'Success') {
          if (data?.status === 200) {
            if (data.responseText.includes('ds_owned_flag ds_flag') || data.responseText.includes('class="already_in_library"')) {
              logStatus.success();
              return true;
            }
            logStatus.error(`Error:${data.statusText}(${data.status})`);
            return false;
          }
          logStatus.error(`Error:${data?.statusText}(${data?.status})`);
          return false;
        }
        logStatus.error(`${result}:${statusText}(${status})`);
        return false;
      } else if (type === 'subid') {
        if (this.#area === 'CN') {
          echoLog({}).success(__('tryChangeAreaNotice'));
          await this.#changeArea();
        }
        const logStatusArr: commonObject = {};
        const idsArr = ids.split(',');
        for (const subid of idsArr) {
          const logStatus = echoLog({ type: 'addingFreeLicenseSubid', text: subid });
          if (!await this.#addFreeLicense(subid, logStatus)) return false;
          logStatusArr[subid] = logStatus;
        }
        const licenses = await this.#getLicenses();
        if (!licenses) return false;
        for (const subid of idsArr) {
          if (licenses.includes(parseInt(subid, 10))) {
            logStatusArr[subid].success();
          } else {
            logStatusArr[subid].error();
          }
        }
        return true;
      }
      return false;
    } catch (error) {
      throwError(error as Error, 'Steam.addLicense');
      return false;
    }
  }

  /**
   * 添加免费Steam游戏许可证。
   *
   * @async
   * @function #addFreeLicense
   * @param {string} id - Steam游戏的subid。
   * @param {logStatus} [logStatusPre] - 可选的日志状态，用于记录操作状态。
   * @returns {Promise<boolean>} - 返回一个Promise，表示添加操作的结果。
   *                              - true: 添加成功
   *                              - false: 添加失败
   * @throws {Error} - 如果在添加过程中发生错误，将抛出错误。
   *
   * @description
   * 该函数用于将指定的Steam游戏许可证添加到用户的账户中。
   * 首先，记录添加状态并发送POST请求到Steam的免费许可证添加接口。
   * 如果请求成功且返回结果为'Success'，则进一步检查响应状态。
   * 如果状态为200，函数会检查当前地区是否为中国，并处理相应的错误信息。
   * 如果添加成功，则记录成功信息并返回true。
   * 如果请求失败或返回的结果不符合预期，则记录错误信息并返回false。
   * 如果在添加过程中发生错误，函数将捕获异常并记录错误信息。
   */
  async #addFreeLicense(id: string, logStatusPre?: logStatus): Promise<boolean> {
    try {
      const logStatus = logStatusPre || echoLog({ type: 'addingFreeLicenseSubid', text: id });
      const { result, statusText, status, data } = await httpRequest({
        url: `https://store.steampowered.com/freelicense/addfreelicense/${id}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          Host: 'store.steampowered.com',
          Origin: 'https://store.steampowered.com',
          Referer: 'https://store.steampowered.com/account/licenses/'
        },
        data: $.param({
          ajax: true,
          sessionid: this.#auth.storeSessionID
        }),
        dataType: 'json'
      });
      if (result === 'Success') {
        if (data?.status === 200) {
          if (this.#area === 'CN' && data.responseText.includes('id="error_box"')) {
            logStatus.warning(__('changeAreaNotice'));
            const result = await this.#changeArea();
            if (!result || result === 'CN') return false;
            return await this.#addFreeLicense(id);
          }
          logStatus.success();
          return true;
        }
        logStatus.error(`Error:${data?.statusText}(${data?.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'Steam.addFreeLicense');
      return false;
    }
  }

  /**
   * 请求Steam游戏的试玩访问权限。
   *
   * @async
   * @function #requestPlayTestAccess
   * @param {string} id - Steam游戏的AppId。
   * @returns {Promise<boolean>} - 返回一个Promise，表示请求操作的结果。
   *                              - true: 请求成功
   *                              - false: 请求失败
   * @throws {Error} - 如果在请求过程中发生错误，将抛出错误。
   *
   * @description
   * 该函数用于请求指定Steam游戏的试玩访问权限。
   * 如果存在ASF实例，则调用ASF的`requestPlayTestAccess`方法进行请求。
   * 如果ASF不存在，则构建请求的URL并发送POST请求到Steam的API。
   * 请求的头信息包括内容类型和来源等。
   * 如果请求成功且返回结果为'Success'，则进一步检查响应数据。
   * 如果状态为200且响应中表示请求成功，则记录成功信息并返回true。
   * 如果请求失败或返回的结果不符合预期，则记录错误信息并返回false。
   * 如果在请求过程中发生错误，函数将捕获异常并记录错误信息。
   */
  async #requestPlayTestAccess(id: string): Promise<boolean> {
    try {
      if (this.#ASF) {
        return await this.#ASF.requestPlayTestAccess(id);
      }
      const logStatus = echoLog({ type: 'requestingPlayTestAccess', text: id });
      const { result, statusText, status, data } = await httpRequest({
        url: `https://store.steampowered.com/ajaxrequestplaytestaccess/${id}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          Host: 'store.steampowered.com',
          Origin: 'https://store.steampowered.com',
          Referer: `https://store.steampowered.com/app/${id}`
        },
        data: $.param({
          sessionid: this.#auth.storeSessionID
        }),
        dataType: 'json'
      });
      if (result === 'Success') {
        if (data?.status === 200 && data?.response?.success === 1) {
          logStatus.success();
          return true;
        }
        logStatus.error(`Error:${data?.statusText}(${data?.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'Steam.requestPlayTestAccess');
      return false;
    }
  }

  /**
   * 切换Steam相关任务的执行状态。
   *
   * @async
   * @function toggle
   * @param {Object} options - 任务选项对象。
   * @param {boolean} [options.doTask=true] - true表示执行任务，false表示取消任务。
   * @param {Array<string>} [options.groupLinks=[]] - 需要处理的Steam群组链接数组。
   * @param {Array<string>} [options.officialGroupLinks=[]] - 需要处理的官方群组链接数组。
   * @param {Array<string>} [options.wishlistLinks=[]] - 需要处理的愿望清单链接数组。
   * @param {Array<string>} [options.followLinks=[]] - 需要处理的关注链接数组。
   * @param {Array<string>} [options.forumLinks=[]] - 需要处理的论坛链接数组。
   * @param {Array<string>} [options.workshopLinks=[]] - 需要处理的创意工坊链接数组。
   * @param {Array<string>} [options.workshopVoteLinks=[]] - 需要处理的创意工坊投票链接数组。
   * @param {Array<string>} [options.curatorLinks=[]] - 需要处理的鉴赏家链接数组。
   * @param {Array<string>} [options.curatorLikeLinks=[]] - 需要处理的鉴赏家点赞链接数组。
   * @param {Array<string>} [options.announcementLinks=[]] - 需要处理的公告链接数组。
   * @param {Array<string>} [options.licenseLinks=[]] - 需要处理的许可证链接数组。
   * @param {Array<string>} [options.playtestLinks=[]] - 需要处理的试玩链接数组。
   * @returns {Promise<boolean>} - 返回一个Promise，表示操作的结果。
   *                              - true: 操作成功
   *                              - false: 操作失败
   * @throws {Error} - 如果在执行过程中发生错误，将抛出错误。
   *
   * @description
   * 该函数用于统一处理与Steam相关的各种任务。根据传入的链接数组和操作类型，执行相应的任务。
   * 如果需要执行的任务未初始化，则记录提示并返回false。
   * 函数会根据不同的任务类型（如加入群组、添加愿望清单等）调用相应的方法，并将任务添加到Promise数组中。
   * 最后，返回所有任务的执行结果。
   */
  async toggle({
    doTask = true,
    groupLinks = [],
    officialGroupLinks = [],
    wishlistLinks = [],
    followLinks = [],
    forumLinks = [],
    workshopLinks = [],
    workshopVoteLinks = [],
    curatorLinks = [],
    curatorLikeLinks = [],
    announcementLinks = [],
    licenseLinks = [],
    playtestLinks = []
  }: {
    doTask?: boolean,
    groupLinks?: Array<string>,
    officialGroupLinks?: Array<string>,
    wishlistLinks?: Array<string>,
    followLinks?: Array<string>,
    forumLinks?: Array<string>,
    workshopLinks?: Array<string>,
    workshopVoteLinks?: Array<string>,
    curatorLinks?: Array<string>,
    curatorLikeLinks?: Array<string>,
    announcementLinks?: Array<string>,
    licenseLinks?: Array<string>,
    playtestLinks?: Array<string>,
  }): Promise<boolean> {
    try {
      if ([...groupLinks, ...officialGroupLinks, ...forumLinks, ...workshopLinks, ...workshopVoteLinks].length > 0 && !this.#communityInitialized) {
        echoLog({ text: __('needInit') });
        return false;
      }
      if ([
        ...wishlistLinks, ...followLinks, ...curatorLinks, ...curatorLikeLinks, ...announcementLinks, ...licenseLinks, ...playtestLinks
      ].length > 0 &&
          !this.#storeInitialized) {
        echoLog({ text: __('needInit') });
        return false;
      }
      const prom = [];

      if (
        (doTask && !globalOptions.doTask.steam.groups) ||
        (!doTask && !globalOptions.undoTask.steam.groups)
      ) {
        echoLog({ type: 'globalOptionsSkip', text: 'steam.groups' });
      } else {
        const realGroups = this.getRealParams('groups', groupLinks, doTask, (link) => link.match(/groups\/(.+)\/?/)?.[1]);
        if (realGroups.length > 0) {
          for (const group of realGroups) {
            if (doTask) {
              prom.push(this.#joinGroup(group));
            } else {
              prom.push(this.#leaveGroup(group));
            }
            await delay(1000);
          }
        }
      }

      if (
        (doTask && !globalOptions.doTask.steam.officialGroups) ||
        (!doTask && !globalOptions.undoTask.steam.officialGroups)
      ) {
        echoLog({ type: 'globalOptionsSkip', text: 'steam.officialGroups' });
      } else {
        const realOfficialGroups = this.getRealParams('officialGroups', officialGroupLinks, doTask, (link) => link.match(/games\/(.+)\/?/)?.[1]);
        if (realOfficialGroups.length > 0) {
          for (const officialGroup of realOfficialGroups) {
            if (doTask) {
              prom.push(this.#joinOfficialGroup(officialGroup));
            } else {
              prom.push(this.#leaveOfficialGroup(officialGroup));
            }
            await delay(1000);
          }
        }
      }

      if (
        (doTask && !globalOptions.doTask.steam.wishlists) ||
        (!doTask && !globalOptions.undoTask.steam.wishlists)
      ) {
        echoLog({ type: 'globalOptionsSkip', text: 'steam.wishlists' });
      } else {
        const realWishlists = this.getRealParams('wishlists', wishlistLinks, doTask, (link) => link.match(/app\/([\d]+)/)?.[1]);
        if (realWishlists.length > 0) {
          for (const game of realWishlists) {
            if (doTask) {
              prom.push(this.#addToWishlist(game));
            } else {
              prom.push(this.#removeFromWishlist(game));
            }
            await delay(1000);
          }
        }
      }

      if (
        (doTask && !globalOptions.doTask.steam.follows) ||
        (!doTask && !globalOptions.undoTask.steam.follows)
      ) {
        echoLog({ type: 'globalOptionsSkip', text: 'steam.follows' });
      } else {
        const realFollows = this.getRealParams('follows', followLinks, doTask, (link) => link.match(/app\/([\d]+)/)?.[1]);
        if (realFollows.length > 0) {
          for (const game of realFollows) {
            prom.push(this.#toggleFollowGame(game, doTask));
            await delay(1000);
          }
        }
      }

      if (
        (doTask && !globalOptions.doTask.steam.forums) ||
        (!doTask && !globalOptions.undoTask.steam.forums)
      ) {
        echoLog({ type: 'globalOptionsSkip', text: 'steam.forums' });
      } else {
        const realForums = this.getRealParams('forums', forumLinks, doTask, (link) => link.match(/app\/([\d]+)/)?.[1]);
        if (realForums.length > 0) {
          for (const forum of realForums) {
            prom.push(this.#toggleForum(forum, doTask));
            await delay(1000);
          }
        }
      }

      if (
        (doTask && !globalOptions.doTask.steam.workshops) ||
        (!doTask && !globalOptions.undoTask.steam.workshops)
      ) {
        echoLog({ type: 'globalOptionsSkip', text: 'steam.workshops' });
      } else {
        const realWorkshops = this.getRealParams('workshops', workshopLinks, doTask, (link) => link.match(/\?id=([\d]+)/)?.[1]);
        if (realWorkshops.length > 0) {
          for (const workshop of realWorkshops) {
            prom.push(this.#toggleFavoriteWorkshop(workshop, doTask));
            await delay(1000);
          }
        }
      }

      if (doTask && !globalOptions.doTask.steam.workshopVotes) {
        echoLog({ type: 'globalOptionsSkip', text: 'steam.workshopVotes' });
      } else {
        const realworkshopVotes = this.getRealParams('workshopVotes', workshopVoteLinks, doTask, (link) => link.match(/\?id=([\d]+)/)?.[1]);
        if (doTask && realworkshopVotes.length > 0) {
          for (const workshop of realworkshopVotes) {
            prom.push(this.#voteUpWorkshop(workshop));
            await delay(1000);
          }
        }
      }

      if (
        (doTask && !globalOptions.doTask.steam.curators) ||
        (!doTask && !globalOptions.undoTask.steam.curators)
      ) {
        echoLog({ type: 'globalOptionsSkip', text: 'steam.curators' });
      } else {
        const realCurators = this.getRealParams('curators', curatorLinks, doTask, (link) => link.match(/curator\/([\d]+)/)?.[1]);
        const realCuratorLikes = this.getRealParams('curatorLikes', curatorLikeLinks, doTask,
          (link) => link.match(/https?:\/\/store\.steampowered\.com\/(.*?)\/([^/?]+)/)?.slice(1, 3)
            .join('/'));
        if (realCurators.length > 0) {
          for (const curator of realCurators) {
            prom.push(this.#toggleCurator(curator, doTask));
            await delay(1000);
          }
        }
        if (realCuratorLikes.length > 0) {
          for (const curatorLike of realCuratorLikes) {
            prom.push(this.#toggleCuratorLike(curatorLike, doTask));
            await delay(1000);
          }
        }
      }

      if (doTask && !globalOptions.doTask.steam.announcements) {
        echoLog({ type: 'globalOptionsSkip', text: 'steam.announcements' });
      } else {
        const realAnnouncements = this.getRealParams('announcements', announcementLinks, doTask,
          (link) => {
            if (link.includes('store.steampowered.com')) {
              return link.match(/store\.steampowered\.com\/news\/app\/([\d]+)\/view\/([\d]+)/)?.slice(1, 3)
                .join('/');
            }
            return link.match(/steamcommunity\.com\/games\/([\d]+)\/announcements\/detail\/([\d]+)/)?.slice(1, 3)
              .join('/');
          });
        if (doTask && realAnnouncements.length > 0) {
          for (const id of realAnnouncements) {
            prom.push(this.#likeAnnouncement(id));
            await delay(1000);
          }
        }
      }

      if (doTask && !globalOptions.doTask.steam.licenses) {
        echoLog({ type: 'globalOptionsSkip', text: 'steam.licenses' });
      } else if (doTask && globalOptions.doTask.steam.licenses && licenseLinks.length > 0) {
        for (const id of licenseLinks) {
          prom.push(this.#addLicense(id));
          await delay(1000);
        }
      }

      if (doTask && !globalOptions.doTask.steam.playtests) {
        echoLog({ type: 'globalOptionsSkip', text: 'steam.playtests' });
      } else {
        const realPlaytests = this.getRealParams('playtests', playtestLinks, doTask, (link) => link.match(/app\/([\d]+)/)?.[1]);
        if (doTask && globalOptions.doTask.steam.playtests && realPlaytests.length > 0) {
          for (const id of realPlaytests) {
            prom.push(this.#requestPlayTestAccess(id));
            await delay(1000);
          }
        }
      }
      // TODO: 返回值处理
      return Promise.all(prom).then(async () => {
        if (this.#area !== 'CN') {
          echoLog({}).warning(__('steamFinishNotice'));
          await this.#changeArea('CN');
        }
        return true;
      });
    } catch (error) {
      throwError(error as Error, 'Steam.toggle');
      return false;
    }
  }

  /**
   * 设置缓存的ID与名称的对应关系。
   *
   * @private
   * @function #setCache
   * @param {steamCacheTypes} type - 缓存类型，指定要设置的缓存类别。
   * @param {string} name - 缓存项的名称。
   * @param {string} id - 要缓存的ID。
   * @returns {void} - 无返回值。
   * @throws {Error} - 如果在设置缓存过程中发生错误，将抛出错误。
   *
   * @description
   * 该函数用于缓存ID与名称的对应关系。它将指定的ID存储在对应的缓存类型和名称下。
   * 如果在设置过程中发生错误，将调用`throwError`函数记录错误信息。
   */
  #setCache(type: steamCacheTypes, name: string, id: string): void {
    try {
      this.#cache[type][name] = id;
      GM_setValue('steamCache', this.#cache);
    } catch (error) {
      throwError(error as Error, 'Steam.setCache');
    }
  }
}
export default Steam;

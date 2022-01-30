/*
 * @Author       : HCLonely
 * @Date         : 2021-10-04 16:07:55
 * @LastEditTime : 2022-01-30 12:09:57
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/social/Steam.ts
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
const defaultTasks = JSON.stringify(defaultTasksTemplate);

class Steam extends Social {
  tasks: steamTasks = JSON.parse(defaultTasks);
  whiteList: steamTasks = { ...JSON.parse(defaultTasks), ...GM_getValue<whiteList>('whiteList')?.steam };
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

  async init(type = 'all'): Promise<boolean> {
    /**
     * @description: 验证及获取Auth
     * @return true: 初始化完成 | false: 初始化失败，toggle方法不可用
     */
    try {
      if (type === 'store') {
        if (this.#storeInitialized) {
          return true;
        }
        this.#storeInitialized = await this.#updateStoreAuth();
        echoLog({}).success(__('initSuccess', 'SteamStore'));
        return true;
      }
      if (type === 'community') {
        if (this.#communityInitialized) {
          return true;
        }
        this.#communityInitialized = await this.#updateCommunityAuth();
        echoLog({}).success(__('initSuccess', 'SteamCommunity'));
        return true;
      }

      this.#storeInitialized = await this.#updateStoreAuth();
      this.#communityInitialized = await this.#updateCommunityAuth();
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

  async #updateStoreAuth(): Promise<boolean> {
    /**
     * @internal
     * @description 更新Steam商店Token.
     * @return true: 更新Token成功 | false: 更新Token失败
     */
    try {
      const logStatus = echoLog({ text: __('updatingAuth', __('steamStore')) });
      const { result, statusText, status, data } = await httpRequest({
        url: 'https://store.steampowered.com/stats/',
        method: 'GET'
      });
      if (result === 'Success') {
        if (data?.status === 200) {
          if (data.responseText.includes('href="https://store.steampowered.com/login/')) {
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
        logStatus.error(`Error:${data?.statusText}(${data?.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'Steam.updateStoreAuth');
      return false;
    }
  }

  async #updateCommunityAuth(): Promise<boolean> {
    /**
     * @internal
     * @description 更新Steam社区Token.
     * @return true: 更新Token成功 | false: 更新Token失败
     */
    try {
      const logStatus = echoLog({ text: __('updatingAuth', __('steamCommunity')) });
      const { result, statusText, status, data } = await httpRequest({
        url: 'https://steamcommunity.com/my',
        method: 'GET'
      });
      if (result === 'Success') {
        if (data?.status === 200) {
          if (data.responseText.includes('href="https://steamcommunity.com/login/home/')) {
            logStatus.error(`Error:${__('needLoginSteamCommunity')}`, true);
            return false;
          }
          const steam64Id = data.responseText.match(/g_steamID = "(.+?)";/)?.[1];
          const communitySessionID = data.responseText.match(/g_sessionID = "(.+?)";/)?.[1];
          const userName = data.responseText.match(/steamcommunity.com\/id\/(.+?)\/friends\//)?.[1];
          if (steam64Id) this.#auth.steam64Id = steam64Id;
          if (userName) this.#auth.userName = userName;
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

  async #getAreaInfo(): Promise<areas> {
    /**
     * @internal
     * @description 获取当前购物车地区及可更换的地区（需自备梯子）
     * @return { currentArea : 当前购物车地区, areas : 可更换的地区 } | {}: 更新Token失败
     */
    try {
      const logStatus = echoLog({ text: __('gettingAreaInfo') });
      const { result, statusText, status, data } = await httpRequest({
        url: 'https://store.steampowered.com/cart/',
        method: 'GET'
      });
      if (result === 'Success') {
        if (data?.status === 200) {
          const currentArea = data.responseText.match(/<input id="usercountrycurrency".*?value="(.+?)"/)?.[1];
          const areas = [...data.responseText.matchAll(/<div class="currency_change_option .*?" data-country="(.+?)" >/g)]
            .map((search) => search[1]);
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

  async #changeArea(area?: string): Promise<boolean | string> {
    /**
     * @internal
     * @description 更换国家/地区，仅限国区切换其他地区，防止限区游戏做任务失败
     * @return {string}: 更换成功，返回更换后的地区 | false: 更换地区失败
     */
    try {
      let aimedArea = area;
      if (!aimedArea) {
        const { currentArea, areas } = await this.#getAreaInfo();
        if (!currentArea || !areas) return false;
        if (currentArea !== 'CN') {
          echoLog({ text: 'notNeededChangeArea' });
          return 'skip';
        }
        const anotherArea = areas.filter((area) => area && area !== 'CN');
        if (!anotherArea || anotherArea.length === 0) {
          echoLog({ text: 'noAnotherArea' });
          return false;
        }
        [aimedArea] = anotherArea;
      }
      const logStatus = echoLog({ text: __('changingArea', aimedArea) });
      const { result, statusText, status, data } = await httpRequest({
        url: 'https://store.steampowered.com/account/setcountry',
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        data: $.param({ cc: aimedArea, sessionid: this.#auth.storeSessionID })
      });
      if (result === 'Success') {
        if (data?.status === 200 && data.responseText === 'true') {
          const { currentArea } = await this.#getAreaInfo();
          if (currentArea === aimedArea) {
            logStatus.success();
            return currentArea;
          }
          logStatus.error('Error: change country filed');
          return 'CN';
        }
        logStatus.error(`Error:${data?.statusText}(${data?.status})`);
        return 'CN';
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return 'CN';
    } catch (error) {
      throwError(error as Error, 'Steam.changeArea');
      return false;
    }
  }

  async #joinGroup(groupName: string): Promise<boolean> {
    /**
     * @internal
     * @description 加入Steam组
     * @param groupName Steam组名
     * @return true: 成功 | false: 失败
     */
    try {
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
  async #leaveGroup(groupName: string): Promise<boolean> {
    /**
     * @internal
     * @description 退出Steam组
     * @param groupName Steam组名
     * @return true: 成功 | false: 失败
     */
    try {
      if (this.whiteList.groups.includes(groupName)) {
        echoLog({ type: 'whiteList', text: 'Steam.leaveGroup', id: groupName });
        return true;
      }
      const groupId = await this.#getGroupId(groupName);
      if (!groupId) return false;
      const logStatus = echoLog({ type: 'leavingSteamGroup', text: groupName });
      const { result, statusText, status, data } = await httpRequest({
        url: `https://steamcommunity.com/id/${this.#auth.userName}/home_process`,
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
  async #getGroupId(groupName: string): Promise<false | string> {
    /**
     * @internal
     * @description Steam组名转id, 用于退组
     * @param groupName Steam组名
     * @return {string}: 转换成功，返回组id | false: 失败
     */
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

  async #joinOfficialGroup(gameId: string): Promise<boolean> {
    /**
     * @internal
     * @description 加入Steam 官方组
     * @param gameId Steam游戏Id
     * @return true: 成功 | false: 失败
     */
    try {
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
  async #leaveOfficialGroup(gameId: string): Promise<boolean> {
    /**
     * @internal
     * @description 退出Steam组
     * @param groupName Steam组名
     * @return true: 成功 | false: 失败
     */
    try {
      if (this.whiteList.officialGroups.includes(gameId)) {
        echoLog({ type: 'whiteList', text: 'Steam.leaveOfficialGroup', id: gameId });
        return true;
      }
      const groupId = await this.#getOfficialGroupId(gameId);
      if (!groupId) return false;
      const logStatus = echoLog({ type: 'leavingSteamOfficialGroup', text: gameId });
      const { result, statusText, status, data } = await httpRequest({
        url: `https://steamcommunity.com/id/${this.#auth.userName}/home_process`,
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
  async #getOfficialGroupId(gameId: string): Promise<false | string> {
    /**
     * @internal
     * @description Steam游戏id转组id, 用于退官方组
     * @param gameId Steam游戏id
     * @return {string}: 转换成功，返回组id | false: 失败
     */
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

  async #addToWishlist(gameId: string): Promise<boolean> {
    /**
     * @internal
     * @description Steam添加游戏到愿望单
     * @param gameId Steam游戏AppId
     * @return true: 成功 | false: 失败
     */
    try {
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
  async #removeFromWishlist(gameId: string): Promise<boolean> {
    /**
     * @internal
     * @description 从Steam愿望单移除游戏
     * @param gameId Steam游戏AppId
     * @return true: 成功 | false: 失败
     */
    try {
      if (this.whiteList.wishlists.includes(gameId)) {
        echoLog({ type: 'whiteList', text: 'Steam.removeFromWishlist', id: gameId });
        return true;
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

  async #toggleFollowGame(gameId: string, doTask: boolean): Promise<boolean> {
    /**
     * @internal
     * @description Steam 关注取关游戏
     * @param gameId Steam游戏AppId
     * @param doTask true: 关注游戏 | false: 取关游戏
     * @return true: 成功 | false: 失败
     */
    try {
      if (!doTask && this.whiteList.follows.includes(gameId)) {
        echoLog({ type: 'whiteList', text: 'Steam.unfollowGame', id: gameId });
        return true;
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
  async #isFollowedGame(gameId: string): Promise<boolean | 'areaLocked'> {
    /**
     * @internal
     * @description 判断steam游戏是否已关注
     * @param gameId Steam游戏AppId
     * @return true: 已关注 | 'areaLocked': 游戏锁区 | false: 未关注
     */
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
  async #toggleForum(gameId: string, doTask = true): Promise<boolean> {
    /**
      * @internal
      * @description 订阅/取消订阅Steam论坛
      * @param gameId Steam游戏AppId
      * @param doTask true: 订阅论坛 | false: 取消订阅论坛
      * @return true: 成功 | false: 失败
      */
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
  async #getForumId(gameId: string): Promise<false | string> {
    /**
      * @internal
      * @description Steam游戏AppId转论坛id
      * @param gameId Steam游戏AppId
      * @return string: 转换成功，返回论坛id | false: 失败
      */
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

  async #toggleFavoriteWorkshop(id: string, doTask = true): Promise<boolean> {
    /**
      * @internal
      * @description 收藏Steam创意工坊物品
      * @param id 创意工坊物品id
      * @return true: 收藏成功 | false: 收藏失败
      */
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
  async #getWorkshopAppId(id: string): Promise<false | string> {
    /**
      * @internal
      * @description 获取创意工坊AppId
      * @param id 创意工坊物品id
      * @return string: 获取成功，返回AppId | false: 获取失败
      */
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
  async #voteUpWorkshop(id: string): Promise<boolean> {
    /**
      * @internal
      * @description 点赞创意工坊物品
      * @param id 创意工坊物品id
      * @return true: 点赞成功 | false: 点赞失败
      */
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
  async #toggleCurator(curatorId: string, doTask = true): Promise<boolean> {
    /**
      * @internal
      * @description 关注Steam鉴赏家/开发商/发行商
      * @param curatorId 鉴赏家id
      * @return true: 关注成功 | false: 关注失败
      */
    try {
      if (!doTask && this.whiteList.curators.includes(curatorId)) {
        echoLog({ type: 'whiteList', text: 'Steam.unfollowCurator', id: curatorId });
        return true;
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
  async getCuratorId(path: string, name: string): Promise<false | string> {
    /**
      * @internal
      * @description Steam开发商/发行商...转鉴赏家id
      * @param path Curator类型
      * @param name Curator名字
      * @return string: 转换成功，返回鉴赏家id | false: 转换失败
      */
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

  async #toggleCuratorLike(link: string, doTask = true): Promise<boolean> {
    /**
      * @internal
      * @description 处理类Steam鉴赏家相关任务
      * @param link Curator类型/Curator名字
      * @param doTask true: 关注 | false: 取关
      * @return true: 成功 | false: 失败
      */
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

  async #getAnnouncementParams(appId: string, viewId: string): Promise<announcementParams> {
    /**
      * @internal
      * @description 获取点赞Steam通知需要的参数
      * @param appId Steam游戏AppId
      * @param viewId Steam通知id
      * @return {object}: 成功 | {}: 失败
      */
    try {
      const logStatus = echoLog({ type: 'gettingAnnouncementParams', text: appId, id: viewId });
      const { result, statusText, status, data } = await httpRequest({
        url: `https://store.steampowered.com/news/app/${appId}/view/${viewId}`,
        method: 'GET',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
      });
      if (result === 'Success') {
        if (data?.status === 200) {
          if (this.#area === 'CN' && data.responseText.includes('id="error_box"')) {
            logStatus.warning(__('changeAreaNotice'));
            if (!(await this.#changeArea())) return {};
            return await this.#getAnnouncementParams(appId, viewId);
          }
          const authWgToken = data.responseText.match(/authwgtoken&quot;:&quot;(.*?)&quot;/)?.[1];
          const clanId = data.responseText.match(/clanAccountID&quot;:([\d]+?),/)?.[1];
          const gid = data.responseText.match(/announcementGID&quot;:&quot;([\d]+?)&quot;/)?.[1];
          if (authWgToken && clanId) {
            logStatus.success();
            return { authWgToken, clanId, gid };
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

  async #likeAnnouncement(id: string):Promise<boolean> {
    /**
      * @internal
      * @description 点赞Steam通知
      * @param id Steam游戏AppId/Steam通知id
      * @return true: 成功 | false: 失败
      */
    try {
      const [appId, viewId] = id.split('/');
      if (!(appId && viewId)) {
        echoLog({}).error(`${__('missParams')}(id)`);
        return false;
      }
      const { authWgToken, clanId, gid } = await this.#getAnnouncementParams(appId, viewId);
      if (!(authWgToken && clanId)) {
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
          wgauthtoken: authWgToken,
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

  async #appid2subid(id: string): Promise<string | false> {
    /**
      * @internal
      * @description Steam游戏appid转subid
      * @param id Steam游戏appid
      * @return string: 转换成功，返回subid | false: 转换失败
      */
    try {
      const logStatus = echoLog({ type: 'gettingSubid', text: id });
      const { result, statusText, status, data } = await httpRequest({
        url: `https://store.steampowered.com/app/${id}`,
        method: 'GET',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
      });
      if (result === 'Success') {
        if (data?.status === 200) {
          if (this.#area === 'CN' && data.responseText.includes('id="error_box"')) {
            logStatus.warning(__('changeAreaNotice'));
            const result = await this.#changeArea();
            if (!result || result === 'CN' || result === 'skip') return false;
            return await this.#appid2subid(id);
          }
          const subid = data.responseText.match(/name="subid" value="([\d]+?)"/)?.[1];
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
  async #getLicenses(): Promise<Array<string> | false> {
    try {
      const logStatus = echoLog({ text: __('gettingLicenses') });
      const { result, statusText, status, data } = await httpRequest({
        url: 'https://store.steampowered.com/account/licenses/',
        method: 'GET'
      });
      if (result === 'Success') {
        if (data?.status === 200) {
          logStatus.success();
          return [...data.responseText.matchAll(/RemoveFreeLicense\([\s]*?([\d]+)/g)].map((arr) => arr[1]).filter((subid) => subid);
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
  async #addLicense(id: string): Promise<boolean> {
    try {
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
        const logStatusArr: commonObject = {};
        for (const subid of ids.split(',')) {
          const logStatus = echoLog({ type: 'addingFreeLicenseSubid', text: subid });
          if (!await this.#addFreeLicense(subid, logStatus)) return false;
          logStatusArr[subid] = logStatus;
        }
        const licenses = await this.#getLicenses();
        if (!licenses) return false;
        for (const subid of ids.split(',')) {
          if (licenses.includes(subid)) {
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
  async #addFreeLicense(id: string, logStatusPre?: logStatus): Promise<boolean> {
    /**
      * @internal
      * @description 入库免费游戏
      * @param id Steam游戏subid
      * @return true: 成功 | false: 失败
      */
    try {
      const logStatus = logStatusPre || echoLog({ type: 'addingFreeLicenseSubid', text: id });
      const { result, statusText, status, data } = await httpRequest({
        url: 'https://store.steampowered.com/checkout/addfreelicense',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          Host: 'store.steampowered.com',
          Origin: 'https://store.steampowered.com',
          Referer: 'https://store.steampowered.com/account/licenses/'
        },
        data: $.param({
          action: 'add_to_cart',
          sessionid: this.#auth.storeSessionID,
          subid: id
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
  async #requestPlayTestAccess(id: string): Promise<boolean> {
    /**
      * @internal
      * @description 请求访问权限
      * @param id Steam游戏appid
      * @return true: 成功 | false: 失败
      */
    try {
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
    /**
     * @description 公有方法，统一处理Steam相关任务
     * @param {boolean} doTask true: 做任务 | false: 取消任务
     * @param {?Array} xxxLinks Steam相关任务链接数组。
     */
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
  #setCache(type: steamCacheTypes, name: string, id: string): void {
    /**
     * @internal
     * @description 缓存id转换的对应关系
     * @return {void}
     */
    try {
      this.#cache[type][name] = id;
      GM_setValue('steamCache', this.#cache);
    } catch (error) {
      throwError(error as Error, 'Steam.setCache');
    }
  }
}
unsafeWindow.Steam = Steam;
export default Steam;

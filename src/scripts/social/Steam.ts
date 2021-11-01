/*
 * @Author       : HCLonely
 * @Date         : 2021-10-04 16:07:55
 * @LastEditTime : 2021-11-01 16:50:28
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/social/Steam.ts
 * @Description  : steam相关功能
 ! todo: id存储
 */
/* eslint-disable id-length */

import Social from './Social';
import echoLog from '../echoLog';
import throwError from '../tools/throwError';
import httpRequest from '../tools/httpRequest';
import getI18n from '../i18n/i18n';
import { unique, delay } from '../tools/tools';

interface areas {
  currentArea?: string
  areas?: Array<string>
}
interface followGameRequestData {
  sessionid: string
  appid: string
  unfollow?: string
}
// TODO: doTask 保存
class Steam extends Social {
  tasks: steamTasks;
  whiteList: steamTasks = GM_getValue<whiteList>('whiteList')?.steam || { // eslint-disable-line new-cap
    groups: [],
    wishlists: [],
    follows: [],
    forums: [],
    workshops: [],
    curators: []
  };
  #auth: auth = {};
  #initialized = false;

  // TODO: 任务识别
  constructor(tasks: steamTasks) {
    super();
    this.tasks = tasks || {
      groups: [],
      wishlists: [],
      follows: [],
      forums: [],
      workshops: [],
      curators: []
    };
  }

  // 通用化,log
  async init(): Promise<boolean> {
    try {
      const isVerified = (await this.#updateStoreAuth()) && await (this.#updateCommunityAuth());
      if (isVerified) {
        this.#initialized = true;
        echoLog({ text: 'Init steam success!' });
        return true;
      }
      echoLog({ text: 'Init steam failed!' });
      return false;
    } catch (error) {
      throwError(error as Error, 'Steam.init');
      return false;
    }
  }

  async #updateStoreAuth(): Promise<boolean> {
    try {
      const logStatus = echoLog({ type: 'updateSteamStore' });
      const { result, statusText, status, data } = await httpRequest({
        url: 'https://store.steampowered.com/stats/',
        method: 'GET'
      });
      if (result === 'Success') {
        if (data?.status === 200) {
          if (data.responseText.includes('href="https://store.steampowered.com/login/')) {
            logStatus.error(`Error:${getI18n('loginSteamStore')}`, true);
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
    try {
      const logStatus = echoLog({ type: 'updateSteamCommunity' });
      const { result, statusText, status, data } = await httpRequest({
        url: 'https://steamcommunity.com/my',
        method: 'GET'
      });
      if (result === 'Success') {
        if (data?.status === 200) {
          if (data.responseText.includes('href="https://steamcommunity.com/login/home/')) {
            logStatus.error(`Error:${getI18n('loginSteamCommunity')}`, true);
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

  // INFO:获取国家/地区信息，用于限区游戏更换地区
  async #getAreaInfo(): Promise<areas> {
    try {
      const logStatus = echoLog({ type: 'text', text: 'getCountryInfo' });
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

  // INFO:更换国家/地区信息
  async #changeArea(area: string): Promise<boolean | string> {
    try {
      let aimedArea = area;
      if (!area) {
        const { currentArea, areas } = await this.#getAreaInfo();
        if (!currentArea || !areas) return false;
        if (currentArea !== 'CN') {
          echoLog({ type: 'text', text: 'notNeedChangeCountry' });
          return 'skip';
        }
        const anotherArea = areas.filter((area) => area && area !== 'CN');
        if (!anotherArea || anotherArea.length === 0) {
          echoLog({ type: 'text', text: 'noAnotherCountry' });
          return false;
        }
        [aimedArea] = anotherArea;
      }
      const logStatus = echoLog({ type: 'changeCountry', text: aimedArea });
      const { result, statusText, status, data } = await httpRequest({
        url: 'https://store.steampowered.com/account/setcountry',
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        data: $.param({ aimedArea, sessionid: this.#auth.storeSessionID })
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

  // INFO: 加入steam组
  async #joinGroup(groupName: string): Promise<boolean> {
    try {
      const logStatus = echoLog({ type: 'joinSteamGroup', text: groupName });
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
  // INFO: 退出steam组
  async #leaveGroup(groupName: string): Promise<boolean> {
    try {
      if (this.whiteList.groups.includes(groupName)) {
        // TODO: 直接echo
        echoLog({ type: 'whiteList', text: groupName });
        return true;
      }
      const groupId = await this.#getGroupId(groupName);
      if (!groupId) return false;
      const logStatus = echoLog({ type: 'leaveSteamGroup', text: groupName });
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
  // INFO: steam组名转id, 用于退组
  async #getGroupId(groupName: string): Promise<boolean | string> {
    try {
      const logStatus = echoLog({ type: 'getSteamGroupId', text: groupName });
      /* // todo
      const groupNameToId = GM_getValue('groupNameToId') || {};
      if (groupNameToId[groupName]) {
        logStatus.success();
        return groupNameToId[groupName];
      }
      */
      const { result, statusText, status, data } = await httpRequest({
        url: `https://steamcommunity.com/groups/${groupName}`,
        method: 'GET',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
      });
      if (result === 'Success') {
        if (data?.status === 200) {
          const groupId = data.responseText.match(/OpenGroupChat\( '([0-9]+)'/)?.[1];
          if (groupId) {
            logStatus.success();
            // groupNameToId[groupName] = groupId;
            // GM_setValue('groupNameToId', groupNameToId);
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

  // INFO: steam添加游戏到愿望单
  async #addToWishlist(gameId: string): Promise<boolean | string> {
    try {
      const logStatus = echoLog({ type: 'addWishlist', text: gameId });
      const { result, data } = await httpRequest({
        url: 'https://store.steampowered.com/api/addtowishlist',
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        data: $.param({ sessionid: this.#auth.storeSessionID, appid: gameId }),
        dataType: 'json'
      });
      if (result === 'Success' && data?.status === 200 && data.response?.success === true) {
        logStatus.success();
        this.tasks.wishlists = unique([...this.whiteList.wishlists, gameId]);
        return true;
      }
      const { result: resultR, statusText: statusTextR, status: statusR, data: dataR } = await httpRequest({
        url: `https://store.steampowered.com/app/${gameId}`,
        method: 'GET'
      });
      if (resultR === 'Success') {
        if (dataR?.status === 200) {
          if (dataR.responseText.includes('class="queue_actions_ctn"') && dataR.responseText.includes('class="already_in_library"')) {
            logStatus.success();
            this.tasks.wishlists = unique([...this.whiteList.wishlists, gameId]);
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
          this.tasks.wishlists = unique([...this.whiteList.wishlists, gameId]);
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
  // INFO: steam从愿望单移除游戏
  async #removeFromWishlist(gameId: string): Promise<boolean> {
    try {
      if (this.whiteList.wishlists.includes(gameId)) {
        // TODO: 直接echo
        echoLog({ type: 'whiteList', text: gameId });
        return true;
      }
      const logStatus = echoLog({ type: 'removeWishlist', text: gameId });
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
          if (dataR.responseText.includes('class="queue_actions_ctn"') &&
            (dataR.responseText.includes('已在库中') || dataR.responseText.includes('添加至您的愿望单'))
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

  // INFO: Steam 关注取关游戏
  async #toggleFollowGame(gameId: string, doTask: boolean): Promise<boolean> {
    try {
      if (!doTask && this.whiteList.follows.includes(gameId)) {
        // TODO: 直接echo
        echoLog({ type: 'whiteList', text: gameId });
        return true;
      }
      const logStatus = echoLog({ type: `${doTask ? '' : 'un'}followGame`, text: gameId });
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
      if (doTask === followed) {
        logStatus.success();
        if (doTask) this.tasks.follows = unique([...this.whiteList.follows, gameId]);
        return true;
      }
      logStatus.error(`Error:${data?.statusText}(${data?.status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'Steam.toggleFollowGame');
      return false;
    }
  }
  // INFO: 判断steam游戏是否已关注
  async #isFollowedGame(gameId: string): Promise<boolean> {
    try {
      const { result, data } = await httpRequest({
        url: `https://store.steampowered.com/app/${gameId}`,
        method: 'GET'
      });
      if (result === 'Success') {
        if (data?.status === 200) {
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
  // INFO: 订阅/取下订阅steam论坛
  async #toggleForum(gameId: string, doTask = true): Promise<boolean> {
    try {
      if (!doTask && this.whiteList.forums.includes(gameId)) {
        // TODO: 直接echo
        echoLog({ type: 'whiteList', text: gameId });
        return true;
      }
      const forumId = await this.#getForumId(gameId);
      if (!forumId) return false;
      const logStatus = echoLog({ type: `${doTask ? '' : 'un'}subscribeForum`, text: gameId });
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
  // TODO: 缓存
  async #getForumId(gameId: string): Promise<false | string> {
    try {
      const logStatus = echoLog({ type: 'getForumId', text: gameId });
      const { result, statusText, status, data } = await httpRequest({
        url: `https://steamcommunity.com/app/${gameId}/discussions/`,
        method: 'GET'
      });
      if (result === 'Success') {
        if (data?.status === 200) {
          const forumId = data.responseText?.match(/General_([\d]+(_[\d]+)?)/)?.[1];
          if (forumId) {
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

  // INFO: 收藏创意工坊
  async #toggleFavoriteWorkshop(id: string, doTask = true): Promise<boolean> {
    try {
      if (!doTask && this.whiteList.workshops.includes(id)) {
        // TODO: 直接echo
        echoLog({ type: 'whiteList', text: id });
        return true;
      }
      const appid = await this.#getWorkshopAppId(id);
      if (!appid) return false;
      const logStatus = echoLog({ type: doTask ? 'favoriteWorkshop' : 'unfavoriteWorkshop', text: id });
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
  async #getWorkshopAppId(id: string): Promise<boolean | string> {
    try {
      const logStatus = echoLog({ type: 'getWorkshopAppId', text: id });
      const { result, statusText, status, data } = await httpRequest({
        url: `https://steamcommunity.com/sharedfiles/filedetails/?id=${id}`,
        method: 'GET'
      });
      if (result === 'Success') {
        if (data?.status === 200) {
          const appid = data.responseText.match(/<input type="hidden" name="appid" value="([\d]+?)" \/>/)?.[1];
          if (appid) {
            logStatus.success();
            return appid;
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
  // 点赞创意工坊物品
  // todo: 取消点赞
  async #voteupWorkshop(id: string): Promise<boolean | string> {
    try {
      const logStatus = echoLog({ type: 'voteupWorkshop', text: id });
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

  // INFO: 关注Steam鉴赏家/开发商/发行商
  async #toggleCurator(curatorId: string, logStatus: logStatus, doTask = true): Promise<boolean> {
    try {
      if (!doTask && this.whiteList.curators.includes(curatorId)) {
        // TODO: 直接echo
        echoLog({ type: 'whiteList', text: curatorId });
        return true;
      }
      // logStatus = logStatus || echoLog({ type: follow ? 'followCurator' : 'unfollowCurator', text: curatorId })
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
  async #getCuratorId(developerName: string, path: string): Promise<false | string> {
    try {
      const logStatus = echoLog({ type: 'getCuratorId', text: `${path}/${developerName}` });
      // TODO: id存储
      /*
      const developerNameToId = GM_getValue('developerNameToId') || {}; // eslint-disable-line new-cap
      if (developerNameToId[developerName]) {
        logStatus.success();
        return developerNameToId[developerName];
      }
      */
      const { result, statusText, status, data } = await httpRequest({
        url: `https://store.steampowered.com/${path}/${developerName}`,
        method: 'GET',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
      });
      if (result === 'Success') {
        if (data?.status === 200) {
          const developerId = data.responseText.match(/g_pagingData.*?"clanid":([\d]+)/)?.[1];
          if (developerId) {
            logStatus.success();
            // developerNameToId[developerName] = developerId;
            // GM_setValue('developerNameToId', developerNameToId); // eslint-disable-line new-cap
            return developerId;
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

  // INFO: 处理鉴赏家相关
  async #toggleCuratorLike(link: string, doTask = true): Promise<boolean> {
    try {
      // TODO: 鉴赏家链接处理
      const [name, path] = link;
      const curatorId = await this.#getCuratorId(name, path);
      if (curatorId) {
        const logStatus = echoLog({ type: `${doTask ? '' : 'un'}follow${path.replace(/^\S/, (s) => s.toUpperCase())}`, text: name });
        return await this.#toggleCurator(curatorId, logStatus, doTask);
      }
      return false;
    } catch (error) {
      throwError(error as Error, 'Steam.toggleCuratorLike');
      return false;
    }
  }

  async toggle({
    doTask = true,
    groupLinks = [],
    wishlistLinks = [],
    followLinks = [],
    forumLinks = [],
    workshopLinks = [],
    curatorLinks = []
  }: {
    doTask: boolean,
    groupLinks: Array<string>,
    wishlistLinks: Array<string>,
    followLinks: Array<string>,
    forumLinks: Array<string>,
    workshopLinks: Array<string>,
    curatorLinks: Array<string>,
  }): Promise<boolean> {
    try {
      if (!this.#initialized) {
        echoLog({ type: 'text', text: '请先初始化' });
        return false;
      }
      const prom = [];
      const realGroups = this.getRealParams('groups', [], groupLinks, doTask, (link) => link.match(/groups\/(.+)\/?/)?.[1]);
      const realWishlists = this.getRealParams('wishlists', [], wishlistLinks, doTask, (link) => link.match(/app\/([\d]+)/)?.[1]);
      const realFollows = this.getRealParams('follows', [], followLinks, doTask, (link) => link.match(/app\/([\d]+)/)?.[1]);
      const realForums = this.getRealParams('forums', [], forumLinks, doTask, (link) => link.match(/app\/([\d]+)/)?.[1]);
      const realWorkshops = this.getRealParams('workshops', [], workshopLinks, doTask, (link) => link.match(/\?id=([\d]+)/)?.[1]);
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
      if (realFollows.length > 0) {
        for (const game of realFollows) {
          prom.push(this.#toggleFollowGame(game, doTask));
          await delay(1000);
        }
      }
      if (realForums.length > 0) {
        for (const forum of realForums) {
          prom.push(this.#toggleForum(forum, doTask));
          await delay(1000);
        }
      }
      if (realWorkshops.length > 0) {
        for (const workshop of realWorkshops) {
          prom.push(this.#toggleFavoriteWorkshop(workshop, doTask));
          await delay(1000);
        }
      }
      // TODO: 返回值处理
      return Promise.all(prom).then(() => true);
    } catch (error) {
      throwError(error as Error, 'Steam.toggle');
      return false;
    }
  }
}

export default Steam;

/*
// INFO: Update steam info
async function updateSteamCommunityInfo() {
  try {
    const logStatus = echoLog({ type: 'updateSteamCommunity' })
    const { result, statusText, status, data } = await httpRequest({
      url: 'https://steamcommunity.com/my',
      method: 'GET'
    })
    if (result === 'Success') {
      if (data.status === 200) {
        if ($(data.responseText).find('a[href*="/login/home"]').length > 0) {
          logStatus.error('Error:' + getI18n('loginSteamCommunity'), true)
          return false
        } else {
          const steam64Id = data.responseText.match(/g_steamID = "(.+?)";/)?.[1]
          const communitySessionID = data.responseText.match(/g_sessionID = "(.+?)";/)?.[1]
          const userName = data.responseText.match(/steamcommunity.com\/id\/(.+?)\/friends\//)?.[1]
          if (steam64Id) steamInfo.steam64Id = steam64Id
          if (userName) steamInfo.userName = userName
          if (communitySessionID) {
            steamInfo.communitySessionID = communitySessionID
            steamInfo.communityUpdateTime = new Date().getTime()
            logStatus.success()
            return true
          } else {
            logStatus.error('Error: Get "sessionID" failed')
            return false
          }
        }
      } else {
        logStatus.error('Error:' + data.statusText + '(' + data.status + ')')
        return false
      }
    } else {
      logStatus.error(`${result}:${statusText}(${status})`)
      return false
    }
  } catch (e) {
    throwError(e, 'updateSteamCommunityInfo')
  }
}
async function updateSteamStoreInfo() {
  try {
    const logStatus = echoLog({ type: 'updateSteamStore' })
    const { result, statusText, status, data } = await httpRequest({
      url: 'https://store.steampowered.com/stats/',
      method: 'GET'
    })
    if (result === 'Success') {
      if (data.status === 200) {
        if ($(data.responseText).find('a[href*="/login/"]').length > 0) {
          logStatus.error('Error:' + getI18n('loginSteamStore'), true)
          return false
        } else {
          const storeSessionID = data.responseText.match(/g_sessionID = "(.+?)";/)?.[1]
          if (storeSessionID) {
            steamInfo.storeSessionID = storeSessionID
            steamInfo.storeUpdateTime = new Date().getTime()
            logStatus.success()
            return true
          } else {
            logStatus.error('Error: Get "sessionID" failed')
            return false
          }
        }
      } else {
        logStatus.error('Error:' + data.statusText + '(' + data.status + ')')
        return false
      }
    } else {
      logStatus.error(`${result}:${statusText}(${status})`)
      return false
    }
  } catch (e) {
    throwError(e, 'updateSteamStoreInfo')
  }
}
function updateSteamInfo(type = 'all', update = false) {
  try {
    const pro = []
    if ((new Date().getTime() - steamInfo.communityUpdateTime > 10 * 60 * 1000 || update) && (type === 'community' || type === 'all')) {
      pro.push(updateSteamCommunityInfo())
    }
    if ((new Date().getTime() - steamInfo.storeUpdateTime > 10 * 60 * 1000 || update) && (type === 'store' || type === 'all')) {
      pro.push(updateSteamStoreInfo())
    }
    return Promise.all(pro).then(data => {
      GM_setValue('steamInfo', steamInfo)
      const length = data.length
      if (length === 1) {
        return data[0]
      } else if (length === 2) {
        return data[0] && data[1]
      } else {
        return false
      }
    }).catch(() => {
      return false
    })
  } catch (e) {
    throwError(e, 'updateSteamInfo')
  }
}
*/
/*

// INFO: Steam announcement
async function likeAnnouncements(rawMatch) {
  try {
    let [url, logStatus, requestData] = ['', null, {}]
    if (rawMatch.length === 5) {
      logStatus = echoLog({ type: 'likeAnnouncements', url: rawMatch[1], id: rawMatch[2] })
      url = 'https://store.steampowered.com/updated/ajaxrateupdate/' + rawMatch[2]
      requestData = {
        sessionid: steamInfo.storeSessionID,
        wgauthtoken: rawMatch[3],
        voteup: 1,
        clanid: rawMatch[4],
        ajax: 1
      }
    } else {
      logStatus = echoLog({ type: 'likeAnnouncements', url: rawMatch.input, id: rawMatch[1] })
      url = rawMatch.input.replace('/detail/', '/rate/')
      requestData = { sessionid: steamInfo.communitySessionID, voteup: true }
    }
    const { result, statusText, status, data } = await httpRequest({
      url: url,
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
      data: $.param(requestData),
      dataType: 'json'
    })
    if (result === 'Success') {
      if (data.status === 200 && data.response?.success === 1) {
        logStatus.success()
      } else {
        logStatus.error('Error:' + (data.response?.msg || data.statusText) + '(' + (data.response?.success || data.status) + ')')
      }
    } else {
      logStatus.error(`${result}:${statusText}(${status})`)
    }
  } catch (e) {
    throwError(e, 'likeAnnouncements')
  }
}

// INFO: Steam task assignment
async function toggleSteamActions({ website, type, elements, action, toFinalUrl = {} }) {
  try {
    const pro = []
    for (const element of unique(elements)) {
      let elementName = Array.isArray(element) ? [null, ...element] : [null, element]
      if (website === 'giveawaysu' && toFinalUrl[element]) {
        const toFinalUrlElement = toFinalUrl[element] || ''
        switch (type) {
          case 'group':
            elementName = toFinalUrlElement.match(/groups\/(.+)\/?/)
            break
          case 'forum':
            elementName = toFinalUrlElement.match(/app\/([\d]+)/)
            break
          case 'curator':
          case 'publisher':
          case 'developer':
          case 'franchise':
            if (toFinalUrlElement.includes('curator')) {
              type = 'curator'
              elementName = toFinalUrlElement.match(/curator\/([\d]+)/)
            } else if (toFinalUrlElement.includes('publisher')) {
              type = 'publisher'
              elementName = toFinalUrlElement.match(/publisher\/(.+)\/?/)
            } else if (toFinalUrlElement.includes('developer')) {
              type = 'developer'
              elementName = toFinalUrlElement.match(/developer\/(.+)\/?/)
            } else if (toFinalUrlElement.includes('pub')) {
              type = 'pub'
              elementName = toFinalUrlElement.match(/pub\/(.+)\/?/)
            } else if (toFinalUrlElement.includes('dev')) {
              type = 'dev'
              elementName = toFinalUrlElement.match(/dev\/(.+)\/?/)
            } else if (toFinalUrlElement.includes('franchise')) {
              type = 'franchise'
              elementName = toFinalUrlElement.match(/franchise\/(.+)\/?/)
            }
            break
          /* disable
        case 'publisher':
        case 'developer':
          elementName = (toFinalUrlElement.includes('publisher') ?
          toFinalUrlElement.match(/publisher\/(.+)\/?/) :
          toFinalUrlElement.includes('developer') ?
          toFinalUrlElement.match(/developer\/(.+)\/?/) :
          (toFinalUrlElement.match(/pub\/(.+)\/?/) || toFinalUrlElement.match(/dev\/(.+)\/?/))) || toFinalUrlElement.match(/curator\/([\d]+)/)
          break
        case 'franchise':
          elementName = toFinalUrlElement.match(/franchise\/(.+)\/?/) || toFinalUrlElement.match(/curator\/([\d]+)/)
          break
          /
          case 'game':
          case 'wishlist':
            elementName = toFinalUrlElement.match(/app\/([\d]+)/)
            break
          case 'favoriteWorkshop':
          case 'voteupWorkshop':
            elementName = toFinalUrlElement.match(/\?id=([\d]+)/)
            break
          case 'announcement': {
            if (toFinalUrlElement.includes('announcements/detail')) {
              elementName = toFinalUrlElement.match(/announcements\/detail\/([\d]+)/)
            } else {
              elementName = toFinalUrlElement
              .match(/(https?:\/\/store\.steampowered\.com\/newshub\/app\/[\d]+\/view\/([\d]+))\?authwgtoken=(.+?)&clanid=(.+)/)
            }
            break
          }
        }
      }
      if (elementName?.[1]) {
        switch (type) {
          case 'group':
            pro.push(action === 'fuck' ? joinSteamGroup(elementName[1]) : leaveSteamGroup(elementName[1]))
            break
          case 'forum':
            pro.push(toggleForum(elementName[1], action === 'fuck'))
            break
          case 'curator':
            pro.push(toggleCurator(elementName[1], action === 'fuck'))
            break
          case 'pub':
          case 'dev':
          case 'publisher':
          case 'franchise':
          case 'developer':
            pro.push(toggleOtherCurator(elementName[1], type, action === 'fuck'))
            break
          case 'wishlist':
            pro.push(action === 'fuck' ? addWishlist(elementName[1]) : removeWishlist(elementName[1]))
            break
          case 'game':
            pro.push(toggleGame(elementName[1], action === 'fuck'))
            break
          case 'favoriteWorkshop':
            pro.push(toggleFavoriteWorkshop(elementName[1], action === 'fuck'))
            break
          case 'voteupWorkshop':
            pro.push(voteupWorkshop(elementName[1]))
            break
          case 'announcement':
            pro.push(likeAnnouncements(elementName))
            break
        }
      }
      await delay(1000)
    }
    return Promise.all(pro)
  } catch (e) {
    throwError(e, 'toggleSteamActions')
  }
}

export { updateSteamInfo, changeCountry, toggleSteamActions }
*/

/*
 * @Author       : HCLonely
 * @Date         : 2021-10-04 16:07:55
 * @LastEditTime : 2021-11-02 14:51:17
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
interface announcementParams {
  authWgToken?: string
  clanId?: string
  gid?: string
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
    workshopVotes: [],
    curators: [],
    curatorLikes: [],
    announcements: []
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
      workshopVotes: [],
      curators: [],
      curatorLikes: [],
      announcements: []
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
  async #toggleCurator(curatorId: string, logStatusParam: logStatus | null, doTask = true): Promise<boolean> {
    try {
      if (!doTask && this.whiteList.curators.includes(curatorId)) {
        // TODO: 直接echo
        echoLog({ type: 'whiteList', text: curatorId });
        return true;
      }
      const logStatus = logStatusParam || echoLog({ type: doTask ? 'followCurator' : 'unfollowCurator', text: curatorId });
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
  async #getCuratorId(path: string, developerName: string): Promise<false | string> {
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
      const [path, name] = link.split('/');
      if (!(path && name)) {
        echoLog({ type: 'text', text: 'Error link' });
        return false;
      }
      const curatorId = await this.#getCuratorId(path, name);
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

  async #getAnnouncementParams(appId: string, viewId: string): Promise<announcementParams> {
    try {
      const logStatus = echoLog({ type: 'getAnnouncementParams', text: viewId });
      const { result, statusText, status, data } = await httpRequest({
        url: `https://store.steampowered.com/news/app/${appId}/view/${viewId}`,
        method: 'GET',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
      });
      if (result === 'Success') {
        if (data?.status === 200) {
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
    try {
      const [appId, viewId] = id.split('/');
      if (!(appId && viewId)) {
        echoLog({ type: 'lost params', text: id });
        return false;
      }
      const { authWgToken, clanId, gid } = await this.#getAnnouncementParams(appId, viewId);
      if (!(authWgToken && clanId)) {
        return false;
      }
      const logStatus = echoLog({ type: 'likeAnnouncement', text: id });
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

  async toggle({
    doTask = true,
    groupLinks = [],
    wishlistLinks = [],
    followLinks = [],
    forumLinks = [],
    workshopLinks = [],
    workshopVoteLinks = [],
    curatorLinks = [],
    curatorLikeLinks = [],
    announcementLinks = []
  }: {
    doTask?: boolean,
    groupLinks?: Array<string>,
    wishlistLinks?: Array<string>,
    followLinks?: Array<string>,
    forumLinks?: Array<string>,
    workshopLinks?: Array<string>,
    workshopVoteLinks?: Array<string>,
    curatorLinks?: Array<string>,
    curatorLikeLinks?: Array<string>,
    announcementLinks?: Array<string>
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
      const realworkshopVotes = this.getRealParams('workshopVotes', [], workshopVoteLinks, doTask, (link) => link.match(/\?id=([\d]+)/)?.[1]);
      const realCurators = this.getRealParams('curators', [], curatorLinks, doTask, (link) => link.match(/curator\/([\d]+)/)?.[1]);
      const realCuratorLikes = this.getRealParams('curatorLikes', [], curatorLikeLinks, doTask,
        (link) => link.match(/https?:\/\/store\.steampowered\.com\/(.*?)\/([^/?]+)/)?.slice(1, 3)
          .join('/'));
      const realAnnouncements = this.getRealParams('announcements', [], announcementLinks, doTask,
        (link) => {
          if (link.includes('store.steampowered.com')) {
            return link.match(/store.steampowered.com\/news\/app\/([\d]+)\/view\/([\d]+)/)?.slice(1, 3)
              .join('/');
          }
          return link.match(/steamcommunity.com\/games\/([\d]+)\/announcements\/detail\/([\d]+)/)?.slice(1, 3)
            .join('/');
        });
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
      if (doTask && realworkshopVotes.length > 0) {
        for (const workshop of realworkshopVotes) {
          prom.push(this.#voteupWorkshop(workshop));
          await delay(1000);
        }
      }
      if (realCurators.length > 0) {
        for (const curator of realCurators) {
          prom.push(this.#toggleCurator(curator, null, doTask));
          await delay(1000);
        }
      }
      if (realCuratorLikes.length > 0) {
        for (const curatorLike of realCuratorLikes) {
          prom.push(this.#toggleCuratorLike(curatorLike, doTask));
          await delay(1000);
        }
      }
      if (doTask && realAnnouncements.length > 0) {
        for (const id of realAnnouncements) {
          prom.push(this.#likeAnnouncement(id));
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

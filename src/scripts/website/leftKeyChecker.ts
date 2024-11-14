/*
 * @Author       : HCLonely
 * @Date         : 2022-01-09 10:19:17
 * @LastEditTime : 2022-01-09 13:51:51
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/website/leftKeyChecker.ts
 * @Description  : 剩余Key检测
 */

import dayjs from 'dayjs';
import httpRequest from '../tools/httpRequest';
import throwError from '../tools/throwError';

type status = 'Ended' | 'Won' | 'Active' | `Active(${string})` | 'Banned' | 'Paused' | 'NotStart' | false;

/**
 * leftKeyChecker 是一个用于分类和检测不同链接状态的对象。
 *
 * @module leftKeyChecker
 *
 * @description
 * 该模块提供了一个方法 `classify`，用于根据链接的格式调用相应的处理函数。
 * 支持的链接格式包括 giveaway.su、givee.club、gleam.io、indiedb.com、key-hub.eu、opquests.com 和 itch.io。
 * 每个处理函数会向相应的链接发送 GET 请求，并根据响应内容返回状态。
 *
 * @method classify - 分类链接的方法，根据链接格式调用相应的处理函数。
 * @param {string} link - 要分类的链接。
 * @returns {Promise<status>} 返回分类结果的状态。
 * @throws {Error} 如果在分类过程中发生错误，将抛出错误。
 *
 * @method giveawaySu - 检测 giveaway.su 剩余 Key 的异步方法。
 * @param {string} link - 要处理的 giveaway.su 链接。
 * @returns {Promise<status>} 返回状态 'Active' 或 'Ended'；如果未登录或发生错误，则返回 false。
 * @throws {Error} 如果在处理过程中发生错误，将抛出错误。
 *
 * @method giveeClub - 检测 givee.club 剩余 Key 的异步方法。
 * @param {string} link - 要处理的 givee.club 链接。
 * @returns {Promise<status>} 返回状态 'Won'、'Ended' 或 'Active'；如果发生错误，则返回 false。
 * @throws {Error} 如果在处理过程中发生错误，将抛出错误。
 *
 * @method gleam - 检测 gleam 剩余 Key 的异步方法。
 * @param {string} link - 要处理的 gleam 链接。
 * @returns {Promise<status>} 返回状态 'Won'、'Banned'、'Ended'、'Paused'、'NotStart' 或 'Active'；如果发生错误，则返回 false。
 * @throws {Error} 如果在处理过程中发生错误，将抛出错误。
 *
 * @method indieDb - 检测 IndieDB 剩余 Key 的异步方法。
 * @param {string} link - 要处理的 IndieDB 链接。
 * @returns {Promise<status>} 返回状态 'Won'、'Ended' 或 'Active'；如果发生错误，则返回 false。
 * @throws {Error} 如果在处理过程中发生错误，将抛出错误。
 *
 * @method keyhub - 检测 Keyhub 剩余 Key 的异步方法。
 * @param {string} link - 要处理的 Keyhub 链接。
 * @returns {Promise<status>} 返回状态 'Ended' 或 'Active(剩余密钥数量)'；如果发生错误，则返回 false。
 * @throws {Error} 如果在处理过程中发生错误，将抛出错误。
 *
 * @method opquests - 检测 Opquests 剩余 Key 的异步方法。
 * @param {string} link - 要处理的 Opquests 链接。
 * @returns {Promise<status>} 返回状态 'Ended' 或 'Active(剩余密钥数量)'；如果发生错误，则返回 false。
 * @throws {Error} 如果在处理过程中发生错误，将抛出错误。
 *
 * @method itch - 检测 Itch.io 剩余 Key 的异步方法。
 * @param {string} link - 要处理的 Itch.io 链接。
 * @returns {Promise<status>} 返回状态 'Ended' 或 'Active(结束日期)'；如果发生错误，则返回 false。
 * @throws {Error} 如果在处理过程中发生错误，将抛出错误。
 */
const leftKeyChecker = {
  /**
   * 分类链接的方法
   *
   * @param {string} link - 要分类的链接。
   * @returns {Promise<status>} 返回分类结果的状态。
   *
   * @throws {Error} 如果在分类过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法根据链接的格式调用相应的处理函数。
   * 支持的链接格式包括 giveaway.su、givee.club、gleam.io、indiedb.com、key-hub.eu、opquests.com 和 itch.io。
   * 如果链接格式不匹配，则返回 false。
   */
  async classify(link: string): Promise<status> {
    try {
      if (/^https?:\/\/giveaway\.su\/giveaway\/view\/[\d]+/.test(link)) {
        return await this.giveawaySu(link);
      }
      if (/^https?:\/\/givee\.club\/[\w]+?\/event\/[\d]+/.test(link)) {
        return await this.giveeClub(link);
      }
      if (/^https?:\/\/gleam\.io\/.+?\/.+/.test(link)) {
        return await this.gleam(link);
      }
      if (/^https?:\/\/www\.indiedb\.com\/giveaways\/.+/.test(link)) {
        return await this.indieDb(link);
      }
      if (/^https?:\/\/key-hub\.eu\/giveaway\/[\d]+/.test(link)) {
        return await this.keyhub(link);
      }
      if (/^https?:\/\/opquests\.com\/quests\/[\d]+/.test(link)) {
        return await this.opquests(link);
      }
      if (/^https?:\/\/itch\.io\/s\/[\d]+?\/.*/.test(link)) {
        return await this.itch(link);
      }
      return false;
    } catch (error) {
      throwError(error as Error, 'leftKeyChecker.classify');
      return false;
    }
  },

  /**
   * 检测 giveaway.su 剩余 Key 的异步方法
   *
   * @param {string} link - 要处理的 giveaway.su 链接。
   * @returns {Promise<status>} 如果成功处理，则返回状态 'Active' 或 'Ended'；如果未登录或发生错误，则返回 false。
   *
   * @throws {Error} 如果在处理过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法向指定的 giveaway.su 链接发送 GET 请求。
   * 如果请求成功且返回状态为 200，则检查响应文本。
   * 如果响应中包含登录提示，则返回 false，表示用户未登录。
   * 如果响应中包含“抽奖已结束”的提示，则返回 'Ended'。
   * 否则，返回 'Active'，表示抽奖仍在进行中。
   */
  async giveawaySu(link: string): Promise<status> {
    try {
      const { result, data } = await httpRequest({
        url: link,
        method: 'GET'
      });
      if (result === 'Success' && data?.status === 200) {
        if (data.responseText.includes('class="steam-login"')) {
          return false; // 未登录
        }
        if (data.responseText.includes('class="giveaway-ended"')) {
          return 'Ended';
        }
        return 'Active';
      }
      return false;
    } catch (error) {
      throwError(error as Error, 'leftKeyChecker.giveawaySu');
      return false;
    }
  },

  /**
   * 检测 givee.club 剩余 Key 的异步方法
   *
   * @param {string} link - 要处理的 givee.club 链接。
   * @returns {Promise<status>} 如果成功处理，则返回状态 'Won'、'Ended' 或 'Active'；如果发生错误，则返回 false。
   *
   * @throws {Error} 如果在处理过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法向指定的 givee.club 链接发送 GET 请求。
   * 如果请求成功且返回状态为 200，则检查响应文本。
   * 如果响应中包含“活动赢家”的提示，则返回 'Won'。
   * 如果响应中包含“活动已结束”的提示，则返回 'Ended'。
   * 否则，返回 'Active'，表示活动仍在进行中。
   */
  async giveeClub(link: string): Promise<status> {
    try {
      const { result, data } = await httpRequest({
        url: link,
        method: 'GET'
      });
      if (result === 'Success' && data?.status === 200) {
        if (data.responseText.includes('class="event-winner"')) {
          return 'Won';
        }
        if (data.responseText.includes('class="event-ended"')) {
          return 'Ended';
        }
        return 'Active';
      }
      return false;
    } catch (error) {
      throwError(error as Error, 'leftKeyChecker.giveeClub');
      return false;
    }
  },

  /**
   * 检测 gleam 剩余 Key 的异步方法
   *
   * @param {string} link - 要处理的 gleam 链接。
   * @returns {Promise<status>} 如果成功处理，则返回状态 'Won'、'Banned'、'Ended'、'Paused'、'NotStart' 或 'Active'；如果发生错误，则返回 false。
   *
   * @throws {Error} 如果在处理过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法向指定的 gleam 链接发送 GET 请求。
   * 如果请求成功且返回状态为 200，则检查响应文本。
   * 如果响应中包含“奖励”的提示，则返回 'Won'。
   * 如果响应中包含活动被禁止、已结束、已暂停或尚未开始的提示，则返回相应的状态。
   * 否则，返回 'Active'，表示活动仍在进行中。
   */
  async gleam(link: string): Promise<status> {
    try {
      const { result, data } = await httpRequest({
        url: link,
        method: 'GET'
      });
      if (result === 'Success' && data?.status === 200) {
        if (/incentives&quot;:{&quot;[\d]+?&quot;:\[&quot;.+?&quot;\]/.test(data.responseText)) {
          return 'Won';
        }
        const campaignDiv = data.responseText.match(/<div class='popup-blocks-container'[\w\W]+?'>/)?.[0];
        if (!campaignDiv) {
          return false;
        }
        const campaignString = $(campaignDiv).attr('ng-init')
          ?.match(/initCampaign\(([\w\W]+?)\)$/)?.[1];
        if (!campaignString) return false;
        const { campaign } = JSON.parse(campaignString);
        if (campaign.banned) {
          return 'Banned';
        }
        if (campaign.finished) {
          return 'Ended';
        }
        if (campaign.paused) {
          return 'Paused';
        }
        if (new Date().getTime() < (campaign.starts_at * 1000)) {
          return 'NotStart';
        }
        return 'Active';
      }
      return false;
    } catch (error) {
      throwError(error as Error, 'leftKeyChecker.gleam');
      return false;
    }
  },

  /**
   * 检测 IndieDB 剩余 Key 的异步方法
   *
   * @param {string} link - 要处理的 IndieDB 链接。
   * @returns {Promise<status>} 如果成功处理，则返回状态 'Won'、'Ended' 或 'Active'；如果发生错误，则返回 false。
   *
   * @throws {Error} 如果在处理过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法向指定的 IndieDB 链接发送 GET 请求。
   * 如果请求成功且返回状态为 200，则检查响应文本。
   * 如果响应中包含“恭喜你获胜”的提示，则返回 'Won'。
   * 如果响应中包含“抽奖已结束”或“下次”的提示，则返回 'Ended'。
   * 否则，返回 'Active'，表示抽奖仍在进行中。
   */
  async indieDb(link: string): Promise<status> {
    try {
      const { result, data } = await httpRequest({
        url: link,
        method: 'GET'
      });
      if (result === 'Success' && data?.status === 200) {
        if (data.responseText.includes('Congrats you WON')) {
          return 'Won';
        }
        if (data.responseText.includes('Giveaway is closed') || data.responseText.includes('next time')) {
          return 'Ended';
        }
        return 'Active';
      }
      return false;
    } catch (error) {
      throwError(error as Error, 'leftKeyChecker.indieDb');
      return false;
    }
  },

  /**
   * 检测 Keyhub 剩余 Key 的异步方法
   *
   * @param {string} link - 要处理的 Keyhub 链接。
   * @returns {Promise<status>} 如果成功处理，则返回状态 'Ended' 或 'Active(剩余密钥数量)'；如果发生错误，则返回 false。
   *
   * @throws {Error} 如果在处理过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法向指定的 Keyhub 链接发送 GET 请求。
   * 如果请求成功且返回状态为 200，则检查响应文本。
   * 如果响应中包含剩余密钥的数量，则返回 'Active' 状态和剩余密钥数量。
   * 如果剩余密钥为 0，则返回 'Ended'，表示抽奖已结束。
   * 如果未找到剩余密钥的信息，则返回 false。
   */
  async keyhub(link: string): Promise<status> {
    try {
      const { result, data } = await httpRequest({
        url: link,
        method: 'GET'
      });
      if (result === 'Success' && data?.status === 200) {
        const keysleft = data.responseText.match(/<span id="keysleft">([\d]+?)<\/span>/)?.[1];
        if (!keysleft) {
          return false;
        }
        if (keysleft === '0') {
          return 'Ended';
        }
        return `Active(${keysleft})`;
      }
      return false;
    } catch (error) {
      throwError(error as Error, 'leftKeyChecker.keyhub');
      return false;
    }
  },

  /**
   * 检测 Opquests 剩余 Key 的异步方法
   *
   * @param {string} link - 要处理的 Opquests 链接。
   * @returns {Promise<status>} 如果成功处理，则返回状态 'Ended' 或 'Active(剩余密钥数量)'；如果发生错误，则返回 false。
   *
   * @throws {Error} 如果在处理过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法向指定的 Opquests 链接发送 GET 请求。
   * 如果请求成功且返回状态为 200，则检查响应文本。
   * 如果响应中包含剩余密钥的数量，则返回 'Active' 状态和剩余密钥数量。
   * 如果剩余密钥为 0，则返回 'Ended'，表示抽奖已结束。
   * 如果未找到剩余密钥的信息，则返回 false。
   * 如果返回状态为 404，则表示活动已结束，返回 'Ended'。
   */
  async opquests(link: string): Promise<status> {
    try {
      const { result, data } = await httpRequest({
        url: link,
        method: 'GET'
      });
      if (result === 'Success' && data?.status === 200) {
        const keysleft = data.responseText.match(/<div class="">[\s]*?([\d]+?)[\s]*?of/)?.[1];
        if (!keysleft) {
          return false;
        }
        if (keysleft === '0') {
          return 'Ended';
        }
        return `Active(${keysleft})`;
      } else if (data?.status === 404) {
        return 'Ended';
      }
      return false;
    } catch (error) {
      throwError(error as Error, 'leftKeyChecker.opquests');
      return false;
    }
  },

  /**
   * 检测 Itch.io 剩余 Key 的异步方法
   *
   * @param {string} link - 要处理的 Itch.io 链接。
   * @returns {Promise<status>} 如果成功处理，则返回状态 'Ended' 或 'Active(结束日期)'；如果发生错误，则返回 false。
   *
   * @throws {Error} 如果在处理过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法向指定的 Itch.io 链接发送 GET 请求。
   * 如果请求成功且返回状态为 200，则检查响应文本以获取结束日期。
   * 如果未找到结束日期，则返回 false。
   * 如果当前时间超过结束日期，则返回 'Ended'，表示抽奖已结束。
   * 否则，返回 'Active' 状态和格式化后的结束日期。
   */
  async itch(link: string): Promise<status> {
    try {
      const { result, data } = await httpRequest({
        url: link,
        method: 'GET'
      });
      if (result === 'Success' && data?.status === 200) {
        const endDate = data.responseText.match(/{"start_date":"[0-9A-Z-:]+?".*?"end_date":"([0-9A-Z-:]+?)".*?}/)?.[1];
        if (!endDate) {
          return false;
        }
        if (new Date().getTime() > new Date(endDate).getTime()) {
          return 'Ended';
        }
        return `Active(${dayjs(endDate).format('YYYY-MM-DD HH:mm:ss')})`;
      }
      return false;
    } catch (error) {
      throwError(error as Error, 'leftKeyChecker.itch');
      return false;
    }
  }
};
export default leftKeyChecker;

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
const leftKeyChecker = {
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
      throwError(error as Error, 'leftKeyChecker.opquests');
      return false;
    }
  }
};
export default leftKeyChecker;

/*
 * @Author       : HCLonely
 * @Date         : 2021-11-18 13:31:23
 * @LastEditTime : 2021-11-18 14:09:54
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/website/Opquests.ts
 * @Description  :
 */

import Website from './Website';
import throwError from '../tools/throwError';
import echoLog from '../echoLog';
import getI18n from '../i18n/i18n';

interface oqSocialTasks {
  steam: {
    groupLinks: Array<string>
    wishlistLinks: Array<string>
    followLinks: Array<string>
    curatorLikeLinks: Array<string>
  }
}

const defaultTasks: oqSocialTasks = {
  steam: {
    groupLinks: [],
    wishlistLinks: [],
    followLinks: [],
    curatorLikeLinks: []
  }
};

class Opquests extends Website {
  undoneTasks: oqSocialTasks = { ...defaultTasks }

  static test(): boolean {
    return window.location.host === 'opquests.com';
  }
  async before(): Promise<void> {
    try {
      if (!this.checkLogin()) {
        echoLog({ type: 'checkLoginFailed' });
      }
    } catch (error) {
      throwError(error as Error, 'Opquests.before');
    }
  }
  init(): boolean {
    try {
      const logStatus = echoLog({ type: 'init' });
      if ($('a[href*="/auth/redirect"]').length > 0) {
        window.open('/auth/redirect', '_self');
        logStatus.warning('请先登录');
        return false;
      }
      if (!this.#getGiveawayId()) return false;
      this.initialized = true;
      logStatus.success();
      return true;
    } catch (error) {
      throwError(error as Error, 'Opquests.init');
      return false;
    }
  }

  async classifyTask(action: 'do' | 'undo'): Promise<boolean> {
    try {
      if (action === 'undo') {
        echoLog({ type: 'custom', text: '<li>此网站不支持取消任务<font></font></li>' });
        return false;
      }
      const logStatus = echoLog({ type: 'custom', text: `<li>${getI18n('getTasksInfo')}<font></font></li>` });

      const tasks = $('.w-full:contains("Validate") .items-center');
      for (const task of tasks) {
        const link = $(task).find('a:contains("Open")')
          .attr('href');
        const taskDes = $(task).find('div')
          .eq(1)
          .text()
          .trim();

        if (!link) continue;

        if (/steamcommunity\.com\/groups\//.test(link)) {
          this.undoneTasks.steam.groupLinks.push(link);
        } else if (/store\.steampowered\.com\/app\//.test(link)) {
          if (/wishlist/gim.test(taskDes)) {
            this.undoneTasks.steam.wishlistLinks.push(link);
          } else if (/follow/gim.test(taskDes)) {
            this.undoneTasks.steam.followLinks.push(link);
          }
        } else if (/store\.steampowered\.com\/(publisher|developer)\//.test(link) && /follow/gim.test(taskDes)) {
          this.undoneTasks.steam.curatorLikeLinks.push(link);
        } else {
          echoLog({ type: 'custom', text: `<li>${getI18n('unknownTaskType', `${taskDes}(${link})`)}<font></font></li>` });
        }
      }

      logStatus.success();
      this.undoneTasks = this.uniqueTasks(this.undoneTasks) as oqSocialTasks;
      GM_setValue(`oqTasks${this.giveawayId}`, this.socialTasks); // eslint-disable-line new-cap
      return true;
    } catch (error) {
      throwError(error as Error, 'Opquests.classifyTask');
      return false;
    }
  }

  #getGiveawayId(): boolean {
    try {
      const giveawayId = window.location.href.match(/quests\/([\d]+)/)?.[1];
      if (giveawayId) {
        this.giveawayId = giveawayId;
        return true;
      }
      echoLog({ type: 'custom', text: `<li><font class="error">${getI18n('getGiveawayIdFailed')}</font></li>` });
      return false;
    } catch (error) {
      throwError(error as Error, 'Opquests.getGiveawayId');
      return false;
    }
  }
  checkLogin(): boolean {
    try {
      if ($('a[href*="/auth/redirect"]').length > 0) {
        window.open('/auth/redirect', '_self');
      }
      return true;
    } catch (error) {
      throwError(error as Error, 'Opquests.checkLogin');
      return false;
    }
  }
}

export default Opquests;

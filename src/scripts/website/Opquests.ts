/*
 * @Author       : HCLonely
 * @Date         : 2021-11-18 13:31:23
 * @LastEditTime : 2022-02-06 11:39:08
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/website/Opquests.ts
 * @Description  : https://opquests.com/
 */

// eslint-disable-next-line
/// <reference path = "Opquests.d.ts" />

import Website from './Website';
import throwError from '../tools/throwError';
import echoLog from '../echoLog';
import __ from '../tools/i18n';
import { globalOptions } from '../globalOptions';

const defaultTasks: oqSocialTasks = {
  steam: {
    groupLinks: [],
    wishlistLinks: [],
    followLinks: [],
    curatorLikeLinks: []
  }
};

class Opquests extends Website {
  name = 'Opquests';
  undoneTasks: oqSocialTasks = { ...defaultTasks };
  buttons: Array<string> = [
    'doTask'
  ];

  static test(): boolean {
    return window.location.host === 'opquests.com';
  }
  async after(): Promise<void> {
    try {
      if (!this.#checkLogin()) {
        echoLog({}).warning(__('checkLoginFailed'));
      }
    } catch (error) {
      throwError(error as Error, 'Opquests.after');
    }
  }
  init(): boolean {
    try {
      const logStatus = echoLog({ text: __('initing') });
      if ($('a[href*="/auth/redirect"]').length > 0) {
        window.open('/auth/redirect', '_self');
        logStatus.warning(__('needLogin'));
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
        echoLog({ text: __('cannotUndo') });
        return false;
      }
      const logStatus = echoLog({ text: __('getTasksInfo') });

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
          echoLog({}).warning(`${__('unKnownTaskType')}: ${taskDes}(${link})`);
        }
      }

      logStatus.success();
      this.undoneTasks = this.uniqueTasks(this.undoneTasks) as oqSocialTasks;
      if (window.DEBUG) console.log('%cAuto-Task[Debug]:', 'color:blue', JSON.stringify(this));
      // GM_setValue(`oqTasks-${this.giveawayId}`, this.socialTasks);
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
      echoLog({}).error(__('getFailed', 'GiveawayId'));
      return false;
    } catch (error) {
      throwError(error as Error, 'Opquests.getGiveawayId');
      return false;
    }
  }
  #checkLogin(): boolean {
    try {
      if (!globalOptions.other.checkLogin) return true;
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

/*
 * @Author       : HCLonely
 * @Date         : 2021-11-18 13:31:23
 * @LastEditTime : 2023-03-12 10:22:27
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
// import { delay } from '../tools/tools';
import { globalOptions } from '../globalOptions';
import httpRequest from '../tools/httpRequest';

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
    'doTask',
    'verifyTask',
    'getKey'
  ];

  static test(): boolean {
    return window.location.host === 'opquests.com';
  }
  async before(): Promise<void> {
    const opquestsVerifyTasks = GM_getValue<Array<string>>('opquestsVerifyTasks') || [];
    if (opquestsVerifyTasks.length > 0) {
      const taskId = opquestsVerifyTasks.pop();
      GM_setValue('opquestsVerifyTasks', opquestsVerifyTasks);
      $(`#task_id[value="${taskId}"]`).parent()
        .children('button[type="submit"]')[0].click();
    } else {
      if (GM_getValue<Array<string>>('opquestsVerifyTasks')) {
        GM_deleteValue('opquestsVerifyTasks');
        /*
        echoLog({}).success(__('allTasksComplete'));
        if (await this.getKey()) {
          return;
        }
        window.location.reload();
        return;
        */
      }
    }
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
        } else if (/store\.steampowered\.com\/(publisher|developer|curator)\//.test(link) && /follow/gim.test(taskDes)) {
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
  async verifyTask(): Promise<boolean> {
    try {
      if (!this.initialized) {
        this.init();
      }
      const tasks: Array<string> = $.makeArray($('div.w-full').find('.items-center')
        .has('button.submit-loader')).map((ele) => $(ele).find('input[name="task_id"]')
          .val() as string);
      await this.#confirm();
      const taskId = tasks.pop();
      GM_setValue('opquestsVerifyTasks', tasks);
      $(`#task_id[value="${taskId}"]`).parent()
        .children('button[type="submit"]')[0].click();
      return true;
    } catch (error) {
      throwError(error as Error, 'Opquests.verifyTask');
      return false;
    }
  }
  async #confirm(): Promise<boolean> {
    try {
      const logStatus = echoLog({ html: `<li>${__('confirmingTask')}...<font></font></li>` });

      const { result, statusText, status, data } = await httpRequest({
        url: `https://opquests.com/quests/${this.giveawayId}?confirm=1`,
        method: 'GET',
        nochche: true,
        headers: {
          origin: 'https://opquests.com',
          referer: `https://opquests.com/warning?id=${this.giveawayId}`
        }
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
      throwError(error as Error, 'Opquests.confirm');
      return false;
    }
  }
  /*
  async #verify(task: qpqTaskInfo): Promise<boolean> {
    try {
      const logStatus = echoLog({ html: `<li>${__('verifyingTask')}${task.title.trim()}...<font></font></li>` });

      const { result, statusText, status, data } = await httpRequest({
        url: 'https://opquests.com/entries',
        method: 'POST',
        dataType: 'json',
        nochche: true,
        headers: {
          origin: 'https://opquests.com',
          pragma: 'no-cache',
          referer: `${window.location.href.split('?')[0]}?confirm=1`,
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: `_token=${task.token}&task_id=${task.taskId}`
      });
      if (result === 'Success') {
        if (data?.responseText?.includes('Successfully completed task') || data?.responseText?.includes('unlocked the key')) {
          logStatus.success();
          return true;
        }
        const key = $(data?.responseText || '').find('button[data-clipboard-text]:contains("Copy")')
          .attr('data-clipboard-text')
          ?.trim();
        if (key) {
          logStatus.success();
          echoLog({}).success(key);
          return true;
        }
        logStatus.error(`Error:${data?.statusText}(${data?.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'Opquests.verify');
      return false;
    }
  }
  */
  async getKey(isButton?: boolean): Promise<boolean> {
    try {
      const logStatus = echoLog({ text: __('gettingKey') });
      const { result, statusText, status, data } = await httpRequest({
        url: 'https://opquests.com/keys',
        method: 'GET'
      });
      if (result === 'Success') {
        if (data?.responseText) {
          const key = $(data?.responseText).find(`div.items-center:contains("${$('h1.font-bold').text()
            .trim()
            .replace(' Quest', '')}")`)
            .find('div.font-bold')
            .next()
            .text();
          if (!key) {
            logStatus.error('Error: Key was not found');
            if (isButton) {
              window.open('https://opquests.com/keys', '_self');
            }
            return false;
          }
          logStatus.success();
          echoLog({}).success(key);
          return true;
        }
        logStatus.error(`Error:${data?.statusText}(${data?.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'Opquests.getGiveawayId');
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

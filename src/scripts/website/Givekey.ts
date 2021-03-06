/*
 * @Author       : HCLonely
 * @Date         : 2021-11-13 17:57:40
 * @LastEditTime : 2022-02-06 11:38:18
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/website/Givekey.ts
 * @Description  : https://givekey.ru
 */

// eslint-disable-next-line
/// <reference path = "GiveKey.d.ts" />

import Swal from 'sweetalert2';
import Website from './Website';
import echoLog from '../echoLog';
import __ from '../tools/i18n';
import { delay, getRedirectLink, unique } from '../tools/tools';
import throwError from '../tools/throwError';
import { globalOptions } from '../globalOptions';

const defaultTasksTemplate: gkSocialTasks = {
  steam: {
    groupLinks: [],
    wishlistLinks: [],
    curatorLinks: [],
    curatorLikeLinks: []
  },
  twitter: {
    userLinks: []
  },
  vk: {
    nameLinks: []
  },
  discord: {
    serverLinks: []
  }
};
const defaultTasks = JSON.stringify(defaultTasksTemplate);

class Givekey extends Website {
  name = 'Givekey';
  tasks: Array<string> = [];
  socialTasks: gkSocialTasks = JSON.parse(defaultTasks);
  undoneTasks: gkSocialTasks = JSON.parse(defaultTasks);
  userId!: string;
  buttons: Array<string> = [
    'doTask',
    'undoTask',
    'verifyTask'
  ];

  static test(): boolean {
    return window.location.host === 'givekey.ru';
  }

  async after() {
    try {
      await new Promise((resolve) => {
        const checker = setInterval(() => {
          if ($('#navbarDropdown').length > 0) {
            clearInterval(checker);
            resolve(true);
          }
        });
      });
      if (!await this.#checkLeftKey()) {
        echoLog({}).warning(__('checkLeftKeyFailed'));
      }
    } catch (error) {
      throwError(error as Error, 'Givekey.after');
      return false;
    }
  }

  init(): boolean {
    try {
      const logStatus = echoLog({ text: __('initing') });
      if ($('a[href*="/auth/steam"]').length > 0) {
        window.open('/auth/steam', '_self');
        logStatus.warning(__('needLogin'));
        return false;
      }
      if (!this.#getGiveawayId()) return false;
      const userId = $('meta[name="user-id"]').attr('content');
      if (!userId) {
        logStatus.error(__('getFailed', __('userId')));
        return false;
      }
      this.userId = userId;
      this.initialized = true;
      logStatus.success();
      return true;
    } catch (error) {
      throwError(error as Error, 'Givekey.init');
      return false;
    }
  }

  async classifyTask(action: 'do' | 'undo' | 'verify'): Promise<boolean> {
    try {
      const logStatus = echoLog({ text: __('getTasksInfo') });
      if (action === 'undo') {
        this.socialTasks = GM_getValue<gkGMTasks>(`gkTasks-${this.giveawayId}`)?.tasks || JSON.parse(defaultTasks);
      }

      const tasks = $('.card-body:has("button") .row');
      for (const task of tasks) {
        const taskEle = $(task);
        const isSuccess = /Complete/i.test(taskEle.find('button').text()
          .trim());
        if (isSuccess && action !== 'undo') continue;
        const checkButton = taskEle.find('#task_check');
        const taskId = checkButton.attr('data-id');
        if (taskId) this.tasks.push(taskId);
        if (action === 'verify') continue;

        let href = taskEle.find('a').attr('href') || null;
        const text = taskEle.find('a').text()
          .trim();
        const icon = taskEle.find('i');
        if (!href || !text) continue;
        if (/^https?:\/\/givekey\.ru\/giveaway\/[\d]+\/execution_task/.test(href)) {
          href = await getRedirectLink(href);
        }
        if (!href) continue;

        if (/^https?:\/\/vk\.com\//.test(href)) {
          this.socialTasks.vk.nameLinks.push(href);
          if (action === 'do' && !isSuccess) this.undoneTasks.vk.nameLinks.push(href);
        } else if (/^https?:\/\/steamcommunity\.com\/groups/.test(href)) {
          this.socialTasks.steam.groupLinks.push(href);
          if (action === 'do' && !isSuccess) this.undoneTasks.steam.groupLinks.push(href);
        } else if (/^https?:\/\/store\.steampowered\.com\/app\//.test(href)) {
          this.socialTasks.steam.wishlistLinks.push(href);
          if (action === 'do' && !isSuccess) this.undoneTasks.steam.wishlistLinks.push(href);
        } else if (/Subscribe/gi.test(text) && icon.hasClass('fa-steam-square')) {
          if (/^https?:\/\/store\.steampowered\.com\/curator\//.test(href)) {
            this.socialTasks.steam.curatorLinks.push(href);
            if (action === 'do' && !isSuccess) this.undoneTasks.steam.curatorLinks.push(href);
          } else {
            this.socialTasks.steam.curatorLikeLinks.push(href);
            if (action === 'do' && !isSuccess) this.undoneTasks.steam.curatorLikeLinks.push(href);
          }
        } else if (/^https?:\/\/twitter\.com\//.test(href) && /Subscribe/gi.test(text)) {
          this.socialTasks.twitter.userLinks.push(href);
          if (action === 'do' && !isSuccess) this.undoneTasks.twitter.userLinks.push(href);
        } else if (icon.hasClass('fa-discord') || /^https?:\/\/discord\.com\/invite\//.test(href)) {
          this.socialTasks.discord.serverLinks.push(href);
          if (action === 'do' && !isSuccess) this.undoneTasks.discord.serverLinks.push(href);
        } else {
          echoLog({}).warning(`${__('unKnownTaskType')}: ${text}(${href})`);
        }
      }

      logStatus.success();
      this.tasks = unique(this.tasks);
      this.undoneTasks = this.uniqueTasks(this.undoneTasks) as gkSocialTasks;
      this.socialTasks = this.uniqueTasks(this.socialTasks) as gkSocialTasks;
      if (window.DEBUG) console.log('%cAuto-Task[Debug]:', 'color:blue', JSON.stringify(this));
      GM_setValue(`gkTasks-${this.giveawayId}`, { tasks: this.socialTasks, time: new Date().getTime() });
      return true;
    } catch (error) {
      throwError(error as Error, 'Givekey.classifyTask');
      return false;
    }
  }

  async verifyTask(): Promise<boolean> {
    try {
      if (!this.initialized && !this.init()) {
        return false;
      }
      if (this.tasks.length === 0 && !(await this.classifyTask('verify'))) {
        return false;
      }
      echoLog({}).warning(__('giveKeyNoticeBefore'));
      const taskLength = this.tasks.length;
      for (let i = 0; i < taskLength; i++) { // eslint-disable-line
        await this.#verify(this.tasks[i]);
        if (i < (taskLength - 1)) {
          await delay(15000);
        }
      }

      echoLog({}).success(__('allTasksComplete'));
      echoLog({ html: `<li><font class="warning">${__('giveKeyNoticeAfter')}</font></li>` });
      return true;
    } catch (error) {
      throwError(error as Error, 'Givekey.verifyTask');
      return false;
    }
  }
  async #verify(task: string): Promise<boolean> {
    try {
      const logStatus = echoLog({ html: `<li>${__('verifyingTask')}${task}...<font></font></li>` });

      return await new Promise((resolve) => {
        $.ajax({
          url: 'https://givekey.ru/giveaway/task',
          method: 'POST',
          data: `id=${task}&user_id=${this.userId}`,
          dataType: 'json',
          headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          },
          success: (data) => {
            if (data.btn) $(`button[data-id=${this.userId}]`).html(data.btn);
            if (data.status === 'ok') {
              $(`.task_check_${data.id}`).html(`<button class="btn btn-success mb-2 btn-block" disabled>${data.btn}</button>`);
              logStatus.success();
              resolve(true);
            } else if (data.status === 'end') {
              logStatus.success();
              echoLog({}).success(data.key);
              resolve(true);
            } else {
              logStatus.error(`Error:${data.msg}`);
              resolve(false);
            }
          },
          error: (xhr) => {
            logStatus.error(`Error:${xhr.statusText}(${xhr.status})`);
            resolve(false);
          }
        });
      });
    } catch (error) {
      throwError(error as Error, 'Givekey.verify');
      return false;
    }
  }

  #getGiveawayId(): boolean {
    try {
      const giveawayId = window.location.href.match(/giveaway\/([\d]+)/)?.[1];
      if (giveawayId) {
        this.giveawayId = giveawayId;
        return true;
      }
      echoLog({ text: __('getFailed', 'GiveawayId') });
      return false;
    } catch (error) {
      throwError(error as Error, 'Givekey.getGiveawayId');
      return false;
    }
  }
  async #checkLeftKey() {
    try {
      if (!globalOptions.other.checkLeftKey) return true;
      if (!$('#keys_count').text()) {
        await Swal.fire({
          icon: 'warning',
          title: __('notice'),
          text: __('noKeysLeft'),
          confirmButtonText: __('confirm'),
          cancelButtonText: __('cancel'),
          showCancelButton: true
        }).then(({ value }) => {
          if (value) {
            window.close();
          }
        });
      }
      return true;
    } catch (error) {
      throwError(error as Error, 'Givekey.checkLeftKey');
      return false;
    }
  }
}

export default Givekey;

/*
 * @Author       : HCLonely
 * @Date         : 2021-12-21 10:01:05
 * @LastEditTime : 2021-12-25 20:37:59
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/website/SweepWidget.ts
 * @Description  : https://sweepwidget.com/
 */

import throwError from '../tools/throwError';
import echoLog from '../echoLog';
import __ from '../tools/i18n';
// import { getRedirectLink } from '../tools/tools';
import Website from './Website';
import { delay } from '../tools/tools';

interface options {
  username: string
  email: string
}
const defaultOptions: options = {
  username: '',
  email: ''
};

class SweepWidget extends Website {
  name = 'SweepWidget'
  options = {
    ...defaultOptions,
    ...GM_getValue<options>('SweepWidgetOptions') // eslint-disable-line new-cap
  }
  buttons: Array<string> = [
    'doTask'
  ]

  static test(): boolean {
    return /^https?:\/\/sweepwidget\.com\/view\/[\d]+/.test(window.location.href);
  }
  async before(): Promise<void> {
    try {
      if (!this.#checkLogin()) {
        echoLog({ html: `<li><font class="warning>${__('checkLoginFailed')}</font></li>` });
      }
    } catch (error) {
      throwError(error as Error, 'SweepWidget.before');
    }
  }
  init(): boolean {
    try {
      const logStatus = echoLog({ text: __('initing') });
      if (!this.#checkLogin()) {
        logStatus.warning(__('needLogin'));
        return false;
      }
      if (!this.#getGiveawayId()) return false;
      this.initialized = true;
      logStatus.success();
      return true;
    } catch (error) {
      throwError(error as Error, 'SweepWidget.init');
      return false;
    }
  }
  classifyTask(): boolean {
    return true;
  }
  async doTask(): Promise<boolean> {
    try {
      if ($('#unlock_rewards_main_wrapper').length === 0) {
        if ($('input[name="sw__login_name"]:visible').length > 0) {
          $('input[name="sw__login_name"]').val(this.options.username);
        }
        if ($('input[name="sw__login_email"]:visible').length > 0) {
          $('input[name="sw__login_email"]').val(this.options.email);
        }
        if ($('#sw_login_button:visible').length > 0) {
          $('#sw_login_button')[0].click();
        }
        if (!(await this.#checkEnter())) {
          return false;
        }
      }
      const logStatus = echoLog({ text: __('SweepWidgetNotice') });

      // this.socialTasks = GM_getValue<swSocialTasks>(`swTasks-${this.giveawayId}`) || defaultTasks; // eslint-disable-line new-cap

      const tasks = $('#sw_inner_entry_methods_l2_wrapper>div.sw_entry');
      for (const task of tasks) {
        const $task = $(task);
        if ($task.find('i.fa-check:visible').length > 0) {
          continue;
        }
        const title = $task.find('.sw_text_inner');
        title[0].click();
        const aElement = $task.find('a.sw_link');
        const link = aElement.attr('href');
        aElement.attr('href', '#a').attr('target', '_self');
        aElement[0]?.click();
        await delay(300);
        aElement.attr('href', link as string).attr('target', '_blank');
        $task.find('input[type="text"]').val('test');
        const verifyBtn = $task.find('input.sw_verify');
        if (verifyBtn.prop('disabled') === true) {
          title[0].click();
          await delay(300);
          title[0].click();
          await delay(300);
        }
        $task.find('input.sw_verify').removeAttr('disabled')[0]?.click();
        await this.#checkFinish($task);
        await delay(parseInt(`${(Math.random() * (3000 - 1000 + 1)) + 1000}`, 10));
      }

      logStatus.success();
      /*
      this.undoneTasks = this.uniqueTasks(this.undoneTasks) as gasSocialTasks;
      this.socialTasks = this.undoneTasks;
      GM_setValue(`swTasks-${this.giveawayId}`, this.socialTasks); // eslint-disable-line new-cap
      */
      return true;
    } catch (error) {
      throwError(error as Error, 'SweepWidget.doTask');
      return false;
    }
  }

  #checkLogin(): boolean {
    try {
      if ($('#twitter_login_button').length > 0) {
        $('#twitter_login_button')[0].click();
      }
      return true;
    } catch (error) {
      throwError(error as Error, 'SweepWidget.checkLogin');
      return false;
    }
  }
  #getGiveawayId() {
    try {
      const giveawayId = window.location.href.match(/\/view\/([\d]+)/)?.[1];
      if (giveawayId) {
        this.giveawayId = giveawayId;
        return true;
      }
      echoLog({ text: __('getFailed', 'GiveawayId') });
      return false;
    } catch (error) {
      throwError(error as Error, 'SweepWidget.getGiveawayId');
      return false;
    }
  }
  async #checkEnter():Promise<boolean> {
    try {
      return new Promise((resolve) => {
        const checker = setInterval(() => {
          if ($('#unlock_rewards_main_wrapper').length > 0) {
            clearInterval(checker);
            resolve(true);
          }
        });
      });
    } catch (error) {
      throwError(error as Error, 'SweepWidget.checkEnter');
      return false;
    }
  }
  async #checkFinish($task: JQuery): Promise<boolean> {
    try {
      return new Promise((resolve) => {
        const checker = setInterval(() => {
          if ($task.find('i.fa-check:visible').length > 0 || $task.find('.sw_entry_input:visible').length === 0) {
            clearInterval(checker);
            resolve(true);
          }
        });
      });
    } catch (error) {
      throwError(error as Error, 'SweepWidget.checkFinish');
      return false;
    }
  }
}

export default SweepWidget;

/*
 * @Author       : HCLonely
 * @Date         : 2021-11-14 20:22:33
 * @LastEditTime : 2021-12-26 19:56:10
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/website/Prys.ts
 * @Description  : https://prys.revadike.com/
 */

// eslint-disable-next-line
/// <reference path = "Prys.d.ts" />

// todo: 未测试
import Swal from 'sweetalert2';
import Website from './Website';
import throwError from '../tools/throwError';
import echoLog from '../echoLog';
import __ from '../tools/i18n';
import { getRedirectLink } from '../tools/tools';
import { globalOptions } from '../globalOptions';

const defaultTasks: prysSocialTasks = {
  steam: {
    groupLinks: [],
    curatorLinks: []
  }
};

class Prys extends Website {
  name = 'Prys'
  socialTasks: prysSocialTasks = { ...defaultTasks }
  undoneTasks: prysSocialTasks = { ...defaultTasks }
  buttons: Array<string> = [
    'doTask',
    'undoTask',
    'verifyTask'
  ]

  static test(): boolean {
    return window.location.host === 'prys.revadike.com';
  }
  async after(): Promise<void> {
    try {
      if (!this.#checkLogin()) {
        echoLog({ html: `<li><font class="warning>${__('checkLoginFailed')}</font></li>` });
      }
      if (!await this.#checkLeftKey()) {
        echoLog({ html: `<li><font class="warning>${__('checkLeftKeyFailed')}</font></li>` });
      }
    } catch (error) {
      throwError(error as Error, 'Prys.after');
    }
  }
  init(): boolean { // todo
    try {
      const logStatus = echoLog({ text: __('initing') });
      if ($('button:contains("Sign")').length > 0) {
        logStatus.warning(__('needLogin'));
        return false;
      }
      if (!this.#getGiveawayId()) return false;
      this.initialized = true;
      logStatus.success();
      return true;
    } catch (error) {
      throwError(error as Error, 'Prys.init');
      return false;
    }
  }

  async classifyTask(action: string): Promise<boolean> { // todo
    try {
      const logStatus = echoLog({ text: __('getTasksInfo') });
      if (action === 'undo') {
        this.socialTasks = GM_getValue<prysSocialTasks>(`prysTasks-${this.giveawayId}`) || { ...defaultTasks }; // eslint-disable-line new-cap
      }

      const steps = $('#steps tbody tr');
      for (let eq = 0; eq < steps.length; eq += 1) {
        if (steps.eq(eq).find('span:contains(Success)').length === 0) checkClick(eq);
      }

      const pro = [];
      for (const step of steps) {
        const isSuccess = $(step).find('span:contains(Success)').length > 0;
        if ($(step).find('a[href*=\'store.steampowered.com/curator/\']').length > 0) {
          const link = $(step).find('a[href*=\'store.steampowered.com/curator/\']')
            .attr('href');
          if (!link) continue;
          if (action === 'undo') this.socialTasks.steam.curatorLinks.push(link);
          if (action === 'do' && !isSuccess) this.undoneTasks.steam.curatorLinks.push(link);
        } else if ($(step).find('a[href*=\'steampowered.com/groups/\']').length > 0) {
          const link = $(step).find('a[href*=\'steampowered.com/groups/\']')
            .attr('href');
          if (!link) continue;
          if (action === 'undo') this.socialTasks.steam.groupLinks.push(link);
          if (action === 'do' && !isSuccess) this.undoneTasks.steam.groupLinks.push(link);
        } else if ($(step).find('a[href*=\'steamcommunity.com/gid\']').length > 0) {
          const link = $(step).find('a[href*=\'steamcommunity.com/gid\']')
            .attr('href');
          if (!link) continue;
          pro.push(getRedirectLink(link).then((finalUrl) => {
            if (!finalUrl || !/^https?:\/\/steampowered\.com\/groups\//.test(finalUrl)) return false;
            if (action === 'undo') this.socialTasks.steam.groupLinks.push(finalUrl);
            if (action === 'do' && !isSuccess) this.undoneTasks.steam.groupLinks.push(finalUrl);
          }));
        }
      }

      await Promise.all(pro);
      logStatus.success();
      this.undoneTasks = this.uniqueTasks(this.undoneTasks) as prysSocialTasks;
      this.socialTasks = this.uniqueTasks(this.socialTasks) as prysSocialTasks;
      GM_setValue(`prysTasks-${this.giveawayId}`, this.socialTasks); // eslint-disable-line new-cap
      return true;
    } catch (error) {
      throwError(error as Error, 'Prys.classifyTask');
      return false;
    }
  }

  async verifyTask(): Promise<void> { // todo
    try {
      const pro = [];
      const checks = $('#steps tbody a[id^=check]');
      if (checks.length > 0) {
        for (const check of checks) {
          const id = $(check).attr('id')
            ?.match(/[\d]+/)?.[0];
          if (!id) continue;
          const taskDes = $(check).parent()
            ?.prev()
            ?.html()
            ?.trim();
          const status = echoLog({ text: `${__('verifyingTask')}${taskDes}...` });
          pro.push(new Promise((resolve) => {
            this.#checkStep(id, resolve, status);
          }));
        }
        await Promise.all(pro);
        echoLog({ html: `<li><font class="success">${__('allTasksComplete')}</font></li>` });
      } else {
        echoLog({ html: `<li><font class="success">${__('allTasksComplete')}</font></li>` });
      }
    } catch (error) {
      throwError(error as Error, 'Prys.verifyTask');
    }
  }

  #getGiveawayId(): boolean {
    try {
      const giveawayId = window.location.search.match(/id=([\d]+)/)?.[1];
      if (giveawayId) {
        this.giveawayId = giveawayId;
        return true;
      }
      echoLog({ html: `<li><font class="error">${__('getFailed', 'GiveawayId')}</font></li>` });
      return false;
    } catch (error) {
      throwError(error as Error, 'Prys.getGiveawayId');
      return false;
    }
  }
  async #checkLeftKey(): Promise<boolean> {
    try {
      if (!globalOptions.other.checkLeftKey) return true;
      const leftKey = $('#header').text()
        .match(/([\d]+).*?prize.*?left/)?.[1];
      if (leftKey === '0') {
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
      throwError(error as Error, 'Prys.checkLeftKey');
      return false;
    }
  }
  #checkLogin(): boolean {
    try {
      if (!globalOptions.other.checkLogin) return true;
      if ($('button:contains("Sign")').length > 0) {
        echoLog({ html: `<li><font class="warning">${__('needLogin')}</font></li>` });
      }
      return true;
    } catch (error) {
      throwError(error as Error, 'Prys.checkLogin');
      return false;
    }
  }
  #checkStep(step: string, resolve: (param?: boolean)=>void, status: logStatus, captcha = null) {
    try {
      if (step !== 'captcha') {
        $(`#check${step}`).replaceWith(`<span id="check${step}"><i class="fa fa-refresh fa-spin fa-fw"></i> Checking...</span>`);
      }
      $.post('/api/check_step', {
        step,
        id: getURLParameter('id'),
        'g-recaptcha-response': captcha
      }, (json) => {
        resolve();
        if (json.success && step !== 'captcha') {
          $(`#check${step}`).replaceWith(`<span class="text-success" id="check${step}"><i class="fa fa-check"></i> Success</span>`);
          status.success();
        } else if (step !== 'captcha') {
          $(`#check${step}`).replaceWith(`<a id="check${step}" href="javascript:checkStep(${step})"><i class="fa fa-question"></i> Check</a>`);
          status.error(json.response?.error || 'Error');
        }
        if (json.response) {
          if (json.response.captcha && json.success) {
            showAlert('info', json.response.captcha);
            captchaCheck();
          } else if (json.response.captcha) {
            showAlert('warning', json.response.captcha);
            captchaCheck();
          }
          if (json.response.prize) {
            showAlert('success', `Here is your prize:<h1 role="button" align="middle" style="word-wrap: break-word;">${json.response.prize}</h2>`);
          }
        }
      }).fail(() => {
        resolve();
        $(`#check${step}`).replaceWith(`<a id="check${step}" href="javascript:checkStep(${step})"><i class="fa fa-question"></i> Check</a>`);
        status.error('Error:0');
      });
    } catch (error) {
      throwError(error as Error, 'prys.checkStep');
      resolve(false);
    }
  }
}

export default Prys;

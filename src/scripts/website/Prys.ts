/*
 * @Author       : HCLonely
 * @Date         : 2021-11-14 20:22:33
 * @LastEditTime : 2021-11-17 10:32:43
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/website/Prys.ts
 * @Description  :
 */

// todo: 未测试
import Swal from 'sweetalert2';
import Website from './Website';
import throwError from '../tools/throwError';
import echoLog from '../echoLog';
import getI18n from '../i18n/i18n';
import { getRedirectLink } from '../tools/tools';

declare function checkClick(prarm: number): void
declare function getURLParameter(prarm: string): string
declare function showAlert(prarm1: string, prarm2: string): void
declare function captchaCheck(): void

interface prysSocialTasks {
  steam: {
    groupLinks: Array<string>
    curatorLinks: Array<string>
  }
}

const defaultTasks: prysSocialTasks = {
  steam: {
    groupLinks: [],
    curatorLinks: []
  }
};

class Prys extends Website {
  socialTasks: prysSocialTasks = { ...defaultTasks }
  undoneTasks: prysSocialTasks = { ...defaultTasks }

  static test(): boolean {
    return window.location.host === 'prys.revadike.com';
  }
  async before(): Promise<void> {
    try {
      if (!this.checkLogin()) {
        echoLog({ type: 'checkLoginFailed' });
      }
      if (!await this.checkLeftKey()) {
        echoLog({ type: 'checkLeftKeyFailed' });
      }
    } catch (error) {
      throwError(error as Error, 'Prys.before');
    }
  }
  init(): boolean { // todo
    try {
      const logStatus = echoLog({ type: 'init' });
      if ($('button:contains("Sign")').length > 0) {
        logStatus.warning('请先登录');
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
      const logStatus = echoLog({ type: 'custom', text: `<li>${getI18n('getTasksInfo')}<font></font></li>` });
      // todo
      this.undoneTasks = GM_getValue<prysSocialTasks>(`prysTasks-${this.giveawayId}`) || { ...defaultTasks }; // eslint-disable-line new-cap

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
      GM_setValue(`prysTasks${this.giveawayId}`, this.socialTasks); // eslint-disable-line new-cap
      return true;
    } catch (error) {
      throwError(error as Error, 'Prys.classifyTask');
      return false;
    }
  }

  async verifyTask(): Promise<void> { // todo
    try {
      echoLog({ type: 'custom', text: `<li>${getI18n('verifyingTask')}...<font></font></li>` });
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
          const status = echoLog({ type: 'custom', text: `<li>${getI18n('verifyingTask')}${taskDes}...<font></font></li>` });
          pro.push(new Promise((resolve) => {
            this.#checkStep(id, resolve, status);
          }));
        }
        await Promise.all(pro);
        echoLog({ type: 'custom', text: `<li><font class="success">${getI18n('prysAllTasksComplete')}</font></li>` });
      } else {
        echoLog({ type: 'custom', text: `<li><font class="success">${getI18n('prysAllTasksComplete')}</font></li>` });
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
      echoLog({ type: 'custom', text: `<li><font class="error">${getI18n('getGiveawayIdFailed')}</font></li>` });
      return false;
    } catch (error) {
      throwError(error as Error, 'Prys.getGiveawayId');
      return false;
    }
  }
  async checkLeftKey(): Promise<boolean> {
    try {
      const leftKey = $('#header').text()
        .match(/([\d]+).*?prize.*?left/)?.[1];
      if (leftKey === '0') {
        await Swal.fire({
          icon: 'warning',
          title: getI18n('notice'),
          text: getI18n('noKeysLeft'),
          confirmButtonText: getI18n('confirm'),
          cancelButtonText: getI18n('cancel'),
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
  checkLogin(): boolean {
    try {
      if ($('button:contains("Sign")').length > 0) {
        echoLog({ type: 'custom', text: '<li>请先登录！<font></font></li>' });
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
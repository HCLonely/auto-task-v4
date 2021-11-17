/*
 * @Author       : HCLonely
 * @Date         : 2021-11-11 14:02:46
 * @LastEditTime : 2021-11-17 10:31:46
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/website/keyhub.ts
 * @Description  :
 */
// todo: 未测试
import Swal from 'sweetalert2';
import Website from './Website';
import throwError from '../tools/throwError';
import echoLog from '../echoLog';
import getI18n from '../i18n/i18n';
import { getRedirectLink } from '../tools/tools';

interface khSocialTasks {
  steam: {
    groupLinks: Array<string>
    wishlistLinks: Array<string>
  }
  links: Array<string>
}

declare function VerifyTasks(value: string): void

const defaultTasks: khSocialTasks = {
  steam: {
    groupLinks: [],
    wishlistLinks: []
  },
  links: []
};

class Keyhub extends Website {
  socialTasks: khSocialTasks = { ...defaultTasks }
  undoneTasks: khSocialTasks = { ...defaultTasks }

  static test(): boolean {
    return window.location.host === 'key-hub.eu';
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
      throwError(error as Error, 'Keyhub.before');
    }
  }
  init(): boolean {
    try {
      const logStatus = echoLog({ type: 'init' });
      if ($('a[href*="/connect/steam"]').length > 0) {
        window.open('/connect/steam', '_self');
        logStatus.warning('请先登录');
        return false;
      }
      if (!this.#getGiveawayId()) return false;
      $('#VPNoverlay').hide();
      $('#mainArticleSection').show();
      this.initialized = true;
      logStatus.success();
      return true;
    } catch (error) {
      throwError(error as Error, 'Keyhub.init');
      return false;
    }
  }

  async classifyTask(action: string): Promise<boolean> {
    try {
      const logStatus = echoLog({ type: 'custom', text: `<li>${getI18n('getTasksInfo')}<font></font></li>` });
      // todo
      this.undoneTasks = GM_getValue<khSocialTasks>(`khTasks-${this.giveawayId}`) || { ...defaultTasks }; // eslint-disable-line new-cap

      const pro = [];
      const tasks = $('.task a');
      for (const task of tasks) {
        const link = $(task).attr('href');
        const taskDes = $(task).text()
          .trim();

        if (!link) continue;
        if (/steamcommunity\.com\/gid\//.test(link)) {
          pro.push(getRedirectLink(link)
            .then((taskLink) => {
              if (!taskLink) {
                return false;
              }
              if (action === 'undo') this.socialTasks.steam.groupLinks.push(taskLink);
              if (action === 'do') this.undoneTasks.steam.groupLinks.push(taskLink);
            }));
        } else if (/https?:\/\/key-hub\.eu\/connect\/discord/.test(link)) {
          window.open(link, '_blank');
        } else if (/steamcommunity\.com\/groups\//.test(link)) {
          if (action === 'undo') this.socialTasks.steam.groupLinks.push(link);
          if (action === 'do') this.undoneTasks.steam.groupLinks.push(link);
        } else if (/store\.steampowered\.com\/app\//.test(link) && /wishlist/gim.test(taskDes)) {
          if (action === 'undo') this.socialTasks.steam.wishlistLinks.push(link);
          if (action === 'do') this.undoneTasks.steam.wishlistLinks.push(link);
        } else if (/\/away\?data=.*/.test(link)) {
          this.undoneTasks.links.push(link);
        } else {
          echoLog({ type: 'custom', text: `<li>${getI18n('unknownTaskType', `${taskDes}(${link})`)}<font></font></li>` });
        }
      }

      await Promise.all(pro);
      logStatus.success();
      this.undoneTasks = this.uniqueTasks(this.undoneTasks) as khSocialTasks;
      this.socialTasks = this.uniqueTasks(this.socialTasks) as khSocialTasks;
      GM_setValue(`khTasks${this.giveawayId}`, this.socialTasks); // eslint-disable-line new-cap
      return true;
    } catch (error) {
      throwError(error as Error, 'Keyhub.classifyTask');
      return false;
    }
  }

  verifyTask(): void {
    try {
      echoLog({ type: 'custom', text: `<li>${getI18n('verifyingTask')}...<font></font></li>` });
      $.get(window.location.href, (res) => {
        VerifyTasks(res.match(/onclick="javascript:VerifyTasks\('(.*?)'\)"/)[1]); // eslint-disable-line new-cap
      });
    } catch (error) {
      throwError(error as Error, 'keyhub.verifyTask');
    }
  }

  #getGiveawayId(): boolean {
    try {
      const giveawayId = window.location.href.match(/giveaway\/([\d]+)/)?.[1];
      if (giveawayId) {
        this.giveawayId = giveawayId;
        return true;
      }
      echoLog({ type: 'custom', text: `<li><font class="error">${getI18n('getGiveawayIdFailed')}</font></li>` });
      return false;
    } catch (error) {
      throwError(error as Error, 'Keyhub.getGiveawayId');
      return false;
    }
  }
  async checkLeftKey(): Promise<boolean> {
    try {
      const leftKey = $('#keysleft').text()
        .trim();
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
      throwError(error as Error, 'Keyhub.checkLeftKey');
      return false;
    }
  }
  checkLogin(): boolean {
    try {
      if ($('a[href*="/connect/steam"]').length > 0) {
        window.open('/connect/steam', '_self');
      }
      return true;
    } catch (error) {
      throwError(error as Error, 'Keyhub.checkLogin');
      return false;
    }
  }
}

export default Keyhub;

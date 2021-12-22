/*
 * @Author       : HCLonely
 * @Date         : 2021-11-11 14:02:46
 * @LastEditTime : 2021-12-22 17:42:41
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/website/keyhub.ts
 * @Description  : https://key-hub.eu/
 */

import Swal from 'sweetalert2';
import Website from './Website';
import throwError from '../tools/throwError';
import echoLog from '../echoLog';
import __ from '../tools/i18n';
import { getRedirectLink } from '../tools/tools';

interface khSocialTasks {
  steam: {
    groupLinks: Array<string>
    wishlistLinks: Array<string>
    curatorLinks: Array<string>
  }
  discord: {
    serverLinks: Array<string>
  }
  links: Array<string>
}

declare function VerifyTasks(value: string): void

const defaultTasks: khSocialTasks = {
  steam: {
    groupLinks: [],
    wishlistLinks: [],
    curatorLinks: []
  },
  discord: {
    serverLinks: []
  },
  links: []
};

class Keyhub extends Website {
  name = 'Keyhub'
  socialTasks: khSocialTasks = { ...defaultTasks }
  undoneTasks: khSocialTasks = { ...defaultTasks }

  static test(): boolean {
    return window.location.host === 'key-hub.eu';
  }
  async before(): Promise<void> {
    try {
      if (!this.#checkLogin()) {
        echoLog({ html: `<li><font class="warning>${__('checkLoginFailed')}</font></li>` });
      }
      if (!await this.#checkLeftKey()) {
        echoLog({ html: `<li><font class="warning>${__('checkLeftKeyFailed')}</font></li>` });
      }
    } catch (error) {
      throwError(error as Error, 'Keyhub.before');
    }
  }
  init(): boolean {
    try {
      const logStatus = echoLog({ text: __('initing') });
      if ($('a[href*="/connect/steam"]').length > 0) {
        window.open('/connect/steam', '_self');
        logStatus.warning(__('needLogin'));
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
      const logStatus = echoLog({ text: __('getTasksInfo') });
      // todo
      this.socialTasks = GM_getValue<khSocialTasks>(`khTasks-${this.giveawayId}`) || { ...defaultTasks }; // eslint-disable-line new-cap

      const tasks = $('.task a');
      for (const task of tasks) {
        let link = $(task).attr('href');
        const taskDes = $(task).text()
          .trim();

        if (!link) continue;

        if (/\/away\?data=/.test(link) || /steamcommunity\.com\/gid\//.test(link)) {
          link = await getRedirectLink(link) || link;
        }
        if (/https?:\/\/key-hub\.eu\/connect\/discord/.test(link)) {
          window.open(link, '_blank');
        } else if (/steamcommunity\.com\/groups\//.test(link)) {
          if (action === 'undo') this.socialTasks.steam.groupLinks.push(link);
          if (action === 'do') this.undoneTasks.steam.groupLinks.push(link);
        } else if (/store\.steampowered\.com\/app\//.test(link) && /wishlist/gim.test(taskDes)) {
          if (action === 'undo') this.socialTasks.steam.wishlistLinks.push(link);
          if (action === 'do') this.undoneTasks.steam.wishlistLinks.push(link);
        } else if (/store\.steampowered\.com\/curator\//.test(link)) {
          if (action === 'undo') this.socialTasks.steam.curatorLinks.push(link);
          if (action === 'do') this.undoneTasks.steam.curatorLinks.push(link);
        } else if (/^https?:\/\/discord\.com\/invite\//.test(link)) {
          if (action === 'undo') this.socialTasks.discord.serverLinks.push(link);
          if (action === 'do') this.undoneTasks.discord.serverLinks.push(link);
        } else {
          echoLog({ html: `<li><font class="warning>${__('unKnownTaskType', `${taskDes}(${link})`)}</font></li>` });
        }
      }

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
      echoLog({ type: 'custom', text: `<li>${__('verifyingTask')}...<font></font></li>` });
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
      echoLog({ html: `<li><font class="error">${__('getFailed', 'GiveawayId')}</font></li>` });
      return false;
    } catch (error) {
      throwError(error as Error, 'Keyhub.getGiveawayId');
      return false;
    }
  }
  async #checkLeftKey(): Promise<boolean> {
    try {
      const leftKey = $('#keysleft').text()
        .trim();
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
      throwError(error as Error, 'Keyhub.checkLeftKey');
      return false;
    }
  }
  #checkLogin(): boolean {
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

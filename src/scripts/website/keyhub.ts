/*
 * @Author       : HCLonely
 * @Date         : 2021-11-11 14:02:46
 * @LastEditTime : 2022-08-17 16:28:50
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/website/keyhub.ts
 * @Description  : https://key-hub.eu/
 */

// eslint-disable-next-line
/// <reference path = "Keyhub.d.ts" />

import Swal from 'sweetalert2';
import Website from './Website';
import throwError from '../tools/throwError';
import echoLog from '../echoLog';
import __ from '../tools/i18n';
import { getRedirectLink } from '../tools/tools';
import { globalOptions } from '../globalOptions';
import httpRequest from '../tools/httpRequest';

const defaultTasksTemplate: khSocialTasks = {
  steam: {
    groupLinks: [],
    officialGroupLinks: [],
    wishlistLinks: [],
    curatorLinks: []
  },
  discord: {
    serverLinks: []
  },
  extra: {
    videoTasks: []
  },
  links: []
};
const defaultTasks = JSON.stringify(defaultTasksTemplate);

class Keyhub extends Website {
  name = 'Keyhub';
  socialTasks: khSocialTasks = JSON.parse(defaultTasks);
  undoneTasks: khSocialTasks = JSON.parse(defaultTasks);
  buttons: Array<string> = [
    'doTask',
    'undoTask'
  ];

  static test(): boolean {
    return window.location.host === 'key-hub.eu';
  }
  async after(): Promise<void> {
    try {
      if (!this.#checkLogin()) {
        echoLog({}).warning(__('checkLoginFailed'));
      }
      if (!await this.#checkLeftKey()) {
        echoLog({}).warning(__('checkLeftKeyFailed'));
      }
      $('.NSFW').hide();
    } catch (error) {
      throwError(error as Error, 'Keyhub.after');
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
      if (action === 'undo') {
        this.socialTasks = GM_getValue<khGMTasks>(`khTasks-${this.giveawayId}`)?.tasks || JSON.parse(defaultTasks);
      }

      const tasks = $('.task:not(".googleads")')
        .filter((index, element) => (action === 'do' ? $(element).find('i.fa-check-circle:visible').length === 0 : true))
        .find('a');
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
        } else if (/steamcommunity\.com\/games\/[\d]+/.test(link)) {
          if (action === 'undo') this.socialTasks.steam.officialGroupLinks.push(link);
          if (action === 'do') this.undoneTasks.steam.officialGroupLinks.push(link);
        } else if (/store\.steampowered\.com\/app\//.test(link) && /wishlist/gim.test(taskDes)) {
          if (action === 'undo') this.socialTasks.steam.wishlistLinks.push(link);
          if (action === 'do') this.undoneTasks.steam.wishlistLinks.push(link);
        } else if (/store\.steampowered\.com\/curator\//.test(link)) {
          if (action === 'undo') this.socialTasks.steam.curatorLinks.push(link);
          if (action === 'do') this.undoneTasks.steam.curatorLinks.push(link);
        } else if (/^https?:\/\/discord\.com\/invite\//.test(link)) {
          if (action === 'undo') this.socialTasks.discord.serverLinks.push(link);
          if (action === 'do') this.undoneTasks.discord.serverLinks.push(link);
        } else if (/^javascript:videoTask.+/.test(link)) {
          if (action === 'do') {
            const taskData = link.match(/javascript:videoTask\('.+?','(.+?)'/)?.[1];
            if (taskData) this.undoneTasks.extra.videoTasks.push(taskData);
          }
        } else if (
          /^https?:\/\/www\.instagram\.com\/.*/.test(link) ||
          /^https?:\/\/twitter\.com\/.*/.test(link) ||
          /^https?:\/\/www\.twitch\.tv\/.*/.test(link) ||
          /^https?:\/\/www\.facebook\.com\/.*/.test(link) ||
          /^https?:\/\/www\.youtube\.com\/.*/.test(link) ||
          /^https?:\/\/store\.steampowered\.com\/developer\//.test(link) ||
          /^https?:\/\/.*?\.itch\.io\/.*/.test(link) ||
          /^https?:\/\/.*?\.itch\.io\/.*/.test(link) ||
          /^https?:\/\/key-hub\.eu.*/.test(link) ||
          /^https?:\/\/store\.steampowered\.com\/app\/.*/.test(link)
        ) {
          // skip
        } else {
          echoLog({}).warning(`${__('unKnownTaskType')}: ${taskDes}(${link})`);
        }
      }

      logStatus.success();
      this.undoneTasks = this.uniqueTasks(this.undoneTasks) as khSocialTasks;
      this.socialTasks = this.uniqueTasks(this.socialTasks) as khSocialTasks;
      if (window.DEBUG) console.log('%cAuto-Task[Debug]:', 'color:blue', JSON.stringify(this));
      GM_setValue(`khTasks-${this.giveawayId}`, { tasks: this.socialTasks, time: new Date().getTime() });
      return true;
    } catch (error) {
      throwError(error as Error, 'Keyhub.classifyTask');
      return false;
    }
  }

  async #doScriptTask(data: string): Promise<boolean> {
    try {
      const logStatus = echoLog({ text: __('doingKeyhubTask') });
      const { result, statusText, status, data: response } = await httpRequest({
        url: `/away?data=${data}`,
        method: 'GET',
        headers: {
          origin: 'https://key-hub.eu',
          referer: 'https://key-hub.eu/'
        }
      });

      if (result === 'Success') {
        if (response?.status === 200) {
          logStatus.success();
          return true;
        }
        logStatus.error(`Error:${response?.statusText}(${response?.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'Keyhub.doScriptTask');
      return false;
    }
  }
  async extraDoTask({ videoTasks }: { videoTasks: Array<string> }): Promise<boolean> {
    try {
      const pro = [];
      for (const data of videoTasks) {
        pro.push(this.#doScriptTask(data));
      }
      return Promise.all(pro).then(() => true);
    } catch (error) {
      throwError(error as Error, 'Keyhub.extraDoTask');
      return false;
    }
  }
  /*
  verifyTask(): void {
    try {
      echoLog({ html: `<li>${__('verifyingTask')}...<font></font></li>` });
      $.get(window.location.href, (res) => {
        VerifyTasks(res.match(/onclick="javascript:VerifyTasks\('(.*?)'\)"/)[1]); // eslint-disable-line new-cap
      });
    } catch (error) {
      throwError(error as Error, 'keyhub.verifyTask');
    }
  }
  */

  #getGiveawayId(): boolean {
    try {
      const giveawayId = window.location.href.match(/giveaway\/([\d]+)/)?.[1];
      if (giveawayId) {
        this.giveawayId = giveawayId;
        return true;
      }
      echoLog({}).error(__('getFailed', 'GiveawayId'));
      return false;
    } catch (error) {
      throwError(error as Error, 'Keyhub.getGiveawayId');
      return false;
    }
  }
  async #checkLeftKey(): Promise<boolean> {
    try {
      if (!globalOptions.other.checkLeftKey) return true;
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
      if (!globalOptions.other.checkLogin) return true;
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

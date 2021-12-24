/*
 * @Author       : HCLonely
 * @Date         : 2021-11-08 10:37:13
 * @LastEditTime : 2021-12-24 15:49:34
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/website/Giveawaysu.ts
 * @Description  : https://giveaway.su/
 */

// eslint-disable-next-line
/// <reference path = "GiveawaySu.d.ts" />

import Swal from 'sweetalert2';
import Website from './Website';
import throwError from '../tools/throwError';
import echoLog from '../echoLog';
import __ from '../tools/i18n';
import { getRedirectLink } from '../tools/tools';

const defaultTasks: gasSocialTasks = {
  steam: {
    groupLinks: [],
    wishlistLinks: [],
    curatorLinks: [],
    curatorLikeLinks: [],
    followLinks: [],
    forumLinks: [],
    announcementLinks: [],
    workshopVoteLinks: []
  },
  discord: {
    serverLinks: []
  },
  instagram: {
    userLinks: []
  },
  vk: {
    nameLinks: []
  },
  twitch: {
    channelLinks: []
  },
  reddit: {
    redditLinks: []
  },
  youtube: {
    channelLinks: [],
    likeLinks: []
  }
};

class GiveawaySu extends Website {
  name = 'GiveawaySu'
  socialTasks: gasSocialTasks = defaultTasks
  undoneTasks: gasSocialTasks = defaultTasks
  buttons: Array<string> = [
    'doTask',
    'undoTask'
  ]

  static test(): boolean {
    return /^https?:\/\/giveaway\.su\/giveaway\/view\/[\d]+/.test(window.location.href);
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
      throwError(error as Error, 'Giveawaysu.before');
    }
  }
  init(): boolean {
    try {
      const logStatus = echoLog({ text: __('initing') });
      if ($('a.steam-login').length > 0) {
        window.open('/steam/redirect', '_self');
        logStatus.warning(__('needLogin'));
        return false;
      }
      if (!this.#getGiveawayId()) return false;
      this.initialized = true;
      logStatus.success();
      return true;
    } catch (error) {
      throwError(error as Error, 'Giveawaysu.init');
      return false;
    }
  }
  async classifyTask(action: 'do' | 'undo'): Promise<boolean> {
    try {
      const logStatus = echoLog({ text: __('getTasksInfo') });
      if (action === 'undo') {
        this.socialTasks = GM_getValue<gasSocialTasks>(`gasTasks-${this.giveawayId}`) || defaultTasks; // eslint-disable-line new-cap
        return true;
      }

      const pro = [];
      const tasks = $('#actions tr');
      if ($('div.bind-discord').is(':visible')) $('div.bind-discord a')[0].click();
      if ($('div.bind-twitch').is(':visible')) $('div.bind-twitch a')[0].click();
      for (const task of tasks) {
        pro.push(new Promise((resolve) => {
          const td = $(task).find('td:not(".hidden")');
          const colorfulTask = td.eq(1).find('a:not([data-trigger="link"])');
          const colorlessTask = td.eq(2).find('a:not([data-trigger="link"])');
          const taskDes = colorfulTask.length > 0 ? colorfulTask : colorlessTask;
          const taskIcon = td.eq(0).find('i')
            .attr('class') || '';
          const taskName = taskDes.text().trim();
          if (taskIcon.includes('ban') || /disable adblock/gi.test(taskName)) {
            return resolve(true);
          }

          getRedirectLink(taskDes.attr('href')).then((taskLink) => {
            if (!taskLink) {
              return resolve(false);
            }
            if (taskIcon.includes('steam') && /join/gi.test(taskName)) {
              this.undoneTasks.steam.groupLinks.push(taskLink);
            } else if (/like.*announcement/gi.test(taskName)) {
              this.undoneTasks.steam.announcementLinks.push(taskLink);
            } else if (/(follow|subscribe).*curator/gim.test(taskName) && /^https?:\/\/store\.steampowered\.com\/curator\//.test(taskLink)) {
              this.undoneTasks.steam.curatorLinks.push(taskLink);
            } else if (taskIcon.includes('steam') && /follow|subscribe/gim.test(taskName)) {
              this.undoneTasks.steam.curatorLikeLinks.push(taskLink);
            } else if (/subscribe.*steam.*forum/gim.test(taskName)) {
              this.undoneTasks.steam.forumLinks.push(taskLink);
            } else if (taskIcon.includes('thumbs-up') && /^https?:\/\/steamcommunity\.com\/sharedfiles\/filedetails\/\?id=[\d]+/.test(taskLink)) {
              this.undoneTasks.steam.workshopVoteLinks.push(taskLink);
            } else if (taskIcon.includes('discord') || /join.*discord/gim.test(taskName)) {
              this.undoneTasks.discord.serverLinks.push(taskLink);
            } else if (taskIcon.includes('instagram') || /follow.*instagram/gim.test(taskName)) {
              this.undoneTasks.instagram.userLinks.push(taskLink);
            } else if (taskIcon.includes('twitch') || /follow.*twitch.*channel/gim.test(taskName)) {
              this.undoneTasks.twitch.channelLinks.push(taskLink);
            } else if (taskIcon.includes('reddit') || /subscribe.*subreddit/gim.test(taskName) || /follow.*reddit/gim.test(taskName)) {
              this.undoneTasks.reddit.redditLinks.push(taskLink);
            } else if (/watch.*art/gim.test(taskName)) {
              this.undoneTasks.steam.workshopVoteLinks.push(taskLink);
            } else if (/subscribe.*youtube.*channel/gim.test(taskName)) {
              this.undoneTasks.youtube.channelLinks.push(taskLink);
            } else if (/(watch|like).*youtube.*video/gim.test(taskName) ||
              ((taskIcon.includes('youtube') || taskIcon.includes('thumbs-up')) && /(watch|like).*video/gim.test(taskName))) {
              this.undoneTasks.youtube.likeLinks.push(taskLink);
            } else if (taskIcon.includes('vk') || /join.*vk.*group/gim.test(taskName)) {
              this.undoneTasks.vk.nameLinks.push(taskLink);
            } else {
              if (/(on twitter)|(Follow.*on.*Facebook)/gim.test(taskName)) {
                // this.taskInfo.links.push(link)
              } else {
                if (/wishlist.*game|add.*wishlist/gim.test(taskName)) {
                  this.undoneTasks.steam.wishlistLinks.push(taskLink);
                }
                if (/follow.*button/gim.test(taskName)) {
                  this.undoneTasks.steam.followLinks.push(taskLink);
                }
              }
            }
            resolve(true);
          })
            .catch((error) => {
              throwError(error as Error, 'Giveawaysu.classifyTask->getRedirectLink');
              return false;
            });
        }));
      }
      await Promise.all(pro);
      logStatus.success();
      this.undoneTasks = this.uniqueTasks(this.undoneTasks) as gasSocialTasks;
      this.socialTasks = this.undoneTasks;
      GM_setValue(`gasTasks-${this.giveawayId}`, this.socialTasks); // eslint-disable-line new-cap
      return true;
    } catch (error) {
      throwError(error as Error, 'Giveawaysu.classifyTask');
      return false;
    }
  }
  #checkLogin(): boolean {
    try {
      if ($('a.steam-login').length > 0) {
        window.open('/steam/redirect', '_self');
      }
      return true;
    } catch (error) {
      throwError(error as Error, 'Giveawaysu.checkLogin');
      return false;
    }
  }
  async #checkLeftKey(): Promise<boolean> {
    try {
      if ($('.giveaway-ended').length > 0) {
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
      throwError(error as Error, 'Giveawaysu.checkLeftKey');
      return false;
    }
  }

  #getGiveawayId() {
    const giveawayId = window.location.href.match(/\/view\/([\d]+)/)?.[1];
    if (giveawayId) {
      this.giveawayId = giveawayId;
      return true;
    }
    echoLog({ text: __('getFailed', 'GiveawayId') });
    return false;
  }
}

export { GiveawaySu, defaultTasks };

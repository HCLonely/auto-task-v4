/*
 * @Author       : HCLonely
 * @Date         : 2021-11-08 10:37:13
 * @LastEditTime : 2021-11-17 09:52:17
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/website/Giveawaysu.ts
 * @Description  :
 */

// eslint-disable-next-line
/// <reference path = "GiveawaySu.d.ts" />

import Swal from 'sweetalert2';
import Website from './Website';
import throwError from '../tools/throwError';
import echoLog from '../echoLog';
import getI18n from '../i18n/i18n';
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
  socialTasks: gasSocialTasks = defaultTasks
  undoneTasks: gasSocialTasks = defaultTasks

  static test(): boolean {
    return /^https?:\/\/giveaway\.su\/giveaway\/view\/[\d]+/.test(window.location.href);
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
      throwError(error as Error, 'Giveawaysu.before');
    }
  }
  init(): boolean {
    try {
      const logStatus = echoLog({ type: 'init' });
      if ($('a.steam-login').length > 0) {
        window.open('/steam/redirect', '_self');
        logStatus.warning('请先登录');
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
  async classifyTask(): Promise<boolean> {
    try {
      const logStatus = echoLog({ type: 'custom', text: `<li>${getI18n('getTasksInfo')}<font></font></li>` });
      // todo
      this.undoneTasks = GM_getValue<gasSocialTasks>(`gasTasks-${this.giveawayId}`) || defaultTasks; // eslint-disable-line new-cap

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
            } else if (/(follow|subscribe).*curator/gim.test(taskName)) {
              this.undoneTasks.steam.curatorLinks.push(taskLink);
            } else if (taskIcon.includes('steam') && /follow|subscribe/gim.test(taskName)) {
              this.undoneTasks.steam.curatorLikeLinks.push(taskLink);
            } else if (/subscribe.*steam.*forum/gim.test(taskName)) {
              this.undoneTasks.steam.forumLinks.push(taskLink);
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
      GM_setValue(`gasTasks${this.giveawayId}`, this.socialTasks); // eslint-disable-line new-cap
      return true;
    } catch (error) {
      throwError(error as Error, 'Giveawaysu.classifyTask');
      return false;
    }
  }
  checkLogin(): boolean {
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
  async checkLeftKey(): Promise<boolean> {
    try {
      if ($('.giveaway-ended').length > 0) {
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
    echoLog({ type: 'custom', text: `<li><font class="error">${getI18n('getGiveawayIdFailed')}</font></li>` });
    return false;
  }
}

export { GiveawaySu, defaultTasks };
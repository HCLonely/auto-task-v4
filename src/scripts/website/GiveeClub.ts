/*
 * @Author       : HCLonely
 * @Date         : 2021-11-14 11:46:52
 * @LastEditTime : 2022-07-15 10:34:43
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/website/GiveeClub.ts
 * @Description  : https://givee.club/
 */

// eslint-disable-next-line
/// <reference path = "GiveawaySu.d.ts" />

import Swal from 'sweetalert2';
import throwError from '../tools/throwError';
import echoLog from '../echoLog';
import __ from '../tools/i18n';
import { delay, getRedirectLink } from '../tools/tools';
import { GiveawaySu, defaultTasks } from './GiveawaySu';
import { globalOptions } from '../globalOptions';

class GiveeClub extends GiveawaySu {
  name = 'GiveeClub';
  buttons: Array<string> = [
    'doTask',
    'undoTask',
    'verifyTask'
  ];

  static test(): boolean {
    return /^https?:\/\/givee\.club\/.*?\/event\/[\d]+/.test(window.location.href);
  }
  async after(): Promise<void> {
    try {
      if (!this.#checkLogin()) {
        echoLog({}).warning(__('checkLoginFailed'));
      }
      if (!await this.#checkLeftKey()) {
        echoLog({}).warning(__('checkLeftKeyFailed'));
      }
    } catch (error) {
      throwError(error as Error, 'GiveeClub.after');
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
      throwError(error as Error, 'GiveeClub.init');
      return false;
    }
  }
  async classifyTask(action: 'do' | 'undo'): Promise<boolean> {
    try {
      const logStatus = echoLog({ text: __('getTasksInfo') });
      if (action === 'undo') {
        this.socialTasks = GM_getValue<gasGMTasks>(`gcTasks-${this.giveawayId}`)?.tasks || defaultTasks;
        return true;
      }

      const pro = [];
      const tasks = $('.event-actions tr');
      for (const task of tasks) {
        pro.push(new Promise((resolve) => {
          const taskDes = $(task).find('.event-action-label a');
          const taskIcon = $(task).find('.event-action-icon i')
            .attr('class') || '';
          const taskName = taskDes.text().trim();
          const taskType = $(task).find('button[data-type]')
            ?.attr('data-type');
          if (taskIcon.includes('ban') || /AdBlock/i.test(taskName) || taskIcon.includes('envelope')) {
            return resolve(true);
          }

          getRedirectLink(taskDes.attr('href')).then((taskLink) => {
            if (!taskLink) {
              return resolve(false);
            }
            if (taskType === 'steam.group.join' && /^https?:\/\/steamcommunity\.com\/groups/.test(taskLink)) { // ok
              this.undoneTasks.steam.groupLinks.push(taskLink);
            } else if (/like.*announcement/gi.test(taskName)) { // 未识别
              this.undoneTasks.steam.announcementLinks.push(taskLink);
            } else if (taskType === 'steam.game.wishlist' && /^https?:\/\/store\.steampowered\.com\/app\//.test(taskLink)) { // ok
              this.undoneTasks.steam.wishlistLinks.push(taskLink);
            } else if (taskType === 'steam.game.wishlist' && taskDes.attr('data-steam-wishlist-appid')) { // ok
              this.undoneTasks.steam.wishlistLinks.push(`https://store.steampowered.com/app/${taskDes.attr('data-steam-wishlist-appid')}`);
            } else if (taskType === 'steam.game.follow' && /^https?:\/\/store\.steampowered\.com\/app\//.test(taskLink)) { // ok
              this.undoneTasks.steam.followLinks.push(taskLink);
            } else if (/^https?:\/\/store\.steampowered\.com\/curator\//.test(taskLink)) { // ok
              this.undoneTasks.steam.curatorLinks.push(taskLink);
            } else if (taskIcon.includes('steam') && /follow|subscribe/gim.test(taskName)) { // 未识别
              this.undoneTasks.steam.curatorLikeLinks.push(taskLink);
            } else if (/subscribe.*steam.*forum/gim.test(taskName)) {
              this.undoneTasks.steam.forumLinks.push(taskLink);
            } else if (taskIcon.includes('discord')) { // ok
              this.undoneTasks.discord.serverLinks.push(taskLink);
            } else if (taskIcon.includes('instagram')) {
              this.undoneTasks.instagram.userLinks.push(taskLink);
            } else if (taskIcon.includes('twitch')) {
              this.undoneTasks.twitch.channelLinks.push(taskLink);
            } else if (taskIcon.includes('reddit')) {
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
                if (/follow.*button/gim.test(taskName)) {
                  this.undoneTasks.steam.followLinks.push(taskLink);
                }
              }
            }
            resolve(true);
          })
            .catch((error) => {
              throwError(error as Error, 'GiveeClub.classifyTask->getRedirectLink');
              return false;
            });
        }));
      }
      await Promise.all(pro);
      logStatus.success();
      this.undoneTasks = this.uniqueTasks(this.undoneTasks) as gasSocialTasks;
      this.socialTasks = this.undoneTasks;
      if (window.DEBUG) console.log('%cAuto-Task[Debug]:', 'color:blue', JSON.stringify(this));
      GM_setValue(`gcTasks-${this.giveawayId}`, { tasks: this.socialTasks, time: new Date().getTime() });
      return true;
    } catch (error) {
      throwError(error as Error, 'GiveeClub.classifyTask');
      return false;
    }
  }

  async verifyTask(): Promise<boolean> {
    try {
      const logStatus = echoLog({ text: __('giveeClubVerifyNotice') });
      const taskButtons = $('.event-actions tr button').has('i.glyphicon-refresh')
        .not('[data-type="user.adblock"]');
      for (const button of taskButtons) {
        button.click();
        if ($(button).attr('data-type') !== 'steam.game.wishlist') {
          await delay(1000);
        }
      }
      logStatus.warning(__('giveeClubVerifyFinished'));
      return true;
    } catch (error) {
      throwError(error as Error, 'Givekey.verifyTask');
      return false;
    }
  }

  #checkLogin(): boolean {
    try {
      if (!globalOptions.other.checkLogin) return true;
      if ($('a[href*="/account/auth"]').length > 0) {
        window.open($('a[href*="/account/auth"]').attr('href'), '_self');
      }
      return true;
    } catch (error) {
      throwError(error as Error, 'GiveeClub.checkLogin');
      return false;
    }
  }
  #getGiveawayId() {
    const giveawayId = window.location.href.match(/\/event\/([\d]+)/)?.[1];
    if (giveawayId) {
      this.giveawayId = giveawayId;
      return true;
    }
    echoLog({ text: __('getFailed', 'GiveawayId') });
    return false;
  }
  async #checkLeftKey(): Promise<boolean> {
    try {
      if (!globalOptions.other.checkLeftKey) return true;
      if ($('.event-ended').length > 0 && $('.event-winner').length === 0) {
        await Swal.fire({
          icon: 'warning',
          title: __('notice'),
          text: __('giveawayEnded'),
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
}

export default GiveeClub;

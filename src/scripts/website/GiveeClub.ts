/*
 * @Author       : HCLonely
 * @Date         : 2021-11-14 11:46:52
 * @LastEditTime : 2021-11-14 13:53:15
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/website/GiveeClub.ts
 * @Description  :
 */
/* global giveeClub */
// eslint-disable-next-line
/// <reference path = "GiveawaySu.d.ts" />

import throwError from '../tools/throwError';
import echoLog from '../echoLog';
import getI18n from '../i18n/i18n';
import { getRedirectLink } from '../tools/tools';
import { GiveawaySu, defaultTasks } from './GiveawaySu';

declare const giveeClub: {
  locale: string
  localeLink: (url: string) => string
};
interface verifyData {
  id: string
  type: string
  'target_url': null | string
  'check_url': null | string
  method: string
  data: Array<string>
  csrf: string
  timestamp: number
  wait: number
}

class GiveeClub extends GiveawaySu {
  test(): boolean {
    return /^https?:\/\/givee\.club\/.*?\/event\/[\d]+/.test(window.location.href);
  }
  async before(): Promise<void> {
    try {
      if (!this.checkLogin()) {
        echoLog({ type: 'checkLoginFailed' });
      }
    } catch (error) {
      throwError(error as Error, 'GiveeClub.before');
    }
  }
  init(): boolean {
    try {
      const logStatus = echoLog({ type: 'init' });
      if (!this.checkLogin()) {
        logStatus.warning('请先登录');
        return false;
      }
      if (!this.getGiveawayId()) return false;
      this.initialized = true;
      logStatus.success();
      return true;
    } catch (error) {
      throwError(error as Error, 'GiveeClub.init');
      return false;
    }
  }
  async classifyTask(): Promise<boolean> {
    try {
      const logStatus = echoLog({ type: 'custom', text: `<li>${getI18n('getTasksInfo')}<font></font></li>` });
      // todo
      this.undoneTasks = GM_getValue<gasSocialTasks>(`gcTasks-${this.giveawayId}`) || defaultTasks; // eslint-disable-line new-cap

      const pro = [];
      const tasks = $('.event-actions tr');
      for (const task of tasks) {
        pro.push(new Promise((resolve) => {
          const taskDes = $(task).find('.event-action-label a');
          const taskIcon = $(task).find('.event-action-icon i')
            .attr('class') || '';
          const taskName = taskDes.text().trim();
          if (taskIcon.includes('ban') || /AdBlock/i.test(taskName) || taskIcon.includes('envelope')) {
            return resolve(true);
          }

          getRedirectLink(taskDes.attr('href')).then((taskLink) => {
            if (!taskLink) {
              return resolve(false);
            }
            if (/^https?:\/\/steamcommunity\.com\/groups/.test(taskLink)) { // ok
              this.undoneTasks.steam.groupLinks.push(taskLink);
            } else if (/like.*announcement/gi.test(taskName)) { // 未识别
              this.undoneTasks.steam.announcementLinks.push(taskLink);
            } else if (taskIcon.includes('plus') && /^https?:\/\/store\.steampowered\.com\/app\//.test(taskLink)) { // ok
              this.undoneTasks.steam.wishlistLinks.push(taskLink);
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
      GM_setValue(`gcTasks${this.giveawayId}`, this.socialTasks); // eslint-disable-line new-cap
      return true;
    } catch (error) {
      throwError(error as Error, 'GiveeClub.classifyTask');
      return false;
    }
  }
  /*
  async verifyTask() {
    try {
      if (!this.initialized && !this.init()) {
        return false;
      }
      const tasks = $('.event-actions tr:not(".hidden")');
      for (const task of tasks) {
        const data = $(task).attr('data-action');
        if (!data) continue;
        await this.#verify(JSON.parse(atob(data)), $(task).find('button'));
      }
      echoLog({ type: 'custom', text: '<li>All tasks complete!<font></font></li>' });
      return true;
    } catch (error) {
      throwError(error as Error, 'GiveeClub.verifyTask');
      return false;
    }
  }
  */

  checkLogin(): boolean {
    try {
      if ($('a[href*="/account/auth"]').length > 0) {
        window.open($('a[href*="/account/auth"]').attr('href'), '_self');
      }
      return true;
    } catch (error) {
      throwError(error as Error, 'GiveeClub.checkLogin');
      return false;
    }
  }
  /*
  async #verify(data: verifyData, button: JQuery) {
    try {
      const logStatus = echoLog({ type: 'custom', text: `<li>${getI18n('verifyingTask')}${data.id}...<font></font></li>` });

      return await new Promise((resolve) => {
        $.ajax({
          type: 'POST',
          url: giveeClub.localeLink(`/action/check/${data.id}`),
          data,
          dataType: 'json',
          timeout: 30000,
          error: (xhr) => {
            logStatus.error(`Error:${xhr.statusText}(${xhr.status})`);
            resolve(false);
          },
          success: (response) => {
            if (response) {
              if (response.status !== 'pending') {
                button.removeClass('event-action-checking');
                if (response.success && (response.success === true)) {
                  button.attr('data-disabled', 'true').addClass('btn-success active')
                    .removeClass('btn-default')
                    .find('i')
                    .attr('class', 'glyphicon glyphicon-ok');
                  logStatus.success();
                  resolve(true);
                } else if (response.error && (typeof response.error === 'string')) {
                  logStatus.error(`Error: ${response.error}`);
                  resolve(false);
                }
              }
              logStatus.error('Warning: 等待服务器验证...');
              resolve(false);
            } else {
              logStatus.error('Error');
              resolve(false);
            }
          }
        });
      });
    } catch (error) {
      throwError(error as Error, 'GiveeClub.verify');
      return false;
    }
  }
  */
  getGiveawayId() {
    const giveawayId = window.location.href.match(/\/event\/([\d]+)/)?.[1];
    if (giveawayId) {
      this.giveawayId = giveawayId;
      return true;
    }
    echoLog({ type: 'custom', text: `<li><font class="error">${getI18n('getGiveawayIdFailed')}</font></li>` });
    return false;
  }
}

export default GiveeClub;

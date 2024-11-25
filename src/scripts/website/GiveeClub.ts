/*
 * @Author       : HCLonely
 * @Date         : 2021-11-14 11:46:52
 * @LastEditTime : 2024-07-02 10:38:37
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-v4/src/scripts/website/GiveeClub.ts
 * @Description  : https://givee.club/
 */

// eslint-disable-next-line
/// <reference path = "Giveawaysu.d.ts" />

import Swal from 'sweetalert2';
import throwError from '../tools/throwError';
import echoLog from '../echoLog';
import __ from '../tools/i18n';
import { delay, getRedirectLink } from '../tools/tools';
import { GiveawaySu, defaultTasks } from './Giveawaysu';
import { globalOptions } from '../globalOptions';

/**
 * GiveeClub 类用于处理 GiveeClub 抽奖活动的相关操作。
 *
 * @class GiveeClub
 * @extends GiveawaySu
 *
 * @property {string} name - GiveeClub 的名称。
 * @property {Array<string>} buttons - 包含可执行操作的按钮名称数组。
 *
 * @method static test - 检查当前 URL 是否为有效的 GiveeClub 事件页面。
 * @returns {boolean} 如果当前 URL 匹配 GiveeClub 事件页面的格式，则返回 true；否则返回 false。
 *
 * @method async after - 抽奖后续操作的异步方法。
 * @returns {Promise<void>} 无返回值。
 * @throws {Error} 如果在处理过程中发生错误，将抛出错误。
 *
 * @method init - 初始化方法。
 * @returns {boolean} 如果初始化成功，则返回 true；否则返回 false。
 * @throws {Error} 如果在初始化过程中发生错误，将抛出错误。
 *
 * @method async classifyTask - 分类任务的异步方法。
 * @param {'do' | 'undo'} action - 要执行的操作类型，'do' 表示执行任务，'undo' 表示撤销任务。
 * @returns {Promise<boolean>} 如果任务分类成功，则返回 true；否则返回 false。
 * @throws {Error} 如果在分类过程中发生错误，将抛出错误。
 *
 * @method async verifyTask - 验证任务的异步方法。
 * @returns {Promise<boolean>} 如果任务验证成功，则返回 true；否则返回 false。
 * @throws {Error} 如果在验证过程中发生错误，将抛出错误。
 *
 * @method #checkLogin - 检查用户是否已登录的私有方法。
 * @returns {boolean} 如果用户已登录，则返回 true；否则返回 false。
 * @throws {Error} 如果在检查过程中发生错误，将抛出错误。
 *
 * @method #getGiveawayId - 获取抽奖ID的方法。
 * @returns {boolean} 如果成功获取抽奖ID，则返回 true；否则返回 false。
 * @throws {Error} 如果在检查过程中发生错误，将抛出错误。
 *
 * @method async #checkLeftKey - 检查剩余密钥的私有异步方法。
 * @returns {Promise<boolean>} 如果检查成功，则返回 true；如果发生错误，则返回 false。
 * @throws {Error} 如果在检查过程中发生错误，将抛出错误。
 */
class GiveeClub extends GiveawaySu {
  name = 'GiveeClub';
  buttons: Array<string> = [
    'doTask',
    'undoTask',
    'verifyTask'
  ];

  /**
   * 检查当前URL是否为有效的GiveeClub事件页面的静态方法
   *
   * @returns {boolean} 如果当前URL匹配GiveeClub事件页面的格式，则返回 true；否则返回 false。
   *
   * @description
   * 该方法使用正则表达式检查当前窗口的URL是否符合GiveeClub事件页面的格式。
   * 格式为：以 "http://" 或 "https://" 开头，后跟 "givee.club/" 和 "/event/" 以及一个数字ID。
   */
  static test(): boolean {
    return /^https?:\/\/givee\.club\/.*?\/event\/[\d]+/.test(window.location.href);
  }

  /**
   * 抽奖后续操作的异步方法
   *
   * @returns {Promise<void>} 无返回值。
   *
   * @throws {Error} 如果在处理过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法首先检查用户是否已登录，如果未登录，则记录警告信息。
   * 然后检查剩余密钥的状态，如果检查失败，则记录相应的警告信息。
   */
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

  /**
   * 初始化方法
   *
   * @returns {boolean} 如果初始化成功，则返回 true；否则返回 false。
   *
   * @throws {Error} 如果在初始化过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法尝试初始化抽奖功能。
   * 首先记录初始化状态。如果用户未登录，则记录警告信息并返回 false。
   * 然后调用私有方法获取抽奖ID，如果获取失败，则返回 false。
   * 如果成功获取抽奖ID，则将 `initialized` 属性设置为 true，并记录成功信息。
   */
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

  /**
   * 分类任务的异步方法
   *
   * @param {'do' | 'undo'} action - 要执行的操作类型，'do' 表示执行任务，'undo' 表示撤销任务。
   * @returns {Promise<boolean>} 如果任务分类成功，则返回 true；否则返回 false。
   *
   * @throws {Error} 如果在分类过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法根据传入的操作类型分类任务。
   * 如果操作为 'undo'，则从存储中获取任务信息并返回 true。
   * 否则，遍历页面中的任务行，提取任务链接并根据任务类型分类到相应的未完成任务列表中。
   * 处理完成后，记录成功信息并将分类后的任务存储到本地。
   */
  async classifyTask(action: 'do' | 'undo'): Promise<boolean> {
    try {
      const logStatus = echoLog({ text: __('getTasksInfo') });
      if (action === 'undo') {
        this.socialTasks = GM_getValue<gasGMTasks>(`gcTasks-${this.giveawayId}`)?.tasks || defaultTasks;
        return true;
      }

      this.undoneTasks = defaultTasks;

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
          const taskFinished = $(task).find('.event-action-buttons .btn-success')?.length;
          if (taskIcon.includes('ban') || /AdBlock/i.test(taskName) || taskIcon.includes('envelope') || taskFinished) {
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
            } else if (taskIcon.includes('twitter')) {
              if (/https?:\/\/twitter\.com\/[^/]+\/?$/gim.test(taskLink)) {
                this.undoneTasks.twitter.userLinks.push(taskLink);
              } else if (/https?:\/\/twitter\.com\/[^/]+?\/status\/[\d]+/gim.test(taskLink)) {
                this.undoneTasks.twitter.retweetLinks.push(taskLink);
              }
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

  /**
   * 验证任务的异步方法
   *
   * @returns {Promise<boolean>} 如果任务验证成功，则返回 true；否则返回 false。
   *
   * @throws {Error} 如果在验证过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法遍历页面中的所有任务按钮，点击每个按钮以验证任务。
   * 在点击按钮后，如果按钮的类型不是 'steam.game.wishlist'，则等待 1 秒。
   * 验证完成后，记录成功信息并返回 true。
   * 如果在过程中发生错误，则记录错误信息并返回 false。
   */
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

  /**
   * 检查用户是否已登录的私有方法
   *
   * @returns {boolean} 如果用户已登录，则返回 true；否则返回 false。
   *
   * @throws {Error} 如果在检查过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法检查全局选项中是否启用了登录检查功能。
   * 如果启用且页面中存在登录链接，则重定向用户到登录页面。
   * 如果没有找到登录链接，则返回 true，表示用户已登录或不需要登录。
   */
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

  /**
   * 获取抽奖ID的方法
   *
   * @returns {boolean} 如果成功获取抽奖ID，则返回 true；否则返回 false。
   *
   * @throws {Error} 如果在检查过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法从当前窗口的URL中提取抽奖ID。
   * 使用正则表达式匹配URL中的抽奖ID部分。
   * 如果成功匹配到抽奖ID，则将其赋值给实例属性 `giveawayId` 并返回 true。
   * 如果未能匹配到抽奖ID，则记录错误信息并返回 false。
   */
  #getGiveawayId(): boolean {
    const giveawayId = window.location.href.match(/\/event\/([\d]+)/)?.[1];
    if (giveawayId) {
      this.giveawayId = giveawayId;
      return true;
    }
    echoLog({ text: __('getFailed', 'GiveawayId') });
    return false;
  }

  /**
   * 检查剩余密钥的私有异步方法
   *
   * @returns {Promise<boolean>} 如果检查成功，则返回 true；如果发生错误，则返回 false。
   *
   * @throws {Error} 如果在检查过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法首先检查全局选项中是否启用了检查剩余密钥的功能。
   * 如果启用且当前活动已结束且没有赢家，则弹出警告框提示用户抽奖已结束。
   * 用户可以选择确认或取消，确认后将关闭窗口。
   * 如果没有错误发生，则返回 true。
   */
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

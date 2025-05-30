/*
 * @Author       : HCLonely
 * @Date         : 2021-11-08 10:37:13
 * @LastEditTime : 2025-05-30 10:44:09
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-v4/src/scripts/website/Giveawaysu.ts
 * @Description  : https://giveaway.su/
 */

// eslint-disable-next-line
/// <reference path = "Giveawaysu.d.ts" />

import Swal from 'sweetalert2';
import Website from './Website';
import throwError from '../tools/throwError';
import echoLog from '../echoLog';
import __ from '../tools/i18n';
import { getRedirectLink } from '../tools/tools';
import { globalOptions } from '../globalOptions';

const defaultTasks: gasSocialTasks = {
  steam: {
    groupLinks: [],
    wishlistLinks: [],
    curatorLinks: [],
    curatorLikeLinks: [],
    followLinks: [],
    forumLinks: [],
    announcementLinks: [],
    workshopVoteLinks: [],
    playtestLinks: [],
    playTimeLinks: []
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
  },
  twitter: {
    userLinks: [],
    retweetLinks: []
  }
};

/**
 * GiveawaySu 类用于处理 GiveawaySu 网站的抽奖任务。
 *
 * @class GiveawaySu
 * @extends Website
 *
 * @property {string} name - 网站名称。
 * @property {gasSocialTasks} socialTasks - 社交任务列表。
 * @property {gasSocialTasks} undoneTasks - 未完成的社交任务。
 * @property {Array<string>} buttons - 可用的操作按钮。
 *
 * @static
 * @method test - 检查当前URL是否为有效的抽奖页面。
 * @returns {boolean} 如果当前URL匹配抽奖页面的格式，则返回 true；否则返回 false。
 *
 * @method after - 处理抽奖后续操作的异步方法。
 * @returns {Promise<void>} 无返回值。
 * @throws {Error} 如果在处理过程中发生错误，将抛出错误。
 *
 * @method init - 初始化方法。
 * @returns {boolean} 如果初始化成功，则返回 true；否则返回 false。
 * @throws {Error} 如果在初始化过程中发生错误，将抛出错误。
 *
 * @method classifyTask - 分类任务的异步方法。
 * @param {'do' | 'undo'} action - 要执行的操作类型，'do' 表示执行任务，'undo' 表示撤销任务。
 * @returns {Promise<boolean>} 如果任务分类成功，则返回 true；否则返回 false。
 * @throws {Error} 如果在分类过程中发生错误，将抛出错误。
 *
 * @private
 * @method #checkLogin - 检查用户是否已登录的私有方法。
 * @returns {boolean} 如果用户已登录，则返回 true；否则返回 false。
 * @throws {Error} 如果在检查过程中发生错误，将抛出错误。
 *
 * @private
 * @method #checkLeftKey - 检查剩余密钥的私有异步方法。
 * @returns {Promise<boolean>} 如果检查成功，则返回 true；如果发生错误，则返回 false。
 * @throws {Error} 如果在检查过程中发生错误，将抛出错误。
 *
 * @private
 * @method #getGiveawayId - 获取抽奖ID的方法。
 * @returns {boolean} 如果成功获取抽奖ID，则返回 true；否则返回 false。
 * @throws {Error} 如果在检查过程中发生错误，将抛出错误。
 */
class GiveawaySu extends Website {
  name = 'GiveawaySu';
  socialTasks: gasSocialTasks = defaultTasks;
  undoneTasks: gasSocialTasks = defaultTasks;
  buttons: Array<string> = [
    'doTask',
    'undoTask'
  ];

  /**
   * 检查当前URL是否为有效的抽奖页面的静态方法
   *
   * @returns {boolean} 如果当前URL匹配抽奖页面的格式，则返回 true；否则返回 false。
   *
   * @description
   * 该方法使用正则表达式检查当前窗口的URL是否符合抽奖页面的格式。
   * 格式为：以 "http://" 或 "https://" 开头，后跟 "giveaway.su/giveaway/view/" 和一个数字ID。
   */
  static test(): boolean {
    return /^https?:\/\/giveaway\.su\/giveaway\/view\/[\d]+/.test(window.location.href);
  }

  /**
   * 页面加载后的异步方法
   *
   * @returns {Promise<void>} 无返回值。
   *
   * @throws {Error} 如果在处理过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法首先检查用户是否已登录，如果未登录，则记录警告信息。
   * 然后检查剩余密钥的状态，如果检查失败，则记录相应的警告信息。
   * 最后，记录一个通用的通知信息。
   */
  async after(): Promise<void> {
    try {
      if (!this.#checkLogin()) {
        echoLog({}).warning(__('checkLoginFailed'));
      }
      if (!await this.#checkLeftKey()) {
        echoLog({}).warning(__('checkLeftKeyFailed'));
      }
      echoLog({}).warning(__('gsNotice'));
    } catch (error) {
      throwError(error as Error, 'Giveawaysu.after');
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
   * 首先记录初始化状态。如果页面中存在 Steam 登录链接，则重定向到 Steam 登录页面，并记录警告信息。
   * 然后调用私有方法获取抽奖ID，如果获取失败，则返回 false。
   * 如果成功获取抽奖ID，则将 `initialized` 属性设置为 true，并记录成功信息。
   */
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
        this.socialTasks = GM_getValue<gasGMTasks>(`gasTasks-${this.giveawayId}`)?.tasks || defaultTasks;
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
            } else if (taskIcon.includes('plus') && /request.*playtest/gim.test(taskName)) {
              this.undoneTasks.steam.playtestLinks.push(taskLink);
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
      if (window.DEBUG) console.log('%cAuto-Task[Debug]:', 'color:blue', JSON.stringify(this));
      GM_setValue(`gasTasks-${this.giveawayId}`, { tasks: this.socialTasks, time: new Date().getTime() });
      return true;
    } catch (error) {
      throwError(error as Error, 'Giveawaysu.classifyTask');
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
   * 如果启用且页面中存在 Steam 登录链接，则重定向用户到 Steam 登录页面。
   * 如果没有找到登录链接，则返回 true，表示用户已登录或不需要登录。
   */
  #checkLogin(): boolean {
    try {
      if (!globalOptions.other.checkLogin) return true;

      if ($('a.steam-login').length > 0) {
        window.open('/steam/redirect', '_self');
      }
      return true;
    } catch (error) {
      throwError(error as Error, 'Giveawaysu.checkLogin');
      return false;
    }
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
   * 如果启用且当前抽奖已结束且没有剩余密钥，则弹出警告框提示用户没有剩余密钥。
   * 用户可以选择确认或取消，确认后将关闭窗口。
   * 如果没有错误发生，则返回 true。
   */
  async #checkLeftKey(): Promise<boolean> {
    try {
      if (!globalOptions.other.checkLeftKey) return true;
      if ($('.giveaway-ended').length > 0 && $('.giveaway-key').length === 0) {
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
    try {
      const giveawayId = window.location.href.match(/\/view\/([\d]+)/)?.[1];
      if (giveawayId) {
        this.giveawayId = giveawayId;
        return true;
      }
      echoLog({ text: __('getFailed', 'GiveawayId') });
      return false;
    } catch (error) {
      throwError(error as Error, 'Giveawaysu.getGiveawayId');
      return false;
    }
  }
}

export { GiveawaySu, defaultTasks };

/*
 * @Author       : HCLonely
 * @Date         : 2021-11-19 14:42:43
 * @LastEditTime : 2024-09-06 16:40:01
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-v4/src/scripts/website/Gleam.ts
 * @Description  : https://gleam.io
 */

/* eslint-disable @typescript-eslint/no-empty-function */
// eslint-disable-next-line
/// <reference path = "Gleam.d.ts" />

import Swal from 'sweetalert2';
import Website from './Website';
import throwError from '../tools/throwError';
import echoLog from '../echoLog';
import __ from '../tools/i18n';
import httpRequest from '../tools/httpRequest';
import { delay } from '../tools/tools';
import { globalOptions } from '../globalOptions';

const defaultTasksTemplate: gleamSocialTasks = {
  steam: {
    groupLinks: [],
    wishlistLinks: [],
    followLinks: [],
    curatorLinks: [],
    curatorLikeLinks: []
  },
  twitter: {
    userLinks: [],
    retweetLinks: []
  },
  twitch: {
    channelLinks: []
  },
  discord: {
    serverLinks: []
  },
  youtube: {
    channelLinks: []
  },
  extra: {
    gleam: []
  }
};
const defaultTasks = JSON.stringify(defaultTasksTemplate);

/**
 * 表示 Gleam 网站的任务处理类。
 *
 * @class Gleam
 * @extends Website
 *
 * @property {string} name - 网站名称，默认为 'Gleam'。
 * @property {gleamSocialTasks} undoneTasks - 社交任务列表。
 * @property {gleamSocialTasks} socialTasks - 存储已完成的社交任务。
 * @property {Array<string>} buttons - 可用的操作按钮数组，包括 'doTask'、'undoTask' 和 'verifyTask'。
 *
 * @static
 * @method test - 检查当前域名是否为 Gleam 网站。
 * @returns {boolean} 如果当前域名为 'gleam.io'，则返回 true；否则返回 false。
 *
 * @method before - 在执行操作之前重写全局的确认、警告和提示对话框。
 * @returns {void} 无返回值。
 * @throws {Error} 如果在检查过程中发生错误，将抛出错误。
 *
 * @method after - 页面加载后的异步方法，执行后续操作。
 * @returns {Promise<void>} 无返回值。
 * @throws {Error} 如果在处理过程中发生错误，将抛出错误。
 *
 * @method init - 初始化方法，尝试初始化抽奖功能。
 * @returns {boolean} 如果初始化成功，则返回 true；否则返回 false。
 * @throws {Error} 如果在初始化过程中发生错误，将抛出错误。
 *
 * @method classifyTask - 分类任务的异步方法。
 * @param {'do' | 'undo'} action - 要执行的操作类型。
 * @returns {Promise<boolean>} 如果任务分类成功，则返回 true；否则返回 false。
 * @throws {Error} 如果在分类过程中发生错误，将抛出错误。
 *
 * @method extraDoTask - 执行额外任务的异步方法。
 * @param {Object} params - 方法参数对象。
 * @param {Array<string>} params.gleam - 包含要执行的Gleam任务链接的数组。
 * @returns {Promise<boolean>} 如果所有任务成功执行，则返回 true；否则返回 false。
 * @throws {Error} 如果在执行过程中发生错误，将抛出错误。
 *
 * @method verifyTask - 验证任务的异步方法。
 * @returns {Promise<boolean>} 如果所有任务成功验证，则返回 true；否则返回 false。
 * @throws {Error} 如果在验证过程中发生错误，将抛出错误。
 *
 * @private
 * @method #checkSync - 检查同步状态的私有异步方法。
 * @returns {Promise<boolean>} 如果同步完成，则返回 true；如果发生错误，则返回 false。
 * @throws {Error} 如果在检查过程中发生错误，将抛出错误。
 *
 * @private
 * @method #doGleamTask - 执行Gleam任务的私有异步方法。
 * @param {string} link - 要执行的Gleam任务链接。
 * @returns {Promise<boolean>} 如果任务成功执行，则返回 true；否则返回 false。
 * @throws {Error} 如果在执行过程中发生错误，将抛出错误。
 *
 * @private
 * @method #getGiveawayId - 获取抽奖ID的方法。
 * @returns {boolean} 如果成功获取抽奖ID，则返回 true；否则返回 false。
 * @throws {Error} 如果在检查过程中发生错误，将抛出错误。
 *
 * @private
 * @method #checkLeftKey - 检查剩余密钥的私有异步方法。
 * @returns {Promise<boolean>} 如果检查成功，则返回 true；如果发生错误，则返回 false。
 * @throws {Error} 如果在检查过程中发生错误，将抛出错误。
 */
class Gleam extends Website {
  name = 'Gleam';
  undoneTasks: gleamSocialTasks = JSON.parse(defaultTasks);
  socialTasks: gleamSocialTasks = JSON.parse(defaultTasks);
  buttons: Array<string> = [
    'doTask',
    'undoTask',
    'verifyTask'
  ];

  /**
   * 检查当前域名是否为 Gleam 网站的静态方法
   *
   * @returns {boolean} 如果当前域名为 'gleam.io'，则返回 true；否则返回 false。
   *
   * @description
   * 该方法通过比较当前窗口的域名来判断是否为 Gleam 网站。
   * 如果域名匹配，则返回 true；否则返回 false。
   */
  static test(): boolean {
    return window.location.host === 'gleam.io';
  }

  /**
   * 在执行操作之前重写全局的确认、警告和提示对话框
   *
   * @returns {void} 无返回值。
   *
   * @throws {Error} 如果在检查过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法在执行操作之前，将全局的 `confirm`、`alert` 和 `prompt` 方法重写为空函数。
   * 这样可以防止在执行过程中弹出任何对话框，确保用户体验不受干扰。
   */
  before(): void {
    try {
      unsafeWindow.confirm = () => { };
      unsafeWindow.alert = () => { };
      unsafeWindow.prompt = () => { };
    } catch (error) {
      throwError(error as Error, 'Gleam.before');
    }
  }

  /**
   * 页面加载后的异步方法
   *
   * @returns {Promise<void>} 无返回值。
   *
   * @throws {Error} 如果在处理过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法在特定条件下执行后续操作。
   * 首先检查当前URL中是否包含特定的查询参数。
   * 如果包含，则设置一个定时器，检查任务是否完成。
   * 遍历页面中的每个任务，查找可点击的元素并执行点击操作。
   * 在每次点击后，等待 1 秒钟以确保操作完成。
   * 如果未找到特定查询参数，则检查剩余密钥的状态。
   * 如果检查失败，则记录相应的警告信息。
   */
  async after(): Promise<void> {
    try {
      if (window.location.search.includes('8b07d23f4bfa65f9')) {
        const checkComplete = setInterval(() => {
          if ($('.entry-content .entry-method i.fa-check').length > 0) {
            clearInterval(checkComplete);
            window.close();
          }
        });
        for (const task of $('.entry-content .entry-method')) {
          const taskInfo = $(task).find('.user-links');
          const expandInfo = $(task).find('.expandable');
          const aElements = expandInfo.find('a.btn,a:contains(Continue),button:contains(Continue)');
          if (aElements.length > 0) {
            for (const element of aElements) {
              const $element = $(element);
              const href = $element.attr('href');
              $element.removeAttr('href')[0].click();
              $element.attr('href', href as string);
              await delay(1000);
            }
          }
          taskInfo[0].click();
          await delay(1000);
        }
        echoLog({}).warning(__('gleamTaskNotice'));
      } else if (!await this.#checkLeftKey()) {
        echoLog({}).warning(__('checkLeftKeyFailed'));
      }
    } catch (error) {
      throwError(error as Error, 'Gleam.after');
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
   * 首先记录初始化状态。如果获取抽奖ID失败，则返回 false。
   * 如果成功获取抽奖ID，则将 `initialized` 属性设置为 true，并记录成功信息。
   */
  init(): boolean {
    try {
      const logStatus = echoLog({ text: __('initing') });
      if (!this.#getGiveawayId()) return false;
      this.initialized = true;
      logStatus.success();
      return true;
    } catch (error) {
      throwError(error as Error, 'Gleam.init');
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
   * 如果操作为 'undo'，则从存储中获取任务信息。
   * 遍历页面中的任务，提取任务链接并根据任务类型分类到相应的社交任务列表中。
   * 处理完成后，记录成功信息并将分类后的任务存储到本地。
   */
  async classifyTask(action: 'do' | 'undo'): Promise<boolean> {
    try {
      const logStatus = echoLog({ text: __('getTasksInfo') });
      if (action === 'undo') {
        this.socialTasks = GM_getValue<gleamGMTasks>(`gleamTasks-${this.giveawayId}`)?.tasks || JSON.parse(defaultTasks);
      }

      const tasks = $('.entry-content .entry-method');
      for (const task of tasks) {
        const $task = $(task);

        // 任务完成则跳过
        if (action === 'do' && $task.find('i.fa-question').length === 0) continue;

        const socialIcon = $task.find('.icon-wrapper i');
        const taskInfo = $task.find('.user-links');
        const taskText = taskInfo.text().trim();
        const expandInfo = $task.find('.expandable');
        const aElements = expandInfo.find('a.btn');
        if (aElements.length > 0) {
          for (const element of aElements) {
            const $element = $(element);
            const href = $element.attr('href');
            $element.removeAttr('href')[0].click();
            $element.attr('href', href as string);
          }
        }
        if (socialIcon.hasClass('fa-twitter') || socialIcon.hasClass('fa-x-twitter')) {
          const link = $task.find('a[href^="https://twitter.com/"],a[href^="https://x.com/"]').attr('href');
          if (!link) continue;
          if (/follow/gi.test(taskText)) {
            if (action === 'undo') this.socialTasks.twitter.userLinks.push(link);
            if (action === 'do') this.undoneTasks.twitter.userLinks.push(link);
          } else if (/retweet/gim.test(taskText)) {
            if (action === 'undo') this.socialTasks.twitter.retweetLinks.push(link);
            if (action === 'do') this.undoneTasks.twitter.retweetLinks.push(link);
          }
        } else if (socialIcon.hasClass('fa-twitch')) {
          if (/follow/gim.test(taskText)) {
            const link = $task.find('a[href^="https://twitch.tv/"]').attr('href');
            if (!link) continue;

            if (action === 'undo') this.socialTasks.twitch.channelLinks.push(link);
            if (action === 'do') this.undoneTasks.twitch.channelLinks.push(link);
          }
        } else if (socialIcon.hasClass('fa-discord')) {
          if (/join/gim.test(taskText)) {
            let link = $task.find('a[href^="https://discord.com/invite/"]').attr('href');
            if (!link) {
              const ggLink = $task.find('a[href^="https://discord.gg/"]').attr('href')
                ?.match(/discord\.gg\/([^/]+)/)?.[1];
              if (!ggLink) continue;
              link = `https://discord.com/invite/${ggLink}`;
            }

            if (action === 'undo') this.socialTasks.discord.serverLinks.push(link);
            if (action === 'do') this.undoneTasks.discord.serverLinks.push(link);
          }
        } else if (socialIcon.hasClass('fa-external-link-square-alt')) {
          // timer
          continue;
        } else if (socialIcon.hasClass('fa-youtube')) {
          if (/subscribe/gim.test(taskText)) {
            const link = $task.find('a[href^="https://www.youtube.com/channel/"]').attr('href');
            if (!link) continue;

            if (action === 'undo') this.socialTasks.youtube.channelLinks.push(link);
            if (action === 'do') this.undoneTasks.youtube.channelLinks.push(link);
          }
        } else if (socialIcon.attr('class')?.includes('steam')) {
          if (/join.*group/gi.test(taskText)) {
            const link = $task.find('a[href^="https://steamcommunity.com/groups/"]').attr('href');
            if (!link) continue;

            if (action === 'undo') this.socialTasks.steam.groupLinks.push(link);
            if (action === 'do') this.undoneTasks.steam.groupLinks.push(link);
          } else if (/follow.*curator/gi.test(taskText)) {
            const link = $task.find('a[href^="https://store.steampowered.com/curator/"]').attr('href');
            if (!link) continue;

            if (action === 'undo') this.socialTasks.steam.curatorLinks.push(link);
            if (action === 'do') this.undoneTasks.steam.curatorLinks.push(link);
          }
        } else if (socialIcon.hasClass('fa-bullhorn') && /Complete/gi.test(taskText)) {
          if (action !== 'do') continue;

          /*
          const link = aElements.attr('href');
          if (!link) continue;

          const gleamLink = await this.#getGleamLink(link);
          if (!gleamLink) continue;
          */
          const gleamLink = await this.#getGleamLink(taskText);
          if (!gleamLink) continue;

          this.undoneTasks.extra.gleam.push(gleamLink);
        } else if (
          socialIcon.hasClass('fa-question') ||
          socialIcon.hasClass('fa-reddit') ||
          socialIcon.hasClass('fa-instagram') ||
          socialIcon.hasClass('fa-facebook-f') ||
          socialIcon.hasClass('fa-telegram-plane') ||
          socialIcon.hasClass('fa-telegram') ||
          socialIcon.hasClass('fa-vk') ||
          socialIcon.hasClass('fa-envelope') ||
          socialIcon.hasClass('fa-gift') ||
          socialIcon.hasClass('fa-square-up-right') ||
          socialIcon.hasClass('fa-gamepad-modern') ||
          socialIcon.hasClass('fa-dollar-sign') ||
          socialIcon.hasClass('fa-tiktok') ||
          socialIcon.hasClass('fa-gamepad-alt') ||
          (socialIcon.hasClass('fa-shield') && taskText.includes('one of our giveaways')) ||
          (socialIcon.hasClass('fa-shield') && taskText.includes('Check out')) ||
          (socialIcon.hasClass('fa-shield') && taskText.includes('vloot.io'))
        ) {
          // skip
        } else {
          echoLog({}).warning(`${__('unKnownTaskType')}: ${taskText}`);
        }
      }

      logStatus.success();
      this.undoneTasks = this.uniqueTasks(this.undoneTasks) as gleamSocialTasks;
      this.socialTasks = this.uniqueTasks(this.socialTasks) as gleamSocialTasks;
      if (window.DEBUG) console.log('%cAuto-Task[Debug]:', 'color:blue', JSON.stringify(this));
      GM_setValue(`gleamTasks-${this.giveawayId}`, { tasks: this.socialTasks, time: new Date().getTime() });
      return true;
    } catch (error) {
      throwError(error as Error, 'Gleam.classifyTask');
      return false;
    }
  }

  /**
   * 执行额外任务的异步方法
   *
   * @param {Object} params - 方法参数对象。
   * @param {Array<string>} params.gleam - 包含要执行的Gleam任务链接的数组。
   * @returns {Promise<boolean>} 如果所有任务成功执行，则返回 true；否则返回 false。
   *
   * @throws {Error} 如果在执行过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法遍历传入的Gleam任务链接数组，并为每个链接调用私有方法 `#doGleamTask`。
   * 所有任务的执行结果将通过 `Promise.all` 进行处理。
   * 如果所有任务成功完成，则返回 true；如果发生错误，则记录错误信息并返回 false。
   */
  async extraDoTask({ gleam }: { gleam: Array<string> }): Promise<boolean> {
    try {
      const pro = [];
      for (const link of gleam) {
        pro.push(this.#doGleamTask(link));
      }
      return Promise.all(pro).then(() => true);
    } catch (error) {
      throwError(error as Error, 'Gleam.extraDoTask');
      return false;
    }
  }

  /**
   * 验证任务的异步方法
   *
   * @returns {Promise<boolean>} 如果所有任务成功验证，则返回 true；否则返回 false。
   *
   * @throws {Error} 如果在验证过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法遍历页面中的所有任务，依次验证每个任务。
   * 首先记录正在验证的任务状态，并检查是否存在人机验证。
   * 如果存在人机验证，则记录相应信息并返回。
   * 对于每个任务，如果任务未完成，则点击任务信息并处理可展开的内容。
   * 如果存在可点击的按钮，则依次点击并等待相应的延迟。
   * 在输入框中填入值并触发输入事件，最后点击继续按钮以完成任务验证。
   * 如果所有任务成功完成，则记录成功信息。
   */
  async verifyTask(): Promise<any> {
    try {
      echoLog({ text: `${__('verifyingTask')}...` });

      const tasks = $('.entry-content .entry-method');
      // eslint-disable-next-line no-underscore-dangle
      unsafeWindow._OxA = '_OxA';
      for (const task of tasks) {
        if ($('[campaign-key="campaign.key"]').length > 0) { // 检测人机验证
          return echoLog({ text: __('campaign') });
        }

        const $task = $(task);

        // 任务完成则跳过
        if ($task.find('i.fa-question').length === 0) continue;

        const taskInfo = $task.find('.user-links');
        taskInfo[0].click();
        // const clickBtn = .find('span:contains(Continue),button:contains(Continue)') Click Here

        const aElements = $task.find('.expandable').find('a.btn');
        if (aElements.length > 0) {
          for (const element of aElements) {
            const $element = $(element);
            const href = $element.attr('href');
            $element.removeAttr('href')[0].click();
            $element.attr('href', href as string);
          }
        }

        unsafeWindow.$hookTimer?.setSpeed(1000);
        const visitBtn = $task.find('.expandable').find('span:contains(more seconds),button:contains(more seconds)')
          .filter(':visible');
        if (visitBtn.length > 0) {
          const newTab = GM_openInTab('', { active: true });
          // const newTab = window.open('', '_blank');
          // newTab?.focus();
          await delay(1000);
          newTab?.close();
        }
        await delay(3000);
        unsafeWindow.$hookTimer?.setSpeed(1);

        const expandInfo = $task.find('.expandable');
        const [input] = expandInfo.find('input');
        if (input) {
          const evt = new Event('input', { bubbles: true, cancelable: true, composed: true });
          const valuelimit = [...expandInfo.text().matchAll(/"(.+?)"/g)].at(-1)?.[1];
          input.value = valuelimit || 'vloot';
          // expandInfo.find('input').val(this.options.vlootUsername);
          input.dispatchEvent(evt);
          await delay(1000);
        }

        await this.#checkSync();
        const continueBtn = $task.find('.expandable').find('span:contains(Continue),button:contains(Continue)');
        for (const button of continueBtn) {
          button.click();
          await delay(500);
          await this.#checkSync();
        }
      }
      echoLog({ text: __('verifiedGleamTasks') });
    } catch (error) {
      throwError(error as Error, 'Gleam.verifyTask');
      return false;
    }
  }

  /**
   * 检查同步状态的私有异步方法
   *
   * @returns {Promise<boolean>} 如果同步完成，则返回 true；如果发生错误，则返回 false。
   *
   * @throws {Error} 如果在检查过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法使用定时器检查页面中是否存在同步图标。
   * 如果同步图标不存在，则清除定时器并解析 Promise 为 true。
   * 如果在过程中发生错误，则记录错误信息并返回 false。
   */
  async #checkSync(): Promise<boolean> {
    try {
      return await new Promise((resolve) => {
        const checker = setInterval(() => {
          if ($('.entry-content .entry-method i.fa-sync').length === 0) {
            clearInterval(checker);
            resolve(true);
          }
        }, 500);
      });
    } catch (error) {
      throwError(error as Error, 'Gleam.checkSync');
      return false;
    }
  }

  /**
   * 执行Gleam任务的私有异步方法
   *
   * @param {string} link - 要执行的Gleam任务链接。
   * @returns {Promise<boolean>} 如果任务成功执行，则返回 true；否则返回 false。
   *
   * @throws {Error} 如果在执行过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法打开一个新的标签页以执行指定的Gleam任务。
   * 使用 `GM_openInTab` 方法打开任务链接，并在标签页关闭时记录成功信息。
   * 如果在过程中发生错误，则记录错误信息并返回 false。
   */
  async #doGleamTask(link: string): Promise<boolean> {
    try {
      const logStatus = echoLog({ text: __('doingGleamTask') });
      return await new Promise((resolve) => {
        GM_openInTab(`${link}?8b07d23f4bfa65f9`,
          { active: true, insert: true, setParent: true })
          .onclose = () => {
            logStatus.success();
            resolve(true);
          };
      });
    } catch (error) {
      throwError(error as Error, 'Gleam.doGleamTask');
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
   * 该方法从当前窗口的路径中提取抽奖ID。
   * 如果成功获取到抽奖ID，则将其赋值给实例属性 `giveawayId` 并返回 true。
   * 如果未能获取到抽奖ID，则记录错误信息并返回 false。
   */
  #getGiveawayId(): boolean {
    try {
      const giveawayId = window.location.pathname;
      if (giveawayId) {
        this.giveawayId = giveawayId;
        return true;
      }
      echoLog({ text: __('getFailed', 'GiveawayId') });
      return false;
    } catch (error) {
      throwError(error as Error, 'Gleam.getGiveawayId');
      return false;
    }
  }
  /* old
  async #getGleamLink(link: string): Promise<string | false> {
    try {
      const logStatus = echoLog({ text: __('gettingGleamLink') });
      const { result, statusText, status, data } = await httpRequest({
        url: link,
        method: 'GET'
      });
      if (result === 'Success') {
        if (data?.status === 200) {
          const gleamLink = data.responseText.match(/href="(https:\/\/gleam\.io\/.*?\/.+?)"/)?.[1];
          if (gleamLink) {
            logStatus.success();
            return gleamLink;
          }
          logStatus.error(`Error:${__('getLinkFailed')}`);
          return false;
        }
        logStatus.error(`Error:${data?.statusText}(${data?.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'Gleam.getGleamLink');
      return false;
    }
  }
  */

  /**
   * 获取Gleam链接的异步方法
   *
   * @param {string} title - 要查找的抽奖标题。
   * @returns {Promise<string | false>} 如果成功获取链接，则返回链接字符串；如果失败，则返回 false。
   *
   * @throws {Error} 如果在获取过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法向指定的API发送请求以获取抽奖信息。
   * 如果请求成功且返回的数据有效，则查找与给定标题匹配的抽奖链接。
   * 如果找到链接，则记录成功信息并返回链接；如果未找到，则记录错误信息并返回 false。
   * 如果请求失败，则记录错误信息并返回 false。
   */
  async #getGleamLink(title: string): Promise<string | false> {
    try {
      const logStatus = echoLog({ text: __('gettingGleamLink') });
      const { result, statusText, status, data } = await httpRequest({
        url: 'https://www.vloot.io/api/v1/giveaways',
        method: 'GET',
        responseType: 'json'
      });
      if (result === 'Success') {
        if (data?.status === 200 && data?.response?.Success === true && data?.response?.Data) {
          const { link } = (data.response as vlootData).Data.find((giveaway) => title.replace(/[\s]/g, '').toLowerCase()
            .includes(giveaway.title.replace(/[\s]/g, '').toLowerCase())) || {};
          if (link) {
            logStatus.success();
            return link;
          }
          logStatus.error(`Error:${__('getLinkFailed')}`);
          return false;
        }
        logStatus.error(`Error:${data?.statusText}(${data?.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'Gleam.getGleamLink');
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
   * 该方法检查当前活动的状态，包括是否被禁止、是否已结束、是否已暂停，以及活动的开始时间。
   * 如果活动被禁止或已结束且用户没有密钥，弹出警告框提示用户活动不可用。
   * 如果用户选择确认，则关闭窗口。
   * 如果没有错误发生，则返回 true。
   */
  async #checkLeftKey(): Promise<boolean> {
    try {
      if (!globalOptions.other.checkLeftKey) return true;
      const campaignString = $('div.popup-blocks-container').attr('ng-init')
        ?.match(/initCampaign\(([\w\W]+?)\)$/)?.[1];
      if (!campaignString) return false;
      const { campaign, incentive } = JSON.parse(campaignString);
      const controllerString = $('div.campaign.reward').attr('ng-init')
        ?.match(/initContestant\(([\w\W]+?)\);/)?.[1];
      let ownedKey = false;
      if (controllerString) {
        if (JSON.parse(controllerString).contestant?.claims?.incentives?.[incentive.id]?.length) {
          ownedKey = true;
        }
      }
      if (campaign.banned || (campaign.finished && !ownedKey) || campaign.paused || new Date().getTime() < (campaign.starts_at * 1000)) {
        await Swal.fire({
          icon: 'warning',
          title: __('notice'),
          text: __('giveawayNotWork'),
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
      throwError(error as Error, 'Gleam.checkLeftKey');
      return false;
    }
  }
}

export default Gleam;

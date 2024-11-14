/*
 * @Author       : HCLonely
 * @Date         : 2021-11-13 17:57:40
 * @LastEditTime : 2022-02-06 11:38:18
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/website/Givekey.ts
 * @Description  : https://givekey.ru
 */

// eslint-disable-next-line
/// <reference path = "GiveKey.d.ts" />

import Swal from 'sweetalert2';
import Website from './Website';
import echoLog from '../echoLog';
import __ from '../tools/i18n';
import { delay, getRedirectLink, unique } from '../tools/tools';
import throwError from '../tools/throwError';
import { globalOptions } from '../globalOptions';

const defaultTasksTemplate: gkSocialTasks = {
  steam: {
    groupLinks: [],
    wishlistLinks: [],
    curatorLinks: [],
    curatorLikeLinks: []
  },
  twitter: {
    userLinks: []
  },
  vk: {
    nameLinks: []
  },
  discord: {
    serverLinks: []
  }
};
const defaultTasks = JSON.stringify(defaultTasksTemplate);

/**
 * 表示 Givekey 网站的任务处理类。
 *
 * @class Givekey
 * @extends Website
 *
 * @property {string} name - 网站名称。
 * @property {Array<string>} tasks - 存储任务ID的数组。
 * @property {gkSocialTasks} socialTasks - 存储社交任务的对象。
 * @property {gkSocialTasks} undoneTasks - 存储未完成任务的对象。
 * @property {string} userId - 用户ID。
 * @property {Array<string>} buttons - 可用按钮的数组。
 *
 * @method static test - 检查当前域名是否为 Givekey 网站。
 * @returns {boolean} 如果当前域名为 'givekey.ru'，则返回 true；否则返回 false。
 *
 * @method after - 页面加载后的异步方法。
 * @returns {Promise<void>} 无返回值。
 * @throws {Error} 如果在处理过程中发生错误，将抛出错误。
 *
 * @method init - 初始化方法。
 * @returns {boolean} 如果初始化成功，则返回 true；否则返回 false。
 * @throws {Error} 如果在初始化过程中发生错误，将抛出错误。
 *
 * @method classifyTask - 分类任务的异步方法。
 * @param {'do' | 'undo' | 'verify'} action - 要执行的操作类型。
 * @returns {Promise<boolean>} 如果任务分类成功，则返回 true；否则返回 false。
 * @throws {Error} 如果在分类过程中发生错误，将抛出错误。
 *
 * @method verifyTask - 验证任务的异步方法。
 * @returns {Promise<boolean>} 如果所有任务成功验证，则返回 true；否则返回 false。
 * @throws {Error} 如果在验证过程中发生错误，将抛出错误。
 *
 * @method #verify - 验证任务的私有异步方法。
 * @param {string} task - 要验证的任务ID。
 * @returns {Promise<boolean>} 如果任务验证成功，则返回 true；否则返回 false。
 * @throws {Error} 如果在验证过程中发生错误，将抛出错误。
 *
 * @method #getGiveawayId - 获取抽奖ID的方法。
 * @returns {boolean} 如果成功获取抽奖ID，则返回 true；否则返回 false。
 * @throws {Error} 如果在检查过程中发生错误，将抛出错误。
 *
 * @method #checkLeftKey - 检查剩余密钥的私有异步方法。
 * @returns {Promise<boolean>} 如果检查成功，则返回 true；如果发生错误，则返回 false。
 * @throws {Error} 如果在检查过程中发生错误，将抛出错误。
 */
class Givekey extends Website {
  name = 'Givekey';
  tasks: Array<string> = [];
  socialTasks: gkSocialTasks = JSON.parse(defaultTasks);
  undoneTasks: gkSocialTasks = JSON.parse(defaultTasks);
  userId!: string;
  buttons: Array<string> = [
    'doTask',
    'undoTask',
    'verifyTask'
  ];

  /**
   * 检查当前域名是否为 Givekey 网站的静态方法
   *
   * @returns {boolean} 如果当前域名为 'givekey.ru'，则返回 true；否则返回 false。
   *
   * @description
   * 该方法通过比较当前窗口的域名来判断是否为 Givekey 网站。
   * 如果域名匹配，则返回 true；否则返回 false。
   */
  static test(): boolean {
    return window.location.host === 'givekey.ru';
  }

  /**
   * 页面加载后的异步方法
   *
   * @returns {Promise<void>} 无返回值。
   *
   * @throws {Error} 如果在处理过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法首先等待导航栏元素的出现，使用定时器检查元素是否存在。
   * 一旦找到元素，清除定时器并继续执行后续操作。
   * 然后检查剩余密钥的状态，如果检查失败，则记录相应的警告信息。
   */
  async after(): Promise<void> {
    try {
      await new Promise((resolve) => {
        const checker = setInterval(() => {
          if ($('#navbarDropdown').length > 0) {
            clearInterval(checker);
            resolve(true);
          }
        }, 500); // 添加间隔时间以避免过于频繁的检查
      });
      if (!await this.#checkLeftKey()) {
        echoLog({}).warning(__('checkLeftKeyFailed'));
      }
    } catch (error) {
      throwError(error as Error, 'Givekey.after');
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
   * 首先记录初始化状态。如果页面中存在 Steam 登录链接，则重定向用户到 Steam 登录页面，并记录警告信息。
   * 然后调用私有方法获取抽奖ID，如果获取失败，则返回 false。
   * 接着从页面的 meta 标签中获取用户ID，如果未找到用户ID，则记录错误信息并返回 false。
   * 如果成功获取用户ID，则将其赋值给实例属性 `userId`，并将 `initialized` 属性设置为 true，最后记录成功信息。
   */
  init(): boolean {
    try {
      const logStatus = echoLog({ text: __('initing') });
      if ($('a[href*="/auth/steam"]').length > 0) {
        window.open('/auth/steam', '_self');
        logStatus.warning(__('needLogin'));
        return false;
      }
      if (!this.#getGiveawayId()) return false;
      const userId = $('meta[name="user-id"]').attr('content');
      if (!userId) {
        logStatus.error(__('getFailed', __('userId')));
        return false;
      }
      this.userId = userId;
      this.initialized = true;
      logStatus.success();
      return true;
    } catch (error) {
      throwError(error as Error, 'Givekey.init');
      return false;
    }
  }

  /**
   * 分类任务的异步方法
   *
   * @param {'do' | 'undo' | 'verify'} action - 要执行的操作类型，'do' 表示执行任务，'undo' 表示撤销任务，'verify' 表示验证任务。
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
  async classifyTask(action: 'do' | 'undo' | 'verify'): Promise<boolean> {
    try {
      const logStatus = echoLog({ text: __('getTasksInfo') });
      if (action === 'undo') {
        this.socialTasks = GM_getValue<gkGMTasks>(`gkTasks-${this.giveawayId}`)?.tasks || JSON.parse(defaultTasks);
      }

      const tasks = $('.card-body:has("button") .row');
      for (const task of tasks) {
        const taskEle = $(task);
        const isSuccess = /Complete/i.test(taskEle.find('button').text()
          .trim());
        if (isSuccess && action !== 'undo') continue;
        const checkButton = taskEle.find('#task_check');
        const taskId = checkButton.attr('data-id');
        if (taskId) this.tasks.push(taskId);
        if (action === 'verify') continue;

        let href = taskEle.find('a').attr('href') || null;
        const text = taskEle.find('a').text()
          .trim();
        const icon = taskEle.find('i');
        if (!href || !text) continue;
        if (/^https?:\/\/givekey\.ru\/giveaway\/[\d]+\/execution_task/.test(href)) {
          href = await getRedirectLink(href);
        }
        if (!href) continue;

        if (/^https?:\/\/vk\.com\//.test(href)) {
          this.socialTasks.vk.nameLinks.push(href);
          if (action === 'do' && !isSuccess) this.undoneTasks.vk.nameLinks.push(href);
        } else if (/^https?:\/\/steamcommunity\.com\/groups/.test(href)) {
          this.socialTasks.steam.groupLinks.push(href);
          if (action === 'do' && !isSuccess) this.undoneTasks.steam.groupLinks.push(href);
        } else if (/^https?:\/\/store\.steampowered\.com\/app\//.test(href)) {
          this.socialTasks.steam.wishlistLinks.push(href);
          if (action === 'do' && !isSuccess) this.undoneTasks.steam.wishlistLinks.push(href);
        } else if (/Subscribe/gi.test(text) && icon.hasClass('fa-steam-square')) {
          if (/^https?:\/\/store\.steampowered\.com\/curator\//.test(href)) {
            this.socialTasks.steam.curatorLinks.push(href);
            if (action === 'do' && !isSuccess) this.undoneTasks.steam.curatorLinks.push(href);
          } else {
            this.socialTasks.steam.curatorLikeLinks.push(href);
            if (action === 'do' && !isSuccess) this.undoneTasks.steam.curatorLikeLinks.push(href);
          }
        } else if (/^https?:\/\/twitter\.com\//.test(href) && /Subscribe/gi.test(text)) {
          this.socialTasks.twitter.userLinks.push(href);
          if (action === 'do' && !isSuccess) this.undoneTasks.twitter.userLinks.push(href);
        } else if (icon.hasClass('fa-discord') || /^https?:\/\/discord\.com\/invite\//.test(href)) {
          this.socialTasks.discord.serverLinks.push(href);
          if (action === 'do' && !isSuccess) this.undoneTasks.discord.serverLinks.push(href);
        } else {
          echoLog({}).warning(`${__('unKnownTaskType')}: ${text}(${href})`);
        }
      }

      logStatus.success();
      this.tasks = unique(this.tasks);
      this.undoneTasks = this.uniqueTasks(this.undoneTasks) as gkSocialTasks;
      this.socialTasks = this.uniqueTasks(this.socialTasks) as gkSocialTasks;
      if (window.DEBUG) console.log('%cAuto-Task[Debug]:', 'color:blue', JSON.stringify(this));
      GM_setValue(`gkTasks-${this.giveawayId}`, { tasks: this.socialTasks, time: new Date().getTime() });
      return true;
    } catch (error) {
      throwError(error as Error, 'Givekey.classifyTask');
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
   * 该方法首先检查是否已初始化，如果未初始化则调用初始化方法。
   * 然后检查任务列表是否为空，如果为空则调用分类任务的方法进行分类。
   * 接着记录验证前的提示信息，并依次验证每个任务。
   * 在验证每个任务之间，等待 15 秒的延迟。
   * 最后记录所有任务完成的信息，并返回 true。
   */
  async verifyTask(): Promise<boolean> {
    try {
      if (!this.initialized && !this.init()) {
        return false;
      }
      if (this.tasks.length === 0 && !(await this.classifyTask('verify'))) {
        return false;
      }
      echoLog({}).warning(__('giveKeyNoticeBefore'));
      const taskLength = this.tasks.length;
      for (let i = 0; i < taskLength; i++) { // eslint-disable-line
        await this.#verify(this.tasks[i]);
        if (i < (taskLength - 1)) {
          await delay(15000);
        }
      }

      echoLog({}).success(__('allTasksComplete'));
      echoLog({ html: `<li><font class="warning">${__('giveKeyNoticeAfter')}</font></li>` });
      return true;
    } catch (error) {
      throwError(error as Error, 'Givekey.verifyTask');
      return false;
    }
  }

  /**
   * 验证任务的私有异步方法
   *
   * @param {string} task - 要验证的任务ID。
   * @returns {Promise<boolean>} 如果任务验证成功，则返回 true；否则返回 false。
   *
   * @throws {Error} 如果在验证过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法向服务器发送请求以验证指定的任务。
   * 首先记录正在验证的任务状态。
   * 发送 POST 请求到指定的 URL，并传递任务ID和用户ID。
   * 如果请求成功且返回状态为 'ok'，则更新按钮状态并记录成功信息。
   * 如果返回状态为 'end'，则记录成功信息并返回密钥。
   * 如果发生错误，则记录错误信息并返回 false。
   */
  async #verify(task: string): Promise<boolean> {
    try {
      const logStatus = echoLog({ html: `<li>${__('verifyingTask')}${task}...<font></font></li>` });

      return await new Promise((resolve) => {
        $.ajax({
          url: 'https://givekey.ru/giveaway/task',
          method: 'POST',
          data: `id=${task}&user_id=${this.userId}`,
          dataType: 'json',
          headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          },
          success: (data) => {
            if (data.btn) $(`button[data-id=${this.userId}]`).html(data.btn);
            if (data.status === 'ok') {
              $(`.task_check_${data.id}`).html(`<button class="btn btn-success mb-2 btn-block" disabled>${data.btn}</button>`);
              logStatus.success();
              resolve(true);
            } else if (data.status === 'end') {
              logStatus.success();
              echoLog({}).success(data.key);
              resolve(true);
            } else {
              logStatus.error(`Error:${data.msg}`);
              resolve(false);
            }
          },
          error: (xhr) => {
            logStatus.error(`Error:${xhr.statusText}(${xhr.status})`);
            resolve(false);
          }
        });
      });
    } catch (error) {
      throwError(error as Error, 'Givekey.verify');
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
      const giveawayId = window.location.href.match(/giveaway\/([\d]+)/)?.[1];
      if (giveawayId) {
        this.giveawayId = giveawayId;
        return true;
      }
      echoLog({ text: __('getFailed', 'GiveawayId') });
      return false;
    } catch (error) {
      throwError(error as Error, 'Givekey.getGiveawayId');
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
   * 如果启用且当前没有剩余密钥，则弹出警告框提示用户没有剩余密钥。
   * 用户可以选择确认或取消，确认后将关闭窗口。
   * 如果没有错误发生，则返回 true。
   */
  async #checkLeftKey(): Promise<boolean> {
    try {
      if (!globalOptions.other.checkLeftKey) return true;
      if (!$('#keys_count').text()) {
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
      throwError(error as Error, 'Givekey.checkLeftKey');
      return false;
    }
  }
}

export default Givekey;

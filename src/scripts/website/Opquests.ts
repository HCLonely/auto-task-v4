/*
 * @Author       : HCLonely
 * @Date         : 2021-11-18 13:31:23
 * @LastEditTime : 2023-03-12 10:22:27
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/website/Opquests.ts
 * @Description  : https://opquests.com/
 */

// eslint-disable-next-line
/// <reference path = "Opquests.d.ts" />

import Website from './Website';
import throwError from '../tools/throwError';
import echoLog from '../echoLog';
import __ from '../tools/i18n';
// import { delay } from '../tools/tools';
import { globalOptions } from '../globalOptions';
import httpRequest from '../tools/httpRequest';

const defaultTasks: oqSocialTasks = {
  steam: {
    groupLinks: [],
    wishlistLinks: [],
    followLinks: [],
    curatorLikeLinks: []
  }
};

/**
 * Opquests 类用于处理与 Opquests 网站相关的任务和操作。
 *
 * @class Opquests
 * @extends Website
 *
 * @property {string} name - 网站名称，默认为 'Opquests'。
 * @property {oqSocialTasks} undoneTasks - 存储未完成任务的对象。
 * @property {Array<string>} buttons - 可用的操作按钮列表。
 *
 * @static
 * @method test - 检查当前域名是否为 Opquests 网站。
 * @returns {boolean} 如果当前域名为 'opquests.com'，则返回 true；否则返回 false。
 *
 * @async
 * @method before - 在执行操作之前的异步方法。
 * @returns {Promise<void>} 无返回值。
 * @throws {Error} 如果在执行过程中发生错误，将抛出错误。
 *
 * @async
 * @method after - 页面加载后的异步方法。
 * @returns {Promise<void>} 无返回值。
 * @throws {Error} 如果在处理过程中发生错误，将抛出错误。
 *
 * @method init - 初始化方法。
 * @returns {boolean} 如果初始化成功，则返回 true；否则返回 false。
 * @throws {Error} 如果在初始化过程中发生错误，将抛出错误。
 *
 * @async
 * @method classifyTask - 分类任务的异步方法。
 * @param {'do' | 'undo'} action - 要执行的操作类型，'do' 表示执行任务，'undo' 表示撤销任务。
 * @returns {Promise<boolean>} 如果任务分类成功，则返回 true；否则返回 false。
 * @throws {Error} 如果在分类过程中发生错误，将抛出错误。
 *
 * @async
 * @method verifyTask - 验证任务的异步方法。
 * @returns {Promise<boolean>} 如果任务验证成功，则返回 true；否则返回 false。
 * @throws {Error} 如果在验证过程中发生错误，将抛出错误。
 *
 * @async
 * @method getKey - 获取密钥的异步方法。
 * @param {boolean} [isButton] - 可选参数，指示是否通过按钮获取密钥。
 * @returns {Promise<boolean>} 如果成功获取密钥，则返回 true；否则返回 false。
 * @throws {Error} 如果在获取过程中发生错误，将抛出错误。
 *
 * @private
 * @method #getGiveawayId - 获取抽奖ID的方法。
 * @returns {boolean} 如果成功获取抽奖ID，则返回 true；否则返回 false。
 * @throws {Error} 如果在检查过程中发生错误，将抛出错误。
 *
 * @private
 * @method #checkLogin - 检查用户是否已登录的私有方法。
 * @returns {boolean} 如果用户已登录，则返回 true；否则返回 false。
 * @throws {Error} 如果在检查过程中发生错误，将抛出错误。
 */
class Opquests extends Website {
  name = 'Opquests';
  undoneTasks: oqSocialTasks = { ...defaultTasks };
  buttons: Array<string> = [
    'doTask',
    'verifyTask',
    'getKey'
  ];

  /**
   * 检查当前域名是否为 Opquests 网站的静态方法
   *
   * @returns {boolean} 如果当前域名为 'opquests.com'，则返回 true；否则返回 false。
   *
   * @description
   * 该方法通过比较当前窗口的域名来判断是否为 Opquests 网站。
   * 如果域名匹配，则返回 true；否则返回 false。
   */
  static test(): boolean {
    return window.location.host === 'opquests.com';
  }

  /**
   * 在执行操作之前的异步方法
   *
   * @returns {Promise<void>} 无返回值。
   *
   * @throws {Error} 如果在执行过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法首先从存储中获取待验证的任务列表。
   * 如果任务列表不为空，则弹出最后一个任务ID，并从列表中移除该任务。
   * 然后，点击对应任务的提交按钮以执行该任务。
   * 如果任务列表为空且存在任务记录，则删除该记录。
   *
   * 注释部分的代码用于在所有任务完成后获取密钥并重新加载页面。
   */
  async before(): Promise<void> {
    try {
      const opquestsVerifyTasks = GM_getValue<Array<string>>('opquestsVerifyTasks') || [];
      if (opquestsVerifyTasks.length > 0) {
        const taskId = opquestsVerifyTasks.pop();
        GM_setValue('opquestsVerifyTasks', opquestsVerifyTasks);
        const [verifyBtn] = $(`#task_id[value="${taskId}"]`).parent()
          .find('button[type="button"]')
          .has('i.fa-check');
        if (verifyBtn) {
          verifyBtn.click();
          return;
        }
        this.before();
        return;
      }
      if (GM_getValue<Array<string>>('opquestsVerifyTasks')) {
        GM_deleteValue('opquestsVerifyTasks');
        /*
            echoLog({}).success(__('allTasksComplete'));
            if (await this.getKey()) {
              return;
            }
            window.location.reload();
            return;
            */
      }
    } catch (error) {
      throwError(error as Error, 'Opquests.before');
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
   * 该方法首先检查用户是否已登录，如果未登录，则记录警告信息。
   * 如果在检查过程中发生错误，则记录错误信息。
   */
  async after(): Promise<void> {
    try {
      if (!this.#checkLogin()) {
        echoLog({}).warning(__('checkLoginFailed'));
      }
    } catch (error) {
      throwError(error as Error, 'Opquests.after');
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
   * 首先记录初始化状态。如果页面中存在重定向链接，则重定向用户到登录页面，并记录警告信息。
   * 然后调用私有方法获取抽奖ID，如果获取失败，则返回 false。
   * 如果成功获取抽奖ID，则将 `initialized` 属性设置为 true，并记录成功信息。
   */
  init(): boolean {
    try {
      const logStatus = echoLog({ text: __('initing') });
      if ($('a[href*="/auth/redirect"]').length > 0) {
        window.open('/auth/redirect', '_self');
        logStatus.warning(__('needLogin'));
        return false;
      }
      if (!this.#getGiveawayId()) return false;
      this.initialized = true;
      logStatus.success();
      return true;
    } catch (error) {
      throwError(error as Error, 'Opquests.init');
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
   * 如果操作为 'undo'，则记录无法撤销的警告信息并返回 false。
   * 遍历页面中的任务，提取任务链接和描述，并根据链接类型将其分类到相应的未完成任务列表中。
   * 支持的链接类型包括 Steam 群组、Steam 商店的愿望单和关注链接。
   * 处理完成后，记录成功信息并返回 true。
   */
  async classifyTask(action: 'do' | 'undo'): Promise<boolean> {
    try {
      if (action === 'undo') {
        echoLog({ text: __('cannotUndo') });
        return false;
      }

      const logStatus = echoLog({ text: __('getTasksInfo') });

      const tasks = $('.w-full:contains("Validate") .items-center');
      for (const task of tasks) {
        const link = $(task).find('a:contains("Open")')
          .attr('href');
        const taskDes = $(task).find('div')
          .eq(1)
          .text()
          .trim();

        if (!link) continue;

        if (/steamcommunity\.com\/groups\//.test(link)) {
          this.undoneTasks.steam.groupLinks.push(link);
        } else if (/store\.steampowered\.com\/app\//.test(link)) {
          if (/wishlist/gim.test(taskDes)) {
            this.undoneTasks.steam.wishlistLinks.push(link);
          } else if (/follow/gim.test(taskDes)) {
            this.undoneTasks.steam.followLinks.push(link);
          }
        } else if (/store\.steampowered\.com\/(publisher|developer|curator)\//.test(link) && /follow/gim.test(taskDes)) {
          this.undoneTasks.steam.curatorLikeLinks.push(link);
        } else {
          echoLog({}).warning(`${__('unKnownTaskType')}: ${taskDes}(${link})`);
        }
      }

      logStatus.success();
      this.undoneTasks = this.uniqueTasks(this.undoneTasks) as oqSocialTasks;
      if (window.DEBUG) console.log('%cAuto-Task[Debug]:', 'color:blue', JSON.stringify(this));
      // GM_setValue(`oqTasks-${this.giveawayId}`, this.socialTasks);
      return true;
    } catch (error) {
      throwError(error as Error, 'Opquests.classifyTask');
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
   * 该方法首先检查是否已初始化，如果未初始化则调用初始化方法。
   * 然后从页面中提取所有任务ID，并将其存储在数组中。
   * 调用私有方法 `#confirm` 进行确认操作。
   * 从任务数组中弹出最后一个任务ID，并将剩余任务ID存储到 GM 值中。
   * 最后，点击对应任务的提交按钮以执行验证。
   */
  async verifyTask(): Promise<boolean> {
    try {
      if (!this.initialized) {
        this.init();
      }
      const tasks: Array<string> = $.makeArray($('.items-center').has('input[name="task_id"]'))
        .map((ele) => $(ele).find('input[name="task_id"]')
          .val() as string);
      await this.#confirm();
      const taskId = tasks.pop();
      GM_setValue('opquestsVerifyTasks', tasks);
      $(`#task_id[value="${taskId}"]`).parent()
        .find('button[type="button"]')
        .has('i.fa-check')[0]?.click();
      return true;
    } catch (error) {
      throwError(error as Error, 'Opquests.verifyTask');
      return false;
    }
  }

  /**
   * 确认任务的私有异步方法
   *
   * @returns {Promise<boolean>} 如果确认成功，则返回 true；否则返回 false。
   *
   * @throws {Error} 如果在确认过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法向指定的 URL 发送 GET 请求以确认任务。
   * 请求头中包含来源和引用信息。
   * 如果请求成功且返回状态为 200，则记录成功信息并返回 true。
   * 如果请求失败或返回的状态不为 200，则记录错误信息并返回 false。
   */
  async #confirm(): Promise<boolean> {
    try {
      const logStatus = echoLog({ html: `<li>${__('confirmingTask')}...<font></font></li>` });

      const { result, statusText, status, data } = await httpRequest({
        url: `https://opquests.com/quests/${this.giveawayId}?confirm=1`,
        method: 'GET',
        nochche: true,
        headers: {
          origin: 'https://opquests.com',
          referer: `https://opquests.com/warning?id=${this.giveawayId}`
        }
      });
      if (result === 'Success') {
        if (data?.status === 200) {
          logStatus.success();
          return true;
        }
        logStatus.error(`Error:${data?.statusText}(${data?.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'Opquests.confirm');
      return false;
    }
  }
  /*
  async #verify(task: qpqTaskInfo): Promise<boolean> {
    try {
      const logStatus = echoLog({ html: `<li>${__('verifyingTask')}${task.title.trim()}...<font></font></li>` });

      const { result, statusText, status, data } = await httpRequest({
        url: 'https://opquests.com/entries',
        method: 'POST',
        dataType: 'json',
        nochche: true,
        headers: {
          origin: 'https://opquests.com',
          pragma: 'no-cache',
          referer: `${window.location.href.split('?')[0]}?confirm=1`,
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: `_token=${task.token}&task_id=${task.taskId}`
      });
      if (result === 'Success') {
        if (data?.responseText?.includes('Successfully completed task') || data?.responseText?.includes('unlocked the key')) {
          logStatus.success();
          return true;
        }
        const key = $(data?.responseText || '').find('button[data-clipboard-text]:contains("Copy")')
          .attr('data-clipboard-text')
          ?.trim();
        if (key) {
          logStatus.success();
          echoLog({}).success(key);
          return true;
        }
        logStatus.error(`Error:${data?.statusText}(${data?.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'Opquests.verify');
      return false;
    }
  }
  */

  /**
   * 获取密钥的异步方法
   *
   * @param {boolean} [isButton] - 可选参数，指示是否通过按钮获取密钥。
   * @returns {Promise<boolean>} 如果成功获取密钥，则返回 true；否则返回 false。
   *
   * @throws {Error} 如果在获取过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法向指定的 URL 发送 GET 请求以获取密钥。
   * 如果请求成功且返回的响应中包含密钥，则记录成功信息并返回密钥。
   * 如果未找到密钥，则记录错误信息，并在需要时重定向用户到密钥页面。
   * 如果请求失败，则记录错误信息并返回 false。
   */
  async getKey(isButton?: boolean): Promise<boolean> {
    try {
      const logStatus = echoLog({ text: __('gettingKey') });
      const { result, statusText, status, data } = await httpRequest({
        url: 'https://opquests.com/keys',
        method: 'GET'
      });
      if (result === 'Success') {
        if (data?.responseText) {
          const key = $(data?.responseText).find(`div.items-center:contains("${$('h1.font-bold').text()
            .trim()
            .replace(' Quest', '')}")`)
            .find('div.font-bold')
            .next()
            .text();
          if (!key) {
            logStatus.error('Error: Key was not found');
            if (isButton) {
              window.open('https://opquests.com/keys', '_self');
            }
            return false;
          }
          logStatus.success();
          echoLog({}).success(key);
          return true;
        }
        logStatus.error(`Error:${data?.statusText}(${data?.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'Opquests.getGiveawayId');
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
      const giveawayId = window.location.href.match(/quests\/([\d]+)/)?.[1];
      if (giveawayId) {
        this.giveawayId = giveawayId;
        return true;
      }
      echoLog({}).error(__('getFailed', 'GiveawayId'));
      return false;
    } catch (error) {
      throwError(error as Error, 'Opquests.getGiveawayId');
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
   * 如果启用且页面中存在重定向链接，则重定向用户到登录页面。
   * 如果没有找到登录链接，则返回 true，表示用户已登录或不需要登录。
   */
  #checkLogin(): boolean {
    try {
      if (!globalOptions.other.checkLogin) return true;
      if ($('a[href*="/auth/redirect"]').length > 0) {
        window.open('/auth/redirect', '_self');
      }
      return true;
    } catch (error) {
      throwError(error as Error, 'Opquests.checkLogin');
      return false;
    }
  }
}

export default Opquests;

/*
 * @Author       : HCLonely
 * @Date         : 2021-11-04 14:02:03
 * @LastEditTime : 2022-12-05 10:55:51
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/website/Freeanywhere.ts
 * @Description  : https://freeanywhere.net
 */

// eslint-disable-next-line
/// <reference path = "FreeAnyWhere.d.ts" />

import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import Website from './Website';
import throwError from '../tools/throwError';
import echoLog from '../echoLog';
import __ from '../tools/i18n';
import httpRequest from '../tools/httpRequest';
import { delay, debug } from '../tools/tools'; // todo
import { globalOptions } from '../globalOptions';

const defaultTasksTemplate: fawSocialTasks = {
  steam: {
    groupLinks: [],
    wishlistLinks: [],
    curatorLinks: [],
    followLinks: []
  },
  vk: {
    nameLinks: []
  },
  discord: {
    serverLinks: []
  },
  extra: {
    website: []
  }
};
const defaultTasks = JSON.stringify(defaultTasksTemplate);

/**
 * FreeAnyWhere 类用于处理与 FreeAnywhere 网站相关的任务和操作。
 *
 * @class FreeAnywhere
 * @extends Website
 *
 * @property {string} name - 网站名称。
 * @property {Array<fawTaskInfo>} tasks - 当前任务列表。
 * @property {fawSocialTasks} socialTasks - 社交任务列表。
 * @property {fawSocialTasks} undoneTasks - 未完成的社交任务列表。
 * @property {Array<string>} buttons - 可用操作按钮列表。
 *
 * @method static test - 检查当前窗口的域名是否为 'freeanywhere.net'。
 * @returns {boolean} 如果域名匹配则返回 true，否则返回 false。
 *
 * @method init - 初始化函数，负责检查用户的登录状态和当前 URL 的有效性。
 * @returns {Promise<boolean>} 如果初始化成功返回 true，否则返回 false。
 * @throws {Error} 如果在初始化过程中发生错误，将抛出错误。
 *
 * @method classifyTask - 根据指定的操作分类任务。
 * @param {string} action - 要执行的操作类型，支持 'undo'、'verify' 和 'do'。
 * @returns {Promise<boolean>} 如果任务分类成功返回 true，否则返回 false。
 * @throws {Error} 如果在处理过程中发生错误，将抛出错误。
 *
 * @method verifyTask - 验证任务的异步方法。
 * @returns {Promise<boolean>} 如果所有任务成功完成，则返回 true；否则返回 false。
 * @throws {Error} 如果在验证过程中发生错误，将抛出错误。
 *
 * @method getKey - 获取奖励密钥的异步方法。
 * @param {boolean} [initialized] - 可选参数，指示是否已初始化。
 * @returns {Promise<false | string>} 如果成功获取密钥，则返回密钥字符串；如果失败，则返回 false。
 * @throws {Error} 如果在获取密钥过程中发生错误，将抛出错误。
 *
 * @method #getGiveawayId - 获取抽奖ID的方法。
 * @returns {boolean} 如果成功获取抽奖ID，则返回 true；否则返回 false。
 * @throws {Error} 如果在获取抽奖ID过程中发生错误，将抛出错误。
 *
 * @method #verify - 验证任务的私有异步方法。
 * @param {fawTaskInfo} task - 要验证的任务信息对象。
 * @returns {Promise<boolean>} 如果任务验证成功，则返回 true；否则返回 false。
 * @throws {Error} 如果在验证过程中发生错误，将抛出错误。
 *
 * @method #checkLeftKey - 检查剩余密钥的私有异步方法。
 * @returns {Promise<boolean>} 如果检查成功，则返回 true；如果发生错误，则返回 false。
 * @throws {Error} 如果在检查过程中发生错误，将抛出错误。
 */
class FreeAnyWhere extends Website {
  name = 'FreeAnyWhere';
  tasks: Array<fawTaskInfo> = [];
  socialTasks: fawSocialTasks = JSON.parse(defaultTasks);
  undoneTasks: fawSocialTasks = JSON.parse(defaultTasks);
  buttons: Array<string> = [
    'doTask',
    'undoTask',
    'verifyTask',
    'getKey'
  ];

  /**
   * 检查当前窗口的域名是否为 'freeanywhere.net'
   *
   * @returns {boolean} 如果域名匹配则返回 true，否则返回 false
   */
  static test(): boolean {
    return window.location.host === 'freeanywhere.net';
  }

  /**
   * 初始化函数，负责检查用户的登录状态和当前 URL 的有效性。
   *
   * @returns {Promise<boolean>} 如果初始化成功返回 true，否则返回 false。
   *
   * @throws {Error} 如果在初始化过程中发生错误，将抛出错误。
   *
   * @description
   * 该函数首先记录初始化状态，然后检查用户是否已登录。如果用户未登录，将重定向到登录页面。
   * 接着，函数验证当前 URL 是否符合预期格式。如果不符合，将提取 giveaway ID 并重定向到正确的 URL。
   * 最后，函数检查剩余的密钥数量，并更新初始化状态。
   */
  async init(): Promise<boolean> {
    try {
      const logStatus = echoLog({ text: __('initing') });
      debug('检测登录按钮');
      if ($('a[href="#/login"]').length > 0) {
        window.open('/#/login', '_self');
        logStatus.warning(__('needLogin'));
        return false;
      }
      debug('检测是否为登录页面');
      if (window.location.href.includes('/login')) {
        logStatus.warning(__('needLogin'));
        return false;
      }
      debug('检测url是否包含额外参数');
      if (!/^https?:\/\/freeanywhere\.net\/#\/giveaway\/[\d]+/.test(window.location.href)) {
        const id = window.location.href.match(/https?:\/\/freeanywhere\.net\/.*?#\/giveaway\/([\d]+)/)?.[1];
        if (!id) {
          logStatus.error(__('getFailed', 'Id'));
          return false;
        }
        debug('重定向到不包含额外参数的url');
        window.location.href = `https://freeanywhere.net/#/giveaway/${id}`;
      }
      if (!this.#getGiveawayId()) return false;

      if (!await this.#checkLeftKey()) {
        echoLog({}).warning(__('checkLeftKeyFailed'));
      }
      this.initialized = true;
      logStatus.success();
      return true;
    } catch (error) {
      throwError(error as Error, 'Freeanywhere.init');
      return false;
    }
  }

  /**
   * 根据指定的操作分类任务。
   *
   * @param {string} action - 要执行的操作类型，支持 'undo'、'verify' 和 'do'。
   * @returns {Promise<boolean>} 如果任务分类成功返回 true，否则返回 false。
   *
   * @throws {Error} 如果在处理过程中发生错误，将抛出错误。
   *
   * @description
   * 该函数首先记录获取任务信息的状态，然后根据传入的操作（如 'undo' 或 'verify'）来处理任务。
   * 如果操作为 'undo'，则从存储中获取之前的任务信息。接着，函数通过 API 请求获取当前的任务数据。
   * 如果请求成功，函数将解析任务数据并根据任务类型和操作更新相应的任务列表。
   * 支持的社交平台包括 Steam 和 VK，函数会根据不同的任务类型（如 WL、JTG、STC、GF）将任务链接分类到相应的列表中。
   * 最后，函数会去重任务列表，并将更新后的任务信息存储回本地。
   */
  async classifyTask(action: string): Promise<boolean> {
    try {
      const logStatus = echoLog({ text: __('getTasksInfo') });
      if (action === 'undo') {
        this.socialTasks = GM_getValue<fawGMTasks>(`fawTasks-${this.giveawayId}`)?.tasks || JSON.parse(defaultTasks);
      }

      const { result, statusText, status, data } = await httpRequest({
        url: `https://freeanywhere.net/api/v1/giveaway/${this.giveawayId}/?format=json`,
        method: 'GET',
        headers: {
          authorization: `Token ${window.localStorage.getItem('token')}`,
          'x-csrftoken': Cookies.get('csrftoken') as string
        },
        responseType: 'json'
      });
      if (result === 'Success') {
        const tasks = data?.response?.challenges;
        if (tasks) {
          if (action === 'verify') {
            this.tasks = [];
          }
          for (const task of tasks) {
            debug('任务分类', task);
            const type = task.challenge;
            const social = task.challenge_provider;
            const taskInfo: fawTaskInfo = {
              id: task.id,
              title: task.title
            };
            if (action === 'verify' && !task.is_success) {
              this.tasks.push(taskInfo);
              continue;
            }
            switch (social) {
            case 'steam':
              taskInfo.social = 'steam';
              switch (type) {
              case 'WL':
                if (action === 'undo') this.socialTasks.steam.wishlistLinks.push(task.link);
                if (action === 'do' && !task.is_success) this.undoneTasks.steam.wishlistLinks.push(task.link);
                break;
              case 'JTG':
                if (action === 'undo') this.socialTasks.steam.groupLinks.push(task.link);
                if (action === 'do' && !task.is_success) this.undoneTasks.steam.groupLinks.push(task.link);
                break;
              case 'STC':
                if (action === 'undo') this.socialTasks.steam.curatorLinks.push(task.link);
                if (action === 'do' && !task.is_success) this.undoneTasks.steam.curatorLinks.push(task.link);
                break;
              case 'GF':
                if (action === 'undo') this.socialTasks.steam.followLinks.push(task.link);
                if (action === 'do' && !task.is_success) this.undoneTasks.steam.followLinks.push(task.link);
                break;
              }
              break;
            case 'vk-oauth2':
              if (action === 'undo') this.socialTasks.vk.nameLinks.push(task.link);
              if (action === 'do' && !task.is_success) this.undoneTasks.vk.nameLinks.push(task.link);
              break;
            case 'website':
              // todo
              break;
            default:
              echoLog({}).warning(`${__('unKnownTaskType')}: ${social}`);
              break;
            }
          }
          logStatus.success();
          this.undoneTasks = this.uniqueTasks(this.undoneTasks) as fawSocialTasks;
          this.socialTasks = this.uniqueTasks(this.socialTasks) as fawSocialTasks;
          if (window.DEBUG) console.log('%cAuto-Task[Debug]:', 'color:blue', JSON.stringify(this));
          GM_setValue(`fawTasks-${this.giveawayId}`, { tasks: this.socialTasks, time: new Date().getTime() });
          return true;
        }
        debug('返回的数据中不包含任务信息', data?.response);
        logStatus.error(`Error:${data?.statusText}(${data?.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'Freeanywhere.classifyTask');
      return false;
    }
  }

  /**
   * 验证任务的异步方法
   *
   * @returns {Promise<boolean>} 如果所有任务成功完成，则返回 true；否则返回 false。
   *
   * @throws {Error} 如果在验证过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法首先检查是否已初始化，如果未初始化则调用初始化方法。
   * 然后检查任务列表是否为空，如果为空则尝试分类任务。
   * 对于每个任务，调用私有的验证方法并在每次调用之间延迟 1 秒。
   * 最后，等待所有验证任务完成，并记录成功信息。
   * 如果成功，返回获取的密钥；否则返回 false。
   */
  async verifyTask(): Promise<boolean> {
    try {
      if (!this.initialized && !this.init()) {
        debug('未初始化');
        return false;
      }
      if (this.tasks.length === 0 && !(await this.classifyTask('verify'))) {
        debug('任务列表为空', this.tasks);
        return false;
      }
      const pro = [];
      for (const task of this.tasks) {
        pro.push(this.#verify(task));
        await delay(1000);
      }
      await Promise.all(pro);
      echoLog({}).success(__('allTasksComplete'));
      return !!await this.getKey(true);
    } catch (error) {
      throwError(error as Error, 'Freeanywhere.verifyTask');
      return false;
    }
  }

  /**
   * 获取奖励密钥的异步方法
   *
   * @param {boolean} [initialized] - 可选参数，指示是否已初始化。
   * @returns {Promise<false | string>} 如果成功获取密钥，则返回密钥字符串；如果失败，则返回 false。
   *
   * @throws {Error} 如果在获取密钥过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法首先检查是否已初始化，如果未初始化且未成功初始化，则返回 false。
   * 然后记录获取密钥的状态，并发送 HTTP GET 请求以获取奖励信息。
   * 如果请求成功且返回的响应中包含奖励，则记录成功信息并返回奖励。
   * 如果任务未完成，则记录错误信息并返回 false。
   * 如果任务已完成，则调用私有方法检查剩余密钥。
   * 如果请求失败，则记录错误信息并返回 false。
   */
  async getKey(initialized?: boolean): Promise<false | string> {
    try {
      if (!initialized && !this.initialized && !this.init()) {
        debug('未初始化');
        return false;
      }
      const logStatus = echoLog({ text: __('gettingKey') });
      const { result, statusText, status, data } = await httpRequest({
        url: `https://freeanywhere.net/api/v1/giveaway/${this.giveawayId}/reward/?format=json`,
        method: 'GET',
        dataType: 'json',
        headers: {
          authorization: `Token ${window.localStorage.getItem('token')}`
        }
      });
      if (result === 'Success') {
        if (data?.response?.reward) {
          logStatus.success();
          echoLog({}).success(data.response.reward);
          return data.response.reward;
        }
        if (data?.response?.completed === false) {
          logStatus.error(__('tasksNotCompleted'));
          return false;
        }
        if (data?.response?.completed === true) {
          await this.#checkLeftKey();
        }
        logStatus.error(`Error:${data?.statusText}(${data?.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'FreeAnyWhere.getGiveawayId');
      return false;
    }
  }

  /**
   * 获取抽奖ID的方法
   *
   * @returns {boolean} 如果成功获取抽奖ID，则返回 true；否则返回 false。
   *
   * @throws {Error} 如果在获取抽奖ID过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法尝试从当前窗口的URL中提取抽奖ID。
   * 使用正则表达式匹配URL中的抽奖ID部分。
   * 如果成功匹配到抽奖ID，则将其赋值给实例属性 `giveawayId` 并返回 true。
   * 如果未能匹配到抽奖ID，则记录错误信息并返回 false。
   */
  #getGiveawayId(): boolean {
    try {
      const giveawayId = window.location.href.match(/\/giveaway\/([\d]+)/)?.[1];
      if (giveawayId) {
        this.giveawayId = giveawayId;
        return true;
      }
      echoLog({}).error(__('getFailed', 'GiveawayId'));
      return false;
    } catch (error) {
      throwError(error as Error, 'FreeAnyWhere.getGiveawayId');
      return false;
    }
  }

  /**
   * 验证任务的私有异步方法
   *
   * @param {fawTaskInfo} task - 要验证的任务信息对象。
   * @returns {Promise<boolean>} 如果任务验证成功，则返回 true；否则返回 false。
   *
   * @throws {Error} 如果在验证过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法发送一个 HTTP GET 请求以验证指定任务的状态。
   * 首先记录正在验证的任务状态。
   * 如果请求成功且返回的响应中包含任务状态，则记录成功信息并返回 true。
   * 如果请求失败或状态不正确，则记录错误信息并返回 false。
   */
  async #verify(task: fawTaskInfo): Promise<boolean> {
    try {
      const logStatus = echoLog({ html: `<li>${__('verifyingTask')}${task.title.trim()}...<font></font></li>` });

      const { result, statusText, status, data } = await httpRequest({
        url: `https://freeanywhere.net/api/v1/giveaway/${this.giveawayId}/challenge-status/${task.id}/?format=json`,
        method: 'GET',
        dataType: 'json',
        headers: {
          authorization: `Token ${window.localStorage.getItem('token')}`,
          'x-csrftoken': Cookies.get('csrftoken') as string
        }
      });
      if (result === 'Success') {
        if (data?.response?.status) {
          logStatus.success();
          return true;
        }
        debug('任务验证结果', data?.response);
        logStatus.error(`Error:${data?.statusText}(${data?.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'Freeanywhere.verify');
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
   * 如果未启用，则直接返回 true。
   * 然后发送一个 HTTP GET 请求以获取抽奖信息。
   * 如果响应中包含当前抽奖ID，则返回 true。
   * 如果未找到抽奖ID，则弹出警告框提示用户没有剩余密钥，并提供确认和取消按钮。
   * 如果用户选择确认，则关闭窗口。
   * 最后，返回 true。
   */
  async #checkLeftKey(): Promise<boolean> {
    try {
      if (!globalOptions.other.checkLeftKey) return true;
      debug('检测剩余Key');
      const { data } = await httpRequest({
        url: 'https://freeanywhere.net/api/v1/widget/?format=json',
        method: 'GET',
        dataType: 'json',
        headers: {
          authorization: `Token ${window.localStorage.getItem('token')}`
        }
      });
      if (data?.response?.giveaways.find((giveaway: any) => `${giveaway?.id}` === this.giveawayId)) {
        return true;
      }
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
      return true;
    } catch (error) {
      throwError(error as Error, 'Giveawaysu.checkLeftKey');
      return false;
    }
  }
}

export default FreeAnyWhere;

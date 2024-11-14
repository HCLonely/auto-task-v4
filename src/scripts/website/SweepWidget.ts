/*
 * @Author       : HCLonely
 * @Date         : 2021-12-21 10:01:05
 * @LastEditTime : 2022-02-06 11:39:25
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/website/SweepWidget.ts
 * @Description  : https://sweepwidget.com/
 */

import throwError from '../tools/throwError';
import echoLog from '../echoLog';
import __ from '../tools/i18n';
// import { getRedirectLink } from '../tools/tools';
import Website from './Website';
import { delay } from '../tools/tools';

interface options {
  username: string
  email: string
}
const defaultOptions: options = {
  username: '',
  email: ''
};

/**
 * SweepWidget 类用于处理 SweepWidget 网站的抽奖任务。
 *
 * @class
 * @extends Website
 *
 * @property {string} name - SweepWidget 的名称。
 * @property {object} options - SweepWidget 的配置选项，包含默认选项和用户自定义选项。
 * @property {Array<string>} buttons - SweepWidget 支持的按钮列表。
 *
 * @static
 * @method test - 检查当前 URL 是否为 SweepWidget 网站的静态方法。
 * @returns {boolean} 如果当前 URL 匹配 SweepWidget 的格式，则返回 true；否则返回 false。
 *
 * @method after - 抽奖后续操作的异步方法。
 * @returns {Promise<void>} 无返回值。
 * @throws {Error} 如果在处理过程中发生错误，将抛出错误。
 *
 * @method init - 初始化方法。
 * @returns {boolean} 如果初始化成功，则返回 true；否则返回 false。
 * @throws {Error} 如果在初始化过程中发生错误，将抛出错误。
 *
 * @method classifyTask - 分类任务的方法。
 * @returns {boolean} 如果任务分类成功，则返回 true；否则返回 false。
 *
 * @method doTask - 执行任务的异步方法。
 * @returns {Promise<boolean>} 如果任务成功执行，则返回 true；否则返回 false。
 * @throws {Error} 如果在执行过程中发生错误，将抛出错误。
 *
 * @private
 * @method #checkLogin - 检查用户是否已登录的私有方法。
 * @returns {boolean} 如果用户已登录，则返回 true；否则返回 false。
 * @throws {Error} 如果在检查过程中发生错误，将抛出错误。
 *
 * @private
 * @method #getGiveawayId - 获取抽奖ID的方法。
 * @returns {boolean} 如果成功获取抽奖ID，则返回 true；否则返回 false。
 * @throws {Error} 如果在检查过程中发生错误，将抛出错误。
 *
 * @private
 * @method #checkEnter - 检查用户是否已进入抽奖的私有异步方法。
 * @returns {Promise<boolean>} 如果用户已进入抽奖，则返回 true；否则返回 false。
 * @throws {Error} 如果在检查过程中发生错误，将抛出错误。
 *
 * @private
 * @method #checkFinish - 检查任务完成状态的私有异步方法。
 * @param {JQuery} $task - 要检查的任务元素。
 * @returns {Promise<boolean>} 如果任务完成，则返回 true；否则返回 false。
 * @throws {Error} 如果在检查过程中发生错误，将抛出错误。
 */
class SweepWidget extends Website {
  name = 'SweepWidget';
  options = {
    ...defaultOptions,
    ...GM_getValue<options>('SweepWidgetOptions')
  };
  buttons: Array<string> = [
    'doTask'
  ];

  /**
   * 检查当前URL是否为 SweepWidget 网站的静态方法
   *
   * @returns {boolean} 如果当前URL匹配 SweepWidget 的格式，则返回 true；否则返回 false。
   *
   * @description
   * 该方法使用正则表达式检查当前窗口的URL是否符合 SweepWidget 的格式。
   * 格式为：以 "http://" 或 "https://" 开头，后跟 "sweepwidget.com/view/" 和一个数字ID。
   */
  static test(): boolean {
    return /^https?:\/\/sweepwidget\.com\/view\/[\d]+/.test(window.location.href);
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
   * 如果在检查过程中发生错误，则记录错误信息。
   */
  async after(): Promise<void> {
    try {
      if (!this.#checkLogin()) {
        echoLog({}).warning(__('checkLoginFailed'));
      }
    } catch (error) {
      throwError(error as Error, 'SweepWidget.after');
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
      throwError(error as Error, 'SweepWidget.init');
      return false;
    }
  }

  /**
   * 分类任务的方法
   *
   * @returns {boolean} 如果任务分类成功，则返回 true；否则返回 false。
   *
   * @description
   * 该方法用于分类任务，当前实现仅返回 true，表示任务分类过程已完成。
   */
  classifyTask(): boolean {
    return true;
  }

  /**
   * 执行任务的异步方法
   *
   * @returns {Promise<boolean>} 如果任务成功执行，则返回 true；否则返回 false。
   *
   * @throws {Error} 如果在执行过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法首先检查是否存在解锁奖励的主包装器。
   * 如果不存在，则填写用户名和电子邮件，并点击登录按钮。
   * 如果登录成功，则继续执行任务。
   * 遍历每个任务，点击任务标题以展开详细信息。
   * 获取任务链接并点击，模拟输入并点击验证按钮。
   * 最后，检查任务是否完成，并在每个任务之间添加随机延迟。
   */
  async doTask(): Promise<boolean> {
    try {
      if ($('#unlock_rewards_main_wrapper').length === 0) {
        if ($('input[name="sw__login_name"]:visible').length > 0) {
          $('input[name="sw__login_name"]').val(this.options.username);
        }
        if ($('input[name="sw__login_email"]:visible').length > 0) {
          $('input[name="sw__login_email"]').val(this.options.email);
        }
        if ($('#sw_login_button:visible').length > 0) {
          $('#sw_login_button')[0].click();
        }
        if (!(await this.#checkEnter())) {
          return false;
        }
      }
      const logStatus = echoLog({ text: __('SweepWidgetNotice') });

      // this.socialTasks = GM_getValue<swSocialTasks>(`swTasks-${this.giveawayId}`) || defaultTasks;

      const tasks = $('#sw_inner_entry_methods_l2_wrapper>div.sw_entry');
      for (const task of tasks) {
        const $task = $(task);
        if ($task.find('i.fa-check:visible').length > 0) {
          continue;
        }
        const title = $task.find('.sw_text_inner');
        title[0].click();
        const aElement = $task.find('a.sw_link');
        const link = aElement.attr('href');
        aElement.attr('href', '#a').attr('target', '_self');
        aElement[0]?.click();
        await delay(300);
        aElement.attr('href', link as string).attr('target', '_blank');
        $task.find('input[type="text"]').val('test');
        const verifyBtn = $task.find('input.sw_verify');
        if (verifyBtn.prop('disabled') === true) {
          title[0].click();
          await delay(300);
          title[0].click();
          await delay(300);
        }
        $task.find('input.sw_verify').removeAttr('disabled')[0]?.click();
        await this.#checkFinish($task);
        await delay(parseInt(`${(Math.random() * (3000 - 1000 + 1)) + 1000}`, 10));
      }

      logStatus.success();
      /*
      this.undoneTasks = this.uniqueTasks(this.undoneTasks) as gasSocialTasks;
      this.socialTasks = this.undoneTasks;
      if (window.DEBUG) console.log('%cAuto-Task[Debug]:', 'color:blue', JSON.stringify(this));
      GM_setValue(`swTasks-${this.giveawayId}`, this.socialTasks);
      */
      return true;
    } catch (error) {
      throwError(error as Error, 'SweepWidget.doTask');
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
   * 该方法检查页面中是否存在 Twitter 登录按钮。
   * 如果存在，则模拟点击该按钮以进行登录。
   * 如果在过程中发生错误，则记录错误信息并返回 false。
   */
  #checkLogin(): boolean {
    try {
      if ($('#twitter_login_button').length > 0) {
        $('#twitter_login_button')[0].click();
      }
      return true;
    } catch (error) {
      throwError(error as Error, 'SweepWidget.checkLogin');
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
      throwError(error as Error, 'SweepWidget.getGiveawayId');
      return false;
    }
  }

  /**
   * 检查用户是否已进入抽奖的私有异步方法
   *
   * @returns {Promise<boolean>} 如果用户已进入抽奖，则返回 true；否则返回 false。
   *
   * @throws {Error} 如果在检查过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法使用定时器检查页面中是否存在解锁奖励的主包装器。
   * 如果找到该元素，则清除定时器并解析 Promise 为 true。
   * 如果在过程中发生错误，则记录错误信息并返回 false。
   */
  async #checkEnter(): Promise<boolean> {
    try {
      return new Promise((resolve) => {
        const checker = setInterval(() => {
          if ($('#unlock_rewards_main_wrapper').length > 0) {
            clearInterval(checker);
            resolve(true);
          }
        }, 500); // 设置检查间隔为500毫秒
      });
    } catch (error) {
      throwError(error as Error, 'SweepWidget.checkEnter');
      return false;
    }
  }

  /**
   * 检查任务完成状态的私有异步方法
   *
   * @param {JQuery} $task - 要检查的任务元素。
   * @returns {Promise<boolean>} 如果任务完成，则返回 true；否则返回 false。
   *
   * @throws {Error} 如果在检查过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法使用定时器检查指定任务的完成状态。
   * 如果任务的检查图标可见或输入框不可见，则清除定时器并解析 Promise 为 true。
   * 如果在过程中发生错误，则记录错误信息并返回 false。
   */
  async #checkFinish($task: JQuery): Promise<boolean> {
    try {
      return new Promise((resolve) => {
        const checker = setInterval(() => {
          if ($task.find('i.fa-check:visible').length > 0 || $task.find('.sw_entry_input:visible').length === 0) {
            clearInterval(checker);
            resolve(true);
          }
        }, 500); // 设置检查间隔为500毫秒
      });
    } catch (error) {
      throwError(error as Error, 'SweepWidget.checkFinish');
      return false;
    }
  }
}

export default SweepWidget;

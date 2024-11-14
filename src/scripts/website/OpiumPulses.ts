/*
 * @Author       : HCLonely
 * @Date         : 2021-11-14 17:22:20
 * @LastEditTime : 2022-01-02 12:52:20
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/website/OpiumPulses.ts
 * @Description  : https://www.opiumpulses.com/giveaways
 */

import throwError from '../tools/throwError';
import echoLog from '../echoLog';
import __ from '../tools/i18n';
import httpRequest from '../tools/httpRequest';
import { globalOptions } from '../globalOptions';

declare function checkUser(params:string): void
interface options {
  maxPoint: string
}
const defaultOptions = {
  maxPoint: '99999999'
};

/**
 * OpiumPulses 类用于处理与 Opium Pulses 网站相关的任务和操作。
 *
 * @class OpiumPulses
 * @property {string} name - 类的名称，默认为 'OpiumPulses'。
 * @property {object} options - 配置选项，包含默认选项和从 GM_getValue 获取的选项。
 * @property {number} maxPoints - 用户可用的最大积分，默认为 99999999。
 * @property {number} myPoints - 当前用户的积分，初始值为 0。
 * @property {Array<string>} buttons - 可用的任务按钮名称数组，包括 'doFreeTask' 和 'doPointTask'。
 *
 * @method static test - 检查当前域名是否为 Opium Pulses 网站。
 * @returns {boolean} 如果当前域名为 'www.opiumpulses.com'，则返回 true；否则返回 false。
 *
 * @method async after - 抽奖后续操作的异步方法。
 * @returns {Promise<void>} 无返回值。
 * @throws {Error} 如果在处理过程中发生错误，将抛出错误。
 *
 * @method async doFreeTask - 执行免费任务的异步方法。
 * @returns {Promise<void>} 无返回值。
 * @throws {Error} 如果在执行过程中发生错误，将抛出错误。
 *
 * @method async doPointTask - 执行积分任务的异步方法。
 * @returns {Promise<void>} 无返回值。
 * @throws {Error} 如果在执行过程中发生错误，将抛出错误。
 *
 * @method async #toggleTask - 切换任务的私有异步方法。
 * @param {'FREE' | 'points'} type - 要执行的任务类型，'FREE' 表示免费任务，'points' 表示积分任务。
 * @returns {Promise<void>} 无返回值。
 * @throws {Error} 如果在切换任务过程中发生错误，将抛出错误。
 *
 * @method init - 初始化方法。
 * @returns {boolean} 总是返回 true，表示初始化成功。
 *
 * @method classifyTask - 分类任务的方法。
 * @returns {boolean} 如果任务分类成功，则返回 true；否则返回 false。
 *
 * @method #checkLogin - 检查用户是否已登录的私有方法。
 * @returns {boolean} 如果用户已登录，则返回 true；否则返回 false。
 * @throws {Error} 如果在检查过程中发生错误，将抛出错误。
 */
class OpiumPulses {
  name = 'OpiumPulses';
  options = {
    ...defaultOptions,
    ...GM_getValue<options>('OpiumPulsesOptions')
  };
  maxPoints = 99999999;
  myPoints = 0;
  buttons: Array<string> = [
    'doFreeTask',
    'doPointTask'
  ];

  /**
   * 检查当前域名是否为 Opium Pulses 网站的静态方法
   *
   * @returns {boolean} 如果当前域名为 'www.opiumpulses.com'，则返回 true；否则返回 false。
   *
   * @description
   * 该方法通过比较当前窗口的域名来判断是否为 Opium Pulses 网站。
   * 如果域名匹配，则返回 true；否则返回 false。
   */
  static test(): boolean {
    return window.location.host === 'www.opiumpulses.com';
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
   * 然后将最大积分解析为整数并赋值给 `maxPoints` 属性。
   */
  async after(): Promise<void> {
    try {
      if (!this.#checkLogin()) {
        echoLog({}).warning(__('checkLoginFailed'));
      }
      this.maxPoints = parseInt(this.options.maxPoint, 10);
    } catch (error) {
      throwError(error as Error, 'OpiumPulses.after');
    }
  }

  /**
   * 执行免费任务的异步方法
   *
   * @returns {Promise<void>} 无返回值。
   *
   * @throws {Error} 如果在执行过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法调用私有方法 `#toggleTask` 来执行免费任务。
   * 如果在执行过程中发生错误，则记录错误信息。
   */
  async doFreeTask(): Promise<void> {
    try {
      this.#toggleTask('FREE');
    } catch (error) {
      throwError(error as Error, 'OpiumPulses.doFreeTask');
    }
  }

  /**
   * 执行积分任务的异步方法
   *
   * @returns {Promise<void>} 无返回值。
   *
   * @throws {Error} 如果在执行过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法首先从页面中提取当前用户的积分，并将其解析为整数。
   * 然后调用私有方法 `#toggleTask` 来执行积分任务。
   * 如果在过程中发生错误，则记录错误信息。
   */
  async doPointTask(): Promise<void> {
    try {
      this.myPoints = parseInt($('.page-header__nav-func-user-nav-items.points-items').text()
        .match(/[\d]+/gim)?.[0] || '0', 10);
      this.#toggleTask('points');
    } catch (error) {
      throwError(error as Error, 'OpiumPulses.doPointTask');
    }
  }

  /**
   * 切换任务的私有异步方法
   *
   * @param {'FREE' | 'points'} type - 要执行的任务类型，'FREE' 表示免费任务，'points' 表示积分任务。
   * @returns {Promise<void>} 无返回值。
   *
   * @throws {Error} 如果在切换任务过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法根据任务类型查找可用的抽奖项目。
   * 如果任务类型为 'points'，则检查用户的积分是否足够。
   * 遍历每个抽奖项目，提取所需积分和项目名称。
   * 如果用户积分不足或未找到所需积分，则记录警告信息。
   * 否则，尝试加入抽奖并记录相应的状态信息。
   * 如果加入成功，则更新用户的积分。
   */
  async #toggleTask(type: 'FREE' | 'points'): Promise<void> {
    try {
      const items = $(`.giveaways-page-item:contains('${type}'):not(:contains('ENTERED'))`);
      for (const item of items) {
        const needPoints = parseInt($(item).find('.giveaways-page-item-header-points')
          .text()
          .match(/[\d]+/gim)?.[0] || '999999', 10);
        const name = $(item).find('.giveaways-page-item-footer-name')
          .text()
          .trim();
        if (type === 'points' && needPoints > this.myPoints) {
          echoLog({}).warning(`${__('noPoints')}: ${name}`);
        } else if (type === 'points' && !needPoints) {
          echoLog({}).warning(`${__('getNeedPointsFailed')}: ${name}`);
        } else if (!(type === 'points' && needPoints > this.maxPoints)) {
          const logStatus = echoLog({ text: `${__('joiningLottery')}<a href="${$(item).find('a.giveaways-page-item-img-btn-more')
            .attr('href')}" target="_blank">${name}</a>...` });
          const aElement = $(item).find('a.giveaways-page-item-img-btn-enter:contains(\'enter\')');
          if (aElement?.attr('onclick')?.includes('checkUser')) {
            const giveawayId = aElement.attr('onclick')?.match(/[\d]+/)?.[0];
            if (giveawayId) checkUser(giveawayId);
          }
          if (!aElement.attr('href')) {
            logStatus.error('Error: No "href".');
            continue;
          }
          const { result, statusText, status, data } = await httpRequest({
            url: aElement.attr('href') as string,
            method: 'GET'
          });
          if (result === 'Success') {
            const { result: result0, statusText: statusText0, status: status0, data: data0 } = await httpRequest({
              url: data?.finalUrl as string,
              method: 'GET'
            });
            if (data0?.responseText && /You've entered this giveaway/gim.test(data0.responseText)) {
              logStatus.success();
              const points = data0.responseText.match(/Points:[\s]*?([\d]+)/)?.[1];
              if (type === 'points' && points) {
                this.myPoints = parseInt(points, 10);
              }
            } else if (data0?.responseText && /You're not eligible to enter/gim.test(data0.responseText)) {
              logStatus.error('You\'re not eligible to enter');
            } else {
              logStatus.error(`${result0}:${statusText0}(${status0})`);
            }
          } else {
            logStatus.error(`${result}:${statusText}(${status})`);
          }
        }
      }
      echoLog({ text: '-----END-----' });
    } catch (error) {
      throwError(error as Error, 'OpiumPulses.toggleTask');
    }
  }

  /**
   * 初始化方法
   *
   * @returns {boolean} 总是返回 true，表示初始化成功。
   *
   * @description
   * 该方法用于初始化相关设置或状态。
   * 当前实现仅返回 true，表示初始化过程已完成。
   */
  init(): boolean {
    return true;
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
      if ($('a[href*="/site/login"]').length > 1) {
        window.open('/site/login', '_self');
      }
      return true;
    } catch (error) {
      throwError(error as Error, 'OpiumPulses.checkLogin');
      return false;
    }
  }
}

export default OpiumPulses;

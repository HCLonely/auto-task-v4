/*
 * @Author       : HCLonely
 * @Date         : 2021-11-08 14:37:33
 * @LastEditTime : 2022-02-06 11:33:01
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/website/Indiedb.ts
 * @Description  : https://www.indiedb.com/giveaways
 */

import Swal from 'sweetalert2';
import throwError from '../tools/throwError';
import echoLog from '../echoLog';
import __ from '../tools/i18n';
import { getUrlQuery } from '../tools/tools';
import httpRequest from '../tools/httpRequest';
import { globalOptions } from '../globalOptions';

declare function urlPath(value?: string): string

/**
 * 表示 IndieDB 网站的操作类。
 *
 * @class Indiedb
 * @description
 * 该类提供了与 IndieDB 网站交互的功能，包括检查用户登录状态、执行任务和加入抽奖等操作。
 *
 * @property {string} name - 类的名称。
 * @property {Array<string>} buttons - 可用的按钮列表。
 *
 * @method static test - 检查当前域名是否为 IndieDB 网站。
 * @returns {boolean} 如果当前域名为 'www.indiedb.com'，则返回 true；否则返回 false。
 *
 * @method after - 页面加载后的异步方法，检查用户登录状态和剩余密钥状态。
 * @returns {Promise<void>} 无返回值。
 * @throws {Error} 如果在检查过程中发生错误，将抛出错误。
 *
 * @method doTask - 执行任务的异步方法。
 * @returns {Promise<boolean>} 如果任务成功执行，则返回 true；否则返回 false。
 * @throws {Error} 如果在检查过程中发生错误，将抛出错误。
 *
 * @private
 * @method #join - 加入抽奖的私有异步方法。
 * @returns {Promise<boolean>} 如果成功加入抽奖，则返回 true；否则返回 false。
 * @throws {Error} 如果在检查过程中发生错误，将抛出错误。
 *
 * @private
 * @method #do - 执行任务的私有异步方法。
 * @returns {Promise<boolean>} 如果所有任务成功执行，则返回 true；否则返回 false。
 * @throws {Error} 如果在检查过程中发生错误，将抛出错误。
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
 */
class Indiedb {
  name = 'Indiedb';
  buttons: Array<string> = [
    'doTask'
  ];

  /**
   * 检查当前域名是否为 IndieDB 网站的静态方法
   *
   * @returns {boolean} 如果当前域名为 'www.indiedb.com'，则返回 true；否则返回 false。
   *
   * @description
   * 该方法通过比较当前窗口的域名来判断是否为 IndieDB 网站。
   * 如果域名匹配，则返回 true；否则返回 false。
   */
  static test(): boolean {
    return window.location.host === 'www.indiedb.com';
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
      throwError(error as Error, 'Indiedb.after');
    }
  }

  /**
   * 执行任务的异步方法
   *
   * @returns {Promise<boolean>} 如果任务成功执行，则返回 true；否则返回 false。
   *
   * @throws {Error} 如果在执行过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法首先调用私有方法 `#join` 来加入任务。
   * 如果加入失败，则返回 false。
   * 如果成功加入，则调用私有方法 `#do` 执行任务并返回其结果。
   */
  async doTask(): Promise<boolean> {
    try {
      if (!await this.#join()) {
        return false;
      }
      return await this.#do();
    } catch (error) {
      throwError(error as Error, 'Indiedb.doTask');
      return false;
    }
  }

  /**
   * 加入抽奖的私有异步方法
   *
   * @returns {Promise<boolean>} 如果成功加入抽奖，则返回 true；否则返回 false。
   *
   * @throws {Error} 如果在加入过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法检查用户是否已登录，如果未登录，则记录错误信息并返回 false。
   * 然后检查当前按钮是否为“加入抽奖”按钮。
   * 如果是，则发送 POST 请求以加入抽奖。
   * 如果请求成功且返回状态为 200，且响应中包含成功信息，则更新按钮状态并记录成功信息。
   * 如果请求失败或返回错误信息，则记录相应的错误信息并返回 false。
   * 如果按钮文本为“成功”，则直接返回 true。
   * 如果按钮文本不符合预期，则记录警告信息并返回 false。
   */
  async #join(): Promise<boolean> {
    try {
      if ($('a.buttonenter:contains(Register to join)').length > 0) {
        echoLog({}).error(__('needLogin'));
        return false;
      }
      const currentoption = $('a.buttonenter.buttongiveaway');
      if (/join giveaway/gim.test(currentoption.text())) {
        const logStatus = echoLog({ text: `${__('joiningGiveaway')}...` });
        const { result, statusText, status, data } = await httpRequest({
          url: currentoption.attr('href') as string,
          method: 'POST',
          data: 'ajax=t',
          dataType: 'json',
          headers: {
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            accept: 'application/json, text/javascript, */*; q=0.01',
            origin: window.location.origin
          }
        });
        if (result === 'Success') {
          if (data?.status === 200) {
            if (data.response?.success) {
              currentoption.addClass('buttonentered').text('Success - Giveaway joined');
              $('#giveawaysjoined').slideDown();
              $('#giveawaysrecommend').slideDown();
              logStatus.success(`Success${data.response?.text ? (`:${data.response?.text}`) : ''}`);
              return true;
            }
            logStatus.error(`Error${data.response?.text ? (`:${data.response?.text}`) : ''}`);
            return false;
          }
          logStatus.error(`Error:${data?.statusText}(${data?.status})`);
          return false;
        }
        logStatus.error(`${result}:${statusText}(${status})`);
        return false;
      } else if (/success/gim.test($('a.buttonenter.buttongiveaway').text())) {
        return true;
      }
      echoLog({}).warning(__('needJoinGiveaway'));
      return false;
    } catch (error) {
      throwError(error as Error, 'Indiedb.init');
      return false;
    }
  }

  /**
   * 执行任务的私有异步方法
   *
   * @returns {Promise<boolean>} 如果所有任务成功执行，则返回 true；否则返回 false。
   *
   * @throws {Error} 如果在执行过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法首先从页面中的脚本标签中提取任务ID。
   * 如果成功提取到ID，则遍历已加入的抽奖任务，并对每个任务执行相应的操作。
   * 根据任务的类型（如 Facebook、Twitter、邮件订阅等），发送相应的 AJAX 请求。
   * 如果请求成功且返回状态为成功，则更新任务的状态并记录成功信息。
   * 如果请求失败，则记录错误信息。
   * 最后，等待所有任务完成并返回结果。
   */
  async #do(): Promise<boolean> {
    try {
      const id = $('script').map((index, script) => {
        if (/\$\(document\)/gim.test(script.innerHTML)) {
          return [
            script.innerHTML.match(/"\/[\d]+"/gim)?.[0]?.match(/[\d]+/)?.[0],
            script.innerHTML.match(/"\/newsletter\/ajax\/subscribeprofile\/optin\/[\d]+"/gim)?.[0]?.match(/[\d]+/)?.[0]
          ];
        }
        return null;
      });
      if (id.length === 2) {
        const pro = [];
        const tasks = $('#giveawaysjoined a[class*=promo]');
        for (const task of tasks) {
          const promo = $(task);
          if (!promo.hasClass('buttonentered')) {
            const status = echoLog({ text: `${__('doing')}:${promo.parents('p').text()}...` });
            if (/facebookpromo|twitterpromo|visitpromo/gim.test(task.className)) {
              let text = '';
              if (promo.hasClass('facebookpromo')) {
                text = 'facebookpromo';
              } else if (promo.hasClass('twitterpromo')) {
                text = 'twitterpromo';
              } else {
                text = 'visitpromo';
              }

              pro.push(new Promise((resolve) => {
                $.ajax({
                  type: 'POST',
                  url: urlPath(`/giveaways/ajax/${text}/${id[0]}`),
                  timeout: 60000,
                  dataType: 'json',
                  data: { ajax: 't' },
                  error(response, error, exception) {
                    if (window.DEBUG) console.log('%cAuto-Task[Debug]:', 'color:red', { response, error, exception });
                    status.error('Error:An error has occurred performing the action requested. Please try again shortly.');
                    resolve(true);
                  },
                  success(response) {
                    if (response.success) {
                      status.success(`Success:${response.text}`);
                      promo.addClass('buttonentered').closest('p')
                        .html(promo.closest('p').find('span')
                          .html());
                      resolve(true);
                    } else {
                      status.error(`Error:${response.text}`);
                      resolve(true);
                    }
                  }
                });
              }));
            } else if (promo.hasClass('emailoptinpromo')) {
              pro.push(new Promise((resolve) => {
                $.ajax({
                  type: 'POST',
                  url: urlPath(`/newsletter/ajax/subscribeprofile/optin/${id[1]}`),
                  timeout: 60000,
                  dataType: 'json',
                  data: { ajax: 't', emailsystoggle: 4 },
                  error(response, error, exception) {
                    if (window.DEBUG) console.log('%cAuto-Task[Debug]:', 'color:red', { response, error, exception });
                    status.error('Error:An error has occurred performing the action requested. Please try again shortly.');
                    resolve(true);
                  },
                  success(response) {
                    if (response.success) {
                      status.success(`Success:${response.text}`);
                      promo.toggleClass('buttonentered').closest('p')
                        .html(promo.closest('p').find('span')
                          .html());
                      resolve(true);
                    } else {
                      status.error(`Error:${response.text}`);
                      resolve(true);
                    }
                  }
                });
              }));
            } else if (promo.hasClass('watchingpromo')) {
              pro.push(new Promise((resolve) => {
                const data = getUrlQuery(promo.attr('href'));
                data.ajax = 't';
                $.ajax({
                  type: 'POST',
                  url: urlPath(promo.attr('href')?.split(/[?#]/)[0]),
                  timeout: 60000,
                  dataType: 'json',
                  data,
                  error(response, error, exception) {
                    if (window.DEBUG) console.log('%cAuto-Task[Debug]:', 'color:red', { response, error, exception });
                    status.error('Error:An error has occurred performing the action requested. Please try again shortly.');
                    resolve(true);
                  },
                  success(response) {
                    if (response.success) {
                      status.success(`Success:${response.text}`);
                      promo.toggleClass('buttonentered').closest('p')
                        .html(promo.closest('p').find('span')
                          .html());
                      resolve(true);
                    } else {
                      status.error(`Error:${response.text}`);
                      resolve(true);
                    }
                  }
                });
              }));
            } else if (!/the-challenge-of-adblock/gim.test(promo.attr('href') as string)) {
              pro.push(new Promise((resolve) => {
                $.ajax({
                  type: 'POST',
                  url: urlPath(promo.attr('href')),
                  timeout: 60000,
                  dataType: 'json',
                  data: { ajax: 't' },
                  error(response, error, exception) {
                    if (window.DEBUG) console.log('%cAuto-Task[Debug]:', 'color:red', { response, error, exception });
                    status.error('Error:An error has occurred performing the action requested. Please try again shortly.');
                    resolve(true);
                  },
                  success(response) {
                    if (response.success) {
                      status.success(`Success:${response.text}`);
                      promo.toggleClass('buttonentered').closest('p')
                        .html(promo.closest('p').find('span')
                          .html());
                      resolve(true);
                    } else {
                      status.error(`Error:${response.text}`);
                      resolve(true);
                    }
                  }
                });
              }));
            } else {
              status.error(`Error:${__('unKnownTaskType')}`);
            }
          }
        }
        await Promise.all(pro);
        echoLog({}).success(__('allTasksComplete'));
        return true;
      }
      echoLog({}).error(__('getFailed', 'TaskId'));
      return false;
    } catch (error) {
      throwError(error as Error, 'Indiedb.classifyTask');
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
   * 如果启用且页面中存在“注册以加入”按钮，则重定向用户到登录页面。
   * 如果没有找到登录链接，则返回 true，表示用户已登录或不需要登录。
   */
  #checkLogin(): boolean {
    try {
      if (!globalOptions.other.checkLogin) return true;
      if ($('a.buttonenter:contains(Register to join)').length > 0) {
        window.open('/members/login', '_self');
      }
      return true;
    } catch (error) {
      throwError(error as Error, 'Indiedb.checkLogin');
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
   * 该方法检查全局选项中是否启用了检查剩余密钥的功能。
   * 如果启用且页面中存在“下次”或“抽奖已关闭”的按钮，则弹出警告框提示用户抽奖已结束。
   * 用户可以选择确认或取消，确认后将关闭窗口。
   * 如果没有错误发生，则返回 true。
   */
  async #checkLeftKey(): Promise<boolean> {
    try {
      if (!globalOptions.other.checkLeftKey) return true;
      if ($('a.buttonenter:contains("next time"), a.buttonenter:contains("Giveaway is closed")').length > 0) {
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
      throwError(error as Error, 'Indiedb.checkLeftKey');
      return false;
    }
  }
}

export default Indiedb;

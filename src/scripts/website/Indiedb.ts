/*
 * @Author       : HCLonely
 * @Date         : 2021-11-08 14:37:33
 * @LastEditTime : 2021-12-22 17:45:36
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

declare function urlPath(value?: string): string

class Indiedb {
  name = 'Indiedb'
  static test(): boolean {
    return window.location.host === 'www.indiedb.com';
  }
  async before(): Promise<void> {
    try {
      if (!this.#checkLogin()) {
        echoLog({ html: `<li><font class="warning>${__('checkLoginFailed')}</font></li>` });
      }
      if (!await this.#checkLeftKey()) {
        echoLog({ html: `<li><font class="warning>${__('checkLeftKeyFailed')}</font></li>` });
      }
    } catch (error) {
      throwError(error as Error, 'Indiedb.before');
    }
  }
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
  async #join(): Promise<boolean> {
    try {
      if ($('a.buttonenter:contains(Register to join)').length > 0) {
        echoLog({ html: `<li><font class="error">${__('needLogin')}</font></li>` });
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
      echoLog({ html: `<li><font class="warning">${__('needJoinGiveaway')}</font></li>` });
      return false;
    } catch (error) {
      throwError(error as Error, 'Indiedb.init');
      return false;
    }
  }
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

              pro.push(new Promise((resolve) => { // eslint-disable-line
                $.ajax({
                  type: 'POST',
                  url: urlPath(`/giveaways/ajax/${text}/${id[0]}`),
                  timeout: 60000,
                  dataType: 'json',
                  data: { ajax: 't' },
                  error(response, error, exception) {
                    console.log({ response, error, exception });
                    status.error('Error:An error has occurred performing the action requested. Please try again shortly.');
                    resolve(true);
                  },
                  success(response) {
                    console.log(response);
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
                    console.log({ response, error, exception });
                    status.error('Error:An error has occurred performing the action requested. Please try again shortly.');
                    resolve(true);
                  },
                  success(response) {
                    console.log(response);
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
                    console.log({ response, error, exception });
                    status.error('Error:An error has occurred performing the action requested. Please try again shortly.');
                    resolve(true);
                  },
                  success(response) {
                    console.log(response);
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
                    console.log({ response, error, exception });
                    status.error('Error:An error has occurred performing the action requested. Please try again shortly.');
                    resolve(true);
                  },
                  success(response) {
                    console.log(response);
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
        echoLog({ html: `<li><font class="success">${__('allTasksComplete')}</font></li>` });
        return true;
      }
      echoLog({ html: `<li><font class="error">${__('getFailed', 'TaskId')}</font></li>` });
      return false;
    } catch (error) {
      throwError(error as Error, 'Indiedb.classifyTask');
      return false;
    }
  }
  #checkLogin(): boolean {
    try {
      if ($('a.buttonenter:contains(Register to join)').length > 0) {
        window.open('/members/login', '_self');
      }
      return true;
    } catch (error) {
      throwError(error as Error, 'Indiedb.checkLogin');
      return false;
    }
  }
  async #checkLeftKey() {
    try {
      if ($('a.buttonenter:contains("next time")').length > 0) {
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

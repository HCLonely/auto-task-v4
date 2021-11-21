/*
 * @Author       : HCLonely
 * @Date         : 2021-11-14 17:22:20
 * @LastEditTime : 2021-11-21 16:33:59
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/website/OpiumPulses.ts
 * @Description  :
 */

import throwError from '../tools/throwError';
import echoLog from '../echoLog';
import __ from '../tools/i18n';
import httpRequest from '../tools/httpRequest';

declare function checkUser(params:string): void

class OpiumPulses {
  maxPoints = 0
  myPoints = 0

  static test(): boolean {
    return window.location.host === 'www.opiumpulses.com';
  }
  async before(): Promise<void> {
    try {
      if (!this.checkLogin()) {
        echoLog({ html: `<li><font class="warning>${__('checkLoginFailed')}</font></li>` });
      }
      // this.maxPoints = maxPoint; // todo: 读取
    } catch (error) {
      throwError(error as Error, 'OpiumPulses.before');
    }
  }
  async doFreeTask(): Promise<void> {
    try {
      this.#toggleTask('FREE');
    } catch (error) {
      throwError(error as Error, 'OpiumPulses.doFreeTask');
    }
  }
  async doPointTask(): Promise<void> {
    try {
      this.myPoints = parseInt($('.page-header__nav-func-user-nav-items.points-items').text()
        .match(/[\d]+/gim)?.[0] || '0', 10);
      this.#toggleTask('points');
    } catch (error) {
      throwError(error as Error, 'OpiumPulses.doPointTask');
    }
  }

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
          echoLog({ html: `<li><font class="warning">${__('noPoints')}: ${name}</font></li>` });
        } else if (type === 'points' && !needPoints) {
          echoLog({ html: `<li><font class="warning">${__('getNeedPointsFailed')}: ${name}</font></li>` });
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
            if (data?.responseText && /You've entered this giveaway/gim.test(data.responseText)) {
              logStatus.success();
              const points = data.responseText.match(/Points:[\s]*?([\d]+)/)?.[1];
              if (type === 'points' && points) {
                this.myPoints = parseInt(points, 10);
              }
            } else {
              logStatus.error(`Error:${data?.statusText}(${data?.status})`);
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
  init(): boolean {
    return true;
  }
  classifyTask(): boolean {
    return true;
  }
  checkLogin(): boolean {
    try {
      if ($('a[href*="/site/login"]').length > 0) {
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

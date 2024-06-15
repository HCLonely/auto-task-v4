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

  static test(): boolean {
    return window.location.host === 'www.opiumpulses.com';
  }
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
  init(): boolean {
    return true;
  }
  classifyTask(): boolean {
    return true;
  }
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

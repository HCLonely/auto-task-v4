/*
 * @Author       : HCLonely
 * @Date         : 2021-11-14 17:22:20
 * @LastEditTime : 2021-11-14 18:07:57
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/website/OpiumPulses.ts
 * @Description  :
 */

// todo: 未测试
import throwError from '../tools/throwError';
import echoLog from '../echoLog';
import getI18n from '../i18n/i18n';
import httpRequest from '../tools/httpRequest';

declare function checkUser(params:string): void

class OpiumPulses {
  maxPoints: number
  myPoints = 0

  constructor(maxPoint: number) {
    this.maxPoints = maxPoint;
  }
  test(): boolean {
    return window.location.host === 'www.opiumpulses.com';
  }
  async before(): Promise<void> {
    try {
      if (!this.checkLogin()) {
        echoLog({ type: 'checkLoginFailed' });
      }
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
        if (type === 'points' && needPoints > this.myPoints) {
          echoLog({ type: 'custom', text: `<li><font class="warning">${getI18n('noPoints')}</font></li>` });
        } else if (type === 'points' && !needPoints) {
          echoLog({ type: 'custom', text: `<li><font class="warning">${getI18n('getNeedPointsFailed')}</font></li>` });
        } else if (!(type === 'points' && needPoints > this.maxPoints)) {
          const logStatus = echoLog({ type: 'custom',
            text: `<li>${getI18n('joinLottery')}<a href="${$(item).find('a.giveaways-page-item-img-btn-more')
              .attr('href')}" target="_blank">${$(item).find('.giveaways-page-item-footer-name')
              .text()
              .trim()}</a>...<font></font></li>` });
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
                // if (debug) console.log(getI18n('pointsLeft') + points);
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
      echoLog({ type: 'custom', text: '<li>-----END-----</li>' });
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

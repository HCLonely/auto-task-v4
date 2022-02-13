/*
 * @Author       : HCLonely
 * @Date         : 2021-11-19 14:42:43
 * @LastEditTime : 2022-02-13 22:19:03
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/website/Gleam.ts
 * @Description  : https://gleam.io
 */

// eslint-disable-next-line
/// <reference path = "Gleam.d.ts" />

import Swal from 'sweetalert2';
import Website from './Website';
import throwError from '../tools/throwError';
import echoLog from '../echoLog';
import __ from '../tools/i18n';
import httpRequest from '../tools/httpRequest';
import { delay } from '../tools/tools';
import { globalOptions } from '../globalOptions';

const defaultTasksTemplate: gleamSocialTasks = {
  steam: {
    groupLinks: [],
    wishlistLinks: [],
    followLinks: [],
    curatorLinks: [],
    curatorLikeLinks: []
  },
  twitter: {
    userLinks: [],
    retweetLinks: []
  },
  twitch: {
    channelLinks: []
  },
  discord: {
    serverLinks: []
  },
  youtube: {
    channelLinks: []
  },
  extra: {
    gleam: []
  }
};
const defaultTasks = JSON.stringify(defaultTasksTemplate);
const defaultOptions: options = {
  vlootUsername: '',
  gameroundUsername: ''
};
class Gleam extends Website {
  name = 'Gleam';
  undoneTasks: gleamSocialTasks = JSON.parse(defaultTasks);
  socialTasks: gleamSocialTasks = JSON.parse(defaultTasks);
  options = {
    ...defaultOptions,
    ...GM_getValue<options>('GleamOptions')
  };
  buttons: Array<string> = [
    'doTask',
    'undoTask',
    'verifyTask'
  ];

  static test(): boolean {
    return window.location.host === 'gleam.io';
  }

  async after() {
    try {
      if (window.location.search.includes('8b07d23f4bfa65f9')) {
        const checkComplete = setInterval(() => {
          if ($('.entry-content .entry-method i.fa-check').length > 0) {
            clearInterval(checkComplete);
            window.close();
          }
        });
        for (const task of $('.entry-content .entry-method')) {
          const taskInfo = $(task).find('.user-links');
          const expandInfo = $(task).find('.expandable');
          const aElements = expandInfo.find('a.btn,a:contains(Continue),button:contains(Continue)');
          if (aElements.length > 0) {
            for (const element of aElements) {
              const $element = $(element);
              const href = $element.attr('href');
              $element.removeAttr('href')[0].click();
              $element.attr('href', href as string);
              await delay(1000);
            }
          }
          taskInfo[0].click();
          await delay(1000);
        }
        echoLog({}).warning(__('gleamTaskNotice'));
      } else if (!await this.#checkLeftKey()) {
        echoLog({}).warning(__('checkLeftKeyFailed'));
      }
    } catch (error) {
      throwError(error as Error, 'Gleam.after');
      return false;
    }
  }

  init(): boolean {
    try {
      const logStatus = echoLog({ text: __('initing') });
      if (!this.#getGiveawayId()) return false;
      this.initialized = true;
      logStatus.success();
      return true;
    } catch (error) {
      throwError(error as Error, 'Gleam.init');
      return false;
    }
  }

  async classifyTask(action: 'do' | 'undo'): Promise<boolean> {
    try {
      const logStatus = echoLog({ text: __('getTasksInfo') });
      if (action === 'undo') {
        this.socialTasks = GM_getValue<gleamGMTasks>(`gleamTasks-${this.giveawayId}`)?.tasks || JSON.parse(defaultTasks);
      }

      const tasks = $('.entry-content .entry-method');
      for (const task of tasks) {
        const $task = $(task);

        // 任务完成则跳过
        if (action === 'do' && $task.find('i.fa-question').length === 0) continue;

        const socialIcon = $task.find('.icon-wrapper i');
        const taskInfo = $task.find('.user-links');
        const taskText = taskInfo.text().trim();
        const expandInfo = $task.find('.expandable');
        const aElements = expandInfo.find('a.btn');
        if (aElements.length > 0) {
          for (const element of aElements) {
            const $element = $(element);
            const href = $element.attr('href');
            $element.removeAttr('href')[0].click();
            $element.attr('href', href as string);
          }
        }
        if (socialIcon.hasClass('fa-twitter')) {
          const link = $task.find('a[href^="https://twitter.com/"]').attr('href');
          if (!link) continue;
          if (/follow/gi.test(taskText)) {
            if (action === 'undo') this.socialTasks.twitter.userLinks.push(link);
            if (action === 'do') this.undoneTasks.twitter.userLinks.push(link);
          } else if (/retweet/gim.test(taskText)) {
            if (action === 'undo') this.socialTasks.twitter.retweetLinks.push(link);
            if (action === 'do') this.undoneTasks.twitter.retweetLinks.push(link);
          }
        } else if (socialIcon.hasClass('fa-twitch')) {
          if (/follow/gim.test(taskText)) {
            const link = $task.find('a[href^="https://twitch.tv/"]').attr('href');
            if (!link) continue;

            if (action === 'undo') this.socialTasks.twitch.channelLinks.push(link);
            if (action === 'do') this.undoneTasks.twitch.channelLinks.push(link);
          }
        } else if (socialIcon.hasClass('fa-discord')) {
          if (/join/gim.test(taskText)) {
            let link = $task.find('a[href^="https://discord.com/invite/"]').attr('href');
            if (!link) {
              const ggLink = $task.find('a[href^="https://discord.gg/"]').attr('href')
                ?.match(/discord\.gg\/([^/]+)/)?.[1];
              if (!ggLink) continue;
              link = `https://discord.com/invite/${ggLink}`;
            }

            if (action === 'undo') this.socialTasks.discord.serverLinks.push(link);
            if (action === 'do') this.undoneTasks.discord.serverLinks.push(link);
          }
        } else if (socialIcon.hasClass('fa-external-link-square-alt')) {
          // timer
          continue;
        } else if (socialIcon.hasClass('fa-youtube')) {
          if (/subscribe/gim.test(taskText)) {
            const link = $task.find('a[href^="https://www.youtube.com/channel/"]').attr('href');
            if (!link) continue;

            if (action === 'undo') this.socialTasks.youtube.channelLinks.push(link);
            if (action === 'do') this.undoneTasks.youtube.channelLinks.push(link);
          }
        } else if (socialIcon.attr('class')?.includes('steam')) {
          if (/join.*group/gi.test(taskText)) {
            const link = $task.find('a[href^="https://steamcommunity.com/groups/"]').attr('href');
            if (!link) continue;

            if (action === 'undo') this.socialTasks.steam.groupLinks.push(link);
            if (action === 'do') this.undoneTasks.steam.groupLinks.push(link);
          } else if (/follow.*curator/gi.test(taskText)) {
            const link = $task.find('a[href^="https://store.steampowered.com/curator/"]').attr('href');
            if (!link) continue;

            if (action === 'undo') this.socialTasks.steam.curatorLinks.push(link);
            if (action === 'do') this.undoneTasks.steam.curatorLinks.push(link);
          }
        } else if (socialIcon.hasClass('fa-shield') && taskText
          .includes('earn.vloot.io')) {
          const continueBtn = expandInfo.find('span:contains(Continue),button:contains(Continue)');
          for (const button of continueBtn) {
            button.click();
            await delay(500);
            expandInfo.find('input').val(this.options.vlootUsername);
          }
        } else if (socialIcon.hasClass('fa-gamepad-alt') && taskText
          .includes('Gameround')) {
          const continueBtn = expandInfo.find('span:contains(Continue),button:contains(Continue)');
          for (const button of continueBtn) {
            button.click();
            await delay(500);
            expandInfo.find('input').val(this.options.gameroundUsername);
          }
        } else if (socialIcon.hasClass('fa-bullhorn') && taskText
          .includes('Complete')) {
          if (action !== 'do') continue;

          const link = aElements.attr('href');
          if (!link) continue;

          const gleamLink = await this.#getGleamLink(link);
          if (!gleamLink) continue;

          this.undoneTasks.extra.gleam.push(gleamLink);
        } else if (
          socialIcon.hasClass('fa-question') ||
          socialIcon.hasClass('fa-reddit') ||
          socialIcon.hasClass('fa-instagram') ||
          socialIcon.hasClass('fa-facebook-f') ||
          socialIcon.hasClass('fa-telegram-plane') ||
          (socialIcon.hasClass('fa-shield') && taskText.includes('Check out'))
        ) {
          // skip
        } else {
          echoLog({}).warning(`${__('unKnownTaskType')}: ${taskText}`);
        }
      }

      logStatus.success();
      this.undoneTasks = this.uniqueTasks(this.undoneTasks) as gleamSocialTasks;
      this.socialTasks = this.uniqueTasks(this.socialTasks) as gleamSocialTasks;
      if (window.DEBUG) console.log('%cAuto-Task[Debug]:', 'color:blue', JSON.stringify(this));
      GM_setValue(`gleamTasks-${this.giveawayId}`, { tasks: this.socialTasks, time: new Date().getTime() });
      return true;
    } catch (error) {
      throwError(error as Error, 'Gleam.classifyTask');
      return false;
    }
  }

  async extraDoTask({ gleam }: { gleam: Array<string> }): Promise<boolean> {
    try {
      const pro = [];
      for (const link of gleam) {
        pro.push(this.#doGleamTask(link));
      }
      return Promise.all(pro).then(() => true);
    } catch (error) {
      throwError(error as Error, 'Gleam.extraDoTask');
      return false;
    }
  }

  async verifyTask() {
    try {
      echoLog({ text: `${__('verifyingTask')}...` });

      const tasks = $('.entry-content .entry-method');
      for (const task of tasks) {
        const $task = $(task);

        // 任务完成则跳过
        if ($task.find('i.fa-question').length === 0) continue;

        const taskInfo = $task.find('.user-links');
        taskInfo[0].click();
        await delay(500);
        await this.#checkSync();
        const continueBtn = $task.find('.expandable').find('span:contains(Continue),button:contains(Continue)');
        for (const button of continueBtn) {
          button.click();
          await delay(500);
          await this.#checkSync();
        }
      }
      echoLog({ text: __('verifiedGleamTasks') });
    } catch (error) {
      throwError(error as Error, 'Gleam.verifyTask');
      return false;
    }
  }

  async #checkSync():Promise<boolean> {
    try {
      return await new Promise((resolve) => {
        const checker = setInterval(() => {
          if ($('.entry-content .entry-method i.fa-sync').length === 0) {
            clearInterval(checker);
            resolve(true);
          }
        }, 500);
      });
    } catch (error) {
      throwError(error as Error, 'Gleam.checkSync');
      return false;
    }
  }
  async #doGleamTask(link: string): Promise<boolean> {
    try {
      const logStatus = echoLog({ text: __('doingGleamTask') });
      return await new Promise((resolve) => {
        GM_openInTab(`${link}?8b07d23f4bfa65f9`,
          { active: true, insert: true, setParent: true })
          .onclose = () => {
            logStatus.success();
            resolve(true);
          };
      });
    } catch (error) {
      throwError(error as Error, 'Gleam.doGleamTask');
      return false;
    }
  }
  #getGiveawayId(): boolean {
    try {
      const giveawayId = window.location.pathname;
      if (giveawayId) {
        this.giveawayId = giveawayId;
        return true;
      }
      echoLog({ text: __('getFailed', 'GiveawayId') });
      return false;
    } catch (error) {
      throwError(error as Error, 'Gleam.getGiveawayId');
      return false;
    }
  }
  async #getGleamLink(link: string): Promise<string | false> {
    try {
      const logStatus = echoLog({ text: __('gettingGleamLink') });
      const { result, statusText, status, data } = await httpRequest({
        url: link,
        method: 'GET'
      });
      if (result === 'Success') {
        if (data?.status === 200) {
          const gleamLink = data.responseText.match(/href="(https:\/\/gleam\.io\/.*?\/.+?)"/)?.[1];
          if (gleamLink) {
            logStatus.success();
            return gleamLink;
          }
          logStatus.error(`Error:${__('getLinkFailed')}`);
          return false;
        }
        logStatus.error(`Error:${data?.statusText}(${data?.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'Gleam.getGleamLink');
      return false;
    }
  }

  async #checkLeftKey() {
    try {
      if (!globalOptions.other.checkLeftKey) return true;
      const campaignString = $('div.popup-blocks-container').attr('ng-init')
        ?.match(/initCampaign\(([\w\W]+?)\)$/)?.[1];
      if (!campaignString) return false;
      const { campaign, incentive } = JSON.parse(campaignString);
      const controllerString = $('div.campaign.reward').attr('ng-init')
        ?.match(/initContestant\(([\w\W]+?)\);/)?.[1];
      let ownedKey = false;
      if (controllerString) {
        if (JSON.parse(controllerString).contestant?.claims?.incentives?.[incentive.id]?.length) {
          ownedKey = true;
        }
      }
      if (campaign.banned || (campaign.finished && !ownedKey) || campaign.paused || new Date().getTime() < (campaign.starts_at * 1000)) {
        await Swal.fire({
          icon: 'warning',
          title: __('notice'),
          text: __('giveawayNotWork'),
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
      throwError(error as Error, 'Gleam.checkLeftKey');
      return false;
    }
  }
}

export default Gleam;

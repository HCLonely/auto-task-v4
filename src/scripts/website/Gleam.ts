/*
 * @Author       : HCLonely
 * @Date         : 2021-11-19 14:42:43
 * @LastEditTime : 2021-11-21 16:20:13
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/website/Gleam.ts
 * @Description  :
 */

import Website from './Website';
import throwError from '../tools/throwError';
import echoLog from '../echoLog';
import __ from '../tools/i18n';

interface gleamSocialTasks {
  steam: {
    groupLinks: Array<string>
    wishlistLinks: Array<string>
    followLinks: Array<string>
    curatorLinks: Array<string>
    curatorLikeLinks: Array<string>
  }
  twitter: {
    userLinks: Array<string>
    retweetLinks: Array<string>
  }
  twitch: {
    channelLinks: Array<string>
  }
  discord: {
    serverLinks: Array<string>
  }
  youtube: {
    channelLinks: Array<string>
  }
}

const defaultTasks: gleamSocialTasks = {
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
  }
};

class Gleam extends Website {
  undoneTasks: gleamSocialTasks = { ...defaultTasks }
  socialTasks: gleamSocialTasks = { ...defaultTasks }

  static test(): boolean {
    return window.location.host === 'gleam.io';
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
      this.socialTasks = GM_getValue<gleamSocialTasks>(`gleamTasks-${this.giveawayId}`) || { ...defaultTasks }; // eslint-disable-line new-cap

      const tasks = $('.entry-content .entry-method');
      for (const task of tasks) {
        const $task = $(task);

        // 任务完成则跳过
        if (action === 'do' && $task.find('i.fa-question').length  === 0) continue;

        const socialIcon = $task.find('.icon-wrapper i');
        const taskInfo = $task.find('.user-links');
        // const expandInfo = $task.find('.expandable');
        if (socialIcon.hasClass('fa-twitter')) {
          const link = $task.find('a[href^="https://twitter.com/"]').attr('href');
          if (!link) continue;
          if (/follow/gi.test(taskInfo.text().trim())) {
            if (action === 'undo') this.socialTasks.twitter.userLinks.push(link);
            if (action === 'do') this.undoneTasks.twitter.userLinks.push(link);
          } else if (/retweet/gim.test(taskInfo.text().trim())) {
            if (action === 'undo') this.socialTasks.twitter.retweetLinks.push(link);
            if (action === 'do') this.undoneTasks.twitter.retweetLinks.push(link);
          }
        } else if (socialIcon.hasClass('fa-twitch')) {
          if (/follow/gim.test(taskInfo.text().trim())) {
            const link = $task.find('a[href^="https://twitch.tv/"]').attr('href');
            if (!link) continue;

            if (action === 'undo') this.socialTasks.twitch.channelLinks.push(link);
            if (action === 'do') this.undoneTasks.twitch.channelLinks.push(link);
          }
        } else if (socialIcon.hasClass('fa-discord')) {
          if (/join/gim.test(taskInfo.text().trim())) {
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
          if (/subscribe/gim.test(taskInfo.text().trim())) {
            const link = $task.find('a[href^="https://www.youtube.com/channel/"]').attr('href');
            if (!link) continue;

            if (action === 'undo') this.socialTasks.youtube.channelLinks.push(link);
            if (action === 'do') this.undoneTasks.youtube.channelLinks.push(link);
          }
        } else if (socialIcon.attr('class')?.includes('steam')) {
          if (/join.*group/gi.test(taskInfo.text().trim())) {
            const link = $task.find('a[href^="https://steamcommunity.com/groups/"]').attr('href');
            if (!link) continue;

            if (action === 'undo') this.socialTasks.steam.groupLinks.push(link);
            if (action === 'do') this.undoneTasks.steam.groupLinks.push(link);
          } else if (/follow.*curator/gi.test(taskInfo.text().trim())) {
            const link = $task.find('a[href^="https://store.steampowered.com/curator/"]').attr('href');
            if (!link) continue;

            if (action === 'undo') this.socialTasks.steam.curatorLinks.push(link);
            if (action === 'do') this.undoneTasks.steam.curatorLinks.push(link);
          }
        } else if (socialIcon.attr('class')?.includes('fa-question')) {
          // skip
        } else {
          echoLog({ html: `<li><font class="warning">${__('unKnownTaskType')}: ${taskInfo.text().trim()}</font></li>` });
        }
      }

      logStatus.success();
      this.undoneTasks = this.uniqueTasks(this.undoneTasks) as gleamSocialTasks;
      this.socialTasks = this.uniqueTasks(this.socialTasks) as gleamSocialTasks;
      GM_setValue(`gleamTasks${this.giveawayId}`, this.socialTasks); // eslint-disable-line new-cap
      return true;
    } catch (error) {
      throwError(error as Error, 'Gleam.classifyTask');
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
}

export default Gleam;

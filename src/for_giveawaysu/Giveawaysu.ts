/*
 * @Author       : HCLonely
 * @Date         : 2021-11-08 10:37:13
 * @LastEditTime : 2022-05-18 10:00:20
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/for_giveawaysu/Giveawaysu.ts
 * @Description  : https://giveaway.su/
 */

// eslint-disable-next-line
/// <reference path = "GiveawaySu.d.ts" />

import Swal from 'sweetalert2';
import throwError from '../scripts/tools/throwError';
import echoLog from '../scripts/echoLog';
import __ from '../scripts/tools/i18n';
import { delay, getRedirectLink, unique } from '../scripts/tools/tools';
import { globalOptions } from '../scripts/globalOptions';

import Discord from '../scripts/social/Discord';
import Instagram from '../scripts/social/Instagram';
import Reddit from '../scripts/social/Reddit';
import Twitch from '../scripts/social/Twitch';
import Vk from '../scripts/social/Vk';
import { Youtube } from '../scripts/social/Youtube';
import Steam from '../scripts/social/Steam';

const defaultTasks: gasSocialTasks = {
  steam: {
    groupLinks: [],
    wishlistLinks: [],
    curatorLinks: [],
    curatorLikeLinks: [],
    followLinks: [],
    forumLinks: [],
    announcementLinks: [],
    workshopVoteLinks: [],
    playtestLinks: []
  },
  discord: {
    serverLinks: []
  },
  instagram: {
    userLinks: []
  },
  vk: {
    nameLinks: []
  },
  twitch: {
    channelLinks: []
  },
  reddit: {
    redditLinks: []
  },
  youtube: {
    channelLinks: [],
    likeLinks: []
  }
};

class GiveawaySu {
  undoneTasks: gasSocialTasks = defaultTasks
  giveawayId!: string;
  socialInitialized: socialInitialized = {
    discord: false,
    instagram: false,
    reddit: false,
    twitch: false,
    vk: false,
    youtube: false,
    steamStore: false,
    steamCommunity: false,
    twitter: true
  };
  initialized = false;
  social: {
    discord?: Discord
    instagram?: Instagram
    reddit?: Reddit
    twitch?: Twitch
    vk?: Vk
    youtube?: Youtube
    steam?: Steam
  } = {}

  static test(): boolean {
    return /^https?:\/\/giveaway\.su\/giveaway\/view\/[\d]+/.test(window.location.href);
  }
  async after(): Promise<void> {
    try {
      if (!this.#checkLogin()) {
        echoLog({}).warning(__('checkLoginFailed'));
      }
      if (!await this.#checkLeftKey()) {
        echoLog({}).warning(__('checkLeftKeyFailed'));
      }
    } catch (error) {
      throwError(error as Error, 'Giveawaysu.after');
    }
  }
  init(): boolean {
    try {
      const logStatus = echoLog({ text: __('initing') });
      if ($('a.steam-login').length > 0) {
        window.open('/steam/redirect', '_self');
        logStatus.warning(__('needLogin'));
        return false;
      }
      if (!this.#getGiveawayId()) return false;
      this.initialized = true;
      logStatus.success();
      return true;
    } catch (error) {
      throwError(error as Error, 'Giveawaysu.init');
      return false;
    }
  }
  async #classifyTask(): Promise<boolean> {
    try {
      const logStatus = echoLog({ text: __('getTasksInfo') });

      const pro = [];
      const tasks = $('#actions tr');
      if ($('div.bind-discord').is(':visible')) $('div.bind-discord a')[0].click();
      if ($('div.bind-twitch').is(':visible')) $('div.bind-twitch a')[0].click();
      for (const task of tasks) {
        pro.push(new Promise((resolve) => {
          const td = $(task).find('td:not(".hidden")');
          const colorfulTask = td.eq(1).find('a:not([data-trigger="link"])');
          const colorlessTask = td.eq(2).find('a:not([data-trigger="link"])');
          const taskDes = colorfulTask.length > 0 ? colorfulTask : colorlessTask;
          const taskIcon = td.eq(0).find('i')
            .attr('class') || '';
          const taskName = taskDes.text().trim();
          if (taskIcon.includes('ban') || /disable adblock/gi.test(taskName)) {
            return resolve(true);
          }

          getRedirectLink(taskDes.attr('href')).then((taskLink) => {
            if (!taskLink) {
              return resolve(false);
            }
            if (taskIcon.includes('steam') && /join/gi.test(taskName)) {
              this.undoneTasks.steam.groupLinks.push(taskLink);
            } else if (/like.*announcement/gi.test(taskName)) {
              this.undoneTasks.steam.announcementLinks.push(taskLink);
            } else if (/(follow|subscribe).*curator/gim.test(taskName) && /^https?:\/\/store\.steampowered\.com\/curator\//.test(taskLink)) {
              this.undoneTasks.steam.curatorLinks.push(taskLink);
            } else if (taskIcon.includes('steam') && /follow|subscribe/gim.test(taskName)) {
              this.undoneTasks.steam.curatorLikeLinks.push(taskLink);
            } else if (/subscribe.*steam.*forum/gim.test(taskName)) {
              this.undoneTasks.steam.forumLinks.push(taskLink);
            } else if (taskIcon.includes('thumbs-up') && /^https?:\/\/steamcommunity\.com\/sharedfiles\/filedetails\/\?id=[\d]+/.test(taskLink)) {
              this.undoneTasks.steam.workshopVoteLinks.push(taskLink);
            } else if (taskIcon.includes('plus') && /request.*playtest/gim.test(taskName)) {
              this.undoneTasks.steam.playtestLinks.push(taskLink);
            } else if (taskIcon.includes('discord') || /join.*discord/gim.test(taskName)) {
              this.undoneTasks.discord.serverLinks.push(taskLink);
            } else if (taskIcon.includes('instagram') || /follow.*instagram/gim.test(taskName)) {
              this.undoneTasks.instagram.userLinks.push(taskLink);
            } else if (taskIcon.includes('twitch') || /follow.*twitch.*channel/gim.test(taskName)) {
              this.undoneTasks.twitch.channelLinks.push(taskLink);
            } else if (taskIcon.includes('reddit') || /subscribe.*subreddit/gim.test(taskName) || /follow.*reddit/gim.test(taskName)) {
              this.undoneTasks.reddit.redditLinks.push(taskLink);
            } else if (/watch.*art/gim.test(taskName)) {
              this.undoneTasks.steam.workshopVoteLinks.push(taskLink);
            } else if (/subscribe.*youtube.*channel/gim.test(taskName)) {
              this.undoneTasks.youtube.channelLinks.push(taskLink);
            } else if (/(watch|like).*youtube.*video/gim.test(taskName) ||
              ((taskIcon.includes('youtube') || taskIcon.includes('thumbs-up')) && /(watch|like).*video/gim.test(taskName))) {
              this.undoneTasks.youtube.likeLinks.push(taskLink);
            } else if (taskIcon.includes('vk') || /join.*vk.*group/gim.test(taskName)) {
              this.undoneTasks.vk.nameLinks.push(taskLink);
            } else {
              if (/(on twitter)|(Follow.*on.*Facebook)/gim.test(taskName)) {
                // this.taskInfo.links.push(link)
              } else {
                if (/wishlist.*game|add.*wishlist/gim.test(taskName)) {
                  this.undoneTasks.steam.wishlistLinks.push(taskLink);
                }
                if (/follow.*button/gim.test(taskName)) {
                  this.undoneTasks.steam.followLinks.push(taskLink);
                }
              }
            }
            resolve(true);
          })
            .catch((error) => {
              throwError(error as Error, 'Giveawaysu.classifyTask->getRedirectLink');
              return false;
            });
        }));
      }
      await Promise.all(pro);
      logStatus.success();
      this.undoneTasks = this.#uniqueTasks(this.undoneTasks) as gasSocialTasks;
      return true;
    } catch (error) {
      throwError(error as Error, 'Giveawaysu.classifyTask');
      return false;
    }
  }
  #checkLogin(): boolean {
    try {
      if (!globalOptions.other.checkLogin) return true;

      if ($('a.steam-login').length > 0) {
        window.open('/steam/redirect', '_self');
      }
      return true;
    } catch (error) {
      throwError(error as Error, 'Giveawaysu.checkLogin');
      return false;
    }
  }
  async #checkLeftKey(): Promise<boolean> {
    try {
      if (!globalOptions.other.checkLeftKey) return true;
      if ($('.giveaway-ended').length > 0) {
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
      }
      return true;
    } catch (error) {
      throwError(error as Error, 'Giveawaysu.checkLeftKey');
      return false;
    }
  }

  #getGiveawayId() {
    const giveawayId = window.location.href.match(/\/view\/([\d]+)/)?.[1];
    if (giveawayId) {
      this.giveawayId = giveawayId;
      return true;
    }
    echoLog({ text: __('getFailed', 'GiveawayId') });
    return false;
  }

  async #bind(name: string, init: Promise<boolean | 'skip'>): Promise<bindReturn> {
    try {
      return { name, result: await init };
    } catch (error) {
      throwError(error as Error, 'GiveawaySu.bind');
      return { name, result: false };
    }
  }
  async #initSocial(): Promise<boolean> {
    try {
      const pro = [];
      const tasks = this.undoneTasks;
      if (tasks.discord) {
        const hasDiscord = Object.values(tasks.discord).reduce((total, arr) => [...total, ...arr]).length > 0;
        if (hasDiscord && !this.socialInitialized.discord) {
          this.social.discord = new Discord();
          pro.push(this.#bind('discord', this.social.discord.init()));
        }
      }
      if (tasks.instagram) {
        const hasInstagram = Object.values(tasks.instagram).reduce((total, arr) => [...total, ...arr]).length > 0;
        if (hasInstagram && !this.socialInitialized.instagram) {
          this.social.instagram = new Instagram();
          pro.push(this.#bind('instagram', this.social.instagram.init()));
        }
      }
      if (tasks.reddit) {
        const hasReddit = Object.values(tasks.reddit).reduce((total, arr) => [...total, ...arr]).length > 0;
        if (hasReddit && !this.socialInitialized.reddit) {
          this.social.reddit = new Reddit();
          pro.push(this.#bind('reddit', this.social.reddit.init()));
        }
      }
      if (tasks.twitch) {
        const hasTwitch = Object.values(tasks.twitch).reduce((total, arr) => [...total, ...arr]).length > 0;
        if (hasTwitch && !this.socialInitialized.twitch) {
          this.social.twitch = new Twitch();
          pro.push(this.#bind('twitch', this.social.twitch.init()));
        }
      }
      if (tasks.vk) {
        const hasVk = Object.values(tasks.vk).reduce((total, arr) => [...total, ...arr]).length > 0;
        if (hasVk && !this.socialInitialized.vk) {
          this.social.vk = new Vk();
          pro.push(this.#bind('vk', this.social.vk.init()));
        }
      }
      if (tasks.youtube) {
        const hasYoutube = Object.values(tasks.youtube).reduce((total, arr) => [...total, ...arr]).length > 0;
        if (hasYoutube && !this.socialInitialized.youtube) {
          this.social.youtube = new Youtube();
          pro.push(this.#bind('youtube', this.social.youtube.init()));
        }
      }
      if (tasks.steam) {
        const steamLength = Object.values(tasks.steam).reduce((total, arr) => [...total, ...arr]).length;
        if (steamLength > 0) {
          if (!this.social.steam) this.social.steam = new Steam();
          const steamCommunityLength = Object.keys(tasks.steam).map((type) => (
            ['groupLinks', 'forumLinks', 'workshopLinks', 'workshopVoteLinks'].includes(type) ?
              (tasks.steam?.[type as keyof typeof tasks.steam]?.length || 0) : 0))
            .reduce((total, number) => total + number, 0);
          if (steamLength - steamCommunityLength > 0 && !this.socialInitialized.steamStore) {
            pro.push(this.#bind('steamStore', this.social.steam.init('store')));
          }
          if (steamCommunityLength > 0 && !this.socialInitialized.steamCommunity) {
            pro.push(this.#bind('steamCommunity', this.social.steam.init('community')));
          }
        }
      }

      return await Promise.all(pro).then((result) => {
        let checked = true;
        for (const data of result) {
          if (data.result) {
            // @ts-ignore
            this.socialInitialized[data.name] = data.result;
          } else {
            checked = false;
          }
        }
        return checked;
      });
    } catch (error) {
      throwError(error as Error, 'GiveawaySu.initSocial');
      return false;
    }
  }
  #uniqueTasks(allTasks: webSocialTasks): webSocialTasks {
    const result: webSocialTasks = {};
    for (const [social, types] of Object.entries(allTasks)) {
      result[social as socialType] = {};
      for (const [type, tasks] of Object.entries(types)) {
        // @ts-ignore
        result[social][type] = unique(tasks as Array<string>);
      }
    }
    return result;
  }
  async #toggleTask(): Promise<boolean> {
    try {
      if (!this.initialized && !this.init()) {
        return false;
      }
      if (!(await this.#classifyTask())) {
        return false;
      }
      if (!(await this.#initSocial())) {
        return false;
      }
      const pro = [];
      const doTask = true;
      const tasks = this.undoneTasks;
      if (this.socialInitialized.discord !== 'skip' && this.social.discord) {
        pro.push(this.social.discord.toggle({ doTask, ...tasks.discord }));
      }
      if (this.social.instagram) {
        pro.push(this.social.instagram.toggle({ doTask, ...tasks.instagram }));
      }
      if (this.social.reddit) {
        pro.push(this.social.reddit.toggle({ doTask, ...tasks.reddit }));
      }
      if (this.social.twitch) {
        pro.push(this.social.twitch.toggle({ doTask, ...tasks.twitch }));
      }
      if (this.social.vk) {
        pro.push(this.social.vk.toggle({ doTask, ...tasks.vk }));
      }
      if (this.social.youtube) {
        pro.push(this.social.youtube.toggle({ doTask, ...tasks.youtube }));
      }
      if (this.social.steam) {
        pro.push(this.social.steam.toggle({ doTask, ...tasks.steam }));
      }
      await Promise.all(pro);
      echoLog({}).success(__('allTasksComplete'));
      return true;
    } catch (error) {
      throwError(error as Error, 'GiveawaySu.toggleTask');
      return false;
    }
  }
  async doTask(): Promise<boolean> {
    try {
      $('#getKey').on('click', () => {
        $('#auto-task-info-div').remove();
        $(window.STYLE).remove();
        $('#getKey').off();
      });
      return await this.#toggleTask();
    } catch (error) {
      throwError(error as Error, 'GiveawaySu.doTask');
      return false;
    }
  }
  async verifyTask(): Promise<void> {
    try {
      const tasks = $('#actions tr');
      for (const task of tasks) {
        const $task = $(task);
        if ($task.attr('data-action-id') !== 'adjs') {
          const icon = $task.find('i.glyphicon-refresh');
          const button = icon.parent();
          if (button.prop('tagName') === 'A') {
            const href = button.attr('href') as string;
            button.attr('href', 'javascript:void(0);').attr('target', '_self')[0].click();
            button.attr('href', href);
            continue;
          }
          if (!icon.hasClass('spin') && !icon.hasClass('glyphicon-ok')) {
            button[0].click();
            await delay(1000);
          }
        }
      }
    } catch (error) {
      throwError(error as Error, 'GiveawaySu.verifyTask');
    }
  }
}

export default GiveawaySu;

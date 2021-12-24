/*
 * @Author       : HCLonely
 * @Date         : 2021-11-04 14:02:28
 * @LastEditTime : 2021-12-24 16:21:36
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/website/Website.ts
 * @Description  :
 */

// eslint-disable-next-line
/// <reference path = "Website.d.ts" />

import throwError from '../tools/throwError';
import Discord from '../social/Discord';
import Instagram from '../social/Instagram';
import Reddit from '../social/Reddit';
import Twitch from '../social/Twitch';
import Twitter from '../social/Twitter';
import Vk from '../social/Vk';
import { Youtube } from '../social/Youtube';
import Steam from '../social/Steam';
import { unique, visitLink } from '../tools/tools';
import echoLog from '../echoLog';
import __ from '../tools/i18n';

abstract class Website {
  undoneTasks!: webSocialTasks;
  socialTasks!: webSocialTasks;
  giveawayId!: string;
  protected socialInitialized = {
    discord: false,
    instagram: false,
    reddit: false,
    twitch: false,
    twitter: false,
    vk: false,
    youtube: false,
    steam: false
  };
  protected initialized = false;
  protected social: {
    discord?: Discord
    instagram?: Instagram
    reddit?: Reddit
    twitch?: Twitch
    twitter?: Twitter
    vk?: Vk
    youtube?: Youtube
    steam?: Steam
    visitLink?: (link: string, options?: MonkeyXhrDetails) => Promise<boolean>
  } = {}

  abstract classifyTask(action: 'do' | 'undo' | 'verify'): Promise<boolean> | boolean
  abstract init(): boolean | Promise<boolean>

  async #bind(name: string, init: Promise<boolean>):Promise<bindReturn> {
    try {
      return { name, result: await init };
    } catch (error) {
      throwError(error as Error, 'Website.bind');
      return { name, result: false };
    }
  }
  protected async initSocial(action: string): Promise<boolean> {
    try {
      const pro = [];
      const tasks = action === 'do' ? this.undoneTasks : this.socialTasks;
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
      if (tasks.twitter) {
        const hasTwitter = Object.values(tasks.twitter).reduce((total, arr) => [...total, ...arr]).length > 0;
        if (hasTwitter && !this.socialInitialized.twitter) {
          this.social.twitter = new Twitter();
          pro.push(this.#bind('twitter', this.social.twitter.init()));
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
        const hasSteam = Object.values(tasks.steam).reduce((total, arr) => [...total, ...arr]).length > 0;
        if (hasSteam && !this.socialInitialized.steam) {
          this.social.steam = new Steam();
          pro.push(this.#bind('steam', this.social.steam.init()));
        }
      }
      if (tasks.links && tasks.links.length > 0) {
        this.social.visitLink = visitLink;
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
      throwError(error as Error, 'Website.initSocial');
      return false;
    }
  }
  protected uniqueTasks(allTasks: webSocialTasks): webSocialTasks {
    const result: webSocialTasks = {};
    for (const [social, types] of Object.entries(allTasks)) {
      result[social as socialType] = {};
      for (const [type, tasks] of Object.entries(types)) {
        // eslint-disable-next-line
        // @ts-ignore
        result[social][type] = unique(tasks as Array<string>);
      }
    }
    return result;
  }
  protected async toggleTask(action: 'do' | 'undo'): Promise<boolean> {
    try {
      if (!this.initialized && !this.init()) {
        return false;
      }
      if (!(await this.classifyTask(action))) {
        return false;
      }
      if (!(await this.initSocial(action))) {
        return false;
      }
      const pro = [];
      const doTask = action === 'do';
      const tasks = doTask ? this.undoneTasks : this.socialTasks;
      if (this.social.discord) {
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
      if (this.social.twitter) {
        pro.push(this.social.twitter.toggle({ doTask, ...tasks.twitter }));
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
      if (this.social.visitLink && tasks.links && doTask) {
        for (const link of tasks.links) {
          pro.push(this.social.visitLink(link));
        }
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (doTask && tasks.extra && this.extraDoTask) {
        const hasExtra = Object.values(tasks.extra).reduce((total, arr) => [...total, ...arr]).length > 0;
        if (hasExtra) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          pro.push(this.extraDoTask(tasks.extra));
        }
      }
      await Promise.all(pro);
      echoLog({ html: `<li><font class="success">${__('allTasksComplete')}</font></li>` });
      return true;
    } catch (error) {
      throwError(error as Error, 'Website.toggleTask');
      return false;
    }
  }
  protected async doTask(): Promise<boolean> {
    try {
      return await this.toggleTask('do');
    } catch (error) {
      throwError(error as Error, 'Website.doTask');
      return false;
    }
  }
  protected async undoTask(): Promise<boolean> {
    try {
      return await this.toggleTask('undo');
    } catch (error) {
      throwError(error as Error, 'Website.undoTask');
      return false;
    }
  }
  protected checkLogin(): boolean | Promise<boolean> {
    return true;
  }
  protected checkLeftKey(): boolean | Promise<boolean> {
    return true;
  }
}

export default Website;

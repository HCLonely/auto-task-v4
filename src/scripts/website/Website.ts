/*
 * @Author       : HCLonely
 * @Date         : 2021-11-04 14:02:28
 * @LastEditTime : 2021-11-05 14:28:05
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
import Youtube from '../social/Youtube';
import Steam from '../social/Steam';
import { unique } from '../tools/tools';

abstract class Website {
  protected socialInitialized = false;
  undoneTasks!: webSocialTasks;
  socialTasks!: webSocialTasks;
  protected social: {
    discord?: Discord
    instagram?: Instagram
    reddit?: Reddit
    twitch?: Twitch
    twitter?: Twitter
    vk?: Vk
    youtube?: Youtube
    steam?: Steam
  } = {}

  abstract test(): boolean
  abstract doTask(): Promise<boolean>
  abstract undoTask(): Promise<boolean>

  protected async initSocial(action: string): Promise<boolean> {
    try {
      if (this.socialInitialized) return true;
      const pro = [];
      const tasks = action === 'do' ? this.undoneTasks : this.socialTasks;
      if (tasks.discord) {
        const hasDiscord = Object.values(tasks.discord).reduce((total, arr) => [...total, ...arr]).length > 0;
        if (hasDiscord) {
          this.social.discord = new Discord();
          pro.push(this.social.discord.init());
        }
      }
      if (tasks.instagram) {
        const hasInstagram = Object.values(tasks.instagram).reduce((total, arr) => [...total, ...arr]).length > 0;
        if (hasInstagram) {
          this.social.instagram = new Instagram();
          pro.push(this.social.instagram.init());
        }
      }
      if (tasks.reddit) {
        const hasReddit = Object.values(tasks.reddit).reduce((total, arr) => [...total, ...arr]).length > 0;
        if (hasReddit) {
          this.social.reddit = new Reddit();
          pro.push(this.social.reddit.init());
        }
      }
      if (tasks.twitch) {
        const hasTwitch = Object.values(tasks.twitch).reduce((total, arr) => [...total, ...arr]).length > 0;
        if (hasTwitch) {
          this.social.twitch = new Twitch();
          pro.push(this.social.twitch.init());
        }
      }
      if (tasks.twitter) {
        const hasTwitter = Object.values(tasks.twitter).reduce((total, arr) => [...total, ...arr]).length > 0;
        if (hasTwitter) {
          this.social.twitter = new Twitter();
          pro.push(this.social.twitter.init());
        }
      }
      if (tasks.vk) {
        const hasVk = Object.values(tasks.vk).reduce((total, arr) => [...total, ...arr]).length > 0;
        if (hasVk) {
          this.social.vk = new Vk();
          pro.push(this.social.vk.init());
        }
      }
      if (tasks.youtube) {
        const hasYoutube = Object.values(tasks.youtube).reduce((total, arr) => [...total, ...arr]).length > 0;
        if (hasYoutube) {
          this.social.youtube = new Youtube();
          pro.push(this.social.youtube.init());
        }
      }
      if (tasks.steam) {
        const hasSteam = Object.values(tasks.steam).reduce((total, arr) => [...total, ...arr]).length > 0;
        if (hasSteam) {
          this.social.steam = new Steam();
          pro.push(this.social.steam.init());
        }
      }

      this.socialInitialized = await Promise.all(pro).then((data) => !data.includes(false));
      return this.socialInitialized;
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
        // todo
        // eslint-disable-next-line
        // @ts-ignore
        result[social][type] = unique(tasks as Array<string>);
      }
    }
    return result;
  }
}

export default Website;

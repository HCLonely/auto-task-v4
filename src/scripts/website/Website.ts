/*
 * @Author       : HCLonely
 * @Date         : 2021-11-04 14:02:28
 * @LastEditTime : 2022-05-18 09:49:52
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/website/Website.ts
 * @Description  :
 */

// eslint-disable-next-line
/// <reference path = "Website.d.ts" />

// import EventEmitter3 from 'eventemitter3';
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

/**
 * Website 类用于管理社交媒体任务的初始化和切换。
 *
 * @class
 * @property {Object} undoneTasks - 待处理的任务。
 * @property {Object} socialTasks - 社交媒体任务。
 * @property {string} giveawayId - 抽奖 ID。
 * @property {Object} socialInitialized - 各社交媒体的初始化状态。
 * @property {boolean} initialized - 是否已初始化。
 * @property {Object} social - 存储社交媒体实例。
 *
 * @method #bind - 绑定方法的私有异步方法。
 * @param {string} name - 绑定的名称。
 * @param {Promise<boolean | 'skip'>} init - 初始化的 Promise，可能返回 true、false 或 'skip'。
 * @returns {Promise<{name: string, result: boolean}>} 返回一个包含名称和结果的对象。
 * @throws {Error} 如果在检查过程中发生错误，将抛出错误。
 *
 * @method initSocial - 初始化社交媒体的方法。
 * @param {string} action - 要执行的操作类型，'do' 表示执行任务，'undo' 表示撤销任务。
 * @returns {Promise<boolean>} 如果初始化成功，则返回 true；否则返回 false。
 * @throws {Error} 如果在检查过程中发生错误，将抛出错误。
 *
 * @method uniqueTasks - 去重任务的保护方法。
 * @param {webSocialTasks} allTasks - 包含所有社交任务的对象。
 * @returns {webSocialTasks} 返回去重后的社交任务对象。
 * @throws {Error} 如果在检查过程中发生错误，将抛出错误。
 *
 * @method toggleTask - 切换任务的异步方法。
 * @param {'do' | 'undo'} action - 要执行的操作类型，'do' 表示执行任务，'undo' 表示撤销任务。
 * @returns {Promise<boolean>} 如果任务切换成功，则返回 true；否则返回 false。
 * @throws {Error} 如果在检查过程中发生错误，将抛出错误。
 *
 * @method doTask - 执行任务的异步方法。
 * @returns {Promise<boolean>} 如果任务成功执行，则返回 true；否则返回 false。
 * @throws {Error} 如果在检查过程中发生错误，将抛出错误。
 *
 * @method undoTask - 撤销任务的异步方法。
 * @returns {Promise<boolean>} 如果任务成功撤销，则返回 true；否则返回 false。
 * @throws {Error} 如果在检查过程中发生错误，将抛出错误。
 */
abstract class Website {
  abstract name: string
  abstract buttons: Array<string>
  undoneTasks!: webSocialTasks
  socialTasks!: webSocialTasks
  giveawayId!: string
  // EventEmitter!: EventEmitter3
  protected socialInitialized: socialInitialized = {
    discord: false,
    instagram: false,
    reddit: false,
    twitch: false,
    twitter: false,
    vk: false,
    youtube: false,
    steamStore: false,
    steamCommunity: false
  }
  protected initialized = false
  protected steamTaskType = {
    steamStore: false,
    steamCommunity: false
  }
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

  // constructor(EventEmitter: EventEmitter3) {
  //   this.EventEmitter = EventEmitter;
  // }
  /**
   * 分类任务的抽象方法
   *
   * @param {'do' | 'undo' | 'verify'} action - 要执行的操作类型，'do' 表示执行任务，'undo' 表示撤销任务，'verify' 表示验证任务。
   * @returns {Promise<boolean> | boolean} 如果任务分类成功，则返回 true；否则返回 false。
   *
   * @throws {Error} 如果在分类过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法用于根据传入的操作类型分类任务。
   * 子类需要实现该方法以处理具体的任务分类逻辑。
   */
  abstract classifyTask(action: 'do' | 'undo' | 'verify'): Promise<boolean> | boolean;

  /**
   * 初始化方法
   *
   * @returns {boolean | 'skip' | Promise<boolean | 'skip'>} 如果初始化成功，则返回 true；如果跳过初始化，则返回 'skip'；如果是异步操作，则返回 Promise。
   *
   * @throws {Error} 如果在初始化过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法用于初始化相关设置或状态。
   * 子类需要实现该方法以处理具体的初始化逻辑。
   * 如果初始化成功，返回 true；如果需要跳过初始化，返回 'skip'；如果是异步操作，返回一个 Promise。
   */
  abstract init(): boolean | 'skip' | Promise<boolean | 'skip'>;

  /**
   * 绑定方法的私有异步方法
   *
   * @param {string} name - 绑定的名称。
   * @param {Promise<boolean | 'skip'>} init - 初始化的 Promise，可能返回 true、false 或 'skip'。
   * @returns {Promise<bindReturn>} 返回一个包含名称和结果的对象。
   *
   * @throws {Error} 如果在绑定过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法用于绑定指定名称的任务，并等待初始化的 Promise 完成。
   * 如果初始化成功，则返回包含名称和结果的对象；如果发生错误，则记录错误信息并返回结果为 false 的对象。
   */
  async #bind(name: string, init: Promise<boolean | 'skip'>): Promise<bindReturn> {
    try {
      return { name, result: await init };
    } catch (error) {
      throwError(error as Error, 'Website.bind');
      return { name, result: false };
    }
  }

  /**
   * 初始化社交媒体的方法
   *
   * @param {string} action - 要执行的操作类型，'do' 表示执行任务，'undo' 表示撤销任务。
   * @returns {Promise<boolean>} 如果初始化成功，则返回 true；否则返回 false。
   *
   * @throws {Error} 如果在初始化过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法根据传入的操作类型初始化社交媒体任务。
   * 检查每种社交媒体类型（如 Discord、Instagram、Reddit、Twitch、Twitter、VK 和 YouTube）是否有待处理的任务。
   * 如果存在待处理的任务且社交媒体尚未初始化，则创建相应的社交媒体实例并调用其初始化方法。
   * 所有初始化操作的结果将通过 Promise.all 进行处理，最终返回所有操作的成功状态。
   */
  protected async initSocial(action: string): Promise<boolean> {
    try {
      const pro = [];
      const tasks = action === 'do' ? this.undoneTasks : this.socialTasks;

      // 检查 Discord 任务
      if (tasks.discord) {
        const hasDiscord = Object.values(tasks.discord).reduce((total, arr) => [...total, ...arr]).length > 0;
        if (hasDiscord && (!this.socialInitialized.discord || !this.social.discord)) {
          this.social.discord = new Discord();
          pro.push(this.#bind('discord', this.social.discord.init(action)));
        }
      }

      // 检查 Instagram 任务
      if (tasks.instagram) {
        const hasInstagram = Object.values(tasks.instagram).reduce((total, arr) => [...total, ...arr]).length > 0;
        if (hasInstagram && (!this.socialInitialized.instagram || !this.social.instagram)) {
          this.social.instagram = new Instagram();
          pro.push(this.#bind('instagram', this.social.instagram.init()));
        }
      }

      // 检查 Reddit 任务
      if (tasks.reddit) {
        const hasReddit = Object.values(tasks.reddit).reduce((total, arr) => [...total, ...arr]).length > 0;
        if (hasReddit && (!this.socialInitialized.reddit || !this.social.reddit)) {
          this.social.reddit = new Reddit();
          pro.push(this.#bind('reddit', this.social.reddit.init()));
        }
      }

      // 检查 Twitch 任务
      if (tasks.twitch) {
        const hasTwitch = Object.values(tasks.twitch).reduce((total, arr) => [...total, ...arr]).length > 0;
        if (hasTwitch && (!this.socialInitialized.twitch || !this.social.twitch)) {
          this.social.twitch = new Twitch();
          pro.push(this.#bind('twitch', this.social.twitch.init()));
        }
      }

      // 检查 Twitter 任务
      if (tasks.twitter) {
        const hasTwitter = Object.values(tasks.twitter).reduce((total, arr) => [...total, ...arr]).length > 0;
        if (hasTwitter && (!this.socialInitialized.twitter || !this.social.twitter)) {
          this.social.twitter = new Twitter();
          pro.push(this.#bind('twitter', this.social.twitter.init()));
        }
      }

      // 检查 VK 任务
      if (tasks.vk) {
        const hasVk = Object.values(tasks.vk).reduce((total, arr) => [...total, ...arr]).length > 0;
        if (hasVk && (!this.socialInitialized.vk || !this.social.vk)) {
          this.social.vk = new Vk();
          pro.push(this.#bind('vk', this.social.vk.init()));
        }
      }

      // 检查 YouTube 任务
      if (tasks.youtube) {
        const hasYoutube = Object.values(tasks.youtube).reduce((total, arr) => [...total, ...arr]).length > 0;
        if (hasYoutube && (!this.socialInitialized.youtube || !this.social.youtube)) {
          this.social.youtube = new Youtube();
          pro.push(this.#bind('youtube', this.social.youtube.init()));
        }
      }

      // 检查 Steam 任务
      if (tasks.steam) {
        const steamLength = Object.values(tasks.steam).reduce((total, arr) => [...total, ...arr]).length;
        if (steamLength > 0) {
          if (!this.social.steam) this.social.steam = new Steam();
          const steamCommunityLength = Object.keys(tasks.steam).map((type) => (
            ['groupLinks', 'officialGroupLinks', 'forumLinks', 'workshopLinks', 'workshopVoteLinks'].includes(type) ?
              (tasks.steam?.[type as keyof typeof tasks.steam]?.length || 0) : 0))
            .reduce((total, number) => total + number, 0);
          if (steamLength - steamCommunityLength > 0) {
            this.steamTaskType.steamStore = true;
            if (!this.socialInitialized.steamStore) {
              pro.push(this.#bind('steamStore', this.social.steam.init('store')));
            }
          }
          if (steamCommunityLength > 0) {
            if (!this.socialInitialized.steamCommunity) {
              this.steamTaskType.steamCommunity = true;
              pro.push(this.#bind('steamCommunity', this.social.steam.init('community')));
            }
          }
        }
      }

      // 处理链接任务
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

  /**
   * 去重任务的保护方法
   *
   * @param {webSocialTasks} allTasks - 包含所有社交任务的对象。
   * @returns {webSocialTasks} 返回去重后的社交任务对象。
   *
   * @throws {Error} 如果在绑定过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法遍历传入的所有社交任务，针对每种社交媒体类型和任务类型进行去重处理。
   * 使用 `unique` 函数对每种任务类型的任务数组进行去重，并将结果存储在新的对象中。
   * 最后返回去重后的社交任务对象。
   */
  protected uniqueTasks(allTasks: webSocialTasks): webSocialTasks {
    try {
      const result: webSocialTasks = {};
      for (const [social, types] of Object.entries(allTasks)) {
        result[social as socialType] = {};
        for (const [type, tasks] of Object.entries(types)) {
        // @ts-ignore
          result[social][type] = unique(tasks as Array<string>);
        }
      }
      return result;
    } catch (error) {
      throwError(error as Error, 'Website.uniqueTasks');
      return allTasks;
    }
  }

  /**
   * 切换任务的异步方法
   *
   * @param {'do' | 'undo'} action - 要执行的操作类型，'do' 表示执行任务，'undo' 表示撤销任务。
   * @returns {Promise<boolean>} 如果任务切换成功，则返回 true；否则返回 false。
   *
   * @throws {Error} 如果在切换过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法根据传入的操作类型切换任务状态。
   * 首先检查是否已初始化，如果未初始化则调用初始化方法。
   * 然后根据操作类型分类任务，并初始化社交媒体。
   * 遍历每种社交媒体类型，调用相应的切换方法。
   * 如果存在链接任务，则执行访问链接的操作。
   * 如果存在额外任务，则调用额外任务处理方法。
   * 最后，等待所有任务完成并记录成功信息。
   */
  protected async toggleTask(action: 'do' | 'undo'): Promise<boolean> {
    try {
      if (!this.initialized && !this.init()) {
        return false;
      }
      if (!(await this.classifyTask(action))) {
        return false;
      }
      // if (!(await this.initSocial(action))) {
      //   return false;
      // }
      await this.initSocial(action);
      const pro = [];
      const doTask = action === 'do';
      const tasks = doTask ? this.undoneTasks : this.socialTasks;
      if (this.socialInitialized.discord === true && this.social.discord) {
        pro.push(this.social.discord.toggle({ doTask, ...tasks.discord }));
      }
      if (this.socialInitialized.instagram === true && this.social.instagram) {
        pro.push(this.social.instagram.toggle({ doTask, ...tasks.instagram }));
      }
      if (this.socialInitialized.reddit === true && this.social.reddit) {
        pro.push(this.social.reddit.toggle({ doTask, ...tasks.reddit }));
      }
      if (this.socialInitialized.twitch === true && this.social.twitch) {
        pro.push(this.social.twitch.toggle({ doTask, ...tasks.twitch }));
      }
      if (this.socialInitialized.twitter === true && this.social.twitter) {
        pro.push(this.social.twitter.toggle({ doTask, ...tasks.twitter }));
      }
      if (this.socialInitialized.vk === true && this.social.vk) {
        pro.push(this.social.vk.toggle({ doTask, ...tasks.vk }));
      }
      if (this.socialInitialized.youtube === true && this.social.youtube) {
        pro.push(this.social.youtube.toggle({ doTask, ...tasks.youtube }));
      }
      if (
        (this.steamTaskType.steamCommunity ? this.socialInitialized.steamCommunity === true : true) &&
        (this.steamTaskType.steamStore ? this.socialInitialized.steamStore === true : true) &&
        this.social.steam
      ) {
        pro.push(this.social.steam.toggle({ doTask, ...tasks.steam }));
      }
      if (this.social.visitLink && tasks.links && doTask) {
        for (const link of tasks.links) {
          pro.push(this.social.visitLink(link));
        }
      }
      // @ts-ignore
      if (doTask && tasks.extra && this.extraDoTask) {
        const hasExtra = Object.values(tasks.extra).reduce((total, arr) => [...total, ...arr]).length > 0;
        if (hasExtra) {
          // @ts-ignore
          pro.push(this.extraDoTask(tasks.extra));
        }
      }
      await Promise.all(pro);
      echoLog({}).success(__('allTasksComplete'));
      return true;
    } catch (error) {
      throwError(error as Error, 'Website.toggleTask');
      return false;
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
   * 该方法调用 `toggleTask` 方法以执行任务。
   * 如果在执行过程中发生错误，则记录错误信息并返回 false。
   */
  async doTask(): Promise<boolean> {
    try {
      return await this.toggleTask('do');
    } catch (error) {
      throwError(error as Error, 'Website.doTask');
      return false;
    }
  }

  /**
   * 撤销任务的异步方法
   *
   * @returns {Promise<boolean>} 如果任务成功撤销，则返回 true；否则返回 false。
   *
   * @throws {Error} 如果在撤销过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法调用 `toggleTask` 方法以撤销任务。
   * 如果在撤销过程中发生错误，则记录错误信息并返回 false。
   */
  async undoTask(): Promise<boolean> {
    try {
      return await this.toggleTask('undo');
    } catch (error) {
      throwError(error as Error, 'Website.undoTask');
      return false;
    }
  }
}

export default Website;

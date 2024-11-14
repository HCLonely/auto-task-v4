/*
 * @Author       : HCLonely
 * @Date         : 2021-11-15 13:58:41
 * @LastEditTime : 2022-02-10 19:41:42
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/website/Keylol.ts
 * @Description  : https://keylol.com/f319-1
 */

// eslint-disable-next-line
/// <reference path = "Keylol.d.ts" />

import throwError from '../tools/throwError';
import Website from './Website';
import leftKeyChecker from './leftKeyChecker';
import __ from '../tools/i18n';

const defaultTasksTemplate: keylolSocialTasks = {
  steam: {
    groupLinks: [],
    wishlistLinks: [],
    curatorLinks: [],
    curatorLikeLinks: [],
    followLinks: [],
    forumLinks: [],
    announcementLinks: [],
    workshopVoteLinks: [],
    licenseLinks: []
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
  twitter: {
    userLinks: [],
    retweetLinks: []
  },
  youtube: {
    channelLinks: [],
    likeLinks: []
  }
};
const defaultTasks = JSON.stringify(defaultTasksTemplate);

/**
 * Keylol 类用于处理 Keylol 网站的自动任务。
 *
 * @class Keylol
 * @extends Website
 *
 * @property {string} name - 网站名称，默认为 'Keylol'。
 * @property {keylolSocialTasks} socialTasks - 存储社交任务的对象。
 * @property {keylolSocialTasks} undoneTasks - 存储未完成任务的对象。
 * @property {Array<string>} buttons - 可用的操作按钮数组。
 *
 * @method static test - 检查当前域名是否为 Keylol 网站。
 * @returns {boolean} 如果当前域名为 'keylol.com' 且特定链接存在，则返回 true；否则返回 false。
 *
 * @method init - 初始化方法。
 * @returns {boolean} 总是返回 true，表示初始化成功。
 *
 * @method after - 抽奖后续操作的方法。
 * @returns {void} 无返回值。
 * @throws {Error} 如果在处理过程中发生错误，将抛出错误。
 *
 * @method classifyTask - 分类任务的方法。
 * @param {'do' | 'undo'} action - 要执行的操作类型，'do' 表示执行任务，'undo' 表示撤销任务。
 * @returns {boolean} 如果任务分类成功，则返回 true；否则返回 false。
 * @throws {Error} 如果在分类过程中发生错误，将抛出错误。
 *
 * @method selectAll - 选择所有可见任务的函数。
 * @returns {void} 无返回值。
 * @throws {Error} 如果在选择过程中发生错误，将抛出错误。
 *
 * @method selectNone - 取消选择所有可见任务的函数。
 * @returns {void} 无返回值。
 * @throws {Error} 如果在取消选择过程中发生错误，将抛出错误。
 *
 * @method invertSelect - 反转选择所有可见任务的函数。
 * @returns {void} 无返回值。
 * @throws {Error} 如果在反转选择过程中发生错误，将抛出错误。
 *
 * @method #addBtn - 添加按钮的方法。
 * @param {HTMLElement} before - 在该元素之后插入新按钮。
 * @param {string} social - 社交媒体类型。
 * @param {string} linkType - 链接类型。
 * @param {string} link - 要添加的链接。
 * @returns {void} 无返回值。
 * @throws {Error} 如果在添加按钮过程中发生错误，将抛出错误。
 */
class Keylol extends Website {
  name = 'Keylol';
  socialTasks: keylolSocialTasks = JSON.parse(defaultTasks);
  undoneTasks: keylolSocialTasks = JSON.parse(defaultTasks);
  buttons: Array<string> = [
    'doTask',
    'undoTask',
    'selectAll',
    'selectNone',
    'invertSelect'
  ];

  /**
   * 检查当前域名是否为 Keylol 网站的静态方法
   *
   * @returns {boolean} 如果当前域名为 'keylol.com' 且特定链接存在，则返回 true；否则返回 false。
   *
   * @description
   * 该方法通过比较当前窗口的域名来判断是否为 Keylol 网站。
   * 同时检查页面中是否存在特定的链接（索引为 3 的链接），
   * 如果该链接的 href 属性包含 '319' 或 '234'，则返回 true；否则返回 false。
   */
  static test(): boolean {
    return window.location.host === 'keylol.com' && (!!$('.subforum_left_title_left_up a').eq(3)
      .attr('href')
      ?.includes('319') ||
        !!$('.subforum_left_title_left_up a').eq(3)
          .attr('href')
          ?.includes('234'));
  }

  /**
   * 初始化方法
   *
   * @returns {boolean} 总是返回 true，表示初始化成功。
   *
   * @description
   * 该方法用于初始化相关设置或状态。
   * 当前实现仅返回 true，表示初始化过程已完成。
   */
  init(): boolean {
    return true;
  }

  /**
   * 页面加载后的方法
   *
   * @returns {void} 无返回值。
   *
   * @throws {Error} 如果在处理过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法筛选可见的链接并分类不同类型的社交媒体链接。
   * 包括 Discord、Reddit、Instagram、Twitter、Twitch、VK、Steam 商店、Steam 社区和 YouTube 的链接。
   * 对于每种类型的链接，调用私有方法 `#addBtn` 将其添加到相应的任务列表中。
   * 还会检查页面中的抽奖链接，并根据状态进行分类。
   * 如果是 Keylol 网站，还会处理特定的 ASF 和 SteamDB 链接。
   */
  after(): void {
    try {
      // 筛选可见元素
      const selector = this.name === 'Keylol' ? '#postlist>div[id^="post_"]:first' : 'div.container';
      const mainPost = $(selector);
      const discordLinks = mainPost.find('a[href*="discord.com"]:visible');
      const redditLinks = mainPost.find('a[href*="reddit.com"]:visible');
      const insLinks = mainPost.find('a[href*="instagram.com"]:visible');
      const twitterLinks = mainPost.find('a[href*="twitter.com"]:visible,a[href*="x.com"]:visible');
      const twitchLinks = mainPost.find('a[href*="twitch.tv"]:visible');
      const vkLinks = mainPost.find('a[href*="vk.com"]:visible');
      const steamStoreLinks = mainPost.find('a[href*="store.steampowered.com"]:visible');
      const steamCommunityLinks = mainPost.find('a[href*="steamcommunity.com"]:visible');
      const ytbLinks = mainPost.find('a[href*="youtube.com"]:visible');

      // 处理 Discord 链接
      if (discordLinks.length > 0) {
        for (const discordLink of discordLinks) {
          const link = $(discordLink).attr('href');
          if (!(link && /^https?:\/\/discord\.com\/invite\/.+/.test(link))) continue;
          this.#addBtn(discordLink, 'discord', 'serverLinks', link);
        }
      }

      // 处理 Reddit 链接
      if (redditLinks.length > 0) {
        for (const redditLink of redditLinks) {
          const link = $(redditLink).attr('href');
          if (!(link && /^https?:\/\/www\.reddit\.com\/(r|user)\/.+/.test(link))) continue;
          this.#addBtn(redditLink, 'reddit', 'redditLinks', link);
        }
      }

      // 处理 Instagram 链接
      if (insLinks.length > 0) {
        for (const insLink of insLinks) {
          const link = $(insLink).attr('href');
          if (!(link && /^https:\/\/www\.instagram\.com\/.+/.test(link))) continue;
          this.#addBtn(insLink, 'instagram', 'userLinks', link);
        }
      }

      // 处理 Twitter 链接
      if (twitterLinks.length > 0) {
        for (const twitterLink of twitterLinks) {
          const link = $(twitterLink).attr('href');
          if (!(link && /^https:\/\/twitter\.com\/.+/.test(link))) continue;
          if (/https:\/\/twitter\.com\/.*?\/status\/[\d]+/.test(link)) {
            this.#addBtn(twitterLink, 'twitter', 'retweetLinks', link);
          } else {
            this.#addBtn(twitterLink, 'twitter', 'userLinks', link);
          }
        }
      }

      // 处理 Twitch 链接
      if (twitchLinks.length > 0) {
        for (const twitchLink of twitchLinks) {
          const link = $(twitchLink).attr('href');
          if (!(link && /^https:\/\/(www\.)?twitch\.tv\/.+/.test(link))) continue;
          this.#addBtn(twitchLink, 'twitch', 'channelLinks', link);
        }
      }

      // 处理 VK 链接
      if (vkLinks.length > 0) {
        for (const vkLink of vkLinks) {
          const link = $(vkLink).attr('href');
          if (!(link && /^https:\/\/vk\.com\/.+/.test(link))) continue;
          this.#addBtn(vkLink, 'vk', 'nameLinks', link);
        }
      }

      // 处理 Steam 商店链接
      if (steamStoreLinks.length > 0) {
        for (const steamStoreLink of steamStoreLinks) {
          const link = $(steamStoreLink).attr('href');
          if (!link) continue;
          if (/curator\/[\d]+/.test(link)) {
            this.#addBtn(steamStoreLink, 'steam', 'curatorLinks', link);
          } else if (/(publisher|developer|franchise)\/.+/.test(link)) {
            this.#addBtn(steamStoreLink, 'steam', 'curatorLikeLinks', link);
          } else if (/news(hub)?\/app\/[\d]+\/view\/[\d]+/.test(link)) {
            this.#addBtn(steamStoreLink, 'steam', 'announcementLinks', link);
          } else if (/app\/[\d]+/.test(link)) {
            this.#addBtn(steamStoreLink, 'steam', 'followLinks', link);
            this.#addBtn(steamStoreLink, 'steam', 'wishlistLinks', link);
          }
        }
      }

      // 处理 Steam 社区链接
      if (steamCommunityLinks.length > 0) {
        for (const steamCommunityLink of steamCommunityLinks) {
          const link = $(steamCommunityLink).attr('href');
          if (!link) continue;
          if (/groups\/.+/.test(link)) {
            this.#addBtn(steamCommunityLink, 'steam', 'groupLinks', link);
          } else if (/announcements\/detail\/[\d]+/.test(link)) {
            this.#addBtn(steamCommunityLink, 'steam', 'announcementLinks', link);
          }
        }
      }

      // 处理 YouTube 链接
      if (ytbLinks.length > 0) {
        for (const ytbLink of ytbLinks) {
          const link = $(ytbLink).attr('href');
          if (!link) continue;
          this.#addBtn(ytbLink, 'youtube', 'channelLinks', link);
          this.#addBtn(ytbLink, 'youtube', 'likeLinks', link);
        }
      }

      // 处理抽奖链接
      // eslint-disable-next-line max-len
      const giveawayLinks = mainPost.find('a[href*="giveaway.su/giveaway/view/"]:visible,a[href*="givee.club/"]:visible,a[href*="gleam.io/"]:visible,a[href*="www.indiedb.com/giveaways/"]:visible,a[href*="key-hub.eu/giveaway/"]:visible,a[href*="opquests.com/quests/"]:visible,a[href*="itch.io/s/"]:visible');
      if (giveawayLinks.length > 0) {
        for (const giveawayLink of giveawayLinks) {
          const link = $(giveawayLink).attr('href');
          if (!link) continue;
          leftKeyChecker.classify(link).then((status) => {
            if (!status) return;
            if (/^Active/.test(status)) {
              $(`a[href="${link}"]`).after(`<font class="auto-task-giveaway-status active" title="${__('Active')}">${status}</font>`);
              return;
            }
            $(`a[href="${link}"]`).after(`<font class="auto-task-giveaway-status not-active" title="${__(status)}">${status}</font>`);
          })
            .catch((error) => {
              throwError(error, 'keylol.after -> leftKeyChecker');
            });
        }
      }

      // 处理 ASF 和 SteamDB 链接
      if (this.name === 'Keylol') {
        const asfLinks = mainPost.find('a[href^="#asf"]:visible');
        if (asfLinks.length > 0) {
          for (const asfLink of asfLinks) {
            const link = $(asfLink).attr('href');
            if (!link) continue;
            this.#addBtn($(`a[href="${link}"]`).after('<span style="color: #ccc; margin: 0 -5px 0 5px"> | </span>')
              .next()[0], 'steam', 'licenseLinks', `appid-${link.replace('#asf', '')}`);
          }
        }
        const subLinks = mainPost.find('a[href*="steamdb.info/sub/"]:visible');
        if (subLinks.length > 0) {
          for (const subLink of subLinks) {
            const link = $(subLink).attr('href');
            if (!link) continue;
            const subid = link.match(/^https:\/\/steamdb\.info\/sub\/([\d]+)/)?.[1];
            if (!subid) continue;
            this.#addBtn(subLink, 'steam', 'licenseLinks', `subid-${subid}`);
          }
        }
        const asfLinks2 = mainPost.find('.blockcode:contains("addlicense"):visible');
        if (asfLinks2.length > 0) {
          for (const asfLink of asfLinks2) {
            // const subid = [...asfLink.innerText.matchAll(/s\/([\d]+)/g)].map((arr) => arr[1]);
            const appid = [...asfLink.innerText.matchAll(/a(pp)?\/([\d]+)/g)].map((matched) => matched?.[2]).filter((id) => id) || [];
            if (appid.length > 0) {
              this.#addBtn($(asfLink).children('em')[0], 'steam', 'licenseLinks', `appid-${appid.join(',')}`);
            }

            const subid = asfLink.innerText.match(/[\d]+/g)?.filter((matched) => !appid.includes(matched));
            if (!subid || subid.length === 0) continue;
            this.#addBtn($(asfLink).children('em')[0], 'steam', 'licenseLinks', `subid-${subid.join(',')}`);
          }
        }
      }
    } catch (error) {
      throwError(error as Error, 'keylol.after');
    }
  }

  /**
   * 分类任务的方法
   *
   * @param {'do' | 'undo'} action - 要执行的操作类型，'do' 表示执行任务，'undo' 表示撤销任务。
   * @returns {boolean} 如果任务分类成功，则返回 true；否则返回 false。
   *
   * @throws {Error} 如果在分类过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法根据传入的操作类型分类任务。
   * 首先将社交任务和未完成任务初始化为默认任务。
   * 然后遍历所有被选中的按钮，提取社交媒体类型、任务类型和链接。
   * 根据操作类型，将链接添加到相应的任务列表中。
   * 最后，去重任务列表并返回成功状态。
   */
  classifyTask(action: 'do' | 'undo'): boolean {
    try {
      this.socialTasks = JSON.parse(defaultTasks);
      this.undoneTasks = JSON.parse(defaultTasks);
      const selectedBtns = $('.auto-task-keylol[selected="selected"]:visible');
      for (const btn of selectedBtns) {
        const button = $(btn);
        const social = button.attr('data-social');
        const type = button.attr('data-type');
        const link = button.attr('data-link');

        if (!(social && type && link)) continue;
        // @ts-ignore
        if (action === 'do') this.undoneTasks[social][type].push(link);
        // @ts-ignore
        if (action === 'undo') this.socialTasks[social][type].push(link);
      }

      this.undoneTasks = this.uniqueTasks(this.undoneTasks) as keylolSocialTasks;
      this.socialTasks = this.uniqueTasks(this.socialTasks) as keylolSocialTasks;
      if (window.DEBUG) console.log('%cAuto-Task[Debug]:', 'color:blue', JSON.stringify(this));
      return true;
    } catch (error) {
      throwError(error as Error, 'Keylol.classifyTask');
      return false;
    }
  }

  /**
   * 选择所有可见任务的函数
   *
   * @returns {void} 无返回值。
   *
   * @throws {Error} 如果在选择过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法选择所有可见的自动任务，并将其标记为选中状态。
   * 使用 jQuery 选择器查找所有可见的 `.auto-task-keylol` 元素，并设置其 `selected` 属性为 'selected'。
   */
  selectAll(): void {
    try {
      $('.auto-task-keylol:visible').attr('selected', 'selected');
    } catch (error) {
      throwError(error as Error, 'Keylol.selectAll');
    }
  }

  /**
   * 取消选择所有可见任务的函数
   *
   * @returns {void} 无返回值。
   *
   * @throws {Error} 如果在取消选择过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法取消所有可见的自动任务的选中状态。
   * 使用 jQuery 选择器查找所有可见的 `.auto-task-keylol` 元素，并移除其 `selected` 属性。
   */
  selectNone(): void {
    try {
      $('.auto-task-keylol:visible').removeAttr('selected');
    } catch (error) {
      throwError(error as Error, 'Keylol.selectNone');
    }
  }

  /**
   * 反转选择所有可见任务的函数
   *
   * @returns {void} 无返回值。
   *
   * @throws {Error} 如果在反转选择过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法遍历所有可见的自动任务，并根据当前状态反转其选中状态。
   * 如果任务当前被选中，则移除其 `selected` 属性；如果未被选中，则添加 `selected` 属性。
   */
  invertSelect(): void {
    try {
      $('.auto-task-keylol:visible').each((index, element) => {
        element.getAttribute('selected') ? element.removeAttribute('selected') : element.setAttribute('selected', 'selected');
      });
    } catch (error) {
      throwError(error as Error, 'Keylol.invertSelect');
    }
  }

  /**
   * 添加按钮的方法
   *
   * @param {HTMLElement} before - 在该元素之后插入新按钮。
   * @param {string} social - 社交媒体类型。
   * @param {string} linkType - 链接类型。
   * @param {string} link - 要添加的链接。
   * @returns {void} 无返回值。
   *
   * @throws {Error} 如果在添加按钮过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法在指定的元素之后插入一个新的按钮。
   * 按钮的点击事件会根据当前状态切换 `selected` 属性。
   * 按钮还包含社交媒体类型、链接类型和链接信息，以便后续操作使用。
   */
  #addBtn(before: HTMLElement, social: string, linkType: string, link: string): void {
    try {
      $(before).after('<a href="javascript:void(0);" class="auto-task-keylol" target="_self"' +
        ' onclick="this.getAttribute(\'selected\') ? this.removeAttribute(\'selected\') : this.setAttribute(\'selected\', \'selected\')"' +
        ` data-social="${social}" data-type="${linkType}" data-link="${link}">${linkType.replace('Links', '')}</a>`);
    } catch (error) {
      throwError(error as Error, 'keylol.addBtn');
    }
  }
}

export default Keylol;

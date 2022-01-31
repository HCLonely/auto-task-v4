/*
 * @Author       : HCLonely
 * @Date         : 2021-11-15 13:58:41
 * @LastEditTime : 2022-01-31 16:20:51
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

  static test() {
    return window.location.host === 'keylol.com' && (!!$('.subforum_left_title_left_up a').eq(3)
      .attr('href')
      ?.includes('319') ||
      !!$('.subforum_left_title_left_up a').eq(3)
        .attr('href')
        ?.includes('234'));
  }
  init() {
    return true;
  }
  after(): void {
    try {
      const selector = this.name === 'Keylol' ? '#postlist>div[id^="post_"]:first' : 'div.container';
      const mainPost = $(selector);
      const discordLinks = mainPost.find('a[href*="discord.com"]');
      const redditLinks = mainPost.find('a[href*="reddit.com"]');
      const insLinks = mainPost.find('a[href*="instagram.com"]');
      const twitterLinks = mainPost.find('a[href*="twitter.com"]');
      const twitchLinks = mainPost.find('a[href*="twitch.tv"]');
      const vkLinks = mainPost.find('a[href*="vk.com"]');
      const steamStoreLinks = mainPost.find('a[href*="store.steampowered.com"]');
      const steamCommunityLinks = mainPost.find('a[href*="steamcommunity.com"]');
      const ytbLinks = mainPost.find('a[href*="youtube.com"]');
      if (discordLinks.length > 0) {
        for (const discordLink of discordLinks) {
          const link = $(discordLink).attr('href');
          if (!(link && /^https?:\/\/discord\.com\/invite\/.+/.test(link))) continue;
          this.#addBtn(discordLink, 'discord', 'serverLinks', link);
        }
      }
      if (redditLinks.length > 0) {
        for (const redditLink of redditLinks) {
          const link = $(redditLink).attr('href');
          if (!(link && /^https?:\/\/www\.reddit\.com\/(r|user)\/.+/.test(link))) continue;
          this.#addBtn(redditLink, 'reddit', 'redditLinks', link);
        }
      }
      if (insLinks.length > 0) {
        for (const insLink of insLinks) {
          const link = $(insLink).attr('href');
          if (!(link && /^https:\/\/www\.instagram\.com\/.+/.test(link))) continue;
          this.#addBtn(insLink, 'instagram', 'userLinks', link);
        }
      }
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
      if (twitchLinks.length > 0) {
        for (const twitchLink of twitchLinks) {
          const link = $(twitchLink).attr('href');
          if (!(link && /^https:\/\/(www\.)?twitch\.tv\/.+/.test(link))) continue;
          this.#addBtn(twitchLink, 'twitch', 'channelLinks', link);
        }
      }
      if (vkLinks.length > 0) {
        for (const vkLink of vkLinks) {
          const link = $(vkLink).attr('href');
          if (!(link && /^https:\/\/vk\.com\/.+/.test(link))) continue;
          this.#addBtn(vkLink, 'vk', 'nameLinks', link);
        }
      }
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
      if (ytbLinks.length > 0) {
        for (const ytbLink of ytbLinks) {
          const link = $(ytbLink).attr('href');
          if (!link) continue;
          this.#addBtn(ytbLink, 'youtube', 'channelLinks', link);
          this.#addBtn(ytbLink, 'youtube', 'likeLinks', link);
        }
      }

      // eslint-disable-next-line max-len
      const giveawayLinks = mainPost.find('a[href*="giveaway.su/giveaway/view/"],a[href*="givee.club/"],a[href*="gleam.io/"],a[href*="www.indiedb.com/giveaways/"],a[href*="key-hub.eu/giveaway/"],a[href*="opquests.com/quests/"],a[href*="itch.io/s/"]');
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

      if (this.name === 'Keylol') {
        const asfLinks = mainPost.find('a[href^="#asf"]');
        if (asfLinks.length > 0) {
          for (const asfLink of asfLinks) {
            const link = $(asfLink).attr('href');
            if (!link) continue;
            this.#addBtn($(`a[href="${link}"]`).after('<span style="color: #ccc; margin: 0 -5px 0 5px"> | </span>')
              .next()[0], 'steam', 'licenseLinks', `appid-${link.replace('#asf', '')}`);
          }
        }
        const subLinks = mainPost.find('a[href*="steamdb.info/sub/"]');
        if (subLinks.length > 0) {
          for (const subLink of subLinks) {
            const link = $(subLink).attr('href');
            if (!link) continue;
            const subid = link.match(/^https:\/\/steamdb\.info\/sub\/([\d]+)/)?.[1];
            if (!subid) continue;
            this.#addBtn(subLink, 'steam', 'licenseLinks', `subid-${subid}`);
          }
        }
        const asfLinks2 = mainPost.find('.blockcode:contains("addlicense")');
        if (asfLinks2.length > 0) {
          for (const asfLink of asfLinks2) {
            const subid = [...asfLink.innerText.matchAll(/s\/([\d]+)/g)].map((arr) => arr[1]);
            if (subid.length === 0) continue;
            this.#addBtn($(asfLink).children('em')[0], 'steam', 'licenseLinks', `subid-${subid.join(',')}`);
          }
        }
      }
    } catch (error) {
      throwError(error as Error, 'keylol.after');
    }
  }
  classifyTask(action: 'do' | 'undo'): boolean {
    try {
      this.socialTasks = JSON.parse(defaultTasks);
      this.undoneTasks = JSON.parse(defaultTasks);
      const selectedBtns = $('.auto-task-keylol[selected="selected"]');
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
      return true;
    } catch (error) {
      throwError(error as Error, 'Keylol.classifyTask');
      return false;
    }
  }
  selectAll() {
    try {
      $('.auto-task-keylol').attr('selected', 'selected');
    } catch (error) {
      throwError(error as Error, 'Keylol.selectAll');
    }
  }
  selectNone() {
    try {
      $('.auto-task-keylol').removeAttr('selected');
    } catch (error) {
      throwError(error as Error, 'Keylol.selectNone');
    }
  }
  invertSelect() {
    try {
      $('.auto-task-keylol').each((index, element) => {
        element.getAttribute('selected') ? element.removeAttribute('selected') : element.setAttribute('selected', 'selected');
      });
    } catch (error) {
      throwError(error as Error, 'Keylol.invertSelect');
    }
  }

  #addBtn(before: HTMLElement, social: string, linkType: string, link:string): void {
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

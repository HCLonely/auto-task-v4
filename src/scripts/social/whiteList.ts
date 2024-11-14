/*
 * @Author       : HCLonely
 * @Date         : 2021-12-06 13:16:38
 * @LastEditTime : 2022-02-10 12:38:07
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/social/whiteList.ts
 * @Description  : 白名单相关
 */

import Swal from 'sweetalert2';
import __ from '../tools/i18n';
import echoLog from '../echoLog';
import Steam from './Steam';
import { getInfo } from './Youtube';
import { stringToColour } from '../tools/tools';
import throwError from '../tools/throwError';

/**
 * 默认白名单配置对象，包含各个平台的默认设置。
 *
 * @constant {whiteList} defaultWhiteList
 * @property {Object} discord - Discord 平台的白名单设置。
 * @property {string[]} discord.servers - Discord 服务器的白名单列表。
 *
 * @property {Object} instagram - Instagram 平台的白名单设置。
 * @property {string[]} instagram.users - Instagram 用户的白名单列表。
 *
 * @property {Object} twitch - Twitch 平台的白名单设置。
 * @property {string[]} twitch.channels - Twitch 频道的白名单列表。
 *
 * @property {Object} twitter - Twitter 平台的白名单设置。
 * @property {string[]} twitter.users - Twitter 用户的白名单列表。
 * @property {string[]} twitter.retweets - Twitter 转发的白名单列表。
 * @property {string[]} twitter.likes - Twitter 点赞的白名单列表。
 *
 * @property {Object} vk - VK 平台的白名单设置。
 * @property {string[]} vk.names - VK 名称的白名单列表。
 *
 * @property {Object} youtube - YouTube 平台的白名单设置。
 * @property {string[]} youtube.channels - YouTube 频道的白名单列表。
 * @property {string[]} youtube.likes - YouTube 点赞的白名单列表。
 *
 * @property {Object} reddit - Reddit 平台的白名单设置。
 * @property {string[]} reddit.reddits - Reddit 子版块的白名单列表。
 *
 * @property {Object} steam - Steam 平台的白名单设置。
 * @property {string[]} steam.groups - Steam 群组的白名单列表。
 * @property {string[]} steam.officialGroups - Steam 官方群组的白名单列表。
 * @property {string[]} steam.wishlists - Steam 心愿单的白名单列表。
 * @property {string[]} steam.follows - Steam 关注的白名单列表。
 * @property {string[]} steam.forums - Steam 论坛的白名单列表。
 * @property {string[]} steam.workshops - Steam 工作坊的白名单列表。
 * @property {string[]} steam.curators - Steam 策展人的白名单列表。
 * @property {string[]} steam.workshopVotes - Steam 工作坊投票的白名单列表。
 * @property {string[]} steam.curatorLikes - Steam 策展人点赞的白名单列表。
 * @property {string[]} steam.announcements - Steam 公告的白名单列表。
 * @property {string[]} steam.licenses - Steam 许可证的白名单列表。
 * @property {string[]} steam.playtests - Steam 测试版的白名单列表。
 */
const defaultWhiteList: whiteList = {
  discord: {
    servers: []
  },
  instagram: {
    users: []
  },
  twitch: {
    channels: []
  },
  twitter: {
    users: [],
    retweets: [],
    likes: []
  },
  vk: {
    names: []
  },
  youtube: {
    channels: [],
    likes: []
  },
  reddit: {
    reddits: []
  },
  steam: {
    groups: [],
    officialGroups: [],
    wishlists: [],
    follows: [],
    forums: [],
    workshops: [],
    curators: [],
    workshopVotes: [],
    curatorLikes: [],
    announcements: [],
    licenses: [],
    playtests: []
  }
};

/**
 * 从给定的链接中提取特定类型的 ID。
 *
 * @param {string} type - 链接类型，支持的类型包括：
 *   - discord.servers
 *   - instagram.users
 *   - twitch.channels
 *   - twitter.users
 *   - twitter.retweets
 *   - vk.names
 *   - youtube.channels
 *   - youtube.likes
 *   - reddit.reddits
 *   - steam.groups
 *   - steam.wishlists
 *   - steam.follows
 *   - steam.forums
 *   - steam.workshops
 *   - steam.curators
 *
 * @returns {Promise<string>} 提取到的 ID，如果未找到则返回空字符串。
 *
 * @throws {Error} 如果在提取过程中发生错误，将抛出错误。
 */
const link2id = async function (type: string): Promise<string> {
  try {
    const link = $('#socialLink').val() as string;
    let id = '';
    switch (type) {
    case 'discord.servers':
      id = link.match(/invite\/(.+)/)?.[1] || '';
      break;
    case 'instagram.users':
      id = link.match(/https:\/\/www\.instagram\.com\/(.+)?\//)?.[1] || '';
      break;
    case 'twitch.channels':
      id = link.match(/https:\/\/(www\.)?twitch\.tv\/(.+)/)?.[2] || '';
      break;
    case 'twitter.users':
      id = link.match(/https:\/\/twitter\.com\/(.+)/)?.[1] || '';
      break;
    case 'twitter.retweets':
      id = link.match(/https:\/\/twitter\.com\/.*?\/status\/([\d]+)/)?.[1] || '';
      break;
    case 'vk.names':
      id = link.match(/https:\/\/vk\.com\/([^/]+)/)?.[1] || '';
      break;
    case 'youtube.channels':
      id = (await getInfo(link, 'channel'))?.params?.channelId || '';
      break;
    case 'youtube.likes':
      id = (await getInfo(link, 'likeVideo'))?.params?.videoId || '';
      break;
    case 'reddit.reddits':
      id = link.match(/https?:\/\/www\.reddit\.com\/user\/([^/]*)/)?.[1] || link.match(/https?:\/\/www\.reddit\.com\/r\/([^/]*)/)?.[1] || '';
      break;
    case 'steam.groups':
      id = link.match(/groups\/(.+)\/?/)?.[1] || '';
      break;
    case 'steam.wishlists':
    case 'steam.follows':
    case 'steam.forums':
      id = link.match(/app\/([\d]+)/)?.[1] || '';
      break;
    case 'steam.workshops':
      id = link.match(/\?id=([\d]+)/)?.[1] || '';
      break;
    case 'steam.curators': {
      if (link.includes('curator')) {
        id = link.match(/curator\/([\d]+)/)?.[1] || '';
      } else {
        const param = link.match(/https?:\/\/store\.steampowered\.com\/(.*?)\/([^/?]+)/)?.slice(1, 3);
        if (!param || param.length !== 2) break;
        const steam = new Steam();
        if (await steam.init()) {
          id = await steam.getCuratorId(param[0], param[1]) || '';
        }
      }
    }
      break;
    }
    return id;
  } catch (error) {
    throwError(error as Error, 'link2id');
    return __('getFailed', 'id');
  }
};

/**
 * 禁用的类型配置对象。
 *
 * @constant {Object} disabledType
 * @property {string[]} disabledType.steam - Steam 平台上禁用的类型，包括 'workshopVotes'、'curatorLikes' 和 'announcements'。
 * @property {string[]} disabledType.twitter - Twitter 平台上禁用的类型，包括 'likes'。
 */
const disabledType = {
  steam: ['workshopVotes', 'curatorLikes', 'announcements'],
  twitter: ['likes']
};

/**
 * 合并给定的白名单与默认白名单，返回新的白名单对象。
 *
 * @param {whiteList} whiteList - 要合并的白名单对象。
 * @returns {whiteList} 合并后的新白名单对象。
 *
 * @throws {Error} 如果在合并过程中发生错误，将抛出错误。
 */
const assignWhiteList = (whiteList: whiteList): whiteList => {
  try {
    const newWhiteList: whiteList = {};
    for (const [key, value] of Object.entries(defaultWhiteList)) {
      newWhiteList[key as keyof whiteList] = { ...value, ...whiteList[key as keyof whiteList] };
    }
    return newWhiteList;
  } catch (error) {
    throwError(error as Error, 'assignWhiteList');
    return defaultWhiteList;
  }
};

/**
 * 显示白名单选项的表单，允许用户编辑白名单。
 *
 * @param {'page' | 'swal'} showType - 指定显示类型，支持 'page' 或 'swal'。
 *
 * @returns {void} 无返回值。
 *
 * @throws {Error} 如果在处理过程中发生错误，将抛出错误。
 */
const whiteListOptions = function (showType: 'page' | 'swal'): void {
  try {
    const whiteList = assignWhiteList(GM_getValue<whiteList>('whiteList') || {});
    let whiteListOptionsForm = `<form id="whiteListForm" class="auto-task-form">
  <table class="auto-task-table"><thead><tr><td>${__('website')}</td><td>${__('type')}</td><td>${__('edit')}</td></tr></thead><tbody>`;
    for (const [social, types] of Object.entries(whiteList)) {
      whiteListOptionsForm += Object.keys(types).map(
        // @ts-ignore
        (type, index) => (disabledType[social]?.includes(type) ?
          '' :
          `<tr style="background-color: ${stringToColour(social)}66">${
            index === 0 ?
              `<th rowspan="${
                // @ts-ignore
                Object.keys(types).length - (disabledType[social] || []).length
              }" style="background-color: ${stringToColour(social)}66">${social}</th>` :
              ''
          }<td>${__(type)}</td><td><button type="button" class="editWhiteList" data-value="${social}.${type}">${__('edit')}</button></td></tr>`))
        .join('');
    }
    whiteListOptionsForm += '</tbody></table></form>';
    if (showType === 'swal') {
      Swal.fire({
        title: __('whiteListOptions'),
        html: whiteListOptionsForm,
        showConfirmButton: false,
        showCloseButton: true
      });
    } else {
      $('body').append(`<h2>${__('whiteList')}</h2>${whiteListOptionsForm}`);
    }
    $('.editWhiteList').on('click', function () {
      const value = $(this).attr('data-value');
      if (!value) return;
      const [social, type] = value.split('.');
      // @ts-ignore
      if (!whiteList?.[social]?.[type]) {
        echoLog({}).warning(__('whiteListNotFound', value));
        return;
      }
      Swal.fire({
        title: __('changeWhiteListOption', value),
        input: 'textarea',
        html: `<input id="socialLink" class="swal2-input" placeholder="在此处输入链接获取id">
        <button id="link2id" data-type="${value}" class="swal2-confirm swal2-styled">获取id</button>
        <p style="margin-bottom:0 !important;">在下方填写白名单，每行一个</p>`,
        // @ts-ignore
        inputValue: whiteList[social][type].join('\n'),
        showConfirmButton: true,
        confirmButtonText: __('save'),
        showCancelButton: true,
        cancelButtonText: __('close'),
        showDenyButton: true,
        denyButtonText: __('return')
      }).then(({ isDenied, isConfirmed, value }) => {
        if (isDenied) {
          if (showType === 'swal') {
            whiteListOptions(showType);
          }
          return;
        } else if (isConfirmed) {
          // @ts-ignore
          whiteList[social][type] = value.split('\n');
          GM_setValue('whiteList', whiteList);
          Swal.fire({
            title: __('changeWhiteListSuccess'),
            icon: 'success'
          });
        }
      });
      $('#link2id').on('click', async function () {
        const type = $(this).attr('data-type') as string;
        $('#socialLink').val(await link2id(type));
      });
    });
  } catch (error) {
    throwError(error as Error, 'whiteListOptions');
  }
};

export default whiteListOptions;

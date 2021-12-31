/*
 * @Author       : HCLonely
 * @Date         : 2021-12-06 13:16:38
 * @LastEditTime : 2021-12-30 16:11:31
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
    wishlists: [],
    follows: [],
    forums: [],
    workshops: [],
    curators: [],
    workshopVotes: [],
    curatorLikes: [],
    announcements: []
  }
};

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
const disabledType = {
  steam: ['workshopVotes', 'curatorLikes', 'announcements'],
  twitter: ['likes']
};

const whiteListOptions = function (showType: 'page' | 'swal'): void {
  try {
    const whiteList = { ...defaultWhiteList, ...(GM_getValue<whiteList>('whiteList') || {}) }; // eslint-disable-line new-cap
    let whiteListOptionsForm = `<form id="whiteListForm" class="auto-task-form">
  <table class="auto-task-table"><thead><tr><td>${__('website')}</td><td>${__('type')}</td><td>${__('edit')}</td></tr></thead><tbody>`;
    for (const [social, types] of Object.entries(whiteList)) {
      whiteListOptionsForm += Object.keys(types).map(
      // @ts-ignore
        (type, index) => (disabledType[social]?.includes(type) ? '' : `<tr style="background-color: ${stringToColour(social)}66">${
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
        echoLog({ html: `<li><font class="warning">${__('whiteListNotFound', value)}</font></li>` });
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
          GM_setValue('whiteList', whiteList); // eslint-disable-line new-cap
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

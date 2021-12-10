/*
 * @Author       : HCLonely
 * @Date         : 2021-12-06 13:16:38
 * @LastEditTime : 2021-12-10 18:49:24
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/social/whiteList.ts
 * @Description  : 白名单相关
 */

import Swal from 'sweetalert2';
import __ from '../tools/i18n';
import echoLog from '../echoLog';
import Steam from './Steam';

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
};

const whiteListOptions = function (): void {
  const whiteList = { ...defaultWhiteList, ...(GM_getValue<whiteList>('whiteList') || {}) }; // eslint-disable-line new-cap
  let whiteListOptionsForm = `<form id="whiteListForm">
  <table class="auto-task-table"><thead><tr><td>${__('website')}</td><td>${__('type')}</td><td>${__('edit')}</td></tr></thead><tbody>`;
  for (const [social, types] of Object.entries(whiteList)) {
    whiteListOptionsForm += Object.keys(types).map(
      (type, index) => ((
        (social === 'steam' && ['workshopVotes', 'curatorLikes', 'announcements'].includes(type)) ||
        (social === 'twitter' && type === 'likes') ||
        (social === 'youtube')
      ) ? '' : `<tr>${
          index === 0 ? `<th rowspan="${Object.keys(types).length}">${social}</th>` : ''
        }<td>${type}</td><td><button class="editWhiteList" data-value="${social}.${type}">${__('edit')}</button></td></tr>`))
      .join('');
  }
  whiteListOptionsForm += '</tbody></table></form>';
  Swal.fire({
    title: __('whiteListOptions'),
    html: whiteListOptionsForm,
    showConfirmButton: false,
    showCloseButton: true
  });
  $('.editWhiteList').on('click', function () {
    const value = $(this).attr('data-value');
    if (!value) return;
    const [social, type] = value.split('.');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (!whiteList?.[social]?.[type]) {
      echoLog({ html: `<li><font class="warning">${__('whiteListNotFound', value)}</font></li>` });
      return;
    }
    Swal.fire({
      title: __('changeWhiteListOption', value),
      input: 'textarea',
      html: `<input id="socialLink" class="swal2-input" placeholder="在此处输入链接获取id">
        <button id="link2id" data-type="${value}" class="swal2-confirm swal2-styled">获取id</button>`,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
        whiteListOptions();
        return;
      } else if (isConfirmed) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
};

export default whiteListOptions;

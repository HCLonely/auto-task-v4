/*
 * @Author       : HCLonely
 * @Date         : 2021-10-26 15:44:54
 * @LastEditTime : 2021-12-28 15:50:26
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/index.ts
 * @Description  :
 */

import Swal from 'sweetalert2';
import * as Cookies from 'js-cookie';
// @ts-ignore
import style from './style/auto-task.scss';
import { Websites, WebsiteType } from './scripts/website/index';
import whiteListOptions from './scripts/social/whiteList';
import websiteOptions from './scripts/website/options';
import __ from './scripts/tools/i18n';
import { globalOptions, changeGlobalOptions } from './scripts/globalOptions';

declare const commonOptions: {
  headers?: {
    'Client-ID': string
  }
};

if (window.location.hostname === 'discord.com') {
  const discordAuth = window.localStorage?.getItem('token')?.replace(/^"|"$/g, '');
  GM_setValue('discordAuth', { auth: discordAuth }); // eslint-disable-line new-cap
  if (discordAuth && window.location.hash === '#auth') {
    window.close();
    Swal.fire('', __('closePageNotice'));
  }
}

const loadScript = async () => {
  if (window.location.hostname === 'www.twitch.tv' && window.location.hash === '#auth') {
    const authToken = Cookies.get('auth-token');
    const isLogin = !!Cookies.get('login');
    if (isLogin) {
      GM_setValue('twitchAuth', { authToken, clientId: commonOptions?.headers?.['Client-ID'] }); // eslint-disable-line new-cap
      window.close();
      Swal.fire('', __('closePageNotice'));
    } else {
      Swal.fire('', __('needLogin'));
    }
  }
  if (window.location.hostname === 'twitter.com' && window.location.hash === '#auth') {
    const ct0 = Cookies.get('ct0');
    const isLogin = !!Cookies.get('twid');
    if (isLogin && ct0) {
      GM_setValue('twitterAuth', { ct0 }); // eslint-disable-line new-cap
      window.close();
      Swal.fire('', __('closePageNotice'));
    } else {
      Swal.fire('', __('needLogin'));
    }
  }
  if (window.location.hostname === 'www.youtube.com' && window.location.hash === '#auth') {
    const PAPISID = Cookies.get('__Secure-3PAPISID');
    if (PAPISID) {
      GM_setValue('youtubeAuth', { PAPISID }); // eslint-disable-line new-cap
      window.close();
      Swal.fire('', __('closePageNotice'));
    } else {
      Swal.fire('', __('needLogin'));
    }
  }
  if (window.location.hostname === 'www.reddit.com' &&
    (window.location.hash === '#auth' || GM_getValue('redditAuth') === '#auth')) { // eslint-disable-line new-cap
    const betaButton = $('#redesign-beta-optin-btn');
    if (betaButton.length > 0) {
      GM_setValue('redditAuth', '#auth'); // eslint-disable-line new-cap
      return betaButton[0].click();
    }
    GM_setValue('redditAuth', null); // eslint-disable-line new-cap
    window.close();
    Swal.fire('', __('closePageNotice'));
  }

  let website: WebsiteType;
  for (const Website of Websites) {
    if (Website.test()) {
      website = new Website();
      break;
    }
  }

  // @ts-ignore
  if (!website) {
    console.log('Auto Task脚本停止加载：当前网站不支持');
    return;
  }

  // @ts-ignore
  if (website?.before) await website?.before();

  $('body').append(`<div id="auto-task-info" style="display:${globalOptions.other.defaultShowLog ? 'block' : 'none'};${globalOptions.other.logSideX}:${globalOptions.other.logDistance.split(',')[0]}px;${globalOptions.other.logSideY}:${globalOptions.other.logDistance.split(',')[1]}px;"></div><div id="auto-task-buttons" style="display:${globalOptions.other.defaultShowButton ? 'block' : 'none'};${globalOptions.other.buttonSideX}:${globalOptions.other.buttonDistance.split(',')[0]}px;${globalOptions.other.buttonSideY}:${globalOptions.other.buttonDistance.split(',')[1]}px;"></div><div class="show-button-div" style="display:${globalOptions.other.defaultShowButton ? 'none' : 'block'};${globalOptions.other.showButtonSideX}:${globalOptions.other.showButtonDistance.split(',')[0]}px;${globalOptions.other.showButtonSideY}:${globalOptions.other.showButtonDistance.split(',')[1]}px;"><a class="auto-task-website-btn" href="javascript:void(0);" target="_self" title="${__('showButton')}"></a></div>`); // eslint-disable-line

  $('a.auto-task-website-btn').on('click', () => {
    $('#auto-task-buttons').show();
    $('div.show-button-div').hide();
  });

  // do something
  // @ts-ignore
  if (website?.after) await website?.after();

  // @ts-ignore
  if (website?.buttons && $('#auto-task-buttons').children().length === 0) {
    $('#auto-task-buttons').addClass(`${website.name}-buttons`);
    // @ts-ignore
    for (const button of website.buttons) {
    // @ts-ignore
      if (website[button]) {
        // @ts-ignore
        // GM_registerMenuCommand(__(button), () => { website[button](); }); // eslint-disable-line new-cap
        const btnElement =
          $(`<p><a class="auto-task-website-btn ${website.name}-button" href="javascript:void(0);" target="_self">${__(button)}</a></p>`);
        // @ts-ignore
        btnElement.find('a.auto-task-website-btn').on('click', () => { website[button](); });
        $('#auto-task-buttons').append(btnElement);
      }
    }
  }

  const hideButtonElement = $(`<p><a class="auto-task-website-btn ${website.name}-button" href="javascript:void(0);" target="_self">
    ${__('hideButton')}</a></p>`);
  hideButtonElement.find('a.auto-task-website-btn').on('click', () => {
    $('#auto-task-buttons').hide();
    $('div.show-button-div').show();
  });
  const hideLogElement = $(`<p><a class="auto-task-website-btn ${website.name}-button" href="javascript:void(0);" target="_self" data-status="show">
    ${__('hideLog')}</a></p>`);
  hideLogElement.find('a.auto-task-website-btn').on('click', function () {
    const $this = $(this);
    const status = $this.attr('data-status');
    if (status === 'show') {
      $('#auto-task-info').hide();
      $this.attr('data-status', 'hide').text(__('showLog'));
    } else {
      $('#auto-task-info').show();
      $this.attr('data-status', 'show').text(__('hideLog'));
    }
  });
  $('#auto-task-buttons').append(hideButtonElement)
    .append(hideLogElement);
  // @ts-ignore
  if (website?.options) {
    // @ts-ignore
    GM_registerMenuCommand(__('changeWebsiteOptions'), () => { websiteOptions(website.name, website.options); }); // eslint-disable-line new-cap
  }

  if (website.name !== 'Setting') {
    GM_registerMenuCommand(__('whiteList'), () => { whiteListOptions('swal'); }); // eslint-disable-line new-cap
    GM_registerMenuCommand(__('changeGlobalOptions'), () => { changeGlobalOptions('swal'); }); // eslint-disable-line new-cap
    GM_registerMenuCommand(__('settingPage'), () => { // eslint-disable-line new-cap
      window.open('https://auto-task.hclonely.com/setting.html', '_blank');
    });
  }

  // 调试用
  unsafeWindow.website = website;

  GM_addStyle(style); // eslint-disable-line new-cap
  console.log('%c%s', 'color:#1bbe1a', 'Auto Task脚本初始化完成！');
};

if (window.location.hostname === 'opquests.com') {
  loadScript();
} else {
  $(loadScript);
}

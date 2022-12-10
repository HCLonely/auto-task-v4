/*
 * @Author       : HCLonely
 * @Date         : 2021-10-26 15:44:54
 * @LastEditTime : 2022-12-10 09:55:22
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/index.ts
 * @Description  : 入口文件
 */

import Swal from 'sweetalert2';
import * as Cookies from 'js-cookie';
import style from './style/auto-task.scss';
import { Websites, WebsiteType } from './scripts/website/index';
// import whiteListOptions from './scripts/social/whiteList';
import websiteOptions from './scripts/website/options';
import __ from './scripts/tools/i18n';
import { globalOptions, changeGlobalOptions } from './scripts/globalOptions';
import keyboardJS from 'keyboardjs';
// import syncOptions from './scripts/dataSync';
import updateChecker from './scripts/updateChecker';
import echoLog from './scripts/echoLog';

window.STYLE = GM_addStyle(style + GM_getResourceText('style'));
window.DEBUG = !!globalOptions.other?.debug;
window.TRACE = !!globalOptions.other?.debug && typeof console.trace === 'function';

declare const commonOptions: {
  headers?: {
    'Client-ID': string
    'Device-ID': string
  }
};
// eslint-disable-next-line no-underscore-dangle
declare const __twilightBuildID: string;

const loadScript = async () => {
  if (window.location.hostname === 'www.twitch.tv' && window.location.hash === '#auth') {
    const authToken = Cookies.get('auth-token');
    const isLogin = !!Cookies.get('login');
    if (isLogin) {
      GM_setValue('twitchAuth', {
        authToken,
        clientVersion: __twilightBuildID,
        clientId: commonOptions?.headers?.['Client-ID'],
        deviceId: commonOptions?.headers?.['Device-ID'],
        clientSessionId: window.localStorage.local_storage_app_session_id.replace(/"/g, '')
      });
      window.close();
      Swal.fire('', __('closePageNotice'));
    } else {
      Swal.fire('', __('needLogin'));
    }
    return;
  }
  if (window.location.hostname === 'twitter.com' && window.location.hash === '#auth') {
    const ct0 = Cookies.get('ct0');
    const isLogin = !!Cookies.get('twid');
    if (isLogin && ct0) {
      GM_setValue('twitterAuth', { ct0 });
      window.close();
      Swal.fire('', __('closePageNotice'));
    } else {
      Swal.fire('', __('needLogin'));
    }
    return;
  }
  if (window.location.hostname === 'www.youtube.com' && window.location.hash === '#auth') {
    const PAPISID = Cookies.get('__Secure-3PAPISID');
    if (PAPISID) {
      GM_setValue('youtubeAuth', { PAPISID });
      window.close();
      Swal.fire('', __('closePageNotice'));
    } else {
      Swal.fire('', __('needLogin'));
    }
    return;
  }
  if (window.location.hostname === 'www.reddit.com' &&
    (window.location.hash === '#auth' || GM_getValue('redditAuth') === '#auth')) {
    const betaButton = $('#redesign-beta-optin-btn');
    if (betaButton.length > 0) {
      GM_setValue('redditAuth', '#auth');
      return betaButton[0].click();
    }
    GM_setValue('redditAuth', null);
    window.close();
    Swal.fire('', __('closePageNotice'));
    return;
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
    console.log('%c%s', 'color:#ff0000', 'Auto-Task[Warning]: 脚本停止加载，当前网站不支持！');
    return;
  }

  // @ts-ignore
  if (website?.before) await website?.before();

  // eslint-disable-next-line max-len
  $('body').append(`<div id="auto-task-info" style="display:${globalOptions.other.defaultShowLog ? 'block' : 'none'};${globalOptions.position.logSideX}:${globalOptions.position.logDistance.split(',')[0]}px;${globalOptions.position.logSideY}:${globalOptions.position.logDistance.split(',')[1]}px;"></div><div id="auto-task-buttons" style="display:${globalOptions.other.defaultShowButton ? 'block' : 'none'};${globalOptions.position.buttonSideX}:${globalOptions.position.buttonDistance.split(',')[0]}px;${globalOptions.position.buttonSideY}:${globalOptions.position.buttonDistance.split(',')[1]}px;"></div><div class="show-button-div" style="display:${globalOptions.other.defaultShowButton ? 'none' : 'block'};${globalOptions.position.showButtonSideX}:${globalOptions.position.showButtonDistance.split(',')[0]}px;${globalOptions.position.showButtonSideY}:${globalOptions.position.showButtonDistance.split(',')[1]}px;"><a class="auto-task-website-btn" href="javascript:void(0);" target="_self" title="${__('showButton')}"></a></div>`);

  $('div.show-button-div').on('click', () => {
    $('#auto-task-buttons').show();
    $('div.show-button-div').hide();
  });

  const toggleLog = () => {
    const $this = $('#toggle-log');
    const status = $this.attr('data-status');
    if (status === 'show') {
      $('#auto-task-info').hide();
      $this.attr('data-status', 'hide').text(__('showLog'));
    } else {
      $('#auto-task-info').show();
      $this.attr('data-status', 'show').text(__('hideLog'));
    }
  };

  // INFO: 按键绑定
  keyboardJS.bind(globalOptions.hotKey.doTaskKey, () => {
    // @ts-ignore
    if (website.doTask) website.doTask();
  });
  keyboardJS.bind(globalOptions.hotKey.undoTaskKey, () => {
    // @ts-ignore
    if (website.undoTask) website.doTask();
  });
  keyboardJS.bind(globalOptions.hotKey.toggleLogKey, toggleLog);

  // @ts-ignore
  if (website?.after) await website?.after();

  // INFO: 网站功能按钮
  // @ts-ignore
  if (website?.buttons && $('#auto-task-buttons').children().length === 0) {
    $('#auto-task-buttons').addClass(`${website.name}-buttons`);
    // @ts-ignore
    for (const button of website.buttons) {
    // @ts-ignore
      if (website[button]) {
        // @ts-ignore
        const btnElement =
          $(`<p><a class="auto-task-website-btn ${website.name}-button" href="javascript:void(0);" target="_self">${__(button)}</a></p>`);
        // @ts-ignore
        btnElement.find('a.auto-task-website-btn').on('click', () => { website[button](); });
        $('#auto-task-buttons').append(btnElement);
      }
    }
  }

  // INFO: 隐藏按钮
  const hideButtonElement = $(`<p><a class="auto-task-website-btn ${website.name}-button" href="javascript:void(0);" target="_self">
    ${__('hideButton')}</a></p>`);
  hideButtonElement.find('a.auto-task-website-btn').on('click', () => {
    $('#auto-task-buttons').hide();
    $('div.show-button-div').show();
  });
  const toggleLogElement =
    $(`<p><a id="toggle-log" class="auto-task-website-btn ${website.name}-button" href="javascript:void(0);" target="_self" data-status="${
      globalOptions.other.defaultShowLog ? 'show' : 'hide'}">
      ${globalOptions.other.defaultShowLog ? __('hideLog') : __('showLog')}</a></p>`);
  toggleLogElement.find('a.auto-task-website-btn').on('click', toggleLog);
  $('#auto-task-buttons').append(hideButtonElement)
    .append(toggleLogElement);

  // @ts-ignore
  if (website?.options) {
    // @ts-ignore
    GM_registerMenuCommand(__('changeWebsiteOptions'), () => { websiteOptions(website.name, website.options); });
  }

  if (website.name !== 'Setting') {
    // GM_registerMenuCommand(__('whiteList'), () => { whiteListOptions('swal'); });
    GM_registerMenuCommand(__('changeGlobalOptions'), () => { changeGlobalOptions('swal'); });
    // GM_registerMenuCommand(__('tasksHistory'), () => {
    //   window.open('https://auto-task-v4.hclonely.com/history.html', '_blank');
    // });
    // GM_registerMenuCommand(__('syncData'), syncOptions);
    GM_registerMenuCommand(__('settingPage'), () => {
      window.open('https://auto-task-v4.hclonely.com/setting.html', '_blank');
    });
  }

  console.log('%c%s', 'color:#1bbe1a', 'Auto-Task[Load]: 脚本加载完成');

  if (!GM_getValue<number>('notice')) {
    Swal.fire({
      title: __('swalNotice'),
      icon: 'warning'
    }).then(() => {
      window.open(__('noticeLink'), '_blank');
      GM_setValue('notice', new Date().getTime());
    });

    echoLog({ html: `<li><font class="warning">${__('echoNotice', __('noticeLink'))}</font></li>` }).font?.find('a').on('click', () => {
      GM_setValue('notice', new Date().getTime());
    });
  }
  updateChecker();
};

if (window.location.hostname === 'discord.com') {
  const LocalStorage = window.localStorage;
  if (window.location.hash === '#auth') {
    window.localStorage.removeItem = () => true;
    const discordAuth = LocalStorage?.getItem('token')?.replace(/^"|"$/g, '');
    if (discordAuth && discordAuth.length > 0) {
      GM_setValue('discordAuth', { auth: discordAuth });
      window.close();
      Swal.fire('', __('closePageNotice'));
    } else {
      Swal.fire({
        text: __('getDiscordAuthFailed'),
        icon: 'error'
      });
    }
  } else {
    const discordAuth = LocalStorage?.getItem('token')?.replace(/^"|"$/g, '');
    if (discordAuth && discordAuth.length > 0) {
      GM_setValue('discordAuth', { auth: discordAuth });
    }
  }
} else if (window.location.hostname === 'opquests.com') {
  loadScript();
} else {
  if (window.location.hostname === 'key-hub.eu') {
    unsafeWindow.keyhubtracker = 1;
    unsafeWindow.gaData = {};
  }
  $(loadScript);
}

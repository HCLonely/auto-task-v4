/*
 * @Author       : HCLonely
 * @Date         : 2021-10-26 15:44:54
 * @LastEditTime : 2021-12-31 20:21:58
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/for_giveawaysu/index.ts
 * @Description  :
 */

import Swal from 'sweetalert2';
import * as Cookies from 'js-cookie';
import __ from '../scripts/tools/i18n';
import Giveawaysu from './Giveawaysu';

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

  if (!Giveawaysu.test()) return;
  const website = new Giveawaysu();
  $('body').append(`<div id="auto-task-info-div" style="position: fixed;bottom: 10px;right: 10px;width: 300px;max-width: 60%;max-height: 600px;color: #000;background-color: #fff;padding-left: 5px;z-index: 999999999 !important;"><h2 style="text-align: center;"><button id="auto-do-task" class="btn btn-success">${__('doTask')}</button></h2><div id="auto-task-info" style="overflow-y: auto;max-height: 500px;"></div></div>`); // eslint-disable-line
  await website.after();
  $('#auto-do-task').on('click', () => { website.doTask(); });

  console.log('%c%s', 'color:#1bbe1a', 'Auto TaskGS特供脚本初始化完成！');
};

$(loadScript);

/*
 * @Author       : HCLonely
 * @Date         : 2021-10-26 15:44:54
 * @LastEditTime : 2022-01-15 22:11:49
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/for_giveawaysu/index.ts
 * @Description  :
 */

import Swal from 'sweetalert2';
import * as Cookies from 'js-cookie';
import __ from '../scripts/tools/i18n';
import Giveawaysu from './Giveawaysu';
import style from './index.scss';

window.STYLE = GM_addStyle(style + GM_getResourceText('style'));

declare const commonOptions: {
  headers?: {
    'Client-ID': string
  }
};

if (window.location.hostname === 'discord.com') {
  const discordAuth = window.localStorage?.getItem('token')?.replace(/^"|"$/g, '');
  GM_setValue('discordAuth', { auth: discordAuth });
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
      GM_setValue('twitchAuth', { authToken, clientId: commonOptions?.headers?.['Client-ID'] });
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
      GM_setValue('twitterAuth', { ct0 });
      window.close();
      Swal.fire('', __('closePageNotice'));
    } else {
      Swal.fire('', __('needLogin'));
    }
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
  }

  if (!Giveawaysu.test()) return;
  const website = new Giveawaysu();
  // eslint-disable-next-line max-len
  $('body').append(`<div id="auto-task-info-div" style="position: fixed;bottom: 10px;right: 10px;width: 300px;max-width: 60%;max-height: 600px;color: #000;background-color: #fff;padding-left: 5px;z-index: 999999999 !important;"><h2 style="text-align: center;"><button id="auto-do-task" class="btn btn-success">${__('doTask')}</button><button id="auto-verify-task" class="btn btn-success">${__('verifyTask')}</button></h2><div id="auto-task-info" style="overflow-y: auto;max-height: 500px;"></div></div>`);
  await website.after();
  $('#auto-do-task').on('click', () => { website.doTask(); });
  $('#auto-verify-task').on('click', () => { website.verifyTask(); });

  console.log('%c%s', 'color:#1bbe1a', 'Auto Task GS特供脚本初始化完成！');
};

$(loadScript);

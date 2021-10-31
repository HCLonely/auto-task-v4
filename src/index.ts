/*
 * @Author       : HCLonely
 * @Date         : 2021-10-26 15:44:54
 * @LastEditTime : 2021-10-31 18:03:08
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/index.ts
 * @Description  :
 */

import Discord from './scripts/social/Discord';
import Instagram from './scripts/social/Instagram';
import Reddit from './scripts/social/Reddit';
import Twitch from './scripts/social/Twitch';
import Twitter from './scripts/social/Twitter';
import Vk from './scripts/social/Vk';
import Youtube from './scripts/social/Youtube';

if (window.location.hostname === 'discord.com' && window.location.hash === '#auth') { // todo: 登录
  GM_setValue('discordAuth', { auth: window.localStorage.getItem('token')?.replace(/^"|"$/g, '') }); // eslint-disable-line new-cap
  window.close();
}
declare const commonOptions: {
  headers?: {
    'Client-ID': string
  }
};
window.onload = () => {
  if (window.location.hostname === 'www.twitch.tv' && window.location.hash === '#auth') { // todo: 登录
    const authToken = Cookies.get('auth-token');
    const isLogin = !!Cookies.get('login');
    if (isLogin) {
      GM_setValue('twitchAuth', { authToken, clientId: commonOptions?.headers?.['Client-ID'] }); // eslint-disable-line new-cap
      window.close();
    } else {
      // 需要登录
    }
  }
  if (window.location.hostname === 'twitter.com' && window.location.hash === '#auth') { // todo: 登录
    const ct0 = Cookies.get('ct0');
    if (ct0) {
      GM_setValue('twitterAuth', { ct0 }); // eslint-disable-line new-cap
      window.close();
    } else {
      // 需要登录
    }
  }
  if (window.location.hostname === 'www.youtube.com' && window.location.hash === '#auth') { // todo: 登录
    const PAPISID = Cookies.get('__Secure-3PAPISID');
    if (PAPISID) {
      GM_setValue('youtubeAuth', { PAPISID }); // eslint-disable-line new-cap
      window.close();
    } else {
      // 需要登录
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
    Swal.fire('', '如果此页面没有自动关闭，请自行关闭本页面。');
  }
  unsafeWindow.Discord = Discord;
  unsafeWindow.Instagram = Instagram;
  unsafeWindow.Reddit = Reddit;
  unsafeWindow.Twitch = Twitch;
  unsafeWindow.Twitter = Twitter;
  unsafeWindow.Vk = Vk;
  unsafeWindow.Youtube = Youtube;

  $('body').append('<div id="fuck-task-info" style="position:fixed;bottom:10px;right:10px;width:300px;max-width:60%;"></div>');
};

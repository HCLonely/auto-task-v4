/*
 * @Author       : HCLonely
 * @Date         : 2021-10-26 15:44:54
 * @LastEditTime : 2021-11-08 13:26:13
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/index.ts
 * @Description  :
 */
import Swal from 'sweetalert2';
import * as Cookies from 'js-cookie';
import Discord from './scripts/social/Discord';
import Instagram from './scripts/social/Instagram';
import Reddit from './scripts/social/Reddit';
import Twitch from './scripts/social/Twitch';
import Twitter from './scripts/social/Twitter';
import Vk from './scripts/social/Vk';
import Youtube from './scripts/social/Youtube';
import Steam from './scripts/social/Steam';
import Freeanywhere from './scripts/website/freeanywhere';
import Giveawaysu from './scripts/website/Giveawaysu';

declare const commonOptions: {
  headers?: {
    'Client-ID': string
  }
};

if (window.location.hostname === 'discord.com') {
  const discordAuth = window.localStorage.getItem('token')?.replace(/^"|"$/g, '');
  GM_setValue('discordAuth', { auth: discordAuth }); // eslint-disable-line new-cap
  if (discordAuth && window.location.hash === '#auth') {
    window.close();
    Swal.fire('', '如果此页面没有自动关闭，请自行关闭本页面。');
  }
}
window.onload = () => {
  if (window.location.hostname === 'www.twitch.tv' && window.location.hash === '#auth') {
    const authToken = Cookies.get('auth-token');
    const isLogin = !!Cookies.get('login');
    if (isLogin) {
      GM_setValue('twitchAuth', { authToken, clientId: commonOptions?.headers?.['Client-ID'] }); // eslint-disable-line new-cap
      window.close();
      Swal.fire('', '如果此页面没有自动关闭，请自行关闭本页面。');
    } else {
      Swal.fire('', '请先登录！');
    }
  }
  if (window.location.hostname === 'twitter.com' && window.location.hash === '#auth') {
    const ct0 = Cookies.get('ct0');
    const isLogin = !!Cookies.get('twid');
    if (isLogin && ct0) {
      GM_setValue('twitterAuth', { ct0 }); // eslint-disable-line new-cap
      window.close();
      Swal.fire('', '如果此页面没有自动关闭，请自行关闭本页面。');
    } else {
      Swal.fire('', '请先登录！');
    }
  }
  if (window.location.hostname === 'www.youtube.com' && window.location.hash === '#auth') {
    const PAPISID = Cookies.get('__Secure-3PAPISID');
    if (PAPISID) {
      GM_setValue('youtubeAuth', { PAPISID }); // eslint-disable-line new-cap
      window.close();
      Swal.fire('', '如果此页面没有自动关闭，请自行关闭本页面。');
    } else {
      Swal.fire('', '请先登录！');
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
  unsafeWindow.Steam = Steam;
  unsafeWindow.Freeanywhere = Freeanywhere;
  const gs = new Giveawaysu();
  unsafeWindow.gs = gs;

  $('body').append('<div id="fuck-task-info" style="position:fixed;bottom:10px;right:10px;width:300px;max-width:60%;"></div>');
  gs.before();
};

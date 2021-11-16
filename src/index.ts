/*
 * @Author       : HCLonely
 * @Date         : 2021-10-26 15:44:54
 * @LastEditTime : 2021-11-16 10:15:28
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
import Freeanywhere from './scripts/website/FreeAnyWhere';
import { GiveawaySu } from './scripts/website/GiveawaySu';
import Indiedb from './scripts/website/Indiedb';
import Keyhub from './scripts/website/Keyhub';
import Givekey from './scripts/website/Givekey';
import GiveeClub from './scripts/website/GiveeClub';
import OpiumPulses from './scripts/website/OpiumPulses';
import Keylol from './scripts/website/Keylol';

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
  /*
  unsafeWindow.Discord = Discord;
  unsafeWindow.Instagram = Instagram;
  unsafeWindow.Reddit = Reddit;
  unsafeWindow.Twitch = Twitch;
  unsafeWindow.Twitter = Twitter;
  unsafeWindow.Vk = Vk;
  unsafeWindow.Youtube = Youtube;
  unsafeWindow.Steam = Steam;
  */
  unsafeWindow.Freeanywhere = Freeanywhere;
  const gs = new GiveawaySu();
  unsafeWindow.gs = gs;
  unsafeWindow.Indiedb = Indiedb;
  unsafeWindow.Keyhub = Keyhub;
  unsafeWindow.Givekey = Givekey;
  unsafeWindow.GiveeClub = GiveeClub;
  unsafeWindow.OpiumPulses = OpiumPulses;
  const keylol = new Keylol();
  unsafeWindow.keylol = keylol;

  $('body').append('<div id="fuck-task-info" style="position:fixed;bottom:10px;right:10px;width:300px;max-width:60%;max-height: 600px;overflow-y: auto;background-color:#fff;"></div>'); // eslint-disable-line
  if (gs.test()) gs.before();

  // do something
  if (keylol.test()) keylol.after();

  // eslint-disable-next-line new-cap
  GM_addStyle(`
  .auto-task-keylol {
    text-transform: capitalize;
    margin-left: 10px;
  }
  .auto-task-keylol[selected="selected"] {
    background-color: blue;
    color: #fff;
  }
  #fuck-task-info .success {
    color: green;
  }
  #fuck-task-info .error {
    color: red;
  }
  #fuck-task-info .warning {
    color: blue;
  }
  #fuck-task-info .info {
    color: yellow;
  }
`);
};

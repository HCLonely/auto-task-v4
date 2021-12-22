/*
 * @Author       : HCLonely
 * @Date         : 2021-10-26 15:44:54
 * @LastEditTime : 2021-12-22 17:54:34
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/index.ts
 * @Description  :
 */
import Swal from 'sweetalert2';
import * as Cookies from 'js-cookie';
// @ts-ignore
import style from './style/auto-task.scss';
import FreeAnyWhere from './scripts/website/FreeAnyWhere';
import { GiveawaySu } from './scripts/website/GiveawaySu';
import Indiedb from './scripts/website/Indiedb';
import Keyhub from './scripts/website/Keyhub';
import Givekey from './scripts/website/Givekey';
import GiveeClub from './scripts/website/GiveeClub';
import OpiumPulses from './scripts/website/OpiumPulses';
import Keylol from './scripts/website/Keylol';
import Opquests from './scripts/website/Opquests';
import Gleam from './scripts/website/Gleam';
import SweepWidget from './scripts/website/SweepWidget';
import whiteListOptions from './scripts/social/whiteList';
import websiteOptions from './scripts/website/options';
import __ from './scripts/tools/i18n';

type WebsitesType = typeof FreeAnyWhere |
  typeof GiveawaySu |
  typeof Indiedb |
  typeof Keyhub |
  typeof Givekey |
  typeof GiveeClub |
  typeof OpiumPulses |
  typeof Keylol |
  typeof Opquests |
  typeof Gleam |
  typeof SweepWidget

type WebsiteType = FreeAnyWhere |
  GiveawaySu |
  Indiedb |
  Keyhub |
  Givekey |
  GiveeClub |
  OpiumPulses |
  Keylol |
  Opquests |
  Gleam |
  SweepWidget

const Websites: Array<WebsitesType> = [
  FreeAnyWhere, GiveawaySu, Indiedb, Keyhub, Givekey, GiveeClub, OpiumPulses, Keylol, Opquests, Gleam, SweepWidget
];
let website: WebsiteType;
for (const Website of Websites) {
  if (Website.test()) {
    website = new Website();
    break;
  }
}

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
if (window.location.hostname === 'gleam.io') {
  // 待更新
}
window.onload = async () => {
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

  if (!website) return;

  $('body').append('<div id="auto-task-info"></div>'); // eslint-disable-line
  // @ts-ignore
  if (website.before) await website.before();

  // do something
  // @ts-ignore
  if (website.after) await website.after();

  // @ts-ignore
  if (website.doTask) GM_registerMenuCommand('doTask', () => { website.doTask(); }); // eslint-disable-line new-cap
  // @ts-ignore
  if (website.undoTask) GM_registerMenuCommand('undoTask', () => { website.undoTask(); }); // eslint-disable-line new-cap
  // @ts-ignore
  if (website.verifyTask) GM_registerMenuCommand('verifyTask', () => { website.verifyTask(); }); // eslint-disable-line new-cap
  // @ts-ignore
  if (website.getKey) GM_registerMenuCommand('getKey', () => { website.getKey(); }); // eslint-disable-line new-cap
  // @ts-ignore
  if (website.doFreeTask) GM_registerMenuCommand('doFreeTask', website.doFreeTask); // eslint-disable-line new-cap
  // @ts-ignore
  if (website.doPointTask) GM_registerMenuCommand('doPointTask', website.doPointTask); // eslint-disable-line new-cap
  GM_registerMenuCommand('whiteList', whiteListOptions); // eslint-disable-line new-cap
  // @ts-ignore
  if (website.options) {
  // @ts-ignore
    GM_registerMenuCommand('options', () => { websiteOptions(website.name, website.options); }); // eslint-disable-line new-cap
  }

  // 调试用
  unsafeWindow.website = website;

  GM_addStyle(style); // eslint-disable-line new-cap
  console.log('%c%s', 'color:#1bbe1a', 'Auto Task脚本初始化完成！');
};

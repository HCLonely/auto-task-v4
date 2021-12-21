/*
 * @Author       : HCLonely
 * @Date         : 2021-10-26 15:44:54
 * @LastEditTime : 2021-12-21 13:39:28
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/index.ts
 * @Description  :
 */
import Swal from 'sweetalert2';
import * as Cookies from 'js-cookie';
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
window.onload = () => {
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
  if (website.before) website.before();

  // do something
  // @ts-ignore
  if (website.after) website.after();

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
  unsafeWindow.website = website;
  // eslint-disable-next-line new-cap
  GM_addStyle(`
  #auto-task-info {
    position: fixed;
    bottom: 10px;
    right: 10px;
    width: 300px;
    max-width: 60%;
    max-height: 600px;
    overflow-y: auto;
    color: #000;
    background-color: #fff;
    padding-left: 5px;
  }
  #auto-task-info > li {
    text-align: left;
  }
  .auto-task-keylol {
    text-transform: capitalize;
    margin-left: 10px;
    text-decoration: none !important;
    border: solid 1px;
    border-radius: 5px;
    padding: 0 2px;
  }
  .auto-task-keylol[selected="selected"] {
    background-color: blue;
    color: #fff;
  }
  #auto-task-info .success {
    color: green;
  }
  #auto-task-info .error {
    color: red;
  }
  #auto-task-info .warning {
    color: blue;
  }
  #auto-task-info .info {
    color: yellow;
  }
  .auto-task-form table {
    font-family: verdana, arial, sans-serif;
    font-size: 11px;
    color: #333333;
    border-width: 1px;
    border-color: #999999;
    border-collapse: collapse;
    width: 100%;
  }

  .auto-task-form table th {
    background-color: #c3dde0;
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #a9c6c9;
  }

  .auto-task-form table tr {
    background-color: #d4e3e5;
  }

  .auto-task-form table tr:hover {
    background-color: #ffff66;
  }

  .auto-task-form table td {
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #a9c6c9;
  }
`);

  console.log('%c%s', 'color:#1bbe1a', 'Auto Task脚本初始化完成！');
};

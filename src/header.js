/*
 * @Author       : HCLonely
 * @Date         : 2021-11-01 13:39:04
 * @LastEditTime : 2021-11-18 09:44:33
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/header.js
 * @Description  :
 */
// ==UserScript==
// @name               auto-task-new
// @namespace          auto-task-new
// @version            4.0.0-Alpha
// @description        赠Key站自动任务
// @author             HCLonely
// @run-at             document-start
// @compatible         chrome 没有测试其他浏览器的兼容性

// @include            *://freeanywhere.net/*
// @include            *://giveaway.su/giveaway/view/*
// @include            *://givee.club/*/event/*
// @include            *://givekey.ru/giveaway/*
// @include            *://www.indiedb.com/giveaways*
// @include            *://key-hub.eu/giveaway/*
// @include            *://keylol.com/*
// @include            *://www.opiumpulses.com/giveaways
// @include            *://prys.revadike.com/giveaway/?id=*
// @include            *://discord.com/*
// @include            *://www.twitch.tv/*
// @include            *://www.youtube.com/*
// @include            *://*.reddit.com/*
// @include            *://twitter.com/settings/account?k*

// @grant              GM_setValue
// @grant              GM_getValue
// @grant              GM_listValues
// @grant              GM_deleteValue
// @grant              GM_addValueChangeListener
// @grant              GM_addStyle
// @grant              GM_xmlhttpRequest
// @grant              GM_getResourceText
// @grant              GM_registerMenuCommand
// @grant              GM_info
// @grant              GM_openInTab
// @grant              GM_notification
// @grant              unsafeWindow
// @grant              window.close
// @grant              window.localStorage

// @connect            cdn.jsdelivr.net
// @connect            store.steampowered.com
// @connect            steamcommunity.com
// @connect            twitter.com
// @connect            api.twitter.com
// @connect            youtube.com
// @connect            www.youtube.com
// @connect            facebook.com
// @connect            instagram.com
// @connect            vk.com
// @connect            twitch.tv
// @connect            www.twitch.tv
// @connect            gql.twitch.tv
// @connect            github.com
// @connect            discordapp.com
// @connect            discord.gg
// @connect            discord.com
// @connect            www.reddit.com
// @connect            oauth.reddit.com
// @connect            raw.githubusercontent.com
// @connect            t.me
// @connect            bit.ly
// @connect            giveaway.su
// @connect            google.com
// @connect            *
// @require            https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js
// @require            https://cdn.jsdelivr.net/npm/js-cookie@3.0.1/dist/js.cookie.min.js
// @require            https://cdn.jsdelivr.net/npm/regenerator-runtime@0.13.5/runtime.min.js
// @require            https://cdn.jsdelivr.net/npm/js-sha1@0.6.0/src/sha1.min.js
// @require            https://cdn.jsdelivr.net/npm/sweetalert2@11
// ==/UserScript==

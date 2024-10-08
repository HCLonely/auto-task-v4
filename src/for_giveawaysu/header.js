// ==UserScript==
// @name               __NAME__
// @namespace          __NAME__
// @version            __VERSION__
// @description        赠Key站自动任务
// @author             HCLonely
// @license            MIT
// @run-at             document-start
// @homepage           https://auto-task-doc.js.org/
// @supportURL         https://github.com/HCLonely/auto-task-v4/issues
// @updateURL          __UPDATE_URL__
// @installURL         __UPDATE_URL__
// @downloadURL        __UPDATE_URL__
// @icon               https://auto-task-v4.hclonely.com/favicon.ico

// @include            *://giveaway.su/giveaway/view/*
// @include            *://discord.com/*
// @include            *://www.twitch.tv/*
// @include            *://www.youtube.com/*
// @include            *://*.reddit.com/*
// @include            *://steamcommunity.com/id/*
// @include            *://store.steampowered.com/*

// @grant              GM_addStyle
// @grant              GM_setValue
// @grant              GM_getValue
// @grant              GM_xmlhttpRequest
// @grant              GM_registerMenuCommand
// @grant              GM_info
// @grant              GM_getResourceText
// @grant              GM_openInTab
// @grant              GM_cookie
// @grant              GM_addValueChangeListener
// @grant              GM_removeValueChangeListener
// @grant              GM_setClipboard
// @grant              GM_listValues
// @grant              GM_deleteValue
// @grant              unsafeWindow
// @grant              window.close
// @grant              window.localStorage

// @connect            cdn.jsdelivr.net
// @connect            store.steampowered.com
// @connect            steamcommunity.com
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
// @connect            givee.club
// @connect            *
// @require            https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js
// @require            https://cdn.jsdelivr.net/npm/js-cookie@3.0.1/dist/js.cookie.min.js
// @require            https://cdn.jsdelivr.net/npm/regenerator-runtime@0.13.5/runtime.min.js
// @require            https://cdn.jsdelivr.net/npm/js-sha1@0.6.0/src/sha1.min.js
// @require            https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.js
// @resource           style https://cdn.jsdelivr.net/npm/sweetalert2@11.3.5/dist/sweetalert2.min.css
// @require            https://cdn.jsdelivr.net/npm/keyboardjs@2.6.4/dist/keyboard.min.js

// @noframes
// ==/UserScript==

console.log('%c%s', 'color:blue', 'Auto Task GS特供脚本开始加载');

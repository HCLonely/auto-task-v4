// ==UserScript==
// @name               auto-task-new
// @namespace          http://tampermonkey.net/
// @version            0.1
// @description        try to take over the world!
// @author             HCLonely
// @include            *://*/*
// @include            https://auto-task.hclonely.com/setting.html
// @run-at             document-start
// @compatible         chrome 没有测试其他浏览器的兼容性

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
// ==/UserScript==

(function() {
  'use strict';
  var __webpack_exports__ = {};
  function throwError_throwError(error, name) {
    console.log('%c%s', 'color:white;background:red', `${name}\n${error.stack}`);
  }
  const unique = array => {
    try {
      return [ ...new Set(array) ];
    } catch (error) {
      throwError_throwError(error, 'unique');
      return [];
    }
  };
  const delay = function() {
    let time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1e3;
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  class Social {
    constructor() {
      _defineProperty(this, 'tasks', void 0);
    }
    getRealParams(name, params, links, doTask, link2param) {
      try {
        let realParams = [];
        if (params.length > 0) {
          realParams = [ ...params ];
        }
        if (links.length > 0) {
          realParams = [ ...realParams, ...links.map(link => link2param(link)).filter(link => link) ];
        }
        if (!doTask && this.tasks[name].length > 0) {
          realParams = [ ...realParams, ...this.tasks[name] ];
        }
        return unique(realParams);
      } catch (error) {
        throwError_throwError(error, 'Social.getRealParams');
        return [];
      }
    }
  }
  const social_Social = Social;
  const httpRequest_httpRequest = async function(options) {
    let times = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    try {
      const result = await new Promise(resolve => {
        if (options.dataType) {
          options.responseType = options.dataType;
        }
        const requestObj = {
          ...{
            timeout: 3e4,
            ontimeout(data) {
              resolve({
                result: 'Error',
                statusText: 'Timeout',
                status: 601,
                data: data,
                options: options
              });
            },
            onabort(data) {
              resolve({
                result: 'Error',
                statusText: 'Aborted',
                status: 602,
                data: data,
                options: options
              });
            },
            onerror(data) {
              resolve({
                result: 'Error',
                statusText: 'Error',
                status: 603,
                data: data,
                options: options
              });
            },
            onload(data) {
              resolve({
                result: 'Success',
                statusText: 'Load',
                status: 600,
                data: data,
                options: options
              });
            }
          },
          ...options
        };
        GM_xmlhttpRequest(requestObj);
      });
      console.log('发送请求:', result);
      if (result.status !== 600 && times < 2) {
        return await httpRequest_httpRequest(options, times + 1);
      }
      return result;
    } catch (error) {
      throwError_throwError(error, 'httpRequest');
      console.log('发送请求:', {
        errorMsg: error,
        options: options
      });
      return {
        result: 'JsError',
        statusText: 'Error',
        status: 604,
        error: error,
        options: options
      };
    }
  };
  const tools_httpRequest = httpRequest_httpRequest;
  function getI18n() {
    for (var _len = arguments.length, argvs = new Array(_len), _key = 0; _key < _len; _key++) {
      argvs[_key] = arguments[_key];
    }
    return argvs.join(' ');
  }
  const i18n = getI18n;
  const echoLog_echoLog = _ref => {
    let {
      type = 'text',
      text,
      url,
      id
    } = _ref;
    try {
      let ele;
      switch (type) {
       case 'updateSteamCommunity':
        ele = $(`<li>${i18n('updateCommunityId')}<font></font></li>`);
        break;

       case 'updateSteamStore':
        ele = $(`<li>${i18n('updateStoreId')}<font></font></li>`);
        break;

       case 'joinSteamGroup':
       case 'leaveSteamGroup':
       case 'getSteamGroupId':
        ele = $(`<li>${i18n(type)}<a href="https://steamcommunity.com/groups/${text}" target="_blank">${text}</a>...<font></font></li>`);
        break;

       case 'subscribeForum':
       case 'unsubscribeForum':
       case 'getForumId':
        ele = $(`<li>${i18n(type)}<a href="https://steamcommunity.com/app/${text}/discussions/" target="_blank">${text}</a>...<font></font></li>`);
        break;

       case 'followCurator':
       case 'unfollowCurator':
       case 'getCuratorId':
        ele = $(`<li>${i18n(type)}<a href="https://store.steampowered.com/${text !== null && text !== void 0 && text.includes('/') ? text : `curator/${text}`}" target="_blank">${text}</a>...<font></font></li>`);
        break;

       case 'getDeveloperId':
       case 'followDeveloper':
       case 'unfollowDeveloper':
        ele = $(`<li>${i18n(type)}<a href="https://store.steampowered.com/developer/${text}" target="_blank">${text}</a>...<font></font></li>`);
        break;

       case 'getPublisherId':
       case 'followPublisher':
       case 'unfollowPublisher':
        ele = $(`<li>${i18n(type)}<a href="https://store.steampowered.com/publisher/${text}" target="_blank">${text}</a>...<font></font></li>`);
        break;

       case 'getFranchiseId':
       case 'followFranchise':
       case 'unfollowFranchise':
        ele = $(`<li>${i18n(type)}<a href="https://store.steampowered.com/franchise/${text}" target="_blank">${text}</a>...<font></font></li>`);
        break;

       case 'addWishlist':
       case 'removeWishlist':
       case 'followGame':
       case 'unfollowGame':
        ele = $(`<li>${i18n(type)}<a href="https://store.steampowered.com/app/${text}" target="_blank">${text}</a>...<font></font></li>`);
        break;

       case 'favoriteWorkshop':
       case 'unfavoriteWorkshop':
       case 'getWorkshopAppId':
       case 'voteupWorkshop':
        ele = $(`<li>${i18n(type)}<a href="https://steamcommunity.com/sharedfiles/filedetails/?id=${text}" target="_blank">
      ${text}</a>...<font></font></li>`);
        break;

       case 'likeAnnouncements':
        ele = $(`<li>${i18n('likeAnnouncements')}<a href="${url}" target="_blank">${id}</a>...<font></font></li>`);
        break;

       case 'changeCountry':
        ele = $(`<li>${i18n('changeCountry')}${text}...<font></font></li>`);
        break;

       case 'joinDiscordServer':
       case 'leaveDiscordServer':
       case 'getDiscordGuild':
        ele = $(`<li>${i18n(type)}<a href="https://discord.com/invite/${text}" target="_blank">${text}</a>...<font></font></li>`);
        break;

       case 'updateDiscordAuth':
        ele = $(`<li style="color:red;">${i18n('updateDiscordAuth')}</li>`);
        break;

       case 'followTwitchChannel':
       case 'unfollowTwitchChannel':
       case 'getTwitchChannelId':
        ele = $(`<li>${i18n(type)}<a href="https://www.twitch.tv/${text}" target="_blank">${text}</a>...<font></font></li>`);
        break;

       case 'getInsInfo':
        ele = $(`<li>${i18n('getInsInfo')}<a href="https://www.instagram.com/${text}/" target="_blank">${text}</a>...<font></font></li>`);
        break;

       case 'followIns':
       case 'unfollowIns':
        ele = $(`<li>${i18n(type)}<a href="https://www.instagram.com/${text}/" target="_blank">${text}</a>...<font></font></li>`);
        break;

       case 'getTwitterUserId':
       case 'followTwitterUser':
       case 'unfollowTwitterUser':
        ele = $(`<li>${i18n(type)}<a href="https://twitter.com/${text}" target="_blank">${text}</a>...<font></font></li>`);
        break;

       case 'retweet':
       case 'unretweet':
        ele = $(`<li>${i18n(type)}${text}...<font></font></li>`);
        break;

       case 'joinReddit':
       case 'leaveReddit':
        ele = $(`<li>${i18n(type)}<a href="https://www.reddit.com/r/${text}/" target="_blank">${text}</a>...<font></font></li>`);
        break;

       case 'followRedditUser':
       case 'unfollowRedditUser':
        ele = $(`<li>${i18n(type)}<a href="https://www.reddit.com/user/${text === null || text === void 0 ? void 0 : text.replace('u_', '')}" target="_blank">
      ${text === null || text === void 0 ? void 0 : text.replace('u_', '')}</a>...<font></font></li>`);
        break;

       case 'followYtbChannel':
       case 'unfollowYtbChannel':
        ele = $(`<li>${i18n(type)}<a href="https://www.youtube.com/channel/${text}" target="_blank">${text}</a>...<font></font></li>`);
        break;

       case 'likeYtbVideo':
       case 'unlikeYtbVideo':
        ele = $(`<li>${i18n(type)}<a href="https://www.youtube.com/watch?v=${text}" target="_blank">${text}</a>...<font></font></li>`);
        break;

       case 'getVkId':
       case 'joinVkGroup':
       case 'leaveVkGroup':
       case 'joinVkPublic':
       case 'leaveVkPublic':
       case 'repostVkWall':
        ele = $(`<li>${i18n(type)}<a href="https://vk.com/${text}/" target="_blank">${text}</a>...<font></font></li>`);
        break;

       case 'visitLink':
        ele = $(`<li>${i18n('visitLink')}<a href="${text}" target="_blank">${text}</a>...<font></font></li>`);
        break;

       case 'text':
        ele = $(`<li>${i18n(text)}<font></font></li>`);
        break;

       case 'html':
        ele = $(text);
        break;

       default:
        ele = $(`<li>${i18n('unknown')}:${type}...<font></font></li>`);
        break;
      }
      ele.addClass('card-text');
      $('#fuck-task-info').append(ele);
      ele[0].scrollIntoView();
      const font = ele.find('font');
      const status = {
        font: font,
        success() {
          var _this$font, _this$font2, _this$font3;
          let text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Success';
          let html = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          (_this$font = this.font) === null || _this$font === void 0 ? void 0 : _this$font.attr('class', '').addClass('success');
          html ? (_this$font2 = this.font) === null || _this$font2 === void 0 ? void 0 : _this$font2.html(text) : (_this$font3 = this.font) === null || _this$font3 === void 0 ? void 0 : _this$font3.text(text);
          return this;
        },
        error() {
          var _this$font4, _this$font5, _this$font6;
          let text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Error';
          let html = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          (_this$font4 = this.font) === null || _this$font4 === void 0 ? void 0 : _this$font4.attr('class', '').addClass('error');
          html ? (_this$font5 = this.font) === null || _this$font5 === void 0 ? void 0 : _this$font5.html(text) : (_this$font6 = this.font) === null || _this$font6 === void 0 ? void 0 : _this$font6.text(text);
          return this;
        },
        warning() {
          var _this$font7, _this$font8, _this$font9;
          let text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Warning';
          let html = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          (_this$font7 = this.font) === null || _this$font7 === void 0 ? void 0 : _this$font7.attr('class', '').addClass('warning');
          html ? (_this$font8 = this.font) === null || _this$font8 === void 0 ? void 0 : _this$font8.html(text) : (_this$font9 = this.font) === null || _this$font9 === void 0 ? void 0 : _this$font9.text(text);
          return this;
        },
        info() {
          var _this$font10, _this$font11, _this$font12;
          let text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Info';
          let html = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          (_this$font10 = this.font) === null || _this$font10 === void 0 ? void 0 : _this$font10.attr('class', '').addClass('info');
          html ? (_this$font11 = this.font) === null || _this$font11 === void 0 ? void 0 : _this$font11.html(text) : (_this$font12 = this.font) === null || _this$font12 === void 0 ? void 0 : _this$font12.text(text);
          return this;
        },
        view() {
          var _this$font13;
          (_this$font13 = this.font) === null || _this$font13 === void 0 ? void 0 : _this$font13[0].scrollIntoView();
          return this;
        }
      };
      return status;
    } catch (error) {
      throwError_throwError(error, 'echoLog');
      const status = {
        success: () => status,
        error: () => status,
        warning: () => status,
        info: () => status,
        view: () => status
      };
      return status;
    }
  };
  const scripts_echoLog = echoLog_echoLog;
  function _classPrivateMethodInitSpec(obj, privateSet) {
    _checkPrivateRedeclaration(obj, privateSet);
    privateSet.add(obj);
  }
  function _classPrivateFieldInitSpec(obj, privateMap, value) {
    _checkPrivateRedeclaration(obj, privateMap);
    privateMap.set(obj, value);
  }
  function _checkPrivateRedeclaration(obj, privateCollection) {
    if (privateCollection.has(obj)) {
      throw new TypeError('Cannot initialize the same private elements twice on an object');
    }
  }
  function Discord_defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _classPrivateFieldSet(receiver, privateMap, value) {
    var descriptor = _classExtractFieldDescriptor(receiver, privateMap, 'set');
    _classApplyDescriptorSet(receiver, descriptor, value);
    return value;
  }
  function _classApplyDescriptorSet(receiver, descriptor, value) {
    if (descriptor.set) {
      descriptor.set.call(receiver, value);
    } else {
      if (!descriptor.writable) {
        throw new TypeError('attempted to set read only private field');
      }
      descriptor.value = value;
    }
  }
  function _classPrivateMethodGet(receiver, privateSet, fn) {
    if (!privateSet.has(receiver)) {
      throw new TypeError('attempted to get private field on non-instance');
    }
    return fn;
  }
  function _classPrivateFieldGet(receiver, privateMap) {
    var descriptor = _classExtractFieldDescriptor(receiver, privateMap, 'get');
    return _classApplyDescriptorGet(receiver, descriptor);
  }
  function _classExtractFieldDescriptor(receiver, privateMap, action) {
    if (!privateMap.has(receiver)) {
      throw new TypeError('attempted to ' + action + ' private field on non-instance');
    }
    return privateMap.get(receiver);
  }
  function _classApplyDescriptorGet(receiver, descriptor) {
    if (descriptor.get) {
      return descriptor.get.call(receiver);
    }
    return descriptor.value;
  }
  var _auth = new WeakMap();
  var _cache = new WeakMap();
  var _initialized = new WeakMap();
  var _verifyAuth = new WeakSet();
  var _updateAuth = new WeakSet();
  var _joinServer = new WeakSet();
  var _leaveServer = new WeakSet();
  var _getGuild = new WeakSet();
  var _addId = new WeakSet();
  class Discord extends social_Social {
    constructor(tasks) {
      var _GM_getValue;
      super();
      _classPrivateMethodInitSpec(this, _addId);
      _classPrivateMethodInitSpec(this, _getGuild);
      _classPrivateMethodInitSpec(this, _leaveServer);
      _classPrivateMethodInitSpec(this, _joinServer);
      _classPrivateMethodInitSpec(this, _updateAuth);
      _classPrivateMethodInitSpec(this, _verifyAuth);
      Discord_defineProperty(this, 'tasks', void 0);
      Discord_defineProperty(this, 'whiteList', ((_GM_getValue = GM_getValue('whiteList')) === null || _GM_getValue === void 0 ? void 0 : _GM_getValue.discord) || {
        servers: []
      });
      _classPrivateFieldInitSpec(this, _auth, {
        writable: true,
        value: GM_getValue('discordAuth') || {}
      });
      _classPrivateFieldInitSpec(this, _cache, {
        writable: true,
        value: GM_getValue('discordCache') || {}
      });
      _classPrivateFieldInitSpec(this, _initialized, {
        writable: true,
        value: false
      });
      this.tasks = tasks || {
        servers: []
      };
    }
    async init() {
      try {
        if (!_classPrivateFieldGet(this, _auth).auth) {
          scripts_echoLog({
            type: 'updateDiscordAuth'
          });
          if (await _classPrivateMethodGet(this, _updateAuth, _updateAuth2).call(this)) {
            _classPrivateFieldSet(this, _initialized, true);
            return true;
          }
          return false;
        }
        const isVerified = await _classPrivateMethodGet(this, _verifyAuth, _verifyAuth2).call(this);
        if (isVerified) {
          scripts_echoLog({
            text: 'Init discord success!'
          });
          _classPrivateFieldSet(this, _initialized, true);
          return true;
        }
        GM_setValue('discordAuth', {
          auth: null
        });
        if (await _classPrivateMethodGet(this, _updateAuth, _updateAuth2).call(this)) {
          scripts_echoLog({
            text: 'Init discord success!'
          });
          _classPrivateFieldSet(this, _initialized, true);
          return true;
        }
        scripts_echoLog({
          text: 'Init discord failed!'
        });
        return false;
      } catch (error) {
        throwError_throwError(error, 'Discord.init');
        return false;
      }
    }
    async toggle(_ref) {
      let {
        doTask = true,
        servers = [],
        serverLinks = []
      } = _ref;
      try {
        if (!_classPrivateFieldGet(this, _initialized)) {
          scripts_echoLog({
            type: 'text',
            text: '请先初始化'
          });
          return false;
        }
        const prom = [];
        const realServers = this.getRealParams('servers', servers, serverLinks, doTask, link => {
          var _link$match;
          return (_link$match = link.match(/invite\/(.+)/)) === null || _link$match === void 0 ? void 0 : _link$match[1];
        });
        if (realServers.length > 0) {
          for (const server of realServers) {
            if (doTask) {
              prom.push(_classPrivateMethodGet(this, _joinServer, _joinServer2).call(this, server));
            } else {
              prom.push(_classPrivateMethodGet(this, _leaveServer, _leaveServer2).call(this, server));
            }
            await delay(1e3);
          }
        }
        return await Promise.all(prom).then(() => true);
      } catch (error) {
        throwError_throwError(error, 'Discord.toggleServers');
        return false;
      }
    }
  }
  async function _verifyAuth2() {
    try {
      const logStatus = scripts_echoLog({
        type: 'text',
        text: 'verifyDiscordAuth'
      });
      const {
        result,
        statusText,
        status,
        data
      } = await tools_httpRequest({
        url: 'https://discord.com/api/v6/users/@me',
        method: 'HEAD',
        headers: {
          authorization: _classPrivateFieldGet(this, _auth).auth
        }
      });
      if (result === 'Success') {
        if ((data === null || data === void 0 ? void 0 : data.status) === 200) {
          logStatus.success();
          return true;
        }
        logStatus.error(`Error:${data === null || data === void 0 ? void 0 : data.statusText}(${data === null || data === void 0 ? void 0 : data.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError_throwError(error, 'Discord.verifyAuth');
      return false;
    }
  }
  async function _updateAuth2() {
    try {
      const logStatus = scripts_echoLog({
        type: 'text',
        text: 'updateDiscordAuth'
      });
      return await new Promise(resolve => {
        const newTab = GM_openInTab('https://discord.com/channels/@me#auth', {
          active: true,
          insert: true,
          setParent: true
        });
        newTab.onclose = async () => {
          var _GM_getValue2;
          const auth = (_GM_getValue2 = GM_getValue('discordAuth')) === null || _GM_getValue2 === void 0 ? void 0 : _GM_getValue2.auth;
          if (auth) {
            _classPrivateFieldSet(this, _auth, {
              auth: auth
            });
            logStatus.success();
            resolve(await _classPrivateMethodGet(this, _verifyAuth, _verifyAuth2).call(this));
          } else {
            logStatus.error('Error: Update discord auth failed!');
            resolve(false);
          }
        };
      });
    } catch (error) {
      throwError_throwError(error, 'Discord.updateAuth');
      return false;
    }
  }
  async function _joinServer2(inviteId) {
    try {
      const logStatus = scripts_echoLog({
        type: 'joinDiscordServer',
        text: inviteId
      });
      const {
        result,
        statusText,
        status,
        data
      } = await tools_httpRequest({
        url: `https://discord.com/api/v6/invites/${inviteId}`,
        method: 'POST',
        dataType: 'json',
        headers: {
          authorization: _classPrivateFieldGet(this, _auth).auth
        }
      });
      if (result === 'Success' && (data === null || data === void 0 ? void 0 : data.status) === 200) {
        var _data$response, _data$response$guild;
        logStatus.success();
        const guild = String((_data$response = data.response) === null || _data$response === void 0 ? void 0 : (_data$response$guild = _data$response.guild) === null || _data$response$guild === void 0 ? void 0 : _data$response$guild.id);
        if (guild) {
          _classPrivateMethodGet(this, _addId, _addId2).call(this, inviteId, guild);
          this.tasks.servers = unique([ ...this.tasks.servers, inviteId ]);
        }
        return true;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError_throwError(error, 'Discord.joinServer');
      return false;
    }
  }
  async function _leaveServer2(inviteId) {
    try {
      if (this.whiteList.servers.includes(inviteId)) {
        scripts_echoLog({
          type: 'whiteList',
          text: inviteId
        });
        return true;
      }
      const guild = await _classPrivateMethodGet(this, _getGuild, _getGuild2).call(this, inviteId);
      if (!guild) {
        return false;
      }
      const logStatus = scripts_echoLog({
        type: 'leaveDiscordServer',
        text: inviteId
      });
      const {
        result,
        statusText,
        status,
        data
      } = await tools_httpRequest({
        url: `https://discord.com/api/v6/users/@me/guilds/${guild}`,
        method: 'DELETE',
        headers: {
          authorization: _classPrivateFieldGet(this, _auth).auth
        }
      });
      if (result === 'Success' && (data === null || data === void 0 ? void 0 : data.status) === 204) {
        logStatus.success();
        return true;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError_throwError(error, 'Discord.leaveServer');
      return false;
    }
  }
  async function _getGuild2(inviteId) {
    try {
      const logStatus = scripts_echoLog({
        type: 'getDiscordGuild',
        text: inviteId
      });
      const guild = _classPrivateFieldGet(this, _cache)[inviteId];
      if (guild) {
        logStatus.success();
        return guild;
      }
      const {
        result,
        statusText,
        status,
        data
      } = await tools_httpRequest({
        url: `https://discord.com/invite/${inviteId}`,
        method: 'GET'
      });
      if (result === 'Success' && (data === null || data === void 0 ? void 0 : data.status) === 200) {
        var _data$responseText$ma;
        const guild = (_data$responseText$ma = data.responseText.match(/https?:\/\/cdn\.discordapp\.com\/icons\/([\d]+?)\//)) === null || _data$responseText$ma === void 0 ? void 0 : _data$responseText$ma[1];
        if (guild) {
          logStatus.success();
          _classPrivateMethodGet(this, _addId, _addId2).call(this, inviteId, guild);
          return guild;
        }
        logStatus.error(`${result}:${statusText}(${status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError_throwError(error, 'Discord.getGuild');
      return false;
    }
  }
  function _addId2(inviteId, guild) {
    _classPrivateFieldGet(this, _cache)[inviteId] = guild;
    GM_setValue('discordCache', _classPrivateFieldGet(this, _cache));
  }
  const social_Discord = Discord;
  function Instagram_classPrivateMethodInitSpec(obj, privateSet) {
    Instagram_checkPrivateRedeclaration(obj, privateSet);
    privateSet.add(obj);
  }
  function Instagram_classPrivateFieldInitSpec(obj, privateMap, value) {
    Instagram_checkPrivateRedeclaration(obj, privateMap);
    privateMap.set(obj, value);
  }
  function Instagram_checkPrivateRedeclaration(obj, privateCollection) {
    if (privateCollection.has(obj)) {
      throw new TypeError('Cannot initialize the same private elements twice on an object');
    }
  }
  function Instagram_defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function Instagram_classPrivateFieldGet(receiver, privateMap) {
    var descriptor = Instagram_classExtractFieldDescriptor(receiver, privateMap, 'get');
    return Instagram_classApplyDescriptorGet(receiver, descriptor);
  }
  function Instagram_classApplyDescriptorGet(receiver, descriptor) {
    if (descriptor.get) {
      return descriptor.get.call(receiver);
    }
    return descriptor.value;
  }
  function Instagram_classPrivateFieldSet(receiver, privateMap, value) {
    var descriptor = Instagram_classExtractFieldDescriptor(receiver, privateMap, 'set');
    Instagram_classApplyDescriptorSet(receiver, descriptor, value);
    return value;
  }
  function Instagram_classExtractFieldDescriptor(receiver, privateMap, action) {
    if (!privateMap.has(receiver)) {
      throw new TypeError('attempted to ' + action + ' private field on non-instance');
    }
    return privateMap.get(receiver);
  }
  function Instagram_classApplyDescriptorSet(receiver, descriptor, value) {
    if (descriptor.set) {
      descriptor.set.call(receiver, value);
    } else {
      if (!descriptor.writable) {
        throw new TypeError('attempted to set read only private field');
      }
      descriptor.value = value;
    }
  }
  function Instagram_classPrivateMethodGet(receiver, privateSet, fn) {
    if (!privateSet.has(receiver)) {
      throw new TypeError('attempted to get private field on non-instance');
    }
    return fn;
  }
  var Instagram_auth = new WeakMap();
  var Instagram_initialized = new WeakMap();
  var _getUserInfo = new WeakSet();
  var _followUser = new WeakSet();
  var _unfollowUser = new WeakSet();
  class Instagram extends social_Social {
    constructor(tasks) {
      var _GM_getValue;
      super();
      Instagram_classPrivateMethodInitSpec(this, _unfollowUser);
      Instagram_classPrivateMethodInitSpec(this, _followUser);
      Instagram_classPrivateMethodInitSpec(this, _getUserInfo);
      Instagram_defineProperty(this, 'tasks', void 0);
      Instagram_defineProperty(this, 'whiteList', ((_GM_getValue = GM_getValue('whiteList')) === null || _GM_getValue === void 0 ? void 0 : _GM_getValue.instagram) || {
        users: []
      });
      Instagram_classPrivateFieldInitSpec(this, Instagram_auth, {
        writable: true,
        value: void 0
      });
      Instagram_classPrivateFieldInitSpec(this, Instagram_initialized, {
        writable: true,
        value: false
      });
      this.tasks = tasks || {
        users: []
      };
    }
    async init() {
      try {
        const isVerified = await Instagram_classPrivateMethodGet(this, _getUserInfo, _getUserInfo2).call(this);
        if (isVerified) {
          scripts_echoLog({
            text: 'Init instagram success!'
          });
          Instagram_classPrivateFieldSet(this, Instagram_initialized, true);
          return true;
        }
        scripts_echoLog({
          text: 'Init instagram failed!'
        });
        return false;
      } catch (error) {
        throwError_throwError(error, 'Instagram.init');
        return false;
      }
    }
    async toggle(_ref) {
      let {
        doTask = true,
        users = [],
        userLinks = []
      } = _ref;
      try {
        if (!Instagram_classPrivateFieldGet(this, Instagram_initialized)) {
          scripts_echoLog({
            type: 'text',
            text: '请先初始化'
          });
          return false;
        }
        const prom = [];
        const realUsers = this.getRealParams('users', users, userLinks, doTask, link => {
          var _link$match;
          return (_link$match = link.match(/https:\/\/www\.instagram\.com\/(.+)?\//)) === null || _link$match === void 0 ? void 0 : _link$match[1];
        });
        if (realUsers.length > 0) {
          for (const username of realUsers) {
            if (doTask) {
              prom.push(Instagram_classPrivateMethodGet(this, _followUser, _followUser2).call(this, username));
            } else {
              prom.push(Instagram_classPrivateMethodGet(this, _unfollowUser, _unfollowUser2).call(this, username));
            }
            await delay(1e3);
          }
        }
        return await Promise.all(prom).then(() => true);
      } catch (error) {
        throwError_throwError(error, 'Instagram.toggleUsers');
        return false;
      }
    }
  }
  async function _getUserInfo2() {
    let name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'instagram';
    try {
      const logStatus = scripts_echoLog({
        type: name === 'instagram' ? 'getInsInfo' : 'getInsUserId',
        text: name
      });
      const {
        result,
        statusText,
        status,
        data
      } = await tools_httpRequest({
        url: `https://www.instagram.com/${name}/`,
        method: 'GET'
      });
      if (result === 'Success') {
        if (data !== null && data !== void 0 && data.finalUrl.includes('accounts/login')) {
          logStatus.error(`Error:${i18n('loginIns')}`, true);
          return false;
        } else if (data !== null && data !== void 0 && data.finalUrl.includes('www.instagram.com/challenge')) {
          logStatus.error(`Error:${i18n('insBanned')}`);
          return false;
        }
        if ((data === null || data === void 0 ? void 0 : data.status) === 200) {
          var _data$responseText$ma, _data$responseText$ma2, _data$responseText$ma3;
          const csrftoken = (_data$responseText$ma = data.responseText.match(/"csrf_token":"(.+?)"/)) === null || _data$responseText$ma === void 0 ? void 0 : _data$responseText$ma[1];
          const hash = (_data$responseText$ma2 = data.responseText.match(/"rollout_hash":"(.+?)"/)) === null || _data$responseText$ma2 === void 0 ? void 0 : _data$responseText$ma2[1];
          if (name === 'instagram') {
            if (csrftoken && hash) {
              Instagram_classPrivateFieldSet(this, Instagram_auth, {
                csrftoken: csrftoken,
                hash: hash
              });
              return true;
            }
            return false;
          }
          Instagram_classPrivateFieldGet(this, Instagram_auth).csrftoken = csrftoken || Instagram_classPrivateFieldGet(this, Instagram_auth).csrftoken;
          Instagram_classPrivateFieldGet(this, Instagram_auth).hash = csrftoken || Instagram_classPrivateFieldGet(this, Instagram_auth).hash;
          const id = (_data$responseText$ma3 = data.responseText.match(/"profilePage_([\d]+?)"/)) === null || _data$responseText$ma3 === void 0 ? void 0 : _data$responseText$ma3[1];
          if (id) {
            logStatus.success();
            return id;
          }
          logStatus.error('Error: Get ins data error!');
          return false;
        }
        logStatus.error(`${result}:${statusText}(${status})`);
        return false;
      }
      return false;
    } catch (error) {
      throwError_throwError(error, 'Instagram.getUserInfo');
      return false;
    }
  }
  async function _followUser2(name) {
    try {
      const id = await Instagram_classPrivateMethodGet(this, _getUserInfo, _getUserInfo2).call(this, name);
      if (!id) {
        return false;
      }
      const logStatus = scripts_echoLog({
        type: 'followIns',
        text: name
      });
      const {
        result,
        statusText,
        status,
        data
      } = await tools_httpRequest({
        url: `https://www.instagram.com/web/friendships/${id}/follow/`,
        method: 'POST',
        dataType: 'json',
        headers: {
          'x-csrftoken': Instagram_classPrivateFieldGet(this, Instagram_auth).csrftoken,
          origin: 'https://www.instagram.com',
          referer: `https://www.instagram.com/${name}/`,
          'content-type': 'application/x-www-form-urlencoded',
          'sec-fetch-site': 'same-origin',
          'x-instagram-ajax': Instagram_classPrivateFieldGet(this, Instagram_auth).hash
        }
      });
      if (result === 'Success') {
        var _data$response, _data$response2;
        if ((data === null || data === void 0 ? void 0 : data.status) === 200 && ((_data$response = data.response) === null || _data$response === void 0 ? void 0 : _data$response.result) === 'following') {
          logStatus.success();
          this.tasks.users = unique([ ...this.tasks.users, name ]);
          return true;
        }
        logStatus.error(`Error:${(data === null || data === void 0 ? void 0 : (_data$response2 = data.response) === null || _data$response2 === void 0 ? void 0 : _data$response2.feedback_message) || `${data === null || data === void 0 ? void 0 : data.statusText}(${data === null || data === void 0 ? void 0 : data.status})`}`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError_throwError(error, 'Instagram.followUser');
      return false;
    }
  }
  async function _unfollowUser2(name) {
    try {
      if (this.whiteList.users.includes(name)) {
        scripts_echoLog({
          type: 'whiteList',
          text: name
        });
        return true;
      }
      const id = await Instagram_classPrivateMethodGet(this, _getUserInfo, _getUserInfo2).call(this, name);
      if (!id) {
        return false;
      }
      const logStatus = scripts_echoLog({
        type: 'unfollowIns',
        text: name
      });
      const {
        result,
        statusText,
        status,
        data
      } = await tools_httpRequest({
        url: `https://www.instagram.com/web/friendships/${id}/unfollow/`,
        method: 'POST',
        dataType: 'json',
        headers: {
          'x-csrftoken': Instagram_classPrivateFieldGet(this, Instagram_auth).csrftoken,
          origin: 'https://www.instagram.com',
          referer: `https://www.instagram.com/${name}/`,
          'content-type': 'application/x-www-form-urlencoded',
          'sec-fetch-site': 'same-origin',
          'x-instagram-ajax': Instagram_classPrivateFieldGet(this, Instagram_auth).hash
        }
      });
      if (result === 'Success') {
        var _data$response3;
        if ((data === null || data === void 0 ? void 0 : data.status) === 200 && ((_data$response3 = data.response) === null || _data$response3 === void 0 ? void 0 : _data$response3.status) === 'ok') {
          logStatus.success();
          return true;
        }
        logStatus.error(`Error:${data === null || data === void 0 ? void 0 : data.statusText}(${data === null || data === void 0 ? void 0 : data.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError_throwError(error, 'Instagram.unfollowUser');
      return false;
    }
  }
  const social_Instagram = Instagram;
  function Reddit_classPrivateMethodInitSpec(obj, privateSet) {
    Reddit_checkPrivateRedeclaration(obj, privateSet);
    privateSet.add(obj);
  }
  function Reddit_classPrivateFieldInitSpec(obj, privateMap, value) {
    Reddit_checkPrivateRedeclaration(obj, privateMap);
    privateMap.set(obj, value);
  }
  function Reddit_checkPrivateRedeclaration(obj, privateCollection) {
    if (privateCollection.has(obj)) {
      throw new TypeError('Cannot initialize the same private elements twice on an object');
    }
  }
  function Reddit_defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function Reddit_classPrivateFieldGet(receiver, privateMap) {
    var descriptor = Reddit_classExtractFieldDescriptor(receiver, privateMap, 'get');
    return Reddit_classApplyDescriptorGet(receiver, descriptor);
  }
  function Reddit_classApplyDescriptorGet(receiver, descriptor) {
    if (descriptor.get) {
      return descriptor.get.call(receiver);
    }
    return descriptor.value;
  }
  function Reddit_classPrivateFieldSet(receiver, privateMap, value) {
    var descriptor = Reddit_classExtractFieldDescriptor(receiver, privateMap, 'set');
    Reddit_classApplyDescriptorSet(receiver, descriptor, value);
    return value;
  }
  function Reddit_classExtractFieldDescriptor(receiver, privateMap, action) {
    if (!privateMap.has(receiver)) {
      throw new TypeError('attempted to ' + action + ' private field on non-instance');
    }
    return privateMap.get(receiver);
  }
  function Reddit_classApplyDescriptorSet(receiver, descriptor, value) {
    if (descriptor.set) {
      descriptor.set.call(receiver, value);
    } else {
      if (!descriptor.writable) {
        throw new TypeError('attempted to set read only private field');
      }
      descriptor.value = value;
    }
  }
  function Reddit_classPrivateMethodGet(receiver, privateSet, fn) {
    if (!privateSet.has(receiver)) {
      throw new TypeError('attempted to get private field on non-instance');
    }
    return fn;
  }
  var Reddit_auth = new WeakMap();
  var Reddit_initialized = new WeakMap();
  var _useBeta = new WeakSet();
  var Reddit_updateAuth = new WeakSet();
  class Reddit extends social_Social {
    constructor(tasks) {
      var _GM_getValue;
      super();
      Reddit_classPrivateMethodInitSpec(this, Reddit_updateAuth);
      Reddit_classPrivateMethodInitSpec(this, _useBeta);
      Reddit_defineProperty(this, 'tasks', void 0);
      Reddit_defineProperty(this, 'whiteList', ((_GM_getValue = GM_getValue('whiteList')) === null || _GM_getValue === void 0 ? void 0 : _GM_getValue.reddit) || {
        reddits: []
      });
      Reddit_classPrivateFieldInitSpec(this, Reddit_auth, {
        writable: true,
        value: GM_getValue('redditAuth') || {}
      });
      Reddit_classPrivateFieldInitSpec(this, Reddit_initialized, {
        writable: true,
        value: false
      });
      this.tasks = tasks || {
        reddits: []
      };
    }
    async init() {
      try {
        const isVerified = await Reddit_classPrivateMethodGet(this, Reddit_updateAuth, Reddit_updateAuth2).call(this);
        if (isVerified) {
          scripts_echoLog({
            text: 'Init reddit success!'
          });
          Reddit_classPrivateFieldSet(this, Reddit_initialized, true);
          return true;
        }
        scripts_echoLog({
          text: 'Init reddit failed!'
        });
        return false;
      } catch (error) {
        throwError_throwError(error, 'Reddit.init');
        return false;
      }
    }
    async toggleTask(_ref) {
      let {
        name,
        doTask = true
      } = _ref;
      try {
        if (!doTask && this.whiteList.reddits.includes(name)) {
          scripts_echoLog({
            type: 'whiteList',
            text: name
          });
          return true;
        }
        let type = doTask ? 'joinReddit' : 'leaveReddit';
        if (/^u_/.test(name)) {
          type = doTask ? 'followRedditUser' : 'unfollowRedditUser';
        }
        const logStatus = scripts_echoLog({
          type: type,
          text: name
        });
        const {
          result,
          statusText,
          status,
          data
        } = await tools_httpRequest({
          url: 'https://oauth.reddit.com/api/subscribe?redditWebClient=desktop2x&app=desktop2x-client-production&raw_json=1&gilding_detail=1',
          method: 'POST',
          headers: {
            authorization: `Bearer ${Reddit_classPrivateFieldGet(this, Reddit_auth).token}`,
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: $.param({
            action: doTask ? 'sub' : 'unsub',
            sr_name: name,
            api_type: 'json'
          })
        });
        if (result === 'Success') {
          if ((data === null || data === void 0 ? void 0 : data.status) === 200) {
            logStatus.success();
            if (doTask) {
              this.tasks.reddits = unique([ ...this.tasks.reddits, name ]);
            }
            return true;
          }
          logStatus.error(`Error:${data === null || data === void 0 ? void 0 : data.statusText}(${data === null || data === void 0 ? void 0 : data.status})`);
          return false;
        }
        logStatus.error(`${result}:${statusText}(${status})`);
        return false;
      } catch (error) {
        throwError_throwError(error, 'Reddit.toggleTask');
        return false;
      }
    }
    async toggle(_ref2) {
      let {
        doTask = true,
        reddits = [],
        redditLinks = []
      } = _ref2;
      try {
        if (!Reddit_classPrivateFieldGet(this, Reddit_initialized)) {
          scripts_echoLog({
            type: 'text',
            text: '请先初始化'
          });
          return false;
        }
        const prom = [];
        const realReddits = this.getRealParams('reddits', reddits, redditLinks, doTask, link => {
          var _link$match, _link$match2;
          const name = (_link$match = link.match(/https?:\/\/www\.reddit\.com\/r\/([^/]*)/)) === null || _link$match === void 0 ? void 0 : _link$match[1];
          const userName = (_link$match2 = link.match(/https?:\/\/www\.reddit\.com\/user\/([^/]*)/)) === null || _link$match2 === void 0 ? void 0 : _link$match2[1];
          if (userName) {
            return name || userName;
          }
          return name;
        });
        if (realReddits.length > 0) {
          for (const name of realReddits) {
            prom.push(this.toggleTask({
              name: name,
              doTask: doTask
            }));
            await delay(1e3);
          }
        }
        return await Promise.all(prom).then(() => true);
      } catch (error) {
        throwError_throwError(error, 'Reddit.toggle');
        return false;
      }
    }
  }
  async function _useBeta2() {
    try {
      const logStatus = scripts_echoLog({
        type: 'text',
        text: 'changeRedditVersion'
      });
      GM_setValue('redditAuth', null);
      return await new Promise(resolve => {
        const newTab = GM_openInTab('https://www.reddit.com/#auth', {
          active: true,
          insert: true,
          setParent: true
        });
        newTab.onclose = async () => {
          logStatus.success();
          resolve(await Reddit_classPrivateMethodGet(this, Reddit_updateAuth, Reddit_updateAuth2).call(this, true));
        };
      });
    } catch (error) {
      throwError_throwError(error, 'Reddit.useBeta');
      return false;
    }
  }
  async function Reddit_updateAuth2() {
    let beta = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    try {
      const logStatus = scripts_echoLog({
        type: 'text',
        text: 'updateRedditAuth'
      });
      const {
        result,
        statusText,
        status,
        data
      } = await tools_httpRequest({
        url: 'https://www.reddit.com/',
        method: 'GET',
        nochche: true,
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      if (result === 'Success') {
        if (data !== null && data !== void 0 && data.responseText.includes('www.reddit.com/login/')) {
          logStatus.error(`Error:${i18n('loginReddit')}`, true);
          return false;
        }
        if ((data === null || data === void 0 ? void 0 : data.status) === 200) {
          var _data$responseText$ma;
          if (data.responseText.includes('redesign-beta-optin-btn') && !beta) {
            return await Reddit_classPrivateMethodGet(this, _useBeta, _useBeta2).call(this);
          }
          const accessToken = (_data$responseText$ma = data.responseText.match(/"accessToken":"(.*?)","expires":"(.*?)"/)) === null || _data$responseText$ma === void 0 ? void 0 : _data$responseText$ma[1];
          if (accessToken) {
            Reddit_classPrivateFieldSet(this, Reddit_auth, {
              token: accessToken
            });
            logStatus.success();
            return true;
          }
          logStatus.error('Error: Parameter "accessToken" not found!');
          return false;
        }
        logStatus.error(`Error:${data === null || data === void 0 ? void 0 : data.statusText}(${data === null || data === void 0 ? void 0 : data.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError_throwError(error, 'Reddit.updateAuth');
      return false;
    }
  }
  const social_Reddit = Reddit;
  function Twitch_classPrivateMethodInitSpec(obj, privateSet) {
    Twitch_checkPrivateRedeclaration(obj, privateSet);
    privateSet.add(obj);
  }
  function Twitch_classPrivateFieldInitSpec(obj, privateMap, value) {
    Twitch_checkPrivateRedeclaration(obj, privateMap);
    privateMap.set(obj, value);
  }
  function Twitch_checkPrivateRedeclaration(obj, privateCollection) {
    if (privateCollection.has(obj)) {
      throw new TypeError('Cannot initialize the same private elements twice on an object');
    }
  }
  function Twitch_defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function Twitch_classPrivateFieldSet(receiver, privateMap, value) {
    var descriptor = Twitch_classExtractFieldDescriptor(receiver, privateMap, 'set');
    Twitch_classApplyDescriptorSet(receiver, descriptor, value);
    return value;
  }
  function Twitch_classApplyDescriptorSet(receiver, descriptor, value) {
    if (descriptor.set) {
      descriptor.set.call(receiver, value);
    } else {
      if (!descriptor.writable) {
        throw new TypeError('attempted to set read only private field');
      }
      descriptor.value = value;
    }
  }
  function Twitch_classPrivateMethodGet(receiver, privateSet, fn) {
    if (!privateSet.has(receiver)) {
      throw new TypeError('attempted to get private field on non-instance');
    }
    return fn;
  }
  function Twitch_classPrivateFieldGet(receiver, privateMap) {
    var descriptor = Twitch_classExtractFieldDescriptor(receiver, privateMap, 'get');
    return Twitch_classApplyDescriptorGet(receiver, descriptor);
  }
  function Twitch_classExtractFieldDescriptor(receiver, privateMap, action) {
    if (!privateMap.has(receiver)) {
      throw new TypeError('attempted to ' + action + ' private field on non-instance');
    }
    return privateMap.get(receiver);
  }
  function Twitch_classApplyDescriptorGet(receiver, descriptor) {
    if (descriptor.get) {
      return descriptor.get.call(receiver);
    }
    return descriptor.value;
  }
  var Twitch_auth = new WeakMap();
  var Twitch_initialized = new WeakMap();
  var Twitch_verifyAuth = new WeakSet();
  var Twitch_updateAuth = new WeakSet();
  var _toggleChannel = new WeakSet();
  var _getChannelId = new WeakSet();
  class Twitch extends social_Social {
    constructor(tasks) {
      var _GM_getValue;
      super();
      Twitch_classPrivateMethodInitSpec(this, _getChannelId);
      Twitch_classPrivateMethodInitSpec(this, _toggleChannel);
      Twitch_classPrivateMethodInitSpec(this, Twitch_updateAuth);
      Twitch_classPrivateMethodInitSpec(this, Twitch_verifyAuth);
      Twitch_defineProperty(this, 'tasks', void 0);
      Twitch_defineProperty(this, 'whiteList', ((_GM_getValue = GM_getValue('whiteList')) === null || _GM_getValue === void 0 ? void 0 : _GM_getValue.twitch) || {
        channels: []
      });
      Twitch_classPrivateFieldInitSpec(this, Twitch_auth, {
        writable: true,
        value: GM_getValue('twitchAuth') || {}
      });
      Twitch_classPrivateFieldInitSpec(this, Twitch_initialized, {
        writable: true,
        value: false
      });
      this.tasks = tasks || {
        channels: []
      };
    }
    async init() {
      try {
        if (!Twitch_classPrivateFieldGet(this, Twitch_auth).authToken) {
          scripts_echoLog({
            type: 'updateTwitchAuth'
          });
          if (await Twitch_classPrivateMethodGet(this, Twitch_updateAuth, Twitch_updateAuth2).call(this)) {
            Twitch_classPrivateFieldSet(this, Twitch_initialized, true);
            return true;
          }
          return false;
        }
        const isVerified = await Twitch_classPrivateMethodGet(this, Twitch_verifyAuth, Twitch_verifyAuth2).call(this);
        if (isVerified) {
          scripts_echoLog({
            text: 'Init twitch success!'
          });
          Twitch_classPrivateFieldSet(this, Twitch_initialized, true);
          return true;
        }
        GM_setValue('twitchAuth', null);
        if (await Twitch_classPrivateMethodGet(this, Twitch_updateAuth, Twitch_updateAuth2).call(this)) {
          scripts_echoLog({
            text: 'Init twitch success!'
          });
          Twitch_classPrivateFieldSet(this, Twitch_initialized, true);
          return true;
        }
        scripts_echoLog({
          text: 'Init twitch failed!'
        });
        return false;
      } catch (error) {
        throwError_throwError(error, 'Twitch.init');
        return false;
      }
    }
    async toggle(_ref) {
      let {
        doTask = true,
        channels = [],
        channelLinks = []
      } = _ref;
      try {
        if (!Twitch_classPrivateFieldGet(this, Twitch_initialized)) {
          scripts_echoLog({
            type: 'text',
            text: '请先初始化'
          });
          return false;
        }
        const prom = [];
        const realChannels = this.getRealParams('channels', channels, channelLinks, doTask, link => {
          var _link$match;
          return (_link$match = link.match(/https:\/\/www\.twitch\.tv\/(.+)/)) === null || _link$match === void 0 ? void 0 : _link$match[1];
        });
        if (realChannels.length > 0) {
          for (const channel of realChannels) {
            prom.push(Twitch_classPrivateMethodGet(this, _toggleChannel, _toggleChannel2).call(this, {
              name: channel,
              doTask: doTask
            }));
            await delay(1e3);
          }
        }
        return Promise.all(prom).then(() => true);
      } catch (error) {
        throwError_throwError(error, 'Twitch.toggle');
        return false;
      }
    }
  }
  async function Twitch_verifyAuth2() {
    try {
      const logStatus = scripts_echoLog({
        type: 'text',
        text: 'verifyTwitchAuth'
      });
      const {
        result,
        statusText,
        status,
        data
      } = await tools_httpRequest({
        url: 'https://gql.twitch.tv/gql',
        method: 'POST',
        dataType: 'json',
        headers: {
          Authorization: `OAuth ${Twitch_classPrivateFieldGet(this, Twitch_auth).authToken}`,
          'Client-Id': Twitch_classPrivateFieldGet(this, Twitch_auth).clientId
        },
        data: '[{"operationName":"FrontPageNew_User","variables":{"limit":1},"extensions":{"persistedQuery":{"version":1,' + '"sha256Hash":"64bd07a2cbaca80699d62636d966cf6395a5d14a1f0a14282067dcb28b13eb11"}}}]'
      });
      if (result === 'Success') {
        var _data$response, _data$response$, _data$response$$data;
        if ((data === null || data === void 0 ? void 0 : data.status) === 200 && (_data$response = data.response) !== null && _data$response !== void 0 && (_data$response$ = _data$response[0]) !== null && _data$response$ !== void 0 && (_data$response$$data = _data$response$.data) !== null && _data$response$$data !== void 0 && _data$response$$data.currentUser) {
          logStatus.success();
          return true;
        }
        logStatus.error(`Error:${data === null || data === void 0 ? void 0 : data.statusText}(${data === null || data === void 0 ? void 0 : data.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError_throwError(error, 'Twitch.verifyAuth');
      return false;
    }
  }
  async function Twitch_updateAuth2() {
    try {
      const logStatus = scripts_echoLog({
        type: 'text',
        text: 'updateTwitchAuth'
      });
      return await new Promise(resolve => {
        const newTab = GM_openInTab('https://www.twitch.tv/#auth', {
          active: true,
          insert: true,
          setParent: true
        });
        newTab.onclose = async () => {
          const auth = GM_getValue('twitchAuth');
          if (auth) {
            Twitch_classPrivateFieldSet(this, Twitch_auth, auth);
            logStatus.success();
            resolve(await Twitch_classPrivateMethodGet(this, Twitch_verifyAuth, Twitch_verifyAuth2).call(this));
          } else {
            logStatus.error('Error: Update twitch auth failed!');
            resolve(false);
          }
        };
      });
    } catch (error) {
      throwError_throwError(error, 'Twitch.updateAuth');
      return false;
    }
  }
  async function _toggleChannel2(_ref2) {
    let {
      name,
      doTask = true
    } = _ref2;
    try {
      if (!doTask && this.whiteList.channels.includes(name)) {
        scripts_echoLog({
          type: 'whiteList',
          text: name
        });
        return true;
      }
      const channelId = await Twitch_classPrivateMethodGet(this, _getChannelId, _getChannelId2).call(this, name);
      if (!channelId) {
        return false;
      }
      const logStatus = scripts_echoLog({
        type: `${doTask ? '' : 'un'}followTwitchChannel`,
        text: name
      });
      const followData = `[{"operationName":"FollowButton_FollowUser","variables":{"input":{"disableNotifications":false,"targetID":"${channelId}` + '"}},"extensions":{"persistedQuery":{"version":1,"sha256Hash":"3efee1acda90efdff9fef6e6b4a29213be3ee490781c5b54469717b6131ffdfe"}}}]';
      const unfollowData = `[{"operationName":"FollowButton_UnfollowUser","variables":{"input":{"targetID":"${channelId}"}},` + '"extensions":{"persistedQuery":{"version":1,"sha256Hash":"d7fbdb4e9780dcdc0cc1618ec783309471cd05a59584fc3c56ea1c52bb632d41"}}}]';
      const {
        result,
        statusText,
        status,
        data
      } = await tools_httpRequest({
        url: 'https://gql.twitch.tv/gql',
        method: 'POST',
        dataType: 'json',
        headers: {
          Authorization: `OAuth ${Twitch_classPrivateFieldGet(this, Twitch_auth).authToken}`
        },
        data: doTask ? followData : unfollowData
      });
      if (result === 'Success') {
        if ((data === null || data === void 0 ? void 0 : data.status) === 200) {
          logStatus.success();
          if (doTask) {
            this.tasks.channels = unique([ ...this.tasks.channels, name ]);
          }
          return true;
        }
        logStatus.error(`Error:${data === null || data === void 0 ? void 0 : data.statusText}(${data === null || data === void 0 ? void 0 : data.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError_throwError(error, 'Twitch.toggleChannel');
      return false;
    }
  }
  async function _getChannelId2(name) {
    try {
      const logStatus = scripts_echoLog({
        type: 'getTwitchChannelId',
        text: name
      });
      const {
        result,
        statusText,
        status,
        data
      } = await tools_httpRequest({
        url: 'https://gql.twitch.tv/gql',
        method: 'POST',
        headers: {
          Authorization: `OAuth ${Twitch_classPrivateFieldGet(this, Twitch_auth).authToken}`,
          'Client-Id': Twitch_classPrivateFieldGet(this, Twitch_auth).clientId
        },
        responseType: 'json',
        data: `[{"operationName":"ActiveWatchParty","variables":{"channelLogin":"${name}"},` + '"extensions":{"persistedQuery":{"version":1,"sha256Hash":"4a8156c97b19e3a36e081cf6d6ddb5dbf9f9b02ae60e4d2ff26ed70aebc80a30"}}}]'
      });
      if (result === 'Success') {
        if ((data === null || data === void 0 ? void 0 : data.status) === 200) {
          var _data$response2, _data$response2$, _data$response2$$data, _data$response2$$data2;
          const channelId = String((_data$response2 = data.response) === null || _data$response2 === void 0 ? void 0 : (_data$response2$ = _data$response2[0]) === null || _data$response2$ === void 0 ? void 0 : (_data$response2$$data = _data$response2$.data) === null || _data$response2$$data === void 0 ? void 0 : (_data$response2$$data2 = _data$response2$$data.user) === null || _data$response2$$data2 === void 0 ? void 0 : _data$response2$$data2.id);
          if (channelId) {
            logStatus.success();
            return channelId;
          }
          logStatus.error(`Error:${data.statusText}(${data.status})`);
          return false;
        }
        logStatus.error(`Error:${data === null || data === void 0 ? void 0 : data.statusText}(${data === null || data === void 0 ? void 0 : data.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError_throwError(error, 'Twitch.getChannelId');
      return false;
    }
  }
  const social_Twitch = Twitch;
  function Twitter_classPrivateMethodInitSpec(obj, privateSet) {
    Twitter_checkPrivateRedeclaration(obj, privateSet);
    privateSet.add(obj);
  }
  function Twitter_classPrivateFieldInitSpec(obj, privateMap, value) {
    Twitter_checkPrivateRedeclaration(obj, privateMap);
    privateMap.set(obj, value);
  }
  function Twitter_checkPrivateRedeclaration(obj, privateCollection) {
    if (privateCollection.has(obj)) {
      throw new TypeError('Cannot initialize the same private elements twice on an object');
    }
  }
  function Twitter_defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function Twitter_classPrivateMethodGet(receiver, privateSet, fn) {
    if (!privateSet.has(receiver)) {
      throw new TypeError('attempted to get private field on non-instance');
    }
    return fn;
  }
  function Twitter_classPrivateFieldGet(receiver, privateMap) {
    var descriptor = Twitter_classExtractFieldDescriptor(receiver, privateMap, 'get');
    return Twitter_classApplyDescriptorGet(receiver, descriptor);
  }
  function Twitter_classApplyDescriptorGet(receiver, descriptor) {
    if (descriptor.get) {
      return descriptor.get.call(receiver);
    }
    return descriptor.value;
  }
  function Twitter_classPrivateFieldSet(receiver, privateMap, value) {
    var descriptor = Twitter_classExtractFieldDescriptor(receiver, privateMap, 'set');
    Twitter_classApplyDescriptorSet(receiver, descriptor, value);
    return value;
  }
  function Twitter_classExtractFieldDescriptor(receiver, privateMap, action) {
    if (!privateMap.has(receiver)) {
      throw new TypeError('attempted to ' + action + ' private field on non-instance');
    }
    return privateMap.get(receiver);
  }
  function Twitter_classApplyDescriptorSet(receiver, descriptor, value) {
    if (descriptor.set) {
      descriptor.set.call(receiver, value);
    } else {
      if (!descriptor.writable) {
        throw new TypeError('attempted to set read only private field');
      }
      descriptor.value = value;
    }
  }
  var _verifyId = new WeakMap();
  var Twitter_auth = new WeakMap();
  var Twitter_initialized = new WeakMap();
  var Twitter_verifyAuth = new WeakSet();
  var Twitter_updateAuth = new WeakSet();
  var _toggleUser = new WeakSet();
  var _getUserId = new WeakSet();
  var _toggleRetweet = new WeakSet();
  class Twitter extends social_Social {
    constructor(tasks, verifyId) {
      var _GM_getValue;
      super();
      Twitter_classPrivateMethodInitSpec(this, _toggleRetweet);
      Twitter_classPrivateMethodInitSpec(this, _getUserId);
      Twitter_classPrivateMethodInitSpec(this, _toggleUser);
      Twitter_classPrivateMethodInitSpec(this, Twitter_updateAuth);
      Twitter_classPrivateMethodInitSpec(this, Twitter_verifyAuth);
      Twitter_defineProperty(this, 'tasks', void 0);
      Twitter_defineProperty(this, 'whiteList', ((_GM_getValue = GM_getValue('whiteList')) === null || _GM_getValue === void 0 ? void 0 : _GM_getValue.twitter) || {
        users: [],
        retweets: [],
        likes: []
      });
      Twitter_classPrivateFieldInitSpec(this, _verifyId, {
        writable: true,
        value: '783214'
      });
      Twitter_classPrivateFieldInitSpec(this, Twitter_auth, {
        writable: true,
        value: GM_getValue('twitterAuth') || {}
      });
      Twitter_classPrivateFieldInitSpec(this, Twitter_initialized, {
        writable: true,
        value: false
      });
      this.tasks = tasks || {
        users: [],
        retweets: [],
        likes: []
      };
      if (verifyId) {
        Twitter_classPrivateFieldSet(this, _verifyId, verifyId);
      }
    }
    async init() {
      try {
        if (!Twitter_classPrivateFieldGet(this, Twitter_auth).ct0) {
          scripts_echoLog({
            type: 'updateTwitterAuth'
          });
          if (await Twitter_classPrivateMethodGet(this, Twitter_updateAuth, Twitter_updateAuth2).call(this)) {
            Twitter_classPrivateFieldSet(this, Twitter_initialized, true);
            return true;
          }
          return false;
        }
        const isVerified = await Twitter_classPrivateMethodGet(this, Twitter_verifyAuth, Twitter_verifyAuth2).call(this);
        if (isVerified) {
          scripts_echoLog({
            text: 'Init twitter success!'
          });
          Twitter_classPrivateFieldSet(this, Twitter_initialized, true);
          return true;
        }
        GM_setValue('twitterAuth', null);
        if (await Twitter_classPrivateMethodGet(this, Twitter_updateAuth, Twitter_updateAuth2).call(this)) {
          scripts_echoLog({
            text: 'Init twitter success!'
          });
          Twitter_classPrivateFieldSet(this, Twitter_initialized, true);
          return true;
        }
        scripts_echoLog({
          text: 'Init twitter failed!'
        });
        return false;
      } catch (error) {
        throwError_throwError(error, 'Twitter.init');
        return false;
      }
    }
    async toggle(_ref) {
      let {
        doTask = true,
        users = [],
        userLinks = [],
        retweets = [],
        retweetLinks = []
      } = _ref;
      try {
        if (!Twitter_classPrivateFieldGet(this, Twitter_initialized)) {
          scripts_echoLog({
            type: 'text',
            text: '请先初始化'
          });
          return false;
        }
        const prom = [];
        const realUsers = this.getRealParams('users', users, userLinks, doTask, link => {
          var _link$match;
          return (_link$match = link.match(/https:\/\/twitter\.com\/(.+)/)) === null || _link$match === void 0 ? void 0 : _link$match[1];
        });
        const realRetweets = this.getRealParams('retweets', retweets, retweetLinks, doTask, link => {
          var _link$match2;
          return (_link$match2 = link.match(/https:\/\/twitter\.com\/.*?\/status\/([\d]+)/)) === null || _link$match2 === void 0 ? void 0 : _link$match2[1];
        });
        if (realUsers.length > 0) {
          for (const user of realUsers) {
            prom.push(Twitter_classPrivateMethodGet(this, _toggleUser, _toggleUser2).call(this, {
              name: user,
              doTask: doTask
            }));
            await delay(1e3);
          }
        }
        if (realRetweets.length > 0) {
          for (const retweet of realRetweets) {
            prom.push(Twitter_classPrivateMethodGet(this, _toggleRetweet, _toggleRetweet2).call(this, {
              retweetId: retweet,
              doTask: doTask
            }));
            await delay(1e3);
          }
        }
        return Promise.all(prom).then(() => true);
      } catch (error) {
        throwError_throwError(error, 'Twitter.toggle');
        return false;
      }
    }
  }
  async function Twitter_verifyAuth2() {
    try {
      return await Twitter_classPrivateMethodGet(this, _toggleUser, _toggleUser2).call(this, {
        name: 'verify',
        doTask: true,
        verify: true
      });
    } catch (error) {
      throwError_throwError(error, 'Twitter.verifyAuth');
      return false;
    }
  }
  async function Twitter_updateAuth2() {
    try {
      const logStatus = scripts_echoLog({
        type: 'text',
        text: 'updateTwitterAuth'
      });
      return await new Promise(resolve => {
        const newTab = GM_openInTab('https://twitter.com/settings/account?k#auth', {
          active: true,
          insert: true,
          setParent: true
        });
        newTab.onclose = async () => {
          const auth = GM_getValue('twitterAuth');
          if (auth) {
            Twitter_classPrivateFieldSet(this, Twitter_auth, auth);
            logStatus.success();
            resolve(await Twitter_classPrivateMethodGet(this, Twitter_verifyAuth, Twitter_verifyAuth2).call(this));
          } else {
            logStatus.error('Error: Update twitter auth failed!');
            resolve(false);
          }
        };
      });
    } catch (error) {
      throwError_throwError(error, 'Twitter.updateToken');
      return false;
    }
  }
  async function _toggleUser2(_ref2) {
    let {
      name,
      doTask = true,
      verify = false
    } = _ref2;
    try {
      if (!doTask && !verify && this.whiteList.users.includes(name)) {
        scripts_echoLog({
          type: 'whiteList',
          text: name
        });
        return true;
      }
      const userId = verify ? Twitter_classPrivateFieldGet(this, _verifyId) : await Twitter_classPrivateMethodGet(this, _getUserId, _getUserId2).call(this, name);
      if (!userId) {
        return false;
      }
      const logStatus = verify ? scripts_echoLog({
        type: 'text',
        text: 'verifyTwitterAuth'
      }) : scripts_echoLog({
        type: `${doTask ? '' : 'un'}followTwitterUser`,
        text: name
      });
      const {
        result,
        statusText,
        status,
        data
      } = await tools_httpRequest({
        url: `https://api.twitter.com/1.1/friendships/${doTask ? 'create' : 'destroy'}.json`,
        method: 'POST',
        headers: {
          authorization: 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA',
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-csrf-token': Twitter_classPrivateFieldGet(this, Twitter_auth).ct0
        },
        responseType: 'json',
        data: $.param({
          include_profile_interstitial_type: 1,
          include_blocking: 1,
          include_blocked_by: 1,
          include_followed_by: 1,
          include_want_retweets: 1,
          include_mute_edge: 1,
          include_can_dm: 1,
          include_can_media_tag: 1,
          skip_status: 1,
          id: userId
        })
      });
      if (result === 'Success') {
        var _data$response, _data$response$errors, _data$response$errors2;
        if ((data === null || data === void 0 ? void 0 : data.status) === 200) {
          logStatus.success();
          if (doTask && !verify) {
            this.tasks.users = unique([ ...this.tasks.users, name ]);
          }
          return true;
        }
        if (verify && (data === null || data === void 0 ? void 0 : data.status) === 403 && ((_data$response = data.response) === null || _data$response === void 0 ? void 0 : (_data$response$errors = _data$response.errors) === null || _data$response$errors === void 0 ? void 0 : (_data$response$errors2 = _data$response$errors[0]) === null || _data$response$errors2 === void 0 ? void 0 : _data$response$errors2.code) === 158) {
          logStatus.success();
          return true;
        }
        logStatus.error(`Error:${data === null || data === void 0 ? void 0 : data.statusText}(${data === null || data === void 0 ? void 0 : data.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError_throwError(error, 'Twitter.toggleUser');
      return false;
    }
  }
  async function _getUserId2(name) {
    try {
      const logStatus = scripts_echoLog({
        type: 'getTwitterUserId',
        text: name
      });
      const {
        result,
        statusText,
        status,
        data
      } = await tools_httpRequest({
        url: 'https://api.twitter.com/graphql/-xfUfZsnR_zqjFd-IfrN5A/UserByScreenName' + `?variables=%7B%22screen_name%22%3A%22${name}%22%2C%22withHighlightedLabel%22%3Atrue%7D`,
        method: 'GET',
        headers: {
          authorization: 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA',
          'content-type': 'application/json'
        },
        responseType: 'json',
        anonymous: true
      });
      if (result === 'Success') {
        if ((data === null || data === void 0 ? void 0 : data.status) === 200) {
          var _response, _response$data, _response$data$user;
          let response = data.response || (typeof data.responseText === 'object' ? data.responseText : null);
          if (!response) {
            try {
              response = JSON.parse(data.responseText);
            } catch (error) {
              response = null;
            }
          }
          const userId = String((_response = response) === null || _response === void 0 ? void 0 : (_response$data = _response.data) === null || _response$data === void 0 ? void 0 : (_response$data$user = _response$data.user) === null || _response$data$user === void 0 ? void 0 : _response$data$user.rest_id);
          if (userId) {
            logStatus.success();
            return userId;
          }
          logStatus.error(`Error:${data.statusText}(${data.status})`);
          return false;
        }
        logStatus.error(`Error:${data === null || data === void 0 ? void 0 : data.statusText}(${data === null || data === void 0 ? void 0 : data.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError_throwError(error, 'Twitter.getUserId');
      return false;
    }
  }
  async function _toggleRetweet2(_ref3) {
    let {
      retweetId,
      doTask = true
    } = _ref3;
    try {
      if (!doTask && this.whiteList.retweets.includes(retweetId)) {
        scripts_echoLog({
          type: 'whiteList',
          text: retweetId
        });
        return true;
      }
      const logStatus = scripts_echoLog({
        type: `${doTask ? '' : 'un'}retweet`,
        text: retweetId
      });
      const {
        result,
        statusText,
        status,
        data
      } = await tools_httpRequest({
        url: `https://api.twitter.com/1.1/statuses/${doTask ? '' : 'un'}retweet.json`,
        method: 'POST',
        headers: {
          authorization: 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA',
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-csrf-token': Twitter_classPrivateFieldGet(this, Twitter_auth).ct0
        },
        data: $.param({
          tweet_mode: 'extended',
          id: retweetId
        }),
        responseType: 'json'
      });
      if (result === 'Success') {
        var _data$response2, _data$response2$error, _data$response2$error2;
        if ((data === null || data === void 0 ? void 0 : data.status) === 200 || (data === null || data === void 0 ? void 0 : data.status) === 403 && ((_data$response2 = data.response) === null || _data$response2 === void 0 ? void 0 : (_data$response2$error = _data$response2.errors) === null || _data$response2$error === void 0 ? void 0 : (_data$response2$error2 = _data$response2$error[0]) === null || _data$response2$error2 === void 0 ? void 0 : _data$response2$error2.code) === 327) {
          logStatus.success();
          if (doTask) {
            this.tasks.retweets = unique([ ...this.tasks.retweets, retweetId ]);
          }
          return true;
        }
        logStatus.error(`Error:${data === null || data === void 0 ? void 0 : data.statusText}(${data === null || data === void 0 ? void 0 : data.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError_throwError(error, 'Twitter.toggleRetweet');
      return false;
    }
  }
  const social_Twitter = Twitter;
  function Vk_classPrivateMethodInitSpec(obj, privateSet) {
    Vk_checkPrivateRedeclaration(obj, privateSet);
    privateSet.add(obj);
  }
  function Vk_classPrivateFieldInitSpec(obj, privateMap, value) {
    Vk_checkPrivateRedeclaration(obj, privateMap);
    privateMap.set(obj, value);
  }
  function Vk_checkPrivateRedeclaration(obj, privateCollection) {
    if (privateCollection.has(obj)) {
      throw new TypeError('Cannot initialize the same private elements twice on an object');
    }
  }
  function Vk_defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function Vk_classPrivateFieldGet(receiver, privateMap) {
    var descriptor = Vk_classExtractFieldDescriptor(receiver, privateMap, 'get');
    return Vk_classApplyDescriptorGet(receiver, descriptor);
  }
  function Vk_classApplyDescriptorGet(receiver, descriptor) {
    if (descriptor.get) {
      return descriptor.get.call(receiver);
    }
    return descriptor.value;
  }
  function Vk_classPrivateFieldSet(receiver, privateMap, value) {
    var descriptor = Vk_classExtractFieldDescriptor(receiver, privateMap, 'set');
    Vk_classApplyDescriptorSet(receiver, descriptor, value);
    return value;
  }
  function Vk_classExtractFieldDescriptor(receiver, privateMap, action) {
    if (!privateMap.has(receiver)) {
      throw new TypeError('attempted to ' + action + ' private field on non-instance');
    }
    return privateMap.get(receiver);
  }
  function Vk_classApplyDescriptorSet(receiver, descriptor, value) {
    if (descriptor.set) {
      descriptor.set.call(receiver, value);
    } else {
      if (!descriptor.writable) {
        throw new TypeError('attempted to set read only private field');
      }
      descriptor.value = value;
    }
  }
  function Vk_classPrivateMethodGet(receiver, privateSet, fn) {
    if (!privateSet.has(receiver)) {
      throw new TypeError('attempted to get private field on non-instance');
    }
    return fn;
  }
  var _username = new WeakMap();
  var Vk_cache = new WeakMap();
  var Vk_initialized = new WeakMap();
  var Vk_verifyAuth = new WeakSet();
  var _toggleGroup = new WeakSet();
  var _togglePublic = new WeakSet();
  var _sendWall = new WeakSet();
  var _deleteWall = new WeakSet();
  var _getId = new WeakSet();
  var _toggleVk = new WeakSet();
  var Vk_addId = new WeakSet();
  class Vk extends social_Social {
    constructor(tasks) {
      var _GM_getValue;
      super();
      Vk_classPrivateMethodInitSpec(this, Vk_addId);
      Vk_classPrivateMethodInitSpec(this, _toggleVk);
      Vk_classPrivateMethodInitSpec(this, _getId);
      Vk_classPrivateMethodInitSpec(this, _deleteWall);
      Vk_classPrivateMethodInitSpec(this, _sendWall);
      Vk_classPrivateMethodInitSpec(this, _togglePublic);
      Vk_classPrivateMethodInitSpec(this, _toggleGroup);
      Vk_classPrivateMethodInitSpec(this, Vk_verifyAuth);
      Vk_defineProperty(this, 'tasks', void 0);
      Vk_defineProperty(this, 'whiteList', ((_GM_getValue = GM_getValue('whiteList')) === null || _GM_getValue === void 0 ? void 0 : _GM_getValue.vk) || {
        names: []
      });
      Vk_classPrivateFieldInitSpec(this, _username, {
        writable: true,
        value: ''
      });
      Vk_classPrivateFieldInitSpec(this, Vk_cache, {
        writable: true,
        value: GM_getValue('vkCache') || {}
      });
      Vk_classPrivateFieldInitSpec(this, Vk_initialized, {
        writable: true,
        value: false
      });
      this.tasks = tasks || {
        names: []
      };
    }
    async init() {
      try {
        const isVerified = await Vk_classPrivateMethodGet(this, Vk_verifyAuth, Vk_verifyAuth2).call(this);
        if (isVerified) {
          scripts_echoLog({
            text: 'Init vk success!'
          });
          Vk_classPrivateFieldSet(this, Vk_initialized, true);
          return true;
        }
        scripts_echoLog({
          text: 'Init vk failed!'
        });
        return false;
      } catch (error) {
        throwError_throwError(error, 'Vk.init');
        return false;
      }
    }
    async toggle(_ref) {
      let {
        doTask = true,
        names = [],
        nameLinks = []
      } = _ref;
      try {
        if (!Vk_classPrivateFieldGet(this, Vk_initialized)) {
          scripts_echoLog({
            type: 'text',
            text: '请先初始化'
          });
          return false;
        }
        const prom = [];
        const realNames = this.getRealParams('names', names, nameLinks, doTask, link => {
          var _link$match;
          return (_link$match = link.match(/https:\/\/vk\.com\/([^/]+)/)) === null || _link$match === void 0 ? void 0 : _link$match[1];
        });
        if (realNames.length > 0) {
          for (const name of realNames) {
            prom.push(Vk_classPrivateMethodGet(this, _toggleVk, _toggleVk2).call(this, {
              name: name,
              doTask: doTask
            }));
            await delay(1e3);
          }
        }
        return Promise.all(prom).then(() => true);
      } catch (error) {
        throwError_throwError(error, 'Vk.toggle');
        return false;
      }
    }
  }
  async function Vk_verifyAuth2() {
    try {
      const logStatus = scripts_echoLog({
        type: 'text',
        text: 'verifyVkLogin'
      });
      const {
        result,
        statusText,
        status,
        data
      } = await tools_httpRequest({
        url: 'https://vk.com/im',
        method: 'GET'
      });
      if (result === 'Success') {
        if (data !== null && data !== void 0 && data.finalUrl.includes('vk.com/login')) {
          logStatus.error(`Error:${i18n('loginVk')}`, true);
          return false;
        }
        if ((data === null || data === void 0 ? void 0 : data.status) === 200) {
          var _data$responseText$ma;
          Vk_classPrivateFieldSet(this, _username, ((_data$responseText$ma = data.responseText.match(/TopNavBtn__profileLink" href="\/(.*?)"/)) === null || _data$responseText$ma === void 0 ? void 0 : _data$responseText$ma[1]) || '');
          logStatus.success();
          return true;
        }
        logStatus.error(`Error:${data === null || data === void 0 ? void 0 : data.statusText}(${data === null || data === void 0 ? void 0 : data.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError_throwError(error, 'Vk.verifyAuth');
      return false;
    }
  }
  async function _toggleGroup2(name, dataParam) {
    let doTask = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    try {
      const logStatus = scripts_echoLog({
        type: doTask ? 'joinVkGroup' : 'leaveVkGroup',
        text: name
      });
      if (dataParam.groupAct === 'enter' && !doTask || dataParam.groupAct === 'leave' && doTask) {
        logStatus.success();
        return true;
      }
      const reqData = {
        act: doTask ? 'enter' : 'leave',
        al: 1,
        gid: dataParam.groupId,
        hash: dataParam.groupHash
      };
      if (doTask) {
        reqData.context = '_';
      }
      const {
        result,
        statusText,
        status,
        data
      } = await tools_httpRequest({
        url: 'https://vk.com/al_groups.php',
        method: 'POST',
        headers: {
          origin: 'https://vk.com',
          referer: `https://vk.com/${name}`,
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: $.param(reqData)
      });
      if (result === 'Success') {
        if ((data === null || data === void 0 ? void 0 : data.status) === 200) {
          logStatus.success();
          if (doTask) {
            this.tasks.names = unique([ ...this.tasks.names, name ]);
          }
          return true;
        }
        logStatus.error(`Error:${data === null || data === void 0 ? void 0 : data.statusText}(${data === null || data === void 0 ? void 0 : data.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError_throwError(error, 'Vk.toggleGroup');
      return false;
    }
  }
  async function _togglePublic2(name, dataParam) {
    let doTask = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    try {
      const logStatus = scripts_echoLog({
        type: doTask ? 'joinVkPublic' : 'leaveVkPublic',
        text: name
      });
      if (dataParam.publicJoined && doTask || !dataParam.publicJoined && !doTask) {
        logStatus.success();
        return true;
      }
      const {
        result,
        statusText,
        status,
        data
      } = await tools_httpRequest({
        url: 'https://vk.com/al_public.php',
        method: 'POST',
        headers: {
          origin: 'https://vk.com',
          referer: `https://vk.com/${name}`,
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: $.param({
          act: doTask ? 'a_enter' : 'a_leave',
          al: 1,
          pid: dataParam.publicPid,
          hash: dataParam.publicHash
        })
      });
      if (result === 'Success') {
        if ((data === null || data === void 0 ? void 0 : data.status) === 200) {
          logStatus.success();
          if (doTask) {
            this.tasks.names = unique([ ...this.tasks.names, name ]);
          }
          return true;
        }
        logStatus.error(`Error:${data === null || data === void 0 ? void 0 : data.statusText}(${data === null || data === void 0 ? void 0 : data.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError_throwError(error, 'Vk.togglePublic');
      return false;
    }
  }
  async function _sendWall2(name) {
    try {
      const logStatus = scripts_echoLog({
        type: 'sendVkWall',
        text: name
      });
      const {
        result,
        statusText,
        status,
        data
      } = await tools_httpRequest({
        url: 'https://vk.com/like.php',
        method: 'POST',
        headers: {
          origin: 'https://vk.com',
          referer: `https://vk.com/${name}`,
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: $.param({
          act: 'publish_box',
          al: 1,
          object: name
        })
      });
      if (result === 'Success') {
        if ((data === null || data === void 0 ? void 0 : data.status) === 200) {
          var _data$responseText$ma2;
          const hash = (_data$responseText$ma2 = data.responseText.match(/shHash:[\s]*'(.*?)'/)) === null || _data$responseText$ma2 === void 0 ? void 0 : _data$responseText$ma2[1];
          if (hash) {
            const {
              result: resultR,
              statusText: statusTextR,
              status: statusR,
              data: dataR
            } = await tools_httpRequest({
              url: 'https://vk.com/like.php',
              method: 'POST',
              headers: {
                origin: 'https://vk.com',
                referer: `https://vk.com/${name}`,
                'content-type': 'application/x-www-form-urlencoded'
              },
              data: $.param({
                Message: '',
                act: 'a_do_publish',
                al: 1,
                close_comments: 0,
                friends_only: 0,
                from: 'box',
                hash: hash,
                list: '',
                mark_as_ads: 0,
                mute_notifications: 0,
                object: name,
                ret_data: 1,
                to: 0
              })
            });
            if (resultR === 'Success') {
              if ((dataR === null || dataR === void 0 ? void 0 : dataR.status) === 200) {
                var _dataR$responseText, _jsonData$payload, _jsonData$payload$, _jsonData$payload$$;
                const jsonData = JSON.parse(((_dataR$responseText = dataR.responseText) === null || _dataR$responseText === void 0 ? void 0 : _dataR$responseText.replace('\x3c!--', '')) || '{}');
                if ((jsonData === null || jsonData === void 0 ? void 0 : (_jsonData$payload = jsonData.payload) === null || _jsonData$payload === void 0 ? void 0 : (_jsonData$payload$ = _jsonData$payload[1]) === null || _jsonData$payload$ === void 0 ? void 0 : (_jsonData$payload$$ = _jsonData$payload$[1]) === null || _jsonData$payload$$ === void 0 ? void 0 : _jsonData$payload$$.share_my) === true) {
                  var _jsonData$payload2, _jsonData$payload2$, _jsonData$payload2$$, _jsonData$payload3, _jsonData$payload3$, _jsonData$payload3$$;
                  logStatus.success();
                  const postId = String(jsonData === null || jsonData === void 0 ? void 0 : (_jsonData$payload2 = jsonData.payload) === null || _jsonData$payload2 === void 0 ? void 0 : (_jsonData$payload2$ = _jsonData$payload2[1]) === null || _jsonData$payload2$ === void 0 ? void 0 : (_jsonData$payload2$$ = _jsonData$payload2$[1]) === null || _jsonData$payload2$$ === void 0 ? void 0 : _jsonData$payload2$$.post_id);
                  const ownerId = String(jsonData === null || jsonData === void 0 ? void 0 : (_jsonData$payload3 = jsonData.payload) === null || _jsonData$payload3 === void 0 ? void 0 : (_jsonData$payload3$ = _jsonData$payload3[1]) === null || _jsonData$payload3$ === void 0 ? void 0 : (_jsonData$payload3$$ = _jsonData$payload3$[1]) === null || _jsonData$payload3$$ === void 0 ? void 0 : _jsonData$payload3$$.owner_id);
                  if (postId && ownerId) {
                    Vk_classPrivateMethodGet(this, Vk_addId, Vk_addId2).call(this, name, `${ownerId}_${postId}`);
                  }
                  this.tasks.names = unique([ ...this.tasks.names, name ]);
                  return true;
                }
              }
              logStatus.error(`Error:${dataR === null || dataR === void 0 ? void 0 : dataR.statusText}(${dataR === null || dataR === void 0 ? void 0 : dataR.status})`);
              return false;
            }
            logStatus.error(`${resultR}:${statusTextR}(${statusR})`);
            return false;
          }
          logStatus.error('Error: Get "hash" failed');
          return false;
        }
        logStatus.error(`Error:${data === null || data === void 0 ? void 0 : data.statusText}(${data === null || data === void 0 ? void 0 : data.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError_throwError(error, 'Vk.sendWall');
      return false;
    }
  }
  async function _deleteWall2(name, dataParams) {
    try {
      const logStatus = scripts_echoLog({
        type: 'deleteVkWall',
        text: name
      });
      const {
        result,
        statusText,
        status,
        data
      } = await tools_httpRequest({
        url: 'https://vk.com/al_wall.php?act=delete',
        method: 'POST',
        headers: {
          origin: 'https://vk.com',
          referer: `https://vk.com/${Vk_classPrivateFieldGet(this, _username)}?w=wall${Vk_classPrivateFieldGet(this, Vk_cache)[name]}%2Fall`,
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: $.param({
          act: 'delete',
          al: 1,
          confirm: 0,
          from: 'wkview',
          hash: dataParams.wallHash,
          post: Vk_classPrivateFieldGet(this, Vk_cache)[name]
        })
      });
      if (result === 'Success') {
        if ((data === null || data === void 0 ? void 0 : data.status) === 200) {
          var _data$responseText, _jsonData$payload4, _jsonData$payload4$;
          const jsonData = JSON.parse(((_data$responseText = data.responseText) === null || _data$responseText === void 0 ? void 0 : _data$responseText.replace('\x3c!--', '')) || '{}');
          if (jsonData !== null && jsonData !== void 0 && (_jsonData$payload4 = jsonData.payload) !== null && _jsonData$payload4 !== void 0 && (_jsonData$payload4$ = _jsonData$payload4[1]) !== null && _jsonData$payload4$ !== void 0 && _jsonData$payload4$[1]) {
            logStatus.success();
            return true;
          }
          logStatus.error(`Error:${data === null || data === void 0 ? void 0 : data.statusText}(${data === null || data === void 0 ? void 0 : data.status})`);
          return false;
        }
        logStatus.error(`Error:${data === null || data === void 0 ? void 0 : data.statusText}(${data === null || data === void 0 ? void 0 : data.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError_throwError(error, 'Vk.deleteWall');
      return false;
    }
  }
  async function _getId2(name, doTask) {
    try {
      let url = `https://vk.com/${name}`;
      if (/^wall-/.test(name)) {
        if (doTask) {
          return {
            type: 'sendWall'
          };
        }
        if (!Vk_classPrivateFieldGet(this, Vk_cache)[name]) {
          return {
            type: 'unSupport'
          };
        }
        url = `https://vk.com/${Vk_classPrivateFieldGet(this, _username)}?w=wall${Vk_classPrivateFieldGet(this, Vk_cache)[name]}`;
      }
      const logStatus = scripts_echoLog({
        type: 'getVkId',
        text: name
      });
      const {
        result,
        statusText,
        status,
        data
      } = await tools_httpRequest({
        url: url,
        method: 'GET'
      });
      if (result === 'Success') {
        if ((data === null || data === void 0 ? void 0 : data.status) === 200) {
          var _data$responseText$ma3, _data$responseText$ma4;
          const [ , groupAct, groupId, groupHash ] = data.responseText.match(/Groups.(enter|leave)\(.*?,.*?([\d]+?), '(.*?)'/) || [];
          const publicHash = (_data$responseText$ma3 = data.responseText.match(/"enterHash":"(.*?)"/)) === null || _data$responseText$ma3 === void 0 ? void 0 : _data$responseText$ma3[1];
          const publicPid = (_data$responseText$ma4 = data.responseText.match(/"public_id":([\d]+?),/)) === null || _data$responseText$ma4 === void 0 ? void 0 : _data$responseText$ma4[1];
          const publicJoined = !data.responseText.includes('Public.subscribe');
          if (groupAct && groupId && groupHash) {
            logStatus.success();
            return {
              groupAct: groupAct,
              groupId: groupId,
              groupHash: groupHash,
              type: 'group'
            };
          } else if (publicHash && publicPid) {
            logStatus.success();
            return {
              publicHash: publicHash,
              publicPid: publicPid,
              publicJoined: publicJoined,
              type: 'public'
            };
          } else if (data.responseText.includes('wall.deletePost') && !doTask) {
            var _data$responseText$ma5;
            const wallHash = (_data$responseText$ma5 = data.responseText.match(/wall\.deletePost\(this, '.*?', '(.*?)'\)/)) === null || _data$responseText$ma5 === void 0 ? void 0 : _data$responseText$ma5[1];
            if (wallHash) {
              logStatus.success();
              return {
                type: 'deleteWall',
                wallHash: wallHash
              };
            }
          } else if (name.includes('wall') && doTask) {
            logStatus.success();
            return {
              type: 'sendWall'
            };
          }
          logStatus.error('Error: Parameters not found!');
          return false;
        }
        logStatus.error(`Error:${data === null || data === void 0 ? void 0 : data.statusText}(${data === null || data === void 0 ? void 0 : data.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError_throwError(error, 'Vk.getId');
      return false;
    }
  }
  async function _toggleVk2(_ref2) {
    let {
      name,
      doTask = true
    } = _ref2;
    try {
      if (!doTask && this.whiteList.names.includes(name)) {
        scripts_echoLog({
          type: 'whiteList',
          text: name
        });
        return true;
      }
      const formatName = name.replace(/\/$/, '');
      const data = await Vk_classPrivateMethodGet(this, _getId, _getId2).call(this, formatName, doTask);
      if (!data) {
        return false;
      }
      switch (data.type) {
       case 'group':
        return await Vk_classPrivateMethodGet(this, _toggleGroup, _toggleGroup2).call(this, formatName, data, doTask);

       case 'public':
        return await Vk_classPrivateMethodGet(this, _togglePublic, _togglePublic2).call(this, formatName, data, doTask);

       case 'sendWall':
        return doTask ? await Vk_classPrivateMethodGet(this, _sendWall, _sendWall2).call(this, formatName) : true;

       case 'deleteWall':
        return doTask ? true : await Vk_classPrivateMethodGet(this, _deleteWall, _deleteWall2).call(this, formatName, data);

       default:
        return false;
      }
    } catch (error) {
      throwError_throwError(error, 'Vk.toggleVk');
      return false;
    }
  }
  function Vk_addId2(name, postId) {
    Vk_classPrivateFieldGet(this, Vk_cache)[name] = postId;
    GM_setValue('vkCache', Vk_classPrivateFieldGet(this, Vk_cache));
  }
  const social_Vk = Vk;
  function Youtube_classPrivateMethodInitSpec(obj, privateSet) {
    Youtube_checkPrivateRedeclaration(obj, privateSet);
    privateSet.add(obj);
  }
  function Youtube_classPrivateFieldInitSpec(obj, privateMap, value) {
    Youtube_checkPrivateRedeclaration(obj, privateMap);
    privateMap.set(obj, value);
  }
  function Youtube_checkPrivateRedeclaration(obj, privateCollection) {
    if (privateCollection.has(obj)) {
      throw new TypeError('Cannot initialize the same private elements twice on an object');
    }
  }
  function Youtube_defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function Youtube_classPrivateMethodGet(receiver, privateSet, fn) {
    if (!privateSet.has(receiver)) {
      throw new TypeError('attempted to get private field on non-instance');
    }
    return fn;
  }
  function Youtube_classPrivateFieldGet(receiver, privateMap) {
    var descriptor = Youtube_classExtractFieldDescriptor(receiver, privateMap, 'get');
    return Youtube_classApplyDescriptorGet(receiver, descriptor);
  }
  function Youtube_classApplyDescriptorGet(receiver, descriptor) {
    if (descriptor.get) {
      return descriptor.get.call(receiver);
    }
    return descriptor.value;
  }
  function Youtube_classPrivateFieldSet(receiver, privateMap, value) {
    var descriptor = Youtube_classExtractFieldDescriptor(receiver, privateMap, 'set');
    Youtube_classApplyDescriptorSet(receiver, descriptor, value);
    return value;
  }
  function Youtube_classExtractFieldDescriptor(receiver, privateMap, action) {
    if (!privateMap.has(receiver)) {
      throw new TypeError('attempted to ' + action + ' private field on non-instance');
    }
    return privateMap.get(receiver);
  }
  function Youtube_classApplyDescriptorSet(receiver, descriptor, value) {
    if (descriptor.set) {
      descriptor.set.call(receiver, value);
    } else {
      if (!descriptor.writable) {
        throw new TypeError('attempted to set read only private field');
      }
      descriptor.value = value;
    }
  }
  var Youtube_auth = new WeakMap();
  var Youtube_initialized = new WeakMap();
  var _verifyChannel = new WeakMap();
  var Youtube_verifyAuth = new WeakSet();
  var Youtube_updateAuth = new WeakSet();
  var _getInfo = new WeakSet();
  var Youtube_toggleChannel = new WeakSet();
  var _toggleLikeVideo = new WeakSet();
  class Youtube extends social_Social {
    constructor(tasks, verifyChannel) {
      var _GM_getValue;
      super();
      Youtube_classPrivateMethodInitSpec(this, _toggleLikeVideo);
      Youtube_classPrivateMethodInitSpec(this, Youtube_toggleChannel);
      Youtube_classPrivateMethodInitSpec(this, _getInfo);
      Youtube_classPrivateMethodInitSpec(this, Youtube_updateAuth);
      Youtube_classPrivateMethodInitSpec(this, Youtube_verifyAuth);
      Youtube_defineProperty(this, 'tasks', void 0);
      Youtube_defineProperty(this, 'whiteList', ((_GM_getValue = GM_getValue('whiteList')) === null || _GM_getValue === void 0 ? void 0 : _GM_getValue.youtube) || {
        channels: [],
        likes: []
      });
      Youtube_classPrivateFieldInitSpec(this, Youtube_auth, {
        writable: true,
        value: GM_getValue('youtubeAuth') || {}
      });
      Youtube_classPrivateFieldInitSpec(this, Youtube_initialized, {
        writable: true,
        value: false
      });
      Youtube_classPrivateFieldInitSpec(this, _verifyChannel, {
        writable: true,
        value: 'https://www.youtube.com/channel/UCBR8-60-B28hp2BmDPdntcQ'
      });
      this.tasks = tasks || {
        channels: [],
        likes: []
      };
      if (verifyChannel) {
        Youtube_classPrivateFieldSet(this, _verifyChannel, verifyChannel);
      }
    }
    async init() {
      try {
        if (!Youtube_classPrivateFieldGet(this, Youtube_auth).PAPISID) {
          scripts_echoLog({
            type: 'updateYoutubeAuth'
          });
          if (await Youtube_classPrivateMethodGet(this, Youtube_updateAuth, Youtube_updateAuth2).call(this)) {
            Youtube_classPrivateFieldSet(this, Youtube_initialized, true);
            return true;
          }
          return false;
        }
        const isVerified = await Youtube_classPrivateMethodGet(this, Youtube_verifyAuth, Youtube_verifyAuth2).call(this);
        if (isVerified) {
          scripts_echoLog({
            text: 'Init youtube success!'
          });
          Youtube_classPrivateFieldSet(this, Youtube_initialized, true);
          return true;
        }
        GM_setValue('youtubeAuth', null);
        if (await Youtube_classPrivateMethodGet(this, Youtube_updateAuth, Youtube_updateAuth2).call(this)) {
          scripts_echoLog({
            text: 'Init youtube success!'
          });
          Youtube_classPrivateFieldSet(this, Youtube_initialized, true);
          return true;
        }
        scripts_echoLog({
          text: 'Init youtube failed!'
        });
        return false;
      } catch (error) {
        throwError_throwError(error, 'Youtube.init');
        return false;
      }
    }
    async toggle(_ref) {
      let {
        doTask = true,
        channelLinks = [],
        videoLinks = []
      } = _ref;
      try {
        if (!Youtube_classPrivateFieldGet(this, Youtube_initialized)) {
          scripts_echoLog({
            type: 'text',
            text: '请先初始化'
          });
          return false;
        }
        const prom = [];
        const realChannels = this.getRealParams('channels', [], channelLinks, doTask, link => {
          if (/^https:\/\/www\.google\.com.*?\/url\?.*?url=https:\/\/www.youtube.com\/.*/.test(link)) {
            var _link$match;
            return (_link$match = link.match(/url=(https:\/\/www.youtube.com\/.*)/)) === null || _link$match === void 0 ? void 0 : _link$match[1];
          }
          return link;
        });
        const realLikes = this.getRealParams('likes', [], videoLinks, doTask, link => {
          if (/^https:\/\/www\.google\.com.*?\/url\?.*?url=https:\/\/www.youtube.com\/.*/.test(link)) {
            var _link$match2;
            return (_link$match2 = link.match(/url=(https:\/\/www.youtube.com\/.*)/)) === null || _link$match2 === void 0 ? void 0 : _link$match2[1];
          }
          return link;
        });
        if (realChannels.length > 0) {
          for (const channel of realChannels) {
            prom.push(Youtube_classPrivateMethodGet(this, Youtube_toggleChannel, Youtube_toggleChannel2).call(this, {
              link: channel,
              doTask: doTask
            }));
            await delay(1e3);
          }
        }
        if (realLikes.length > 0) {
          for (const video of realLikes) {
            prom.push(Youtube_classPrivateMethodGet(this, _toggleLikeVideo, _toggleLikeVideo2).call(this, {
              link: video,
              doTask: doTask
            }));
            await delay(1e3);
          }
        }
        return Promise.all(prom).then(() => true);
      } catch (error) {
        throwError_throwError(error, 'Youtube.toggle');
        return false;
      }
    }
  }
  async function Youtube_verifyAuth2() {
    try {
      return await Youtube_classPrivateMethodGet(this, Youtube_toggleChannel, Youtube_toggleChannel2).call(this, {
        link: Youtube_classPrivateFieldGet(this, _verifyChannel),
        doTask: true,
        verify: true
      });
    } catch (error) {
      throwError_throwError(error, 'Youtube.verifyAuth');
      return false;
    }
  }
  async function Youtube_updateAuth2() {
    try {
      const logStatus = scripts_echoLog({
        type: 'text',
        text: 'updateYoutubeAuth'
      });
      return await new Promise(resolve => {
        const newTab = GM_openInTab('https://www.youtube.com/#auth', {
          active: true,
          insert: true,
          setParent: true
        });
        newTab.onclose = async () => {
          const auth = GM_getValue('youtubeAuth');
          if (auth) {
            Youtube_classPrivateFieldSet(this, Youtube_auth, auth);
            logStatus.success();
            resolve(await Youtube_classPrivateMethodGet(this, Youtube_verifyAuth, Youtube_verifyAuth2).call(this));
          } else {
            logStatus.error('Error: Update youtube auth failed!');
            resolve(false);
          }
        };
      });
    } catch (error) {
      throwError_throwError(error, 'Discord.updateAuth');
      return false;
    }
  }
  async function _getInfo2(link, type) {
    try {
      const logStatus = scripts_echoLog({
        type: 'text',
        text: 'getYtbToken'
      });
      const {
        result,
        statusText,
        status,
        data
      } = await tools_httpRequest({
        url: link,
        method: 'GET'
      });
      if (result === 'Success') {
        if ((data === null || data === void 0 ? void 0 : data.status) === 200) {
          var _data$responseText$ma, _ref2;
          if (data.responseText.includes('accounts.google.com/ServiceLogin?service=youtube')) {
            logStatus.error(`Error:${i18n('loginYtb')}`, true);
            return {
              needLogin: true
            };
          }
          const apiKey = (_data$responseText$ma = data.responseText.match(/"INNERTUBE_API_KEY":"(.*?)"/)) === null || _data$responseText$ma === void 0 ? void 0 : _data$responseText$ma[1];
          const context = ((_ref2 = data.responseText.match(/\(\{"INNERTUBE_CONTEXT":([\w\W]*?)\}\)/) || data.responseText.match(/"INNERTUBE_CONTEXT":([\w\W]*?\}),"INNERTUBE/)) === null || _ref2 === void 0 ? void 0 : _ref2[1]) || '{}';
          const {
            client,
            request
          } = JSON.parse(context);
          if (apiKey && client && request) {
            client.hl = 'en';
            if (type === 'channel') {
              var _data$responseText$ma2;
              const channelId = (_data$responseText$ma2 = data.responseText.match(/<meta itemprop="channelId" content="(.+?)">/)) === null || _data$responseText$ma2 === void 0 ? void 0 : _data$responseText$ma2[1];
              if (channelId) {
                logStatus.success();
                return {
                  params: {
                    apiKey: apiKey,
                    client: client,
                    request: request,
                    channelId: channelId
                  }
                };
              }
              logStatus.error('Error: Get "channelId" failed!');
              return {};
            } else if (type === 'likeVideo') {
              var _data$responseText$ma3, _data$responseText$ma4;
              const videoId = (_data$responseText$ma3 = data.responseText.match(/<link rel="shortlinkUrl" href="https:\/\/youtu\.be\/(.*?)">/)) === null || _data$responseText$ma3 === void 0 ? void 0 : _data$responseText$ma3[1];
              const likeParams = (_data$responseText$ma4 = data.responseText.match(/"likeParams":"(.*?)"/)) === null || _data$responseText$ma4 === void 0 ? void 0 : _data$responseText$ma4[1];
              if (videoId) {
                logStatus.success();
                return {
                  params: {
                    apiKey: apiKey,
                    client: client,
                    request: request,
                    videoId: videoId,
                    likeParams: likeParams
                  }
                };
              }
              logStatus.error('Error: Get "videoId" failed!');
              return {};
            }
            logStatus.error('Error: Unknown type');
            return {};
          }
          logStatus.error('Error: Parameter "apiKey" not found!');
          return {};
        }
        logStatus.error(`Error:${data === null || data === void 0 ? void 0 : data.statusText}(${data === null || data === void 0 ? void 0 : data.status})`);
        return {};
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return {};
    } catch (error) {
      throwError_throwError(error, 'Youtube.getInfo');
      return {};
    }
  }
  async function Youtube_toggleChannel2(_ref3) {
    let {
      link,
      doTask = true,
      verify = false
    } = _ref3;
    try {
      const {
        params,
        needLogin
      } = await Youtube_classPrivateMethodGet(this, _getInfo, _getInfo2).call(this, link, 'channel');
      const {
        apiKey,
        client,
        request,
        channelId
      } = params || {};
      if (needLogin) {
        scripts_echoLog({
          type: 'custom',
          text: i18n('loginYtb')
        });
        return false;
      }
      if (!(apiKey && client && request && channelId)) {
        scripts_echoLog({
          type: 'custom',
          text: '"getYtbToken" failed'
        });
        return false;
      }
      if (!doTask && !verify && this.whiteList.channels.includes(channelId)) {
        scripts_echoLog({
          type: 'whiteList',
          text: channelId
        });
        return true;
      }
      const logStatus = verify ? scripts_echoLog({
        type: 'text',
        text: 'verifyYoutubeAuth'
      }) : scripts_echoLog({
        type: doTask ? 'followYtbChannel' : 'unfollowYtbChannel',
        text: channelId
      });
      const nowTime = parseInt(String(new Date().getTime() / 1e3), 10);
      const {
        result,
        statusText,
        status,
        data
      } = await tools_httpRequest({
        url: `https://www.youtube.com/youtubei/v1/subscription/${doTask ? '' : 'un'}subscribe?key=${apiKey}`,
        method: 'POST',
        headers: {
          origin: 'https://www.youtube.com',
          referer: `https://www.youtube.com/channel/${channelId}`,
          'content-type': 'application/json',
          'x-goog-authuser': '0',
          'x-goog-visitor-id': client === null || client === void 0 ? void 0 : client.visitorData,
          'x-origin': 'https://www.youtube.com',
          authorization: `SAPISIDHASH ${nowTime}_${sha1(`${nowTime} ${Youtube_classPrivateFieldGet(this, Youtube_auth).PAPISID} https://www.youtube.com`)}`
        },
        data: JSON.stringify({
          context: {
            client: client,
            request: {
              sessionId: request === null || request === void 0 ? void 0 : request.sessionId,
              internalExperimentFlags: [],
              consistencyTokenJars: []
            },
            user: {}
          },
          channelIds: [ channelId ],
          params: doTask ? 'EgIIAhgA' : 'CgIIAhgA'
        })
      });
      if (result === 'Success') {
        if ((data === null || data === void 0 ? void 0 : data.status) === 200) {
          if (doTask && (/"subscribed": true/.test(data.responseText) || data.responseText.includes('The subscription already exists')) || !doTask && /"subscribed": false/.test(data.responseText)) {
            logStatus.success();
            if (doTask && !verify) {
              this.tasks.channels = unique([ ...this.tasks.channels, link ]);
            }
            return true;
          }
          logStatus.error(i18n('tryUpdateYtbAuth'), true);
          return false;
        }
        logStatus.error(`Error:${data === null || data === void 0 ? void 0 : data.statusText}(${data === null || data === void 0 ? void 0 : data.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError_throwError(error, 'Youtube.toggleChannel');
      return false;
    }
  }
  async function _toggleLikeVideo2(_ref4) {
    let {
      link,
      doTask = true
    } = _ref4;
    try {
      const {
        params,
        needLogin
      } = await Youtube_classPrivateMethodGet(this, _getInfo, _getInfo2).call(this, link, 'likeVideo');
      const {
        apiKey,
        client,
        request,
        videoId,
        likeParams
      } = params || {};
      if (needLogin) {
        scripts_echoLog({
          type: 'text',
          text: `${i18n('loginYtb')}`
        });
        return false;
      }
      if (!(apiKey && client && request && videoId && likeParams)) {
        scripts_echoLog({
          type: 'text',
          text: '"getYtbToken" failed'
        });
        return false;
      }
      if (!doTask && this.whiteList.likes.includes(videoId)) {
        scripts_echoLog({
          type: 'whiteList',
          text: link
        });
        return true;
      }
      const logStatus = scripts_echoLog({
        type: doTask ? 'likeYtbVideo' : 'unlikeYtbVideo',
        text: videoId
      });
      const nowTime = parseInt(String(new Date().getTime() / 1e3), 10);
      const likeVideoData = {
        context: {
          client: client,
          request: {
            sessionId: request.sessionId,
            internalExperimentFlags: [],
            consistencyTokenJars: []
          },
          user: {}
        },
        target: {
          videoId: videoId
        }
      };
      if (doTask) {
        if (likeParams) {
          likeVideoData.params = likeParams;
        } else {
          logStatus.error('Empty likeParams');
          return false;
        }
      }
      const {
        result,
        statusText,
        status,
        data
      } = await tools_httpRequest({
        url: `https://www.youtube.com/youtubei/v1/like/${doTask ? '' : 'remove'}like?key=${apiKey}`,
        method: 'POST',
        headers: {
          origin: 'https://www.youtube.com',
          referer: `https://www.youtube.com/watch?v=${videoId}`,
          'content-type': 'application/json',
          'x-goog-authuser': '0',
          'x-goog-visitor-id': client.visitorData,
          'x-origin': 'https://www.youtube.com',
          authorization: `SAPISIDHASH ${nowTime}_${sha1(`${nowTime} ${Youtube_classPrivateFieldGet(this, Youtube_auth).PAPISID} https://www.youtube.com`)}`
        },
        data: JSON.stringify(likeVideoData)
      });
      if (result === 'Success') {
        if ((data === null || data === void 0 ? void 0 : data.status) === 200) {
          if (doTask && data.responseText.includes('Added to Liked videos') || !doTask && (data.responseText.includes('Removed from Liked videos') || data.responseText.includes('Dislike removed'))) {
            logStatus.success();
            if (doTask) {
              this.tasks.likes = unique([ ...this.tasks.likes, link ]);
            }
            return true;
          }
          logStatus.error(i18n('tryUpdateYtbAuth'), true);
          return false;
        }
        logStatus.error(`Error:${data === null || data === void 0 ? void 0 : data.statusText}(${data === null || data === void 0 ? void 0 : data.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError_throwError(error, 'Youtube.toggleLikeVideo');
      return false;
    }
  }
  const social_Youtube = Youtube;
  function Steam_classPrivateMethodInitSpec(obj, privateSet) {
    Steam_checkPrivateRedeclaration(obj, privateSet);
    privateSet.add(obj);
  }
  function Steam_classPrivateFieldInitSpec(obj, privateMap, value) {
    Steam_checkPrivateRedeclaration(obj, privateMap);
    privateMap.set(obj, value);
  }
  function Steam_checkPrivateRedeclaration(obj, privateCollection) {
    if (privateCollection.has(obj)) {
      throw new TypeError('Cannot initialize the same private elements twice on an object');
    }
  }
  function Steam_defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function Steam_classPrivateFieldGet(receiver, privateMap) {
    var descriptor = Steam_classExtractFieldDescriptor(receiver, privateMap, 'get');
    return Steam_classApplyDescriptorGet(receiver, descriptor);
  }
  function Steam_classApplyDescriptorGet(receiver, descriptor) {
    if (descriptor.get) {
      return descriptor.get.call(receiver);
    }
    return descriptor.value;
  }
  function Steam_classPrivateFieldSet(receiver, privateMap, value) {
    var descriptor = Steam_classExtractFieldDescriptor(receiver, privateMap, 'set');
    Steam_classApplyDescriptorSet(receiver, descriptor, value);
    return value;
  }
  function Steam_classExtractFieldDescriptor(receiver, privateMap, action) {
    if (!privateMap.has(receiver)) {
      throw new TypeError('attempted to ' + action + ' private field on non-instance');
    }
    return privateMap.get(receiver);
  }
  function Steam_classApplyDescriptorSet(receiver, descriptor, value) {
    if (descriptor.set) {
      descriptor.set.call(receiver, value);
    } else {
      if (!descriptor.writable) {
        throw new TypeError('attempted to set read only private field');
      }
      descriptor.value = value;
    }
  }
  function Steam_classPrivateMethodGet(receiver, privateSet, fn) {
    if (!privateSet.has(receiver)) {
      throw new TypeError('attempted to get private field on non-instance');
    }
    return fn;
  }
  var Steam_auth = new WeakMap();
  var Steam_initialized = new WeakMap();
  var _updateStoreAuth = new WeakSet();
  var _updateCommunityAuth = new WeakSet();
  var _getAreaInfo = new WeakSet();
  var _changeArea = new WeakSet();
  var _joinGroup = new WeakSet();
  var _leaveGroup = new WeakSet();
  var _getGroupId = new WeakSet();
  var _addToWishlist = new WeakSet();
  var _removeFromWishlist = new WeakSet();
  var _toggleFollowGame = new WeakSet();
  var _isFollowedGame = new WeakSet();
  var _toggleForum = new WeakSet();
  var _getForumId = new WeakSet();
  var _toggleFavoriteWorkshop = new WeakSet();
  var _getWorkshopAppId = new WeakSet();
  var _voteupWorkshop = new WeakSet();
  var _toggleCurator = new WeakSet();
  var _getCuratorId = new WeakSet();
  var _toggleCuratorLike = new WeakSet();
  var _getAnnouncementParams = new WeakSet();
  var _likeAnnouncement = new WeakSet();
  class Steam extends social_Social {
    constructor(tasks) {
      var _GM_getValue;
      super();
      Steam_classPrivateMethodInitSpec(this, _likeAnnouncement);
      Steam_classPrivateMethodInitSpec(this, _getAnnouncementParams);
      Steam_classPrivateMethodInitSpec(this, _toggleCuratorLike);
      Steam_classPrivateMethodInitSpec(this, _getCuratorId);
      Steam_classPrivateMethodInitSpec(this, _toggleCurator);
      Steam_classPrivateMethodInitSpec(this, _voteupWorkshop);
      Steam_classPrivateMethodInitSpec(this, _getWorkshopAppId);
      Steam_classPrivateMethodInitSpec(this, _toggleFavoriteWorkshop);
      Steam_classPrivateMethodInitSpec(this, _getForumId);
      Steam_classPrivateMethodInitSpec(this, _toggleForum);
      Steam_classPrivateMethodInitSpec(this, _isFollowedGame);
      Steam_classPrivateMethodInitSpec(this, _toggleFollowGame);
      Steam_classPrivateMethodInitSpec(this, _removeFromWishlist);
      Steam_classPrivateMethodInitSpec(this, _addToWishlist);
      Steam_classPrivateMethodInitSpec(this, _getGroupId);
      Steam_classPrivateMethodInitSpec(this, _leaveGroup);
      Steam_classPrivateMethodInitSpec(this, _joinGroup);
      Steam_classPrivateMethodInitSpec(this, _changeArea);
      Steam_classPrivateMethodInitSpec(this, _getAreaInfo);
      Steam_classPrivateMethodInitSpec(this, _updateCommunityAuth);
      Steam_classPrivateMethodInitSpec(this, _updateStoreAuth);
      Steam_defineProperty(this, 'tasks', void 0);
      Steam_defineProperty(this, 'whiteList', ((_GM_getValue = GM_getValue('whiteList')) === null || _GM_getValue === void 0 ? void 0 : _GM_getValue.steam) || {
        groups: [],
        wishlists: [],
        follows: [],
        forums: [],
        workshops: [],
        workshopVotes: [],
        curators: [],
        curatorLikes: [],
        announcements: []
      });
      Steam_classPrivateFieldInitSpec(this, Steam_auth, {
        writable: true,
        value: {}
      });
      Steam_classPrivateFieldInitSpec(this, Steam_initialized, {
        writable: true,
        value: false
      });
      this.tasks = tasks || {
        groups: [],
        wishlists: [],
        follows: [],
        forums: [],
        workshops: [],
        workshopVotes: [],
        curators: [],
        curatorLikes: [],
        announcements: []
      };
    }
    async init() {
      try {
        const isVerified = await Steam_classPrivateMethodGet(this, _updateStoreAuth, _updateStoreAuth2).call(this) && await Steam_classPrivateMethodGet(this, _updateCommunityAuth, _updateCommunityAuth2).call(this);
        if (isVerified) {
          Steam_classPrivateFieldSet(this, Steam_initialized, true);
          scripts_echoLog({
            text: 'Init steam success!'
          });
          return true;
        }
        scripts_echoLog({
          text: 'Init steam failed!'
        });
        return false;
      } catch (error) {
        throwError_throwError(error, 'Steam.init');
        return false;
      }
    }
    async toggle(_ref) {
      let {
        doTask = true,
        groupLinks = [],
        wishlistLinks = [],
        followLinks = [],
        forumLinks = [],
        workshopLinks = [],
        workshopVoteLinks = [],
        curatorLinks = [],
        curatorLikeLinks = [],
        announcementLinks = []
      } = _ref;
      try {
        if (!Steam_classPrivateFieldGet(this, Steam_initialized)) {
          scripts_echoLog({
            type: 'text',
            text: '请先初始化'
          });
          return false;
        }
        const prom = [];
        const realGroups = this.getRealParams('groups', [], groupLinks, doTask, link => {
          var _link$match;
          return (_link$match = link.match(/groups\/(.+)\/?/)) === null || _link$match === void 0 ? void 0 : _link$match[1];
        });
        const realWishlists = this.getRealParams('wishlists', [], wishlistLinks, doTask, link => {
          var _link$match2;
          return (_link$match2 = link.match(/app\/([\d]+)/)) === null || _link$match2 === void 0 ? void 0 : _link$match2[1];
        });
        const realFollows = this.getRealParams('follows', [], followLinks, doTask, link => {
          var _link$match3;
          return (_link$match3 = link.match(/app\/([\d]+)/)) === null || _link$match3 === void 0 ? void 0 : _link$match3[1];
        });
        const realForums = this.getRealParams('forums', [], forumLinks, doTask, link => {
          var _link$match4;
          return (_link$match4 = link.match(/app\/([\d]+)/)) === null || _link$match4 === void 0 ? void 0 : _link$match4[1];
        });
        const realWorkshops = this.getRealParams('workshops', [], workshopLinks, doTask, link => {
          var _link$match5;
          return (_link$match5 = link.match(/\?id=([\d]+)/)) === null || _link$match5 === void 0 ? void 0 : _link$match5[1];
        });
        const realworkshopVotes = this.getRealParams('workshopVotes', [], workshopVoteLinks, doTask, link => {
          var _link$match6;
          return (_link$match6 = link.match(/\?id=([\d]+)/)) === null || _link$match6 === void 0 ? void 0 : _link$match6[1];
        });
        const realCurators = this.getRealParams('curators', [], curatorLinks, doTask, link => {
          var _link$match7;
          return (_link$match7 = link.match(/curator\/([\d]+)/)) === null || _link$match7 === void 0 ? void 0 : _link$match7[1];
        });
        const realCuratorLikes = this.getRealParams('curatorLikes', [], curatorLikeLinks, doTask, link => {
          var _link$match8;
          return (_link$match8 = link.match(/https?:\/\/store\.steampowered\.com\/(.*?)\/([^/?]+)/)) === null || _link$match8 === void 0 ? void 0 : _link$match8.slice(1, 3).join('/');
        });
        const realAnnouncements = this.getRealParams('announcements', [], announcementLinks, doTask, link => {
          var _link$match10;
          if (link.includes('store.steampowered.com')) {
            var _link$match9;
            return (_link$match9 = link.match(/store.steampowered.com\/news\/app\/([\d]+)\/view\/([\d]+)/)) === null || _link$match9 === void 0 ? void 0 : _link$match9.slice(1, 3).join('/');
          }
          return (_link$match10 = link.match(/steamcommunity.com\/games\/([\d]+)\/announcements\/detail\/([\d]+)/)) === null || _link$match10 === void 0 ? void 0 : _link$match10.slice(1, 3).join('/');
        });
        if (realGroups.length > 0) {
          for (const group of realGroups) {
            if (doTask) {
              prom.push(Steam_classPrivateMethodGet(this, _joinGroup, _joinGroup2).call(this, group));
            } else {
              prom.push(Steam_classPrivateMethodGet(this, _leaveGroup, _leaveGroup2).call(this, group));
            }
            await delay(1e3);
          }
        }
        if (realWishlists.length > 0) {
          for (const game of realWishlists) {
            if (doTask) {
              prom.push(Steam_classPrivateMethodGet(this, _addToWishlist, _addToWishlist2).call(this, game));
            } else {
              prom.push(Steam_classPrivateMethodGet(this, _removeFromWishlist, _removeFromWishlist2).call(this, game));
            }
            await delay(1e3);
          }
        }
        if (realFollows.length > 0) {
          for (const game of realFollows) {
            prom.push(Steam_classPrivateMethodGet(this, _toggleFollowGame, _toggleFollowGame2).call(this, game, doTask));
            await delay(1e3);
          }
        }
        if (realForums.length > 0) {
          for (const forum of realForums) {
            prom.push(Steam_classPrivateMethodGet(this, _toggleForum, _toggleForum2).call(this, forum, doTask));
            await delay(1e3);
          }
        }
        if (realWorkshops.length > 0) {
          for (const workshop of realWorkshops) {
            prom.push(Steam_classPrivateMethodGet(this, _toggleFavoriteWorkshop, _toggleFavoriteWorkshop2).call(this, workshop, doTask));
            await delay(1e3);
          }
        }
        if (doTask && realworkshopVotes.length > 0) {
          for (const workshop of realworkshopVotes) {
            prom.push(Steam_classPrivateMethodGet(this, _voteupWorkshop, _voteupWorkshop2).call(this, workshop));
            await delay(1e3);
          }
        }
        if (realCurators.length > 0) {
          for (const curator of realCurators) {
            prom.push(Steam_classPrivateMethodGet(this, _toggleCurator, _toggleCurator2).call(this, curator, null, doTask));
            await delay(1e3);
          }
        }
        if (realCuratorLikes.length > 0) {
          for (const curatorLike of realCuratorLikes) {
            prom.push(Steam_classPrivateMethodGet(this, _toggleCuratorLike, _toggleCuratorLike2).call(this, curatorLike, doTask));
            await delay(1e3);
          }
        }
        if (doTask && realAnnouncements.length > 0) {
          for (const id of realAnnouncements) {
            prom.push(Steam_classPrivateMethodGet(this, _likeAnnouncement, _likeAnnouncement2).call(this, id));
            await delay(1e3);
          }
        }
        return Promise.all(prom).then(() => true);
      } catch (error) {
        throwError_throwError(error, 'Steam.toggle');
        return false;
      }
    }
  }
  async function _updateStoreAuth2() {
    try {
      const logStatus = scripts_echoLog({
        type: 'updateSteamStore'
      });
      const {
        result,
        statusText,
        status,
        data
      } = await tools_httpRequest({
        url: 'https://store.steampowered.com/stats/',
        method: 'GET'
      });
      if (result === 'Success') {
        if ((data === null || data === void 0 ? void 0 : data.status) === 200) {
          var _data$responseText$ma;
          if (data.responseText.includes('href="https://store.steampowered.com/login/')) {
            logStatus.error(`Error:${i18n('loginSteamStore')}`, true);
            return false;
          }
          const storeSessionID = (_data$responseText$ma = data.responseText.match(/g_sessionID = "(.+?)";/)) === null || _data$responseText$ma === void 0 ? void 0 : _data$responseText$ma[1];
          if (storeSessionID) {
            Steam_classPrivateFieldGet(this, Steam_auth).storeSessionID = storeSessionID;
            logStatus.success();
            return true;
          }
          logStatus.error('Error: Get "sessionID" failed');
          return false;
        }
        logStatus.error(`Error:${data === null || data === void 0 ? void 0 : data.statusText}(${data === null || data === void 0 ? void 0 : data.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError_throwError(error, 'Steam.updateStoreAuth');
      return false;
    }
  }
  async function _updateCommunityAuth2() {
    try {
      const logStatus = scripts_echoLog({
        type: 'updateSteamCommunity'
      });
      const {
        result,
        statusText,
        status,
        data
      } = await tools_httpRequest({
        url: 'https://steamcommunity.com/my',
        method: 'GET'
      });
      if (result === 'Success') {
        if ((data === null || data === void 0 ? void 0 : data.status) === 200) {
          var _data$responseText$ma2, _data$responseText$ma3, _data$responseText$ma4;
          if (data.responseText.includes('href="https://steamcommunity.com/login/home/')) {
            logStatus.error(`Error:${i18n('loginSteamCommunity')}`, true);
            return false;
          }
          const steam64Id = (_data$responseText$ma2 = data.responseText.match(/g_steamID = "(.+?)";/)) === null || _data$responseText$ma2 === void 0 ? void 0 : _data$responseText$ma2[1];
          const communitySessionID = (_data$responseText$ma3 = data.responseText.match(/g_sessionID = "(.+?)";/)) === null || _data$responseText$ma3 === void 0 ? void 0 : _data$responseText$ma3[1];
          const userName = (_data$responseText$ma4 = data.responseText.match(/steamcommunity.com\/id\/(.+?)\/friends\//)) === null || _data$responseText$ma4 === void 0 ? void 0 : _data$responseText$ma4[1];
          if (steam64Id) {
            Steam_classPrivateFieldGet(this, Steam_auth).steam64Id = steam64Id;
          }
          if (userName) {
            Steam_classPrivateFieldGet(this, Steam_auth).userName = userName;
          }
          if (communitySessionID) {
            Steam_classPrivateFieldGet(this, Steam_auth).communitySessionID = communitySessionID;
            logStatus.success();
            return true;
          }
          logStatus.error('Error: Get "sessionID" failed');
          return false;
        }
        logStatus.error(`Error:${data === null || data === void 0 ? void 0 : data.statusText}(${data === null || data === void 0 ? void 0 : data.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError_throwError(error, 'Steam.updateCommunityAuth');
      return false;
    }
  }
  async function _getAreaInfo2() {
    try {
      const logStatus = echoLog({
        type: 'text',
        text: 'getCountryInfo'
      });
      const {
        result,
        statusText,
        status,
        data
      } = await httpRequest({
        url: 'https://store.steampowered.com/cart/',
        method: 'GET'
      });
      if (result === 'Success') {
        if ((data === null || data === void 0 ? void 0 : data.status) === 200) {
          var _data$responseText$ma5;
          const currentArea = (_data$responseText$ma5 = data.responseText.match(/<input id="usercountrycurrency".*?value="(.+?)"/)) === null || _data$responseText$ma5 === void 0 ? void 0 : _data$responseText$ma5[1];
          const areas = [ ...data.responseText.matchAll(/<div class="currency_change_option .*?" data-country="(.+?)" >/g) ].map(search => search[1]);
          if (currentArea && areas.length > 0) {
            logStatus.success();
            return {
              currentArea: currentArea,
              areas: areas
            };
          }
          logStatus.error('Error: get country info filed');
          return {};
        }
        logStatus.error(`Error:${data === null || data === void 0 ? void 0 : data.statusText}(${data === null || data === void 0 ? void 0 : data.status})`);
        return {};
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return {};
    } catch (error) {
      throwError(error, 'Steam.getAreaInfo');
      return {};
    }
  }
  async function _changeArea2(area) {
    try {
      let aimedArea = area;
      if (!area) {
        const {
          currentArea,
          areas
        } = await Steam_classPrivateMethodGet(this, _getAreaInfo, _getAreaInfo2).call(this);
        if (!currentArea || !areas) {
          return false;
        }
        if (currentArea !== 'CN') {
          echoLog({
            type: 'text',
            text: 'notNeedChangeCountry'
          });
          return 'skip';
        }
        const anotherArea = areas.filter(area => area && area !== 'CN');
        if (!anotherArea || anotherArea.length === 0) {
          echoLog({
            type: 'text',
            text: 'noAnotherCountry'
          });
          return false;
        }
        [ aimedArea ] = anotherArea;
      }
      const logStatus = echoLog({
        type: 'changeCountry',
        text: aimedArea
      });
      const {
        result,
        statusText,
        status,
        data
      } = await httpRequest({
        url: 'https://store.steampowered.com/account/setcountry',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        data: $.param({
          aimedArea: aimedArea,
          sessionid: Steam_classPrivateFieldGet(this, Steam_auth).storeSessionID
        })
      });
      if (result === 'Success') {
        if ((data === null || data === void 0 ? void 0 : data.status) === 200 && data.responseText === 'true') {
          const {
            currentArea
          } = await Steam_classPrivateMethodGet(this, _getAreaInfo, _getAreaInfo2).call(this);
          if (currentArea === aimedArea) {
            logStatus.success();
            return currentArea;
          }
          logStatus.error('Error: change country filed');
          return 'CN';
        }
        logStatus.error(`Error:${data === null || data === void 0 ? void 0 : data.statusText}(${data === null || data === void 0 ? void 0 : data.status})`);
        return 'CN';
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return 'CN';
    } catch (error) {
      throwError(error, 'Steam.changeArea');
      return false;
    }
  }
  async function _joinGroup2(groupName) {
    try {
      const logStatus = scripts_echoLog({
        type: 'joinSteamGroup',
        text: groupName
      });
      const {
        result,
        statusText,
        status,
        data
      } = await tools_httpRequest({
        url: `https://steamcommunity.com/groups/${groupName}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        data: $.param({
          action: 'join',
          sessionID: Steam_classPrivateFieldGet(this, Steam_auth).communitySessionID
        })
      });
      if (result === 'Success') {
        if ((data === null || data === void 0 ? void 0 : data.status) === 200 && !data.responseText.includes('grouppage_join_area')) {
          logStatus.success();
          this.tasks.groups = unique([ ...this.tasks.groups, groupName ]);
          return true;
        }
        logStatus.error(`Error:${data === null || data === void 0 ? void 0 : data.statusText}(${data === null || data === void 0 ? void 0 : data.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError_throwError(error, 'Steam.joinGroup');
      return false;
    }
  }
  async function _leaveGroup2(groupName) {
    try {
      if (this.whiteList.groups.includes(groupName)) {
        scripts_echoLog({
          type: 'whiteList',
          text: groupName
        });
        return true;
      }
      const groupId = await Steam_classPrivateMethodGet(this, _getGroupId, _getGroupId2).call(this, groupName);
      if (!groupId) {
        return false;
      }
      const logStatus = scripts_echoLog({
        type: 'leaveSteamGroup',
        text: groupName
      });
      const {
        result,
        statusText,
        status,
        data
      } = await tools_httpRequest({
        url: `https://steamcommunity.com/id/${Steam_classPrivateFieldGet(this, Steam_auth).userName}/home_process`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        data: $.param({
          sessionID: Steam_classPrivateFieldGet(this, Steam_auth).communitySessionID,
          action: 'leaveGroup',
          groupId: groupId
        })
      });
      if (result === 'Success') {
        if ((data === null || data === void 0 ? void 0 : data.status) === 200 && data.finalUrl.includes('groups') && $(data.responseText.replace(/<img.*?>/g, '').toLowerCase()).find(`a[href='https://steamcommunity.com/groups/${groupName.toLowerCase()}']`).length === 0) {
          logStatus.success();
          return true;
        }
        logStatus.error(`Error:${data === null || data === void 0 ? void 0 : data.statusText}(${data === null || data === void 0 ? void 0 : data.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError_throwError(error, 'Steam.leaveGroup');
      return false;
    }
  }
  async function _getGroupId2(groupName) {
    try {
      const logStatus = scripts_echoLog({
        type: 'getSteamGroupId',
        text: groupName
      });
      const {
        result,
        statusText,
        status,
        data
      } = await tools_httpRequest({
        url: `https://steamcommunity.com/groups/${groupName}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      });
      if (result === 'Success') {
        if ((data === null || data === void 0 ? void 0 : data.status) === 200) {
          var _data$responseText$ma6;
          const groupId = (_data$responseText$ma6 = data.responseText.match(/OpenGroupChat\( '([0-9]+)'/)) === null || _data$responseText$ma6 === void 0 ? void 0 : _data$responseText$ma6[1];
          if (groupId) {
            logStatus.success();
            return groupId;
          }
          logStatus.error(`Error:${data.statusText}(${data.status})`);
          return false;
        }
        logStatus.error(`Error:${data === null || data === void 0 ? void 0 : data.statusText}(${data === null || data === void 0 ? void 0 : data.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError_throwError(error, 'Steam.getGroupID');
      return false;
    }
  }
  async function _addToWishlist2(gameId) {
    try {
      var _data$response;
      const logStatus = scripts_echoLog({
        type: 'addWishlist',
        text: gameId
      });
      const {
        result,
        data
      } = await tools_httpRequest({
        url: 'https://store.steampowered.com/api/addtowishlist',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        data: $.param({
          sessionid: Steam_classPrivateFieldGet(this, Steam_auth).storeSessionID,
          appid: gameId
        }),
        dataType: 'json'
      });
      if (result === 'Success' && (data === null || data === void 0 ? void 0 : data.status) === 200 && ((_data$response = data.response) === null || _data$response === void 0 ? void 0 : _data$response.success) === true) {
        logStatus.success();
        this.tasks.wishlists = unique([ ...this.whiteList.wishlists, gameId ]);
        return true;
      }
      const {
        result: resultR,
        statusText: statusTextR,
        status: statusR,
        data: dataR
      } = await tools_httpRequest({
        url: `https://store.steampowered.com/app/${gameId}`,
        method: 'GET'
      });
      if (resultR === 'Success') {
        if ((dataR === null || dataR === void 0 ? void 0 : dataR.status) === 200) {
          if (dataR.responseText.includes('class="queue_actions_ctn"') && dataR.responseText.includes('class="already_in_library"')) {
            logStatus.success();
            this.tasks.wishlists = unique([ ...this.whiteList.wishlists, gameId ]);
            return true;
          } else if (dataR.responseText.includes('class="queue_actions_ctn"') && dataR.responseText.includes('id="add_to_wishlist_area_success" style="display: none;') || !dataR.responseText.includes('class="queue_actions_ctn"')) {
            logStatus.error(`Error:${dataR.statusText}(${dataR.status})`);
            return false;
          }
          logStatus.success();
          this.tasks.wishlists = unique([ ...this.whiteList.wishlists, gameId ]);
          return true;
        }
        logStatus.error(`Error:${dataR === null || dataR === void 0 ? void 0 : dataR.statusText}(${dataR === null || dataR === void 0 ? void 0 : dataR.status})`);
        return false;
      }
      logStatus.error(`${resultR}:${statusTextR}(${statusR})`);
      return false;
    } catch (error) {
      throwError_throwError(error, 'Steam.addToWishlist');
      return false;
    }
  }
  async function _removeFromWishlist2(gameId) {
    try {
      var _data$response2;
      if (this.whiteList.wishlists.includes(gameId)) {
        scripts_echoLog({
          type: 'whiteList',
          text: gameId
        });
        return true;
      }
      const logStatus = scripts_echoLog({
        type: 'removeWishlist',
        text: gameId
      });
      const {
        result,
        data
      } = await tools_httpRequest({
        url: 'https://store.steampowered.com/api/removefromwishlist',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        data: $.param({
          sessionid: Steam_classPrivateFieldGet(this, Steam_auth).storeSessionID,
          appid: gameId
        }),
        dataType: 'json'
      });
      if (result === 'Success' && (data === null || data === void 0 ? void 0 : data.status) === 200 && ((_data$response2 = data.response) === null || _data$response2 === void 0 ? void 0 : _data$response2.success) === true) {
        logStatus.success();
        return true;
      }
      const {
        result: resultR,
        statusText: statusTextR,
        status: statusR,
        data: dataR
      } = await tools_httpRequest({
        url: `https://store.steampowered.com/app/${gameId}`,
        method: 'GET'
      });
      if (resultR === 'Success') {
        if ((dataR === null || dataR === void 0 ? void 0 : dataR.status) === 200) {
          if (dataR.responseText.includes('class="queue_actions_ctn"') && (dataR.responseText.includes('已在库中') || dataR.responseText.includes('添加至您的愿望单'))) {
            logStatus.success();
            return true;
          }
          logStatus.error(`Error:${dataR.statusText}(${dataR.status})`);
          return false;
        }
        logStatus.error(`Error:${dataR === null || dataR === void 0 ? void 0 : dataR.statusText}(${dataR === null || dataR === void 0 ? void 0 : dataR.status})`);
        return false;
      }
      logStatus.error(`${resultR}:${statusTextR}(${statusR})`);
      return false;
    } catch (error) {
      throwError_throwError(error, 'Steam.removeFromWishlist');
      return false;
    }
  }
  async function _toggleFollowGame2(gameId, doTask) {
    try {
      if (!doTask && this.whiteList.follows.includes(gameId)) {
        scripts_echoLog({
          type: 'whiteList',
          text: gameId
        });
        return true;
      }
      const logStatus = scripts_echoLog({
        type: `${doTask ? '' : 'un'}followGame`,
        text: gameId
      });
      const requestData = {
        sessionid: Steam_classPrivateFieldGet(this, Steam_auth).storeSessionID,
        appid: gameId
      };
      if (!doTask) {
        requestData.unfollow = '1';
      }
      const {
        result,
        data
      } = await tools_httpRequest({
        url: 'https://store.steampowered.com/explore/followgame/',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        data: $.param(requestData)
      });
      if (result === 'Success' && (data === null || data === void 0 ? void 0 : data.status) === 200 && data.responseText === 'true') {
        logStatus.success();
        return true;
      }
      const followed = await Steam_classPrivateMethodGet(this, _isFollowedGame, _isFollowedGame2).call(this, gameId);
      if (doTask === followed) {
        logStatus.success();
        if (doTask) {
          this.tasks.follows = unique([ ...this.whiteList.follows, gameId ]);
        }
        return true;
      }
      logStatus.error(`Error:${data === null || data === void 0 ? void 0 : data.statusText}(${data === null || data === void 0 ? void 0 : data.status})`);
      return false;
    } catch (error) {
      throwError_throwError(error, 'Steam.toggleFollowGame');
      return false;
    }
  }
  async function _isFollowedGame2(gameId) {
    try {
      const {
        result,
        data
      } = await tools_httpRequest({
        url: `https://store.steampowered.com/app/${gameId}`,
        method: 'GET'
      });
      if (result === 'Success') {
        if ((data === null || data === void 0 ? void 0 : data.status) === 200) {
          if ($(data.responseText.replace(/<img.*?>/g, '')).find('.queue_control_button.queue_btn_follow>.btnv6_blue_hoverfade.btn_medium.queue_btn_active').css('display') !== 'none') {
            return true;
          }
          return false;
        }
        return false;
      }
      return false;
    } catch (error) {
      throwError_throwError(error, 'Steam.isFollowedGame');
      return false;
    }
  }
  async function _toggleForum2(gameId) {
    let doTask = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    try {
      if (!doTask && this.whiteList.forums.includes(gameId)) {
        scripts_echoLog({
          type: 'whiteList',
          text: gameId
        });
        return true;
      }
      const forumId = await Steam_classPrivateMethodGet(this, _getForumId, _getForumId2).call(this, gameId);
      if (!forumId) {
        return false;
      }
      const logStatus = scripts_echoLog({
        type: `${doTask ? '' : 'un'}subscribeForum`,
        text: gameId
      });
      const [ id, feature ] = forumId.split('_');
      const {
        result,
        statusText,
        status,
        data
      } = await tools_httpRequest({
        url: `https://steamcommunity.com/forum/${id}/General/${doTask ? '' : 'un'}subscribe/${feature || '0'}/`,
        method: 'POST',
        responseType: 'json',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        data: $.param({
          sessionid: Steam_classPrivateFieldGet(this, Steam_auth).communitySessionID
        })
      });
      if (result === 'Success') {
        var _data$response3, _data$response4;
        if ((data === null || data === void 0 ? void 0 : data.status) === 200 && (((_data$response3 = data.response) === null || _data$response3 === void 0 ? void 0 : _data$response3.success) === 1 || ((_data$response4 = data.response) === null || _data$response4 === void 0 ? void 0 : _data$response4.success) === 29)) {
          if (doTask) {
            this.tasks.forums = unique([ ...this.tasks.forums, gameId ]);
          }
          logStatus.success();
          return true;
        }
        logStatus.error(`Error:${data === null || data === void 0 ? void 0 : data.statusText}(${data === null || data === void 0 ? void 0 : data.status})`);
        return true;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return true;
    } catch (error) {
      throwError_throwError(error, 'Steam.toggleForum');
      return true;
    }
  }
  async function _getForumId2(gameId) {
    try {
      const logStatus = scripts_echoLog({
        type: 'getForumId',
        text: gameId
      });
      const {
        result,
        statusText,
        status,
        data
      } = await tools_httpRequest({
        url: `https://steamcommunity.com/app/${gameId}/discussions/`,
        method: 'GET'
      });
      if (result === 'Success') {
        if ((data === null || data === void 0 ? void 0 : data.status) === 200) {
          var _data$responseText, _data$responseText$ma7;
          const forumId = (_data$responseText = data.responseText) === null || _data$responseText === void 0 ? void 0 : (_data$responseText$ma7 = _data$responseText.match(/General_([\d]+(_[\d]+)?)/)) === null || _data$responseText$ma7 === void 0 ? void 0 : _data$responseText$ma7[1];
          if (forumId) {
            logStatus.success();
            return forumId;
          }
          logStatus.error(`Error:${data.statusText}(${data.status})`);
          return false;
        }
        logStatus.error(`Error:${data === null || data === void 0 ? void 0 : data.statusText}(${data === null || data === void 0 ? void 0 : data.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError_throwError(error, 'Steam.getForumId');
      return false;
    }
  }
  async function _toggleFavoriteWorkshop2(id) {
    let doTask = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    try {
      if (!doTask && this.whiteList.workshops.includes(id)) {
        scripts_echoLog({
          type: 'whiteList',
          text: id
        });
        return true;
      }
      const appid = await Steam_classPrivateMethodGet(this, _getWorkshopAppId, _getWorkshopAppId2).call(this, id);
      if (!appid) {
        return false;
      }
      const logStatus = scripts_echoLog({
        type: doTask ? 'favoriteWorkshop' : 'unfavoriteWorkshop',
        text: id
      });
      const {
        result,
        statusText,
        status,
        data
      } = await tools_httpRequest({
        url: `https://steamcommunity.com/sharedfiles/${doTask ? '' : 'un'}favorite`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        data: $.param({
          id: id,
          appid: appid,
          sessionid: Steam_classPrivateFieldGet(this, Steam_auth).communitySessionID
        })
      });
      if (result === 'Success') {
        if ((data === null || data === void 0 ? void 0 : data.status) === 200 && !data.responseText) {
          if (doTask) {
            this.tasks.workshops = unique([ ...this.tasks.workshops, id ]);
          }
          logStatus.success();
          return true;
        }
        logStatus.error(`Error:${data === null || data === void 0 ? void 0 : data.statusText}(${data === null || data === void 0 ? void 0 : data.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError_throwError(error, 'Steam.toggleFavoriteWorkshop');
      return false;
    }
  }
  async function _getWorkshopAppId2(id) {
    try {
      const logStatus = scripts_echoLog({
        type: 'getWorkshopAppId',
        text: id
      });
      const {
        result,
        statusText,
        status,
        data
      } = await tools_httpRequest({
        url: `https://steamcommunity.com/sharedfiles/filedetails/?id=${id}`,
        method: 'GET'
      });
      if (result === 'Success') {
        if ((data === null || data === void 0 ? void 0 : data.status) === 200) {
          var _data$responseText$ma8;
          const appid = (_data$responseText$ma8 = data.responseText.match(/<input type="hidden" name="appid" value="([\d]+?)" \/>/)) === null || _data$responseText$ma8 === void 0 ? void 0 : _data$responseText$ma8[1];
          if (appid) {
            logStatus.success();
            return appid;
          }
          logStatus.error('Error: getWorkshopAppId failed');
          return false;
        }
        logStatus.error(`Error:${data === null || data === void 0 ? void 0 : data.statusText}(${data === null || data === void 0 ? void 0 : data.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError_throwError(error, 'Steam.getWorkshopAppId');
      return false;
    }
  }
  async function _voteupWorkshop2(id) {
    try {
      const logStatus = scripts_echoLog({
        type: 'voteupWorkshop',
        text: id
      });
      const {
        result,
        statusText,
        status,
        data
      } = await tools_httpRequest({
        url: 'https://steamcommunity.com/sharedfiles/voteup',
        method: 'POST',
        responseType: 'json',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        data: $.param({
          id: id,
          sessionid: Steam_classPrivateFieldGet(this, Steam_auth).communitySessionID
        })
      });
      if (result === 'Success') {
        var _data$response5;
        if ((data === null || data === void 0 ? void 0 : data.status) === 200 && ((_data$response5 = data.response) === null || _data$response5 === void 0 ? void 0 : _data$response5.success) === 1) {
          logStatus.success();
          return true;
        }
        logStatus.error(`Error:${data === null || data === void 0 ? void 0 : data.statusText}(${data === null || data === void 0 ? void 0 : data.status})`);
        return true;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return true;
    } catch (error) {
      throwError_throwError(error, 'Steam.voteupWorkshop');
      return true;
    }
  }
  async function _toggleCurator2(curatorId, logStatusParam) {
    let doTask = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    try {
      if (!doTask && this.whiteList.curators.includes(curatorId)) {
        scripts_echoLog({
          type: 'whiteList',
          text: curatorId
        });
        return true;
      }
      const logStatus = logStatusParam || scripts_echoLog({
        type: doTask ? 'followCurator' : 'unfollowCurator',
        text: curatorId
      });
      const {
        result,
        statusText,
        status,
        data
      } = await tools_httpRequest({
        url: 'https://store.steampowered.com/curators/ajaxfollow',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        data: $.param({
          clanid: curatorId,
          sessionid: Steam_classPrivateFieldGet(this, Steam_auth).storeSessionID,
          follow: doTask
        }),
        dataType: 'json'
      });
      if (result === 'Success') {
        var _data$response6, _data$response6$succe, _data$response7;
        if ((data === null || data === void 0 ? void 0 : data.status) === 200 && ((_data$response6 = data.response) === null || _data$response6 === void 0 ? void 0 : (_data$response6$succe = _data$response6.success) === null || _data$response6$succe === void 0 ? void 0 : _data$response6$succe.success) === 1) {
          logStatus.success();
          return true;
        }
        logStatus.error(`Error:${data === null || data === void 0 ? void 0 : data.statusText}(${data === null || data === void 0 ? void 0 : (_data$response7 = data.response) === null || _data$response7 === void 0 ? void 0 : _data$response7.success}` || `${data === null || data === void 0 ? void 0 : data.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError_throwError(error, 'Steam.toggleCurator');
      return false;
    }
  }
  async function _getCuratorId2(path, developerName) {
    try {
      const logStatus = scripts_echoLog({
        type: 'getCuratorId',
        text: `${path}/${developerName}`
      });
      const {
        result,
        statusText,
        status,
        data
      } = await tools_httpRequest({
        url: `https://store.steampowered.com/${path}/${developerName}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      });
      if (result === 'Success') {
        if ((data === null || data === void 0 ? void 0 : data.status) === 200) {
          var _data$responseText$ma9;
          const developerId = (_data$responseText$ma9 = data.responseText.match(/g_pagingData.*?"clanid":([\d]+)/)) === null || _data$responseText$ma9 === void 0 ? void 0 : _data$responseText$ma9[1];
          if (developerId) {
            logStatus.success();
            return developerId;
          }
          logStatus.error(`Error:${data.statusText}(${data.status})`);
          return false;
        }
        logStatus.error(`Error:${data === null || data === void 0 ? void 0 : data.statusText}(${data === null || data === void 0 ? void 0 : data.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError_throwError(error, 'Steam.getCuratorID');
      return false;
    }
  }
  async function _toggleCuratorLike2(link) {
    let doTask = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    try {
      const [ path, name ] = link.split('/');
      if (!(path && name)) {
        scripts_echoLog({
          type: 'text',
          text: 'Error link'
        });
        return false;
      }
      const curatorId = await Steam_classPrivateMethodGet(this, _getCuratorId, _getCuratorId2).call(this, path, name);
      if (curatorId) {
        const logStatus = scripts_echoLog({
          type: `${doTask ? '' : 'un'}follow${path.replace(/^\S/, s => s.toUpperCase())}`,
          text: name
        });
        return await Steam_classPrivateMethodGet(this, _toggleCurator, _toggleCurator2).call(this, curatorId, logStatus, doTask);
      }
      return false;
    } catch (error) {
      throwError_throwError(error, 'Steam.toggleCuratorLike');
      return false;
    }
  }
  async function _getAnnouncementParams2(appId, viewId) {
    try {
      const logStatus = scripts_echoLog({
        type: 'getAnnouncementParams',
        text: viewId
      });
      const {
        result,
        statusText,
        status,
        data
      } = await tools_httpRequest({
        url: `https://store.steampowered.com/news/app/${appId}/view/${viewId}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      });
      if (result === 'Success') {
        if ((data === null || data === void 0 ? void 0 : data.status) === 200) {
          var _data$responseText$ma10, _data$responseText$ma11, _data$responseText$ma12;
          const authWgToken = (_data$responseText$ma10 = data.responseText.match(/authwgtoken&quot;:&quot;(.*?)&quot;/)) === null || _data$responseText$ma10 === void 0 ? void 0 : _data$responseText$ma10[1];
          const clanId = (_data$responseText$ma11 = data.responseText.match(/clanAccountID&quot;:([\d]+?),/)) === null || _data$responseText$ma11 === void 0 ? void 0 : _data$responseText$ma11[1];
          const gid = (_data$responseText$ma12 = data.responseText.match(/announcementGID&quot;:&quot;([\d]+?)&quot;/)) === null || _data$responseText$ma12 === void 0 ? void 0 : _data$responseText$ma12[1];
          if (authWgToken && clanId) {
            logStatus.success();
            return {
              authWgToken: authWgToken,
              clanId: clanId,
              gid: gid
            };
          }
          logStatus.error(`Error:${data.statusText}(${data.status})`);
          return {};
        }
        logStatus.error(`Error:${data === null || data === void 0 ? void 0 : data.statusText}(${data === null || data === void 0 ? void 0 : data.status})`);
        return {};
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return {};
    } catch (error) {
      throwError_throwError(error, 'Steam.likeAnnouncement');
      return {};
    }
  }
  async function _likeAnnouncement2(id) {
    try {
      const [ appId, viewId ] = id.split('/');
      if (!(appId && viewId)) {
        scripts_echoLog({
          type: 'lost params',
          text: id
        });
        return false;
      }
      const {
        authWgToken,
        clanId,
        gid
      } = await Steam_classPrivateMethodGet(this, _getAnnouncementParams, _getAnnouncementParams2).call(this, appId, viewId);
      if (!(authWgToken && clanId)) {
        return false;
      }
      const logStatus = scripts_echoLog({
        type: 'likeAnnouncement',
        text: id
      });
      const {
        result,
        statusText,
        status,
        data
      } = await tools_httpRequest({
        url: `https://store.steampowered.com/updated/ajaxrateupdate/${gid || viewId}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          Host: 'store.steampowered.com',
          Origin: 'https://store.steampowered.com',
          Referer: `https://store.steampowered.com/news/app/${appId}/view/${viewId}`
        },
        data: $.param({
          sessionid: Steam_classPrivateFieldGet(this, Steam_auth).storeSessionID,
          wgauthtoken: authWgToken,
          voteup: 1,
          clanid: clanId,
          ajax: 1
        }),
        dataType: 'json'
      });
      if (result === 'Success') {
        if ((data === null || data === void 0 ? void 0 : data.status) === 200 && data.response.success === 1) {
          logStatus.success();
          return true;
        }
        logStatus.error(`Error:${data === null || data === void 0 ? void 0 : data.statusText}(${data === null || data === void 0 ? void 0 : data.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError_throwError(error, 'Steam.likeAnnouncement');
      return false;
    }
  }
  const social_Steam = Steam;
  if (window.location.hostname === 'discord.com' && window.location.hash === '#auth') {
    var _window$localStorage$;
    GM_setValue('discordAuth', {
      auth: (_window$localStorage$ = window.localStorage.getItem('token')) === null || _window$localStorage$ === void 0 ? void 0 : _window$localStorage$.replace(/^"|"$/g, '')
    });
    window.close();
  }
  window.onload = () => {
    if (window.location.hostname === 'www.twitch.tv' && window.location.hash === '#auth') {
      const authToken = Cookies.get('auth-token');
      const isLogin = !!Cookies.get('login');
      if (isLogin) {
        var _commonOptions, _commonOptions$header;
        GM_setValue('twitchAuth', {
          authToken: authToken,
          clientId: (_commonOptions = commonOptions) === null || _commonOptions === void 0 ? void 0 : (_commonOptions$header = _commonOptions.headers) === null || _commonOptions$header === void 0 ? void 0 : _commonOptions$header['Client-ID']
        });
        window.close();
      } else {}
    }
    if (window.location.hostname === 'twitter.com' && window.location.hash === '#auth') {
      const ct0 = Cookies.get('ct0');
      if (ct0) {
        GM_setValue('twitterAuth', {
          ct0: ct0
        });
        window.close();
      } else {}
    }
    if (window.location.hostname === 'www.youtube.com' && window.location.hash === '#auth') {
      const PAPISID = Cookies.get('__Secure-3PAPISID');
      if (PAPISID) {
        GM_setValue('youtubeAuth', {
          PAPISID: PAPISID
        });
        window.close();
      } else {}
    }
    if (window.location.hostname === 'www.reddit.com' && (window.location.hash === '#auth' || GM_getValue('redditAuth') === '#auth')) {
      const betaButton = $('#redesign-beta-optin-btn');
      if (betaButton.length > 0) {
        GM_setValue('redditAuth', '#auth');
        return betaButton[0].click();
      }
      GM_setValue('redditAuth', null);
      window.close();
      Swal.fire('', '如果此页面没有自动关闭，请自行关闭本页面。');
    }
    unsafeWindow.Discord = social_Discord;
    unsafeWindow.Instagram = social_Instagram;
    unsafeWindow.Reddit = social_Reddit;
    unsafeWindow.Twitch = social_Twitch;
    unsafeWindow.Twitter = social_Twitter;
    unsafeWindow.Vk = social_Vk;
    unsafeWindow.Youtube = social_Youtube;
    unsafeWindow.Steam = social_Steam;
    $('body').append('<div id="fuck-task-info" style="position:fixed;bottom:10px;right:10px;width:300px;max-width:60%;"></div>');
  };
})();
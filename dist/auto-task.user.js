// ==UserScript==
// @name               auto-task-new
// @namespace          auto-task-new
// @version            4.0.5-Alpha
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
// @include            *://opquests.com/quests/*
// @include            *://gleam.io/*
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

(function() {
  'use strict';
  var __webpack_modules__ = {
    886: function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {
      const external_Swal_namespaceObject = Swal;
      var external_Swal_default = __webpack_require__.n(external_Swal_namespaceObject);
      const external_Cookies_namespaceObject = Cookies;
      function throwError(error, name) {
        console.log('%c%s', 'color:white;background:red', `${name}\n${error.stack}`);
      }
      const httpRequest = async function(options) {
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
            return await httpRequest(options, times + 1);
          }
          return result;
        } catch (error) {
          throwError(error, 'httpRequest');
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
      const tools_httpRequest = httpRequest;
      const zh_CN_namespaceObject = JSON.parse('{"loginIns":"请先<a href=\\"https://www.instagram.com/accounts/login/\\">登录Instagram</a>","insBanned":"您的Instagram账户已被封禁","loginReddit":"请先<a href=\\"https://www.reddit.com/login/\\">登录Reddit</a>","loginSteamStore":"请先<a href=\\"https://store.steampowered.com/login/\\">登录Steam商店</a>","loginSteamCommunity":"请先<a href=\\"https://steamcommunity.com/login/home/\\">登录Steam社区</a>","loginVk":"请先<a href=\\"https://vk.com/login/\\">登录Vk</a>","loginYtb":"请先<a href=\\"https://accounts.google.com/ServiceLogin?service=youtube\\">登录YouTube</a>","tryUpdateYtbAuth":"请尝试<a href=\\"https://www.youtube.com/#auth\\">更新YouTube凭证</a>"}');
      const languages = {
        zh: zh_CN_namespaceObject
      };
      const language = 'zh';
      const I18n = function(key) {
        var _languages$language;
        for (var _len = arguments.length, argvs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          argvs[_key - 1] = arguments[_key];
        }
        if (!((_languages$language = languages[language]) !== null && _languages$language !== void 0 && _languages$language[key])) {
          return key;
        }
        return languages[language][key].replace(/%([\d]+)/g, (match, index) => argvs[parseInt(index, 10)]);
      };
      const i18n = I18n;
      const echoLog = _ref => {
        let {
          type = 'text',
          text,
          url,
          id
        } = _ref;
        try {
          var _ele$;
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
           case 'custom':
            ele = $(text);
            break;

           default:
            ele = $(`<li>${i18n('unknown')}:${type}(${text})...<font></font></li>`);
            break;
          }
          ele.addClass('card-text');
          $('#auto-task-info').append(ele);
          (_ele$ = ele[0]) === null || _ele$ === void 0 ? void 0 : _ele$.scrollIntoView();
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
          throwError(error, 'echoLog');
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
      const scripts_echoLog = echoLog;
      const unique = array => {
        try {
          return [ ...new Set(array) ];
        } catch (error) {
          throwError(error, 'unique');
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
      const getRedirectLink = async link => {
        try {
          if (!link) {
            return null;
          }
          const redirectLinksCache = GM_getValue('redirectLinks') || {};
          if (redirectLinksCache[link]) {
            redirectLinksCache[link];
          }
          return await tools_httpRequest({
            url: link,
            method: 'GET'
          }).then(_ref => {
            let {
              data
            } = _ref;
            if (data !== null && data !== void 0 && data.finalUrl) {
              redirectLinksCache[link] = data.finalUrl;
              GM_setValue('redirectLinks', redirectLinksCache);
              return data.finalUrl;
            }
            return null;
          });
        } catch (error) {
          throwError(error, 'getRedirectLink');
          return null;
        }
      };
      const visitLink = async (link, options) => {
        try {
          const logStatus = scripts_echoLog({
            type: 'visitLink',
            text: link
          });
          return await tools_httpRequest({
            url: link,
            method: 'GET',
            ...options
          }).then(_ref2 => {
            let {
              result,
              statusText,
              status
            } = _ref2;
            if (result === 'Success') {
              logStatus.success();
              return true;
            }
            logStatus.error(`${result}:${statusText}(${status})`);
            return false;
          });
        } catch (error) {
          throwError(error, 'visitLink');
          return false;
        }
      };
      const getUrlQuery = url => {
        try {
          const query = {};
          if (url) {
            if (url.includes('?')) {
              url.split('?')[1].replace(/([^?&=]+)=([^&]+)/g, (str, key, value) => {
                query[key] = value;
                return str;
              });
            }
          } else {
            window.location.search.replace(/([^?&=]+)=([^&]+)/g, (str, key, value) => {
              query[key] = value;
              return str;
            });
          }
          return query;
        } catch (error) {
          throwError(error, 'getUrlQuery');
          return {};
        }
      };
      const getUuid = function() {
        let randomLength = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8;
        return Number(Math.random().toString().substr(2, randomLength) + Date.now()).toString(36);
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
        getRealParams(name, links, doTask, link2param) {
          try {
            let realParams = [];
            if (links.length > 0) {
              realParams = [ ...realParams, ...links.map(link => link2param(link)).filter(link => link) ];
            }
            if (!doTask && this.tasks[name].length > 0) {
              realParams = [ ...realParams, ...this.tasks[name] ];
            }
            return unique(realParams);
          } catch (error) {
            throwError(error, 'Social.getRealParams');
            return [];
          }
        }
      }
      const social_Social = Social;
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
      const defaultTasks = {
        servers: []
      };
      var _auth = new WeakMap();
      var _cache = new WeakMap();
      var _initialized = new WeakMap();
      var _verifyAuth = new WeakSet();
      var _updateAuth = new WeakSet();
      var _joinServer = new WeakSet();
      var _leaveServer = new WeakSet();
      var _getGuild = new WeakSet();
      var _setCache = new WeakSet();
      class Discord extends social_Social {
        constructor() {
          var _GM_getValue;
          super(...arguments);
          _classPrivateMethodInitSpec(this, _setCache);
          _classPrivateMethodInitSpec(this, _getGuild);
          _classPrivateMethodInitSpec(this, _leaveServer);
          _classPrivateMethodInitSpec(this, _joinServer);
          _classPrivateMethodInitSpec(this, _updateAuth);
          _classPrivateMethodInitSpec(this, _verifyAuth);
          Discord_defineProperty(this, 'tasks', {
            ...defaultTasks
          });
          Discord_defineProperty(this, 'whiteList', ((_GM_getValue = GM_getValue('whiteList')) === null || _GM_getValue === void 0 ? void 0 : _GM_getValue.discord) || {
            ...defaultTasks
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
        }
        async init() {
          try {
            if (_classPrivateFieldGet(this, _initialized)) {
              return true;
            }
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
            throwError(error, 'Discord.init');
            return false;
          }
        }
        async toggle(_ref) {
          let {
            doTask = true,
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
            const realServers = this.getRealParams('servers', serverLinks, doTask, link => {
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
            throwError(error, 'Discord.toggleServers');
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
          throwError(error, 'Discord.verifyAuth');
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
          throwError(error, 'Discord.updateAuth');
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
              _classPrivateMethodGet(this, _setCache, _setCache2).call(this, inviteId, guild);
              this.tasks.servers = unique([ ...this.tasks.servers, inviteId ]);
            }
            return true;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Discord.joinServer');
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
          throwError(error, 'Discord.leaveServer');
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
              _classPrivateMethodGet(this, _setCache, _setCache2).call(this, inviteId, guild);
              return guild;
            }
            logStatus.error(`${result}:${statusText}(${status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Discord.getGuild');
          return false;
        }
      }
      function _setCache2(inviteId, guild) {
        try {
          _classPrivateFieldGet(this, _cache)[inviteId] = guild;
          GM_setValue('discordCache', _classPrivateFieldGet(this, _cache));
        } catch (error) {
          throwError(error, 'Discord.setCache');
        }
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
      function Instagram_classPrivateFieldSet(receiver, privateMap, value) {
        var descriptor = Instagram_classExtractFieldDescriptor(receiver, privateMap, 'set');
        Instagram_classApplyDescriptorSet(receiver, descriptor, value);
        return value;
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
      function Instagram_classPrivateFieldGet(receiver, privateMap) {
        var descriptor = Instagram_classExtractFieldDescriptor(receiver, privateMap, 'get');
        return Instagram_classApplyDescriptorGet(receiver, descriptor);
      }
      function Instagram_classExtractFieldDescriptor(receiver, privateMap, action) {
        if (!privateMap.has(receiver)) {
          throw new TypeError('attempted to ' + action + ' private field on non-instance');
        }
        return privateMap.get(receiver);
      }
      function Instagram_classApplyDescriptorGet(receiver, descriptor) {
        if (descriptor.get) {
          return descriptor.get.call(receiver);
        }
        return descriptor.value;
      }
      const Instagram_defaultTasks = {
        users: []
      };
      var Instagram_cache = new WeakMap();
      var Instagram_auth = new WeakMap();
      var Instagram_initialized = new WeakMap();
      var _getUserInfo = new WeakSet();
      var _followUser = new WeakSet();
      var _unfollowUser = new WeakSet();
      var Instagram_setCache = new WeakSet();
      class Instagram extends social_Social {
        constructor() {
          var _GM_getValue;
          super(...arguments);
          Instagram_classPrivateMethodInitSpec(this, Instagram_setCache);
          Instagram_classPrivateMethodInitSpec(this, _unfollowUser);
          Instagram_classPrivateMethodInitSpec(this, _followUser);
          Instagram_classPrivateMethodInitSpec(this, _getUserInfo);
          Instagram_defineProperty(this, 'tasks', {
            ...Instagram_defaultTasks
          });
          Instagram_defineProperty(this, 'whiteList', ((_GM_getValue = GM_getValue('whiteList')) === null || _GM_getValue === void 0 ? void 0 : _GM_getValue.instagram) || {
            ...Instagram_defaultTasks
          });
          Instagram_classPrivateFieldInitSpec(this, Instagram_cache, {
            writable: true,
            value: GM_getValue('instagramCache') || {}
          });
          Instagram_classPrivateFieldInitSpec(this, Instagram_auth, {
            writable: true,
            value: {}
          });
          Instagram_classPrivateFieldInitSpec(this, Instagram_initialized, {
            writable: true,
            value: false
          });
        }
        async init() {
          try {
            if (Instagram_classPrivateFieldGet(this, Instagram_initialized)) {
              return true;
            }
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
            throwError(error, 'Instagram.init');
            return false;
          }
        }
        async toggle(_ref) {
          let {
            doTask = true,
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
            const realUsers = this.getRealParams('users', userLinks, doTask, link => {
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
            throwError(error, 'Instagram.toggleUsers');
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
          const userId = Instagram_classPrivateFieldGet(this, Instagram_cache)[name];
          if (userId && name !== 'instagram') {
            logStatus.success();
            return userId;
          }
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
              const id = (_data$responseText$ma3 = data.responseText.match(/"profilePage_([\d]+?)"/)) === null || _data$responseText$ma3 === void 0 ? void 0 : _data$responseText$ma3[1];
              if (id) {
                Instagram_classPrivateMethodGet(this, Instagram_setCache, Instagram_setCache2).call(this, name, id);
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
          throwError(error, 'Instagram.getUserInfo');
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
          throwError(error, 'Instagram.followUser');
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
          throwError(error, 'Instagram.unfollowUser');
          return false;
        }
      }
      function Instagram_setCache2(name, id) {
        try {
          Instagram_classPrivateFieldGet(this, Instagram_cache)[name] = id;
          GM_setValue('instagramCache', Instagram_classPrivateFieldGet(this, Instagram_cache));
        } catch (error) {
          throwError(error, 'Instagram.setCache');
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
      function Reddit_classPrivateFieldSet(receiver, privateMap, value) {
        var descriptor = Reddit_classExtractFieldDescriptor(receiver, privateMap, 'set');
        Reddit_classApplyDescriptorSet(receiver, descriptor, value);
        return value;
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
      function Reddit_classPrivateFieldGet(receiver, privateMap) {
        var descriptor = Reddit_classExtractFieldDescriptor(receiver, privateMap, 'get');
        return Reddit_classApplyDescriptorGet(receiver, descriptor);
      }
      function Reddit_classExtractFieldDescriptor(receiver, privateMap, action) {
        if (!privateMap.has(receiver)) {
          throw new TypeError('attempted to ' + action + ' private field on non-instance');
        }
        return privateMap.get(receiver);
      }
      function Reddit_classApplyDescriptorGet(receiver, descriptor) {
        if (descriptor.get) {
          return descriptor.get.call(receiver);
        }
        return descriptor.value;
      }
      const Reddit_defaultTasks = {
        reddits: []
      };
      var Reddit_auth = new WeakMap();
      var Reddit_initialized = new WeakMap();
      var _useBeta = new WeakSet();
      var Reddit_updateAuth = new WeakSet();
      class Reddit extends social_Social {
        constructor() {
          var _GM_getValue;
          super(...arguments);
          Reddit_classPrivateMethodInitSpec(this, Reddit_updateAuth);
          Reddit_classPrivateMethodInitSpec(this, _useBeta);
          Reddit_defineProperty(this, 'tasks', {
            ...Reddit_defaultTasks
          });
          Reddit_defineProperty(this, 'whiteList', ((_GM_getValue = GM_getValue('whiteList')) === null || _GM_getValue === void 0 ? void 0 : _GM_getValue.reddit) || {
            ...Reddit_defaultTasks
          });
          Reddit_classPrivateFieldInitSpec(this, Reddit_auth, {
            writable: true,
            value: void 0
          });
          Reddit_classPrivateFieldInitSpec(this, Reddit_initialized, {
            writable: true,
            value: false
          });
        }
        async init() {
          try {
            if (Reddit_classPrivateFieldGet(this, Reddit_initialized)) {
              return true;
            }
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
            throwError(error, 'Reddit.init');
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
            throwError(error, 'Reddit.toggleTask');
            return false;
          }
        }
        async toggle(_ref2) {
          let {
            doTask = true,
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
            const realReddits = this.getRealParams('reddits', redditLinks, doTask, link => {
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
            throwError(error, 'Reddit.toggle');
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
          throwError(error, 'Reddit.useBeta');
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
          throwError(error, 'Reddit.updateAuth');
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
      const Twitch_defaultTasks = {
        channels: []
      };
      var Twitch_auth = new WeakMap();
      var Twitch_cache = new WeakMap();
      var Twitch_initialized = new WeakMap();
      var Twitch_verifyAuth = new WeakSet();
      var Twitch_updateAuth = new WeakSet();
      var _toggleChannel = new WeakSet();
      var _getChannelId = new WeakSet();
      var Twitch_setCache = new WeakSet();
      class Twitch extends social_Social {
        constructor() {
          var _GM_getValue;
          super(...arguments);
          Twitch_classPrivateMethodInitSpec(this, Twitch_setCache);
          Twitch_classPrivateMethodInitSpec(this, _getChannelId);
          Twitch_classPrivateMethodInitSpec(this, _toggleChannel);
          Twitch_classPrivateMethodInitSpec(this, Twitch_updateAuth);
          Twitch_classPrivateMethodInitSpec(this, Twitch_verifyAuth);
          Twitch_defineProperty(this, 'tasks', {
            ...Twitch_defaultTasks
          });
          Twitch_defineProperty(this, 'whiteList', ((_GM_getValue = GM_getValue('whiteList')) === null || _GM_getValue === void 0 ? void 0 : _GM_getValue.twitch) || {
            ...Twitch_defaultTasks
          });
          Twitch_classPrivateFieldInitSpec(this, Twitch_auth, {
            writable: true,
            value: GM_getValue('twitchAuth') || {}
          });
          Twitch_classPrivateFieldInitSpec(this, Twitch_cache, {
            writable: true,
            value: GM_getValue('twitchCache') || {}
          });
          Twitch_classPrivateFieldInitSpec(this, Twitch_initialized, {
            writable: true,
            value: false
          });
        }
        async init() {
          try {
            if (Twitch_classPrivateFieldGet(this, Twitch_initialized)) {
              return true;
            }
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
            throwError(error, 'Twitch.init');
            return false;
          }
        }
        async toggle(_ref) {
          let {
            doTask = true,
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
            const realChannels = this.getRealParams('channels', channelLinks, doTask, link => {
              var _link$match;
              return (_link$match = link.match(/https:\/\/(www\.)?twitch\.tv\/(.+)/)) === null || _link$match === void 0 ? void 0 : _link$match[2];
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
            throwError(error, 'Twitch.toggle');
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
          throwError(error, 'Twitch.verifyAuth');
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
          throwError(error, 'Twitch.updateAuth');
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
          throwError(error, 'Twitch.toggleChannel');
          return false;
        }
      }
      async function _getChannelId2(name) {
        try {
          const logStatus = scripts_echoLog({
            type: 'getTwitchChannelId',
            text: name
          });
          const channelId = Twitch_classPrivateFieldGet(this, Twitch_cache)[name];
          if (channelId) {
            logStatus.success();
            return channelId;
          }
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
                Twitch_classPrivateMethodGet(this, Twitch_setCache, Twitch_setCache2).call(this, name, channelId);
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
          throwError(error, 'Twitch.getChannelId');
          return false;
        }
      }
      function Twitch_setCache2(name, id) {
        try {
          Twitch_classPrivateFieldGet(this, Twitch_cache)[name] = id;
          GM_setValue('twitchCache', Twitch_classPrivateFieldGet(this, Twitch_cache));
        } catch (error) {
          throwError(error, 'Twitch.setCache');
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
      const Twitter_defaultTasks = {
        users: [],
        retweets: [],
        likes: []
      };
      var _verifyId = new WeakMap();
      var Twitter_auth = new WeakMap();
      var Twitter_cache = new WeakMap();
      var Twitter_initialized = new WeakMap();
      var Twitter_verifyAuth = new WeakSet();
      var Twitter_updateAuth = new WeakSet();
      var _toggleUser = new WeakSet();
      var _getUserId = new WeakSet();
      var _toggleRetweet = new WeakSet();
      var Twitter_setCache = new WeakSet();
      class Twitter extends social_Social {
        constructor(verifyId) {
          var _GM_getValue;
          super();
          Twitter_classPrivateMethodInitSpec(this, Twitter_setCache);
          Twitter_classPrivateMethodInitSpec(this, _toggleRetweet);
          Twitter_classPrivateMethodInitSpec(this, _getUserId);
          Twitter_classPrivateMethodInitSpec(this, _toggleUser);
          Twitter_classPrivateMethodInitSpec(this, Twitter_updateAuth);
          Twitter_classPrivateMethodInitSpec(this, Twitter_verifyAuth);
          Twitter_defineProperty(this, 'tasks', {
            ...Twitter_defaultTasks
          });
          Twitter_defineProperty(this, 'whiteList', ((_GM_getValue = GM_getValue('whiteList')) === null || _GM_getValue === void 0 ? void 0 : _GM_getValue.twitter) || {
            ...Twitter_defaultTasks
          });
          Twitter_classPrivateFieldInitSpec(this, _verifyId, {
            writable: true,
            value: '783214'
          });
          Twitter_classPrivateFieldInitSpec(this, Twitter_auth, {
            writable: true,
            value: GM_getValue('twitterAuth') || {}
          });
          Twitter_classPrivateFieldInitSpec(this, Twitter_cache, {
            writable: true,
            value: GM_getValue('twitterCache') || {}
          });
          Twitter_classPrivateFieldInitSpec(this, Twitter_initialized, {
            writable: true,
            value: false
          });
          if (verifyId) {
            Twitter_classPrivateFieldSet(this, _verifyId, verifyId);
          }
        }
        async init() {
          try {
            if (Twitter_classPrivateFieldGet(this, Twitter_initialized)) {
              return true;
            }
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
            throwError(error, 'Twitter.init');
            return false;
          }
        }
        async toggle(_ref) {
          let {
            doTask = true,
            userLinks = [],
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
            const realUsers = this.getRealParams('users', userLinks, doTask, link => {
              var _link$match;
              return (_link$match = link.match(/https:\/\/twitter\.com\/(.+)/)) === null || _link$match === void 0 ? void 0 : _link$match[1];
            });
            const realRetweets = this.getRealParams('retweets', retweetLinks, doTask, link => {
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
            throwError(error, 'Twitter.toggle');
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
          throwError(error, 'Twitter.verifyAuth');
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
          throwError(error, 'Twitter.updateToken');
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
          throwError(error, 'Twitter.toggleUser');
          return false;
        }
      }
      async function _getUserId2(name) {
        try {
          const logStatus = scripts_echoLog({
            type: 'getTwitterUserId',
            text: name
          });
          const userId = Twitter_classPrivateFieldGet(this, Twitter_cache)[name];
          if (userId) {
            logStatus.success();
            return userId;
          }
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
                Twitter_classPrivateMethodGet(this, Twitter_setCache, Twitter_setCache2).call(this, name, userId);
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
          throwError(error, 'Twitter.getUserId');
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
          throwError(error, 'Twitter.toggleRetweet');
          return false;
        }
      }
      function Twitter_setCache2(name, id) {
        try {
          Twitter_classPrivateFieldGet(this, Twitter_cache)[name] = id;
          GM_setValue('twitterCache', Twitter_classPrivateFieldGet(this, Twitter_cache));
        } catch (error) {
          throwError(error, 'Twitter.setCache');
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
      function Vk_classPrivateFieldSet(receiver, privateMap, value) {
        var descriptor = Vk_classExtractFieldDescriptor(receiver, privateMap, 'set');
        Vk_classApplyDescriptorSet(receiver, descriptor, value);
        return value;
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
      function Vk_classPrivateFieldGet(receiver, privateMap) {
        var descriptor = Vk_classExtractFieldDescriptor(receiver, privateMap, 'get');
        return Vk_classApplyDescriptorGet(receiver, descriptor);
      }
      function Vk_classExtractFieldDescriptor(receiver, privateMap, action) {
        if (!privateMap.has(receiver)) {
          throw new TypeError('attempted to ' + action + ' private field on non-instance');
        }
        return privateMap.get(receiver);
      }
      function Vk_classApplyDescriptorGet(receiver, descriptor) {
        if (descriptor.get) {
          return descriptor.get.call(receiver);
        }
        return descriptor.value;
      }
      const Vk_defaultTasks = {
        names: []
      };
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
      var Vk_setCache = new WeakSet();
      class Vk extends social_Social {
        constructor() {
          var _GM_getValue;
          super(...arguments);
          Vk_classPrivateMethodInitSpec(this, Vk_setCache);
          Vk_classPrivateMethodInitSpec(this, _toggleVk);
          Vk_classPrivateMethodInitSpec(this, _getId);
          Vk_classPrivateMethodInitSpec(this, _deleteWall);
          Vk_classPrivateMethodInitSpec(this, _sendWall);
          Vk_classPrivateMethodInitSpec(this, _togglePublic);
          Vk_classPrivateMethodInitSpec(this, _toggleGroup);
          Vk_classPrivateMethodInitSpec(this, Vk_verifyAuth);
          Vk_defineProperty(this, 'tasks', {
            ...Vk_defaultTasks
          });
          Vk_defineProperty(this, 'whiteList', ((_GM_getValue = GM_getValue('whiteList')) === null || _GM_getValue === void 0 ? void 0 : _GM_getValue.vk) || {
            ...Vk_defaultTasks
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
        }
        async init() {
          try {
            if (Vk_classPrivateFieldGet(this, Vk_initialized)) {
              return true;
            }
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
            throwError(error, 'Vk.init');
            return false;
          }
        }
        async toggle(_ref) {
          let {
            doTask = true,
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
            const realNames = this.getRealParams('names', nameLinks, doTask, link => {
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
            throwError(error, 'Vk.toggle');
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
          throwError(error, 'Vk.verifyAuth');
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
          throwError(error, 'Vk.toggleGroup');
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
          throwError(error, 'Vk.togglePublic');
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
                        Vk_classPrivateMethodGet(this, Vk_setCache, Vk_setCache2).call(this, name, `${ownerId}_${postId}`);
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
          throwError(error, 'Vk.sendWall');
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
          throwError(error, 'Vk.deleteWall');
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
          throwError(error, 'Vk.getId');
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
          throwError(error, 'Vk.toggleVk');
          return false;
        }
      }
      function Vk_setCache2(name, postId) {
        try {
          Vk_classPrivateFieldGet(this, Vk_cache)[name] = postId;
          GM_setValue('vkCache', Vk_classPrivateFieldGet(this, Vk_cache));
        } catch (error) {
          throwError(error, 'Vk.setCache');
        }
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
      const Youtube_defaultTasks = {
        channels: [],
        likes: []
      };
      var Youtube_auth = new WeakMap();
      var Youtube_initialized = new WeakMap();
      var _verifyChannel = new WeakMap();
      var Youtube_verifyAuth = new WeakSet();
      var Youtube_updateAuth = new WeakSet();
      var _getInfo = new WeakSet();
      var Youtube_toggleChannel = new WeakSet();
      var _toggleLikeVideo = new WeakSet();
      class Youtube extends social_Social {
        constructor(verifyChannel) {
          var _GM_getValue;
          super();
          Youtube_classPrivateMethodInitSpec(this, _toggleLikeVideo);
          Youtube_classPrivateMethodInitSpec(this, Youtube_toggleChannel);
          Youtube_classPrivateMethodInitSpec(this, _getInfo);
          Youtube_classPrivateMethodInitSpec(this, Youtube_updateAuth);
          Youtube_classPrivateMethodInitSpec(this, Youtube_verifyAuth);
          Youtube_defineProperty(this, 'tasks', {
            ...Youtube_defaultTasks
          });
          Youtube_defineProperty(this, 'whiteList', ((_GM_getValue = GM_getValue('whiteList')) === null || _GM_getValue === void 0 ? void 0 : _GM_getValue.youtube) || {
            ...Youtube_defaultTasks
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
          if (verifyChannel) {
            Youtube_classPrivateFieldSet(this, _verifyChannel, verifyChannel);
          }
        }
        async init() {
          try {
            if (Youtube_classPrivateFieldGet(this, Youtube_initialized)) {
              return true;
            }
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
            throwError(error, 'Youtube.init');
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
            const realChannels = this.getRealParams('channels', channelLinks, doTask, link => {
              if (/^https:\/\/www\.google\.com.*?\/url\?.*?url=https:\/\/www.youtube.com\/.*/.test(link)) {
                var _link$match;
                return (_link$match = link.match(/url=(https:\/\/www.youtube.com\/.*)/)) === null || _link$match === void 0 ? void 0 : _link$match[1];
              }
              return link;
            });
            const realLikes = this.getRealParams('likes', videoLinks, doTask, link => {
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
            throwError(error, 'Youtube.toggle');
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
          throwError(error, 'Youtube.verifyAuth');
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
                Youtube_classPrivateMethodGet(this, Youtube_verifyAuth, Youtube_verifyAuth2).call(this).then(result => {
                  resolve(result);
                });
              } else {
                logStatus.error('Error: Update youtube auth failed!');
                resolve(false);
              }
            };
          });
        } catch (error) {
          throwError(error, 'Discord.updateAuth');
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
          throwError(error, 'Youtube.getInfo');
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
          throwError(error, 'Youtube.toggleChannel');
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
          throwError(error, 'Youtube.toggleLikeVideo');
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
      function Steam_classPrivateFieldSet(receiver, privateMap, value) {
        var descriptor = Steam_classExtractFieldDescriptor(receiver, privateMap, 'set');
        Steam_classApplyDescriptorSet(receiver, descriptor, value);
        return value;
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
      function Steam_classPrivateFieldGet(receiver, privateMap) {
        var descriptor = Steam_classExtractFieldDescriptor(receiver, privateMap, 'get');
        return Steam_classApplyDescriptorGet(receiver, descriptor);
      }
      function Steam_classExtractFieldDescriptor(receiver, privateMap, action) {
        if (!privateMap.has(receiver)) {
          throw new TypeError('attempted to ' + action + ' private field on non-instance');
        }
        return privateMap.get(receiver);
      }
      function Steam_classApplyDescriptorGet(receiver, descriptor) {
        if (descriptor.get) {
          return descriptor.get.call(receiver);
        }
        return descriptor.value;
      }
      const Steam_defaultTasks = {
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
      var Steam_cache = new WeakMap();
      var Steam_auth = new WeakMap();
      var Steam_initialized = new WeakMap();
      var _area = new WeakMap();
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
      var Steam_setCache = new WeakSet();
      class Steam extends social_Social {
        constructor() {
          var _GM_getValue;
          super(...arguments);
          Steam_classPrivateMethodInitSpec(this, Steam_setCache);
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
          Steam_defineProperty(this, 'tasks', {
            ...Steam_defaultTasks
          });
          Steam_defineProperty(this, 'whiteList', ((_GM_getValue = GM_getValue('whiteList')) === null || _GM_getValue === void 0 ? void 0 : _GM_getValue.steam) || {
            ...Steam_defaultTasks
          });
          Steam_classPrivateFieldInitSpec(this, Steam_cache, {
            writable: true,
            value: GM_getValue('steamCache') || {
              group: {},
              forum: {},
              workshop: {},
              curator: {}
            }
          });
          Steam_classPrivateFieldInitSpec(this, Steam_auth, {
            writable: true,
            value: {}
          });
          Steam_classPrivateFieldInitSpec(this, Steam_initialized, {
            writable: true,
            value: false
          });
          Steam_classPrivateFieldInitSpec(this, _area, {
            writable: true,
            value: 'CN'
          });
        }
        async init() {
          try {
            if (Steam_classPrivateFieldGet(this, Steam_initialized)) {
              return true;
            }
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
            throwError(error, 'Steam.init');
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
            const realGroups = this.getRealParams('groups', groupLinks, doTask, link => {
              var _link$match;
              return (_link$match = link.match(/groups\/(.+)\/?/)) === null || _link$match === void 0 ? void 0 : _link$match[1];
            });
            const realWishlists = this.getRealParams('wishlists', wishlistLinks, doTask, link => {
              var _link$match2;
              return (_link$match2 = link.match(/app\/([\d]+)/)) === null || _link$match2 === void 0 ? void 0 : _link$match2[1];
            });
            const realFollows = this.getRealParams('follows', followLinks, doTask, link => {
              var _link$match3;
              return (_link$match3 = link.match(/app\/([\d]+)/)) === null || _link$match3 === void 0 ? void 0 : _link$match3[1];
            });
            const realForums = this.getRealParams('forums', forumLinks, doTask, link => {
              var _link$match4;
              return (_link$match4 = link.match(/app\/([\d]+)/)) === null || _link$match4 === void 0 ? void 0 : _link$match4[1];
            });
            const realWorkshops = this.getRealParams('workshops', workshopLinks, doTask, link => {
              var _link$match5;
              return (_link$match5 = link.match(/\?id=([\d]+)/)) === null || _link$match5 === void 0 ? void 0 : _link$match5[1];
            });
            const realworkshopVotes = this.getRealParams('workshopVotes', workshopVoteLinks, doTask, link => {
              var _link$match6;
              return (_link$match6 = link.match(/\?id=([\d]+)/)) === null || _link$match6 === void 0 ? void 0 : _link$match6[1];
            });
            const realCurators = this.getRealParams('curators', curatorLinks, doTask, link => {
              var _link$match7;
              return (_link$match7 = link.match(/curator\/([\d]+)/)) === null || _link$match7 === void 0 ? void 0 : _link$match7[1];
            });
            const realCuratorLikes = this.getRealParams('curatorLikes', curatorLikeLinks, doTask, link => {
              var _link$match8;
              return (_link$match8 = link.match(/https?:\/\/store\.steampowered\.com\/(.*?)\/([^/?]+)/)) === null || _link$match8 === void 0 ? void 0 : _link$match8.slice(1, 3).join('/');
            });
            const realAnnouncements = this.getRealParams('announcements', announcementLinks, doTask, link => {
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
            throwError(error, 'Steam.toggle');
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
          throwError(error, 'Steam.updateStoreAuth');
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
          throwError(error, 'Steam.updateCommunityAuth');
          return false;
        }
      }
      async function _getAreaInfo2() {
        try {
          const logStatus = scripts_echoLog({
            type: 'text',
            text: 'getCountryInfo'
          });
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: 'https://store.steampowered.com/cart/',
            method: 'GET'
          });
          if (result === 'Success') {
            if ((data === null || data === void 0 ? void 0 : data.status) === 200) {
              var _data$responseText$ma5;
              const currentArea = (_data$responseText$ma5 = data.responseText.match(/<input id="usercountrycurrency".*?value="(.+?)"/)) === null || _data$responseText$ma5 === void 0 ? void 0 : _data$responseText$ma5[1];
              const areas = [ ...data.responseText.matchAll(/<div class="currency_change_option .*?" data-country="(.+?)" >/g) ].map(search => search[1]);
              if (currentArea && areas.length > 0) {
                Steam_classPrivateFieldSet(this, _area, currentArea);
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
          if (!aimedArea) {
            const {
              currentArea,
              areas
            } = await Steam_classPrivateMethodGet(this, _getAreaInfo, _getAreaInfo2).call(this);
            if (!currentArea || !areas) {
              return false;
            }
            if (currentArea !== 'CN') {
              scripts_echoLog({
                type: 'text',
                text: 'notNeedChangeCountry'
              });
              return 'skip';
            }
            const anotherArea = areas.filter(area => area && area !== 'CN');
            if (!anotherArea || anotherArea.length === 0) {
              scripts_echoLog({
                type: 'text',
                text: 'noAnotherCountry'
              });
              return false;
            }
            [ aimedArea ] = anotherArea;
          }
          const logStatus = scripts_echoLog({
            type: 'changeCountry',
            text: aimedArea
          });
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: 'https://store.steampowered.com/account/setcountry',
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: $.param({
              cc: aimedArea,
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
          throwError(error, 'Steam.joinGroup');
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
          throwError(error, 'Steam.leaveGroup');
          return false;
        }
      }
      async function _getGroupId2(groupName) {
        try {
          const logStatus = scripts_echoLog({
            type: 'getSteamGroupId',
            text: groupName
          });
          const groupId = Steam_classPrivateFieldGet(this, Steam_cache).group[groupName];
          if (groupId) {
            logStatus.success();
            return groupId;
          }
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
                Steam_classPrivateMethodGet(this, Steam_setCache, Steam_setCache2).call(this, 'group', groupName, groupId);
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
          throwError(error, 'Steam.getGroupID');
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
            this.tasks.wishlists = unique([ ...this.tasks.wishlists, gameId ]);
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
              if (Steam_classPrivateFieldGet(this, _area) === 'CN' && dataR.responseText.includes('id="error_box"')) {
                logStatus.warning('疑似锁区游戏，尝试换区执行');
                if (!await Steam_classPrivateMethodGet(this, _changeArea, _changeArea2).call(this)) {
                  return false;
                }
                return await Steam_classPrivateMethodGet(this, _addToWishlist, _addToWishlist2).call(this, gameId);
              }
              if (dataR.responseText.includes('class="queue_actions_ctn"') && dataR.responseText.includes('class="already_in_library"')) {
                logStatus.success();
                this.tasks.wishlists = unique([ ...this.tasks.wishlists, gameId ]);
                return true;
              } else if (dataR.responseText.includes('class="queue_actions_ctn"') && dataR.responseText.includes('id="add_to_wishlist_area_success" style="display: none;') || !dataR.responseText.includes('class="queue_actions_ctn"')) {
                logStatus.error(`Error:${dataR.statusText}(${dataR.status})`);
                return false;
              }
              logStatus.success();
              this.tasks.wishlists = unique([ ...this.tasks.wishlists, gameId ]);
              return true;
            }
            logStatus.error(`Error:${dataR === null || dataR === void 0 ? void 0 : dataR.statusText}(${dataR === null || dataR === void 0 ? void 0 : dataR.status})`);
            return false;
          }
          logStatus.error(`${resultR}:${statusTextR}(${statusR})`);
          return false;
        } catch (error) {
          throwError(error, 'Steam.addToWishlist');
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
              if (Steam_classPrivateFieldGet(this, _area) === 'CN' && dataR.responseText.includes('id="error_box"')) {
                logStatus.warning('疑似锁区游戏，尝试换区执行');
                const result = await Steam_classPrivateMethodGet(this, _changeArea, _changeArea2).call(this);
                if (!result || result === 'CN' || result === 'skip') {
                  return false;
                }
                return await Steam_classPrivateMethodGet(this, _removeFromWishlist, _removeFromWishlist2).call(this, gameId);
              }
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
          throwError(error, 'Steam.removeFromWishlist');
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
          if (Steam_classPrivateFieldGet(this, _area) === 'CN' && followed === 'areaLocked') {
            logStatus.warning('疑似锁区游戏，尝试换区执行');
            if (!await Steam_classPrivateMethodGet(this, _changeArea, _changeArea2).call(this)) {
              return false;
            }
            return await Steam_classPrivateMethodGet(this, _removeFromWishlist, _removeFromWishlist2).call(this, gameId);
          }
          if (doTask === followed) {
            logStatus.success();
            if (doTask) {
              this.tasks.follows = unique([ ...this.tasks.follows, gameId ]);
            }
            return true;
          }
          logStatus.error(`Error:${data === null || data === void 0 ? void 0 : data.statusText}(${data === null || data === void 0 ? void 0 : data.status})`);
          return false;
        } catch (error) {
          throwError(error, 'Steam.toggleFollowGame');
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
              if (Steam_classPrivateFieldGet(this, _area) === 'CN' && data.responseText.includes('id="error_box"')) {
                return 'areaLocked';
              }
              if ($(data.responseText.replace(/<img.*?>/g, '')).find('.queue_control_button.queue_btn_follow>.btnv6_blue_hoverfade.btn_medium.queue_btn_active').css('display') !== 'none') {
                return true;
              }
              return false;
            }
            return false;
          }
          return false;
        } catch (error) {
          throwError(error, 'Steam.isFollowedGame');
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
          throwError(error, 'Steam.toggleForum');
          return true;
        }
      }
      async function _getForumId2(gameId) {
        try {
          const logStatus = scripts_echoLog({
            type: 'getForumId',
            text: gameId
          });
          const forumId = Steam_classPrivateFieldGet(this, Steam_cache).forum[gameId];
          if (forumId) {
            logStatus.success();
            return forumId;
          }
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
                Steam_classPrivateMethodGet(this, Steam_setCache, Steam_setCache2).call(this, 'forum', gameId, forumId);
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
          throwError(error, 'Steam.getForumId');
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
          throwError(error, 'Steam.toggleFavoriteWorkshop');
          return false;
        }
      }
      async function _getWorkshopAppId2(id) {
        try {
          const logStatus = scripts_echoLog({
            type: 'getWorkshopAppId',
            text: id
          });
          const appId = Steam_classPrivateFieldGet(this, Steam_cache).workshop[id];
          if (appId) {
            logStatus.success();
            return appId;
          }
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
              const appId = (_data$responseText$ma8 = data.responseText.match(/<input type="hidden" name="appid" value="([\d]+?)" \/>/)) === null || _data$responseText$ma8 === void 0 ? void 0 : _data$responseText$ma8[1];
              if (appId) {
                Steam_classPrivateMethodGet(this, Steam_setCache, Steam_setCache2).call(this, 'workshop', id, appId);
                logStatus.success();
                return appId;
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
          throwError(error, 'Steam.getWorkshopAppId');
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
          throwError(error, 'Steam.voteupWorkshop');
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
          throwError(error, 'Steam.toggleCurator');
          return false;
        }
      }
      async function _getCuratorId2(path, developerName) {
        try {
          const logStatus = scripts_echoLog({
            type: 'getCuratorId',
            text: `${path}/${developerName}`
          });
          const curatorId = Steam_classPrivateFieldGet(this, Steam_cache).curator[`${path}/${developerName}`];
          if (curatorId) {
            logStatus.success();
            return curatorId;
          }
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
              const curatorId = (_data$responseText$ma9 = data.responseText.match(/g_pagingData.*?"clanid":([\d]+)/)) === null || _data$responseText$ma9 === void 0 ? void 0 : _data$responseText$ma9[1];
              if (curatorId) {
                Steam_classPrivateMethodGet(this, Steam_setCache, Steam_setCache2).call(this, 'curator', `${path}/${developerName}`, curatorId);
                logStatus.success();
                return curatorId;
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
          throwError(error, 'Steam.getCuratorID');
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
          throwError(error, 'Steam.toggleCuratorLike');
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
          throwError(error, 'Steam.likeAnnouncement');
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
          throwError(error, 'Steam.likeAnnouncement');
          return false;
        }
      }
      function Steam_setCache2(type, name, id) {
        try {
          Steam_classPrivateFieldGet(this, Steam_cache)[type][name] = id;
          GM_setValue('steamCache', Steam_classPrivateFieldGet(this, Steam_cache));
        } catch (error) {
          throwError(error, 'Steam.setCache');
        }
      }
      const social_Steam = Steam;
      function Website_defineProperty(obj, key, value) {
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
      class Website {
        constructor() {
          Website_defineProperty(this, 'undoneTasks', void 0);
          Website_defineProperty(this, 'socialTasks', void 0);
          Website_defineProperty(this, 'giveawayId', void 0);
          Website_defineProperty(this, 'socialInitialized', false);
          Website_defineProperty(this, 'initialized', false);
          Website_defineProperty(this, 'social', {});
        }
        async initSocial(action) {
          try {
            if (this.socialInitialized) {
              return true;
            }
            const pro = [];
            const tasks = action === 'do' ? this.undoneTasks : this.socialTasks;
            if (tasks.discord) {
              const hasDiscord = Object.values(tasks.discord).reduce((total, arr) => [ ...total, ...arr ]).length > 0;
              if (hasDiscord) {
                this.social.discord = new social_Discord();
                pro.push(this.social.discord.init());
              }
            }
            if (tasks.instagram) {
              const hasInstagram = Object.values(tasks.instagram).reduce((total, arr) => [ ...total, ...arr ]).length > 0;
              if (hasInstagram) {
                this.social.instagram = new social_Instagram();
                pro.push(this.social.instagram.init());
              }
            }
            if (tasks.reddit) {
              const hasReddit = Object.values(tasks.reddit).reduce((total, arr) => [ ...total, ...arr ]).length > 0;
              if (hasReddit) {
                this.social.reddit = new social_Reddit();
                pro.push(this.social.reddit.init());
              }
            }
            if (tasks.twitch) {
              const hasTwitch = Object.values(tasks.twitch).reduce((total, arr) => [ ...total, ...arr ]).length > 0;
              if (hasTwitch) {
                this.social.twitch = new social_Twitch();
                pro.push(this.social.twitch.init());
              }
            }
            if (tasks.twitter) {
              const hasTwitter = Object.values(tasks.twitter).reduce((total, arr) => [ ...total, ...arr ]).length > 0;
              if (hasTwitter) {
                this.social.twitter = new social_Twitter();
                pro.push(this.social.twitter.init());
              }
            }
            if (tasks.vk) {
              const hasVk = Object.values(tasks.vk).reduce((total, arr) => [ ...total, ...arr ]).length > 0;
              if (hasVk) {
                this.social.vk = new social_Vk();
                pro.push(this.social.vk.init());
              }
            }
            if (tasks.youtube) {
              const hasYoutube = Object.values(tasks.youtube).reduce((total, arr) => [ ...total, ...arr ]).length > 0;
              if (hasYoutube) {
                this.social.youtube = new social_Youtube();
                pro.push(this.social.youtube.init());
              }
            }
            if (tasks.steam) {
              const hasSteam = Object.values(tasks.steam).reduce((total, arr) => [ ...total, ...arr ]).length > 0;
              if (hasSteam) {
                this.social.steam = new social_Steam();
                pro.push(this.social.steam.init());
              }
            }
            if (tasks.links && tasks.links.length > 0) {
              this.social.visitLink = visitLink;
            }
            this.socialInitialized = await Promise.all(pro).then(data => !data.includes(false));
            return this.socialInitialized;
          } catch (error) {
            throwError(error, 'Website.initSocial');
            return false;
          }
        }
        uniqueTasks(allTasks) {
          const result = {};
          for (const [ social, types ] of Object.entries(allTasks)) {
            result[social] = {};
            for (const [ type, tasks ] of Object.entries(types)) {
              result[social][type] = unique(tasks);
            }
          }
          return result;
        }
        async toggleTask(action) {
          try {
            if (!this.initialized && !this.init()) {
              return false;
            }
            if (!await this.classifyTask(action)) {
              return false;
            }
            if (!this.socialInitialized && !await this.initSocial(action)) {
              return false;
            }
            const pro = [];
            const doTask = action === 'do';
            const tasks = doTask ? this.undoneTasks : this.socialTasks;
            if (this.social.discord) {
              pro.push(this.social.discord.toggle({
                doTask: doTask,
                ...tasks.discord
              }));
            }
            if (this.social.instagram) {
              pro.push(this.social.instagram.toggle({
                doTask: doTask,
                ...tasks.instagram
              }));
            }
            if (this.social.reddit) {
              pro.push(this.social.reddit.toggle({
                doTask: doTask,
                ...tasks.reddit
              }));
            }
            if (this.social.twitch) {
              pro.push(this.social.twitch.toggle({
                doTask: doTask,
                ...tasks.twitch
              }));
            }
            if (this.social.twitter) {
              pro.push(this.social.twitter.toggle({
                doTask: doTask,
                ...tasks.twitter
              }));
            }
            if (this.social.vk) {
              pro.push(this.social.vk.toggle({
                doTask: doTask,
                ...tasks.vk
              }));
            }
            if (this.social.youtube) {
              pro.push(this.social.youtube.toggle({
                doTask: doTask,
                ...tasks.youtube
              }));
            }
            if (this.social.steam) {
              pro.push(this.social.steam.toggle({
                doTask: doTask,
                ...tasks.steam
              }));
            }
            if (this.social.visitLink && tasks.links && doTask) {
              for (const link of tasks.links) {
                pro.push(this.social.visitLink(link));
              }
            }
            await Promise.all(pro);
            scripts_echoLog({
              type: 'custom',
              text: '<li>All tasks complete!<font></font></li>'
            });
            return true;
          } catch (error) {
            throwError(error, 'Website.toggleTask');
            return false;
          }
        }
        async doTask() {
          try {
            return await this.toggleTask('do');
          } catch (error) {
            throwError(error, 'Website.doTask');
            return false;
          }
        }
        async undoTask() {
          try {
            return await this.toggleTask('undo');
          } catch (error) {
            throwError(error, 'Website.undoTask');
            return false;
          }
        }
        checkLogin() {
          return true;
        }
        checkLeftKey() {
          return true;
        }
      }
      const website_Website = Website;
      function FreeAnyWhere_classPrivateMethodInitSpec(obj, privateSet) {
        FreeAnyWhere_checkPrivateRedeclaration(obj, privateSet);
        privateSet.add(obj);
      }
      function FreeAnyWhere_checkPrivateRedeclaration(obj, privateCollection) {
        if (privateCollection.has(obj)) {
          throw new TypeError('Cannot initialize the same private elements twice on an object');
        }
      }
      function FreeAnyWhere_defineProperty(obj, key, value) {
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
      function FreeAnyWhere_classPrivateMethodGet(receiver, privateSet, fn) {
        if (!privateSet.has(receiver)) {
          throw new TypeError('attempted to get private field on non-instance');
        }
        return fn;
      }
      const FreeAnyWhere_defaultTasks = {
        steam: {
          groupLinks: [],
          wishlistLinks: [],
          curatorLinks: [],
          followLinks: []
        },
        vk: {
          nameLinks: []
        }
      };
      var _getGiveawayId = new WeakSet();
      var _verify = new WeakSet();
      class FreeAnyWhere extends website_Website {
        constructor() {
          super(...arguments);
          FreeAnyWhere_classPrivateMethodInitSpec(this, _verify);
          FreeAnyWhere_classPrivateMethodInitSpec(this, _getGiveawayId);
          FreeAnyWhere_defineProperty(this, 'tasks', []);
          FreeAnyWhere_defineProperty(this, 'socialTasks', {
            ...FreeAnyWhere_defaultTasks
          });
          FreeAnyWhere_defineProperty(this, 'undoneTasks', {
            ...FreeAnyWhere_defaultTasks
          });
        }
        static test() {
          return window.location.host === 'freeanywhere.net';
        }
        init() {
          try {
            const logStatus = scripts_echoLog({
              type: 'init'
            });
            if ($('a[href="#/login"]').length > 0) {
              window.open('/#/login', '_self');
              logStatus.warning('请先登录');
              return false;
            }
            if (window.location.href.includes('/login')) {
              scripts_echoLog({
                type: 'custom',
                text: `<li><font class="error">${i18n('needLogin')}</font></li>`
              });
              logStatus.warning('请先登录');
              return false;
            }
            if (!/^https?:\/\/freeanywhere\.net\/#\/giveaway\/[\d]+/.test(window.location.href)) {
              var _window$location$href;
              const id = (_window$location$href = window.location.href.match(/https?:\/\/freeanywhere\.net\/.*?#\/giveaway\/([\d]+)/)) === null || _window$location$href === void 0 ? void 0 : _window$location$href[1];
              if (!id) {
                logStatus.error('获取id失败');
                return false;
              }
              window.location.href = `https://freeanywhere.net/#/giveaway/${id}`;
            }
            if (!FreeAnyWhere_classPrivateMethodGet(this, _getGiveawayId, _getGiveawayId2).call(this)) {
              return false;
            }
            this.initialized = true;
            logStatus.success();
            return true;
          } catch (error) {
            throwError(error, 'Freeanywhere.init');
            return false;
          }
        }
        async classifyTask(action) {
          try {
            const logStatus = scripts_echoLog({
              type: 'custom',
              text: `<li>${i18n('getTasksInfo')}<font></font></li>`
            });
            this.socialTasks = GM_getValue(`fawTasks-${this.giveawayId}`) || {
              ...FreeAnyWhere_defaultTasks
            };
            const {
              result,
              statusText,
              status,
              data
            } = await tools_httpRequest({
              url: `https://freeanywhere.net/api/v1/giveaway/${this.giveawayId}/?format=json`,
              method: 'GET',
              headers: {
                authorization: `Token ${window.localStorage.getItem('token')}`,
                'x-csrftoken': external_Cookies_namespaceObject.get('csrftoken')
              },
              responseType: 'json'
            });
            if (result === 'Success') {
              var _data$response;
              const tasks = data === null || data === void 0 ? void 0 : (_data$response = data.response) === null || _data$response === void 0 ? void 0 : _data$response.challenges;
              if (tasks) {
                if (action === 'verify') {
                  this.tasks = [];
                }
                for (const task of tasks) {
                  const type = task.challenge;
                  const social = task.challenge_provider;
                  const taskInfo = {
                    id: task.id,
                    title: task.title,
                    done: task.is_success,
                    link: task.link
                  };
                  if (action === 'verify' && !task.is_success) {
                    this.tasks.push(taskInfo);
                    continue;
                  }
                  switch (social) {
                   case 'steam':
                    taskInfo.social = 'steam';
                    switch (type) {
                     case 'WL':
                      if (action === 'undo') {
                        this.socialTasks.steam.wishlistLinks.push(task.link);
                      }
                      if (action === 'do' && !task.is_success) {
                        this.undoneTasks.steam.wishlistLinks.push(task.link);
                      }
                      break;

                     case 'JTG':
                      if (action === 'undo') {
                        this.socialTasks.steam.groupLinks.push(task.link);
                      }
                      if (action === 'do' && !task.is_success) {
                        this.undoneTasks.steam.groupLinks.push(task.link);
                      }
                      break;

                     case 'STC':
                      if (action === 'undo') {
                        this.socialTasks.steam.curatorLinks.push(task.link);
                      }
                      if (action === 'do' && !task.is_success) {
                        this.undoneTasks.steam.curatorLinks.push(task.link);
                      }
                      break;

                     case 'GF':
                      if (action === 'undo') {
                        this.socialTasks.steam.followLinks.push(task.link);
                      }
                      if (action === 'do' && !task.is_success) {
                        this.undoneTasks.steam.followLinks.push(task.link);
                      }
                      break;
                    }
                    break;

                   case 'vk-oauth2':
                    if (action === 'undo') {
                      this.socialTasks.vk.nameLinks.push(task.link);
                    }
                    if (action === 'do' && !task.is_success) {
                      this.undoneTasks.vk.nameLinks.push(task.link);
                    }
                    break;

                   case 'website':
                    break;

                   default:
                    break;
                  }
                }
                logStatus.success();
                this.undoneTasks = this.uniqueTasks(this.undoneTasks);
                this.socialTasks = this.uniqueTasks(this.socialTasks);
                GM_setValue(`fawTasks${this.giveawayId}`, this.socialTasks);
                return true;
              }
              logStatus.error(`Error:${data === null || data === void 0 ? void 0 : data.statusText}(${data === null || data === void 0 ? void 0 : data.status})`);
              console.error(data);
              return false;
            }
            logStatus.error(`${result}:${statusText}(${status})`);
            return false;
          } catch (error) {
            throwError(error, 'Freeanywhere.classifyTask');
            return false;
          }
        }
        async verifyTask() {
          try {
            if (!this.initialized && !this.init()) {
              return false;
            }
            if (this.tasks.length === 0 && !await this.classifyTask('verify')) {
              return false;
            }
            const pro = [];
            for (const task of this.tasks) {
              pro.push(FreeAnyWhere_classPrivateMethodGet(this, _verify, _verify2).call(this, task));
              await delay(1e3);
            }
            await Promise.all(pro);
            scripts_echoLog({
              type: 'custom',
              text: '<li>All tasks complete!<font></font></li>'
            });
            return true;
          } catch (error) {
            throwError(error, 'Freeanywhere.verifyTask');
            return false;
          }
        }
        async getKey() {
          const logStatus = scripts_echoLog({
            type: 'custom',
            text: `<li>${i18n('gettingKey')}...<font></font></li>`
          });
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: `https://freeanywhere.net/api/v1/giveaway/${this.giveawayId}/reward/?format=json`,
            method: 'GET',
            dataType: 'json',
            headers: {
              authorization: `Token ${window.localStorage.getItem('token')}`
            }
          });
          if (result === 'Success') {
            var _data$response2;
            if (data !== null && data !== void 0 && (_data$response2 = data.response) !== null && _data$response2 !== void 0 && _data$response2.reward) {
              logStatus.success();
              scripts_echoLog({
                type: 'custom',
                text: `<li><font class="success">${data.response.reward}</font></li>`
              });
            } else {
              logStatus.error(`Error:${data === null || data === void 0 ? void 0 : data.statusText}(${data === null || data === void 0 ? void 0 : data.status})`);
            }
          } else {
            logStatus.error(`${result}:${statusText}(${status})`);
          }
        }
      }
      function _getGiveawayId2() {
        try {
          var _window$location$href2;
          const giveawayId = (_window$location$href2 = window.location.href.match(/\/giveaway\/([\d]+)/)) === null || _window$location$href2 === void 0 ? void 0 : _window$location$href2[1];
          if (giveawayId) {
            this.giveawayId = giveawayId;
            return true;
          }
          scripts_echoLog({
            type: 'custom',
            text: `<li><font class="error">${i18n('getGiveawayIdFailed')}</font></li>`
          });
          return false;
        } catch (error) {
          throwError(error, 'Keyhub.getGiveawayId');
        }
      }
      async function _verify2(task) {
        try {
          const logStatus = scripts_echoLog({
            type: 'custom',
            text: `<li>${i18n('verifyingTask')}${task.title.trim()}...<font></font></li>`
          });
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: `https://freeanywhere.net/api/v1/giveaway/${this.giveawayId}/challenge-status/${task.id}/?format=json`,
            method: 'GET',
            dataType: 'json',
            headers: {
              authorization: `Token ${window.localStorage.getItem('token')}`,
              'x-csrftoken': external_Cookies_namespaceObject.get('csrftoken')
            }
          });
          if (result === 'Success') {
            var _data$response3;
            if (data !== null && data !== void 0 && (_data$response3 = data.response) !== null && _data$response3 !== void 0 && _data$response3.status) {
              logStatus.success();
              return true;
            }
            logStatus.error(`Error:${data === null || data === void 0 ? void 0 : data.statusText}(${data === null || data === void 0 ? void 0 : data.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Freeanywhere.verify');
          return false;
        }
      }
      const website_FreeAnyWhere = FreeAnyWhere;
      function GiveawaySu_classPrivateMethodInitSpec(obj, privateSet) {
        GiveawaySu_checkPrivateRedeclaration(obj, privateSet);
        privateSet.add(obj);
      }
      function GiveawaySu_checkPrivateRedeclaration(obj, privateCollection) {
        if (privateCollection.has(obj)) {
          throw new TypeError('Cannot initialize the same private elements twice on an object');
        }
      }
      function GiveawaySu_defineProperty(obj, key, value) {
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
      function GiveawaySu_classPrivateMethodGet(receiver, privateSet, fn) {
        if (!privateSet.has(receiver)) {
          throw new TypeError('attempted to get private field on non-instance');
        }
        return fn;
      }
      const GiveawaySu_defaultTasks = {
        steam: {
          groupLinks: [],
          wishlistLinks: [],
          curatorLinks: [],
          curatorLikeLinks: [],
          followLinks: [],
          forumLinks: [],
          announcementLinks: [],
          workshopVoteLinks: []
        },
        discord: {
          serverLinks: []
        },
        instagram: {
          userLinks: []
        },
        vk: {
          nameLinks: []
        },
        twitch: {
          channelLinks: []
        },
        reddit: {
          redditLinks: []
        },
        youtube: {
          channelLinks: [],
          likeLinks: []
        }
      };
      var GiveawaySu_getGiveawayId = new WeakSet();
      class GiveawaySu extends website_Website {
        constructor() {
          super(...arguments);
          GiveawaySu_classPrivateMethodInitSpec(this, GiveawaySu_getGiveawayId);
          GiveawaySu_defineProperty(this, 'socialTasks', GiveawaySu_defaultTasks);
          GiveawaySu_defineProperty(this, 'undoneTasks', GiveawaySu_defaultTasks);
        }
        static test() {
          return /^https?:\/\/giveaway\.su\/giveaway\/view\/[\d]+/.test(window.location.href);
        }
        async before() {
          try {
            if (!this.checkLogin()) {
              scripts_echoLog({
                type: 'checkLoginFailed'
              });
            }
            if (!await this.checkLeftKey()) {
              scripts_echoLog({
                type: 'checkLeftKeyFailed'
              });
            }
          } catch (error) {
            throwError(error, 'Giveawaysu.before');
          }
        }
        init() {
          try {
            const logStatus = scripts_echoLog({
              type: 'init'
            });
            if ($('a.steam-login').length > 0) {
              window.open('/steam/redirect', '_self');
              logStatus.warning('请先登录');
              return false;
            }
            if (!GiveawaySu_classPrivateMethodGet(this, GiveawaySu_getGiveawayId, GiveawaySu_getGiveawayId2).call(this)) {
              return false;
            }
            this.initialized = true;
            logStatus.success();
            return true;
          } catch (error) {
            throwError(error, 'Giveawaysu.init');
            return false;
          }
        }
        async classifyTask() {
          try {
            const logStatus = scripts_echoLog({
              type: 'custom',
              text: `<li>${i18n('getTasksInfo')}<font></font></li>`
            });
            this.socialTasks = GM_getValue(`gasTasks-${this.giveawayId}`) || GiveawaySu_defaultTasks;
            const pro = [];
            const tasks = $('#actions tr');
            if ($('div.bind-discord').is(':visible')) {
              $('div.bind-discord a')[0].click();
            }
            if ($('div.bind-twitch').is(':visible')) {
              $('div.bind-twitch a')[0].click();
            }
            for (const task of tasks) {
              pro.push(new Promise(resolve => {
                const td = $(task).find('td:not(".hidden")');
                const colorfulTask = td.eq(1).find('a:not([data-trigger="link"])');
                const colorlessTask = td.eq(2).find('a:not([data-trigger="link"])');
                const taskDes = colorfulTask.length > 0 ? colorfulTask : colorlessTask;
                const taskIcon = td.eq(0).find('i').attr('class') || '';
                const taskName = taskDes.text().trim();
                if (taskIcon.includes('ban') || /disable adblock/gi.test(taskName)) {
                  return resolve(true);
                }
                getRedirectLink(taskDes.attr('href')).then(taskLink => {
                  if (!taskLink) {
                    return resolve(false);
                  }
                  if (taskIcon.includes('steam') && /join/gi.test(taskName)) {
                    this.undoneTasks.steam.groupLinks.push(taskLink);
                  } else if (/like.*announcement/gi.test(taskName)) {
                    this.undoneTasks.steam.announcementLinks.push(taskLink);
                  } else if (/(follow|subscribe).*curator/gim.test(taskName) && /^https?:\/\/store\.steampowered\.com\/curator\//.test(taskLink)) {
                    this.undoneTasks.steam.curatorLinks.push(taskLink);
                  } else if (taskIcon.includes('steam') && /follow|subscribe/gim.test(taskName)) {
                    this.undoneTasks.steam.curatorLikeLinks.push(taskLink);
                  } else if (/subscribe.*steam.*forum/gim.test(taskName)) {
                    this.undoneTasks.steam.forumLinks.push(taskLink);
                  } else if (taskIcon.includes('thumbs-up') && /^https?:\/\/steamcommunity\.com\/sharedfiles\/filedetails\/\?id=[\d]+/.test(taskLink)) {
                    this.undoneTasks.steam.workshopVoteLinks.push(taskLink);
                  } else if (taskIcon.includes('discord') || /join.*discord/gim.test(taskName)) {
                    this.undoneTasks.discord.serverLinks.push(taskLink);
                  } else if (taskIcon.includes('instagram') || /follow.*instagram/gim.test(taskName)) {
                    this.undoneTasks.instagram.userLinks.push(taskLink);
                  } else if (taskIcon.includes('twitch') || /follow.*twitch.*channel/gim.test(taskName)) {
                    this.undoneTasks.twitch.channelLinks.push(taskLink);
                  } else if (taskIcon.includes('reddit') || /subscribe.*subreddit/gim.test(taskName) || /follow.*reddit/gim.test(taskName)) {
                    this.undoneTasks.reddit.redditLinks.push(taskLink);
                  } else if (/watch.*art/gim.test(taskName)) {
                    this.undoneTasks.steam.workshopVoteLinks.push(taskLink);
                  } else if (/subscribe.*youtube.*channel/gim.test(taskName)) {
                    this.undoneTasks.youtube.channelLinks.push(taskLink);
                  } else if (/(watch|like).*youtube.*video/gim.test(taskName) || (taskIcon.includes('youtube') || taskIcon.includes('thumbs-up')) && /(watch|like).*video/gim.test(taskName)) {
                    this.undoneTasks.youtube.likeLinks.push(taskLink);
                  } else if (taskIcon.includes('vk') || /join.*vk.*group/gim.test(taskName)) {
                    this.undoneTasks.vk.nameLinks.push(taskLink);
                  } else {
                    if (/(on twitter)|(Follow.*on.*Facebook)/gim.test(taskName)) {} else {
                      if (/wishlist.*game|add.*wishlist/gim.test(taskName)) {
                        this.undoneTasks.steam.wishlistLinks.push(taskLink);
                      }
                      if (/follow.*button/gim.test(taskName)) {
                        this.undoneTasks.steam.followLinks.push(taskLink);
                      }
                    }
                  }
                  resolve(true);
                }).catch(error => {
                  throwError(error, 'Giveawaysu.classifyTask->getRedirectLink');
                  return false;
                });
              }));
            }
            await Promise.all(pro);
            logStatus.success();
            this.undoneTasks = this.uniqueTasks(this.undoneTasks);
            this.socialTasks = this.undoneTasks;
            GM_setValue(`gasTasks${this.giveawayId}`, this.socialTasks);
            return true;
          } catch (error) {
            throwError(error, 'Giveawaysu.classifyTask');
            return false;
          }
        }
        checkLogin() {
          try {
            if ($('a.steam-login').length > 0) {
              window.open('/steam/redirect', '_self');
            }
            return true;
          } catch (error) {
            throwError(error, 'Giveawaysu.checkLogin');
            return false;
          }
        }
        async checkLeftKey() {
          try {
            if ($('.giveaway-ended').length > 0) {
              await external_Swal_default().fire({
                icon: 'warning',
                title: i18n('notice'),
                text: i18n('noKeysLeft'),
                confirmButtonText: i18n('confirm'),
                cancelButtonText: i18n('cancel'),
                showCancelButton: true
              }).then(_ref => {
                let {
                  value
                } = _ref;
                if (value) {
                  window.close();
                }
              });
            }
            return true;
          } catch (error) {
            throwError(error, 'Giveawaysu.checkLeftKey');
            return false;
          }
        }
      }
      function GiveawaySu_getGiveawayId2() {
        var _window$location$href;
        const giveawayId = (_window$location$href = window.location.href.match(/\/view\/([\d]+)/)) === null || _window$location$href === void 0 ? void 0 : _window$location$href[1];
        if (giveawayId) {
          this.giveawayId = giveawayId;
          return true;
        }
        scripts_echoLog({
          type: 'custom',
          text: `<li><font class="error">${i18n('getGiveawayIdFailed')}</font></li>`
        });
        return false;
      }
      function Indiedb_classPrivateMethodInitSpec(obj, privateSet) {
        Indiedb_checkPrivateRedeclaration(obj, privateSet);
        privateSet.add(obj);
      }
      function Indiedb_checkPrivateRedeclaration(obj, privateCollection) {
        if (privateCollection.has(obj)) {
          throw new TypeError('Cannot initialize the same private elements twice on an object');
        }
      }
      function Indiedb_classPrivateMethodGet(receiver, privateSet, fn) {
        if (!privateSet.has(receiver)) {
          throw new TypeError('attempted to get private field on non-instance');
        }
        return fn;
      }
      var _join = new WeakSet();
      var _do = new WeakSet();
      class Indiedb {
        constructor() {
          Indiedb_classPrivateMethodInitSpec(this, _do);
          Indiedb_classPrivateMethodInitSpec(this, _join);
        }
        static test() {
          return window.location.host === 'www.indiedb.com';
        }
        async before() {
          try {
            if (!this.checkLogin()) {
              scripts_echoLog({
                type: 'checkLoginFailed'
              });
            }
          } catch (error) {
            throwError(error, 'Indiedb.before');
          }
        }
        async doTask() {
          try {
            if (!await Indiedb_classPrivateMethodGet(this, _join, _join2).call(this)) {
              return false;
            }
            return await Indiedb_classPrivateMethodGet(this, _do, _do2).call(this);
          } catch (error) {
            throwError(error, 'Indiedb.doTask');
            return false;
          }
        }
        checkLogin() {
          try {
            if ($('a.buttonenter:contains(Register to join)').length > 0) {
              window.open('/members/login', '_self');
            }
            return true;
          } catch (error) {
            throwError(error, 'Indiedb.checkLogin');
            return false;
          }
        }
      }
      async function _join2() {
        try {
          if ($('a.buttonenter:contains(Register to join)').length > 0) {
            scripts_echoLog({
              type: 'custom',
              text: `<li><font class="error">${i18n('needLogin')}</font></li>`
            });
            return false;
          }
          const currentoption = $('a.buttonenter.buttongiveaway');
          if (/join giveaway/gim.test(currentoption.text())) {
            const logStatus = scripts_echoLog({
              type: 'custom',
              text: `<li>${i18n('joinGiveaway')}<font></font></li>`
            });
            const {
              result,
              statusText,
              status,
              data
            } = await tools_httpRequest({
              url: currentoption.attr('href'),
              method: 'POST',
              data: 'ajax=t',
              dataType: 'json',
              headers: {
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                accept: 'application/json, text/javascript, */*; q=0.01',
                origin: window.location.origin
              }
            });
            if (result === 'Success') {
              if ((data === null || data === void 0 ? void 0 : data.status) === 200) {
                var _data$response, _data$response4, _data$response5;
                if ((_data$response = data.response) !== null && _data$response !== void 0 && _data$response.success) {
                  var _data$response2, _data$response3;
                  currentoption.addClass('buttonentered').text('Success - Giveaway joined');
                  $('#giveawaysjoined').slideDown();
                  $('#giveawaysrecommend').slideDown();
                  logStatus.success(`Success${(_data$response2 = data.response) !== null && _data$response2 !== void 0 && _data$response2.text ? `:${(_data$response3 = data.response) === null || _data$response3 === void 0 ? void 0 : _data$response3.text}` : ''}`);
                  return true;
                }
                logStatus.error(`Error${(_data$response4 = data.response) !== null && _data$response4 !== void 0 && _data$response4.text ? `:${(_data$response5 = data.response) === null || _data$response5 === void 0 ? void 0 : _data$response5.text}` : ''}`);
                return false;
              }
              logStatus.error(`Error:${data === null || data === void 0 ? void 0 : data.statusText}(${data === null || data === void 0 ? void 0 : data.status})`);
              return false;
            }
            logStatus.error(`${result}:${statusText}(${status})`);
            return false;
          } else if (/success/gim.test($('a.buttonenter.buttongiveaway').text())) {
            return true;
          }
          scripts_echoLog({
            type: 'custom',
            text: `<li><font class="error">${i18n('needJoinGiveaway')}</font></li>`
          });
          return false;
        } catch (error) {
          throwError(error, 'Indiedb.init');
          return false;
        }
      }
      async function _do2() {
        try {
          const id = $('script').map((index, script) => {
            if (/\$\(document\)/gim.test(script.innerHTML)) {
              var _script$innerHTML$mat, _script$innerHTML$mat2, _script$innerHTML$mat3, _script$innerHTML$mat4, _script$innerHTML$mat5, _script$innerHTML$mat6;
              return [ (_script$innerHTML$mat = script.innerHTML.match(/"\/[\d]+"/gim)) === null || _script$innerHTML$mat === void 0 ? void 0 : (_script$innerHTML$mat2 = _script$innerHTML$mat[0]) === null || _script$innerHTML$mat2 === void 0 ? void 0 : (_script$innerHTML$mat3 = _script$innerHTML$mat2.match(/[\d]+/)) === null || _script$innerHTML$mat3 === void 0 ? void 0 : _script$innerHTML$mat3[0], (_script$innerHTML$mat4 = script.innerHTML.match(/"\/newsletter\/ajax\/subscribeprofile\/optin\/[\d]+"/gim)) === null || _script$innerHTML$mat4 === void 0 ? void 0 : (_script$innerHTML$mat5 = _script$innerHTML$mat4[0]) === null || _script$innerHTML$mat5 === void 0 ? void 0 : (_script$innerHTML$mat6 = _script$innerHTML$mat5.match(/[\d]+/)) === null || _script$innerHTML$mat6 === void 0 ? void 0 : _script$innerHTML$mat6[0] ];
            }
            return null;
          });
          if (id.length === 2) {
            const pro = [];
            const tasks = $('#giveawaysjoined a[class*=promo]');
            for (const task of tasks) {
              const promo = $(task);
              if (!promo.hasClass('buttonentered')) {
                const status = scripts_echoLog({
                  type: 'custom',
                  text: `<li>${i18n('doing')}:${promo.parents('p').text()}...<font></font></li>`
                });
                if (/facebookpromo|twitterpromo|visitpromo/gim.test(task.className)) {
                  let text = '';
                  if (promo.hasClass('facebookpromo')) {
                    text = 'facebookpromo';
                  } else if (promo.hasClass('twitterpromo')) {
                    text = 'twitterpromo';
                  } else {
                    text = 'visitpromo';
                  }
                  pro.push(new Promise(resolve => {
                    $.ajax({
                      type: 'POST',
                      url: urlPath(`/giveaways/ajax/${text}/${id[0]}`),
                      timeout: 6e4,
                      dataType: 'json',
                      data: {
                        ajax: 't'
                      },
                      error(response, error, exception) {
                        console.log({
                          response: response,
                          error: error,
                          exception: exception
                        });
                        status.error('Error:An error has occurred performing the action requested. Please try again shortly.');
                        resolve(true);
                      },
                      success(response) {
                        console.log(response);
                        if (response.success) {
                          status.success(`Success:${response.text}`);
                          promo.addClass('buttonentered').closest('p').html(promo.closest('p').find('span').html());
                          resolve(true);
                        } else {
                          status.error(`Error:${response.text}`);
                          resolve(true);
                        }
                      }
                    });
                  }));
                } else if (promo.hasClass('emailoptinpromo')) {
                  pro.push(new Promise(resolve => {
                    $.ajax({
                      type: 'POST',
                      url: urlPath(`/newsletter/ajax/subscribeprofile/optin/${id[1]}`),
                      timeout: 6e4,
                      dataType: 'json',
                      data: {
                        ajax: 't',
                        emailsystoggle: 4
                      },
                      error(response, error, exception) {
                        console.log({
                          response: response,
                          error: error,
                          exception: exception
                        });
                        status.error('Error:An error has occurred performing the action requested. Please try again shortly.');
                        resolve(true);
                      },
                      success(response) {
                        console.log(response);
                        if (response.success) {
                          status.success(`Success:${response.text}`);
                          promo.toggleClass('buttonentered').closest('p').html(promo.closest('p').find('span').html());
                          resolve(true);
                        } else {
                          status.error(`Error:${response.text}`);
                          resolve(true);
                        }
                      }
                    });
                  }));
                } else if (promo.hasClass('watchingpromo')) {
                  pro.push(new Promise(resolve => {
                    var _promo$attr;
                    const data = getUrlQuery(promo.attr('href'));
                    data.ajax = 't';
                    $.ajax({
                      type: 'POST',
                      url: urlPath((_promo$attr = promo.attr('href')) === null || _promo$attr === void 0 ? void 0 : _promo$attr.split(/[?#]/)[0]),
                      timeout: 6e4,
                      dataType: 'json',
                      data: data,
                      error(response, error, exception) {
                        console.log({
                          response: response,
                          error: error,
                          exception: exception
                        });
                        status.error('Error:An error has occurred performing the action requested. Please try again shortly.');
                        resolve(true);
                      },
                      success(response) {
                        console.log(response);
                        if (response.success) {
                          status.success(`Success:${response.text}`);
                          promo.toggleClass('buttonentered').closest('p').html(promo.closest('p').find('span').html());
                          resolve(true);
                        } else {
                          status.error(`Error:${response.text}`);
                          resolve(true);
                        }
                      }
                    });
                  }));
                } else if (!/the-challenge-of-adblock/gim.test(promo.attr('href'))) {
                  pro.push(new Promise(resolve => {
                    $.ajax({
                      type: 'POST',
                      url: urlPath(promo.attr('href')),
                      timeout: 6e4,
                      dataType: 'json',
                      data: {
                        ajax: 't'
                      },
                      error(response, error, exception) {
                        console.log({
                          response: response,
                          error: error,
                          exception: exception
                        });
                        status.error('Error:An error has occurred performing the action requested. Please try again shortly.');
                        resolve(true);
                      },
                      success(response) {
                        console.log(response);
                        if (response.success) {
                          status.success(`Success:${response.text}`);
                          promo.toggleClass('buttonentered').closest('p').html(promo.closest('p').find('span').html());
                          resolve(true);
                        } else {
                          status.error(`Error:${response.text}`);
                          resolve(true);
                        }
                      }
                    });
                  }));
                } else {
                  status.error(`Error:${i18n('unknowntype')}`);
                }
              }
            }
            await Promise.all(pro);
            scripts_echoLog({
              type: 'custom',
              text: `<li><font class="warning">${i18n('allTasksComplete')}</font></li>`
            });
            return true;
          }
          scripts_echoLog({
            type: 'custom',
            text: `<li><font class="error">${i18n('getIdFailed')}</font></li>`
          });
          return false;
        } catch (error) {
          throwError(error, 'Indiedb.classifyTask');
          return false;
        }
      }
      const website_Indiedb = Indiedb;
      function Keyhub_classPrivateMethodInitSpec(obj, privateSet) {
        Keyhub_checkPrivateRedeclaration(obj, privateSet);
        privateSet.add(obj);
      }
      function Keyhub_checkPrivateRedeclaration(obj, privateCollection) {
        if (privateCollection.has(obj)) {
          throw new TypeError('Cannot initialize the same private elements twice on an object');
        }
      }
      function Keyhub_defineProperty(obj, key, value) {
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
      function Keyhub_classPrivateMethodGet(receiver, privateSet, fn) {
        if (!privateSet.has(receiver)) {
          throw new TypeError('attempted to get private field on non-instance');
        }
        return fn;
      }
      const Keyhub_defaultTasks = {
        steam: {
          groupLinks: [],
          wishlistLinks: [],
          curatorLinks: []
        },
        discord: {
          serverLinks: []
        },
        links: []
      };
      var Keyhub_getGiveawayId = new WeakSet();
      class Keyhub extends website_Website {
        constructor() {
          super(...arguments);
          Keyhub_classPrivateMethodInitSpec(this, Keyhub_getGiveawayId);
          Keyhub_defineProperty(this, 'socialTasks', {
            ...Keyhub_defaultTasks
          });
          Keyhub_defineProperty(this, 'undoneTasks', {
            ...Keyhub_defaultTasks
          });
        }
        static test() {
          return window.location.host === 'key-hub.eu';
        }
        async before() {
          try {
            if (!this.checkLogin()) {
              scripts_echoLog({
                type: 'checkLoginFailed'
              });
            }
            if (!await this.checkLeftKey()) {
              scripts_echoLog({
                type: 'checkLeftKeyFailed'
              });
            }
          } catch (error) {
            throwError(error, 'Keyhub.before');
          }
        }
        init() {
          try {
            const logStatus = scripts_echoLog({
              type: 'init'
            });
            if ($('a[href*="/connect/steam"]').length > 0) {
              window.open('/connect/steam', '_self');
              logStatus.warning('请先登录');
              return false;
            }
            if (!Keyhub_classPrivateMethodGet(this, Keyhub_getGiveawayId, Keyhub_getGiveawayId2).call(this)) {
              return false;
            }
            $('#VPNoverlay').hide();
            $('#mainArticleSection').show();
            this.initialized = true;
            logStatus.success();
            return true;
          } catch (error) {
            throwError(error, 'Keyhub.init');
            return false;
          }
        }
        async classifyTask(action) {
          try {
            const logStatus = scripts_echoLog({
              type: 'custom',
              text: `<li>${i18n('getTasksInfo')}<font></font></li>`
            });
            this.socialTasks = GM_getValue(`khTasks-${this.giveawayId}`) || {
              ...Keyhub_defaultTasks
            };
            const tasks = $('.task a');
            for (const task of tasks) {
              let link = $(task).attr('href');
              const taskDes = $(task).text().trim();
              if (!link) {
                continue;
              }
              if (/\/away\?data=/.test(link) || /steamcommunity\.com\/gid\//.test(link)) {
                link = await getRedirectLink(link) || link;
              }
              if (/https?:\/\/key-hub\.eu\/connect\/discord/.test(link)) {
                window.open(link, '_blank');
              } else if (/steamcommunity\.com\/groups\//.test(link)) {
                if (action === 'undo') {
                  this.socialTasks.steam.groupLinks.push(link);
                }
                if (action === 'do') {
                  this.undoneTasks.steam.groupLinks.push(link);
                }
              } else if (/store\.steampowered\.com\/app\//.test(link) && /wishlist/gim.test(taskDes)) {
                if (action === 'undo') {
                  this.socialTasks.steam.wishlistLinks.push(link);
                }
                if (action === 'do') {
                  this.undoneTasks.steam.wishlistLinks.push(link);
                }
              } else if (/store\.steampowered\.com\/curator\//.test(link)) {
                if (action === 'undo') {
                  this.socialTasks.steam.curatorLinks.push(link);
                }
                if (action === 'do') {
                  this.undoneTasks.steam.curatorLinks.push(link);
                }
              } else if (/^https?:\/\/discord\.com\/invite\//.test(link)) {
                if (action === 'undo') {
                  this.socialTasks.discord.serverLinks.push(link);
                }
                if (action === 'do') {
                  this.undoneTasks.discord.serverLinks.push(link);
                }
              } else {
                scripts_echoLog({
                  type: 'custom',
                  text: `<li>${i18n('unknownTaskType', `${taskDes}(${link})`)}<font></font></li>`
                });
              }
            }
            logStatus.success();
            this.undoneTasks = this.uniqueTasks(this.undoneTasks);
            this.socialTasks = this.uniqueTasks(this.socialTasks);
            GM_setValue(`khTasks${this.giveawayId}`, this.socialTasks);
            return true;
          } catch (error) {
            throwError(error, 'Keyhub.classifyTask');
            return false;
          }
        }
        verifyTask() {
          try {
            scripts_echoLog({
              type: 'custom',
              text: `<li>${i18n('verifyingTask')}...<font></font></li>`
            });
            $.get(window.location.href, res => {
              VerifyTasks(res.match(/onclick="javascript:VerifyTasks\('(.*?)'\)"/)[1]);
            });
          } catch (error) {
            throwError(error, 'keyhub.verifyTask');
          }
        }
        async checkLeftKey() {
          try {
            const leftKey = $('#keysleft').text().trim();
            if (leftKey === '0') {
              await external_Swal_default().fire({
                icon: 'warning',
                title: i18n('notice'),
                text: i18n('noKeysLeft'),
                confirmButtonText: i18n('confirm'),
                cancelButtonText: i18n('cancel'),
                showCancelButton: true
              }).then(_ref => {
                let {
                  value
                } = _ref;
                if (value) {
                  window.close();
                }
              });
            }
            return true;
          } catch (error) {
            throwError(error, 'Keyhub.checkLeftKey');
            return false;
          }
        }
        checkLogin() {
          try {
            if ($('a[href*="/connect/steam"]').length > 0) {
              window.open('/connect/steam', '_self');
            }
            return true;
          } catch (error) {
            throwError(error, 'Keyhub.checkLogin');
            return false;
          }
        }
      }
      function Keyhub_getGiveawayId2() {
        try {
          var _window$location$href;
          const giveawayId = (_window$location$href = window.location.href.match(/giveaway\/([\d]+)/)) === null || _window$location$href === void 0 ? void 0 : _window$location$href[1];
          if (giveawayId) {
            this.giveawayId = giveawayId;
            return true;
          }
          scripts_echoLog({
            type: 'custom',
            text: `<li><font class="error">${i18n('getGiveawayIdFailed')}</font></li>`
          });
          return false;
        } catch (error) {
          throwError(error, 'Keyhub.getGiveawayId');
          return false;
        }
      }
      const website_Keyhub = Keyhub;
      function Givekey_classPrivateMethodInitSpec(obj, privateSet) {
        Givekey_checkPrivateRedeclaration(obj, privateSet);
        privateSet.add(obj);
      }
      function Givekey_checkPrivateRedeclaration(obj, privateCollection) {
        if (privateCollection.has(obj)) {
          throw new TypeError('Cannot initialize the same private elements twice on an object');
        }
      }
      function Givekey_defineProperty(obj, key, value) {
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
      function Givekey_classPrivateMethodGet(receiver, privateSet, fn) {
        if (!privateSet.has(receiver)) {
          throw new TypeError('attempted to get private field on non-instance');
        }
        return fn;
      }
      const Givekey_defaultTasks = {
        steam: {
          groupLinks: [],
          wishlistLinks: [],
          curatorLinks: [],
          curatorLikeLinks: []
        },
        twitter: {
          userLinks: []
        },
        vk: {
          nameLinks: []
        },
        discord: {
          serverLinks: []
        }
      };
      var Givekey_verify = new WeakSet();
      var Givekey_getGiveawayId = new WeakSet();
      class Givekey extends website_Website {
        constructor() {
          super(...arguments);
          Givekey_classPrivateMethodInitSpec(this, Givekey_getGiveawayId);
          Givekey_classPrivateMethodInitSpec(this, Givekey_verify);
          Givekey_defineProperty(this, 'tasks', []);
          Givekey_defineProperty(this, 'socialTasks', {
            ...Givekey_defaultTasks
          });
          Givekey_defineProperty(this, 'undoneTasks', {
            ...Givekey_defaultTasks
          });
          Givekey_defineProperty(this, 'userId', void 0);
        }
        static test() {
          return window.location.host === 'givekey.ru';
        }
        init() {
          try {
            const logStatus = scripts_echoLog({
              type: 'init'
            });
            if ($('a[href*="/auth/steam"]').length > 0) {
              window.open('/auth/steam', '_self');
              logStatus.warning('请先登录');
              return false;
            }
            if (!Givekey_classPrivateMethodGet(this, Givekey_getGiveawayId, Givekey_getGiveawayId2).call(this)) {
              return false;
            }
            const userId = $('meta[name="user-id"]').attr('content');
            if (!userId) {
              logStatus.error('获取用户id失败');
              return false;
            }
            this.userId = userId;
            this.initialized = true;
            logStatus.success();
            return true;
          } catch (error) {
            throwError(error, 'Givekey.init');
            return false;
          }
        }
        async classifyTask(action) {
          try {
            const logStatus = scripts_echoLog({
              type: 'custom',
              text: `<li>${i18n('getTasksInfo')}<font></font></li>`
            });
            this.socialTasks = GM_getValue(`gkTasks-${this.giveawayId}`) || Givekey_defaultTasks;
            const tasks = $('.card-body:has("button") .row');
            for (const task of tasks) {
              const taskEle = $(task);
              const isSuccess = /Complete/i.test(taskEle.find('button').text().trim());
              if (isSuccess && action !== 'undo') {
                continue;
              }
              const checkButton = taskEle.find('#task_check');
              const taskId = checkButton.attr('data-id');
              if (taskId) {
                this.tasks.push(taskId);
              }
              if (action === 'verify') {
                continue;
              }
              let href = taskEle.find('a').attr('href') || null;
              const text = taskEle.find('a').text().trim();
              const icon = taskEle.find('i');
              if (!href || !text) {
                continue;
              }
              if (/^https?:\/\/givekey\.ru\/giveaway\/[\d]+\/execution_task/.test(href)) {
                href = await getRedirectLink(href);
              }
              if (!href) {
                continue;
              }
              if (/^https?:\/\/vk\.com\//.test(href)) {
                this.socialTasks.vk.nameLinks.push(href);
                if (action === 'do' && !isSuccess) {
                  this.undoneTasks.vk.nameLinks.push(href);
                }
              } else if (/^https?:\/\/steamcommunity\.com\/groups/.test(href)) {
                this.socialTasks.steam.groupLinks.push(href);
                if (action === 'do' && !isSuccess) {
                  this.undoneTasks.steam.groupLinks.push(href);
                }
              } else if (/^https?:\/\/store\.steampowered\.com\/app\//.test(href)) {
                this.socialTasks.steam.wishlistLinks.push(href);
                if (action === 'do' && !isSuccess) {
                  this.undoneTasks.steam.wishlistLinks.push(href);
                }
              } else if (/Subscribe/gi.test(text) && icon.hasClass('fa-steam-square')) {
                if (/^https?:\/\/store\.steampowered\.com\/curator\//.test(href)) {
                  this.socialTasks.steam.curatorLinks.push(href);
                  if (action === 'do' && !isSuccess) {
                    this.undoneTasks.steam.curatorLinks.push(href);
                  }
                } else {
                  this.socialTasks.steam.curatorLikeLinks.push(href);
                  if (action === 'do' && !isSuccess) {
                    this.undoneTasks.steam.curatorLikeLinks.push(href);
                  }
                }
              } else if (/^https?:\/\/twitter\.com\//.test(href) && /Subscribe/gi.test(text)) {
                this.socialTasks.twitter.userLinks.push(href);
                if (action === 'do' && !isSuccess) {
                  this.undoneTasks.twitter.userLinks.push(href);
                }
              } else if (icon.hasClass('fa-discord')) {
                this.socialTasks.discord.serverLinks.push(href);
                if (action === 'do' && !isSuccess) {
                  this.undoneTasks.discord.serverLinks.push(href);
                }
              } else {
                scripts_echoLog({
                  type: 'custom',
                  text: `<li>${i18n('unknownTaskType', `${text}(${href})`)}<font></font></li>`
                });
              }
            }
            logStatus.success();
            this.tasks = unique(this.tasks);
            this.undoneTasks = this.uniqueTasks(this.undoneTasks);
            this.socialTasks = this.uniqueTasks(this.socialTasks);
            GM_setValue(`gkTasks${this.giveawayId}`, this.socialTasks);
            return true;
          } catch (error) {
            throwError(error, 'Givekey.classifyTask');
            return false;
          }
        }
        async verifyTask() {
          try {
            if (!this.initialized && !this.init()) {
              return false;
            }
            if (this.tasks.length === 0 && !await this.classifyTask('verify')) {
              return false;
            }
            for (const task of this.tasks) {
              await Givekey_classPrivateMethodGet(this, Givekey_verify, Givekey_verify2).call(this, task);
              await delay(1e3);
            }
            scripts_echoLog({
              type: 'custom',
              text: '<li>All tasks complete!<font></font></li>'
            });
            scripts_echoLog({
              type: 'custom',
              text: '<li>如果没key, 请在https://givekey.ru/profile查看<font></font></li>'
            });
            return true;
          } catch (error) {
            throwError(error, 'Givekey.verifyTask');
            return false;
          }
        }
        checkLeft() {
          try {
            if (!$('#keys_count').text()) {
              external_Swal_default().fire({
                icon: 'warning',
                title: i18n('notice'),
                text: i18n('noKeysLeft'),
                confirmButtonText: i18n('confirm'),
                cancelButtonText: i18n('cancel'),
                showCancelButton: true
              }).then(_ref => {
                let {
                  value
                } = _ref;
                if (value) {
                  window.close();
                }
              });
            }
          } catch (error) {
            throwError(error, 'Givekey.checkLeft');
          }
        }
      }
      async function Givekey_verify2(task) {
        try {
          const logStatus = scripts_echoLog({
            type: 'custom',
            text: `<li>${i18n('verifyingTask')}${task}...<font></font></li>`
          });
          return await new Promise(resolve => {
            $.ajax({
              url: 'https://givekey.ru/giveaway/task',
              method: 'POST',
              data: `id=${task}&user_id=${this.userId}`,
              dataType: 'json',
              headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
              },
              success: data => {
                if (data.btn) {
                  $(`button[data-id=${this.userId}]`).html(data.btn);
                }
                if (data.status === 'ok') {
                  $(`.task_check_${data.id}`).html(`<button class="btn btn-success mb-2 btn-block" disabled>${data.btn}</button>`);
                  logStatus.success();
                  resolve(true);
                } else if (data.status === 'end') {
                  logStatus.success();
                  resolve(false);
                } else {
                  logStatus.error(`Error:${data.msg}`);
                  resolve(false);
                }
              },
              error: xhr => {
                logStatus.error(`Error:${xhr.statusText}(${xhr.status})`);
                resolve(false);
              }
            });
          });
        } catch (error) {
          throwError(error, 'Givekey.verify');
          return false;
        }
      }
      function Givekey_getGiveawayId2() {
        try {
          var _window$location$href;
          const giveawayId = (_window$location$href = window.location.href.match(/giveaway\/([\d]+)/)) === null || _window$location$href === void 0 ? void 0 : _window$location$href[1];
          if (giveawayId) {
            this.giveawayId = giveawayId;
            return true;
          }
          scripts_echoLog({
            type: 'custom',
            text: `<li><font class="error">${i18n('getGiveawayIdFailed')}</font></li>`
          });
          return false;
        } catch (error) {
          throwError(error, 'Getkey.getGiveawayId');
          return false;
        }
      }
      const website_Givekey = Givekey;
      class GiveeClub extends GiveawaySu {
        static test() {
          return /^https?:\/\/givee\.club\/.*?\/event\/[\d]+/.test(window.location.href);
        }
        async before() {
          try {
            if (!this.checkLogin()) {
              scripts_echoLog({
                type: 'checkLoginFailed'
              });
            }
          } catch (error) {
            throwError(error, 'GiveeClub.before');
          }
        }
        init() {
          try {
            const logStatus = scripts_echoLog({
              type: 'init'
            });
            if (!this.checkLogin()) {
              logStatus.warning('请先登录');
              return false;
            }
            if (!this.getGiveawayId()) {
              return false;
            }
            this.initialized = true;
            logStatus.success();
            return true;
          } catch (error) {
            throwError(error, 'GiveeClub.init');
            return false;
          }
        }
        async classifyTask() {
          try {
            const logStatus = scripts_echoLog({
              type: 'custom',
              text: `<li>${i18n('getTasksInfo')}<font></font></li>`
            });
            this.socialTasks = GM_getValue(`gcTasks-${this.giveawayId}`) || GiveawaySu_defaultTasks;
            const pro = [];
            const tasks = $('.event-actions tr');
            for (const task of tasks) {
              pro.push(new Promise(resolve => {
                const taskDes = $(task).find('.event-action-label a');
                const taskIcon = $(task).find('.event-action-icon i').attr('class') || '';
                const taskName = taskDes.text().trim();
                if (taskIcon.includes('ban') || /AdBlock/i.test(taskName) || taskIcon.includes('envelope')) {
                  return resolve(true);
                }
                getRedirectLink(taskDes.attr('href')).then(taskLink => {
                  if (!taskLink) {
                    return resolve(false);
                  }
                  if (/^https?:\/\/steamcommunity\.com\/groups/.test(taskLink)) {
                    this.undoneTasks.steam.groupLinks.push(taskLink);
                  } else if (/like.*announcement/gi.test(taskName)) {
                    this.undoneTasks.steam.announcementLinks.push(taskLink);
                  } else if (taskIcon.includes('plus') && /^https?:\/\/store\.steampowered\.com\/app\//.test(taskLink)) {
                    this.undoneTasks.steam.wishlistLinks.push(taskLink);
                  } else if (/^https?:\/\/store\.steampowered\.com\/curator\//.test(taskLink)) {
                    this.undoneTasks.steam.curatorLinks.push(taskLink);
                  } else if (taskIcon.includes('steam') && /follow|subscribe/gim.test(taskName)) {
                    this.undoneTasks.steam.curatorLikeLinks.push(taskLink);
                  } else if (/subscribe.*steam.*forum/gim.test(taskName)) {
                    this.undoneTasks.steam.forumLinks.push(taskLink);
                  } else if (taskIcon.includes('discord')) {
                    this.undoneTasks.discord.serverLinks.push(taskLink);
                  } else if (taskIcon.includes('instagram')) {
                    this.undoneTasks.instagram.userLinks.push(taskLink);
                  } else if (taskIcon.includes('twitch')) {
                    this.undoneTasks.twitch.channelLinks.push(taskLink);
                  } else if (taskIcon.includes('reddit')) {
                    this.undoneTasks.reddit.redditLinks.push(taskLink);
                  } else if (/watch.*art/gim.test(taskName)) {
                    this.undoneTasks.steam.workshopVoteLinks.push(taskLink);
                  } else if (/subscribe.*youtube.*channel/gim.test(taskName)) {
                    this.undoneTasks.youtube.channelLinks.push(taskLink);
                  } else if (/(watch|like).*youtube.*video/gim.test(taskName) || (taskIcon.includes('youtube') || taskIcon.includes('thumbs-up')) && /(watch|like).*video/gim.test(taskName)) {
                    this.undoneTasks.youtube.likeLinks.push(taskLink);
                  } else if (taskIcon.includes('vk') || /join.*vk.*group/gim.test(taskName)) {
                    this.undoneTasks.vk.nameLinks.push(taskLink);
                  } else {
                    if (/(on twitter)|(Follow.*on.*Facebook)/gim.test(taskName)) {} else {
                      if (/follow.*button/gim.test(taskName)) {
                        this.undoneTasks.steam.followLinks.push(taskLink);
                      }
                    }
                  }
                  resolve(true);
                }).catch(error => {
                  throwError(error, 'GiveeClub.classifyTask->getRedirectLink');
                  return false;
                });
              }));
            }
            await Promise.all(pro);
            logStatus.success();
            this.undoneTasks = this.uniqueTasks(this.undoneTasks);
            this.socialTasks = this.undoneTasks;
            GM_setValue(`gcTasks${this.giveawayId}`, this.socialTasks);
            return true;
          } catch (error) {
            throwError(error, 'GiveeClub.classifyTask');
            return false;
          }
        }
        checkLogin() {
          try {
            if ($('a[href*="/account/auth"]').length > 0) {
              window.open($('a[href*="/account/auth"]').attr('href'), '_self');
            }
            return true;
          } catch (error) {
            throwError(error, 'GiveeClub.checkLogin');
            return false;
          }
        }
        getGiveawayId() {
          var _window$location$href;
          const giveawayId = (_window$location$href = window.location.href.match(/\/event\/([\d]+)/)) === null || _window$location$href === void 0 ? void 0 : _window$location$href[1];
          if (giveawayId) {
            this.giveawayId = giveawayId;
            return true;
          }
          scripts_echoLog({
            type: 'custom',
            text: `<li><font class="error">${i18n('getGiveawayIdFailed')}</font></li>`
          });
          return false;
        }
      }
      const website_GiveeClub = GiveeClub;
      function OpiumPulses_classPrivateMethodInitSpec(obj, privateSet) {
        OpiumPulses_checkPrivateRedeclaration(obj, privateSet);
        privateSet.add(obj);
      }
      function OpiumPulses_checkPrivateRedeclaration(obj, privateCollection) {
        if (privateCollection.has(obj)) {
          throw new TypeError('Cannot initialize the same private elements twice on an object');
        }
      }
      function OpiumPulses_defineProperty(obj, key, value) {
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
      function OpiumPulses_classPrivateMethodGet(receiver, privateSet, fn) {
        if (!privateSet.has(receiver)) {
          throw new TypeError('attempted to get private field on non-instance');
        }
        return fn;
      }
      var _toggleTask = new WeakSet();
      class OpiumPulses {
        constructor() {
          OpiumPulses_classPrivateMethodInitSpec(this, _toggleTask);
          OpiumPulses_defineProperty(this, 'maxPoints', 0);
          OpiumPulses_defineProperty(this, 'myPoints', 0);
        }
        static test() {
          return window.location.host === 'www.opiumpulses.com';
        }
        async before() {
          try {
            if (!this.checkLogin()) {
              scripts_echoLog({
                type: 'checkLoginFailed'
              });
            }
          } catch (error) {
            throwError(error, 'OpiumPulses.before');
          }
        }
        async doFreeTask() {
          try {
            OpiumPulses_classPrivateMethodGet(this, _toggleTask, _toggleTask2).call(this, 'FREE');
          } catch (error) {
            throwError(error, 'OpiumPulses.doFreeTask');
          }
        }
        async doPointTask() {
          try {
            var _$$text$match;
            this.myPoints = parseInt(((_$$text$match = $('.page-header__nav-func-user-nav-items.points-items').text().match(/[\d]+/gim)) === null || _$$text$match === void 0 ? void 0 : _$$text$match[0]) || '0', 10);
            OpiumPulses_classPrivateMethodGet(this, _toggleTask, _toggleTask2).call(this, 'points');
          } catch (error) {
            throwError(error, 'OpiumPulses.doPointTask');
          }
        }
        init() {
          return true;
        }
        classifyTask() {
          return true;
        }
        checkLogin() {
          try {
            if ($('a[href*="/site/login"]').length > 0) {
              window.open('/site/login', '_self');
            }
            return true;
          } catch (error) {
            throwError(error, 'OpiumPulses.checkLogin');
            return false;
          }
        }
      }
      async function _toggleTask2(type) {
        try {
          const items = $(`.giveaways-page-item:contains('${type}'):not(:contains('ENTERED'))`);
          for (const item of items) {
            var _$$find$text$match;
            const needPoints = parseInt(((_$$find$text$match = $(item).find('.giveaways-page-item-header-points').text().match(/[\d]+/gim)) === null || _$$find$text$match === void 0 ? void 0 : _$$find$text$match[0]) || '999999', 10);
            if (type === 'points' && needPoints > this.myPoints) {
              scripts_echoLog({
                type: 'custom',
                text: `<li><font class="warning">${i18n('noPoints')}</font></li>`
              });
            } else if (type === 'points' && !needPoints) {
              scripts_echoLog({
                type: 'custom',
                text: `<li><font class="warning">${i18n('getNeedPointsFailed')}</font></li>`
              });
            } else if (!(type === 'points' && needPoints > this.maxPoints)) {
              var _aElement$attr;
              const logStatus = scripts_echoLog({
                type: 'custom',
                text: `<li>${i18n('joinLottery')}<a href="${$(item).find('a.giveaways-page-item-img-btn-more').attr('href')}" target="_blank">${$(item).find('.giveaways-page-item-footer-name').text().trim()}</a>...<font></font></li>`
              });
              const aElement = $(item).find('a.giveaways-page-item-img-btn-enter:contains(\'enter\')');
              if (aElement !== null && aElement !== void 0 && (_aElement$attr = aElement.attr('onclick')) !== null && _aElement$attr !== void 0 && _aElement$attr.includes('checkUser')) {
                var _aElement$attr2, _aElement$attr2$match;
                const giveawayId = (_aElement$attr2 = aElement.attr('onclick')) === null || _aElement$attr2 === void 0 ? void 0 : (_aElement$attr2$match = _aElement$attr2.match(/[\d]+/)) === null || _aElement$attr2$match === void 0 ? void 0 : _aElement$attr2$match[0];
                if (giveawayId) {
                  checkUser(giveawayId);
                }
              }
              if (!aElement.attr('href')) {
                logStatus.error('Error: No "href".');
                continue;
              }
              const {
                result,
                statusText,
                status,
                data
              } = await tools_httpRequest({
                url: aElement.attr('href'),
                method: 'GET'
              });
              if (result === 'Success') {
                if (data !== null && data !== void 0 && data.responseText && /You've entered this giveaway/gim.test(data.responseText)) {
                  var _data$responseText$ma;
                  logStatus.success();
                  const points = (_data$responseText$ma = data.responseText.match(/Points:[\s]*?([\d]+)/)) === null || _data$responseText$ma === void 0 ? void 0 : _data$responseText$ma[1];
                  if (type === 'points' && points) {
                    this.myPoints = parseInt(points, 10);
                  }
                } else {
                  logStatus.error(`Error:${data === null || data === void 0 ? void 0 : data.statusText}(${data === null || data === void 0 ? void 0 : data.status})`);
                }
              } else {
                logStatus.error(`${result}:${statusText}(${status})`);
              }
            }
          }
          scripts_echoLog({
            type: 'custom',
            text: '<li>-----END-----</li>'
          });
        } catch (error) {
          throwError(error, 'OpiumPulses.toggleTask');
        }
      }
      const website_OpiumPulses = OpiumPulses;
      function Keylol_classPrivateMethodInitSpec(obj, privateSet) {
        Keylol_checkPrivateRedeclaration(obj, privateSet);
        privateSet.add(obj);
      }
      function Keylol_checkPrivateRedeclaration(obj, privateCollection) {
        if (privateCollection.has(obj)) {
          throw new TypeError('Cannot initialize the same private elements twice on an object');
        }
      }
      function Keylol_defineProperty(obj, key, value) {
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
      function Keylol_classPrivateMethodGet(receiver, privateSet, fn) {
        if (!privateSet.has(receiver)) {
          throw new TypeError('attempted to get private field on non-instance');
        }
        return fn;
      }
      const Keylol_defaultTasks = {
        steam: {
          groupLinks: [],
          wishlistLinks: [],
          curatorLinks: [],
          curatorLikeLinks: [],
          followLinks: [],
          forumLinks: [],
          announcementLinks: [],
          workshopVoteLinks: []
        },
        discord: {
          serverLinks: []
        },
        instagram: {
          userLinks: []
        },
        vk: {
          nameLinks: []
        },
        twitch: {
          channelLinks: []
        },
        reddit: {
          redditLinks: []
        },
        twitter: {
          userLinks: [],
          retweetLinks: []
        },
        youtube: {
          channelLinks: [],
          likeLinks: []
        }
      };
      var _addBtn = new WeakSet();
      class Keylol extends website_Website {
        constructor() {
          super(...arguments);
          Keylol_classPrivateMethodInitSpec(this, _addBtn);
          Keylol_defineProperty(this, 'socialTasks', {
            ...Keylol_defaultTasks
          });
          Keylol_defineProperty(this, 'undoneTasks', {
            ...Keylol_defaultTasks
          });
        }
        static test() {
          var _$$eq$attr;
          return window.location.host === 'keylol.com' && !window.location.href.includes('mod=forumdisplay') && !!((_$$eq$attr = $('.subforum_left_title_left_up a').eq(3).attr('href')) !== null && _$$eq$attr !== void 0 && _$$eq$attr.includes('319'));
        }
        init() {
          return true;
        }
        after() {
          try {
            const mainPost = $('#postlist>div[id^="post_"]:first');
            const discordLinks = mainPost.find('a[href*="discord.com"]');
            const redditLinks = mainPost.find('a[href*="reddit.com"]');
            const insLinks = mainPost.find('a[href*="instagram.com"]');
            const twitterLinks = mainPost.find('a[href*="twitter.com"]');
            const twitchLinks = mainPost.find('a[href*="twitch.tv"]');
            const vkLinks = mainPost.find('a[href*="vk.com"]');
            const steamStoreLinks = mainPost.find('a[href*="store.steampowered.com"]');
            const steamCommunityLinks = mainPost.find('a[href*="steamcommunity.com"]');
            if (discordLinks.length > 0) {
              for (const discordLink of discordLinks) {
                const link = $(discordLink).attr('href');
                if (!link) {
                  continue;
                }
                Keylol_classPrivateMethodGet(this, _addBtn, _addBtn2).call(this, discordLink, 'discord', 'serverLinks', link);
              }
            }
            if (redditLinks.length > 0) {
              for (const redditLink of redditLinks) {
                const link = $(redditLink).attr('href');
                if (!link) {
                  continue;
                }
                Keylol_classPrivateMethodGet(this, _addBtn, _addBtn2).call(this, redditLink, 'reddit', 'redditLinks', link);
              }
            }
            if (insLinks.length > 0) {
              for (const insLink of insLinks) {
                const link = $(insLink).attr('href');
                if (!link) {
                  continue;
                }
                Keylol_classPrivateMethodGet(this, _addBtn, _addBtn2).call(this, insLink, 'instagram', 'userLinks', link);
              }
            }
            if (twitterLinks.length > 0) {
              for (const twitterLink of twitterLinks) {
                const link = $(twitterLink).attr('href');
                if (!link) {
                  continue;
                }
                if (/https:\/\/twitter\.com\/.*?\/status\/[\d]+/.test(link)) {
                  Keylol_classPrivateMethodGet(this, _addBtn, _addBtn2).call(this, twitterLink, 'twitter', 'retweetLinks', link);
                } else {
                  Keylol_classPrivateMethodGet(this, _addBtn, _addBtn2).call(this, twitterLink, 'twitter', 'userLinks', link);
                }
              }
            }
            if (twitchLinks.length > 0) {
              for (const twitchLink of twitchLinks) {
                const link = $(twitchLink).attr('href');
                if (!link) {
                  continue;
                }
                Keylol_classPrivateMethodGet(this, _addBtn, _addBtn2).call(this, twitchLink, 'twitch', 'channelLinks', link);
              }
            }
            if (vkLinks.length > 0) {
              for (const vkLink of vkLinks) {
                const link = $(vkLink).attr('href');
                if (!link) {
                  continue;
                }
                Keylol_classPrivateMethodGet(this, _addBtn, _addBtn2).call(this, vkLink, 'vk', 'nameLinks', link);
              }
            }
            if (steamStoreLinks.length > 0) {
              for (const steamStoreLink of steamStoreLinks) {
                const link = $(steamStoreLink).attr('href');
                if (!link) {
                  continue;
                }
                if (/app\/[\d]+/.test(link)) {
                  Keylol_classPrivateMethodGet(this, _addBtn, _addBtn2).call(this, steamStoreLink, 'steam', 'followLinks', link);
                  Keylol_classPrivateMethodGet(this, _addBtn, _addBtn2).call(this, steamStoreLink, 'steam', 'wishlistLinks', link);
                } else if (/curator\/[\d]+/.test(link)) {
                  Keylol_classPrivateMethodGet(this, _addBtn, _addBtn2).call(this, steamStoreLink, 'steam', 'curatorLinks', link);
                } else if (/(publisher|developer|franchise)\/.+/.test(link)) {
                  Keylol_classPrivateMethodGet(this, _addBtn, _addBtn2).call(this, steamStoreLink, 'steam', 'curatorLikeLinks', link);
                } else if (/newshub\/app\/[\d]+\/view\/[\d]+/.test(link)) {
                  Keylol_classPrivateMethodGet(this, _addBtn, _addBtn2).call(this, steamStoreLink, 'steam', 'announcementLinks', link);
                }
              }
            }
            if (steamCommunityLinks.length > 0) {
              for (const steamCommunityLink of steamCommunityLinks) {
                const link = $(steamCommunityLink).attr('href');
                if (!link) {
                  continue;
                }
                if (/groups\/.+/.test(link)) {
                  Keylol_classPrivateMethodGet(this, _addBtn, _addBtn2).call(this, steamCommunityLink, 'steam', 'groupLinks', link);
                } else if (/announcements\/detail\/[\d]+/.test(link)) {
                  Keylol_classPrivateMethodGet(this, _addBtn, _addBtn2).call(this, steamCommunityLink, 'steam', 'announcementLinks', link);
                }
              }
            }
          } catch (error) {
            throwError(error, 'keylol.after');
          }
        }
        classifyTask(action) {
          try {
            this.socialTasks = {
              ...Keylol_defaultTasks
            };
            this.undoneTasks = {
              ...Keylol_defaultTasks
            };
            const selectedBtns = $('.auto-task-keylol[selected="selected"]');
            for (const btn of selectedBtns) {
              const button = $(btn);
              const social = button.attr('data-social');
              const type = button.attr('data-type');
              const link = button.attr('data-link');
              if (!(social && type && link)) {
                continue;
              }
              if (action === 'do') {
                this.undoneTasks[social][type].push(link);
              }
              if (action === 'undo') {
                this.socialTasks[social][type].push(link);
              }
            }
            this.undoneTasks = this.uniqueTasks(this.undoneTasks);
            this.socialTasks = this.uniqueTasks(this.socialTasks);
            return true;
          } catch (error) {
            throwError(error, 'Keylol.classifyTask');
            return false;
          }
        }
      }
      function _addBtn2(before, social, linkType, link) {
        try {
          $(before).after('<a href="javascript:void(0);" class="auto-task-keylol" target="_self"' + ' onclick="this.getAttribute(\'selected\') ? this.removeAttribute(\'selected\') : this.setAttribute(\'selected\', \'selected\')"' + ` data-social="${social}" data-type="${linkType}" data-link="${link}">${linkType.replace('Links', '')}</a>`);
        } catch (error) {
          throwError(error, 'keylol.addBtn');
        }
      }
      const website_Keylol = Keylol;
      function Opquests_classPrivateMethodInitSpec(obj, privateSet) {
        Opquests_checkPrivateRedeclaration(obj, privateSet);
        privateSet.add(obj);
      }
      function Opquests_checkPrivateRedeclaration(obj, privateCollection) {
        if (privateCollection.has(obj)) {
          throw new TypeError('Cannot initialize the same private elements twice on an object');
        }
      }
      function Opquests_defineProperty(obj, key, value) {
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
      function Opquests_classPrivateMethodGet(receiver, privateSet, fn) {
        if (!privateSet.has(receiver)) {
          throw new TypeError('attempted to get private field on non-instance');
        }
        return fn;
      }
      const Opquests_defaultTasks = {
        steam: {
          groupLinks: [],
          wishlistLinks: [],
          followLinks: [],
          curatorLikeLinks: []
        }
      };
      var Opquests_getGiveawayId = new WeakSet();
      class Opquests extends website_Website {
        constructor() {
          super(...arguments);
          Opquests_classPrivateMethodInitSpec(this, Opquests_getGiveawayId);
          Opquests_defineProperty(this, 'undoneTasks', {
            ...Opquests_defaultTasks
          });
        }
        static test() {
          return window.location.host === 'opquests.com';
        }
        async before() {
          try {
            if (!this.checkLogin()) {
              scripts_echoLog({
                type: 'checkLoginFailed'
              });
            }
          } catch (error) {
            throwError(error, 'Opquests.before');
          }
        }
        init() {
          try {
            const logStatus = scripts_echoLog({
              type: 'init'
            });
            if ($('a[href*="/auth/redirect"]').length > 0) {
              window.open('/auth/redirect', '_self');
              logStatus.warning('请先登录');
              return false;
            }
            if (!Opquests_classPrivateMethodGet(this, Opquests_getGiveawayId, Opquests_getGiveawayId2).call(this)) {
              return false;
            }
            this.initialized = true;
            logStatus.success();
            return true;
          } catch (error) {
            throwError(error, 'Opquests.init');
            return false;
          }
        }
        async classifyTask(action) {
          try {
            if (action === 'undo') {
              scripts_echoLog({
                type: 'custom',
                text: '<li>此网站不支持取消任务<font></font></li>'
              });
              return false;
            }
            const logStatus = scripts_echoLog({
              type: 'custom',
              text: `<li>${i18n('getTasksInfo')}<font></font></li>`
            });
            const tasks = $('.w-full:contains("Validate") .items-center');
            for (const task of tasks) {
              const link = $(task).find('a:contains("Open")').attr('href');
              const taskDes = $(task).find('div').eq(1).text().trim();
              if (!link) {
                continue;
              }
              if (/steamcommunity\.com\/groups\//.test(link)) {
                this.undoneTasks.steam.groupLinks.push(link);
              } else if (/store\.steampowered\.com\/app\//.test(link)) {
                if (/wishlist/gim.test(taskDes)) {
                  this.undoneTasks.steam.wishlistLinks.push(link);
                } else if (/follow/gim.test(taskDes)) {
                  this.undoneTasks.steam.followLinks.push(link);
                }
              } else if (/store\.steampowered\.com\/(publisher|developer)\//.test(link) && /follow/gim.test(taskDes)) {
                this.undoneTasks.steam.curatorLikeLinks.push(link);
              } else {
                scripts_echoLog({
                  type: 'custom',
                  text: `<li>${i18n('unknownTaskType', `${taskDes}(${link})`)}<font></font></li>`
                });
              }
            }
            logStatus.success();
            this.undoneTasks = this.uniqueTasks(this.undoneTasks);
            GM_setValue(`oqTasks${this.giveawayId}`, this.socialTasks);
            return true;
          } catch (error) {
            throwError(error, 'Opquests.classifyTask');
            return false;
          }
        }
        checkLogin() {
          try {
            if ($('a[href*="/auth/redirect"]').length > 0) {
              window.open('/auth/redirect', '_self');
            }
            return true;
          } catch (error) {
            throwError(error, 'Opquests.checkLogin');
            return false;
          }
        }
      }
      function Opquests_getGiveawayId2() {
        try {
          var _window$location$href;
          const giveawayId = (_window$location$href = window.location.href.match(/quests\/([\d]+)/)) === null || _window$location$href === void 0 ? void 0 : _window$location$href[1];
          if (giveawayId) {
            this.giveawayId = giveawayId;
            return true;
          }
          scripts_echoLog({
            type: 'custom',
            text: `<li><font class="error">${i18n('getGiveawayIdFailed')}</font></li>`
          });
          return false;
        } catch (error) {
          throwError(error, 'Opquests.getGiveawayId');
          return false;
        }
      }
      const website_Opquests = Opquests;
      function Gleam_classPrivateMethodInitSpec(obj, privateSet) {
        Gleam_checkPrivateRedeclaration(obj, privateSet);
        privateSet.add(obj);
      }
      function Gleam_checkPrivateRedeclaration(obj, privateCollection) {
        if (privateCollection.has(obj)) {
          throw new TypeError('Cannot initialize the same private elements twice on an object');
        }
      }
      function Gleam_defineProperty(obj, key, value) {
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
      function Gleam_classPrivateMethodGet(receiver, privateSet, fn) {
        if (!privateSet.has(receiver)) {
          throw new TypeError('attempted to get private field on non-instance');
        }
        return fn;
      }
      const Gleam_defaultTasks = {
        steam: {
          groupLinks: [],
          wishlistLinks: [],
          followLinks: [],
          curatorLinks: [],
          curatorLikeLinks: []
        },
        twitter: {
          userLinks: [],
          retweetLinks: []
        },
        twitch: {
          channelLinks: []
        },
        discord: {
          serverLinks: []
        },
        youtube: {
          channelLinks: []
        }
      };
      var Gleam_getGiveawayId = new WeakSet();
      class Gleam extends website_Website {
        constructor() {
          super(...arguments);
          Gleam_classPrivateMethodInitSpec(this, Gleam_getGiveawayId);
          Gleam_defineProperty(this, 'undoneTasks', {
            ...Gleam_defaultTasks
          });
          Gleam_defineProperty(this, 'socialTasks', {
            ...Gleam_defaultTasks
          });
        }
        static test() {
          return window.location.host === 'gleam.io';
        }
        init() {
          try {
            const logStatus = scripts_echoLog({
              type: 'init'
            });
            if (!Gleam_classPrivateMethodGet(this, Gleam_getGiveawayId, Gleam_getGiveawayId2).call(this)) {
              return false;
            }
            this.initialized = true;
            logStatus.success();
            return true;
          } catch (error) {
            throwError(error, 'Gleam.init');
            return false;
          }
        }
        async classifyTask(action) {
          try {
            const logStatus = scripts_echoLog({
              type: 'custom',
              text: `<li>${i18n('getTasksInfo')}<font></font></li>`
            });
            this.socialTasks = GM_getValue(`gleamTasks-${this.giveawayId}`) || {
              ...Gleam_defaultTasks
            };
            const tasks = $('.entry-content .entry-method');
            for (const task of tasks) {
              var _socialIcon$attr, _socialIcon$attr2;
              const $task = $(task);
              if (action === 'do' && $task.find('i.fa-question').length === 0) {
                continue;
              }
              const socialIcon = $task.find('.icon-wrapper i');
              const taskInfo = $task.find('.user-links');
              if (socialIcon.hasClass('fa-twitter')) {
                const link = $task.find('a[href^="https://twitter.com/"]').attr('href');
                if (!link) {
                  continue;
                }
                if (/follow/gi.test(taskInfo.text().trim())) {
                  if (action === 'undo') {
                    this.socialTasks.twitter.userLinks.push(link);
                  }
                  if (action === 'do') {
                    this.undoneTasks.twitter.userLinks.push(link);
                  }
                } else if (/retweet/gim.test(taskInfo.text().trim())) {
                  if (action === 'undo') {
                    this.socialTasks.twitter.retweetLinks.push(link);
                  }
                  if (action === 'do') {
                    this.undoneTasks.twitter.retweetLinks.push(link);
                  }
                }
              } else if (socialIcon.hasClass('fa-twitch')) {
                if (/follow/gim.test(taskInfo.text().trim())) {
                  const link = $task.find('a[href^="https://twitch.tv/"]').attr('href');
                  if (!link) {
                    continue;
                  }
                  if (action === 'undo') {
                    this.socialTasks.twitch.channelLinks.push(link);
                  }
                  if (action === 'do') {
                    this.undoneTasks.twitch.channelLinks.push(link);
                  }
                }
              } else if (socialIcon.hasClass('fa-discord')) {
                if (/join/gim.test(taskInfo.text().trim())) {
                  let link = $task.find('a[href^="https://discord.com/invite/"]').attr('href');
                  if (!link) {
                    var _$task$find$attr, _$task$find$attr$matc;
                    const ggLink = (_$task$find$attr = $task.find('a[href^="https://discord.gg/"]').attr('href')) === null || _$task$find$attr === void 0 ? void 0 : (_$task$find$attr$matc = _$task$find$attr.match(/discord\.gg\/([^/]+)/)) === null || _$task$find$attr$matc === void 0 ? void 0 : _$task$find$attr$matc[1];
                    if (!ggLink) {
                      continue;
                    }
                    link = `https://discord.com/invite/${ggLink}`;
                  }
                  if (action === 'undo') {
                    this.socialTasks.discord.serverLinks.push(link);
                  }
                  if (action === 'do') {
                    this.undoneTasks.discord.serverLinks.push(link);
                  }
                }
              } else if (socialIcon.hasClass('fa-external-link-square-alt')) {
                continue;
              } else if (socialIcon.hasClass('fa-youtube')) {
                if (/subscribe/gim.test(taskInfo.text().trim())) {
                  const link = $task.find('a[href^="https://www.youtube.com/channel/"]').attr('href');
                  if (!link) {
                    continue;
                  }
                  if (action === 'undo') {
                    this.socialTasks.youtube.channelLinks.push(link);
                  }
                  if (action === 'do') {
                    this.undoneTasks.youtube.channelLinks.push(link);
                  }
                }
              } else if ((_socialIcon$attr = socialIcon.attr('class')) !== null && _socialIcon$attr !== void 0 && _socialIcon$attr.includes('steam')) {
                if (/join.*group/gi.test(taskInfo.text().trim())) {
                  const link = $task.find('a[href^="https://steamcommunity.com/groups/"]').attr('href');
                  if (!link) {
                    continue;
                  }
                  if (action === 'undo') {
                    this.socialTasks.steam.groupLinks.push(link);
                  }
                  if (action === 'do') {
                    this.undoneTasks.steam.groupLinks.push(link);
                  }
                } else if (/follow.*curator/gi.test(taskInfo.text().trim())) {
                  const link = $task.find('a[href^="https://store.steampowered.com/curator/"]').attr('href');
                  if (!link) {
                    continue;
                  }
                  if (action === 'undo') {
                    this.socialTasks.steam.curatorLinks.push(link);
                  }
                  if (action === 'do') {
                    this.undoneTasks.steam.curatorLinks.push(link);
                  }
                }
              } else if ((_socialIcon$attr2 = socialIcon.attr('class')) !== null && _socialIcon$attr2 !== void 0 && _socialIcon$attr2.includes('fa-question')) {} else {
                scripts_echoLog({
                  type: 'text',
                  text: `未识别的任务:${taskInfo.text().trim()}`
                });
              }
            }
            logStatus.success();
            this.undoneTasks = this.uniqueTasks(this.undoneTasks);
            this.socialTasks = this.uniqueTasks(this.socialTasks);
            GM_setValue(`gleamTasks${this.giveawayId}`, this.socialTasks);
            return true;
          } catch (error) {
            throwError(error, 'Gleam.classifyTask');
            return false;
          }
        }
      }
      function Gleam_getGiveawayId2() {
        try {
          const giveawayId = window.location.pathname;
          if (giveawayId) {
            this.giveawayId = giveawayId;
            return true;
          }
          scripts_echoLog({
            type: 'custom',
            text: `<li><font class="error">${i18n('getGiveawayIdFailed')}</font></li>`
          });
          return false;
        } catch (error) {
          throwError(error, 'Gleam.getGiveawayId');
          return false;
        }
      }
      const website_Gleam = Gleam;
      const Websites = [ website_FreeAnyWhere, GiveawaySu, website_Indiedb, website_Keyhub, website_Givekey, website_GiveeClub, website_OpiumPulses, website_Keylol, website_Opquests, website_Gleam ];
      let website;
      for (const Website of Websites) {
        if (Website.test()) {
          website = new Website();
          break;
        }
      }
      if (window.location.hostname === 'discord.com') {
        var _window$localStorage, _window$localStorage$;
        const discordAuth = (_window$localStorage = window.localStorage) === null || _window$localStorage === void 0 ? void 0 : (_window$localStorage$ = _window$localStorage.getItem('token')) === null || _window$localStorage$ === void 0 ? void 0 : _window$localStorage$.replace(/^"|"$/g, '');
        GM_setValue('discordAuth', {
          auth: discordAuth
        });
        if (discordAuth && window.location.hash === '#auth') {
          window.close();
          external_Swal_default().fire('', '如果此页面没有自动关闭，请自行关闭本页面。');
        }
      }
      if (window.location.hostname === 'gleam.io') {}
      window.onload = () => {
        if (window.location.hostname === 'www.twitch.tv' && window.location.hash === '#auth') {
          const authToken = external_Cookies_namespaceObject.get('auth-token');
          const isLogin = !!external_Cookies_namespaceObject.get('login');
          if (isLogin) {
            var _commonOptions, _commonOptions$header;
            GM_setValue('twitchAuth', {
              authToken: authToken,
              clientId: (_commonOptions = commonOptions) === null || _commonOptions === void 0 ? void 0 : (_commonOptions$header = _commonOptions.headers) === null || _commonOptions$header === void 0 ? void 0 : _commonOptions$header['Client-ID']
            });
            window.close();
            external_Swal_default().fire('', '如果此页面没有自动关闭，请自行关闭本页面。');
          } else {
            external_Swal_default().fire('', '请先登录！');
          }
        }
        if (window.location.hostname === 'twitter.com' && window.location.hash === '#auth') {
          const ct0 = external_Cookies_namespaceObject.get('ct0');
          const isLogin = !!external_Cookies_namespaceObject.get('twid');
          if (isLogin && ct0) {
            GM_setValue('twitterAuth', {
              ct0: ct0
            });
            window.close();
            external_Swal_default().fire('', '如果此页面没有自动关闭，请自行关闭本页面。');
          } else {
            external_Swal_default().fire('', '请先登录！');
          }
        }
        if (window.location.hostname === 'www.youtube.com' && window.location.hash === '#auth') {
          const PAPISID = external_Cookies_namespaceObject.get('__Secure-3PAPISID');
          if (PAPISID) {
            GM_setValue('youtubeAuth', {
              PAPISID: PAPISID
            });
            window.close();
            external_Swal_default().fire('', '如果此页面没有自动关闭，请自行关闭本页面。');
          } else {
            external_Swal_default().fire('', '请先登录！');
          }
        }
        if (window.location.hostname === 'www.reddit.com' && (window.location.hash === '#auth' || GM_getValue('redditAuth') === '#auth')) {
          const betaButton = $('#redesign-beta-optin-btn');
          if (betaButton.length > 0) {
            GM_setValue('redditAuth', '#auth');
            return betaButton[0].click();
          }
          GM_setValue('redditAuth', null);
          window.close();
          external_Swal_default().fire('', '如果此页面没有自动关闭，请自行关闭本页面。');
        }
        if (!website) {
          return;
        }
        $('body').append('<div id="auto-task-info"></div>');
        if (website.before) {
          website.before();
        }
        if (website.after) {
          website.after();
        }
        unsafeWindow.website = website;
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
  }
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
        console.log('Auto Task脚本初始化完成！');
      };
    }
  };
  var __webpack_require__ = {};
  !function() {
    __webpack_require__.n = function(module) {
      var getter = module && module.__esModule ? function() {
        return module['default'];
      } : function() {
        return module;
      };
      __webpack_require__.d(getter, {
        a: getter
      });
      return getter;
    };
  }();
  !function() {
    __webpack_require__.d = function(exports, definition) {
      for (var key in definition) {
        if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
          Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key]
          });
        }
      }
    };
  }();
  !function() {
    __webpack_require__.o = function(obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    };
  }();
  var __webpack_exports__ = {};
  __webpack_modules__[886](0, __webpack_exports__, __webpack_require__);
})();
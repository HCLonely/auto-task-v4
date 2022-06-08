// ==UserScript==
// @name               auto-task-v4
// @namespace          auto-task-v4
// @version            4.2.12
// @description        自动完成 Freeanywhere，Giveawaysu，GiveeClub，Givekey，Gleam，Indiedb，keyhub，OpiumPulses，Opquests，SweepWidget 等网站的任务。
// @description:en     Automatically complete the tasks of FreeAnyWhere, GiveawaySu, GiveeClub, Givekey, Gleam, Indiedb, keyhub, OpiumPulses, Opquests, SweepWidget websites.
// @author             HCLonely
// @license            MIT
// @run-at             document-start
// @homepage           https://auto-task-doc.js.org/
// @supportURL         https://github.com/HCLonely/auto-task-v4/issues
// @updateURL          https://github.com/HCLonely/auto-task-new/raw/main/dist/auto-task-v4.user.js
// @installURL         https://github.com/HCLonely/auto-task-new/raw/main/dist/auto-task-v4.user.js
// @downloadURL        https://github.com/HCLonely/auto-task-new/raw/main/dist/auto-task-v4.user.js
// @icon               https://auto-task-v4.hclonely.com/favicon.ico

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
// @include            *://sweepwidget.com/view/*
// @include            *://discord.com/*
// @include            *://www.twitch.tv/*
// @include            *://www.youtube.com/*
// @include            *://*.reddit.com/*
// @include            *://twitter.com/settings/account?k*
// @include            https://auto-task-v4.hclonely.com/setting.html
// @include            https://auto-task-v4.hclonely.com/history.html

// @grant              GM_setValue
// @grant              GM_getValue
// @grant              GM_listValues
// @grant              GM_deleteValue
// @grant              GM_addStyle
// @grant              GM_xmlhttpRequest
// @grant              GM_registerMenuCommand
// @grant              GM_info
// @grant              GM_openInTab
// @grant              GM_setClipboard
// @grant              GM_getResourceText
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
// @connect            www.vloot.io
// @connect            givee.club
// @connect            gleam.io
// @connect            www.indiedb.com
// @connect            key-hub.eu
// @connect            opquests.com
// @connect            itch.io
// @connect            auto-task-v4.hclonely.com
// @connect            *
// @require            https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js
// @require            https://cdn.jsdelivr.net/npm/js-cookie@3.0.1/dist/js.cookie.min.js
// @require            https://cdn.jsdelivr.net/npm/regenerator-runtime@0.13.5/runtime.min.js
// @require            https://cdn.jsdelivr.net/npm/js-sha1@0.6.0/src/sha1.min.js
// @require            https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.js
// @resource           style https://cdn.jsdelivr.net/npm/sweetalert2@11.3.5/dist/sweetalert2.min.css
// @require            https://cdn.jsdelivr.net/npm/keyboardjs@2.6.4/dist/keyboard.min.js
// @require            https://cdn.jsdelivr.net/npm/dayjs@1.10.7/dayjs.min.js

// @noframes
// ==/UserScript==

console.log('%c%s', 'color:blue', 'Auto-Task[Load]: 脚本开始加载');

(function() {
  var __webpack_modules__ = {
    514: function(__unused_webpack_module, exports) {
      !function(e, n) {
        true ? n(exports) : 0;
      }(this, function(e) {
        'use strict';
        var t = function() {
          return (t = Object.assign || function(e) {
            for (var n, o = 1, t = arguments.length; o < t; o++) {
              for (var r in n = arguments[o]) {
                Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
              }
            }
            return e;
          }).apply(this, arguments);
        };
        function r(e, n, o) {
          if (o || 2 === arguments.length) {
            for (var t, r = 0, i = n.length; r < i; r++) {
              !t && r in n || ((t = t || Array.prototype.slice.call(n, 0, r))[r] = n[r]);
            }
          }
          return e.concat(t || Array.prototype.slice.call(n));
        }
        function d(e) {
          return '[object Object]' === n(e);
        }
        function l(e, n) {
          var o = r(r([], n || [], !0), [ '_' ], !1).join('|');
          return e.replace(new RegExp('(('.concat(o, ')[a-z])+'), 'g'), function(e, n) {
            return n.replace(new RegExp(o), '').toLocaleUpperCase();
          });
        }
        var n = function(e) {
          return Object.prototype.toString.call(e);
        };
        var o = (i.prototype.init = function() {
          try {
            this.getSystemName(), this.getBrowserName();
          } catch (e) {
            console.warn('[UA formatter error] '.concat(e));
          }
        }, i.prototype.getEngine = function() {
          var e = this.agent;
          return -1 !== e.indexOf('Trident') ? 'Trident' : -1 !== e.indexOf('Firefox') ? 'Gecko' : -1 !== e.indexOf('Presto') ? 'Presto' : 'WebKit';
        }, i.prototype.getSystemName = function() {
          var e, n = (this.agent.match(/^[a-z]+\/\d+\.\d+\s?\(([a-z\d\s:;./_-]+)\)/i) || [])[1];
          try {
            var o = '';
            if (/Windows/i.test(n)) {
              var t = (n.match(/NT\s(\d+\.\d+)/) || [])[1];
              switch (this.info.os = 'Windows', t) {
               case '6.3':
                o = '8.1';
                break;

               case '6.2':
                o = '8';
                break;

               case '6.1':
                o = '7';
                break;

               case '5.2':
               case '5.1':
                o = 'XP';
                break;

               default:
                o = t;
              }
              return this.info.device = 'PC', void (this.info.osVersion = o);
            }
            if (/^Macintosh/i.test(n)) {
              return o = (n.match(/X\s((\d+(_|\.))+\d+)/) || [])[1], this.info.os = 'Macintosh', 
              this.info.device = 'PC', void (this.info.osVersion = null !== (e = null == o ? void 0 : o.replace(/_/g, '.')) && void 0 !== e ? e : 'Unknown');
            }
            if (/^iPad/i.test(n)) {
              return o = (n.match(/((\d+_)+\d+)/) || [])[1], this.info.os = 'iPad', this.info.device = 'Tablet', 
              void (this.info.osVersion = o.replace(/_/g, '.'));
            }
            if (/^iPhone/i.test(n)) {
              return o = (n.match(/((\d+_)+\d+)/) || [])[1], this.info.os = 'iPhone', this.info.device = 'Mobile', 
              void (this.info.osVersion = o.replace(/_/g, '.'));
            }
            if (-1 !== n.indexOf('Android')) {
              var r = (n.match(/Android\s((\d+\.?)+\d?)/) || [])[1];
              return this.info.device = 'Mobile', this.info.os = 'Android', void (this.info.osVersion = r);
            }
            if (/Linux\s[a-z\d_]+/.test(n)) {
              return this.info.os = 'Linux', void (this.info.osVersion = 'Unknown');
            }
            this.info.os = 'Unknown', this.info.osVersion = 'Unknown';
          } catch (e) {
            this.info.os = 'Unknown', this.info.osVersion = 'Unknown';
          }
        }, i.prototype.getBrowserName = function() {
          var e = Object.keys(this.browserNameMap).map(function(e) {
            return new RegExp(''.concat(e, '(\\/|\\s)(\\d+\\.)+\\d+'));
          }), n = 1 < (n = (this.agent.match(/[a-z\d]+(\/|\s)(\d+\.)+\d+/gi) || []).filter(function(n) {
            return -1 !== e.findIndex(function(e) {
              return e.test(n);
            });
          })).length && !/^Safari/.test(n[n.length - 1]) ? n.reverse() : n;
          this.info = t(t({}, this.info), this._formatBrowserVersion(n[0]));
        }, i.prototype._formatBrowserVersion = function(e) {
          var n, o, t, r;
          try {
            for (var i = null !== (o = null === (n = e.match(/(?<name>[a-z\d]+)(\/|\s)(?<version>(\d+\.)+\d+)/i)) || void 0 === n ? void 0 : n.groups) && void 0 !== o ? o : {}, s = i.name, a = i.version, c = {}, f = 0, u = Object.entries(this.browserNameMap); f < u.length; f++) {
              var d = u[f], l = d[0], h = d[1];
              if (new RegExp(l).test(s)) {
                c = h;
                break;
              }
            }
            var p = {
              browserVersion: null != a ? a : 'Unknown',
              browser: null !== (t = c.en) && void 0 !== t ? t : 'Unknown',
              browserZH: null !== (r = (null == c ? void 0 : c.zh) || c.en) && void 0 !== r ? r : 'Unknown'
            };
            return 'Trident' === s && (p.browserVersion = {
              '4.0': 8,
              '5.0': 9,
              '6.0': 10,
              '7.0': 11
            }[a]), p;
          } catch (e) {
            return console.warn('[UA formatter error] '.concat(e)), {
              browser: 'Unknown',
              browserVersion: 'Unknown'
            };
          }
        }, i);
        function i(e) {
          this.agent = '', this.info = {
            browser: '',
            browserZH: '',
            browserVersion: '',
            os: '',
            osVersion: '',
            device: 'Unknown',
            engine: 'WebKit'
          }, this.browserNameMap = {
            MicroMessenger: {
              en: 'MicroMessenger',
              zh: '微信'
            },
            MetaSr: {
              en: 'MetaSr',
              zh: '搜狗浏览器'
            },
            'QQ(Browser)?': {
              en: 'QQBrowser',
              zh: 'QQ浏览器'
            },
            UCBrowser: {
              en: 'UCBrowser',
              zh: 'UC浏览器'
            },
            '2345Explorer': {
              en: '2345Explorer',
              zh: '2345极速浏览器'
            },
            Mb2345Browser: {
              en: 'Mb2345Browser',
              zh: '2345手机浏览器'
            },
            Trident: {
              en: 'Internet Explorer'
            },
            'Edge?': {
              en: 'Edge'
            },
            OPR: {
              en: 'Opera'
            },
            Vivaldi: {
              en: 'Vivaldi'
            },
            Firefox: {
              en: 'Firefox'
            },
            Chrome: {
              en: 'Chrome'
            },
            Safari: {
              en: 'Safari'
            }
          }, this.agent = e, this.init();
          var n = this.info, o = n.browser, e = n.browserVersion, n = n.osVersion;
          this.info = t(t({}, this.info), {
            engine: this.getEngine(),
            browserVersion: 'Safari' === o ? n : e
          });
        }
        function s() {
          this.cookies = {}, this.init();
        }
        var a = new (s.prototype.init = function() {
          var o = {};
          document.cookie.split(/;\s/).forEach(function(e) {
            var n = e.split(/=/), e = n[0], n = n[1];
            o[e] = n;
          }), this.cookies = o;
        }, s.prototype.getItem = function(e) {
          return this.cookies[e];
        }, s.prototype.getAllItems = function() {
          return this.cookies;
        }, s.prototype.setItem = function(e, n, o, t, r, i) {
          document.cookie = ''.concat(e, '=').concat(n).concat(o ? '; expires='.concat(o) : '').concat(t ? '; path='.concat(t) : '').concat(r ? '; domain='.concat(r) : '').concat(i ? '; secure' : '');
        }, s)();
        e.countDown = function e(n, o, t, r) {
          if (!window) {
            throw new Error('window is not defind.');
          }
          if (0 < n) {
            return r && r(), n--, window[o] = window.setTimeout(function() {
              e(n, o, t, r);
            }, 1e3), function() {
              return clearTimeout(window[o]);
            };
          }
          clearTimeout(window[o]), t && t();
        }, e.createRandomID = function(e) {
          void 0 === e && (e = 12);
          for (var n = [], o = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''), t = o.length, r = 0; r < e; r++) {
            n.push(o[Math.round(Math.random() * t)]);
          }
          return n.join('');
        }, e.dCookie = a, e.debounce = function(o, t, r) {
          var i;
          void 0 === t && (t = 0);
          var s = r = void 0 === r ? !1 : r;
          return function() {
            var e = this, n = arguments;
            s && (o.apply(this, arguments), s = !1), clearTimeout(i), i = setTimeout(function() {
              r ? s = !0 : o.apply(e, n);
            }, t);
          };
        }, e.deepCopy = function e(n) {
          if (d(n) || Array.isArray(n)) {
            var o, t = Array.isArray(n) ? [] : {};
            for (o in n) {
              t[o] = e(n[o]);
            }
            return t;
          }
          return n;
        }, e.formatQueryParams = function(e) {
          e = null === (e = /\?(?<params>(.*)=.+)/.exec(decodeURIComponent(e))) || void 0 === e ? void 0 : e.groups;
          if (!e) {
            return {};
          }
          for (var n = e.params.split('&'), t = {}, o = 0; o < n.length; o++) {
            n[o].replace(/([^?&]*)=([^?&]*)/, function(e, n, o) {
              return t[n] = o, e;
            });
          }
          return t;
        }, e.formatThousandth = function(e) {
          var n = ''.concat(e).split('.'), e = n[0], n = n[1], n = void 0 === n ? '' : n, e = e.replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,');
          return ''.concat(e).concat(n ? '.'.concat(n) : '');
        }, e.generateTree = function e(n, o, t, r) {
          for (var i = [], s = 0; s < n.length; s++) {
            var a = n[s];
            a[t] === o && (i.push(a), a.children = e(n, a[null != r ? r : 'id'], t, r));
          }
          return i;
        }, e.isEmpty = function(e) {
          return Array.isArray(e) ? 0 === e.length : d(e) ? 0 === Object.keys(e).length : [ '[object Set]', '[object Map]' ].includes(n(e)) ? 0 === e.size : [ null, void 0, '' ].includes(e);
        }, e.isFunction = function(e) {
          return '[object Function]' === n(e);
        }, e.isImageUrl = function(e) {
          return /\.((png)|(jpe?g)|(gif)|(svg)|(webp))$/gi.test(e);
        }, e.isObject = d, e.isRegexp = function(e) {
          return '[object RegExp]' === n(e);
        }, e.objectKeyToCamelCase = function e(n, o, t) {
          if (Array.isArray(n)) {
            for (var r = [], i = 0; i < n.length; i++) {
              r[i] = e(o && n[i][o] ? n[i][o] : n[i], o, t);
            }
          } else if (d(n)) {
            r = {};
            for (var s = o && n[o] ? n[o] : n, a = 0, c = Object.entries(s); a < c.length; a++) {
              var f = (u = c[a])[0], u = u[1];
              Array.isArray(u) || d(s) ? r[l(f, t)] = e(u, o, t) : r[l(f, t)] = u;
            }
          } else {
            r = n;
          }
          return r;
        }, e.realType = n, e.searchParams = function(e, n) {
          return void 0 === e && (e = null === location || void 0 === location ? void 0 : location.search), 
          new URLSearchParams(e).get(n);
        }, e.toLowerCamelCase = l, e.toUnderline = function(e) {
          return e.replace(/([A-Z])/g, function(e) {
            return '_'.concat(e.toLocaleLowerCase());
          });
        }, e.ua = function(e) {
          return void 0 === e && (e = navigator.userAgent), new o(e).info;
        }, Object.defineProperty(e, '__esModule', {
          value: !0
        });
      });
    },
    786: function(module, __webpack_exports__, __webpack_require__) {
      'use strict';
      __webpack_require__.d(__webpack_exports__, {
        Z: function() {
          return __WEBPACK_DEFAULT_EXPORT__;
        }
      });
      var _node_modules_pnpm_registry_npmmirror_com_css_loader_6_5_1_webpack_5_60_0_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(220);
      var _node_modules_pnpm_registry_npmmirror_com_css_loader_6_5_1_webpack_5_60_0_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_pnpm_registry_npmmirror_com_css_loader_6_5_1_webpack_5_60_0_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
      var _node_modules_pnpm_registry_npmmirror_com_css_loader_6_5_1_webpack_5_60_0_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(400);
      var _node_modules_pnpm_registry_npmmirror_com_css_loader_6_5_1_webpack_5_60_0_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = __webpack_require__.n(_node_modules_pnpm_registry_npmmirror_com_css_loader_6_5_1_webpack_5_60_0_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
      var ___CSS_LOADER_EXPORT___ = _node_modules_pnpm_registry_npmmirror_com_css_loader_6_5_1_webpack_5_60_0_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()(_node_modules_pnpm_registry_npmmirror_com_css_loader_6_5_1_webpack_5_60_0_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());
      ___CSS_LOADER_EXPORT___.push([ module.id, '.colorful-button,#auto-task-buttons a.auto-task-website-btn,.show-button-div a.auto-task-website-btn,body.auto-task-options .auto-task-form table button{position:relative;padding:5px 10px;text-align:center;color:#fff;text-decoration:none;background:linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);border-radius:30px;background-size:400%;text-transform:capitalize}.colorful-button:hover,#auto-task-buttons a.auto-task-website-btn:hover,.show-button-div a.auto-task-website-btn:hover,body.auto-task-options .auto-task-form table button:hover{animation:animate 8s linear infinite;cursor:pointer}.colorful-button:hover::before,#auto-task-buttons a.auto-task-website-btn:hover::before,.show-button-div a.auto-task-website-btn:hover::before,body.auto-task-options .auto-task-form table button:hover::before{filter:blur(10px);opacity:1}.colorful-button::before,#auto-task-buttons a.auto-task-website-btn::before,.show-button-div a.auto-task-website-btn::before,body.auto-task-options .auto-task-form table button::before{content:"";position:absolute;top:-5px;left:-5px;right:-5px;bottom:-5px;z-index:-1;background:linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);border-radius:40px;background-size:400%;opacity:-1;transition:.5s}@keyframes animate{0%{background-position:0%}100%{background-position:100%}}#auto-task-info{position:fixed;bottom:10px;right:10px;width:60%;max-width:500px;max-height:60%;overflow-y:auto;color:#000;background-color:#fff;padding-left:5px;z-index:999999999 !important;border:solid 2px #add8e6;border-radius:10px}#auto-task-info li{text-align:left}#auto-task-info li a.high-light{color:#00aeff;font-weight:bold}#auto-task-info .success{color:green}#auto-task-info .error{color:red}#auto-task-info .warning{color:blue}#auto-task-info .info{color:#ff0}#auto-task-info .update-text{color:green;border:solid 2px #8dcb69;margin:5px 10px 5px 20px;border-radius:10px;padding:5px 20px}.auto-task-keylol{display:inline-block;text-transform:capitalize;margin-left:10px;text-decoration:none !important;border:solid 1px;border-radius:5px;padding:0 2px}.auto-task-keylol[selected=selected]{background-color:blue !important;color:#fff !important}.auto-task-form table{font-family:verdana,arial,sans-serif;font-size:11px;color:#333;border-width:1px;border-color:#999;border-collapse:collapse;width:100%}.auto-task-form table thead td{border-width:1px;padding:8px;border-style:solid;border-color:#a9c6c9;font-weight:bold;background-color:#fff}.auto-task-form table tbody tr{background-color:#d4e3e5}.auto-task-form table tbody tr:hover{background-color:#ff6 !important}.auto-task-form table tbody tr th{background-color:#c3dde0;border-width:1px;padding:8px;border-style:solid;border-color:#a9c6c9;text-transform:capitalize}.auto-task-form table tbody tr td{border-width:1px;padding:8px;border-style:solid;border-color:#a9c6c9}.swal2-modal{width:70% !important;max-width:1000px !important}body.auto-task-options{padding-top:10px;text-align:center}body.auto-task-options .auto-task-form{width:80%;max-width:1000px;margin:0 auto;padding-bottom:20px}body.auto-task-options .auto-task-form table input.editOption{width:80%}body.auto-task-options .auto-task-form table #getTwitterUserId,body.auto-task-options .auto-task-form table #getYoutubeChannelId{margin-top:5px}body.auto-task-options .auto-task-form table button{z-index:1}body.auto-task-options .auto-task-form table input[type=text]{outline-style:none;border:1px solid #ccc;border-radius:3px;padding:5px 10px;font-size:14px}body.auto-task-options .auto-task-form table input[type=text]:focus{border-color:#66afe9;outline:0;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6)}body.auto-task-options .auto-task-form table label{position:relative;width:160px;height:80px;cursor:pointer;transform:scale(0.25);margin:-25% 0;top:-30px;display:inline-block}body.auto-task-options .auto-task-form table label input{position:relative;z-index:1;-webkit-appearance:none;appearance:none}body.auto-task-options .auto-task-form table label input:checked~span{background:#05be05;box-shadow:0 15px 25px rgba(5,190,5,0.4)}body.auto-task-options .auto-task-form table label input:checked~span i{left:84px}body.auto-task-options .auto-task-form table label input:checked~span i::before{background:#05be05;box-shadow:35px 0 0 #05be05}body.auto-task-options .auto-task-form table label input:checked~span i::after{bottom:12px;height:15px;border-bottom-left-radius:15px;border-bottom-right-radius:15px;background:#05be05}body.auto-task-options .auto-task-form table label span{position:absolute;top:0;left:0;width:100%;height:100%;background:#fe0000;border-radius:80px;transition:.5s;box-shadow:0 15px 25px rgba(254,0,0,0.4)}body.auto-task-options .auto-task-form table label span i{position:absolute;top:4px;left:4px;width:72px;height:72px;background:#fff;border-radius:50%}body.auto-task-options .auto-task-form table label span i::before{content:"";position:absolute;top:22px;left:12px;width:12px;height:12px;border-radius:50%;background:#fe0000;box-shadow:35px 0 0 #fe0000;transition:.5s}body.auto-task-options .auto-task-form table label span i::after{content:"";position:absolute;bottom:15px;left:calc(50% - 15px);width:30px;height:6px;border-radius:6px;background:#fe0000;transition:.5s}body.auto-task-history{font-size:15px;font-weight:400;line-height:1.5}body.auto-task-history .container a{color:#007bff;text-decoration:none;background-color:transparent}body.auto-task-history .container .card{width:80%;max-width:800px;border-radius:10px;background:rgba(118,118,118,0.10196);border-top:1px solid rgba(255,255,255,0.50196);-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);box-shadow:0 15px 25px rgba(0,0,0,0.10196);margin:20px auto;position:relative;display:flex;flex-direction:column;word-wrap:break-word;-webkit-background-clip:border-box;background-clip:border-box;border:1px solid rgba(0,0,0,.125);border-radius:.25rem}body.auto-task-history .container .card .title{text-align:center;font-size:30px;font-weight:bold;margin:5px 0}body.auto-task-history .container .card .title a:hover{text-decoration:none;background:#93e1ff;border-radius:10px;padding:3px}body.auto-task-history .container .card ul{margin-bottom:25px}body.auto-task-history .container .card ul li{margin-bottom:5px;line-height:20px}body.auto-task-history .container .card ul a:hover{text-decoration:underline}body.auto-task-history .container .card .delete-task{right:10px;width:38px;height:35px;position:absolute;font-size:24px;cursor:pointer;border-radius:10px}body.auto-task-history .container .card .delete-task:hover{background:#fff}body.auto-task-history .container .card .time{right:5px;position:absolute;bottom:0;color:#e83e8c;font-family:\'SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace\';font-size:15px}#auto-task-buttons,.show-button-div{position:fixed;top:30px;right:15px;width:170px;z-index:999999999 !important;transform:scale(0.9)}#auto-task-buttons p,.show-button-div p{line-height:30px;height:40px;text-align:center;margin:5px !important}#auto-task-buttons a.auto-task-website-btn,.show-button-div a.auto-task-website-btn{width:150px;height:40px;line-height:30px;font-size:20px}.show-button-div{width:20px}.auto-task-capitalize{text-transform:capitalize !important}.swal2-file:focus,.swal2-input:focus,.swal2-textarea:focus{box-shadow:inset 0px 0px 4px 1px rgba(100,150,200,.5) !important}.swal2-checkbox-custom{align-items:center;justify-content:center;background:#fff;color:inherit;margin:1em auto}.swal2-checkbox-custom input{flex-shrink:0;margin:0 .4em}.giveaway-actions #getKey{display:none !important}.auto-task-giveaway-status{color:#fff;border-radius:10px;padding:0 5px;margin-left:5px}.auto-task-giveaway-status.active{background-color:#5cb85c}.auto-task-giveaway-status.not-active{background-color:#d9534f}.left-keys.lk-green,.left-keys.lk-yellow,.left-keys.lk-red,.left-keys.lk-black{display:none !important}', '' ]);
      const __WEBPACK_DEFAULT_EXPORT__ = ___CSS_LOADER_EXPORT___.toString();
    },
    400: function(module) {
      'use strict';
      module.exports = function(cssWithMappingToString) {
        var list = [];
        list.toString = function toString() {
          return this.map(function(item) {
            var content = '';
            var needLayer = typeof item[5] !== 'undefined';
            if (item[4]) {
              content += '@supports ('.concat(item[4], ') {');
            }
            if (item[2]) {
              content += '@media '.concat(item[2], ' {');
            }
            if (needLayer) {
              content += '@layer'.concat(item[5].length > 0 ? ' '.concat(item[5]) : '', ' {');
            }
            content += cssWithMappingToString(item);
            if (needLayer) {
              content += '}';
            }
            if (item[2]) {
              content += '}';
            }
            if (item[4]) {
              content += '}';
            }
            return content;
          }).join('');
        };
        list.i = function i(modules, media, dedupe, supports, layer) {
          if (typeof modules === 'string') {
            modules = [ [ null, modules, undefined ] ];
          }
          var alreadyImportedModules = {};
          if (dedupe) {
            for (var k = 0; k < this.length; k++) {
              var id = this[k][0];
              if (id != null) {
                alreadyImportedModules[id] = true;
              }
            }
          }
          for (var _k = 0; _k < modules.length; _k++) {
            var item = [].concat(modules[_k]);
            if (dedupe && alreadyImportedModules[item[0]]) {
              continue;
            }
            if (typeof layer !== 'undefined') {
              if (typeof item[5] === 'undefined') {
                item[5] = layer;
              } else {
                item[1] = '@layer'.concat(item[5].length > 0 ? ' '.concat(item[5]) : '', ' {').concat(item[1], '}');
                item[5] = layer;
              }
            }
            if (media) {
              if (!item[2]) {
                item[2] = media;
              } else {
                item[1] = '@media '.concat(item[2], ' {').concat(item[1], '}');
                item[2] = media;
              }
            }
            if (supports) {
              if (!item[4]) {
                item[4] = ''.concat(supports);
              } else {
                item[1] = '@supports ('.concat(item[4], ') {').concat(item[1], '}');
                item[4] = supports;
              }
            }
            list.push(item);
          }
        };
        return list;
      };
    },
    220: function(module) {
      'use strict';
      module.exports = function(i) {
        return i[1];
      };
    }
  };
  var __webpack_module_cache__ = {};
  function __webpack_require__(moduleId) {
    var cachedModule = __webpack_module_cache__[moduleId];
    if (cachedModule !== undefined) {
      return cachedModule.exports;
    }
    var module = __webpack_module_cache__[moduleId] = {
      id: moduleId,
      exports: {}
    };
    __webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    return module.exports;
  }
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
  !function() {
    'use strict';
    const external_Swal_namespaceObject = Swal;
    var external_Swal_default = __webpack_require__.n(external_Swal_namespaceObject);
    const external_Cookies_namespaceObject = Cookies;
    var auto_task = __webpack_require__(786);
    var javascript_utils_umd_min = __webpack_require__(514);
    const httpRequest = async function(options) {
      let times = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      if (window.TRACE) {
        console.trace('%cAuto-Task[Debug]:', 'color:blue');
      }
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
        if (window.DEBUG) {
          console.log('%cAuto-Task[httpRequest]:', 'color:blue', JSON.stringify(result));
        }
        if (result.status !== 600 && times < 2) {
          return await httpRequest(options, times + 1);
        }
        return result;
      } catch (error) {
        console.log('%cAuto-Task[httpRequest]:', 'color:red', JSON.stringify({
          errorMsg: error,
          options: options
        }));
        throwError(error, 'httpRequest');
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
    const echoLog = _ref => {
      let {
        type,
        text,
        html,
        id
      } = _ref;
      const emptyStatus = {
        success: () => emptyStatus,
        error: () => emptyStatus,
        warning: () => emptyStatus,
        info: () => emptyStatus,
        view: () => emptyStatus
      };
      try {
        var _ele$;
        let ele;
        if (type) {
          switch (type) {
           case 'joiningSteamGroup':
           case 'leavingSteamGroup':
           case 'gettingSteamGroupId':
            ele = $(`<li>${i18n(type)}[<a href="https://steamcommunity.com/groups/${text}" target="_blank">${text}</a>]...<font></font></li>`);
            break;

           case 'joiningSteamOfficialGroup':
           case 'leavingSteamOfficialGroup':
           case 'gettingSteamOfficialGroupId':
            ele = $(`<li>${i18n(type)}[<a href="https://steamcommunity.com/games/${text}" target="_blank">${text}</a>]...<font></font></li>`);
            break;

           case 'subscribingForum':
           case 'unsubscribingForum':
           case 'gettingForumId':
            ele = $(`<li>${i18n(type)}[<a href="https://steamcommunity.com/app/${text}/discussions/" target="_blank">${text}</a>]...<font></font></li>`);
            break;

           case 'followingCurator':
           case 'unfollowingCurator':
           case 'getCuratorId':
            ele = $(`<li>${i18n(type)}[<a href="https://store.steampowered.com/${text !== null && text !== void 0 && text.includes('/') ? text : `curator/${text}`}" target="_blank">${text}</a>]...<font></font></li>`);
            break;

           case 'addingToWishlist':
           case 'removingFromWishlist':
           case 'followingGame':
           case 'unfollowingGame':
           case 'gettingSubid':
           case 'addingFreeLicense':
           case 'requestingPlayTestAccess':
            ele = $(`<li>${i18n(type)}[<a href="https://store.steampowered.com/app/${text}" target="_blank">${text}</a>]...<font></font></li>`);
            break;

           case 'addingFreeLicenseSubid':
            ele = $(`<li>${i18n('addingFreeLicense')}[<a href="https://steamdb.info/sub/${text}/" target="_blank">${text}</a>]...<font></font></li>`);
            break;

           case 'favoritingWorkshop':
           case 'unfavoritingWorkshop':
           case 'gettingWorkshopAppId':
           case 'votingUpWorkshop':
            ele = $(`<li>${i18n(type)}[<a href="https://steamcommunity.com/sharedfiles/filedetails/?id=${text}" target="_blank">
      ${text}</a>]...<font></font></li>`);
            break;

           case 'gettingAnnouncementParams':
           case 'likingAnnouncement':
            ele = $(`<li>${i18n(type)}[<a href="https://store.steampowered.com/news/app/${text}/view/${id}" target="_blank">
      ${id}</a>]...<font></font></li>`);
            break;

           case 'joiningDiscordServer':
           case 'gettingDiscordGuild':
            ele = $(`<li>${i18n(type)}[<a href="https://discord.com/invite/${text}" target="_blank">${text}</a>]...<font></font></li>`);
            break;

           case 'leavingDiscordServer':
            ele = $(`<li>${i18n(type)}[<a href="https://discord.com/channels/@me/${text}" target="_blank">${text}</a>]...<font></font></li>`);
            break;

           case 'updateDiscordAuth':
            ele = $(`<li style="color:red;">${i18n('updateDiscordAuth')}</li>`);
            break;

           case 'followingTwitchChannel':
           case 'unfollowingTwitchChannel':
           case 'gettingTwitchChannelId':
            ele = $(`<li>${i18n(type)}[<a href="https://www.twitch.tv/${text}" target="_blank">${text}</a>]...<font></font></li>`);
            break;

           case 'gettingInsUserId':
           case 'followingIns':
           case 'unfollowingIns':
            ele = $(`<li>${i18n(type)}[<a href="https://www.instagram.com/${text}/" target="_blank">${text}</a>]...<font></font></li>`);
            break;

           case 'gettingTwitterUserId':
           case 'followingTwitterUser':
           case 'unfollowingTwitterUser':
            ele = $(`<li>${i18n(type)}[<a href="https://twitter.com/${text}" target="_blank">${text}</a>]...<font></font></li>`);
            break;

           case 'retweetting':
           case 'unretweetting':
            ele = $(`<li>${i18n(type)}${text}...<font></font></li>`);
            break;

           case 'joiningReddit':
           case 'leavingReddit':
            ele = $(`<li>${i18n(type)}[<a href="https://www.reddit.com/r/${text}/" target="_blank">${text}</a>]...<font></font></li>`);
            break;

           case 'followingRedditUser':
           case 'unfollowingRedditUser':
            ele = $(`<li>${i18n(type)}[<a href="https://www.reddit.com/user/${text === null || text === void 0 ? void 0 : text.replace('u_', '')}" target="_blank">
      ${text === null || text === void 0 ? void 0 : text.replace('u_', '')}</a>]...<font></font></li>`);
            break;

           case 'followingYtbChannel':
           case 'unfollowingYtbChannel':
            ele = $(`<li>${i18n(type)}[<a href="https://www.youtube.com/channel/${text}" target="_blank">${text}</a>]...<font></font></li>`);
            break;

           case 'likingYtbVideo':
           case 'unlikingYtbVideo':
            ele = $(`<li>${i18n(type)}[<a href="https://www.youtube.com/watch?v=${text}" target="_blank">${text}</a>]...<font></font></li>`);
            break;

           case 'gettingVkId':
           case 'joiningVkGroup':
           case 'leavingVkGroup':
           case 'joiningVkPublic':
           case 'leavingVkPublic':
           case 'sendingVkWall':
           case 'deletingVkWall':
            ele = $(`<li>${i18n(type)}[<a href="https://vk.com/${text}/" target="_blank">${text}</a>]...<font></font></li>`);
            break;

           case 'visitingLink':
            ele = $(`<li>${i18n('visitingLink')}[<a href="${text}" target="_blank">${text}</a>]...<font></font></li>`);
            break;

           case 'verifyingInsAuth':
           case 'text':
            ele = $(`<li>${i18n(text)}<font></font></li>`);
            break;

           case 'html':
            ele = $(text || html);
            break;

           case 'whiteList':
            ele = $(`<li><font class="warning">${i18n('skipTask')}[${text}(${id})](${i18n('whiteList')})</font></li>`);
            break;

           case 'globalOptionsSkip':
            ele = $(`<li>${i18n('skipTaskOption')}<font class="warning">${text}</font></li>`);
            break;

           default:
            ele = $(`<li>${i18n('unKnown')}:${type}(${text})...<font></font></li>`);
            break;
          }
        } else if (text) {
          ele = $(`<li>${i18n(text)}<font></font></li>`);
        } else if (html) {
          ele = $(html);
        } else {
          ele = $('<li><font></font></li>');
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
        return emptyStatus;
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
    const getUuid = () => {
      const uuidUrl = URL.createObjectURL(new Blob()).toString();
      return uuidUrl.slice(uuidUrl.lastIndexOf('/') + 1);
    };
    const stringToColour = str => {
      try {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
          hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        let colour = '#';
        for (let i = 0; i < 3; i++) {
          const value = hash >> i * 8 & 255;
          colour += `00${value.toString(16)}`.slice(-2);
        }
        return colour;
      } catch (error) {
        throwError(error, 'stringToColour');
        return '#fff';
      }
    };
    const defaultGlobalOptions = {
      doTask: {
        discord: {
          servers: true
        },
        instagram: {
          users: true
        },
        twitch: {
          channels: true
        },
        twitter: {
          users: true,
          retweets: true
        },
        vk: {
          names: true
        },
        youtube: {
          channels: true,
          likes: true
        },
        reddit: {
          reddits: true
        },
        steam: {
          groups: true,
          officialGroups: true,
          wishlists: true,
          follows: true,
          forums: true,
          workshops: true,
          curators: true,
          workshopVotes: true,
          announcements: true,
          licenses: true,
          playtests: true
        }
      },
      undoTask: {
        discord: {
          servers: true
        },
        instagram: {
          users: true
        },
        twitch: {
          channels: true
        },
        twitter: {
          users: true,
          retweets: true
        },
        vk: {
          names: true
        },
        youtube: {
          channels: true,
          likes: true
        },
        reddit: {
          reddits: true
        },
        steam: {
          groups: true,
          officialGroups: true,
          wishlists: true,
          follows: true,
          forums: true,
          workshops: true,
          curators: true
        }
      },
      position: {
        buttonSideX: 'right',
        buttonSideY: 'top',
        buttonDistance: '15,30',
        showButtonSideX: 'right',
        showButtonSideY: 'top',
        showButtonDistance: '15,30',
        logSideX: 'right',
        logSideY: 'bottom',
        logDistance: '10,10'
      },
      hotKey: {
        doTaskKey: 'alt + d',
        undoTaskKey: 'alt + u',
        toggleLogKey: 'alt + l'
      },
      other: {
        twitterVerifyId: '783214',
        youtubeVerifyChannel: 'UCrXUsMBcfTVqwAS7DKg9C0Q',
        autoUpdateSource: 'jsdelivr',
        language: 'zh',
        checkLogin: true,
        checkLeftKey: true,
        defaultShowButton: true,
        defaultShowLog: true,
        debug: false,
        receivePreview: true
      }
    };
    const userDefinedGlobalOptions = GM_getValue('globalOptions') || {};
    const assignObject = (obj1, obj2) => {
      try {
        const newObj = {};
        for (const [ key, value ] of Object.entries(obj1)) {
          if (Object.prototype.toString.call(value) === '[object Object]' && Object.prototype.toString.call(obj2[key]) === '[object Object]') {
            newObj[key] = assignObject(value, obj2[key]);
          } else {
            newObj[key] = obj2[key] ?? value;
          }
        }
        return newObj;
      } catch (error) {
        throwError(error, 'assignObject');
        return defaultGlobalOptions;
      }
    };
    const globalOptions = assignObject(defaultGlobalOptions, userDefinedGlobalOptions);
    const saveData = () => {
      try {
        const data = {};
        $('#globalOptionsForm').serializeArray().map(value => {
          data[value.name] = value.value;
          return value;
        });
        $.makeArray($('#globalOptionsForm input')).map(element => {
          const name = $(element).attr('name');
          const keys = name.split('.');
          if (keys.length === 3) {
            globalOptions[keys[0]][keys[1]][keys[2]] = data[name] ? data[name] === 'on' ? true : data[name] : false;
          } else if (keys.length === 2) {
            globalOptions[keys[0]][keys[1]] = data[name] ? data[name] === 'on' ? true : data[name] : false;
          }
          return element;
        });
        GM_setValue('globalOptions', globalOptions);
        external_Swal_default().fire({
          title: i18n('changeGlobalOptionsSuccess'),
          icon: 'success'
        });
      } catch (error) {
        throwError(error, 'saveData');
      }
    };
    const changeGlobalOptions = showType => {
      try {
        let globalOptionsForm = `<form id="globalOptionsForm" class="auto-task-form">
      <table class="auto-task-table"><thead><tr><td>${i18n('type')}</td><td>${i18n('option')}</td><td>${i18n('value')}</td></tr></thead><tbody>`;
        for (const [ type, data1 ] of Object.entries(globalOptions)) {
          for (const [ option, data2 ] of Object.entries(data1)) {
            if ([ 'other', 'position', 'hotKey' ].includes(type)) {
              if (typeof data2 === 'boolean') {
                globalOptionsForm += `<tr style="background-color: ${stringToColour(type)}44">${Object.keys(data1).indexOf(option) === 0 ? `<th rowspan="${Object.keys(data1).length}">${i18n(type)}</th>` : ''}<td>${i18n(option)}</td><td><label><input type="checkbox" name="${type}.${option}"${data2 ? ' checked="checked"' : ''}/><span><i></i></span></label></td></tr>`;
              } else {
                globalOptionsForm += `<tr style="background-color: ${stringToColour(type)}44">${Object.keys(data1).indexOf(option) === 0 ? `<th rowspan="${Object.keys(data1).length}" style="background-color: ${stringToColour(type)}66">${i18n(type)}</th>` : ''}<td>${i18n(option)}</td><td><input class="editOption" type="text" name="${type}.${option}" value="${data2}"/></td></tr>`;
              }
            } else {
              for (const [ socialType, data3 ] of Object.entries(data2)) {
                globalOptionsForm += `<tr style="background-color: ${stringToColour(option)}66">${Object.keys(data1).indexOf(option) === 0 ? `<th rowspan="${Object.keys(data1).map(key => Object.keys(data1[key]).length).reduce((acr, cur) => acr + cur)}" style="background-color: ${stringToColour(type)}66">${i18n(type)}</th>` : ''}<td>${option}.${i18n(socialType)}</td><td><label><input type="checkbox" name="${type}.${option}.${socialType}"${data3 ? ' checked="checked"' : ''}/><span><i></i></span></label></td></tr>`;
              }
            }
          }
        }
        globalOptionsForm += '</tbody></table></form>';
        if (showType === 'swal') {
          external_Swal_default().fire({
            title: i18n('globalOptions'),
            html: globalOptionsForm,
            showConfirmButton: true,
            confirmButtonText: i18n('save'),
            showCancelButton: true,
            cancelButtonText: i18n('close')
          }).then(_ref => {
            let {
              isConfirmed
            } = _ref;
            if (isConfirmed) {
              saveData();
            }
          });
        } else {
          $('body').append(`<h2>${i18n('globalOptions')}</h2>${globalOptionsForm}`);
        }
      } catch (error) {
        throwError(error, 'changeGlobalOptions');
      }
    };
    const data = {
      website: '网站',
      type: '类型',
      edit: '编辑',
      whiteList: '白名单',
      skipTask: '跳过撤销任务',
      whiteListOptions: '白名单设置',
      changeWhiteListOption: '设置白名单(%0)',
      whiteListNotFound: '找不到此项白名单: %0',
      changeWhiteListSuccess: '白名单修改成功，刷新生效！',
      changeWebsiteOptions: '网站设置',
      changeGlobalOptions: '全局设置',
      ok: '是',
      save: '保存',
      close: '关闭',
      return: '返回',
      option: '选项',
      value: '值',
      websiteOptions: '当前网站设置',
      changeWebsiteOptionsSuccess: '更改当前网站设置成功，刷新生效！',
      changeGlobalOptionsSuccess: '更改全局设置成功，刷新生效！',
      needLogin: '请先登录！',
      getTasksInfo: '正在获取并处理任务信息...',
      gettingKey: '正在获取Key...',
      verifyingTask: '正在验证任务',
      notice: '自动任务脚本提醒',
      noKeysLeft: '此页面已经没有剩余key了，是否关闭？',
      giveawayEnded: '此活动已结束，是否关闭？',
      giveawayNotWork: '此活动因某些原因(已结束/暂停/未开始...)不可用(如果是脚本误判请及时反馈)，是否关闭？',
      confirm: '确定',
      cancel: '取消',
      unKnown: '未知',
      unKnownTaskType: '未识别的任务',
      doing: '正在做任务',
      allTasksComplete: '所有任务已完成！',
      getTaskIdFailed: '获取任务Id失败！',
      initSuccess: '%0 初始化成功！',
      initFailed: '%0 初始化失败！',
      errorLink: '链接错误: %0',
      needInit: '请先初始化',
      verifyingAuth: '正在验证%0凭证...',
      updatingAuth: '正在更新%0凭证...',
      initing: '正在初始化...',
      getFailed: '获取%0失败！',
      checkLoginFailed: '检测登录状态失败！',
      checkLeftKeyFailed: '检测剩余Key失败！',
      userId: '用户Id',
      joiningGiveaway: '正在加入赠Key',
      needJoinGiveaway: '需要先加入赠Key',
      cannotUndo: '此网站不支持取消任务',
      verifyAuth: '正在验证 %0 凭证...',
      closePageNotice: '如果此页面没有自动关闭，请自行关闭本页面。',
      errorReport: '检测到脚本报错，是否前往反馈BUG？',
      visitingLink: '正在访问链接: ',
      doTask: '做任务',
      undoTask: '撤销任务',
      verifyTask: '验证任务',
      getKey: '获取Key',
      selectAll: '全选',
      selectNone: '全不选',
      invertSelect: '反选',
      doFreeTask: '加入免费赠品',
      doPointTask: '加入点数赠品',
      skipTaskOption: '设置中已配置跳过任务',
      other: '其他',
      globalOptions: '全局设置',
      checkLogin: '登录检测</br>需要登录的网站自动登录，部分本网站支持',
      checkLeftKey: '剩余Key检测</br>赠Key活动结束提示是否关闭，部分本网站支持',
      twitterVerifyId: '通过尝试关注该账号验证Twitter凭证</br>默认为Twitter官方帐号 783214</br>不想关注官方账号可以改为自己的帐号',
      youtubeVerifyChannel: '通过尝试订阅该频道验证YouTube凭证</br>默认为YouTube官方频道 UCrXUsMBcfTVqwAS7DKg9C0Q</br>不想关注官方频道可以改为自己的频道',
      autoUpdateSource: '更新源</br>github: 需代理，实时更新</br>jsdelivr: 可不用代理，更新有延迟</br>standby: 备用</br>auto: 依次使用github, jsdelivr, standby源进行尝试更新',
      saveGlobalOptions: '保存全局设置',
      settingPage: '设置页面',
      name: '名称',
      version: '版本',
      scriptManager: '脚本管理器',
      script: '脚本',
      environment: '环境',
      os: '系统',
      browser: '浏览器',
      getId: '获取 %0 id',
      getTwitterUserId: '获取Twitter用户id(获取id功能仅在设置页面可用)',
      getYoutubeChannelId: '获取Youtube频道id(获取id功能仅在设置页面可用)',
      showButton: '显示按钮',
      hideButton: '隐藏按钮',
      showLog: '显示日志',
      hideLog: '隐藏日志',
      defaultShowButton: '默认显示按钮',
      defaultShowLog: '默认显示日志',
      debug: '输出调试日志，不要开启此选项！',
      receivePreview: '接收预览版更新',
      position: '组件位置',
      buttonSideX: '按钮区域水平方向定位(实时预览功能仅在设置页面可用)</br>left: 靠左 | right: 靠右',
      buttonSideY: '按钮区域垂直方向定位(实时预览功能仅在设置页面可用)</br>top: 靠上 | bottom: 靠下',
      buttonDistance: '按钮区域距边缘的距离(实时预览功能仅在设置页面可用)</br>格式: X距离,Y距离',
      showButtonSideX: '显示按钮水平方向定位(实时预览功能仅在设置页面可用)</br>left: 靠左 | right: 靠右',
      showButtonSideY: '显示按钮垂直方向定位(实时预览功能仅在设置页面可用)</br>top: 靠上 | bottom: 靠下',
      showButtonDistance: '显示按钮距边缘的距离(实时预览功能仅在设置页面可用)</br>格式: X距离,Y距离',
      logSideX: '日志区域水平方向定位(实时预览功能仅在设置页面可用)</br>left: 靠左 | right: 靠右',
      logSideY: '日志区域垂直方向定位(实时预览功能仅在设置页面可用)</br>top: 靠上 | bottom: 靠下',
      logDistance: '日志区域距边缘的距离(实时预览功能仅在设置页面可用)</br>格式: X距离,Y距离',
      hotKey: '快捷键',
      doTaskKey: '做任务快捷键</br>(实时预览功能仅在设置页面可用)',
      undoTaskKey: '撤销任务快捷键</br>(实时预览功能仅在设置页面可用)',
      toggleLogKey: '显示/隐藏日志快捷键</br>(实时预览功能仅在设置页面可用)',
      tasksHistory: '任务历史',
      clearHistory: '清空历史',
      clearHistoryFinished: '已清空任务历史！',
      deleteTask: '删除任务',
      lastChangeTime: '最后一次修改时间',
      clearTaskFinished: '删除以下任务完成！',
      clearTaskFailed: '删除任务失败，没有找到任务名！',
      syncData: '数据同步',
      settingData: '正在上传数据...',
      gettingData: '正在获取数据...',
      help: '帮助',
      fileName: '文件名',
      upload2gist: '同步到Gist',
      downloadFromGist: '从Gist同步',
      saveAndTest: '保存配置并测试',
      testSuccess: '测试成功！',
      testFailed: '测试失败！',
      saveAndTestNotice: '请先保存配置并测试！',
      processingData: '正在处理数据...',
      updatingData: '正在上传数据...',
      syncDataSuccess: '同步数据成功！',
      syncDataFailed: '同步数据失败，请在控制台查看错误信息！',
      downloadingData: '正在下载数据...',
      checkedNoData: '没有检测到远程数据，请确认配置是否正确！',
      savingData: '正在保存数据...',
      syncHistory: '同步任务历史',
      checkUpdateFailed: '检测更新失败',
      newVersionNotice: '检测到新版本V%0, <a class="high-light" href="%1" target="_blank">点此更新</a>',
      language: '语言</br>目前仅支持zh: 中文, en: 英文',
      gistOptions: 'Gist 设置',
      swalNotice: '检测到您第一次安装V4版本脚本，请前往阅读用前必读内容！',
      echoNotice: '检测到您第一次安装V4版本脚本，请<a class="high-light" href="%0" target="_blank">点此前往</a>阅读用前必读内容！',
      noticeLink: 'https://auto-task-doc.js.org/guide/#用前必读',
      toGithub: '前往Github反馈',
      toKeylol: '前往其乐论坛反馈',
      copySuccess: '错误信息已复制到剪切板，是否前往其乐论坛反馈？',
      copyFailed: '请复制下方错误信息后前往Keylol论坛反馈！',
      updateText: '%0 版本更新内容：',
      Active: '进行中',
      Ended: '已结束',
      Banned: '已封禁',
      Paused: '已暂停',
      notStart: '未开始',
      noRemoteData: '检测到远程无数据',
      errorRemoteDataFormat: '远程数据格式错误',
      updateHistory: '历史更新记录<a class="high-light" href="https://auto-task-doc.js.org/logs/" target="_blank">点此查看</a>',
      groups: '组',
      officialGroups: '官方组',
      wishlists: '愿望单',
      follows: '游戏关注',
      forums: '论坛',
      workshops: '创意工坊收藏',
      curators: '鉴赏家',
      workshopVotes: '创意工坊点赞',
      announcements: '社区通知',
      steamCommunity: 'Steam社区',
      steamStore: 'Steam商店',
      licenses: '入库免费游戏',
      playtests: '请求访问权限',
      needLoginSteamStore: '请先<a href="https://store.steampowered.com/login/" target="_blank">登录Steam商店</a>',
      needLoginSteamCommunity: '请先<a href="https://steamcommunity.com/login/home/" target="_blank">登录Steam社区</a>',
      joiningSteamGroup: '正在加入Steam组',
      leavingSteamGroup: '正在退出Steam组',
      gettingSteamGroupId: '正在获取Steam组Id',
      joiningSteamOfficialGroup: '正在加入Steam官方组',
      leavingSteamOfficialGroup: '正在退出Steam官方组',
      gettingSteamOfficialGroupId: '正在获取Steam官方组Id',
      subscribingForum: '正在订阅Steam论坛',
      unsubscribingForum: '正在取消订阅Steam论坛',
      gettingForumId: '正在获取Steam论坛Id',
      followingCurator: '正在关注Steam鉴赏家',
      unfollowingCurator: '正在取关Steam鉴赏家',
      gettingCuratorId: '正在获取Steam鉴赏家Id',
      addingToWishlist: '正在添加游戏到Steam愿望单',
      removingFromWishlist: '正在从Steam愿望单移除游戏',
      followingGame: '正在关注Steam游戏',
      unfollowingGame: '正在取关Steam游戏',
      favoritingWorkshop: '正在收藏Steam创意工坊物品',
      unfavoritingWorkshop: '正在取消收藏Steam创意工坊物品',
      gettingWorkshopAppId: '正在获取Steam创意工坊物品Id',
      votingUpWorkshop: '正在点赞Steam创意工坊物品',
      gettingAnnouncementParams: '正在获取Steam通知信息',
      likingAnnouncement: '正在点赞Steam通知',
      changingArea: '正在更换Steam地区: %0...',
      notNeededChangeArea: '当前地区不需要更换',
      noAnotherArea: '请检测是否开启正确开启代理',
      gettingAreaInfo: '正在获取Steam地区信息...',
      changeAreaNotice: '疑似锁区游戏，尝试换区执行',
      steamFinishNotice: 'Steam任务完成，尝试将购物车地区换回CN',
      gettingSubid: '正在获取游戏subid',
      addingFreeLicense: '正在入库',
      missParams: '缺少参数',
      gettingLicenses: '正在获取Licenses...',
      requestingPlayTestAccess: '正在请求访问权限',
      tryChangeAreaNotice: '此功能无法检测游戏是否限区，因此会尝试换区后再入库，换区失败也不影响后续入库',
      servers: '服务器',
      joiningDiscordServer: '正在加入Discord服务器',
      leavingDiscordServer: '正在退出Discord服务器',
      gettingDiscordGuild: '正在获取Discord服务器Id',
      getDiscordAuthFailed: '获取Discord凭证失败，请检测Discord帐号是否已登录',
      discordImportantNotice: '重要提醒！！！',
      discordImportantNoticeText: '由于Discord网站后台更新，目前使用此脚本加组后可能会导致Discord帐号被强制退出，且需要两步验证才能正常登录，请谨慎使用！！！',
      continue: '继续',
      skipDiscordTask: '跳过Discord任务',
      continueAndDontRemindAgain: '继续且不再提醒',
      users: '用户',
      loginIns: '请先<a href="https://www.instagram.com/accounts/login/" target="_blank">登录Instagram</a>',
      insBanned: '您的Instagram账户已被封禁',
      verifyingInsAuth: '正在验证Instagram凭证...',
      gettingInsUserId: '正在获取Instagram用户Id',
      followingIns: '正在关注Instagram用户',
      unfollowingIns: '正在取关Instagram用户',
      reddits: '社区/用户',
      loginReddit: '请先<a href="https://www.reddit.com/login/" target="_blank">登录Reddit</a>',
      changingRedditVersion: '正在切换Reddit为新版页面...',
      joiningReddit: '正在加入Reddit社区',
      leavingReddit: '正在退出Reddit社区',
      followingRedditUser: '正在关注Reddit用户',
      unfollowingRedditUser: '正在取关Reddit用户',
      channels: '频道',
      followingTwitchChannel: '正在关注Twitch频道',
      unfollowingTwitchChannel: '正在取关Twitch频道',
      gettingTwitchChannelId: '正在获取Twitch频道Id',
      twitterUser: '推特用户',
      retweets: '转推',
      gettingTwitterUserId: '正在获取推特用户Id',
      followingTwitterUser: '正在关注推特用户',
      unfollowingTwitterUser: '正在取关推特用户',
      retweetting: '正在转推',
      unretweetting: '正在撤销转推',
      names: '组/社区/动态',
      loginVk: '请先<a href="https://vk.com/login/" target="_blank">登录Vk</a>',
      gettingVkId: '正在获取Vk任务Id',
      joiningVkGroup: '正在加入Vk组',
      leavingVkGroup: '正在退出Vk组',
      joiningVkPublic: '正在加入Vk社区',
      leavingVkPublic: '正在退出Vk社区',
      sendingVkWall: '正在转发Vk动态',
      deletingVkWall: '正在撤销转发Vk动态',
      youtubeChannel: 'YouTube频道',
      likes: '点赞',
      loginYtb: '请先<a href="https://accounts.google.com/ServiceLogin?service=youtube" target="_blank">登录YouTube</a>',
      tryUpdateYtbAuth: '请尝试<a href="https://www.youtube.com/#auth" target="_blank">更新YouTube凭证</a>',
      gettingYtbToken: '正在获取YouTube Token...',
      followingYtbChannel: '正在订阅YouTube频道',
      unfollowingYtbChannel: '正在退订YouTube频道',
      likingYtbVideo: '正在点赞YouTube视频',
      unlikingYtbVideo: '正在取消点赞YouTube视频',
      giveKeyNoticeBefore: '每次验证间隔15s',
      giveKeyNoticeAfter: '如果没有key, 请在<a href="https://givekey.ru/profile" target="_blank">https://givekey.ru/profile</a>查看',
      noPoints: '点数不够，跳过抽奖',
      getNeedPointsFailed: '获取所需点数失败，跳过抽奖',
      joiningLottery: '正在加入抽奖',
      doingGleamTask: '正在做Gleam任务...',
      gettingGleamLink: '正在获取Gleam任务链接...',
      gleamTaskNotice: '如果此页面长时间未关闭，请完成任一任务后自行关闭！',
      verifiedGleamTasks: '已尝试验证所有任务，验证失败的任务请尝试手动验证或完成！',
      gsNotice: '为避免得到"0000-0000-0000"key, 已自动屏蔽"Grab Key"按钮，获取key时请关闭脚本！',
      giveeClubVerifyNotice: '正在验证任务...',
      giveeClubVerifyFinished: '请等待验证完成后自行加入赠Key',
      SweepWidgetNotice: '正在处理并验证任务，每次验证任务有1~3s间隔防止触发验证过快警告...'
    };
    const zh_CN = data;
    const en_US_data = {
      website: 'Website',
      type: 'Type',
      edit: 'Edit',
      whiteList: 'Whitelist',
      skipTask: 'Skip undo task',
      whiteListOptions: 'Whitelist options',
      changeWhiteListOption: 'Whitelist option(%0)',
      whiteListNotFound: 'Cannot find this whitelist: %0',
      changeWhiteListSuccess: 'The whitelist is successfully modified, and the page refresh will take effect!',
      changeWebsiteOptions: 'Website options',
      changeGlobalOptions: 'Global options',
      ok: 'OK',
      save: 'Save',
      close: 'Close',
      return: 'Return',
      option: 'Option',
      value: 'Value',
      websiteOptions: 'Current website settings',
      changeWebsiteOptionsSuccess: 'The current website setting is changed successfully, and the page refresh will take effect!',
      changeGlobalOptionsSuccess: 'The global setting is changed successfully, and the refresh will take effect!',
      needLogin: 'Please log in first!',
      getTasksInfo: 'Obtaining and processing task information...',
      gettingKey: 'Getting Key...',
      verifyingTask: 'Verifying task',
      notice: 'Automatic task script notice',
      noKeysLeft: 'There are no more keys left on this page. Do you want to close it?',
      giveawayEnded: 'This event has ended, do you want to close it?',
      giveawayNotWork: 'This activity is unavailable for some reasons (banned/ended/paused/not started...)' + ' (if it is a script misjudgment, please give us feedback in time), is it closed?',
      confirm: 'Confirm',
      cancel: 'Cancel',
      unKnown: 'Unknown',
      unKnownTaskType: 'Unrecognized task',
      doing: 'Doing a task',
      allTasksComplete: 'All tasks have been completed!',
      getTaskIdFailed: 'Failed to obtain task Id!',
      initSuccess: '%0 was initialized successfully!',
      initFailed: '%0 initialization failed!',
      errorLink: 'Link error: %0',
      needInit: 'Please initialize first',
      verifyingAuth: 'Verifying %0 token...',
      updatingAuth: 'Update %0 token...',
      initing: 'Initializing...',
      getFailed: 'Failed to get %0!',
      checkLoginFailed: 'Failed to detect login status!',
      checkLeftKeyFailed: 'Failed to detect the remaining keys!',
      userId: 'User Id',
      joiningGiveaway: 'Joining giveaway',
      needJoinGiveaway: 'Need to join the giveaway first',
      cannotUndo: 'This website does not support canceling tasks',
      verifyAuth: 'Verifying %0 token...',
      closePageNotice: 'f this page does not close automatically, please close this page yourself.',
      errorReport: 'A script error is detected, do you want to report the BUG?',
      visitingLink: 'Visiting link: ',
      doTask: 'DoTask',
      undoTask: 'UndoTask',
      verifyTask: 'Verify',
      getKey: 'GetKey',
      selectAll: 'SelectAll',
      selectNone: 'SelectNone',
      invertSelect: 'InvertSelect',
      doFreeTask: 'FreeTask',
      doPointTask: 'PointTask',
      skipTaskOption: 'Skip task has been configured in the settings',
      other: 'Other',
      globalOptions: 'Global Options',
      checkLogin: 'Login detection</br>Need to log in to the website automatically log in, part of this website supports.',
      checkLeftKey: 'Key remaining detection</br>The end of the giveaway event prompts whether to close or not, part of this website supports.',
      twitterVerifyId: 'Verify Twitter token by trying to follow the account.</br>The default is the official Twitter account 783214.</br>' + 'If you don\'t want to follow the official account, you can change it to your own account.',
      youtubeVerifyChannel: 'Verify YouTube token by trying to subscribe to the channel.</br>' + 'The default is the official YouTube channel UCrXUsMBcfTVqwAS7DKg9C0Q.</br>' + 'If you don\'t want to follow the official channel, you can change it to your own channel.',
      autoUpdateSource: 'The source to update</br>github: Fast update.</br>jsdelivr: Update is delayed.</br>' + 'standby: Standby source.</br>auto: Try to update using github, jsdelivr, standby sources in turn.',
      saveGlobalOptions: 'SaveSettings',
      settingPage: 'Setting Page',
      name: 'Name',
      version: 'Version',
      scriptManager: 'Script Manager',
      script: 'Script',
      environment: 'Environment',
      os: 'OS',
      browser: 'Browser',
      getId: 'Get %0 id',
      getTwitterUserId: 'Get Twitter user id (Get id function is only available on the settings page).',
      getYoutubeChannelId: 'Get Youtube channel id (Get id function is only available on the settings page).',
      showButton: 'ShowButton',
      hideButton: 'HideButton',
      showLog: 'ShowLog',
      hideLog: 'HideLog',
      defaultShowButton: 'Default display button',
      defaultShowLog: 'Display log by default',
      debug: 'Output debug log, do not enable this option!',
      receivePreview: 'Receive preview updates',
      position: 'Component position',
      buttonSideX: 'Horizontal positioning of the button area (real-time preview function is only available on the setting page).' + '</br>left: left | right: right',
      buttonSideY: 'The button area is positioned in the vertical direction (real-time preview function is only available on the settings page).' + '</br>top: top | bottom: bottom',
      buttonDistance: 'The distance between the button area and the edge (the real-time preview function is only available on the setting page).' + '</br> Format: X distance, Y distance',
      showButtonSideX: 'ShowButton horizontal positioning (real-time preview function is only available on the setting page).' + '</br>left: left | right: right',
      showButtonSideY: 'ShowButton vertical positioning (real-time preview function is only available on the setting page).' + '</br>top: top | bottom: bottom',
      showButtonDistance: 'The distance between the ShowButton and the edge (real-time preview function is only available on the setting page).' + '</br> Format: X distance, Y distance',
      logSideX: 'Horizontal positioning of the log area (real-time preview function is only available on the setting page).' + '</br>left: left | right: right',
      logSideY: 'Vertical positioning of the log area (real-time preview function is only available on the setting page).' + '</br>top: top | bottom: bottom',
      logDistance: 'The distance between the log area and the edge (the real-time preview function is only available on the setting page).' + '</br> Format: X distance, Y distance',
      hotKey: 'Shortcut key',
      doTaskKey: 'DoTask shortcut keys</br> (real-time preview function is only available on the settings page).',
      undoTaskKey: 'UndoTask shortcut keys</br> (real-time preview function is only available on the settings page).',
      toggleLogKey: 'ShowLog/HideLog shortcut keys</br> (real-time preview function is only available on the settings page).',
      tasksHistory: 'TasksHistory',
      clearHistory: 'Clear history',
      clearHistoryFinished: 'The mission history has been cleared!',
      deleteTask: 'Delete task',
      lastChangeTime: 'Last Change Time',
      clearTaskFinished: 'Delete the following tasks completed!',
      clearTaskFailed: 'Failed to delete the task, the task name was not found!',
      syncData: 'DataSync',
      settingData: 'Uploading data...',
      gettingData: 'Getting data...',
      help: 'Help',
      fileName: 'Filename',
      upload2gist: 'Sync to Gist',
      downloadFromGist: 'Sync from Gist',
      saveAndTest: 'Save configuration and test',
      testSuccess: 'Test success!',
      testFailed: 'Test failed!',
      saveAndTestNotice: 'Please save the configuration and test first!',
      processingData: 'Processing data...',
      updatingData: 'Uploading data...',
      syncDataSuccess: 'Synchronized data successfully!',
      syncDataFailed: 'Failed to synchronize data, please check the error message on the console!',
      downloadingData: 'Downloading data...',
      checkedNoData: 'No remote data is detected, please confirm whether the configuration is correct!',
      savingData: 'Saving data...',
      syncHistory: 'Synchronize tasks history',
      checkUpdateFailed: 'Check update failed',
      newVersionNotice: 'Checked a new version V%0, <a class="high-light" href="%1" target="_blank">click to update</a>',
      language: 'Language</br> Currently only supports zh: Chinese, en: English',
      gistOptions: 'Gist Settings',
      swalNotice: 'It is detected that you are installing the V4 version script for the first time' + ', please go to read the READ ME FIRST content before use!',
      echoNotice: 'It is detected that you are installing the V4 version script for the first time' + ', please <a class="high-light" href="%0" target="_blank">click here</a> to read the READ ME FIRST content before use!',
      noticeLink: 'https://auto-task-doc.js.org/en/guide/#read-me-first',
      toGithub: 'Feedback(Github)',
      toKeylol: 'Feedback(Keylol)',
      copySuccess: 'The error message has been copied to the clipboard. Do you want to go to the Keylol forum to give feedback?',
      copyFailed: 'Please copy the error information below and report back to the Keylol forum!',
      updateText: 'Updates in version %0:',
      Active: 'Active',
      Ended: 'Ended',
      Banned: 'Banned',
      Paused: 'Paused',
      notStart: 'notStart',
      noRemoteData: 'No data remotely',
      errorRemoteDataFormat: 'Remote data has wrong format',
      updateHistory: '<a class="high-light" href="https://auto-task-doc.js.org/logs/" target="_blank">Click here</a>' + ' to view the historical update record.',
      groups: 'Group',
      officialGroups: 'Official Group',
      wishlists: 'Wishlist',
      follows: 'Follow Game',
      forums: 'Forum',
      workshops: 'Favorite Workshop',
      curators: 'Curator',
      workshopVotes: 'Voteup Workshop',
      announcements: 'Announcement',
      steamCommunity: 'Steam Community',
      steamStore: 'Steam Store',
      licenses: 'Add License',
      playtests: 'Playtest Access',
      needLoginSteamStore: 'Please <a href="https://store.steampowered.com/login/" target="_blank">log in to the Steam Store</a>',
      needLoginSteamCommunity: 'Please <a href="https://steamcommunity.com/login/home/" target="_blank">log in to the Steam Community</a>',
      joiningSteamGroup: 'Joining Steam Group',
      leavingSteamGroup: 'Leaving Steam Group',
      gettingSteamGroupId: 'Getting Steam Group Id',
      joiningSteamOfficialGroup: 'Joining Steam Official Group',
      leavingSteamOfficialGroup: 'Leaving Steam Official Group',
      gettingSteamOfficialGroupId: 'Getting Steam Official Group Id',
      subscribingForum: 'Subscribing the Steam Forum',
      unsubscribingForum: 'Unsubscribing the Steam Forum',
      gettingForumId: 'Getting Steam Forum Id',
      followingCurator: 'Following Steam Curator',
      unfollowingCurator: 'Unfollowing Steam Curator',
      gettingCuratorId: 'Getting Steam Curator Id',
      addingToWishlist: 'Adding the game to the Steam wishlist',
      removingFromWishlist: 'Removing the game from the Steam wishlist',
      followingGame: 'Following Steam games',
      unfollowingGame: 'Unfollowing Steam games',
      favoritingWorkshop: 'Favouring Steam Workshop Items',
      unfavoritingWorkshop: 'Unfavoriting Steam Workshop Items',
      gettingWorkshopAppId: 'Getting Steam Workshop Item Id',
      votingUpWorkshop: 'Liking Steam workshop items',
      gettingAnnouncementParams: 'Getting Steam announcement information',
      likingAnnouncement: 'Liking Steam announcement',
      changingArea: 'Changing Steam area: %0...',
      notNeededChangeArea: 'The current area does not need to be changed',
      noAnotherArea: 'Please check whether the proxy is turned on correctly',
      gettingAreaInfo: 'Getting Steam area information...',
      changeAreaNotice: 'Suspected of a locked zone game, try to change the zone to execute',
      steamFinishNotice: 'Steam task completed, try to change the shopping cart area back to CN',
      gettingSubid: 'Getting subid',
      addingFreeLicense: 'Adding free license',
      missParams: 'Missing parameters',
      gettingLicenses: 'Getting licenses...',
      requestingPlayTestAccess: 'Requesting play test access',
      tryChangeAreaNotice: 'This function cannot detect whether the game is limited, so it will try to change the area before entering the library' + '. Failure to change the area will not affect the subsequent storage.',
      servers: 'Server',
      joiningDiscordServer: 'Joining Discord Server',
      leavingDiscordServer: 'Leaving Discord Server',
      gettingDiscordGuild: 'Getting Discord server Id',
      getDiscordAuthFailed: 'Failed to get Discord token, please check whether the Discord account is logged in',
      discordImportantNotice: 'Important Reminder! ! !',
      discordImportantNoticeText: 'Due to the background update of the Discord website, currently using this script to join a group may cause the Discord account to be forcibly logged out, and two-step verification is required to log in normally, please use it with caution! ! !',
      continue: 'Continue',
      skipDiscordTask: 'Skip',
      continueAndDontRemindAgain: 'Continue without Reminders',
      users: 'User',
      loginIns: 'Please <a href="https://www.instagram.com/accounts/login/" target="_blank">log in to Instagram</a>',
      insBanned: 'Your Instagram account has been banned',
      verifyingInsAuth: 'Verifying Instagram token...',
      gettingInsUserId: 'Getting Instagram user Id',
      followingIns: 'Following Instagram user',
      unfollowingIns: 'Unfollowing Instagram user',
      reddits: 'Reddit/User',
      loginReddit: 'Please <a href="https://www.reddit.com/login/" target="_blank">log in to Reddit</a>',
      changingRedditVersion: 'Switching Reddit to a new version page...',
      joiningReddit: 'Joining the Reddit',
      leavingReddit: 'Leaving the Reddit',
      followingRedditUser: 'Following Reddit User',
      unfollowingRedditUser: 'Unfollowing Reddit User',
      channels: 'Channel',
      followingTwitchChannel: 'Following Twitch Channel',
      unfollowingTwitchChannel: 'Unfollowing Twitch Channel',
      gettingTwitchChannelId: 'Getting Twitch Channel Id',
      twitterUser: 'Twitter User',
      retweets: 'Retweet',
      gettingTwitterUserId: 'Getting Twitter User Id',
      followingTwitterUser: 'Following Twitter User',
      unfollowingTwitterUser: 'Unfollowing Twitter User',
      retweetting: 'Retweetting',
      unretweetting: 'Unretweetting',
      names: 'Group/Public/Wall',
      loginVk: 'Please <a href="https://vk.com/login/" target="_blank">log in to Vk</a>',
      gettingVkId: 'Getting Vk task Id',
      joiningVkGroup: 'Joining Vk Group',
      leavingVkGroup: 'Leaving Vk Group',
      joiningVkPublic: 'Joining Vk Public',
      leavingVkPublic: 'Leaving Vk Public',
      sendingVkWall: 'Sending Vk Wall',
      deletingVkWall: 'Deleting Vk Wall',
      youtubeChannel: 'YouTube Channel',
      likes: 'Like',
      loginYtb: 'Please <a href="https://accounts.google.com/ServiceLogin?service=youtube" target="_blank">log in to YouTube</a>',
      tryUpdateYtbAuth: 'Please try to <a href="https://www.youtube.com/#auth" target="_blank">update YouTube token</a>',
      gettingYtbToken: 'Getting YouTube Token...',
      followingYtbChannel: 'Subscribing to YouTube channel',
      unfollowingYtbChannel: 'Unsubscribing to YouTube channel',
      likingYtbVideo: 'Liking YouTube video',
      unlikingYtbVideo: 'Unliking YouTube video',
      giveKeyNoticeBefore: 'Each verification interval is 15s',
      giveKeyNoticeAfter: 'If there is no key, please check at <a href="https://givekey.ru/profile" target="_blank">https://givekey.ru/profile</a>',
      noPoints: 'Not enough points, skip the lottery',
      getNeedPointsFailed: 'ailed to obtain the required points, skip the lottery',
      joiningLottery: 'Joining the lottery',
      doingGleamTask: 'Doing Gleam Task...',
      gettingGleamLink: 'Getting Gleam task link...',
      gleamTaskNotice: 'If this page has not been closed for a long time, please close it yourself after completing any task!',
      verifiedGleamTasks: 'Attempted to verify all tasks. If the verification fails, please try to verify manually or complete it!',
      gsNotice: 'In order to avoid getting the "0000-0000-0000" key, the "Grab Key" button has been hidden,' + ' please close the script when obtaining the key!',
      giveeClubVerifyNotice: 'Verifying task...',
      giveeClubVerifyFinished: 'Wait for the verification to complete and join it by yourself',
      SweepWidgetNotice: 'The task is being processed and verified. ' + 'There is an interval of 1~3s for each verification task to prevent the triggering of too fast verification warning...'
    };
    const en_US = en_US_data;
    const languages = {
      zh: zh_CN,
      en: en_US
    };
    const language = [ 'zh', 'en' ].includes(globalOptions.other.language) ? globalOptions.other.language : 'en';
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
    function throwError(error, name) {
      if (window.TRACE) {
        console.trace('%cAuto-Task[Debug]:', 'color:blue');
      }
      external_Swal_default().fire({
        title: i18n('errorReport'),
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: i18n('toGithub'),
        showDenyButton: true,
        denyButtonText: i18n('toKeylol'),
        cancelButtonText: i18n('close')
      }).then(_ref => {
        let {
          isDenied,
          isConfirmed
        } = _ref;
        if (isConfirmed) {
          window.open(`https://github.com/HCLonely/auto-task-v4/issues/new?title=${encodeURIComponent(`[BUG] 脚本报错: ${name}`)}&labels=bug&template=bug_report.yml&website=${encodeURIComponent(window.location.href)}&browser=${encodeURIComponent(JSON.stringify((0, 
          javascript_utils_umd_min.ua)(), null, 4))}&manager=${encodeURIComponent(`${GM_info.scriptHandler} ${GM_info.version}`)}&user-script=${encodeURIComponent(GM_info.script.version)}&logs=${encodeURIComponent(error.stack || 'null')}&run-logs=${encodeURIComponent($.makeArray($('#auto-task-info>li')).map(element => element.innerText).join('\n'))}`, '_blank');
        } else if (isDenied) {
          const text = `错误链接: [url=${window.location.href}]${window.location.href}[/url]

环境:

[code]${JSON.stringify((0, javascript_utils_umd_min.ua)(), null, 4)}[/code]

脚本管理器: ${GM_info.scriptHandler} ${GM_info.version}
脚本版本: ${GM_info.script.version}

报错信息:
[code]${error.stack}[/code]

执行日志:
[code]${$.makeArray($('#auto-task-info>li')).map(element => element.innerText).join('\n')}[/code]`;
          GM_setClipboard(text);
          external_Swal_default().fire({
            title: i18n('copySuccess'),
            icon: 'success',
            confirmButtonText: i18n('ok')
          }).then(() => {
            window.open('https://keylol.com/forum.php?mod=post&action=reply&fid=319&tid=777450', '_blank');
          });
        }
      });
      console.log('%c%s', 'color:white;background:red', `Auto-Task[Error]: ${name}\n${error.stack}`);
    }
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
    function _classApplyDescriptorGet(receiver, descriptor) {
      if (descriptor.get) {
        return descriptor.get.call(receiver);
      }
      return descriptor.value;
    }
    function _classPrivateFieldSet(receiver, privateMap, value) {
      var descriptor = _classExtractFieldDescriptor(receiver, privateMap, 'set');
      _classApplyDescriptorSet(receiver, descriptor, value);
      return value;
    }
    function _classExtractFieldDescriptor(receiver, privateMap, action) {
      if (!privateMap.has(receiver)) {
        throw new TypeError('attempted to ' + action + ' private field on non-instance');
      }
      return privateMap.get(receiver);
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
    const defaultTasksTemplate = {
      servers: []
    };
    const defaultTasks = JSON.stringify(defaultTasksTemplate);
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
        Discord_defineProperty(this, 'tasks', JSON.parse(defaultTasks));
        Discord_defineProperty(this, 'whiteList', {
          ...JSON.parse(defaultTasks),
          ...(_GM_getValue = GM_getValue('whiteList')) === null || _GM_getValue === void 0 ? void 0 : _GM_getValue.discord
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
          if (!GM_getValue('dontRemindDiscordAgain')) {
            const result = await external_Swal_default().fire({
              title: i18n('discordImportantNotice'),
              text: i18n('discordImportantNoticeText'),
              showCancelButton: true,
              showDenyButton: true,
              confirmButtonText: i18n('continue'),
              cancelButtonText: i18n('skipDiscordTask'),
              denyButtonText: i18n('continueAndDontRemindAgain')
            }).then(_ref => {
              let {
                isConfirmed,
                isDenied
              } = _ref;
              if (isConfirmed) {
                return true;
              }
              if (isDenied) {
                GM_setValue('dontRemindDiscordAgain', true);
                return true;
              }
              return false;
            });
            if (!result) {
              _classPrivateFieldSet(this, _initialized, false);
              return 'skip';
            }
          }
          if (_classPrivateFieldGet(this, _initialized)) {
            return true;
          }
          if (!_classPrivateFieldGet(this, _auth).auth) {
            if (await _classPrivateMethodGet(this, _updateAuth, _updateAuth2).call(this)) {
              _classPrivateFieldSet(this, _initialized, true);
              return true;
            }
            return false;
          }
          const isVerified = await _classPrivateMethodGet(this, _verifyAuth, _verifyAuth2).call(this);
          if (isVerified) {
            scripts_echoLog({}).success(i18n('initSuccess', 'Discord'));
            _classPrivateFieldSet(this, _initialized, true);
            return true;
          }
          GM_setValue('discordAuth', {
            auth: null
          });
          if (await _classPrivateMethodGet(this, _updateAuth, _updateAuth2).call(this)) {
            scripts_echoLog({}).success(i18n('initSuccess', 'Discord'));
            _classPrivateFieldSet(this, _initialized, true);
            return true;
          }
          scripts_echoLog({}).error(i18n('initFailed', 'Discord'));
          return false;
        } catch (error) {
          throwError(error, 'Discord.init');
          return false;
        }
      }
      async toggle(_ref2) {
        let {
          doTask = true,
          serverLinks = []
        } = _ref2;
        try {
          if (!_classPrivateFieldGet(this, _initialized)) {
            scripts_echoLog({
              text: i18n('needInit')
            });
            return false;
          }
          const prom = [];
          if (doTask && !globalOptions.doTask.discord.servers || !doTask && !globalOptions.undoTask.discord.servers) {
            scripts_echoLog({
              type: 'globalOptionsSkip',
              text: 'discord.servers'
            });
          } else {
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
          text: i18n('verifyingAuth', 'Discord')
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
          text: i18n('updatingAuth', 'Discord')
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
          type: 'joiningDiscordServer',
          text: inviteId
        });
        const {
          result,
          statusText,
          status,
          data
        } = await tools_httpRequest({
          url: `https://discord.com/api/v9/invites/${inviteId}`,
          method: 'POST',
          dataType: 'json',
          headers: {
            authorization: _classPrivateFieldGet(this, _auth).auth,
            origin: 'https://discord.com',
            referer: `https://discord.com/invite/${inviteId}`
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
            text: 'Discord.leaveServer',
            id: inviteId
          });
          return true;
        }
        const guild = await _classPrivateMethodGet(this, _getGuild, _getGuild2).call(this, inviteId);
        if (!guild) {
          return false;
        }
        const logStatus = scripts_echoLog({
          type: 'leavingDiscordServer',
          text: guild
        });
        const {
          result,
          statusText,
          status,
          data
        } = await tools_httpRequest({
          url: `https://discord.com/api/v9/users/@me/guilds/${guild}`,
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
          type: 'gettingDiscordGuild',
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
          url: `https://discord.com/api/v9/invites/${inviteId}`,
          responseType: 'json',
          method: 'GET'
        });
        if (result === 'Success' && (data === null || data === void 0 ? void 0 : data.status) === 200) {
          var _data$response2, _data$response2$guild;
          const guild = (_data$response2 = data.response) === null || _data$response2 === void 0 ? void 0 : (_data$response2$guild = _data$response2.guild) === null || _data$response2$guild === void 0 ? void 0 : _data$response2$guild.id;
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
    const Instagram_defaultTasksTemplate = {
      users: []
    };
    const Instagram_defaultTasks = JSON.stringify(Instagram_defaultTasksTemplate);
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
        Instagram_defineProperty(this, 'tasks', JSON.parse(Instagram_defaultTasks));
        Instagram_defineProperty(this, 'whiteList', {
          ...JSON.parse(Instagram_defaultTasks),
          ...(_GM_getValue = GM_getValue('whiteList')) === null || _GM_getValue === void 0 ? void 0 : _GM_getValue.instagram
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
            scripts_echoLog({}).success(i18n('initSuccess', 'Instagram'));
            Instagram_classPrivateFieldSet(this, Instagram_initialized, true);
            return true;
          }
          scripts_echoLog({}).error(i18n('initFailed', 'Instagram'));
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
              text: i18n('needInit')
            });
            return false;
          }
          const prom = [];
          if (doTask && !globalOptions.doTask.instagram.users || !doTask && !globalOptions.undoTask.instagram.users) {
            scripts_echoLog({
              type: 'globalOptionsSkip',
              text: 'instagram.users'
            });
          } else {
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
          type: name === 'instagram' ? 'verifyingInsAuth' : 'gettingInsUserId',
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
          type: 'followingIns',
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
            text: 'Instagram.unfollowUser',
            id: name
          });
          return true;
        }
        const id = await Instagram_classPrivateMethodGet(this, _getUserInfo, _getUserInfo2).call(this, name);
        if (!id) {
          return false;
        }
        const logStatus = scripts_echoLog({
          type: 'unfollowingIns',
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
    const Reddit_defaultTasksTemplate = {
      reddits: []
    };
    const Reddit_defaultTasks = JSON.stringify(Reddit_defaultTasksTemplate);
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
        Reddit_defineProperty(this, 'tasks', JSON.parse(Reddit_defaultTasks));
        Reddit_defineProperty(this, 'whiteList', {
          ...JSON.parse(Reddit_defaultTasks),
          ...(_GM_getValue = GM_getValue('whiteList')) === null || _GM_getValue === void 0 ? void 0 : _GM_getValue.reddit
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
            scripts_echoLog({}).success(i18n('initSuccess', 'Reddit'));
            Reddit_classPrivateFieldSet(this, Reddit_initialized, true);
            return true;
          }
          scripts_echoLog({}).error(i18n('initFailed', 'Reddit'));
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
              text: 'Reddit.undoTask',
              id: name
            });
            return true;
          }
          let type = doTask ? 'joiningReddit' : 'leavingReddit';
          if (/^u_/.test(name)) {
            type = doTask ? 'followingRedditUser' : 'unfollowingRedditUser';
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
              text: i18n('needInit')
            });
            return false;
          }
          const prom = [];
          if (doTask && !globalOptions.doTask.reddit.reddits || !doTask && !globalOptions.undoTask.reddit.reddits) {
            scripts_echoLog({
              type: 'globalOptionsSkip',
              text: 'reddit.reddits'
            });
          } else {
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
          text: i18n('changingRedditVersion')
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
          text: i18n('updatingAuth', 'Reddit')
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
    const Twitch_defaultTasksTemplate = {
      channels: []
    };
    const Twitch_defaultTasks = JSON.stringify(Twitch_defaultTasksTemplate);
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
        Twitch_defineProperty(this, 'tasks', JSON.parse(Twitch_defaultTasks));
        Twitch_defineProperty(this, 'whiteList', {
          ...JSON.parse(Twitch_defaultTasks),
          ...(_GM_getValue = GM_getValue('whiteList')) === null || _GM_getValue === void 0 ? void 0 : _GM_getValue.twitch
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
            if (await Twitch_classPrivateMethodGet(this, Twitch_updateAuth, Twitch_updateAuth2).call(this)) {
              Twitch_classPrivateFieldSet(this, Twitch_initialized, true);
              return true;
            }
            return false;
          }
          const isVerified = await Twitch_classPrivateMethodGet(this, Twitch_verifyAuth, Twitch_verifyAuth2).call(this);
          if (isVerified) {
            scripts_echoLog({}).success(i18n('initSuccess', 'Twitch'));
            Twitch_classPrivateFieldSet(this, Twitch_initialized, true);
            return true;
          }
          GM_setValue('twitchAuth', null);
          if (await Twitch_classPrivateMethodGet(this, Twitch_updateAuth, Twitch_updateAuth2).call(this)) {
            scripts_echoLog({}).success(i18n('initSuccess', 'Twitch'));
            Twitch_classPrivateFieldSet(this, Twitch_initialized, true);
            return true;
          }
          scripts_echoLog({}).error(i18n('initFailed', 'Twitch'));
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
              text: i18n('needInit')
            });
            return false;
          }
          const prom = [];
          if (doTask && !globalOptions.doTask.twitch.channels || !doTask && !globalOptions.undoTask.twitch.channels) {
            scripts_echoLog({
              type: 'globalOptionsSkip',
              text: 'twitch.channels'
            });
          } else {
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
          text: i18n('verifyingAuth', 'Twitch')
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
          text: i18n('updatingAuth', 'Twitch')
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
            text: 'Twitch.unfollowChannel',
            id: name
          });
          return true;
        }
        const channelId = await Twitch_classPrivateMethodGet(this, _getChannelId, _getChannelId2).call(this, name);
        if (!channelId) {
          return false;
        }
        const logStatus = scripts_echoLog({
          type: `${doTask ? '' : 'un'}followingTwitchChannel`,
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
          type: 'gettingTwitchChannelId',
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
    function Twitter_classPrivateFieldSet(receiver, privateMap, value) {
      var descriptor = Twitter_classExtractFieldDescriptor(receiver, privateMap, 'set');
      Twitter_classApplyDescriptorSet(receiver, descriptor, value);
      return value;
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
    function Twitter_classExtractFieldDescriptor(receiver, privateMap, action) {
      if (!privateMap.has(receiver)) {
        throw new TypeError('attempted to ' + action + ' private field on non-instance');
      }
      return privateMap.get(receiver);
    }
    function Twitter_classApplyDescriptorGet(receiver, descriptor) {
      if (descriptor.get) {
        return descriptor.get.call(receiver);
      }
      return descriptor.value;
    }
    const Twitter_defaultTasksTemplate = {
      users: [],
      retweets: [],
      likes: []
    };
    const Twitter_defaultTasks = JSON.stringify(Twitter_defaultTasksTemplate);
    var _verifyId = new WeakMap();
    var Twitter_auth = new WeakMap();
    var Twitter_cache = new WeakMap();
    var Twitter_initialized = new WeakMap();
    var Twitter_verifyAuth = new WeakSet();
    var Twitter_updateAuth = new WeakSet();
    var _toggleUser = new WeakSet();
    var _toggleRetweet = new WeakSet();
    var Twitter_setCache = new WeakSet();
    class Twitter extends social_Social {
      constructor() {
        var _GM_getValue;
        super(...arguments);
        Twitter_classPrivateMethodInitSpec(this, Twitter_setCache);
        Twitter_classPrivateMethodInitSpec(this, _toggleRetweet);
        Twitter_classPrivateMethodInitSpec(this, _toggleUser);
        Twitter_classPrivateMethodInitSpec(this, Twitter_updateAuth);
        Twitter_classPrivateMethodInitSpec(this, Twitter_verifyAuth);
        Twitter_defineProperty(this, 'tasks', JSON.parse(Twitter_defaultTasks));
        Twitter_defineProperty(this, 'whiteList', {
          ...JSON.parse(Twitter_defaultTasks),
          ...(_GM_getValue = GM_getValue('whiteList')) === null || _GM_getValue === void 0 ? void 0 : _GM_getValue.twitter
        });
        Twitter_classPrivateFieldInitSpec(this, _verifyId, {
          writable: true,
          value: globalOptions.other.twitterVerifyId
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
      }
      async init() {
        try {
          if (Twitter_classPrivateFieldGet(this, Twitter_initialized)) {
            return true;
          }
          if (!Twitter_classPrivateFieldGet(this, Twitter_auth).ct0) {
            if (await Twitter_classPrivateMethodGet(this, Twitter_updateAuth, Twitter_updateAuth2).call(this)) {
              Twitter_classPrivateFieldSet(this, Twitter_initialized, true);
              return true;
            }
            return false;
          }
          const isVerified = await Twitter_classPrivateMethodGet(this, Twitter_verifyAuth, Twitter_verifyAuth2).call(this);
          if (isVerified) {
            scripts_echoLog({}).success(i18n('initSuccess', 'Twitter'));
            Twitter_classPrivateFieldSet(this, Twitter_initialized, true);
            return true;
          }
          GM_setValue('twitterAuth', null);
          if (await Twitter_classPrivateMethodGet(this, Twitter_updateAuth, Twitter_updateAuth2).call(this)) {
            scripts_echoLog({}).success(i18n('initSuccess', 'Twitter'));
            Twitter_classPrivateFieldSet(this, Twitter_initialized, true);
            return true;
          }
          scripts_echoLog({}).error(i18n('initFailed', 'Twitter'));
          return false;
        } catch (error) {
          throwError(error, 'Twitter.init');
          return false;
        }
      }
      async userName2id(name) {
        try {
          const logStatus = scripts_echoLog({
            type: 'gettingTwitterUserId',
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
            url: 'https://api.twitter.com/graphql/mCbpQvZAw6zu_4PvuAUVVQ/UserByScreenName' + `?variables=%7B%22screen_name%22%3A%22${name}%22%2C%22withSafetyModeUserFields%22%3Atrue%2C%22withSuperFollowsUserFields%22%3Atrue%7D`,
            method: 'GET',
            headers: {
              authorization: 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA',
              'content-type': 'application/json',
              referer: `https://twitter.com/${name}`,
              'x-csrf-token': Twitter_classPrivateFieldGet(this, Twitter_auth).ct0
            },
            responseType: 'json'
          });
          if (result === 'Success') {
            if ((data === null || data === void 0 ? void 0 : data.status) === 200) {
              var _response, _response$data, _response$data$user, _response$data$user$r;
              let response = data.response || (typeof data.responseText === 'object' ? data.responseText : null);
              if (!response) {
                try {
                  response = JSON.parse(data.responseText);
                } catch (error) {
                  response = null;
                }
              }
              const userId = String((_response = response) === null || _response === void 0 ? void 0 : (_response$data = _response.data) === null || _response$data === void 0 ? void 0 : (_response$data$user = _response$data.user) === null || _response$data$user === void 0 ? void 0 : (_response$data$user$r = _response$data$user.result) === null || _response$data$user$r === void 0 ? void 0 : _response$data$user$r.rest_id);
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
      async toggle(_ref) {
        let {
          doTask = true,
          userLinks = [],
          retweetLinks = []
        } = _ref;
        try {
          if (!Twitter_classPrivateFieldGet(this, Twitter_initialized)) {
            scripts_echoLog({
              text: i18n('needInit')
            });
            return false;
          }
          const prom = [];
          if (doTask && !globalOptions.doTask.twitter.users || !doTask && !globalOptions.undoTask.twitter.users) {
            scripts_echoLog({
              type: 'globalOptionsSkip',
              text: 'twitter.users'
            });
          } else {
            const realUsers = this.getRealParams('users', userLinks, doTask, link => {
              var _link$match;
              return (_link$match = link.match(/https:\/\/twitter\.com\/(.+)/)) === null || _link$match === void 0 ? void 0 : _link$match[1];
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
          }
          if (doTask && !globalOptions.doTask.twitter.retweets || !doTask && !globalOptions.undoTask.twitter.retweets) {
            scripts_echoLog({
              type: 'globalOptionsSkip',
              text: 'twitter.retweets'
            });
          } else {
            const realRetweets = this.getRealParams('retweets', retweetLinks, doTask, link => {
              var _link$match2;
              return (_link$match2 = link.match(/https:\/\/twitter\.com\/.*?\/status\/([\d]+)/)) === null || _link$match2 === void 0 ? void 0 : _link$match2[1];
            });
            if (realRetweets.length > 0) {
              for (const retweet of realRetweets) {
                prom.push(Twitter_classPrivateMethodGet(this, _toggleRetweet, _toggleRetweet2).call(this, {
                  retweetId: retweet,
                  doTask: doTask
                }));
                await delay(1e3);
              }
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
          text: i18n('updatingAuth', 'Twitter')
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
            text: 'Twitter.unfollowUser',
            id: name
          });
          return true;
        }
        const userId = verify ? Twitter_classPrivateFieldGet(this, _verifyId) : await this.userName2id(name);
        if (!userId) {
          return false;
        }
        const logStatus = verify ? scripts_echoLog({
          text: i18n('verifyingAuth', 'Twitter')
        }) : scripts_echoLog({
          type: `${doTask ? '' : 'un'}followingTwitterUser`,
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
    async function _toggleRetweet2(_ref3) {
      let {
        retweetId,
        doTask = true
      } = _ref3;
      try {
        if (!doTask && this.whiteList.retweets.includes(retweetId)) {
          scripts_echoLog({
            type: 'whiteList',
            text: 'Twitter.unretweet',
            id: retweetId
          });
          return true;
        }
        const logStatus = scripts_echoLog({
          type: `${doTask ? '' : 'un'}retweetting`,
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
    const Vk_defaultTasksTemplate = {
      names: []
    };
    const Vk_defaultTasks = JSON.stringify(Vk_defaultTasksTemplate);
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
        Vk_defineProperty(this, 'tasks', JSON.parse(Vk_defaultTasks));
        Vk_defineProperty(this, 'whiteList', {
          ...JSON.parse(Vk_defaultTasks),
          ...(_GM_getValue = GM_getValue('whiteList')) === null || _GM_getValue === void 0 ? void 0 : _GM_getValue.vk
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
            scripts_echoLog({}).success(i18n('initSuccess', 'Vk'));
            Vk_classPrivateFieldSet(this, Vk_initialized, true);
            return true;
          }
          scripts_echoLog({}).error(i18n('initFailed', 'Vk'));
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
              text: i18n('needInit')
            });
            return false;
          }
          const prom = [];
          if (doTask && !globalOptions.doTask.vk.names || !doTask && !globalOptions.undoTask.vk.names) {
            scripts_echoLog({
              type: 'globalOptionsSkip',
              text: 'vk.names'
            });
          } else {
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
          text: i18n('verifyAuth', 'Vk')
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
          type: doTask ? 'joiningVkGroup' : 'leavingVkGroup',
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
          type: doTask ? 'joiningVkPublic' : 'leavingVkPublic',
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
          type: 'sendingVkWall',
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
          type: 'deletingVkWall',
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
          type: 'gettingVkId',
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
            const [ , groupAct, groupId, , groupHash ] = data.responseText.match(/Groups.(enter|leave)\(.*?,.*?([\d]+?), (&#39;|')(.*?)(&#39;|')/) || [];
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
            text: 'Vk.undoTask',
            id: name
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
    function Youtube_classPrivateFieldSet(receiver, privateMap, value) {
      var descriptor = Youtube_classExtractFieldDescriptor(receiver, privateMap, 'set');
      Youtube_classApplyDescriptorSet(receiver, descriptor, value);
      return value;
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
    function Youtube_classExtractFieldDescriptor(receiver, privateMap, action) {
      if (!privateMap.has(receiver)) {
        throw new TypeError('attempted to ' + action + ' private field on non-instance');
      }
      return privateMap.get(receiver);
    }
    function Youtube_classApplyDescriptorGet(receiver, descriptor) {
      if (descriptor.get) {
        return descriptor.get.call(receiver);
      }
      return descriptor.value;
    }
    const Youtube_defaultTasksTemplate = {
      channels: [],
      likes: []
    };
    const Youtube_defaultTasks = JSON.stringify(Youtube_defaultTasksTemplate);
    const getInfo = async function(link, type) {
      try {
        const logStatus = scripts_echoLog({
          text: i18n('gettingYtbToken')
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
            var _data$responseText$ma, _ref;
            if (data.responseText.includes('accounts.google.com/ServiceLogin?service=youtube')) {
              logStatus.error(`Error:${i18n('loginYtb')}`, true);
              return {
                needLogin: true
              };
            }
            const apiKey = (_data$responseText$ma = data.responseText.match(/"INNERTUBE_API_KEY":"(.*?)"/)) === null || _data$responseText$ma === void 0 ? void 0 : _data$responseText$ma[1];
            const context = ((_ref = data.responseText.match(/\(\{"INNERTUBE_CONTEXT":([\w\W]*?)\}\)/) || data.responseText.match(/"INNERTUBE_CONTEXT":([\w\W]*?\}),"INNERTUBE/)) === null || _ref === void 0 ? void 0 : _ref[1]) || '{}';
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
      constructor() {
        var _GM_getValue;
        super(...arguments);
        Youtube_classPrivateMethodInitSpec(this, _toggleLikeVideo);
        Youtube_classPrivateMethodInitSpec(this, Youtube_toggleChannel);
        Youtube_classPrivateMethodInitSpec(this, _getInfo);
        Youtube_classPrivateMethodInitSpec(this, Youtube_updateAuth);
        Youtube_classPrivateMethodInitSpec(this, Youtube_verifyAuth);
        Youtube_defineProperty(this, 'tasks', JSON.parse(Youtube_defaultTasks));
        Youtube_defineProperty(this, 'whiteList', {
          ...JSON.parse(Youtube_defaultTasks),
          ...(_GM_getValue = GM_getValue('whiteList')) === null || _GM_getValue === void 0 ? void 0 : _GM_getValue.youtube
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
          value: `https://www.youtube.com/channel/${globalOptions.other.youtubeVerifyChannel}`
        });
      }
      async init() {
        try {
          if (Youtube_classPrivateFieldGet(this, Youtube_initialized)) {
            return true;
          }
          if (!Youtube_classPrivateFieldGet(this, Youtube_auth).PAPISID) {
            if (await Youtube_classPrivateMethodGet(this, Youtube_updateAuth, Youtube_updateAuth2).call(this)) {
              Youtube_classPrivateFieldSet(this, Youtube_initialized, true);
              return true;
            }
            return false;
          }
          const isVerified = await Youtube_classPrivateMethodGet(this, Youtube_verifyAuth, Youtube_verifyAuth2).call(this);
          if (isVerified) {
            scripts_echoLog({}).success(i18n('initSuccess', 'Youtube'));
            Youtube_classPrivateFieldSet(this, Youtube_initialized, true);
            return true;
          }
          GM_setValue('youtubeAuth', null);
          if (await Youtube_classPrivateMethodGet(this, Youtube_updateAuth, Youtube_updateAuth2).call(this)) {
            scripts_echoLog({}).success(i18n('initSuccess', 'Youtube'));
            Youtube_classPrivateFieldSet(this, Youtube_initialized, true);
            return true;
          }
          scripts_echoLog({}).error(i18n('initFailed', 'Youtube'));
          return false;
        } catch (error) {
          throwError(error, 'Youtube.init');
          return false;
        }
      }
      async toggle(_ref2) {
        let {
          doTask = true,
          channelLinks = [],
          videoLinks = []
        } = _ref2;
        try {
          if (!Youtube_classPrivateFieldGet(this, Youtube_initialized)) {
            scripts_echoLog({
              text: i18n('needInit')
            });
            return false;
          }
          const prom = [];
          if (doTask && !globalOptions.doTask.youtube.channels || !doTask && !globalOptions.undoTask.youtube.channels) {
            scripts_echoLog({
              type: 'globalOptionsSkip',
              text: 'youtube.channels'
            });
          } else {
            const realChannels = this.getRealParams('channels', channelLinks, doTask, link => {
              if (/^https:\/\/(www\.)?google\.com.*?\/url\?.*?url=https:\/\/www\.youtube\.com\/.*/.test(link)) {
                var _link$match;
                return (_link$match = link.match(/url=(https:\/\/www\.youtube\.com\/.*)/)) === null || _link$match === void 0 ? void 0 : _link$match[1];
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
          }
          if (doTask && !globalOptions.doTask.youtube.likes || !doTask && !globalOptions.undoTask.youtube.likes) {
            scripts_echoLog({
              type: 'globalOptionsSkip',
              text: 'youtube.likes'
            });
          } else {
            const realLikes = this.getRealParams('likes', videoLinks, doTask, link => {
              if (/^https:\/\/(www\.)?google\.com.*?\/url\?.*?url=https:\/\/www\.youtube\.com\/.*/.test(link)) {
                var _link$match2;
                return (_link$match2 = link.match(/url=(https:\/\/www\.youtube\.com\/.*)/)) === null || _link$match2 === void 0 ? void 0 : _link$match2[1];
              }
              return link;
            });
            if (realLikes.length > 0) {
              for (const video of realLikes) {
                prom.push(Youtube_classPrivateMethodGet(this, _toggleLikeVideo, _toggleLikeVideo2).call(this, {
                  link: video,
                  doTask: doTask
                }));
                await delay(1e3);
              }
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
          text: i18n('updatingAuth', 'Youtube')
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
    function _getInfo2(link, type) {
      return getInfo(link, type);
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
            html: i18n('loginYtb')
          });
          return false;
        }
        if (!(apiKey && client && request && channelId)) {
          scripts_echoLog({
            text: '"getYtbToken" failed'
          });
          return false;
        }
        if (!doTask && !verify && this.whiteList.channels.includes(channelId)) {
          scripts_echoLog({
            type: 'whiteList',
            text: 'Youtube.unfollowChannel',
            id: channelId
          });
          return true;
        }
        const logStatus = verify ? scripts_echoLog({
          text: i18n('verifyingAuth', 'Youtube')
        }) : scripts_echoLog({
          type: doTask ? 'followingYtbChannel' : 'unfollowingYtbChannel',
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
            if (verify && data.responseText.includes('You may not subscribe to yourself')) {
              logStatus.success();
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
            html: `${i18n('loginYtb')}`
          });
          return false;
        }
        if (!(apiKey && client && request && videoId && likeParams)) {
          scripts_echoLog({
            text: '"getYtbToken" failed'
          });
          return false;
        }
        if (!doTask && this.whiteList.likes.includes(videoId)) {
          scripts_echoLog({
            type: 'whiteList',
            text: 'Youtube.unlikeVideo',
            id: videoId
          });
          return true;
        }
        const logStatus = scripts_echoLog({
          type: doTask ? 'likingYtbVideo' : 'unlikingYtbVideo',
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
    function Steam_classPrivateMethodGet(receiver, privateSet, fn) {
      if (!privateSet.has(receiver)) {
        throw new TypeError('attempted to get private field on non-instance');
      }
      return fn;
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
    const Steam_defaultTasksTemplate = {
      groups: [],
      officialGroups: [],
      wishlists: [],
      follows: [],
      forums: [],
      workshops: [],
      workshopVotes: [],
      curators: [],
      curatorLikes: [],
      announcements: [],
      licenses: [],
      playtests: []
    };
    const Steam_defaultTasks = JSON.stringify(Steam_defaultTasksTemplate);
    var Steam_cache = new WeakMap();
    var Steam_auth = new WeakMap();
    var _storeInitialized = new WeakMap();
    var _communityInitialized = new WeakMap();
    var _area = new WeakMap();
    var _areaStatus = new WeakMap();
    var _updateStoreAuth = new WeakSet();
    var _updateCommunityAuth = new WeakSet();
    var _getAreaInfo = new WeakSet();
    var _changeArea = new WeakSet();
    var _joinGroup = new WeakSet();
    var _leaveGroup = new WeakSet();
    var _getGroupId = new WeakSet();
    var _joinOfficialGroup = new WeakSet();
    var _leaveOfficialGroup = new WeakSet();
    var _getOfficialGroupId = new WeakSet();
    var _addToWishlist = new WeakSet();
    var _removeFromWishlist = new WeakSet();
    var _toggleFollowGame = new WeakSet();
    var _isFollowedGame = new WeakSet();
    var _toggleForum = new WeakSet();
    var _getForumId = new WeakSet();
    var _toggleFavoriteWorkshop = new WeakSet();
    var _getWorkshopAppId = new WeakSet();
    var _voteUpWorkshop = new WeakSet();
    var _toggleCurator = new WeakSet();
    var _toggleCuratorLike = new WeakSet();
    var _getAnnouncementParams = new WeakSet();
    var _likeAnnouncement = new WeakSet();
    var _appid2subid = new WeakSet();
    var _getLicenses = new WeakSet();
    var _addLicense = new WeakSet();
    var _addFreeLicense = new WeakSet();
    var _requestPlayTestAccess = new WeakSet();
    var Steam_setCache = new WeakSet();
    class Steam extends social_Social {
      constructor() {
        var _GM_getValue;
        super(...arguments);
        Steam_classPrivateMethodInitSpec(this, Steam_setCache);
        Steam_classPrivateMethodInitSpec(this, _requestPlayTestAccess);
        Steam_classPrivateMethodInitSpec(this, _addFreeLicense);
        Steam_classPrivateMethodInitSpec(this, _addLicense);
        Steam_classPrivateMethodInitSpec(this, _getLicenses);
        Steam_classPrivateMethodInitSpec(this, _appid2subid);
        Steam_classPrivateMethodInitSpec(this, _likeAnnouncement);
        Steam_classPrivateMethodInitSpec(this, _getAnnouncementParams);
        Steam_classPrivateMethodInitSpec(this, _toggleCuratorLike);
        Steam_classPrivateMethodInitSpec(this, _toggleCurator);
        Steam_classPrivateMethodInitSpec(this, _voteUpWorkshop);
        Steam_classPrivateMethodInitSpec(this, _getWorkshopAppId);
        Steam_classPrivateMethodInitSpec(this, _toggleFavoriteWorkshop);
        Steam_classPrivateMethodInitSpec(this, _getForumId);
        Steam_classPrivateMethodInitSpec(this, _toggleForum);
        Steam_classPrivateMethodInitSpec(this, _isFollowedGame);
        Steam_classPrivateMethodInitSpec(this, _toggleFollowGame);
        Steam_classPrivateMethodInitSpec(this, _removeFromWishlist);
        Steam_classPrivateMethodInitSpec(this, _addToWishlist);
        Steam_classPrivateMethodInitSpec(this, _getOfficialGroupId);
        Steam_classPrivateMethodInitSpec(this, _leaveOfficialGroup);
        Steam_classPrivateMethodInitSpec(this, _joinOfficialGroup);
        Steam_classPrivateMethodInitSpec(this, _getGroupId);
        Steam_classPrivateMethodInitSpec(this, _leaveGroup);
        Steam_classPrivateMethodInitSpec(this, _joinGroup);
        Steam_classPrivateMethodInitSpec(this, _changeArea);
        Steam_classPrivateMethodInitSpec(this, _getAreaInfo);
        Steam_classPrivateMethodInitSpec(this, _updateCommunityAuth);
        Steam_classPrivateMethodInitSpec(this, _updateStoreAuth);
        Steam_defineProperty(this, 'tasks', JSON.parse(Steam_defaultTasks));
        Steam_defineProperty(this, 'whiteList', {
          ...JSON.parse(Steam_defaultTasks),
          ...(_GM_getValue = GM_getValue('whiteList')) === null || _GM_getValue === void 0 ? void 0 : _GM_getValue.steam
        });
        Steam_classPrivateFieldInitSpec(this, Steam_cache, {
          writable: true,
          value: {
            ...{
              group: {},
              officialGroup: {},
              forum: {},
              workshop: {},
              curator: {}
            },
            ...GM_getValue('steamCache')
          }
        });
        Steam_classPrivateFieldInitSpec(this, Steam_auth, {
          writable: true,
          value: {}
        });
        Steam_classPrivateFieldInitSpec(this, _storeInitialized, {
          writable: true,
          value: false
        });
        Steam_classPrivateFieldInitSpec(this, _communityInitialized, {
          writable: true,
          value: false
        });
        Steam_classPrivateFieldInitSpec(this, _area, {
          writable: true,
          value: 'CN'
        });
        Steam_classPrivateFieldInitSpec(this, _areaStatus, {
          writable: true,
          value: 'end'
        });
      }
      async init() {
        let type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'all';
        try {
          if (type === 'store') {
            if (Steam_classPrivateFieldGet(this, _storeInitialized)) {
              return true;
            }
            Steam_classPrivateFieldSet(this, _storeInitialized, await Steam_classPrivateMethodGet(this, _updateStoreAuth, _updateStoreAuth2).call(this));
            if (!Steam_classPrivateFieldGet(this, _storeInitialized)) {
              scripts_echoLog({}).error(i18n('initFailed', 'Steam'));
              return false;
            }
            scripts_echoLog({}).success(i18n('initSuccess', 'SteamStore'));
            return true;
          }
          if (type === 'community') {
            if (Steam_classPrivateFieldGet(this, _communityInitialized)) {
              return true;
            }
            Steam_classPrivateFieldSet(this, _communityInitialized, await Steam_classPrivateMethodGet(this, _updateCommunityAuth, _updateCommunityAuth2).call(this));
            if (!Steam_classPrivateFieldGet(this, _communityInitialized)) {
              scripts_echoLog({}).error(i18n('initFailed', 'Steam'));
              return false;
            }
            scripts_echoLog({}).success(i18n('initSuccess', 'SteamCommunity'));
            return true;
          }
          Steam_classPrivateFieldSet(this, _storeInitialized, await Steam_classPrivateMethodGet(this, _updateStoreAuth, _updateStoreAuth2).call(this));
          Steam_classPrivateFieldSet(this, _communityInitialized, await Steam_classPrivateMethodGet(this, _updateCommunityAuth, _updateCommunityAuth2).call(this));
          if (Steam_classPrivateFieldGet(this, _storeInitialized) && Steam_classPrivateFieldGet(this, _communityInitialized)) {
            scripts_echoLog({}).success(i18n('initSuccess', 'Steam'));
            return true;
          }
          scripts_echoLog({}).error(i18n('initFailed', 'Steam'));
          return false;
        } catch (error) {
          throwError(error, 'Steam.init');
          return false;
        }
      }
      async getCuratorId(path, name) {
        try {
          const logStatus = scripts_echoLog({
            type: 'gettingCuratorId',
            text: `${path}/${name}`
          });
          const curatorId = Steam_classPrivateFieldGet(this, Steam_cache).curator[`${path}/${name}`];
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
            url: `https://store.steampowered.com/${path}/${name}`,
            method: 'GET',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
          });
          if (result === 'Success') {
            if ((data === null || data === void 0 ? void 0 : data.status) === 200) {
              var _data$responseText$ma;
              const curatorId = (_data$responseText$ma = data.responseText.match(/g_pagingData.*?"clanid":([\d]+)/)) === null || _data$responseText$ma === void 0 ? void 0 : _data$responseText$ma[1];
              if (curatorId) {
                Steam_classPrivateMethodGet(this, Steam_setCache, Steam_setCache2).call(this, 'curator', `${path}/${name}`, curatorId);
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
      async toggle(_ref) {
        let {
          doTask = true,
          groupLinks = [],
          officialGroupLinks = [],
          wishlistLinks = [],
          followLinks = [],
          forumLinks = [],
          workshopLinks = [],
          workshopVoteLinks = [],
          curatorLinks = [],
          curatorLikeLinks = [],
          announcementLinks = [],
          licenseLinks = [],
          playtestLinks = []
        } = _ref;
        try {
          if ([ ...groupLinks, ...officialGroupLinks, ...forumLinks, ...workshopLinks, ...workshopVoteLinks ].length > 0 && !Steam_classPrivateFieldGet(this, _communityInitialized)) {
            scripts_echoLog({
              text: i18n('needInit')
            });
            return false;
          }
          if ([ ...wishlistLinks, ...followLinks, ...curatorLinks, ...curatorLikeLinks, ...announcementLinks, ...licenseLinks, ...playtestLinks ].length > 0 && !Steam_classPrivateFieldGet(this, _storeInitialized)) {
            scripts_echoLog({
              text: i18n('needInit')
            });
            return false;
          }
          const prom = [];
          if (doTask && !globalOptions.doTask.steam.groups || !doTask && !globalOptions.undoTask.steam.groups) {
            scripts_echoLog({
              type: 'globalOptionsSkip',
              text: 'steam.groups'
            });
          } else {
            const realGroups = this.getRealParams('groups', groupLinks, doTask, link => {
              var _link$match;
              return (_link$match = link.match(/groups\/(.+)\/?/)) === null || _link$match === void 0 ? void 0 : _link$match[1];
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
          }
          if (doTask && !globalOptions.doTask.steam.officialGroups || !doTask && !globalOptions.undoTask.steam.officialGroups) {
            scripts_echoLog({
              type: 'globalOptionsSkip',
              text: 'steam.officialGroups'
            });
          } else {
            const realOfficialGroups = this.getRealParams('officialGroups', officialGroupLinks, doTask, link => {
              var _link$match2;
              return (_link$match2 = link.match(/games\/(.+)\/?/)) === null || _link$match2 === void 0 ? void 0 : _link$match2[1];
            });
            if (realOfficialGroups.length > 0) {
              for (const officialGroup of realOfficialGroups) {
                if (doTask) {
                  prom.push(Steam_classPrivateMethodGet(this, _joinOfficialGroup, _joinOfficialGroup2).call(this, officialGroup));
                } else {
                  prom.push(Steam_classPrivateMethodGet(this, _leaveOfficialGroup, _leaveOfficialGroup2).call(this, officialGroup));
                }
                await delay(1e3);
              }
            }
          }
          if (doTask && !globalOptions.doTask.steam.wishlists || !doTask && !globalOptions.undoTask.steam.wishlists) {
            scripts_echoLog({
              type: 'globalOptionsSkip',
              text: 'steam.wishlists'
            });
          } else {
            const realWishlists = this.getRealParams('wishlists', wishlistLinks, doTask, link => {
              var _link$match3;
              return (_link$match3 = link.match(/app\/([\d]+)/)) === null || _link$match3 === void 0 ? void 0 : _link$match3[1];
            });
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
          }
          if (doTask && !globalOptions.doTask.steam.follows || !doTask && !globalOptions.undoTask.steam.follows) {
            scripts_echoLog({
              type: 'globalOptionsSkip',
              text: 'steam.follows'
            });
          } else {
            const realFollows = this.getRealParams('follows', followLinks, doTask, link => {
              var _link$match4;
              return (_link$match4 = link.match(/app\/([\d]+)/)) === null || _link$match4 === void 0 ? void 0 : _link$match4[1];
            });
            if (realFollows.length > 0) {
              for (const game of realFollows) {
                prom.push(Steam_classPrivateMethodGet(this, _toggleFollowGame, _toggleFollowGame2).call(this, game, doTask));
                await delay(1e3);
              }
            }
          }
          if (doTask && !globalOptions.doTask.steam.forums || !doTask && !globalOptions.undoTask.steam.forums) {
            scripts_echoLog({
              type: 'globalOptionsSkip',
              text: 'steam.forums'
            });
          } else {
            const realForums = this.getRealParams('forums', forumLinks, doTask, link => {
              var _link$match5;
              return (_link$match5 = link.match(/app\/([\d]+)/)) === null || _link$match5 === void 0 ? void 0 : _link$match5[1];
            });
            if (realForums.length > 0) {
              for (const forum of realForums) {
                prom.push(Steam_classPrivateMethodGet(this, _toggleForum, _toggleForum2).call(this, forum, doTask));
                await delay(1e3);
              }
            }
          }
          if (doTask && !globalOptions.doTask.steam.workshops || !doTask && !globalOptions.undoTask.steam.workshops) {
            scripts_echoLog({
              type: 'globalOptionsSkip',
              text: 'steam.workshops'
            });
          } else {
            const realWorkshops = this.getRealParams('workshops', workshopLinks, doTask, link => {
              var _link$match6;
              return (_link$match6 = link.match(/\?id=([\d]+)/)) === null || _link$match6 === void 0 ? void 0 : _link$match6[1];
            });
            if (realWorkshops.length > 0) {
              for (const workshop of realWorkshops) {
                prom.push(Steam_classPrivateMethodGet(this, _toggleFavoriteWorkshop, _toggleFavoriteWorkshop2).call(this, workshop, doTask));
                await delay(1e3);
              }
            }
          }
          if (doTask && !globalOptions.doTask.steam.workshopVotes) {
            scripts_echoLog({
              type: 'globalOptionsSkip',
              text: 'steam.workshopVotes'
            });
          } else {
            const realworkshopVotes = this.getRealParams('workshopVotes', workshopVoteLinks, doTask, link => {
              var _link$match7;
              return (_link$match7 = link.match(/\?id=([\d]+)/)) === null || _link$match7 === void 0 ? void 0 : _link$match7[1];
            });
            if (doTask && realworkshopVotes.length > 0) {
              for (const workshop of realworkshopVotes) {
                prom.push(Steam_classPrivateMethodGet(this, _voteUpWorkshop, _voteUpWorkshop2).call(this, workshop));
                await delay(1e3);
              }
            }
          }
          if (doTask && !globalOptions.doTask.steam.curators || !doTask && !globalOptions.undoTask.steam.curators) {
            scripts_echoLog({
              type: 'globalOptionsSkip',
              text: 'steam.curators'
            });
          } else {
            const realCurators = this.getRealParams('curators', curatorLinks, doTask, link => {
              var _link$match8;
              return (_link$match8 = link.match(/curator\/([\d]+)/)) === null || _link$match8 === void 0 ? void 0 : _link$match8[1];
            });
            const realCuratorLikes = this.getRealParams('curatorLikes', curatorLikeLinks, doTask, link => {
              var _link$match9;
              return (_link$match9 = link.match(/https?:\/\/store\.steampowered\.com\/(.*?)\/([^/?]+)/)) === null || _link$match9 === void 0 ? void 0 : _link$match9.slice(1, 3).join('/');
            });
            if (realCurators.length > 0) {
              for (const curator of realCurators) {
                prom.push(Steam_classPrivateMethodGet(this, _toggleCurator, _toggleCurator2).call(this, curator, doTask));
                await delay(1e3);
              }
            }
            if (realCuratorLikes.length > 0) {
              for (const curatorLike of realCuratorLikes) {
                prom.push(Steam_classPrivateMethodGet(this, _toggleCuratorLike, _toggleCuratorLike2).call(this, curatorLike, doTask));
                await delay(1e3);
              }
            }
          }
          if (doTask && !globalOptions.doTask.steam.announcements) {
            scripts_echoLog({
              type: 'globalOptionsSkip',
              text: 'steam.announcements'
            });
          } else {
            const realAnnouncements = this.getRealParams('announcements', announcementLinks, doTask, link => {
              var _link$match11;
              if (link.includes('store.steampowered.com')) {
                var _link$match10;
                return (_link$match10 = link.match(/store\.steampowered\.com\/news\/app\/([\d]+)\/view\/([\d]+)/)) === null || _link$match10 === void 0 ? void 0 : _link$match10.slice(1, 3).join('/');
              }
              return (_link$match11 = link.match(/steamcommunity\.com\/games\/([\d]+)\/announcements\/detail\/([\d]+)/)) === null || _link$match11 === void 0 ? void 0 : _link$match11.slice(1, 3).join('/');
            });
            if (doTask && realAnnouncements.length > 0) {
              for (const id of realAnnouncements) {
                prom.push(Steam_classPrivateMethodGet(this, _likeAnnouncement, _likeAnnouncement2).call(this, id));
                await delay(1e3);
              }
            }
          }
          if (doTask && !globalOptions.doTask.steam.licenses) {
            scripts_echoLog({
              type: 'globalOptionsSkip',
              text: 'steam.licenses'
            });
          } else if (doTask && globalOptions.doTask.steam.licenses && licenseLinks.length > 0) {
            for (const id of licenseLinks) {
              prom.push(Steam_classPrivateMethodGet(this, _addLicense, _addLicense2).call(this, id));
              await delay(1e3);
            }
          }
          if (doTask && !globalOptions.doTask.steam.playtests) {
            scripts_echoLog({
              type: 'globalOptionsSkip',
              text: 'steam.playtests'
            });
          } else {
            const realPlaytests = this.getRealParams('playtests', playtestLinks, doTask, link => {
              var _link$match12;
              return (_link$match12 = link.match(/app\/([\d]+)/)) === null || _link$match12 === void 0 ? void 0 : _link$match12[1];
            });
            if (doTask && globalOptions.doTask.steam.playtests && realPlaytests.length > 0) {
              for (const id of realPlaytests) {
                prom.push(Steam_classPrivateMethodGet(this, _requestPlayTestAccess, _requestPlayTestAccess2).call(this, id));
                await delay(1e3);
              }
            }
          }
          return Promise.all(prom).then(async () => {
            if (Steam_classPrivateFieldGet(this, _area) !== 'CN') {
              scripts_echoLog({}).warning(i18n('steamFinishNotice'));
              await Steam_classPrivateMethodGet(this, _changeArea, _changeArea2).call(this, 'CN');
            }
            return true;
          });
        } catch (error) {
          throwError(error, 'Steam.toggle');
          return false;
        }
      }
    }
    async function _updateStoreAuth2() {
      try {
        const logStatus = scripts_echoLog({
          text: i18n('updatingAuth', i18n('steamStore'))
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
            var _data$responseText$ma2;
            if (data.responseText.includes('href="https://store.steampowered.com/login/')) {
              logStatus.error(`Error:${i18n('needLoginSteamStore')}`, true);
              return false;
            }
            const storeSessionID = (_data$responseText$ma2 = data.responseText.match(/g_sessionID = "(.+?)";/)) === null || _data$responseText$ma2 === void 0 ? void 0 : _data$responseText$ma2[1];
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
          text: i18n('updatingAuth', i18n('steamCommunity'))
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
            var _data$responseText$ma3, _data$responseText$ma4, _data$responseText$ma5;
            if (data.responseText.includes('href="https://steamcommunity.com/login/home/')) {
              logStatus.error(`Error:${i18n('needLoginSteamCommunity')}`, true);
              return false;
            }
            const steam64Id = (_data$responseText$ma3 = data.responseText.match(/g_steamID = "(.+?)";/)) === null || _data$responseText$ma3 === void 0 ? void 0 : _data$responseText$ma3[1];
            const communitySessionID = (_data$responseText$ma4 = data.responseText.match(/g_sessionID = "(.+?)";/)) === null || _data$responseText$ma4 === void 0 ? void 0 : _data$responseText$ma4[1];
            const userName = (_data$responseText$ma5 = data.responseText.match(/steamcommunity.com\/id\/(.+?)\/friends\//)) === null || _data$responseText$ma5 === void 0 ? void 0 : _data$responseText$ma5[1];
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
          text: i18n('gettingAreaInfo')
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
            var _data$responseText$ma6;
            const currentArea = (_data$responseText$ma6 = data.responseText.match(/<input id="usercountrycurrency".*?value="(.+?)"/)) === null || _data$responseText$ma6 === void 0 ? void 0 : _data$responseText$ma6[1];
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
        if (Steam_classPrivateFieldGet(this, _areaStatus) === 'waiting') {
          await new Promise(resolve => {
            const checker = setInterval(() => {
              if (Steam_classPrivateFieldGet(this, _areaStatus) !== 'waiting') {
                clearInterval(checker);
                resolve(true);
              }
            });
          });
        }
        if (Steam_classPrivateFieldGet(this, _area) === area || !area && Steam_classPrivateFieldGet(this, _area) !== 'CN') {
          return true;
        }
        Steam_classPrivateFieldSet(this, _areaStatus, 'waiting');
        let aimedArea = area;
        if (!aimedArea) {
          const {
            currentArea,
            areas
          } = await Steam_classPrivateMethodGet(this, _getAreaInfo, _getAreaInfo2).call(this);
          if (!currentArea || !areas) {
            Steam_classPrivateFieldSet(this, _areaStatus, 'error');
            return false;
          }
          if (currentArea !== 'CN') {
            Steam_classPrivateFieldSet(this, _areaStatus, 'skip');
            scripts_echoLog({
              text: 'notNeededChangeArea'
            });
            return 'skip';
          }
          const anotherArea = areas.filter(area => area && area !== 'CN');
          if (!anotherArea || anotherArea.length === 0) {
            Steam_classPrivateFieldSet(this, _areaStatus, 'noAnotherArea');
            scripts_echoLog({
              text: 'noAnotherArea'
            });
            return false;
          }
          [ aimedArea ] = anotherArea;
        }
        const logStatus = scripts_echoLog({
          text: i18n('changingArea', aimedArea)
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
              Steam_classPrivateFieldSet(this, _areaStatus, 'success');
              logStatus.success();
              return currentArea;
            }
            Steam_classPrivateFieldSet(this, _areaStatus, 'error');
            logStatus.error('Error: change country filed');
            return 'CN';
          }
          Steam_classPrivateFieldSet(this, _areaStatus, 'error');
          logStatus.error(`Error:${data === null || data === void 0 ? void 0 : data.statusText}(${data === null || data === void 0 ? void 0 : data.status})`);
          return 'CN';
        }
        Steam_classPrivateFieldSet(this, _areaStatus, 'error');
        logStatus.error(`${result}:${statusText}(${status})`);
        return 'CN';
      } catch (error) {
        Steam_classPrivateFieldSet(this, _areaStatus, 'error');
        throwError(error, 'Steam.changeArea');
        return false;
      }
    }
    async function _joinGroup2(groupName) {
      try {
        const logStatus = scripts_echoLog({
          type: 'joiningSteamGroup',
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
            text: 'Steam.leaveGroup',
            id: groupName
          });
          return true;
        }
        const groupId = await Steam_classPrivateMethodGet(this, _getGroupId, _getGroupId2).call(this, groupName);
        if (!groupId) {
          return false;
        }
        const logStatus = scripts_echoLog({
          type: 'leavingSteamGroup',
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
          type: 'gettingSteamGroupId',
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
            var _data$responseText$ma7;
            const groupId = (_data$responseText$ma7 = data.responseText.match(/OpenGroupChat\( '([0-9]+)'/)) === null || _data$responseText$ma7 === void 0 ? void 0 : _data$responseText$ma7[1];
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
    async function _joinOfficialGroup2(gameId) {
      try {
        const logStatus = scripts_echoLog({
          type: 'joiningSteamOfficialGroup',
          text: gameId
        });
        const {
          result,
          statusText,
          status,
          data
        } = await tools_httpRequest({
          url: `https://steamcommunity.com/games/${gameId}?action=join&sessionID=${Steam_classPrivateFieldGet(this, Steam_auth).communitySessionID}`,
          method: 'GET',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        });
        if (result === 'Success') {
          if ((data === null || data === void 0 ? void 0 : data.status) === 200 && !data.responseText.includes('id="publicGroupJoin"')) {
            var _data$responseText$ma8;
            logStatus.success();
            this.tasks.officialGroups = unique([ ...this.tasks.officialGroups, gameId ]);
            const groupId = (_data$responseText$ma8 = data.responseText.match(/steam:\/\/friends\/joinchat\/([0-9]+)/)) === null || _data$responseText$ma8 === void 0 ? void 0 : _data$responseText$ma8[1];
            if (groupId) {
              Steam_classPrivateMethodGet(this, Steam_setCache, Steam_setCache2).call(this, 'officialGroup', gameId, groupId);
            }
            return true;
          }
          logStatus.error(`Error:${data === null || data === void 0 ? void 0 : data.statusText}(${data === null || data === void 0 ? void 0 : data.status})`);
          return false;
        }
        logStatus.error(`${result}:${statusText}(${status})`);
        return false;
      } catch (error) {
        throwError(error, 'Steam.joinOfficialGroup');
        return false;
      }
    }
    async function _leaveOfficialGroup2(gameId) {
      try {
        if (this.whiteList.officialGroups.includes(gameId)) {
          scripts_echoLog({
            type: 'whiteList',
            text: 'Steam.leaveOfficialGroup',
            id: gameId
          });
          return true;
        }
        const groupId = await Steam_classPrivateMethodGet(this, _getOfficialGroupId, _getOfficialGroupId2).call(this, gameId);
        if (!groupId) {
          return false;
        }
        const logStatus = scripts_echoLog({
          type: 'leavingSteamOfficialGroup',
          text: gameId
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
          if ((data === null || data === void 0 ? void 0 : data.status) === 200) {
            const {
              result: resultR,
              statusText: statusTextR,
              status: statusR,
              data: dataR
            } = await tools_httpRequest({
              url: `https://steamcommunity.com/games/${gameId}`,
              method: 'GET',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
              }
            });
            if (resultR === 'Success') {
              if ((dataR === null || dataR === void 0 ? void 0 : dataR.status) === 200 && dataR.responseText.includes('id="publicGroupJoin"')) {
                logStatus.success();
                return true;
              }
              logStatus.error(`Error:${dataR === null || dataR === void 0 ? void 0 : dataR.statusText}(${dataR === null || dataR === void 0 ? void 0 : dataR.status})`);
              return false;
            }
            logStatus.error(`${resultR}:${statusTextR}(${statusR})`);
            return false;
          }
          logStatus.error(`Error:${data === null || data === void 0 ? void 0 : data.statusText}(${data === null || data === void 0 ? void 0 : data.status})`);
          return false;
        }
        logStatus.error(`${result}:${statusText}(${status})`);
        return false;
      } catch (error) {
        throwError(error, 'Steam.leaveOfficialGroup');
        return false;
      }
    }
    async function _getOfficialGroupId2(gameId) {
      try {
        const logStatus = scripts_echoLog({
          type: 'gettingSteamOfficialGroupId',
          text: gameId
        });
        const groupId = Steam_classPrivateFieldGet(this, Steam_cache).officialGroup[gameId];
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
          url: `https://steamcommunity.com/games/${gameId}`,
          method: 'GET',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        });
        if (result === 'Success') {
          if ((data === null || data === void 0 ? void 0 : data.status) === 200) {
            var _data$responseText$ma9;
            const groupId = (_data$responseText$ma9 = data.responseText.match(/steam:\/\/friends\/joinchat\/([0-9]+)/)) === null || _data$responseText$ma9 === void 0 ? void 0 : _data$responseText$ma9[1];
            if (groupId) {
              Steam_classPrivateMethodGet(this, Steam_setCache, Steam_setCache2).call(this, 'officialGroup', gameId, groupId);
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
          type: 'addingToWishlist',
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
              logStatus.warning(i18n('changeAreaNotice'));
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
            text: 'Steam.removeFromWishlist',
            id: gameId
          });
          return true;
        }
        const logStatus = scripts_echoLog({
          type: 'removingFromWishlist',
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
              logStatus.warning(i18n('changeAreaNotice'));
              const result = await Steam_classPrivateMethodGet(this, _changeArea, _changeArea2).call(this);
              if (!result || result === 'CN' || result === 'skip') {
                return false;
              }
              return await Steam_classPrivateMethodGet(this, _removeFromWishlist, _removeFromWishlist2).call(this, gameId);
            }
            if (dataR.responseText.includes('class="queue_actions_ctn"') && (dataR.responseText.includes('ds_owned_flag ds_flag') || dataR.responseText.includes('add_to_wishlist_area'))) {
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
            text: 'Steam.unfollowGame',
            id: gameId
          });
          return true;
        }
        const logStatus = scripts_echoLog({
          type: `${doTask ? '' : 'un'}followingGame`,
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
          logStatus.warning(i18n('changeAreaNotice'));
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
            text: 'Steam.unsubscribeForum',
            id: gameId
          });
          return true;
        }
        const forumId = await Steam_classPrivateMethodGet(this, _getForumId, _getForumId2).call(this, gameId);
        if (!forumId) {
          return false;
        }
        const logStatus = scripts_echoLog({
          type: `${doTask ? '' : 'un'}subscribingForum`,
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
          type: 'gettingForumId',
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
            var _data$responseText, _data$responseText$ma10;
            const forumId = (_data$responseText = data.responseText) === null || _data$responseText === void 0 ? void 0 : (_data$responseText$ma10 = _data$responseText.match(/General_([\d]+(_[\d]+)?)/)) === null || _data$responseText$ma10 === void 0 ? void 0 : _data$responseText$ma10[1];
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
            text: 'Steam.unfavoriteWorkshop',
            id: id
          });
          return true;
        }
        const appid = await Steam_classPrivateMethodGet(this, _getWorkshopAppId, _getWorkshopAppId2).call(this, id);
        if (!appid) {
          return false;
        }
        const logStatus = scripts_echoLog({
          type: doTask ? 'favoritingWorkshop' : 'unfavoritingWorkshop',
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
          type: 'gettingWorkshopAppId',
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
            var _data$responseText$ma11;
            const appId = (_data$responseText$ma11 = data.responseText.match(/<input type="hidden" name="appid" value="([\d]+?)" \/>/)) === null || _data$responseText$ma11 === void 0 ? void 0 : _data$responseText$ma11[1];
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
    async function _voteUpWorkshop2(id) {
      try {
        const logStatus = scripts_echoLog({
          type: 'votingUpWorkshop',
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
    async function _toggleCurator2(curatorId) {
      let doTask = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      try {
        if (!doTask && this.whiteList.curators.includes(curatorId)) {
          scripts_echoLog({
            type: 'whiteList',
            text: 'Steam.unfollowCurator',
            id: curatorId
          });
          return true;
        }
        const logStatus = scripts_echoLog({
          type: doTask ? 'followingCurator' : 'unfollowingCurator',
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
    async function _toggleCuratorLike2(link) {
      let doTask = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      try {
        const [ path, name ] = link.split('/');
        if (!(path && name)) {
          scripts_echoLog({
            text: i18n('errorLink', link)
          });
          return false;
        }
        const curatorId = await this.getCuratorId(path, name);
        if (curatorId) {
          return await Steam_classPrivateMethodGet(this, _toggleCurator, _toggleCurator2).call(this, curatorId, doTask);
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
          type: 'gettingAnnouncementParams',
          text: appId,
          id: viewId
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
            var _data$responseText$ma12, _data$responseText$ma13, _data$responseText$ma14;
            if (Steam_classPrivateFieldGet(this, _area) === 'CN' && data.responseText.includes('id="error_box"')) {
              logStatus.warning(i18n('changeAreaNotice'));
              if (!await Steam_classPrivateMethodGet(this, _changeArea, _changeArea2).call(this)) {
                return {};
              }
              return await Steam_classPrivateMethodGet(this, _getAnnouncementParams, _getAnnouncementParams2).call(this, appId, viewId);
            }
            const authWgToken = (_data$responseText$ma12 = data.responseText.match(/authwgtoken&quot;:&quot;(.*?)&quot;/)) === null || _data$responseText$ma12 === void 0 ? void 0 : _data$responseText$ma12[1];
            const clanId = (_data$responseText$ma13 = data.responseText.match(/clanAccountID&quot;:([\d]+?),/)) === null || _data$responseText$ma13 === void 0 ? void 0 : _data$responseText$ma13[1];
            const gid = (_data$responseText$ma14 = data.responseText.match(/announcementGID&quot;:&quot;([\d]+?)&quot;/)) === null || _data$responseText$ma14 === void 0 ? void 0 : _data$responseText$ma14[1];
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
          scripts_echoLog({}).error(`${i18n('missParams')}(id)`);
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
          type: 'likingAnnouncement',
          text: appId,
          id: viewId
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
    async function _appid2subid2(id) {
      try {
        const logStatus = scripts_echoLog({
          type: 'gettingSubid',
          text: id
        });
        const {
          result,
          statusText,
          status,
          data
        } = await tools_httpRequest({
          url: `https://store.steampowered.com/app/${id}`,
          method: 'GET',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        });
        if (result === 'Success') {
          if ((data === null || data === void 0 ? void 0 : data.status) === 200) {
            var _data$responseText$ma15;
            if (Steam_classPrivateFieldGet(this, _area) === 'CN' && data.responseText.includes('id="error_box"')) {
              logStatus.warning(i18n('changeAreaNotice'));
              const result = await Steam_classPrivateMethodGet(this, _changeArea, _changeArea2).call(this);
              if (!result || result === 'CN' || result === 'skip') {
                return false;
              }
              return await Steam_classPrivateMethodGet(this, _appid2subid, _appid2subid2).call(this, id);
            }
            const subid = (_data$responseText$ma15 = data.responseText.match(/name="subid" value="([\d]+?)"/)) === null || _data$responseText$ma15 === void 0 ? void 0 : _data$responseText$ma15[1];
            if (subid) {
              logStatus.success();
              return subid;
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
        throwError(error, 'Steam.appid2subid');
        return false;
      }
    }
    async function _getLicenses2() {
      try {
        const logStatus = scripts_echoLog({
          text: i18n('gettingLicenses')
        });
        const {
          result,
          statusText,
          status,
          data
        } = await tools_httpRequest({
          url: `https://store.steampowered.com/dynamicstore/userdata/?t=${new Date().getTime()}`,
          method: 'GET',
          responseType: 'json'
        });
        if (result === 'Success') {
          if ((data === null || data === void 0 ? void 0 : data.status) === 200) {
            var _data$response8;
            logStatus.success();
            return (_data$response8 = data.response) === null || _data$response8 === void 0 ? void 0 : _data$response8.rgOwnedPackages;
          }
          logStatus.error(`Error:${data === null || data === void 0 ? void 0 : data.statusText}(${data === null || data === void 0 ? void 0 : data.status})`);
          return false;
        }
        logStatus.error(`${result}:${statusText}(${status})`);
        return false;
      } catch (error) {
        throwError(error, 'Steam.getLicenses');
        return false;
      }
    }
    async function _addLicense2(id) {
      try {
        const [ type, ids ] = id.split('-');
        if (type === 'appid') {
          const subid = await Steam_classPrivateMethodGet(this, _appid2subid, _appid2subid2).call(this, ids);
          if (!subid) {
            return false;
          }
          const logStatus = scripts_echoLog({
            type: 'addingFreeLicense',
            text: ids
          });
          if (!await Steam_classPrivateMethodGet(this, _addFreeLicense, _addFreeLicense2).call(this, subid, logStatus)) {
            return false;
          }
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: `https://store.steampowered.com/app/${ids}`,
            method: 'GET'
          });
          if (result === 'Success') {
            if ((data === null || data === void 0 ? void 0 : data.status) === 200) {
              if (data.responseText.includes('ds_owned_flag ds_flag') || data.responseText.includes('class="already_in_library"')) {
                logStatus.success();
                return true;
              }
              logStatus.error(`Error:${data.statusText}(${data.status})`);
              return false;
            }
            logStatus.error(`Error:${data === null || data === void 0 ? void 0 : data.statusText}(${data === null || data === void 0 ? void 0 : data.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } else if (type === 'subid') {
          if (Steam_classPrivateFieldGet(this, _area) === 'CN') {
            scripts_echoLog({}).success(i18n('tryChangeAreaNotice'));
            await Steam_classPrivateMethodGet(this, _changeArea, _changeArea2).call(this);
          }
          const logStatusArr = {};
          const idsArr = ids.split(',');
          for (const subid of idsArr) {
            const logStatus = scripts_echoLog({
              type: 'addingFreeLicenseSubid',
              text: subid
            });
            if (!await Steam_classPrivateMethodGet(this, _addFreeLicense, _addFreeLicense2).call(this, subid, logStatus)) {
              return false;
            }
            logStatusArr[subid] = logStatus;
          }
          const licenses = await Steam_classPrivateMethodGet(this, _getLicenses, _getLicenses2).call(this);
          if (!licenses) {
            return false;
          }
          for (const subid of idsArr) {
            if (licenses.includes(parseInt(subid, 10))) {
              logStatusArr[subid].success();
            } else {
              logStatusArr[subid].error();
            }
          }
          return true;
        }
        return false;
      } catch (error) {
        throwError(error, 'Steam.addLicense');
        return false;
      }
    }
    async function _addFreeLicense2(id, logStatusPre) {
      try {
        const logStatus = logStatusPre || scripts_echoLog({
          type: 'addingFreeLicenseSubid',
          text: id
        });
        const {
          result,
          statusText,
          status,
          data
        } = await tools_httpRequest({
          url: 'https://store.steampowered.com/checkout/addfreelicense',
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            Host: 'store.steampowered.com',
            Origin: 'https://store.steampowered.com',
            Referer: 'https://store.steampowered.com/account/licenses/'
          },
          data: $.param({
            action: 'add_to_cart',
            sessionid: Steam_classPrivateFieldGet(this, Steam_auth).storeSessionID,
            subid: id
          }),
          dataType: 'json'
        });
        if (result === 'Success') {
          if ((data === null || data === void 0 ? void 0 : data.status) === 200) {
            if (Steam_classPrivateFieldGet(this, _area) === 'CN' && data.responseText.includes('id="error_box"')) {
              logStatus.warning(i18n('changeAreaNotice'));
              const result = await Steam_classPrivateMethodGet(this, _changeArea, _changeArea2).call(this);
              if (!result || result === 'CN') {
                return false;
              }
              return await Steam_classPrivateMethodGet(this, _addFreeLicense, _addFreeLicense2).call(this, id);
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
        throwError(error, 'Steam.addFreeLicense');
        return false;
      }
    }
    async function _requestPlayTestAccess2(id) {
      try {
        const logStatus = scripts_echoLog({
          type: 'requestingPlayTestAccess',
          text: id
        });
        const {
          result,
          statusText,
          status,
          data
        } = await tools_httpRequest({
          url: `https://store.steampowered.com/ajaxrequestplaytestaccess/${id}`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            Host: 'store.steampowered.com',
            Origin: 'https://store.steampowered.com',
            Referer: `https://store.steampowered.com/app/${id}`
          },
          data: $.param({
            sessionid: Steam_classPrivateFieldGet(this, Steam_auth).storeSessionID
          }),
          dataType: 'json'
        });
        if (result === 'Success') {
          var _data$response9;
          if ((data === null || data === void 0 ? void 0 : data.status) === 200 && (data === null || data === void 0 ? void 0 : (_data$response9 = data.response) === null || _data$response9 === void 0 ? void 0 : _data$response9.success) === 1) {
            logStatus.success();
            return true;
          }
          logStatus.error(`Error:${data === null || data === void 0 ? void 0 : data.statusText}(${data === null || data === void 0 ? void 0 : data.status})`);
          return false;
        }
        logStatus.error(`${result}:${statusText}(${status})`);
        return false;
      } catch (error) {
        throwError(error, 'Steam.requestPlayTestAccess');
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
    function Website_classPrivateMethodInitSpec(obj, privateSet) {
      Website_checkPrivateRedeclaration(obj, privateSet);
      privateSet.add(obj);
    }
    function Website_checkPrivateRedeclaration(obj, privateCollection) {
      if (privateCollection.has(obj)) {
        throw new TypeError('Cannot initialize the same private elements twice on an object');
      }
    }
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
    function Website_classPrivateMethodGet(receiver, privateSet, fn) {
      if (!privateSet.has(receiver)) {
        throw new TypeError('attempted to get private field on non-instance');
      }
      return fn;
    }
    var _bind = new WeakSet();
    class Website {
      constructor() {
        Website_classPrivateMethodInitSpec(this, _bind);
        Website_defineProperty(this, 'undoneTasks', void 0);
        Website_defineProperty(this, 'socialTasks', void 0);
        Website_defineProperty(this, 'giveawayId', void 0);
        Website_defineProperty(this, 'socialInitialized', {
          discord: false,
          instagram: false,
          reddit: false,
          twitch: false,
          twitter: false,
          vk: false,
          youtube: false,
          steamStore: false,
          steamCommunity: false
        });
        Website_defineProperty(this, 'initialized', false);
        Website_defineProperty(this, 'social', {});
      }
      async initSocial(action) {
        try {
          const pro = [];
          const tasks = action === 'do' ? this.undoneTasks : this.socialTasks;
          if (tasks.discord) {
            const hasDiscord = Object.values(tasks.discord).reduce((total, arr) => [ ...total, ...arr ]).length > 0;
            if (hasDiscord && (!this.socialInitialized.discord || !this.social.discord)) {
              this.social.discord = new social_Discord();
              pro.push(Website_classPrivateMethodGet(this, _bind, _bind2).call(this, 'discord', this.social.discord.init()));
            }
          }
          if (tasks.instagram) {
            const hasInstagram = Object.values(tasks.instagram).reduce((total, arr) => [ ...total, ...arr ]).length > 0;
            if (hasInstagram && (!this.socialInitialized.instagram || !this.social.instagram)) {
              this.social.instagram = new social_Instagram();
              pro.push(Website_classPrivateMethodGet(this, _bind, _bind2).call(this, 'instagram', this.social.instagram.init()));
            }
          }
          if (tasks.reddit) {
            const hasReddit = Object.values(tasks.reddit).reduce((total, arr) => [ ...total, ...arr ]).length > 0;
            if (hasReddit && (!this.socialInitialized.reddit || !this.social.reddit)) {
              this.social.reddit = new social_Reddit();
              pro.push(Website_classPrivateMethodGet(this, _bind, _bind2).call(this, 'reddit', this.social.reddit.init()));
            }
          }
          if (tasks.twitch) {
            const hasTwitch = Object.values(tasks.twitch).reduce((total, arr) => [ ...total, ...arr ]).length > 0;
            if (hasTwitch && (!this.socialInitialized.twitch || !this.social.twitch)) {
              this.social.twitch = new social_Twitch();
              pro.push(Website_classPrivateMethodGet(this, _bind, _bind2).call(this, 'twitch', this.social.twitch.init()));
            }
          }
          if (tasks.twitter) {
            const hasTwitter = Object.values(tasks.twitter).reduce((total, arr) => [ ...total, ...arr ]).length > 0;
            if (hasTwitter && (!this.socialInitialized.twitter || !this.social.twitter)) {
              this.social.twitter = new social_Twitter();
              pro.push(Website_classPrivateMethodGet(this, _bind, _bind2).call(this, 'twitter', this.social.twitter.init()));
            }
          }
          if (tasks.vk) {
            const hasVk = Object.values(tasks.vk).reduce((total, arr) => [ ...total, ...arr ]).length > 0;
            if (hasVk && (!this.socialInitialized.vk || !this.social.vk)) {
              this.social.vk = new social_Vk();
              pro.push(Website_classPrivateMethodGet(this, _bind, _bind2).call(this, 'vk', this.social.vk.init()));
            }
          }
          if (tasks.youtube) {
            const hasYoutube = Object.values(tasks.youtube).reduce((total, arr) => [ ...total, ...arr ]).length > 0;
            if (hasYoutube && (!this.socialInitialized.youtube || !this.social.youtube)) {
              this.social.youtube = new Youtube();
              pro.push(Website_classPrivateMethodGet(this, _bind, _bind2).call(this, 'youtube', this.social.youtube.init()));
            }
          }
          if (tasks.steam) {
            const steamLength = Object.values(tasks.steam).reduce((total, arr) => [ ...total, ...arr ]).length;
            if (steamLength > 0) {
              if (!this.social.steam) {
                this.social.steam = new social_Steam();
              }
              const steamCommunityLength = Object.keys(tasks.steam).map(type => {
                var _tasks$steam, _tasks$steam$type;
                return [ 'groupLinks', 'officialGroupLinks', 'forumLinks', 'workshopLinks', 'workshopVoteLinks' ].includes(type) ? ((_tasks$steam = tasks.steam) === null || _tasks$steam === void 0 ? void 0 : (_tasks$steam$type = _tasks$steam[type]) === null || _tasks$steam$type === void 0 ? void 0 : _tasks$steam$type.length) || 0 : 0;
              }).reduce((total, number) => total + number, 0);
              if (steamLength - steamCommunityLength > 0 && !this.socialInitialized.steamStore) {
                pro.push(Website_classPrivateMethodGet(this, _bind, _bind2).call(this, 'steamStore', this.social.steam.init('store')));
              }
              if (steamCommunityLength > 0 && !this.socialInitialized.steamCommunity) {
                pro.push(Website_classPrivateMethodGet(this, _bind, _bind2).call(this, 'steamCommunity', this.social.steam.init('community')));
              }
            }
          }
          if (tasks.links && tasks.links.length > 0) {
            this.social.visitLink = visitLink;
          }
          return await Promise.all(pro).then(result => {
            let checked = true;
            for (const data of result) {
              if (data.result) {
                this.socialInitialized[data.name] = data.result;
              } else {
                checked = false;
              }
            }
            return checked;
          });
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
          if (!await this.initSocial(action)) {
            return false;
          }
          const pro = [];
          const doTask = action === 'do';
          const tasks = doTask ? this.undoneTasks : this.socialTasks;
          if (this.socialInitialized.discord !== 'skip' && this.social.discord) {
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
          if (doTask && tasks.extra && this.extraDoTask) {
            const hasExtra = Object.values(tasks.extra).reduce((total, arr) => [ ...total, ...arr ]).length > 0;
            if (hasExtra) {
              pro.push(this.extraDoTask(tasks.extra));
            }
          }
          await Promise.all(pro);
          scripts_echoLog({}).success(i18n('allTasksComplete'));
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
    }
    async function _bind2(name, init) {
      try {
        return {
          name: name,
          result: await init
        };
      } catch (error) {
        throwError(error, 'Website.bind');
        return {
          name: name,
          result: false
        };
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
    const FreeAnyWhere_defaultTasksTemplate = {
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
    const FreeAnyWhere_defaultTasks = JSON.stringify(FreeAnyWhere_defaultTasksTemplate);
    var _getGiveawayId = new WeakSet();
    var _verify = new WeakSet();
    class FreeAnyWhere extends website_Website {
      constructor() {
        super(...arguments);
        FreeAnyWhere_classPrivateMethodInitSpec(this, _verify);
        FreeAnyWhere_classPrivateMethodInitSpec(this, _getGiveawayId);
        FreeAnyWhere_defineProperty(this, 'name', 'FreeAnyWhere');
        FreeAnyWhere_defineProperty(this, 'tasks', []);
        FreeAnyWhere_defineProperty(this, 'socialTasks', JSON.parse(FreeAnyWhere_defaultTasks));
        FreeAnyWhere_defineProperty(this, 'undoneTasks', JSON.parse(FreeAnyWhere_defaultTasks));
        FreeAnyWhere_defineProperty(this, 'buttons', [ 'doTask', 'undoTask', 'verifyTask', 'getKey' ]);
      }
      static test() {
        return window.location.host === 'freeanywhere.net';
      }
      init() {
        try {
          const logStatus = scripts_echoLog({
            text: i18n('initing')
          });
          if ($('a[href="#/login"]').length > 0) {
            window.open('/#/login', '_self');
            logStatus.warning(i18n('needLogin'));
            return false;
          }
          if (window.location.href.includes('/login')) {
            logStatus.warning(i18n('needLogin'));
            return false;
          }
          if (!/^https?:\/\/freeanywhere\.net\/#\/giveaway\/[\d]+/.test(window.location.href)) {
            var _window$location$href;
            const id = (_window$location$href = window.location.href.match(/https?:\/\/freeanywhere\.net\/.*?#\/giveaway\/([\d]+)/)) === null || _window$location$href === void 0 ? void 0 : _window$location$href[1];
            if (!id) {
              logStatus.error(i18n('getFailed', 'Id'));
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
            text: i18n('getTasksInfo')
          });
          if (action === 'undo') {
            var _GM_getValue;
            this.socialTasks = ((_GM_getValue = GM_getValue(`fawTasks-${this.giveawayId}`)) === null || _GM_getValue === void 0 ? void 0 : _GM_getValue.tasks) || JSON.parse(FreeAnyWhere_defaultTasks);
          }
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
                  title: task.title
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
                  scripts_echoLog({}).warning(`${i18n('unKnownTaskType')}: ${social}`);
                  break;
                }
              }
              logStatus.success();
              this.undoneTasks = this.uniqueTasks(this.undoneTasks);
              this.socialTasks = this.uniqueTasks(this.socialTasks);
              if (window.DEBUG) {
                console.log('%cAuto-Task[Debug]:', 'color:blue', JSON.stringify(this));
              }
              GM_setValue(`fawTasks-${this.giveawayId}`, {
                tasks: this.socialTasks,
                time: new Date().getTime()
              });
              return true;
            }
            logStatus.error(`Error:${data === null || data === void 0 ? void 0 : data.statusText}(${data === null || data === void 0 ? void 0 : data.status})`);
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
          scripts_echoLog({}).success(i18n('allTasksComplete'));
          return !!await this.getKey(true);
        } catch (error) {
          throwError(error, 'Freeanywhere.verifyTask');
          return false;
        }
      }
      async getKey(initialized) {
        try {
          if (!initialized && !this.initialized && !this.init()) {
            return false;
          }
          const logStatus = scripts_echoLog({
            text: i18n('gettingKey')
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
              scripts_echoLog({}).success(data.response.reward);
              return data.response.reward;
            }
            logStatus.error(`Error:${data === null || data === void 0 ? void 0 : data.statusText}(${data === null || data === void 0 ? void 0 : data.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'FreeAnyWhere.getGiveawayId');
          return false;
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
        scripts_echoLog({}).error(i18n('getFailed', 'GiveawayId'));
        return false;
      } catch (error) {
        throwError(error, 'FreeAnyWhere.getGiveawayId');
      }
    }
    async function _verify2(task) {
      try {
        const logStatus = scripts_echoLog({
          html: `<li>${i18n('verifyingTask')}${task.title.trim()}...<font></font></li>`
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
        workshopVoteLinks: [],
        playtestLinks: []
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
    var _checkLogin = new WeakSet();
    var _checkLeftKey = new WeakSet();
    var GiveawaySu_getGiveawayId = new WeakSet();
    class GiveawaySu extends website_Website {
      constructor() {
        super(...arguments);
        GiveawaySu_classPrivateMethodInitSpec(this, GiveawaySu_getGiveawayId);
        GiveawaySu_classPrivateMethodInitSpec(this, _checkLeftKey);
        GiveawaySu_classPrivateMethodInitSpec(this, _checkLogin);
        GiveawaySu_defineProperty(this, 'name', 'GiveawaySu');
        GiveawaySu_defineProperty(this, 'socialTasks', GiveawaySu_defaultTasks);
        GiveawaySu_defineProperty(this, 'undoneTasks', GiveawaySu_defaultTasks);
        GiveawaySu_defineProperty(this, 'buttons', [ 'doTask', 'undoTask' ]);
      }
      static test() {
        return /^https?:\/\/giveaway\.su\/giveaway\/view\/[\d]+/.test(window.location.href);
      }
      async after() {
        try {
          if (!GiveawaySu_classPrivateMethodGet(this, _checkLogin, _checkLogin2).call(this)) {
            scripts_echoLog({}).warning(i18n('checkLoginFailed'));
          }
          if (!await GiveawaySu_classPrivateMethodGet(this, _checkLeftKey, _checkLeftKey2).call(this)) {
            scripts_echoLog({}).warning(i18n('checkLeftKeyFailed'));
          }
          scripts_echoLog({}).warning(i18n('gsNotice'));
        } catch (error) {
          throwError(error, 'Giveawaysu.after');
        }
      }
      init() {
        try {
          const logStatus = scripts_echoLog({
            text: i18n('initing')
          });
          if ($('a.steam-login').length > 0) {
            window.open('/steam/redirect', '_self');
            logStatus.warning(i18n('needLogin'));
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
      async classifyTask(action) {
        try {
          const logStatus = scripts_echoLog({
            text: i18n('getTasksInfo')
          });
          if (action === 'undo') {
            var _GM_getValue;
            this.socialTasks = ((_GM_getValue = GM_getValue(`gasTasks-${this.giveawayId}`)) === null || _GM_getValue === void 0 ? void 0 : _GM_getValue.tasks) || GiveawaySu_defaultTasks;
            return true;
          }
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
                } else if (taskIcon.includes('plus') && /request.*playtest/gim.test(taskName)) {
                  this.undoneTasks.steam.playtestLinks.push(taskLink);
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
          if (window.DEBUG) {
            console.log('%cAuto-Task[Debug]:', 'color:blue', JSON.stringify(this));
          }
          GM_setValue(`gasTasks-${this.giveawayId}`, {
            tasks: this.socialTasks,
            time: new Date().getTime()
          });
          return true;
        } catch (error) {
          throwError(error, 'Giveawaysu.classifyTask');
          return false;
        }
      }
    }
    function _checkLogin2() {
      try {
        if (!globalOptions.other.checkLogin) {
          return true;
        }
        if ($('a.steam-login').length > 0) {
          window.open('/steam/redirect', '_self');
        }
        return true;
      } catch (error) {
        throwError(error, 'Giveawaysu.checkLogin');
        return false;
      }
    }
    async function _checkLeftKey2() {
      try {
        if (!globalOptions.other.checkLeftKey) {
          return true;
        }
        if ($('.giveaway-ended').length > 0 && $('.giveaway-key').length === 0) {
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
    function GiveawaySu_getGiveawayId2() {
      var _window$location$href;
      const giveawayId = (_window$location$href = window.location.href.match(/\/view\/([\d]+)/)) === null || _window$location$href === void 0 ? void 0 : _window$location$href[1];
      if (giveawayId) {
        this.giveawayId = giveawayId;
        return true;
      }
      scripts_echoLog({
        text: i18n('getFailed', 'GiveawayId')
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
    function Indiedb_defineProperty(obj, key, value) {
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
    function Indiedb_classPrivateMethodGet(receiver, privateSet, fn) {
      if (!privateSet.has(receiver)) {
        throw new TypeError('attempted to get private field on non-instance');
      }
      return fn;
    }
    var _join = new WeakSet();
    var _do = new WeakSet();
    var Indiedb_checkLogin = new WeakSet();
    var Indiedb_checkLeftKey = new WeakSet();
    class Indiedb {
      constructor() {
        Indiedb_classPrivateMethodInitSpec(this, Indiedb_checkLeftKey);
        Indiedb_classPrivateMethodInitSpec(this, Indiedb_checkLogin);
        Indiedb_classPrivateMethodInitSpec(this, _do);
        Indiedb_classPrivateMethodInitSpec(this, _join);
        Indiedb_defineProperty(this, 'name', 'Indiedb');
        Indiedb_defineProperty(this, 'buttons', [ 'doTask' ]);
      }
      static test() {
        return window.location.host === 'www.indiedb.com';
      }
      async after() {
        try {
          if (!Indiedb_classPrivateMethodGet(this, Indiedb_checkLogin, Indiedb_checkLogin2).call(this)) {
            scripts_echoLog({}).warning(i18n('checkLoginFailed'));
          }
          if (!await Indiedb_classPrivateMethodGet(this, Indiedb_checkLeftKey, Indiedb_checkLeftKey2).call(this)) {
            scripts_echoLog({}).warning(i18n('checkLeftKeyFailed'));
          }
        } catch (error) {
          throwError(error, 'Indiedb.after');
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
    }
    async function _join2() {
      try {
        if ($('a.buttonenter:contains(Register to join)').length > 0) {
          scripts_echoLog({}).error(i18n('needLogin'));
          return false;
        }
        const currentoption = $('a.buttonenter.buttongiveaway');
        if (/join giveaway/gim.test(currentoption.text())) {
          const logStatus = scripts_echoLog({
            text: `${i18n('joiningGiveaway')}...`
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
        scripts_echoLog({}).warning(i18n('needJoinGiveaway'));
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
                text: `${i18n('doing')}:${promo.parents('p').text()}...`
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
                      if (window.DEBUG) {
                        console.log('%cAuto-Task[Debug]:', 'color:red', {
                          response: response,
                          error: error,
                          exception: exception
                        });
                      }
                      status.error('Error:An error has occurred performing the action requested. Please try again shortly.');
                      resolve(true);
                    },
                    success(response) {
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
                      if (window.DEBUG) {
                        console.log('%cAuto-Task[Debug]:', 'color:red', {
                          response: response,
                          error: error,
                          exception: exception
                        });
                      }
                      status.error('Error:An error has occurred performing the action requested. Please try again shortly.');
                      resolve(true);
                    },
                    success(response) {
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
                      if (window.DEBUG) {
                        console.log('%cAuto-Task[Debug]:', 'color:red', {
                          response: response,
                          error: error,
                          exception: exception
                        });
                      }
                      status.error('Error:An error has occurred performing the action requested. Please try again shortly.');
                      resolve(true);
                    },
                    success(response) {
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
                      if (window.DEBUG) {
                        console.log('%cAuto-Task[Debug]:', 'color:red', {
                          response: response,
                          error: error,
                          exception: exception
                        });
                      }
                      status.error('Error:An error has occurred performing the action requested. Please try again shortly.');
                      resolve(true);
                    },
                    success(response) {
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
                status.error(`Error:${i18n('unKnownTaskType')}`);
              }
            }
          }
          await Promise.all(pro);
          scripts_echoLog({}).success(i18n('allTasksComplete'));
          return true;
        }
        scripts_echoLog({}).error(i18n('getFailed', 'TaskId'));
        return false;
      } catch (error) {
        throwError(error, 'Indiedb.classifyTask');
        return false;
      }
    }
    function Indiedb_checkLogin2() {
      try {
        if (!globalOptions.other.checkLogin) {
          return true;
        }
        if ($('a.buttonenter:contains(Register to join)').length > 0) {
          window.open('/members/login', '_self');
        }
        return true;
      } catch (error) {
        throwError(error, 'Indiedb.checkLogin');
        return false;
      }
    }
    async function Indiedb_checkLeftKey2() {
      try {
        if (!globalOptions.other.checkLeftKey) {
          return true;
        }
        if ($('a.buttonenter:contains("next time")，a.buttonenter:contains("Giveaway is closed")').length > 0) {
          await external_Swal_default().fire({
            icon: 'warning',
            title: i18n('notice'),
            text: i18n('giveawayEnded'),
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
        throwError(error, 'Indiedb.checkLeftKey');
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
    const Keyhub_defaultTasksTemplate = {
      steam: {
        groupLinks: [],
        officialGroupLinks: [],
        wishlistLinks: [],
        curatorLinks: []
      },
      discord: {
        serverLinks: []
      },
      links: []
    };
    const Keyhub_defaultTasks = JSON.stringify(Keyhub_defaultTasksTemplate);
    var Keyhub_getGiveawayId = new WeakSet();
    var Keyhub_checkLeftKey = new WeakSet();
    var Keyhub_checkLogin = new WeakSet();
    class Keyhub extends website_Website {
      constructor() {
        super(...arguments);
        Keyhub_classPrivateMethodInitSpec(this, Keyhub_checkLogin);
        Keyhub_classPrivateMethodInitSpec(this, Keyhub_checkLeftKey);
        Keyhub_classPrivateMethodInitSpec(this, Keyhub_getGiveawayId);
        Keyhub_defineProperty(this, 'name', 'Keyhub');
        Keyhub_defineProperty(this, 'socialTasks', JSON.parse(Keyhub_defaultTasks));
        Keyhub_defineProperty(this, 'undoneTasks', JSON.parse(Keyhub_defaultTasks));
        Keyhub_defineProperty(this, 'buttons', [ 'doTask', 'undoTask', 'verifyTask' ]);
      }
      static test() {
        return window.location.host === 'key-hub.eu';
      }
      async after() {
        try {
          if (!Keyhub_classPrivateMethodGet(this, Keyhub_checkLogin, Keyhub_checkLogin2).call(this)) {
            scripts_echoLog({}).warning(i18n('checkLoginFailed'));
          }
          if (!await Keyhub_classPrivateMethodGet(this, Keyhub_checkLeftKey, Keyhub_checkLeftKey2).call(this)) {
            scripts_echoLog({}).warning(i18n('checkLeftKeyFailed'));
          }
          $('.NSFW').hide();
        } catch (error) {
          throwError(error, 'Keyhub.after');
        }
      }
      init() {
        try {
          const logStatus = scripts_echoLog({
            text: i18n('initing')
          });
          if ($('a[href*="/connect/steam"]').length > 0) {
            window.open('/connect/steam', '_self');
            logStatus.warning(i18n('needLogin'));
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
            text: i18n('getTasksInfo')
          });
          if (action === 'undo') {
            var _GM_getValue;
            this.socialTasks = ((_GM_getValue = GM_getValue(`khTasks-${this.giveawayId}`)) === null || _GM_getValue === void 0 ? void 0 : _GM_getValue.tasks) || JSON.parse(Keyhub_defaultTasks);
          }
          const tasks = $('.task:not(".googleads")').filter((index, element) => action === 'do' ? $(element).find('i.fa-check-circle:visible').length === 0 : true).find('a');
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
            } else if (/steamcommunity\.com\/games\/[\d]+/.test(link)) {
              if (action === 'undo') {
                this.socialTasks.steam.officialGroupLinks.push(link);
              }
              if (action === 'do') {
                this.undoneTasks.steam.officialGroupLinks.push(link);
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
            } else if (/^https?:\/\/twitter\.com\/.*/.test(link) || /^https?:\/\/www\.twitch\.tv\/.*/.test(link) || /^https?:\/\/www\.facebook\.com\/.*/.test(link) || /^https?:\/\/www\.youtube\.com\/.*/.test(link) || /^https?:\/\/store\.steampowered\.com\/developer\//.test(link)) {} else {
              scripts_echoLog({}).warning(`${i18n('unKnownTaskType')}: ${taskDes}(${link})`);
            }
          }
          logStatus.success();
          this.undoneTasks = this.uniqueTasks(this.undoneTasks);
          this.socialTasks = this.uniqueTasks(this.socialTasks);
          if (window.DEBUG) {
            console.log('%cAuto-Task[Debug]:', 'color:blue', JSON.stringify(this));
          }
          GM_setValue(`khTasks-${this.giveawayId}`, {
            tasks: this.socialTasks,
            time: new Date().getTime()
          });
          return true;
        } catch (error) {
          throwError(error, 'Keyhub.classifyTask');
          return false;
        }
      }
      verifyTask() {
        try {
          scripts_echoLog({
            html: `<li>${i18n('verifyingTask')}...<font></font></li>`
          });
          $.get(window.location.href, res => {
            VerifyTasks(res.match(/onclick="javascript:VerifyTasks\('(.*?)'\)"/)[1]);
          });
        } catch (error) {
          throwError(error, 'keyhub.verifyTask');
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
        scripts_echoLog({}).error(i18n('getFailed', 'GiveawayId'));
        return false;
      } catch (error) {
        throwError(error, 'Keyhub.getGiveawayId');
        return false;
      }
    }
    async function Keyhub_checkLeftKey2() {
      try {
        if (!globalOptions.other.checkLeftKey) {
          return true;
        }
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
    function Keyhub_checkLogin2() {
      try {
        if (!globalOptions.other.checkLogin) {
          return true;
        }
        if ($('a[href*="/connect/steam"]').length > 0) {
          window.open('/connect/steam', '_self');
        }
        return true;
      } catch (error) {
        throwError(error, 'Keyhub.checkLogin');
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
    const Givekey_defaultTasksTemplate = {
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
    const Givekey_defaultTasks = JSON.stringify(Givekey_defaultTasksTemplate);
    var Givekey_verify = new WeakSet();
    var Givekey_getGiveawayId = new WeakSet();
    var Givekey_checkLeftKey = new WeakSet();
    class Givekey extends website_Website {
      constructor() {
        super(...arguments);
        Givekey_classPrivateMethodInitSpec(this, Givekey_checkLeftKey);
        Givekey_classPrivateMethodInitSpec(this, Givekey_getGiveawayId);
        Givekey_classPrivateMethodInitSpec(this, Givekey_verify);
        Givekey_defineProperty(this, 'name', 'Givekey');
        Givekey_defineProperty(this, 'tasks', []);
        Givekey_defineProperty(this, 'socialTasks', JSON.parse(Givekey_defaultTasks));
        Givekey_defineProperty(this, 'undoneTasks', JSON.parse(Givekey_defaultTasks));
        Givekey_defineProperty(this, 'userId', void 0);
        Givekey_defineProperty(this, 'buttons', [ 'doTask', 'undoTask', 'verifyTask' ]);
      }
      static test() {
        return window.location.host === 'givekey.ru';
      }
      async after() {
        try {
          await new Promise(resolve => {
            const checker = setInterval(() => {
              if ($('#navbarDropdown').length > 0) {
                clearInterval(checker);
                resolve(true);
              }
            });
          });
          if (!await Givekey_classPrivateMethodGet(this, Givekey_checkLeftKey, Givekey_checkLeftKey2).call(this)) {
            scripts_echoLog({}).warning(i18n('checkLeftKeyFailed'));
          }
        } catch (error) {
          throwError(error, 'Givekey.after');
          return false;
        }
      }
      init() {
        try {
          const logStatus = scripts_echoLog({
            text: i18n('initing')
          });
          if ($('a[href*="/auth/steam"]').length > 0) {
            window.open('/auth/steam', '_self');
            logStatus.warning(i18n('needLogin'));
            return false;
          }
          if (!Givekey_classPrivateMethodGet(this, Givekey_getGiveawayId, Givekey_getGiveawayId2).call(this)) {
            return false;
          }
          const userId = $('meta[name="user-id"]').attr('content');
          if (!userId) {
            logStatus.error(i18n('getFailed', i18n('userId')));
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
            text: i18n('getTasksInfo')
          });
          if (action === 'undo') {
            var _GM_getValue;
            this.socialTasks = ((_GM_getValue = GM_getValue(`gkTasks-${this.giveawayId}`)) === null || _GM_getValue === void 0 ? void 0 : _GM_getValue.tasks) || JSON.parse(Givekey_defaultTasks);
          }
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
            } else if (icon.hasClass('fa-discord') || /^https?:\/\/discord\.com\/invite\//.test(href)) {
              this.socialTasks.discord.serverLinks.push(href);
              if (action === 'do' && !isSuccess) {
                this.undoneTasks.discord.serverLinks.push(href);
              }
            } else {
              scripts_echoLog({}).warning(`${i18n('unKnownTaskType')}: ${text}(${href})`);
            }
          }
          logStatus.success();
          this.tasks = unique(this.tasks);
          this.undoneTasks = this.uniqueTasks(this.undoneTasks);
          this.socialTasks = this.uniqueTasks(this.socialTasks);
          if (window.DEBUG) {
            console.log('%cAuto-Task[Debug]:', 'color:blue', JSON.stringify(this));
          }
          GM_setValue(`gkTasks-${this.giveawayId}`, {
            tasks: this.socialTasks,
            time: new Date().getTime()
          });
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
          scripts_echoLog({}).warning(i18n('giveKeyNoticeBefore'));
          const taskLength = this.tasks.length;
          for (let i = 0; i < taskLength; i++) {
            await Givekey_classPrivateMethodGet(this, Givekey_verify, Givekey_verify2).call(this, this.tasks[i]);
            if (i < taskLength - 1) {
              await delay(15e3);
            }
          }
          scripts_echoLog({}).success(i18n('allTasksComplete'));
          scripts_echoLog({
            html: `<li><font class="warning">${i18n('giveKeyNoticeAfter')}</font></li>`
          });
          return true;
        } catch (error) {
          throwError(error, 'Givekey.verifyTask');
          return false;
        }
      }
    }
    async function Givekey_verify2(task) {
      try {
        const logStatus = scripts_echoLog({
          html: `<li>${i18n('verifyingTask')}${task}...<font></font></li>`
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
                scripts_echoLog({}).success(data.key);
                resolve(true);
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
          text: i18n('getFailed', 'GiveawayId')
        });
        return false;
      } catch (error) {
        throwError(error, 'Givekey.getGiveawayId');
        return false;
      }
    }
    async function Givekey_checkLeftKey2() {
      try {
        if (!globalOptions.other.checkLeftKey) {
          return true;
        }
        if (!$('#keys_count').text()) {
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
        throwError(error, 'Givekey.checkLeftKey');
        return false;
      }
    }
    const website_Givekey = Givekey;
    function GiveeClub_classPrivateMethodInitSpec(obj, privateSet) {
      GiveeClub_checkPrivateRedeclaration(obj, privateSet);
      privateSet.add(obj);
    }
    function GiveeClub_checkPrivateRedeclaration(obj, privateCollection) {
      if (privateCollection.has(obj)) {
        throw new TypeError('Cannot initialize the same private elements twice on an object');
      }
    }
    function GiveeClub_defineProperty(obj, key, value) {
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
    function GiveeClub_classPrivateMethodGet(receiver, privateSet, fn) {
      if (!privateSet.has(receiver)) {
        throw new TypeError('attempted to get private field on non-instance');
      }
      return fn;
    }
    var GiveeClub_checkLogin = new WeakSet();
    var GiveeClub_getGiveawayId = new WeakSet();
    var GiveeClub_checkLeftKey = new WeakSet();
    class GiveeClub extends GiveawaySu {
      constructor() {
        super(...arguments);
        GiveeClub_classPrivateMethodInitSpec(this, GiveeClub_checkLeftKey);
        GiveeClub_classPrivateMethodInitSpec(this, GiveeClub_getGiveawayId);
        GiveeClub_classPrivateMethodInitSpec(this, GiveeClub_checkLogin);
        GiveeClub_defineProperty(this, 'name', 'GiveeClub');
        GiveeClub_defineProperty(this, 'buttons', [ 'doTask', 'undoTask', 'verifyTask' ]);
      }
      static test() {
        return /^https?:\/\/givee\.club\/.*?\/event\/[\d]+/.test(window.location.href);
      }
      async after() {
        try {
          if (!GiveeClub_classPrivateMethodGet(this, GiveeClub_checkLogin, GiveeClub_checkLogin2).call(this)) {
            scripts_echoLog({}).warning(i18n('checkLoginFailed'));
          }
          if (!await GiveeClub_classPrivateMethodGet(this, GiveeClub_checkLeftKey, GiveeClub_checkLeftKey2).call(this)) {
            scripts_echoLog({}).warning(i18n('checkLeftKeyFailed'));
          }
        } catch (error) {
          throwError(error, 'GiveeClub.after');
        }
      }
      init() {
        try {
          const logStatus = scripts_echoLog({
            text: i18n('initing')
          });
          if (!GiveeClub_classPrivateMethodGet(this, GiveeClub_checkLogin, GiveeClub_checkLogin2).call(this)) {
            logStatus.warning(i18n('needLogin'));
            return false;
          }
          if (!GiveeClub_classPrivateMethodGet(this, GiveeClub_getGiveawayId, GiveeClub_getGiveawayId2).call(this)) {
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
      async classifyTask(action) {
        try {
          const logStatus = scripts_echoLog({
            text: i18n('getTasksInfo')
          });
          if (action === 'undo') {
            var _GM_getValue;
            this.socialTasks = ((_GM_getValue = GM_getValue(`gcTasks-${this.giveawayId}`)) === null || _GM_getValue === void 0 ? void 0 : _GM_getValue.tasks) || GiveawaySu_defaultTasks;
            return true;
          }
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
                } else if (taskIcon.includes('plus') && taskDes.attr('data-steam-wishlist-appid')) {
                  this.undoneTasks.steam.wishlistLinks.push(`https://store.steampowered.com/app/${taskDes.attr('data-steam-wishlist-appid')}`);
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
          if (window.DEBUG) {
            console.log('%cAuto-Task[Debug]:', 'color:blue', JSON.stringify(this));
          }
          GM_setValue(`gcTasks-${this.giveawayId}`, {
            tasks: this.socialTasks,
            time: new Date().getTime()
          });
          return true;
        } catch (error) {
          throwError(error, 'GiveeClub.classifyTask');
          return false;
        }
      }
      async verifyTask() {
        try {
          const logStatus = scripts_echoLog({
            text: i18n('giveeClubVerifyNotice')
          });
          const taskButtons = $('.event-actions tr button').has('i.glyphicon-refresh').not('[data-type="user.adblock"]');
          for (const button of taskButtons) {
            button.click();
            if ($(button).attr('data-type') !== 'steam.game.wishlist') {
              await delay(1e3);
            }
          }
          logStatus.warning(i18n('giveeClubVerifyFinished'));
          return true;
        } catch (error) {
          throwError(error, 'Givekey.verifyTask');
          return false;
        }
      }
    }
    function GiveeClub_checkLogin2() {
      try {
        if (!globalOptions.other.checkLogin) {
          return true;
        }
        if ($('a[href*="/account/auth"]').length > 0) {
          window.open($('a[href*="/account/auth"]').attr('href'), '_self');
        }
        return true;
      } catch (error) {
        throwError(error, 'GiveeClub.checkLogin');
        return false;
      }
    }
    function GiveeClub_getGiveawayId2() {
      var _window$location$href;
      const giveawayId = (_window$location$href = window.location.href.match(/\/event\/([\d]+)/)) === null || _window$location$href === void 0 ? void 0 : _window$location$href[1];
      if (giveawayId) {
        this.giveawayId = giveawayId;
        return true;
      }
      scripts_echoLog({
        text: i18n('getFailed', 'GiveawayId')
      });
      return false;
    }
    async function GiveeClub_checkLeftKey2() {
      try {
        if (!globalOptions.other.checkLeftKey) {
          return true;
        }
        if ($('.event-ended').length > 0 && $('.event-winner').length === 0) {
          await external_Swal_default().fire({
            icon: 'warning',
            title: i18n('notice'),
            text: i18n('giveawayEnded'),
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
    const defaultOptions = {
      maxPoint: '99999999'
    };
    var _toggleTask = new WeakSet();
    var OpiumPulses_checkLogin = new WeakSet();
    class OpiumPulses {
      constructor() {
        OpiumPulses_classPrivateMethodInitSpec(this, OpiumPulses_checkLogin);
        OpiumPulses_classPrivateMethodInitSpec(this, _toggleTask);
        OpiumPulses_defineProperty(this, 'name', 'OpiumPulses');
        OpiumPulses_defineProperty(this, 'options', {
          ...defaultOptions,
          ...GM_getValue('OpiumPulsesOptions')
        });
        OpiumPulses_defineProperty(this, 'maxPoints', 99999999);
        OpiumPulses_defineProperty(this, 'myPoints', 0);
        OpiumPulses_defineProperty(this, 'buttons', [ 'doFreeTask', 'doPointTask' ]);
      }
      static test() {
        return window.location.host === 'www.opiumpulses.com';
      }
      async after() {
        try {
          if (!OpiumPulses_classPrivateMethodGet(this, OpiumPulses_checkLogin, OpiumPulses_checkLogin2).call(this)) {
            scripts_echoLog({}).warning(i18n('checkLoginFailed'));
          }
          this.maxPoints = parseInt(this.options.maxPoint, 10);
        } catch (error) {
          throwError(error, 'OpiumPulses.after');
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
    }
    async function _toggleTask2(type) {
      try {
        const items = $(`.giveaways-page-item:contains('${type}'):not(:contains('ENTERED'))`);
        for (const item of items) {
          var _$$find$text$match;
          const needPoints = parseInt(((_$$find$text$match = $(item).find('.giveaways-page-item-header-points').text().match(/[\d]+/gim)) === null || _$$find$text$match === void 0 ? void 0 : _$$find$text$match[0]) || '999999', 10);
          const name = $(item).find('.giveaways-page-item-footer-name').text().trim();
          if (type === 'points' && needPoints > this.myPoints) {
            scripts_echoLog({}).warning(`${i18n('noPoints')}: ${name}`);
          } else if (type === 'points' && !needPoints) {
            scripts_echoLog({}).warning(`${i18n('getNeedPointsFailed')}: ${name}`);
          } else if (!(type === 'points' && needPoints > this.maxPoints)) {
            var _aElement$attr;
            const logStatus = scripts_echoLog({
              text: `${i18n('joiningLottery')}<a href="${$(item).find('a.giveaways-page-item-img-btn-more').attr('href')}" target="_blank">${name}</a>...`
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
          text: '-----END-----'
        });
      } catch (error) {
        throwError(error, 'OpiumPulses.toggleTask');
      }
    }
    function OpiumPulses_checkLogin2() {
      try {
        if (!globalOptions.other.checkLogin) {
          return true;
        }
        if ($('a[href*="/site/login"]').length > 1) {
          window.open('/site/login', '_self');
        }
        return true;
      } catch (error) {
        throwError(error, 'OpiumPulses.checkLogin');
        return false;
      }
    }
    const website_OpiumPulses = OpiumPulses;
    const external_dayjs_namespaceObject = dayjs;
    var external_dayjs_default = __webpack_require__.n(external_dayjs_namespaceObject);
    const leftKeyChecker = {
      async classify(link) {
        try {
          if (/^https?:\/\/giveaway\.su\/giveaway\/view\/[\d]+/.test(link)) {
            return await this.giveawaySu(link);
          }
          if (/^https?:\/\/givee\.club\/[\w]+?\/event\/[\d]+/.test(link)) {
            return await this.giveeClub(link);
          }
          if (/^https?:\/\/gleam\.io\/.+?\/.+/.test(link)) {
            return await this.gleam(link);
          }
          if (/^https?:\/\/www\.indiedb\.com\/giveaways\/.+/.test(link)) {
            return await this.indieDb(link);
          }
          if (/^https?:\/\/key-hub\.eu\/giveaway\/[\d]+/.test(link)) {
            return await this.keyhub(link);
          }
          if (/^https?:\/\/opquests\.com\/quests\/[\d]+/.test(link)) {
            return await this.opquests(link);
          }
          if (/^https?:\/\/itch\.io\/s\/[\d]+?\/.*/.test(link)) {
            return await this.itch(link);
          }
          return false;
        } catch (error) {
          throwError(error, 'leftKeyChecker.classify');
          return false;
        }
      },
      async giveawaySu(link) {
        try {
          const {
            result,
            data
          } = await tools_httpRequest({
            url: link,
            method: 'GET'
          });
          if (result === 'Success' && (data === null || data === void 0 ? void 0 : data.status) === 200) {
            if (data.responseText.includes('class="steam-login"')) {
              return false;
            }
            if (data.responseText.includes('class="giveaway-ended"')) {
              return 'Ended';
            }
            return 'Active';
          }
          return false;
        } catch (error) {
          throwError(error, 'leftKeyChecker.giveawaySu');
          return false;
        }
      },
      async giveeClub(link) {
        try {
          const {
            result,
            data
          } = await tools_httpRequest({
            url: link,
            method: 'GET'
          });
          if (result === 'Success' && (data === null || data === void 0 ? void 0 : data.status) === 200) {
            if (data.responseText.includes('class="event-winner"')) {
              return 'Won';
            }
            if (data.responseText.includes('class="event-ended"')) {
              return 'Ended';
            }
            return 'Active';
          }
          return false;
        } catch (error) {
          throwError(error, 'leftKeyChecker.giveeClub');
          return false;
        }
      },
      async gleam(link) {
        try {
          const {
            result,
            data
          } = await tools_httpRequest({
            url: link,
            method: 'GET'
          });
          if (result === 'Success' && (data === null || data === void 0 ? void 0 : data.status) === 200) {
            var _data$responseText$ma, _$$attr, _$$attr$match;
            if (/incentives&quot;:{&quot;[\d]+?&quot;:\[&quot;.+?&quot;\]/.test(data.responseText)) {
              return 'Won';
            }
            const campaignDiv = (_data$responseText$ma = data.responseText.match(/<div class='popup-blocks-container'[\w\W]+?'>/)) === null || _data$responseText$ma === void 0 ? void 0 : _data$responseText$ma[0];
            if (!campaignDiv) {
              return false;
            }
            const campaignString = (_$$attr = $(campaignDiv).attr('ng-init')) === null || _$$attr === void 0 ? void 0 : (_$$attr$match = _$$attr.match(/initCampaign\(([\w\W]+?)\)$/)) === null || _$$attr$match === void 0 ? void 0 : _$$attr$match[1];
            if (!campaignString) {
              return false;
            }
            const {
              campaign
            } = JSON.parse(campaignString);
            if (campaign.banned) {
              return 'Banned';
            }
            if (campaign.finished) {
              return 'Ended';
            }
            if (campaign.paused) {
              return 'Paused';
            }
            if (new Date().getTime() < campaign.starts_at * 1e3) {
              return 'NotStart';
            }
            return 'Active';
          }
          return false;
        } catch (error) {
          throwError(error, 'leftKeyChecker.gleam');
          return false;
        }
      },
      async indieDb(link) {
        try {
          const {
            result,
            data
          } = await tools_httpRequest({
            url: link,
            method: 'GET'
          });
          if (result === 'Success' && (data === null || data === void 0 ? void 0 : data.status) === 200) {
            if (data.responseText.includes('Congrats you WON')) {
              return 'Won';
            }
            if (data.responseText.includes('Giveaway is closed') || data.responseText.includes('next time')) {
              return 'Ended';
            }
            return 'Active';
          }
          return false;
        } catch (error) {
          throwError(error, 'leftKeyChecker.indieDb');
          return false;
        }
      },
      async keyhub(link) {
        try {
          const {
            result,
            data
          } = await tools_httpRequest({
            url: link,
            method: 'GET'
          });
          if (result === 'Success' && (data === null || data === void 0 ? void 0 : data.status) === 200) {
            var _data$responseText$ma2;
            const keysleft = (_data$responseText$ma2 = data.responseText.match(/<span id="keysleft">([\d]+?)<\/span>/)) === null || _data$responseText$ma2 === void 0 ? void 0 : _data$responseText$ma2[1];
            if (!keysleft) {
              return false;
            }
            if (keysleft === '0') {
              return 'Ended';
            }
            return `Active(${keysleft})`;
          }
          return false;
        } catch (error) {
          throwError(error, 'leftKeyChecker.keyhub');
          return false;
        }
      },
      async opquests(link) {
        try {
          const {
            result,
            data
          } = await tools_httpRequest({
            url: link,
            method: 'GET'
          });
          if (result === 'Success' && (data === null || data === void 0 ? void 0 : data.status) === 200) {
            var _data$responseText$ma3;
            const keysleft = (_data$responseText$ma3 = data.responseText.match(/<div class="">[\s]*?([\d]+?)[\s]*?of/)) === null || _data$responseText$ma3 === void 0 ? void 0 : _data$responseText$ma3[1];
            if (!keysleft) {
              return false;
            }
            if (keysleft === '0') {
              return 'Ended';
            }
            return `Active(${keysleft})`;
          } else if ((data === null || data === void 0 ? void 0 : data.status) === 404) {
            return 'Ended';
          }
          return false;
        } catch (error) {
          throwError(error, 'leftKeyChecker.opquests');
          return false;
        }
      },
      async itch(link) {
        try {
          const {
            result,
            data
          } = await tools_httpRequest({
            url: link,
            method: 'GET'
          });
          if (result === 'Success' && (data === null || data === void 0 ? void 0 : data.status) === 200) {
            var _data$responseText$ma4;
            const endDate = (_data$responseText$ma4 = data.responseText.match(/{"start_date":"[0-9A-Z-:]+?".*?"end_date":"([0-9A-Z-:]+?)".*?}/)) === null || _data$responseText$ma4 === void 0 ? void 0 : _data$responseText$ma4[1];
            if (!endDate) {
              return false;
            }
            if (new Date().getTime() > new Date(endDate).getTime()) {
              return 'Ended';
            }
            return `Active(${external_dayjs_default()(endDate).format('YYYY-MM-DD HH:mm:ss')})`;
          }
          return false;
        } catch (error) {
          throwError(error, 'leftKeyChecker.opquests');
          return false;
        }
      }
    };
    const website_leftKeyChecker = leftKeyChecker;
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
    const Keylol_defaultTasksTemplate = {
      steam: {
        groupLinks: [],
        wishlistLinks: [],
        curatorLinks: [],
        curatorLikeLinks: [],
        followLinks: [],
        forumLinks: [],
        announcementLinks: [],
        workshopVoteLinks: [],
        licenseLinks: []
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
    const Keylol_defaultTasks = JSON.stringify(Keylol_defaultTasksTemplate);
    var _addBtn = new WeakSet();
    class Keylol extends website_Website {
      constructor() {
        super(...arguments);
        Keylol_classPrivateMethodInitSpec(this, _addBtn);
        Keylol_defineProperty(this, 'name', 'Keylol');
        Keylol_defineProperty(this, 'socialTasks', JSON.parse(Keylol_defaultTasks));
        Keylol_defineProperty(this, 'undoneTasks', JSON.parse(Keylol_defaultTasks));
        Keylol_defineProperty(this, 'buttons', [ 'doTask', 'undoTask', 'selectAll', 'selectNone', 'invertSelect' ]);
      }
      static test() {
        var _$$eq$attr, _$$eq$attr2;
        return window.location.host === 'keylol.com' && (!!((_$$eq$attr = $('.subforum_left_title_left_up a').eq(3).attr('href')) !== null && _$$eq$attr !== void 0 && _$$eq$attr.includes('319')) || !!((_$$eq$attr2 = $('.subforum_left_title_left_up a').eq(3).attr('href')) !== null && _$$eq$attr2 !== void 0 && _$$eq$attr2.includes('234')));
      }
      init() {
        return true;
      }
      after() {
        try {
          const selector = this.name === 'Keylol' ? '#postlist>div[id^="post_"]:first' : 'div.container';
          const mainPost = $(selector);
          const discordLinks = mainPost.find('a[href*="discord.com"]:visible');
          const redditLinks = mainPost.find('a[href*="reddit.com"]:visible');
          const insLinks = mainPost.find('a[href*="instagram.com"]:visible');
          const twitterLinks = mainPost.find('a[href*="twitter.com"]:visible');
          const twitchLinks = mainPost.find('a[href*="twitch.tv"]:visible');
          const vkLinks = mainPost.find('a[href*="vk.com"]:visible');
          const steamStoreLinks = mainPost.find('a[href*="store.steampowered.com"]:visible');
          const steamCommunityLinks = mainPost.find('a[href*="steamcommunity.com"]:visible');
          const ytbLinks = mainPost.find('a[href*="youtube.com"]:visible');
          if (discordLinks.length > 0) {
            for (const discordLink of discordLinks) {
              const link = $(discordLink).attr('href');
              if (!(link && /^https?:\/\/discord\.com\/invite\/.+/.test(link))) {
                continue;
              }
              Keylol_classPrivateMethodGet(this, _addBtn, _addBtn2).call(this, discordLink, 'discord', 'serverLinks', link);
            }
          }
          if (redditLinks.length > 0) {
            for (const redditLink of redditLinks) {
              const link = $(redditLink).attr('href');
              if (!(link && /^https?:\/\/www\.reddit\.com\/(r|user)\/.+/.test(link))) {
                continue;
              }
              Keylol_classPrivateMethodGet(this, _addBtn, _addBtn2).call(this, redditLink, 'reddit', 'redditLinks', link);
            }
          }
          if (insLinks.length > 0) {
            for (const insLink of insLinks) {
              const link = $(insLink).attr('href');
              if (!(link && /^https:\/\/www\.instagram\.com\/.+/.test(link))) {
                continue;
              }
              Keylol_classPrivateMethodGet(this, _addBtn, _addBtn2).call(this, insLink, 'instagram', 'userLinks', link);
            }
          }
          if (twitterLinks.length > 0) {
            for (const twitterLink of twitterLinks) {
              const link = $(twitterLink).attr('href');
              if (!(link && /^https:\/\/twitter\.com\/.+/.test(link))) {
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
              if (!(link && /^https:\/\/(www\.)?twitch\.tv\/.+/.test(link))) {
                continue;
              }
              Keylol_classPrivateMethodGet(this, _addBtn, _addBtn2).call(this, twitchLink, 'twitch', 'channelLinks', link);
            }
          }
          if (vkLinks.length > 0) {
            for (const vkLink of vkLinks) {
              const link = $(vkLink).attr('href');
              if (!(link && /^https:\/\/vk\.com\/.+/.test(link))) {
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
              if (/curator\/[\d]+/.test(link)) {
                Keylol_classPrivateMethodGet(this, _addBtn, _addBtn2).call(this, steamStoreLink, 'steam', 'curatorLinks', link);
              } else if (/(publisher|developer|franchise)\/.+/.test(link)) {
                Keylol_classPrivateMethodGet(this, _addBtn, _addBtn2).call(this, steamStoreLink, 'steam', 'curatorLikeLinks', link);
              } else if (/news(hub)?\/app\/[\d]+\/view\/[\d]+/.test(link)) {
                Keylol_classPrivateMethodGet(this, _addBtn, _addBtn2).call(this, steamStoreLink, 'steam', 'announcementLinks', link);
              } else if (/app\/[\d]+/.test(link)) {
                Keylol_classPrivateMethodGet(this, _addBtn, _addBtn2).call(this, steamStoreLink, 'steam', 'followLinks', link);
                Keylol_classPrivateMethodGet(this, _addBtn, _addBtn2).call(this, steamStoreLink, 'steam', 'wishlistLinks', link);
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
          if (ytbLinks.length > 0) {
            for (const ytbLink of ytbLinks) {
              const link = $(ytbLink).attr('href');
              if (!link) {
                continue;
              }
              Keylol_classPrivateMethodGet(this, _addBtn, _addBtn2).call(this, ytbLink, 'youtube', 'channelLinks', link);
              Keylol_classPrivateMethodGet(this, _addBtn, _addBtn2).call(this, ytbLink, 'youtube', 'likeLinks', link);
            }
          }
          const giveawayLinks = mainPost.find('a[href*="giveaway.su/giveaway/view/"]:visible,a[href*="givee.club/"]:visible,a[href*="gleam.io/"]:visible,a[href*="www.indiedb.com/giveaways/"]:visible,a[href*="key-hub.eu/giveaway/"]:visible,a[href*="opquests.com/quests/"]:visible,a[href*="itch.io/s/"]:visible');
          if (giveawayLinks.length > 0) {
            for (const giveawayLink of giveawayLinks) {
              const link = $(giveawayLink).attr('href');
              if (!link) {
                continue;
              }
              website_leftKeyChecker.classify(link).then(status => {
                if (!status) {
                  return;
                }
                if (/^Active/.test(status)) {
                  $(`a[href="${link}"]`).after(`<font class="auto-task-giveaway-status active" title="${i18n('Active')}">${status}</font>`);
                  return;
                }
                $(`a[href="${link}"]`).after(`<font class="auto-task-giveaway-status not-active" title="${i18n(status)}">${status}</font>`);
              }).catch(error => {
                throwError(error, 'keylol.after -> leftKeyChecker');
              });
            }
          }
          if (this.name === 'Keylol') {
            const asfLinks = mainPost.find('a[href^="#asf"]:visible');
            if (asfLinks.length > 0) {
              for (const asfLink of asfLinks) {
                const link = $(asfLink).attr('href');
                if (!link) {
                  continue;
                }
                Keylol_classPrivateMethodGet(this, _addBtn, _addBtn2).call(this, $(`a[href="${link}"]`).after('<span style="color: #ccc; margin: 0 -5px 0 5px"> | </span>').next()[0], 'steam', 'licenseLinks', `appid-${link.replace('#asf', '')}`);
              }
            }
            const subLinks = mainPost.find('a[href*="steamdb.info/sub/"]:visible');
            if (subLinks.length > 0) {
              for (const subLink of subLinks) {
                var _link$match;
                const link = $(subLink).attr('href');
                if (!link) {
                  continue;
                }
                const subid = (_link$match = link.match(/^https:\/\/steamdb\.info\/sub\/([\d]+)/)) === null || _link$match === void 0 ? void 0 : _link$match[1];
                if (!subid) {
                  continue;
                }
                Keylol_classPrivateMethodGet(this, _addBtn, _addBtn2).call(this, subLink, 'steam', 'licenseLinks', `subid-${subid}`);
              }
            }
            const asfLinks2 = mainPost.find('.blockcode:contains("addlicense"):visible');
            if (asfLinks2.length > 0) {
              for (const asfLink of asfLinks2) {
                const subid = asfLink.innerText.match(/[\d]+/g);
                if (!subid || subid.length === 0) {
                  continue;
                }
                Keylol_classPrivateMethodGet(this, _addBtn, _addBtn2).call(this, $(asfLink).children('em')[0], 'steam', 'licenseLinks', `subid-${subid.join(',')}`);
              }
            }
          }
        } catch (error) {
          throwError(error, 'keylol.after');
        }
      }
      classifyTask(action) {
        try {
          this.socialTasks = JSON.parse(Keylol_defaultTasks);
          this.undoneTasks = JSON.parse(Keylol_defaultTasks);
          const selectedBtns = $('.auto-task-keylol[selected="selected"]:visible');
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
          if (window.DEBUG) {
            console.log('%cAuto-Task[Debug]:', 'color:blue', JSON.stringify(this));
          }
          return true;
        } catch (error) {
          throwError(error, 'Keylol.classifyTask');
          return false;
        }
      }
      selectAll() {
        try {
          $('.auto-task-keylol:visible').attr('selected', 'selected');
        } catch (error) {
          throwError(error, 'Keylol.selectAll');
        }
      }
      selectNone() {
        try {
          $('.auto-task-keylol:visible').removeAttr('selected');
        } catch (error) {
          throwError(error, 'Keylol.selectNone');
        }
      }
      invertSelect() {
        try {
          $('.auto-task-keylol:visible').each((index, element) => {
            element.getAttribute('selected') ? element.removeAttribute('selected') : element.setAttribute('selected', 'selected');
          });
        } catch (error) {
          throwError(error, 'Keylol.invertSelect');
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
    var Opquests_checkLogin = new WeakSet();
    class Opquests extends website_Website {
      constructor() {
        super(...arguments);
        Opquests_classPrivateMethodInitSpec(this, Opquests_checkLogin);
        Opquests_classPrivateMethodInitSpec(this, Opquests_getGiveawayId);
        Opquests_defineProperty(this, 'name', 'Opquests');
        Opquests_defineProperty(this, 'undoneTasks', {
          ...Opquests_defaultTasks
        });
        Opquests_defineProperty(this, 'buttons', [ 'doTask' ]);
      }
      static test() {
        return window.location.host === 'opquests.com';
      }
      async after() {
        try {
          if (!Opquests_classPrivateMethodGet(this, Opquests_checkLogin, Opquests_checkLogin2).call(this)) {
            scripts_echoLog({}).warning(i18n('checkLoginFailed'));
          }
        } catch (error) {
          throwError(error, 'Opquests.after');
        }
      }
      init() {
        try {
          const logStatus = scripts_echoLog({
            text: i18n('initing')
          });
          if ($('a[href*="/auth/redirect"]').length > 0) {
            window.open('/auth/redirect', '_self');
            logStatus.warning(i18n('needLogin'));
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
              text: i18n('cannotUndo')
            });
            return false;
          }
          const logStatus = scripts_echoLog({
            text: i18n('getTasksInfo')
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
              scripts_echoLog({}).warning(`${i18n('unKnownTaskType')}: ${taskDes}(${link})`);
            }
          }
          logStatus.success();
          this.undoneTasks = this.uniqueTasks(this.undoneTasks);
          if (window.DEBUG) {
            console.log('%cAuto-Task[Debug]:', 'color:blue', JSON.stringify(this));
          }
          return true;
        } catch (error) {
          throwError(error, 'Opquests.classifyTask');
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
        scripts_echoLog({}).error(i18n('getFailed', 'GiveawayId'));
        return false;
      } catch (error) {
        throwError(error, 'Opquests.getGiveawayId');
        return false;
      }
    }
    function Opquests_checkLogin2() {
      try {
        if (!globalOptions.other.checkLogin) {
          return true;
        }
        if ($('a[href*="/auth/redirect"]').length > 0) {
          window.open('/auth/redirect', '_self');
        }
        return true;
      } catch (error) {
        throwError(error, 'Opquests.checkLogin');
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
    const Gleam_defaultTasksTemplate = {
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
      },
      extra: {
        gleam: []
      }
    };
    const Gleam_defaultTasks = JSON.stringify(Gleam_defaultTasksTemplate);
    const Gleam_defaultOptions = {
      vlootUsername: '',
      gameroundUsername: ''
    };
    var _checkSync = new WeakSet();
    var _doGleamTask = new WeakSet();
    var Gleam_getGiveawayId = new WeakSet();
    var _getGleamLink = new WeakSet();
    var Gleam_checkLeftKey = new WeakSet();
    class Gleam extends website_Website {
      constructor() {
        super(...arguments);
        Gleam_classPrivateMethodInitSpec(this, Gleam_checkLeftKey);
        Gleam_classPrivateMethodInitSpec(this, _getGleamLink);
        Gleam_classPrivateMethodInitSpec(this, Gleam_getGiveawayId);
        Gleam_classPrivateMethodInitSpec(this, _doGleamTask);
        Gleam_classPrivateMethodInitSpec(this, _checkSync);
        Gleam_defineProperty(this, 'name', 'Gleam');
        Gleam_defineProperty(this, 'undoneTasks', JSON.parse(Gleam_defaultTasks));
        Gleam_defineProperty(this, 'socialTasks', JSON.parse(Gleam_defaultTasks));
        Gleam_defineProperty(this, 'options', {
          ...Gleam_defaultOptions,
          ...GM_getValue('GleamOptions')
        });
        Gleam_defineProperty(this, 'buttons', [ 'doTask', 'undoTask', 'verifyTask' ]);
      }
      static test() {
        return window.location.host === 'gleam.io';
      }
      async after() {
        try {
          if (window.location.search.includes('8b07d23f4bfa65f9')) {
            const checkComplete = setInterval(() => {
              if ($('.entry-content .entry-method i.fa-check').length > 0) {
                clearInterval(checkComplete);
                window.close();
              }
            });
            for (const task of $('.entry-content .entry-method')) {
              const taskInfo = $(task).find('.user-links');
              const expandInfo = $(task).find('.expandable');
              const aElements = expandInfo.find('a.btn,a:contains(Continue),button:contains(Continue)');
              if (aElements.length > 0) {
                for (const element of aElements) {
                  const $element = $(element);
                  const href = $element.attr('href');
                  $element.removeAttr('href')[0].click();
                  $element.attr('href', href);
                  await delay(1e3);
                }
              }
              taskInfo[0].click();
              await delay(1e3);
            }
            scripts_echoLog({}).warning(i18n('gleamTaskNotice'));
          } else if (!await Gleam_classPrivateMethodGet(this, Gleam_checkLeftKey, Gleam_checkLeftKey2).call(this)) {
            scripts_echoLog({}).warning(i18n('checkLeftKeyFailed'));
          }
        } catch (error) {
          throwError(error, 'Gleam.after');
          return false;
        }
      }
      init() {
        try {
          const logStatus = scripts_echoLog({
            text: i18n('initing')
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
            text: i18n('getTasksInfo')
          });
          if (action === 'undo') {
            var _GM_getValue;
            this.socialTasks = ((_GM_getValue = GM_getValue(`gleamTasks-${this.giveawayId}`)) === null || _GM_getValue === void 0 ? void 0 : _GM_getValue.tasks) || JSON.parse(Gleam_defaultTasks);
          }
          const tasks = $('.entry-content .entry-method');
          for (const task of tasks) {
            var _socialIcon$attr;
            const $task = $(task);
            if (action === 'do' && $task.find('i.fa-question').length === 0) {
              continue;
            }
            const socialIcon = $task.find('.icon-wrapper i');
            const taskInfo = $task.find('.user-links');
            const taskText = taskInfo.text().trim();
            const expandInfo = $task.find('.expandable');
            const aElements = expandInfo.find('a.btn');
            if (aElements.length > 0) {
              for (const element of aElements) {
                const $element = $(element);
                const href = $element.attr('href');
                $element.removeAttr('href')[0].click();
                $element.attr('href', href);
              }
            }
            if (socialIcon.hasClass('fa-twitter')) {
              const link = $task.find('a[href^="https://twitter.com/"]').attr('href');
              if (!link) {
                continue;
              }
              if (/follow/gi.test(taskText)) {
                if (action === 'undo') {
                  this.socialTasks.twitter.userLinks.push(link);
                }
                if (action === 'do') {
                  this.undoneTasks.twitter.userLinks.push(link);
                }
              } else if (/retweet/gim.test(taskText)) {
                if (action === 'undo') {
                  this.socialTasks.twitter.retweetLinks.push(link);
                }
                if (action === 'do') {
                  this.undoneTasks.twitter.retweetLinks.push(link);
                }
              }
            } else if (socialIcon.hasClass('fa-twitch')) {
              if (/follow/gim.test(taskText)) {
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
              if (/join/gim.test(taskText)) {
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
              if (/subscribe/gim.test(taskText)) {
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
              if (/join.*group/gi.test(taskText)) {
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
              } else if (/follow.*curator/gi.test(taskText)) {
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
            } else if (socialIcon.hasClass('fa-shield') && taskText.includes('earn.vloot.io')) {
              const continueBtn = expandInfo.find('span:contains(Continue),button:contains(Continue)');
              for (const button of continueBtn) {
                button.click();
                await delay(500);
                expandInfo.find('input').val(this.options.vlootUsername);
              }
            } else if (socialIcon.hasClass('fa-gamepad-alt') && taskText.includes('Gameround')) {
              const continueBtn = expandInfo.find('span:contains(Continue),button:contains(Continue)');
              for (const button of continueBtn) {
                button.click();
                await delay(500);
                expandInfo.find('input').val(this.options.gameroundUsername);
              }
            } else if (socialIcon.hasClass('fa-bullhorn') && taskText.includes('Complete')) {
              if (action !== 'do') {
                continue;
              }
              const link = aElements.attr('href');
              if (!link) {
                continue;
              }
              const gleamLink = await Gleam_classPrivateMethodGet(this, _getGleamLink, _getGleamLink2).call(this, link);
              if (!gleamLink) {
                continue;
              }
              this.undoneTasks.extra.gleam.push(gleamLink);
            } else if (socialIcon.hasClass('fa-question') || socialIcon.hasClass('fa-reddit') || socialIcon.hasClass('fa-instagram') || socialIcon.hasClass('fa-facebook-f') || socialIcon.hasClass('fa-telegram-plane') || socialIcon.hasClass('fa-shield') && taskText.includes('Check out')) {} else {
              scripts_echoLog({}).warning(`${i18n('unKnownTaskType')}: ${taskText}`);
            }
          }
          logStatus.success();
          this.undoneTasks = this.uniqueTasks(this.undoneTasks);
          this.socialTasks = this.uniqueTasks(this.socialTasks);
          if (window.DEBUG) {
            console.log('%cAuto-Task[Debug]:', 'color:blue', JSON.stringify(this));
          }
          GM_setValue(`gleamTasks-${this.giveawayId}`, {
            tasks: this.socialTasks,
            time: new Date().getTime()
          });
          return true;
        } catch (error) {
          throwError(error, 'Gleam.classifyTask');
          return false;
        }
      }
      async extraDoTask(_ref) {
        let {
          gleam
        } = _ref;
        try {
          const pro = [];
          for (const link of gleam) {
            pro.push(Gleam_classPrivateMethodGet(this, _doGleamTask, _doGleamTask2).call(this, link));
          }
          return Promise.all(pro).then(() => true);
        } catch (error) {
          throwError(error, 'Gleam.extraDoTask');
          return false;
        }
      }
      async verifyTask() {
        try {
          scripts_echoLog({
            text: `${i18n('verifyingTask')}...`
          });
          const tasks = $('.entry-content .entry-method');
          for (const task of tasks) {
            const $task = $(task);
            if ($task.find('i.fa-question').length === 0) {
              continue;
            }
            const taskInfo = $task.find('.user-links');
            taskInfo[0].click();
            await delay(500);
            await Gleam_classPrivateMethodGet(this, _checkSync, _checkSync2).call(this);
            const continueBtn = $task.find('.expandable').find('span:contains(Continue),button:contains(Continue)');
            for (const button of continueBtn) {
              button.click();
              await delay(500);
              await Gleam_classPrivateMethodGet(this, _checkSync, _checkSync2).call(this);
            }
          }
          scripts_echoLog({
            text: i18n('verifiedGleamTasks')
          });
        } catch (error) {
          throwError(error, 'Gleam.verifyTask');
          return false;
        }
      }
    }
    async function _checkSync2() {
      try {
        return await new Promise(resolve => {
          const checker = setInterval(() => {
            if ($('.entry-content .entry-method i.fa-sync').length === 0) {
              clearInterval(checker);
              resolve(true);
            }
          }, 500);
        });
      } catch (error) {
        throwError(error, 'Gleam.checkSync');
        return false;
      }
    }
    async function _doGleamTask2(link) {
      try {
        const logStatus = scripts_echoLog({
          text: i18n('doingGleamTask')
        });
        return await new Promise(resolve => {
          GM_openInTab(`${link}?8b07d23f4bfa65f9`, {
            active: true,
            insert: true,
            setParent: true
          }).onclose = () => {
            logStatus.success();
            resolve(true);
          };
        });
      } catch (error) {
        throwError(error, 'Gleam.doGleamTask');
        return false;
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
          text: i18n('getFailed', 'GiveawayId')
        });
        return false;
      } catch (error) {
        throwError(error, 'Gleam.getGiveawayId');
        return false;
      }
    }
    async function _getGleamLink2(link) {
      try {
        const logStatus = scripts_echoLog({
          text: i18n('gettingGleamLink')
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
            var _data$responseText$ma;
            const gleamLink = (_data$responseText$ma = data.responseText.match(/href="(https:\/\/gleam\.io\/.*?\/.+?)"/)) === null || _data$responseText$ma === void 0 ? void 0 : _data$responseText$ma[1];
            if (gleamLink) {
              logStatus.success();
              return gleamLink;
            }
            logStatus.error(`Error:${i18n('getLinkFailed')}`);
            return false;
          }
          logStatus.error(`Error:${data === null || data === void 0 ? void 0 : data.statusText}(${data === null || data === void 0 ? void 0 : data.status})`);
          return false;
        }
        logStatus.error(`${result}:${statusText}(${status})`);
        return false;
      } catch (error) {
        throwError(error, 'Gleam.getGleamLink');
        return false;
      }
    }
    async function Gleam_checkLeftKey2() {
      try {
        var _$$attr, _$$attr$match, _$$attr2, _$$attr2$match;
        if (!globalOptions.other.checkLeftKey) {
          return true;
        }
        const campaignString = (_$$attr = $('div.popup-blocks-container').attr('ng-init')) === null || _$$attr === void 0 ? void 0 : (_$$attr$match = _$$attr.match(/initCampaign\(([\w\W]+?)\)$/)) === null || _$$attr$match === void 0 ? void 0 : _$$attr$match[1];
        if (!campaignString) {
          return false;
        }
        const {
          campaign,
          incentive
        } = JSON.parse(campaignString);
        const controllerString = (_$$attr2 = $('div.campaign.reward').attr('ng-init')) === null || _$$attr2 === void 0 ? void 0 : (_$$attr2$match = _$$attr2.match(/initContestant\(([\w\W]+?)\);/)) === null || _$$attr2$match === void 0 ? void 0 : _$$attr2$match[1];
        let ownedKey = false;
        if (controllerString) {
          var _JSON$parse$contestan, _JSON$parse$contestan2, _JSON$parse$contestan3, _JSON$parse$contestan4;
          if ((_JSON$parse$contestan = JSON.parse(controllerString).contestant) !== null && _JSON$parse$contestan !== void 0 && (_JSON$parse$contestan2 = _JSON$parse$contestan.claims) !== null && _JSON$parse$contestan2 !== void 0 && (_JSON$parse$contestan3 = _JSON$parse$contestan2.incentives) !== null && _JSON$parse$contestan3 !== void 0 && (_JSON$parse$contestan4 = _JSON$parse$contestan3[incentive.id]) !== null && _JSON$parse$contestan4 !== void 0 && _JSON$parse$contestan4.length) {
            ownedKey = true;
          }
        }
        if (campaign.banned || campaign.finished && !ownedKey || campaign.paused || new Date().getTime() < campaign.starts_at * 1e3) {
          await external_Swal_default().fire({
            icon: 'warning',
            title: i18n('notice'),
            text: i18n('giveawayNotWork'),
            confirmButtonText: i18n('confirm'),
            cancelButtonText: i18n('cancel'),
            showCancelButton: true
          }).then(_ref2 => {
            let {
              value
            } = _ref2;
            if (value) {
              window.close();
            }
          });
        }
        return true;
      } catch (error) {
        throwError(error, 'Gleam.checkLeftKey');
        return false;
      }
    }
    const website_Gleam = Gleam;
    function SweepWidget_classPrivateMethodInitSpec(obj, privateSet) {
      SweepWidget_checkPrivateRedeclaration(obj, privateSet);
      privateSet.add(obj);
    }
    function SweepWidget_checkPrivateRedeclaration(obj, privateCollection) {
      if (privateCollection.has(obj)) {
        throw new TypeError('Cannot initialize the same private elements twice on an object');
      }
    }
    function SweepWidget_defineProperty(obj, key, value) {
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
    function SweepWidget_classPrivateMethodGet(receiver, privateSet, fn) {
      if (!privateSet.has(receiver)) {
        throw new TypeError('attempted to get private field on non-instance');
      }
      return fn;
    }
    const SweepWidget_defaultOptions = {
      username: '',
      email: ''
    };
    var SweepWidget_checkLogin = new WeakSet();
    var SweepWidget_getGiveawayId = new WeakSet();
    var _checkEnter = new WeakSet();
    var _checkFinish = new WeakSet();
    class SweepWidget extends website_Website {
      constructor() {
        super(...arguments);
        SweepWidget_classPrivateMethodInitSpec(this, _checkFinish);
        SweepWidget_classPrivateMethodInitSpec(this, _checkEnter);
        SweepWidget_classPrivateMethodInitSpec(this, SweepWidget_getGiveawayId);
        SweepWidget_classPrivateMethodInitSpec(this, SweepWidget_checkLogin);
        SweepWidget_defineProperty(this, 'name', 'SweepWidget');
        SweepWidget_defineProperty(this, 'options', {
          ...SweepWidget_defaultOptions,
          ...GM_getValue('SweepWidgetOptions')
        });
        SweepWidget_defineProperty(this, 'buttons', [ 'doTask' ]);
      }
      static test() {
        return /^https?:\/\/sweepwidget\.com\/view\/[\d]+/.test(window.location.href);
      }
      async after() {
        try {
          if (!SweepWidget_classPrivateMethodGet(this, SweepWidget_checkLogin, SweepWidget_checkLogin2).call(this)) {
            scripts_echoLog({}).warning(i18n('checkLoginFailed'));
          }
        } catch (error) {
          throwError(error, 'SweepWidget.after');
        }
      }
      init() {
        try {
          const logStatus = scripts_echoLog({
            text: i18n('initing')
          });
          if (!SweepWidget_classPrivateMethodGet(this, SweepWidget_checkLogin, SweepWidget_checkLogin2).call(this)) {
            logStatus.warning(i18n('needLogin'));
            return false;
          }
          if (!SweepWidget_classPrivateMethodGet(this, SweepWidget_getGiveawayId, SweepWidget_getGiveawayId2).call(this)) {
            return false;
          }
          this.initialized = true;
          logStatus.success();
          return true;
        } catch (error) {
          throwError(error, 'SweepWidget.init');
          return false;
        }
      }
      classifyTask() {
        return true;
      }
      async doTask() {
        try {
          if ($('#unlock_rewards_main_wrapper').length === 0) {
            if ($('input[name="sw__login_name"]:visible').length > 0) {
              $('input[name="sw__login_name"]').val(this.options.username);
            }
            if ($('input[name="sw__login_email"]:visible').length > 0) {
              $('input[name="sw__login_email"]').val(this.options.email);
            }
            if ($('#sw_login_button:visible').length > 0) {
              $('#sw_login_button')[0].click();
            }
            if (!await SweepWidget_classPrivateMethodGet(this, _checkEnter, _checkEnter2).call(this)) {
              return false;
            }
          }
          const logStatus = scripts_echoLog({
            text: i18n('SweepWidgetNotice')
          });
          const tasks = $('#sw_inner_entry_methods_l2_wrapper>div.sw_entry');
          for (const task of tasks) {
            var _aElement$, _$task$find$removeAtt;
            const $task = $(task);
            if ($task.find('i.fa-check:visible').length > 0) {
              continue;
            }
            const title = $task.find('.sw_text_inner');
            title[0].click();
            const aElement = $task.find('a.sw_link');
            const link = aElement.attr('href');
            aElement.attr('href', '#a').attr('target', '_self');
            (_aElement$ = aElement[0]) === null || _aElement$ === void 0 ? void 0 : _aElement$.click();
            await delay(300);
            aElement.attr('href', link).attr('target', '_blank');
            $task.find('input[type="text"]').val('test');
            const verifyBtn = $task.find('input.sw_verify');
            if (verifyBtn.prop('disabled') === true) {
              title[0].click();
              await delay(300);
              title[0].click();
              await delay(300);
            }
            (_$task$find$removeAtt = $task.find('input.sw_verify').removeAttr('disabled')[0]) === null || _$task$find$removeAtt === void 0 ? void 0 : _$task$find$removeAtt.click();
            await SweepWidget_classPrivateMethodGet(this, _checkFinish, _checkFinish2).call(this, $task);
            await delay(parseInt(`${Math.random() * (3e3 - 1e3 + 1) + 1e3}`, 10));
          }
          logStatus.success();
          return true;
        } catch (error) {
          throwError(error, 'SweepWidget.doTask');
          return false;
        }
      }
    }
    function SweepWidget_checkLogin2() {
      try {
        if ($('#twitter_login_button').length > 0) {
          $('#twitter_login_button')[0].click();
        }
        return true;
      } catch (error) {
        throwError(error, 'SweepWidget.checkLogin');
        return false;
      }
    }
    function SweepWidget_getGiveawayId2() {
      try {
        var _window$location$href;
        const giveawayId = (_window$location$href = window.location.href.match(/\/view\/([\d]+)/)) === null || _window$location$href === void 0 ? void 0 : _window$location$href[1];
        if (giveawayId) {
          this.giveawayId = giveawayId;
          return true;
        }
        scripts_echoLog({
          text: i18n('getFailed', 'GiveawayId')
        });
        return false;
      } catch (error) {
        throwError(error, 'SweepWidget.getGiveawayId');
        return false;
      }
    }
    async function _checkEnter2() {
      try {
        return new Promise(resolve => {
          const checker = setInterval(() => {
            if ($('#unlock_rewards_main_wrapper').length > 0) {
              clearInterval(checker);
              resolve(true);
            }
          });
        });
      } catch (error) {
        throwError(error, 'SweepWidget.checkEnter');
        return false;
      }
    }
    async function _checkFinish2($task) {
      try {
        return new Promise(resolve => {
          const checker = setInterval(() => {
            if ($task.find('i.fa-check:visible').length > 0 || $task.find('.sw_entry_input:visible').length === 0) {
              clearInterval(checker);
              resolve(true);
            }
          });
        });
      } catch (error) {
        throwError(error, 'SweepWidget.checkFinish');
        return false;
      }
    }
    const website_SweepWidget = SweepWidget;
    const defaultWhiteList = {
      discord: {
        servers: []
      },
      instagram: {
        users: []
      },
      twitch: {
        channels: []
      },
      twitter: {
        users: [],
        retweets: [],
        likes: []
      },
      vk: {
        names: []
      },
      youtube: {
        channels: [],
        likes: []
      },
      reddit: {
        reddits: []
      },
      steam: {
        groups: [],
        officialGroups: [],
        wishlists: [],
        follows: [],
        forums: [],
        workshops: [],
        curators: [],
        workshopVotes: [],
        curatorLikes: [],
        announcements: [],
        licenses: [],
        playtests: []
      }
    };
    const link2id = async function(type) {
      var _link$match, _link$match2, _link$match3, _link$match4, _link$match5, _link$match6, _await$getInfo, _await$getInfo$params, _await$getInfo2, _await$getInfo2$param, _link$match7, _link$match8, _link$match9, _link$match10, _link$match11;
      try {
        const link = $('#socialLink').val();
        let id = '';
        switch (type) {
         case 'discord.servers':
          id = ((_link$match = link.match(/invite\/(.+)/)) === null || _link$match === void 0 ? void 0 : _link$match[1]) || '';
          break;

         case 'instagram.users':
          id = ((_link$match2 = link.match(/https:\/\/www\.instagram\.com\/(.+)?\//)) === null || _link$match2 === void 0 ? void 0 : _link$match2[1]) || '';
          break;

         case 'twitch.channels':
          id = ((_link$match3 = link.match(/https:\/\/(www\.)?twitch\.tv\/(.+)/)) === null || _link$match3 === void 0 ? void 0 : _link$match3[2]) || '';
          break;

         case 'twitter.users':
          id = ((_link$match4 = link.match(/https:\/\/twitter\.com\/(.+)/)) === null || _link$match4 === void 0 ? void 0 : _link$match4[1]) || '';
          break;

         case 'twitter.retweets':
          id = ((_link$match5 = link.match(/https:\/\/twitter\.com\/.*?\/status\/([\d]+)/)) === null || _link$match5 === void 0 ? void 0 : _link$match5[1]) || '';
          break;

         case 'vk.names':
          id = ((_link$match6 = link.match(/https:\/\/vk\.com\/([^/]+)/)) === null || _link$match6 === void 0 ? void 0 : _link$match6[1]) || '';
          break;

         case 'youtube.channels':
          id = ((_await$getInfo = await getInfo(link, 'channel')) === null || _await$getInfo === void 0 ? void 0 : (_await$getInfo$params = _await$getInfo.params) === null || _await$getInfo$params === void 0 ? void 0 : _await$getInfo$params.channelId) || '';
          break;

         case 'youtube.likes':
          id = ((_await$getInfo2 = await getInfo(link, 'likeVideo')) === null || _await$getInfo2 === void 0 ? void 0 : (_await$getInfo2$param = _await$getInfo2.params) === null || _await$getInfo2$param === void 0 ? void 0 : _await$getInfo2$param.videoId) || '';
          break;

         case 'reddit.reddits':
          id = ((_link$match7 = link.match(/https?:\/\/www\.reddit\.com\/user\/([^/]*)/)) === null || _link$match7 === void 0 ? void 0 : _link$match7[1]) || ((_link$match8 = link.match(/https?:\/\/www\.reddit\.com\/r\/([^/]*)/)) === null || _link$match8 === void 0 ? void 0 : _link$match8[1]) || '';
          break;

         case 'steam.groups':
          id = ((_link$match9 = link.match(/groups\/(.+)\/?/)) === null || _link$match9 === void 0 ? void 0 : _link$match9[1]) || '';
          break;

         case 'steam.wishlists':
         case 'steam.follows':
         case 'steam.forums':
          id = ((_link$match10 = link.match(/app\/([\d]+)/)) === null || _link$match10 === void 0 ? void 0 : _link$match10[1]) || '';
          break;

         case 'steam.workshops':
          id = ((_link$match11 = link.match(/\?id=([\d]+)/)) === null || _link$match11 === void 0 ? void 0 : _link$match11[1]) || '';
          break;

         case 'steam.curators':
          {
            if (link.includes('curator')) {
              var _link$match12;
              id = ((_link$match12 = link.match(/curator\/([\d]+)/)) === null || _link$match12 === void 0 ? void 0 : _link$match12[1]) || '';
            } else {
              var _link$match13;
              const param = (_link$match13 = link.match(/https?:\/\/store\.steampowered\.com\/(.*?)\/([^/?]+)/)) === null || _link$match13 === void 0 ? void 0 : _link$match13.slice(1, 3);
              if (!param || param.length !== 2) {
                break;
              }
              const steam = new social_Steam();
              if (await steam.init()) {
                id = await steam.getCuratorId(param[0], param[1]) || '';
              }
            }
          }
          break;
        }
        return id;
      } catch (error) {
        throwError(error, 'link2id');
        return i18n('getFailed', 'id');
      }
    };
    const disabledType = {
      steam: [ 'workshopVotes', 'curatorLikes', 'announcements' ],
      twitter: [ 'likes' ]
    };
    const assignWhiteList = whiteList => {
      try {
        const newWhiteList = {};
        for (const [ key, value ] of Object.entries(defaultWhiteList)) {
          newWhiteList[key] = {
            ...value,
            ...whiteList[key]
          };
        }
        return newWhiteList;
      } catch (error) {
        throwError(error, 'assignWhiteList');
        return defaultWhiteList;
      }
    };
    const whiteListOptions = function(showType) {
      try {
        const whiteList = assignWhiteList(GM_getValue('whiteList') || {});
        let whiteListOptionsForm = `<form id="whiteListForm" class="auto-task-form">
  <table class="auto-task-table"><thead><tr><td>${i18n('website')}</td><td>${i18n('type')}</td><td>${i18n('edit')}</td></tr></thead><tbody>`;
        for (const [ social, types ] of Object.entries(whiteList)) {
          whiteListOptionsForm += Object.keys(types).map((type, index) => {
            var _disabledType$social;
            return (_disabledType$social = disabledType[social]) !== null && _disabledType$social !== void 0 && _disabledType$social.includes(type) ? '' : `<tr style="background-color: ${stringToColour(social)}66">${index === 0 ? `<th rowspan="${Object.keys(types).length - (disabledType[social] || []).length}" style="background-color: ${stringToColour(social)}66">${social}</th>` : ''}<td>${i18n(type)}</td><td><button type="button" class="editWhiteList" data-value="${social}.${type}">${i18n('edit')}</button></td></tr>`;
          }).join('');
        }
        whiteListOptionsForm += '</tbody></table></form>';
        if (showType === 'swal') {
          external_Swal_default().fire({
            title: i18n('whiteListOptions'),
            html: whiteListOptionsForm,
            showConfirmButton: false,
            showCloseButton: true
          });
        } else {
          $('body').append(`<h2>${i18n('whiteList')}</h2>${whiteListOptionsForm}`);
        }
        $('.editWhiteList').on('click', function() {
          var _whiteList$social;
          const value = $(this).attr('data-value');
          if (!value) {
            return;
          }
          const [ social, type ] = value.split('.');
          if (!(whiteList !== null && whiteList !== void 0 && (_whiteList$social = whiteList[social]) !== null && _whiteList$social !== void 0 && _whiteList$social[type])) {
            scripts_echoLog({}).warning(i18n('whiteListNotFound', value));
            return;
          }
          external_Swal_default().fire({
            title: i18n('changeWhiteListOption', value),
            input: 'textarea',
            html: `<input id="socialLink" class="swal2-input" placeholder="在此处输入链接获取id">
        <button id="link2id" data-type="${value}" class="swal2-confirm swal2-styled">获取id</button>
        <p style="margin-bottom:0 !important;">在下方填写白名单，每行一个</p>`,
            inputValue: whiteList[social][type].join('\n'),
            showConfirmButton: true,
            confirmButtonText: i18n('save'),
            showCancelButton: true,
            cancelButtonText: i18n('close'),
            showDenyButton: true,
            denyButtonText: i18n('return')
          }).then(_ref => {
            let {
              isDenied,
              isConfirmed,
              value
            } = _ref;
            if (isDenied) {
              if (showType === 'swal') {
                whiteListOptions(showType);
              }
              return;
            } else if (isConfirmed) {
              whiteList[social][type] = value.split('\n');
              GM_setValue('whiteList', whiteList);
              external_Swal_default().fire({
                title: i18n('changeWhiteListSuccess'),
                icon: 'success'
              });
            }
          });
          $('#link2id').on('click', async function() {
            const type = $(this).attr('data-type');
            $('#socialLink').val(await link2id(type));
          });
        });
      } catch (error) {
        throwError(error, 'whiteListOptions');
      }
    };
    const whiteList = whiteListOptions;
    const setGistData = async (token, gistId, fileName, content) => {
      try {
        const logStatus = scripts_echoLog({
          text: i18n('settingData')
        });
        const contentData = JSON.stringify({
          files: {
            [fileName]: {
              content: JSON.stringify(content)
            }
          }
        });
        const {
          result,
          statusText,
          status,
          data
        } = await tools_httpRequest({
          url: `https://api.github.com/gists/${gistId}`,
          headers: {
            Accept: 'application/vnd.github.v3+json',
            Authorization: `token ${token}`
          },
          data: contentData,
          responseType: 'json',
          method: 'POST',
          timeout: 3e4
        });
        if (result === 'Success') {
          var _data$response$files, _data$response$files$;
          if ((data === null || data === void 0 ? void 0 : data.status) === 200 && ((_data$response$files = data.response.files) === null || _data$response$files === void 0 ? void 0 : (_data$response$files$ = _data$response$files[fileName]) === null || _data$response$files$ === void 0 ? void 0 : _data$response$files$.content) === JSON.stringify(content)) {
            logStatus.success();
            return true;
          }
          logStatus.error(`Error:${data === null || data === void 0 ? void 0 : data.statusText}(${data === null || data === void 0 ? void 0 : data.status})`);
          return false;
        }
        logStatus.error(`${result}:${statusText}(${status})`);
        return false;
      } catch (error) {
        throwError(error, 'setGistData');
        return false;
      }
    };
    const getGistData = async function(token, gistId, fileName) {
      let test = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      try {
        const logStatus = scripts_echoLog({
          text: i18n('gettingData')
        });
        const {
          result,
          statusText,
          status,
          data
        } = await tools_httpRequest({
          url: `https://api.github.com/gists/${gistId}`,
          headers: {
            Accept: 'application/vnd.github.v3+json',
            Authorization: `token ${token}`
          },
          responseType: 'json',
          method: 'GET',
          timeout: 3e4
        });
        if (result === 'Success') {
          if ((data === null || data === void 0 ? void 0 : data.status) === 200) {
            var _data$response, _data$response$files2, _data$response$files3;
            const content = (_data$response = data.response) === null || _data$response === void 0 ? void 0 : (_data$response$files2 = _data$response.files) === null || _data$response$files2 === void 0 ? void 0 : (_data$response$files3 = _data$response$files2[fileName]) === null || _data$response$files3 === void 0 ? void 0 : _data$response$files3.content;
            let formatedContent;
            if (!content) {
              logStatus.error(`Error:${i18n('noRemoteData')}`);
              return false;
            }
            if (test) {
              logStatus.success();
              return true;
            }
            try {
              formatedContent = JSON.parse(content);
            } catch (error) {
              logStatus.error(`Error:${i18n('errorRemoteDataFormat')}`);
              return false;
            }
            logStatus.success();
            return formatedContent;
          }
          logStatus.error(`Error:${data === null || data === void 0 ? void 0 : data.statusText}(${data === null || data === void 0 ? void 0 : data.status})`);
          return false;
        }
        logStatus.error(`${result}:${statusText}(${status})`);
        return false;
      } catch (error) {
        throwError(error, 'getGistData');
        return false;
      }
    };
    const syncOptions = () => {
      try {
        const {
          TOKEN,
          GIST_ID,
          FILE_NAME,
          SYNC_HISTORY
        } = GM_getValue('gistOptions') || {
          TOKEN: '',
          GIST_ID: '',
          FILE_NAME: '',
          SYNC_HISTORY: true
        };
        external_Swal_default().fire({
          title: i18n('gistOptions'),
          html: `<p>Github Token<input id="github-token" class="swal2-input" placeholder="Github Token" value="${TOKEN}"></p>` + `<p>Gist ID<input id="gist-id" class="swal2-input" placeholder="Gist ID" value="${GIST_ID}"></p>` + `<p>${i18n('fileName')}<input id="file-name" class="swal2-input" placeholder="${i18n('fileName')}" value="${FILE_NAME}"></p>` + '<p><label for="sync-history" class="swal2-checkbox-custom" style="display: flex;">' + `<input id="sync-history" type="checkbox"${SYNC_HISTORY ? ' checked="checked"' : ''}/>` + `<span class="swal2-label">${i18n('syncHistory')}</span></label></p>` + `<p><button id="upload-data" type="button" class="swal2-confirm swal2-styled" style="display: inline-block;">
      ${i18n('upload2gist')}</button>` + `<button id="download-data" type="button" class="swal2-confirm swal2-styled" style="display: inline-block;">
      ${i18n('downloadFromGist')}</button></p>`,
          focusConfirm: false,
          showLoaderOnConfirm: true,
          footer: `<a href="https://auto-task-doc.js.org/guide/#%E6%95%B0%E6%8D%AE%E5%90%8C%E6%AD%A5" target="_blank">${i18n('help')}</a>`,
          preConfirm: async () => {
            const token = $('#github-token').val();
            const gistId = $('#gist-id').val();
            const fileName = $('#file-name').val();
            const syncHistory = $('#sync-history').prop('checked');
            GM_setValue('gistOptions', {
              TOKEN: token,
              GIST_ID: gistId,
              FILE_NAME: fileName,
              SYNC_HISTORY: syncHistory
            });
            return await getGistData(token, gistId, fileName, true);
          },
          allowOutsideClick: () => !external_Swal_default().isLoading(),
          confirmButtonText: i18n('saveAndTest'),
          showCancelButton: true,
          cancelButtonText: i18n('close')
        }).then(_ref => {
          let {
            value
          } = _ref;
          if (value) {
            external_Swal_default().fire({
              icon: 'success',
              title: i18n('testSuccess')
            }).then(syncOptions);
          } else if (value !== undefined) {
            external_Swal_default().fire({
              icon: 'error',
              title: i18n('testFailed')
            }).then(syncOptions);
          }
        });
        $('#upload-data').on('click', async () => {
          const {
            TOKEN,
            GIST_ID,
            FILE_NAME
          } = GM_getValue('gistOptions') || {};
          if (!(TOKEN && GIST_ID && FILE_NAME)) {
            return external_Swal_default().fire({
              icon: 'error',
              title: i18n('saveAndTestNotice')
            }).then(syncOptions);
          }
          external_Swal_default().fire({
            icon: 'info',
            title: i18n('processingData')
          });
          const data = {};
          const names = GM_listValues();
          const SYNC_HISTORY = $('#sync-history').prop('checked');
          for (const name of names) {
            if (name === 'gistOptions' || /^[\w]+?Auth$/.test(name)) {
              continue;
            }
            if (!SYNC_HISTORY && /^[\w]+?Tasks-/.test(name)) {
              continue;
            }
            data[name] = GM_getValue(name);
          }
          external_Swal_default().update({
            icon: 'info',
            title: i18n('updatingData')
          });
          if (await setGistData(TOKEN, GIST_ID, FILE_NAME, data)) {
            external_Swal_default().fire({
              icon: 'success',
              title: i18n('syncDataSuccess')
            });
          } else {
            external_Swal_default().fire({
              icon: 'error',
              title: i18n('syncDataFailed')
            });
          }
        });
        $('#download-data').on('click', async () => {
          const {
            TOKEN,
            GIST_ID,
            FILE_NAME
          } = GM_getValue('gistOptions') || {};
          if (!(TOKEN && GIST_ID && FILE_NAME)) {
            return external_Swal_default().fire({
              icon: 'error',
              title: i18n('saveAndTestNotice')
            }).then(syncOptions);
          }
          external_Swal_default().fire({
            icon: 'info',
            title: i18n('downloadingData')
          });
          const data = await getGistData(TOKEN, GIST_ID, FILE_NAME);
          if (!data) {
            return external_Swal_default().fire({
              icon: 'error',
              title: i18n('checkedNoData')
            }).then(syncOptions);
          }
          external_Swal_default().update({
            icon: 'info',
            title: i18n('savingData')
          });
          const SYNC_HISTORY = $('#sync-history').prop('checked');
          for (const [ name, value ] of Object.entries(data)) {
            if (!SYNC_HISTORY && /^[\w]+?Tasks-/.test(name)) {
              continue;
            }
            GM_setValue(name, value);
          }
          external_Swal_default().fire({
            icon: 'success',
            title: i18n('syncDataSuccess')
          });
        });
      } catch (error) {
        throwError(error, 'syncOptions');
      }
    };
    const dataSync = syncOptions;
    function Setting_classPrivateMethodInitSpec(obj, privateSet) {
      Setting_checkPrivateRedeclaration(obj, privateSet);
      privateSet.add(obj);
    }
    function Setting_checkPrivateRedeclaration(obj, privateCollection) {
      if (privateCollection.has(obj)) {
        throw new TypeError('Cannot initialize the same private elements twice on an object');
      }
    }
    function Setting_defineProperty(obj, key, value) {
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
    function Setting_classPrivateMethodGet(receiver, privateSet, fn) {
      if (!privateSet.has(receiver)) {
        throw new TypeError('attempted to get private field on non-instance');
      }
      return fn;
    }
    var Setting_getId = new WeakSet();
    var _environment = new WeakSet();
    class Setting {
      constructor() {
        Setting_classPrivateMethodInitSpec(this, _environment);
        Setting_classPrivateMethodInitSpec(this, Setting_getId);
        Setting_defineProperty(this, 'name', 'Setting');
        Setting_defineProperty(this, 'buttons', [ 'saveGlobalOptions', 'syncData', 'tasksHistory' ]);
        Setting_defineProperty(this, 'syncData', dataSync);
      }
      tasksHistory() {
        window.open('https://auto-task-v4.hclonely.com/history.html', '_blank');
      }
      static test() {
        return window.location.host === 'auto-task-v4.hclonely.com' && window.location.pathname === '/setting.html';
      }
      before() {
        $('body').html('').addClass('auto-task-options');
      }
      after() {
        try {
          Setting_classPrivateMethodGet(this, _environment, _environment2).call(this);
          changeGlobalOptions('page');
          whiteList('page');
          $('input[name="other.twitterVerifyId"]').after(`<button id="getTwitterUserId" type="button">${i18n('getTwitterUserId')}</button>`);
          $('#getTwitterUserId').on('click', () => {
            Setting_classPrivateMethodGet(this, Setting_getId, Setting_getId2).call(this, 'twitterUser');
          });
          $('input[name="other.youtubeVerifyChannel"]').after(`<button id="getYoutubeChannelId" type="button">${i18n('getYoutubeChannelId')}</button>`);
          $('#getYoutubeChannelId').on('click', () => {
            Setting_classPrivateMethodGet(this, Setting_getId, Setting_getId2).call(this, 'youtubeChannel');
          });
          $('input[name^="position"]').on('input', function() {
            const type = $(this).attr('name').replace('position.', '');
            const xLabel = 'rightleft';
            const yLabel = 'topbottpm';
            switch (type) {
             case 'buttonSideX':
             case 'buttonSideY':
             case 'buttonDistance':
              {
                const distance = $('input[name="position.buttonDistance"]').val();
                const sideX = $('input[name="position.buttonSideX"]').val();
                const sideY = $('input[name="position.buttonSideY"]').val();
                if (![ 'right', 'left' ].includes(sideX)) {
                  break;
                }
                if (![ 'top', 'bottom' ].includes(sideY)) {
                  break;
                }
                if (!/^[\d]+?,[\d]+$/.test(distance)) {
                  break;
                }
                const distanceArr = distance.split(',');
                $('#auto-task-buttons').css(sideX, `${distanceArr[0]}px`).css(sideY, `${distanceArr[1]}px`).css(xLabel.replace(sideX, ''), '').css(yLabel.replace(sideY, ''), '');
                break;
              }

             case 'showButtonSideX':
             case 'showButtonSideY':
             case 'showButtonDistance':
              {
                const distance = $('input[name="position.showButtonDistance"]').val();
                const sideX = $('input[name="position.showButtonSideX"]').val();
                const sideY = $('input[name="position.showButtonSideY"]').val();
                if (![ 'right', 'left' ].includes(sideX)) {
                  break;
                }
                if (![ 'top', 'bottom' ].includes(sideY)) {
                  break;
                }
                if (!/^[\d]+?,[\d]+$/.test(distance)) {
                  break;
                }
                const distanceArr = distance.split(',');
                $('div.show-button-div').css(sideX, `${distanceArr[0]}px`).css(sideY, `${distanceArr[1]}px`).css(xLabel.replace(sideX, ''), '').css(yLabel.replace(sideY, ''), '');
                break;
              }

             case 'logSideX':
             case 'logSideY':
             case 'logDistance':
              {
                const distance = $('input[name="position.logDistance"]').val();
                const sideX = $('input[name="position.logSideX"]').val();
                const sideY = $('input[name="position.logSideY"]').val();
                if (![ 'right', 'left' ].includes(sideX)) {
                  break;
                }
                if (![ 'top', 'bottom' ].includes(sideY)) {
                  break;
                }
                if (!/^[\d]+?,[\d]+$/.test(distance)) {
                  break;
                }
                const distanceArr = distance.split(',');
                $('#auto-task-info').css(sideX, `${distanceArr[0]}px`).css(sideY, `${distanceArr[1]}px`).css(xLabel.replace(sideX, ''), '').css(yLabel.replace(sideY, ''), '');
                break;
              }

             default:
              break;
            }
          });
          $('input[name^="hotKey"]').attr('readonly', 'readonly').off('keydown').on('keydown', function(event) {
            let functionKey = '';
            if (event.altKey) {
              functionKey += 'alt + ';
            } else if (event.ctrlKey) {
              functionKey += 'ctrl + ';
            } else if (event.shiftKey) {
              functionKey += 'shift + ';
            }
            $(this).val(functionKey + (event.key.length === 1 ? event.key.toLowerCase() : ''));
          });
        } catch (error) {
          throwError(error, 'Setting.after');
        }
      }
      saveGlobalOptions() {
        saveData();
      }
    }
    function Setting_getId2(social) {
      try {
        external_Swal_default().fire({
          title: i18n('getId', i18n(social)),
          html: `<input id="socialLink" class="swal2-input" placeholder="在此处输入链接获取id">
        <button id="link2id" data-type="${social}" class="swal2-confirm swal2-styled">获取id</button>`,
          showCancelButton: true,
          cancelButtonText: i18n('close'),
          showConfirmButton: false
        });
        $('#link2id').on('click', async function() {
          const link = $('#socialLink').val();
          if (!link) {
            return;
          }
          const type = $(this).attr('data-type');
          if (type === 'twitterUser') {
            var _link$match;
            const name = ((_link$match = link.match(/https:\/\/twitter\.com\/(.+)/)) === null || _link$match === void 0 ? void 0 : _link$match[1]) || link;
            $('#socialLink').val(await new social_Twitter().userName2id(name) || '');
          } else if (type === 'youtubeChannel') {
            var _link$match2, _await$getInfo, _await$getInfo$params;
            const name = /^https:\/\/(www\.)?google\.com.*?\/url\?.*?url=https:\/\/www.youtube.com\/.*/.test(link) ? (_link$match2 = link.match(/url=(https:\/\/www\.youtube\.com\/.*)/)) === null || _link$match2 === void 0 ? void 0 : _link$match2[1] : link;
            $('#socialLink').val(((_await$getInfo = await getInfo(name, 'channel')) === null || _await$getInfo === void 0 ? void 0 : (_await$getInfo$params = _await$getInfo.params) === null || _await$getInfo$params === void 0 ? void 0 : _await$getInfo$params.channelId) || '');
          }
        });
      } catch (error) {
        throwError(error, 'Setting.getId');
      }
    }
    function _environment2() {
      try {
        const userAgent = (0, javascript_utils_umd_min.ua)();
        const environmentForm = `<form id="environmentForm" class="auto-task-form">
        <table class="auto-task-table"><thead><tr><td>${i18n('type')}</td><td>${i18n('name')}</td><td>${i18n('version')}</td></tr></thead><tbody>
        <tr><td>${i18n('os')}</td><td>${userAgent.os}</td><td>${userAgent.osVersion}</td></tr>
        <tr><td>${i18n('browser')}</td><td>${userAgent.browserZH}</td><td>${userAgent.browserVersion}</td></tr>
        <tr><td>${i18n('scriptManager')}</td><td>${GM_info.scriptHandler}</td><td>${GM_info.version}</td></tr>
        <tr><td>${i18n('script')}</td><td>${GM_info.script.name}</td><td>${GM_info.script.version}</td></tr>
        </tbody></table></form>`;
        $('body').append(`<h2>${i18n('environment')}</h2>${environmentForm}`);
      } catch (error) {
        throwError(error, 'Setting.environment');
      }
    }
    const website_Setting = Setting;
    function History_classPrivateMethodInitSpec(obj, privateSet) {
      History_checkPrivateRedeclaration(obj, privateSet);
      privateSet.add(obj);
    }
    function History_checkPrivateRedeclaration(obj, privateCollection) {
      if (privateCollection.has(obj)) {
        throw new TypeError('Cannot initialize the same private elements twice on an object');
      }
    }
    function History_defineProperty(obj, key, value) {
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
    function History_classPrivateMethodGet(receiver, privateSet, fn) {
      if (!privateSet.has(receiver)) {
        throw new TypeError('attempted to get private field on non-instance');
      }
      return fn;
    }
    var _addItem = new WeakSet();
    class History extends website_Keylol {
      constructor() {
        super(...arguments);
        History_classPrivateMethodInitSpec(this, _addItem);
        History_defineProperty(this, 'name', 'History');
        History_defineProperty(this, 'buttons', [ 'doTask', 'undoTask', 'selectAll', 'selectNone', 'invertSelect', 'clearHistory' ]);
      }
      static test() {
        return window.location.host === 'auto-task-v4.hclonely.com' && window.location.pathname === '/history.html';
      }
      before() {
        try {
          $('body').html('<div class="container"></div>').addClass('auto-task-history');
          const data = GM_listValues() || [];
          const tasksHistory = data.map(value => /^[\w]+?Tasks-/.test(value) ? value : null).filter(value => value);
          for (const item of tasksHistory) {
            History_classPrivateMethodGet(this, _addItem, _addItem2).call(this, item);
          }
        } catch (error) {
          throwError(error, 'History.before');
        }
      }
      clearHistory() {
        try {
          const data = GM_listValues() || [];
          const tasksHistory = data.map(value => /^[\w]+?Tasks-/.test(value) ? value : null).filter(value => value);
          for (const item of tasksHistory) {
            GM_deleteValue(item);
          }
          external_Swal_default().fire({
            title: i18n('clearHistoryFinished'),
            icon: 'success'
          });
        } catch (error) {
          throwError(error, 'History.after');
        }
      }
    }
    function _addItem2(item) {
      try {
        const tasksData = GM_getValue(item);
        if (!(tasksData !== null && tasksData !== void 0 && tasksData.tasks)) {
          return;
        }
        let html = '';
        let title = '';
        let link = '';
        const [ website, id ] = item.split('-');
        switch (website) {
         case 'fawTasks':
          title = `Freeanywhere[${id}]`;
          link = `https://freeanywhere.net/#/giveaway/${id}`;
          break;

         case 'gasTasks':
          title = `Giveawaysu[${id}]`;
          link = `https://giveaway.su/giveaway/view/${id}`;
          break;

         case 'gcTasks':
          title = `GiveeClub[${id}]`;
          link = `https://givee.club/event/${id}`;
          break;

         case 'gkTasks':
          title = `Givekey[${id}]`;
          link = `https://givekey.ru/giveaway/${id}`;
          break;

         case 'gleamTasks':
          title = `Gleam[${id}]`;
          link = `https://gleam.io${id}`;
          break;

         case 'khTasks':
          title = `keyhub[${id}]`;
          link = `https://key-hub.eu/giveaway/${id}`;
          break;

         case 'prysTasks':
          title = `Prys[${id}]`;
          link = `https://prys.revadike.com/giveaway/?id=${id}`;
          break;

         default:
          return;
        }
        for (const [ social, types ] of Object.entries(tasksData.tasks)) {
          for (const [ type, tasks ] of Object.entries(types)) {
            for (const task of tasks) {
              html += `<li><font class="auto-task-capitalize">${social}.${i18n(type.replace('Link', ''))}: </font><a href="${task}" target="_blank">${task.length > 55 ? `${task.slice(0, 55)}...` : task}</a></li>`;
            }
          }
        }
        $('.container').append(`<div class="card" data-name="${item}"><div class="title"><a href="${link}" target="_blank">${title}</a><span class="delete-task" data-name="${item}" title="${i18n('deleteTask')}"><svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2734" width="32" height="32"><path d="M607.897867 768.043004c-17.717453 0-31.994625-14.277171-31.994625-31.994625L575.903242 383.935495c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 351.94087C639.892491 753.593818 625.61532 768.043004 607.897867 768.043004z" p-id="2735" fill="#d81e06"></path><path d="M415.930119 768.043004c-17.717453 0-31.994625-14.277171-31.994625-31.994625L383.935495 383.935495c0-17.717453 14.277171-31.994625 31.994625-31.994625 17.717453 0 31.994625 14.277171 31.994625 31.994625l0 351.94087C447.924744 753.593818 433.647573 768.043004 415.930119 768.043004z" p-id="2736" fill="#d81e06"></path><path d="M928.016126 223.962372l-159.973123 0L768.043004 159.973123c0-52.980346-42.659499-95.983874-95.295817-95.983874L351.94087 63.989249c-52.980346 0-95.983874 43.003528-95.983874 95.983874l0 63.989249-159.973123 0c-17.717453 0-31.994625 14.277171-31.994625 31.994625s14.277171 31.994625 31.994625 31.994625l832.032253 0c17.717453 0 31.994625-14.277171 31.994625-31.994625S945.73358 223.962372 928.016126 223.962372zM319.946246 159.973123c0-17.545439 14.449185-31.994625 31.994625-31.994625l320.806316 0c17.545439 0 31.306568 14.105157 31.306568 31.994625l0 63.989249L319.946246 223.962372 319.946246 159.973123 319.946246 159.973123z" p-id="2737" fill="#d81e06"></path><path d="M736.048379 960.010751 288.123635 960.010751c-52.980346 0-95.983874-43.003528-95.983874-95.983874L192.139761 383.591466c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 480.435411c0 17.717453 14.449185 31.994625 31.994625 31.994625l448.096758 0c17.717453 0 31.994625-14.277171 31.994625-31.994625L768.215018 384.795565c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 479.231312C832.032253 916.835209 789.028725 960.010751 736.048379 960.010751z" p-id="2738" fill="#d81e06"></path></svg></span></div><ul>${html}</ul><span class="time">${i18n('lastChangeTime')}: ${external_dayjs_namespaceObject(tasksData.time).format('YYYY-MM-DD HH:mm:ss')}</span></div>`);
        $('span.delete-task').on('click', function() {
          const itemName = $(this).attr('data-name');
          if (itemName) {
            GM_deleteValue(itemName);
            $(`div.card[data-name="${itemName}"]`).remove();
            external_Swal_default().fire({
              title: i18n('clearTaskFinished'),
              text: itemName,
              icon: 'success'
            });
          } else {
            external_Swal_default().fire({
              title: i18n('clearTaskFailed'),
              icon: 'error'
            });
          }
        });
      } catch (error) {
        throwError(error, 'History.addItem');
      }
    }
    const website_History = History;
    const Websites = [ website_FreeAnyWhere, GiveawaySu, website_Indiedb, website_Keyhub, website_Givekey, website_GiveeClub, website_OpiumPulses, website_Keylol, website_Opquests, website_Gleam, website_SweepWidget, website_Setting, website_History ];
    const websiteOptions = function(website, options) {
      try {
        let websiteOptionsForm = `<form id="websiteOptionsForm" class="auto-task-form">
  <table class="auto-task-table"><thead><tr><td>${i18n('option')}</td><td>${i18n('value')}</td></tr></thead><tbody>`;
        for (const [ option, value ] of Object.entries(options)) {
          websiteOptionsForm += `<tr><td>${option}</td><td><input class="editOption" type="text" name="${option}" value="${value}"/></td></tr>`;
        }
        websiteOptionsForm += '</tbody></table></form>';
        external_Swal_default().fire({
          title: i18n('websiteOptions'),
          html: websiteOptionsForm,
          showConfirmButton: true,
          confirmButtonText: i18n('save'),
          showCancelButton: true,
          cancelButtonText: i18n('close')
        }).then(_ref => {
          let {
            isConfirmed
          } = _ref;
          if (isConfirmed) {
            $('#websiteOptionsForm').serializeArray().map(value => {
              options[value.name] = value.value;
              return value;
            });
            GM_setValue(`${website}Options`, options);
            external_Swal_default().fire({
              title: i18n('changeWebsiteOptionsSuccess'),
              icon: 'success'
            });
          }
        });
      } catch (error) {
        throwError(error, 'websiteOptions');
      }
    };
    const options = websiteOptions;
    const external_keyboardJS_namespaceObject = keyboardJS;
    var external_keyboardJS_default = __webpack_require__.n(external_keyboardJS_namespaceObject);
    const checkUpdate = async (updateLink, auto) => {
      try {
        const checkUrl = `${updateLink}package.json?time=${new Date().getTime()}`;
        const {
          result,
          statusText,
          status,
          data
        } = await tools_httpRequest({
          url: checkUrl,
          responseType: 'json',
          method: 'GET',
          timeout: 3e4
        });
        if (result === 'Success') {
          var _data$response;
          if (data !== null && data !== void 0 && (_data$response = data.response) !== null && _data$response !== void 0 && _data$response.version) {
            return data.response;
          }
          if (!auto) {
            scripts_echoLog({}).error(`${i18n('checkUpdateFailed')}[${data === null || data === void 0 ? void 0 : data.statusText}(${data === null || data === void 0 ? void 0 : data.status})]`);
          }
          return false;
        }
        if (!auto) {
          scripts_echoLog({}).error(`${i18n('checkUpdateFailed')}[${result}:${statusText}(${status})]`);
        }
        return false;
      } catch (error) {
        throwError(error, 'checkUpdate');
        return false;
      }
    };
    const hasNewVersion = (currentVersion, remoteVersion) => {
      try {
        const [ currentRealVersion ] = currentVersion.split('-');
        const [ remoteRealVersion, isPreview ] = remoteVersion.split('-');
        if (isPreview && !globalOptions.other.receivePreview) {
          return false;
        }
        const [ currentVersion1, currentVersion2, currentVersion3 ] = currentRealVersion.split('.').map(value => parseInt(value, 10));
        const [ remoteVersion1, remoteVersion2, remoteVersion3 ] = remoteRealVersion.split('.').map(value => parseInt(value, 10));
        if (remoteVersion1 > currentVersion1) {
          return true;
        }
        if (remoteVersion1 < currentVersion1) {
          return false;
        }
        if (remoteVersion2 > currentVersion2) {
          return true;
        }
        if (remoteVersion2 < currentVersion2) {
          return false;
        }
        if (remoteVersion3 > currentVersion3) {
          return true;
        }
        return false;
      } catch (error) {
        throwError(error, 'compareVersion');
        return false;
      }
    };
    const updateChecker = async () => {
      try {
        const currentVersion = GM_info.script.version;
        const updateSource = globalOptions.other.autoUpdateSource.toLowerCase();
        const updateLinks = {
          github: 'https://github.com/HCLonely/auto-task-new/raw/main/',
          jsdelivr: 'https://cdn.jsdelivr.net/gh/HCLonely/auto-task-v4@main/',
          standby: 'https://auto-task-v4.hclonely.com/'
        };
        let version;
        let updateLink = '';
        let packageData;
        if ([ 'github', 'jsdelivr', 'standby' ].includes(updateSource)) {
          updateLink = updateLinks[updateSource];
          packageData = await checkUpdate(updateLink, false);
        } else {
          updateLink = updateLinks.github;
          packageData = await checkUpdate(updateLink, true);
          if (!packageData) {
            updateLink = updateLinks.jsdelivr;
            packageData = await checkUpdate(updateLink, true);
            if (!packageData) {
              updateLink = updateLinks.standby;
              packageData = await checkUpdate(updateLink, true);
            }
          }
        }
        if (packageData) {
          version = packageData.version || currentVersion;
        } else {
          version = currentVersion;
          scripts_echoLog({}).error(i18n('checkUpdateFailed'));
        }
        if (packageData && hasNewVersion(currentVersion, version)) {
          var _packageData$change;
          scripts_echoLog({
            html: `<li><font>${i18n('newVersionNotice', version, `${updateLink}dist/${GM_info.script.name}.user.js`)}</font></li>`
          });
          scripts_echoLog({
            html: `<li>${i18n('updateText', version)}</li><ol class="update-text">${(_packageData$change = packageData.change) === null || _packageData$change === void 0 ? void 0 : _packageData$change.map(change => `<li>${change}</li>`).join('')}<li>${i18n('updateHistory')}</li></ol>`
          });
        }
      } catch (error) {
        throwError(error, 'updateChecker');
      }
    };
    const scripts_updateChecker = updateChecker;
    var _globalOptions$other, _globalOptions$other2;
    window.STYLE = GM_addStyle(auto_task.Z + GM_getResourceText('style'));
    window.DEBUG = !!((_globalOptions$other = globalOptions.other) !== null && _globalOptions$other !== void 0 && _globalOptions$other.debug);
    window.TRACE = !!((_globalOptions$other2 = globalOptions.other) !== null && _globalOptions$other2 !== void 0 && _globalOptions$other2.debug) && typeof console.trace === 'function';
    const loadScript = async () => {
      var _website, _website2, _website3, _website4, _website5, _website6;
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
          external_Swal_default().fire('', i18n('closePageNotice'));
        } else {
          external_Swal_default().fire('', i18n('needLogin'));
        }
        return;
      }
      if (window.location.hostname === 'twitter.com' && window.location.hash === '#auth') {
        const ct0 = external_Cookies_namespaceObject.get('ct0');
        const isLogin = !!external_Cookies_namespaceObject.get('twid');
        if (isLogin && ct0) {
          GM_setValue('twitterAuth', {
            ct0: ct0
          });
          window.close();
          external_Swal_default().fire('', i18n('closePageNotice'));
        } else {
          external_Swal_default().fire('', i18n('needLogin'));
        }
        return;
      }
      if (window.location.hostname === 'www.youtube.com' && window.location.hash === '#auth') {
        const PAPISID = external_Cookies_namespaceObject.get('__Secure-3PAPISID');
        if (PAPISID) {
          GM_setValue('youtubeAuth', {
            PAPISID: PAPISID
          });
          window.close();
          external_Swal_default().fire('', i18n('closePageNotice'));
        } else {
          external_Swal_default().fire('', i18n('needLogin'));
        }
        return;
      }
      if (window.location.hostname === 'www.reddit.com' && (window.location.hash === '#auth' || GM_getValue('redditAuth') === '#auth')) {
        const betaButton = $('#redesign-beta-optin-btn');
        if (betaButton.length > 0) {
          GM_setValue('redditAuth', '#auth');
          return betaButton[0].click();
        }
        GM_setValue('redditAuth', null);
        window.close();
        external_Swal_default().fire('', i18n('closePageNotice'));
        return;
      }
      let website;
      for (const Website of Websites) {
        if (Website.test()) {
          website = new Website();
          break;
        }
      }
      if (!website) {
        console.log('%c%s', 'color:#ff0000', 'Auto-Task[Warning]: 脚本停止加载，当前网站不支持！');
        return;
      }
      if ((_website = website) !== null && _website !== void 0 && _website.before) {
        await ((_website2 = website) === null || _website2 === void 0 ? void 0 : _website2.before());
      }
      $('body').append(`<div id="auto-task-info" style="display:${globalOptions.other.defaultShowLog ? 'block' : 'none'};${globalOptions.position.logSideX}:${globalOptions.position.logDistance.split(',')[0]}px;${globalOptions.position.logSideY}:${globalOptions.position.logDistance.split(',')[1]}px;"></div><div id="auto-task-buttons" style="display:${globalOptions.other.defaultShowButton ? 'block' : 'none'};${globalOptions.position.buttonSideX}:${globalOptions.position.buttonDistance.split(',')[0]}px;${globalOptions.position.buttonSideY}:${globalOptions.position.buttonDistance.split(',')[1]}px;"></div><div class="show-button-div" style="display:${globalOptions.other.defaultShowButton ? 'none' : 'block'};${globalOptions.position.showButtonSideX}:${globalOptions.position.showButtonDistance.split(',')[0]}px;${globalOptions.position.showButtonSideY}:${globalOptions.position.showButtonDistance.split(',')[1]}px;"><a class="auto-task-website-btn" href="javascript:void(0);" target="_self" title="${i18n('showButton')}"></a></div>`);
      $('div.show-button-div').on('click', () => {
        $('#auto-task-buttons').show();
        $('div.show-button-div').hide();
      });
      const toggleLog = () => {
        const $this = $('#toggle-log');
        const status = $this.attr('data-status');
        if (status === 'show') {
          $('#auto-task-info').hide();
          $this.attr('data-status', 'hide').text(i18n('showLog'));
        } else {
          $('#auto-task-info').show();
          $this.attr('data-status', 'show').text(i18n('hideLog'));
        }
      };
      external_keyboardJS_default().bind(globalOptions.hotKey.doTaskKey, () => {
        if (website.doTask) {
          website.doTask();
        }
      });
      external_keyboardJS_default().bind(globalOptions.hotKey.undoTaskKey, () => {
        if (website.undoTask) {
          website.doTask();
        }
      });
      external_keyboardJS_default().bind(globalOptions.hotKey.toggleLogKey, toggleLog);
      if ((_website3 = website) !== null && _website3 !== void 0 && _website3.after) {
        await ((_website4 = website) === null || _website4 === void 0 ? void 0 : _website4.after());
      }
      if ((_website5 = website) !== null && _website5 !== void 0 && _website5.buttons && $('#auto-task-buttons').children().length === 0) {
        $('#auto-task-buttons').addClass(`${website.name}-buttons`);
        for (const button of website.buttons) {
          if (website[button]) {
            const btnElement = $(`<p><a class="auto-task-website-btn ${website.name}-button" href="javascript:void(0);" target="_self">${i18n(button)}</a></p>`);
            btnElement.find('a.auto-task-website-btn').on('click', () => {
              website[button]();
            });
            $('#auto-task-buttons').append(btnElement);
          }
        }
      }
      const hideButtonElement = $(`<p><a class="auto-task-website-btn ${website.name}-button" href="javascript:void(0);" target="_self">
    ${i18n('hideButton')}</a></p>`);
      hideButtonElement.find('a.auto-task-website-btn').on('click', () => {
        $('#auto-task-buttons').hide();
        $('div.show-button-div').show();
      });
      const toggleLogElement = $(`<p><a id="toggle-log" class="auto-task-website-btn ${website.name}-button" href="javascript:void(0);" target="_self" data-status="${globalOptions.other.defaultShowLog ? 'show' : 'hide'}">
      ${globalOptions.other.defaultShowLog ? i18n('hideLog') : i18n('showLog')}</a></p>`);
      toggleLogElement.find('a.auto-task-website-btn').on('click', toggleLog);
      $('#auto-task-buttons').append(hideButtonElement).append(toggleLogElement);
      if ((_website6 = website) !== null && _website6 !== void 0 && _website6.options) {
        GM_registerMenuCommand(i18n('changeWebsiteOptions'), () => {
          options(website.name, website.options);
        });
      }
      if (website.name !== 'Setting') {
        GM_registerMenuCommand(i18n('changeGlobalOptions'), () => {
          changeGlobalOptions('swal');
        });
        GM_registerMenuCommand(i18n('settingPage'), () => {
          window.open('https://auto-task-v4.hclonely.com/setting.html', '_blank');
        });
      }
      console.log('%c%s', 'color:#1bbe1a', 'Auto-Task[Load]: 脚本加载完成');
      if (!GM_getValue('notice')) {
        var _echoLog$font;
        external_Swal_default().fire({
          title: i18n('swalNotice'),
          icon: 'warning'
        }).then(() => {
          window.open(i18n('noticeLink'), '_blank');
          GM_setValue('notice', new Date().getTime());
        });
        (_echoLog$font = scripts_echoLog({
          html: `<li><font class="warning">${i18n('echoNotice', i18n('noticeLink'))}</font></li>`
        }).font) === null || _echoLog$font === void 0 ? void 0 : _echoLog$font.find('a').on('click', () => {
          GM_setValue('notice', new Date().getTime());
        });
      }
      scripts_updateChecker();
    };
    if (window.location.hostname === 'discord.com') {
      const LocalStorage = window.localStorage;
      if (window.location.hash === '#auth') {
        var _LocalStorage$getItem;
        window.localStorage.removeItem = () => true;
        const discordAuth = LocalStorage === null || LocalStorage === void 0 ? void 0 : (_LocalStorage$getItem = LocalStorage.getItem('token')) === null || _LocalStorage$getItem === void 0 ? void 0 : _LocalStorage$getItem.replace(/^"|"$/g, '');
        if (discordAuth && discordAuth.length > 0) {
          GM_setValue('discordAuth', {
            auth: discordAuth
          });
          window.close();
          external_Swal_default().fire('', i18n('closePageNotice'));
        } else {
          external_Swal_default().fire({
            text: i18n('getDiscordAuthFailed'),
            icon: 'error'
          });
        }
      } else {
        var _LocalStorage$getItem2;
        const discordAuth = LocalStorage === null || LocalStorage === void 0 ? void 0 : (_LocalStorage$getItem2 = LocalStorage.getItem('token')) === null || _LocalStorage$getItem2 === void 0 ? void 0 : _LocalStorage$getItem2.replace(/^"|"$/g, '');
        if (discordAuth && discordAuth.length > 0) {
          GM_setValue('discordAuth', {
            auth: discordAuth
          });
        }
      }
    } else if (window.location.hostname === 'opquests.com') {
      loadScript();
    } else {
      $(loadScript);
    }
  }();
})();
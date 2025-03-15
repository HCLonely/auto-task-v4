// ==UserScript==
// @name               auto-task-v4
// @namespace          auto-task-v4
// @version            4.7.1
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
// @include            *://giveawayhopper.com/c/*

// @include            *://discord.com/*
// @include            *://www.twitch.tv/*
// @include            *://www.youtube.com/*
// @include            *://*.reddit.com/*
// @include            *://twitter.com/settings/account?k*
// @include            *://x.com/settings/account*
// @include            *://steamcommunity.com/*
// @include            *://store.steampowered.com/*
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
// @grant              GM_cookie
// @grant              GM_addValueChangeListener
// @grant              GM_removeValueChangeListener
// @grant              unsafeWindow
// @grant              window.close
// @grant              window.localStorage
// @grant              window.sessionStorage
// @grant              window.focus

// @connect            cdn.jsdelivr.net
// @connect            store.steampowered.com
// @connect            steamcommunity.com
// @connect            login.steampowered.com
// @connect            twitter.com
// @connect            x.com
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
// @connect            giveawayhopper.com
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
    991: function(__unused_webpack_module, exports) {
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
              return o = (n.match(/((\d+_)+\d+)/) || [])[1], this.info.os = 'iPad', 
              this.info.device = 'Tablet', void (this.info.osVersion = o.replace(/_/g, '.'));
            }
            if (/^iPhone/i.test(n)) {
              return o = (n.match(/((\d+_)+\d+)/) || [])[1], this.info.os = 'iPhone', 
              this.info.device = 'Mobile', void (this.info.osVersion = o.replace(/_/g, '.'));
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
    675: function(module, __webpack_exports__, __webpack_require__) {
      'use strict';
      __webpack_require__.d(__webpack_exports__, {
        A: function() {
          return __WEBPACK_DEFAULT_EXPORT__;
        }
      });
      var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(601);
      var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
      var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(314);
      var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = __webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
      var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());
      ___CSS_LOADER_EXPORT___.push([ module.id, `.colorful-button,#auto-task-buttons a.auto-task-website-btn,.show-button-div a.auto-task-website-btn,body.auto-task-options .auto-task-form table button{position:relative;padding:5px 10px;text-align:center;color:#fff;text-decoration:none;background:linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);border-radius:30px;background-size:400%;text-transform:capitalize}.colorful-button:hover,#auto-task-buttons a.auto-task-website-btn:hover,.show-button-div a.auto-task-website-btn:hover,body.auto-task-options .auto-task-form table button:hover{transform:scale(1.05);box-shadow:0 6px 20px rgba(0,0,0,.3);cursor:pointer}.colorful-button:hover::before,#auto-task-buttons a.auto-task-website-btn:hover::before,.show-button-div a.auto-task-website-btn:hover::before,body.auto-task-options .auto-task-form table button:hover::before{filter:blur(10px);opacity:1}.colorful-button::before,#auto-task-buttons a.auto-task-website-btn::before,.show-button-div a.auto-task-website-btn::before,body.auto-task-options .auto-task-form table button::before{content:"";position:absolute;top:-5px;left:-5px;right:-5px;bottom:-5px;z-index:-1;background:linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);border-radius:40px;background-size:400%;opacity:-1}#auto-task-info{position:fixed;bottom:10px;right:10px;width:60%;max-width:500px;max-height:60%;overflow-y:auto;color:#000;background-color:#fff;padding-left:5px;z-index:999999999 !important;border:solid 2px #add8e6;border-radius:10px}#auto-task-info li{text-align:left}#auto-task-info li a.high-light{color:#00aeff;font-weight:bold}#auto-task-info .success{color:green}#auto-task-info .error{color:red}#auto-task-info .warning{color:blue}#auto-task-info .info{color:#ff0}#auto-task-info .update-text{color:green;border:solid 2px #8dcb69;margin:5px 10px 5px 20px;border-radius:10px;padding:5px 20px}.auto-task-keylol{display:inline-block;text-transform:capitalize;margin-left:10px;text-decoration:none !important;border:solid 1px;border-radius:5px;padding:0 2px}.auto-task-keylol[selected=selected]{background-color:blue !important;color:#fff !important}.auto-task-form table{font-family:verdana,arial,sans-serif;font-size:11px;color:#333;border-width:1px;border-color:#999;border-collapse:collapse;width:100%}.auto-task-form table thead td{border-width:1px;padding:8px;border-style:solid;border-color:#a9c6c9;font-weight:bold;background-color:#fff}.auto-task-form table tbody tr{background-color:#d4e3e5}.auto-task-form table tbody tr:hover{background-color:#ff6 !important}.auto-task-form table tbody tr th{background-color:#c3dde0;border-width:1px;padding:8px;border-style:solid;border-color:#a9c6c9;text-transform:capitalize}.auto-task-form table tbody tr td{border-width:1px;padding:8px;border-style:solid;border-color:#a9c6c9}.swal2-modal{width:70% !important;max-width:1000px !important}body.auto-task-options{padding-top:10px;text-align:center}body.auto-task-options .auto-task-form{width:80%;max-width:1000px;margin:0 auto;padding-bottom:20px}body.auto-task-options .auto-task-form table input.editOption{width:80%}body.auto-task-options .auto-task-form table #getTwitterUserId,body.auto-task-options .auto-task-form table #getYoutubeChannelId{margin-top:5px}body.auto-task-options .auto-task-form table button{z-index:1}body.auto-task-options .auto-task-form table input[type=text]{outline-style:none;border:1px solid #ccc;border-radius:3px;padding:5px 10px;font-size:14px}body.auto-task-options .auto-task-form table input[type=text]:focus{border-color:#66afe9;outline:0;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6)}body.auto-task-options .auto-task-form table label{position:relative;width:160px;height:80px;cursor:pointer;transform:scale(0.25);margin:-25% 0;top:-30px;display:inline-block}body.auto-task-options .auto-task-form table label input{position:relative;z-index:1;appearance:none}body.auto-task-options .auto-task-form table label input:checked~span{background:#05be05;box-shadow:0 15px 25px rgba(5,190,5,.4)}body.auto-task-options .auto-task-form table label input:checked~span i{left:84px}body.auto-task-options .auto-task-form table label input:checked~span i::before{background:#05be05;box-shadow:35px 0 0 #05be05}body.auto-task-options .auto-task-form table label input:checked~span i::after{bottom:12px;height:15px;border-bottom-left-radius:15px;border-bottom-right-radius:15px;background:#05be05}body.auto-task-options .auto-task-form table label span{position:absolute;top:0;left:0;width:100%;height:100%;background:#fe0000;border-radius:80px;transition:.5s;box-shadow:0 15px 25px rgba(254,0,0,.4)}body.auto-task-options .auto-task-form table label span i{position:absolute;top:4px;left:4px;width:72px;height:72px;background:#fff;border-radius:50%}body.auto-task-options .auto-task-form table label span i::before{content:"";position:absolute;top:22px;left:12px;width:12px;height:12px;border-radius:50%;background:#fe0000;box-shadow:35px 0 0 #fe0000;transition:.5s}body.auto-task-options .auto-task-form table label span i::after{content:"";position:absolute;bottom:15px;left:calc(50% - 15px);width:30px;height:6px;border-radius:6px;background:#fe0000;transition:.5s}body.auto-task-history{font-size:15px;font-weight:400;line-height:1.5}body.auto-task-history .container a{color:#007bff;text-decoration:none;background-color:rgba(0,0,0,0)}body.auto-task-history .container .card{width:80%;max-width:800px;border-radius:10px;background:rgba(118,118,118,.1019607843);border-top:1px solid rgba(255,255,255,.5019607843);-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);box-shadow:0 15px 25px rgba(0,0,0,.1019607843);margin:20px auto;position:relative;display:flex;flex-direction:column;word-wrap:break-word;-webkit-background-clip:border-box;background-clip:border-box;border:1px solid rgba(0,0,0,.125);border-radius:.25rem}body.auto-task-history .container .card .title{text-align:center;font-size:30px;font-weight:bold;margin:5px 0}body.auto-task-history .container .card .title a:hover{text-decoration:none;background:#93e1ff;border-radius:10px;padding:3px}body.auto-task-history .container .card ul{margin-bottom:25px}body.auto-task-history .container .card ul li{margin-bottom:5px;line-height:20px}body.auto-task-history .container .card ul a:hover{text-decoration:underline}body.auto-task-history .container .card .delete-task{right:10px;width:38px;height:35px;position:absolute;font-size:24px;cursor:pointer;border-radius:10px}body.auto-task-history .container .card .delete-task:hover{background:#fff}body.auto-task-history .container .card .time{right:5px;position:absolute;bottom:0;color:#e83e8c;font-family:'SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace';font-size:15px}#auto-task-buttons,.show-button-div{position:fixed;top:30px;right:15px;width:124px;z-index:999999999 !important;transform:scale(0.85)}#auto-task-buttons p,.show-button-div p{line-height:30px;height:40px;text-align:center;margin:5px !important}#auto-task-buttons a.auto-task-website-btn,.show-button-div a.auto-task-website-btn{width:105px;line-height:27px;font-size:20px;display:block}.show-button-div{width:20px}.auto-task-capitalize{text-transform:capitalize !important}.swal2-file:focus,.swal2-input:focus,.swal2-textarea:focus{box-shadow:inset 0px 0px 4px 1px rgba(100,150,200,.5) !important}.swal2-checkbox-custom{align-items:center;justify-content:center;background:#fff;color:inherit;margin:1em auto}.swal2-checkbox-custom input{flex-shrink:0;margin:0 .4em}.giveaway-actions #getKey{display:none !important}.auto-task-giveaway-status{color:#fff;border-radius:10px;padding:0 5px;margin-left:5px}.auto-task-giveaway-status.active{background-color:#5cb85c}.auto-task-giveaway-status.not-active{background-color:#d9534f}`, '' ]);
      const __WEBPACK_DEFAULT_EXPORT__ = ___CSS_LOADER_EXPORT___.toString();
    },
    314: function(module) {
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
    601: function(module) {
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
    var external_Cookies_default = __webpack_require__.n(external_Cookies_namespaceObject);
    var auto_task = __webpack_require__(675);
    var javascript_utils_umd_min = __webpack_require__(991);
    const httpRequest = async (options, times = 0) => {
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
                const headers = {};
                data.responseHeaders?.split('\n').forEach(header => {
                  const headerArr = header.trim().split(':');
                  const name = headerArr.shift()?.trim() || '';
                  const value = headerArr.join(':').trim();
                  if (name && value) {
                    if (headers[name]) {
                      if (Array.isArray(headers[name])) {
                        headers[name].push(value);
                      } else {
                        headers[name] = [ headers[name], value ];
                      }
                    } else {
                      headers[name] = value;
                    }
                  }
                });
                if (headers['set-cookie'] && !Array.isArray(headers['set-cookie'])) {
                  headers['set-cookie'] = [ headers['set-cookie'] ];
                }
                data.responseHeadersText = data.responseHeaders;
                data.responseHeaders = headers;
                data.finalUrl = data.responseHeaders?.location || data.finalUrl;
                if (options.responseType === 'json' && data?.response && typeof data.response !== 'object') {
                  try {
                    data.response = JSON.parse(data.responseText);
                  } catch (error) {}
                }
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
    const echoLog = ({
      type,
      text,
      html,
      id
    }) => {
      const emptyStatus = {
        success: () => emptyStatus,
        error: () => emptyStatus,
        warning: () => emptyStatus,
        info: () => emptyStatus,
        view: () => emptyStatus
      };
      try {
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
           case 'gettingCuratorId':
            ele = $(`<li>${i18n(type)}[<a href="https://store.steampowered.com/${text?.includes('/') ? text : `curator/${text}`}" target="_blank">${text}</a>]...<font></font></li>`);
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
            ele = $(`<li>${i18n(type)}[<a href="https://x.com/${text}" target="_blank">${text}</a>]...<font></font></li>`);
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
            ele = $(`<li>${i18n(type)}[<a href="https://www.reddit.com/user/${text?.replace('u_', '')}" target="_blank">
      ${text?.replace('u_', '')}</a>]...<font></font></li>`);
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
        ele[0]?.scrollIntoView();
        const font = ele.find('font');
        const status = {
          font: font,
          success(text = 'Success', html = false) {
            this.font?.attr('class', '').addClass('success');
            html ? this.font?.html(text) : this.font?.text(text);
            return this;
          },
          error(text = 'Error', html = false) {
            this.font?.attr('class', '').addClass('error');
            html ? this.font?.html(text) : this.font?.text(text);
            return this;
          },
          warning(text = 'Warning', html = false) {
            this.font?.attr('class', '').addClass('warning');
            html ? this.font?.html(text) : this.font?.text(text);
            return this;
          },
          info(text = 'Info', html = false) {
            this.font?.attr('class', '').addClass('info');
            html ? this.font?.html(text) : this.font?.text(text);
            return this;
          },
          view() {
            this.font?.[0].scrollIntoView();
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
    const delay = (time = 1e3) => new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
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
        }).then(({
          data
        }) => {
          if (data?.finalUrl) {
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
        }).then(({
          result,
          statusText,
          status
        }) => {
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
    const debug = (log, data) => {
      if (!window.DEBUG) {
        return;
      }
      console.log('%c%s', 'color:#a7a7a7', `Auto-Task[Debug]: ${log}`);
      if (data) {
        console.log('%c%s', 'color:#a7a7a7', 'Auto-Task[Debug]: ', data);
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
      ASF: {
        AsfEnabled: false,
        AsfIpcUrl: '',
        AsfIpcPassword: '',
        AsfBotname: 'asf'
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
            if ([ 'other', 'position', 'hotKey', 'ASF' ].includes(type)) {
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
          }).then(({
            isConfirmed
          }) => {
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
      refreshingToken: '正在刷新%0凭证...',
      settingToken: '正在设置%0凭证...',
      steamStoreTab: 'Steam商店(弹窗)',
      steamCommunityTab: 'Steam社区(弹窗)',
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
      checkLogin: '登录检测</br>需要登录的网站自动登录，部分网站支持',
      checkLeftKey: '剩余Key检测</br>赠Key活动结束提示是否关闭，部分网站支持',
      twitterVerifyId: '通过尝试关注该账号验证Twitter凭证</br>默认为Twitter官方帐号 783214</br>不想关注官方账号可以改为自己的帐号',
      youtubeVerifyChannel: '通过尝试订阅该频道验证YouTube凭证</br>默认为YouTube官方频道 UCrXUsMBcfTVqwAS7DKg9C0Q</br>不想关注官方频道可以改为自己的频道',
      autoUpdateSource: '更新源</br>github: 需代理，实时更新</br>jsdelivr: 可不用代理，更新有延迟</br>standby: 备用</br>auto: 依次使用github, jsdelivr, standby源进行尝试更新',
      saveGlobalOptions: '保存设置',
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
      AsfEnabled: '使用ASF做Steam相关任务(需<a href="https://github.com/chr233/ASFEnhance" target="_blank">ASFEnhance</a>插件)',
      AsfIpcUrl: 'ASF IPC 地址',
      AsfIpcPassword: 'ASF IPC 密码',
      versionNotMatched: '脚本管理器版本过低，需TamperMonkey >= 5.2.0或TamperMonkey Beta >= 5.2.6196',
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
      steamFinishNotice: 'Steam任务完成，尝试将购物车地区换回',
      gettingSubid: '正在获取游戏subid',
      addingFreeLicense: '正在入库',
      missParams: '缺少参数',
      gettingLicenses: '正在获取Licenses...',
      requestingPlayTestAccess: '正在请求访问权限',
      tryChangeAreaNotice: '此功能无法检测游戏是否限区，因此会尝试换区后再入库，换区失败也不影响后续入库',
      gettingUserLink: '正在获取Steam用户社区链接...',
      retry: '重试',
      owned: '已拥有',
      redirect: '重定向',
      noSubid: '无法获取，跳过',
      initingASF: '正在初始化ASF...',
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
      checkingTwitchIntegrity: '正在检查Twitch完整性...',
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
      campaign: '检测到人机验证，请完成验证后重新验证任务！',
      gsNotice: '为避免得到"0000-0000-0000"key, 已自动屏蔽"Grab Key"按钮，获取key时请关闭脚本！',
      giveeClubVerifyNotice: '正在验证任务...',
      giveeClubVerifyFinished: '请等待验证完成后自行加入赠Key',
      doingKeyhubTask: '正在做Keyhub任务...',
      SweepWidgetNotice: '正在处理并验证任务，每次验证任务有1~3s间隔防止触发验证过快警告...',
      tasksNotCompleted: '任务未完成',
      notConnect: '社交平台未连接，跳过任务',
      confirmingTask: '正在跳过警告页面...'
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
      refreshingToken: 'Refreshing %0 token...',
      settingToken: 'Setting %0 token...',
      steamStoreTab: 'Steam store (new tab)',
      steamCommunityTab: 'Steam community(new tab)',
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
      AsfEnabled: 'Use ASF to do Steam related tasks (requires <a href="https://github.com/chr233/ASFEnhance" target="_blank">ASFEnhance</a> plugin)',
      AsfIpcUrl: 'ASF IPC URL',
      AsfIpcPassword: 'ASF IPC Password',
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
      steamFinishNotice: 'Steam task completed, try to change the shopping cart area back to ',
      gettingSubid: 'Getting subid',
      addingFreeLicense: 'Adding free license',
      missParams: 'Missing parameters',
      gettingLicenses: 'Getting licenses...',
      requestingPlayTestAccess: 'Requesting play test access',
      tryChangeAreaNotice: 'This function cannot detect whether the game is limited, so it will try to change the area before entering the library' + '. Failure to change the area will not affect the subsequent storage.',
      versionNotMatched: 'The script manager version is too low, requiring TamperMonkey >= 5.2.0 or TamperMonkey Beta >= 5.2.6196',
      gettingUserLink: 'Getting steam user community link...',
      retry: 'Retry',
      owned: 'Owned',
      redirect: 'Redirect',
      noSubid: 'skip due to unrecognized',
      initingASF: 'Initing ASF...',
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
      checkingTwitchIntegrity: 'Checking Twitch integrity...',
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
      campaign: 'ReCAPTCHA detected, please complete it and re-verify the tasks!',
      gsNotice: 'In order to avoid getting the "0000-0000-0000" key, the "Grab Key" button has been hidden,' + ' please close the script when obtaining the key!',
      giveeClubVerifyNotice: 'Verifying task...',
      giveeClubVerifyFinished: 'Wait for the verification to complete and join it by yourself',
      doingKeyhubTask: 'Doing Keyhub Task...',
      SweepWidgetNotice: 'The task is being processed and verified. ' + 'There is an interval of 1~3s for each verification task to prevent the triggering of too fast verification warning...',
      tasksNotCompleted: 'Tasks Not Completed',
      notConnect: 'Social platform is not connectted, skip',
      confirmingTask: 'Confirming task...'
    };
    const en_US = en_US_data;
    const languages = {
      zh: zh_CN,
      en: en_US
    };
    const language = [ 'zh', 'en' ].includes(globalOptions.other.language) ? globalOptions.other.language : 'en';
    const I18n = (key, ...argvs) => {
      if (!languages[language]?.[key]) {
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
      }).then(({
        isDenied,
        isConfirmed
      }) => {
        if (isConfirmed) {
          GM_openInTab(`https://github.com/HCLonely/auto-task-v4/issues/new?title=${encodeURIComponent(`[BUG] 脚本报错: ${name}`)}&labels=bug&template=bug_report.yml&website=${encodeURIComponent(window.location.href)}&browser=${encodeURIComponent(JSON.stringify((0, 
          javascript_utils_umd_min.ua)(), null, 4))}&manager=${encodeURIComponent(`${GM_info.scriptHandler} ${GM_info.version}`)}&user-script=${encodeURIComponent(GM_info.script.version)}&logs=${encodeURIComponent(error.stack || 'null')}&run-logs=${encodeURIComponent($.makeArray($('#auto-task-info>li')).map(element => element.innerText).join('\n'))}`, {
            active: true
          });
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
            GM_openInTab('https://keylol.com/forum.php?mod=post&action=reply&fid=319&tid=777450', {
              active: true
            });
          });
        }
      });
      console.log('%c%s', 'color:white;background:red', `Auto-Task[Error]: ${name}\n${error.stack}`);
    }
    class Social {
      tasks;
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
    class Discord extends social_Social {
      tasks;
      whiteList;
      #auth = GM_getValue('discordAuth') || {};
      #cache = GM_getValue('discordCache') || {};
      #initialized = false;
      constructor() {
        super();
        const defaultTasksTemplate = {
          servers: []
        };
        this.tasks = defaultTasksTemplate;
        this.whiteList = {
          ...defaultTasksTemplate,
          ...GM_getValue('whiteList')?.discord || {}
        };
      }
      async init(action) {
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
            }).then(({
              isConfirmed,
              isDenied
            }) => {
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
              this.#initialized = false;
              return 'skip';
            }
          }
          if (GM_getValue('dontRemindDiscordAgain') || action === 'do' && !globalOptions.doTask.discord.servers || action === 'undo' && !globalOptions.undoTask.discord.servers) {
            this.#initialized = false;
            return 'skip';
          }
          if (this.#initialized) {
            return true;
          }
          if (!this.#auth.auth) {
            if (await this.#updateAuth()) {
              this.#initialized = true;
              return true;
            }
            return false;
          }
          const isVerified = await this.#verifyAuth();
          if (isVerified) {
            scripts_echoLog({}).success(i18n('initSuccess', 'Discord'));
            this.#initialized = true;
            return true;
          }
          GM_setValue('discordAuth', {
            auth: null
          });
          if (await this.#updateAuth()) {
            scripts_echoLog({}).success(i18n('initSuccess', 'Discord'));
            this.#initialized = true;
            return true;
          }
          scripts_echoLog({}).error(i18n('initFailed', 'Discord'));
          return false;
        } catch (error) {
          throwError(error, 'Discord.init');
          return false;
        }
      }
      async #verifyAuth() {
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
              authorization: this.#auth.auth
            }
          });
          if (result === 'Success') {
            if (data?.status === 200) {
              logStatus.success();
              return true;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Discord.verifyAuth');
          return false;
        }
      }
      async #updateAuth() {
        try {
          const logStatus = scripts_echoLog({
            text: i18n('updatingAuth', 'Discord')
          });
          return await new Promise(resolve => {
            const newTab = GM_openInTab('https://discord.com/channels/@me', {
              active: true,
              insert: true,
              setParent: true
            });
            newTab.name = 'ATv4_discordAuth';
            newTab.onclose = async () => {
              const auth = GM_getValue('discordAuth')?.auth;
              if (auth) {
                this.#auth = {
                  auth: auth
                };
                logStatus.success();
                resolve(await this.#verifyAuth());
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
      async #joinServer(inviteId) {
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
              authorization: this.#auth.auth,
              origin: 'https://discord.com',
              referer: `https://discord.com/invite/${inviteId}`
            }
          });
          if (result === 'Success' && data?.status === 200) {
            logStatus.success();
            const guild = String(data.response?.guild?.id);
            if (guild) {
              this.#setCache(inviteId, guild);
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
      async #leaveServer(inviteId) {
        try {
          if (this.whiteList.servers.includes(inviteId)) {
            scripts_echoLog({
              type: 'whiteList',
              text: 'Discord.leaveServer',
              id: inviteId
            });
            return true;
          }
          const guild = await this.#getGuild(inviteId);
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
              authorization: this.#auth.auth
            }
          });
          if (result === 'Success' && data?.status === 204) {
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
      async #getGuild(inviteId) {
        try {
          const logStatus = scripts_echoLog({
            type: 'gettingDiscordGuild',
            text: inviteId
          });
          const guild = this.#cache[inviteId];
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
          if (result === 'Success' && data?.status === 200) {
            const guild = data.response?.guild?.id;
            if (guild) {
              logStatus.success();
              this.#setCache(inviteId, guild);
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
      async toggle({
        doTask = true,
        serverLinks = []
      }) {
        try {
          if (!this.#initialized) {
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
            const realServers = this.getRealParams('servers', serverLinks, doTask, link => link.match(/invite\/(.+)/)?.[1]);
            if (realServers.length > 0) {
              for (const server of realServers) {
                if (doTask) {
                  prom.push(this.#joinServer(server));
                } else {
                  prom.push(this.#leaveServer(server));
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
      #setCache(inviteId, guild) {
        try {
          this.#cache[inviteId] = guild;
          GM_setValue('discordCache', this.#cache);
        } catch (error) {
          throwError(error, 'Discord.setCache');
        }
      }
    }
    const social_Discord = Discord;
    class Instagram extends social_Social {
      tasks;
      whiteList;
      #cache = GM_getValue('instagramCache') || {};
      #auth = {};
      #initialized = false;
      constructor() {
        super();
        const defaultTasksTemplate = {
          users: []
        };
        this.tasks = defaultTasksTemplate;
        this.whiteList = {
          ...defaultTasksTemplate,
          ...GM_getValue('whiteList')?.instagram || {}
        };
      }
      async init() {
        try {
          if (this.#initialized) {
            return true;
          }
          const isVerified = await this.#getUserInfo();
          if (isVerified) {
            scripts_echoLog({}).success(i18n('initSuccess', 'Instagram'));
            this.#initialized = true;
            return true;
          }
          scripts_echoLog({}).error(i18n('initFailed', 'Instagram'));
          return false;
        } catch (error) {
          throwError(error, 'Instagram.init');
          return false;
        }
      }
      async #getUserInfo(name = 'instagram') {
        try {
          const logStatus = scripts_echoLog({
            type: name === 'instagram' ? 'verifyingInsAuth' : 'gettingInsUserId',
            text: name
          });
          const userId = this.#cache[name];
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
            if (data?.finalUrl.includes('accounts/login')) {
              logStatus.error(`Error:${i18n('loginIns')}`, true);
              return false;
            } else if (data?.finalUrl.includes('www.instagram.com/challenge')) {
              logStatus.error(`Error:${i18n('insBanned')}`);
              return false;
            }
            if (data?.status === 200) {
              const csrftoken = data.responseText.match(/"csrf_token":"(.+?)"/)?.[1];
              const hash = data.responseText.match(/"rollout_hash":"(.+?)"/)?.[1];
              if (name === 'instagram') {
                if (csrftoken && hash) {
                  this.#auth = {
                    csrftoken: csrftoken,
                    hash: hash
                  };
                  return true;
                }
                return false;
              }
              const id = data.responseText.match(/"profilePage_([\d]+?)"/)?.[1];
              if (id) {
                this.#setCache(name, id);
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
      async #followUser(name) {
        try {
          const id = await this.#getUserInfo(name);
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
              'x-csrftoken': this.#auth.csrftoken,
              origin: 'https://www.instagram.com',
              referer: `https://www.instagram.com/${name}/`,
              'content-type': 'application/x-www-form-urlencoded',
              'sec-fetch-site': 'same-origin',
              'x-instagram-ajax': this.#auth.hash
            }
          });
          if (result === 'Success') {
            if (data?.status === 200 && data.response?.result === 'following') {
              logStatus.success();
              this.tasks.users = unique([ ...this.tasks.users, name ]);
              return true;
            }
            logStatus.error(`Error:${data?.response?.feedback_message || `${data?.statusText}(${data?.status})`}`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Instagram.followUser');
          return false;
        }
      }
      async #unfollowUser(name) {
        try {
          if (this.whiteList.users.includes(name)) {
            scripts_echoLog({
              type: 'whiteList',
              text: 'Instagram.unfollowUser',
              id: name
            });
            return true;
          }
          const id = await this.#getUserInfo(name);
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
              'x-csrftoken': this.#auth.csrftoken,
              origin: 'https://www.instagram.com',
              referer: `https://www.instagram.com/${name}/`,
              'content-type': 'application/x-www-form-urlencoded',
              'sec-fetch-site': 'same-origin',
              'x-instagram-ajax': this.#auth.hash
            }
          });
          if (result === 'Success') {
            if (data?.status === 200 && data.response?.status === 'ok') {
              logStatus.success();
              return true;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Instagram.unfollowUser');
          return false;
        }
      }
      async toggle({
        doTask = true,
        userLinks = []
      }) {
        try {
          if (!this.#initialized) {
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
            const realUsers = this.getRealParams('users', userLinks, doTask, link => link.match(/https:\/\/www\.instagram\.com\/(.+)?\//)?.[1]);
            if (realUsers.length > 0) {
              for (const username of realUsers) {
                if (doTask) {
                  prom.push(this.#followUser(username));
                } else {
                  prom.push(this.#unfollowUser(username));
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
      #setCache(name, id) {
        try {
          this.#cache[name] = id;
          GM_setValue('instagramCache', this.#cache);
        } catch (error) {
          throwError(error, 'Instagram.setCache');
        }
      }
    }
    const social_Instagram = Instagram;
    class Reddit extends social_Social {
      tasks;
      whiteList;
      #auth;
      #initialized = false;
      constructor() {
        super();
        const defaultTasksTemplate = {
          reddits: []
        };
        this.tasks = defaultTasksTemplate;
        this.whiteList = {
          ...defaultTasksTemplate,
          ...GM_getValue('whiteList')?.reddit || {}
        };
      }
      async init() {
        try {
          if (this.#initialized) {
            return true;
          }
          const isVerified = await this.#updateAuth();
          if (isVerified) {
            scripts_echoLog({}).success(i18n('initSuccess', 'Reddit'));
            this.#initialized = true;
            return true;
          }
          scripts_echoLog({}).error(i18n('initFailed', 'Reddit'));
          return false;
        } catch (error) {
          throwError(error, 'Reddit.init');
          return false;
        }
      }
      async #useBeta() {
        try {
          const logStatus = scripts_echoLog({
            text: i18n('changingRedditVersion')
          });
          return await new Promise(resolve => {
            const newTab = GM_openInTab('https://www.reddit.com/', {
              active: true,
              insert: true,
              setParent: true
            });
            newTab.name = 'ATv4_redditAuth';
            newTab.onclose = async () => {
              logStatus.success();
              resolve(await this.#updateAuth(true));
            };
          });
        } catch (error) {
          throwError(error, 'Reddit.useBeta');
          return false;
        }
      }
      async #updateAuth(beta = false) {
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
            if (data?.responseText.includes('www.reddit.com/login/')) {
              logStatus.error(`Error:${i18n('loginReddit')}`, true);
              return false;
            }
            if (data?.status === 200) {
              if (data.responseText.includes('redesign-beta-optin-btn') && !beta) {
                return await this.#useBeta();
              }
              const accessToken = data.responseText.match(/"accessToken":"(.*?)","expires":"(.*?)"/)?.[1];
              if (accessToken) {
                this.#auth = {
                  token: accessToken
                };
                logStatus.success();
                return true;
              }
              logStatus.error('Error: Parameter "accessToken" not found!');
              return false;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Reddit.updateAuth');
          return false;
        }
      }
      async #toggleTask({
        name,
        doTask = true
      }) {
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
              authorization: `Bearer ${this.#auth.token}`,
              'content-type': 'application/x-www-form-urlencoded'
            },
            data: $.param({
              action: doTask ? 'sub' : 'unsub',
              sr_name: name,
              api_type: 'json'
            })
          });
          if (result === 'Success') {
            if (data?.status === 200) {
              logStatus.success();
              if (doTask) {
                this.tasks.reddits = unique([ ...this.tasks.reddits, name ]);
              }
              return true;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Reddit.toggleTask');
          return false;
        }
      }
      async toggle({
        doTask = true,
        redditLinks = []
      }) {
        try {
          if (!this.#initialized) {
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
              const name = link.match(/https?:\/\/www\.reddit\.com\/r\/([^/]*)/)?.[1];
              const userName = link.match(/https?:\/\/www\.reddit\.com\/user\/([^/]*)/)?.[1];
              if (userName) {
                return name || userName;
              }
              return name;
            });
            if (realReddits.length > 0) {
              for (const name of realReddits) {
                prom.push(this.#toggleTask({
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
    const social_Reddit = Reddit;
    class Twitch extends social_Social {
      tasks;
      whiteList;
      #auth = GM_getValue('twitchAuth') || {};
      #cache = GM_getValue('twitchCache') || {};
      #initialized = false;
      #integrityToken;
      constructor() {
        super();
        const defaultTasksTemplate = {
          channels: []
        };
        this.tasks = defaultTasksTemplate;
        this.whiteList = {
          ...defaultTasksTemplate,
          ...GM_getValue('whiteList')?.twitch || {}
        };
      }
      async init() {
        try {
          if (this.#initialized) {
            return true;
          }
          if (!this.#auth.authToken || !this.#auth.clientId || !this.#auth.clientVersion || !this.#auth.deviceId || !this.#auth.clientSessionId) {
            if (await this.#updateAuth()) {
              this.#initialized = true;
              return true;
            }
            return false;
          }
          const isVerified = await this.#verifyAuth(true);
          if (isVerified) {
            scripts_echoLog({}).success(i18n('initSuccess', 'Twitch'));
            this.#initialized = true;
            return true;
          }
          GM_setValue('twitchAuth', null);
          if (await this.#updateAuth()) {
            scripts_echoLog({}).success(i18n('initSuccess', 'Twitch'));
            this.#initialized = true;
            return true;
          }
          scripts_echoLog({}).error(i18n('initFailed', 'Twitch'));
          return false;
        } catch (error) {
          throwError(error, 'Twitch.init');
          return false;
        }
      }
      async #verifyAuth(isFirst) {
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
              Authorization: `OAuth ${this.#auth.authToken}`,
              'Client-Id': this.#auth.clientId
            },
            data: '[{"operationName":"FrontPageNew_User","variables":{"limit":1},"extensions":{"persistedQuery":{"version":1,' + '"sha256Hash":"64bd07a2cbaca80699d62636d966cf6395a5d14a1f0a14282067dcb28b13eb11"}}}]'
          });
          if (result === 'Success') {
            if (data?.status === 200 && data.response?.[0]?.data?.currentUser) {
              await this.#integrity(isFirst);
              logStatus.success();
              return true;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Twitch.verifyAuth');
          return false;
        }
      }
      async #integrity(isFirst = true, ct = '') {
        try {
          const logStatus = scripts_echoLog({
            text: i18n('checkingTwitchIntegrity')
          });
          if (isFirst && (!this.#auth.authToken || !this.#auth.clientId || !this.#auth.clientVersion || !this.#auth.deviceId || !this.#auth.clientSessionId)) {
            return await this.#updateAuth(false);
          }
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: 'https://gql.twitch.tv/integrity',
            method: 'POST',
            dataType: 'json',
            anonymous: true,
            headers: {
              Origin: 'https://www.twitch.tv',
              Referer: 'https://www.twitch.tv/',
              Authorization: `OAuth ${this.#auth.authToken}`,
              'Client-Id': this.#auth.clientId,
              'Client-Version': this.#auth.clientVersion,
              'X-Device-Id': this.#auth.deviceId,
              'Client-Session-Id': this.#auth.clientSessionId,
              'x-kpsdk-ct': ct
            }
          });
          if (result === 'Success') {
            if (!ct && data?.responseHeaders?.['x-kpsdk-ct']) {
              return await this.#integrity(isFirst, data.responseHeaders['x-kpsdk-ct']);
            }
            if (data?.status === 200 && data.response?.token) {
              this.#integrityToken = data.response.token;
              logStatus.success();
              return true;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Twitch.integrity');
          return false;
        }
      }
      async #updateAuth(isFirst = true) {
        try {
          const logStatus = scripts_echoLog({
            text: i18n('updatingAuth', 'Twitch')
          });
          return await new Promise(resolve => {
            const newTab = GM_openInTab('https://www.twitch.tv/', {
              active: true,
              insert: true,
              setParent: true
            });
            newTab.name = 'ATv4_twitchAuth';
            newTab.onclose = async () => {
              const auth = GM_getValue('twitchAuth');
              if (auth) {
                this.#auth = auth;
                logStatus.success();
                resolve(await this.#verifyAuth(isFirst));
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
      async #toggleChannel({
        name,
        doTask = true
      }) {
        try {
          if (!doTask && this.whiteList.channels.includes(name)) {
            scripts_echoLog({
              type: 'whiteList',
              text: 'Twitch.unfollowChannel',
              id: name
            });
            return true;
          }
          const channelId = await this.#getChannelId(name);
          if (!channelId) {
            return false;
          }
          const logStatus = scripts_echoLog({
            type: `${doTask ? '' : 'un'}followingTwitchChannel`,
            text: name
          });
          const followData = `[{"operationName":"FollowButton_FollowUser","variables":{"input":{"disableNotifications":false,"targetID":"${channelId}` + '"}},"extensions":{"persistedQuery":{"version":1,"sha256Hash":"800e7346bdf7e5278a3c1d3f21b2b56e2639928f86815677a7126b093b2fdd08"}}}]';
          const unfollowData = `[{"operationName":"FollowButton_UnfollowUser","variables":{"input":{"targetID":"${channelId}"}},` + '"extensions":{"persistedQuery":{"version":1,"sha256Hash":"f7dae976ebf41c755ae2d758546bfd176b4eeb856656098bb40e0a672ca0d880"}}}]';
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: 'https://gql.twitch.tv/gql',
            method: 'POST',
            dataType: 'json',
            anonymous: true,
            headers: {
              Origin: 'https://www.twitch.tv',
              Referer: 'https://www.twitch.tv/',
              Authorization: `OAuth ${this.#auth.authToken}`,
              'Client-Id': this.#auth.clientId,
              'Client-Version': this.#auth.clientVersion,
              'X-Device-Id': this.#auth.deviceId,
              'Client-Session-Id': this.#auth.clientSessionId,
              'Client-Integrity': this.#integrityToken
            },
            data: doTask ? followData : unfollowData
          });
          if (result === 'Success') {
            if (data?.status === 200 && data.response?.[0] && !data.response[0].errors) {
              logStatus.success();
              if (doTask) {
                this.tasks.channels = unique([ ...this.tasks.channels, name ]);
              }
              return true;
            }
            logStatus.error(`Error:${data?.response?.[0].errors?.[0]?.message || `${data?.statusText}(${data?.status})`}`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Twitch.toggleChannel');
          return false;
        }
      }
      async #getChannelId(name) {
        try {
          const logStatus = scripts_echoLog({
            type: 'gettingTwitchChannelId',
            text: name
          });
          const channelId = this.#cache[name];
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
              Authorization: `OAuth ${this.#auth.authToken}`,
              'Client-Id': this.#auth.clientId
            },
            responseType: 'json',
            data: `[{"operationName":"ActiveWatchParty","variables":{"channelLogin":"${name}"},` + '"extensions":{"persistedQuery":{"version":1,"sha256Hash":"4a8156c97b19e3a36e081cf6d6ddb5dbf9f9b02ae60e4d2ff26ed70aebc80a30"}}}]'
          });
          if (result === 'Success') {
            if (data?.status === 200) {
              const channelId = data.response?.[0]?.data?.user?.id;
              if (channelId) {
                this.#setCache(name, String(channelId));
                logStatus.success();
                return channelId;
              }
              logStatus.error(`Error:${data.statusText}(${data.status})`);
              return false;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Twitch.getChannelId');
          return false;
        }
      }
      async toggle({
        doTask = true,
        channelLinks = []
      }) {
        try {
          if (!this.#initialized) {
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
            const realChannels = this.getRealParams('channels', channelLinks, doTask, link => link.match(/https:\/\/(www\.)?twitch\.tv\/(.+)/)?.[2]);
            if (realChannels.length > 0) {
              for (const channel of realChannels) {
                prom.push(this.#toggleChannel({
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
      #setCache(name, id) {
        try {
          this.#cache[name] = id;
          GM_setValue('twitchCache', this.#cache);
        } catch (error) {
          throwError(error, 'Twitch.setCache');
        }
      }
    }
    const social_Twitch = Twitch;
    class Twitter extends social_Social {
      tasks;
      whiteList;
      #verifyId = globalOptions.other.twitterVerifyId;
      #auth = GM_getValue('twitterAuth') || {};
      #cache = GM_getValue('twitterCache') || {};
      #initialized = false;
      constructor() {
        super();
        const defaultTasksTemplate = {
          users: [],
          retweets: [],
          likes: []
        };
        this.tasks = defaultTasksTemplate;
        this.whiteList = {
          ...defaultTasksTemplate,
          ...GM_getValue('whiteList')?.twitter || {}
        };
      }
      async init() {
        try {
          if (this.#initialized) {
            return true;
          }
          if (!this.#auth.ct0) {
            if (await this.#updateAuth()) {
              this.#initialized = true;
              return true;
            }
            return false;
          }
          const isVerified = await this.#verifyAuth();
          if (isVerified) {
            scripts_echoLog({}).success(i18n('initSuccess', 'Twitter'));
            this.#initialized = true;
            return true;
          }
          GM_setValue('twitterAuth', null);
          if (await this.#updateAuth()) {
            scripts_echoLog({}).success(i18n('initSuccess', 'Twitter'));
            this.#initialized = true;
            return true;
          }
          scripts_echoLog({}).error(i18n('initFailed', 'Twitter'));
          return false;
        } catch (error) {
          throwError(error, 'Twitter.init');
          return false;
        }
      }
      async #verifyAuth() {
        try {
          return await this.#toggleUser({
            name: 'verify',
            doTask: true,
            verify: true
          });
        } catch (error) {
          throwError(error, 'Twitter.verifyAuth');
          return false;
        }
      }
      async #updateAuth() {
        try {
          const logStatus = scripts_echoLog({
            text: i18n('updatingAuth', 'Twitter')
          });
          return await new Promise(resolve => {
            GM_cookie.list({
              url: 'https://x.com/settings/account'
            }, async (cookies, error) => {
              if (!error) {
                const [ ct0, isLogin ] = cookies.map(cookie => [ 'ct0', 'twid' ].includes(cookie.name) ? cookie.value : null).filter(cookie => cookie);
                if (isLogin && ct0) {
                  GM_setValue('twitterAuth', {
                    ct0: ct0
                  });
                  this.#auth = {
                    ct0: ct0
                  };
                  logStatus.success();
                  resolve(await this.#verifyAuth());
                } else {
                  logStatus.error(i18n('needLogin'));
                  resolve(false);
                }
              } else {
                logStatus.error('Error: Update twitter auth failed!');
                resolve(false);
              }
            });
          });
        } catch (error) {
          throwError(error, 'Twitter.updateToken');
          return false;
        }
      }
      async #toggleUser({
        name,
        doTask = true,
        verify = false,
        retry = false
      }) {
        try {
          if (!doTask && !verify && this.whiteList.users.includes(name)) {
            scripts_echoLog({
              type: 'whiteList',
              text: 'Twitter.unfollowUser',
              id: name
            });
            return true;
          }
          const userId = verify ? this.#verifyId : await this.userName2id(name);
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
            url: `https://x.com/i/api/1.1/friendships/${doTask ? 'create' : 'destroy'}.json`,
            method: 'POST',
            headers: {
              authorization: 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA',
              'Content-Type': 'application/x-www-form-urlencoded',
              'x-csrf-token': this.#auth.ct0,
              'X-Twitter-Auth-Type': 'OAuth2Session',
              'X-Twitter-Active-User': 'yes'
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
            if (data?.status === 200) {
              logStatus.success();
              if (doTask && !verify) {
                this.tasks.users = unique([ ...this.tasks.users, name ]);
              }
              return true;
            }
            if (verify && data?.status === 403) {
              if (data.response?.errors?.[0]?.code === 158) {
                logStatus.success();
                return true;
              }
              if (data.response?.errors?.[0]?.code === 353 && !retry && data.responseHeaders?.['set-cookie']) {
                this.#auth.ct0 = data.responseHeaders['set-cookie']?.find(cookie => cookie.includes('ct0='))?.split(';')?.at(0)?.split('=')?.at(-1) || this.#auth.ct0;
                logStatus.warning(i18n('retry'));
                return this.#toggleUser({
                  name: name,
                  doTask: doTask,
                  verify: verify,
                  retry: true
                });
              }
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Twitter.toggleUser');
          return false;
        }
      }
      async userName2id(name) {
        try {
          const logStatus = scripts_echoLog({
            type: 'gettingTwitterUserId',
            text: name
          });
          const userId = this.#cache[name];
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
            url: 'https://x.com/i/api/graphql/mCbpQvZAw6zu_4PvuAUVVQ/UserByScreenName' + `?variables=%7B%22screen_name%22%3A%22${name}%22%2C%22withSafetyModeUserFields%22%3Atrue%2C%22withSuperFollowsUserFields%22%3Atrue%7D`,
            method: 'GET',
            headers: {
              authorization: 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA',
              'content-type': 'application/json',
              referer: `https://x.com/${name}`,
              'x-csrf-token': this.#auth.ct0,
              'X-Twitter-Auth-Type': 'OAuth2Session',
              'X-Twitter-Active-User': 'yes'
            },
            responseType: 'json'
          });
          if (result === 'Success') {
            if (data?.status === 200) {
              let response = data.response || (typeof data.responseText === 'object' ? data.responseText : null);
              if (!response) {
                try {
                  response = JSON.parse(data.responseText);
                } catch (error) {
                  response = null;
                }
              }
              const userId = String(response?.data?.user?.result?.rest_id);
              if (userId) {
                this.#setCache(name, userId);
                logStatus.success();
                return userId;
              }
              logStatus.error(`Error:${data.statusText}(${data.status})`);
              return false;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Twitter.getUserId');
          return false;
        }
      }
      async #toggleRetweet({
        retweetId,
        doTask = true
      }) {
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
            url: `https://x.com/i/api/graphql/${doTask ? 'ojPdsZsimiJrUGLR1sjUtA/CreateRetweet' : 'iQtK4dl5hBmXewYZuEOKVw/DeleteRetweet'}`,
            method: 'POST',
            headers: {
              authorization: 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA',
              'Content-Type': 'application/json',
              'x-csrf-token': this.#auth.ct0,
              'X-Twitter-Auth-Type': 'OAuth2Session',
              'X-Twitter-Active-User': 'yes'
            },
            data: `{"variables":{"tweet_id":"${retweetId}","dark_request":false},"queryId":"${doTask ? 'ojPdsZsimiJrUGLR1sjUtA' : 'iQtK4dl5hBmXewYZuEOKVw'}"}`,
            responseType: 'json'
          });
          if (result === 'Success') {
            if (data?.status === 200 || data?.status === 403 && data.response?.errors?.[0]?.code === 327) {
              logStatus.success();
              if (doTask) {
                this.tasks.retweets = unique([ ...this.tasks.retweets, retweetId ]);
              }
              return true;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Twitter.toggleRetweet');
          return false;
        }
      }
      async toggle({
        doTask = true,
        userLinks = [],
        retweetLinks = []
      }) {
        try {
          if (!this.#initialized) {
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
            const realUsers = this.getRealParams('users', userLinks, doTask, link => link.match(/https:\/\/x\.com\/(.+)/)?.[1] || link.match(/https:\/\/twitter\.com\/(.+)/)?.[1]);
            if (realUsers.length > 0) {
              for (const user of realUsers) {
                prom.push(this.#toggleUser({
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
            const realRetweets = this.getRealParams('retweets', retweetLinks, doTask, link => link.match(/https:\/\/x\.com\/.*?\/status\/([\d]+)/)?.[1] || link.match(/https:\/\/twitter\.com\/.*?\/status\/([\d]+)/)?.[1]);
            if (realRetweets.length > 0) {
              for (const retweet of realRetweets) {
                prom.push(this.#toggleRetweet({
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
      #setCache(name, id) {
        try {
          this.#cache[name] = id;
          GM_setValue('twitterCache', this.#cache);
        } catch (error) {
          throwError(error, 'Twitter.setCache');
        }
      }
    }
    const social_Twitter = Twitter;
    class Vk extends social_Social {
      tasks;
      whiteList;
      #username = '';
      #cache = GM_getValue('vkCache') || {};
      #initialized = false;
      constructor() {
        super();
        const defaultTasksTemplate = {
          names: []
        };
        this.tasks = defaultTasksTemplate;
        this.whiteList = {
          ...defaultTasksTemplate,
          ...GM_getValue('whiteList')?.vk || {}
        };
      }
      async init() {
        try {
          if (this.#initialized) {
            return true;
          }
          const isVerified = await this.#verifyAuth();
          if (isVerified) {
            scripts_echoLog({}).success(i18n('initSuccess', 'Vk'));
            this.#initialized = true;
            return true;
          }
          scripts_echoLog({}).error(i18n('initFailed', 'Vk'));
          return false;
        } catch (error) {
          throwError(error, 'Vk.init');
          return false;
        }
      }
      async #verifyAuth() {
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
            if (data?.finalUrl.includes('vk.com/login')) {
              logStatus.error(`Error:${i18n('loginVk')}`, true);
              return false;
            }
            if (data?.status === 200) {
              this.#username = data.responseText.match(/TopNavBtn__profileLink" href="\/(.*?)"/)?.[1] || '';
              logStatus.success();
              return true;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Vk.verifyAuth');
          return false;
        }
      }
      async #toggleGroup(name, dataParam, doTask = true) {
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
            if (data?.status === 200) {
              logStatus.success();
              if (doTask) {
                this.tasks.names = unique([ ...this.tasks.names, name ]);
              }
              return true;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Vk.toggleGroup');
          return false;
        }
      }
      async #togglePublic(name, dataParam, doTask = true) {
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
            if (data?.status === 200) {
              logStatus.success();
              if (doTask) {
                this.tasks.names = unique([ ...this.tasks.names, name ]);
              }
              return true;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Vk.togglePublic');
          return false;
        }
      }
      async #toggleLikeWall(name, dataParam, doTask = true) {
        try {
          const logStatus = scripts_echoLog({
            type: doTask ? 'likingVkPublic' : 'unlikingVkPublic',
            text: name
          });
          const postData = {
            act: 'a_set_reaction',
            al: 1,
            event_subtype: 'post_modal',
            from: 'wall_page',
            hash: dataParam.hash,
            object: dataParam.object,
            track_code: dataParam.trackCode,
            wall: 2
          };
          if (doTask) {
            postData.reaction_id = 0;
          }
          const {
            result: resultR,
            statusText: statusTextR,
            status: statusR,
            data: dataR
          } = await tools_httpRequest({
            url: 'https://vk.com/like.php?act=a_set_reaction',
            method: 'POST',
            headers: {
              origin: 'https://vk.com',
              referer: `https://vk.com/${name}`,
              'content-type': 'application/x-www-form-urlencoded'
            },
            data: $.param(postData)
          });
          if (resultR === 'Success') {
            if (dataR?.status === 200) {
              if (dataR.response?.payload?.[1]?.[1]?.like_my === true) {
                logStatus.success();
                return true;
              }
            }
            logStatus.error(`Error:${dataR?.statusText}(${dataR?.status})`);
            return false;
          }
          logStatus.error(`${resultR}:${statusTextR}(${statusR})`);
          return false;
        } catch (error) {
          throwError(error, 'Vk.sendWall');
          return false;
        }
      }
      async #sendWall(name) {
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
            if (data?.status === 200) {
              const hash = data.responseText.match(/shHash:[\s]*'(.*?)'/)?.[1];
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
                  if (dataR?.status === 200) {
                    const jsonData = JSON.parse(dataR.responseText?.replace('\x3c!--', '') || '{}');
                    if (jsonData?.payload?.[1]?.[1]?.share_my === true) {
                      logStatus.success();
                      const postId = String(jsonData?.payload?.[1]?.[1]?.post_id);
                      const ownerId = String(jsonData?.payload?.[1]?.[1]?.owner_id);
                      if (postId && ownerId) {
                        this.#setCache(name, `${ownerId}_${postId}`);
                      }
                      this.tasks.names = unique([ ...this.tasks.names, name ]);
                      return true;
                    }
                  }
                  logStatus.error(`Error:${dataR?.statusText}(${dataR?.status})`);
                  return false;
                }
                logStatus.error(`${resultR}:${statusTextR}(${statusR})`);
                return false;
              }
              logStatus.error('Error: Get "hash" failed');
              return false;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Vk.sendWall');
          return false;
        }
      }
      async #deleteWall(name, dataParams) {
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
              referer: `https://vk.com/${this.#username}?w=wall${this.#cache[name]}%2Fall`,
              'content-type': 'application/x-www-form-urlencoded'
            },
            data: $.param({
              act: 'delete',
              al: 1,
              confirm: 0,
              from: 'wkview',
              hash: dataParams.wallHash,
              post: this.#cache[name]
            })
          });
          if (result === 'Success') {
            if (data?.status === 200) {
              const jsonData = JSON.parse(data.responseText?.replace('\x3c!--', '') || '{}');
              if (jsonData?.payload?.[1]?.[1]) {
                logStatus.success();
                return true;
              }
              logStatus.error(`Error:${data?.statusText}(${data?.status})`);
              return false;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Vk.deleteWall');
          return false;
        }
      }
      async #getId(name, doTask) {
        try {
          let url = `https://vk.com/${name}`;
          if (/^wall-/.test(name)) {
            if (doTask) {
              return {
                type: 'sendWall'
              };
            }
            if (!this.#cache[name]) {
              return {
                type: 'unSupport'
              };
            }
            url = `https://vk.com/${this.#username}?w=wall${this.#cache[name]}`;
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
            if (data?.status === 200) {
              const [ , groupAct, groupId, , groupHash ] = data.responseText.match(/Groups.(enter|leave)\(.*?,.*?([\d]+?), (&#39;|')(.*?)(&#39;|')/) || [];
              const publicHash = data.responseText.match(/"enterHash":"(.*?)"/)?.[1];
              const publicPid = data.responseText.match(/"public_id":([\d]+?),/)?.[1];
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
              } else if (name.includes('action=like')) {
                const hash = data.responseText.match(/data-reaction-hash="(.*?)"/)?.[1];
                const trackCode = data.responseText.match(/data-post-track-code="(.*?)"/)?.[1];
                const object = name.match(/wall-[\w_]+/)?.[0];
                if (hash && trackCode && object) {
                  logStatus.success();
                  return {
                    type: 'likeWall',
                    hash: hash,
                    trackCode: trackCode,
                    object: object
                  };
                }
              } else if (data.responseText.includes('wall.deletePost') && !doTask) {
                const wallHash = data.responseText.match(/wall\.deletePost\(this, '.*?', '(.*?)'\)/)?.[1];
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
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Vk.getId');
          return false;
        }
      }
      async #toggleVk({
        name,
        doTask = true
      }) {
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
          const data = await this.#getId(formatName, doTask);
          if (!data) {
            return false;
          }
          switch (data.type) {
           case 'group':
            return await this.#toggleGroup(formatName, data, doTask);

           case 'public':
            return await this.#togglePublic(formatName, data, doTask);

           case 'likeWall':
            return await this.#toggleLikeWall(formatName, data, doTask);

           case 'sendWall':
            return doTask ? await this.#sendWall(formatName) : true;

           case 'deleteWall':
            return doTask ? true : await this.#deleteWall(formatName, data);

           default:
            return false;
          }
        } catch (error) {
          throwError(error, 'Vk.toggleVk');
          return false;
        }
      }
      async toggle({
        doTask = true,
        nameLinks = []
      }) {
        try {
          if (!this.#initialized) {
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
            const realNames = this.getRealParams('names', nameLinks, doTask, link => link.match(/https:\/\/vk\.com\/([^/]+)/)?.[1]);
            if (realNames.length > 0) {
              for (const name of realNames) {
                prom.push(this.#toggleVk({
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
      #setCache(name, postId) {
        try {
          this.#cache[name] = postId;
          GM_setValue('vkCache', this.#cache);
        } catch (error) {
          throwError(error, 'Vk.setCache');
        }
      }
    }
    const social_Vk = Vk;
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
          if (data?.status === 200) {
            if (data.responseText.includes('accounts.google.com/ServiceLogin?service=youtube')) {
              logStatus.error(`Error:${i18n('loginYtb')}`, true);
              return {
                needLogin: true
              };
            }
            const apiKey = data.responseText.match(/"INNERTUBE_API_KEY":"(.*?)"/)?.[1];
            const context = (data.responseText.match(/\(\{"INNERTUBE_CONTEXT":([\w\W]*?)\}\)/) || data.responseText.match(/"INNERTUBE_CONTEXT":([\w\W]*?\}),"INNERTUBE/))?.[1] || '{}';
            const {
              client,
              request
            } = JSON.parse(context);
            if (apiKey && client && request) {
              client.hl = 'en';
              if (type === 'channel') {
                const channelId = data.responseText.match(/"channelId":"(.+?)"/)?.[1];
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
                const videoId = data.responseText.match(/<link rel="shortlinkUrl" href="https:\/\/youtu\.be\/(.*?)">/)?.[1];
                const likeParams = data.responseText.match(/"likeParams":"(.*?)"/)?.[1];
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
          logStatus.error(`Error:${data?.statusText}(${data?.status})`);
          return {};
        }
        logStatus.error(`${result}:${statusText}(${status})`);
        return {};
      } catch (error) {
        throwError(error, 'Youtube.getInfo');
        return {};
      }
    };
    class Youtube extends social_Social {
      tasks;
      whiteList;
      #auth = GM_getValue('youtubeAuth') || {};
      #initialized = false;
      #verifyChannel = `https://www.youtube.com/channel/${globalOptions.other.youtubeVerifyChannel}`;
      constructor() {
        super();
        const defaultTasksTemplate = {
          channels: [],
          likes: []
        };
        this.tasks = defaultTasksTemplate;
        this.whiteList = {
          ...defaultTasksTemplate,
          ...GM_getValue('whiteList')?.youtube || {}
        };
      }
      async init() {
        try {
          if (this.#initialized) {
            return true;
          }
          if (!this.#auth.PAPISID) {
            if (await this.#updateAuth()) {
              this.#initialized = true;
              return true;
            }
            return false;
          }
          const isVerified = await this.#verifyAuth();
          if (isVerified) {
            scripts_echoLog({}).success(i18n('initSuccess', 'Youtube'));
            this.#initialized = true;
            return true;
          }
          GM_setValue('youtubeAuth', null);
          if (await this.#updateAuth()) {
            scripts_echoLog({}).success(i18n('initSuccess', 'Youtube'));
            this.#initialized = true;
            return true;
          }
          scripts_echoLog({}).error(i18n('initFailed', 'Youtube'));
          return false;
        } catch (error) {
          throwError(error, 'Youtube.init');
          return false;
        }
      }
      async #verifyAuth() {
        try {
          return await this.#toggleChannel({
            link: this.#verifyChannel,
            doTask: true,
            verify: true
          });
        } catch (error) {
          throwError(error, 'Youtube.verifyAuth');
          return false;
        }
      }
      async #updateAuth() {
        try {
          const logStatus = scripts_echoLog({
            text: i18n('updatingAuth', 'Youtube')
          });
          return await new Promise(resolve => {
            GM_cookie.list({
              url: 'https://www.youtube.com/@YouTube'
            }, async (cookies, error) => {
              if (!error) {
                const PAPISID = cookies.find(cookie => cookie.name === '__Secure-3PAPISID')?.value;
                if (PAPISID) {
                  GM_setValue('youtubeAuth', {
                    PAPISID: PAPISID
                  });
                  this.#auth = {
                    PAPISID: PAPISID
                  };
                  logStatus.success();
                  resolve(await this.#verifyAuth());
                } else {
                  logStatus.error(i18n('needLogin'));
                  resolve(false);
                }
              } else {
                logStatus.error('Error: Update youtube auth failed!');
                resolve(false);
              }
            });
          });
        } catch (error) {
          throwError(error, 'Youtube.updateAuth');
          return false;
        }
      }
      #getInfo(link, type) {
        return getInfo(link, type);
      }
      async #toggleChannel({
        link,
        doTask = true,
        verify = false
      }) {
        try {
          const {
            params,
            needLogin
          } = await this.#getInfo(link, 'channel');
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
            url: `https://www.youtube.com/youtubei/v1/subscription/${doTask ? '' : 'un'}subscribe?key=${apiKey}&prettyPrint=false`,
            method: 'POST',
            headers: {
              origin: 'https://www.youtube.com',
              referer: `https://www.youtube.com/channel/${channelId}`,
              'content-type': 'application/json',
              'x-goog-authuser': '0',
              'x-goog-visitor-id': client?.visitorData,
              'x-origin': 'https://www.youtube.com',
              authorization: `SAPISIDHASH ${nowTime}_${sha1(`${nowTime} ${this.#auth.PAPISID} https://www.youtube.com`)}`
            },
            data: JSON.stringify({
              context: {
                client: client,
                request: {
                  sessionId: request?.sessionId,
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
            if (data?.status === 200) {
              if (doTask && (/"subscribed":true/.test(data.responseText) || data.responseText.includes('The subscription already exists')) || !doTask && /"subscribed":false/.test(data.responseText)) {
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
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Youtube.toggleChannel');
          return false;
        }
      }
      async #toggleLikeVideo({
        link,
        doTask = true
      }) {
        try {
          const {
            params,
            needLogin
          } = await this.#getInfo(link, 'likeVideo');
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
              authorization: `SAPISIDHASH ${nowTime}_${sha1(`${nowTime} ${this.#auth.PAPISID} https://www.youtube.com`)}`
            },
            data: JSON.stringify(likeVideoData)
          });
          if (result === 'Success') {
            if (data?.status === 200) {
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
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Youtube.toggleLikeVideo');
          return false;
        }
      }
      async toggle({
        doTask = true,
        channelLinks = [],
        videoLinks = []
      }) {
        try {
          if (!this.#initialized) {
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
                return link.match(/url=(https:\/\/www\.youtube\.com\/.*)/)?.[1];
              }
              return link;
            });
            if (realChannels.length > 0) {
              for (const channel of realChannels) {
                prom.push(this.#toggleChannel({
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
                return link.match(/url=(https:\/\/www\.youtube\.com\/.*)/)?.[1];
              }
              return link;
            });
            if (realLikes.length > 0) {
              for (const video of realLikes) {
                prom.push(this.#toggleLikeVideo({
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
    class SteamASF {
      #asfOptions;
      #botName = 'asf';
      #groupInfo;
      async init() {
        try {
          const asfCommandsUrl = new URL('/Api/Command/', globalOptions.ASF.AsfIpcUrl);
          this.#asfOptions = {
            url: asfCommandsUrl.href,
            method: 'POST',
            responseType: 'json',
            headers: {
              accept: 'application/json',
              'Content-Type': 'application/json',
              Host: asfCommandsUrl.host,
              Origin: asfCommandsUrl.origin,
              Referer: asfCommandsUrl.href,
              Authentication: globalOptions.ASF.AsfIpcPassword
            }
          };
          if (globalOptions.ASF.AsfBotname) {
            this.#botName = globalOptions.ASF.AsfBotname;
          }
          const logStatus = scripts_echoLog({
            text: i18n('initingASF')
          });
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            ...this.#asfOptions,
            data: '{"Command":"!stats"}'
          });
          if (result === 'Success') {
            if (data?.response?.Success === true && data.response.Message === 'OK' && data.response.Result) {
              logStatus.success();
              return true;
            }
            if (data?.response?.Result || data?.response?.Message) {
              logStatus.error(data?.response?.Result || data.response.Message);
              return false;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'SteamASF.init');
          return false;
        }
      }
      async joinGroup(groupName) {
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
            ...this.#asfOptions,
            data: JSON.stringify({
              Command: `!JOINGROUP ${this.#botName} ${groupName}`
            })
          });
          if (result === 'Success') {
            if (data?.status === 200 && [ '已加入', '已申请', 'Joined', 'Applied', 'Присоединился', 'costs' ].find(text => data.response?.Result?.includes(text))) {
              logStatus.success();
              return true;
            }
            logStatus.error(`Error:${data?.response?.Result || data?.response?.Message || data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'SteamASF.joinGroup');
          return false;
        }
      }
      async leaveGroup(groupName) {
        try {
          if (!this.#groupInfo) {
            if (!await this.#getGroupId()) {
              return false;
            }
          }
          const groupId = await this.#groupInfo[groupName];
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
            ...this.#asfOptions,
            data: JSON.stringify({
              Command: `!LEAVEGROUP ${this.#botName} ${groupId}`
            })
          });
          if (result === 'Success') {
            if (data?.status === 200 && [ '成功', 'Success', 'Успех' ].find(text => data.response?.Result?.includes(text))) {
              logStatus.success();
              return true;
            }
            logStatus.error(`Error:${data?.response?.Result || data?.response?.Message || data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'SteamASF.leaveGroup');
          return false;
        }
      }
      async #getGroupId() {
        try {
          const logStatus = scripts_echoLog({
            type: 'gettingSteamGroupId',
            text: 'All'
          });
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            ...this.#asfOptions,
            data: JSON.stringify({
              Command: `!GROUPLIST ${this.#botName}`
            })
          });
          if (result === 'Success') {
            if (data?.status === 200 && data.response?.Result?.includes('|')) {
              this.#groupInfo = Object.fromEntries(data.response.Result.split('\n').map(line => {
                const [ , name, id ] = line.trim().split('|');
                if (name && id) {
                  return [ name, id ];
                }
                return null;
              }).filter(ele => ele));
              logStatus.success();
              return true;
            }
            logStatus.error(`Error:${data?.response?.Result || data?.response?.Message || data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'SteamASF.getGroupID');
          return false;
        }
      }
      async addToWishlist(gameId) {
        try {
          const logStatus = scripts_echoLog({
            type: 'addingToWishlist',
            text: gameId
          });
          if ((await this.#checkGame(gameId)).wishlist === true) {
            logStatus.success();
            return true;
          }
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            ...this.#asfOptions,
            data: JSON.stringify({
              Command: `!ADDWISHLIST ${this.#botName} ${gameId}`
            })
          });
          if (result === 'Success') {
            if (data?.status === 200 && [ '成功', 'Success', 'Успех' ].find(text => data.response?.Result?.includes(text))) {
              logStatus.success();
              return true;
            }
            logStatus.error(`Error:${data?.response?.Result || data?.response?.Message || data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'SteamASF.addToWishlist');
          return false;
        }
      }
      async removeFromWishlist(gameId) {
        try {
          const logStatus = scripts_echoLog({
            type: 'removingFromWishlist',
            text: gameId
          });
          if ((await this.#checkGame(gameId)).wishlist === false) {
            logStatus.success();
            return true;
          }
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            ...this.#asfOptions,
            data: JSON.stringify({
              Command: `!REMOVEWISHLIST ${this.#botName} ${gameId}`
            })
          });
          if (result === 'Success') {
            if (data?.status === 200 && [ '成功', 'Success', 'Успех' ].find(text => data.response?.Result?.includes(text))) {
              logStatus.success();
              return true;
            }
            logStatus.error(`Error:${data?.response?.Result || data?.response?.Message || data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'SteamASF.removeFromWishlist');
          return false;
        }
      }
      async toggleFollowGame(gameId, doTask) {
        try {
          const logStatus = scripts_echoLog({
            type: `${doTask ? '' : 'un'}followingGame`,
            text: gameId
          });
          if (doTask && (await this.#checkGame(gameId)).followed === true || !doTask && (await this.#checkGame(gameId)).followed === false) {
            logStatus.success();
            return true;
          }
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            ...this.#asfOptions,
            data: JSON.stringify({
              Command: `!${doTask ? '' : 'UN'}FOLLOWGAME ${this.#botName} ${gameId}`
            })
          });
          if (result === 'Success') {
            if (data?.status === 200 && [ '成功', 'Success', 'Успех' ].find(text => data.response?.Result?.includes(text))) {
              logStatus.success();
              return true;
            }
            logStatus.error(`Error:${data?.response?.Result || data?.response?.Message || data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'SteamASF.toggleFollowGame');
          return false;
        }
      }
      async #checkGame(gameId) {
        try {
          const {
            result,
            data
          } = await tools_httpRequest({
            ...this.#asfOptions,
            data: JSON.stringify({
              Command: `!CHECK ${this.#botName} ${gameId}`
            })
          });
          if (result === 'Success') {
            if (data?.status === 200 && data.response?.Result?.includes(gameId)) {
              const matchedResult = data.response.Result.split('\n').find(result => result.includes(gameId))?.split('|');
              if (matchedResult?.length > 3) {
                return {
                  wishlist: matchedResult.at(-3).trim() === '√' || matchedResult.at(-2).trim() === '√',
                  followed: matchedResult.at(-1).trim() === '√'
                };
              }
              return {};
            }
            return {};
          }
          return {};
        } catch (error) {
          throwError(error, 'SteamASF.checkGame');
          return {};
        }
      }
      async toggleCurator(curatorId, doTask = true) {
        try {
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
            ...this.#asfOptions,
            data: JSON.stringify({
              Command: `!${doTask ? '' : 'UN'}FOLLOWCURATOR ${this.#botName} ${curatorId}`
            })
          });
          if (result === 'Success') {
            if (data?.status === 200 && [ '成功', 'Success', 'Успех' ].find(text => data.response?.Result?.includes(text))) {
              logStatus.success();
              return true;
            }
            logStatus.error(`Error:${data?.response?.Result || data?.response?.Message || data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Steam.toggleCurator');
          return false;
        }
      }
      async addLicense(id) {
        try {
          const [ type, ids ] = id.split('-');
          if (type === 'appid') {
            const logStatus = scripts_echoLog({
              type: 'addingFreeLicense',
              text: ids
            });
            const {
              result,
              statusText,
              status,
              data
            } = await tools_httpRequest({
              ...this.#asfOptions,
              data: JSON.stringify({
                Command: `!addlicense ${this.#botName} app/${ids}`
              })
            });
            if (result === 'Success') {
              if (data?.status === 200 && [ 'AlreadyPurchased', 'OK' ].find(text => data.response?.Result?.includes(text))) {
                logStatus.success();
                return true;
              }
              logStatus.error(`Error:${data?.response?.Result || data?.response?.Message || data?.statusText}(${data?.status})`);
              return false;
            }
            logStatus.error(`${result}:${statusText}(${status})`);
            return false;
          } else if (type === 'subid') {
            const idsArr = ids.split(',');
            const logStatus = scripts_echoLog({
              type: 'addingFreeLicenseSubid',
              text: ids
            });
            const {
              result,
              statusText,
              status,
              data
            } = await tools_httpRequest({
              ...this.#asfOptions,
              data: JSON.stringify({
                Command: `!addlicense ${this.#botName} ${idsArr.map(id => `sub/${id}`).join(',')}`
              })
            });
            if (result === 'Success') {
              if (data?.status === 200 && data.response?.Result) {
                const resultLines = data.response.Result.split('\n');
                idsArr.forEach(subid => {
                  const targetLine = resultLines.find(text => text.includes(subid));
                  if (targetLine && [ '成功', 'Success', 'Успех' ].find(text => targetLine.includes(text))) {
                    scripts_echoLog({}).success(targetLine);
                  } else {
                    scripts_echoLog({}).error(targetLine);
                  }
                });
                return true;
              }
              logStatus.error(`Error:${data?.response?.Result || data?.response?.Message || data?.statusText}(${data?.status})`);
              return false;
            }
            logStatus.error(`${result}:${statusText}(${status})`);
            return false;
          }
          return false;
        } catch (error) {
          throwError(error, 'SteamASF.addLicense');
          return false;
        }
      }
      async requestPlayTestAccess(id) {
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
            ...this.#asfOptions,
            data: JSON.stringify({
              Command: `!REQUESTACCESS ${this.#botName} ${id}`
            })
          });
          if (result === 'Success') {
            if (data?.status === 200 && [ '成功', 'Success', 'Успех' ].find(text => data.response?.Result?.includes(text))) {
              logStatus.success();
              return true;
            }
            logStatus.error(`Error:${data?.response?.Result || data?.response?.Message || data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Steam.requestPlayTestAccess');
          return false;
        }
      }
    }
    const social_SteamASF = SteamASF;
    class Steam extends social_Social {
      tasks;
      whiteList;
      #cache = {
        ...{
          group: {},
          officialGroup: {},
          forum: {},
          workshop: {},
          curator: {}
        },
        ...GM_getValue('steamCache')
      };
      #auth = {};
      #storeInitialized = false;
      #communityInitialized = false;
      #area = 'CN';
      #oldArea;
      #areaStatus = 'end';
      #ASF;
      constructor() {
        super();
        const defaultTasksTemplate = {
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
        this.tasks = defaultTasksTemplate;
        this.whiteList = {
          ...defaultTasksTemplate,
          ...GM_getValue('whiteList')?.steam || {}
        };
      }
      async init(type = 'all') {
        try {
          if (globalOptions.ASF.AsfEnabled && globalOptions.ASF.AsfIpcUrl && globalOptions.ASF.AsfIpcPassword) {
            this.#ASF = new social_SteamASF();
            if (await this.#ASF.init()) {
              this.#storeInitialized = true;
              this.#communityInitialized = true;
              return true;
            }
            return false;
          }
          if (type === 'store') {
            if (this.#storeInitialized) {
              return true;
            }
            let storeInitialized = await this.#updateStoreAuth();
            if (!storeInitialized) {
              storeInitialized = await this.#updateStoreAuthTab();
            }
            this.#storeInitialized = storeInitialized;
            if (!this.#storeInitialized) {
              scripts_echoLog({}).error(i18n('initFailed', 'Steam'));
              return false;
            }
            scripts_echoLog({}).success(i18n('initSuccess', 'SteamStore'));
            return true;
          }
          if (type === 'community') {
            if (this.#communityInitialized) {
              return true;
            }
            let communityInitialized = await this.#updateCommunityAuth();
            if (!communityInitialized) {
              communityInitialized = await this.#updateCommunityAuthTab();
              GM_setValue('steamCommunityAuth', null);
            }
            this.#communityInitialized = communityInitialized;
            if (!this.#communityInitialized) {
              scripts_echoLog({}).error(i18n('initFailed', 'Steam'));
              return false;
            }
            scripts_echoLog({}).success(i18n('initSuccess', 'SteamCommunity'));
            return true;
          }
          if (this.#storeInitialized && this.#communityInitialized) {
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
      async #refreshToken(type = 'steamStore') {
        try {
          const host = {
            steamStore: 'store.steampowered.com',
            steamCommunity: 'steamcommunity.com'
          };
          const logStatus = scripts_echoLog({
            text: i18n('refreshingToken', i18n(type))
          });
          const formData = new FormData();
          formData.append('redir', `https://${host[type]}/`);
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: 'https://login.steampowered.com/jwt/ajaxrefresh',
            method: 'POST',
            responseType: 'json',
            headers: {
              Host: 'login.steampowered.com',
              Origin: `https://${host[type]}`,
              Referer: `https://${host[type]}/`
            },
            data: formData
          });
          if (result === 'Success') {
            if (data?.response?.success) {
              if (await this.#setStoreToken(data.response, type)) {
                logStatus.success();
                return true;
              }
              logStatus.error('Error');
              return false;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Steam.refreshToken');
          return false;
        }
      }
      async #setStoreToken(param, type) {
        try {
          const host = {
            steamStore: 'store.steampowered.com',
            steamCommunity: 'steamcommunity.com'
          };
          const logStatus = scripts_echoLog({
            text: i18n('settingToken', i18n(type))
          });
          const formData = new FormData();
          formData.append('steamID', param.steamID);
          formData.append('nonce', param.nonce);
          formData.append('redir', param.redir);
          formData.append('auth', param.auth);
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: `https://${host[type]}/login/settoken`,
            method: 'POST',
            headers: {
              Accept: 'application/json, text/plain, */*',
              Host: host[type],
              Origin: `https://${host[type]}`
            },
            data: formData
          });
          if (result === 'Success') {
            if (data?.status === 200) {
              logStatus.success();
              return true;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Steam.setStoreToken');
          return false;
        }
      }
      async #updateStoreAuth(retry = false) {
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
            url: 'https://store.steampowered.com/',
            method: 'GET',
            headers: {
              Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
              'Sec-Fetch-Dest': 'document',
              'Sec-Fetch-Mode': 'navigate',
              'Upgrade-Insecure-Requests': '1'
            },
            fetch: false,
            redirect: 'manual'
          });
          if (data?.status === 200) {
            if (!data.responseText.includes('data-miniprofile=')) {
              if (await this.#refreshToken('steamStore')) {
                logStatus.warning(i18n('retry'));
                if (retry) {
                  logStatus.error(`Error:${i18n('needLoginSteamStore')}`, true);
                  return false;
                }
                return this.#updateStoreAuth(true);
              }
              logStatus.error(`Error:${i18n('needLoginSteamStore')}`, true);
              return false;
            }
            const storeSessionID = data.responseText.match(/g_sessionID = "(.+?)";/)?.[1];
            if (storeSessionID) {
              this.#auth.storeSessionID = storeSessionID;
              logStatus.success();
              return true;
            }
            logStatus.error('Error: Get "sessionID" failed');
            return false;
          }
          if ([ 301, 302 ].includes(data?.status)) {
            if (await this.#refreshToken('steamStore')) {
              logStatus.warning(i18n('retry'));
              if (retry) {
                logStatus.error(`Error:${i18n('needLoginSteamStore')}`, true);
                return false;
              }
              return this.#updateStoreAuth(true);
            }
            logStatus.error(`Error:${i18n('needLoginSteamStore')}`, true);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Steam.updateStoreAuth');
          return false;
        }
      }
      async #updateStoreAuthTab() {
        try {
          const logStatus = scripts_echoLog({
            text: i18n('updatingAuth', i18n('steamStoreTab'))
          });
          return await new Promise(resolve => {
            GM_deleteValue('steamStoreAuth');
            GM_setValue('ATv4_updateStoreAuth', true);
            const newTab = GM_openInTab('https://store.steampowered.com/', {
              active: true,
              setParent: true
            });
            newTab.name = 'ATv4_updateStoreAuth';
            const listenerId = GM_addValueChangeListener('steamStoreAuth', (key, oldValue, newValue) => {
              GM_removeValueChangeListener(listenerId);
              GM_deleteValue('ATv4_updateStoreAuth');
              newTab?.close();
              window.focus();
              if (newValue && JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
                this.#auth.storeSessionID = newValue.storeSessionID;
                logStatus.success();
                resolve(true);
                return;
              }
              logStatus.error('Failed');
              resolve(false);
            });
            newTab.onclose = () => {
              GM_deleteValue('ATv4_updateStoreAuth');
            };
          });
        } catch (error) {
          throwError(error, 'Steam.updateStoreAuthTab');
          return false;
        }
      }
      async #updateCommunityAuthTab() {
        try {
          const logStatus = scripts_echoLog({
            text: i18n('updatingAuth', i18n('steamCommunityTab'))
          });
          return await new Promise(resolve => {
            GM_deleteValue('steamCommunityAuth');
            GM_setValue('ATv4_updateCommunityAuth', true);
            const newTab = GM_openInTab('https://steamcommunity.com/my', {
              active: true,
              setParent: true
            });
            newTab.name = 'ATv4_updateCommunityAuth';
            const listenerId = GM_addValueChangeListener('steamCommunityAuth', (key, oldValue, newValue) => {
              GM_removeValueChangeListener(listenerId);
              GM_deleteValue('ATv4_updateCommunityAuth');
              newTab?.close();
              window.focus();
              if (newValue && JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
                this.#auth.steam64Id = newValue.steam64Id;
                this.#auth.communitySessionID = newValue.communitySessionID;
                logStatus.success();
                resolve(true);
                return;
              }
              logStatus.error('Failed');
              resolve(false);
            });
            newTab.onclose = () => {
              GM_deleteValue('ATv4_updateCommunityAuth');
            };
          });
        } catch (error) {
          throwError(error, 'Steam.updateCommunityAuthTab');
          return false;
        }
      }
      async #updateCommunityAuth() {
        try {
          const logStatus = scripts_echoLog({
            text: i18n('gettingUserLink')
          });
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: 'https://steamcommunity.com/my',
            method: 'GET',
            headers: {
              Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
              Host: 'steamcommunity.com',
              'Sec-Fetch-Dest': 'document',
              'Sec-Fetch-Mode': 'navigate'
            },
            fetch: false
          });
          if (data?.status === 200) {
            if (data.finalUrl.includes('https://steamcommunity.com/login/home')) {
              logStatus.error(`Error:${i18n('needLoginSteamCommunity')}`, true);
              return false;
            }
            const steam64Id = data.responseText.match(/g_steamID = "(.+?)";/)?.[1];
            const communitySessionID = data.responseText.match(/g_sessionID = "(.+?)";/)?.[1];
            if (steam64Id && communitySessionID) {
              this.#auth.steam64Id = steam64Id;
              this.#auth.communitySessionID = communitySessionID;
              logStatus.success();
              return true;
            }
            logStatus.error('Error: Get "sessionID" failed');
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Steam.updateCommunityAuth');
          return false;
        }
      }
      async #getAreaInfo() {
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
            if (data?.status === 200) {
              const cartConfigRaw = data.responseText.match(/data-cart_config="(.*?)"/)?.[1];
              const temp = document.createElement('div');
              temp.innerHTML = cartConfigRaw || '{}';
              const cartConfigStr = temp.textContent || temp.innerText;
              let cartConfig;
              try {
                cartConfig = JSON.parse(cartConfigStr);
              } catch (error) {
                logStatus.error('Error: get country info filed');
                console.error(error);
                return {};
              }
              if (!cartConfig.rgUserCountryOptions) {
                logStatus.warning('Warning: Area cannot be changed');
                return {};
              }
              const userInfoRaw = data.responseText.match(/data-userinfo="(.*?)"/)?.[1];
              const temp1 = document.createElement('div');
              temp1.innerHTML = userInfoRaw || '{}';
              const userInfoStr = temp1.textContent || temp1.innerText;
              let userInfo;
              try {
                userInfo = JSON.parse(userInfoStr);
              } catch (error) {
                logStatus.error('Error: get country info filed');
                console.error(error);
                return {};
              }
              const currentArea = userInfo.country_code;
              const areas = Object.keys(cartConfig.rgUserCountryOptions).filter(area => area !== 'help');
              if (currentArea && areas.length > 0) {
                this.#area = currentArea;
                logStatus.success();
                return {
                  currentArea: currentArea,
                  areas: areas
                };
              }
              logStatus.error('Error: get country info filed');
              return {};
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return {};
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return {};
        } catch (error) {
          throwError(error, 'Steam.getAreaInfo');
          return {};
        }
      }
      async #changeArea(area) {
        try {
          if (this.#areaStatus === 'waiting') {
            await new Promise(resolve => {
              const checker = setInterval(() => {
                if (this.#areaStatus !== 'waiting') {
                  clearInterval(checker);
                  resolve(true);
                }
              });
            });
          }
          if (this.#area === area || !area && this.#area !== 'CN') {
            return true;
          }
          this.#areaStatus = 'waiting';
          let aimedArea = area;
          if (!aimedArea) {
            const {
              currentArea,
              areas
            } = await this.#getAreaInfo();
            if (!currentArea || !areas) {
              this.#areaStatus = 'error';
              return false;
            }
            if (currentArea !== 'CN') {
              this.#areaStatus = 'skip';
              scripts_echoLog({
                text: 'notNeededChangeArea'
              });
              return 'skip';
            }
            const anotherArea = areas.filter(area => area && area !== 'CN');
            if (!anotherArea || anotherArea.length === 0) {
              this.#areaStatus = 'noAnotherArea';
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
            url: 'https://store.steampowered.com/country/setcountry',
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: $.param({
              cc: aimedArea,
              sessionid: this.#auth.storeSessionID
            })
          });
          if (result === 'Success') {
            if (data?.status === 200 && data.responseText === 'true') {
              const {
                currentArea
              } = await this.#getAreaInfo();
              if (currentArea) {
                this.#area = currentArea;
                if (!this.#oldArea) {
                  this.#oldArea = currentArea;
                }
              }
              if (currentArea === aimedArea) {
                this.#areaStatus = 'success';
                logStatus.success();
                return currentArea;
              }
              this.#areaStatus = 'error';
              logStatus.error('Error: change country filed');
              return 'CN';
            }
            this.#areaStatus = 'error';
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return 'CN';
          }
          this.#areaStatus = 'error';
          logStatus.error(`${result}:${statusText}(${status})`);
          return 'CN';
        } catch (error) {
          this.#areaStatus = 'error';
          throwError(error, 'Steam.changeArea');
          return false;
        }
      }
      async #joinGroup(groupName) {
        try {
          if (this.#ASF) {
            if (await this.#ASF.joinGroup(groupName)) {
              this.tasks.groups = unique([ ...this.tasks.groups, groupName ]);
              return true;
            }
            return false;
          }
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
              sessionID: this.#auth.communitySessionID
            })
          });
          if (result === 'Success') {
            if (data?.status === 200 && !data.responseText.includes('grouppage_join_area')) {
              logStatus.success();
              this.tasks.groups = unique([ ...this.tasks.groups, groupName ]);
              return true;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Steam.joinGroup');
          return false;
        }
      }
      async #leaveGroup(groupName) {
        try {
          if (this.whiteList.groups.includes(groupName)) {
            scripts_echoLog({
              type: 'whiteList',
              text: 'Steam.leaveGroup',
              id: groupName
            });
            return true;
          }
          if (this.#ASF) {
            return await this.#ASF.leaveGroup(groupName);
          }
          const groupId = await this.#getGroupId(groupName);
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
            url: `https://steamcommunity.com/profiles/${this.#auth.steam64Id}/home_process`,
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: $.param({
              sessionID: this.#auth.communitySessionID,
              action: 'leaveGroup',
              groupId: groupId
            })
          });
          if (result === 'Success') {
            if (data?.status === 200 && data.finalUrl.includes('groups') && $(data.responseText.replace(/<img.*?>/g, '').toLowerCase()).find(`a[href='https://steamcommunity.com/groups/${groupName.toLowerCase()}']`).length === 0) {
              logStatus.success();
              return true;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Steam.leaveGroup');
          return false;
        }
      }
      async #getGroupId(groupName) {
        try {
          const logStatus = scripts_echoLog({
            type: 'gettingSteamGroupId',
            text: groupName
          });
          const groupId = this.#cache.group[groupName];
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
            if (data?.status === 200) {
              const groupId = data.responseText.match(/OpenGroupChat\( '([0-9]+)'/)?.[1];
              if (groupId) {
                this.#setCache('group', groupName, groupId);
                logStatus.success();
                return groupId;
              }
              logStatus.error(`Error:${data.statusText}(${data.status})`);
              return false;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Steam.getGroupID');
          return false;
        }
      }
      async #joinOfficialGroup(gameId) {
        try {
          if (this.#ASF) {
            if (await this.#ASF.joinGroup(gameId)) {
              this.tasks.officialGroups = unique([ ...this.tasks.officialGroups, gameId ]);
              return true;
            }
            return false;
          }
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
            url: `https://steamcommunity.com/games/${gameId}?action=join&sessionID=${this.#auth.communitySessionID}`,
            method: 'GET',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
          });
          if (result === 'Success') {
            if (data?.status === 200 && !data.responseText.includes('id="publicGroupJoin"')) {
              logStatus.success();
              this.tasks.officialGroups = unique([ ...this.tasks.officialGroups, gameId ]);
              const groupId = data.responseText.match(/steam:\/\/friends\/joinchat\/([0-9]+)/)?.[1];
              if (groupId) {
                this.#setCache('officialGroup', gameId, groupId);
              }
              return true;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Steam.joinOfficialGroup');
          return false;
        }
      }
      async #leaveOfficialGroup(gameId) {
        try {
          if (this.whiteList.officialGroups.includes(gameId)) {
            scripts_echoLog({
              type: 'whiteList',
              text: 'Steam.leaveOfficialGroup',
              id: gameId
            });
            return true;
          }
          if (this.#ASF) {
            return await this.#ASF.leaveGroup(gameId);
          }
          const groupId = await this.#getOfficialGroupId(gameId);
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
            url: `https://steamcommunity.com/profiles/${this.#auth.steam64Id}/home_process`,
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: $.param({
              sessionID: this.#auth.communitySessionID,
              action: 'leaveGroup',
              groupId: groupId
            })
          });
          if (result === 'Success') {
            if (data?.status === 200) {
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
                if (dataR?.status === 200 && dataR.responseText.includes('id="publicGroupJoin"')) {
                  logStatus.success();
                  return true;
                }
                logStatus.error(`Error:${dataR?.statusText}(${dataR?.status})`);
                return false;
              }
              logStatus.error(`${resultR}:${statusTextR}(${statusR})`);
              return false;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Steam.leaveOfficialGroup');
          return false;
        }
      }
      async #getOfficialGroupId(gameId) {
        try {
          const logStatus = scripts_echoLog({
            type: 'gettingSteamOfficialGroupId',
            text: gameId
          });
          const groupId = this.#cache.officialGroup[gameId];
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
            if (data?.status === 200) {
              const groupId = data.responseText.match(/steam:\/\/friends\/joinchat\/([0-9]+)/)?.[1];
              if (groupId) {
                this.#setCache('officialGroup', gameId, groupId);
                logStatus.success();
                return groupId;
              }
              logStatus.error(`Error:${data.statusText}(${data.status})`);
              return false;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Steam.getGroupID');
          return false;
        }
      }
      async #addToWishlist(gameId) {
        try {
          if (this.#ASF) {
            if (await this.#ASF.addToWishlist(gameId)) {
              this.tasks.wishlists = unique([ ...this.tasks.wishlists, gameId ]);
              return true;
            }
            return false;
          }
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
              sessionid: this.#auth.storeSessionID,
              appid: gameId
            }),
            dataType: 'json'
          });
          if (result === 'Success' && data?.status === 200 && data.response?.success === true) {
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
            if (dataR?.status === 200) {
              if (this.#area === 'CN' && dataR.responseText.includes('id="error_box"')) {
                logStatus.warning(i18n('changeAreaNotice'));
                if (!await this.#changeArea()) {
                  return false;
                }
                return await this.#addToWishlist(gameId);
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
            logStatus.error(`Error:${dataR?.statusText}(${dataR?.status})`);
            return false;
          }
          logStatus.error(`${resultR}:${statusTextR}(${statusR})`);
          return false;
        } catch (error) {
          throwError(error, 'Steam.addToWishlist');
          return false;
        }
      }
      async #removeFromWishlist(gameId) {
        try {
          if (this.whiteList.wishlists.includes(gameId)) {
            scripts_echoLog({
              type: 'whiteList',
              text: 'Steam.removeFromWishlist',
              id: gameId
            });
            return true;
          }
          if (this.#ASF) {
            return await this.#ASF.removeFromWishlist(gameId);
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
              sessionid: this.#auth.storeSessionID,
              appid: gameId
            }),
            dataType: 'json'
          });
          if (result === 'Success' && data?.status === 200 && data.response?.success === true) {
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
            if (dataR?.status === 200) {
              if (this.#area === 'CN' && dataR.responseText.includes('id="error_box"')) {
                logStatus.warning(i18n('changeAreaNotice'));
                const result = await this.#changeArea();
                if (!result || result === 'CN' || result === 'skip') {
                  return false;
                }
                return await this.#removeFromWishlist(gameId);
              }
              if (dataR.responseText.includes('class="queue_actions_ctn"') && (dataR.responseText.includes('ds_owned_flag ds_flag') || dataR.responseText.includes('add_to_wishlist_area'))) {
                logStatus.success();
                return true;
              }
              logStatus.error(`Error:${dataR.statusText}(${dataR.status})`);
              return false;
            }
            logStatus.error(`Error:${dataR?.statusText}(${dataR?.status})`);
            return false;
          }
          logStatus.error(`${resultR}:${statusTextR}(${statusR})`);
          return false;
        } catch (error) {
          throwError(error, 'Steam.removeFromWishlist');
          return false;
        }
      }
      async #toggleFollowGame(gameId, doTask) {
        try {
          if (!doTask && this.whiteList.follows.includes(gameId)) {
            scripts_echoLog({
              type: 'whiteList',
              text: 'Steam.unfollowGame',
              id: gameId
            });
            return true;
          }
          if (this.#ASF) {
            if (await this.#ASF.toggleFollowGame(gameId, doTask)) {
              if (doTask) {
                this.tasks.follows = unique([ ...this.tasks.follows, gameId ]);
              }
              return true;
            }
            return false;
          }
          const logStatus = scripts_echoLog({
            type: `${doTask ? '' : 'un'}followingGame`,
            text: gameId
          });
          const requestData = {
            sessionid: this.#auth.storeSessionID,
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
          if (result === 'Success' && data?.status === 200 && data.responseText === 'true') {
            logStatus.success();
            return true;
          }
          const followed = await this.#isFollowedGame(gameId);
          if (this.#area === 'CN' && followed === 'areaLocked') {
            logStatus.warning(i18n('changeAreaNotice'));
            if (!await this.#changeArea()) {
              return false;
            }
            return await this.#toggleFollowGame(gameId, doTask);
          }
          if (doTask === followed) {
            logStatus.success();
            if (doTask) {
              this.tasks.follows = unique([ ...this.tasks.follows, gameId ]);
            }
            return true;
          }
          logStatus.error(`Error:${data?.statusText}(${data?.status})`);
          return false;
        } catch (error) {
          throwError(error, 'Steam.toggleFollowGame');
          return false;
        }
      }
      async #isFollowedGame(gameId) {
        try {
          const {
            result,
            data
          } = await tools_httpRequest({
            url: `https://store.steampowered.com/app/${gameId}`,
            method: 'GET'
          });
          if (result === 'Success') {
            if (data?.status === 200) {
              if (this.#area === 'CN' && data.responseText.includes('id="error_box"')) {
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
      async #toggleForum(gameId, doTask = true) {
        try {
          if (!doTask && this.whiteList.forums.includes(gameId)) {
            scripts_echoLog({
              type: 'whiteList',
              text: 'Steam.unsubscribeForum',
              id: gameId
            });
            return true;
          }
          const forumId = await this.#getForumId(gameId);
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
              sessionid: this.#auth.communitySessionID
            })
          });
          if (result === 'Success') {
            if (data?.status === 200 && (data.response?.success === 1 || data.response?.success === 29)) {
              if (doTask) {
                this.tasks.forums = unique([ ...this.tasks.forums, gameId ]);
              }
              logStatus.success();
              return true;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return true;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return true;
        } catch (error) {
          throwError(error, 'Steam.toggleForum');
          return true;
        }
      }
      async #getForumId(gameId) {
        try {
          const logStatus = scripts_echoLog({
            type: 'gettingForumId',
            text: gameId
          });
          const forumId = this.#cache.forum[gameId];
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
            if (data?.status === 200) {
              const forumId = data.responseText?.match(/General_([\d]+(_[\d]+)?)/)?.[1];
              if (forumId) {
                this.#setCache('forum', gameId, forumId);
                logStatus.success();
                return forumId;
              }
              logStatus.error(`Error:${data.statusText}(${data.status})`);
              return false;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Steam.getForumId');
          return false;
        }
      }
      async #toggleFavoriteWorkshop(id, doTask = true) {
        try {
          if (!doTask && this.whiteList.workshops.includes(id)) {
            scripts_echoLog({
              type: 'whiteList',
              text: 'Steam.unfavoriteWorkshop',
              id: id
            });
            return true;
          }
          const appid = await this.#getWorkshopAppId(id);
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
              sessionid: this.#auth.communitySessionID
            })
          });
          if (result === 'Success') {
            if (data?.status === 200 && !data.responseText) {
              if (doTask) {
                this.tasks.workshops = unique([ ...this.tasks.workshops, id ]);
              }
              logStatus.success();
              return true;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Steam.toggleFavoriteWorkshop');
          return false;
        }
      }
      async #getWorkshopAppId(id) {
        try {
          const logStatus = scripts_echoLog({
            type: 'gettingWorkshopAppId',
            text: id
          });
          const appId = this.#cache.workshop[id];
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
            if (data?.status === 200) {
              const appId = data.responseText.match(/<input type="hidden" name="appid" value="([\d]+?)" \/>/)?.[1];
              if (appId) {
                this.#setCache('workshop', id, appId);
                logStatus.success();
                return appId;
              }
              logStatus.error('Error: getWorkshopAppId failed');
              return false;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Steam.getWorkshopAppId');
          return false;
        }
      }
      async #voteUpWorkshop(id) {
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
              sessionid: this.#auth.communitySessionID
            })
          });
          if (result === 'Success') {
            if (data?.status === 200 && data.response?.success === 1) {
              logStatus.success();
              return true;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return true;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return true;
        } catch (error) {
          throwError(error, 'Steam.voteupWorkshop');
          return true;
        }
      }
      async #toggleCurator(curatorId, doTask = true) {
        try {
          if (!doTask && this.whiteList.curators.includes(curatorId)) {
            scripts_echoLog({
              type: 'whiteList',
              text: 'Steam.unfollowCurator',
              id: curatorId
            });
            return true;
          }
          if (this.#ASF) {
            return await this.#ASF.toggleCurator(curatorId, doTask);
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
              sessionid: this.#auth.storeSessionID,
              follow: doTask
            }),
            dataType: 'json'
          });
          if (result === 'Success') {
            if (data?.status === 200 && data.response?.success?.success === 1) {
              logStatus.success();
              return true;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.response?.success}` || `${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Steam.toggleCurator');
          return false;
        }
      }
      async getCuratorId(path, name) {
        try {
          const logStatus = scripts_echoLog({
            type: 'gettingCuratorId',
            text: `${path}/${name}`
          });
          const curatorId = this.#cache.curator[`${path}/${name}`];
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
            if (data?.status === 200) {
              const curatorId = data.responseText.match(/g_pagingData.*?"clanid":([\d]+)/)?.[1];
              if (curatorId) {
                this.#setCache('curator', `${path}/${name}`, curatorId);
                logStatus.success();
                return curatorId;
              }
              logStatus.error(`Error:${data.statusText}(${data.status})`);
              return false;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Steam.getCuratorID');
          return false;
        }
      }
      async #toggleCuratorLike(link, doTask = true) {
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
            return await this.#toggleCurator(curatorId, doTask);
          }
          return false;
        } catch (error) {
          throwError(error, 'Steam.toggleCuratorLike');
          return false;
        }
      }
      async #getAnnouncementParams(appId, viewId) {
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
            url: `https://store.steampowered.com/events/ajaxgetpartnerevent?appid=${appId}&announcement_gid=${viewId}&lang_list=6_0&last_modified_time=0&origin=https:%2F%2Fstore.steampowered.com&for_edit=false`,
            method: 'GET',
            responseType: 'json',
            headers: {
              Host: 'store.steampowered.com',
              Referer: `https://store.steampowered.com/news/app/${appId}/view/${viewId}`
            }
          });
          if (result === 'Success') {
            if (data?.status === 200 && data?.response?.success === 1) {
              const {
                clanid,
                gid
              } = data.response.event?.announcement_body || {};
              if (clanid) {
                logStatus.success();
                return {
                  clanId: clanid,
                  gid: gid
                };
              }
              logStatus.error(`Error:${data.statusText}(${data.status})`);
              return {};
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return {};
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return {};
        } catch (error) {
          throwError(error, 'Steam.likeAnnouncement');
          return {};
        }
      }
      async #likeAnnouncement(id) {
        try {
          const [ appId, viewId ] = id.split('/');
          if (!(appId && viewId)) {
            scripts_echoLog({}).error(`${i18n('missParams')}(id)`);
            return false;
          }
          const {
            clanId,
            gid
          } = await this.#getAnnouncementParams(appId, viewId);
          if (!clanId) {
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
              sessionid: this.#auth.storeSessionID,
              voteup: 1,
              clanid: clanId,
              ajax: 1
            }),
            dataType: 'json'
          });
          if (result === 'Success') {
            if (data?.status === 200 && data.response.success === 1) {
              logStatus.success();
              return true;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Steam.likeAnnouncement');
          return false;
        }
      }
      async #appid2subid(id) {
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
            if (data?.status === 200) {
              if (data.responseText.includes('ds_owned_flag ds_flag') || data.responseText.includes('class="already_in_library"')) {
                logStatus.success(i18n('owned'));
                return false;
              }
              if (this.#area === 'CN' && data.responseText.includes('id="error_box"')) {
                logStatus.warning(i18n('changeAreaNotice'));
                const result = await this.#changeArea();
                if (!result || result === 'CN' || result === 'skip') {
                  return false;
                }
                return await this.#appid2subid(id);
              }
              let subid = data.responseText.match(/name="subid" value="([\d]+?)"/)?.[1];
              if (subid) {
                logStatus.success();
                return subid;
              }
              subid = data.responseText.match(/AddFreeLicense\(\s*(\d+)/)?.[1];
              if (subid) {
                logStatus.success();
                return subid;
              }
              logStatus.error(`Error:${i18n('noSubid')}`);
              return false;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Steam.appid2subid');
          return false;
        }
      }
      async #getLicenses() {
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
            if (data?.status === 200) {
              logStatus.success();
              return data.response?.rgOwnedPackages;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Steam.getLicenses');
          return false;
        }
      }
      async #addLicense(id) {
        try {
          if (this.#ASF) {
            return await this.#ASF.addLicense(id);
          }
          const [ type, ids ] = id.split('-');
          if (type === 'appid') {
            const subid = await this.#appid2subid(ids);
            if (!subid) {
              return false;
            }
            const logStatus = scripts_echoLog({
              type: 'addingFreeLicense',
              text: ids
            });
            if (!await this.#addFreeLicense(subid, logStatus)) {
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
              if (data?.status === 200) {
                if (data.responseText.includes('ds_owned_flag ds_flag') || data.responseText.includes('class="already_in_library"')) {
                  logStatus.success();
                  return true;
                }
                logStatus.error(`Error:${data.statusText}(${data.status})`);
                return false;
              }
              logStatus.error(`Error:${data?.statusText}(${data?.status})`);
              return false;
            }
            logStatus.error(`${result}:${statusText}(${status})`);
            return false;
          } else if (type === 'subid') {
            if (this.#area === 'CN') {
              scripts_echoLog({}).success(i18n('tryChangeAreaNotice'));
              await this.#changeArea();
            }
            const logStatusArr = {};
            const idsArr = ids.split(',');
            for (const subid of idsArr) {
              const logStatus = scripts_echoLog({
                type: 'addingFreeLicenseSubid',
                text: subid
              });
              if (!await this.#addFreeLicense(subid, logStatus)) {
                return false;
              }
              logStatusArr[subid] = logStatus;
            }
            const licenses = await this.#getLicenses();
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
      async #addFreeLicense(id, logStatusPre) {
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
            url: `https://store.steampowered.com/freelicense/addfreelicense/${id}`,
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
              Host: 'store.steampowered.com',
              Origin: 'https://store.steampowered.com',
              Referer: 'https://store.steampowered.com/account/licenses/'
            },
            data: $.param({
              ajax: true,
              sessionid: this.#auth.storeSessionID
            }),
            dataType: 'json'
          });
          if (result === 'Success') {
            if (data?.status === 200) {
              if (this.#area === 'CN' && data.responseText.includes('id="error_box"')) {
                logStatus.warning(i18n('changeAreaNotice'));
                const result = await this.#changeArea();
                if (!result || [ 'CN', 'skip' ].includes(result)) {
                  return false;
                }
                return await this.#addFreeLicense(id);
              }
              logStatus.success();
              return true;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Steam.addFreeLicense');
          return false;
        }
      }
      async #requestPlayTestAccess(id) {
        try {
          if (this.#ASF) {
            return await this.#ASF.requestPlayTestAccess(id);
          }
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
              sessionid: this.#auth.storeSessionID
            }),
            dataType: 'json'
          });
          if (result === 'Success') {
            if (data?.status === 200 && data?.response?.success === 1) {
              logStatus.success();
              return true;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Steam.requestPlayTestAccess');
          return false;
        }
      }
      async toggle({
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
      }) {
        try {
          if ([ ...groupLinks, ...officialGroupLinks, ...forumLinks, ...workshopLinks, ...workshopVoteLinks ].length > 0 && !this.#communityInitialized) {
            scripts_echoLog({
              text: i18n('needInit')
            });
            return false;
          }
          if ([ ...wishlistLinks, ...followLinks, ...curatorLinks, ...curatorLikeLinks, ...announcementLinks, ...licenseLinks, ...playtestLinks ].length > 0 && !this.#storeInitialized) {
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
            const realGroups = this.getRealParams('groups', groupLinks, doTask, link => link.match(/groups\/(.+)\/?/)?.[1]);
            if (realGroups.length > 0) {
              for (const group of realGroups) {
                if (doTask) {
                  prom.push(this.#joinGroup(group));
                } else {
                  prom.push(this.#leaveGroup(group));
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
            const realOfficialGroups = this.getRealParams('officialGroups', officialGroupLinks, doTask, link => link.match(/games\/(.+)\/?/)?.[1]);
            if (realOfficialGroups.length > 0) {
              for (const officialGroup of realOfficialGroups) {
                if (doTask) {
                  prom.push(this.#joinOfficialGroup(officialGroup));
                } else {
                  prom.push(this.#leaveOfficialGroup(officialGroup));
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
            const realWishlists = this.getRealParams('wishlists', wishlistLinks, doTask, link => link.match(/app\/([\d]+)/)?.[1]);
            if (realWishlists.length > 0) {
              for (const game of realWishlists) {
                if (doTask) {
                  prom.push(this.#addToWishlist(game));
                } else {
                  prom.push(this.#removeFromWishlist(game));
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
            const realFollows = this.getRealParams('follows', followLinks, doTask, link => link.match(/app\/([\d]+)/)?.[1]);
            if (realFollows.length > 0) {
              for (const game of realFollows) {
                prom.push(this.#toggleFollowGame(game, doTask));
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
            const realForums = this.getRealParams('forums', forumLinks, doTask, link => link.match(/app\/([\d]+)/)?.[1]);
            if (realForums.length > 0) {
              for (const forum of realForums) {
                prom.push(this.#toggleForum(forum, doTask));
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
            const realWorkshops = this.getRealParams('workshops', workshopLinks, doTask, link => link.match(/\?id=([\d]+)/)?.[1]);
            if (realWorkshops.length > 0) {
              for (const workshop of realWorkshops) {
                prom.push(this.#toggleFavoriteWorkshop(workshop, doTask));
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
            const realworkshopVotes = this.getRealParams('workshopVotes', workshopVoteLinks, doTask, link => link.match(/\?id=([\d]+)/)?.[1]);
            if (doTask && realworkshopVotes.length > 0) {
              for (const workshop of realworkshopVotes) {
                prom.push(this.#voteUpWorkshop(workshop));
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
            const realCurators = this.getRealParams('curators', curatorLinks, doTask, link => link.match(/curator\/([\d]+)/)?.[1]);
            const realCuratorLikes = this.getRealParams('curatorLikes', curatorLikeLinks, doTask, link => link.match(/https?:\/\/store\.steampowered\.com\/(.*?)\/([^/?]+)/)?.slice(1, 3).join('/'));
            if (realCurators.length > 0) {
              for (const curator of realCurators) {
                prom.push(this.#toggleCurator(curator, doTask));
                await delay(1e3);
              }
            }
            if (realCuratorLikes.length > 0) {
              for (const curatorLike of realCuratorLikes) {
                prom.push(this.#toggleCuratorLike(curatorLike, doTask));
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
              if (link.includes('store.steampowered.com')) {
                return link.match(/store\.steampowered\.com\/news\/app\/([\d]+)\/view\/([\d]+)/)?.slice(1, 3).join('/');
              }
              return link.match(/steamcommunity\.com\/games\/([\d]+)\/announcements\/detail\/([\d]+)/)?.slice(1, 3).join('/');
            });
            if (doTask && realAnnouncements.length > 0) {
              for (const id of realAnnouncements) {
                prom.push(this.#likeAnnouncement(id));
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
            for (const ids of licenseLinks) {
              const [ type, idsStr ] = ids.split('-');
              const idsArr = idsStr.split(',');
              for (const id of idsArr) {
                prom.push(this.#addLicense(`${type}-${id}`));
                await delay(1e3);
              }
            }
          }
          if (doTask && !globalOptions.doTask.steam.playtests) {
            scripts_echoLog({
              type: 'globalOptionsSkip',
              text: 'steam.playtests'
            });
          } else {
            const realPlaytests = this.getRealParams('playtests', playtestLinks, doTask, link => link.match(/app\/([\d]+)/)?.[1]);
            if (doTask && globalOptions.doTask.steam.playtests && realPlaytests.length > 0) {
              for (const id of realPlaytests) {
                prom.push(this.#requestPlayTestAccess(id));
                await delay(1e3);
              }
            }
          }
          return Promise.all(prom).then(async () => {
            if (this.#oldArea && this.#area !== this.#oldArea) {
              scripts_echoLog({}).warning(i18n('steamFinishNotice') + this.#oldArea);
              await this.#changeArea(this.#oldArea);
            }
            return true;
          });
        } catch (error) {
          throwError(error, 'Steam.toggle');
          return false;
        }
      }
      #setCache(type, name, id) {
        try {
          this.#cache[type][name] = id;
          GM_setValue('steamCache', this.#cache);
        } catch (error) {
          throwError(error, 'Steam.setCache');
        }
      }
    }
    const social_Steam = Steam;
    class Website {
      undoneTasks;
      socialTasks;
      giveawayId;
      socialInitialized = {
        discord: false,
        instagram: false,
        reddit: false,
        twitch: false,
        twitter: false,
        vk: false,
        youtube: false,
        steamStore: false,
        steamCommunity: false
      };
      initialized = false;
      steamTaskType = {
        steamStore: false,
        steamCommunity: false
      };
      social = {};
      async #bind(name, init) {
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
      async initSocial(action) {
        try {
          const pro = [];
          const tasks = action === 'do' ? this.undoneTasks : this.socialTasks;
          if (tasks.discord) {
            const hasDiscord = Object.values(tasks.discord).reduce((total, arr) => [ ...total, ...arr ]).length > 0;
            if (hasDiscord && (!this.socialInitialized.discord || !this.social.discord)) {
              this.social.discord = new social_Discord();
              pro.push(this.#bind('discord', this.social.discord.init(action)));
            }
          }
          if (tasks.instagram) {
            const hasInstagram = Object.values(tasks.instagram).reduce((total, arr) => [ ...total, ...arr ]).length > 0;
            if (hasInstagram && (!this.socialInitialized.instagram || !this.social.instagram)) {
              this.social.instagram = new social_Instagram();
              pro.push(this.#bind('instagram', this.social.instagram.init()));
            }
          }
          if (tasks.reddit) {
            const hasReddit = Object.values(tasks.reddit).reduce((total, arr) => [ ...total, ...arr ]).length > 0;
            if (hasReddit && (!this.socialInitialized.reddit || !this.social.reddit)) {
              this.social.reddit = new social_Reddit();
              pro.push(this.#bind('reddit', this.social.reddit.init()));
            }
          }
          if (tasks.twitch) {
            const hasTwitch = Object.values(tasks.twitch).reduce((total, arr) => [ ...total, ...arr ]).length > 0;
            if (hasTwitch && (!this.socialInitialized.twitch || !this.social.twitch)) {
              this.social.twitch = new social_Twitch();
              pro.push(this.#bind('twitch', this.social.twitch.init()));
            }
          }
          if (tasks.twitter) {
            const hasTwitter = Object.values(tasks.twitter).reduce((total, arr) => [ ...total, ...arr ]).length > 0;
            if (hasTwitter && (!this.socialInitialized.twitter || !this.social.twitter)) {
              this.social.twitter = new social_Twitter();
              pro.push(this.#bind('twitter', this.social.twitter.init()));
            }
          }
          if (tasks.vk) {
            const hasVk = Object.values(tasks.vk).reduce((total, arr) => [ ...total, ...arr ]).length > 0;
            if (hasVk && (!this.socialInitialized.vk || !this.social.vk)) {
              this.social.vk = new social_Vk();
              pro.push(this.#bind('vk', this.social.vk.init()));
            }
          }
          if (tasks.youtube) {
            const hasYoutube = Object.values(tasks.youtube).reduce((total, arr) => [ ...total, ...arr ]).length > 0;
            if (hasYoutube && (!this.socialInitialized.youtube || !this.social.youtube)) {
              this.social.youtube = new Youtube();
              pro.push(this.#bind('youtube', this.social.youtube.init()));
            }
          }
          if (tasks.steam) {
            const steamLength = Object.values(tasks.steam).reduce((total, arr) => [ ...total, ...arr ]).length;
            if (steamLength > 0) {
              if (!this.social.steam) {
                this.social.steam = new social_Steam();
              }
              const steamCommunityLength = Object.keys(tasks.steam).map(type => [ 'groupLinks', 'officialGroupLinks', 'forumLinks', 'workshopLinks', 'workshopVoteLinks' ].includes(type) ? tasks.steam?.[type]?.length || 0 : 0).reduce((total, number) => total + number, 0);
              if (steamLength - steamCommunityLength > 0) {
                this.steamTaskType.steamStore = true;
                if (!this.socialInitialized.steamStore) {
                  pro.push(this.#bind('steamStore', this.social.steam.init('store')));
                }
              }
              if (steamCommunityLength > 0) {
                if (!this.socialInitialized.steamCommunity) {
                  this.steamTaskType.steamCommunity = true;
                  pro.push(this.#bind('steamCommunity', this.social.steam.init('community')));
                }
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
        try {
          const result = {};
          for (const [ social, types ] of Object.entries(allTasks)) {
            result[social] = {};
            for (const [ type, tasks ] of Object.entries(types)) {
              result[social][type] = unique(tasks);
            }
          }
          return result;
        } catch (error) {
          throwError(error, 'Website.uniqueTasks');
          return allTasks;
        }
      }
      async toggleTask(action) {
        try {
          if (!this.initialized && !this.init()) {
            return false;
          }
          if (!await this.classifyTask(action)) {
            return false;
          }
          await this.initSocial(action);
          const pro = [];
          const doTask = action === 'do';
          const tasks = doTask ? this.undoneTasks : this.socialTasks;
          if (this.socialInitialized.discord === true && this.social.discord) {
            pro.push(this.social.discord.toggle({
              doTask: doTask,
              ...tasks.discord
            }));
          }
          if (this.socialInitialized.instagram === true && this.social.instagram) {
            pro.push(this.social.instagram.toggle({
              doTask: doTask,
              ...tasks.instagram
            }));
          }
          if (this.socialInitialized.reddit === true && this.social.reddit) {
            pro.push(this.social.reddit.toggle({
              doTask: doTask,
              ...tasks.reddit
            }));
          }
          if (this.socialInitialized.twitch === true && this.social.twitch) {
            pro.push(this.social.twitch.toggle({
              doTask: doTask,
              ...tasks.twitch
            }));
          }
          if (this.socialInitialized.twitter === true && this.social.twitter) {
            pro.push(this.social.twitter.toggle({
              doTask: doTask,
              ...tasks.twitter
            }));
          }
          if (this.socialInitialized.vk === true && this.social.vk) {
            pro.push(this.social.vk.toggle({
              doTask: doTask,
              ...tasks.vk
            }));
          }
          if (this.socialInitialized.youtube === true && this.social.youtube) {
            pro.push(this.social.youtube.toggle({
              doTask: doTask,
              ...tasks.youtube
            }));
          }
          if ((this.steamTaskType.steamCommunity ? this.socialInitialized.steamCommunity === true : true) && (this.steamTaskType.steamStore ? this.socialInitialized.steamStore === true : true) && this.social.steam) {
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
    const website_Website = Website;
    const defaultTasksTemplate = {
      steam: {
        groupLinks: [],
        wishlistLinks: [],
        curatorLinks: [],
        followLinks: []
      },
      discord: {
        serverLinks: []
      },
      vk: {
        nameLinks: []
      },
      extra: {
        website: []
      }
    };
    const defaultTasks = JSON.stringify(defaultTasksTemplate);
    class FreeAnyWhere extends website_Website {
      name = 'FreeAnyWhere';
      tasks = [];
      socialTasks = JSON.parse(defaultTasks);
      undoneTasks = JSON.parse(defaultTasks);
      buttons = [ 'doTask', 'undoTask', 'verifyTask', 'getKey' ];
      static test() {
        return window.location.host === 'freeanywhere.net';
      }
      async init() {
        try {
          const logStatus = scripts_echoLog({
            text: i18n('initing')
          });
          debug('检测登录按钮');
          if ($('div.header__login a[href*=logout]').length === 0) {
            window.open('https://freeanywhere.net/game.php?steam_login', '_self');
            logStatus.warning(i18n('needLogin'));
            return false;
          }
          debug('检测是否为登录页面');
          if (window.location.href.includes('/login')) {
            logStatus.warning(i18n('needLogin'));
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
            this.socialTasks = GM_getValue(`fawTasks-${this.giveawayId}`)?.tasks || JSON.parse(defaultTasks);
          }
          const tasks = $('div.game__content-tasks__task').map((index, element) => ({
            id: $(element).attr('data-id'),
            social: $(element).find('div.task-img img').attr('alt'),
            link: $(element).find('div.task-link a').attr('href'),
            title: $(element).find('div.task-link').text().trim(),
            type: $(element).attr('data-type'),
            isSuccess: $(element).hasClass('done')
          })).toArray();
          if (tasks.length === 0) {
            logStatus.success();
            return false;
          }
          if (action === 'verify') {
            this.tasks = [];
          }
          for (const task of tasks) {
            debug('任务分类', task);
            const {
              id,
              social,
              title,
              type,
              link,
              isSuccess
            } = task;
            const taskInfo = {
              id: id,
              title: title,
              social: social,
              type: type
            };
            if (action === 'verify' && !isSuccess) {
              this.tasks.push(taskInfo);
              continue;
            }
            switch (type) {
             case 'steam_account_verify':
              break;

             case 'steam_game_wishlist':
              if (action === 'undo' && link) {
                this.socialTasks.steam.wishlistLinks.push(link);
              }
              if (action === 'do' && !isSuccess && link) {
                this.undoneTasks.steam.wishlistLinks.push(link);
              }
              break;

             case 'steam_group_sub':
              if (action === 'undo' && link) {
                this.socialTasks.steam.groupLinks.push(link);
              }
              if (action === 'do' && !isSuccess && link) {
                this.undoneTasks.steam.groupLinks.push(link);
              }
              break;

             case 'site_visit':
              if (action === 'do' && !isSuccess) {
                this.undoneTasks.extra.website.push(`id=${id}&type=${type}&task=true`);
              }
              break;

             case 'vk_community_sub':
              if (action === 'undo' && link) {
                this.socialTasks.vk.nameLinks.push(link);
              }
              if (action === 'do' && !isSuccess && link) {
                this.undoneTasks.vk.nameLinks.push(link);
              }
              break;

             case 'vk_post_like':
              if (action === 'undo' && link) {
                this.socialTasks.vk.nameLinks.push(`${link}&action=like`);
              }
              if (action === 'do' && !isSuccess && link) {
                this.undoneTasks.vk.nameLinks.push(`${link}&action=like`);
              }
              break;

             case 'discord_server_sub':
              if (action === 'undo' && link) {
                this.socialTasks.discord.serverLinks.push(link);
              }
              if (action === 'do' && !isSuccess && link) {
                this.undoneTasks.discord.serverLinks.push(link);
              }
              break;

             case 'none':
              scripts_echoLog({}).warning(`${i18n('notConnect')}`);
              break;

             default:
              scripts_echoLog({}).warning(`${i18n('unKnownTaskType')}: ${type}`);
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
        } catch (error) {
          throwError(error, 'Freeanywhere.classifyTask');
          return false;
        }
      }
      async verifyTask() {
        try {
          if (!this.initialized && !this.init()) {
            debug('未初始化');
            return false;
          }
          if (this.tasks.length === 0 && !await this.classifyTask('verify')) {
            debug('任务列表为空', this.tasks);
            return false;
          }
          const pro = [];
          for (const task of this.tasks) {
            pro.push(this.#verify(task));
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
      async extraDoTask({
        website
      }) {
        try {
          const pro = [];
          for (const link of website) {
            pro.push(this.#doVisitWebsite(link));
          }
          return Promise.all(pro).then(() => true);
        } catch (error) {
          throwError(error, 'FreeAnyWhere.extraDoTask');
          return false;
        }
      }
      async #doVisitWebsite(link) {
        try {
          const logStatus = scripts_echoLog({
            text: i18n('visitingLink')
          });
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: 'https://freeanywhere.net/php/task_site_visit_done.php',
            method: 'POST',
            headers: {
              'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: link
          });
          if (result === 'Success') {
            logStatus.success();
            return true;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'FreeAnyWhere.doVisitWebsite');
          return false;
        }
      }
      async getKey(initialized) {
        try {
          if (!initialized && !this.initialized && !this.init()) {
            debug('未初始化');
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
            url: 'https://freeanywhere.net/php/user_get_key.php',
            method: 'POST'
          });
          if (result === 'Success') {
            if (data?.responseText.indexOf('bad') !== -1 || data?.responseText.length > 50) {
              logStatus.error(data?.responseText);
              return false;
            }
            logStatus.success();
            scripts_echoLog({}).success(data.responseText);
            return data.responseText;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'FreeAnyWhere.getGiveawayId');
          return false;
        }
      }
      #getGiveawayId() {
        try {
          const giveawayId = new URLSearchParams(window.location.search).get('n');
          if (giveawayId) {
            this.giveawayId = giveawayId;
            return true;
          }
          scripts_echoLog({}).error(i18n('getFailed', 'GiveawayId'));
          return false;
        } catch (error) {
          throwError(error, 'FreeAnyWhere.getGiveawayId');
          return false;
        }
      }
      async #verify(task) {
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
            url: 'https://freeanywhere.net/php/user_task_update.php',
            method: 'POST',
            headers: {
              'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: `id=${task.id}&type=${task.type}`
          });
          if (result === 'Success') {
            if (data?.responseText.trim() === 'good') {
              logStatus.success();
              return true;
            }
            debug('任务验证结果', data?.response);
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Freeanywhere.verify');
          return false;
        }
      }
      async #checkLeftKey() {
        try {
          if (!globalOptions.other.checkLeftKey) {
            return true;
          }
          debug('检测剩余Key');
          const {
            data
          } = await tools_httpRequest({
            url: 'https://freeanywhere.net/api/v1/widget/?format=json',
            method: 'GET',
            dataType: 'json',
            headers: {
              authorization: `Token ${window.localStorage.getItem('token')}`
            }
          });
          if (data?.response?.giveaways.find(giveaway => `${giveaway?.id}` === this.giveawayId)) {
            return true;
          }
          await external_Swal_default().fire({
            icon: 'warning',
            title: i18n('notice'),
            text: i18n('noKeysLeft'),
            confirmButtonText: i18n('confirm'),
            cancelButtonText: i18n('cancel'),
            showCancelButton: true
          }).then(({
            value
          }) => {
            if (value) {
              window.close();
            }
          });
          return true;
        } catch (error) {
          throwError(error, 'Giveawaysu.checkLeftKey');
          return false;
        }
      }
    }
    const Freeanywhere = FreeAnyWhere;
    const Giveawaysu_defaultTasks = {
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
      },
      twitter: {
        userLinks: [],
        retweetLinks: []
      }
    };
    class GiveawaySu extends website_Website {
      name = 'GiveawaySu';
      socialTasks = Giveawaysu_defaultTasks;
      undoneTasks = Giveawaysu_defaultTasks;
      buttons = [ 'doTask', 'undoTask' ];
      static test() {
        return /^https?:\/\/giveaway\.su\/giveaway\/view\/[\d]+/.test(window.location.href);
      }
      async after() {
        try {
          if (!this.#checkLogin()) {
            scripts_echoLog({}).warning(i18n('checkLoginFailed'));
          }
          if (!await this.#checkLeftKey()) {
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
          if (!this.#getGiveawayId()) {
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
            this.socialTasks = GM_getValue(`gasTasks-${this.giveawayId}`)?.tasks || Giveawaysu_defaultTasks;
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
      #checkLogin() {
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
      async #checkLeftKey() {
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
            }).then(({
              value
            }) => {
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
      #getGiveawayId() {
        try {
          const giveawayId = window.location.href.match(/\/view\/([\d]+)/)?.[1];
          if (giveawayId) {
            this.giveawayId = giveawayId;
            return true;
          }
          scripts_echoLog({
            text: i18n('getFailed', 'GiveawayId')
          });
          return false;
        } catch (error) {
          throwError(error, 'Giveawaysu.getGiveawayId');
          return false;
        }
      }
    }
    class Indiedb {
      name = 'Indiedb';
      buttons = [ 'doTask' ];
      static test() {
        return window.location.host === 'www.indiedb.com';
      }
      async after() {
        try {
          if (!this.#checkLogin()) {
            scripts_echoLog({}).warning(i18n('checkLoginFailed'));
          }
          if (!await this.#checkLeftKey()) {
            scripts_echoLog({}).warning(i18n('checkLeftKeyFailed'));
          }
        } catch (error) {
          throwError(error, 'Indiedb.after');
        }
      }
      async doTask() {
        try {
          if (!await this.#join()) {
            return false;
          }
          return await this.#do();
        } catch (error) {
          throwError(error, 'Indiedb.doTask');
          return false;
        }
      }
      async #join() {
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
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                Accept: 'application/json, text/javascript, */*; q=0.01',
                Origin: window.location.origin,
                referer: window.location.href
              }
            });
            if (result === 'Success') {
              if (data?.status === 200) {
                if (data.response?.success) {
                  currentoption.addClass('buttonentered').text('Success - Giveaway joined');
                  $('#giveawaysjoined').slideDown();
                  $('#giveawaysrecommend').slideDown();
                  logStatus.success(`Success${data.response?.text ? `:${data.response?.text}` : ''}`);
                  return true;
                }
                logStatus.error(`Error${data.response?.text ? `:${data.response?.text}` : ''}`);
                return false;
              }
              if (await this.#join2()) {
                logStatus.success('Success');
                return true;
              }
              logStatus.error(`Error:${data?.statusText}(${data?.status})`);
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
          throwError(error, 'Indiedb.join');
          return false;
        }
      }
      async #join2() {
        try {
          return await new Promise(resolve => {
            const targetNode = document.getElementById('giveawaysjoined');
            const config = {
              attributes: true
            };
            const observer = new MutationObserver(() => {
              if ($('#giveawaysjoined').is(':visible')) {
                resolve(true);
                observer.disconnect();
              }
            });
            observer.observe(targetNode, config);
            $('a.buttonenter.buttongiveaway')[0]?.click();
            setTimeout(() => {
              resolve(false);
              observer.disconnect();
            }, 3e4);
          });
        } catch (error) {
          throwError(error, 'Indiedb.join2');
          return false;
        }
      }
      async #do() {
        try {
          const id = $('script').map((index, script) => {
            if (/\$\(document\)/gim.test(script.innerHTML)) {
              return [ script.innerHTML.match(/"\/[\d]+"/gim)?.[0]?.match(/[\d]+/)?.[0], script.innerHTML.match(/"\/newsletter\/ajax\/subscribeprofile\/optin\/[\d]+"/gim)?.[0]?.match(/[\d]+/)?.[0] ];
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
                    const data = getUrlQuery(promo.attr('href'));
                    data.ajax = 't';
                    $.ajax({
                      type: 'POST',
                      url: urlPath(promo.attr('href')?.split(/[?#]/)[0]),
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
      #checkLogin() {
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
      async #checkLeftKey() {
        try {
          if (!globalOptions.other.checkLeftKey) {
            return true;
          }
          if ($('a.buttonenter:contains("next time"), a.buttonenter:contains("Giveaway is closed")').length > 0) {
            await external_Swal_default().fire({
              icon: 'warning',
              title: i18n('notice'),
              text: i18n('giveawayEnded'),
              confirmButtonText: i18n('confirm'),
              cancelButtonText: i18n('cancel'),
              showCancelButton: true
            }).then(({
              value
            }) => {
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
    }
    const website_Indiedb = Indiedb;
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
      extra: {
        videoTasks: []
      },
      links: []
    };
    const Keyhub_defaultTasks = JSON.stringify(Keyhub_defaultTasksTemplate);
    class Keyhub extends website_Website {
      name = 'Keyhub';
      socialTasks = JSON.parse(Keyhub_defaultTasks);
      undoneTasks = JSON.parse(Keyhub_defaultTasks);
      buttons = [ 'doTask', 'undoTask' ];
      static test() {
        return window.location.host === 'key-hub.eu';
      }
      async after() {
        try {
          if (!this.#checkLogin()) {
            scripts_echoLog({}).warning(i18n('checkLoginFailed'));
          }
          if (!await this.#checkLeftKey()) {
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
          if (!this.#getGiveawayId()) {
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
            this.socialTasks = GM_getValue(`khTasks-${this.giveawayId}`)?.tasks || JSON.parse(Keyhub_defaultTasks);
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
              GM_openInTab(link, {
                active: true
              });
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
            } else if (/^javascript:videoTask.+/.test(link)) {
              if (action === 'do') {
                const taskData = link.match(/javascript:videoTask\('.+?','(.+?)'/)?.[1];
                if (taskData) {
                  this.undoneTasks.extra.videoTasks.push(taskData);
                }
              }
            } else if (/^https?:\/\/www\.instagram\.com\/.*/.test(link) || /^https?:\/\/twitter\.com\/.*/.test(link) || /^https?:\/\/www\.twitch\.tv\/.*/.test(link) || /^https?:\/\/www\.facebook\.com\/.*/.test(link) || /^https?:\/\/www\.youtube\.com\/.*/.test(link) || /^https?:\/\/store\.steampowered\.com\/developer\//.test(link) || /^https?:\/\/.*?\.itch\.io\/.*/.test(link) || /^https?:\/\/key-hub\.eu.*/.test(link) || /^https?:\/\/store\.steampowered\.com\/app\/.*/.test(link) || /^https?:\/\/qr\.streamelements\.com\/.*/.test(link) || /^https?:\/\/store\.steampowered\.com\/news\/app\/.*/.test(link)) {} else {
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
      async #doScriptTask(data) {
        try {
          const logStatus = scripts_echoLog({
            text: i18n('doingKeyhubTask')
          });
          const {
            result,
            statusText,
            status,
            data: response
          } = await tools_httpRequest({
            url: `/away?data=${data}`,
            method: 'GET',
            headers: {
              origin: 'https://key-hub.eu',
              referer: 'https://key-hub.eu/'
            }
          });
          if (result === 'Success') {
            if (response?.status === 200) {
              logStatus.success();
              return true;
            }
            logStatus.error(`Error:${response?.statusText}(${response?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Keyhub.doScriptTask');
          return false;
        }
      }
      async extraDoTask({
        videoTasks
      }) {
        try {
          const pro = [];
          for (const data of videoTasks) {
            pro.push(this.#doScriptTask(data));
          }
          return Promise.all(pro).then(() => true);
        } catch (error) {
          throwError(error, 'Keyhub.extraDoTask');
          return false;
        }
      }
      #getGiveawayId() {
        try {
          const giveawayId = window.location.href.match(/giveaway\/([\d]+)/)?.[1];
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
      async #checkLeftKey() {
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
            }).then(({
              value
            }) => {
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
      #checkLogin() {
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
    }
    const website_Keyhub = Keyhub;
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
    class Givekey extends website_Website {
      name = 'Givekey';
      tasks = [];
      socialTasks = JSON.parse(Givekey_defaultTasks);
      undoneTasks = JSON.parse(Givekey_defaultTasks);
      userId;
      buttons = [ 'doTask', 'undoTask', 'verifyTask' ];
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
            }, 500);
          });
          if (!await this.#checkLeftKey()) {
            scripts_echoLog({}).warning(i18n('checkLeftKeyFailed'));
          }
        } catch (error) {
          throwError(error, 'Givekey.after');
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
          if (!this.#getGiveawayId()) {
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
            this.socialTasks = GM_getValue(`gkTasks-${this.giveawayId}`)?.tasks || JSON.parse(Givekey_defaultTasks);
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
            await this.#verify(this.tasks[i]);
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
      async #verify(task) {
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
      #getGiveawayId() {
        try {
          const giveawayId = window.location.href.match(/giveaway\/([\d]+)/)?.[1];
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
      async #checkLeftKey() {
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
            }).then(({
              value
            }) => {
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
    }
    const website_Givekey = Givekey;
    class GiveeClub extends GiveawaySu {
      name = 'GiveeClub';
      buttons = [ 'doTask', 'undoTask', 'verifyTask' ];
      static test() {
        return /^https?:\/\/givee\.club\/.*?\/event\/[\d]+/.test(window.location.href);
      }
      async after() {
        try {
          if (!this.#checkLogin()) {
            scripts_echoLog({}).warning(i18n('checkLoginFailed'));
          }
          if (!await this.#checkLeftKey()) {
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
          if (!this.#checkLogin()) {
            logStatus.warning(i18n('needLogin'));
            return false;
          }
          if (!this.#getGiveawayId()) {
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
            this.socialTasks = GM_getValue(`gcTasks-${this.giveawayId}`)?.tasks || Giveawaysu_defaultTasks;
            return true;
          }
          this.undoneTasks = Giveawaysu_defaultTasks;
          const pro = [];
          const tasks = $('.event-actions tr');
          for (const task of tasks) {
            pro.push(new Promise(resolve => {
              const taskDes = $(task).find('.event-action-label a');
              const taskIcon = $(task).find('.event-action-icon i').attr('class') || '';
              const taskName = taskDes.text().trim();
              const taskType = $(task).find('button[data-type]')?.attr('data-type');
              const taskFinished = $(task).find('.event-action-buttons .btn-success')?.length;
              if (taskIcon.includes('ban') || /AdBlock/i.test(taskName) || taskIcon.includes('envelope') || taskFinished) {
                return resolve(true);
              }
              getRedirectLink(taskDes.attr('href')).then(taskLink => {
                if (!taskLink) {
                  return resolve(false);
                }
                if (taskType === 'steam.group.join' && /^https?:\/\/steamcommunity\.com\/groups/.test(taskLink)) {
                  this.undoneTasks.steam.groupLinks.push(taskLink);
                } else if (/like.*announcement/gi.test(taskName)) {
                  this.undoneTasks.steam.announcementLinks.push(taskLink);
                } else if (taskType === 'steam.game.wishlist' && /^https?:\/\/store\.steampowered\.com\/app\//.test(taskLink)) {
                  this.undoneTasks.steam.wishlistLinks.push(taskLink);
                } else if (taskType === 'steam.game.wishlist' && taskDes.attr('data-steam-wishlist-appid')) {
                  this.undoneTasks.steam.wishlistLinks.push(`https://store.steampowered.com/app/${taskDes.attr('data-steam-wishlist-appid')}`);
                } else if (taskType === 'steam.game.follow' && /^https?:\/\/store\.steampowered\.com\/app\//.test(taskLink)) {
                  this.undoneTasks.steam.followLinks.push(taskLink);
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
                } else if (taskIcon.includes('twitter')) {
                  if (/https?:\/\/(twitter|x)\.com\/[^/]+\/?$/gim.test(taskLink)) {
                    this.undoneTasks.twitter.userLinks.push(taskLink);
                  } else if (/https?:\/\/(twitter|x)\.com\/[^/]+?\/status\/[\d]+/gim.test(taskLink)) {
                    this.undoneTasks.twitter.retweetLinks.push(taskLink);
                  }
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
      #checkLogin() {
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
      #getGiveawayId() {
        const giveawayId = window.location.href.match(/\/event\/([\d]+)/)?.[1];
        if (giveawayId) {
          this.giveawayId = giveawayId;
          return true;
        }
        scripts_echoLog({
          text: i18n('getFailed', 'GiveawayId')
        });
        return false;
      }
      async #checkLeftKey() {
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
            }).then(({
              value
            }) => {
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
    const website_GiveeClub = GiveeClub;
    const defaultOptions = {
      maxPoint: '99999999'
    };
    class OpiumPulses {
      name = 'OpiumPulses';
      options = {
        ...defaultOptions,
        ...GM_getValue('OpiumPulsesOptions')
      };
      maxPoints = 99999999;
      myPoints = 0;
      buttons = [ 'doFreeTask', 'doPointTask' ];
      static test() {
        return window.location.host === 'www.opiumpulses.com';
      }
      async after() {
        try {
          if (!this.#checkLogin()) {
            scripts_echoLog({}).warning(i18n('checkLoginFailed'));
          }
          this.maxPoints = parseInt(this.options.maxPoint, 10);
        } catch (error) {
          throwError(error, 'OpiumPulses.after');
        }
      }
      async doFreeTask() {
        try {
          this.#toggleTask('FREE');
        } catch (error) {
          throwError(error, 'OpiumPulses.doFreeTask');
        }
      }
      async doPointTask() {
        try {
          this.myPoints = parseInt($('.page-header__nav-func-user-nav-items.points-items').text().match(/[\d]+/gim)?.[0] || '0', 10);
          this.#toggleTask('points');
        } catch (error) {
          throwError(error, 'OpiumPulses.doPointTask');
        }
      }
      async #toggleTask(type) {
        try {
          const items = $(`.giveaways-page-item:contains('${type}'):not(:contains('ENTERED'))`);
          for (const item of items) {
            const needPoints = parseInt($(item).find('.giveaways-page-item-header-points').text().match(/[\d]+/gim)?.[0] || '999999', 10);
            const name = $(item).find('.giveaways-page-item-footer-name').text().trim();
            if (type === 'points' && needPoints > this.myPoints) {
              scripts_echoLog({}).warning(`${i18n('noPoints')}: ${name}`);
            } else if (type === 'points' && !needPoints) {
              scripts_echoLog({}).warning(`${i18n('getNeedPointsFailed')}: ${name}`);
            } else if (!(type === 'points' && needPoints > this.maxPoints)) {
              const logStatus = scripts_echoLog({
                text: `${i18n('joiningLottery')}<a href="${$(item).find('a.giveaways-page-item-img-btn-more').attr('href')}" target="_blank">${name}</a>...`
              });
              const aElement = $(item).find('a.giveaways-page-item-img-btn-enter:contains(\'enter\')');
              if (aElement?.attr('onclick')?.includes('checkUser')) {
                const giveawayId = aElement.attr('onclick')?.match(/[\d]+/)?.[0];
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
                const {
                  result: result0,
                  statusText: statusText0,
                  status: status0,
                  data: data0
                } = await tools_httpRequest({
                  url: data?.finalUrl,
                  method: 'GET'
                });
                if (data0?.responseText && /You've entered this giveaway/gim.test(data0.responseText)) {
                  logStatus.success();
                  const points = data0.responseText.match(/Points:[\s]*?([\d]+)/)?.[1];
                  if (type === 'points' && points) {
                    this.myPoints = parseInt(points, 10);
                  }
                } else if (data0?.responseText && /You're not eligible to enter/gim.test(data0.responseText)) {
                  logStatus.error('You\'re not eligible to enter');
                } else {
                  logStatus.error(`${result0}:${statusText0}(${status0})`);
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
      init() {
        return true;
      }
      classifyTask() {
        return true;
      }
      #checkLogin() {
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
          if (result === 'Success' && data?.status === 200) {
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
          if (result === 'Success' && data?.status === 200) {
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
          if (result === 'Success' && data?.status === 200) {
            if (/incentives&quot;:{&quot;[\d]+?&quot;:\[&quot;.+?&quot;\]/.test(data.responseText)) {
              return 'Won';
            }
            const campaignDiv = data.responseText.match(/<div class='popup-blocks-container'[\w\W]+?'>/)?.[0];
            if (!campaignDiv) {
              return false;
            }
            const campaignString = $(campaignDiv).attr('ng-init')?.match(/initCampaign\(([\w\W]+?)\)$/)?.[1];
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
          if (result === 'Success' && data?.status === 200) {
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
          if (result === 'Success' && data?.status === 200) {
            const keysleft = data.responseText.match(/<span id="keysleft">([\d]+?)<\/span>/)?.[1];
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
          if (result === 'Success' && data?.status === 200) {
            const keysleft = data.responseText.match(/<div class="">[\s]*?([\d]+?)[\s]*?of/)?.[1];
            if (!keysleft) {
              return false;
            }
            if (keysleft === '0') {
              return 'Ended';
            }
            return `Active(${keysleft})`;
          } else if (data?.status === 404) {
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
          if (result === 'Success' && data?.status === 200) {
            const endDate = data.responseText.match(/{"start_date":"[0-9A-Z-:]+?".*?"end_date":"([0-9A-Z-:]+?)".*?}/)?.[1];
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
          throwError(error, 'leftKeyChecker.itch');
          return false;
        }
      }
    };
    const website_leftKeyChecker = leftKeyChecker;
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
    class Keylol extends website_Website {
      name = 'Keylol';
      socialTasks = JSON.parse(Keylol_defaultTasks);
      undoneTasks = JSON.parse(Keylol_defaultTasks);
      buttons = [ 'doTask', 'undoTask', 'selectAll', 'selectNone', 'invertSelect' ];
      static test() {
        return window.location.host === 'keylol.com' && (!!$('.subforum_left_title_left_up a').eq(3).attr('href')?.includes('319') || !!$('.subforum_left_title_left_up a').eq(3).attr('href')?.includes('234'));
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
          const twitterLinks = mainPost.find('a[href*="twitter.com"]:visible,a[href*="x.com"]:visible');
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
              this.#addBtn(discordLink, 'discord', 'serverLinks', link);
            }
          }
          if (redditLinks.length > 0) {
            for (const redditLink of redditLinks) {
              const link = $(redditLink).attr('href');
              if (!(link && /^https?:\/\/www\.reddit\.com\/(r|user)\/.+/.test(link))) {
                continue;
              }
              this.#addBtn(redditLink, 'reddit', 'redditLinks', link);
            }
          }
          if (insLinks.length > 0) {
            for (const insLink of insLinks) {
              const link = $(insLink).attr('href');
              if (!(link && /^https:\/\/www\.instagram\.com\/.+/.test(link))) {
                continue;
              }
              this.#addBtn(insLink, 'instagram', 'userLinks', link);
            }
          }
          if (twitterLinks.length > 0) {
            for (const twitterLink of twitterLinks) {
              const link = $(twitterLink).attr('href');
              if (!(link && /^https:\/\/twitter\.com\/.+/.test(link))) {
                continue;
              }
              if (/https:\/\/twitter\.com\/.*?\/status\/[\d]+/.test(link)) {
                this.#addBtn(twitterLink, 'twitter', 'retweetLinks', link);
              } else {
                this.#addBtn(twitterLink, 'twitter', 'userLinks', link);
              }
            }
          }
          if (twitchLinks.length > 0) {
            for (const twitchLink of twitchLinks) {
              const link = $(twitchLink).attr('href');
              if (!(link && /^https:\/\/(www\.)?twitch\.tv\/.+/.test(link))) {
                continue;
              }
              this.#addBtn(twitchLink, 'twitch', 'channelLinks', link);
            }
          }
          if (vkLinks.length > 0) {
            for (const vkLink of vkLinks) {
              const link = $(vkLink).attr('href');
              if (!(link && /^https:\/\/vk\.com\/.+/.test(link))) {
                continue;
              }
              this.#addBtn(vkLink, 'vk', 'nameLinks', link);
            }
          }
          if (steamStoreLinks.length > 0) {
            for (const steamStoreLink of steamStoreLinks) {
              const link = $(steamStoreLink).attr('href');
              if (!link) {
                continue;
              }
              if (/curator\/[\d]+/.test(link)) {
                this.#addBtn(steamStoreLink, 'steam', 'curatorLinks', link);
              } else if (/(publisher|developer|franchise)\/.+/.test(link)) {
                this.#addBtn(steamStoreLink, 'steam', 'curatorLikeLinks', link);
              } else if (/news(hub)?\/app\/[\d]+\/view\/[\d]+/.test(link)) {
                this.#addBtn(steamStoreLink, 'steam', 'announcementLinks', link);
              } else if (/app\/[\d]+/.test(link)) {
                this.#addBtn(steamStoreLink, 'steam', 'followLinks', link);
                this.#addBtn(steamStoreLink, 'steam', 'wishlistLinks', link);
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
                this.#addBtn(steamCommunityLink, 'steam', 'groupLinks', link);
              } else if (/announcements\/detail\/[\d]+/.test(link)) {
                this.#addBtn(steamCommunityLink, 'steam', 'announcementLinks', link);
              }
            }
          }
          if (ytbLinks.length > 0) {
            for (const ytbLink of ytbLinks) {
              const link = $(ytbLink).attr('href');
              if (!link) {
                continue;
              }
              this.#addBtn(ytbLink, 'youtube', 'channelLinks', link);
              this.#addBtn(ytbLink, 'youtube', 'likeLinks', link);
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
                this.#addBtn($(`a[href="${link}"]`).after('<span style="color: #ccc; margin: 0 -5px 0 5px"> | </span>').next()[0], 'steam', 'licenseLinks', `appid-${link.replace('#asf', '')}`);
              }
            }
            const subLinks = mainPost.find('a[href*="steamdb.info/sub/"]:visible');
            if (subLinks.length > 0) {
              for (const subLink of subLinks) {
                const link = $(subLink).attr('href');
                if (!link) {
                  continue;
                }
                const subid = link.match(/^https:\/\/steamdb\.info\/sub\/([\d]+)/)?.[1];
                if (!subid) {
                  continue;
                }
                this.#addBtn(subLink, 'steam', 'licenseLinks', `subid-${subid}`);
              }
            }
            const asfLinks2 = mainPost.find('.blockcode:contains("addlicense"):visible');
            if (asfLinks2.length > 0) {
              for (const asfLink of asfLinks2) {
                const appid = [ ...asfLink.innerText.matchAll(/a(pp)?\/([\d]+)/g) ].map(matched => matched?.[2]).filter(id => id) || [];
                if (appid.length > 0) {
                  this.#addBtn($(asfLink).children('em')[0], 'steam', 'licenseLinks', `appid-${appid.join(',')}`);
                }
                const subid = asfLink.innerText.match(/[\d]+/g)?.filter(matched => !appid.includes(matched));
                if (!subid || subid.length === 0) {
                  continue;
                }
                this.#addBtn($(asfLink).children('em')[0], 'steam', 'licenseLinks', `subid-${subid.join(',')}`);
              }
            }
          }
          if ($('#threadindex').length > 0) {
            const [ targetNode ] = $('#postlist').children('div[id^="post_"]');
            const config = {
              childList: true
            };
            const observer = new MutationObserver(() => {
              observer.disconnect();
              this.after();
            });
            observer.observe(targetNode, config);
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
      #addBtn(before, social, linkType, link) {
        try {
          $(before).after('<a href="javascript:void(0);" class="auto-task-keylol" target="_self"' + ' onclick="this.getAttribute(\'selected\') ? this.removeAttribute(\'selected\') : this.setAttribute(\'selected\', \'selected\')"' + ` data-social="${social}" data-type="${linkType}" data-link="${link}">${linkType.replace('Links', '')}</a>`);
        } catch (error) {
          throwError(error, 'keylol.addBtn');
        }
      }
    }
    const website_Keylol = Keylol;
    const Opquests_defaultTasks = {
      steam: {
        groupLinks: [],
        wishlistLinks: [],
        followLinks: [],
        curatorLikeLinks: []
      }
    };
    class Opquests extends website_Website {
      name = 'Opquests';
      undoneTasks = {
        ...Opquests_defaultTasks
      };
      buttons = [ 'doTask', 'verifyTask', 'getKey' ];
      static test() {
        return window.location.host === 'opquests.com';
      }
      async after() {
        try {
          if (!this.#checkLogin()) {
            scripts_echoLog({}).warning(i18n('checkLoginFailed'));
          }
          const opquestsVerifyTasks = GM_getValue('opquestsVerifyTasks') || [];
          if (opquestsVerifyTasks.length > 0) {
            const taskId = opquestsVerifyTasks.pop();
            GM_setValue('opquestsVerifyTasks', opquestsVerifyTasks);
            const [ verifyBtn ] = $(`#task_id[value="${taskId}"]`).parent().find('button[type="button"]').has('i.fa-check');
            if (verifyBtn) {
              verifyBtn.click();
              return;
            }
            this.after();
            return;
          }
          if (GM_getValue('opquestsVerifyTasks')) {
            GM_deleteValue('opquestsVerifyTasks');
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
          if (!this.#getGiveawayId()) {
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
            } else if (/store\.steampowered\.com\/(publisher|developer|curator)\//.test(link) && /follow/gim.test(taskDes)) {
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
      async verifyTask() {
        try {
          if (!this.initialized) {
            this.init();
          }
          const tasks = $.makeArray($('.items-center').has('input[name="task_id"]')).map(ele => $(ele).find('input[name="task_id"]').val());
          GM_setValue('opquestsVerifyTasks', tasks);
          await this.#confirm();
          this.after();
          return true;
        } catch (error) {
          throwError(error, 'Opquests.verifyTask');
          return false;
        }
      }
      async #confirm() {
        try {
          const logStatus = scripts_echoLog({
            html: `<li>${i18n('confirmingTask')}...<font></font></li>`
          });
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: `https://opquests.com/quests/${this.giveawayId}?confirm=1`,
            method: 'GET',
            nochche: true,
            headers: {
              origin: 'https://opquests.com',
              referer: `https://opquests.com/warning?id=${this.giveawayId}`
            }
          });
          if (result === 'Success') {
            if (data?.status === 200) {
              logStatus.success();
              return true;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Opquests.confirm');
          return false;
        }
      }
      async getKey(isButton) {
        try {
          const logStatus = scripts_echoLog({
            text: i18n('gettingKey')
          });
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: 'https://opquests.com/keys',
            method: 'GET'
          });
          if (result === 'Success') {
            if (data?.responseText) {
              const key = $(data?.responseText).find(`div.items-center:contains("${$('h1.font-bold').text().trim().replace(' Quest', '')}")`).find('div.font-bold').next().text();
              if (!key) {
                logStatus.error('Error: Key was not found');
                if (isButton) {
                  window.open('https://opquests.com/keys', '_self');
                }
                return false;
              }
              logStatus.success();
              scripts_echoLog({}).success(key);
              return true;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Opquests.getGiveawayId');
          return false;
        }
      }
      #getGiveawayId() {
        try {
          const giveawayId = window.location.href.match(/quests\/([\d]+)/)?.[1];
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
      #checkLogin() {
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
    }
    const website_Opquests = Opquests;
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
    class Gleam extends website_Website {
      name = 'Gleam';
      undoneTasks = JSON.parse(Gleam_defaultTasks);
      socialTasks = JSON.parse(Gleam_defaultTasks);
      buttons = [ 'doTask', 'undoTask', 'verifyTask' ];
      static test() {
        return window.location.host === 'gleam.io';
      }
      before() {
        try {
          unsafeWindow.confirm = () => {};
          unsafeWindow.alert = () => {};
          unsafeWindow.prompt = () => {};
        } catch (error) {
          throwError(error, 'Gleam.before');
        }
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
          } else if (!await this.#checkLeftKey()) {
            scripts_echoLog({}).warning(i18n('checkLeftKeyFailed'));
          }
        } catch (error) {
          throwError(error, 'Gleam.after');
        }
      }
      init() {
        try {
          const logStatus = scripts_echoLog({
            text: i18n('initing')
          });
          if (!this.#getGiveawayId()) {
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
            this.socialTasks = GM_getValue(`gleamTasks-${this.giveawayId}`)?.tasks || JSON.parse(Gleam_defaultTasks);
          }
          const tasks = $('.entry-content .entry-method');
          for (const task of tasks) {
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
            if (socialIcon.hasClass('fa-twitter') || socialIcon.hasClass('fa-x-twitter')) {
              const link = $task.find('a[href^="https://twitter.com/"],a[href^="https://x.com/"]').attr('href');
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
                  const ggLink = $task.find('a[href^="https://discord.gg/"]').attr('href')?.match(/discord\.gg\/([^/]+)/)?.[1];
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
            } else if (socialIcon.attr('class')?.includes('steam')) {
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
            } else if (socialIcon.hasClass('fa-bullhorn') && /Complete|Increase/gi.test(taskText)) {
              if (action !== 'do') {
                continue;
              }
              const gleamLink = await this.#getGleamLink(taskText);
              if (!gleamLink) {
                continue;
              }
              this.undoneTasks.extra.gleam.push(gleamLink);
            } else if (socialIcon.hasClass('fa-question') || socialIcon.hasClass('fa-reddit') || socialIcon.hasClass('fa-instagram') || socialIcon.hasClass('fa-facebook-f') || socialIcon.hasClass('fa-telegram-plane') || socialIcon.hasClass('fa-telegram') || socialIcon.hasClass('fa-vk') || socialIcon.hasClass('fa-envelope') || socialIcon.hasClass('fa-gift') || socialIcon.hasClass('fa-square-up-right') || socialIcon.hasClass('fa-gamepad-modern') || socialIcon.hasClass('fa-dollar-sign') || socialIcon.hasClass('fa-tiktok') || socialIcon.hasClass('fa-gamepad-alt') || socialIcon.hasClass('fa-shield') && taskText.includes('one of our giveaways') || socialIcon.hasClass('fa-shield') && taskText.includes('Check out') || socialIcon.hasClass('fa-shield') && taskText.includes('vloot.io')) {} else {
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
      async extraDoTask({
        gleam
      }) {
        try {
          const pro = [];
          for (const link of gleam) {
            pro.push(this.#doGleamTask(link));
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
          unsafeWindow._OxA = '_OxA';
          for (const task of tasks) {
            if ($('[campaign-key="campaign.key"]').length > 0) {
              return scripts_echoLog({
                text: i18n('campaign')
              });
            }
            const $task = $(task);
            if ($task.find('i.fa-question').length === 0) {
              continue;
            }
            const taskInfo = $task.find('.user-links');
            taskInfo[0].click();
            const aElements = $task.find('.expandable').find('a.btn');
            if (aElements.length > 0) {
              for (const element of aElements) {
                const $element = $(element);
                const href = $element.attr('href');
                $element.removeAttr('href')[0].click();
                $element.attr('href', href);
              }
            }
            unsafeWindow.$hookTimer?.setSpeed(1e3);
            const visitBtn = $task.find('.expandable').find('span:contains(more seconds),button:contains(more seconds)').filter(':visible');
            if (visitBtn.length > 0 && unsafeWindow.$hookTimer) {
              const newTab = GM_openInTab('', {
                active: true
              });
              await delay(1e3);
              newTab?.close();
              window.focus();
            }
            await delay(3e3);
            unsafeWindow.$hookTimer?.setSpeed(1);
            const expandInfo = $task.find('.expandable');
            const [ input ] = expandInfo.find('input');
            if (input) {
              const evt = new Event('input', {
                bubbles: true,
                cancelable: true,
                composed: true
              });
              const valuelimit = [ ...expandInfo.text().matchAll(/"(.+?)"/g) ].at(-1)?.[1];
              input.value = valuelimit || 'vloot';
              input.dispatchEvent(evt);
              await delay(1e3);
            }
            await this.#checkSync();
            const continueBtn = $task.find('.expandable').find('span:contains(Continue),button:contains(Continue)');
            for (const button of continueBtn) {
              button.click();
              await delay(500);
              await this.#checkSync();
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
      async #checkSync() {
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
      async #doGleamTask(link) {
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
      #getGiveawayId() {
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
      async #getGleamLink(title) {
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
            url: 'https://www.vloot.io/api/v1/giveaways',
            method: 'GET',
            responseType: 'json'
          });
          if (result === 'Success') {
            if (data?.status === 200 && data?.response?.Success === true && data?.response?.Data) {
              const {
                link
              } = data.response.Data.find(giveaway => title.replace(/[\s]/g, '').toLowerCase().includes(giveaway.title.replace(/[\s]/g, '').toLowerCase())) || {};
              if (link) {
                logStatus.success();
                return link;
              }
              logStatus.error(`Error:${i18n('getLinkFailed')}`);
              return false;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'Gleam.getGleamLink');
          return false;
        }
      }
      async #checkLeftKey() {
        try {
          if (!globalOptions.other.checkLeftKey) {
            return true;
          }
          const campaignString = $('div.popup-blocks-container').attr('ng-init')?.match(/initCampaign\(([\w\W]+?)\)$/)?.[1];
          if (!campaignString) {
            return false;
          }
          const {
            campaign,
            incentive
          } = JSON.parse(campaignString);
          const controllerString = $('div.campaign.reward').attr('ng-init')?.match(/initContestant\(([\w\W]+?)\);/)?.[1];
          let ownedKey = false;
          if (controllerString) {
            if (JSON.parse(controllerString).contestant?.claims?.incentives?.[incentive.id]?.length) {
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
            }).then(({
              value
            }) => {
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
    }
    const website_Gleam = Gleam;
    const SweepWidget_defaultOptions = {
      username: '',
      email: ''
    };
    class SweepWidget extends website_Website {
      name = 'SweepWidget';
      options = {
        ...SweepWidget_defaultOptions,
        ...GM_getValue('SweepWidgetOptions')
      };
      buttons = [ 'doTask' ];
      static test() {
        return /^https?:\/\/sweepwidget\.com\/view\/[\d]+/.test(window.location.href);
      }
      async after() {
        try {
          if (!this.#checkLogin()) {
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
          if (!this.#checkLogin()) {
            logStatus.warning(i18n('needLogin'));
            return false;
          }
          if (!this.#getGiveawayId()) {
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
            if (!await this.#checkEnter()) {
              return false;
            }
          }
          const logStatus = scripts_echoLog({
            text: i18n('SweepWidgetNotice')
          });
          const tasks = $('#sw_inner_entry_methods_l2_wrapper>div.sw_entry');
          for (const task of tasks) {
            const $task = $(task);
            if ($task.find('i.fa-check:visible').length > 0) {
              continue;
            }
            const title = $task.find('.sw_text_inner');
            title[0].click();
            const aElement = $task.find('a.sw_link');
            const link = aElement.attr('href');
            aElement.attr('href', '#a').attr('target', '_self');
            aElement[0]?.click();
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
            $task.find('input.sw_verify').removeAttr('disabled')[0]?.click();
            await this.#checkFinish($task);
            await delay(parseInt(`${Math.random() * (3e3 - 1e3 + 1) + 1e3}`, 10));
          }
          logStatus.success();
          return true;
        } catch (error) {
          throwError(error, 'SweepWidget.doTask');
          return false;
        }
      }
      #checkLogin() {
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
      #getGiveawayId() {
        try {
          const giveawayId = window.location.href.match(/\/view\/([\d]+)/)?.[1];
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
      async #checkEnter() {
        try {
          return new Promise(resolve => {
            const checker = setInterval(() => {
              if ($('#unlock_rewards_main_wrapper').length > 0) {
                clearInterval(checker);
                resolve(true);
              }
            }, 500);
          });
        } catch (error) {
          throwError(error, 'SweepWidget.checkEnter');
          return false;
        }
      }
      async #checkFinish($task) {
        try {
          return new Promise(resolve => {
            const checker = setInterval(() => {
              if ($task.find('i.fa-check:visible').length > 0 || $task.find('.sw_entry_input:visible').length === 0) {
                clearInterval(checker);
                resolve(true);
              }
            }, 500);
          });
        } catch (error) {
          throwError(error, 'SweepWidget.checkFinish');
          return false;
        }
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
      try {
        const link = $('#socialLink').val();
        let id = '';
        switch (type) {
         case 'discord.servers':
          id = link.match(/invite\/(.+)/)?.[1] || '';
          break;

         case 'instagram.users':
          id = link.match(/https:\/\/www\.instagram\.com\/(.+)?\//)?.[1] || '';
          break;

         case 'twitch.channels':
          id = link.match(/https:\/\/(www\.)?twitch\.tv\/(.+)/)?.[2] || '';
          break;

         case 'twitter.users':
          id = link.match(/https:\/\/twitter\.com\/(.+)/)?.[1] || '';
          break;

         case 'twitter.retweets':
          id = link.match(/https:\/\/twitter\.com\/.*?\/status\/([\d]+)/)?.[1] || '';
          break;

         case 'vk.names':
          id = link.match(/https:\/\/vk\.com\/([^/]+)/)?.[1] || '';
          break;

         case 'youtube.channels':
          id = (await getInfo(link, 'channel'))?.params?.channelId || '';
          break;

         case 'youtube.likes':
          id = (await getInfo(link, 'likeVideo'))?.params?.videoId || '';
          break;

         case 'reddit.reddits':
          id = link.match(/https?:\/\/www\.reddit\.com\/user\/([^/]*)/)?.[1] || link.match(/https?:\/\/www\.reddit\.com\/r\/([^/]*)/)?.[1] || '';
          break;

         case 'steam.groups':
          id = link.match(/groups\/(.+)\/?/)?.[1] || '';
          break;

         case 'steam.wishlists':
         case 'steam.follows':
         case 'steam.forums':
          id = link.match(/app\/([\d]+)/)?.[1] || '';
          break;

         case 'steam.workshops':
          id = link.match(/\?id=([\d]+)/)?.[1] || '';
          break;

         case 'steam.curators':
          {
            if (link.includes('curator')) {
              id = link.match(/curator\/([\d]+)/)?.[1] || '';
            } else {
              const param = link.match(/https?:\/\/store\.steampowered\.com\/(.*?)\/([^/?]+)/)?.slice(1, 3);
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
          whiteListOptionsForm += Object.keys(types).map((type, index) => disabledType[social]?.includes(type) ? '' : `<tr style="background-color: ${stringToColour(social)}66">${index === 0 ? `<th rowspan="${Object.keys(types).length - (disabledType[social] || []).length}" style="background-color: ${stringToColour(social)}66">${social}</th>` : ''}<td>${i18n(type)}</td><td><button type="button" class="editWhiteList" data-value="${social}.${type}">${i18n('edit')}</button></td></tr>`).join('');
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
          const value = $(this).attr('data-value');
          if (!value) {
            return;
          }
          const [ social, type ] = value.split('.');
          if (!whiteList?.[social]?.[type]) {
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
          }).then(({
            isDenied,
            isConfirmed,
            value
          }) => {
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
          if (data?.status === 200 && data.response.files?.[fileName]?.content === JSON.stringify(content)) {
            logStatus.success();
            return true;
          }
          logStatus.error(`Error:${data?.statusText}(${data?.status})`);
          return false;
        }
        logStatus.error(`${result}:${statusText}(${status})`);
        return false;
      } catch (error) {
        throwError(error, 'setGistData');
        return false;
      }
    };
    const getGistData = async (token, gistId, fileName, test = false) => {
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
          if (data?.status === 200) {
            const content = data.response?.files?.[fileName]?.content;
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
          logStatus.error(`Error:${data?.statusText}(${data?.status})`);
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
        }).then(({
          value
        }) => {
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
    class Setting {
      name = 'Setting';
      buttons = [ 'saveGlobalOptions', 'syncData', 'tasksHistory' ];
      syncData = dataSync;
      tasksHistory() {
        GM_openInTab('https://auto-task-v4.hclonely.com/history.html', {
          active: true
        });
      }
      static test() {
        return window.location.host === 'auto-task-v4.hclonely.com' && window.location.pathname === '/setting.html';
      }
      before() {
        try {
          $('body').html('').addClass('auto-task-options');
        } catch (error) {
          throwError(error, 'Setting.before');
        }
      }
      after() {
        try {
          this.#environment();
          changeGlobalOptions('page');
          whiteList('page');
          $('input[name="other.twitterVerifyId"]').after(`<button id="getTwitterUserId" type="button">${i18n('getTwitterUserId')}</button>`);
          $('#getTwitterUserId').on('click', () => {
            this.#getId('twitterUser');
          });
          $('input[name="other.youtubeVerifyChannel"]').after(`<button id="getYoutubeChannelId" type="button">${i18n('getYoutubeChannelId')}</button>`);
          $('#getYoutubeChannelId').on('click', () => {
            this.#getId('youtubeChannel');
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
        try {
          saveData();
        } catch (error) {
          throwError(error, 'Setting.saveGlobalOptions');
        }
      }
      #getId(social) {
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
              const name = link.match(/https:\/\/twitter\.com\/(.+)/)?.[1] || link;
              $('#socialLink').val(await new social_Twitter().userName2id(name) || '');
            } else if (type === 'youtubeChannel') {
              const name = /^https:\/\/(www\.)?google\.com.*?\/url\?.*?url=https:\/\/www.youtube.com\/.*/.test(link) ? link.match(/url=(https:\/\/www\.youtube\.com\/.*)/)?.[1] : link;
              $('#socialLink').val((await getInfo(name, 'channel'))?.params?.channelId || '');
            }
          });
        } catch (error) {
          throwError(error, 'Setting.getId');
        }
      }
      #environment() {
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
    }
    const website_Setting = Setting;
    class History extends website_Keylol {
      name = 'History';
      buttons = [ 'doTask', 'undoTask', 'selectAll', 'selectNone', 'invertSelect', 'clearHistory' ];
      static test() {
        return window.location.host === 'auto-task-v4.hclonely.com' && window.location.pathname === '/history.html';
      }
      before() {
        try {
          $('body').html('<div class="container"></div>').addClass('auto-task-history');
          const data = GM_listValues() || [];
          const tasksHistory = data.map(value => /^[\w]+?Tasks-/.test(value) ? value : null).filter(value => value);
          for (const item of tasksHistory) {
            this.#addItem(item);
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
          throwError(error, 'History.clearHistory');
        }
      }
      #addItem(item) {
        try {
          const tasksData = GM_getValue(item);
          if (!tasksData?.tasks) {
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
    }
    const website_History = History;
    const GiveawayHopper_defaultTasksTemplate = {
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
        giveawayHopper: []
      }
    };
    const GiveawayHopper_defaultTasks = JSON.stringify(GiveawayHopper_defaultTasksTemplate);
    class GiveawayHopper extends website_Website {
      name = 'GiveawayHopper';
      undoneTasks = JSON.parse(GiveawayHopper_defaultTasks);
      socialTasks = JSON.parse(GiveawayHopper_defaultTasks);
      tasks = [];
      buttons = [ 'doTask', 'undoTask', 'verifyTask' ];
      static test() {
        return window.location.host === 'giveawayhopper.com';
      }
      async after() {
        try {
          if (!this.#checkLogin()) {
            scripts_echoLog({}).warning(i18n('checkLoginFailed'));
          }
          this.#getGiveawayId();
        } catch (error) {
          throwError(error, 'GiveawayHopper.after');
        }
      }
      async init() {
        try {
          const logStatus = scripts_echoLog({
            text: i18n('initing')
          });
          if (!await this.#checkLeftKey()) {
            scripts_echoLog({}).warning(i18n('checkLeftKeyFailed'));
          }
          this.initialized = true;
          logStatus.success();
          return true;
        } catch (error) {
          throwError(error, 'GiveawayHopper.init');
          return false;
        }
      }
      async classifyTask(action) {
        try {
          if (!this.giveawayId) {
            await this.#getGiveawayId();
          }
          const logStatus = scripts_echoLog({
            text: i18n('getTasksInfo')
          });
          if (action === 'undo') {
            this.socialTasks = GM_getValue(`giveawayHopperTasks-${this.giveawayId}`)?.tasks || JSON.parse(GiveawayHopper_defaultTasks);
          }
          const {
            result,
            statusText,
            status,
            data
          } = await tools_httpRequest({
            url: `https://giveawayhopper.com/api/v1/campaigns/${this.giveawayId}/with-auth`,
            method: 'GET',
            responseType: 'json',
            fetch: true,
            headers: {
              authorization: `Bearer ${window.sessionStorage.gw_auth}`,
              'x-xsrf-token': decodeURIComponent(document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1])
            }
          });
          if (result === 'Success') {
            if (data?.status === 200 && data?.response?.tasks) {
              this.tasks = data.response.tasks;
              for (const task of data.response.tasks) {
                if (task.isDone) {
                  continue;
                }
                await tools_httpRequest({
                  url: `https://giveawayhopper.com/api/v1/campaigns/${this.giveawayId}/tasks/${task.id}/visited`,
                  method: 'GET',
                  responseType: 'json',
                  fetch: true,
                  headers: {
                    authorization: `Bearer ${window.sessionStorage.gw_auth}`,
                    'x-xsrf-token': decodeURIComponent(document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1])
                  }
                });
                if (task.category === 'Steam' && task.type === 'JoinGroup') {
                  const steamGroupLink = await getRedirectLink(`https://steamcommunity.com/gid/${task.group_id}`);
                  if (!steamGroupLink) {
                    continue;
                  }
                  if (action === 'undo') {
                    this.socialTasks.steam.groupLinks.push(steamGroupLink);
                  }
                  if (action === 'do') {
                    this.undoneTasks.steam.groupLinks.push(steamGroupLink);
                  }
                  continue;
                }
                if (task.category === 'Discord' && task.type === 'JoinServer') {
                  if (action === 'undo') {
                    this.socialTasks.discord.serverLinks.push(`https://discord.gg/${task.invite_code}`);
                  }
                  if (action === 'do') {
                    this.undoneTasks.discord.serverLinks.push(`https://discord.gg/${task.invite_code}`);
                  }
                  continue;
                }
                if ([ 'TikTok', 'YouTube', 'General' ].includes(task.category)) {
                  continue;
                }
                scripts_echoLog({}).warning(`${i18n('unKnownTaskType')}: ${task.category}-${task.type}`);
              }
              logStatus.success();
              this.undoneTasks = this.uniqueTasks(this.undoneTasks);
              this.socialTasks = this.uniqueTasks(this.socialTasks);
              if (window.DEBUG) {
                console.log('%cAuto-Task[Debug]:', 'color:blue', JSON.stringify(this));
              }
              GM_setValue(`giveawayHopperTasks-${this.giveawayId}`, {
                tasks: this.socialTasks,
                time: new Date().getTime()
              });
              return true;
            }
            logStatus.error(`Error:${data?.statusText}(${data?.status})`);
            return false;
          }
          logStatus.error(`${result}:${statusText}(${status})`);
          return false;
        } catch (error) {
          throwError(error, 'GiveawayHopper.classifyTask');
          return false;
        }
      }
      async verifyTask() {
        try {
          for (const task of this.tasks) {
            if (task.isDone) {
              continue;
            }
            const logStatus = scripts_echoLog({
              text: `${i18n('verifyingTask')}[${task.displayName?.replace(':target', task.targetName) || task.name}]...`
            });
            if (!task.link) {
              if (task.category === 'YouTube' && task.type === 'FollowAccount') {
                task.link = `https://www.youtube.com/@${task.targetName}`;
              } else if (task.category === 'TikTok' && task.type === 'FollowAccount') {
                task.link = `https://www.tiktok.com/@${task.targetName}`;
              } else if (task.category === 'Steam' && task.type === 'JoinGroup') {
                task.link = '';
              } else if (task.category === 'Discord' && task.type === 'JoinServer') {
                task.link = '';
              }
            }
            if (task.link) {
              await tools_httpRequest({
                url: `https://giveawayhopper.com/fw?url=${encodeURIComponent(task.link)}&src=campaign&src_id=${this.giveawayId}&ref=task&ref_id=${task.id}&token=${window.sessionStorage.gw_auth}`,
                method: 'GET',
                fetch: true,
                headers: {
                  authorization: `Bearer ${window.sessionStorage.gw_auth}`,
                  'x-xsrf-token': decodeURIComponent(document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1])
                }
              });
            }
            await delay(1e3);
            const postData = {
              taskcategory: task.category,
              taskname: task.type
            };
            if ([ 'YouTube', 'TikTok' ].includes(task.category)) {
              postData.username = '1';
            }
            const {
              result,
              statusText,
              status,
              data
            } = await tools_httpRequest({
              url: `https://giveawayhopper.com/api/v1/campaigns/${this.giveawayId}/tasks/${task.id}/complete`,
              method: 'POST',
              fetch: true,
              headers: {
                authorization: `Bearer ${window.sessionStorage.gw_auth}`,
                'x-xsrf-token': decodeURIComponent(document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1]),
                'content-type': 'application/json'
              },
              dataType: 'json',
              data: JSON.stringify(postData)
            });
            if (result === 'Success') {
              if (data?.status === 200 && data?.response?.completed) {
                logStatus.success();
                continue;
              }
              logStatus.error(`Error:${data?.statusText}(${data?.status})`);
              continue;
            }
            logStatus.error(`${result}:${statusText}(${status})`);
            continue;
          }
        } catch (error) {
          throwError(error, 'GiveawayHopper.verifyTask');
          return false;
        }
      }
      #getGiveawayId() {
        try {
          const giveawayId = window.location.pathname.split('/').at(-1);
          if (giveawayId) {
            this.giveawayId = giveawayId;
            return true;
          }
          scripts_echoLog({
            text: i18n('getFailed', 'GiveawayId')
          });
          return false;
        } catch (error) {
          throwError(error, 'GiveawayHopper.getGiveawayId');
          return false;
        }
      }
      #checkLogin() {
        try {
          if (!globalOptions.other.checkLogin) {
            return true;
          }
          if ($('div.widget-connections-edit:contains("Log in")').length > 0) {
            $('div.widget-connections-edit:contains("Log in") a')[0].click();
          }
          return true;
        } catch (error) {
          throwError(error, 'GiveawayHopper.checkLogin');
          return false;
        }
      }
      async #checkLeftKey() {
        try {
          if (!globalOptions.other.checkLeftKey) {
            return true;
          }
          if ($('p.widget-single-prize span').length > 0 && parseInt($('p.widget-single-prize span').text()?.match(/\d+/)?.[0] || '0', 10) > 0) {
            return true;
          }
          await external_Swal_default().fire({
            icon: 'warning',
            title: i18n('notice'),
            text: i18n('noKeysLeft'),
            confirmButtonText: i18n('confirm'),
            cancelButtonText: i18n('cancel'),
            showCancelButton: true
          }).then(({
            value
          }) => {
            if (value) {
              window.close();
            }
          });
          return true;
        } catch (error) {
          throwError(error, 'GiveawayHopper.checkLeftKey');
          return false;
        }
      }
    }
    const website_GiveawayHopper = GiveawayHopper;
    const Websites = [ Freeanywhere, GiveawaySu, website_Indiedb, website_Keyhub, website_Givekey, website_GiveeClub, website_OpiumPulses, website_Keylol, website_Opquests, website_Gleam, website_SweepWidget, website_Setting, website_History, website_GiveawayHopper ];
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
        }).then(({
          isConfirmed
        }) => {
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
          if (data?.response?.version) {
            return data.response;
          }
          if (!auto) {
            scripts_echoLog({}).error(`${i18n('checkUpdateFailed')}[${data?.statusText}(${data?.status})]`);
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
          scripts_echoLog({
            html: `<li><font>${i18n('newVersionNotice', version, `${updateLink}dist/${GM_info.script.name}.user.js`)}</font></li>`
          });
          scripts_echoLog({
            html: `<li>${i18n('updateText', version)}</li><ol class="update-text">${packageData.change?.map(change => `<li>${change}</li>`).join('')}<li>${i18n('updateHistory')}</li></ol>`
          });
        }
      } catch (error) {
        throwError(error, 'updateChecker');
      }
    };
    const scripts_updateChecker = updateChecker;
    window.STYLE = GM_addStyle(auto_task.A + GM_getResourceText('style'));
    window.DEBUG = !!globalOptions.other?.debug;
    window.TRACE = !!globalOptions.other?.debug && typeof console.trace === 'function';
    const loadScript = async () => {
      if (window.name === 'ATv4_twitchAuth' && window.location.hostname === 'www.twitch.tv') {
        const authToken = external_Cookies_default().get('auth-token');
        const isLogin = !!external_Cookies_default().get('login');
        if (isLogin) {
          GM_setValue('twitchAuth', {
            authToken: authToken,
            clientVersion: __twilightBuildID,
            clientId: commonOptions?.headers?.['Client-ID'],
            deviceId: commonOptions?.headers?.['Device-ID'],
            clientSessionId: window.localStorage.local_storage_app_session_id.replace(/"/g, '')
          });
          window.close();
          external_Swal_default().fire('', i18n('closePageNotice'));
        } else {
          external_Swal_default().fire('', i18n('needLogin'));
        }
        return;
      }
      if (window.name === 'ATv4_redditAuth' && window.location.hostname === 'www.reddit.com') {
        const betaButton = $('#redesign-beta-optin-btn');
        if (betaButton.length > 0) {
          return betaButton[0].click();
        }
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
      if (website?.before) {
        await website?.before();
      }
      $('body').append(`
    <div id="auto-task-info"
         style="display:${globalOptions.other.defaultShowLog ? 'block' : 'none'};
                ${globalOptions.position.logSideX}:${globalOptions.position.logDistance.split(',')[0]}px;
                ${globalOptions.position.logSideY}:${globalOptions.position.logDistance.split(',')[1]}px;">
    </div>
    <div id="auto-task-buttons"
         style="display:${globalOptions.other.defaultShowButton ? 'block' : 'none'};
                ${globalOptions.position.buttonSideX}:${globalOptions.position.buttonDistance.split(',')[0]}px;
                ${globalOptions.position.buttonSideY}:${globalOptions.position.buttonDistance.split(',')[1]}px;">
    </div>
    <div class="show-button-div"
         style="display:${globalOptions.other.defaultShowButton ? 'none' : 'block'};
                ${globalOptions.position.showButtonSideX}:${globalOptions.position.showButtonDistance.split(',')[0]}px;
                ${globalOptions.position.showButtonSideY}:${globalOptions.position.showButtonDistance.split(',')[1]}px;">
      <a class="auto-task-website-btn"
         href="javascript:void(0);"
         target="_self"
         title="${i18n('showButton')}"> </a>
    </div>
  `);
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
          website.undoTask();
        }
      });
      external_keyboardJS_default().bind(globalOptions.hotKey.toggleLogKey, toggleLog);
      if (website?.after) {
        await website?.after();
      }
      if (website?.buttons && $('#auto-task-buttons').children().length === 0) {
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
      if (website?.options) {
        GM_registerMenuCommand(i18n('changeWebsiteOptions'), () => {
          options(website.name, website.options);
        });
      }
      if (website.name !== 'Setting') {
        GM_registerMenuCommand(i18n('changeGlobalOptions'), () => {
          changeGlobalOptions('swal');
        });
        GM_registerMenuCommand(i18n('settingPage'), () => {
          GM_openInTab('https://auto-task-v4.hclonely.com/setting.html', {
            active: true
          });
        });
      }
      console.log('%c%s', 'color:#1bbe1a', 'Auto-Task[Load]: 脚本加载完成');
      const [ v1, v2 ] = GM_info.version.split('.');
      if (!(parseInt(v1, 10) >= 5 && parseInt(v2, 10) >= 2)) {
        scripts_echoLog({}).error(i18n('versionNotMatched'));
      }
      if (!GM_getValue('notice')) {
        external_Swal_default().fire({
          title: i18n('swalNotice'),
          icon: 'warning'
        }).then(() => {
          GM_openInTab(i18n('noticeLink'), {
            active: true
          });
          GM_setValue('notice', new Date().getTime());
        });
        scripts_echoLog({
          html: `<li><font class="warning">${i18n('echoNotice', i18n('noticeLink'))}</font></li>`
        }).font?.find('a').on('click', () => {
          GM_setValue('notice', new Date().getTime());
        });
      }
      scripts_updateChecker();
    };
    if (window.location.hostname === 'discord.com') {
      const LocalStorage = window.localStorage;
      if (window.name === 'ATv4_discordAuth') {
        window.localStorage.removeItem = () => true;
        const discordAuth = LocalStorage?.getItem('token')?.replace(/^"|"$/g, '');
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
        const discordAuth = LocalStorage?.getItem('token')?.replace(/^"|"$/g, '');
        if (discordAuth && discordAuth.length > 0) {
          GM_setValue('discordAuth', {
            auth: discordAuth
          });
        }
      }
    } else if (window.location.hostname === 'opquests.com') {
      loadScript();
    } else if ((window.name === 'ATv4_updateStoreAuth' || GM_getValue('ATv4_updateStoreAuth')) && window.location.host === 'store.steampowered.com') {
      $(() => {
        if ($('[data-miniprofile]').length === 0) {
          return;
        }
        const storeSessionID = document.body.innerHTML.match(/g_sessionID = "(.+?)";/)?.[1];
        if (storeSessionID) {
          GM_deleteValue('ATv4_updateStoreAuth');
          GM_setValue('steamStoreAuth', {
            storeSessionID: storeSessionID
          });
          window.close();
          external_Swal_default().fire('', i18n('closePageNotice'));
        } else {
          external_Swal_default().fire({
            title: 'Error: Get "sessionID" failed',
            icon: 'error'
          });
        }
      });
    } else if ((window.name === 'ATv4_updateCommunityAuth' || GM_getValue('ATv4_updateCommunityAuth')) && window.location.host === 'steamcommunity.com') {
      $(() => {
        const steam64Id = document.body.innerHTML.match(/g_steamID = "(.+?)";/)?.[1];
        const communitySessionID = document.body.innerHTML.match(/g_sessionID = "(.+?)";/)?.[1];
        if (steam64Id && communitySessionID) {
          GM_deleteValue('ATv4_updateCommunityAuth');
          GM_setValue('steamCommunityAuth', {
            steam64Id: steam64Id,
            communitySessionID: communitySessionID
          });
          window.close();
          external_Swal_default().fire('', i18n('closePageNotice'));
        } else {
          setTimeout(() => {
            external_Swal_default().fire({
              title: 'Error: Get "sessionID" failed',
              icon: 'error'
            });
          }, 3e3);
        }
      });
    } else {
      if (window.location.hostname === 'key-hub.eu') {
        unsafeWindow.keyhubtracker = 1;
        unsafeWindow.gaData = {};
      }
      $(loadScript);
    }
  }();
})();
(function() {
    "use strict";
    var __webpack_exports__ = {};
    function throwError(error, name) {
        console.log("%c%s", "color:white;background:red", "".concat(name, "\n").concat(error.stack));
    }
    function _toConsumableArray(arr) {
        return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
    }
    function _nonIterableSpread() {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray(o, minLen) {
        if (!o) return;
        if (typeof o === "string") return _arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor) n = o.constructor.name;
        if (n === "Map" || n === "Set") return Array.from(o);
        if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    function _iterableToArray(iter) {
        if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
    }
    function _arrayWithoutHoles(arr) {
        if (Array.isArray(arr)) return _arrayLikeToArray(arr);
    }
    function _arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length) len = arr.length;
        for (var i = 0, arr2 = new Array(len); i < len; i++) {
            arr2[i] = arr[i];
        }
        return arr2;
    }
    var unique = function unique(array) {
        try {
            return _toConsumableArray(new Set(array));
        } catch (error) {
            throwError(error, "unique");
            return [];
        }
    };
    var delay = function delay() {
        var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1e3;
        return new Promise(function(resolve) {
            setTimeout(function() {
                resolve(true);
            }, time);
        });
    };
    function Social_toConsumableArray(arr) {
        return Social_arrayWithoutHoles(arr) || Social_iterableToArray(arr) || Social_unsupportedIterableToArray(arr) || Social_nonIterableSpread();
    }
    function Social_nonIterableSpread() {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function Social_unsupportedIterableToArray(o, minLen) {
        if (!o) return;
        if (typeof o === "string") return Social_arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor) n = o.constructor.name;
        if (n === "Map" || n === "Set") return Array.from(o);
        if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Social_arrayLikeToArray(o, minLen);
    }
    function Social_iterableToArray(iter) {
        if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
    }
    function Social_arrayWithoutHoles(arr) {
        if (Array.isArray(arr)) return Social_arrayLikeToArray(arr);
    }
    function Social_arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length) len = arr.length;
        for (var i = 0, arr2 = new Array(len); i < len; i++) {
            arr2[i] = arr[i];
        }
        return arr2;
    }
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }
    function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        return Constructor;
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
    var Social = function() {
        function Social() {
            _classCallCheck(this, Social);
            _defineProperty(this, "tasks", void 0);
        }
        _createClass(Social, [ {
            key: "getRealParams",
            value: function getRealParams(name, params, links, doTask, link2param) {
                try {
                    var realParams = [];
                    if (params.length > 0) {
                        realParams = Social_toConsumableArray(params);
                    }
                    if (links.length > 0) {
                        realParams = [].concat(Social_toConsumableArray(realParams), Social_toConsumableArray(links.map(function(link) {
                            return link2param(link);
                        }).filter(function(link) {
                            return link;
                        })));
                    }
                    if (!doTask && this.tasks[name].length > 0) {
                        realParams = [].concat(Social_toConsumableArray(realParams), Social_toConsumableArray(this.tasks[name]));
                    }
                    return unique(realParams);
                } catch (error) {
                    throwError(error, "Social.getRealParams");
                    return [];
                }
            }
        } ]);
        return Social;
    }();
    const social_Social = Social;
    function ownKeys(object, enumerableOnly) {
        var keys = Object.keys(object);
        if (Object.getOwnPropertySymbols) {
            var symbols = Object.getOwnPropertySymbols(object);
            if (enumerableOnly) {
                symbols = symbols.filter(function(sym) {
                    return Object.getOwnPropertyDescriptor(object, sym).enumerable;
                });
            }
            keys.push.apply(keys, symbols);
        }
        return keys;
    }
    function _objectSpread(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i] != null ? arguments[i] : {};
            if (i % 2) {
                ownKeys(Object(source), true).forEach(function(key) {
                    httpRequest_defineProperty(target, key, source[key]);
                });
            } else if (Object.getOwnPropertyDescriptors) {
                Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
            } else {
                ownKeys(Object(source)).forEach(function(key) {
                    Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
                });
            }
        }
        return target;
    }
    function httpRequest_defineProperty(obj, key, value) {
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
    function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
        try {
            var info = gen[key](arg);
            var value = info.value;
        } catch (error) {
            reject(error);
            return;
        }
        if (info.done) {
            resolve(value);
        } else {
            Promise.resolve(value).then(_next, _throw);
        }
    }
    function _asyncToGenerator(fn) {
        return function() {
            var self = this, args = arguments;
            return new Promise(function(resolve, reject) {
                var gen = fn.apply(self, args);
                function _next(value) {
                    asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
                }
                function _throw(err) {
                    asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
                }
                _next(undefined);
            });
        };
    }
    var httpRequest = function() {
        var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(options) {
            var times, result, _args = arguments;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        times = _args.length > 1 && _args[1] !== undefined ? _args[1] : 0;
                        _context.prev = 1;
                        _context.next = 4;
                        return new Promise(function(resolve) {
                            if (options.dataType) {
                                options.responseType = options.dataType;
                            }
                            var requestObj = _objectSpread(_objectSpread({}, {
                                timeout: 3e4,
                                ontimeout: function ontimeout(data) {
                                    resolve({
                                        result: "Error",
                                        statusText: "Timeout",
                                        status: 601,
                                        data: data,
                                        options: options
                                    });
                                },
                                onabort: function onabort(data) {
                                    resolve({
                                        result: "Error",
                                        statusText: "Aborted",
                                        status: 602,
                                        data: data,
                                        options: options
                                    });
                                },
                                onerror: function onerror(data) {
                                    resolve({
                                        result: "Error",
                                        statusText: "Error",
                                        status: 603,
                                        data: data,
                                        options: options
                                    });
                                },
                                onload: function onload(data) {
                                    resolve({
                                        result: "Success",
                                        statusText: "Load",
                                        status: 600,
                                        data: data,
                                        options: options
                                    });
                                }
                            }), options);
                            GM_xmlhttpRequest(requestObj);
                        });

                      case 4:
                        result = _context.sent;
                        console.log("发送请求:", result);
                        if (!(result.status !== 600 && times < 2)) {
                            _context.next = 10;
                            break;
                        }
                        _context.next = 9;
                        return httpRequest(options, times + 1);

                      case 9:
                        return _context.abrupt("return", _context.sent);

                      case 10:
                        return _context.abrupt("return", result);

                      case 13:
                        _context.prev = 13;
                        _context.t0 = _context["catch"](1);
                        throwError(_context.t0, "httpRequest");
                        console.log("发送请求:", {
                            errorMsg: _context.t0,
                            options: options
                        });
                        return _context.abrupt("return", {
                            result: "JsError",
                            statusText: "Error",
                            status: 604,
                            error: _context.t0,
                            options: options
                        });

                      case 18:
                      case "end":
                        return _context.stop();
                    }
                }
            }, _callee, null, [ [ 1, 13 ] ]);
        }));
        return function httpRequest(_x) {
            return _ref.apply(this, arguments);
        };
    }();
    const tools_httpRequest = httpRequest;
    function getI18n() {
        for (var _len = arguments.length, argvs = new Array(_len), _key = 0; _key < _len; _key++) {
            argvs[_key] = arguments[_key];
        }
        return argvs.join(" ");
    }
    const i18n = getI18n;
    var echoLog = function echoLog(_ref) {
        var _ref$type = _ref.type, type = _ref$type === void 0 ? "text" : _ref$type, text = _ref.text, url = _ref.url, id = _ref.id;
        try {
            var ele;
            switch (type) {
              case "updateSteamCommunity":
                ele = $("<li>".concat(i18n("updateCommunityId"), "<font></font></li>"));
                break;

              case "updateSteamStore":
                ele = $("<li>".concat(i18n("updateStoreId"), "<font></font></li>"));
                break;

              case "joinSteamGroup":
              case "leaveSteamGroup":
              case "getSteamGroupId":
                ele = $("<li>".concat(i18n(type), '<a href="https://steamcommunity.com/groups/').concat(text, '" target="_blank">').concat(text, "</a>...<font></font></li>"));
                break;

              case "subscribeForum":
              case "unsubscribeForum":
              case "getForumId":
                ele = $("<li>".concat(i18n(type), '<a href="https://steamcommunity.com/app/').concat(text, '/discussions/" target="_blank">').concat(text, "</a>...<font></font></li>"));
                break;

              case "followCurator":
              case "unfollowCurator":
              case "getCuratorId":
                ele = $("<li>".concat(i18n(type), '<a href="https://store.steampowered.com/').concat(text !== null && text !== void 0 && text.includes("/") ? text : "curator/".concat(text), '" target="_blank">').concat(text, "</a>...<font></font></li>"));
                break;

              case "getDeveloperId":
              case "followDeveloper":
              case "unfollowDeveloper":
                ele = $("<li>".concat(i18n(type), '<a href="https://store.steampowered.com/developer/').concat(text, '" target="_blank">').concat(text, "</a>...<font></font></li>"));
                break;

              case "getPublisherId":
              case "followPublisher":
              case "unfollowPublisher":
                ele = $("<li>".concat(i18n(type), '<a href="https://store.steampowered.com/publisher/').concat(text, '" target="_blank">').concat(text, "</a>...<font></font></li>"));
                break;

              case "getFranchiseId":
              case "followFranchise":
              case "unfollowFranchise":
                ele = $("<li>".concat(i18n(type), '<a href="https://store.steampowered.com/franchise/').concat(text, '" target="_blank">').concat(text, "</a>...<font></font></li>"));
                break;

              case "addWishlist":
              case "removeWishlist":
              case "followGame":
              case "unfollowGame":
                ele = $("<li>".concat(i18n(type), '<a href="https://store.steampowered.com/app/').concat(text, '" target="_blank">').concat(text, "</a>...<font></font></li>"));
                break;

              case "favoriteWorkshop":
              case "unfavoriteWorkshop":
              case "getWorkshopAppId":
              case "voteupWorkshop":
                ele = $("<li>".concat(i18n(type), '<a href="https://steamcommunity.com/sharedfiles/filedetails/?id=').concat(text, '" target="_blank">\n      ').concat(text, "</a>...<font></font></li>"));
                break;

              case "likeAnnouncements":
                ele = $("<li>".concat(i18n("likeAnnouncements"), '<a href="').concat(url, '" target="_blank">').concat(id, "</a>...<font></font></li>"));
                break;

              case "changeCountry":
                ele = $("<li>".concat(i18n("changeCountry")).concat(text, "...<font></font></li>"));
                break;

              case "joinDiscordServer":
              case "leaveDiscordServer":
              case "getDiscordGuild":
                ele = $("<li>".concat(i18n(type), '<a href="https://discord.com/invite/').concat(text, '" target="_blank">').concat(text, "</a>...<font></font></li>"));
                break;

              case "updateDiscordAuth":
                ele = $('<li style="color:red;">'.concat(i18n("updateDiscordAuth"), "</li>"));
                break;

              case "followTwitchChannel":
              case "unfollowTwitchChannel":
              case "getTwitchChannelId":
                ele = $("<li>".concat(i18n(type), '<a href="https://www.twitch.tv/').concat(text, '" target="_blank">').concat(text, "</a>...<font></font></li>"));
                break;

              case "getInsInfo":
                ele = $("<li>".concat(i18n("getInsInfo"), '<a href="https://www.instagram.com/').concat(text, '/" target="_blank">').concat(text, "</a>...<font></font></li>"));
                break;

              case "followIns":
              case "unfollowIns":
                ele = $("<li>".concat(i18n(type), '<a href="https://www.instagram.com/').concat(text, '/" target="_blank">').concat(text, "</a>...<font></font></li>"));
                break;

              case "getTwitterUserId":
              case "followTwitterUser":
              case "unfollowTwitterUser":
                ele = $("<li>".concat(i18n(type), '<a href="https://twitter.com/').concat(text, '" target="_blank">').concat(text, "</a>...<font></font></li>"));
                break;

              case "retweet":
              case "unretweet":
                ele = $("<li>".concat(i18n(type)).concat(text, "...<font></font></li>"));
                break;

              case "joinReddit":
              case "leaveReddit":
                ele = $("<li>".concat(i18n(type), '<a href="https://www.reddit.com/r/').concat(text, '/" target="_blank">').concat(text, "</a>...<font></font></li>"));
                break;

              case "followRedditUser":
              case "unfollowRedditUser":
                ele = $("<li>".concat(i18n(type), '<a href="https://www.reddit.com/user/').concat(text === null || text === void 0 ? void 0 : text.replace("u_", ""), '" target="_blank">\n      ').concat(text === null || text === void 0 ? void 0 : text.replace("u_", ""), "</a>...<font></font></li>"));
                break;

              case "followYtbChannel":
              case "unfollowYtbChannel":
                ele = $("<li>".concat(i18n(type), '<a href="https://www.youtube.com/channel/').concat(text, '" target="_blank">').concat(text, "</a>...<font></font></li>"));
                break;

              case "likeYtbVideo":
              case "unlikeYtbVideo":
                ele = $("<li>".concat(i18n(type), '<a href="https://www.youtube.com/watch?v=').concat(text, '" target="_blank">').concat(text, "</a>...<font></font></li>"));
                break;

              case "getVkId":
              case "joinVkGroup":
              case "leaveVkGroup":
              case "joinVkPublic":
              case "leaveVkPublic":
              case "repostVkWall":
                ele = $("<li>".concat(i18n(type), '<a href="https://vk.com/').concat(text, '/" target="_blank">').concat(text, "</a>...<font></font></li>"));
                break;

              case "visitLink":
                ele = $("<li>".concat(i18n("visitLink"), '<a href="').concat(text, '" target="_blank">').concat(text, "</a>...<font></font></li>"));
                break;

              case "text":
                ele = $("<li>".concat(i18n(text), "<font></font></li>"));
                break;

              case "html":
                ele = $(text);
                break;

              default:
                ele = $("<li>".concat(i18n("unknown"), ":").concat(type, "...<font></font></li>"));
                break;
            }
            ele.addClass("card-text");
            $("#fuck-task-info").append(ele);
            ele[0].scrollIntoView();
            var font = ele.find("font");
            var status = {
                font: font,
                success: function success() {
                    var _this$font, _this$font2, _this$font3;
                    var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Success";
                    var html = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
                    (_this$font = this.font) === null || _this$font === void 0 ? void 0 : _this$font.attr("class", "").addClass("success");
                    html ? (_this$font2 = this.font) === null || _this$font2 === void 0 ? void 0 : _this$font2.html(text) : (_this$font3 = this.font) === null || _this$font3 === void 0 ? void 0 : _this$font3.text(text);
                    return this;
                },
                error: function error() {
                    var _this$font4, _this$font5, _this$font6;
                    var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Error";
                    var html = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
                    (_this$font4 = this.font) === null || _this$font4 === void 0 ? void 0 : _this$font4.attr("class", "").addClass("error");
                    html ? (_this$font5 = this.font) === null || _this$font5 === void 0 ? void 0 : _this$font5.html(text) : (_this$font6 = this.font) === null || _this$font6 === void 0 ? void 0 : _this$font6.text(text);
                    return this;
                },
                warning: function warning() {
                    var _this$font7, _this$font8, _this$font9;
                    var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Warning";
                    var html = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
                    (_this$font7 = this.font) === null || _this$font7 === void 0 ? void 0 : _this$font7.attr("class", "").addClass("warning");
                    html ? (_this$font8 = this.font) === null || _this$font8 === void 0 ? void 0 : _this$font8.html(text) : (_this$font9 = this.font) === null || _this$font9 === void 0 ? void 0 : _this$font9.text(text);
                    return this;
                },
                info: function info() {
                    var _this$font10, _this$font11, _this$font12;
                    var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Info";
                    var html = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
                    (_this$font10 = this.font) === null || _this$font10 === void 0 ? void 0 : _this$font10.attr("class", "").addClass("info");
                    html ? (_this$font11 = this.font) === null || _this$font11 === void 0 ? void 0 : _this$font11.html(text) : (_this$font12 = this.font) === null || _this$font12 === void 0 ? void 0 : _this$font12.text(text);
                    return this;
                },
                view: function view() {
                    var _this$font13;
                    (_this$font13 = this.font) === null || _this$font13 === void 0 ? void 0 : _this$font13[0].scrollIntoView();
                    return this;
                }
            };
            return status;
        } catch (error) {
            throwError(error, "echoLog");
            var _status = {
                success: function success() {
                    return _status;
                },
                error: function error() {
                    return _status;
                },
                warning: function warning() {
                    return _status;
                },
                info: function info() {
                    return _status;
                },
                view: function view() {
                    return _status;
                }
            };
            return _status;
        }
    };
    const scripts_echoLog = echoLog;
    function _typeof(obj) {
        "@babel/helpers - typeof";
        if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
            _typeof = function _typeof(obj) {
                return typeof obj;
            };
        } else {
            _typeof = function _typeof(obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
        }
        return _typeof(obj);
    }
    function Discord_toConsumableArray(arr) {
        return Discord_arrayWithoutHoles(arr) || Discord_iterableToArray(arr) || Discord_unsupportedIterableToArray(arr) || Discord_nonIterableSpread();
    }
    function Discord_nonIterableSpread() {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function Discord_iterableToArray(iter) {
        if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
    }
    function Discord_arrayWithoutHoles(arr) {
        if (Array.isArray(arr)) return Discord_arrayLikeToArray(arr);
    }
    function _createForOfIteratorHelper(o, allowArrayLike) {
        var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
        if (!it) {
            if (Array.isArray(o) || (it = Discord_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
                if (it) o = it;
                var i = 0;
                var F = function F() {};
                return {
                    s: F,
                    n: function n() {
                        if (i >= o.length) return {
                            done: true
                        };
                        return {
                            done: false,
                            value: o[i++]
                        };
                    },
                    e: function e(_e) {
                        throw _e;
                    },
                    f: F
                };
            }
            throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        var normalCompletion = true, didErr = false, err;
        return {
            s: function s() {
                it = it.call(o);
            },
            n: function n() {
                var step = it.next();
                normalCompletion = step.done;
                return step;
            },
            e: function e(_e2) {
                didErr = true;
                err = _e2;
            },
            f: function f() {
                try {
                    if (!normalCompletion && it["return"] != null) it["return"]();
                } finally {
                    if (didErr) throw err;
                }
            }
        };
    }
    function Discord_unsupportedIterableToArray(o, minLen) {
        if (!o) return;
        if (typeof o === "string") return Discord_arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor) n = o.constructor.name;
        if (n === "Map" || n === "Set") return Array.from(o);
        if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Discord_arrayLikeToArray(o, minLen);
    }
    function Discord_arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length) len = arr.length;
        for (var i = 0, arr2 = new Array(len); i < len; i++) {
            arr2[i] = arr[i];
        }
        return arr2;
    }
    function Discord_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
        try {
            var info = gen[key](arg);
            var value = info.value;
        } catch (error) {
            reject(error);
            return;
        }
        if (info.done) {
            resolve(value);
        } else {
            Promise.resolve(value).then(_next, _throw);
        }
    }
    function Discord_asyncToGenerator(fn) {
        return function() {
            var self = this, args = arguments;
            return new Promise(function(resolve, reject) {
                var gen = fn.apply(self, args);
                function _next(value) {
                    Discord_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
                }
                function _throw(err) {
                    Discord_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
                }
                _next(undefined);
            });
        };
    }
    function Discord_classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }
    function Discord_defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    function Discord_createClass(Constructor, protoProps, staticProps) {
        if (protoProps) Discord_defineProperties(Constructor.prototype, protoProps);
        if (staticProps) Discord_defineProperties(Constructor, staticProps);
        return Constructor;
    }
    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function");
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                writable: true,
                configurable: true
            }
        });
        if (superClass) _setPrototypeOf(subClass, superClass);
    }
    function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
            o.__proto__ = p;
            return o;
        };
        return _setPrototypeOf(o, p);
    }
    function _createSuper(Derived) {
        var hasNativeReflectConstruct = _isNativeReflectConstruct();
        return function _createSuperInternal() {
            var Super = _getPrototypeOf(Derived), result;
            if (hasNativeReflectConstruct) {
                var NewTarget = _getPrototypeOf(this).constructor;
                result = Reflect.construct(Super, arguments, NewTarget);
            } else {
                result = Super.apply(this, arguments);
            }
            return _possibleConstructorReturn(this, result);
        };
    }
    function _possibleConstructorReturn(self, call) {
        if (call && (_typeof(call) === "object" || typeof call === "function")) {
            return call;
        } else if (call !== void 0) {
            throw new TypeError("Derived constructors may only return object or undefined");
        }
        return _assertThisInitialized(self);
    }
    function _assertThisInitialized(self) {
        if (self === void 0) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return self;
    }
    function _isNativeReflectConstruct() {
        if (typeof Reflect === "undefined" || !Reflect.construct) return false;
        if (Reflect.construct.sham) return false;
        if (typeof Proxy === "function") return true;
        try {
            Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
            return true;
        } catch (e) {
            return false;
        }
    }
    function _getPrototypeOf(o) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
        };
        return _getPrototypeOf(o);
    }
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
            throw new TypeError("Cannot initialize the same private elements twice on an object");
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
            throw new TypeError("attempted to get private field on non-instance");
        }
        return fn;
    }
    function _classPrivateFieldGet(receiver, privateMap) {
        var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get");
        return _classApplyDescriptorGet(receiver, descriptor);
    }
    function _classApplyDescriptorGet(receiver, descriptor) {
        if (descriptor.get) {
            return descriptor.get.call(receiver);
        }
        return descriptor.value;
    }
    function _classPrivateFieldSet(receiver, privateMap, value) {
        var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set");
        _classApplyDescriptorSet(receiver, descriptor, value);
        return value;
    }
    function _classExtractFieldDescriptor(receiver, privateMap, action) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to " + action + " private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function _classApplyDescriptorSet(receiver, descriptor, value) {
        if (descriptor.set) {
            descriptor.set.call(receiver, value);
        } else {
            if (!descriptor.writable) {
                throw new TypeError("attempted to set read only private field");
            }
            descriptor.value = value;
        }
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
    var Discord = function(_Social) {
        _inherits(Discord, _Social);
        var _super = _createSuper(Discord);
        function Discord(id) {
            var _GM_getValue;
            var _this;
            Discord_classCallCheck(this, Discord);
            _this = _super.call(this);
            _classPrivateMethodInitSpec(_assertThisInitialized(_this), _addId);
            _classPrivateMethodInitSpec(_assertThisInitialized(_this), _getGuild);
            _classPrivateMethodInitSpec(_assertThisInitialized(_this), _leaveServer);
            _classPrivateMethodInitSpec(_assertThisInitialized(_this), _joinServer);
            _classPrivateMethodInitSpec(_assertThisInitialized(_this), _updateAuth);
            _classPrivateMethodInitSpec(_assertThisInitialized(_this), _verifyAuth);
            Discord_defineProperty(_assertThisInitialized(_this), "tasks", void 0);
            Discord_defineProperty(_assertThisInitialized(_this), "whiteList", void 0);
            _classPrivateFieldInitSpec(_assertThisInitialized(_this), _auth, {
                writable: true,
                value: void 0
            });
            _classPrivateFieldInitSpec(_assertThisInitialized(_this), _cache, {
                writable: true,
                value: void 0
            });
            _classPrivateFieldInitSpec(_assertThisInitialized(_this), _initialized, {
                writable: true,
                value: false
            });
            _this.tasks = GM_getValue("Discord-".concat(id)) || {
                servers: []
            };
            _this.whiteList = ((_GM_getValue = GM_getValue("whiteList")) === null || _GM_getValue === void 0 ? void 0 : _GM_getValue.discord) || {
                servers: []
            };
            _classPrivateFieldSet(_assertThisInitialized(_this), _cache, GM_getValue("discordCache") || {});
            _classPrivateFieldSet(_assertThisInitialized(_this), _auth, GM_getValue("discordAuth") || {});
            return _this;
        }
        Discord_createClass(Discord, [ {
            key: "init",
            value: function() {
                var _init = Discord_asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                    var isVerified;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                              case 0:
                                _context.prev = 0;
                                if (_classPrivateFieldGet(this, _auth).auth) {
                                    _context.next = 9;
                                    break;
                                }
                                scripts_echoLog({
                                    type: "updateDiscordAuth"
                                });
                                _context.next = 5;
                                return _classPrivateMethodGet(this, _updateAuth, _updateAuth2).call(this);

                              case 5:
                                if (!_context.sent) {
                                    _context.next = 8;
                                    break;
                                }
                                _classPrivateFieldSet(this, _initialized, true);
                                return _context.abrupt("return", true);

                              case 8:
                                return _context.abrupt("return", false);

                              case 9:
                                _context.next = 11;
                                return _classPrivateMethodGet(this, _verifyAuth, _verifyAuth2).call(this);

                              case 11:
                                isVerified = _context.sent;
                                if (!isVerified) {
                                    _context.next = 16;
                                    break;
                                }
                                scripts_echoLog({
                                    text: "Init discord success!"
                                });
                                _classPrivateFieldSet(this, _initialized, true);
                                return _context.abrupt("return", true);

                              case 16:
                                GM_setValue("discordAuth", {
                                    auth: null
                                });
                                _context.next = 19;
                                return _classPrivateMethodGet(this, _updateAuth, _updateAuth2).call(this);

                              case 19:
                                if (!_context.sent) {
                                    _context.next = 23;
                                    break;
                                }
                                scripts_echoLog({
                                    text: "Init discord success!"
                                });
                                _classPrivateFieldSet(this, _initialized, true);
                                return _context.abrupt("return", true);

                              case 23:
                                scripts_echoLog({
                                    text: "Init discord failed!"
                                });
                                return _context.abrupt("return", false);

                              case 27:
                                _context.prev = 27;
                                _context.t0 = _context["catch"](0);
                                throwError(_context.t0, "Discord.init");
                                return _context.abrupt("return", false);

                              case 31:
                              case "end":
                                return _context.stop();
                            }
                        }
                    }, _callee, this, [ [ 0, 27 ] ]);
                }));
                function init() {
                    return _init.apply(this, arguments);
                }
                return init;
            }()
        }, {
            key: "toggle",
            value: function() {
                var _toggle = Discord_asyncToGenerator(regeneratorRuntime.mark(function _callee2(_ref) {
                    var _ref$doTask, doTask, _ref$servers, servers, _ref$serverLinks, serverLinks, prom, realServers, _iterator, _step, server;
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                              case 0:
                                _ref$doTask = _ref.doTask, doTask = _ref$doTask === void 0 ? true : _ref$doTask, 
                                _ref$servers = _ref.servers, servers = _ref$servers === void 0 ? [] : _ref$servers, 
                                _ref$serverLinks = _ref.serverLinks, serverLinks = _ref$serverLinks === void 0 ? [] : _ref$serverLinks;
                                _context2.prev = 1;
                                if (_classPrivateFieldGet(this, _initialized)) {
                                    _context2.next = 5;
                                    break;
                                }
                                scripts_echoLog({
                                    type: "text",
                                    text: "请先初始化"
                                });
                                return _context2.abrupt("return", false);

                              case 5:
                                prom = [];
                                realServers = this.getRealParams("servers", servers, serverLinks, doTask, function(link) {
                                    var _link$match;
                                    return (_link$match = link.match(/invite\/(.+)/)) === null || _link$match === void 0 ? void 0 : _link$match[1];
                                });
                                if (!(realServers.length > 0)) {
                                    _context2.next = 26;
                                    break;
                                }
                                _iterator = _createForOfIteratorHelper(realServers);
                                _context2.prev = 9;
                                _iterator.s();

                              case 11:
                                if ((_step = _iterator.n()).done) {
                                    _context2.next = 18;
                                    break;
                                }
                                server = _step.value;
                                if (doTask) {
                                    prom.push(_classPrivateMethodGet(this, _joinServer, _joinServer2).call(this, server));
                                } else {
                                    prom.push(_classPrivateMethodGet(this, _leaveServer, _leaveServer2).call(this, server));
                                }
                                _context2.next = 16;
                                return delay(1e3);

                              case 16:
                                _context2.next = 11;
                                break;

                              case 18:
                                _context2.next = 23;
                                break;

                              case 20:
                                _context2.prev = 20;
                                _context2.t0 = _context2["catch"](9);
                                _iterator.e(_context2.t0);

                              case 23:
                                _context2.prev = 23;
                                _iterator.f();
                                return _context2.finish(23);

                              case 26:
                                _context2.next = 28;
                                return Promise.all(prom).then(function() {
                                    return true;
                                });

                              case 28:
                                return _context2.abrupt("return", _context2.sent);

                              case 31:
                                _context2.prev = 31;
                                _context2.t1 = _context2["catch"](1);
                                throwError(_context2.t1, "Discord.toggleServers");
                                return _context2.abrupt("return", false);

                              case 35:
                              case "end":
                                return _context2.stop();
                            }
                        }
                    }, _callee2, this, [ [ 1, 31 ], [ 9, 20, 23, 26 ] ]);
                }));
                function toggle(_x) {
                    return _toggle.apply(this, arguments);
                }
                return toggle;
            }()
        } ]);
        return Discord;
    }(social_Social);
    function _verifyAuth2() {
        return _verifyAuth3.apply(this, arguments);
    }
    function _verifyAuth3() {
        _verifyAuth3 = Discord_asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
            var logStatus, _yield$httpRequest, result, statusText, status, data;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.prev = 0;
                        logStatus = scripts_echoLog({
                            type: "text",
                            text: "verifyDiscordAuth"
                        });
                        _context3.next = 4;
                        return tools_httpRequest({
                            url: "https://discord.com/api/v6/users/@me",
                            method: "HEAD",
                            headers: {
                                authorization: _classPrivateFieldGet(this, _auth).auth
                            }
                        });

                      case 4:
                        _yield$httpRequest = _context3.sent;
                        result = _yield$httpRequest.result;
                        statusText = _yield$httpRequest.statusText;
                        status = _yield$httpRequest.status;
                        data = _yield$httpRequest.data;
                        if (!(result === "Success")) {
                            _context3.next = 15;
                            break;
                        }
                        if (!((data === null || data === void 0 ? void 0 : data.status) === 200)) {
                            _context3.next = 13;
                            break;
                        }
                        logStatus.success();
                        return _context3.abrupt("return", true);

                      case 13:
                        logStatus.error("Error:".concat(data === null || data === void 0 ? void 0 : data.statusText, "(").concat(data === null || data === void 0 ? void 0 : data.status, ")"));
                        return _context3.abrupt("return", false);

                      case 15:
                        logStatus.error("".concat(result, ":").concat(statusText, "(").concat(status, ")"));
                        return _context3.abrupt("return", false);

                      case 19:
                        _context3.prev = 19;
                        _context3.t0 = _context3["catch"](0);
                        throwError(_context3.t0, "Discord.verifyAuth");
                        return _context3.abrupt("return", false);

                      case 23:
                      case "end":
                        return _context3.stop();
                    }
                }
            }, _callee3, this, [ [ 0, 19 ] ]);
        }));
        return _verifyAuth3.apply(this, arguments);
    }
    function _updateAuth2() {
        return _updateAuth3.apply(this, arguments);
    }
    function _updateAuth3() {
        _updateAuth3 = Discord_asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
            var _this2 = this;
            var logStatus;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        _context5.prev = 0;
                        logStatus = scripts_echoLog({
                            type: "text",
                            text: "updateDiscordAuth"
                        });
                        _context5.next = 4;
                        return new Promise(function(resolve) {
                            var newTab = GM_openInTab("https://discord.com/channels/@me#auth", {
                                active: true,
                                insert: true,
                                setParent: true
                            });
                            newTab.onclose = Discord_asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
                                var _GM_getValue2;
                                var auth;
                                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                                    while (1) {
                                        switch (_context4.prev = _context4.next) {
                                          case 0:
                                            auth = (_GM_getValue2 = GM_getValue("discordAuth")) === null || _GM_getValue2 === void 0 ? void 0 : _GM_getValue2.auth;
                                            if (!auth) {
                                                _context4.next = 11;
                                                break;
                                            }
                                            _classPrivateFieldSet(_this2, _auth, {
                                                auth: auth
                                            });
                                            logStatus.success();
                                            _context4.t0 = resolve;
                                            _context4.next = 7;
                                            return _classPrivateMethodGet(_this2, _verifyAuth, _verifyAuth2).call(_this2);

                                          case 7:
                                            _context4.t1 = _context4.sent;
                                            (0, _context4.t0)(_context4.t1);
                                            _context4.next = 13;
                                            break;

                                          case 11:
                                            logStatus.error("Error: Update discord auth failed!");
                                            resolve(false);

                                          case 13:
                                          case "end":
                                            return _context4.stop();
                                        }
                                    }
                                }, _callee4);
                            }));
                        });

                      case 4:
                        return _context5.abrupt("return", _context5.sent);

                      case 7:
                        _context5.prev = 7;
                        _context5.t0 = _context5["catch"](0);
                        throwError(_context5.t0, "Discord.updateAuth");
                        return _context5.abrupt("return", false);

                      case 11:
                      case "end":
                        return _context5.stop();
                    }
                }
            }, _callee5, null, [ [ 0, 7 ] ]);
        }));
        return _updateAuth3.apply(this, arguments);
    }
    function _joinServer2(_x2) {
        return _joinServer3.apply(this, arguments);
    }
    function _joinServer3() {
        _joinServer3 = Discord_asyncToGenerator(regeneratorRuntime.mark(function _callee6(inviteId) {
            var logStatus, _yield$httpRequest2, result, statusText, status, data, _data$response, _data$response$guild, guild;
            return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        _context6.prev = 0;
                        logStatus = scripts_echoLog({
                            type: "joinDiscordServer",
                            text: inviteId
                        });
                        _context6.next = 4;
                        return tools_httpRequest({
                            url: "https://discord.com/api/v6/invites/".concat(inviteId),
                            method: "POST",
                            dataType: "json",
                            headers: {
                                authorization: _classPrivateFieldGet(this, _auth).auth
                            }
                        });

                      case 4:
                        _yield$httpRequest2 = _context6.sent;
                        result = _yield$httpRequest2.result;
                        statusText = _yield$httpRequest2.statusText;
                        status = _yield$httpRequest2.status;
                        data = _yield$httpRequest2.data;
                        if (!(result === "Success" && (data === null || data === void 0 ? void 0 : data.status) === 200)) {
                            _context6.next = 14;
                            break;
                        }
                        logStatus.success();
                        guild = String((_data$response = data.response) === null || _data$response === void 0 ? void 0 : (_data$response$guild = _data$response.guild) === null || _data$response$guild === void 0 ? void 0 : _data$response$guild.id);
                        if (guild) {
                            _classPrivateMethodGet(this, _addId, _addId2).call(this, inviteId, guild);
                            this.tasks.servers = unique([].concat(Discord_toConsumableArray(this.tasks.servers), [ inviteId ]));
                        }
                        return _context6.abrupt("return", true);

                      case 14:
                        logStatus.error("".concat(result, ":").concat(statusText, "(").concat(status, ")"));
                        return _context6.abrupt("return", false);

                      case 18:
                        _context6.prev = 18;
                        _context6.t0 = _context6["catch"](0);
                        throwError(_context6.t0, "Discord.joinServer");
                        return _context6.abrupt("return", false);

                      case 22:
                      case "end":
                        return _context6.stop();
                    }
                }
            }, _callee6, this, [ [ 0, 18 ] ]);
        }));
        return _joinServer3.apply(this, arguments);
    }
    function _leaveServer2(_x3) {
        return _leaveServer3.apply(this, arguments);
    }
    function _leaveServer3() {
        _leaveServer3 = Discord_asyncToGenerator(regeneratorRuntime.mark(function _callee7(inviteId) {
            var guild, logStatus, _yield$httpRequest3, result, statusText, status, data;
            return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        _context7.prev = 0;
                        if (!this.whiteList.servers.includes(inviteId)) {
                            _context7.next = 4;
                            break;
                        }
                        scripts_echoLog({
                            type: "whiteList",
                            text: inviteId
                        });
                        return _context7.abrupt("return", true);

                      case 4:
                        _context7.next = 6;
                        return _classPrivateMethodGet(this, _getGuild, _getGuild2).call(this, inviteId);

                      case 6:
                        guild = _context7.sent;
                        if (guild) {
                            _context7.next = 9;
                            break;
                        }
                        return _context7.abrupt("return", false);

                      case 9:
                        logStatus = scripts_echoLog({
                            type: "leaveDiscordServer",
                            text: inviteId
                        });
                        _context7.next = 12;
                        return tools_httpRequest({
                            url: "https://discord.com/api/v6/users/@me/guilds/".concat(guild),
                            method: "DELETE",
                            headers: {
                                authorization: _classPrivateFieldGet(this, _auth).auth
                            }
                        });

                      case 12:
                        _yield$httpRequest3 = _context7.sent;
                        result = _yield$httpRequest3.result;
                        statusText = _yield$httpRequest3.statusText;
                        status = _yield$httpRequest3.status;
                        data = _yield$httpRequest3.data;
                        if (!(result === "Success" && (data === null || data === void 0 ? void 0 : data.status) === 204)) {
                            _context7.next = 20;
                            break;
                        }
                        logStatus.success();
                        return _context7.abrupt("return", true);

                      case 20:
                        logStatus.error("".concat(result, ":").concat(statusText, "(").concat(status, ")"));
                        return _context7.abrupt("return", false);

                      case 24:
                        _context7.prev = 24;
                        _context7.t0 = _context7["catch"](0);
                        throwError(_context7.t0, "Discord.leaveServer");
                        return _context7.abrupt("return", false);

                      case 28:
                      case "end":
                        return _context7.stop();
                    }
                }
            }, _callee7, this, [ [ 0, 24 ] ]);
        }));
        return _leaveServer3.apply(this, arguments);
    }
    function _getGuild2(_x4) {
        return _getGuild3.apply(this, arguments);
    }
    function _getGuild3() {
        _getGuild3 = Discord_asyncToGenerator(regeneratorRuntime.mark(function _callee8(inviteId) {
            var logStatus, guild, _yield$httpRequest4, result, statusText, status, data, _data$responseText$ma, _guild;
            return regeneratorRuntime.wrap(function _callee8$(_context8) {
                while (1) {
                    switch (_context8.prev = _context8.next) {
                      case 0:
                        _context8.prev = 0;
                        logStatus = scripts_echoLog({
                            type: "getDiscordGuild",
                            text: inviteId
                        });
                        guild = _classPrivateFieldGet(this, _cache)[inviteId];
                        if (!guild) {
                            _context8.next = 6;
                            break;
                        }
                        logStatus.success();
                        return _context8.abrupt("return", guild);

                      case 6:
                        _context8.next = 8;
                        return tools_httpRequest({
                            url: "https://discord.com/invite/".concat(inviteId),
                            method: "GET"
                        });

                      case 8:
                        _yield$httpRequest4 = _context8.sent;
                        result = _yield$httpRequest4.result;
                        statusText = _yield$httpRequest4.statusText;
                        status = _yield$httpRequest4.status;
                        data = _yield$httpRequest4.data;
                        if (!(result === "Success" && (data === null || data === void 0 ? void 0 : data.status) === 200)) {
                            _context8.next = 21;
                            break;
                        }
                        _guild = (_data$responseText$ma = data.responseText.match(/https?:\/\/cdn\.discordapp\.com\/icons\/([\d]+?)\//)) === null || _data$responseText$ma === void 0 ? void 0 : _data$responseText$ma[1];
                        if (!_guild) {
                            _context8.next = 19;
                            break;
                        }
                        logStatus.success();
                        _classPrivateMethodGet(this, _addId, _addId2).call(this, inviteId, _guild);
                        return _context8.abrupt("return", _guild);

                      case 19:
                        logStatus.error("".concat(result, ":").concat(statusText, "(").concat(status, ")"));
                        return _context8.abrupt("return", false);

                      case 21:
                        logStatus.error("".concat(result, ":").concat(statusText, "(").concat(status, ")"));
                        return _context8.abrupt("return", false);

                      case 25:
                        _context8.prev = 25;
                        _context8.t0 = _context8["catch"](0);
                        throwError(_context8.t0, "Discord.getGuild");
                        return _context8.abrupt("return", false);

                      case 29:
                      case "end":
                        return _context8.stop();
                    }
                }
            }, _callee8, this, [ [ 0, 25 ] ]);
        }));
        return _getGuild3.apply(this, arguments);
    }
    function _addId2(inviteId, guild) {
        _classPrivateFieldGet(this, _cache)[inviteId] = guild;
        GM_setValue("discordCache", _classPrivateFieldGet(this, _cache));
    }
    const social_Discord = Discord;
    function Instagram_typeof(obj) {
        "@babel/helpers - typeof";
        if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
            Instagram_typeof = function _typeof(obj) {
                return typeof obj;
            };
        } else {
            Instagram_typeof = function _typeof(obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
        }
        return Instagram_typeof(obj);
    }
    function Instagram_toConsumableArray(arr) {
        return Instagram_arrayWithoutHoles(arr) || Instagram_iterableToArray(arr) || Instagram_unsupportedIterableToArray(arr) || Instagram_nonIterableSpread();
    }
    function Instagram_nonIterableSpread() {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function Instagram_iterableToArray(iter) {
        if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
    }
    function Instagram_arrayWithoutHoles(arr) {
        if (Array.isArray(arr)) return Instagram_arrayLikeToArray(arr);
    }
    function Instagram_createForOfIteratorHelper(o, allowArrayLike) {
        var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
        if (!it) {
            if (Array.isArray(o) || (it = Instagram_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
                if (it) o = it;
                var i = 0;
                var F = function F() {};
                return {
                    s: F,
                    n: function n() {
                        if (i >= o.length) return {
                            done: true
                        };
                        return {
                            done: false,
                            value: o[i++]
                        };
                    },
                    e: function e(_e) {
                        throw _e;
                    },
                    f: F
                };
            }
            throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        var normalCompletion = true, didErr = false, err;
        return {
            s: function s() {
                it = it.call(o);
            },
            n: function n() {
                var step = it.next();
                normalCompletion = step.done;
                return step;
            },
            e: function e(_e2) {
                didErr = true;
                err = _e2;
            },
            f: function f() {
                try {
                    if (!normalCompletion && it["return"] != null) it["return"]();
                } finally {
                    if (didErr) throw err;
                }
            }
        };
    }
    function Instagram_unsupportedIterableToArray(o, minLen) {
        if (!o) return;
        if (typeof o === "string") return Instagram_arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor) n = o.constructor.name;
        if (n === "Map" || n === "Set") return Array.from(o);
        if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Instagram_arrayLikeToArray(o, minLen);
    }
    function Instagram_arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length) len = arr.length;
        for (var i = 0, arr2 = new Array(len); i < len; i++) {
            arr2[i] = arr[i];
        }
        return arr2;
    }
    function Instagram_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
        try {
            var info = gen[key](arg);
            var value = info.value;
        } catch (error) {
            reject(error);
            return;
        }
        if (info.done) {
            resolve(value);
        } else {
            Promise.resolve(value).then(_next, _throw);
        }
    }
    function Instagram_asyncToGenerator(fn) {
        return function() {
            var self = this, args = arguments;
            return new Promise(function(resolve, reject) {
                var gen = fn.apply(self, args);
                function _next(value) {
                    Instagram_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
                }
                function _throw(err) {
                    Instagram_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
                }
                _next(undefined);
            });
        };
    }
    function Instagram_classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }
    function Instagram_defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    function Instagram_createClass(Constructor, protoProps, staticProps) {
        if (protoProps) Instagram_defineProperties(Constructor.prototype, protoProps);
        if (staticProps) Instagram_defineProperties(Constructor, staticProps);
        return Constructor;
    }
    function Instagram_inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function");
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Instagram_setPrototypeOf(subClass, superClass);
    }
    function Instagram_setPrototypeOf(o, p) {
        Instagram_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
            o.__proto__ = p;
            return o;
        };
        return Instagram_setPrototypeOf(o, p);
    }
    function Instagram_createSuper(Derived) {
        var hasNativeReflectConstruct = Instagram_isNativeReflectConstruct();
        return function _createSuperInternal() {
            var Super = Instagram_getPrototypeOf(Derived), result;
            if (hasNativeReflectConstruct) {
                var NewTarget = Instagram_getPrototypeOf(this).constructor;
                result = Reflect.construct(Super, arguments, NewTarget);
            } else {
                result = Super.apply(this, arguments);
            }
            return Instagram_possibleConstructorReturn(this, result);
        };
    }
    function Instagram_possibleConstructorReturn(self, call) {
        if (call && (Instagram_typeof(call) === "object" || typeof call === "function")) {
            return call;
        } else if (call !== void 0) {
            throw new TypeError("Derived constructors may only return object or undefined");
        }
        return Instagram_assertThisInitialized(self);
    }
    function Instagram_assertThisInitialized(self) {
        if (self === void 0) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return self;
    }
    function Instagram_isNativeReflectConstruct() {
        if (typeof Reflect === "undefined" || !Reflect.construct) return false;
        if (Reflect.construct.sham) return false;
        if (typeof Proxy === "function") return true;
        try {
            Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
            return true;
        } catch (e) {
            return false;
        }
    }
    function Instagram_getPrototypeOf(o) {
        Instagram_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
        };
        return Instagram_getPrototypeOf(o);
    }
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
            throw new TypeError("Cannot initialize the same private elements twice on an object");
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
        var descriptor = Instagram_classExtractFieldDescriptor(receiver, privateMap, "get");
        return Instagram_classApplyDescriptorGet(receiver, descriptor);
    }
    function Instagram_classApplyDescriptorGet(receiver, descriptor) {
        if (descriptor.get) {
            return descriptor.get.call(receiver);
        }
        return descriptor.value;
    }
    function Instagram_classPrivateFieldSet(receiver, privateMap, value) {
        var descriptor = Instagram_classExtractFieldDescriptor(receiver, privateMap, "set");
        Instagram_classApplyDescriptorSet(receiver, descriptor, value);
        return value;
    }
    function Instagram_classExtractFieldDescriptor(receiver, privateMap, action) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to " + action + " private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function Instagram_classApplyDescriptorSet(receiver, descriptor, value) {
        if (descriptor.set) {
            descriptor.set.call(receiver, value);
        } else {
            if (!descriptor.writable) {
                throw new TypeError("attempted to set read only private field");
            }
            descriptor.value = value;
        }
    }
    function Instagram_classPrivateMethodGet(receiver, privateSet, fn) {
        if (!privateSet.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return fn;
    }
    var Instagram_auth = new WeakMap();
    var Instagram_initialized = new WeakMap();
    var _getUserInfo = new WeakSet();
    var _followUser = new WeakSet();
    var _unfollowUser = new WeakSet();
    var Instagram = function(_Social) {
        Instagram_inherits(Instagram, _Social);
        var _super = Instagram_createSuper(Instagram);
        function Instagram(_id) {
            var _GM_getValue;
            var _this;
            Instagram_classCallCheck(this, Instagram);
            _this = _super.call(this);
            Instagram_classPrivateMethodInitSpec(Instagram_assertThisInitialized(_this), _unfollowUser);
            Instagram_classPrivateMethodInitSpec(Instagram_assertThisInitialized(_this), _followUser);
            Instagram_classPrivateMethodInitSpec(Instagram_assertThisInitialized(_this), _getUserInfo);
            Instagram_defineProperty(Instagram_assertThisInitialized(_this), "tasks", void 0);
            Instagram_defineProperty(Instagram_assertThisInitialized(_this), "whiteList", void 0);
            Instagram_classPrivateFieldInitSpec(Instagram_assertThisInitialized(_this), Instagram_auth, {
                writable: true,
                value: void 0
            });
            Instagram_classPrivateFieldInitSpec(Instagram_assertThisInitialized(_this), Instagram_initialized, {
                writable: true,
                value: false
            });
            _this.tasks = GM_getValue("Instagram-".concat(_id)) || {
                users: []
            };
            _this.whiteList = ((_GM_getValue = GM_getValue("whiteList")) === null || _GM_getValue === void 0 ? void 0 : _GM_getValue.instagram) || {
                users: []
            };
            return _this;
        }
        Instagram_createClass(Instagram, [ {
            key: "init",
            value: function() {
                var _init = Instagram_asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                    var isVerified;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                              case 0:
                                _context.prev = 0;
                                _context.next = 3;
                                return Instagram_classPrivateMethodGet(this, _getUserInfo, _getUserInfo2).call(this);

                              case 3:
                                isVerified = _context.sent;
                                if (!isVerified) {
                                    _context.next = 8;
                                    break;
                                }
                                scripts_echoLog({
                                    text: "Init instagram success!"
                                });
                                Instagram_classPrivateFieldSet(this, Instagram_initialized, true);
                                return _context.abrupt("return", true);

                              case 8:
                                scripts_echoLog({
                                    text: "Init instagram failed!"
                                });
                                return _context.abrupt("return", false);

                              case 12:
                                _context.prev = 12;
                                _context.t0 = _context["catch"](0);
                                throwError(_context.t0, "Instagram.init");
                                return _context.abrupt("return", false);

                              case 16:
                              case "end":
                                return _context.stop();
                            }
                        }
                    }, _callee, this, [ [ 0, 12 ] ]);
                }));
                function init() {
                    return _init.apply(this, arguments);
                }
                return init;
            }()
        }, {
            key: "toggle",
            value: function() {
                var _toggle = Instagram_asyncToGenerator(regeneratorRuntime.mark(function _callee2(_ref) {
                    var _ref$doTask, doTask, _ref$users, users, _ref$userLinks, userLinks, prom, realUsers, _iterator, _step, username;
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                              case 0:
                                _ref$doTask = _ref.doTask, doTask = _ref$doTask === void 0 ? true : _ref$doTask, 
                                _ref$users = _ref.users, users = _ref$users === void 0 ? [] : _ref$users, _ref$userLinks = _ref.userLinks, 
                                userLinks = _ref$userLinks === void 0 ? [] : _ref$userLinks;
                                _context2.prev = 1;
                                if (Instagram_classPrivateFieldGet(this, Instagram_initialized)) {
                                    _context2.next = 5;
                                    break;
                                }
                                scripts_echoLog({
                                    type: "text",
                                    text: "请先初始化"
                                });
                                return _context2.abrupt("return", false);

                              case 5:
                                prom = [];
                                realUsers = this.getRealParams("users", users, userLinks, doTask, function(link) {
                                    var _link$match;
                                    return (_link$match = link.match(/https:\/\/www\.instagram\.com\/(.+)?\//)) === null || _link$match === void 0 ? void 0 : _link$match[1];
                                });
                                if (!(realUsers.length > 0)) {
                                    _context2.next = 26;
                                    break;
                                }
                                _iterator = Instagram_createForOfIteratorHelper(realUsers);
                                _context2.prev = 9;
                                _iterator.s();

                              case 11:
                                if ((_step = _iterator.n()).done) {
                                    _context2.next = 18;
                                    break;
                                }
                                username = _step.value;
                                if (doTask) {
                                    prom.push(Instagram_classPrivateMethodGet(this, _followUser, _followUser2).call(this, username));
                                } else {
                                    prom.push(Instagram_classPrivateMethodGet(this, _unfollowUser, _unfollowUser2).call(this, username));
                                }
                                _context2.next = 16;
                                return delay(1e3);

                              case 16:
                                _context2.next = 11;
                                break;

                              case 18:
                                _context2.next = 23;
                                break;

                              case 20:
                                _context2.prev = 20;
                                _context2.t0 = _context2["catch"](9);
                                _iterator.e(_context2.t0);

                              case 23:
                                _context2.prev = 23;
                                _iterator.f();
                                return _context2.finish(23);

                              case 26:
                                _context2.next = 28;
                                return Promise.all(prom).then(function() {
                                    return true;
                                });

                              case 28:
                                return _context2.abrupt("return", _context2.sent);

                              case 31:
                                _context2.prev = 31;
                                _context2.t1 = _context2["catch"](1);
                                throwError(_context2.t1, "Instagram.toggleUsers");
                                return _context2.abrupt("return", false);

                              case 35:
                              case "end":
                                return _context2.stop();
                            }
                        }
                    }, _callee2, this, [ [ 1, 31 ], [ 9, 20, 23, 26 ] ]);
                }));
                function toggle(_x) {
                    return _toggle.apply(this, arguments);
                }
                return toggle;
            }()
        } ]);
        return Instagram;
    }(social_Social);
    function _getUserInfo2() {
        return _getUserInfo3.apply(this, arguments);
    }
    function _getUserInfo3() {
        _getUserInfo3 = Instagram_asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
            var name, logStatus, _yield$httpRequest, result, statusText, status, data, _data$responseText$ma, _data$responseText$ma2, _data$responseText$ma3, csrftoken, hash, id, _args3 = arguments;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        name = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : "instagram";
                        _context3.prev = 1;
                        logStatus = scripts_echoLog({
                            type: name === "instagram" ? "getInsInfo" : "getInsUserId",
                            text: name
                        });
                        _context3.next = 5;
                        return tools_httpRequest({
                            url: "https://www.instagram.com/".concat(name, "/"),
                            method: "GET"
                        });

                      case 5:
                        _yield$httpRequest = _context3.sent;
                        result = _yield$httpRequest.result;
                        statusText = _yield$httpRequest.statusText;
                        status = _yield$httpRequest.status;
                        data = _yield$httpRequest.data;
                        if (!(result === "Success")) {
                            _context3.next = 37;
                            break;
                        }
                        if (!(data !== null && data !== void 0 && data.finalUrl.includes("accounts/login"))) {
                            _context3.next = 16;
                            break;
                        }
                        logStatus.error("Error:".concat(i18n("loginIns")), true);
                        return _context3.abrupt("return", false);

                      case 16:
                        if (!(data !== null && data !== void 0 && data.finalUrl.includes("www.instagram.com/challenge"))) {
                            _context3.next = 19;
                            break;
                        }
                        logStatus.error("Error:".concat(i18n("insBanned")));
                        return _context3.abrupt("return", false);

                      case 19:
                        if (!((data === null || data === void 0 ? void 0 : data.status) === 200)) {
                            _context3.next = 35;
                            break;
                        }
                        csrftoken = (_data$responseText$ma = data.responseText.match(/"csrf_token":"(.+?)"/)) === null || _data$responseText$ma === void 0 ? void 0 : _data$responseText$ma[1];
                        hash = (_data$responseText$ma2 = data.responseText.match(/"rollout_hash":"(.+?)"/)) === null || _data$responseText$ma2 === void 0 ? void 0 : _data$responseText$ma2[1];
                        if (!(name === "instagram")) {
                            _context3.next = 27;
                            break;
                        }
                        if (!(csrftoken && hash)) {
                            _context3.next = 26;
                            break;
                        }
                        Instagram_classPrivateFieldSet(this, Instagram_auth, {
                            csrftoken: csrftoken,
                            hash: hash
                        });
                        return _context3.abrupt("return", true);

                      case 26:
                        return _context3.abrupt("return", false);

                      case 27:
                        Instagram_classPrivateFieldGet(this, Instagram_auth).csrftoken = csrftoken || Instagram_classPrivateFieldGet(this, Instagram_auth).csrftoken;
                        Instagram_classPrivateFieldGet(this, Instagram_auth).hash = csrftoken || Instagram_classPrivateFieldGet(this, Instagram_auth).hash;
                        id = (_data$responseText$ma3 = data.responseText.match(/"profilePage_([\d]+?)"/)) === null || _data$responseText$ma3 === void 0 ? void 0 : _data$responseText$ma3[1];
                        if (!id) {
                            _context3.next = 33;
                            break;
                        }
                        logStatus.success();
                        return _context3.abrupt("return", id);

                      case 33:
                        logStatus.error("Error: Get ins data error!");
                        return _context3.abrupt("return", false);

                      case 35:
                        logStatus.error("".concat(result, ":").concat(statusText, "(").concat(status, ")"));
                        return _context3.abrupt("return", false);

                      case 37:
                        return _context3.abrupt("return", false);

                      case 40:
                        _context3.prev = 40;
                        _context3.t0 = _context3["catch"](1);
                        throwError(_context3.t0, "Instagram.getUserInfo");
                        return _context3.abrupt("return", false);

                      case 44:
                      case "end":
                        return _context3.stop();
                    }
                }
            }, _callee3, this, [ [ 1, 40 ] ]);
        }));
        return _getUserInfo3.apply(this, arguments);
    }
    function _followUser2(_x2) {
        return _followUser3.apply(this, arguments);
    }
    function _followUser3() {
        _followUser3 = Instagram_asyncToGenerator(regeneratorRuntime.mark(function _callee4(name) {
            var id, logStatus, _yield$httpRequest2, result, statusText, status, data, _data$response, _data$response2;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        _context4.prev = 0;
                        _context4.next = 3;
                        return Instagram_classPrivateMethodGet(this, _getUserInfo, _getUserInfo2).call(this, name);

                      case 3:
                        id = _context4.sent;
                        if (id) {
                            _context4.next = 6;
                            break;
                        }
                        return _context4.abrupt("return", false);

                      case 6:
                        logStatus = scripts_echoLog({
                            type: "followIns",
                            text: name
                        });
                        _context4.next = 9;
                        return tools_httpRequest({
                            url: "https://www.instagram.com/web/friendships/".concat(id, "/follow/"),
                            method: "POST",
                            dataType: "json",
                            headers: {
                                "x-csrftoken": Instagram_classPrivateFieldGet(this, Instagram_auth).csrftoken,
                                origin: "https://www.instagram.com",
                                referer: "https://www.instagram.com/".concat(name, "/"),
                                "content-type": "application/x-www-form-urlencoded",
                                "sec-fetch-site": "same-origin",
                                "x-instagram-ajax": Instagram_classPrivateFieldGet(this, Instagram_auth).hash
                            }
                        });

                      case 9:
                        _yield$httpRequest2 = _context4.sent;
                        result = _yield$httpRequest2.result;
                        statusText = _yield$httpRequest2.statusText;
                        status = _yield$httpRequest2.status;
                        data = _yield$httpRequest2.data;
                        if (!(result === "Success")) {
                            _context4.next = 21;
                            break;
                        }
                        if (!((data === null || data === void 0 ? void 0 : data.status) === 200 && ((_data$response = data.response) === null || _data$response === void 0 ? void 0 : _data$response.result) === "following")) {
                            _context4.next = 19;
                            break;
                        }
                        logStatus.success();
                        this.tasks.users = unique([].concat(Instagram_toConsumableArray(this.tasks.users), [ name ]));
                        return _context4.abrupt("return", true);

                      case 19:
                        logStatus.error("Error:".concat((data === null || data === void 0 ? void 0 : (_data$response2 = data.response) === null || _data$response2 === void 0 ? void 0 : _data$response2.feedback_message) || "".concat(data === null || data === void 0 ? void 0 : data.statusText, "(").concat(data === null || data === void 0 ? void 0 : data.status, ")")));
                        return _context4.abrupt("return", false);

                      case 21:
                        logStatus.error("".concat(result, ":").concat(statusText, "(").concat(status, ")"));
                        return _context4.abrupt("return", false);

                      case 25:
                        _context4.prev = 25;
                        _context4.t0 = _context4["catch"](0);
                        throwError(_context4.t0, "Instagram.followUser");
                        return _context4.abrupt("return", false);

                      case 29:
                      case "end":
                        return _context4.stop();
                    }
                }
            }, _callee4, this, [ [ 0, 25 ] ]);
        }));
        return _followUser3.apply(this, arguments);
    }
    function _unfollowUser2(_x3) {
        return _unfollowUser3.apply(this, arguments);
    }
    function _unfollowUser3() {
        _unfollowUser3 = Instagram_asyncToGenerator(regeneratorRuntime.mark(function _callee5(name) {
            var id, logStatus, _yield$httpRequest3, result, statusText, status, data, _data$response3;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        _context5.prev = 0;
                        if (!this.whiteList.users.includes(name)) {
                            _context5.next = 4;
                            break;
                        }
                        scripts_echoLog({
                            type: "whiteList",
                            text: name
                        });
                        return _context5.abrupt("return", true);

                      case 4:
                        _context5.next = 6;
                        return Instagram_classPrivateMethodGet(this, _getUserInfo, _getUserInfo2).call(this, name);

                      case 6:
                        id = _context5.sent;
                        if (id) {
                            _context5.next = 9;
                            break;
                        }
                        return _context5.abrupt("return", false);

                      case 9:
                        logStatus = scripts_echoLog({
                            type: "unfollowIns",
                            text: name
                        });
                        _context5.next = 12;
                        return tools_httpRequest({
                            url: "https://www.instagram.com/web/friendships/".concat(id, "/unfollow/"),
                            method: "POST",
                            dataType: "json",
                            headers: {
                                "x-csrftoken": Instagram_classPrivateFieldGet(this, Instagram_auth).csrftoken,
                                origin: "https://www.instagram.com",
                                referer: "https://www.instagram.com/".concat(name, "/"),
                                "content-type": "application/x-www-form-urlencoded",
                                "sec-fetch-site": "same-origin",
                                "x-instagram-ajax": Instagram_classPrivateFieldGet(this, Instagram_auth).hash
                            }
                        });

                      case 12:
                        _yield$httpRequest3 = _context5.sent;
                        result = _yield$httpRequest3.result;
                        statusText = _yield$httpRequest3.statusText;
                        status = _yield$httpRequest3.status;
                        data = _yield$httpRequest3.data;
                        if (!(result === "Success")) {
                            _context5.next = 23;
                            break;
                        }
                        if (!((data === null || data === void 0 ? void 0 : data.status) === 200 && ((_data$response3 = data.response) === null || _data$response3 === void 0 ? void 0 : _data$response3.status) === "ok")) {
                            _context5.next = 21;
                            break;
                        }
                        logStatus.success();
                        return _context5.abrupt("return", true);

                      case 21:
                        logStatus.error("Error:".concat(data === null || data === void 0 ? void 0 : data.statusText, "(").concat(data === null || data === void 0 ? void 0 : data.status, ")"));
                        return _context5.abrupt("return", false);

                      case 23:
                        logStatus.error("".concat(result, ":").concat(statusText, "(").concat(status, ")"));
                        return _context5.abrupt("return", false);

                      case 27:
                        _context5.prev = 27;
                        _context5.t0 = _context5["catch"](0);
                        throwError(_context5.t0, "Instagram.unfollowUser");
                        return _context5.abrupt("return", false);

                      case 31:
                      case "end":
                        return _context5.stop();
                    }
                }
            }, _callee5, this, [ [ 0, 27 ] ]);
        }));
        return _unfollowUser3.apply(this, arguments);
    }
    const social_Instagram = Instagram;
    function Reddit_typeof(obj) {
        "@babel/helpers - typeof";
        if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
            Reddit_typeof = function _typeof(obj) {
                return typeof obj;
            };
        } else {
            Reddit_typeof = function _typeof(obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
        }
        return Reddit_typeof(obj);
    }
    function Reddit_createForOfIteratorHelper(o, allowArrayLike) {
        var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
        if (!it) {
            if (Array.isArray(o) || (it = Reddit_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
                if (it) o = it;
                var i = 0;
                var F = function F() {};
                return {
                    s: F,
                    n: function n() {
                        if (i >= o.length) return {
                            done: true
                        };
                        return {
                            done: false,
                            value: o[i++]
                        };
                    },
                    e: function e(_e2) {
                        throw _e2;
                    },
                    f: F
                };
            }
            throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        var normalCompletion = true, didErr = false, err;
        return {
            s: function s() {
                it = it.call(o);
            },
            n: function n() {
                var step = it.next();
                normalCompletion = step.done;
                return step;
            },
            e: function e(_e3) {
                didErr = true;
                err = _e3;
            },
            f: function f() {
                try {
                    if (!normalCompletion && it["return"] != null) it["return"]();
                } finally {
                    if (didErr) throw err;
                }
            }
        };
    }
    function Reddit_toConsumableArray(arr) {
        return Reddit_arrayWithoutHoles(arr) || Reddit_iterableToArray(arr) || Reddit_unsupportedIterableToArray(arr) || Reddit_nonIterableSpread();
    }
    function Reddit_nonIterableSpread() {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function Reddit_iterableToArray(iter) {
        if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
    }
    function Reddit_arrayWithoutHoles(arr) {
        if (Array.isArray(arr)) return Reddit_arrayLikeToArray(arr);
    }
    function _slicedToArray(arr, i) {
        return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || Reddit_unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }
    function _nonIterableRest() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function Reddit_unsupportedIterableToArray(o, minLen) {
        if (!o) return;
        if (typeof o === "string") return Reddit_arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor) n = o.constructor.name;
        if (n === "Map" || n === "Set") return Array.from(o);
        if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Reddit_arrayLikeToArray(o, minLen);
    }
    function Reddit_arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length) len = arr.length;
        for (var i = 0, arr2 = new Array(len); i < len; i++) {
            arr2[i] = arr[i];
        }
        return arr2;
    }
    function _iterableToArrayLimit(arr, i) {
        var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
        if (_i == null) return;
        var _arr = [];
        var _n = true;
        var _d = false;
        var _s, _e;
        try {
            for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
                _arr.push(_s.value);
                if (i && _arr.length === i) break;
            }
        } catch (err) {
            _d = true;
            _e = err;
        } finally {
            try {
                if (!_n && _i["return"] != null) _i["return"]();
            } finally {
                if (_d) throw _e;
            }
        }
        return _arr;
    }
    function _arrayWithHoles(arr) {
        if (Array.isArray(arr)) return arr;
    }
    function Reddit_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
        try {
            var info = gen[key](arg);
            var value = info.value;
        } catch (error) {
            reject(error);
            return;
        }
        if (info.done) {
            resolve(value);
        } else {
            Promise.resolve(value).then(_next, _throw);
        }
    }
    function Reddit_asyncToGenerator(fn) {
        return function() {
            var self = this, args = arguments;
            return new Promise(function(resolve, reject) {
                var gen = fn.apply(self, args);
                function _next(value) {
                    Reddit_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
                }
                function _throw(err) {
                    Reddit_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
                }
                _next(undefined);
            });
        };
    }
    function Reddit_classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }
    function Reddit_defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    function Reddit_createClass(Constructor, protoProps, staticProps) {
        if (protoProps) Reddit_defineProperties(Constructor.prototype, protoProps);
        if (staticProps) Reddit_defineProperties(Constructor, staticProps);
        return Constructor;
    }
    function Reddit_inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function");
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Reddit_setPrototypeOf(subClass, superClass);
    }
    function Reddit_setPrototypeOf(o, p) {
        Reddit_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
            o.__proto__ = p;
            return o;
        };
        return Reddit_setPrototypeOf(o, p);
    }
    function Reddit_createSuper(Derived) {
        var hasNativeReflectConstruct = Reddit_isNativeReflectConstruct();
        return function _createSuperInternal() {
            var Super = Reddit_getPrototypeOf(Derived), result;
            if (hasNativeReflectConstruct) {
                var NewTarget = Reddit_getPrototypeOf(this).constructor;
                result = Reflect.construct(Super, arguments, NewTarget);
            } else {
                result = Super.apply(this, arguments);
            }
            return Reddit_possibleConstructorReturn(this, result);
        };
    }
    function Reddit_possibleConstructorReturn(self, call) {
        if (call && (Reddit_typeof(call) === "object" || typeof call === "function")) {
            return call;
        } else if (call !== void 0) {
            throw new TypeError("Derived constructors may only return object or undefined");
        }
        return Reddit_assertThisInitialized(self);
    }
    function Reddit_assertThisInitialized(self) {
        if (self === void 0) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return self;
    }
    function Reddit_isNativeReflectConstruct() {
        if (typeof Reflect === "undefined" || !Reflect.construct) return false;
        if (Reflect.construct.sham) return false;
        if (typeof Proxy === "function") return true;
        try {
            Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
            return true;
        } catch (e) {
            return false;
        }
    }
    function Reddit_getPrototypeOf(o) {
        Reddit_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
        };
        return Reddit_getPrototypeOf(o);
    }
    function Reddit_classPrivateFieldInitSpec(obj, privateMap, value) {
        Reddit_checkPrivateRedeclaration(obj, privateMap);
        privateMap.set(obj, value);
    }
    function Reddit_checkPrivateRedeclaration(obj, privateCollection) {
        if (privateCollection.has(obj)) {
            throw new TypeError("Cannot initialize the same private elements twice on an object");
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
        var descriptor = Reddit_classExtractFieldDescriptor(receiver, privateMap, "get");
        return Reddit_classApplyDescriptorGet(receiver, descriptor);
    }
    function Reddit_classApplyDescriptorGet(receiver, descriptor) {
        if (descriptor.get) {
            return descriptor.get.call(receiver);
        }
        return descriptor.value;
    }
    function Reddit_classPrivateFieldSet(receiver, privateMap, value) {
        var descriptor = Reddit_classExtractFieldDescriptor(receiver, privateMap, "set");
        Reddit_classApplyDescriptorSet(receiver, descriptor, value);
        return value;
    }
    function Reddit_classExtractFieldDescriptor(receiver, privateMap, action) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to " + action + " private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function Reddit_classApplyDescriptorSet(receiver, descriptor, value) {
        if (descriptor.set) {
            descriptor.set.call(receiver, value);
        } else {
            if (!descriptor.writable) {
                throw new TypeError("attempted to set read only private field");
            }
            descriptor.value = value;
        }
    }
    var Reddit_auth = new WeakMap();
    var Reddit_initialized = new WeakMap();
    var Reddit = function(_Social) {
        Reddit_inherits(Reddit, _Social);
        var _super = Reddit_createSuper(Reddit);
        function Reddit(id) {
            var _GM_getValue;
            var _this;
            Reddit_classCallCheck(this, Reddit);
            _this = _super.call(this);
            Reddit_defineProperty(Reddit_assertThisInitialized(_this), "tasks", void 0);
            Reddit_defineProperty(Reddit_assertThisInitialized(_this), "whiteList", void 0);
            Reddit_classPrivateFieldInitSpec(Reddit_assertThisInitialized(_this), Reddit_auth, {
                writable: true,
                value: void 0
            });
            Reddit_classPrivateFieldInitSpec(Reddit_assertThisInitialized(_this), Reddit_initialized, {
                writable: true,
                value: false
            });
            _this.tasks = GM_getValue("Reddit-".concat(id)) || {
                reddits: []
            };
            _this.whiteList = ((_GM_getValue = GM_getValue("whiteList")) === null || _GM_getValue === void 0 ? void 0 : _GM_getValue.reddit) || {
                reddits: []
            };
            Reddit_classPrivateFieldSet(Reddit_assertThisInitialized(_this), Reddit_auth, GM_getValue("redditAuth") || {});
            return _this;
        }
        Reddit_createClass(Reddit, [ {
            key: "init",
            value: function() {
                var _init = Reddit_asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                    var isVerified;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                              case 0:
                                _context.prev = 0;
                                _context.next = 3;
                                return this.updateToken();

                              case 3:
                                isVerified = _context.sent;
                                if (!isVerified) {
                                    _context.next = 8;
                                    break;
                                }
                                scripts_echoLog({
                                    text: "Init reddit success!"
                                });
                                Reddit_classPrivateFieldSet(this, Reddit_initialized, true);
                                return _context.abrupt("return", true);

                              case 8:
                                scripts_echoLog({
                                    text: "Init reddit failed!"
                                });
                                return _context.abrupt("return", false);

                              case 12:
                                _context.prev = 12;
                                _context.t0 = _context["catch"](0);
                                throwError(_context.t0, "Reddit.init");
                                return _context.abrupt("return", false);

                              case 16:
                              case "end":
                                return _context.stop();
                            }
                        }
                    }, _callee, this, [ [ 0, 12 ] ]);
                }));
                function init() {
                    return _init.apply(this, arguments);
                }
                return init;
            }()
        }, {
            key: "updateToken",
            value: function() {
                var _updateToken = Reddit_asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
                    var logStatus, _yield$httpRequest, result, statusText, status, data, _ref, _ref2, accessToken;
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                              case 0:
                                _context2.prev = 0;
                                logStatus = scripts_echoLog({
                                    type: "text",
                                    text: "updateRedditInfo"
                                });
                                _context2.next = 4;
                                return tools_httpRequest({
                                    url: "https://www.reddit.com/",
                                    method: "GET",
                                    nochche: true,
                                    headers: {
                                        "Cache-Control": "no-cache"
                                    }
                                });

                              case 4:
                                _yield$httpRequest = _context2.sent;
                                result = _yield$httpRequest.result;
                                statusText = _yield$httpRequest.statusText;
                                status = _yield$httpRequest.status;
                                data = _yield$httpRequest.data;
                                if (!(result === "Success")) {
                                    _context2.next = 23;
                                    break;
                                }
                                if (!((data === null || data === void 0 ? void 0 : data.status) === 200)) {
                                    _context2.next = 21;
                                    break;
                                }
                                if (!data.responseText.includes("www.reddit.com/login/")) {
                                    _context2.next = 14;
                                    break;
                                }
                                logStatus.error("Error:".concat(i18n("loginReddit")), true);
                                return _context2.abrupt("return", false);

                              case 14:
                                _ref = data.responseText.match(/"accessToken":"(.*?)","expires":"(.*?)"/) || [], 
                                _ref2 = _slicedToArray(_ref, 2), accessToken = _ref2[1];
                                if (!accessToken) {
                                    _context2.next = 19;
                                    break;
                                }
                                Reddit_classPrivateFieldGet(this, Reddit_auth).token = accessToken;
                                logStatus.success();
                                return _context2.abrupt("return", true);

                              case 19:
                                logStatus.error('Error: Parameter "accessToken" not found!');
                                return _context2.abrupt("return", false);

                              case 21:
                                logStatus.error("Error:".concat(data === null || data === void 0 ? void 0 : data.statusText, "(").concat(data === null || data === void 0 ? void 0 : data.status, ")"));
                                return _context2.abrupt("return", false);

                              case 23:
                                logStatus.error("".concat(result, ":").concat(statusText, "(").concat(status, ")"));
                                return _context2.abrupt("return", false);

                              case 27:
                                _context2.prev = 27;
                                _context2.t0 = _context2["catch"](0);
                                throwError(_context2.t0, "Reddit.updateToken");
                                return _context2.abrupt("return", false);

                              case 31:
                              case "end":
                                return _context2.stop();
                            }
                        }
                    }, _callee2, this, [ [ 0, 27 ] ]);
                }));
                function updateToken() {
                    return _updateToken.apply(this, arguments);
                }
                return updateToken;
            }()
        }, {
            key: "toggleTask",
            value: function() {
                var _toggleTask = Reddit_asyncToGenerator(regeneratorRuntime.mark(function _callee3(_ref3) {
                    var name, _ref3$doTask, doTask, type, logStatus, _yield$httpRequest2, result, statusText, status, data;
                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                        while (1) {
                            switch (_context3.prev = _context3.next) {
                              case 0:
                                name = _ref3.name, _ref3$doTask = _ref3.doTask, doTask = _ref3$doTask === void 0 ? true : _ref3$doTask;
                                _context3.prev = 1;
                                if (!(!doTask && this.whiteList.reddits.includes(name))) {
                                    _context3.next = 5;
                                    break;
                                }
                                scripts_echoLog({
                                    type: "whiteList",
                                    text: name
                                });
                                return _context3.abrupt("return", true);

                              case 5:
                                type = doTask ? "joinReddit" : "leaveReddit";
                                if (/^u_/.test(name)) {
                                    type = doTask ? "followRedditUser" : "unfollowRedditUser";
                                }
                                logStatus = scripts_echoLog({
                                    type: type,
                                    text: name
                                });
                                _context3.next = 10;
                                return tools_httpRequest({
                                    url: "https://oauth.reddit.com/api/subscribe?redditWebClient=desktop2x&app=desktop2x-client-production&raw_json=1&gilding_detail=1",
                                    method: "POST",
                                    headers: {
                                        authorization: "Bearer ".concat(Reddit_classPrivateFieldGet(this, Reddit_auth).token),
                                        "content-type": "application/x-www-form-urlencoded"
                                    },
                                    data: $.param({
                                        action: doTask ? "sub" : "unsub",
                                        sr_name: name,
                                        api_type: "json"
                                    })
                                });

                              case 10:
                                _yield$httpRequest2 = _context3.sent;
                                result = _yield$httpRequest2.result;
                                statusText = _yield$httpRequest2.statusText;
                                status = _yield$httpRequest2.status;
                                data = _yield$httpRequest2.data;
                                if (!(result === "Success")) {
                                    _context3.next = 22;
                                    break;
                                }
                                if (!((data === null || data === void 0 ? void 0 : data.status) === 200)) {
                                    _context3.next = 20;
                                    break;
                                }
                                logStatus.success();
                                if (doTask) this.tasks.reddits = unique([].concat(Reddit_toConsumableArray(this.tasks.reddits), [ name ]));
                                return _context3.abrupt("return", true);

                              case 20:
                                logStatus.error("Error:".concat(data === null || data === void 0 ? void 0 : data.statusText, "(").concat(data === null || data === void 0 ? void 0 : data.status, ")"));
                                return _context3.abrupt("return", false);

                              case 22:
                                logStatus.error("".concat(result, ":").concat(statusText, "(").concat(status, ")"));
                                return _context3.abrupt("return", false);

                              case 26:
                                _context3.prev = 26;
                                _context3.t0 = _context3["catch"](1);
                                throwError(_context3.t0, "Reddit.toggleTask");
                                return _context3.abrupt("return", false);

                              case 30:
                              case "end":
                                return _context3.stop();
                            }
                        }
                    }, _callee3, this, [ [ 1, 26 ] ]);
                }));
                function toggleTask(_x) {
                    return _toggleTask.apply(this, arguments);
                }
                return toggleTask;
            }()
        }, {
            key: "toggle",
            value: function() {
                var _toggle = Reddit_asyncToGenerator(regeneratorRuntime.mark(function _callee4(_ref4) {
                    var _ref4$doTask, doTask, _ref4$reddits, reddits, _ref4$redditLinks, redditLinks, prom, realReddits, _iterator, _step, name;
                    return regeneratorRuntime.wrap(function _callee4$(_context4) {
                        while (1) {
                            switch (_context4.prev = _context4.next) {
                              case 0:
                                _ref4$doTask = _ref4.doTask, doTask = _ref4$doTask === void 0 ? true : _ref4$doTask, 
                                _ref4$reddits = _ref4.reddits, reddits = _ref4$reddits === void 0 ? [] : _ref4$reddits, 
                                _ref4$redditLinks = _ref4.redditLinks, redditLinks = _ref4$redditLinks === void 0 ? [] : _ref4$redditLinks;
                                _context4.prev = 1;
                                prom = [];
                                realReddits = this.getRealParams("reddits", reddits, redditLinks, doTask, function(link) {
                                    var _link$match, _link$match2;
                                    var name = (_link$match = link.match(/https?:\/\/www\.reddit\.com\/r\/([^/]*)/)) === null || _link$match === void 0 ? void 0 : _link$match[1];
                                    var userName = (_link$match2 = link.match(/https?:\/\/www\.reddit\.com\/user\/([^/]*)/)) === null || _link$match2 === void 0 ? void 0 : _link$match2[1];
                                    if (userName) {
                                        return name || userName;
                                    }
                                    return name;
                                });
                                if (!(realReddits.length > 0)) {
                                    _context4.next = 23;
                                    break;
                                }
                                _iterator = Reddit_createForOfIteratorHelper(realReddits);
                                _context4.prev = 6;
                                _iterator.s();

                              case 8:
                                if ((_step = _iterator.n()).done) {
                                    _context4.next = 15;
                                    break;
                                }
                                name = _step.value;
                                prom.push(this.toggleTask({
                                    name: name,
                                    doTask: doTask
                                }));
                                _context4.next = 13;
                                return delay(1e3);

                              case 13:
                                _context4.next = 8;
                                break;

                              case 15:
                                _context4.next = 20;
                                break;

                              case 17:
                                _context4.prev = 17;
                                _context4.t0 = _context4["catch"](6);
                                _iterator.e(_context4.t0);

                              case 20:
                                _context4.prev = 20;
                                _iterator.f();
                                return _context4.finish(20);

                              case 23:
                                _context4.next = 25;
                                return Promise.all(prom).then(function() {
                                    return true;
                                });

                              case 25:
                                return _context4.abrupt("return", _context4.sent);

                              case 28:
                                _context4.prev = 28;
                                _context4.t1 = _context4["catch"](1);
                                throwError(_context4.t1, "Reddit.toggle");
                                return _context4.abrupt("return", false);

                              case 32:
                              case "end":
                                return _context4.stop();
                            }
                        }
                    }, _callee4, this, [ [ 1, 28 ], [ 6, 17, 20, 23 ] ]);
                }));
                function toggle(_x2) {
                    return _toggle.apply(this, arguments);
                }
                return toggle;
            }()
        } ]);
        return Reddit;
    }(social_Social);
    const social_Reddit = Reddit;
    function Twitch_typeof(obj) {
        "@babel/helpers - typeof";
        if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
            Twitch_typeof = function _typeof(obj) {
                return typeof obj;
            };
        } else {
            Twitch_typeof = function _typeof(obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
        }
        return Twitch_typeof(obj);
    }
    function Twitch_toConsumableArray(arr) {
        return Twitch_arrayWithoutHoles(arr) || Twitch_iterableToArray(arr) || Twitch_unsupportedIterableToArray(arr) || Twitch_nonIterableSpread();
    }
    function Twitch_nonIterableSpread() {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function Twitch_iterableToArray(iter) {
        if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
    }
    function Twitch_arrayWithoutHoles(arr) {
        if (Array.isArray(arr)) return Twitch_arrayLikeToArray(arr);
    }
    function Twitch_createForOfIteratorHelper(o, allowArrayLike) {
        var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
        if (!it) {
            if (Array.isArray(o) || (it = Twitch_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
                if (it) o = it;
                var i = 0;
                var F = function F() {};
                return {
                    s: F,
                    n: function n() {
                        if (i >= o.length) return {
                            done: true
                        };
                        return {
                            done: false,
                            value: o[i++]
                        };
                    },
                    e: function e(_e) {
                        throw _e;
                    },
                    f: F
                };
            }
            throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        var normalCompletion = true, didErr = false, err;
        return {
            s: function s() {
                it = it.call(o);
            },
            n: function n() {
                var step = it.next();
                normalCompletion = step.done;
                return step;
            },
            e: function e(_e2) {
                didErr = true;
                err = _e2;
            },
            f: function f() {
                try {
                    if (!normalCompletion && it["return"] != null) it["return"]();
                } finally {
                    if (didErr) throw err;
                }
            }
        };
    }
    function Twitch_unsupportedIterableToArray(o, minLen) {
        if (!o) return;
        if (typeof o === "string") return Twitch_arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor) n = o.constructor.name;
        if (n === "Map" || n === "Set") return Array.from(o);
        if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Twitch_arrayLikeToArray(o, minLen);
    }
    function Twitch_arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length) len = arr.length;
        for (var i = 0, arr2 = new Array(len); i < len; i++) {
            arr2[i] = arr[i];
        }
        return arr2;
    }
    function Twitch_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
        try {
            var info = gen[key](arg);
            var value = info.value;
        } catch (error) {
            reject(error);
            return;
        }
        if (info.done) {
            resolve(value);
        } else {
            Promise.resolve(value).then(_next, _throw);
        }
    }
    function Twitch_asyncToGenerator(fn) {
        return function() {
            var self = this, args = arguments;
            return new Promise(function(resolve, reject) {
                var gen = fn.apply(self, args);
                function _next(value) {
                    Twitch_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
                }
                function _throw(err) {
                    Twitch_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
                }
                _next(undefined);
            });
        };
    }
    function Twitch_classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }
    function Twitch_defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    function Twitch_createClass(Constructor, protoProps, staticProps) {
        if (protoProps) Twitch_defineProperties(Constructor.prototype, protoProps);
        if (staticProps) Twitch_defineProperties(Constructor, staticProps);
        return Constructor;
    }
    function Twitch_inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function");
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Twitch_setPrototypeOf(subClass, superClass);
    }
    function Twitch_setPrototypeOf(o, p) {
        Twitch_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
            o.__proto__ = p;
            return o;
        };
        return Twitch_setPrototypeOf(o, p);
    }
    function Twitch_createSuper(Derived) {
        var hasNativeReflectConstruct = Twitch_isNativeReflectConstruct();
        return function _createSuperInternal() {
            var Super = Twitch_getPrototypeOf(Derived), result;
            if (hasNativeReflectConstruct) {
                var NewTarget = Twitch_getPrototypeOf(this).constructor;
                result = Reflect.construct(Super, arguments, NewTarget);
            } else {
                result = Super.apply(this, arguments);
            }
            return Twitch_possibleConstructorReturn(this, result);
        };
    }
    function Twitch_possibleConstructorReturn(self, call) {
        if (call && (Twitch_typeof(call) === "object" || typeof call === "function")) {
            return call;
        } else if (call !== void 0) {
            throw new TypeError("Derived constructors may only return object or undefined");
        }
        return Twitch_assertThisInitialized(self);
    }
    function Twitch_assertThisInitialized(self) {
        if (self === void 0) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return self;
    }
    function Twitch_isNativeReflectConstruct() {
        if (typeof Reflect === "undefined" || !Reflect.construct) return false;
        if (Reflect.construct.sham) return false;
        if (typeof Proxy === "function") return true;
        try {
            Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
            return true;
        } catch (e) {
            return false;
        }
    }
    function Twitch_getPrototypeOf(o) {
        Twitch_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
        };
        return Twitch_getPrototypeOf(o);
    }
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
            throw new TypeError("Cannot initialize the same private elements twice on an object");
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
    function Twitch_classPrivateMethodGet(receiver, privateSet, fn) {
        if (!privateSet.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return fn;
    }
    function Twitch_classPrivateFieldGet(receiver, privateMap) {
        var descriptor = Twitch_classExtractFieldDescriptor(receiver, privateMap, "get");
        return Twitch_classApplyDescriptorGet(receiver, descriptor);
    }
    function Twitch_classApplyDescriptorGet(receiver, descriptor) {
        if (descriptor.get) {
            return descriptor.get.call(receiver);
        }
        return descriptor.value;
    }
    function Twitch_classPrivateFieldSet(receiver, privateMap, value) {
        var descriptor = Twitch_classExtractFieldDescriptor(receiver, privateMap, "set");
        Twitch_classApplyDescriptorSet(receiver, descriptor, value);
        return value;
    }
    function Twitch_classExtractFieldDescriptor(receiver, privateMap, action) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to " + action + " private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function Twitch_classApplyDescriptorSet(receiver, descriptor, value) {
        if (descriptor.set) {
            descriptor.set.call(receiver, value);
        } else {
            if (!descriptor.writable) {
                throw new TypeError("attempted to set read only private field");
            }
            descriptor.value = value;
        }
    }
    var Twitch_auth = new WeakMap();
    var Twitch_initialized = new WeakMap();
    var Twitch_verifyAuth = new WeakSet();
    var Twitch_updateAuth = new WeakSet();
    var _toggleChannel = new WeakSet();
    var _getChannelId = new WeakSet();
    var Twitch = function(_Social) {
        Twitch_inherits(Twitch, _Social);
        var _super = Twitch_createSuper(Twitch);
        function Twitch(id) {
            var _GM_getValue;
            var _this;
            Twitch_classCallCheck(this, Twitch);
            _this = _super.call(this);
            Twitch_classPrivateMethodInitSpec(Twitch_assertThisInitialized(_this), _getChannelId);
            Twitch_classPrivateMethodInitSpec(Twitch_assertThisInitialized(_this), _toggleChannel);
            Twitch_classPrivateMethodInitSpec(Twitch_assertThisInitialized(_this), Twitch_updateAuth);
            Twitch_classPrivateMethodInitSpec(Twitch_assertThisInitialized(_this), Twitch_verifyAuth);
            Twitch_defineProperty(Twitch_assertThisInitialized(_this), "tasks", void 0);
            Twitch_defineProperty(Twitch_assertThisInitialized(_this), "whiteList", void 0);
            Twitch_classPrivateFieldInitSpec(Twitch_assertThisInitialized(_this), Twitch_auth, {
                writable: true,
                value: void 0
            });
            Twitch_classPrivateFieldInitSpec(Twitch_assertThisInitialized(_this), Twitch_initialized, {
                writable: true,
                value: false
            });
            _this.tasks = GM_getValue("Twitch-".concat(id)) || {
                channels: []
            };
            _this.whiteList = ((_GM_getValue = GM_getValue("whiteList")) === null || _GM_getValue === void 0 ? void 0 : _GM_getValue.twitch) || {
                channels: []
            };
            Twitch_classPrivateFieldSet(Twitch_assertThisInitialized(_this), Twitch_auth, GM_getValue("twitchAuth") || {});
            return _this;
        }
        Twitch_createClass(Twitch, [ {
            key: "init",
            value: function() {
                var _init = Twitch_asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                    var isVerified;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                              case 0:
                                _context.prev = 0;
                                if (Twitch_classPrivateFieldGet(this, Twitch_auth).authToken) {
                                    _context.next = 9;
                                    break;
                                }
                                scripts_echoLog({
                                    type: "updateTwitchAuth"
                                });
                                _context.next = 5;
                                return Twitch_classPrivateMethodGet(this, Twitch_updateAuth, Twitch_updateAuth2).call(this);

                              case 5:
                                if (!_context.sent) {
                                    _context.next = 8;
                                    break;
                                }
                                Twitch_classPrivateFieldSet(this, Twitch_initialized, true);
                                return _context.abrupt("return", true);

                              case 8:
                                return _context.abrupt("return", false);

                              case 9:
                                _context.next = 11;
                                return Twitch_classPrivateMethodGet(this, Twitch_verifyAuth, Twitch_verifyAuth2).call(this);

                              case 11:
                                isVerified = _context.sent;
                                if (!isVerified) {
                                    _context.next = 16;
                                    break;
                                }
                                scripts_echoLog({
                                    text: "Init twitch success!"
                                });
                                Twitch_classPrivateFieldSet(this, Twitch_initialized, true);
                                return _context.abrupt("return", true);

                              case 16:
                                GM_setValue("twitchAuth", {
                                    auth: null
                                });
                                _context.next = 19;
                                return Twitch_classPrivateMethodGet(this, Twitch_updateAuth, Twitch_updateAuth2).call(this);

                              case 19:
                                if (!_context.sent) {
                                    _context.next = 23;
                                    break;
                                }
                                scripts_echoLog({
                                    text: "Init twitch success!"
                                });
                                Twitch_classPrivateFieldSet(this, Twitch_initialized, true);
                                return _context.abrupt("return", true);

                              case 23:
                                scripts_echoLog({
                                    text: "Init twitch failed!"
                                });
                                return _context.abrupt("return", false);

                              case 27:
                                _context.prev = 27;
                                _context.t0 = _context["catch"](0);
                                throwError(_context.t0, "Twitch.init");
                                return _context.abrupt("return", false);

                              case 31:
                              case "end":
                                return _context.stop();
                            }
                        }
                    }, _callee, this, [ [ 0, 27 ] ]);
                }));
                function init() {
                    return _init.apply(this, arguments);
                }
                return init;
            }()
        }, {
            key: "toggle",
            value: function() {
                var _toggle = Twitch_asyncToGenerator(regeneratorRuntime.mark(function _callee2(_ref) {
                    var _ref$doTask, doTask, _ref$channels, channels, _ref$channelLinks, channelLinks, prom, realChannels, _iterator, _step, channel;
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                              case 0:
                                _ref$doTask = _ref.doTask, doTask = _ref$doTask === void 0 ? true : _ref$doTask, 
                                _ref$channels = _ref.channels, channels = _ref$channels === void 0 ? [] : _ref$channels, 
                                _ref$channelLinks = _ref.channelLinks, channelLinks = _ref$channelLinks === void 0 ? [] : _ref$channelLinks;
                                _context2.prev = 1;
                                if (Twitch_classPrivateFieldGet(this, Twitch_initialized)) {
                                    _context2.next = 5;
                                    break;
                                }
                                scripts_echoLog({
                                    type: "text",
                                    text: "请先初始化"
                                });
                                return _context2.abrupt("return", false);

                              case 5:
                                prom = [];
                                realChannels = this.getRealParams("channels", channels, channelLinks, doTask, function(link) {
                                    var _link$match;
                                    return (_link$match = link.match(/https:\/\/www\.twitch\.tv\/(.+)/)) === null || _link$match === void 0 ? void 0 : _link$match[1];
                                });
                                if (!(realChannels.length > 0)) {
                                    _context2.next = 26;
                                    break;
                                }
                                _iterator = Twitch_createForOfIteratorHelper(realChannels);
                                _context2.prev = 9;
                                _iterator.s();

                              case 11:
                                if ((_step = _iterator.n()).done) {
                                    _context2.next = 18;
                                    break;
                                }
                                channel = _step.value;
                                prom.push(Twitch_classPrivateMethodGet(this, _toggleChannel, _toggleChannel2).call(this, {
                                    name: channel,
                                    doTask: doTask
                                }));
                                _context2.next = 16;
                                return delay(1e3);

                              case 16:
                                _context2.next = 11;
                                break;

                              case 18:
                                _context2.next = 23;
                                break;

                              case 20:
                                _context2.prev = 20;
                                _context2.t0 = _context2["catch"](9);
                                _iterator.e(_context2.t0);

                              case 23:
                                _context2.prev = 23;
                                _iterator.f();
                                return _context2.finish(23);

                              case 26:
                                return _context2.abrupt("return", Promise.all(prom).then(function() {
                                    return true;
                                }));

                              case 29:
                                _context2.prev = 29;
                                _context2.t1 = _context2["catch"](1);
                                throwError(_context2.t1, "Twitch.toggle");
                                return _context2.abrupt("return", false);

                              case 33:
                              case "end":
                                return _context2.stop();
                            }
                        }
                    }, _callee2, this, [ [ 1, 29 ], [ 9, 20, 23, 26 ] ]);
                }));
                function toggle(_x) {
                    return _toggle.apply(this, arguments);
                }
                return toggle;
            }()
        } ]);
        return Twitch;
    }(social_Social);
    function Twitch_verifyAuth2() {
        return Twitch_verifyAuth3.apply(this, arguments);
    }
    function Twitch_verifyAuth3() {
        Twitch_verifyAuth3 = Twitch_asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
            var logStatus, _yield$httpRequest, result, statusText, status, data, _data$response, _data$response$, _data$response$$data;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.prev = 0;
                        logStatus = scripts_echoLog({
                            type: "text",
                            text: "verifyTwitchAuth"
                        });
                        _context3.next = 4;
                        return tools_httpRequest({
                            url: "https://gql.twitch.tv/gql",
                            method: "POST",
                            dataType: "json",
                            headers: {
                                Authorization: "OAuth ".concat(Twitch_classPrivateFieldGet(this, Twitch_auth).authToken),
                                "Client-Id": Twitch_classPrivateFieldGet(this, Twitch_auth).clientId
                            },
                            data: '[{"operationName":"FrontPageNew_User","variables":{"limit":1},"extensions":{"persistedQuery":{"version":1,' + '"sha256Hash":"64bd07a2cbaca80699d62636d966cf6395a5d14a1f0a14282067dcb28b13eb11"}}}]'
                        });

                      case 4:
                        _yield$httpRequest = _context3.sent;
                        result = _yield$httpRequest.result;
                        statusText = _yield$httpRequest.statusText;
                        status = _yield$httpRequest.status;
                        data = _yield$httpRequest.data;
                        if (!(result === "Success")) {
                            _context3.next = 15;
                            break;
                        }
                        if (!((data === null || data === void 0 ? void 0 : data.status) === 200 && (_data$response = data.response) !== null && _data$response !== void 0 && (_data$response$ = _data$response[0]) !== null && _data$response$ !== void 0 && (_data$response$$data = _data$response$.data) !== null && _data$response$$data !== void 0 && _data$response$$data.currentUser)) {
                            _context3.next = 13;
                            break;
                        }
                        logStatus.success();
                        return _context3.abrupt("return", true);

                      case 13:
                        logStatus.error("Error:".concat(data === null || data === void 0 ? void 0 : data.statusText, "(").concat(data === null || data === void 0 ? void 0 : data.status, ")"));
                        return _context3.abrupt("return", false);

                      case 15:
                        logStatus.error("".concat(result, ":").concat(statusText, "(").concat(status, ")"));
                        return _context3.abrupt("return", false);

                      case 19:
                        _context3.prev = 19;
                        _context3.t0 = _context3["catch"](0);
                        throwError(_context3.t0, "Twitch.verifyAuth");
                        return _context3.abrupt("return", false);

                      case 23:
                      case "end":
                        return _context3.stop();
                    }
                }
            }, _callee3, this, [ [ 0, 19 ] ]);
        }));
        return Twitch_verifyAuth3.apply(this, arguments);
    }
    function Twitch_updateAuth2() {
        return Twitch_updateAuth3.apply(this, arguments);
    }
    function Twitch_updateAuth3() {
        Twitch_updateAuth3 = Twitch_asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
            var _this2 = this;
            var logStatus;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        _context5.prev = 0;
                        logStatus = scripts_echoLog({
                            type: "text",
                            text: "updateTwitchAuth"
                        });
                        _context5.next = 4;
                        return new Promise(function(resolve) {
                            var newTab = GM_openInTab("https://www.twitch.tv/#auth", {
                                active: true,
                                insert: true,
                                setParent: true
                            });
                            newTab.onclose = Twitch_asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
                                var auth;
                                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                                    while (1) {
                                        switch (_context4.prev = _context4.next) {
                                          case 0:
                                            auth = GM_getValue("twitchAuth");
                                            if (!auth) {
                                                _context4.next = 11;
                                                break;
                                            }
                                            Twitch_classPrivateFieldSet(_this2, Twitch_auth, auth);
                                            logStatus.success();
                                            _context4.t0 = resolve;
                                            _context4.next = 7;
                                            return Twitch_classPrivateMethodGet(_this2, Twitch_verifyAuth, Twitch_verifyAuth2).call(_this2);

                                          case 7:
                                            _context4.t1 = _context4.sent;
                                            (0, _context4.t0)(_context4.t1);
                                            _context4.next = 13;
                                            break;

                                          case 11:
                                            logStatus.error("Error: Update twitch auth failed!");
                                            resolve(false);

                                          case 13:
                                          case "end":
                                            return _context4.stop();
                                        }
                                    }
                                }, _callee4);
                            }));
                        });

                      case 4:
                        return _context5.abrupt("return", _context5.sent);

                      case 7:
                        _context5.prev = 7;
                        _context5.t0 = _context5["catch"](0);
                        throwError(_context5.t0, "Twitch.updateAuth");
                        return _context5.abrupt("return", false);

                      case 11:
                      case "end":
                        return _context5.stop();
                    }
                }
            }, _callee5, null, [ [ 0, 7 ] ]);
        }));
        return Twitch_updateAuth3.apply(this, arguments);
    }
    function _toggleChannel2(_x2) {
        return _toggleChannel3.apply(this, arguments);
    }
    function _toggleChannel3() {
        _toggleChannel3 = Twitch_asyncToGenerator(regeneratorRuntime.mark(function _callee6(_ref2) {
            var name, _ref2$doTask, doTask, channelId, logStatus, followData, unfollowData, _yield$httpRequest2, result, statusText, status, data;
            return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        name = _ref2.name, _ref2$doTask = _ref2.doTask, doTask = _ref2$doTask === void 0 ? true : _ref2$doTask;
                        _context6.prev = 1;
                        if (!(!doTask && this.whiteList.channels.includes(name))) {
                            _context6.next = 5;
                            break;
                        }
                        scripts_echoLog({
                            type: "whiteList",
                            text: name
                        });
                        return _context6.abrupt("return", true);

                      case 5:
                        _context6.next = 7;
                        return Twitch_classPrivateMethodGet(this, _getChannelId, _getChannelId2).call(this, name);

                      case 7:
                        channelId = _context6.sent;
                        if (channelId) {
                            _context6.next = 10;
                            break;
                        }
                        return _context6.abrupt("return", false);

                      case 10:
                        logStatus = scripts_echoLog({
                            type: "".concat(doTask ? "" : "un", "followTwitchChannel"),
                            text: name
                        });
                        followData = '[{"operationName":"FollowButton_FollowUser","variables":{"input":{"disableNotifications":false,"targetID":"'.concat(channelId) + '"}},"extensions":{"persistedQuery":{"version":1,"sha256Hash":"3efee1acda90efdff9fef6e6b4a29213be3ee490781c5b54469717b6131ffdfe"}}}]';
                        unfollowData = '[{"operationName":"FollowButton_UnfollowUser","variables":{"input":{"targetID":"'.concat(channelId, '"}},') + '"extensions":{"persistedQuery":{"version":1,"sha256Hash":"d7fbdb4e9780dcdc0cc1618ec783309471cd05a59584fc3c56ea1c52bb632d41"}}}]';
                        _context6.next = 15;
                        return tools_httpRequest({
                            url: "https://gql.twitch.tv/gql",
                            method: "POST",
                            dataType: "json",
                            headers: {
                                Authorization: "OAuth ".concat(Twitch_classPrivateFieldGet(this, Twitch_auth).authToken)
                            },
                            data: doTask ? followData : unfollowData
                        });

                      case 15:
                        _yield$httpRequest2 = _context6.sent;
                        result = _yield$httpRequest2.result;
                        statusText = _yield$httpRequest2.statusText;
                        status = _yield$httpRequest2.status;
                        data = _yield$httpRequest2.data;
                        if (!(result === "Success")) {
                            _context6.next = 27;
                            break;
                        }
                        if (!((data === null || data === void 0 ? void 0 : data.status) === 200)) {
                            _context6.next = 25;
                            break;
                        }
                        logStatus.success();
                        if (doTask) {
                            this.tasks.channels = unique([].concat(Twitch_toConsumableArray(this.tasks.channels), [ name ]));
                        }
                        return _context6.abrupt("return", true);

                      case 25:
                        logStatus.error("Error:".concat(data === null || data === void 0 ? void 0 : data.statusText, "(").concat(data === null || data === void 0 ? void 0 : data.status, ")"));
                        return _context6.abrupt("return", false);

                      case 27:
                        logStatus.error("".concat(result, ":").concat(statusText, "(").concat(status, ")"));
                        return _context6.abrupt("return", false);

                      case 31:
                        _context6.prev = 31;
                        _context6.t0 = _context6["catch"](1);
                        throwError(_context6.t0, "Twitch.toggleChannel");
                        return _context6.abrupt("return", false);

                      case 35:
                      case "end":
                        return _context6.stop();
                    }
                }
            }, _callee6, this, [ [ 1, 31 ] ]);
        }));
        return _toggleChannel3.apply(this, arguments);
    }
    function _getChannelId2(_x3) {
        return _getChannelId3.apply(this, arguments);
    }
    function _getChannelId3() {
        _getChannelId3 = Twitch_asyncToGenerator(regeneratorRuntime.mark(function _callee7(name) {
            var logStatus, _yield$httpRequest3, result, statusText, status, data, _data$response2, _data$response2$, _data$response2$$data, _data$response2$$data2, channelId;
            return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        _context7.prev = 0;
                        logStatus = scripts_echoLog({
                            type: "getTwitchChannelId",
                            text: name
                        });
                        _context7.next = 4;
                        return tools_httpRequest({
                            url: "https://gql.twitch.tv/gql",
                            method: "POST",
                            headers: {
                                Authorization: "OAuth ".concat(Twitch_classPrivateFieldGet(this, Twitch_auth).authToken),
                                "Client-Id": Twitch_classPrivateFieldGet(this, Twitch_auth).clientId
                            },
                            responseType: "json",
                            data: '[{"operationName":"ActiveWatchParty","variables":{"channelLogin":"'.concat(name, '"},') + '"extensions":{"persistedQuery":{"version":1,"sha256Hash":"4a8156c97b19e3a36e081cf6d6ddb5dbf9f9b02ae60e4d2ff26ed70aebc80a30"}}}]'
                        });

                      case 4:
                        _yield$httpRequest3 = _context7.sent;
                        result = _yield$httpRequest3.result;
                        statusText = _yield$httpRequest3.statusText;
                        status = _yield$httpRequest3.status;
                        data = _yield$httpRequest3.data;
                        if (!(result === "Success")) {
                            _context7.next = 19;
                            break;
                        }
                        if (!((data === null || data === void 0 ? void 0 : data.status) === 200)) {
                            _context7.next = 17;
                            break;
                        }
                        channelId = String((_data$response2 = data.response) === null || _data$response2 === void 0 ? void 0 : (_data$response2$ = _data$response2[0]) === null || _data$response2$ === void 0 ? void 0 : (_data$response2$$data = _data$response2$.data) === null || _data$response2$$data === void 0 ? void 0 : (_data$response2$$data2 = _data$response2$$data.user) === null || _data$response2$$data2 === void 0 ? void 0 : _data$response2$$data2.id);
                        if (!channelId) {
                            _context7.next = 15;
                            break;
                        }
                        logStatus.success();
                        return _context7.abrupt("return", channelId);

                      case 15:
                        logStatus.error("Error:".concat(data.statusText, "(").concat(data.status, ")"));
                        return _context7.abrupt("return", false);

                      case 17:
                        logStatus.error("Error:".concat(data === null || data === void 0 ? void 0 : data.statusText, "(").concat(data === null || data === void 0 ? void 0 : data.status, ")"));
                        return _context7.abrupt("return", false);

                      case 19:
                        logStatus.error("".concat(result, ":").concat(statusText, "(").concat(status, ")"));
                        return _context7.abrupt("return", false);

                      case 23:
                        _context7.prev = 23;
                        _context7.t0 = _context7["catch"](0);
                        throwError(_context7.t0, "Twitch.getChannelId");
                        return _context7.abrupt("return", false);

                      case 27:
                      case "end":
                        return _context7.stop();
                    }
                }
            }, _callee7, this, [ [ 0, 23 ] ]);
        }));
        return _getChannelId3.apply(this, arguments);
    }
    const social_Twitch = Twitch;
    function Twitter_typeof(obj) {
        "@babel/helpers - typeof";
        if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
            Twitter_typeof = function _typeof(obj) {
                return typeof obj;
            };
        } else {
            Twitter_typeof = function _typeof(obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
        }
        return Twitter_typeof(obj);
    }
    function Twitter_toConsumableArray(arr) {
        return Twitter_arrayWithoutHoles(arr) || Twitter_iterableToArray(arr) || Twitter_unsupportedIterableToArray(arr) || Twitter_nonIterableSpread();
    }
    function Twitter_nonIterableSpread() {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function Twitter_iterableToArray(iter) {
        if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
    }
    function Twitter_arrayWithoutHoles(arr) {
        if (Array.isArray(arr)) return Twitter_arrayLikeToArray(arr);
    }
    function Twitter_createForOfIteratorHelper(o, allowArrayLike) {
        var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
        if (!it) {
            if (Array.isArray(o) || (it = Twitter_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
                if (it) o = it;
                var i = 0;
                var F = function F() {};
                return {
                    s: F,
                    n: function n() {
                        if (i >= o.length) return {
                            done: true
                        };
                        return {
                            done: false,
                            value: o[i++]
                        };
                    },
                    e: function e(_e) {
                        throw _e;
                    },
                    f: F
                };
            }
            throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        var normalCompletion = true, didErr = false, err;
        return {
            s: function s() {
                it = it.call(o);
            },
            n: function n() {
                var step = it.next();
                normalCompletion = step.done;
                return step;
            },
            e: function e(_e2) {
                didErr = true;
                err = _e2;
            },
            f: function f() {
                try {
                    if (!normalCompletion && it["return"] != null) it["return"]();
                } finally {
                    if (didErr) throw err;
                }
            }
        };
    }
    function Twitter_unsupportedIterableToArray(o, minLen) {
        if (!o) return;
        if (typeof o === "string") return Twitter_arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor) n = o.constructor.name;
        if (n === "Map" || n === "Set") return Array.from(o);
        if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Twitter_arrayLikeToArray(o, minLen);
    }
    function Twitter_arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length) len = arr.length;
        for (var i = 0, arr2 = new Array(len); i < len; i++) {
            arr2[i] = arr[i];
        }
        return arr2;
    }
    function Twitter_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
        try {
            var info = gen[key](arg);
            var value = info.value;
        } catch (error) {
            reject(error);
            return;
        }
        if (info.done) {
            resolve(value);
        } else {
            Promise.resolve(value).then(_next, _throw);
        }
    }
    function Twitter_asyncToGenerator(fn) {
        return function() {
            var self = this, args = arguments;
            return new Promise(function(resolve, reject) {
                var gen = fn.apply(self, args);
                function _next(value) {
                    Twitter_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
                }
                function _throw(err) {
                    Twitter_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
                }
                _next(undefined);
            });
        };
    }
    function Twitter_classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }
    function Twitter_defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    function Twitter_createClass(Constructor, protoProps, staticProps) {
        if (protoProps) Twitter_defineProperties(Constructor.prototype, protoProps);
        if (staticProps) Twitter_defineProperties(Constructor, staticProps);
        return Constructor;
    }
    function Twitter_inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function");
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Twitter_setPrototypeOf(subClass, superClass);
    }
    function Twitter_setPrototypeOf(o, p) {
        Twitter_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
            o.__proto__ = p;
            return o;
        };
        return Twitter_setPrototypeOf(o, p);
    }
    function Twitter_createSuper(Derived) {
        var hasNativeReflectConstruct = Twitter_isNativeReflectConstruct();
        return function _createSuperInternal() {
            var Super = Twitter_getPrototypeOf(Derived), result;
            if (hasNativeReflectConstruct) {
                var NewTarget = Twitter_getPrototypeOf(this).constructor;
                result = Reflect.construct(Super, arguments, NewTarget);
            } else {
                result = Super.apply(this, arguments);
            }
            return Twitter_possibleConstructorReturn(this, result);
        };
    }
    function Twitter_possibleConstructorReturn(self, call) {
        if (call && (Twitter_typeof(call) === "object" || typeof call === "function")) {
            return call;
        } else if (call !== void 0) {
            throw new TypeError("Derived constructors may only return object or undefined");
        }
        return Twitter_assertThisInitialized(self);
    }
    function Twitter_assertThisInitialized(self) {
        if (self === void 0) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return self;
    }
    function Twitter_isNativeReflectConstruct() {
        if (typeof Reflect === "undefined" || !Reflect.construct) return false;
        if (Reflect.construct.sham) return false;
        if (typeof Proxy === "function") return true;
        try {
            Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
            return true;
        } catch (e) {
            return false;
        }
    }
    function Twitter_getPrototypeOf(o) {
        Twitter_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
        };
        return Twitter_getPrototypeOf(o);
    }
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
            throw new TypeError("Cannot initialize the same private elements twice on an object");
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
            throw new TypeError("attempted to get private field on non-instance");
        }
        return fn;
    }
    function Twitter_classPrivateFieldGet(receiver, privateMap) {
        var descriptor = Twitter_classExtractFieldDescriptor(receiver, privateMap, "get");
        return Twitter_classApplyDescriptorGet(receiver, descriptor);
    }
    function Twitter_classApplyDescriptorGet(receiver, descriptor) {
        if (descriptor.get) {
            return descriptor.get.call(receiver);
        }
        return descriptor.value;
    }
    function Twitter_classPrivateFieldSet(receiver, privateMap, value) {
        var descriptor = Twitter_classExtractFieldDescriptor(receiver, privateMap, "set");
        Twitter_classApplyDescriptorSet(receiver, descriptor, value);
        return value;
    }
    function Twitter_classExtractFieldDescriptor(receiver, privateMap, action) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to " + action + " private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function Twitter_classApplyDescriptorSet(receiver, descriptor, value) {
        if (descriptor.set) {
            descriptor.set.call(receiver, value);
        } else {
            if (!descriptor.writable) {
                throw new TypeError("attempted to set read only private field");
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
    var Twitter = function(_Social) {
        Twitter_inherits(Twitter, _Social);
        var _super = Twitter_createSuper(Twitter);
        function Twitter(id, verifyId) {
            var _GM_getValue;
            var _this;
            Twitter_classCallCheck(this, Twitter);
            _this = _super.call(this);
            Twitter_classPrivateMethodInitSpec(Twitter_assertThisInitialized(_this), _toggleRetweet);
            Twitter_classPrivateMethodInitSpec(Twitter_assertThisInitialized(_this), _getUserId);
            Twitter_classPrivateMethodInitSpec(Twitter_assertThisInitialized(_this), _toggleUser);
            Twitter_classPrivateMethodInitSpec(Twitter_assertThisInitialized(_this), Twitter_updateAuth);
            Twitter_classPrivateMethodInitSpec(Twitter_assertThisInitialized(_this), Twitter_verifyAuth);
            Twitter_defineProperty(Twitter_assertThisInitialized(_this), "tasks", void 0);
            Twitter_defineProperty(Twitter_assertThisInitialized(_this), "whiteList", void 0);
            Twitter_classPrivateFieldInitSpec(Twitter_assertThisInitialized(_this), _verifyId, {
                writable: true,
                value: "783214"
            });
            Twitter_classPrivateFieldInitSpec(Twitter_assertThisInitialized(_this), Twitter_auth, {
                writable: true,
                value: void 0
            });
            Twitter_classPrivateFieldInitSpec(Twitter_assertThisInitialized(_this), Twitter_initialized, {
                writable: true,
                value: false
            });
            _this.tasks = GM_getValue("Twitter-".concat(id)) || {
                users: [],
                retweets: [],
                likes: []
            };
            _this.whiteList = ((_GM_getValue = GM_getValue("whiteList")) === null || _GM_getValue === void 0 ? void 0 : _GM_getValue.twitter) || {
                users: [],
                retweets: [],
                likes: []
            };
            Twitter_classPrivateFieldSet(Twitter_assertThisInitialized(_this), Twitter_auth, GM_getValue("twitterAuth") || {});
            if (verifyId) {
                Twitter_classPrivateFieldSet(Twitter_assertThisInitialized(_this), _verifyId, verifyId);
            }
            return _this;
        }
        Twitter_createClass(Twitter, [ {
            key: "init",
            value: function() {
                var _init = Twitter_asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                    var isVerified;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                              case 0:
                                _context.prev = 0;
                                if (Twitter_classPrivateFieldGet(this, Twitter_auth).ct0) {
                                    _context.next = 9;
                                    break;
                                }
                                scripts_echoLog({
                                    type: "updateTwitterAuth"
                                });
                                _context.next = 5;
                                return Twitter_classPrivateMethodGet(this, Twitter_updateAuth, Twitter_updateAuth2).call(this);

                              case 5:
                                if (!_context.sent) {
                                    _context.next = 8;
                                    break;
                                }
                                Twitter_classPrivateFieldSet(this, Twitter_initialized, true);
                                return _context.abrupt("return", true);

                              case 8:
                                return _context.abrupt("return", false);

                              case 9:
                                _context.next = 11;
                                return Twitter_classPrivateMethodGet(this, Twitter_verifyAuth, Twitter_verifyAuth2).call(this);

                              case 11:
                                isVerified = _context.sent;
                                if (!isVerified) {
                                    _context.next = 16;
                                    break;
                                }
                                scripts_echoLog({
                                    text: "Init twitter success!"
                                });
                                Twitter_classPrivateFieldSet(this, Twitter_initialized, true);
                                return _context.abrupt("return", true);

                              case 16:
                                GM_setValue("twitterAuth", {
                                    auth: null
                                });
                                _context.next = 19;
                                return Twitter_classPrivateMethodGet(this, Twitter_updateAuth, Twitter_updateAuth2).call(this);

                              case 19:
                                if (!_context.sent) {
                                    _context.next = 23;
                                    break;
                                }
                                scripts_echoLog({
                                    text: "Init twitter success!"
                                });
                                Twitter_classPrivateFieldSet(this, Twitter_initialized, true);
                                return _context.abrupt("return", true);

                              case 23:
                                scripts_echoLog({
                                    text: "Init twitter failed!"
                                });
                                return _context.abrupt("return", false);

                              case 27:
                                _context.prev = 27;
                                _context.t0 = _context["catch"](0);
                                throwError(_context.t0, "Twitter.init");
                                return _context.abrupt("return", false);

                              case 31:
                              case "end":
                                return _context.stop();
                            }
                        }
                    }, _callee, this, [ [ 0, 27 ] ]);
                }));
                function init() {
                    return _init.apply(this, arguments);
                }
                return init;
            }()
        }, {
            key: "toggle",
            value: function() {
                var _toggle = Twitter_asyncToGenerator(regeneratorRuntime.mark(function _callee2(_ref) {
                    var _ref$doTask, doTask, _ref$users, users, _ref$userLinks, userLinks, _ref$retweets, retweets, _ref$retweetLinks, retweetLinks, prom, realUsers, realRetweets, _iterator, _step, user, _iterator2, _step2, retweet;
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                              case 0:
                                _ref$doTask = _ref.doTask, doTask = _ref$doTask === void 0 ? true : _ref$doTask, 
                                _ref$users = _ref.users, users = _ref$users === void 0 ? [] : _ref$users, _ref$userLinks = _ref.userLinks, 
                                userLinks = _ref$userLinks === void 0 ? [] : _ref$userLinks, _ref$retweets = _ref.retweets, 
                                retweets = _ref$retweets === void 0 ? [] : _ref$retweets, _ref$retweetLinks = _ref.retweetLinks, 
                                retweetLinks = _ref$retweetLinks === void 0 ? [] : _ref$retweetLinks;
                                _context2.prev = 1;
                                if (Twitter_classPrivateFieldGet(this, Twitter_initialized)) {
                                    _context2.next = 5;
                                    break;
                                }
                                scripts_echoLog({
                                    type: "text",
                                    text: "请先初始化"
                                });
                                return _context2.abrupt("return", false);

                              case 5:
                                prom = [];
                                realUsers = this.getRealParams("users", users, userLinks, doTask, function(link) {
                                    var _link$match;
                                    return (_link$match = link.match(/https:\/\/twitter\.com\/(.+)/)) === null || _link$match === void 0 ? void 0 : _link$match[1];
                                });
                                realRetweets = this.getRealParams("retweets", retweets, retweetLinks, doTask, function(link) {
                                    var _link$match2;
                                    return (_link$match2 = link.match(/https:\/\/twitter\.com\/.*?\/status\/([\d]+)/)) === null || _link$match2 === void 0 ? void 0 : _link$match2[1];
                                });
                                if (!(realUsers.length > 0)) {
                                    _context2.next = 27;
                                    break;
                                }
                                _iterator = Twitter_createForOfIteratorHelper(realUsers);
                                _context2.prev = 10;
                                _iterator.s();

                              case 12:
                                if ((_step = _iterator.n()).done) {
                                    _context2.next = 19;
                                    break;
                                }
                                user = _step.value;
                                prom.push(Twitter_classPrivateMethodGet(this, _toggleUser, _toggleUser2).call(this, {
                                    name: user,
                                    doTask: doTask
                                }));
                                _context2.next = 17;
                                return delay(1e3);

                              case 17:
                                _context2.next = 12;
                                break;

                              case 19:
                                _context2.next = 24;
                                break;

                              case 21:
                                _context2.prev = 21;
                                _context2.t0 = _context2["catch"](10);
                                _iterator.e(_context2.t0);

                              case 24:
                                _context2.prev = 24;
                                _iterator.f();
                                return _context2.finish(24);

                              case 27:
                                if (!(realRetweets.length > 0)) {
                                    _context2.next = 46;
                                    break;
                                }
                                _iterator2 = Twitter_createForOfIteratorHelper(realRetweets);
                                _context2.prev = 29;
                                _iterator2.s();

                              case 31:
                                if ((_step2 = _iterator2.n()).done) {
                                    _context2.next = 38;
                                    break;
                                }
                                retweet = _step2.value;
                                prom.push(Twitter_classPrivateMethodGet(this, _toggleRetweet, _toggleRetweet2).call(this, {
                                    retweetId: retweet,
                                    doTask: doTask
                                }));
                                _context2.next = 36;
                                return delay(1e3);

                              case 36:
                                _context2.next = 31;
                                break;

                              case 38:
                                _context2.next = 43;
                                break;

                              case 40:
                                _context2.prev = 40;
                                _context2.t1 = _context2["catch"](29);
                                _iterator2.e(_context2.t1);

                              case 43:
                                _context2.prev = 43;
                                _iterator2.f();
                                return _context2.finish(43);

                              case 46:
                                return _context2.abrupt("return", Promise.all(prom).then(function() {
                                    return true;
                                }));

                              case 49:
                                _context2.prev = 49;
                                _context2.t2 = _context2["catch"](1);
                                throwError(_context2.t2, "Twitter.toggle");
                                return _context2.abrupt("return", false);

                              case 53:
                              case "end":
                                return _context2.stop();
                            }
                        }
                    }, _callee2, this, [ [ 1, 49 ], [ 10, 21, 24, 27 ], [ 29, 40, 43, 46 ] ]);
                }));
                function toggle(_x) {
                    return _toggle.apply(this, arguments);
                }
                return toggle;
            }()
        } ]);
        return Twitter;
    }(social_Social);
    function Twitter_verifyAuth2() {
        return Twitter_verifyAuth3.apply(this, arguments);
    }
    function Twitter_verifyAuth3() {
        Twitter_verifyAuth3 = Twitter_asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.prev = 0;
                        _context3.next = 3;
                        return Twitter_classPrivateMethodGet(this, _toggleUser, _toggleUser2).call(this, {
                            name: "verify",
                            doTask: true,
                            verify: true
                        });

                      case 3:
                        return _context3.abrupt("return", _context3.sent);

                      case 6:
                        _context3.prev = 6;
                        _context3.t0 = _context3["catch"](0);
                        throwError(_context3.t0, "Twitter.verifyAuth");
                        return _context3.abrupt("return", false);

                      case 10:
                      case "end":
                        return _context3.stop();
                    }
                }
            }, _callee3, this, [ [ 0, 6 ] ]);
        }));
        return Twitter_verifyAuth3.apply(this, arguments);
    }
    function Twitter_updateAuth2() {
        return Twitter_updateAuth3.apply(this, arguments);
    }
    function Twitter_updateAuth3() {
        Twitter_updateAuth3 = Twitter_asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
            var _this2 = this;
            var logStatus;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        _context5.prev = 0;
                        logStatus = scripts_echoLog({
                            type: "text",
                            text: "updateTwitterAuth"
                        });
                        _context5.next = 4;
                        return new Promise(function(resolve) {
                            var newTab = GM_openInTab("https://twitter.com/settings/account?k#auth", {
                                active: true,
                                insert: true,
                                setParent: true
                            });
                            newTab.onclose = Twitter_asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
                                var auth;
                                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                                    while (1) {
                                        switch (_context4.prev = _context4.next) {
                                          case 0:
                                            auth = GM_getValue("twitterAuth");
                                            if (!auth) {
                                                _context4.next = 11;
                                                break;
                                            }
                                            Twitter_classPrivateFieldSet(_this2, Twitter_auth, auth);
                                            logStatus.success();
                                            _context4.t0 = resolve;
                                            _context4.next = 7;
                                            return Twitter_classPrivateMethodGet(_this2, Twitter_verifyAuth, Twitter_verifyAuth2).call(_this2);

                                          case 7:
                                            _context4.t1 = _context4.sent;
                                            (0, _context4.t0)(_context4.t1);
                                            _context4.next = 13;
                                            break;

                                          case 11:
                                            logStatus.error("Error: Update twitter auth failed!");
                                            resolve(false);

                                          case 13:
                                          case "end":
                                            return _context4.stop();
                                        }
                                    }
                                }, _callee4);
                            }));
                        });

                      case 4:
                        return _context5.abrupt("return", _context5.sent);

                      case 7:
                        _context5.prev = 7;
                        _context5.t0 = _context5["catch"](0);
                        throwError(_context5.t0, "Twitter.updateToken");
                        return _context5.abrupt("return", false);

                      case 11:
                      case "end":
                        return _context5.stop();
                    }
                }
            }, _callee5, null, [ [ 0, 7 ] ]);
        }));
        return Twitter_updateAuth3.apply(this, arguments);
    }
    function _toggleUser2(_x2) {
        return _toggleUser3.apply(this, arguments);
    }
    function _toggleUser3() {
        _toggleUser3 = Twitter_asyncToGenerator(regeneratorRuntime.mark(function _callee6(_ref2) {
            var name, _ref2$doTask, doTask, _ref2$verify, verify, userId, logStatus, _yield$httpRequest, result, statusText, status, data, _data$response, _data$response$errors, _data$response$errors2;
            return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        name = _ref2.name, _ref2$doTask = _ref2.doTask, doTask = _ref2$doTask === void 0 ? true : _ref2$doTask, 
                        _ref2$verify = _ref2.verify, verify = _ref2$verify === void 0 ? false : _ref2$verify;
                        _context6.prev = 1;
                        if (!(!doTask && !verify && this.whiteList.users.includes(name))) {
                            _context6.next = 5;
                            break;
                        }
                        scripts_echoLog({
                            type: "whiteList",
                            text: name
                        });
                        return _context6.abrupt("return", true);

                      case 5:
                        if (!verify) {
                            _context6.next = 9;
                            break;
                        }
                        _context6.t0 = Twitter_classPrivateFieldGet(this, _verifyId);
                        _context6.next = 12;
                        break;

                      case 9:
                        _context6.next = 11;
                        return Twitter_classPrivateMethodGet(this, _getUserId, _getUserId2).call(this, name);

                      case 11:
                        _context6.t0 = _context6.sent;

                      case 12:
                        userId = _context6.t0;
                        if (userId) {
                            _context6.next = 15;
                            break;
                        }
                        return _context6.abrupt("return", false);

                      case 15:
                        logStatus = verify ? scripts_echoLog({
                            type: "text",
                            text: "verifyTwitterAuth"
                        }) : scripts_echoLog({
                            type: "".concat(doTask ? "" : "un", "followTwitterUser"),
                            text: name
                        });
                        _context6.next = 18;
                        return tools_httpRequest({
                            url: "https://api.twitter.com/1.1/friendships/".concat(doTask ? "create" : "destroy", ".json"),
                            method: "POST",
                            headers: {
                                authorization: "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA",
                                "Content-Type": "application/x-www-form-urlencoded",
                                "x-csrf-token": Twitter_classPrivateFieldGet(this, Twitter_auth).ct0
                            },
                            responseType: "json",
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

                      case 18:
                        _yield$httpRequest = _context6.sent;
                        result = _yield$httpRequest.result;
                        statusText = _yield$httpRequest.statusText;
                        status = _yield$httpRequest.status;
                        data = _yield$httpRequest.data;
                        if (!(result === "Success")) {
                            _context6.next = 33;
                            break;
                        }
                        if (!((data === null || data === void 0 ? void 0 : data.status) === 200)) {
                            _context6.next = 28;
                            break;
                        }
                        logStatus.success();
                        if (doTask && !verify) {
                            this.tasks.users = unique([].concat(Twitter_toConsumableArray(this.tasks.users), [ name ]));
                        }
                        return _context6.abrupt("return", true);

                      case 28:
                        if (!(verify && (data === null || data === void 0 ? void 0 : data.status) === 403 && ((_data$response = data.response) === null || _data$response === void 0 ? void 0 : (_data$response$errors = _data$response.errors) === null || _data$response$errors === void 0 ? void 0 : (_data$response$errors2 = _data$response$errors[0]) === null || _data$response$errors2 === void 0 ? void 0 : _data$response$errors2.code) === 158)) {
                            _context6.next = 31;
                            break;
                        }
                        logStatus.success();
                        return _context6.abrupt("return", true);

                      case 31:
                        logStatus.error("Error:".concat(data === null || data === void 0 ? void 0 : data.statusText, "(").concat(data === null || data === void 0 ? void 0 : data.status, ")"));
                        return _context6.abrupt("return", false);

                      case 33:
                        logStatus.error("".concat(result, ":").concat(statusText, "(").concat(status, ")"));
                        return _context6.abrupt("return", false);

                      case 37:
                        _context6.prev = 37;
                        _context6.t1 = _context6["catch"](1);
                        throwError(_context6.t1, "Twitter.toggleUser");
                        return _context6.abrupt("return", false);

                      case 41:
                      case "end":
                        return _context6.stop();
                    }
                }
            }, _callee6, this, [ [ 1, 37 ] ]);
        }));
        return _toggleUser3.apply(this, arguments);
    }
    function _getUserId2(_x3) {
        return _getUserId3.apply(this, arguments);
    }
    function _getUserId3() {
        _getUserId3 = Twitter_asyncToGenerator(regeneratorRuntime.mark(function _callee7(name) {
            var logStatus, _yield$httpRequest2, result, statusText, status, data, _response, _response$data, _response$data$user, response, userId;
            return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        _context7.prev = 0;
                        logStatus = scripts_echoLog({
                            type: "getTwitterUserId",
                            text: name
                        });
                        _context7.next = 4;
                        return tools_httpRequest({
                            url: "https://api.twitter.com/graphql/-xfUfZsnR_zqjFd-IfrN5A/UserByScreenName" + "?variables=%7B%22screen_name%22%3A%22".concat(name, "%22%2C%22withHighlightedLabel%22%3Atrue%7D"),
                            method: "GET",
                            headers: {
                                authorization: "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA",
                                "content-type": "application/json"
                            },
                            responseType: "json",
                            anonymous: true
                        });

                      case 4:
                        _yield$httpRequest2 = _context7.sent;
                        result = _yield$httpRequest2.result;
                        statusText = _yield$httpRequest2.statusText;
                        status = _yield$httpRequest2.status;
                        data = _yield$httpRequest2.data;
                        if (!(result === "Success")) {
                            _context7.next = 21;
                            break;
                        }
                        if (!((data === null || data === void 0 ? void 0 : data.status) === 200)) {
                            _context7.next = 19;
                            break;
                        }
                        response = data.response || (Twitter_typeof(data.responseText) === "object" ? data.responseText : null);
                        if (!response) {
                            try {
                                response = JSON.parse(data.responseText);
                            } catch (error) {
                                response = null;
                            }
                        }
                        userId = String((_response = response) === null || _response === void 0 ? void 0 : (_response$data = _response.data) === null || _response$data === void 0 ? void 0 : (_response$data$user = _response$data.user) === null || _response$data$user === void 0 ? void 0 : _response$data$user.rest_id);
                        if (!userId) {
                            _context7.next = 17;
                            break;
                        }
                        logStatus.success();
                        return _context7.abrupt("return", userId);

                      case 17:
                        logStatus.error("Error:".concat(data.statusText, "(").concat(data.status, ")"));
                        return _context7.abrupt("return", false);

                      case 19:
                        logStatus.error("Error:".concat(data === null || data === void 0 ? void 0 : data.statusText, "(").concat(data === null || data === void 0 ? void 0 : data.status, ")"));
                        return _context7.abrupt("return", false);

                      case 21:
                        logStatus.error("".concat(result, ":").concat(statusText, "(").concat(status, ")"));
                        return _context7.abrupt("return", false);

                      case 25:
                        _context7.prev = 25;
                        _context7.t0 = _context7["catch"](0);
                        throwError(_context7.t0, "Twitter.getUserId");
                        return _context7.abrupt("return", false);

                      case 29:
                      case "end":
                        return _context7.stop();
                    }
                }
            }, _callee7, null, [ [ 0, 25 ] ]);
        }));
        return _getUserId3.apply(this, arguments);
    }
    function _toggleRetweet2(_x4) {
        return _toggleRetweet3.apply(this, arguments);
    }
    function _toggleRetweet3() {
        _toggleRetweet3 = Twitter_asyncToGenerator(regeneratorRuntime.mark(function _callee8(_ref3) {
            var retweetId, _ref3$doTask, doTask, logStatus, _yield$httpRequest3, result, statusText, status, data, _data$response2, _data$response2$error, _data$response2$error2;
            return regeneratorRuntime.wrap(function _callee8$(_context8) {
                while (1) {
                    switch (_context8.prev = _context8.next) {
                      case 0:
                        retweetId = _ref3.retweetId, _ref3$doTask = _ref3.doTask, doTask = _ref3$doTask === void 0 ? true : _ref3$doTask;
                        _context8.prev = 1;
                        if (!(!doTask && this.whiteList.retweets.includes(retweetId))) {
                            _context8.next = 5;
                            break;
                        }
                        scripts_echoLog({
                            type: "whiteList",
                            text: retweetId
                        });
                        return _context8.abrupt("return", true);

                      case 5:
                        logStatus = scripts_echoLog({
                            type: "".concat(doTask ? "" : "un", "retweet"),
                            text: retweetId
                        });
                        _context8.next = 8;
                        return tools_httpRequest({
                            url: "https://api.twitter.com/1.1/statuses/".concat(doTask ? "" : "un", "retweet.json"),
                            method: "POST",
                            headers: {
                                authorization: "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA",
                                "Content-Type": "application/x-www-form-urlencoded",
                                "x-csrf-token": Twitter_classPrivateFieldGet(this, Twitter_auth).ct0
                            },
                            data: $.param({
                                tweet_mode: "extended",
                                id: retweetId
                            }),
                            responseType: "json"
                        });

                      case 8:
                        _yield$httpRequest3 = _context8.sent;
                        result = _yield$httpRequest3.result;
                        statusText = _yield$httpRequest3.statusText;
                        status = _yield$httpRequest3.status;
                        data = _yield$httpRequest3.data;
                        if (!(result === "Success")) {
                            _context8.next = 20;
                            break;
                        }
                        if (!((data === null || data === void 0 ? void 0 : data.status) === 200 || (data === null || data === void 0 ? void 0 : data.status) === 403 && ((_data$response2 = data.response) === null || _data$response2 === void 0 ? void 0 : (_data$response2$error = _data$response2.errors) === null || _data$response2$error === void 0 ? void 0 : (_data$response2$error2 = _data$response2$error[0]) === null || _data$response2$error2 === void 0 ? void 0 : _data$response2$error2.code) === 327)) {
                            _context8.next = 18;
                            break;
                        }
                        logStatus.success();
                        if (doTask) this.tasks.retweets = unique([].concat(Twitter_toConsumableArray(this.tasks.retweets), [ retweetId ]));
                        return _context8.abrupt("return", true);

                      case 18:
                        logStatus.error("Error:".concat(data === null || data === void 0 ? void 0 : data.statusText, "(").concat(data === null || data === void 0 ? void 0 : data.status, ")"));
                        return _context8.abrupt("return", false);

                      case 20:
                        logStatus.error("".concat(result, ":").concat(statusText, "(").concat(status, ")"));
                        return _context8.abrupt("return", false);

                      case 24:
                        _context8.prev = 24;
                        _context8.t0 = _context8["catch"](1);
                        throwError(_context8.t0, "Twitter.toggleRetweet");
                        return _context8.abrupt("return", false);

                      case 28:
                      case "end":
                        return _context8.stop();
                    }
                }
            }, _callee8, this, [ [ 1, 24 ] ]);
        }));
        return _toggleRetweet3.apply(this, arguments);
    }
    const social_Twitter = Twitter;
    function Vk_typeof(obj) {
        "@babel/helpers - typeof";
        if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
            Vk_typeof = function _typeof(obj) {
                return typeof obj;
            };
        } else {
            Vk_typeof = function _typeof(obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
        }
        return Vk_typeof(obj);
    }
    function Vk_slicedToArray(arr, i) {
        return Vk_arrayWithHoles(arr) || Vk_iterableToArrayLimit(arr, i) || Vk_unsupportedIterableToArray(arr, i) || Vk_nonIterableRest();
    }
    function Vk_nonIterableRest() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function Vk_iterableToArrayLimit(arr, i) {
        var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
        if (_i == null) return;
        var _arr = [];
        var _n = true;
        var _d = false;
        var _s, _e;
        try {
            for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
                _arr.push(_s.value);
                if (i && _arr.length === i) break;
            }
        } catch (err) {
            _d = true;
            _e = err;
        } finally {
            try {
                if (!_n && _i["return"] != null) _i["return"]();
            } finally {
                if (_d) throw _e;
            }
        }
        return _arr;
    }
    function Vk_arrayWithHoles(arr) {
        if (Array.isArray(arr)) return arr;
    }
    function Vk_toConsumableArray(arr) {
        return Vk_arrayWithoutHoles(arr) || Vk_iterableToArray(arr) || Vk_unsupportedIterableToArray(arr) || Vk_nonIterableSpread();
    }
    function Vk_nonIterableSpread() {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function Vk_iterableToArray(iter) {
        if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
    }
    function Vk_arrayWithoutHoles(arr) {
        if (Array.isArray(arr)) return Vk_arrayLikeToArray(arr);
    }
    function Vk_createForOfIteratorHelper(o, allowArrayLike) {
        var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
        if (!it) {
            if (Array.isArray(o) || (it = Vk_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
                if (it) o = it;
                var i = 0;
                var F = function F() {};
                return {
                    s: F,
                    n: function n() {
                        if (i >= o.length) return {
                            done: true
                        };
                        return {
                            done: false,
                            value: o[i++]
                        };
                    },
                    e: function e(_e2) {
                        throw _e2;
                    },
                    f: F
                };
            }
            throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        var normalCompletion = true, didErr = false, err;
        return {
            s: function s() {
                it = it.call(o);
            },
            n: function n() {
                var step = it.next();
                normalCompletion = step.done;
                return step;
            },
            e: function e(_e3) {
                didErr = true;
                err = _e3;
            },
            f: function f() {
                try {
                    if (!normalCompletion && it["return"] != null) it["return"]();
                } finally {
                    if (didErr) throw err;
                }
            }
        };
    }
    function Vk_unsupportedIterableToArray(o, minLen) {
        if (!o) return;
        if (typeof o === "string") return Vk_arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor) n = o.constructor.name;
        if (n === "Map" || n === "Set") return Array.from(o);
        if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Vk_arrayLikeToArray(o, minLen);
    }
    function Vk_arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length) len = arr.length;
        for (var i = 0, arr2 = new Array(len); i < len; i++) {
            arr2[i] = arr[i];
        }
        return arr2;
    }
    function Vk_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
        try {
            var info = gen[key](arg);
            var value = info.value;
        } catch (error) {
            reject(error);
            return;
        }
        if (info.done) {
            resolve(value);
        } else {
            Promise.resolve(value).then(_next, _throw);
        }
    }
    function Vk_asyncToGenerator(fn) {
        return function() {
            var self = this, args = arguments;
            return new Promise(function(resolve, reject) {
                var gen = fn.apply(self, args);
                function _next(value) {
                    Vk_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
                }
                function _throw(err) {
                    Vk_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
                }
                _next(undefined);
            });
        };
    }
    function Vk_classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }
    function Vk_defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    function Vk_createClass(Constructor, protoProps, staticProps) {
        if (protoProps) Vk_defineProperties(Constructor.prototype, protoProps);
        if (staticProps) Vk_defineProperties(Constructor, staticProps);
        return Constructor;
    }
    function Vk_inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function");
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Vk_setPrototypeOf(subClass, superClass);
    }
    function Vk_setPrototypeOf(o, p) {
        Vk_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
            o.__proto__ = p;
            return o;
        };
        return Vk_setPrototypeOf(o, p);
    }
    function Vk_createSuper(Derived) {
        var hasNativeReflectConstruct = Vk_isNativeReflectConstruct();
        return function _createSuperInternal() {
            var Super = Vk_getPrototypeOf(Derived), result;
            if (hasNativeReflectConstruct) {
                var NewTarget = Vk_getPrototypeOf(this).constructor;
                result = Reflect.construct(Super, arguments, NewTarget);
            } else {
                result = Super.apply(this, arguments);
            }
            return Vk_possibleConstructorReturn(this, result);
        };
    }
    function Vk_possibleConstructorReturn(self, call) {
        if (call && (Vk_typeof(call) === "object" || typeof call === "function")) {
            return call;
        } else if (call !== void 0) {
            throw new TypeError("Derived constructors may only return object or undefined");
        }
        return Vk_assertThisInitialized(self);
    }
    function Vk_assertThisInitialized(self) {
        if (self === void 0) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return self;
    }
    function Vk_isNativeReflectConstruct() {
        if (typeof Reflect === "undefined" || !Reflect.construct) return false;
        if (Reflect.construct.sham) return false;
        if (typeof Proxy === "function") return true;
        try {
            Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
            return true;
        } catch (e) {
            return false;
        }
    }
    function Vk_getPrototypeOf(o) {
        Vk_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
        };
        return Vk_getPrototypeOf(o);
    }
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
            throw new TypeError("Cannot initialize the same private elements twice on an object");
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
        var descriptor = Vk_classExtractFieldDescriptor(receiver, privateMap, "get");
        return Vk_classApplyDescriptorGet(receiver, descriptor);
    }
    function Vk_classApplyDescriptorGet(receiver, descriptor) {
        if (descriptor.get) {
            return descriptor.get.call(receiver);
        }
        return descriptor.value;
    }
    function Vk_classPrivateMethodGet(receiver, privateSet, fn) {
        if (!privateSet.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return fn;
    }
    function Vk_classPrivateFieldSet(receiver, privateMap, value) {
        var descriptor = Vk_classExtractFieldDescriptor(receiver, privateMap, "set");
        Vk_classApplyDescriptorSet(receiver, descriptor, value);
        return value;
    }
    function Vk_classExtractFieldDescriptor(receiver, privateMap, action) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to " + action + " private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function Vk_classApplyDescriptorSet(receiver, descriptor, value) {
        if (descriptor.set) {
            descriptor.set.call(receiver, value);
        } else {
            if (!descriptor.writable) {
                throw new TypeError("attempted to set read only private field");
            }
            descriptor.value = value;
        }
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
    var Vk = function(_Social) {
        Vk_inherits(Vk, _Social);
        var _super = Vk_createSuper(Vk);
        function Vk(id) {
            var _GM_getValue;
            var _this;
            Vk_classCallCheck(this, Vk);
            _this = _super.call(this);
            Vk_classPrivateMethodInitSpec(Vk_assertThisInitialized(_this), Vk_addId);
            Vk_classPrivateMethodInitSpec(Vk_assertThisInitialized(_this), _toggleVk);
            Vk_classPrivateMethodInitSpec(Vk_assertThisInitialized(_this), _getId);
            Vk_classPrivateMethodInitSpec(Vk_assertThisInitialized(_this), _deleteWall);
            Vk_classPrivateMethodInitSpec(Vk_assertThisInitialized(_this), _sendWall);
            Vk_classPrivateMethodInitSpec(Vk_assertThisInitialized(_this), _togglePublic);
            Vk_classPrivateMethodInitSpec(Vk_assertThisInitialized(_this), _toggleGroup);
            Vk_classPrivateMethodInitSpec(Vk_assertThisInitialized(_this), Vk_verifyAuth);
            Vk_defineProperty(Vk_assertThisInitialized(_this), "tasks", void 0);
            Vk_defineProperty(Vk_assertThisInitialized(_this), "whiteList", void 0);
            Vk_classPrivateFieldInitSpec(Vk_assertThisInitialized(_this), _username, {
                writable: true,
                value: ""
            });
            Vk_classPrivateFieldInitSpec(Vk_assertThisInitialized(_this), Vk_cache, {
                writable: true,
                value: void 0
            });
            Vk_classPrivateFieldInitSpec(Vk_assertThisInitialized(_this), Vk_initialized, {
                writable: true,
                value: false
            });
            _this.tasks = GM_getValue("Vk-".concat(id)) || {
                names: []
            };
            _this.whiteList = ((_GM_getValue = GM_getValue("whiteList")) === null || _GM_getValue === void 0 ? void 0 : _GM_getValue.vk) || {
                names: []
            };
            Vk_classPrivateFieldSet(Vk_assertThisInitialized(_this), Vk_cache, GM_getValue("vkCache") || {});
            return _this;
        }
        Vk_createClass(Vk, [ {
            key: "init",
            value: function() {
                var _init = Vk_asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                    var isVerified;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                              case 0:
                                _context.prev = 0;
                                _context.next = 3;
                                return Vk_classPrivateMethodGet(this, Vk_verifyAuth, Vk_verifyAuth2).call(this);

                              case 3:
                                isVerified = _context.sent;
                                if (!isVerified) {
                                    _context.next = 8;
                                    break;
                                }
                                scripts_echoLog({
                                    text: "Init vk success!"
                                });
                                Vk_classPrivateFieldSet(this, Vk_initialized, true);
                                return _context.abrupt("return", true);

                              case 8:
                                scripts_echoLog({
                                    text: "Init vk failed!"
                                });
                                return _context.abrupt("return", false);

                              case 12:
                                _context.prev = 12;
                                _context.t0 = _context["catch"](0);
                                throwError(_context.t0, "Vk.init");
                                return _context.abrupt("return", false);

                              case 16:
                              case "end":
                                return _context.stop();
                            }
                        }
                    }, _callee, this, [ [ 0, 12 ] ]);
                }));
                function init() {
                    return _init.apply(this, arguments);
                }
                return init;
            }()
        }, {
            key: "toggle",
            value: function() {
                var _toggle = Vk_asyncToGenerator(regeneratorRuntime.mark(function _callee2(_ref) {
                    var _ref$doTask, doTask, _ref$names, names, _ref$nameLinks, nameLinks, prom, realNames, _iterator, _step, name;
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                              case 0:
                                _ref$doTask = _ref.doTask, doTask = _ref$doTask === void 0 ? true : _ref$doTask, 
                                _ref$names = _ref.names, names = _ref$names === void 0 ? [] : _ref$names, _ref$nameLinks = _ref.nameLinks, 
                                nameLinks = _ref$nameLinks === void 0 ? [] : _ref$nameLinks;
                                _context2.prev = 1;
                                if (Vk_classPrivateFieldGet(this, Vk_initialized)) {
                                    _context2.next = 5;
                                    break;
                                }
                                scripts_echoLog({
                                    type: "text",
                                    text: "请先初始化"
                                });
                                return _context2.abrupt("return", false);

                              case 5:
                                prom = [];
                                realNames = this.getRealParams("names", names, nameLinks, doTask, function(link) {
                                    var _link$match;
                                    return (_link$match = link.match(/https:\/\/vk\.com\/([^/]+)/)) === null || _link$match === void 0 ? void 0 : _link$match[1];
                                });
                                if (!(realNames.length > 0)) {
                                    _context2.next = 26;
                                    break;
                                }
                                _iterator = Vk_createForOfIteratorHelper(realNames);
                                _context2.prev = 9;
                                _iterator.s();

                              case 11:
                                if ((_step = _iterator.n()).done) {
                                    _context2.next = 18;
                                    break;
                                }
                                name = _step.value;
                                prom.push(Vk_classPrivateMethodGet(this, _toggleVk, _toggleVk2).call(this, {
                                    name: name,
                                    doTask: doTask
                                }));
                                _context2.next = 16;
                                return delay(1e3);

                              case 16:
                                _context2.next = 11;
                                break;

                              case 18:
                                _context2.next = 23;
                                break;

                              case 20:
                                _context2.prev = 20;
                                _context2.t0 = _context2["catch"](9);
                                _iterator.e(_context2.t0);

                              case 23:
                                _context2.prev = 23;
                                _iterator.f();
                                return _context2.finish(23);

                              case 26:
                                return _context2.abrupt("return", Promise.all(prom).then(function() {
                                    return true;
                                }));

                              case 29:
                                _context2.prev = 29;
                                _context2.t1 = _context2["catch"](1);
                                throwError(_context2.t1, "Vk.toggle");
                                return _context2.abrupt("return", false);

                              case 33:
                              case "end":
                                return _context2.stop();
                            }
                        }
                    }, _callee2, this, [ [ 1, 29 ], [ 9, 20, 23, 26 ] ]);
                }));
                function toggle(_x) {
                    return _toggle.apply(this, arguments);
                }
                return toggle;
            }()
        } ]);
        return Vk;
    }(social_Social);
    function Vk_verifyAuth2() {
        return Vk_verifyAuth3.apply(this, arguments);
    }
    function Vk_verifyAuth3() {
        Vk_verifyAuth3 = Vk_asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
            var logStatus, _yield$httpRequest, result, statusText, status, data, _data$responseText$ma;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.prev = 0;
                        logStatus = scripts_echoLog({
                            type: "text",
                            text: "verifyVkLogin"
                        });
                        _context3.next = 4;
                        return tools_httpRequest({
                            url: "https://vk.com/im",
                            method: "GET"
                        });

                      case 4:
                        _yield$httpRequest = _context3.sent;
                        result = _yield$httpRequest.result;
                        statusText = _yield$httpRequest.statusText;
                        status = _yield$httpRequest.status;
                        data = _yield$httpRequest.data;
                        if (!(result === "Success")) {
                            _context3.next = 19;
                            break;
                        }
                        if (!(data !== null && data !== void 0 && data.finalUrl.includes("vk.com/login"))) {
                            _context3.next = 13;
                            break;
                        }
                        logStatus.error("Error:".concat(i18n("loginVk")), true);
                        return _context3.abrupt("return", false);

                      case 13:
                        if (!((data === null || data === void 0 ? void 0 : data.status) === 200)) {
                            _context3.next = 17;
                            break;
                        }
                        Vk_classPrivateFieldSet(this, _username, ((_data$responseText$ma = data.responseText.match(/TopNavBtn__profileLink" href="\/(.*?)"/)) === null || _data$responseText$ma === void 0 ? void 0 : _data$responseText$ma[1]) || "");
                        logStatus.success();
                        return _context3.abrupt("return", true);

                      case 17:
                        logStatus.error("Error:".concat(data === null || data === void 0 ? void 0 : data.statusText, "(").concat(data === null || data === void 0 ? void 0 : data.status, ")"));
                        return _context3.abrupt("return", false);

                      case 19:
                        logStatus.error("".concat(result, ":").concat(statusText, "(").concat(status, ")"));
                        return _context3.abrupt("return", false);

                      case 23:
                        _context3.prev = 23;
                        _context3.t0 = _context3["catch"](0);
                        throwError(_context3.t0, "Vk.verifyAuth");
                        return _context3.abrupt("return", false);

                      case 27:
                      case "end":
                        return _context3.stop();
                    }
                }
            }, _callee3, this, [ [ 0, 23 ] ]);
        }));
        return Vk_verifyAuth3.apply(this, arguments);
    }
    function _toggleGroup2(_x2, _x3) {
        return _toggleGroup3.apply(this, arguments);
    }
    function _toggleGroup3() {
        _toggleGroup3 = Vk_asyncToGenerator(regeneratorRuntime.mark(function _callee4(name, dataParam) {
            var doTask, logStatus, reqData, _yield$httpRequest2, result, statusText, status, data, _args4 = arguments;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        doTask = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : true;
                        _context4.prev = 1;
                        logStatus = scripts_echoLog({
                            type: doTask ? "joinVkGroup" : "leaveVkGroup",
                            text: name
                        });
                        if (!(dataParam.groupAct === "enter" && !doTask || dataParam.groupAct === "leave" && doTask)) {
                            _context4.next = 6;
                            break;
                        }
                        logStatus.success();
                        return _context4.abrupt("return", true);

                      case 6:
                        reqData = {
                            act: doTask ? "enter" : "leave",
                            al: 1,
                            gid: dataParam.groupId,
                            hash: dataParam.groupHash
                        };
                        if (doTask) reqData.context = "_";
                        _context4.next = 10;
                        return tools_httpRequest({
                            url: "https://vk.com/al_groups.php",
                            method: "POST",
                            headers: {
                                origin: "https://vk.com",
                                referer: "https://vk.com/".concat(name),
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            data: $.param(reqData)
                        });

                      case 10:
                        _yield$httpRequest2 = _context4.sent;
                        result = _yield$httpRequest2.result;
                        statusText = _yield$httpRequest2.statusText;
                        status = _yield$httpRequest2.status;
                        data = _yield$httpRequest2.data;
                        if (!(result === "Success")) {
                            _context4.next = 22;
                            break;
                        }
                        if (!((data === null || data === void 0 ? void 0 : data.status) === 200)) {
                            _context4.next = 20;
                            break;
                        }
                        logStatus.success();
                        if (doTask) this.tasks.names = unique([].concat(Vk_toConsumableArray(this.tasks.names), [ name ]));
                        return _context4.abrupt("return", true);

                      case 20:
                        logStatus.error("Error:".concat(data === null || data === void 0 ? void 0 : data.statusText, "(").concat(data === null || data === void 0 ? void 0 : data.status, ")"));
                        return _context4.abrupt("return", false);

                      case 22:
                        logStatus.error("".concat(result, ":").concat(statusText, "(").concat(status, ")"));
                        return _context4.abrupt("return", false);

                      case 26:
                        _context4.prev = 26;
                        _context4.t0 = _context4["catch"](1);
                        throwError(_context4.t0, "Vk.toggleGroup");
                        return _context4.abrupt("return", false);

                      case 30:
                      case "end":
                        return _context4.stop();
                    }
                }
            }, _callee4, this, [ [ 1, 26 ] ]);
        }));
        return _toggleGroup3.apply(this, arguments);
    }
    function _togglePublic2(_x4, _x5) {
        return _togglePublic3.apply(this, arguments);
    }
    function _togglePublic3() {
        _togglePublic3 = Vk_asyncToGenerator(regeneratorRuntime.mark(function _callee5(name, dataParam) {
            var doTask, logStatus, _yield$httpRequest3, result, statusText, status, data, _args5 = arguments;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        doTask = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : true;
                        _context5.prev = 1;
                        logStatus = scripts_echoLog({
                            type: doTask ? "joinVkPublic" : "leaveVkPublic",
                            text: name
                        });
                        if (!(dataParam.publicJoined && doTask || !dataParam.publicJoined && !doTask)) {
                            _context5.next = 6;
                            break;
                        }
                        logStatus.success();
                        return _context5.abrupt("return", true);

                      case 6:
                        _context5.next = 8;
                        return tools_httpRequest({
                            url: "https://vk.com/al_public.php",
                            method: "POST",
                            headers: {
                                origin: "https://vk.com",
                                referer: "https://vk.com/".concat(name),
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            data: $.param({
                                act: doTask ? "a_enter" : "a_leave",
                                al: 1,
                                pid: dataParam.publicPid,
                                hash: dataParam.publicHash
                            })
                        });

                      case 8:
                        _yield$httpRequest3 = _context5.sent;
                        result = _yield$httpRequest3.result;
                        statusText = _yield$httpRequest3.statusText;
                        status = _yield$httpRequest3.status;
                        data = _yield$httpRequest3.data;
                        if (!(result === "Success")) {
                            _context5.next = 20;
                            break;
                        }
                        if (!((data === null || data === void 0 ? void 0 : data.status) === 200)) {
                            _context5.next = 18;
                            break;
                        }
                        logStatus.success();
                        if (doTask) this.tasks.names = unique([].concat(Vk_toConsumableArray(this.tasks.names), [ name ]));
                        return _context5.abrupt("return", true);

                      case 18:
                        logStatus.error("Error:".concat(data === null || data === void 0 ? void 0 : data.statusText, "(").concat(data === null || data === void 0 ? void 0 : data.status, ")"));
                        return _context5.abrupt("return", false);

                      case 20:
                        logStatus.error("".concat(result, ":").concat(statusText, "(").concat(status, ")"));
                        return _context5.abrupt("return", false);

                      case 24:
                        _context5.prev = 24;
                        _context5.t0 = _context5["catch"](1);
                        throwError(_context5.t0, "Vk.togglePublic");
                        return _context5.abrupt("return", false);

                      case 28:
                      case "end":
                        return _context5.stop();
                    }
                }
            }, _callee5, this, [ [ 1, 24 ] ]);
        }));
        return _togglePublic3.apply(this, arguments);
    }
    function _sendWall2(_x6) {
        return _sendWall3.apply(this, arguments);
    }
    function _sendWall3() {
        _sendWall3 = Vk_asyncToGenerator(regeneratorRuntime.mark(function _callee6(name) {
            var logStatus, _yield$httpRequest4, result, statusText, status, data, _data$responseText$ma2, hash, _yield$httpRequest5, resultR, statusTextR, statusR, dataR, _dataR$responseText, _jsonData$payload, _jsonData$payload$, _jsonData$payload$$, jsonData, _jsonData$payload2, _jsonData$payload2$, _jsonData$payload2$$, _jsonData$payload3, _jsonData$payload3$, _jsonData$payload3$$, postId, ownerId;
            return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        _context6.prev = 0;
                        logStatus = scripts_echoLog({
                            type: "sendVkWall",
                            text: name
                        });
                        _context6.next = 4;
                        return tools_httpRequest({
                            url: "https://vk.com/like.php",
                            method: "POST",
                            headers: {
                                origin: "https://vk.com",
                                referer: "https://vk.com/".concat(name),
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            data: $.param({
                                act: "publish_box",
                                al: 1,
                                object: name
                            })
                        });

                      case 4:
                        _yield$httpRequest4 = _context6.sent;
                        result = _yield$httpRequest4.result;
                        statusText = _yield$httpRequest4.statusText;
                        status = _yield$httpRequest4.status;
                        data = _yield$httpRequest4.data;
                        if (!(result === "Success")) {
                            _context6.next = 38;
                            break;
                        }
                        if (!((data === null || data === void 0 ? void 0 : data.status) === 200)) {
                            _context6.next = 36;
                            break;
                        }
                        hash = (_data$responseText$ma2 = data.responseText.match(/shHash:[\s]*'(.*?)'/)) === null || _data$responseText$ma2 === void 0 ? void 0 : _data$responseText$ma2[1];
                        if (!hash) {
                            _context6.next = 34;
                            break;
                        }
                        _context6.next = 15;
                        return tools_httpRequest({
                            url: "https://vk.com/like.php",
                            method: "POST",
                            headers: {
                                origin: "https://vk.com",
                                referer: "https://vk.com/".concat(name),
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            data: $.param({
                                Message: "",
                                act: "a_do_publish",
                                al: 1,
                                close_comments: 0,
                                friends_only: 0,
                                from: "box",
                                hash: hash,
                                list: "",
                                mark_as_ads: 0,
                                mute_notifications: 0,
                                object: name,
                                ret_data: 1,
                                to: 0
                            })
                        });

                      case 15:
                        _yield$httpRequest5 = _context6.sent;
                        resultR = _yield$httpRequest5.result;
                        statusTextR = _yield$httpRequest5.statusText;
                        statusR = _yield$httpRequest5.status;
                        dataR = _yield$httpRequest5.data;
                        if (!(resultR === "Success")) {
                            _context6.next = 32;
                            break;
                        }
                        if (!((dataR === null || dataR === void 0 ? void 0 : dataR.status) === 200)) {
                            _context6.next = 30;
                            break;
                        }
                        jsonData = JSON.parse(((_dataR$responseText = dataR.responseText) === null || _dataR$responseText === void 0 ? void 0 : _dataR$responseText.replace("\x3c!--", "")) || "{}");
                        if (!((jsonData === null || jsonData === void 0 ? void 0 : (_jsonData$payload = jsonData.payload) === null || _jsonData$payload === void 0 ? void 0 : (_jsonData$payload$ = _jsonData$payload[1]) === null || _jsonData$payload$ === void 0 ? void 0 : (_jsonData$payload$$ = _jsonData$payload$[1]) === null || _jsonData$payload$$ === void 0 ? void 0 : _jsonData$payload$$.share_my) === true)) {
                            _context6.next = 30;
                            break;
                        }
                        logStatus.success();
                        postId = String(jsonData === null || jsonData === void 0 ? void 0 : (_jsonData$payload2 = jsonData.payload) === null || _jsonData$payload2 === void 0 ? void 0 : (_jsonData$payload2$ = _jsonData$payload2[1]) === null || _jsonData$payload2$ === void 0 ? void 0 : (_jsonData$payload2$$ = _jsonData$payload2$[1]) === null || _jsonData$payload2$$ === void 0 ? void 0 : _jsonData$payload2$$.post_id);
                        ownerId = String(jsonData === null || jsonData === void 0 ? void 0 : (_jsonData$payload3 = jsonData.payload) === null || _jsonData$payload3 === void 0 ? void 0 : (_jsonData$payload3$ = _jsonData$payload3[1]) === null || _jsonData$payload3$ === void 0 ? void 0 : (_jsonData$payload3$$ = _jsonData$payload3$[1]) === null || _jsonData$payload3$$ === void 0 ? void 0 : _jsonData$payload3$$.owner_id);
                        if (postId && ownerId) {
                            Vk_classPrivateMethodGet(this, Vk_addId, Vk_addId2).call(this, name, "".concat(ownerId, "_").concat(postId));
                        }
                        this.tasks.names = unique([].concat(Vk_toConsumableArray(this.tasks.names), [ name ]));
                        return _context6.abrupt("return", true);

                      case 30:
                        logStatus.error("Error:".concat(dataR === null || dataR === void 0 ? void 0 : dataR.statusText, "(").concat(dataR === null || dataR === void 0 ? void 0 : dataR.status, ")"));
                        return _context6.abrupt("return", false);

                      case 32:
                        logStatus.error("".concat(resultR, ":").concat(statusTextR, "(").concat(statusR, ")"));
                        return _context6.abrupt("return", false);

                      case 34:
                        logStatus.error('Error: Get "hash" failed');
                        return _context6.abrupt("return", false);

                      case 36:
                        logStatus.error("Error:".concat(data === null || data === void 0 ? void 0 : data.statusText, "(").concat(data === null || data === void 0 ? void 0 : data.status, ")"));
                        return _context6.abrupt("return", false);

                      case 38:
                        logStatus.error("".concat(result, ":").concat(statusText, "(").concat(status, ")"));
                        return _context6.abrupt("return", false);

                      case 42:
                        _context6.prev = 42;
                        _context6.t0 = _context6["catch"](0);
                        throwError(_context6.t0, "Vk.sendWall");
                        return _context6.abrupt("return", false);

                      case 46:
                      case "end":
                        return _context6.stop();
                    }
                }
            }, _callee6, this, [ [ 0, 42 ] ]);
        }));
        return _sendWall3.apply(this, arguments);
    }
    function _deleteWall2(_x7, _x8) {
        return _deleteWall3.apply(this, arguments);
    }
    function _deleteWall3() {
        _deleteWall3 = Vk_asyncToGenerator(regeneratorRuntime.mark(function _callee7(name, dataParams) {
            var logStatus, _yield$httpRequest6, result, statusText, status, data, _data$responseText, _jsonData$payload4, _jsonData$payload4$, jsonData;
            return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        _context7.prev = 0;
                        logStatus = scripts_echoLog({
                            type: "deleteVkWall",
                            text: name
                        });
                        _context7.next = 4;
                        return tools_httpRequest({
                            url: "https://vk.com/al_wall.php?act=delete",
                            method: "POST",
                            headers: {
                                origin: "https://vk.com",
                                referer: "https://vk.com/".concat(Vk_classPrivateFieldGet(this, _username), "?w=wall").concat(Vk_classPrivateFieldGet(this, Vk_cache)[name], "%2Fall"),
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            data: $.param({
                                act: "delete",
                                al: 1,
                                confirm: 0,
                                from: "wkview",
                                hash: dataParams.wallHash,
                                post: Vk_classPrivateFieldGet(this, Vk_cache)[name]
                            })
                        });

                      case 4:
                        _yield$httpRequest6 = _context7.sent;
                        result = _yield$httpRequest6.result;
                        statusText = _yield$httpRequest6.statusText;
                        status = _yield$httpRequest6.status;
                        data = _yield$httpRequest6.data;
                        if (!(result === "Success")) {
                            _context7.next = 19;
                            break;
                        }
                        if (!((data === null || data === void 0 ? void 0 : data.status) === 200)) {
                            _context7.next = 17;
                            break;
                        }
                        jsonData = JSON.parse(((_data$responseText = data.responseText) === null || _data$responseText === void 0 ? void 0 : _data$responseText.replace("\x3c!--", "")) || "{}");
                        if (!(jsonData !== null && jsonData !== void 0 && (_jsonData$payload4 = jsonData.payload) !== null && _jsonData$payload4 !== void 0 && (_jsonData$payload4$ = _jsonData$payload4[1]) !== null && _jsonData$payload4$ !== void 0 && _jsonData$payload4$[1])) {
                            _context7.next = 15;
                            break;
                        }
                        logStatus.success();
                        return _context7.abrupt("return", true);

                      case 15:
                        logStatus.error("Error:".concat(data === null || data === void 0 ? void 0 : data.statusText, "(").concat(data === null || data === void 0 ? void 0 : data.status, ")"));
                        return _context7.abrupt("return", false);

                      case 17:
                        logStatus.error("Error:".concat(data === null || data === void 0 ? void 0 : data.statusText, "(").concat(data === null || data === void 0 ? void 0 : data.status, ")"));
                        return _context7.abrupt("return", false);

                      case 19:
                        logStatus.error("".concat(result, ":").concat(statusText, "(").concat(status, ")"));
                        return _context7.abrupt("return", false);

                      case 23:
                        _context7.prev = 23;
                        _context7.t0 = _context7["catch"](0);
                        throwError(_context7.t0, "Vk.deleteWall");
                        return _context7.abrupt("return", false);

                      case 27:
                      case "end":
                        return _context7.stop();
                    }
                }
            }, _callee7, this, [ [ 0, 23 ] ]);
        }));
        return _deleteWall3.apply(this, arguments);
    }
    function _getId2(_x9, _x10) {
        return _getId3.apply(this, arguments);
    }
    function _getId3() {
        _getId3 = Vk_asyncToGenerator(regeneratorRuntime.mark(function _callee8(name, doTask) {
            var url, logStatus, _yield$httpRequest7, result, statusText, status, data, _data$responseText$ma3, _data$responseText$ma4, _ref3, _ref4, groupAct, groupId, groupHash, publicHash, publicPid, publicJoined, _data$responseText$ma5, wallHash;
            return regeneratorRuntime.wrap(function _callee8$(_context8) {
                while (1) {
                    switch (_context8.prev = _context8.next) {
                      case 0:
                        _context8.prev = 0;
                        url = "https://vk.com/".concat(name);
                        if (!/^wall-/.test(name)) {
                            _context8.next = 8;
                            break;
                        }
                        if (!doTask) {
                            _context8.next = 5;
                            break;
                        }
                        return _context8.abrupt("return", {
                            type: "sendWall"
                        });

                      case 5:
                        if (Vk_classPrivateFieldGet(this, Vk_cache)[name]) {
                            _context8.next = 7;
                            break;
                        }
                        return _context8.abrupt("return", {
                            type: "unSupport"
                        });

                      case 7:
                        url = "https://vk.com/".concat(Vk_classPrivateFieldGet(this, _username), "?w=wall").concat(Vk_classPrivateFieldGet(this, Vk_cache)[name]);

                      case 8:
                        logStatus = scripts_echoLog({
                            type: "getVkId",
                            text: name
                        });
                        _context8.next = 11;
                        return tools_httpRequest({
                            url: url,
                            method: "GET"
                        });

                      case 11:
                        _yield$httpRequest7 = _context8.sent;
                        result = _yield$httpRequest7.result;
                        statusText = _yield$httpRequest7.statusText;
                        status = _yield$httpRequest7.status;
                        data = _yield$httpRequest7.data;
                        if (!(result === "Success")) {
                            _context8.next = 46;
                            break;
                        }
                        if (!((data === null || data === void 0 ? void 0 : data.status) === 200)) {
                            _context8.next = 44;
                            break;
                        }
                        _ref3 = data.responseText.match(/Groups.(enter|leave)\(.*?,.*?([\d]+?), '(.*?)'/) || [], 
                        _ref4 = Vk_slicedToArray(_ref3, 4), groupAct = _ref4[1], groupId = _ref4[2], groupHash = _ref4[3];
                        publicHash = (_data$responseText$ma3 = data.responseText.match(/"enterHash":"(.*?)"/)) === null || _data$responseText$ma3 === void 0 ? void 0 : _data$responseText$ma3[1];
                        publicPid = (_data$responseText$ma4 = data.responseText.match(/"public_id":([\d]+?),/)) === null || _data$responseText$ma4 === void 0 ? void 0 : _data$responseText$ma4[1];
                        publicJoined = !data.responseText.includes("Public.subscribe");
                        if (!(groupAct && groupId && groupHash)) {
                            _context8.next = 27;
                            break;
                        }
                        logStatus.success();
                        return _context8.abrupt("return", {
                            groupAct: groupAct,
                            groupId: groupId,
                            groupHash: groupHash,
                            type: "group"
                        });

                      case 27:
                        if (!(publicHash && publicPid)) {
                            _context8.next = 32;
                            break;
                        }
                        logStatus.success();
                        return _context8.abrupt("return", {
                            publicHash: publicHash,
                            publicPid: publicPid,
                            publicJoined: publicJoined,
                            type: "public"
                        });

                      case 32:
                        if (!(data.responseText.includes("wall.deletePost") && !doTask)) {
                            _context8.next = 39;
                            break;
                        }
                        wallHash = (_data$responseText$ma5 = data.responseText.match(/wall\.deletePost\(this, '.*?', '(.*?)'\)/)) === null || _data$responseText$ma5 === void 0 ? void 0 : _data$responseText$ma5[1];
                        if (!wallHash) {
                            _context8.next = 37;
                            break;
                        }
                        logStatus.success();
                        return _context8.abrupt("return", {
                            type: "deleteWall",
                            wallHash: wallHash
                        });

                      case 37:
                        _context8.next = 42;
                        break;

                      case 39:
                        if (!(name.includes("wall") && doTask)) {
                            _context8.next = 42;
                            break;
                        }
                        logStatus.success();
                        return _context8.abrupt("return", {
                            type: "sendWall"
                        });

                      case 42:
                        logStatus.error("Error: Parameters not found!");
                        return _context8.abrupt("return", false);

                      case 44:
                        logStatus.error("Error:".concat(data === null || data === void 0 ? void 0 : data.statusText, "(").concat(data === null || data === void 0 ? void 0 : data.status, ")"));
                        return _context8.abrupt("return", false);

                      case 46:
                        logStatus.error("".concat(result, ":").concat(statusText, "(").concat(status, ")"));
                        return _context8.abrupt("return", false);

                      case 50:
                        _context8.prev = 50;
                        _context8.t0 = _context8["catch"](0);
                        throwError(_context8.t0, "Vk.getId");
                        return _context8.abrupt("return", false);

                      case 54:
                      case "end":
                        return _context8.stop();
                    }
                }
            }, _callee8, this, [ [ 0, 50 ] ]);
        }));
        return _getId3.apply(this, arguments);
    }
    function _toggleVk2(_x11) {
        return _toggleVk3.apply(this, arguments);
    }
    function _toggleVk3() {
        _toggleVk3 = Vk_asyncToGenerator(regeneratorRuntime.mark(function _callee9(_ref2) {
            var name, _ref2$doTask, doTask, formatName, data;
            return regeneratorRuntime.wrap(function _callee9$(_context9) {
                while (1) {
                    switch (_context9.prev = _context9.next) {
                      case 0:
                        name = _ref2.name, _ref2$doTask = _ref2.doTask, doTask = _ref2$doTask === void 0 ? true : _ref2$doTask;
                        _context9.prev = 1;
                        if (!(!doTask && this.whiteList.names.includes(name))) {
                            _context9.next = 5;
                            break;
                        }
                        scripts_echoLog({
                            type: "whiteList",
                            text: name
                        });
                        return _context9.abrupt("return", true);

                      case 5:
                        formatName = name.replace(/\/$/, "");
                        _context9.next = 8;
                        return Vk_classPrivateMethodGet(this, _getId, _getId2).call(this, formatName, doTask);

                      case 8:
                        data = _context9.sent;
                        if (data) {
                            _context9.next = 11;
                            break;
                        }
                        return _context9.abrupt("return", false);

                      case 11:
                        _context9.t0 = data.type;
                        _context9.next = _context9.t0 === "group" ? 14 : _context9.t0 === "public" ? 17 : _context9.t0 === "sendWall" ? 20 : _context9.t0 === "deleteWall" ? 28 : 36;
                        break;

                      case 14:
                        _context9.next = 16;
                        return Vk_classPrivateMethodGet(this, _toggleGroup, _toggleGroup2).call(this, formatName, data, doTask);

                      case 16:
                        return _context9.abrupt("return", _context9.sent);

                      case 17:
                        _context9.next = 19;
                        return Vk_classPrivateMethodGet(this, _togglePublic, _togglePublic2).call(this, formatName, data, doTask);

                      case 19:
                        return _context9.abrupt("return", _context9.sent);

                      case 20:
                        if (!doTask) {
                            _context9.next = 26;
                            break;
                        }
                        _context9.next = 23;
                        return Vk_classPrivateMethodGet(this, _sendWall, _sendWall2).call(this, formatName);

                      case 23:
                        _context9.t1 = _context9.sent;
                        _context9.next = 27;
                        break;

                      case 26:
                        _context9.t1 = true;

                      case 27:
                        return _context9.abrupt("return", _context9.t1);

                      case 28:
                        if (!doTask) {
                            _context9.next = 32;
                            break;
                        }
                        _context9.t2 = true;
                        _context9.next = 35;
                        break;

                      case 32:
                        _context9.next = 34;
                        return Vk_classPrivateMethodGet(this, _deleteWall, _deleteWall2).call(this, formatName, data);

                      case 34:
                        _context9.t2 = _context9.sent;

                      case 35:
                        return _context9.abrupt("return", _context9.t2);

                      case 36:
                        return _context9.abrupt("return", false);

                      case 37:
                        _context9.next = 43;
                        break;

                      case 39:
                        _context9.prev = 39;
                        _context9.t3 = _context9["catch"](1);
                        throwError(_context9.t3, "Vk.toggleVk");
                        return _context9.abrupt("return", false);

                      case 43:
                      case "end":
                        return _context9.stop();
                    }
                }
            }, _callee9, this, [ [ 1, 39 ] ]);
        }));
        return _toggleVk3.apply(this, arguments);
    }
    function Vk_addId2(name, postId) {
        Vk_classPrivateFieldGet(this, Vk_cache)[name] = postId;
        GM_setValue("vkCache", Vk_classPrivateFieldGet(this, Vk_cache));
    }
    const social_Vk = Vk;
    function Youtube_typeof(obj) {
        "@babel/helpers - typeof";
        if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
            Youtube_typeof = function _typeof(obj) {
                return typeof obj;
            };
        } else {
            Youtube_typeof = function _typeof(obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
        }
        return Youtube_typeof(obj);
    }
    function Youtube_toConsumableArray(arr) {
        return Youtube_arrayWithoutHoles(arr) || Youtube_iterableToArray(arr) || Youtube_unsupportedIterableToArray(arr) || Youtube_nonIterableSpread();
    }
    function Youtube_nonIterableSpread() {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function Youtube_iterableToArray(iter) {
        if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
    }
    function Youtube_arrayWithoutHoles(arr) {
        if (Array.isArray(arr)) return Youtube_arrayLikeToArray(arr);
    }
    function Youtube_createForOfIteratorHelper(o, allowArrayLike) {
        var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
        if (!it) {
            if (Array.isArray(o) || (it = Youtube_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
                if (it) o = it;
                var i = 0;
                var F = function F() {};
                return {
                    s: F,
                    n: function n() {
                        if (i >= o.length) return {
                            done: true
                        };
                        return {
                            done: false,
                            value: o[i++]
                        };
                    },
                    e: function e(_e) {
                        throw _e;
                    },
                    f: F
                };
            }
            throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        var normalCompletion = true, didErr = false, err;
        return {
            s: function s() {
                it = it.call(o);
            },
            n: function n() {
                var step = it.next();
                normalCompletion = step.done;
                return step;
            },
            e: function e(_e2) {
                didErr = true;
                err = _e2;
            },
            f: function f() {
                try {
                    if (!normalCompletion && it["return"] != null) it["return"]();
                } finally {
                    if (didErr) throw err;
                }
            }
        };
    }
    function Youtube_unsupportedIterableToArray(o, minLen) {
        if (!o) return;
        if (typeof o === "string") return Youtube_arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor) n = o.constructor.name;
        if (n === "Map" || n === "Set") return Array.from(o);
        if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Youtube_arrayLikeToArray(o, minLen);
    }
    function Youtube_arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length) len = arr.length;
        for (var i = 0, arr2 = new Array(len); i < len; i++) {
            arr2[i] = arr[i];
        }
        return arr2;
    }
    function Youtube_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
        try {
            var info = gen[key](arg);
            var value = info.value;
        } catch (error) {
            reject(error);
            return;
        }
        if (info.done) {
            resolve(value);
        } else {
            Promise.resolve(value).then(_next, _throw);
        }
    }
    function Youtube_asyncToGenerator(fn) {
        return function() {
            var self = this, args = arguments;
            return new Promise(function(resolve, reject) {
                var gen = fn.apply(self, args);
                function _next(value) {
                    Youtube_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
                }
                function _throw(err) {
                    Youtube_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
                }
                _next(undefined);
            });
        };
    }
    function Youtube_classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }
    function Youtube_defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    function Youtube_createClass(Constructor, protoProps, staticProps) {
        if (protoProps) Youtube_defineProperties(Constructor.prototype, protoProps);
        if (staticProps) Youtube_defineProperties(Constructor, staticProps);
        return Constructor;
    }
    function Youtube_inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function");
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Youtube_setPrototypeOf(subClass, superClass);
    }
    function Youtube_setPrototypeOf(o, p) {
        Youtube_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
            o.__proto__ = p;
            return o;
        };
        return Youtube_setPrototypeOf(o, p);
    }
    function Youtube_createSuper(Derived) {
        var hasNativeReflectConstruct = Youtube_isNativeReflectConstruct();
        return function _createSuperInternal() {
            var Super = Youtube_getPrototypeOf(Derived), result;
            if (hasNativeReflectConstruct) {
                var NewTarget = Youtube_getPrototypeOf(this).constructor;
                result = Reflect.construct(Super, arguments, NewTarget);
            } else {
                result = Super.apply(this, arguments);
            }
            return Youtube_possibleConstructorReturn(this, result);
        };
    }
    function Youtube_possibleConstructorReturn(self, call) {
        if (call && (Youtube_typeof(call) === "object" || typeof call === "function")) {
            return call;
        } else if (call !== void 0) {
            throw new TypeError("Derived constructors may only return object or undefined");
        }
        return Youtube_assertThisInitialized(self);
    }
    function Youtube_assertThisInitialized(self) {
        if (self === void 0) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return self;
    }
    function Youtube_isNativeReflectConstruct() {
        if (typeof Reflect === "undefined" || !Reflect.construct) return false;
        if (Reflect.construct.sham) return false;
        if (typeof Proxy === "function") return true;
        try {
            Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
            return true;
        } catch (e) {
            return false;
        }
    }
    function Youtube_getPrototypeOf(o) {
        Youtube_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
        };
        return Youtube_getPrototypeOf(o);
    }
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
            throw new TypeError("Cannot initialize the same private elements twice on an object");
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
            throw new TypeError("attempted to get private field on non-instance");
        }
        return fn;
    }
    function Youtube_classPrivateFieldGet(receiver, privateMap) {
        var descriptor = Youtube_classExtractFieldDescriptor(receiver, privateMap, "get");
        return Youtube_classApplyDescriptorGet(receiver, descriptor);
    }
    function Youtube_classApplyDescriptorGet(receiver, descriptor) {
        if (descriptor.get) {
            return descriptor.get.call(receiver);
        }
        return descriptor.value;
    }
    function Youtube_classPrivateFieldSet(receiver, privateMap, value) {
        var descriptor = Youtube_classExtractFieldDescriptor(receiver, privateMap, "set");
        Youtube_classApplyDescriptorSet(receiver, descriptor, value);
        return value;
    }
    function Youtube_classExtractFieldDescriptor(receiver, privateMap, action) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to " + action + " private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function Youtube_classApplyDescriptorSet(receiver, descriptor, value) {
        if (descriptor.set) {
            descriptor.set.call(receiver, value);
        } else {
            if (!descriptor.writable) {
                throw new TypeError("attempted to set read only private field");
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
    var Youtube = function(_Social) {
        Youtube_inherits(Youtube, _Social);
        var _super = Youtube_createSuper(Youtube);
        function Youtube(id, verifyChannel) {
            var _GM_getValue;
            var _this;
            Youtube_classCallCheck(this, Youtube);
            _this = _super.call(this);
            Youtube_classPrivateMethodInitSpec(Youtube_assertThisInitialized(_this), _toggleLikeVideo);
            Youtube_classPrivateMethodInitSpec(Youtube_assertThisInitialized(_this), Youtube_toggleChannel);
            Youtube_classPrivateMethodInitSpec(Youtube_assertThisInitialized(_this), _getInfo);
            Youtube_classPrivateMethodInitSpec(Youtube_assertThisInitialized(_this), Youtube_updateAuth);
            Youtube_classPrivateMethodInitSpec(Youtube_assertThisInitialized(_this), Youtube_verifyAuth);
            Youtube_defineProperty(Youtube_assertThisInitialized(_this), "tasks", void 0);
            Youtube_defineProperty(Youtube_assertThisInitialized(_this), "whiteList", void 0);
            Youtube_classPrivateFieldInitSpec(Youtube_assertThisInitialized(_this), Youtube_auth, {
                writable: true,
                value: void 0
            });
            Youtube_classPrivateFieldInitSpec(Youtube_assertThisInitialized(_this), Youtube_initialized, {
                writable: true,
                value: false
            });
            Youtube_classPrivateFieldInitSpec(Youtube_assertThisInitialized(_this), _verifyChannel, {
                writable: true,
                value: "https://www.youtube.com/channel/UCBR8-60-B28hp2BmDPdntcQ"
            });
            _this.tasks = GM_getValue("Youtube-".concat(id)) || {
                channels: [],
                likes: []
            };
            _this.whiteList = ((_GM_getValue = GM_getValue("whiteList")) === null || _GM_getValue === void 0 ? void 0 : _GM_getValue.youtube) || {
                channels: [],
                likes: []
            };
            Youtube_classPrivateFieldSet(Youtube_assertThisInitialized(_this), Youtube_auth, GM_getValue("youtubeAuth") || {});
            if (verifyChannel) {
                Youtube_classPrivateFieldSet(Youtube_assertThisInitialized(_this), _verifyChannel, verifyChannel);
            }
            return _this;
        }
        Youtube_createClass(Youtube, [ {
            key: "init",
            value: function() {
                var _init = Youtube_asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                    var isVerified;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                              case 0:
                                _context.prev = 0;
                                if (Youtube_classPrivateFieldGet(this, Youtube_auth).PAPISID) {
                                    _context.next = 9;
                                    break;
                                }
                                scripts_echoLog({
                                    type: "updateYoutubeAuth"
                                });
                                _context.next = 5;
                                return Youtube_classPrivateMethodGet(this, Youtube_updateAuth, Youtube_updateAuth2).call(this);

                              case 5:
                                if (!_context.sent) {
                                    _context.next = 8;
                                    break;
                                }
                                Youtube_classPrivateFieldSet(this, Youtube_initialized, true);
                                return _context.abrupt("return", true);

                              case 8:
                                return _context.abrupt("return", false);

                              case 9:
                                _context.next = 11;
                                return Youtube_classPrivateMethodGet(this, Youtube_verifyAuth, Youtube_verifyAuth2).call(this);

                              case 11:
                                isVerified = _context.sent;
                                if (!isVerified) {
                                    _context.next = 16;
                                    break;
                                }
                                scripts_echoLog({
                                    text: "Init youtube success!"
                                });
                                Youtube_classPrivateFieldSet(this, Youtube_initialized, true);
                                return _context.abrupt("return", true);

                              case 16:
                                GM_setValue("youtubeAuth", {
                                    auth: null
                                });
                                _context.next = 19;
                                return Youtube_classPrivateMethodGet(this, Youtube_updateAuth, Youtube_updateAuth2).call(this);

                              case 19:
                                if (!_context.sent) {
                                    _context.next = 23;
                                    break;
                                }
                                scripts_echoLog({
                                    text: "Init youtube success!"
                                });
                                Youtube_classPrivateFieldSet(this, Youtube_initialized, true);
                                return _context.abrupt("return", true);

                              case 23:
                                scripts_echoLog({
                                    text: "Init youtube failed!"
                                });
                                return _context.abrupt("return", false);

                              case 27:
                                _context.prev = 27;
                                _context.t0 = _context["catch"](0);
                                throwError(_context.t0, "Youtube.init");
                                return _context.abrupt("return", false);

                              case 31:
                              case "end":
                                return _context.stop();
                            }
                        }
                    }, _callee, this, [ [ 0, 27 ] ]);
                }));
                function init() {
                    return _init.apply(this, arguments);
                }
                return init;
            }()
        }, {
            key: "toggle",
            value: function() {
                var _toggle = Youtube_asyncToGenerator(regeneratorRuntime.mark(function _callee2(_ref) {
                    var _ref$doTask, doTask, _ref$channelLinks, channelLinks, _ref$videoLinks, videoLinks, prom, realChannels, realLikes, _iterator, _step, channel, _iterator2, _step2, video;
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                              case 0:
                                _ref$doTask = _ref.doTask, doTask = _ref$doTask === void 0 ? true : _ref$doTask, 
                                _ref$channelLinks = _ref.channelLinks, channelLinks = _ref$channelLinks === void 0 ? [] : _ref$channelLinks, 
                                _ref$videoLinks = _ref.videoLinks, videoLinks = _ref$videoLinks === void 0 ? [] : _ref$videoLinks;
                                _context2.prev = 1;
                                if (Youtube_classPrivateFieldGet(this, Youtube_initialized)) {
                                    _context2.next = 5;
                                    break;
                                }
                                scripts_echoLog({
                                    type: "text",
                                    text: "请先初始化"
                                });
                                return _context2.abrupt("return", false);

                              case 5:
                                prom = [];
                                realChannels = this.getRealParams("channels", [], channelLinks, doTask, function(link) {
                                    if (/^https:\/\/www\.google\.com.*?\/url\?.*?url=https:\/\/www.youtube.com\/.*/.test(link)) {
                                        var _link$match;
                                        return (_link$match = link.match(/url=(https:\/\/www.youtube.com\/.*)/)) === null || _link$match === void 0 ? void 0 : _link$match[1];
                                    }
                                    return link;
                                });
                                realLikes = this.getRealParams("likes", [], videoLinks, doTask, function(link) {
                                    if (/^https:\/\/www\.google\.com.*?\/url\?.*?url=https:\/\/www.youtube.com\/.*/.test(link)) {
                                        var _link$match2;
                                        return (_link$match2 = link.match(/url=(https:\/\/www.youtube.com\/.*)/)) === null || _link$match2 === void 0 ? void 0 : _link$match2[1];
                                    }
                                    return link;
                                });
                                if (!(realChannels.length > 0)) {
                                    _context2.next = 27;
                                    break;
                                }
                                _iterator = Youtube_createForOfIteratorHelper(realChannels);
                                _context2.prev = 10;
                                _iterator.s();

                              case 12:
                                if ((_step = _iterator.n()).done) {
                                    _context2.next = 19;
                                    break;
                                }
                                channel = _step.value;
                                prom.push(Youtube_classPrivateMethodGet(this, Youtube_toggleChannel, Youtube_toggleChannel2).call(this, {
                                    link: channel,
                                    doTask: doTask
                                }));
                                _context2.next = 17;
                                return delay(1e3);

                              case 17:
                                _context2.next = 12;
                                break;

                              case 19:
                                _context2.next = 24;
                                break;

                              case 21:
                                _context2.prev = 21;
                                _context2.t0 = _context2["catch"](10);
                                _iterator.e(_context2.t0);

                              case 24:
                                _context2.prev = 24;
                                _iterator.f();
                                return _context2.finish(24);

                              case 27:
                                if (!(realLikes.length > 0)) {
                                    _context2.next = 46;
                                    break;
                                }
                                _iterator2 = Youtube_createForOfIteratorHelper(realLikes);
                                _context2.prev = 29;
                                _iterator2.s();

                              case 31:
                                if ((_step2 = _iterator2.n()).done) {
                                    _context2.next = 38;
                                    break;
                                }
                                video = _step2.value;
                                prom.push(Youtube_classPrivateMethodGet(this, _toggleLikeVideo, _toggleLikeVideo2).call(this, {
                                    link: video,
                                    doTask: doTask
                                }));
                                _context2.next = 36;
                                return delay(1e3);

                              case 36:
                                _context2.next = 31;
                                break;

                              case 38:
                                _context2.next = 43;
                                break;

                              case 40:
                                _context2.prev = 40;
                                _context2.t1 = _context2["catch"](29);
                                _iterator2.e(_context2.t1);

                              case 43:
                                _context2.prev = 43;
                                _iterator2.f();
                                return _context2.finish(43);

                              case 46:
                                return _context2.abrupt("return", Promise.all(prom).then(function() {
                                    return true;
                                }));

                              case 49:
                                _context2.prev = 49;
                                _context2.t2 = _context2["catch"](1);
                                throwError(_context2.t2, "Youtubetoggle");
                                return _context2.abrupt("return", false);

                              case 53:
                              case "end":
                                return _context2.stop();
                            }
                        }
                    }, _callee2, this, [ [ 1, 49 ], [ 10, 21, 24, 27 ], [ 29, 40, 43, 46 ] ]);
                }));
                function toggle(_x) {
                    return _toggle.apply(this, arguments);
                }
                return toggle;
            }()
        } ]);
        return Youtube;
    }(social_Social);
    function Youtube_verifyAuth2() {
        return Youtube_verifyAuth3.apply(this, arguments);
    }
    function Youtube_verifyAuth3() {
        Youtube_verifyAuth3 = Youtube_asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.prev = 0;
                        _context3.next = 3;
                        return Youtube_classPrivateMethodGet(this, Youtube_toggleChannel, Youtube_toggleChannel2).call(this, {
                            link: Youtube_classPrivateFieldGet(this, _verifyChannel),
                            doTask: true,
                            verify: true
                        });

                      case 3:
                        return _context3.abrupt("return", _context3.sent);

                      case 6:
                        _context3.prev = 6;
                        _context3.t0 = _context3["catch"](0);
                        throwError(_context3.t0, "Youtube.verifyAuth");
                        return _context3.abrupt("return", false);

                      case 10:
                      case "end":
                        return _context3.stop();
                    }
                }
            }, _callee3, this, [ [ 0, 6 ] ]);
        }));
        return Youtube_verifyAuth3.apply(this, arguments);
    }
    function Youtube_updateAuth2() {
        return Youtube_updateAuth3.apply(this, arguments);
    }
    function Youtube_updateAuth3() {
        Youtube_updateAuth3 = Youtube_asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
            var _this2 = this;
            var logStatus;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        _context5.prev = 0;
                        logStatus = scripts_echoLog({
                            type: "text",
                            text: "updateYoutubeAuth"
                        });
                        _context5.next = 4;
                        return new Promise(function(resolve) {
                            var newTab = GM_openInTab("https://www.youtube.com/#auth", {
                                active: true,
                                insert: true,
                                setParent: true
                            });
                            newTab.onclose = Youtube_asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
                                var auth;
                                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                                    while (1) {
                                        switch (_context4.prev = _context4.next) {
                                          case 0:
                                            auth = GM_getValue("youtubeAuth");
                                            if (!auth) {
                                                _context4.next = 11;
                                                break;
                                            }
                                            Youtube_classPrivateFieldSet(_this2, Youtube_auth, auth);
                                            logStatus.success();
                                            _context4.t0 = resolve;
                                            _context4.next = 7;
                                            return Youtube_classPrivateMethodGet(_this2, Youtube_verifyAuth, Youtube_verifyAuth2).call(_this2);

                                          case 7:
                                            _context4.t1 = _context4.sent;
                                            (0, _context4.t0)(_context4.t1);
                                            _context4.next = 13;
                                            break;

                                          case 11:
                                            logStatus.error("Error: Update youtube auth failed!");
                                            resolve(false);

                                          case 13:
                                          case "end":
                                            return _context4.stop();
                                        }
                                    }
                                }, _callee4);
                            }));
                        });

                      case 4:
                        return _context5.abrupt("return", _context5.sent);

                      case 7:
                        _context5.prev = 7;
                        _context5.t0 = _context5["catch"](0);
                        throwError(_context5.t0, "Discord.updateAuth");
                        return _context5.abrupt("return", false);

                      case 11:
                      case "end":
                        return _context5.stop();
                    }
                }
            }, _callee5, null, [ [ 0, 7 ] ]);
        }));
        return Youtube_updateAuth3.apply(this, arguments);
    }
    function _getInfo2(_x2, _x3) {
        return _getInfo3.apply(this, arguments);
    }
    function _getInfo3() {
        _getInfo3 = Youtube_asyncToGenerator(regeneratorRuntime.mark(function _callee6(link, type) {
            var logStatus, _yield$httpRequest, result, statusText, status, data, _data$responseText$ma, _ref5, apiKey, context, _JSON$parse, client, request, _data$responseText$ma2, channelId, _data$responseText$ma3, _data$responseText$ma4, videoId, likeParams;
            return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        _context6.prev = 0;
                        logStatus = scripts_echoLog({
                            type: "text",
                            text: "getYtbToken"
                        });
                        _context6.next = 4;
                        return tools_httpRequest({
                            url: link,
                            method: "GET"
                        });

                      case 4:
                        _yield$httpRequest = _context6.sent;
                        result = _yield$httpRequest.result;
                        statusText = _yield$httpRequest.statusText;
                        status = _yield$httpRequest.status;
                        data = _yield$httpRequest.data;
                        if (!(result === "Success")) {
                            _context6.next = 42;
                            break;
                        }
                        if (!((data === null || data === void 0 ? void 0 : data.status) === 200)) {
                            _context6.next = 40;
                            break;
                        }
                        if (!data.responseText.includes("accounts.google.com/ServiceLogin?service=youtube")) {
                            _context6.next = 14;
                            break;
                        }
                        logStatus.error("Error:".concat(i18n("loginYtb")), true);
                        return _context6.abrupt("return", {
                            needLogin: true
                        });

                      case 14:
                        apiKey = (_data$responseText$ma = data.responseText.match(/"INNERTUBE_API_KEY":"(.*?)"/)) === null || _data$responseText$ma === void 0 ? void 0 : _data$responseText$ma[1];
                        context = ((_ref5 = data.responseText.match(/\(\{"INNERTUBE_CONTEXT":([\w\W]*?)\}\)/) || data.responseText.match(/"INNERTUBE_CONTEXT":([\w\W]*?\}),"INNERTUBE/)) === null || _ref5 === void 0 ? void 0 : _ref5[1]) || "{}";
                        _JSON$parse = JSON.parse(context), client = _JSON$parse.client, request = _JSON$parse.request;
                        if (!(apiKey && client && request)) {
                            _context6.next = 38;
                            break;
                        }
                        client.hl = "en";
                        if (!(type === "channel")) {
                            _context6.next = 28;
                            break;
                        }
                        channelId = (_data$responseText$ma2 = data.responseText.match(/<meta itemprop="channelId" content="(.+?)">/)) === null || _data$responseText$ma2 === void 0 ? void 0 : _data$responseText$ma2[1];
                        if (!channelId) {
                            _context6.next = 24;
                            break;
                        }
                        logStatus.success();
                        return _context6.abrupt("return", {
                            params: {
                                apiKey: apiKey,
                                client: client,
                                request: request,
                                channelId: channelId
                            }
                        });

                      case 24:
                        logStatus.error('Error: Get "channelId" failed!');
                        return _context6.abrupt("return", {});

                      case 28:
                        if (!(type === "likeVideo")) {
                            _context6.next = 36;
                            break;
                        }
                        videoId = (_data$responseText$ma3 = data.responseText.match(/<link rel="shortlinkUrl" href="https:\/\/youtu\.be\/(.*?)">/)) === null || _data$responseText$ma3 === void 0 ? void 0 : _data$responseText$ma3[1];
                        likeParams = (_data$responseText$ma4 = data.responseText.match(/"likeParams":"(.*?)"/)) === null || _data$responseText$ma4 === void 0 ? void 0 : _data$responseText$ma4[1];
                        if (!videoId) {
                            _context6.next = 34;
                            break;
                        }
                        logStatus.success();
                        return _context6.abrupt("return", {
                            params: {
                                apiKey: apiKey,
                                client: client,
                                request: request,
                                videoId: videoId,
                                likeParams: likeParams
                            }
                        });

                      case 34:
                        logStatus.error('Error: Get "videoId" failed!');
                        return _context6.abrupt("return", {});

                      case 36:
                        logStatus.error("Error: Unknown type");
                        return _context6.abrupt("return", {});

                      case 38:
                        logStatus.error('Error: Parameter "apiKey" not found!');
                        return _context6.abrupt("return", {});

                      case 40:
                        logStatus.error("Error:".concat(data === null || data === void 0 ? void 0 : data.statusText, "(").concat(data === null || data === void 0 ? void 0 : data.status, ")"));
                        return _context6.abrupt("return", {});

                      case 42:
                        logStatus.error("".concat(result, ":").concat(statusText, "(").concat(status, ")"));
                        return _context6.abrupt("return", {});

                      case 46:
                        _context6.prev = 46;
                        _context6.t0 = _context6["catch"](0);
                        throwError(_context6.t0, "Youtube.getInfo");
                        return _context6.abrupt("return", {});

                      case 50:
                      case "end":
                        return _context6.stop();
                    }
                }
            }, _callee6, null, [ [ 0, 46 ] ]);
        }));
        return _getInfo3.apply(this, arguments);
    }
    function Youtube_toggleChannel2(_x4) {
        return Youtube_toggleChannel3.apply(this, arguments);
    }
    function Youtube_toggleChannel3() {
        Youtube_toggleChannel3 = Youtube_asyncToGenerator(regeneratorRuntime.mark(function _callee7(_ref2) {
            var link, _ref2$doTask, doTask, _ref2$verify, verify, _yield$_classPrivateM, params, needLogin, _ref6, apiKey, client, request, channelId, logStatus, nowTime, _yield$httpRequest2, result, statusText, status, data;
            return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        link = _ref2.link, _ref2$doTask = _ref2.doTask, doTask = _ref2$doTask === void 0 ? true : _ref2$doTask, 
                        _ref2$verify = _ref2.verify, verify = _ref2$verify === void 0 ? false : _ref2$verify;
                        _context7.prev = 1;
                        _context7.next = 4;
                        return Youtube_classPrivateMethodGet(this, _getInfo, _getInfo2).call(this, link, "channel");

                      case 4:
                        _yield$_classPrivateM = _context7.sent;
                        params = _yield$_classPrivateM.params;
                        needLogin = _yield$_classPrivateM.needLogin;
                        _ref6 = params || {}, apiKey = _ref6.apiKey, client = _ref6.client, request = _ref6.request, 
                        channelId = _ref6.channelId;
                        if (!needLogin) {
                            _context7.next = 11;
                            break;
                        }
                        scripts_echoLog({
                            type: "custom",
                            text: i18n("loginYtb")
                        });
                        return _context7.abrupt("return", false);

                      case 11:
                        if (apiKey && client && request && channelId) {
                            _context7.next = 14;
                            break;
                        }
                        scripts_echoLog({
                            type: "custom",
                            text: '"getYtbToken" failed'
                        });
                        return _context7.abrupt("return", false);

                      case 14:
                        if (!(!doTask && !verify && this.whiteList.channels.includes(channelId))) {
                            _context7.next = 17;
                            break;
                        }
                        scripts_echoLog({
                            type: "whiteList",
                            text: channelId
                        });
                        return _context7.abrupt("return", true);

                      case 17:
                        logStatus = verify ? scripts_echoLog({
                            type: "text",
                            text: "verifyYoutubeAuth"
                        }) : scripts_echoLog({
                            type: doTask ? "followYtbChannel" : "unfollowYtbChannel",
                            text: channelId
                        });
                        nowTime = parseInt(String(new Date().getTime() / 1e3), 10);
                        _context7.next = 21;
                        return tools_httpRequest({
                            url: "https://www.youtube.com/youtubei/v1/subscription/".concat(doTask ? "" : "un", "subscribe?key=").concat(apiKey),
                            method: "POST",
                            headers: {
                                origin: "https://www.youtube.com",
                                referer: "https://www.youtube.com/channel/".concat(channelId),
                                "content-type": "application/json",
                                "x-goog-authuser": "0",
                                "x-goog-visitor-id": client === null || client === void 0 ? void 0 : client.visitorData,
                                "x-origin": "https://www.youtube.com",
                                authorization: "SAPISIDHASH ".concat(nowTime, "_").concat(sha1("".concat(nowTime, " ").concat(Youtube_classPrivateFieldGet(this, Youtube_auth).PAPISID, " https://www.youtube.com")))
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
                                params: doTask ? "EgIIAhgA" : "CgIIAhgA"
                            })
                        });

                      case 21:
                        _yield$httpRequest2 = _context7.sent;
                        result = _yield$httpRequest2.result;
                        statusText = _yield$httpRequest2.statusText;
                        status = _yield$httpRequest2.status;
                        data = _yield$httpRequest2.data;
                        if (!(result === "Success")) {
                            _context7.next = 36;
                            break;
                        }
                        if (!((data === null || data === void 0 ? void 0 : data.status) === 200)) {
                            _context7.next = 34;
                            break;
                        }
                        if (!(doTask && (/"subscribed": true/.test(data.responseText) || data.responseText.includes("The subscription already exists")) || !doTask && /"subscribed": false/.test(data.responseText))) {
                            _context7.next = 32;
                            break;
                        }
                        logStatus.success();
                        if (doTask && !verify) {
                            this.tasks.channels = unique([].concat(Youtube_toConsumableArray(this.tasks.channels), [ link ]));
                        }
                        return _context7.abrupt("return", true);

                      case 32:
                        logStatus.error(i18n("tryUpdateYtbAuth"), true);
                        return _context7.abrupt("return", false);

                      case 34:
                        logStatus.error("Error:".concat(data === null || data === void 0 ? void 0 : data.statusText, "(").concat(data === null || data === void 0 ? void 0 : data.status, ")"));
                        return _context7.abrupt("return", false);

                      case 36:
                        logStatus.error("".concat(result, ":").concat(statusText, "(").concat(status, ")"));
                        return _context7.abrupt("return", false);

                      case 40:
                        _context7.prev = 40;
                        _context7.t0 = _context7["catch"](1);
                        throwError(_context7.t0, "Youtube.toggleChannel");
                        return _context7.abrupt("return", false);

                      case 44:
                      case "end":
                        return _context7.stop();
                    }
                }
            }, _callee7, this, [ [ 1, 40 ] ]);
        }));
        return Youtube_toggleChannel3.apply(this, arguments);
    }
    function _toggleLikeVideo2(_x5) {
        return _toggleLikeVideo3.apply(this, arguments);
    }
    function _toggleLikeVideo3() {
        _toggleLikeVideo3 = Youtube_asyncToGenerator(regeneratorRuntime.mark(function _callee8(_ref3) {
            var link, _ref3$doTask, doTask, _yield$_classPrivateM2, params, needLogin, _ref7, apiKey, client, request, videoId, likeParams, logStatus, nowTime, likeVideoData, _yield$httpRequest3, result, statusText, status, data;
            return regeneratorRuntime.wrap(function _callee8$(_context8) {
                while (1) {
                    switch (_context8.prev = _context8.next) {
                      case 0:
                        link = _ref3.link, _ref3$doTask = _ref3.doTask, doTask = _ref3$doTask === void 0 ? true : _ref3$doTask;
                        _context8.prev = 1;
                        _context8.next = 4;
                        return Youtube_classPrivateMethodGet(this, _getInfo, _getInfo2).call(this, link, "likeVideo");

                      case 4:
                        _yield$_classPrivateM2 = _context8.sent;
                        params = _yield$_classPrivateM2.params;
                        needLogin = _yield$_classPrivateM2.needLogin;
                        _ref7 = params || {}, apiKey = _ref7.apiKey, client = _ref7.client, request = _ref7.request, 
                        videoId = _ref7.videoId, likeParams = _ref7.likeParams;
                        if (!needLogin) {
                            _context8.next = 11;
                            break;
                        }
                        scripts_echoLog({
                            type: "text",
                            text: "".concat(i18n("loginYtb"))
                        });
                        return _context8.abrupt("return", false);

                      case 11:
                        if (apiKey && client && request && videoId && likeParams) {
                            _context8.next = 14;
                            break;
                        }
                        scripts_echoLog({
                            type: "text",
                            text: '"getYtbToken" failed'
                        });
                        return _context8.abrupt("return", false);

                      case 14:
                        if (!(!doTask && this.whiteList.likes.includes(videoId))) {
                            _context8.next = 17;
                            break;
                        }
                        scripts_echoLog({
                            type: "whiteList",
                            text: link
                        });
                        return _context8.abrupt("return", true);

                      case 17:
                        logStatus = scripts_echoLog({
                            type: doTask ? "likeYtbVideo" : "unlikeYtbVideo",
                            text: videoId
                        });
                        nowTime = parseInt(String(new Date().getTime() / 1e3), 10);
                        likeVideoData = {
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
                        if (!doTask) {
                            _context8.next = 27;
                            break;
                        }
                        if (!likeParams) {
                            _context8.next = 25;
                            break;
                        }
                        likeVideoData.params = likeParams;
                        _context8.next = 27;
                        break;

                      case 25:
                        logStatus.error("Empty likeParams");
                        return _context8.abrupt("return", false);

                      case 27:
                        _context8.next = 29;
                        return tools_httpRequest({
                            url: "https://www.youtube.com/youtubei/v1/like/".concat(doTask ? "" : "remove", "like?key=").concat(apiKey),
                            method: "POST",
                            headers: {
                                origin: "https://www.youtube.com",
                                referer: "https://www.youtube.com/watch?v=".concat(videoId),
                                "content-type": "application/json",
                                "x-goog-authuser": "0",
                                "x-goog-visitor-id": client.visitorData,
                                "x-origin": "https://www.youtube.com",
                                authorization: "SAPISIDHASH ".concat(nowTime, "_").concat(sha1("".concat(nowTime, " ").concat(Youtube_classPrivateFieldGet(this, Youtube_auth).PAPISID, " https://www.youtube.com")))
                            },
                            data: JSON.stringify(likeVideoData)
                        });

                      case 29:
                        _yield$httpRequest3 = _context8.sent;
                        result = _yield$httpRequest3.result;
                        statusText = _yield$httpRequest3.statusText;
                        status = _yield$httpRequest3.status;
                        data = _yield$httpRequest3.data;
                        if (!(result === "Success")) {
                            _context8.next = 44;
                            break;
                        }
                        if (!((data === null || data === void 0 ? void 0 : data.status) === 200)) {
                            _context8.next = 42;
                            break;
                        }
                        if (!(doTask && data.responseText.includes("Added to Liked videos") || !doTask && (data.responseText.includes("Removed from Liked videos") || data.responseText.includes("Dislike removed")))) {
                            _context8.next = 40;
                            break;
                        }
                        logStatus.success();
                        if (doTask) this.tasks.likes = unique([].concat(Youtube_toConsumableArray(this.tasks.likes), [ link ]));
                        return _context8.abrupt("return", true);

                      case 40:
                        logStatus.error(i18n("tryUpdateYtbAuth"), true);
                        return _context8.abrupt("return", false);

                      case 42:
                        logStatus.error("Error:".concat(data === null || data === void 0 ? void 0 : data.statusText, "(").concat(data === null || data === void 0 ? void 0 : data.status, ")"));
                        return _context8.abrupt("return", false);

                      case 44:
                        logStatus.error("".concat(result, ":").concat(statusText, "(").concat(status, ")"));
                        return _context8.abrupt("return", false);

                      case 48:
                        _context8.prev = 48;
                        _context8.t0 = _context8["catch"](1);
                        throwError(_context8.t0, "Youtube.toggleLikeVideo");
                        return _context8.abrupt("return", false);

                      case 52:
                      case "end":
                        return _context8.stop();
                    }
                }
            }, _callee8, this, [ [ 1, 48 ] ]);
        }));
        return _toggleLikeVideo3.apply(this, arguments);
    }
    const social_Youtube = Youtube;
    if (window.location.hostname === "discord.com" && window.location.hash === "#auth") {
        var _window$localStorage$;
        GM_setValue("discordAuth", {
            auth: (_window$localStorage$ = window.localStorage.getItem("token")) === null || _window$localStorage$ === void 0 ? void 0 : _window$localStorage$.replace(/^"|"$/g, "")
        });
        window.close();
    }
    window.onload = function() {
        if (window.location.hostname === "www.twitch.tv" && window.location.hash === "#auth") {
            var authToken = Cookies.get("auth-token");
            var isLogin = !!Cookies.get("login");
            if (isLogin) {
                var _commonOptions, _commonOptions$header;
                GM_setValue("twitchAuth", {
                    authToken: authToken,
                    clientId: (_commonOptions = commonOptions) === null || _commonOptions === void 0 ? void 0 : (_commonOptions$header = _commonOptions.headers) === null || _commonOptions$header === void 0 ? void 0 : _commonOptions$header["Client-ID"]
                });
                window.close();
            } else {}
        }
        if (window.location.hostname === "twitter.com" && window.location.hash === "#auth") {
            var ct0 = Cookies.get("ct0");
            if (ct0) {
                GM_setValue("twitterAuth", {
                    ct0: ct0
                });
                window.close();
            } else {}
        }
        if (window.location.hostname === "www.youtube.com" && window.location.hash === "#auth") {
            var PAPISID = Cookies.get("__Secure-3PAPISID");
            if (PAPISID) {
                GM_setValue("youtubeAuth", {
                    PAPISID: PAPISID
                });
                window.close();
            } else {}
        }
        unsafeWindow.Discord = social_Discord;
        unsafeWindow.Instagram = social_Instagram;
        unsafeWindow.Reddit = social_Reddit;
        unsafeWindow.Twitch = social_Twitch;
        unsafeWindow.Twitter = social_Twitter;
        unsafeWindow.Vk = social_Vk;
        unsafeWindow.Youtube = social_Youtube;
        $("body").append('<div id="fuck-task-info" style="position:fixed;bottom:10px;right:10px;width:300px;max-width:60%;"></div>');
    };
})();
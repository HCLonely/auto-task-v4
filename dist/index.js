(() => {
    "use strict";
    var __webpack_require__ = {};
    (() => {
        __webpack_require__.r = exports => {
            if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
                Object.defineProperty(exports, Symbol.toStringTag, {
                    value: "Module"
                });
            }
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
        };
    })();
    var __webpack_exports__ = {};
    __webpack_require__.r(__webpack_exports__);
    function throwError(error, name) {
        console.log("%c%s", "color:white;background:red", name + "\n" + error.stack);
    }
    var __read = undefined && undefined.__read || function(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        } catch (error) {
            e = {
                error: error
            };
        } finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            } finally {
                if (e) throw e.error;
            }
        }
        return ar;
    };
    var __spreadArray = undefined && undefined.__spreadArray || function(to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    };
    function unique(array) {
        try {
            return __spreadArray([], __read(new Set(array)), false);
        } catch (e) {
            throwError(e, "unique");
            return [];
        }
    }
    function delay(time) {
        if (time === void 0) {
            time = 1e3;
        }
        return new Promise(function(resolve) {
            setTimeout(function() {
                resolve(true);
            }, time);
        });
    }
    var Social_read = undefined && undefined.__read || function(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        } catch (error) {
            e = {
                error: error
            };
        } finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            } finally {
                if (e) throw e.error;
            }
        }
        return ar;
    };
    var Social_spreadArray = undefined && undefined.__spreadArray || function(to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    };
    var Social = function() {
        function Social() {}
        Social.prototype.getRealParams = function(name, params, links, doTask, link2param) {
            try {
                var realParams = [];
                if (params.length > 0) {
                    realParams = Social_spreadArray([], Social_read(params), false);
                }
                if (links.length > 0) {
                    realParams = Social_spreadArray(Social_spreadArray([], Social_read(realParams), false), Social_read(links.map(function(link) {
                        return link2param(link);
                    }).filter(function(link) {
                        return link;
                    })), false);
                }
                if (!doTask && this.tasks[name].length > 0) {
                    realParams = Social_spreadArray(Social_spreadArray([], Social_read(realParams), false), Social_read(this.tasks[name]), false);
                }
                return unique(realParams);
            } catch (error) {
                throwError(error, "Social.getRealParams");
                return [];
            }
        };
        return Social;
    }();
    const social_Social = Social;
    var __assign = undefined && undefined.__assign || function() {
        __assign = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    var __awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P ? value : new P(function(resolve) {
                resolve(value);
            });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator = undefined && undefined.__generator || function(thisArg, body) {
        var _ = {
            label: 0,
            sent: function() {
                if (t[0] & 1) throw t[1];
                return t[1];
            },
            trys: [],
            ops: []
        }, f, y, t, g;
        return g = {
            next: verb(0),
            throw: verb(1),
            return: verb(2)
        }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
            return this;
        }), g;
        function verb(n) {
            return function(v) {
                return step([ n, v ]);
            };
        }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
                0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [ op[0] & 2, t.value ];
                switch (op[0]) {
                  case 0:
                  case 1:
                    t = op;
                    break;

                  case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };

                  case 5:
                    _.label++;
                    y = op[1];
                    op = [ 0 ];
                    continue;

                  case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;

                  default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
                }
                op = body.call(thisArg, _);
            } catch (e) {
                op = [ 6, e ];
                y = 0;
            } finally {
                f = t = 0;
            }
            if (op[0] & 5) throw op[1];
            return {
                value: op[0] ? op[1] : void 0,
                done: true
            };
        }
    };
    function httpRequest(options, times) {
        if (times === void 0) {
            times = 0;
        }
        return __awaiter(this, void 0, void 0, function() {
            var result, error_1;
            return __generator(this, function(_a) {
                switch (_a.label) {
                  case 0:
                    _a.trys.push([ 0, 5, , 6 ]);
                    return [ 4, new Promise(function(resolve) {
                        if (options.dataType) {
                            options.responseType = options.dataType;
                        }
                        var requestObj = __assign({
                            timeout: 3e4,
                            ontimeout: function(data) {
                                resolve({
                                    result: "Error",
                                    statusText: "Timeout",
                                    status: 601,
                                    data: data,
                                    options: options
                                });
                            },
                            onabort: function(data) {
                                resolve({
                                    result: "Error",
                                    statusText: "Aborted",
                                    status: 602,
                                    data: data,
                                    options: options
                                });
                            },
                            onerror: function(data) {
                                resolve({
                                    result: "Error",
                                    statusText: "Error",
                                    status: 603,
                                    data: data,
                                    options: options
                                });
                            },
                            onload: function(data) {
                                resolve({
                                    result: "Success",
                                    statusText: "Load",
                                    status: 600,
                                    data: data,
                                    options: options
                                });
                            }
                        }, options);
                        GM_xmlhttpRequest(requestObj);
                    }) ];

                  case 1:
                    result = _a.sent();
                    console.log("发送请求:", result);
                    if (!(result.status !== 600 && times < 2)) return [ 3, 3 ];
                    return [ 4, httpRequest(options, ++times) ];

                  case 2:
                    return [ 2, _a.sent() ];

                  case 3:
                    return [ 2, result ];

                  case 4:
                    return [ 3, 6 ];

                  case 5:
                    error_1 = _a.sent();
                    throwError(error_1, "httpRequest");
                    console.log("发送请求:", {
                        errorMsg: error_1,
                        options: options
                    });
                    return [ 2, {
                        result: "JsError",
                        statusText: "Error",
                        status: 604,
                        error: error_1,
                        options: options
                    } ];

                  case 6:
                    return [ 2 ];
                }
            });
        });
    }
    const tools_httpRequest = httpRequest;
    function getI18n() {
        var argvs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            argvs[_i] = arguments[_i];
        }
        return argvs.join(" ");
    }
    const i18n = getI18n;
    function echoLog(_a) {
        var _b = _a.type, type = _b === void 0 ? "text" : _b, text = _a.text, url = _a.url, id = _a.id;
        try {
            var ele = null;
            switch (type) {
              case "updateSteamCommunity":
                ele = $("<li>" + i18n("updateCommunityId") + "<font></font></li>");
                break;

              case "updateSteamStore":
                ele = $("<li>" + i18n("updateStoreId") + "<font></font></li>");
                break;

              case "joinSteamGroup":
              case "leaveSteamGroup":
              case "getSteamGroupId":
                ele = $("<li>" + i18n(type) + '<a href="https://steamcommunity.com/groups/' + text + '" target="_blank">' + text + "</a>...<font></font></li>");
                break;

              case "subscribeForum":
              case "unsubscribeForum":
              case "getForumId":
                ele = $("<li>" + i18n(type) + '<a href="https://steamcommunity.com/app/' + text + '/discussions/" target="_blank">' + text + "</a>...<font></font></li>");
                break;

              case "followCurator":
              case "unfollowCurator":
              case "getCuratorId":
                ele = $("<li>" + i18n(type) + '<a href="https://store.steampowered.com/' + (text.includes("/") ? text : "curator/" + text) + '" target="_blank">' + text + "</a>...<font></font></li>");
                break;

              case "getDeveloperId":
              case "followDeveloper":
              case "unfollowDeveloper":
                ele = $("<li>" + i18n(type) + '<a href="https://store.steampowered.com/developer/' + text + '" target="_blank">' + text + "</a>...<font></font></li>");
                break;

              case "getPublisherId":
              case "followPublisher":
              case "unfollowPublisher":
                ele = $("<li>" + i18n(type) + '<a href="https://store.steampowered.com/publisher/' + text + '" target="_blank">' + text + "</a>...<font></font></li>");
                break;

              case "getFranchiseId":
              case "followFranchise":
              case "unfollowFranchise":
                ele = $("<li>" + i18n(type) + '<a href="https://store.steampowered.com/franchise/' + text + '" target="_blank">' + text + "</a>...<font></font></li>");
                break;

              case "addWishlist":
              case "removeWishlist":
              case "followGame":
              case "unfollowGame":
                ele = $("<li>" + i18n(type) + '<a href="https://store.steampowered.com/app/' + text + '" target="_blank">' + text + "</a>...<font></font></li>");
                break;

              case "favoriteWorkshop":
              case "unfavoriteWorkshop":
              case "getWorkshopAppId":
              case "voteupWorkshop":
                ele = $("<li>" + i18n(type) + '<a href="https://steamcommunity.com/sharedfiles/filedetails/?id=' + text + '" target="_blank">' + text + "</a>...<font></font></li>");
                break;

              case "likeAnnouncements":
                ele = $("<li>" + i18n("likeAnnouncements") + '<a href="' + url + '" target="_blank">' + id + "</a>...<font></font></li>");
                break;

              case "changeCountry":
                ele = $("<li>" + i18n("changeCountry") + text + "...<font></font></li>");
                break;

              case "joinDiscordServer":
              case "leaveDiscordServer":
              case "getDiscordGuild":
                ele = $("<li>" + i18n(type) + '<a href="https://discord.com/invite/' + text + '" target="_blank">' + text + "</a>...<font></font></li>");
                break;

              case "updateDiscordAuth":
                ele = $('<li style="color:red;">' + i18n("updateDiscordAuth") + "</li>");
                break;

              case "followTwitchChannel":
              case "unfollowTwitchChannel":
              case "getTwitchChannelId":
                ele = $("<li>" + i18n(type) + '<a href="https://www.twitch.tv/' + text + '" target="_blank">' + text + "</a>...<font></font></li>");
                break;

              case "getInsInfo":
                ele = $("<li>" + i18n("getInsInfo") + '<a href="https://www.instagram.com/' + text + '/" target="_blank">' + text + "</a>...<font></font></li>");
                break;

              case "followIns":
              case "unfollowIns":
                ele = $("<li>" + i18n(type) + '<a href="https://www.instagram.com/' + text + '/" target="_blank">' + text + "</a>...<font></font></li>");
                break;

              case "getTwitterUserId":
              case "followTwitterUser":
              case "unfollowTwitterUser":
                ele = $("<li>" + i18n(type) + '<a href="https://twitter.com/' + text + '" target="_blank">' + text + "</a>...<font></font></li>");
                break;

              case "retweet":
              case "unretweet":
                ele = $("<li>" + i18n(type) + text + "...<font></font></li>");
                break;

              case "joinReddit":
              case "leaveReddit":
                ele = $("<li>" + i18n(type) + '<a href="https://www.reddit.com/r/' + text + '/" target="_blank">' + text + "</a>...<font></font></li>");
                break;

              case "followRedditUser":
              case "unfollowRedditUser":
                ele = $("<li>" + i18n(type) + '<a href="https://www.reddit.com/user/' + text.replace("u_", "") + '" target="_blank">' + text.replace("u_", "") + "</a>...<font></font></li>");
                break;

              case "followYtbChannel":
              case "unfollowYtbChannel":
                ele = $("<li>" + i18n(type) + '<a href="https://www.youtube.com/channel/' + text + '" target="_blank">' + text + "</a>...<font></font></li>");
                break;

              case "likeYtbVideo":
              case "unlikeYtbVideo":
                ele = $("<li>" + i18n(type) + '<a href="https://www.youtube.com/watch?v=' + text + '" target="_blank">' + text + "</a>...<font></font></li>");
                break;

              case "getVkId":
              case "joinVkGroup":
              case "leaveVkGroup":
              case "joinVkPublic":
              case "leaveVkPublic":
              case "repostVkWall":
                ele = $("<li>" + i18n(type) + '<a href="https://vk.com/' + text + '/" target="_blank">' + text + "</a>...<font></font></li>");
                break;

              case "visitLink":
                ele = $("<li>" + i18n("visitLink") + '<a href="' + text + '" target="_blank">' + text + "</a>...<font></font></li>");
                break;

              case "text":
                ele = $("<li>" + i18n(text) + "<font></font></li>");
                break;

              case "html":
                ele = $(text);
                break;

              default:
                ele = $("<li>" + i18n("unknown") + ":" + type + "...<font></font></li>");
                break;
            }
            ele.addClass("card-text");
            $("#fuck-task-info").append(ele);
            ele[0].scrollIntoView();
            var font = ele.find("font");
            var status_1 = {
                font: font,
                success: function(text, html) {
                    if (text === void 0) {
                        text = "Success";
                    }
                    if (html === void 0) {
                        html = false;
                    }
                    this.font.attr("class", "").addClass("success");
                    html ? this.font.html(text) : this.font.text(text);
                    return this;
                },
                error: function(text, html) {
                    if (text === void 0) {
                        text = "Error";
                    }
                    if (html === void 0) {
                        html = false;
                    }
                    this.font.attr("class", "").addClass("error");
                    html ? this.font.html(text) : this.font.text(text);
                    return this;
                },
                warning: function(text, html) {
                    if (text === void 0) {
                        text = "Warning";
                    }
                    if (html === void 0) {
                        html = false;
                    }
                    this.font.attr("class", "").addClass("warning");
                    html ? this.font.html(text) : this.font.text(text);
                    return this;
                },
                info: function(text, html) {
                    if (text === void 0) {
                        text = "Info";
                    }
                    if (html === void 0) {
                        html = false;
                    }
                    this.font.attr("class", "").addClass("info");
                    html ? this.font.html(text) : this.font.text(text);
                    return this;
                },
                view: function() {
                    this.font[0].scrollIntoView();
                    return this;
                }
            };
            return status_1;
        } catch (error) {
            throwError(error, "echoLog");
            var status_2 = {
                success: function() {
                    return status_2;
                },
                error: function() {
                    return status_2;
                },
                warning: function() {
                    return status_2;
                },
                info: function() {
                    return status_2;
                },
                view: function() {
                    return status_2;
                }
            };
            return status_2;
        }
    }
    const scripts_echoLog = echoLog;
    var __extends = undefined && undefined.__extends || function() {
        var extendStatics = function(d, b) {
            extendStatics = Object.setPrototypeOf || {
                __proto__: []
            } instanceof Array && function(d, b) {
                d.__proto__ = b;
            } || function(d, b) {
                for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
            };
            return extendStatics(d, b);
        };
        return function(d, b) {
            if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    }();
    var Discord_awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P ? value : new P(function(resolve) {
                resolve(value);
            });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var Discord_generator = undefined && undefined.__generator || function(thisArg, body) {
        var _ = {
            label: 0,
            sent: function() {
                if (t[0] & 1) throw t[1];
                return t[1];
            },
            trys: [],
            ops: []
        }, f, y, t, g;
        return g = {
            next: verb(0),
            throw: verb(1),
            return: verb(2)
        }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
            return this;
        }), g;
        function verb(n) {
            return function(v) {
                return step([ n, v ]);
            };
        }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
                0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [ op[0] & 2, t.value ];
                switch (op[0]) {
                  case 0:
                  case 1:
                    t = op;
                    break;

                  case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };

                  case 5:
                    _.label++;
                    y = op[1];
                    op = [ 0 ];
                    continue;

                  case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;

                  default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
                }
                op = body.call(thisArg, _);
            } catch (e) {
                op = [ 6, e ];
                y = 0;
            } finally {
                f = t = 0;
            }
            if (op[0] & 5) throw op[1];
            return {
                value: op[0] ? op[1] : void 0,
                done: true
            };
        }
    };
    var Discord_read = undefined && undefined.__read || function(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        } catch (error) {
            e = {
                error: error
            };
        } finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            } finally {
                if (e) throw e.error;
            }
        }
        return ar;
    };
    var Discord_spreadArray = undefined && undefined.__spreadArray || function(to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    };
    var __values = undefined && undefined.__values || function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function() {
                if (o && i >= o.length) o = void 0;
                return {
                    value: o && o[i++],
                    done: !o
                };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    var Discord = function(_super) {
        __extends(Discord, _super);
        function Discord(id) {
            var _a;
            var _this = _super.call(this) || this;
            _this.tasks = GM_getValue("Discord-" + id) || {
                servers: []
            };
            _this.whiteList = ((_a = GM_getValue("whiteList")) === null || _a === void 0 ? void 0 : _a.discord) || {
                servers: []
            };
            _this.cache = GM_getValue("discordCache") || {};
            _this.auth = GM_getValue("discordAuth") || {};
            return _this;
        }
        Discord.prototype.init = function() {
            return Discord_awaiter(this, void 0, void 0, function() {
                var isVerified, error_1;
                return Discord_generator(this, function(_a) {
                    switch (_a.label) {
                      case 0:
                        _a.trys.push([ 0, 5, , 6 ]);
                        if (!!this.auth.auth) return [ 3, 2 ];
                        scripts_echoLog({
                            type: "updateDiscordAuth"
                        });
                        return [ 4, this.updateAuth() ];

                      case 1:
                        _a.sent();
                        _a.label = 2;

                      case 2:
                        return [ 4, this.verifyAuth() ];

                      case 3:
                        isVerified = _a.sent();
                        if (isVerified) {
                            scripts_echoLog({
                                text: "Init discord success!"
                            });
                            return [ 2, true ];
                        }
                        GM_setValue("discordAuth", {
                            auth: null
                        });
                        return [ 4, this.updateAuth() ];

                      case 4:
                        if (_a.sent()) {
                            scripts_echoLog({
                                text: "Init discord success!"
                            });
                            return [ 2, true ];
                        }
                        scripts_echoLog({
                            text: "Init discord failed!"
                        });
                        return [ 2, false ];

                      case 5:
                        error_1 = _a.sent();
                        throwError(error_1, "Discord.init");
                        return [ 2, false ];

                      case 6:
                        return [ 2 ];
                    }
                });
            });
        };
        Discord.prototype.verifyAuth = function() {
            return Discord_awaiter(this, void 0, void 0, function() {
                var logStatus, _a, result, statusText, status_1, data, error_2;
                return Discord_generator(this, function(_b) {
                    switch (_b.label) {
                      case 0:
                        _b.trys.push([ 0, 2, , 3 ]);
                        logStatus = scripts_echoLog({
                            type: "text",
                            text: "verifyDiscordAuth"
                        });
                        return [ 4, tools_httpRequest({
                            url: "https://discord.com/api/v6/users/@me",
                            method: "HEAD",
                            headers: {
                                authorization: this.auth.auth
                            }
                        }) ];

                      case 1:
                        _a = _b.sent(), result = _a.result, statusText = _a.statusText, status_1 = _a.status, 
                        data = _a.data;
                        if (result === "Success") {
                            if (data.status === 200) {
                                logStatus.success();
                                return [ 2, true ];
                            }
                            logStatus.error("Error:" + data.statusText + "(" + data.status + ")");
                            return [ 2, false ];
                        }
                        logStatus.error(result + ":" + statusText + "(" + status_1 + ")");
                        return [ 2, false ];

                      case 2:
                        error_2 = _b.sent();
                        throwError(error_2, "Discord.verifyAuth");
                        return [ 2, false ];

                      case 3:
                        return [ 2 ];
                    }
                });
            });
        };
        Discord.prototype.updateAuth = function() {
            return Discord_awaiter(this, void 0, void 0, function() {
                var logStatus_1, error_3;
                var _this = this;
                return Discord_generator(this, function(_a) {
                    switch (_a.label) {
                      case 0:
                        _a.trys.push([ 0, 2, , 3 ]);
                        logStatus_1 = scripts_echoLog({
                            type: "text",
                            text: "updateDiscordAuth"
                        });
                        return [ 4, new Promise(function(resolve) {
                            var newTab = GM_openInTab("https://discord.com/channels/@me?updateDiscordAuth", {
                                active: true,
                                insert: true,
                                setParent: true
                            });
                            newTab.onclose = function() {
                                return Discord_awaiter(_this, void 0, void 0, function() {
                                    var auth, _a;
                                    var _b;
                                    return Discord_generator(this, function(_c) {
                                        switch (_c.label) {
                                          case 0:
                                            auth = (_b = GM_getValue("discordAuth")) === null || _b === void 0 ? void 0 : _b.auth;
                                            if (!auth) return [ 3, 2 ];
                                            this.auth = {
                                                auth: auth
                                            };
                                            logStatus_1.success();
                                            _a = resolve;
                                            return [ 4, this.verifyAuth() ];

                                          case 1:
                                            _a.apply(void 0, [ _c.sent() ]);
                                            return [ 3, 3 ];

                                          case 2:
                                            logStatus_1.error("Error: Update discord auth failed!");
                                            resolve(false);
                                            _c.label = 3;

                                          case 3:
                                            return [ 2 ];
                                        }
                                    });
                                });
                            };
                        }) ];

                      case 1:
                        return [ 2, _a.sent() ];

                      case 2:
                        error_3 = _a.sent();
                        throwError(error_3, "Discord.updateAuth");
                        return [ 2, false ];

                      case 3:
                        return [ 2 ];
                    }
                });
            });
        };
        Discord.prototype.joinServer = function(inviteId) {
            var _a, _b;
            return Discord_awaiter(this, void 0, void 0, function() {
                var logStatus, _c, result, statusText, status_2, data, guild, error_4;
                return Discord_generator(this, function(_d) {
                    switch (_d.label) {
                      case 0:
                        _d.trys.push([ 0, 2, , 3 ]);
                        logStatus = scripts_echoLog({
                            type: "joinDiscordServer",
                            text: inviteId
                        });
                        return [ 4, tools_httpRequest({
                            url: "https://discord.com/api/v6/invites/" + inviteId,
                            method: "POST",
                            dataType: "json",
                            headers: {
                                authorization: this.auth.auth
                            }
                        }) ];

                      case 1:
                        _c = _d.sent(), result = _c.result, statusText = _c.statusText, status_2 = _c.status, 
                        data = _c.data;
                        if (result === "Success" && data.status === 200) {
                            logStatus.success();
                            guild = String((_b = (_a = data.response) === null || _a === void 0 ? void 0 : _a.guild) === null || _b === void 0 ? void 0 : _b.id);
                            if (guild) {
                                this.addId(inviteId, guild);
                                this.tasks.servers = unique(Discord_spreadArray(Discord_spreadArray([], Discord_read(this.tasks.servers), false), [ inviteId ], false));
                            }
                            return [ 2, true ];
                        }
                        logStatus.error(result + ":" + statusText + "(" + status_2 + ")");
                        return [ 2, false ];

                      case 2:
                        error_4 = _d.sent();
                        throwError(error_4, "Discord.joinServer");
                        return [ 2, false ];

                      case 3:
                        return [ 2 ];
                    }
                });
            });
        };
        Discord.prototype.leaveServer = function(inviteId) {
            return Discord_awaiter(this, void 0, void 0, function() {
                var guild, logStatus, _a, result, statusText, status_3, data, error_5;
                return Discord_generator(this, function(_b) {
                    switch (_b.label) {
                      case 0:
                        _b.trys.push([ 0, 3, , 4 ]);
                        if (this.whiteList.servers.includes(inviteId)) {
                            scripts_echoLog({
                                type: "whiteList",
                                text: inviteId
                            });
                            return [ 2, true ];
                        }
                        return [ 4, this.getGuild(inviteId) ];

                      case 1:
                        guild = _b.sent();
                        if (!guild) {
                            return [ 2, false ];
                        }
                        logStatus = scripts_echoLog({
                            type: "leaveDiscordServer",
                            text: inviteId
                        });
                        return [ 4, tools_httpRequest({
                            url: "https://discord.com/api/v6/users/@me/guilds/" + guild,
                            method: "DELETE",
                            headers: {
                                authorization: this.auth.auth
                            }
                        }) ];

                      case 2:
                        _a = _b.sent(), result = _a.result, statusText = _a.statusText, status_3 = _a.status, 
                        data = _a.data;
                        if (result === "Success" && data.status === 204) {
                            logStatus.success();
                            return [ 2, true ];
                        }
                        logStatus.error(result + ":" + statusText + "(" + status_3 + ")");
                        return [ 2, false ];

                      case 3:
                        error_5 = _b.sent();
                        throwError(error_5, "Discord.leaveServer");
                        return [ 2, false ];

                      case 4:
                        return [ 2 ];
                    }
                });
            });
        };
        Discord.prototype.getGuild = function(inviteId) {
            var _a;
            return Discord_awaiter(this, void 0, void 0, function() {
                var logStatus, guild, _b, result, statusText, status_4, data, guild_1, error_6;
                return Discord_generator(this, function(_c) {
                    switch (_c.label) {
                      case 0:
                        _c.trys.push([ 0, 2, , 3 ]);
                        logStatus = scripts_echoLog({
                            type: "getDiscordGuild",
                            text: inviteId
                        });
                        guild = this.getId(inviteId);
                        if (guild) {
                            logStatus.success();
                            return [ 2, guild ];
                        }
                        return [ 4, tools_httpRequest({
                            url: "https://discord.com/invite/" + inviteId,
                            method: "GET"
                        }) ];

                      case 1:
                        _b = _c.sent(), result = _b.result, statusText = _b.statusText, status_4 = _b.status, 
                        data = _b.data;
                        if (result === "Success" && data.status === 200) {
                            guild_1 = (_a = data.responseText.match(/https?:\/\/cdn\.discordapp\.com\/icons\/([\d]+?)\//)) === null || _a === void 0 ? void 0 : _a[1];
                            if (guild_1) {
                                logStatus.success();
                                this.addId(inviteId, guild_1);
                                return [ 2, guild_1 ];
                            }
                            logStatus.error(result + ":" + statusText + "(" + status_4 + ")");
                            return [ 2, false ];
                        }
                        logStatus.error(result + ":" + statusText + "(" + status_4 + ")");
                        return [ 2, false ];

                      case 2:
                        error_6 = _c.sent();
                        throwError(error_6, "Discord.getGuild");
                        return [ 2, false ];

                      case 3:
                        return [ 2 ];
                    }
                });
            });
        };
        Discord.prototype.toggleServers = function(_a) {
            var _b = _a.doTask, doTask = _b === void 0 ? true : _b, _c = _a.servers, servers = _c === void 0 ? [] : _c, _d = _a.serverLinks, serverLinks = _d === void 0 ? [] : _d;
            return Discord_awaiter(this, void 0, void 0, function() {
                var prom, realServers, realServers_1, realServers_1_1, server, e_1_1, error_7;
                var e_1, _e;
                return Discord_generator(this, function(_f) {
                    switch (_f.label) {
                      case 0:
                        _f.trys.push([ 0, 10, , 11 ]);
                        prom = [];
                        realServers = this.getRealParams("servers", servers, serverLinks, doTask, function(link) {
                            var _a;
                            return (_a = link.match(/invite\/(.+)/)) === null || _a === void 0 ? void 0 : _a[1];
                        });
                        if (!(realServers.length > 0)) return [ 3, 8 ];
                        _f.label = 1;

                      case 1:
                        _f.trys.push([ 1, 6, 7, 8 ]);
                        realServers_1 = __values(realServers), realServers_1_1 = realServers_1.next();
                        _f.label = 2;

                      case 2:
                        if (!!realServers_1_1.done) return [ 3, 5 ];
                        server = realServers_1_1.value;
                        prom.push(this[doTask ? "joinServer" : "leaveServer"](server));
                        return [ 4, delay(1e3) ];

                      case 3:
                        _f.sent();
                        _f.label = 4;

                      case 4:
                        realServers_1_1 = realServers_1.next();
                        return [ 3, 2 ];

                      case 5:
                        return [ 3, 8 ];

                      case 6:
                        e_1_1 = _f.sent();
                        e_1 = {
                            error: e_1_1
                        };
                        return [ 3, 8 ];

                      case 7:
                        try {
                            if (realServers_1_1 && !realServers_1_1.done && (_e = realServers_1.return)) _e.call(realServers_1);
                        } finally {
                            if (e_1) throw e_1.error;
                        }
                        return [ 7 ];

                      case 8:
                        return [ 4, Promise.all(prom).then(function() {
                            return true;
                        }) ];

                      case 9:
                        return [ 2, _f.sent() ];

                      case 10:
                        error_7 = _f.sent();
                        throwError(error_7, "Discord.toggleServers");
                        return [ 2, false ];

                      case 11:
                        return [ 2 ];
                    }
                });
            });
        };
        Discord.prototype.addId = function(inviteId, guild) {
            this.cache[inviteId] = guild;
            GM_setValue("discordCache", this.cache);
        };
        Discord.prototype.getId = function(inviteId) {
            return this.cache[inviteId];
        };
        return Discord;
    }(social_Social);
    const social_Discord = Discord;
    var Instagram_extends = undefined && undefined.__extends || function() {
        var extendStatics = function(d, b) {
            extendStatics = Object.setPrototypeOf || {
                __proto__: []
            } instanceof Array && function(d, b) {
                d.__proto__ = b;
            } || function(d, b) {
                for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
            };
            return extendStatics(d, b);
        };
        return function(d, b) {
            if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    }();
    var Instagram_awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P ? value : new P(function(resolve) {
                resolve(value);
            });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var Instagram_generator = undefined && undefined.__generator || function(thisArg, body) {
        var _ = {
            label: 0,
            sent: function() {
                if (t[0] & 1) throw t[1];
                return t[1];
            },
            trys: [],
            ops: []
        }, f, y, t, g;
        return g = {
            next: verb(0),
            throw: verb(1),
            return: verb(2)
        }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
            return this;
        }), g;
        function verb(n) {
            return function(v) {
                return step([ n, v ]);
            };
        }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
                0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [ op[0] & 2, t.value ];
                switch (op[0]) {
                  case 0:
                  case 1:
                    t = op;
                    break;

                  case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };

                  case 5:
                    _.label++;
                    y = op[1];
                    op = [ 0 ];
                    continue;

                  case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;

                  default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
                }
                op = body.call(thisArg, _);
            } catch (e) {
                op = [ 6, e ];
                y = 0;
            } finally {
                f = t = 0;
            }
            if (op[0] & 5) throw op[1];
            return {
                value: op[0] ? op[1] : void 0,
                done: true
            };
        }
    };
    var Instagram_read = undefined && undefined.__read || function(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        } catch (error) {
            e = {
                error: error
            };
        } finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            } finally {
                if (e) throw e.error;
            }
        }
        return ar;
    };
    var Instagram_spreadArray = undefined && undefined.__spreadArray || function(to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    };
    var Instagram_values = undefined && undefined.__values || function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function() {
                if (o && i >= o.length) o = void 0;
                return {
                    value: o && o[i++],
                    done: !o
                };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    var Instagram = function(_super) {
        Instagram_extends(Instagram, _super);
        function Instagram(id) {
            var _a;
            var _this = _super.call(this) || this;
            _this.tasks = GM_getValue("Instagram-" + id) || {
                users: []
            };
            _this.whiteList = ((_a = GM_getValue("whiteList")) === null || _a === void 0 ? void 0 : _a.instagram) || {
                users: []
            };
            return _this;
        }
        Instagram.prototype.init = function() {
            return Instagram_awaiter(this, void 0, void 0, function() {
                var isVerified, error_1;
                return Instagram_generator(this, function(_a) {
                    switch (_a.label) {
                      case 0:
                        _a.trys.push([ 0, 2, , 3 ]);
                        return [ 4, this.getUserInfo() ];

                      case 1:
                        isVerified = _a.sent();
                        if (isVerified) {
                            scripts_echoLog({
                                text: "Init instagram success!"
                            });
                            return [ 2, true ];
                        }
                        scripts_echoLog({
                            text: "Init instagram failed!"
                        });
                        return [ 2, false ];

                      case 2:
                        error_1 = _a.sent();
                        throwError(error_1, "Instagram.init");
                        return [ 2, false ];

                      case 3:
                        return [ 2 ];
                    }
                });
            });
        };
        Instagram.prototype.getUserInfo = function(name) {
            var _a, _b, _c;
            if (name === void 0) {
                name = "instagram";
            }
            return Instagram_awaiter(this, void 0, void 0, function() {
                var logStatus, _d, result, statusText, status_1, data, csrftoken, hash, id, error_2;
                return Instagram_generator(this, function(_e) {
                    switch (_e.label) {
                      case 0:
                        _e.trys.push([ 0, 2, , 3 ]);
                        logStatus = scripts_echoLog({
                            type: name === "instagram" ? "getInsInfo" : "getInsUserId",
                            text: name
                        });
                        return [ 4, tools_httpRequest({
                            url: "https://www.instagram.com/" + name + "/",
                            method: "GET"
                        }) ];

                      case 1:
                        _d = _e.sent(), result = _d.result, statusText = _d.statusText, status_1 = _d.status, 
                        data = _d.data;
                        if (result === "Success") {
                            if (data.finalUrl.includes("accounts/login")) {
                                logStatus.error("Error:" + i18n("loginIns"), true);
                                return [ 2, false ];
                            } else if (data.finalUrl.includes("www.instagram.com/challenge")) {
                                logStatus.error("Error:" + i18n("insBanned"));
                                return [ 2, false ];
                            }
                            if (data.status === 200) {
                                csrftoken = (_a = data.responseText.match(/"csrf_token":"(.+?)"/)) === null || _a === void 0 ? void 0 : _a[1];
                                hash = (_b = data.responseText.match(/"rollout_hash":"(.+?)"/)) === null || _b === void 0 ? void 0 : _b[1];
                                if (name === "instagram") {
                                    if (csrftoken && hash) {
                                        this.auth = {
                                            csrftoken: csrftoken,
                                            hash: hash
                                        };
                                        return [ 2, true ];
                                    }
                                    return [ 2, false ];
                                }
                                this.auth.csrftoken = csrftoken || this.auth.csrftoken;
                                this.auth.hash = csrftoken || this.auth.hash;
                                id = (_c = data.responseText.match(/"profilePage_([\d]+?)"/)) === null || _c === void 0 ? void 0 : _c[1];
                                if (id) {
                                    logStatus.success();
                                    return [ 2, id ];
                                }
                                logStatus.error("Error: Get ins data error!");
                                return [ 2, false ];
                            }
                            logStatus.error(result + ":" + statusText + "(" + status_1 + ")");
                            return [ 2, false ];
                        }
                        return [ 3, 3 ];

                      case 2:
                        error_2 = _e.sent();
                        throwError(error_2, "Instagram.getUserInfo");
                        return [ 2, false ];

                      case 3:
                        return [ 2 ];
                    }
                });
            });
        };
        Instagram.prototype.followUser = function(name) {
            var _a, _b;
            return Instagram_awaiter(this, void 0, void 0, function() {
                var id, logStatus, _c, result, statusText, status_2, data, error_3;
                return Instagram_generator(this, function(_d) {
                    switch (_d.label) {
                      case 0:
                        _d.trys.push([ 0, 3, , 4 ]);
                        return [ 4, this.getUserInfo(name) ];

                      case 1:
                        id = _d.sent();
                        if (!id) return [ 2, false ];
                        logStatus = scripts_echoLog({
                            type: "followIns",
                            text: name
                        });
                        return [ 4, tools_httpRequest({
                            url: "https://www.instagram.com/web/friendships/" + id + "/follow/",
                            method: "POST",
                            dataType: "json",
                            headers: {
                                "x-csrftoken": this.auth.csrftoken,
                                origin: "https://www.instagram.com",
                                referer: "https://www.instagram.com/" + name + "/",
                                "content-type": "application/x-www-form-urlencoded",
                                "sec-fetch-site": "same-origin",
                                "x-instagram-ajax": this.auth.hash
                            }
                        }) ];

                      case 2:
                        _c = _d.sent(), result = _c.result, statusText = _c.statusText, status_2 = _c.status, 
                        data = _c.data;
                        if (result === "Success") {
                            if (data.status === 200 && ((_a = data.response) === null || _a === void 0 ? void 0 : _a.result) === "following") {
                                logStatus.success();
                                this.tasks.users = unique(Instagram_spreadArray(Instagram_spreadArray([], Instagram_read(this.tasks.users), false), [ name ], false));
                                return [ 2, true ];
                            }
                            logStatus.error("Error:" + (((_b = data.response) === null || _b === void 0 ? void 0 : _b.feedback_message) || data.statusText + "(" + data.status + ")"));
                            return [ 2, false ];
                        }
                        logStatus.error(result + ":" + statusText + "(" + status_2 + ")");
                        return [ 2, false ];

                      case 3:
                        error_3 = _d.sent();
                        throwError(error_3, "Instagram.followUser");
                        return [ 2, false ];

                      case 4:
                        return [ 2 ];
                    }
                });
            });
        };
        Instagram.prototype.unfollowUser = function(name) {
            var _a;
            return Instagram_awaiter(this, void 0, void 0, function() {
                var id, logStatus, _b, result, statusText, status_3, data, error_4;
                return Instagram_generator(this, function(_c) {
                    switch (_c.label) {
                      case 0:
                        _c.trys.push([ 0, 3, , 4 ]);
                        if (this.whiteList.users.includes(name)) {
                            scripts_echoLog({
                                type: "whiteList",
                                text: name
                            });
                            return [ 2, true ];
                        }
                        return [ 4, this.getUserInfo(name) ];

                      case 1:
                        id = _c.sent();
                        if (!id) return [ 2, false ];
                        logStatus = scripts_echoLog({
                            type: "unfollowIns",
                            text: name
                        });
                        return [ 4, tools_httpRequest({
                            url: "https://www.instagram.com/web/friendships/" + id + "/unfollow/",
                            method: "POST",
                            dataType: "json",
                            headers: {
                                "x-csrftoken": this.auth.csrftoken,
                                origin: "https://www.instagram.com",
                                referer: "https://www.instagram.com/" + name + "/",
                                "content-type": "application/x-www-form-urlencoded",
                                "sec-fetch-site": "same-origin",
                                "x-instagram-ajax": this.auth.hash
                            }
                        }) ];

                      case 2:
                        _b = _c.sent(), result = _b.result, statusText = _b.statusText, status_3 = _b.status, 
                        data = _b.data;
                        if (result === "Success") {
                            if (data.status === 200 && ((_a = data.response) === null || _a === void 0 ? void 0 : _a.status) === "ok") {
                                logStatus.success();
                                return [ 2, true ];
                            }
                            logStatus.error("Error:" + data.statusText + "(" + data.status + ")");
                            return [ 2, false ];
                        }
                        logStatus.error(result + ":" + statusText + "(" + status_3 + ")");
                        return [ 2, false ];

                      case 3:
                        error_4 = _c.sent();
                        throwError(error_4, "Instagram.unfollowUser");
                        return [ 2, false ];

                      case 4:
                        return [ 2 ];
                    }
                });
            });
        };
        Instagram.prototype.toggle = function(_a) {
            var _b = _a.doTask, doTask = _b === void 0 ? true : _b, _c = _a.users, users = _c === void 0 ? [] : _c, _d = _a.userLinks, userLinks = _d === void 0 ? [] : _d;
            return Instagram_awaiter(this, void 0, void 0, function() {
                var prom, realUsers, realUsers_1, realUsers_1_1, username, e_1_1, error_5;
                var e_1, _e;
                return Instagram_generator(this, function(_f) {
                    switch (_f.label) {
                      case 0:
                        _f.trys.push([ 0, 10, , 11 ]);
                        prom = [];
                        realUsers = this.getRealParams("users", users, userLinks, doTask, function(link) {
                            var _a;
                            return (_a = link.match(/https:\/\/www\.instagram\.com\/(.+)?\//)) === null || _a === void 0 ? void 0 : _a[1];
                        });
                        if (!(realUsers.length > 0)) return [ 3, 8 ];
                        _f.label = 1;

                      case 1:
                        _f.trys.push([ 1, 6, 7, 8 ]);
                        realUsers_1 = Instagram_values(realUsers), realUsers_1_1 = realUsers_1.next();
                        _f.label = 2;

                      case 2:
                        if (!!realUsers_1_1.done) return [ 3, 5 ];
                        username = realUsers_1_1.value;
                        prom.push(this[doTask ? "followUser" : "unfollowUser"](username));
                        return [ 4, delay(1e3) ];

                      case 3:
                        _f.sent();
                        _f.label = 4;

                      case 4:
                        realUsers_1_1 = realUsers_1.next();
                        return [ 3, 2 ];

                      case 5:
                        return [ 3, 8 ];

                      case 6:
                        e_1_1 = _f.sent();
                        e_1 = {
                            error: e_1_1
                        };
                        return [ 3, 8 ];

                      case 7:
                        try {
                            if (realUsers_1_1 && !realUsers_1_1.done && (_e = realUsers_1.return)) _e.call(realUsers_1);
                        } finally {
                            if (e_1) throw e_1.error;
                        }
                        return [ 7 ];

                      case 8:
                        return [ 4, Promise.all(prom).then(function() {
                            return true;
                        }) ];

                      case 9:
                        return [ 2, _f.sent() ];

                      case 10:
                        error_5 = _f.sent();
                        throwError(error_5, "Instagram.toggleUsers");
                        return [ 2, false ];

                      case 11:
                        return [ 2 ];
                    }
                });
            });
        };
        return Instagram;
    }(social_Social);
    const social_Instagram = Instagram;
    var Reddit_extends = undefined && undefined.__extends || function() {
        var extendStatics = function(d, b) {
            extendStatics = Object.setPrototypeOf || {
                __proto__: []
            } instanceof Array && function(d, b) {
                d.__proto__ = b;
            } || function(d, b) {
                for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
            };
            return extendStatics(d, b);
        };
        return function(d, b) {
            if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    }();
    var Reddit_awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P ? value : new P(function(resolve) {
                resolve(value);
            });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var Reddit_generator = undefined && undefined.__generator || function(thisArg, body) {
        var _ = {
            label: 0,
            sent: function() {
                if (t[0] & 1) throw t[1];
                return t[1];
            },
            trys: [],
            ops: []
        }, f, y, t, g;
        return g = {
            next: verb(0),
            throw: verb(1),
            return: verb(2)
        }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
            return this;
        }), g;
        function verb(n) {
            return function(v) {
                return step([ n, v ]);
            };
        }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
                0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [ op[0] & 2, t.value ];
                switch (op[0]) {
                  case 0:
                  case 1:
                    t = op;
                    break;

                  case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };

                  case 5:
                    _.label++;
                    y = op[1];
                    op = [ 0 ];
                    continue;

                  case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;

                  default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
                }
                op = body.call(thisArg, _);
            } catch (e) {
                op = [ 6, e ];
                y = 0;
            } finally {
                f = t = 0;
            }
            if (op[0] & 5) throw op[1];
            return {
                value: op[0] ? op[1] : void 0,
                done: true
            };
        }
    };
    var Reddit_read = undefined && undefined.__read || function(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        } catch (error) {
            e = {
                error: error
            };
        } finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            } finally {
                if (e) throw e.error;
            }
        }
        return ar;
    };
    var Reddit_spreadArray = undefined && undefined.__spreadArray || function(to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    };
    var Reddit_values = undefined && undefined.__values || function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function() {
                if (o && i >= o.length) o = void 0;
                return {
                    value: o && o[i++],
                    done: !o
                };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    var Reddit = function(_super) {
        Reddit_extends(Reddit, _super);
        function Reddit(id) {
            var _a;
            var _this = _super.call(this) || this;
            _this.tasks = GM_getValue("Reddit-" + id) || {
                reddits: []
            };
            _this.whiteList = ((_a = GM_getValue("whiteList")) === null || _a === void 0 ? void 0 : _a.reddit) || {
                reddits: []
            };
            _this.auth = GM_getValue("redditAuth") || {};
            return _this;
        }
        Reddit.prototype.init = function() {
            return Reddit_awaiter(this, void 0, void 0, function() {
                var isVerified, error_1;
                return Reddit_generator(this, function(_a) {
                    switch (_a.label) {
                      case 0:
                        _a.trys.push([ 0, 2, , 3 ]);
                        return [ 4, this.updateToken() ];

                      case 1:
                        isVerified = _a.sent();
                        if (isVerified) {
                            scripts_echoLog({
                                text: "Init reddit success!"
                            });
                            return [ 2, true ];
                        }
                        scripts_echoLog({
                            text: "Init reddit failed!"
                        });
                        return [ 2, false ];

                      case 2:
                        error_1 = _a.sent();
                        throwError(error_1, "Reddit.init");
                        return [ 2, false ];

                      case 3:
                        return [ 2 ];
                    }
                });
            });
        };
        Reddit.prototype.updateToken = function() {
            return Reddit_awaiter(this, void 0, void 0, function() {
                var logStatus, _a, result, statusText, status_1, data, _b, accessToken, error_2;
                return Reddit_generator(this, function(_c) {
                    switch (_c.label) {
                      case 0:
                        _c.trys.push([ 0, 2, , 3 ]);
                        logStatus = scripts_echoLog({
                            type: "text",
                            text: "updateRedditInfo"
                        });
                        return [ 4, tools_httpRequest({
                            url: "https://www.reddit.com/",
                            method: "GET",
                            nochche: true,
                            headers: {
                                "Cache-Control": "no-cache"
                            }
                        }) ];

                      case 1:
                        _a = _c.sent(), result = _a.result, statusText = _a.statusText, status_1 = _a.status, 
                        data = _a.data;
                        if (result === "Success") {
                            if (data.status === 200) {
                                if (data.responseText.includes("www.reddit.com/login/")) {
                                    logStatus.error("Error:" + i18n("loginReddit"), true);
                                    return [ 2, false ];
                                }
                                _b = Reddit_read(data.responseText.match(/"accessToken":"(.*?)","expires":"(.*?)"/) || [], 2), 
                                accessToken = _b[1];
                                if (accessToken) {
                                    this.auth.token = accessToken;
                                    logStatus.success();
                                    return [ 2, true ];
                                }
                                logStatus.error('Error: Parameter "accessToken" not found!');
                                return [ 2, false ];
                            }
                            logStatus.error("Error:" + data.statusText + "(" + data.status + ")");
                            return [ 2, false ];
                        }
                        logStatus.error(result + ":" + statusText + "(" + status_1 + ")");
                        return [ 2, false ];

                      case 2:
                        error_2 = _c.sent();
                        throwError(error_2, "Reddit.updateToken");
                        return [ 2, false ];

                      case 3:
                        return [ 2 ];
                    }
                });
            });
        };
        Reddit.prototype.toggleTask = function(_a) {
            var name = _a.name, _b = _a.doTask, doTask = _b === void 0 ? true : _b;
            return Reddit_awaiter(this, void 0, void 0, function() {
                var type, logStatus, _c, result, statusText, status_2, data, error_3;
                return Reddit_generator(this, function(_d) {
                    switch (_d.label) {
                      case 0:
                        _d.trys.push([ 0, 2, , 3 ]);
                        if (!doTask && this.whiteList.reddits.includes(name)) {
                            scripts_echoLog({
                                type: "whiteList",
                                text: name
                            });
                            return [ 2, true ];
                        }
                        type = doTask ? "joinReddit" : "leaveReddit";
                        if (/^u_/.test(name)) {
                            type = doTask ? "followRedditUser" : "unfollowRedditUser";
                        }
                        logStatus = scripts_echoLog({
                            type: type,
                            text: name
                        });
                        return [ 4, tools_httpRequest({
                            url: "https://oauth.reddit.com/api/subscribe?redditWebClient=desktop2x&app=desktop2x-client-production&raw_json=1&gilding_detail=1",
                            method: "POST",
                            headers: {
                                authorization: "Bearer " + this.auth.token,
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            data: $.param({
                                action: doTask ? "sub" : "unsub",
                                sr_name: name,
                                api_type: "json"
                            })
                        }) ];

                      case 1:
                        _c = _d.sent(), result = _c.result, statusText = _c.statusText, status_2 = _c.status, 
                        data = _c.data;
                        if (result === "Success") {
                            if (data.status === 200) {
                                logStatus.success();
                                if (doTask) this.tasks.reddits = unique(Reddit_spreadArray(Reddit_spreadArray([], Reddit_read(this.tasks.reddits), false), [ name ], false));
                                return [ 2, true ];
                            }
                            logStatus.error("Error:" + data.statusText + "(" + data.status + ")");
                            return [ 2, false ];
                        }
                        logStatus.error(result + ":" + statusText + "(" + status_2 + ")");
                        return [ 2, false ];

                      case 2:
                        error_3 = _d.sent();
                        throwError(error_3, "Reddit.toggleTask");
                        return [ 2, false ];

                      case 3:
                        return [ 2 ];
                    }
                });
            });
        };
        Reddit.prototype.toggle = function(_a) {
            var _b = _a.doTask, doTask = _b === void 0 ? true : _b, _c = _a.reddits, reddits = _c === void 0 ? [] : _c, _d = _a.redditLinks, redditLinks = _d === void 0 ? [] : _d;
            return Reddit_awaiter(this, void 0, void 0, function() {
                var prom, realReddits, realReddits_1, realReddits_1_1, name_1, e_1_1, error_4;
                var e_1, _e;
                return Reddit_generator(this, function(_f) {
                    switch (_f.label) {
                      case 0:
                        _f.trys.push([ 0, 10, , 11 ]);
                        prom = [];
                        realReddits = this.getRealParams("reddits", reddits, redditLinks, doTask, function(link) {
                            var _a, _b;
                            var name = (_a = link.match(/https?:\/\/www\.reddit\.com\/r\/([^/]*)/)) === null || _a === void 0 ? void 0 : _a[1];
                            var userName = (_b = link.match(/https?:\/\/www\.reddit\.com\/user\/([^/]*)/)) === null || _b === void 0 ? void 0 : _b[1];
                            if (userName) {
                                return name || userName;
                            }
                            return name;
                        });
                        if (!(realReddits.length > 0)) return [ 3, 8 ];
                        _f.label = 1;

                      case 1:
                        _f.trys.push([ 1, 6, 7, 8 ]);
                        realReddits_1 = Reddit_values(realReddits), realReddits_1_1 = realReddits_1.next();
                        _f.label = 2;

                      case 2:
                        if (!!realReddits_1_1.done) return [ 3, 5 ];
                        name_1 = realReddits_1_1.value;
                        prom.push(this.toggleTask({
                            name: name_1,
                            doTask: doTask
                        }));
                        return [ 4, delay(1e3) ];

                      case 3:
                        _f.sent();
                        _f.label = 4;

                      case 4:
                        realReddits_1_1 = realReddits_1.next();
                        return [ 3, 2 ];

                      case 5:
                        return [ 3, 8 ];

                      case 6:
                        e_1_1 = _f.sent();
                        e_1 = {
                            error: e_1_1
                        };
                        return [ 3, 8 ];

                      case 7:
                        try {
                            if (realReddits_1_1 && !realReddits_1_1.done && (_e = realReddits_1.return)) _e.call(realReddits_1);
                        } finally {
                            if (e_1) throw e_1.error;
                        }
                        return [ 7 ];

                      case 8:
                        return [ 4, Promise.all(prom).then(function() {
                            return true;
                        }) ];

                      case 9:
                        return [ 2, _f.sent() ];

                      case 10:
                        error_4 = _f.sent();
                        throwError(error_4, "Reddit.toggle");
                        return [ 2, false ];

                      case 11:
                        return [ 2 ];
                    }
                });
            });
        };
        return Reddit;
    }(social_Social);
    const social_Reddit = Reddit;
    var Twitch_extends = undefined && undefined.__extends || function() {
        var extendStatics = function(d, b) {
            extendStatics = Object.setPrototypeOf || {
                __proto__: []
            } instanceof Array && function(d, b) {
                d.__proto__ = b;
            } || function(d, b) {
                for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
            };
            return extendStatics(d, b);
        };
        return function(d, b) {
            if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    }();
    var Twitch_awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P ? value : new P(function(resolve) {
                resolve(value);
            });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var Twitch_generator = undefined && undefined.__generator || function(thisArg, body) {
        var _ = {
            label: 0,
            sent: function() {
                if (t[0] & 1) throw t[1];
                return t[1];
            },
            trys: [],
            ops: []
        }, f, y, t, g;
        return g = {
            next: verb(0),
            throw: verb(1),
            return: verb(2)
        }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
            return this;
        }), g;
        function verb(n) {
            return function(v) {
                return step([ n, v ]);
            };
        }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
                0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [ op[0] & 2, t.value ];
                switch (op[0]) {
                  case 0:
                  case 1:
                    t = op;
                    break;

                  case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };

                  case 5:
                    _.label++;
                    y = op[1];
                    op = [ 0 ];
                    continue;

                  case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;

                  default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
                }
                op = body.call(thisArg, _);
            } catch (e) {
                op = [ 6, e ];
                y = 0;
            } finally {
                f = t = 0;
            }
            if (op[0] & 5) throw op[1];
            return {
                value: op[0] ? op[1] : void 0,
                done: true
            };
        }
    };
    var Twitch_read = undefined && undefined.__read || function(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        } catch (error) {
            e = {
                error: error
            };
        } finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            } finally {
                if (e) throw e.error;
            }
        }
        return ar;
    };
    var Twitch_spreadArray = undefined && undefined.__spreadArray || function(to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    };
    var Twitch_values = undefined && undefined.__values || function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function() {
                if (o && i >= o.length) o = void 0;
                return {
                    value: o && o[i++],
                    done: !o
                };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    var Twitch = function(_super) {
        Twitch_extends(Twitch, _super);
        function Twitch(id) {
            var _a;
            var _this = _super.call(this) || this;
            _this.tasks = GM_getValue("Twitch-" + id) || {
                channels: []
            };
            _this.whiteList = ((_a = GM_getValue("whiteList")) === null || _a === void 0 ? void 0 : _a.twitch) || {
                channels: []
            };
            _this.auth = GM_getValue("twitchAuth") || {};
            return _this;
        }
        Twitch.prototype.init = function() {
            return Twitch_awaiter(this, void 0, void 0, function() {
                var isVerified, error_1;
                return Twitch_generator(this, function(_a) {
                    switch (_a.label) {
                      case 0:
                        _a.trys.push([ 0, 2, , 3 ]);
                        return [ 4, this.verifyToken() ];

                      case 1:
                        isVerified = _a.sent();
                        if (isVerified) {
                            scripts_echoLog({
                                text: "Init twitch success!"
                            });
                            return [ 2, true ];
                        }
                        scripts_echoLog({
                            text: "Init twitch failed!"
                        });
                        return [ 2, false ];

                      case 2:
                        error_1 = _a.sent();
                        throwError(error_1, "Twitch.init");
                        return [ 2, false ];

                      case 3:
                        return [ 2 ];
                    }
                });
            });
        };
        Twitch.prototype.verifyToken = function() {
            var _a, _b, _c;
            return Twitch_awaiter(this, void 0, void 0, function() {
                var logStatus, _d, result, statusText, status_1, data, error_2;
                return Twitch_generator(this, function(_e) {
                    switch (_e.label) {
                      case 0:
                        _e.trys.push([ 0, 2, , 3 ]);
                        logStatus = scripts_echoLog({
                            type: "text",
                            text: "verifyTwitchAuth"
                        });
                        return [ 4, tools_httpRequest({
                            url: "https://gql.twitch.tv/gql",
                            method: "POST",
                            dataType: "json",
                            headers: {
                                Authorization: "OAuth " + this.auth.authToken,
                                "Client-Id": this.auth.clientId
                            },
                            data: '[{"operationName":"FrontPageNew_User","variables":{"limit":1},"extensions":{"persistedQuery":{"version":1,' + '"sha256Hash":"64bd07a2cbaca80699d62636d966cf6395a5d14a1f0a14282067dcb28b13eb11"}}}]'
                        }) ];

                      case 1:
                        _d = _e.sent(), result = _d.result, statusText = _d.statusText, status_1 = _d.status, 
                        data = _d.data;
                        if (result === "Success") {
                            if (data.status === 200 && ((_c = (_b = (_a = data.response) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.currentUser)) {
                                logStatus.success();
                                return [ 2, true ];
                            }
                            logStatus.error("Error:" + data.statusText + "(" + data.status + ")");
                            return [ 2, false ];
                        }
                        logStatus.error(result + ":" + statusText + "(" + status_1 + ")");
                        return [ 2, false ];

                      case 2:
                        error_2 = _e.sent();
                        throwError(error_2, "Twitch.verifyToken");
                        return [ 2, false ];

                      case 3:
                        return [ 2 ];
                    }
                });
            });
        };
        Twitch.prototype.updateToken = function(notice) {
            try {
                var authToken = Cookies.get("auth-token");
                var isLogin = !!Cookies.get("login");
                if (authToken && isLogin) {
                    this.auth.authToken = authToken;
                    this.auth.clientId = commonOptions === null || commonOptions === void 0 ? void 0 : commonOptions.headers["Client-ID"];
                    if (notice) {
                        Swal.fire({
                            title: i18n("updateTwitchInfoSuccess"),
                            icon: "success"
                        });
                    }
                } else {
                    if (notice) {
                        Swal.fire({
                            title: i18n("needLogin"),
                            icon: "warning"
                        });
                    }
                }
            } catch (error) {
                throwError(error, "Twitch.updateToken");
                if (notice) {
                    Swal.fire({
                        title: i18n("updateTwitchInfoError"),
                        icon: "error"
                    });
                }
            }
        };
        Twitch.prototype.toggleChannel = function(_a) {
            var name = _a.name, _b = _a.doTask, doTask = _b === void 0 ? true : _b;
            return Twitch_awaiter(this, void 0, void 0, function() {
                var channelId, logStatus, followData, unfollowData, _c, result, statusText, status_2, data, error_3;
                return Twitch_generator(this, function(_d) {
                    switch (_d.label) {
                      case 0:
                        _d.trys.push([ 0, 3, , 4 ]);
                        if (!doTask && this.whiteList.channels.includes(name)) {
                            scripts_echoLog({
                                type: "whiteList",
                                text: name
                            });
                            return [ 2, true ];
                        }
                        return [ 4, this.getChannelId(name) ];

                      case 1:
                        channelId = _d.sent();
                        if (!channelId) return [ 2, false ];
                        logStatus = scripts_echoLog({
                            type: (doTask ? "" : "un") + "followTwitchChannel",
                            text: name
                        });
                        followData = '[{"operationName":"FollowButton_FollowUser","variables":{"input":{"disableNotifications":false,"targetID":"' + channelId + '"}},"extensions":{"persistedQuery":{"version":1,"sha256Hash":"3efee1acda90efdff9fef6e6b4a29213be3ee490781c5b54469717b6131ffdfe"}}}]';
                        unfollowData = '[{"operationName":"FollowButton_UnfollowUser","variables":{"input":{"targetID":"' + channelId + '"}},' + '"extensions":{"persistedQuery":{"version":1,"sha256Hash":"d7fbdb4e9780dcdc0cc1618ec783309471cd05a59584fc3c56ea1c52bb632d41"}}}]';
                        return [ 4, tools_httpRequest({
                            url: "https://gql.twitch.tv/gql",
                            method: "POST",
                            dataType: "json",
                            headers: {
                                Authorization: "OAuth " + this.auth.authToken
                            },
                            data: doTask ? followData : unfollowData
                        }) ];

                      case 2:
                        _c = _d.sent(), result = _c.result, statusText = _c.statusText, status_2 = _c.status, 
                        data = _c.data;
                        if (result === "Success") {
                            if (data.status === 200) {
                                logStatus.success();
                                if (doTask) {
                                    this.tasks.channels = unique(Twitch_spreadArray(Twitch_spreadArray([], Twitch_read(this.tasks.channels), false), [ name ], false));
                                }
                                return [ 2, true ];
                            }
                            logStatus.error("Error:" + data.statusText + "(" + data.status + ")");
                            return [ 2, false ];
                        }
                        logStatus.error(result + ":" + statusText + "(" + status_2 + ")");
                        return [ 2, false ];

                      case 3:
                        error_3 = _d.sent();
                        throwError(error_3, "Twitch.toggleChannel");
                        return [ 2, false ];

                      case 4:
                        return [ 2 ];
                    }
                });
            });
        };
        Twitch.prototype.getChannelId = function(name) {
            var _a, _b, _c, _d;
            return Twitch_awaiter(this, void 0, void 0, function() {
                var logStatus, _e, result, statusText, status_3, data, channelId, error_4;
                return Twitch_generator(this, function(_f) {
                    switch (_f.label) {
                      case 0:
                        _f.trys.push([ 0, 2, , 3 ]);
                        logStatus = scripts_echoLog({
                            type: "getTwitchChannelId",
                            text: name
                        });
                        return [ 4, tools_httpRequest({
                            url: "https://gql.twitch.tv/gql",
                            method: "POST",
                            headers: {
                                Authorization: "OAuth " + this.auth.authToken,
                                "Client-Id": this.auth.clientId
                            },
                            responseType: "json",
                            data: '[{"operationName":"ActiveWatchParty","variables":{"channelLogin":"' + name + '"},' + '"extensions":{"persistedQuery":{"version":1,"sha256Hash":"4a8156c97b19e3a36e081cf6d6ddb5dbf9f9b02ae60e4d2ff26ed70aebc80a30"}}}]'
                        }) ];

                      case 1:
                        _e = _f.sent(), result = _e.result, statusText = _e.statusText, status_3 = _e.status, 
                        data = _e.data;
                        if (result === "Success") {
                            if (data.status === 200) {
                                channelId = String((_d = (_c = (_b = (_a = data.response) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.user) === null || _d === void 0 ? void 0 : _d.id);
                                if (channelId) {
                                    logStatus.success();
                                    return [ 2, channelId ];
                                }
                                logStatus.error("Error:" + data.statusText + "(" + data.status + ")");
                                return [ 2, false ];
                            }
                            logStatus.error("Error:" + data.statusText + "(" + data.status + ")");
                            return [ 2, false ];
                        }
                        logStatus.error(result + ":" + statusText + "(" + status_3 + ")");
                        return [ 2, false ];

                      case 2:
                        error_4 = _f.sent();
                        throwError(error_4, "Twitch.getChannelId");
                        return [ 2, false ];

                      case 3:
                        return [ 2 ];
                    }
                });
            });
        };
        Twitch.prototype.toggle = function(_a) {
            var _b = _a.doTask, doTask = _b === void 0 ? true : _b, _c = _a.channels, channels = _c === void 0 ? [] : _c, _d = _a.channelLinks, channelLinks = _d === void 0 ? [] : _d;
            return Twitch_awaiter(this, void 0, void 0, function() {
                var prom, realChannels, realChannels_1, realChannels_1_1, channel, e_1_1, error_5;
                var e_1, _e;
                return Twitch_generator(this, function(_f) {
                    switch (_f.label) {
                      case 0:
                        _f.trys.push([ 0, 9, , 10 ]);
                        prom = [];
                        realChannels = this.getRealParams("channels", channels, channelLinks, doTask, function(link) {
                            var _a;
                            return (_a = link.match(/https:\/\/www\.twitch\.tv\/(.+)/)) === null || _a === void 0 ? void 0 : _a[1];
                        });
                        if (!(realChannels.length > 0)) return [ 3, 8 ];
                        _f.label = 1;

                      case 1:
                        _f.trys.push([ 1, 6, 7, 8 ]);
                        realChannels_1 = Twitch_values(realChannels), realChannels_1_1 = realChannels_1.next();
                        _f.label = 2;

                      case 2:
                        if (!!realChannels_1_1.done) return [ 3, 5 ];
                        channel = realChannels_1_1.value;
                        prom.push(this.toggleChannel({
                            name: channel,
                            doTask: doTask
                        }));
                        return [ 4, delay(1e3) ];

                      case 3:
                        _f.sent();
                        _f.label = 4;

                      case 4:
                        realChannels_1_1 = realChannels_1.next();
                        return [ 3, 2 ];

                      case 5:
                        return [ 3, 8 ];

                      case 6:
                        e_1_1 = _f.sent();
                        e_1 = {
                            error: e_1_1
                        };
                        return [ 3, 8 ];

                      case 7:
                        try {
                            if (realChannels_1_1 && !realChannels_1_1.done && (_e = realChannels_1.return)) _e.call(realChannels_1);
                        } finally {
                            if (e_1) throw e_1.error;
                        }
                        return [ 7 ];

                      case 8:
                        return [ 2, Promise.all(prom).then(function() {
                            return true;
                        }) ];

                      case 9:
                        error_5 = _f.sent();
                        throwError(error_5, "Twitch.toggle");
                        return [ 2, false ];

                      case 10:
                        return [ 2 ];
                    }
                });
            });
        };
        return Twitch;
    }(social_Social);
    const social_Twitch = Twitch;
    var Twitter_extends = undefined && undefined.__extends || function() {
        var extendStatics = function(d, b) {
            extendStatics = Object.setPrototypeOf || {
                __proto__: []
            } instanceof Array && function(d, b) {
                d.__proto__ = b;
            } || function(d, b) {
                for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
            };
            return extendStatics(d, b);
        };
        return function(d, b) {
            if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    }();
    var Twitter_awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P ? value : new P(function(resolve) {
                resolve(value);
            });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var Twitter_generator = undefined && undefined.__generator || function(thisArg, body) {
        var _ = {
            label: 0,
            sent: function() {
                if (t[0] & 1) throw t[1];
                return t[1];
            },
            trys: [],
            ops: []
        }, f, y, t, g;
        return g = {
            next: verb(0),
            throw: verb(1),
            return: verb(2)
        }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
            return this;
        }), g;
        function verb(n) {
            return function(v) {
                return step([ n, v ]);
            };
        }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
                0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [ op[0] & 2, t.value ];
                switch (op[0]) {
                  case 0:
                  case 1:
                    t = op;
                    break;

                  case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };

                  case 5:
                    _.label++;
                    y = op[1];
                    op = [ 0 ];
                    continue;

                  case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;

                  default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
                }
                op = body.call(thisArg, _);
            } catch (e) {
                op = [ 6, e ];
                y = 0;
            } finally {
                f = t = 0;
            }
            if (op[0] & 5) throw op[1];
            return {
                value: op[0] ? op[1] : void 0,
                done: true
            };
        }
    };
    var Twitter_read = undefined && undefined.__read || function(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        } catch (error) {
            e = {
                error: error
            };
        } finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            } finally {
                if (e) throw e.error;
            }
        }
        return ar;
    };
    var Twitter_spreadArray = undefined && undefined.__spreadArray || function(to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    };
    var Twitter_values = undefined && undefined.__values || function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function() {
                if (o && i >= o.length) o = void 0;
                return {
                    value: o && o[i++],
                    done: !o
                };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    var Twitter = function(_super) {
        Twitter_extends(Twitter, _super);
        function Twitter(id) {
            var _a;
            var _this = _super.call(this) || this;
            _this.tasks = GM_getValue("Twitter-" + id) || {
                users: [],
                retweets: [],
                likes: []
            };
            _this.whiteList = ((_a = GM_getValue("whiteList")) === null || _a === void 0 ? void 0 : _a.twitter) || {
                users: [],
                retweets: [],
                likes: []
            };
            _this.auth = GM_getValue("twitterAuth") || {};
            return _this;
        }
        Twitter.prototype.init = function() {
            return Twitter_awaiter(this, void 0, void 0, function() {
                var isVerified;
                return Twitter_generator(this, function(_a) {
                    try {
                        isVerified = false;
                        if (isVerified) {
                            scripts_echoLog({
                                text: "Init twitter success!"
                            });
                            return [ 2, true ];
                        }
                        scripts_echoLog({
                            text: "Init twitter failed!"
                        });
                        return [ 2, false ];
                    } catch (error) {
                        throwError(error, "Twitter.init");
                        return [ 2, false ];
                    }
                    return [ 2 ];
                });
            });
        };
        Twitter.prototype.updateToken = function() {
            return Twitter_awaiter(this, void 0, void 0, function() {
                var ct0;
                return Twitter_generator(this, function(_a) {
                    try {
                        if (!window.location.href.includes("login")) {
                            if (Cookies.get("twid")) {
                                ct0 = Cookies.get("ct0");
                                if (ct0) {
                                    this.auth.ct0 = ct0;
                                    return [ 2, true ];
                                }
                                window.close();
                                return [ 2, false ];
                            }
                        }
                        this.auth.isLogin = false;
                        return [ 2, false ];
                    } catch (error) {
                        throwError(error, "Twitter.updateToken");
                        return [ 2, false ];
                    }
                    return [ 2 ];
                });
            });
        };
        Twitter.prototype.toggleUser = function(_a) {
            var name = _a.name, _b = _a.doTask, doTask = _b === void 0 ? true : _b;
            return Twitter_awaiter(this, void 0, void 0, function() {
                var userId, logStatus, _c, result, statusText, status_1, data, error_1;
                return Twitter_generator(this, function(_d) {
                    switch (_d.label) {
                      case 0:
                        _d.trys.push([ 0, 3, , 4 ]);
                        if (!doTask && this.whiteList.users.includes(name)) {
                            scripts_echoLog({
                                type: "whiteList",
                                text: name
                            });
                            return [ 2, true ];
                        }
                        return [ 4, this.getUserId(name) ];

                      case 1:
                        userId = _d.sent();
                        if (!userId) return [ 2, false ];
                        logStatus = scripts_echoLog({
                            type: (doTask ? "" : "un") + "followTwitterUser",
                            text: name
                        });
                        return [ 4, tools_httpRequest({
                            url: "https://api.twitter.com/1.1/friendships/" + (doTask ? "create" : "destroy") + ".json",
                            method: "POST",
                            headers: {
                                authorization: "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA",
                                "Content-Type": "application/x-www-form-urlencoded",
                                "x-csrf-token": this.auth.ct0
                            },
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
                        }) ];

                      case 2:
                        _c = _d.sent(), result = _c.result, statusText = _c.statusText, status_1 = _c.status, 
                        data = _c.data;
                        if (result === "Success") {
                            if (data.status === 200) {
                                logStatus.success();
                                if (doTask) this.tasks.users = unique(Twitter_spreadArray(Twitter_spreadArray([], Twitter_read(this.tasks.users), false), [ name ], false));
                                return [ 2, true ];
                            }
                            logStatus.error("Error:" + data.statusText + "(" + data.status + ")");
                            return [ 2, false ];
                        }
                        logStatus.error(result + ":" + statusText + "(" + status_1 + ")");
                        return [ 2, false ];

                      case 3:
                        error_1 = _d.sent();
                        throwError(error_1, "Twitter.toggleUser");
                        return [ 2, false ];

                      case 4:
                        return [ 2 ];
                    }
                });
            });
        };
        Twitter.prototype.getUserId = function(name) {
            var _a, _b;
            return Twitter_awaiter(this, void 0, void 0, function() {
                var logStatus, _c, result, statusText, status_2, data, response, userId, error_2;
                return Twitter_generator(this, function(_d) {
                    switch (_d.label) {
                      case 0:
                        _d.trys.push([ 0, 2, , 3 ]);
                        logStatus = scripts_echoLog({
                            type: "getTwitterUserId",
                            text: name
                        });
                        return [ 4, tools_httpRequest({
                            url: "https://api.twitter.com/graphql/-xfUfZsnR_zqjFd-IfrN5A/UserByScreenName" + ("?variables=%7B%22screen_name%22%3A%22" + name + "%22%2C%22withHighlightedLabel%22%3Atrue%7D"),
                            method: "GET",
                            headers: {
                                authorization: "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA",
                                "content-type": "application/json"
                            },
                            responseType: "json",
                            anonymous: true
                        }) ];

                      case 1:
                        _c = _d.sent(), result = _c.result, statusText = _c.statusText, status_2 = _c.status, 
                        data = _c.data;
                        if (result === "Success") {
                            if (data.status === 200) {
                                response = data.response || (typeof data.responseText === "object" ? data.responseText : null);
                                if (!response) {
                                    try {
                                        response = JSON.parse(data.responseText);
                                    } catch (error) {
                                        response = null;
                                    }
                                }
                                userId = String((_b = (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.rest_id);
                                if (userId) {
                                    logStatus.success();
                                    return [ 2, userId ];
                                }
                                logStatus.error("Error:" + data.statusText + "(" + data.status + ")");
                                return [ 2, false ];
                            }
                            logStatus.error("Error:" + data.statusText + "(" + data.status + ")");
                            return [ 2, false ];
                        }
                        logStatus.error(result + ":" + statusText + "(" + status_2 + ")");
                        return [ 2, false ];

                      case 2:
                        error_2 = _d.sent();
                        throwError(error_2, "Twitter.getUserId");
                        return [ 2, false ];

                      case 3:
                        return [ 2 ];
                    }
                });
            });
        };
        Twitter.prototype.toggleRetweet = function(_a) {
            var _b, _c, _d;
            var retweetId = _a.retweetId, _e = _a.doTask, doTask = _e === void 0 ? true : _e;
            return Twitter_awaiter(this, void 0, void 0, function() {
                var logStatus, _f, result, statusText, status_3, data, error_3;
                return Twitter_generator(this, function(_g) {
                    switch (_g.label) {
                      case 0:
                        _g.trys.push([ 0, 2, , 3 ]);
                        if (!doTask && this.whiteList.retweets.includes(retweetId)) {
                            scripts_echoLog({
                                type: "whiteList",
                                text: retweetId
                            });
                            return [ 2, true ];
                        }
                        logStatus = scripts_echoLog({
                            type: (doTask ? "" : "un") + "retweet",
                            text: retweetId
                        });
                        return [ 4, tools_httpRequest({
                            url: "https://api.twitter.com/1.1/statuses/" + (doTask ? "" : "un") + "retweet.json",
                            method: "POST",
                            headers: {
                                authorization: "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA",
                                "Content-Type": "application/x-www-form-urlencoded",
                                "x-csrf-token": this.auth.ct0
                            },
                            data: $.param({
                                tweet_mode: "extended",
                                id: retweetId
                            }),
                            responseType: "json"
                        }) ];

                      case 1:
                        _f = _g.sent(), result = _f.result, statusText = _f.statusText, status_3 = _f.status, 
                        data = _f.data;
                        if (result === "Success") {
                            if (data.status === 200 || data.status === 403 && ((_d = (_c = (_b = data.response) === null || _b === void 0 ? void 0 : _b.errors) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.code) === 327) {
                                logStatus.success();
                                if (doTask) this.tasks.retweets = unique(Twitter_spreadArray(Twitter_spreadArray([], Twitter_read(this.tasks.retweets), false), [ name ], false));
                                return [ 2, true ];
                            }
                            logStatus.error("Error:" + data.statusText + "(" + data.status + ")");
                            return [ 2, false ];
                        }
                        logStatus.error(result + ":" + statusText + "(" + status_3 + ")");
                        return [ 2, false ];

                      case 2:
                        error_3 = _g.sent();
                        throwError(error_3, "Twitter.toggleRetweet");
                        return [ 2, false ];

                      case 3:
                        return [ 2 ];
                    }
                });
            });
        };
        Twitter.prototype.toggle = function(_a) {
            var _b = _a.doTask, doTask = _b === void 0 ? true : _b, _c = _a.users, users = _c === void 0 ? [] : _c, _d = _a.userLinks, userLinks = _d === void 0 ? [] : _d, _e = _a.retweets, retweets = _e === void 0 ? [] : _e, _f = _a.retweetLinks, retweetLinks = _f === void 0 ? [] : _f;
            return Twitter_awaiter(this, void 0, void 0, function() {
                var prom, realUsers, realRetweets, realUsers_1, realUsers_1_1, user, e_1_1, realRetweets_1, realRetweets_1_1, retweet, e_2_1, error_4;
                var e_1, _g, e_2, _h;
                return Twitter_generator(this, function(_j) {
                    switch (_j.label) {
                      case 0:
                        _j.trys.push([ 0, 17, , 18 ]);
                        prom = [];
                        realUsers = this.getRealParams("users", users, userLinks, doTask, function(link) {
                            var _a;
                            return (_a = link.match(/https:\/\/twitter\.com\/(.+)/)) === null || _a === void 0 ? void 0 : _a[1];
                        });
                        realRetweets = this.getRealParams("retweets", retweets, retweetLinks, doTask, function(link) {
                            var _a;
                            return (_a = link.match(/https:\/\/twitter\.com\/.*?\/status\/([\d]+)/)) === null || _a === void 0 ? void 0 : _a[1];
                        });
                        if (!(realUsers.length > 0)) return [ 3, 8 ];
                        _j.label = 1;

                      case 1:
                        _j.trys.push([ 1, 6, 7, 8 ]);
                        realUsers_1 = Twitter_values(realUsers), realUsers_1_1 = realUsers_1.next();
                        _j.label = 2;

                      case 2:
                        if (!!realUsers_1_1.done) return [ 3, 5 ];
                        user = realUsers_1_1.value;
                        prom.push(this.toggleUser({
                            name: user,
                            doTask: doTask
                        }));
                        return [ 4, delay(1e3) ];

                      case 3:
                        _j.sent();
                        _j.label = 4;

                      case 4:
                        realUsers_1_1 = realUsers_1.next();
                        return [ 3, 2 ];

                      case 5:
                        return [ 3, 8 ];

                      case 6:
                        e_1_1 = _j.sent();
                        e_1 = {
                            error: e_1_1
                        };
                        return [ 3, 8 ];

                      case 7:
                        try {
                            if (realUsers_1_1 && !realUsers_1_1.done && (_g = realUsers_1.return)) _g.call(realUsers_1);
                        } finally {
                            if (e_1) throw e_1.error;
                        }
                        return [ 7 ];

                      case 8:
                        if (!(realRetweets.length > 0)) return [ 3, 16 ];
                        _j.label = 9;

                      case 9:
                        _j.trys.push([ 9, 14, 15, 16 ]);
                        realRetweets_1 = Twitter_values(realRetweets), realRetweets_1_1 = realRetweets_1.next();
                        _j.label = 10;

                      case 10:
                        if (!!realRetweets_1_1.done) return [ 3, 13 ];
                        retweet = realRetweets_1_1.value;
                        prom.push(this.toggleRetweet({
                            retweetId: retweet,
                            doTask: doTask
                        }));
                        return [ 4, delay(1e3) ];

                      case 11:
                        _j.sent();
                        _j.label = 12;

                      case 12:
                        realRetweets_1_1 = realRetweets_1.next();
                        return [ 3, 10 ];

                      case 13:
                        return [ 3, 16 ];

                      case 14:
                        e_2_1 = _j.sent();
                        e_2 = {
                            error: e_2_1
                        };
                        return [ 3, 16 ];

                      case 15:
                        try {
                            if (realRetweets_1_1 && !realRetweets_1_1.done && (_h = realRetweets_1.return)) _h.call(realRetweets_1);
                        } finally {
                            if (e_2) throw e_2.error;
                        }
                        return [ 7 ];

                      case 16:
                        return [ 2, Promise.all(prom).then(function() {
                            return true;
                        }) ];

                      case 17:
                        error_4 = _j.sent();
                        throwError(error_4, "Twitch.toggle");
                        return [ 2, false ];

                      case 18:
                        return [ 2 ];
                    }
                });
            });
        };
        return Twitter;
    }(social_Social);
    const social_Twitter = Twitter;
    var Vk_extends = undefined && undefined.__extends || function() {
        var extendStatics = function(d, b) {
            extendStatics = Object.setPrototypeOf || {
                __proto__: []
            } instanceof Array && function(d, b) {
                d.__proto__ = b;
            } || function(d, b) {
                for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
            };
            return extendStatics(d, b);
        };
        return function(d, b) {
            if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    }();
    var Vk_awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P ? value : new P(function(resolve) {
                resolve(value);
            });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var Vk_generator = undefined && undefined.__generator || function(thisArg, body) {
        var _ = {
            label: 0,
            sent: function() {
                if (t[0] & 1) throw t[1];
                return t[1];
            },
            trys: [],
            ops: []
        }, f, y, t, g;
        return g = {
            next: verb(0),
            throw: verb(1),
            return: verb(2)
        }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
            return this;
        }), g;
        function verb(n) {
            return function(v) {
                return step([ n, v ]);
            };
        }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
                0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [ op[0] & 2, t.value ];
                switch (op[0]) {
                  case 0:
                  case 1:
                    t = op;
                    break;

                  case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };

                  case 5:
                    _.label++;
                    y = op[1];
                    op = [ 0 ];
                    continue;

                  case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;

                  default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
                }
                op = body.call(thisArg, _);
            } catch (e) {
                op = [ 6, e ];
                y = 0;
            } finally {
                f = t = 0;
            }
            if (op[0] & 5) throw op[1];
            return {
                value: op[0] ? op[1] : void 0,
                done: true
            };
        }
    };
    var Vk_read = undefined && undefined.__read || function(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        } catch (error) {
            e = {
                error: error
            };
        } finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            } finally {
                if (e) throw e.error;
            }
        }
        return ar;
    };
    var Vk_spreadArray = undefined && undefined.__spreadArray || function(to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    };
    var Vk_values = undefined && undefined.__values || function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function() {
                if (o && i >= o.length) o = void 0;
                return {
                    value: o && o[i++],
                    done: !o
                };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    var Vk = function(_super) {
        Vk_extends(Vk, _super);
        function Vk(id) {
            var _a;
            var _this = _super.call(this) || this;
            _this.tasks = GM_getValue("Vk-" + id) || {
                groups: [],
                publics: [],
                walls: []
            };
            _this.whiteList = ((_a = GM_getValue("whiteList")) === null || _a === void 0 ? void 0 : _a.vk) || {
                groups: [],
                publics: [],
                walls: []
            };
            _this.auth = GM_getValue("vkAuth") || {};
            return _this;
        }
        Vk.prototype.init = function() {
            return Vk_awaiter(this, void 0, void 0, function() {
                var isVerified, error_1;
                return Vk_generator(this, function(_a) {
                    switch (_a.label) {
                      case 0:
                        _a.trys.push([ 0, 2, , 3 ]);
                        return [ 4, this.verifyToken() ];

                      case 1:
                        isVerified = _a.sent();
                        if (isVerified) {
                            scripts_echoLog({
                                text: "Init vk success!"
                            });
                            return [ 2, true ];
                        }
                        scripts_echoLog({
                            text: "Init vk failed!"
                        });
                        return [ 2, false ];

                      case 2:
                        error_1 = _a.sent();
                        throwError(error_1, "Vk.init");
                        return [ 2, false ];

                      case 3:
                        return [ 2 ];
                    }
                });
            });
        };
        Vk.prototype.verifyToken = function() {
            return Vk_awaiter(this, void 0, void 0, function() {
                var logStatus, _a, result, statusText, status_1, data, error_2;
                return Vk_generator(this, function(_b) {
                    switch (_b.label) {
                      case 0:
                        _b.trys.push([ 0, 2, , 3 ]);
                        logStatus = scripts_echoLog({
                            type: "text",
                            text: "verifyVkLogin"
                        });
                        return [ 4, tools_httpRequest({
                            url: "https://vk.com/im",
                            method: "GET"
                        }) ];

                      case 1:
                        _a = _b.sent(), result = _a.result, statusText = _a.statusText, status_1 = _a.status, 
                        data = _a.data;
                        if (result === "Success") {
                            if (data.finalUrl.includes("vk.com/login")) {
                                logStatus.error("Error:" + i18n("loginVk"), true);
                                return [ 2, false ];
                            }
                            if (data.status === 200) {
                                logStatus.success();
                                return [ 2, true ];
                            }
                            logStatus.error("Error:" + data.statusText + "(" + data.status + ")");
                            return [ 2, false ];
                        }
                        logStatus.error(result + ":" + statusText + "(" + status_1 + ")");
                        return [ 2, false ];

                      case 2:
                        error_2 = _b.sent();
                        throwError(error_2, "Vk.verifyToken");
                        return [ 2, false ];

                      case 3:
                        return [ 2 ];
                    }
                });
            });
        };
        Vk.prototype.toggleGroup = function(name, dataParam, doTask) {
            if (doTask === void 0) {
                doTask = true;
            }
            return Vk_awaiter(this, void 0, void 0, function() {
                var logStatus, reqData, _a, result, statusText, status_2, data, error_3;
                return Vk_generator(this, function(_b) {
                    switch (_b.label) {
                      case 0:
                        _b.trys.push([ 0, 2, , 3 ]);
                        logStatus = scripts_echoLog({
                            type: doTask ? "joinVkGroup" : "leaveVkGroup",
                            text: name
                        });
                        if (dataParam.groupAct === "enter" && !doTask || dataParam.groupAct === "leave" && doTask) {
                            logStatus.success();
                            return [ 2, true ];
                        }
                        reqData = {
                            act: doTask ? "enter" : "leave",
                            al: 1,
                            gid: dataParam.groupId,
                            hash: dataParam.groupHash
                        };
                        if (doTask) reqData.context = "_";
                        return [ 4, tools_httpRequest({
                            url: "https://vk.com/al_groups.php",
                            method: "POST",
                            headers: {
                                origin: "https://vk.com",
                                referer: "https://vk.com/" + name,
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            data: $.param(reqData)
                        }) ];

                      case 1:
                        _a = _b.sent(), result = _a.result, statusText = _a.statusText, status_2 = _a.status, 
                        data = _a.data;
                        if (result === "Success") {
                            if (data.status === 200) {
                                logStatus.success();
                                if (doTask) this.tasks.groups = unique(Vk_spreadArray(Vk_spreadArray([], Vk_read(this.tasks.groups), false), [ name ], false));
                                return [ 2, true ];
                            }
                            logStatus.error("Error:" + data.statusText + "(" + data.status + ")");
                            return [ 2, false ];
                        }
                        logStatus.error(result + ":" + statusText + "(" + status_2 + ")");
                        return [ 2, false ];

                      case 2:
                        error_3 = _b.sent();
                        throwError(error_3, "Vk.toggleGroup");
                        return [ 2, false ];

                      case 3:
                        return [ 2 ];
                    }
                });
            });
        };
        Vk.prototype.togglePublic = function(name, dataParam, doTask) {
            if (doTask === void 0) {
                doTask = true;
            }
            return Vk_awaiter(this, void 0, void 0, function() {
                var logStatus, _a, result, statusText, status_3, data, error_4;
                return Vk_generator(this, function(_b) {
                    switch (_b.label) {
                      case 0:
                        _b.trys.push([ 0, 2, , 3 ]);
                        logStatus = scripts_echoLog({
                            type: doTask ? "joinVkPublic" : "leaveVkPublic",
                            text: name
                        });
                        if (dataParam.publicJoined && doTask || !dataParam.publicJoined && !doTask) {
                            logStatus.success();
                            return [ 2, true ];
                        }
                        return [ 4, tools_httpRequest({
                            url: "https://vk.com/al_public.php",
                            method: "POST",
                            headers: {
                                origin: "https://vk.com",
                                referer: "https://vk.com/" + name,
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            data: $.param({
                                act: doTask ? "a_enter" : "a_leave",
                                al: 1,
                                pid: dataParam.publicPid,
                                hash: dataParam.publicHash
                            })
                        }) ];

                      case 1:
                        _a = _b.sent(), result = _a.result, statusText = _a.statusText, status_3 = _a.status, 
                        data = _a.data;
                        if (result === "Success") {
                            if (data.status === 200) {
                                logStatus.success();
                                if (doTask) this.tasks.publics = unique(Vk_spreadArray(Vk_spreadArray([], Vk_read(this.tasks.publics), false), [ name ], false));
                                return [ 2, true ];
                            }
                            logStatus.error("Error:" + data.statusText + "(" + data.status + ")");
                            return [ 2, false ];
                        }
                        logStatus.error(result + ":" + statusText + "(" + status_3 + ")");
                        return [ 2, false ];

                      case 2:
                        error_4 = _b.sent();
                        throwError(error_4, "Vk.togglePublic");
                        return [ 2, false ];

                      case 3:
                        return [ 2 ];
                    }
                });
            });
        };
        Vk.prototype.toggleWall = function(name, doTask) {
            var _a, _b, _c, _d, _e;
            return Vk_awaiter(this, void 0, void 0, function() {
                var logStatus, _f, result, statusText, status_4, data, hash, _g, resultR, statusTextR, statusR, dataR, jsonData, error_5;
                return Vk_generator(this, function(_h) {
                    switch (_h.label) {
                      case 0:
                        if (!doTask) return [ 2, false ];
                        _h.label = 1;

                      case 1:
                        _h.trys.push([ 1, 7, , 8 ]);
                        logStatus = scripts_echoLog({
                            type: "repostVkWall",
                            text: name
                        });
                        return [ 4, tools_httpRequest({
                            url: "https://vk.com/like.php",
                            method: "POST",
                            headers: {
                                origin: "https://vk.com",
                                referer: "https://vk.com/" + name,
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            data: $.param({
                                act: "publish_box",
                                al: 1,
                                object: name
                            })
                        }) ];

                      case 2:
                        _f = _h.sent(), result = _f.result, statusText = _f.statusText, status_4 = _f.status, 
                        data = _f.data;
                        if (!(result === "Success")) return [ 3, 6 ];
                        if (!(data.status === 200)) return [ 3, 5 ];
                        hash = (_a = data.responseText.match(/shHash:[\s]*'(.*?)'/)) === null || _a === void 0 ? void 0 : _a[1];
                        if (!hash) return [ 3, 4 ];
                        return [ 4, tools_httpRequest({
                            url: "https://vk.com/like.php",
                            method: "POST",
                            headers: {
                                origin: "https://vk.com",
                                referer: "https://vk.com/" + name,
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
                        }) ];

                      case 3:
                        _g = _h.sent(), resultR = _g.result, statusTextR = _g.statusText, statusR = _g.status, 
                        dataR = _g.data;
                        if (resultR === "Success") {
                            if (dataR.status === 200) {
                                jsonData = JSON.parse(((_b = dataR.responseText) === null || _b === void 0 ? void 0 : _b.replace("\x3c!--", "")) || "{}");
                                if (((_e = (_d = (_c = jsonData === null || jsonData === void 0 ? void 0 : jsonData.payload) === null || _c === void 0 ? void 0 : _c[1]) === null || _d === void 0 ? void 0 : _d[1]) === null || _e === void 0 ? void 0 : _e.share_my) === true) {
                                    logStatus.success();
                                    if (doTask) this.tasks.walls = unique(Vk_spreadArray(Vk_spreadArray([], Vk_read(this.tasks.walls), false), [ name ], false));
                                    return [ 2, true ];
                                }
                            }
                            logStatus.error("Error:" + dataR.statusText + "(" + dataR.status + ")");
                            return [ 2, false ];
                        }
                        logStatus.error(resultR + ":" + statusTextR + "(" + statusR + ")");
                        return [ 2, false ];

                      case 4:
                        logStatus.error('Error: Get "hash" failed');
                        return [ 2, false ];

                      case 5:
                        logStatus.error("Error:" + data.statusText + "(" + data.status + ")");
                        return [ 2, false ];

                      case 6:
                        logStatus.error(result + ":" + statusText + "(" + status_4 + ")");
                        return [ 2, false ];

                      case 7:
                        error_5 = _h.sent();
                        throwError(error_5, "Vk.toggleWall");
                        return [ 2, false ];

                      case 8:
                        return [ 2 ];
                    }
                });
            });
        };
        Vk.prototype.getId = function(name) {
            var _a, _b;
            return Vk_awaiter(this, void 0, void 0, function() {
                var logStatus, _c, result, statusText, status_5, data, _d, groupAct, groupId, groupHash, publicHash, publicPid, publicJoined, error_6;
                return Vk_generator(this, function(_e) {
                    switch (_e.label) {
                      case 0:
                        _e.trys.push([ 0, 2, , 3 ]);
                        if (/^wall-/.test(name)) return [ 2, {
                            type: "wall"
                        } ];
                        logStatus = scripts_echoLog({
                            type: "getVkId",
                            text: name
                        });
                        return [ 4, tools_httpRequest({
                            url: "https://vk.com/" + name,
                            method: "GET"
                        }) ];

                      case 1:
                        _c = _e.sent(), result = _c.result, statusText = _c.statusText, status_5 = _c.status, 
                        data = _c.data;
                        if (result === "Success") {
                            if (data.status === 200) {
                                _d = Vk_read(data.responseText.match(/Groups.(enter|leave)\(.*?,.*?([\d]+?), '(.*?)'/) || [], 4), 
                                groupAct = _d[1], groupId = _d[2], groupHash = _d[3];
                                publicHash = (_a = data.responseText.match(/"enterHash":"(.*?)"/)) === null || _a === void 0 ? void 0 : _a[1];
                                publicPid = (_b = data.responseText.match(/"public_id":([\d]+?),/)) === null || _b === void 0 ? void 0 : _b[1];
                                publicJoined = !data.responseText.includes("Public.subscribe");
                                if (groupAct && groupId && groupHash) {
                                    logStatus.success();
                                    return [ 2, {
                                        groupAct: groupAct,
                                        groupId: groupId,
                                        groupHash: groupHash,
                                        type: "group"
                                    } ];
                                } else if (publicHash && publicPid) {
                                    logStatus.success();
                                    return [ 2, {
                                        publicHash: publicHash,
                                        publicPid: publicPid,
                                        publicJoined: publicJoined,
                                        type: "public"
                                    } ];
                                } else if (data.responseText.includes("Wall.sendPost")) {
                                    logStatus.success();
                                    return [ 2, {
                                        type: "wall"
                                    } ];
                                }
                                logStatus.error('Error: Parameter "id" not found!');
                                return [ 2, false ];
                            }
                            logStatus.error("Error:" + data.statusText + "(" + data.status + ")");
                            return [ 2, false ];
                        }
                        logStatus.error(result + ":" + statusText + "(" + status_5 + ")");
                        return [ 2, false ];

                      case 2:
                        error_6 = _e.sent();
                        throwError(error_6, "Vk.getId");
                        return [ 2, false ];

                      case 3:
                        return [ 2 ];
                    }
                });
            });
        };
        Vk.prototype.toggleVk = function(_a) {
            var name = _a.name, _b = _a.doTask, doTask = _b === void 0 ? true : _b;
            return Vk_awaiter(this, void 0, void 0, function() {
                var formatName, data, _c, error_7;
                return Vk_generator(this, function(_d) {
                    switch (_d.label) {
                      case 0:
                        _d.trys.push([ 0, 10, , 11 ]);
                        if (!doTask && Vk_spreadArray(Vk_spreadArray(Vk_spreadArray([], Vk_read(this.whiteList.groups), false), Vk_read(this.whiteList.publics), false), Vk_read(this.whiteList.walls), false).includes(name)) {
                            scripts_echoLog({
                                type: "whiteList",
                                text: name
                            });
                            return [ 2, true ];
                        }
                        formatName = name.replace(/\/$/, "");
                        return [ 4, this.getId(formatName) ];

                      case 1:
                        data = _d.sent();
                        if (!data) return [ 2 ];
                        _c = data.type;
                        switch (_c) {
                          case "group":
                            return [ 3, 2 ];

                          case "public":
                            return [ 3, 4 ];

                          case "wall":
                            return [ 3, 6 ];
                        }
                        return [ 3, 8 ];

                      case 2:
                        return [ 4, this.toggleGroup(formatName, data, doTask) ];

                      case 3:
                        return [ 2, _d.sent() ];

                      case 4:
                        return [ 4, this.togglePublic(formatName, data, doTask) ];

                      case 5:
                        return [ 2, _d.sent() ];

                      case 6:
                        return [ 4, this.toggleWall(formatName, doTask) ];

                      case 7:
                        return [ 2, _d.sent() ];

                      case 8:
                        return [ 2, false ];

                      case 9:
                        return [ 3, 11 ];

                      case 10:
                        error_7 = _d.sent();
                        throwError(error_7, "Vk.toggleVk");
                        return [ 2, false ];

                      case 11:
                        return [ 2 ];
                    }
                });
            });
        };
        Vk.prototype.toggle = function(_a) {
            var _b = _a.doTask, doTask = _b === void 0 ? true : _b, _c = _a.names, names = _c === void 0 ? [] : _c, _d = _a.nameLinks, nameLinks = _d === void 0 ? [] : _d;
            return Vk_awaiter(this, void 0, void 0, function() {
                var prom, realNames, realNames_1, realNames_1_1, name_1, e_1_1, error_8;
                var e_1, _e;
                return Vk_generator(this, function(_f) {
                    switch (_f.label) {
                      case 0:
                        _f.trys.push([ 0, 9, , 10 ]);
                        prom = [];
                        realNames = this.getRealParams("names", names, nameLinks, doTask, function(link) {
                            var _a;
                            return (_a = link.match(/https:\/\/vk\.com\/([^/]+)/)) === null || _a === void 0 ? void 0 : _a[1];
                        });
                        if (!(realNames.length > 0)) return [ 3, 8 ];
                        _f.label = 1;

                      case 1:
                        _f.trys.push([ 1, 6, 7, 8 ]);
                        realNames_1 = Vk_values(realNames), realNames_1_1 = realNames_1.next();
                        _f.label = 2;

                      case 2:
                        if (!!realNames_1_1.done) return [ 3, 5 ];
                        name_1 = realNames_1_1.value;
                        prom.push(this.toggleVk({
                            name: name_1,
                            doTask: doTask
                        }));
                        return [ 4, delay(1e3) ];

                      case 3:
                        _f.sent();
                        _f.label = 4;

                      case 4:
                        realNames_1_1 = realNames_1.next();
                        return [ 3, 2 ];

                      case 5:
                        return [ 3, 8 ];

                      case 6:
                        e_1_1 = _f.sent();
                        e_1 = {
                            error: e_1_1
                        };
                        return [ 3, 8 ];

                      case 7:
                        try {
                            if (realNames_1_1 && !realNames_1_1.done && (_e = realNames_1.return)) _e.call(realNames_1);
                        } finally {
                            if (e_1) throw e_1.error;
                        }
                        return [ 7 ];

                      case 8:
                        return [ 2, Promise.all(prom).then(function() {
                            return true;
                        }) ];

                      case 9:
                        error_8 = _f.sent();
                        throwError(error_8, "Vk.toggle");
                        return [ 2, false ];

                      case 10:
                        return [ 2 ];
                    }
                });
            });
        };
        return Vk;
    }(social_Social);
    const social_Vk = Vk;
    var Youtube_extends = undefined && undefined.__extends || function() {
        var extendStatics = function(d, b) {
            extendStatics = Object.setPrototypeOf || {
                __proto__: []
            } instanceof Array && function(d, b) {
                d.__proto__ = b;
            } || function(d, b) {
                for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
            };
            return extendStatics(d, b);
        };
        return function(d, b) {
            if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    }();
    var Youtube_awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P ? value : new P(function(resolve) {
                resolve(value);
            });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var Youtube_generator = undefined && undefined.__generator || function(thisArg, body) {
        var _ = {
            label: 0,
            sent: function() {
                if (t[0] & 1) throw t[1];
                return t[1];
            },
            trys: [],
            ops: []
        }, f, y, t, g;
        return g = {
            next: verb(0),
            throw: verb(1),
            return: verb(2)
        }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
            return this;
        }), g;
        function verb(n) {
            return function(v) {
                return step([ n, v ]);
            };
        }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
                0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [ op[0] & 2, t.value ];
                switch (op[0]) {
                  case 0:
                  case 1:
                    t = op;
                    break;

                  case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };

                  case 5:
                    _.label++;
                    y = op[1];
                    op = [ 0 ];
                    continue;

                  case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;

                  default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
                }
                op = body.call(thisArg, _);
            } catch (e) {
                op = [ 6, e ];
                y = 0;
            } finally {
                f = t = 0;
            }
            if (op[0] & 5) throw op[1];
            return {
                value: op[0] ? op[1] : void 0,
                done: true
            };
        }
    };
    var Youtube_read = undefined && undefined.__read || function(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        } catch (error) {
            e = {
                error: error
            };
        } finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            } finally {
                if (e) throw e.error;
            }
        }
        return ar;
    };
    var Youtube_spreadArray = undefined && undefined.__spreadArray || function(to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    };
    var Youtube_values = undefined && undefined.__values || function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function() {
                if (o && i >= o.length) o = void 0;
                return {
                    value: o && o[i++],
                    done: !o
                };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    var Youtube = function(_super) {
        Youtube_extends(Youtube, _super);
        function Youtube(id) {
            var _a;
            var _this = _super.call(this) || this;
            _this.tasks = GM_getValue("Youtube-" + id) || {
                channels: [],
                likes: []
            };
            _this.whiteList = ((_a = GM_getValue("whiteList")) === null || _a === void 0 ? void 0 : _a.youtube) || {
                channels: [],
                likes: []
            };
            _this.auth = GM_getValue("youtubeAuth") || {};
            return _this;
        }
        Youtube.prototype.init = function() {
            return Youtube_awaiter(this, void 0, void 0, function() {
                var isVerified;
                return Youtube_generator(this, function(_a) {
                    try {
                        isVerified = false;
                        if (isVerified) {
                            scripts_echoLog({
                                text: "Init youtube success!"
                            });
                            return [ 2, true ];
                        }
                        scripts_echoLog({
                            text: "Init youtube failed!"
                        });
                        return [ 2, false ];
                    } catch (error) {
                        throwError(error, "Youtube.init");
                        return [ 2, false ];
                    }
                    return [ 2 ];
                });
            });
        };
        Youtube.prototype.getInfo = function(link, type) {
            var _a, _b, _c, _d, _e;
            return Youtube_awaiter(this, void 0, void 0, function() {
                var logStatus, _f, result, statusText, status_1, data, apiKey, context, _g, client, request, channelId, videoId, likeParams, error_1;
                return Youtube_generator(this, function(_h) {
                    switch (_h.label) {
                      case 0:
                        _h.trys.push([ 0, 2, , 3 ]);
                        logStatus = scripts_echoLog({
                            type: "text",
                            text: "getYtbToken"
                        });
                        return [ 4, tools_httpRequest({
                            url: link,
                            method: "GET"
                        }) ];

                      case 1:
                        _f = _h.sent(), result = _f.result, statusText = _f.statusText, status_1 = _f.status, 
                        data = _f.data;
                        if (result === "Success") {
                            if (data.status === 200) {
                                if (data.responseText.includes("accounts.google.com/ServiceLogin?service=youtube")) {
                                    logStatus.error("Error:" + i18n("loginYtb"), true);
                                    return [ 2, {
                                        needLogin: true
                                    } ];
                                }
                                apiKey = (_a = data.responseText.match(/"INNERTUBE_API_KEY":"(.*?)"/)) === null || _a === void 0 ? void 0 : _a[1];
                                context = ((_b = data.responseText.match(/\(\{"INNERTUBE_CONTEXT":([\w\W]*?)\}\)/) || data.responseText.match(/"INNERTUBE_CONTEXT":([\w\W]*?\}),"INNERTUBE/)) === null || _b === void 0 ? void 0 : _b[1]) || "{}";
                                _g = JSON.parse(context), client = _g.client, request = _g.request;
                                if (apiKey && client && request) {
                                    client.hl = "en";
                                    if (type === "channel") {
                                        channelId = (_c = data.responseText.match(/<meta itemprop="channelId" content="(.+?)">/)) === null || _c === void 0 ? void 0 : _c[1];
                                        if (channelId) {
                                            logStatus.success();
                                            return [ 2, {
                                                params: {
                                                    apiKey: apiKey,
                                                    client: client,
                                                    request: request,
                                                    channelId: channelId
                                                }
                                            } ];
                                        }
                                        logStatus.error('Error: Get "channelId" failed!');
                                        return [ 2, {} ];
                                    } else if (type === "likeVideo") {
                                        videoId = (_d = data.responseText.match(/<link rel="shortlinkUrl" href="https:\/\/youtu\.be\/(.*?)">/)) === null || _d === void 0 ? void 0 : _d[1];
                                        likeParams = (_e = data.responseText.match(/"likeParams":"(.*?)"/)) === null || _e === void 0 ? void 0 : _e[1];
                                        if (videoId) {
                                            logStatus.success();
                                            return [ 2, {
                                                params: {
                                                    apiKey: apiKey,
                                                    client: client,
                                                    request: request,
                                                    videoId: videoId,
                                                    likeParams: likeParams
                                                }
                                            } ];
                                        }
                                        logStatus.error('Error: Get "videoId" failed!');
                                        return [ 2, {} ];
                                    }
                                    logStatus.error("Error: Unknown type");
                                    return [ 2, {} ];
                                }
                                logStatus.error('Error: Parameter "apiKey" not found!');
                                return [ 2, {} ];
                            }
                            logStatus.error("Error:" + data.statusText + "(" + data.status + ")");
                            return [ 2, {} ];
                        }
                        logStatus.error(result + ":" + statusText + "(" + status_1 + ")");
                        return [ 2, {} ];

                      case 2:
                        error_1 = _h.sent();
                        throwError(error_1, "Youtube.getInfo");
                        return [ 2, {} ];

                      case 3:
                        return [ 2 ];
                    }
                });
            });
        };
        Youtube.prototype.getToken = function(notice) {
            try {
                var PAPISID = Cookies.get("__Secure-3PAPISID");
                if (PAPISID) {
                    this.auth.PAPISID = PAPISID;
                    GM_setValue("youtubeInfo", this.auth);
                    if (notice) {
                        Swal.fire({
                            title: i18n("updateYtbInfoSuccess"),
                            icon: "success"
                        });
                    }
                } else {
                    if (notice) {
                        Swal.fire({
                            title: i18n("updateYtbInfoError"),
                            icon: "error"
                        });
                    }
                }
            } catch (error) {
                throwError(error, "Youtube.getToken");
                if (notice) {
                    Swal.fire({
                        title: i18n("updateYtbInfoError"),
                        icon: "error"
                    });
                }
            }
        };
        Youtube.prototype.toggleChannel = function(_a) {
            var link = _a.link, _b = _a.doTask, doTask = _b === void 0 ? true : _b;
            return Youtube_awaiter(this, void 0, void 0, function() {
                var _c, params, needLogin, _d, apiKey, client, request, channelId, logStatus, nowTime, _e, result, statusText, status_2, data, error_2;
                return Youtube_generator(this, function(_f) {
                    switch (_f.label) {
                      case 0:
                        _f.trys.push([ 0, 3, , 4 ]);
                        return [ 4, this.getInfo(link, "channel") ];

                      case 1:
                        _c = _f.sent(), params = _c.params, needLogin = _c.needLogin;
                        _d = params || {}, apiKey = _d.apiKey, client = _d.client, request = _d.request, 
                        channelId = _d.channelId;
                        if (!doTask && this.whiteList.channels.includes(channelId)) {
                            scripts_echoLog({
                                type: "whiteList",
                                text: channelId
                            });
                            return [ 2, true ];
                        }
                        if (needLogin) {
                            scripts_echoLog({
                                type: "custom",
                                text: i18n("loginYtb")
                            });
                            return [ 2, false ];
                        }
                        if (!apiKey) {
                            scripts_echoLog({
                                type: "custom",
                                text: '"getYtbToken" failed'
                            });
                            return [ 2, false ];
                        }
                        logStatus = scripts_echoLog({
                            type: doTask ? "followYtbChannel" : "unfollowYtbChannel",
                            text: channelId
                        });
                        nowTime = parseInt(String(new Date().getTime() / 1e3), 10);
                        return [ 4, tools_httpRequest({
                            url: "https://www.youtube.com/youtubei/v1/subscription/" + (doTask ? "" : "un") + "subscribe?key=" + apiKey,
                            method: "POST",
                            headers: {
                                origin: "https://www.youtube.com",
                                referer: "https://www.youtube.com/channel/" + channelId,
                                "content-type": "application/json",
                                "x-goog-authuser": "0",
                                "x-goog-visitor-id": client.visitorData,
                                "x-origin": "https://www.youtube.com",
                                authorization: "SAPISIDHASH " + nowTime + "_" + sha1(nowTime + " " + this.auth.PAPISID + " https://www.youtube.com")
                            },
                            data: JSON.stringify({
                                context: {
                                    client: client,
                                    request: {
                                        sessionId: request.sessionId,
                                        internalExperimentFlags: [],
                                        consistencyTokenJars: []
                                    },
                                    user: {}
                                },
                                channelIds: [ channelId ],
                                params: doTask ? "EgIIAhgA" : "CgIIAhgA"
                            })
                        }) ];

                      case 2:
                        _e = _f.sent(), result = _e.result, statusText = _e.statusText, status_2 = _e.status, 
                        data = _e.data;
                        if (result === "Success") {
                            if (data.status === 200) {
                                if (doTask && (/"subscribed": true/.test(data.responseText) || data.responseText.includes("The subscription already exists")) || !doTask && /"subscribed": false/.test(data.responseText)) {
                                    logStatus.success();
                                    if (doTask) this.tasks.channels = unique(Youtube_spreadArray(Youtube_spreadArray([], Youtube_read(this.tasks.channels), false), [ link ], false));
                                    return [ 2, true ];
                                }
                                logStatus.error(i18n("tryUpdateYtbAuth"), true);
                                return [ 2, false ];
                            }
                            logStatus.error("Error:" + data.statusText + "(" + data.status + ")");
                            return [ 2, false ];
                        }
                        logStatus.error(result + ":" + statusText + "(" + status_2 + ")");
                        return [ 2, false ];

                      case 3:
                        error_2 = _f.sent();
                        throwError(error_2, "Youtube.toggleChannel");
                        return [ 2, false ];

                      case 4:
                        return [ 2 ];
                    }
                });
            });
        };
        Youtube.prototype.toggleLikeVideo = function(_a) {
            var link = _a.link, _b = _a.doTask, doTask = _b === void 0 ? true : _b;
            return Youtube_awaiter(this, void 0, void 0, function() {
                var _c, params, needLogin, _d, apiKey, client, request, videoId, likeParams, logStatus, nowTime, likeVideoData, _e, result, statusText, status_3, data, error_3;
                return Youtube_generator(this, function(_f) {
                    switch (_f.label) {
                      case 0:
                        _f.trys.push([ 0, 3, , 4 ]);
                        return [ 4, this.getInfo(link, "likeVideo") ];

                      case 1:
                        _c = _f.sent(), params = _c.params, needLogin = _c.needLogin;
                        _d = params || {}, apiKey = _d.apiKey, client = _d.client, request = _d.request, 
                        videoId = _d.videoId, likeParams = _d.likeParams;
                        if (!doTask && this.whiteList.likes.includes(videoId)) {
                            scripts_echoLog({
                                type: "whiteList",
                                text: link
                            });
                            return [ 2, true ];
                        }
                        if (needLogin) {
                            scripts_echoLog({
                                type: "text",
                                text: "" + i18n("loginYtb")
                            });
                            return [ 2, false ];
                        }
                        if (!apiKey) {
                            scripts_echoLog({
                                type: "text",
                                text: '"getYtbToken" failed'
                            });
                            return [ 2, false ];
                        }
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
                        if (doTask) {
                            if (likeParams) {
                                likeVideoData.params = likeParams;
                            } else {
                                logStatus.error("Empty likeParams");
                                return [ 2, false ];
                            }
                        }
                        return [ 4, tools_httpRequest({
                            url: "https://www.youtube.com/youtubei/v1/like/" + (doTask ? "" : "remove") + "like?key=" + apiKey,
                            method: "POST",
                            headers: {
                                origin: "https://www.youtube.com",
                                referer: "https://www.youtube.com/watch?v=" + videoId,
                                "content-type": "application/json",
                                "x-goog-authuser": "0",
                                "x-goog-visitor-id": client.visitorData,
                                "x-origin": "https://www.youtube.com",
                                authorization: "SAPISIDHASH " + nowTime + "_" + sha1(nowTime + " " + this.auth.PAPISID + " https://www.youtube.com")
                            },
                            data: JSON.stringify(likeVideoData)
                        }) ];

                      case 2:
                        _e = _f.sent(), result = _e.result, statusText = _e.statusText, status_3 = _e.status, 
                        data = _e.data;
                        if (result === "Success") {
                            if (data.status === 200) {
                                if (doTask && data.responseText.includes("Added to Liked videos") || !doTask && (data.responseText.includes("Removed from Liked videos") || data.responseText.includes("Dislike removed"))) {
                                    logStatus.success();
                                    if (doTask) this.tasks.likes = unique(Youtube_spreadArray(Youtube_spreadArray([], Youtube_read(this.tasks.likes), false), [ link ], false));
                                    return [ 2, true ];
                                }
                                logStatus.error(i18n("tryUpdateYtbAuth"), true);
                                return [ 2, false ];
                            }
                            logStatus.error("Error:" + data.statusText + "(" + data.status + ")");
                            return [ 2, false ];
                        }
                        logStatus.error(result + ":" + statusText + "(" + status_3 + ")");
                        return [ 2, false ];

                      case 3:
                        error_3 = _f.sent();
                        throwError(error_3, "Youtube.toggleLikeVideo");
                        return [ 2, false ];

                      case 4:
                        return [ 2 ];
                    }
                });
            });
        };
        Youtube.prototype.toggle = function(_a) {
            var _b = _a.doTask, doTask = _b === void 0 ? true : _b, _c = _a.channelLinks, channelLinks = _c === void 0 ? [] : _c, _d = _a.videoLinks, videoLinks = _d === void 0 ? [] : _d;
            return Youtube_awaiter(this, void 0, void 0, function() {
                var prom, realChannels, realLikes, realChannels_1, realChannels_1_1, channel, e_1_1, realLikes_1, realLikes_1_1, video, e_2_1, error_4;
                var e_1, _e, e_2, _f;
                return Youtube_generator(this, function(_g) {
                    switch (_g.label) {
                      case 0:
                        _g.trys.push([ 0, 17, , 18 ]);
                        prom = [];
                        realChannels = this.getRealParams("channels", [], channelLinks, doTask, function(link) {
                            var _a;
                            if (/^https:\/\/www\.google\.com.*?\/url\?.*?url=https:\/\/www.youtube.com\/.*/.test(link)) {
                                return (_a = link.match(/url=(https:\/\/www.youtube.com\/.*)/)) === null || _a === void 0 ? void 0 : _a[1];
                            }
                            return link;
                        });
                        realLikes = this.getRealParams("likes", [], videoLinks, doTask, function(link) {
                            var _a;
                            if (/^https:\/\/www\.google\.com.*?\/url\?.*?url=https:\/\/www.youtube.com\/.*/.test(link)) {
                                return (_a = link.match(/url=(https:\/\/www.youtube.com\/.*)/)) === null || _a === void 0 ? void 0 : _a[1];
                            }
                            return link;
                        });
                        if (!(realChannels.length > 0)) return [ 3, 8 ];
                        _g.label = 1;

                      case 1:
                        _g.trys.push([ 1, 6, 7, 8 ]);
                        realChannels_1 = Youtube_values(realChannels), realChannels_1_1 = realChannels_1.next();
                        _g.label = 2;

                      case 2:
                        if (!!realChannels_1_1.done) return [ 3, 5 ];
                        channel = realChannels_1_1.value;
                        prom.push(this.toggleChannel({
                            link: channel,
                            doTask: doTask
                        }));
                        return [ 4, delay(1e3) ];

                      case 3:
                        _g.sent();
                        _g.label = 4;

                      case 4:
                        realChannels_1_1 = realChannels_1.next();
                        return [ 3, 2 ];

                      case 5:
                        return [ 3, 8 ];

                      case 6:
                        e_1_1 = _g.sent();
                        e_1 = {
                            error: e_1_1
                        };
                        return [ 3, 8 ];

                      case 7:
                        try {
                            if (realChannels_1_1 && !realChannels_1_1.done && (_e = realChannels_1.return)) _e.call(realChannels_1);
                        } finally {
                            if (e_1) throw e_1.error;
                        }
                        return [ 7 ];

                      case 8:
                        if (!(realLikes.length > 0)) return [ 3, 16 ];
                        _g.label = 9;

                      case 9:
                        _g.trys.push([ 9, 14, 15, 16 ]);
                        realLikes_1 = Youtube_values(realLikes), realLikes_1_1 = realLikes_1.next();
                        _g.label = 10;

                      case 10:
                        if (!!realLikes_1_1.done) return [ 3, 13 ];
                        video = realLikes_1_1.value;
                        prom.push(this.toggleLikeVideo({
                            link: video,
                            doTask: doTask
                        }));
                        return [ 4, delay(1e3) ];

                      case 11:
                        _g.sent();
                        _g.label = 12;

                      case 12:
                        realLikes_1_1 = realLikes_1.next();
                        return [ 3, 10 ];

                      case 13:
                        return [ 3, 16 ];

                      case 14:
                        e_2_1 = _g.sent();
                        e_2 = {
                            error: e_2_1
                        };
                        return [ 3, 16 ];

                      case 15:
                        try {
                            if (realLikes_1_1 && !realLikes_1_1.done && (_f = realLikes_1.return)) _f.call(realLikes_1);
                        } finally {
                            if (e_2) throw e_2.error;
                        }
                        return [ 7 ];

                      case 16:
                        return [ 2, Promise.all(prom).then(function() {
                            return true;
                        }) ];

                      case 17:
                        error_4 = _g.sent();
                        throwError(error_4, "Vk.toggle");
                        return [ 2, false ];

                      case 18:
                        return [ 2 ];
                    }
                });
            });
        };
        return Youtube;
    }(social_Social);
    const social_Youtube = Youtube;
    if (window.location.hostname === "discord.com" && window.location.search === "?updateDiscordAuth") {
        GM_setValue("discordAuth", {
            auth: window.localStorage.getItem("token").replace(/^"|"$/g, "")
        });
        window.close();
    }
    window.onload = function() {
        unsafeWindow.Discord = social_Discord;
        unsafeWindow.Instagram = social_Instagram;
        unsafeWindow.Reddit = social_Reddit;
        unsafeWindow.Twitch = social_Twitch;
        unsafeWindow.Twitter = social_Twitter;
        unsafeWindow.Vk = social_Vk;
        unsafeWindow.Youtube = social_Youtube;
        $("body").append('<div id="fuck-task-info" style="position:fixed;bottom:10px;right:10px;width:300px;max-width:60%;"></div>');
    };
    var __webpack_export_target__ = exports;
    for (var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
    if (__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", {
        value: true
    });
})();
//# sourceMappingURL=index.js.map
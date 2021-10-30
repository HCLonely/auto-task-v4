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
    var unique = function(array) {
        try {
            return __spreadArray([], __read(new Set(array)), false);
        } catch (error) {
            throwError(error, "unique");
            return [];
        }
    };
    var delay = function(time) {
        if (time === void 0) {
            time = 1e3;
        }
        return new Promise(function(resolve) {
            setTimeout(function() {
                resolve(true);
            }, time);
        });
    };
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
    var httpRequest = function(options, times) {
        if (times === void 0) {
            times = 0;
        }
        return __awaiter(void 0, void 0, void 0, function() {
            var result, error_1;
            return __generator(this, function(_a) {
                switch (_a.label) {
                  case 0:
                    _a.trys.push([ 0, 4, , 5 ]);
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
                    return [ 4, httpRequest(options, times + 1) ];

                  case 2:
                    return [ 2, _a.sent() ];

                  case 3:
                    return [ 2, result ];

                  case 4:
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

                  case 5:
                    return [ 2 ];
                }
            });
        });
    };
    const tools_httpRequest = httpRequest;
    function getI18n() {
        var argvs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            argvs[_i] = arguments[_i];
        }
        return argvs.join(" ");
    }
    const i18n = getI18n;
    var echoLog = function(_a) {
        var _b = _a.type, type = _b === void 0 ? "text" : _b, text = _a.text, url = _a.url, id = _a.id;
        try {
            var ele = void 0;
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
                ele = $("<li>" + i18n(type) + '<a href="https://store.steampowered.com/' + ((text === null || text === void 0 ? void 0 : text.includes("/")) ? text : "curator/" + text) + '" target="_blank">' + text + "</a>...<font></font></li>");
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
                ele = $("<li>" + i18n(type) + '<a href="https://steamcommunity.com/sharedfiles/filedetails/?id=' + text + '" target="_blank">\n      ' + text + "</a>...<font></font></li>");
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
                ele = $("<li>" + i18n(type) + '<a href="https://www.reddit.com/user/' + (text === null || text === void 0 ? void 0 : text.replace("u_", "")) + '" target="_blank">\n      ' + (text === null || text === void 0 ? void 0 : text.replace("u_", "")) + "</a>...<font></font></li>");
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
                    var _a, _b, _c;
                    if (text === void 0) {
                        text = "Success";
                    }
                    if (html === void 0) {
                        html = false;
                    }
                    (_a = this.font) === null || _a === void 0 ? void 0 : _a.attr("class", "").addClass("success");
                    html ? (_b = this.font) === null || _b === void 0 ? void 0 : _b.html(text) : (_c = this.font) === null || _c === void 0 ? void 0 : _c.text(text);
                    return this;
                },
                error: function(text, html) {
                    var _a, _b, _c;
                    if (text === void 0) {
                        text = "Error";
                    }
                    if (html === void 0) {
                        html = false;
                    }
                    (_a = this.font) === null || _a === void 0 ? void 0 : _a.attr("class", "").addClass("error");
                    html ? (_b = this.font) === null || _b === void 0 ? void 0 : _b.html(text) : (_c = this.font) === null || _c === void 0 ? void 0 : _c.text(text);
                    return this;
                },
                warning: function(text, html) {
                    var _a, _b, _c;
                    if (text === void 0) {
                        text = "Warning";
                    }
                    if (html === void 0) {
                        html = false;
                    }
                    (_a = this.font) === null || _a === void 0 ? void 0 : _a.attr("class", "").addClass("warning");
                    html ? (_b = this.font) === null || _b === void 0 ? void 0 : _b.html(text) : (_c = this.font) === null || _c === void 0 ? void 0 : _c.text(text);
                    return this;
                },
                info: function(text, html) {
                    var _a, _b, _c;
                    if (text === void 0) {
                        text = "Info";
                    }
                    if (html === void 0) {
                        html = false;
                    }
                    (_a = this.font) === null || _a === void 0 ? void 0 : _a.attr("class", "").addClass("info");
                    html ? (_b = this.font) === null || _b === void 0 ? void 0 : _b.html(text) : (_c = this.font) === null || _c === void 0 ? void 0 : _c.text(text);
                    return this;
                },
                view: function() {
                    var _a;
                    (_a = this.font) === null || _a === void 0 ? void 0 : _a[0].scrollIntoView();
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
    };
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
                        if (!_a.sent()) {
                            return [ 2, false ];
                        }
                        return [ 2, true ];

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
                            if ((data === null || data === void 0 ? void 0 : data.status) === 200) {
                                logStatus.success();
                                return [ 2, true ];
                            }
                            logStatus.error("Error:" + (data === null || data === void 0 ? void 0 : data.statusText) + "(" + (data === null || data === void 0 ? void 0 : data.status) + ")");
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
                            var newTab = GM_openInTab("https://discord.com/channels/@me#auth", {
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
                        if (result === "Success" && (data === null || data === void 0 ? void 0 : data.status) === 200) {
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
                        if (result === "Success" && (data === null || data === void 0 ? void 0 : data.status) === 204) {
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
                        if (result === "Success" && (data === null || data === void 0 ? void 0 : data.status) === 200) {
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
                            if (data === null || data === void 0 ? void 0 : data.finalUrl.includes("accounts/login")) {
                                logStatus.error("Error:" + i18n("loginIns"), true);
                                return [ 2, false ];
                            } else if (data === null || data === void 0 ? void 0 : data.finalUrl.includes("www.instagram.com/challenge")) {
                                logStatus.error("Error:" + i18n("insBanned"));
                                return [ 2, false ];
                            }
                            if ((data === null || data === void 0 ? void 0 : data.status) === 200) {
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
                        return [ 2, false ];

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
                            if ((data === null || data === void 0 ? void 0 : data.status) === 200 && ((_a = data.response) === null || _a === void 0 ? void 0 : _a.result) === "following") {
                                logStatus.success();
                                this.tasks.users = unique(Instagram_spreadArray(Instagram_spreadArray([], Instagram_read(this.tasks.users), false), [ name ], false));
                                return [ 2, true ];
                            }
                            logStatus.error("Error:" + (((_b = data === null || data === void 0 ? void 0 : data.response) === null || _b === void 0 ? void 0 : _b.feedback_message) || (data === null || data === void 0 ? void 0 : data.statusText) + "(" + (data === null || data === void 0 ? void 0 : data.status) + ")"));
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
                            if ((data === null || data === void 0 ? void 0 : data.status) === 200 && ((_a = data.response) === null || _a === void 0 ? void 0 : _a.status) === "ok") {
                                logStatus.success();
                                return [ 2, true ];
                            }
                            logStatus.error("Error:" + (data === null || data === void 0 ? void 0 : data.statusText) + "(" + (data === null || data === void 0 ? void 0 : data.status) + ")");
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
                            if ((data === null || data === void 0 ? void 0 : data.status) === 200) {
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
                            logStatus.error("Error:" + (data === null || data === void 0 ? void 0 : data.statusText) + "(" + (data === null || data === void 0 ? void 0 : data.status) + ")");
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
                            if ((data === null || data === void 0 ? void 0 : data.status) === 200) {
                                logStatus.success();
                                if (doTask) this.tasks.reddits = unique(Reddit_spreadArray(Reddit_spreadArray([], Reddit_read(this.tasks.reddits), false), [ name ], false));
                                return [ 2, true ];
                            }
                            logStatus.error("Error:" + (data === null || data === void 0 ? void 0 : data.statusText) + "(" + (data === null || data === void 0 ? void 0 : data.status) + ")");
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
                        _a.trys.push([ 0, 5, , 6 ]);
                        if (!!this.auth.authToken) return [ 3, 2 ];
                        scripts_echoLog({
                            type: "updateTwitchAuth"
                        });
                        return [ 4, this.updateAuth() ];

                      case 1:
                        if (!_a.sent()) {
                            return [ 2, false ];
                        }
                        return [ 2, true ];

                      case 2:
                        return [ 4, this.verifyAuth() ];

                      case 3:
                        isVerified = _a.sent();
                        if (isVerified) {
                            scripts_echoLog({
                                text: "Init twitch success!"
                            });
                            return [ 2, true ];
                        }
                        GM_setValue("twitchAuth", {
                            auth: null
                        });
                        return [ 4, this.updateAuth() ];

                      case 4:
                        if (_a.sent()) {
                            scripts_echoLog({
                                text: "Init twitch success!"
                            });
                            return [ 2, true ];
                        }
                        scripts_echoLog({
                            text: "Init twitch failed!"
                        });
                        return [ 2, false ];

                      case 5:
                        error_1 = _a.sent();
                        throwError(error_1, "Twitch.init");
                        return [ 2, false ];

                      case 6:
                        return [ 2 ];
                    }
                });
            });
        };
        Twitch.prototype.verifyAuth = function() {
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
                            if ((data === null || data === void 0 ? void 0 : data.status) === 200 && ((_c = (_b = (_a = data.response) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.currentUser)) {
                                logStatus.success();
                                return [ 2, true ];
                            }
                            logStatus.error("Error:" + (data === null || data === void 0 ? void 0 : data.statusText) + "(" + (data === null || data === void 0 ? void 0 : data.status) + ")");
                            return [ 2, false ];
                        }
                        logStatus.error(result + ":" + statusText + "(" + status_1 + ")");
                        return [ 2, false ];

                      case 2:
                        error_2 = _e.sent();
                        throwError(error_2, "Twitch.verifyAuth");
                        return [ 2, false ];

                      case 3:
                        return [ 2 ];
                    }
                });
            });
        };
        Twitch.prototype.updateAuth = function() {
            return Twitch_awaiter(this, void 0, void 0, function() {
                var logStatus_1, error_3;
                var _this = this;
                return Twitch_generator(this, function(_a) {
                    switch (_a.label) {
                      case 0:
                        _a.trys.push([ 0, 2, , 3 ]);
                        logStatus_1 = scripts_echoLog({
                            type: "text",
                            text: "updateTwitchAuth"
                        });
                        return [ 4, new Promise(function(resolve) {
                            var newTab = GM_openInTab("https://www.twitch.tv/#auth", {
                                active: true,
                                insert: true,
                                setParent: true
                            });
                            newTab.onclose = function() {
                                return Twitch_awaiter(_this, void 0, void 0, function() {
                                    var auth, _a;
                                    return Twitch_generator(this, function(_b) {
                                        switch (_b.label) {
                                          case 0:
                                            auth = GM_getValue("twitchAuth");
                                            if (!auth) return [ 3, 2 ];
                                            this.auth = auth;
                                            logStatus_1.success();
                                            _a = resolve;
                                            return [ 4, this.verifyAuth() ];

                                          case 1:
                                            _a.apply(void 0, [ _b.sent() ]);
                                            return [ 3, 3 ];

                                          case 2:
                                            logStatus_1.error("Error: Update twitch auth failed!");
                                            resolve(false);
                                            _b.label = 3;

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
                        throwError(error_3, "Twitch.updateAuth");
                        return [ 2, false ];

                      case 3:
                        return [ 2 ];
                    }
                });
            });
        };
        Twitch.prototype.toggleChannel = function(_a) {
            var name = _a.name, _b = _a.doTask, doTask = _b === void 0 ? true : _b;
            return Twitch_awaiter(this, void 0, void 0, function() {
                var channelId, logStatus, followData, unfollowData, _c, result, statusText, status_2, data, error_4;
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
                            if ((data === null || data === void 0 ? void 0 : data.status) === 200) {
                                logStatus.success();
                                if (doTask) {
                                    this.tasks.channels = unique(Twitch_spreadArray(Twitch_spreadArray([], Twitch_read(this.tasks.channels), false), [ name ], false));
                                }
                                return [ 2, true ];
                            }
                            logStatus.error("Error:" + (data === null || data === void 0 ? void 0 : data.statusText) + "(" + (data === null || data === void 0 ? void 0 : data.status) + ")");
                            return [ 2, false ];
                        }
                        logStatus.error(result + ":" + statusText + "(" + status_2 + ")");
                        return [ 2, false ];

                      case 3:
                        error_4 = _d.sent();
                        throwError(error_4, "Twitch.toggleChannel");
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
                var logStatus, _e, result, statusText, status_3, data, channelId, error_5;
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
                            if ((data === null || data === void 0 ? void 0 : data.status) === 200) {
                                channelId = String((_d = (_c = (_b = (_a = data.response) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.user) === null || _d === void 0 ? void 0 : _d.id);
                                if (channelId) {
                                    logStatus.success();
                                    return [ 2, channelId ];
                                }
                                logStatus.error("Error:" + data.statusText + "(" + data.status + ")");
                                return [ 2, false ];
                            }
                            logStatus.error("Error:" + (data === null || data === void 0 ? void 0 : data.statusText) + "(" + (data === null || data === void 0 ? void 0 : data.status) + ")");
                            return [ 2, false ];
                        }
                        logStatus.error(result + ":" + statusText + "(" + status_3 + ")");
                        return [ 2, false ];

                      case 2:
                        error_5 = _f.sent();
                        throwError(error_5, "Twitch.getChannelId");
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
                var prom, realChannels, realChannels_1, realChannels_1_1, channel, e_1_1, error_6;
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
                        error_6 = _f.sent();
                        throwError(error_6, "Twitch.toggle");
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
        function Twitter(id, verifyId) {
            var _a;
            var _this = _super.call(this) || this;
            _this.verifyId = "783214";
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
            if (verifyId) {
                _this.verifyId = verifyId;
            }
            return _this;
        }
        Twitter.prototype.init = function() {
            return Twitter_awaiter(this, void 0, void 0, function() {
                var isVerified, error_1;
                return Twitter_generator(this, function(_a) {
                    switch (_a.label) {
                      case 0:
                        _a.trys.push([ 0, 5, , 6 ]);
                        if (!!this.auth.ct0) return [ 3, 2 ];
                        scripts_echoLog({
                            type: "updateTwitterAuth"
                        });
                        return [ 4, this.updateAuth() ];

                      case 1:
                        if (!_a.sent()) {
                            return [ 2, false ];
                        }
                        return [ 2, true ];

                      case 2:
                        return [ 4, this.verifyAuth() ];

                      case 3:
                        isVerified = _a.sent();
                        if (isVerified) {
                            scripts_echoLog({
                                text: "Init twitter success!"
                            });
                            return [ 2, true ];
                        }
                        GM_setValue("twitterAuth", {
                            auth: null
                        });
                        return [ 4, this.updateAuth() ];

                      case 4:
                        if (_a.sent()) {
                            scripts_echoLog({
                                text: "Init twitter success!"
                            });
                            return [ 2, true ];
                        }
                        scripts_echoLog({
                            text: "Init twitter failed!"
                        });
                        return [ 2, false ];

                      case 5:
                        error_1 = _a.sent();
                        throwError(error_1, "Twitter.init");
                        return [ 2, false ];

                      case 6:
                        return [ 2 ];
                    }
                });
            });
        };
        Twitter.prototype.verifyAuth = function() {
            return Twitter_awaiter(this, void 0, void 0, function() {
                var error_2;
                return Twitter_generator(this, function(_a) {
                    switch (_a.label) {
                      case 0:
                        _a.trys.push([ 0, 2, , 3 ]);
                        return [ 4, this.toggleUser({
                            name: "verify",
                            doTask: true,
                            verify: true
                        }) ];

                      case 1:
                        return [ 2, _a.sent() ];

                      case 2:
                        error_2 = _a.sent();
                        throwError(error_2, "Twitter.verifyAuth");
                        return [ 2, false ];

                      case 3:
                        return [ 2 ];
                    }
                });
            });
        };
        Twitter.prototype.updateAuth = function() {
            return Twitter_awaiter(this, void 0, void 0, function() {
                var logStatus_1, ct0, error_3;
                var _this = this;
                return Twitter_generator(this, function(_a) {
                    switch (_a.label) {
                      case 0:
                        _a.trys.push([ 0, 2, , 3 ]);
                        logStatus_1 = scripts_echoLog({
                            type: "text",
                            text: "updateTwitchAuth"
                        });
                        return [ 4, new Promise(function(resolve) {
                            var newTab = GM_openInTab("https://twitter.com/settings/account?k#auth", {
                                active: true,
                                insert: true,
                                setParent: true
                            });
                            newTab.onclose = function() {
                                return Twitter_awaiter(_this, void 0, void 0, function() {
                                    var auth, _a;
                                    return Twitter_generator(this, function(_b) {
                                        switch (_b.label) {
                                          case 0:
                                            auth = GM_getValue("twitterAuth");
                                            if (!auth) return [ 3, 2 ];
                                            this.auth = auth;
                                            logStatus_1.success();
                                            _a = resolve;
                                            return [ 4, this.verifyAuth() ];

                                          case 1:
                                            _a.apply(void 0, [ _b.sent() ]);
                                            return [ 3, 3 ];

                                          case 2:
                                            logStatus_1.error("Error: Update twitter auth failed!");
                                            resolve(false);
                                            _b.label = 3;

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
                        throwError(error_3, "Twitter.updateToken");
                        return [ 2, false ];

                      case 3:
                        return [ 2 ];
                    }
                });
            });
        };
        Twitter.prototype.toggleUser = function(_a) {
            var _b, _c, _d;
            var name = _a.name, _e = _a.doTask, doTask = _e === void 0 ? true : _e, _f = _a.verify, verify = _f === void 0 ? false : _f;
            return Twitter_awaiter(this, void 0, void 0, function() {
                var userId, _g, logStatus, _h, result, statusText, status_1, data, error_4;
                return Twitter_generator(this, function(_j) {
                    switch (_j.label) {
                      case 0:
                        _j.trys.push([ 0, 5, , 6 ]);
                        if (!doTask && !verify && this.whiteList.users.includes(name)) {
                            scripts_echoLog({
                                type: "whiteList",
                                text: name
                            });
                            return [ 2, true ];
                        }
                        if (!verify) return [ 3, 1 ];
                        _g = this.verifyId;
                        return [ 3, 3 ];

                      case 1:
                        return [ 4, this.getUserId(name) ];

                      case 2:
                        _g = _j.sent();
                        _j.label = 3;

                      case 3:
                        userId = _g;
                        if (!userId) return [ 2, false ];
                        logStatus = verify ? scripts_echoLog({
                            type: "text",
                            text: "verifyTwitterAuth"
                        }) : scripts_echoLog({
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
                        }) ];

                      case 4:
                        _h = _j.sent(), result = _h.result, statusText = _h.statusText, status_1 = _h.status, 
                        data = _h.data;
                        if (result === "Success") {
                            if ((data === null || data === void 0 ? void 0 : data.status) === 200) {
                                logStatus.success();
                                if (doTask && !verify) {
                                    this.tasks.users = unique(Twitter_spreadArray(Twitter_spreadArray([], Twitter_read(this.tasks.users), false), [ name ], false));
                                }
                                return [ 2, true ];
                            }
                            if (verify && (data === null || data === void 0 ? void 0 : data.status) === 403 && ((_d = (_c = (_b = data.response) === null || _b === void 0 ? void 0 : _b.errors) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.code) === 158) {
                                return [ 2, true ];
                            }
                            logStatus.error("Error:" + (data === null || data === void 0 ? void 0 : data.statusText) + "(" + (data === null || data === void 0 ? void 0 : data.status) + ")");
                            return [ 2, false ];
                        }
                        logStatus.error(result + ":" + statusText + "(" + status_1 + ")");
                        return [ 2, false ];

                      case 5:
                        error_4 = _j.sent();
                        throwError(error_4, "Twitter.toggleUser");
                        return [ 2, false ];

                      case 6:
                        return [ 2 ];
                    }
                });
            });
        };
        Twitter.prototype.getUserId = function(name) {
            var _a, _b;
            return Twitter_awaiter(this, void 0, void 0, function() {
                var logStatus, _c, result, statusText, status_2, data, response, userId, error_5;
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
                            if ((data === null || data === void 0 ? void 0 : data.status) === 200) {
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
                            logStatus.error("Error:" + (data === null || data === void 0 ? void 0 : data.statusText) + "(" + (data === null || data === void 0 ? void 0 : data.status) + ")");
                            return [ 2, false ];
                        }
                        logStatus.error(result + ":" + statusText + "(" + status_2 + ")");
                        return [ 2, false ];

                      case 2:
                        error_5 = _d.sent();
                        throwError(error_5, "Twitter.getUserId");
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
                var logStatus, _f, result, statusText, status_3, data, error_6;
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
                            if ((data === null || data === void 0 ? void 0 : data.status) === 200 || (data === null || data === void 0 ? void 0 : data.status) === 403 && ((_d = (_c = (_b = data.response) === null || _b === void 0 ? void 0 : _b.errors) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.code) === 327) {
                                logStatus.success();
                                if (doTask) this.tasks.retweets = unique(Twitter_spreadArray(Twitter_spreadArray([], Twitter_read(this.tasks.retweets), false), [ retweetId ], false));
                                return [ 2, true ];
                            }
                            logStatus.error("Error:" + (data === null || data === void 0 ? void 0 : data.statusText) + "(" + (data === null || data === void 0 ? void 0 : data.status) + ")");
                            return [ 2, false ];
                        }
                        logStatus.error(result + ":" + statusText + "(" + status_3 + ")");
                        return [ 2, false ];

                      case 2:
                        error_6 = _g.sent();
                        throwError(error_6, "Twitter.toggleRetweet");
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
                var prom, realUsers, realRetweets, realUsers_1, realUsers_1_1, user, e_1_1, realRetweets_1, realRetweets_1_1, retweet, e_2_1, error_7;
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
                        error_7 = _j.sent();
                        throwError(error_7, "Twitch.toggle");
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
    var _a;
    if (window.location.hostname === "discord.com" && window.location.hash === "#auth") {
        GM_setValue("discordAuth", {
            auth: (_a = window.localStorage.getItem("token")) === null || _a === void 0 ? void 0 : _a.replace(/^"|"$/g, "")
        });
        window.close();
    }
    window.onload = function() {
        var _a;
        if (window.location.hostname === "www.twitch.tv" && window.location.hash === "#auth") {
            var authToken = Cookies.get("auth-token");
            var isLogin = !!Cookies.get("login");
            if (isLogin) {
                GM_setValue("twitchAuth", {
                    authToken: authToken,
                    clientId: (_a = commonOptions === null || commonOptions === void 0 ? void 0 : commonOptions.headers) === null || _a === void 0 ? void 0 : _a["Client-ID"]
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
        unsafeWindow.Discord = social_Discord;
        unsafeWindow.Instagram = social_Instagram;
        unsafeWindow.Reddit = social_Reddit;
        unsafeWindow.Twitch = social_Twitch;
        unsafeWindow.Twitter = social_Twitter;
        $("body").append('<div id="fuck-task-info" style="position:fixed;bottom:10px;right:10px;width:300px;max-width:60%;"></div>');
    };
    var __webpack_export_target__ = exports;
    for (var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
    if (__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", {
        value: true
    });
})();
//# sourceMappingURL=index.js.map
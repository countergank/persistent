"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpPrivate = exports.httpUser = exports.getUserTest = exports.httpConnection = exports.httpFiles = exports.getUserInfo = exports.descompressSessionKey = exports.compressSessionKey = exports.appUrl = exports.httpRequest = exports.getUserFromStorage = exports.getUserOfflineInfo = exports.setUserLoggedInfo = exports.getCookieOnline = exports.getUserLoggedInfo = exports.removeCookieUser = exports.getThemeName = exports.getUserCookieName = exports.getAppStyleName = exports.getConfigName = exports.getOnlineCookieName = exports.setRedirectUrl = exports.getRedirectUrl = exports.setError = exports.getError = void 0;
var testing_1 = require("./testing");
var functions_1 = require("./functions");
var cookies_1 = require("./cookies");
var config_1 = require("./config");
var getError = function () {
    try {
        var value = (0, cookies_1.getLocalStorage)("countergank.error");
        var info = JSON.parse(value);
        if (info === null || info === void 0 ? void 0 : info.message) {
            return info;
        }
    }
    catch (error) {
        return undefined;
    }
    return undefined;
};
exports.getError = getError;
var setError = function (value) {
    (0, cookies_1.setLocalStorage)("countergank.error", value ? JSON.stringify(value) : undefined);
};
exports.setError = setError;
var getRedirectUrl = function () {
    return (0, cookies_1.getLocalStorage)("countergank.redirection");
};
exports.getRedirectUrl = getRedirectUrl;
var setRedirectUrl = function (value) {
    (0, cookies_1.setLocalStorage)("countergank.redirection", value === "" ? undefined : value);
};
exports.setRedirectUrl = setRedirectUrl;
var getCookieName = function (sufix) {
    try {
        return window.location.host + "_" + sufix;
    }
    catch (error) {
        return "countergank." + sufix;
    }
};
var getOnlineCookieName = function () {
    return getCookieName("online");
};
exports.getOnlineCookieName = getOnlineCookieName;
var getConfigName = function () {
    return getCookieName("config");
};
exports.getConfigName = getConfigName;
var getAppStyleName = function () {
    return getCookieName("appstyle");
};
exports.getAppStyleName = getAppStyleName;
var getUserCookieName = function () {
    return getCookieName("user");
};
exports.getUserCookieName = getUserCookieName;
var getThemeName = function () {
    return getCookieName("theme");
};
exports.getThemeName = getThemeName;
var removeCookieUser = function () {
    (0, cookies_1.setCookie)((0, exports.getUserCookieName)());
};
exports.removeCookieUser = removeCookieUser;
var getUserLoggedInfo = function () {
    try {
        var online = (0, cookies_1.getCookie)((0, exports.getOnlineCookieName)());
        if (online) {
            var value = (0, cookies_1.getLocalStorage)((0, exports.getOnlineCookieName)());
            var info = JSON.parse(value);
            if ((info === null || info === void 0 ? void 0 : info.user) && (info === null || info === void 0 ? void 0 : info.token)) {
                return info;
            }
        }
    }
    catch (error) {
        return undefined;
    }
    return undefined;
};
exports.getUserLoggedInfo = getUserLoggedInfo;
var getCookieOnline = function () {
    try {
        var info = JSON.parse((0, cookies_1.getCookie)((0, exports.getOnlineCookieName)()));
        if ((info === null || info === void 0 ? void 0 : info.timeout) && (info === null || info === void 0 ? void 0 : info.timestampBegin) && (info === null || info === void 0 ? void 0 : info.timestampEnd))
            return info;
        return undefined;
    }
    catch (error) {
        return undefined;
    }
};
exports.getCookieOnline = getCookieOnline;
var setUserLoggedInfo = function (value) {
    if (!(value === null || value === void 0 ? void 0 : value.user)) {
        (0, cookies_1.setCookie)((0, exports.getOnlineCookieName)());
        (0, cookies_1.setLocalStorage)((0, exports.getOnlineCookieName)());
    }
    else {
        var timeout = (0, functions_1.parseNumber)(value === null || value === void 0 ? void 0 : value.timeout);
        if (timeout <= 0) {
            timeout = 8 * 60 * 60;
        }
        var user = {
            userName: value.user.username,
            firstName: value.user.firstName,
            lastName: value.user.lastName,
            nick: value.user.nick,
            email: value.user.email,
            avatarId: value.user.avatarId,
            fullName: value.user.fullName || value.user.firstName + " " + value.user.lastName,
        };
        (0, cookies_1.setCookie)((0, exports.getUserCookieName)(), JSON.stringify(user), timeout * 5);
        (0, cookies_1.setLocalStorage)((0, exports.getOnlineCookieName)(), JSON.stringify(value));
        var info = {
            timeout: timeout,
            timestampBegin: Date.now(),
            timestampEnd: Date.now() + timeout * 1000,
        };
        (0, cookies_1.setCookie)((0, exports.getOnlineCookieName)(), JSON.stringify(info), timeout);
    }
};
exports.setUserLoggedInfo = setUserLoggedInfo;
var getUserOfflineInfo = function () {
    try {
        return JSON.parse((0, cookies_1.getCookie)((0, exports.getUserCookieName)()));
    }
    catch (error) {
        return undefined;
    }
};
exports.getUserOfflineInfo = getUserOfflineInfo;
var getUserFromStorage = function () {
    var _a;
    try {
        return ((_a = (0, exports.getUserOfflineInfo)()) === null || _a === void 0 ? void 0 : _a.userName) || "";
    }
    catch (error) {
        return "";
    }
};
exports.getUserFromStorage = getUserFromStorage;
var httpRequest = function (url, method, body, timeout, header) { return __awaiter(void 0, void 0, void 0, function () {
    var config;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, (0, config_1.getConfig)()];
            case 1:
                config = _a.sent();
                url = (0, functions_1.urlReplace)(url, config);
                return [2, (0, config_1.simpleRequest)(url, method, body, header, timeout)];
        }
    });
}); };
exports.httpRequest = httpRequest;
var appUrl = function (item, config) { return __awaiter(void 0, void 0, void 0, function () {
    var infoUser, url, key;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                infoUser = (0, exports.getUserLoggedInfo)();
                url = item.url || "";
                if (!((_a = item.config) === null || _a === void 0 ? void 0 : _a.includeToken)) return [3, 3];
                if (!(infoUser && config)) return [3, 2];
                key = (0, exports.compressSessionKey)(infoUser.user, item);
                url += "/".concat(key);
                return [4, (0, exports.httpRequest)("".concat(config.APIUser, "/user/session"), "POST", {
                        key: key,
                        token: (0, functions_1.base64_encode)(JSON.stringify({
                            user: infoUser.user,
                            token: infoUser.token,
                            url: ((_b = item.config) === null || _b === void 0 ? void 0 : _b.params) || "",
                        })),
                    }).catch(function (error) {
                        console.error("appUrl", error);
                        return "";
                    })];
            case 1:
                _c.sent();
                return [3, 3];
            case 2: return [2, ""];
            case 3: return [2, url];
        }
    });
}); };
exports.appUrl = appUrl;
var compressSessionKey = function (user, item) {
    var _a;
    try {
        return (0, functions_1.base64_encode)(JSON.stringify({ id: (user === null || user === void 0 ? void 0 : user.id) || "", url: ((_a = item === null || item === void 0 ? void 0 : item.config) === null || _a === void 0 ? void 0 : _a.params) || "" }));
    }
    catch (error) {
        return "";
    }
};
exports.compressSessionKey = compressSessionKey;
var descompressSessionKey = function (key) {
    try {
        var value = JSON.parse((0, functions_1.base64_decode)(key));
        if (value === null || value === void 0 ? void 0 : value.id)
            return value;
    }
    catch (error) {
        return undefined;
    }
    return undefined;
};
exports.descompressSessionKey = descompressSessionKey;
var getUserInfo = function () {
    var info = (0, exports.getUserLoggedInfo)();
    if (info === null || info === void 0 ? void 0 : info.user)
        return info.user;
    return undefined;
};
exports.getUserInfo = getUserInfo;
var httpFiles = function (url, body) {
    return new Promise(function (resolve, reject) { return __awaiter(void 0, void 0, void 0, function () {
        var config, headers, token;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4, (0, config_1.getConfig)()];
                case 1:
                    config = _b.sent();
                    url = (0, functions_1.urlReplace)(url, config);
                    headers = {
                        Authorization: "",
                    };
                    token = ((_a = (0, exports.getUserLoggedInfo)()) === null || _a === void 0 ? void 0 : _a.token) || "";
                    if (token) {
                        headers.Authorization = "Bearer " + token;
                    }
                    fetch(url, {
                        method: "POST",
                        mode: "cors",
                        headers: headers,
                        body: body,
                    })
                        .then(function (response) { return __awaiter(void 0, void 0, void 0, function () {
                        var error_1;
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 2, , 3]);
                                    _a = {
                                        status: response.status
                                    };
                                    return [4, response.json()];
                                case 1: return [2, (_a.data = _b.sent(),
                                        _a)];
                                case 2:
                                    error_1 = _b.sent();
                                    return [2, {
                                            status: response.status,
                                            data: {},
                                        }];
                                case 3: return [2];
                            }
                        });
                    }); })
                        .then(function (info) {
                        if (info.status < 400)
                            return resolve(info.data);
                        reject(info);
                    })
                        .catch(function (error) {
                        reject({
                            status: 500,
                            data: {
                                message: "Se encontraron problemas de conectividad",
                                description: error,
                            },
                        });
                    });
                    return [2];
            }
        });
    }); });
};
exports.httpFiles = httpFiles;
var httpConnection = (function () {
    function httpConnection(entry, returnDataResponseProp) {
        if (returnDataResponseProp === void 0) { returnDataResponseProp = false; }
        this.entry = entry;
        this.returnDataResponseProp = returnDataResponseProp;
        this.url = "";
    }
    httpConnection.prototype.setUrl = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var entry, config, error_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.url && this.url !== "")
                            return [2];
                        entry = this.entry;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4, (0, config_1.getConfig)()];
                    case 2:
                        config = _c.sent();
                        if (config && ((_a = config[entry]) === null || _a === void 0 ? void 0 : _a.toString))
                            this.url = ((_b = config[entry]) === null || _b === void 0 ? void 0 : _b.toString()) || "";
                        return [3, 4];
                    case 3:
                        error_2 = _c.sent();
                        this.url = "";
                        return [3, 4];
                    case 4: return [2];
                }
            });
        });
    };
    httpConnection.prototype.getUrl = function (endpoint) {
        return __awaiter(this, void 0, void 0, function () {
            var v1, v2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.setUrl()];
                    case 1:
                        _a.sent();
                        if (!this.url || this.url.length < 5 || !endpoint || endpoint.length === 0)
                            return [2, ""];
                        v1 = this.url.endsWith("/");
                        v2 = endpoint.startsWith("/");
                        if (!v1 && !v2)
                            endpoint = "/" + endpoint;
                        else if (v1 && v2)
                            endpoint = endpoint.substr(-1);
                        return [2, this.url + endpoint];
                }
            });
        });
    };
    httpConnection.prototype.request = function (endpoint, method, body, timeout, header) {
        var _this = this;
        if (timeout === void 0) { timeout = 30000; }
        if (header === void 0) { header = undefined; }
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = exports.httpRequest;
                        return [4, this.getUrl(endpoint)];
                    case 1:
                        _a.apply(void 0, [_b.sent(), method, body, timeout, header])
                            .then(function (resp) {
                            if (_this.returnDataResponseProp === true) {
                                resolve({ data: resp });
                            }
                            else {
                                resolve(resp);
                            }
                        })
                            .catch(function (error) {
                            reject(error);
                        });
                        return [2];
                }
            });
        }); });
    };
    httpConnection.prototype.post = function (endpoint, body, timeout, header) {
        if (timeout === void 0) { timeout = 0; }
        if (header === void 0) { header = undefined; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.request(endpoint, "POST", body, timeout, header)];
            });
        });
    };
    httpConnection.prototype.get = function (endpoint, timeout, header) {
        if (timeout === void 0) { timeout = 0; }
        if (header === void 0) { header = undefined; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.request(endpoint, "GET", null, timeout, header)];
            });
        });
    };
    httpConnection.prototype.delete = function (endpoint, body, timeout, header) {
        if (timeout === void 0) { timeout = 0; }
        if (header === void 0) { header = undefined; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.request(endpoint, "DELETE", body, timeout, header)];
            });
        });
    };
    httpConnection.prototype.put = function (endpoint, body, timeout, header) {
        if (timeout === void 0) { timeout = 0; }
        if (header === void 0) { header = undefined; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.request(endpoint, "PUT", body, timeout, header)];
            });
        });
    };
    httpConnection.prototype.files = function (endpoint, body) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var url, headers, token;
                        var _this = this;
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4, this.getUrl(endpoint)];
                                case 1:
                                    url = _b.sent();
                                    headers = {
                                        Authorization: "",
                                    };
                                    token = ((_a = (0, exports.getUserLoggedInfo)()) === null || _a === void 0 ? void 0 : _a.token) || "";
                                    if (token) {
                                        headers.Authorization = "Bearer " + token;
                                    }
                                    fetch(url, {
                                        method: "POST",
                                        mode: "cors",
                                        headers: headers,
                                        body: body,
                                    })
                                        .then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                                        var error_3;
                                        var _a;
                                        return __generator(this, function (_b) {
                                            switch (_b.label) {
                                                case 0:
                                                    _b.trys.push([0, 2, , 3]);
                                                    _a = {
                                                        status: response.status
                                                    };
                                                    return [4, response.json()];
                                                case 1: return [2, (_a.data = _b.sent(),
                                                        _a)];
                                                case 2:
                                                    error_3 = _b.sent();
                                                    return [2, {
                                                            status: response.status,
                                                            data: {},
                                                        }];
                                                case 3: return [2];
                                            }
                                        });
                                    }); })
                                        .then(function (info) {
                                        if (info.status < 400) {
                                            if (_this.returnDataResponseProp === true) {
                                                return resolve(info);
                                            }
                                            else {
                                                return resolve(info.data);
                                            }
                                        }
                                        reject(info);
                                    })
                                        .catch(function (error) {
                                        reject({
                                            status: 500,
                                            data: {
                                                message: "Se encontraron problemas de conectividad",
                                                description: error,
                                            },
                                        });
                                    });
                                    return [2];
                            }
                        });
                    }); })];
            });
        });
    };
    return httpConnection;
}());
exports.httpConnection = httpConnection;
var getUserTest = function () {
    return (0, testing_1.getUserTesting)();
};
exports.getUserTest = getUserTest;
exports.httpUser = new httpConnection("APIUser");
exports.httpPrivate = new httpConnection("APIPrivate");
//# sourceMappingURL=persistent.js.map
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.initializationApp = exports.useConfig = exports.getConfig = exports.replaceReactApp = exports.simpleRequest = exports.defaultHttpHeaders = void 0;
var React = require("react");
var cookies_1 = require("./cookies");
var functions_1 = require("./functions");
var persistent_1 = require("./persistent");
var defaultHttpHeaders = function (header) {
    var headerd = !Array.isArray(header) ? header : undefined;
    return __assign({ "Content-Type": "application/json", "Accept-Encoding": "gzip, compress, br" }, headerd);
};
exports.defaultHttpHeaders = defaultHttpHeaders;
var simpleRequest = function (url, method, body, header, timeout) {
    return new Promise(function (resolve, reject) { return __awaiter(void 0, void 0, void 0, function () {
        var controller, id, headers, token;
        var _a;
        return __generator(this, function (_b) {
            if (!method)
                method = "GET";
            if (body)
                body = JSON.stringify(body);
            if (!timeout || timeout <= 0)
                timeout = 30000;
            controller = new AbortController();
            id = setTimeout(function () {
                controller.abort();
            }, timeout);
            headers = header || {};
            if (!url.endsWith(".json") &&
                !headers["Authorization"] &&
                !headers["authorization"]) {
                token = ((_a = (0, persistent_1.getUserLoggedInfo)()) === null || _a === void 0 ? void 0 : _a.token) || "";
                if (token)
                    headers["Authorization"] = "Bearer " + token;
            }
            fetch(url, {
                method: method,
                mode: "cors",
                body: body,
                headers: (0, exports.defaultHttpHeaders)(headers),
                signal: controller.signal,
            })
                .then(function (response) {
                try {
                    return {
                        status: response.status,
                        data: response.json(),
                    };
                }
                catch (error) {
                    return {
                        status: response.status,
                        data: {},
                    };
                }
            })
                .then(function (info) {
                clearTimeout(id);
                if (info.status < 400)
                    return resolve(info.data);
                if (info.status === 401) {
                    (0, persistent_1.setUserLoggedInfo)(undefined);
                }
                reject(__assign(__assign({}, info), { data: {
                        message: "Error Desconocido",
                    } }));
            })
                .catch(function (error) {
                reject({
                    status: (error === null || error === void 0 ? void 0 : error.status) || 500,
                    data: {
                        message: "Se encontraron problemas de conectividad",
                        description: error,
                    },
                });
            });
            return [2];
        });
    }); });
};
exports.simpleRequest = simpleRequest;
var replaceReactApp = function (data) {
    if (!(data === null || data === void 0 ? void 0 : data.REACT_APP_APIUser))
        return undefined;
    for (var _i = 0, _a = Object.entries(data); _i < _a.length; _i++) {
        var key = _a[_i][0];
        if (key.startsWith("REACT_APP_")) {
            try {
                data[key.replace("REACT_APP_", "")] = JSON.parse(data[key]);
            }
            catch (error) {
                data[key.replace("REACT_APP_", "")] = data[key];
            }
            delete data[key];
        }
    }
    return data;
};
exports.replaceReactApp = replaceReactApp;
var getConfig = function (path) { return __awaiter(void 0, void 0, void 0, function () {
    var config, info, infoSuite, infoConfig, addConfig;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                config = null;
                try {
                    config = JSON.parse((0, cookies_1.getLocalStorage)((0, persistent_1.getConfigName)()));
                }
                catch (error) {
                    config = null;
                }
                if (config === null || config === void 0 ? void 0 : config.APIUser)
                    return [2, config];
                if (!path)
                    path = window.location.origin + "/";
                info = (0, exports.replaceReactApp)(process.env);
                if (!!info) return [3, 3];
                info = {};
                return [4, (0, exports.simpleRequest)(path + "suite.json").catch(functions_1.errorFn)];
            case 1:
                infoSuite = _a.sent();
                return [4, (0, exports.simpleRequest)(path + "config.json").catch(functions_1.errorFn)];
            case 2:
                infoConfig = _a.sent();
                addConfig = function (value) {
                    if (value) {
                        for (var _i = 0, _a = Object.entries(value); _i < _a.length; _i++) {
                            var name_1 = _a[_i][0];
                            if (name_1 && value[name_1]) {
                                info[name_1] = value[name_1];
                            }
                        }
                    }
                };
                addConfig(infoSuite);
                addConfig(infoConfig);
                _a.label = 3;
            case 3:
                if (info === null || info === void 0 ? void 0 : info.APIUser) {
                    (0, cookies_1.setLocalStorage)((0, persistent_1.getConfigName)(), JSON.stringify(info));
                    return [2, info];
                }
                return [2, undefined];
        }
    });
}); };
exports.getConfig = getConfig;
function useConfig(pathConfig) {
    var _a = React.useState(), config = _a[0], setConfig = _a[1];
    React.useEffect(function () {
        function loadConfig() {
            return __awaiter(this, void 0, void 0, function () {
                var localConfig;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, (0, exports.getConfig)(pathConfig)];
                        case 1:
                            localConfig = _a.sent();
                            if (localConfig) {
                                setConfig(localConfig);
                            }
                            return [2];
                    }
                });
            });
        }
        loadConfig();
    }, []);
    return config;
}
exports.useConfig = useConfig;
var initializationApp = function (appName, customConfig, path) { return __awaiter(void 0, void 0, void 0, function () {
    var info, config, _a, data_1, _i, _b, key, themes, customthemes, index, element, _c, _d, _e, key, val;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                (0, cookies_1.setLocalStorage)((0, persistent_1.getConfigName)());
                (0, cookies_1.setLocalStorage)((0, persistent_1.getAppStyleName)());
                return [4, (0, exports.getConfig)(path)];
            case 1:
                info = _f.sent();
                if (!(!(info === null || info === void 0 ? void 0 : info.APIUser) || !appName)) return [3, 2];
                _a = [];
                return [3, 4];
            case 2: return [4, (0, exports.simpleRequest)(info.APIUser + "/config-web/" + appName).catch(functions_1.errorFn)];
            case 3:
                _a = _f.sent();
                _f.label = 4;
            case 4:
                config = _a;
                if (Array.isArray(config) && config.some(function (i) { return i.name === "APIUser"; })) {
                    data_1 = {};
                    config.forEach(function (item) {
                        try {
                            data_1[item.name] = JSON.parse(item.value);
                        }
                        catch (error) {
                            data_1[item.name] = item.value;
                        }
                    });
                    if (customConfig) {
                        for (_i = 0, _b = Object.entries(customConfig); _i < _b.length; _i++) {
                            key = _b[_i][0];
                            data_1[key] = customConfig[key];
                        }
                    }
                    try {
                        themes = (0, functions_1.toArray)(data_1.themes);
                        customthemes = (0, functions_1.toArray)(data_1.customthemes);
                        for (index = 0; index < customthemes.length; index++) {
                            element = customthemes[index];
                            if (themes.length > index) {
                                for (_c = 0, _d = Object.entries(element); _c < _d.length; _c++) {
                                    _e = _d[_c], key = _e[0], val = _e[1];
                                    data_1.themes[index][key] = val;
                                }
                            }
                        }
                    }
                    catch (error) {
                        (0, functions_1.log)("error", "initializationApp", error);
                    }
                    (0, cookies_1.setLocalStorage)((0, persistent_1.getConfigName)(), JSON.stringify(data_1));
                    if (data_1 === null || data_1 === void 0 ? void 0 : data_1.AppStyle) {
                        (0, cookies_1.setLocalStorage)((0, persistent_1.getAppStyleName)(), JSON.stringify(data_1 === null || data_1 === void 0 ? void 0 : data_1.AppStyle));
                    }
                }
                return [2];
        }
    });
}); };
exports.initializationApp = initializationApp;
//# sourceMappingURL=config.js.map
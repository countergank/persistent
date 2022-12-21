"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertLoggedInfo = exports.toArray = exports.toString = exports.testIsRunning = exports.errorFn = exports.FORMAT_DATETIME = exports.FORMAT_TIME = exports.FORMAT_DATE = exports.materialScrollbarStyle = exports.log = exports.formatContructorDate = exports.formatConstructorTime = exports.base64_decode = exports.base64_encode = exports.convertInfoToGoogleChart = exports.equals = exports.typeOf = exports.parseNumber = exports.nameFromUrl = exports.downloadFile = exports.isAssigned = exports.dateToString = exports.diffDatesRaw = exports.diffDates = exports.formatTime = exports.formatDateToIso = exports.formatDate = exports.replaceAll = exports.openUrl = exports.urlReplace = exports.isPlatform = void 0;
var aes_1 = require("./aes");
var isPlatform = function (type) {
    switch (type) {
        case "desktop":
            return screen.width > 1000;
    }
    return !(0, exports.isPlatform)("desktop");
};
exports.isPlatform = isPlatform;
var urlReplace = function (url, config) {
    if (config === void 0) { config = undefined; }
    if (!url)
        return "";
    if (config) {
        for (var _i = 0, _a = Object.entries(config); _i < _a.length; _i++) {
            var _b = _a[_i], name_1 = _b[0], value = _b[1];
            try {
                if ((0, exports.isAssigned)(name_1)) {
                    var localValue = (0, exports.toString)(value);
                    url = (0, exports.replaceAll)(url, "{".concat(name_1.toUpperCase(), "}"), localValue);
                }
            }
            catch (error) {
                console.error("urlReplace", url, error);
            }
        }
    }
    return url;
};
exports.urlReplace = urlReplace;
var openUrl = function (url, target) {
    if (target === void 0) { target = "_blank"; }
    var newWindow = window.open((0, exports.urlReplace)(url), target, "noopener,noreferrer");
    if (newWindow)
        newWindow.opener = null;
};
exports.openUrl = openUrl;
var replaceAll = function (value, oldValue, newValue) {
    if (!value)
        return "";
    try {
        var pos = value.indexOf(oldValue);
        while (pos >= 0) {
            value = value === null || value === void 0 ? void 0 : value.replace(oldValue, newValue);
            pos = value.indexOf(oldValue);
        }
        return value;
    }
    catch (error) {
        return value;
    }
};
exports.replaceAll = replaceAll;
var dateToStr = function (date) {
    return date && date.replace
        ? date.replace("T", " ").replace("Z", "").substr(0, 19)
        : date;
};
var formatDate = function (isoDate, includeTime, format, days, includeSeconds) {
    if (includeTime === void 0) { includeTime = true; }
    if (format === void 0) { format = "/"; }
    if (days === void 0) { days = 0; }
    if (includeSeconds === void 0) { includeSeconds = false; }
    if (isoDate && isoDate.length === 10)
        isoDate = isoDate + " 00:00:00";
    var fecha = isoDate ? new Date(dateToStr(isoDate)) : new Date();
    return (0, exports.formatContructorDate)(fecha, includeTime, format, days, includeSeconds);
};
exports.formatDate = formatDate;
var formatDateToIso = function (Date) {
    Date = Date.toLowerCase();
    if (Date.length > 16)
        Date = Date.slice(0, 16);
    return "".concat(Date.slice(6, 10), "-").concat(Date.slice(3, 5), "-").concat(Date.slice(0, 2), "T").concat(Date.slice(11, 16));
};
exports.formatDateToIso = formatDateToIso;
var formatTime = function (isoDate) {
    var res = "";
    try {
        var fecha = isoDate ? new Date(dateToStr(isoDate)) : new Date();
        if (fecha.getDate()) {
            var h = fecha.getHours();
            var M = fecha.getMinutes();
            if (h < 10)
                res = "0";
            res += h.toString() + ":";
            if (M < 10)
                res += "0";
            res += M.toString();
        }
    }
    catch (error) {
        res = "";
    }
    return res;
};
exports.formatTime = formatTime;
var diffDate = function (valueFrom, valueTo, type, includeNegatives) {
    if (!valueFrom)
        return 0;
    try {
        var ff = new Date(dateToStr(valueFrom)).getTime();
        var ft = new Date().getTime();
        if (valueTo) {
            ft = new Date(dateToStr(valueTo)).getTime();
        }
        var res = (ft - ff) / 1000;
        if (type === "min")
            res = res / 60;
        else if (type === "hour")
            res = res / 60 / 60;
        else if (type === "day") {
            res = res / 60 / 60 / 24;
            if (includeNegatives !== true) {
                if (res > 0 && res < 1)
                    res = 1;
                if (res > -1 && res < 0)
                    res = -1;
            }
        }
        if (includeNegatives === true)
            return res;
        return Math.abs(res);
    }
    catch (error) {
        return 0;
    }
};
var diffDates = function (valueFrom, valueTo, type) {
    if (valueTo === void 0) { valueTo = null; }
    if (type === void 0) { type = "day"; }
    var diff = diffDate(valueFrom, valueTo, type, false);
    return Math.trunc(diff);
};
exports.diffDates = diffDates;
var diffDatesRaw = function (valueFrom, valueTo, type) {
    if (valueTo === void 0) { valueTo = null; }
    if (type === void 0) { type = "day"; }
    return diffDate(valueFrom, valueTo, type, true);
};
exports.diffDatesRaw = diffDatesRaw;
var dateToString = function (date, includeTime) {
    if (includeTime === void 0) { includeTime = true; }
    if (date) {
        var array = (0, exports.formatDate)(date).split(" ");
        if (array.length === 2)
            return (array[0] + (includeTime === true ? " a las " + array[1] + " hs" : ""));
    }
    return "";
};
exports.dateToString = dateToString;
var isAssigned = function (value) {
    if (value === null || value === undefined)
        return false;
    return true;
};
exports.isAssigned = isAssigned;
var downloadFile = function (url, target, setToaster) {
    if (target === void 0) { target = "_self"; }
    try {
        var link = document.createElement("a");
        link.href = url;
        link.target = target;
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
    }
    catch (error) {
        if (setToaster)
            setToaster({
                message: "No se pudo descargar el archivo",
                duration: 3000,
                showToast: true,
                toastHeader: "Error",
                toastColor: "danger",
            });
    }
};
exports.downloadFile = downloadFile;
var nameFromUrl = function (url, includeExt) {
    if (includeExt === void 0) { includeExt = true; }
    var array = url && url !== "" ? url.split("/") : [];
    if (array.length > 0) {
        var text = array[array.length - 1];
        if (includeExt === true)
            return text;
        array = text.split(".");
        if (array.length > 0)
            return array[0];
    }
    return "";
};
exports.nameFromUrl = nameFromUrl;
var parseNumber = function (value, def) {
    if (def === void 0) { def = 0; }
    if (value &&
        value.toString &&
        (parseInt(value.toString()) == value.toString() ||
            parseFloat(value.toString()) == value.toString())) {
        return parseFloat(value.toString());
    }
    return def;
};
exports.parseNumber = parseNumber;
var typeOf = function (value) {
    if (value) {
        if (value instanceof Array)
            return "array";
        if (value instanceof Object)
            return "object";
        if (value.toString) {
            var str = value.toString();
            if (str.toLowerCase() === "false" || str.toLowerCase() === "true")
                return "boolean";
            if (str === "0" || (0, exports.parseNumber)(str) !== 0)
                return "number";
            return "string";
        }
    }
    return "";
};
exports.typeOf = typeOf;
var equals = function (newValue, oldValue, excludedNames, pk, test, enableLog) {
    if (excludedNames === void 0) { excludedNames = []; }
    if (pk === void 0) { pk = "id"; }
    if (test === void 0) { test = ""; }
    if (enableLog === void 0) { enableLog = false; }
    if (!newValue && oldValue)
        return false;
    if (newValue && !oldValue)
        return false;
    if (!newValue && !oldValue)
        return true;
    var typenew = (0, exports.typeOf)(newValue);
    var typeold = (0, exports.typeOf)(oldValue);
    if (typenew != typeold) {
        enableLog && console.error("equals.type", typenew, typeold);
        return false;
    }
    switch (typenew) {
        case "array":
            if (newValue.length != oldValue.length) {
                enableLog &&
                    console.error("equals.array", "length", test, newValue.length, oldValue.length);
                return false;
            }
            var _loop_1 = function (index) {
                var v1 = newValue[index];
                if (!v1 || excludedNames.indexOf(v1) >= 0)
                    return "continue";
                if (pk !== "" && !(0, exports.isAssigned)(v1[pk]))
                    return "continue";
                var v2 = pk == ""
                    ? oldValue.find(function (j) { return j == v1; })
                    : oldValue.find(function (j) { return j && j[pk] == v1[pk]; });
                if (!v2) {
                    enableLog && console.error("equals.array", "find", test, pk, v1);
                    return { value: false };
                }
                var v = pk == "" ? v2 : v2[pk];
                if (excludedNames.indexOf(v) >= 0)
                    return "continue";
                if (pk != "" && v1["external"] === true) {
                    if (excludedNames.indexOf("endTime") < 0)
                        excludedNames.push("endTime");
                    if (excludedNames.indexOf("dueCaseEstimated") < 0)
                        excludedNames.push("dueCaseEstimated");
                    if (excludedNames.indexOf("due") < 0)
                        excludedNames.push("due");
                }
                if ((0, exports.equals)(v1, v2, excludedNames, "id", test + ". PK:" + (pk == "" ? v1 : v1[pk])) === false) {
                    return { value: false };
                }
            };
            for (var index = 0; index < newValue.length; index++) {
                var state_1 = _loop_1(index);
                if (typeof state_1 === "object")
                    return state_1.value;
            }
            break;
        case "string":
        case "number":
        case "boolean":
            if (newValue != oldValue) {
                enableLog &&
                    console.error("equals." + typenew, test, "NEWVALUE", JSON.stringify(newValue), "oldValue", JSON.stringify(oldValue));
                return false;
            }
            break;
        case "object":
            var equalObjects = function (o1, o2) {
                for (var _i = 0, _a = Object.entries(o1); _i < _a.length; _i++) {
                    var name_2 = _a[_i][0];
                    if (excludedNames.indexOf(name_2) >= 0)
                        continue;
                    var v1 = o1[name_2];
                    var v2 = o2[name_2];
                    if (excludedNames.indexOf(v1) >= 0)
                        continue;
                    if (excludedNames.indexOf(v2) >= 0)
                        continue;
                    if (name_2 == "childrens") {
                        var newArray = Array.isArray(v1) ? v1 : [];
                        var oldArray = Array.isArray(v2) ? v2 : [];
                        if (newArray.length != oldArray.length) {
                            return false;
                        }
                    }
                    else if (name_2 == "properties") {
                        var newArray = Array.isArray(v1) ? v1 : [];
                        var oldArray = Array.isArray(v2) ? v2 : [];
                        if ((0, exports.equals)(oldArray, newArray, excludedNames, "name", test + ". properties:" + JSON.stringify(newArray)) === false) {
                            return false;
                        }
                    }
                    else if ((0, exports.equals)(v1, v2, excludedNames, "id", test + ". value:" + JSON.stringify(v1)) === false) {
                        enableLog && console.error("object.error", test, v1, name_2);
                        return false;
                    }
                }
                return true;
            };
            if (equalObjects(newValue, oldValue) === false ||
                equalObjects(oldValue, newValue) === false) {
                return false;
            }
            break;
    }
    return true;
};
exports.equals = equals;
var convertInfoToGoogleChart = function (result, tipo) {
    if (tipo === void 0) { tipo = "default"; }
    var colors = [];
    var data = null;
    var defaultNumber = -10000000;
    if (Array.isArray(result) && result.length > 0) {
        if (Array.isArray(result[0])) {
            data = result;
        }
        else if (tipo === "calendar") {
            data = [
                [
                    { type: "date", id: "Fecha" },
                    { type: "number", id: "Cantidad" },
                ],
            ];
            result.map(function (i) {
                if (i.color && i.color.substr && i.color.substr(0, 3) != "hsl")
                    colors.push(i.color);
                var count = (0, exports.parseNumber)(i.value, defaultNumber) != defaultNumber
                    ? i.value
                    : (0, exports.parseNumber)(i.count, defaultNumber) != defaultNumber
                        ? i.count
                        : (0, exports.parseNumber)(i.loc, defaultNumber) != defaultNumber
                            ? i.loc
                            : null;
                var date = i.day && i.day != ""
                    ? i.day
                    : i.label && i.label != ""
                        ? i.label
                        : i.name && i.name != ""
                            ? i.name
                            : i.caption && i.caption != ""
                                ? i.caption
                                : null;
                if (count != null && date != null) {
                    var f = new Date(date);
                    if (Array.isArray(data) && f) {
                        return data.push([f, count]);
                    }
                }
                return null;
            });
        }
        else if (tipo === "line") {
            data = [["Valor", "Cantidad"]];
            var year_1 = new Date().getFullYear().toString();
            result.map(function (i) {
                if (i.color)
                    colors.push(i.color);
                var id = i.id;
                var dataLine = Array.isArray(i.data) ? i.data : null;
                if (id != null && dataLine != null) {
                    dataLine.map(function (item) {
                        if (item.x && (0, exports.parseNumber)(item.y, defaultNumber) != defaultNumber) {
                            var x = null;
                            var tipo_1 = "number";
                            if ((0, exports.parseNumber)(item.x, defaultNumber) != defaultNumber) {
                                x = item.x;
                            }
                            else {
                                if (item.x.length === 5) {
                                    x = item.x + "/" + year_1;
                                }
                                var f = x ? new Date(x) : new Date();
                                if (f) {
                                    x = f;
                                    tipo_1 = "date";
                                }
                                else {
                                    x = null;
                                }
                            }
                            if (Array.isArray(data) && x !== null) {
                                if (data.length === 0) {
                                    if (tipo_1 === "number")
                                        data.push(["Valor", "Cantidad"]);
                                    else
                                        data.push([{ type: "date", label: "Fecha" }, "Cantidad"]);
                                }
                                data.push([x, (0, exports.parseNumber)(item.y).toString()]);
                            }
                        }
                        return null;
                    });
                }
                return null;
            });
        }
        else {
            data = [["Valor", "Cantidad"]];
            result.map(function (i) {
                if (i.color && i.color.substr && i.color.substr(0, 3) != "hsl")
                    colors.push(i.color);
                var count = (0, exports.parseNumber)(i.value, defaultNumber) != defaultNumber
                    ? i.value
                    : (0, exports.parseNumber)(i.count, defaultNumber) != defaultNumber
                        ? i.count
                        : (0, exports.parseNumber)(i.loc, defaultNumber) != defaultNumber
                            ? i.loc
                            : null;
                var name = i.label && i.label != ""
                    ? i.label
                    : i.name && i.name != ""
                        ? i.name
                        : i.caption && i.caption != ""
                            ? i.caption
                            : null;
                if (Array.isArray(data) && count != null && name != null)
                    return data.push([name, count]);
                return null;
            });
        }
    }
    var props = result && result.length > 0 && Array.isArray(result[0].props)
        ? result[0].props
        : [];
    return {
        props: props,
        data: data,
        colors: !Array.isArray(colors) || colors.length == 0 ? null : colors,
    };
};
exports.convertInfoToGoogleChart = convertInfoToGoogleChart;
var base64_encode = function (value) {
    try {
        return aes_1.Base64.encode(value);
    }
    catch (error) {
        return "";
    }
};
exports.base64_encode = base64_encode;
var base64_decode = function (value) {
    try {
        return aes_1.Base64.decode(value);
    }
    catch (error) {
        return "";
    }
};
exports.base64_decode = base64_decode;
var formatConstructorTime = function (fecha, includeSeconds) {
    if (includeSeconds === void 0) { includeSeconds = false; }
    var res = "00:00";
    var aux = fecha;
    if (includeSeconds === true)
        res += ":00";
    if (fecha && (aux === null || aux === void 0 ? void 0 : aux.getDate)) {
        res = "";
        var h = fecha.getHours();
        var M = fecha.getMinutes();
        var s = fecha.getSeconds();
        if (h < 10)
            res += "0";
        res += h.toString() + ":";
        if (M < 10)
            res += "0";
        res += M.toString();
        if (includeSeconds === true) {
            res += ":";
            if (s < 10)
                res += "0";
            res += s.toString();
        }
    }
    return res;
};
exports.formatConstructorTime = formatConstructorTime;
var formatContructorDate = function (fecha, includeTime, format, days, includeSeconds) {
    if (includeTime === void 0) { includeTime = true; }
    if (format === void 0) { format = "/"; }
    if (days === void 0) { days = 0; }
    if (includeSeconds === void 0) { includeSeconds = false; }
    var res = "";
    try {
        if (fecha && fecha.getDate) {
            if (days && days !== 0)
                fecha.setDate(fecha.getDate() + days);
            var d = fecha.getDate();
            var m = fecha.getMonth() + 1;
            var y = fecha.getFullYear();
            var h = fecha.getHours();
            var M = fecha.getMinutes();
            if (format === "/") {
                if (d < 10)
                    res = "0";
                res += d.toString() + "/";
                if (m < 10)
                    res += "0";
                res += m.toString() + "/";
                res += y.toString();
            }
            else {
                res = y.toString() + "-";
                if (m < 10)
                    res += "0";
                res += m.toString() + "-";
                if (d < 10)
                    res += "0";
                res += d.toString();
            }
            if (includeTime === true || includeSeconds === true) {
                res += " ";
                if (h < 10)
                    res += "0";
                res += h.toString() + ":";
                if (M < 10)
                    res += "0";
                res += M.toString();
                if (includeSeconds === true) {
                    res += ":";
                    if (fecha.getSeconds() < 10)
                        res += "0";
                    res += fecha.getSeconds().toString();
                }
            }
        }
    }
    catch (error) {
        res = "";
    }
    return res;
};
exports.formatContructorDate = formatContructorDate;
var log = function (type, componentName) {
    var array = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        array[_i - 2] = arguments[_i];
    }
    var text = (0, exports.formatDate)("", true, "/", 0, true);
    switch (type) {
        case "debug":
            console.debug.apply(console, __spreadArray([text, componentName], array, false));
            break;
        case "warn":
            console.warn.apply(console, __spreadArray([text, componentName], array, false));
            break;
        case "error":
            console.error.apply(console, __spreadArray([text, componentName], array, false));
            break;
    }
};
exports.log = log;
var materialScrollbarStyle = function (color, background) {
    if (color === void 0) { color = "#eeeeee"; }
    if (background === void 0) { background = "transparent"; }
    return {
        "@global": {
            "*::-webkit-scrollbar": {
                width: 10,
                height: 10,
                backgroundColor: background,
            },
            "*::-webkit-scrollbar-track": {
                boxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
                borderRadius: 2,
                backgroundColor: background,
            },
            "*::-webkit-scrollbar-thumb": {
                borderRadius: 2,
                boxShadow: "inset 0 0 6px rgba(0,0,0,.3)",
                backgroundColor: color,
            },
        },
    };
};
exports.materialScrollbarStyle = materialScrollbarStyle;
exports.FORMAT_DATE = "DD/MM/YYYY";
exports.FORMAT_TIME = "HH:MM";
exports.FORMAT_DATETIME = exports.FORMAT_DATE + " " + exports.FORMAT_TIME;
var errorFn = function (_error) {
    return;
};
exports.errorFn = errorFn;
var testIsRunning = function () {
    return process.env.NODE_ENV === "development";
};
exports.testIsRunning = testIsRunning;
var toString = function (value, def) {
    if (def === void 0) { def = ""; }
    try {
        return value.toString();
    }
    catch (error) {
        return def;
    }
};
exports.toString = toString;
function toArray(array) {
    if (!Array.isArray(array)) {
        return [];
    }
    return array;
}
exports.toArray = toArray;
var convertLoggedInfo = function (value) {
    return {
        token: value.token,
        timeout: value.timeout,
        user: {
            applications: value.user.applications,
            company: {
                id: value.user.company.id,
                name: value.user.company.name,
            },
            email: value.user.email,
            firstName: value.user.firstName,
            groups: value.user.groups.map(function (item) {
                return {
                    id: item.id,
                    name: item.name,
                    externalId: item.externalId,
                };
            }),
            id: value.user.id,
            lastName: value.user.lastName,
            nick: value.user.nick,
            specialGroups: [],
            username: value.user.username,
            allRoles: toArray(value.user.allRoles).map(function (item) {
                return {
                    appId: item.appId,
                    id: item.id,
                    name: item.role,
                    permissions: item.permissions.map(function (sitem) {
                        return {
                            element: sitem.element.name,
                            componentId: sitem.componentId,
                            componentName: sitem.componentName,
                            permission: sitem.permission,
                        };
                    }),
                    appName: item.appName,
                };
            }),
            avatarId: value.user.avatarId,
            configs: value.user.configs,
            filters: value.user.filters,
            fullName: value.user.fullName,
        },
    };
};
exports.convertLoggedInfo = convertLoggedInfo;
//# sourceMappingURL=functions.js.map
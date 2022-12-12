"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setLocalStorage = exports.getLocalStorage = exports.setCookie = exports.getCookie = exports.encrypt = exports.decrypt = void 0;
var aes_1 = require("./aes");
function decrypt(text) {
    var aux = "";
    try {
        if (text && text != "") {
            aux = (0, aes_1.aesdecrypt)(text);
        }
    }
    catch (error) {
        aux = "";
        console.error("decrypt", error);
    }
    return aux;
}
exports.decrypt = decrypt;
function encrypt(text) {
    var aux = "";
    try {
        if (text && text != "") {
            aux = (0, aes_1.aesencrypt)(text);
        }
    }
    catch (error) {
        aux = "";
        console.error("decrypt", error);
    }
    return aux;
}
exports.encrypt = encrypt;
function getCookie(name, excludeEncode) {
    var name = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) {
            var aux = c.substring(name.length, c.length);
            if (aux && aux != "undefined") {
                return !excludeEncode ? decrypt(aux) : aux;
            }
            return "";
        }
    }
    return "";
}
exports.getCookie = getCookie;
function setCookie(name, value, timeInSeg, excludeEncode) {
    var df = new Date();
    if (typeof value !== "string" || !value) {
        df = new Date(1970, 1, 1, 0, 0, 0, 0);
    }
    else {
        if (!timeInSeg)
            timeInSeg = 24 * 60 * 60;
        df.setSeconds(df.getSeconds() + timeInSeg);
    }
    if (!excludeEncode && value) {
        value = encrypt(value);
    }
    document.cookie =
        name + "=" + value + "; expires=" + df.toUTCString() + "; path=/";
}
exports.setCookie = setCookie;
function getLocalStorage(name, decriptar) {
    try {
        var value = localStorage.getItem(name);
        if (value) {
            if (decriptar) {
                return decrypt(value);
            }
            return value;
        }
    }
    catch (error) {
        return "";
    }
    return "";
}
exports.getLocalStorage = getLocalStorage;
function setLocalStorage(name, value, encode) {
    try {
        if (!value) {
            localStorage.removeItem(name);
            return true;
        }
        if (encode)
            value = encrypt(value);
        localStorage.setItem(name, value);
        return true;
    }
    catch (error) {
        return false;
    }
}
exports.setLocalStorage = setLocalStorage;
//# sourceMappingURL=cookies.js.map
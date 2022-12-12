"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useOnlineUser = void 0;
var React = require("react");
var persistent_1 = require("./persistent");
function useOnlineUser(logoff) {
    var _a = React.useState(true), isOnline = _a[0], setIsOnline = _a[1];
    React.useEffect(function () {
        var infoOnline = logoff ? undefined : (0, persistent_1.getCookieOnline)();
        if (!infoOnline) {
            (0, persistent_1.setUserLoggedInfo)();
            return setIsOnline(false);
        }
        var timeoutOffline = infoOnline.timestampEnd - Date.now();
        var myInterval = setInterval(function () {
            (0, persistent_1.setUserLoggedInfo)();
            setIsOnline(false);
        }, timeoutOffline);
        return function () {
            clearInterval(myInterval);
        };
    }, [logoff]);
    return isOnline;
}
exports.useOnlineUser = useOnlineUser;
//# sourceMappingURL=hooks.js.map
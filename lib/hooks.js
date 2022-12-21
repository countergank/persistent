"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useOnlineUser = void 0;
var React = require("react");
var persistent_1 = require("./persistent");
function useOnlineUser(logoff) {
    var _a = React.useState(logoff ? false : (0, persistent_1.getCookieOnline)() !== undefined), isOnline = _a[0], setIsOnline = _a[1];
    React.useEffect(function () {
        var myInterval;
        var infoOnline = logoff ? undefined : (0, persistent_1.getCookieOnline)();
        if (!infoOnline) {
            (0, persistent_1.setUserLoggedInfo)();
            setIsOnline(false);
        }
        else {
            var timeoutOffline = infoOnline.timestampEnd - Date.now();
            myInterval = setInterval(function () {
                (0, persistent_1.setUserLoggedInfo)();
                setIsOnline(false);
            }, timeoutOffline);
        }
        return function () {
            if (myInterval) {
                clearInterval(myInterval);
            }
        };
    }, [logoff]);
    return isOnline;
}
exports.useOnlineUser = useOnlineUser;
//# sourceMappingURL=hooks.js.map
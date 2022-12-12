import React = require("react");
import { getCookieOnline, setUserLoggedInfo } from "./persistent";

export function useOnlineUser(logoff: boolean) {
  const [isOnline, setIsOnline] = React.useState<boolean>(true);

  React.useEffect(() => {
    const infoOnline = logoff ? undefined : getCookieOnline();
    if (!infoOnline) {
      setUserLoggedInfo();
      return setIsOnline(false);
    }

    const timeoutOffline = infoOnline.timestampEnd - Date.now();
    const myInterval = setInterval(() => {
      setUserLoggedInfo();
      setIsOnline(false);
    }, timeoutOffline);

    return () => {
      clearInterval(myInterval);
    };
  }, [logoff]);

  return isOnline;
}
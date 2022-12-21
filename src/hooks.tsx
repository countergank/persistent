import React = require("react");
import { getCookieOnline, setUserLoggedInfo } from "./persistent";

export function useOnlineUser(logoff: boolean) {
  const [isOnline, setIsOnline] = React.useState<boolean>(
    logoff ? false : getCookieOnline() !== undefined
  );

  React.useEffect(() => {
    let myInterval: NodeJS.Timer | undefined;

    const infoOnline = logoff ? undefined : getCookieOnline();
    if (!infoOnline) {
      setUserLoggedInfo();
      setIsOnline(false);
    } else {
      const timeoutOffline = infoOnline.timestampEnd - Date.now();
      myInterval = setInterval(() => {
        setUserLoggedInfo();
        setIsOnline(false);
      }, timeoutOffline);
    }

    return () => {
      if (myInterval) {
        clearInterval(myInterval);
      }
    };
  }, [logoff]);

  return isOnline;
}

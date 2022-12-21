import { aesencrypt, aesdecrypt } from "./aes";

export function decrypt(text: string | null): string {
  let aux = "";
  try {
    if (text && text != "") {
      aux = aesdecrypt(text);
    }
  } catch (error) {
    aux = "";
    console.error("decrypt", error);
  }
  return aux;
}

export function encrypt(text: string | null): string {
  let aux = "";
  try {
    if (text && text != "") {
      aux = aesencrypt(text);
    }
  } catch (error) {
    aux = "";
    console.error("decrypt", error);
  }
  return aux;
}

export function getCookie(name: string, excludeDecode?: boolean) {
  var name = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trim();
    if (c.indexOf(name) == 0) {
      let aux = c.substring(name.length, c.length);
      if (aux && aux != "undefined") {
        return !excludeDecode ? decrypt(aux) : aux;
      }
      return "";
    }
  }
  return "";
}

export function setCookie(
  name: string,
  value?: string,
  timeInSeg?: number,
  excludeEncode?: boolean
) {
  let df = new Date();
  if (typeof value !== "string" || !value) {
    df = new Date(1970, 1, 1, 0, 0, 0, 0);
  } else {
    if (!timeInSeg) timeInSeg = 24 * 60 * 60;
    df.setSeconds(df.getSeconds() + timeInSeg);
  }

  if (!excludeEncode && value) {
    value = encrypt(value);
  }

  document.cookie =
    name + "=" + value + "; expires=" + df.toUTCString() + "; path=/";
}

export function getLocalStorage(name: string, decriptar?: boolean): string {
  try {
    const value = localStorage.getItem(name);
    if (value) {
      if (decriptar) {
        return decrypt(value);
      }
      return value;
    }
  } catch (error) {
    return "";
  }
  return "";
}

export function setLocalStorage(
  name: string,
  value?: string,
  encode?: boolean
): boolean {
  try {
    if (!value) {
      localStorage.removeItem(name);
      return true;
    }
    if (encode) value = encrypt(value);
    localStorage.setItem(name, value);
    return true;
  } catch (error) {
    return false;
  }
}

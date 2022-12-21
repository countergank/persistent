import { getUserTesting } from "./testing";
import {
  base64_decode,
  base64_encode,
  parseNumber,
  urlReplace,
} from "./functions";
import {
  getLocalStorage,
  setLocalStorage,
  setCookie,
  getCookie,
} from "./cookies";
import {
  BasicConfig,
  defaultHttpHeaders,
  getConfig,
  simpleRequest,
} from "./config";
import { Application, OnlineInfo, User } from "./interfaces";

export interface UserLoggedCookie {
  timeout?: number;
  token: string;
  user: User;
}

export interface UserOfflineCookie {
  userName: string;
  firstName: string;
  lastName: string;
  nick: string;
  email: string;
  fullName: string;
  avatarId?: string;
}

export interface ErrorPage {
  message: string;
  description?: string;
  color?: string;
  url?: string;
}

export const getError = (): ErrorPage | undefined => {
  try {
    const value = getLocalStorage("countergank.error");
    const info: ErrorPage = JSON.parse(value);
    if (info?.message) {
      return info;
    }
  } catch (error) {
    return undefined;
  }
  return undefined;
};

export const setError = (value: ErrorPage | undefined) => {
  setLocalStorage(
    "countergank.error",
    value ? JSON.stringify(value) : undefined
  );
};

export const getRedirectUrl = (): string => {
  return getLocalStorage("countergank.redirection");
};

export const setRedirectUrl = (value: string) => {
  setLocalStorage("countergank.redirection", value === "" ? undefined : value);
};

const getCookieName = (sufix: string): string => {
  try {
    return window.location.host + "_" + sufix;
  } catch (error) {
    return "countergank." + sufix;
  }
};

export const getOnlineCookieName = (): string => {
  return getCookieName("online");
};

export const getConfigName = (): string => {
  return getCookieName("config");
};

export const getAppStyleName = (): string => {
  return getCookieName("appstyle");
};

export const getUserCookieName = (): string => {
  return getCookieName("user");
};

export const getThemeName = (): string => {
  return getCookieName("theme");
};

export const removeCookieUser = () => {
  setCookie(getUserCookieName());
};

export const getUserLoggedInfo = (): UserLoggedCookie | undefined => {
  try {
    const online = getCookie(getOnlineCookieName());
    if (online) {
      const value = getLocalStorage(getOnlineCookieName());
      const info: UserLoggedCookie = JSON.parse(value);
      if (info?.user && info?.token) {
        return info;
      }
    }
  } catch (error) {
    return undefined;
  }
  return undefined;
};

export const getCookieOnline = (): OnlineInfo | undefined => {
  try {
    const info: OnlineInfo = JSON.parse(getCookie(getOnlineCookieName()));
    if (info?.timeout && info?.timestampBegin && info?.timestampEnd)
      return info;
    return undefined;
  } catch (error) {
    return undefined;
  }
};

export const setUserLoggedInfo = (value?: UserLoggedCookie) => {
  if (!value?.user) {
    setCookie(getOnlineCookieName());
    setLocalStorage(getOnlineCookieName());
  } else {
    let timeout = parseNumber(value?.timeout);
    if (timeout <= 0) {
      timeout = 8 * 60 * 60; // 8 horas es el default
    }

    const user = {
      userName: value.user.username,
      firstName: value.user.firstName,
      lastName: value.user.lastName,
      nick: value.user.nick,
      email: value.user.email,
      avatarId: value.user.avatarId,
      fullName:
        value.user.fullName || value.user.firstName + " " + value.user.lastName,
    };
    setCookie(getUserCookieName(), JSON.stringify(user), timeout * 5);
    setLocalStorage(getOnlineCookieName(), JSON.stringify(value));

    const info: OnlineInfo = {
      timeout,
      timestampBegin: Date.now(),
      timestampEnd: Date.now() + timeout * 1000,
    };

    setCookie(getOnlineCookieName(), JSON.stringify(info), timeout);
  }
};

export const getUserOfflineInfo = (): UserOfflineCookie | undefined => {
  try {
    return JSON.parse(getCookie(getUserCookieName()));
  } catch (error) {
    return undefined;
  }
};

export const getUserFromStorage = (): string => {
  try {
    return getUserOfflineInfo()?.userName || "";
  } catch (error) {
    return "";
  }
};

export const httpRequest = async (
  url: string,
  method?: "GET" | "POST" | "PUT" | "DELETE",
  body?: any,
  timeout?: number,
  header?: HeadersInit,
  ftoken?: string
): Promise<any> => {
  const config = await getConfig();
  url = urlReplace(url, config);
  return simpleRequest(url, method, body, header, timeout, ftoken);
};

export const appUrl = async (
  item: Application,
  config: BasicConfig | undefined
): Promise<string> => {
  let url = item.url || "";
  if (item.config?.includeToken) {
    if (!config) return "";

    const infoUser = getUserLoggedInfo();
    if (infoUser) {
      const key = compressSessionKey(infoUser.user, item);
      url += `/${key}`;
      await httpRequest(
        `${config.APIUser}/user/session`,
        "POST",
        {
          key,
          token: base64_encode(
            JSON.stringify({
              user: infoUser.user,
              token: infoUser.token,
              url: item.config?.params || "",
            })
          ),
        },
        undefined,
        undefined,
        infoUser.token
      ).catch((error) => {
        console.error("appUrl", error);
      });
    }

    return "";
  }

  return url;
};

export const compressSessionKey = (user: User, item: Application): string => {
  try {
    return base64_encode(
      JSON.stringify({ id: user?.id || "", url: item?.config?.params || "" })
    );
  } catch (error) {
    return "";
  }
};

export const descompressSessionKey = (
  key: string
): { id: string; url?: string } | undefined => {
  try {
    const value = JSON.parse(base64_decode(key));
    if (value?.id) return value;
  } catch (error) {
    return undefined;
  }

  return undefined;
};

export const getUserInfo = (): User | undefined => {
  const info = getUserLoggedInfo();
  if (info?.user) return info.user;
  return undefined;
};

export const httpFiles = (url: string, body: FormData) => {
  return new Promise(async (resolve, reject) => {
    const config = await getConfig();
    url = urlReplace(url, config);

    const headers = {
      Authorization: "",
    };

    const token = getUserLoggedInfo()?.token || "";
    if (token) {
      headers.Authorization = "Bearer " + token;
    }

    fetch(url, {
      method: "POST",
      mode: "cors",
      headers,
      body,
    })
      .then(async (response) => {
        try {
          return {
            status: response.status,
            data: await response.json(),
          };
        } catch (error) {
          return {
            status: response.status,
            data: {},
          };
        }
      })
      .then((info) => {
        if (info.status < 400) return resolve(info.data);
        reject(info);
      })
      .catch((error) => {
        reject({
          status: 500,
          data: {
            message: "Se encontraron problemas de conectividad",
            description: error,
          },
        });
      });
  });
};

export class httpConnection {
  private url = "";

  private async setUrl() {
    if (this.url && this.url !== "") return;

    const entry = this.entry;
    try {
      const config = await getConfig();
      if (config && config[entry]?.toString)
        this.url = config[entry]?.toString() || "";
    } catch (error) {
      this.url = "";
    }
  }

  constructor(
    private entry: string,
    private returnDataResponseProp: boolean = false
  ) {}

  private async getUrl(endpoint: string): Promise<string> {
    await this.setUrl();
    if (!this.url || this.url.length < 5 || !endpoint || endpoint.length === 0)
      return "";
    const v1 = this.url.endsWith("/");
    const v2 = endpoint.startsWith("/");
    if (!v1 && !v2) endpoint = "/" + endpoint;
    else if (v1 && v2) endpoint = endpoint.substr(-1);
    return this.url + endpoint;
  }

  private request(
    endpoint: string,
    method?: "GET" | "POST" | "PUT" | "DELETE",
    body?: any,
    timeout: number = 30000,
    header: HeadersInit | undefined = undefined
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      httpRequest(await this.getUrl(endpoint), method, body, timeout, header)
        .then((resp) => {
          if (this.returnDataResponseProp === true) {
            resolve({ data: resp });
          } else {
            resolve(resp);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async post(
    endpoint: string,
    body: any,
    timeout: number = 0,
    header: HeadersInit | undefined = undefined
  ) {
    return this.request(endpoint, "POST", body, timeout, header);
  }

  async get(
    endpoint: string,
    timeout: number = 0,
    header: HeadersInit | undefined = undefined
  ) {
    return this.request(endpoint, "GET", null, timeout, header);
  }

  async delete(
    endpoint: string,
    body?: any,
    timeout: number = 0,
    header: HeadersInit | undefined = undefined
  ) {
    return this.request(endpoint, "DELETE", body, timeout, header);
  }

  async put(
    endpoint: string,
    body: any,
    timeout: number = 0,
    header: HeadersInit | undefined = undefined
  ) {
    return this.request(endpoint, "PUT", body, timeout, header);
  }

  async files(endpoint: string, body: FormData): Promise<any> {
    const url = await this.getUrl(endpoint);
    return httpFiles(url, body);
  }
}

export const getUserTest = (): User => {
  return getUserTesting();
};

export const httpUser = new httpConnection("APIUser");
export const httpPrivate = new httpConnection("APIPrivate");

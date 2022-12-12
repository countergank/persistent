import React = require("react");
import { getLocalStorage, setLocalStorage } from "./cookies";
import { errorFn, log, toArray } from "./functions";
import {
  getAppStyleName,
  getConfigName,
  getUserLoggedInfo,
  setUserLoggedInfo,
} from "./persistent";

export interface Copyright {
  name: string;
  url: string;
  year?: number;
}

export interface BasicConfig {
  URLUser: string;
  APIUser: string;
  APIPrivate?: string;

  GeneralLogo?: string;
  GeneralCopyright?: Copyright;

  LoginHideRegister?: boolean;
  LoginHideRecovery?: boolean;
  LoginTitle?: string;

  [value: string]: any;
}

export const defaultHttpHeaders = (
  header?: HeadersInit
): Record<string, string> => {
  const headerd: any = !Array.isArray(header) ? header : undefined;
  return {
    "Content-Type": "application/json",
    "Accept-Encoding": "gzip, compress, br",
    ...headerd,
  };
};

export const simpleRequest = (
  url: string,
  method?: "GET" | "POST" | "PUT" | "DELETE",
  body?: any,
  header?: HeadersInit,
  timeout?: number
): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    if (!method) method = "GET";
    if (body) body = JSON.stringify(body);
    if (!timeout || timeout <= 0) timeout = 30000;

    const controller = new AbortController();
    const id = setTimeout(() => {
      controller.abort();
    }, timeout);

    const headers: any = header || {};

    if (
      !url.endsWith(".json") &&
      !headers["Authorization"] &&
      !headers["authorization"]
    ) {
      const token = getUserLoggedInfo()?.token || "";
      if (token) headers["Authorization"] = "Bearer " + token;
    }

    fetch(url, {
      method,
      mode: "cors",
      body,
      headers: defaultHttpHeaders(headers),
      signal: controller.signal,
    })
      .then((response) => {
        try {
          return {
            status: response.status,
            data: response.json(),
          };
        } catch (error) {
          return {
            status: response.status,
            data: {},
          };
        }
      })
      .then((info) => {
        clearTimeout(id);
        if (info.status < 400) return resolve(info.data);

        if (info.status === 401) {
          setUserLoggedInfo(undefined);
        }

        reject({
          ...info,
          data: {
            message: "Error Desconocido",
          },
        });
      })
      .catch((error) => {
        reject({
          status: error?.status || 500,
          data: {
            message: "Se encontraron problemas de conectividad",
            description: error,
          },
        });
      });
  });
};

export const replaceReactApp = (data: any) => {
  if (!data?.REACT_APP_APIUser) return undefined;
  for (const [key] of Object.entries(data)) {
    if (key.startsWith("REACT_APP_")) {
      try {
        data[key.replace("REACT_APP_", "")] = JSON.parse(data[key] as any);
      } catch (error) {
        data[key.replace("REACT_APP_", "")] = data[key];
      }
      delete data[key];
    }
  }
  return data;
};

export const getConfig = async (
  path?: string
): Promise<BasicConfig | undefined> => {
  let config: any = null;
  try {
    config = JSON.parse(getLocalStorage(getConfigName()));
  } catch (error) {
    config = null;
  }
  if (config?.APIUser) return config;

  if (!path) path = window.location.origin + "/";
  let info = replaceReactApp(process.env);
  if (!info) {
    info = {};

    const infoSuite = await simpleRequest(path + "suite.json").catch(errorFn);
    const infoConfig = await simpleRequest(path + "config.json").catch(errorFn);

    const addConfig = (value: any) => {
      if (value) {
        for (const [name] of Object.entries(value)) {
          if (name && value[name]) {
            info[name] = value[name];
          }
        }
      }
    };

    addConfig(infoSuite);
    addConfig(infoConfig);
  }

  if (info?.APIUser) {
    setLocalStorage(getConfigName(), JSON.stringify(info));
    return info;
  }

  return undefined;
};

export function useConfig(pathConfig?: string) {
  const [config, setConfig] = React.useState<BasicConfig | undefined>();

  React.useEffect(() => {
    async function loadConfig() {
      const localConfig = await getConfig(pathConfig);
      if (localConfig) {
        setConfig(localConfig);
      }
    }
    loadConfig();
  }, []);

  return config;
}

export const initializationApp = async (
  appName: string,
  customConfig?: Partial<BasicConfig>,
  path?: string
) => {
  setLocalStorage(getConfigName());
  setLocalStorage(getAppStyleName());

  const info = await getConfig(path);
  const config: { name: string; value: string }[] =
    !info?.APIUser || !appName
      ? []
      : await simpleRequest(info.APIUser + "/config-web/" + appName).catch(
          errorFn
        );

  if (Array.isArray(config) && config.some((i) => i.name === "APIUser")) {
    const data: any = {};

    config.forEach((item) => {
      try {
        data[item.name] = JSON.parse(item.value);
      } catch (error) {
        data[item.name] = item.value;
      }
    });

    if (customConfig) {
      for (const [key] of Object.entries(customConfig)) {
        data[key] = customConfig[key];
      }
    }

    try {
      const themes = toArray<any>(data.themes);
      const customthemes = toArray<any>(data.customthemes);
      for (let index = 0; index < customthemes.length; index++) {
        const element = customthemes[index];
        if (themes.length > index) {
          for (const [key, val] of Object.entries<any>(element)) {
            data.themes[index][key] = val;
          }
        }
      }
    } catch (error) {
      log("error", "initializationApp", error);
    }

    setLocalStorage(getConfigName(), JSON.stringify(data));
    if (data?.AppStyle) {
      setLocalStorage(getAppStyleName(), JSON.stringify(data?.AppStyle));
    }
  }
};

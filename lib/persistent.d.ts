import { BasicConfig } from "./config";
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
export declare const getError: () => ErrorPage | undefined;
export declare const setError: (value: ErrorPage | undefined) => void;
export declare const getRedirectUrl: () => string;
export declare const setRedirectUrl: (value: string) => void;
export declare const getOnlineCookieName: () => string;
export declare const getConfigName: () => string;
export declare const getAppStyleName: () => string;
export declare const getUserCookieName: () => string;
export declare const getThemeName: () => string;
export declare const removeCookieUser: () => void;
export declare const getUserLoggedInfo: () => UserLoggedCookie | undefined;
export declare const getCookieOnline: () => OnlineInfo | undefined;
export declare const setUserLoggedInfo: (value?: UserLoggedCookie) => void;
export declare const getUserOfflineInfo: () => UserOfflineCookie | undefined;
export declare const getUserFromStorage: () => string;
export declare const httpRequest: (url: string, method?: "GET" | "POST" | "PUT" | "DELETE", body?: any, timeout?: number, header?: HeadersInit) => Promise<any>;
export declare const appUrl: (item: Application, config: BasicConfig | undefined) => Promise<string>;
export declare const compressSessionKey: (user: User, item: Application) => string;
export declare const descompressSessionKey: (key: string) => {
    id: string;
    url?: string;
} | undefined;
export declare const getUserInfo: () => User | undefined;
export declare const httpFiles: (url: string, body: FormData) => Promise<unknown>;
export declare class httpConnection {
    private entry;
    private returnDataResponseProp;
    private url;
    private setUrl;
    constructor(entry: string, returnDataResponseProp?: boolean);
    private getUrl;
    private request;
    post(endpoint: string, body: any, timeout?: number, header?: HeadersInit | undefined): Promise<any>;
    get(endpoint: string, timeout?: number, header?: HeadersInit | undefined): Promise<any>;
    delete(endpoint: string, body?: any, timeout?: number, header?: HeadersInit | undefined): Promise<any>;
    put(endpoint: string, body: any, timeout?: number, header?: HeadersInit | undefined): Promise<any>;
    files(endpoint: string, body: FormData): Promise<any>;
}
export declare const getUserTest: () => User;
export declare const httpUser: httpConnection;
export declare const httpPrivate: httpConnection;

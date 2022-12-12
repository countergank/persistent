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
export declare const defaultHttpHeaders: (header?: HeadersInit) => Record<string, string>;
export declare const simpleRequest: (url: string, method?: "GET" | "POST" | "PUT" | "DELETE", body?: any, header?: HeadersInit, timeout?: number) => Promise<any>;
export declare const replaceReactApp: (data: any) => any;
export declare const getConfig: (path?: string) => Promise<BasicConfig | undefined>;
export declare function useConfig(pathConfig?: string): BasicConfig | undefined;
export declare const initializationApp: (appName: string, customConfig?: Partial<BasicConfig>, path?: string) => Promise<void>;

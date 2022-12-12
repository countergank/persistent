import { BasicConfig } from "./config";
export declare const isPlatform: (type: "desktop" | "android" | "ios") => boolean;
export declare const urlReplace: (url: string, config?: BasicConfig | undefined) => string;
export declare const openUrl: (url: string, target?: string) => void;
export declare const replaceAll: (value: string | null | undefined, oldValue: string, newValue: string) => string;
export declare const formatDate: (isoDate?: string, includeTime?: boolean, format?: "-" | "/", days?: number, includeSeconds?: boolean) => string;
export declare const formatDateToIso: (Date: string) => string;
export declare const formatTime: (isoDate?: string) => string;
export declare const diffDates: (valueFrom: string, valueTo?: string | null | undefined, type?: "min" | "sec" | "hour" | "day") => number;
export declare const diffDatesRaw: (valueFrom: string, valueTo?: string | null | undefined, type?: "min" | "sec" | "hour" | "day") => number;
export declare const dateToString: (date: string, includeTime?: boolean) => string;
export declare const isAssigned: (value: any) => boolean;
export declare const downloadFile: (url: string, target?: string, setToaster?: ((data: any) => void) | undefined) => void;
export declare const nameFromUrl: (url: string, includeExt?: boolean) => string;
export declare const parseNumber: (value: any, def?: number) => number;
export declare const typeOf: (value: any) => "" | "array" | "string" | "number" | "object" | "boolean";
export declare const equals: (newValue: any, oldValue: any, excludedNames?: string[], pk?: string, test?: string, enableLog?: boolean) => boolean;
export declare const convertInfoToGoogleChart: (result: any, tipo?: "default" | "line" | "calendar") => {
    props: {
        name: string;
        value: string;
    }[];
    data: any[] | null | undefined;
    colors: string[] | null | undefined;
};
export declare const base64_encode: (value: string) => string;
export declare const base64_decode: (value: string) => string;
export declare const formatConstructorTime: (fecha: Date | null | undefined, includeSeconds?: boolean) => string;
export declare const formatContructorDate: (fecha: Date | null | undefined, includeTime?: boolean, format?: "-" | "/", days?: number, includeSeconds?: boolean) => string;
export declare const log: (type: "debug" | "warn" | "error", componentName: string, ...array: any) => void;
export declare const materialScrollbarStyle: (color?: string, background?: string) => {
    "@global": {
        "*::-webkit-scrollbar": {
            width: number;
            height: number;
            backgroundColor: string;
        };
        "*::-webkit-scrollbar-track": {
            boxShadow: string;
            borderRadius: number;
            backgroundColor: string;
        };
        "*::-webkit-scrollbar-thumb": {
            borderRadius: number;
            boxShadow: string;
            backgroundColor: string;
        };
    };
};
export declare const FORMAT_DATE = "DD/MM/YYYY";
export declare const FORMAT_TIME = "HH:MM";
export declare const FORMAT_DATETIME: string;
export declare const errorFn: (_error: any) => void;
export declare const testIsRunning: () => boolean;
export declare const toString: (value: any, def?: string) => string;
export declare function toArray<T>(array?: T[] | void): T[];

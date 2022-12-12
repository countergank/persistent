export declare function decrypt(text: string | null): string;
export declare function encrypt(text: string | null): string;
export declare function getCookie(name: string, excludeEncode?: boolean): string;
export declare function setCookie(name: string, value?: string, timeInSeg?: number, excludeEncode?: boolean): void;
export declare function getLocalStorage(name: string, decriptar?: boolean): string;
export declare function setLocalStorage(name: string, value?: string, encode?: boolean): boolean;

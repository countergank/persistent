import { User } from "./interfaces";
export type DefaultAppComponent = "todos los componentes";
export type DefaultAppElement = "todos los elementos";
export declare class PermissionManager<Component, Element> {
    private appName;
    private user?;
    constructor(appName: string, user?: User | undefined);
    setUser(fuser?: User): void;
    appId(): string;
    isOk(componentName: Component, elementName: Element, strictCheck?: boolean): boolean;
}

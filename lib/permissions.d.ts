export type DefaultAppComponent = "todos los componentes";
export type DefaultAppElement = "todos los elementos";
export declare class PermissionManager<Component, Element> {
    private appName;
    constructor(appName: string);
    appId(): string;
    isOk(componentName: Component, elementName: Element, strictCheck?: boolean): boolean;
}

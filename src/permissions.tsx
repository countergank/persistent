import { toArray } from "./functions";
import { User } from "./interfaces";
import { getUserInfo } from "./persistent";

export type DefaultAppComponent = "todos los componentes";
export type DefaultAppElement = "todos los elementos";

export class PermissionManager<Component, Element> {
  constructor(private appName: string, private user?: User) {}

  setUser(fuser?: User) {
    this.user = fuser;
  }

  appId() {
    return this.appName;
  }

  isOk(
    componentName: Component,
    elementName: Element,
    strictCheck: boolean = false
  ): boolean {
    try {
      const fcomponentName: any = componentName;
      const felementName: any = elementName;

      if (!this.appName || !fcomponentName || !felementName) return false;

      if (!this.user) {
        console.warn(
          "[Deprecado] Usar funcion setUser para almacenar el usuario logueado dentro de la clase"
        );
        this.user = getUserInfo();
      }

      const roles = toArray(this.user?.allRoles);
      if (roles.length === 0) return false;

      const appRoles = roles.filter(
        (role) =>
          role?.appName &&
          role.appName.toLowerCase() === this.appName.toLowerCase()
      );

      if (appRoles.length > 0) {
        let permission1: boolean | null = null;
        let permission2 = false;
        for (let index = 0; index < appRoles.length; index++) {
          for (let j = 0; j < appRoles[index].permissions.length; j++) {
            const element = appRoles[index].permissions[j];
            const all =
              !element.componentName ||
              element.componentName.toLowerCase() === "todos los componentes";
            if (element.element.toLowerCase() === felementName) {
              if (
                element.componentName &&
                element.componentName.toLowerCase() === fcomponentName
              ) {
                return element.permission;
              } else if (strictCheck !== true && all) {
                permission1 = element.permission;
              }
            } else if (
              strictCheck !== true &&
              all &&
              element.element.toLowerCase() === "todos los elementos"
            ) {
              permission2 = element.permission;
            }
          }
        }
        if (permission1 !== null) return permission1;
        return permission2;
      }
      return false;
    } catch (error) {
      return false;
    }
  }
}

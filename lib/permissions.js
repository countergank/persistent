"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionManager = void 0;
var functions_1 = require("./functions");
var persistent_1 = require("./persistent");
var PermissionManager = (function () {
    function PermissionManager(appName, user) {
        this.appName = appName;
        this.user = user;
    }
    PermissionManager.prototype.setUser = function (fuser) {
        this.user = fuser;
    };
    PermissionManager.prototype.appId = function () {
        return this.appName;
    };
    PermissionManager.prototype.isOk = function (componentName, elementName, strictCheck) {
        var _this = this;
        var _a;
        if (strictCheck === void 0) { strictCheck = false; }
        try {
            var fcomponentName = componentName;
            var felementName = elementName;
            if (!this.appName || !fcomponentName || !felementName)
                return false;
            if (!this.user) {
                console.warn("[Deprecado] Usar funcion setUser para almacenar el usuario logueado dentro de la clase");
                this.user = (0, persistent_1.getUserInfo)();
            }
            var roles = (0, functions_1.toArray)((_a = this.user) === null || _a === void 0 ? void 0 : _a.allRoles);
            if (roles.length === 0)
                return false;
            var appRoles = roles.filter(function (role) {
                return (role === null || role === void 0 ? void 0 : role.appName) &&
                    role.appName.toLowerCase() === _this.appName.toLowerCase();
            });
            if (appRoles.length > 0) {
                var permission1 = null;
                var permission2 = false;
                for (var index = 0; index < appRoles.length; index++) {
                    for (var j = 0; j < appRoles[index].permissions.length; j++) {
                        var element = appRoles[index].permissions[j];
                        var all = !element.componentName ||
                            element.componentName.toLowerCase() === "todos los componentes";
                        if (element.element.toLowerCase() === felementName) {
                            if (element.componentName &&
                                element.componentName.toLowerCase() === fcomponentName) {
                                return element.permission;
                            }
                            else if (strictCheck !== true && all) {
                                permission1 = element.permission;
                            }
                        }
                        else if (strictCheck !== true &&
                            all &&
                            element.element.toLowerCase() === "todos los elementos") {
                            permission2 = element.permission;
                        }
                    }
                }
                if (permission1 !== null)
                    return permission1;
                return permission2;
            }
            return false;
        }
        catch (error) {
            return false;
        }
    };
    return PermissionManager;
}());
exports.PermissionManager = PermissionManager;
//# sourceMappingURL=permissions.js.map
/* eslint-disable eqeqeq */
import { Base64 } from "./aes";
import { BasicConfig } from "./config";

export const isPlatform = (type: "desktop" | "android" | "ios"): boolean => {
  // eslint-disable-next-line no-restricted-globals
  switch (type) {
    case "desktop":
      return screen.width > 1000;
  }
  return !isPlatform("desktop");
};

export const urlReplace = (
  url: string,
  config: BasicConfig | undefined = undefined
): string => {
  if (!url) return "";
  if (config) {
    for (const [name, value] of Object.entries(config)) {
      try {
        if (isAssigned(name)) {
          const localValue = toString(value);
          url = replaceAll(url, `{${name.toUpperCase()}}`, localValue);
        }
      } catch (error) {
        console.error("urlReplace", url, error);
      }
    }
  }
  return url;
};

export const openUrl = (url: string, target: string = "_blank") => {
  const newWindow = window.open(urlReplace(url), target, "noopener,noreferrer");
  if (newWindow) newWindow.opener = null;
};

export const replaceAll = (
  value: string | null | undefined,
  oldValue: string,
  newValue: string
): string => {
  if (!value) return "";

  try {
    let pos = value.indexOf(oldValue);
    while (pos >= 0) {
      value = value?.replace(oldValue, newValue);
      pos = value.indexOf(oldValue);
    }
    return value;
  } catch (error) {
    return value;
  }
};

const dateToStr = (date: string): string => {
  return date && date.replace
    ? date.replace("T", " ").replace("Z", "").substr(0, 19)
    : date;
};

export const formatDate = (
  isoDate?: string,
  includeTime: boolean = true,
  format: "-" | "/" = "/",
  days: number = 0,
  includeSeconds: boolean = false
) => {
  if (isoDate && isoDate.length === 10) isoDate = isoDate + " 00:00:00";
  const fecha = isoDate ? new Date(dateToStr(isoDate)) : new Date();
  return formatContructorDate(fecha, includeTime, format, days, includeSeconds);
};

export const formatDateToIso = (Date: string) => {
  // Convertimos cualquier caracter, aunque no deberia haber, en minuscula.
  Date = Date.toLowerCase();
  // En caso de que la fecha incluya valores mas alla de los minutos, los eliminamos.
  if (Date.length > 16) Date = Date.slice(0, 16);
  // Retornamos la fecha en el formato iso 8601 - YYYY-MM-DDTHH:mm
  return `${Date.slice(6, 10)}-${Date.slice(3, 5)}-${Date.slice(
    0,
    2
  )}T${Date.slice(11, 16)}`;
};

export const formatTime = (isoDate?: string) => {
  let res = "";
  try {
    const fecha = isoDate ? new Date(dateToStr(isoDate)) : new Date();
    if (fecha.getDate()) {
      const h = fecha.getHours();
      const M = fecha.getMinutes();
      if (h < 10) res = "0";
      res += h.toString() + ":";
      if (M < 10) res += "0";
      res += M.toString();
    }
  } catch (error) {
    res = "";
  }
  return res;
};

const diffDate = (
  valueFrom: string,
  valueTo: string | null | undefined,
  type: "min" | "sec" | "hour" | "day",
  includeNegatives: boolean
): number => {
  if (!valueFrom) return 0;

  try {
    const ff = new Date(dateToStr(valueFrom)).getTime();
    let ft = new Date().getTime();
    if (valueTo) {
      ft = new Date(dateToStr(valueTo)).getTime();
    }

    let res = (ft - ff) / 1000; // segundos
    if (type === "min") res = res / 60;
    // en minutos
    else if (type === "hour") res = res / 60 / 60;
    // en minutos
    else if (type === "day") {
      res = res / 60 / 60 / 24; // en dias
      if (includeNegatives !== true) {
        if (res > 0 && res < 1) res = 1;
        if (res > -1 && res < 0) res = -1;
      }
    }

    if (includeNegatives === true) return res;
    return Math.abs(res);
  } catch (error) {
    return 0;
  }
};

export const diffDates = (
  valueFrom: string,
  valueTo: string | null | undefined = null,
  type: "min" | "sec" | "hour" | "day" = "day"
): number => {
  const diff = diffDate(valueFrom, valueTo, type, false);
  return Math.trunc(diff);
};

export const diffDatesRaw = (
  valueFrom: string,
  valueTo: string | null | undefined = null,
  type: "min" | "sec" | "hour" | "day" = "day"
): number => {
  return diffDate(valueFrom, valueTo, type, true);
};

export const dateToString = (
  date: string,
  includeTime: boolean = true
): string => {
  if (date) {
    const array = formatDate(date).split(" ");
    if (array.length === 2)
      return (
        array[0] + (includeTime === true ? " a las " + array[1] + " hs" : "")
      );
  }
  return "";
};

export const isAssigned = (value: any): boolean => {
  if (value === null || value === undefined) return false;
  return true;
};

export const downloadFile = (
  url: string,
  target: string = "_self",
  setToaster?: (data: any) => void
) => {
  try {
    const link = document.createElement("a");
    link.href = url;
    link.target = target;
    document.body.appendChild(link);
    link.click();
    (link as any).parentNode.removeChild(link);
  } catch (error) {
    if (setToaster)
      setToaster({
        message: "No se pudo descargar el archivo",
        duration: 3000,
        showToast: true,
        toastHeader: "Error",
        toastColor: "danger",
      });
  }
};

export const nameFromUrl = (
  url: string,
  includeExt: boolean = true
): string => {
  let array = url && url !== "" ? url.split("/") : [];
  if (array.length > 0) {
    const text = array[array.length - 1];
    if (includeExt === true) return text;
    array = text.split(".");
    if (array.length > 0) return array[0];
  }
  return "";
};

export const parseNumber = (value: any, def: number = 0): number => {
  if (
    value &&
    value.toString &&
    (parseInt(value.toString()) == value.toString() ||
      parseFloat(value.toString()) == value.toString())
  ) {
    return parseFloat(value.toString());
  }
  return def;
};

export const typeOf = (
  value: any
): "" | "array" | "string" | "number" | "object" | "boolean" => {
  if (value) {
    if (value instanceof Array) return "array";
    if (value instanceof Object) return "object";
    if (value.toString) {
      const str: string = value.toString();
      if (str.toLowerCase() === "false" || str.toLowerCase() === "true")
        return "boolean";
      if (str === "0" || parseNumber(str) !== 0) return "number";
      return "string";
    }
  }
  return "";
};

export const equals = (
  newValue: any,
  oldValue: any,
  excludedNames: string[] = [],
  pk: string = "id",
  test: string = "",
  enableLog: boolean = false
): boolean => {
  if (!newValue && oldValue) return false;
  if (newValue && !oldValue) return false;
  if (!newValue && !oldValue) return true;

  const typenew = typeOf(newValue);
  const typeold = typeOf(oldValue);

  if (typenew != typeold) {
    enableLog && console.error("equals.type", typenew, typeold);
    return false;
  }

  switch (typenew) {
    case "array":
      if (newValue.length != oldValue.length) {
        enableLog &&
          console.error(
            "equals.array",
            "length",
            test,
            newValue.length,
            oldValue.length
          );
        return false;
      }

      for (let index = 0; index < newValue.length; index++) {
        const v1 = newValue[index];
        if (!v1 || excludedNames.indexOf(v1) >= 0) continue;
        if (pk !== "" && !isAssigned(v1[pk])) continue;

        const v2 =
          pk == ""
            ? oldValue.find((j: any) => j == v1)
            : oldValue.find((j: any) => j && j[pk] == v1[pk]);
        if (!v2) {
          enableLog && console.error("equals.array", "find", test, pk, v1);
          return false;
        }
        const v = pk == "" ? v2 : v2[pk];
        if (excludedNames.indexOf(v) >= 0) continue;

        if (pk != "" && v1["external"] === true) {
          // Detalle de Bonita. Los casos y tareas desde bonita, mandan el campo endTime con la fecha now, si es que el caso o tarea no esta cerrada. Por ende, en cada pedido, varia este campo
          if (excludedNames.indexOf("endTime") < 0)
            excludedNames.push("endTime");
          if (excludedNames.indexOf("dueCaseEstimated") < 0)
            excludedNames.push("dueCaseEstimated");
          if (excludedNames.indexOf("due") < 0) excludedNames.push("due");
        }

        if (
          equals(
            v1,
            v2,
            excludedNames,
            "id",
            test + ". PK:" + (pk == "" ? v1 : v1[pk])
          ) === false
        ) {
          return false;
        }
      }
      break;

    case "string":
    case "number":
    case "boolean":
      if (newValue != oldValue) {
        enableLog &&
          console.error(
            "equals." + typenew,
            test,
            "NEWVALUE",
            JSON.stringify(newValue),
            "oldValue",
            JSON.stringify(oldValue)
          );
        return false;
      }
      break;

    case "object":
      const equalObjects = (o1: any, o2: any): boolean => {
        for (const [name] of Object.entries(o1)) {
          if (excludedNames.indexOf(name) >= 0) continue;

          const v1 = o1[name];
          const v2 = o2[name];

          if (excludedNames.indexOf(v1) >= 0) continue;
          if (excludedNames.indexOf(v2) >= 0) continue;

          if (name == "childrens") {
            const newArray = Array.isArray(v1) ? v1 : [];
            const oldArray = Array.isArray(v2) ? v2 : [];
            if (newArray.length != oldArray.length) {
              return false;
            }
          } else if (name == "properties") {
            const newArray = Array.isArray(v1) ? v1 : [];
            const oldArray = Array.isArray(v2) ? v2 : [];
            if (
              equals(
                oldArray,
                newArray,
                excludedNames,
                "name",
                test + ". properties:" + JSON.stringify(newArray)
              ) === false
            ) {
              return false;
            }
          } else if (
            equals(
              v1,
              v2,
              excludedNames,
              "id",
              test + ". value:" + JSON.stringify(v1)
            ) === false
          ) {
            enableLog && console.error("object.error", test, v1, name);
            return false;
          }
        }
        return true;
      };

      if (
        equalObjects(newValue, oldValue) === false ||
        equalObjects(oldValue, newValue) === false
      ) {
        return false;
      }

      break;
  }

  return true;
};

export const convertInfoToGoogleChart = (
  result: any,
  tipo: "default" | "line" | "calendar" = "default"
): {
  props: { name: string; value: string }[];
  data: any[] | null | undefined;
  colors: string[] | null | undefined;
} => {
  const colors: any[] = [];
  let data: any[] | null | undefined = null;
  const defaultNumber = -10000000;
  if (Array.isArray(result) && result.length > 0) {
    if (Array.isArray(result[0])) {
      data = result;
    } else if (tipo === "calendar") {
      data = [
        [
          { type: "date", id: "Fecha" },
          { type: "number", id: "Cantidad" },
        ],
      ];
      result.map((i) => {
        if (i.color && i.color.substr && i.color.substr(0, 3) != "hsl")
          colors.push(i.color);
        const count =
          parseNumber(i.value, defaultNumber) != defaultNumber
            ? i.value
            : parseNumber(i.count, defaultNumber) != defaultNumber
            ? i.count
            : parseNumber(i.loc, defaultNumber) != defaultNumber
            ? i.loc
            : null;
        const date =
          i.day && i.day != ""
            ? i.day
            : i.label && i.label != ""
            ? i.label
            : i.name && i.name != ""
            ? i.name
            : i.caption && i.caption != ""
            ? i.caption
            : null;
        if (count != null && date != null) {
          const f = new Date(date);
          if (Array.isArray(data) && f) {
            return data.push([f, count]);
          }
        }
        return null;
      });
    } else if (tipo === "line") {
      data = [["Valor", "Cantidad"]];
      const year = new Date().getFullYear().toString();
      result.map((i) => {
        if (i.color) colors.push(i.color);
        const id = i.id;
        const dataLine = Array.isArray(i.data) ? i.data : null;
        if (id != null && dataLine != null) {
          dataLine.map((item: any) => {
            if (item.x && parseNumber(item.y, defaultNumber) != defaultNumber) {
              // X => solo puede ser un numero o una fecha. Desde backend puede venir dd/MM como X, entonces se le agrega el año y se parsea a date
              let x = null;
              let tipo = "number";
              if (parseNumber(item.x, defaultNumber) != defaultNumber) {
                x = item.x;
              } else {
                if (item.x.length === 5) {
                  x = item.x + "/" + year;
                }
                const f = x ? new Date(x) : new Date();
                if (f) {
                  x = f;
                  tipo = "date";
                } else {
                  x = null;
                }
              }
              if (Array.isArray(data) && x !== null) {
                if (data.length === 0) {
                  if (tipo === "number") data.push(["Valor", "Cantidad"]);
                  else
                    data.push([{ type: "date", label: "Fecha" }, "Cantidad"]);
                }
                data.push([x, parseNumber(item.y).toString()]);
              }
            }
            return null;
          });
        }
        return null;
      });
    } else {
      data = [["Valor", "Cantidad"]];
      result.map((i) => {
        if (i.color && i.color.substr && i.color.substr(0, 3) != "hsl")
          colors.push(i.color);
        const count =
          parseNumber(i.value, defaultNumber) != defaultNumber
            ? i.value
            : parseNumber(i.count, defaultNumber) != defaultNumber
            ? i.count
            : parseNumber(i.loc, defaultNumber) != defaultNumber
            ? i.loc
            : null;
        const name =
          i.label && i.label != ""
            ? i.label
            : i.name && i.name != ""
            ? i.name
            : i.caption && i.caption != ""
            ? i.caption
            : null;
        if (Array.isArray(data) && count != null && name != null)
          return data.push([name, count]);
        return null;
      });
    }
  }

  const props =
    result && result.length > 0 && Array.isArray(result[0].props)
      ? result[0].props
      : [];
  return {
    props: props,
    data: data,
    colors: !Array.isArray(colors) || colors.length == 0 ? null : colors,
  };
};

export const base64_encode = (value: string): string => {
  try {
    return Base64.encode(value);
  } catch (error) {
    return "";
  }
};

export const base64_decode = (value: string): string => {
  try {
    return Base64.decode(value);
  } catch (error) {
    return "";
  }
};

export const formatConstructorTime = (
  fecha: Date | null | undefined,
  includeSeconds: boolean = false
): string => {
  let res = "00:00";
  let aux: any = fecha;
  if (includeSeconds === true) res += ":00";
  if (fecha && aux?.getDate) {
    res = "";
    const h = fecha.getHours();
    const M = fecha.getMinutes();
    const s = fecha.getSeconds();
    if (h < 10) res += "0";
    res += h.toString() + ":";
    if (M < 10) res += "0";
    res += M.toString();
    if (includeSeconds === true) {
      res += ":";
      if (s < 10) res += "0";
      res += s.toString();
    }
  }
  return res;
};

export const formatContructorDate = (
  fecha: Date | null | undefined,
  includeTime: boolean = true,
  format: "-" | "/" = "/",
  days: number = 0,
  includeSeconds: boolean = false
): string => {
  let res = "";
  try {
    if (fecha && fecha.getDate) {
      if (days && days !== 0) fecha.setDate(fecha.getDate() + days);
      const d = fecha.getDate();
      const m = fecha.getMonth() + 1;
      const y = fecha.getFullYear();
      const h = fecha.getHours();
      const M = fecha.getMinutes();
      if (format === "/") {
        if (d < 10) res = "0";
        res += d.toString() + "/";
        if (m < 10) res += "0";
        res += m.toString() + "/";
        res += y.toString();
      } else {
        res = y.toString() + "-";
        if (m < 10) res += "0";
        res += m.toString() + "-";
        if (d < 10) res += "0";
        res += d.toString();
      }

      if (includeTime === true || includeSeconds === true) {
        res += " ";
        if (h < 10) res += "0";
        res += h.toString() + ":";
        if (M < 10) res += "0";
        res += M.toString();

        if (includeSeconds === true) {
          res += ":";
          if (fecha.getSeconds() < 10) res += "0";
          res += fecha.getSeconds().toString();
        }
      }
    }
  } catch (error) {
    res = "";
  }

  return res;
};

export const log = (
  type: "debug" | "warn" | "error",
  componentName: string,
  ...array: any
) => {
  const text = formatDate("", true, "/", 0, true);
  switch (type) {
    case "debug":
      console.debug(text, componentName, ...array);
      break;
    case "warn":
      console.warn(text, componentName, ...array);
      break;
    case "error":
      console.error(text, componentName, ...array);
      break;
  }
};

export const materialScrollbarStyle = (
  color: string = "#eeeeee",
  background: string = "transparent"
) => {
  return {
    "@global": {
      "*::-webkit-scrollbar": {
        width: 10,
        height: 10,
        backgroundColor: background,
      },
      "*::-webkit-scrollbar-track": {
        boxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
        borderRadius: 2,
        backgroundColor: background,
      },
      "*::-webkit-scrollbar-thumb": {
        borderRadius: 2,
        boxShadow: "inset 0 0 6px rgba(0,0,0,.3)",
        backgroundColor: color,
      },
    },
  };
};

export const FORMAT_DATE = "DD/MM/YYYY";
export const FORMAT_TIME = "HH:MM";
export const FORMAT_DATETIME = FORMAT_DATE + " " + FORMAT_TIME;

export const errorFn = (_error: any) => {
  return;
};

export const testIsRunning = (): boolean => {
  return process.env.NODE_ENV === "development";
};

export const toString = (value: any, def: string = ""): string => {
  try {
    return value.toString();
  } catch (error) {
    return def;
  }
};

export function toArray<T>(array?: T[] | void): T[] {
  if (!Array.isArray(array)) {
    return [];
  }
  return array;
}

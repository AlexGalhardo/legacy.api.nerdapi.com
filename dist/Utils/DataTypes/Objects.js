"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Objects {
    hasKeys(object, ...keys) {
        if (typeof object !== "object")
            return false;
        if (keys.length === 0)
            return false;
        const objectKeys = Object.keys(object);
        for (const key of keys) {
            if (!objectKeys.includes(key))
                return false;
        }
        return true;
    }
    hasValues(object, values) {
        if (typeof object !== "object")
            return false;
        if (values.length === 0)
            return false;
        const objectValues = Object.values(object);
        for (const value of values) {
            if (!objectValues.includes(value))
                return false;
        }
        return true;
    }
    deepClone(object) {
        if (typeof object !== "object")
            return object;
        if (object === null)
            return null;
        const clonedObject = {};
        for (const key in object) {
            clonedObject[key] = this.deepClone(object[key]);
        }
        return clonedObject;
    }
    get methods() {
        return {
            objectHasKeys: this.hasKeys,
            objectHasValues: this.hasValues,
            objectDeepClone: this.deepClone,
        };
    }
}
exports.default = Objects;
//# sourceMappingURL=Objects.js.map
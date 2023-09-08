"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Primitives {
    constructor() {
        this.isAllStrings = this.isAllStrings.bind(this);
        this.isAllNumbers = this.isAllNumbers.bind(this);
        this.isAllBooleans = this.isAllBooleans.bind(this);
        this.isAllObjects = this.isAllObjects.bind(this);
        this.isAllArrays = this.isAllArrays.bind(this);
        this.isAllFunctions = this.isAllFunctions.bind(this);
        this.isAllUndefined = this.isAllUndefined.bind(this);
        this.isAllNull = this.isAllNull.bind(this);
        this.isAllSymbols = this.isAllSymbols.bind(this);
        this.isAllBigInts = this.isAllBigInts.bind(this);
        this.isPrimitive = this.isPrimitive.bind(this);
        this.isAllPrimitives = this.isAllPrimitives.bind(this);
        this.isAllDates = this.isAllDates.bind(this);
        this.isAllRegExps = this.isAllRegExps.bind(this);
        this.isNaN = this.isNaN.bind(this);
        this.isAllNaNs = this.isAllNaNs.bind(this);
        this.isAllInfinities = this.isAllInfinities.bind(this);
        this.isInfinity = this.isInfinity.bind(this);
        this.hasValue = this.hasValue.bind(this);
        this.isEmpty = this.isEmpty.bind(this);
    }
    isString(value) {
        return typeof value === "string";
    }
    isAllStrings(...values) {
        for (const value of values) {
            if (!this.isString(value))
                return false;
        }
        return true;
    }
    isNumber(value) {
        return typeof value === "number";
    }
    isAllNumbers(...values) {
        for (const value of values) {
            if (!this.isNumber(value))
                return false;
        }
        return true;
    }
    isBoolean(value) {
        return typeof value === "boolean";
    }
    isAllBooleans(...values) {
        for (const value of values) {
            if (!this.isBoolean(value))
                return false;
        }
        return true;
    }
    isObject(value) {
        return typeof value === "object";
    }
    isAllObjects(...values) {
        for (const value of values) {
            if (!this.isObject(value))
                return false;
        }
        return true;
    }
    isArray(value) {
        return Array.isArray(value);
    }
    isAllArrays(...values) {
        for (const value of values) {
            if (!this.isArray(value))
                return false;
        }
        return true;
    }
    isFunction(value) {
        return typeof value === "function";
    }
    isAllFunctions(...values) {
        for (const value of values) {
            if (!this.isFunction(value))
                return false;
        }
        return true;
    }
    isUndefined(value) {
        return typeof value === "undefined";
    }
    isAllUndefined(...values) {
        for (const value of values) {
            if (!this.isUndefined(value))
                return false;
        }
        return true;
    }
    isNull(value) {
        return value === null;
    }
    isAllNull(...values) {
        for (const value of values) {
            if (!this.isNull(value))
                return false;
        }
        return true;
    }
    isDate(value) {
        return value instanceof Date;
    }
    isAllDates(...values) {
        for (const value of values) {
            if (!this.isDate(value))
                return false;
        }
        return true;
    }
    isSymbol(value) {
        return typeof value === "symbol";
    }
    isAllSymbols(...values) {
        for (const value of values) {
            if (!this.isSymbol(value))
                return false;
        }
        return true;
    }
    isBigInt(value) {
        return typeof value === "bigint";
    }
    isAllBigInts(...values) {
        for (const value of values) {
            if (!this.isBigInt(value))
                return false;
        }
        return true;
    }
    isRegExp(value) {
        return value instanceof RegExp;
    }
    isAllRegExps(...values) {
        for (const value of values) {
            if (!this.isRegExp(value))
                return false;
        }
        return true;
    }
    isPromise(value) {
        return value instanceof Promise;
    }
    isAllPromises(...values) {
        for (const value of values) {
            if (!this.isPromise(value))
                return false;
        }
        return true;
    }
    isPrimitive(value) {
        return (this.isString(value) ||
            this.isNumber(value) ||
            this.isBoolean(value) ||
            this.isSymbol(value) ||
            this.isBigInt(value) ||
            this.isUndefined(value) ||
            this.isNull(value));
    }
    isAllPrimitives(...values) {
        for (const value of values) {
            if (!this.isPrimitive(value))
                return false;
        }
        return true;
    }
    isInfinity(value) {
        return value === Infinity || value === -Infinity;
    }
    isAllInfinities(...values) {
        for (const value of values) {
            if (!this.isInfinity(value))
                return false;
        }
        return true;
    }
    isNaN(value) {
        return Number.isNaN(value);
    }
    isAllNaNs(...values) {
        for (const value of values) {
            if (!this.isNaN(value))
                return false;
        }
        return true;
    }
    hasValue(value) {
        return (!this.isUndefined(value) &&
            !this.isNull(value) &&
            !this.isNaN(value) &&
            !this.isInfinity(value) &&
            !this.isEmpty(value));
    }
    isEmpty(value) {
        return value === "";
    }
    get methods() {
        return {
            isString: this.isString,
            isAllStrings: this.isAllStrings,
            isNumber: this.isNumber,
            isAllNumbers: this.isAllNumbers,
            isBoolean: this.isBoolean,
            isAllBooleans: this.isAllBooleans,
            isObject: this.isObject,
            isAllObjects: this.isAllObjects,
            isArray: this.isArray,
            isAllArrays: this.isAllArrays,
            isFunction: this.isFunction,
            isAllFunctions: this.isAllFunctions,
            isUndefined: this.isUndefined,
            isAllUndefined: this.isAllUndefined,
            isNull: this.isNull,
            isAllNull: this.isAllNull,
            isDate: this.isDate,
            isAllDates: this.isAllDates,
            isSymbol: this.isSymbol,
            isAllSymbols: this.isAllSymbols,
            isBigInt: this.isBigInt,
            isAllBigInts: this.isAllBigInts,
            isRegExp: this.isRegExp,
            isAllRegExps: this.isAllRegExps,
            isPromise: this.isPromise,
            isAllPromises: this.isAllPromises,
            isPrimitive: this.isPrimitive,
            isAllPrimitives: this.isAllPrimitives,
            isInfinity: this.isInfinity,
            isAllInfinities: this.isAllInfinities,
            isNaN: this.isNaN,
            isAllNaNs: this.isAllNaNs,
            hasValue: this.hasValue,
            isEmpty: this.isEmpty,
        };
    }
}
exports.default = Primitives;
//# sourceMappingURL=Primitives.js.map
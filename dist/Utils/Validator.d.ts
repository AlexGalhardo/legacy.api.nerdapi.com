import Email from "./DataTypes/Email";
import Primitives from "./DataTypes/Primitives";
import Objects from "./DataTypes/Objects";
import Strings from "./DataTypes/Strings";
import Name from "./DataTypes/Name";
import Password from "./DataTypes/Password";
import DateTime from "./DataTypes/DateTime";
import Phone from "./DataTypes/Phone";
export default class Validator {
    private static readonly NAME;
    private static readonly EMAIL;
    private static readonly PHONE;
    private static readonly PASSWORD;
    private static readonly PRIMITIVES;
    private static readonly OBJECTS;
    private static readonly STRINGS;
    private static readonly DATE_TIME;
    static get username(): Name;
    static get dateTime(): DateTime;
    static get strings(): Strings;
    static get objects(): Objects;
    static get primitives(): Primitives;
    static get email(): Email;
    static get phone(): Phone;
    static get password(): Password;
    static get methods(): {
        isStringLenghtBetween: (value: string, min: number, max: number) => boolean;
        isStringLenghtBetweenOrEqual: (value: string, min: number, max: number) => boolean;
        isStringLenghtGreaterThan: (value: string, min: number) => boolean;
        isStringLenghtGreaterThanOrEqual: (value: string, min: number) => boolean;
        isStringLenghtLessThan: (value: string, max: number) => boolean;
        isStringLenghtLessThanOrEqual: (value: string, max: number) => boolean;
        isStringLenghtEqual: (value: string, length: number) => boolean;
        isStringLenghtNotEqual: (value: string, length: number) => boolean;
        generateAlphaNumeric: (length?: number) => string;
        isString: (value: unknown) => boolean;
        isAllStrings: (...values: unknown[]) => boolean;
        isNumber: (value: unknown) => boolean;
        isAllNumbers: (...values: unknown[]) => boolean;
        isBoolean: (value: unknown) => boolean;
        isAllBooleans: (...values: unknown[]) => boolean;
        isObject: (value: unknown) => boolean;
        isAllObjects: (...values: unknown[]) => boolean;
        isArray: (value: unknown) => boolean;
        isAllArrays: (...values: unknown[]) => boolean;
        isFunction: (value: unknown) => boolean;
        isAllFunctions: (...values: unknown[]) => boolean;
        isUndefined: (value: unknown) => boolean;
        isAllUndefined: (...values: unknown[]) => boolean;
        isNull: (value: unknown) => boolean;
        isAllNull: (...values: unknown[]) => boolean;
        isDate: (value: unknown) => boolean;
        isAllDates: (...values: unknown[]) => boolean;
        isSymbol: (value: unknown) => boolean;
        isAllSymbols: (...values: unknown[]) => boolean;
        isBigInt: (value: unknown) => boolean;
        isAllBigInts: (...values: unknown[]) => boolean;
        isRegExp: (value: unknown) => boolean;
        isAllRegExps: (...values: unknown[]) => boolean;
        isPromise: (value: unknown) => boolean;
        isAllPromises: (...values: unknown[]) => boolean;
        isPrimitive: (value: unknown) => boolean;
        isAllPrimitives: (...values: unknown[]) => boolean;
        isInfinity: (value: unknown) => boolean;
        isAllInfinities: (...values: unknown[]) => boolean;
        isNaN: (value: unknown) => boolean;
        isAllNaNs: (...values: unknown[]) => boolean;
        hasValue: (value: unknown) => boolean;
        isEmpty: (value: unknown) => boolean;
        objectHasKeys: (object: unknown, ...keys: string[]) => boolean;
        objectHasValues: (object: unknown, values: unknown[]) => boolean;
        objectDeepClone: (object: unknown) => unknown;
        isEqual: (firstPassword: string, secondPassword: string) => boolean;
        isSecure: (plainTextPasswordToCheck: string) => boolean;
        generatePassword: () => string;
        isValidPhoneNumber: (phone: string) => boolean;
        getStateByPhone: (phone: string) => string;
        getStateByPhoneDDD: (ddd: string) => string;
        extractPhoneNumbers: (phone: string) => string;
        extractPhoneDDD: (phone: string) => string;
        extractPhoneNumber: (phone: string) => string;
        generatePhoneNumber: () => string;
        isValidEmail: (email: string) => boolean;
        generateEmail: () => string;
        isValidFullName: (fullName: string) => boolean;
        isValid: (fullName: string) => boolean;
        capitalizeNames: (fullName: string) => string;
    };
}

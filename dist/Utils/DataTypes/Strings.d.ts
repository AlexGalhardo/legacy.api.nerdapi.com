declare class Strings {
    isLengthBetween(value: string, min: number, max: number): boolean;
    isLengthBetweenOrEqual(value: string, min: number, max: number): boolean;
    isLengthGreaterThan(value: string, min: number): boolean;
    isLengthGreaterThanOrEqual(value: string, min: number): boolean;
    isLengthLessThan(value: string, max: number): boolean;
    isLengthLessThanOrEqual(value: string, max: number): boolean;
    isLengthEqual(value: string, length: number): boolean;
    isLengthNotEqual(value: string, length: number): boolean;
    generateAlphaNumeric(length?: number): string;
    get methods(): {
        isStringLenghtBetween: (value: string, min: number, max: number) => boolean;
        isStringLenghtBetweenOrEqual: (value: string, min: number, max: number) => boolean;
        isStringLenghtGreaterThan: (value: string, min: number) => boolean;
        isStringLenghtGreaterThanOrEqual: (value: string, min: number) => boolean;
        isStringLenghtLessThan: (value: string, max: number) => boolean;
        isStringLenghtLessThanOrEqual: (value: string, max: number) => boolean;
        isStringLenghtEqual: (value: string, length: number) => boolean;
        isStringLenghtNotEqual: (value: string, length: number) => boolean;
        generateAlphaNumeric: (length?: number) => string;
    };
}
export default Strings;

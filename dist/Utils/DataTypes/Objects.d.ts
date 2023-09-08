declare class Objects {
    hasKeys(object: unknown, ...keys: string[]): boolean;
    hasValues(object: unknown, values: unknown[]): boolean;
    deepClone(object: unknown): unknown;
    get methods(): {
        objectHasKeys: (object: unknown, ...keys: string[]) => boolean;
        objectHasValues: (object: unknown, values: unknown[]) => boolean;
        objectDeepClone: (object: unknown) => unknown;
    };
}
export default Objects;

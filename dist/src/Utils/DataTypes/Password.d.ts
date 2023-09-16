export default class Password {
    constructor();
    isEqual(firstPassword: string, secondPassword: string): boolean;
    isSecure(plainTextPasswordToCheck: string): boolean;
    generate(): string;
    get methods(): {
        isEqual: (firstPassword: string, secondPassword: string) => boolean;
        isSecure: (plainTextPasswordToCheck: string) => boolean;
        generatePassword: () => string;
    };
}

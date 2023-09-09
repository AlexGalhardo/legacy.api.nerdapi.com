declare class Name {
    constructor();
    isValidSingleName(name: string): boolean;
    isValid(fullName: string): boolean;
    capitalize(fullName: string): string;
    get methods(): {
        isValidFullName: (fullName: string) => boolean;
        isValid: (fullName: string) => boolean;
        capitalizeNames: (fullName: string) => string;
    };
}
export default Name;

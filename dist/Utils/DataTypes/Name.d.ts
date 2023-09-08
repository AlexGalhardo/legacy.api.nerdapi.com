declare class Name {
    constructor();
    isValid(name: string): boolean;
    isValidFullName(fullName: string): boolean;
    capitalize(fullName: string): string;
    get methods(): {
        isValidFullName: (fullName: string) => boolean;
        isValidName: (name: string) => boolean;
        capitalizeNames: (fullName: string) => string;
    };
}
export default Name;

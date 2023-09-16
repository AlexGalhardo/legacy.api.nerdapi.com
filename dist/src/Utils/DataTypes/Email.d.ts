declare class Email {
    isValid(email: string): boolean;
    generate(): string;
    get methods(): {
        isValidEmail: (email: string) => boolean;
        generateEmail: () => string;
    };
}
export default Email;

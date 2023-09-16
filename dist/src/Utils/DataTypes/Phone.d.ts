declare class Phone {
    constructor();
    isValid(phone: string): boolean;
    getStateByPhone(phone: string): string;
    getStateByDDD(ddd: string): string;
    extractNumbers(phone: string): string;
    extractDDD(phone: string): string;
    extractNumber(phone: string): string;
    generate(): string;
    get methods(): {
        isValidPhoneNumber: (phone: string) => boolean;
        getStateByPhone: (phone: string) => string;
        getStateByPhoneDDD: (ddd: string) => string;
        extractPhoneNumbers: (phone: string) => string;
        extractPhoneDDD: (phone: string) => string;
        extractPhoneNumber: (phone: string) => string;
        generatePhoneNumber: () => string;
    };
}
export default Phone;

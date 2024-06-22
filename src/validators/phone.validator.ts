import { BRAZIL_STATE_SYMBOL_BY_DDD, BRAZIL_VALID_PHONE_DDD } from "../utils/constants.util";

export default class PhoneValidator {
    static validate(phone: string): boolean {
        phone = phone.replace(/\D/g, "");

        if (phone.length !== 13) return false;

        if (parseInt(phone.substring(4, 5)) !== 9) return false;

        if (new Set(phone).size === 1) return false;

        if (BRAZIL_VALID_PHONE_DDD.indexOf(parseInt(phone.substring(2, 4))) == -1) return false;

        return true;
    }

    static getStateByPhone(phone: string): string {
        return this.getStateByDDD(this.extractDDD(phone));
    }

    static getStateByDDD(ddd: string): string {
        return BRAZIL_STATE_SYMBOL_BY_DDD[ddd];
    }

    static extractNumbers(phone: string): string {
        return phone.replace(/\D/g, "");
    }

    static extractDDD(phone: string): string {
        return this.extractNumbers(phone).substring(0, 2);
    }

    static extractNumber(phone: string): string {
        return this.extractNumbers(phone).substring(2);
    }

    static generate(): string {
        const prefix = "55";
        const areaCode = BRAZIL_VALID_PHONE_DDD[Math.floor(Math.random() * BRAZIL_VALID_PHONE_DDD.length)];
        const middleNumbers = "99"; // Fixed middle numbers
        const randomNumbers = Math.floor(Math.random() * 10000000)
            .toString()
            .padStart(7, "0");

        const phoneNumber = `${prefix}${areaCode}${middleNumbers}${randomNumbers}`;

        return phoneNumber;
    }
}

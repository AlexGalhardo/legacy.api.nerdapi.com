"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = require("../Constants");
class Phone {
    constructor() {
        this.isValid = this.isValid.bind(this);
        this.getStateByPhone = this.getStateByPhone.bind(this);
        this.getStateByDDD = this.getStateByDDD.bind(this);
        this.extractDDD = this.extractDDD.bind(this);
        this.extractNumbers = this.extractNumbers.bind(this);
    }
    isValid(phone) {
        phone = phone.replace(/\D/g, "");
        if (phone.length !== 13)
            return false;
        if (parseInt(phone.substring(4, 5)) !== 9)
            return false;
        if (new Set(phone).size === 1)
            return false;
        if (Constants_1.BRAZIL_VALID_PHONE_DDD.indexOf(parseInt(phone.substring(2, 4))) == -1)
            return false;
        return true;
    }
    getStateByPhone(phone) {
        return this.getStateByDDD(this.extractDDD(phone));
    }
    getStateByDDD(ddd) {
        return Constants_1.BRAZIL_STATE_SYMBOL_BY_DDD[ddd];
    }
    extractNumbers(phone) {
        return phone.replace(/\D/g, "");
    }
    extractDDD(phone) {
        return this.extractNumbers(phone).substring(0, 2);
    }
    extractNumber(phone) {
        return this.extractNumbers(phone).substring(2);
    }
    generate() {
        const prefix = "55";
        const areaCode = Constants_1.BRAZIL_VALID_PHONE_DDD[Math.floor(Math.random() * Constants_1.BRAZIL_VALID_PHONE_DDD.length)];
        const middleNumbers = "99";
        const randomNumbers = Math.floor(Math.random() * 10000000)
            .toString()
            .padStart(7, "0");
        const phoneNumber = `${prefix}${areaCode}${middleNumbers}${randomNumbers}`;
        return phoneNumber;
    }
    get methods() {
        return {
            isValidPhoneNumber: this.isValid,
            getStateByPhone: this.getStateByPhone,
            getStateByPhoneDDD: this.getStateByDDD,
            extractPhoneNumbers: this.extractNumbers,
            extractPhoneDDD: this.extractDDD,
            extractPhoneNumber: this.extractNumber,
            generatePhoneNumber: this.generate,
        };
    }
}
exports.default = Phone;
//# sourceMappingURL=Phone.js.map
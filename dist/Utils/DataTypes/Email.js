"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Email {
    isValid(email) {
        const regex = /\S+@\S+\.\S+/;
        return regex.test(email);
    }
    generate() {
        return `teste.${Math.random().toString().split(".")[1]}@teste.com.br`;
    }
    get methods() {
        return {
            isValidEmail: this.isValid,
            generateEmail: this.generate,
        };
    }
}
exports.default = Email;
//# sourceMappingURL=Email.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Password {
    constructor() {
        this.isEqual = this.isEqual.bind(this);
        this.isSecure = this.isSecure.bind(this);
        this.generate = this.generate.bind(this);
    }
    isEqual(firstPassword, secondPassword) {
        return firstPassword === secondPassword;
    }
    isSecure(plainTextPasswordToCheck) {
        if (plainTextPasswordToCheck.length < 12) {
            return false;
        }
        const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;
        const uppercaseRegex = /[A-Z]/;
        const numberRegex = /[0-9]/;
        return (specialCharRegex.test(plainTextPasswordToCheck) &&
            uppercaseRegex.test(plainTextPasswordToCheck) &&
            numberRegex.test(plainTextPasswordToCheck));
    }
    generate() {
        const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
        const specialChars = "!@#$%^&*()_+[]{}|;:,.<>?";
        const numbers = "0123456789";
        const randomUppercase = uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];
        const randomSpecialChar = specialChars[Math.floor(Math.random() * specialChars.length)];
        const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
        const remainingLength = 9;
        const allChars = uppercaseChars + lowercaseChars + specialChars + numbers;
        let password = randomUppercase + randomSpecialChar + randomNumber;
        for (let i = 0; i < remainingLength; i++) {
            const randomIndex = Math.floor(Math.random() * allChars.length);
            password += allChars.charAt(randomIndex);
        }
        password = password.split("");
        for (let i = password.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [password[i], password[j]] = [password[j], password[i]];
        }
        return password.join("");
    }
    get methods() {
        return {
            isEqual: this.isEqual,
            isSecure: this.isSecure,
            generatePassword: this.generate,
        };
    }
}
exports.default = Password;
//# sourceMappingURL=Password.js.map
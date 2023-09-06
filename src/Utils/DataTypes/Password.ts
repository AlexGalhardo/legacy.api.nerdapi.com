export default class Password {
    constructor() {
        this.isEqual = this.isEqual.bind(this);
        this.isSecure = this.isSecure.bind(this);
        this.generate = this.generate.bind(this);
    }

    public isEqual(firstPassword: string, secondPassword: string): boolean {
        return firstPassword === secondPassword;
    }

    public isSecure(plainTextPasswordToCheck: string): boolean {
        const lengthRegex = /^.{8,}$/;
        const lowercaseRegex = /[a-z]/;
        const uppercaseRegex = /[A-Z]/;
        const digitRegex = /\d/;
        const specialCharRegex = /[!@#$%^&*]/;

        return (
            lengthRegex.test(plainTextPasswordToCheck) &&
            lowercaseRegex.test(plainTextPasswordToCheck) &&
            uppercaseRegex.test(plainTextPasswordToCheck) &&
            digitRegex.test(plainTextPasswordToCheck) &&
            specialCharRegex.test(plainTextPasswordToCheck)
        );
    }

    public generate(): string {
        const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
        const specialChars = "!@#$%^&*()_+[]{}|;:,.<>?";
        const numbers = "0123456789";

        const randomUppercase = uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];
        const randomSpecialChar = specialChars[Math.floor(Math.random() * specialChars.length)];
        const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];

        const remainingLength = 9;
        const allChars = uppercaseChars + lowercaseChars + specialChars + numbers;
        let password: string | string[] = randomUppercase + randomSpecialChar + randomNumber;

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

    public get methods() {
        return {
            isEqual: this.isEqual,
            isSecure: this.isSecure,
            generatePassword: this.generate,
        };
    }
}

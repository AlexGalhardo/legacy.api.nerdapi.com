"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
class Strings {
    isLengthBetween(value, min, max) {
        return value.length > min && value.length < max;
    }
    isLengthBetweenOrEqual(value, min, max) {
        return value.length >= min && value.length <= max;
    }
    isLengthGreaterThan(value, min) {
        return value.length > min;
    }
    isLengthGreaterThanOrEqual(value, min) {
        return value.length >= min;
    }
    isLengthLessThan(value, max) {
        return value.length < max;
    }
    isLengthLessThanOrEqual(value, max) {
        return value.length <= max;
    }
    isLengthEqual(value, length) {
        return value.length === length;
    }
    isLengthNotEqual(value, length) {
        return value.length !== length;
    }
    generateAlphaNumeric(length = 16) {
        return (0, crypto_1.randomBytes)(Math.ceil(length / 2))
            .toString("hex")
            .slice(0, length);
    }
    get methods() {
        return {
            isStringLenghtBetween: this.isLengthBetween,
            isStringLenghtBetweenOrEqual: this.isLengthBetweenOrEqual,
            isStringLenghtGreaterThan: this.isLengthGreaterThan,
            isStringLenghtGreaterThanOrEqual: this.isLengthGreaterThanOrEqual,
            isStringLenghtLessThan: this.isLengthLessThan,
            isStringLenghtLessThanOrEqual: this.isLengthLessThanOrEqual,
            isStringLenghtEqual: this.isLengthEqual,
            isStringLenghtNotEqual: this.isLengthNotEqual,
            generateAlphaNumeric: this.generateAlphaNumeric,
        };
    }
}
exports.default = Strings;
//# sourceMappingURL=Strings.js.map
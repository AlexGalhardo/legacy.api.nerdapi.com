"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Email_1 = require("./DataTypes/Email");
const Primitives_1 = require("./DataTypes/Primitives");
const Objects_1 = require("./DataTypes/Objects");
const Strings_1 = require("./DataTypes/Strings");
const Name_1 = require("./DataTypes/Name");
const Password_1 = require("./DataTypes/Password");
const DateTime_1 = require("./DataTypes/DateTime");
const Phone_1 = require("./DataTypes/Phone");
class Validator {
    static get names() {
        return this.NAME;
    }
    static get dateTime() {
        return this.DATE_TIME;
    }
    static get strings() {
        return this.STRINGS;
    }
    static get objects() {
        return this.OBJECTS;
    }
    static get primitives() {
        return this.PRIMITIVES;
    }
    static get email() {
        return this.EMAIL;
    }
    static get phone() {
        return this.PHONE;
    }
    static get password() {
        return this.PASSWORD;
    }
    static get methods() {
        return {
            ...this.NAME.methods,
            ...this.EMAIL.methods,
            ...this.PHONE.methods,
            ...this.PASSWORD.methods,
            ...this.OBJECTS.methods,
            ...this.PRIMITIVES.methods,
            ...this.STRINGS.methods,
        };
    }
}
Validator.NAME = new Name_1.default();
Validator.EMAIL = new Email_1.default();
Validator.PHONE = new Phone_1.default();
Validator.PASSWORD = new Password_1.default();
Validator.PRIMITIVES = new Primitives_1.default();
Validator.OBJECTS = new Objects_1.default();
Validator.STRINGS = new Strings_1.default();
Validator.DATE_TIME = new DateTime_1.default();
exports.default = Validator;
//# sourceMappingURL=Validator.js.map
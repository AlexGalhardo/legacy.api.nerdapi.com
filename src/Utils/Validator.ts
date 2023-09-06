import Email from "./DataTypes/Email";
import Primitives from "./DataTypes/Primitives";
import Objects from "./DataTypes/Objects";
import Strings from "./DataTypes/Strings";
import Name from "./DataTypes/Name";
import Password from "./DataTypes/Password";
import DateTime from "./DataTypes/DateTime";
import Phone from "./DataTypes/Phone";

export default class Validator {
    private static readonly NAME = new Name();
    private static readonly EMAIL = new Email();
    private static readonly PHONE = new Phone();
    private static readonly PASSWORD = new Password();
    private static readonly PRIMITIVES = new Primitives();
    private static readonly OBJECTS = new Objects();
    private static readonly STRINGS = new Strings();
    private static readonly DATE_TIME = new DateTime();

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

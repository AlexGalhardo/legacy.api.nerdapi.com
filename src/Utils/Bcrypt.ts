import * as bcrypt from "bcrypt";
// const bcrypt = require('bcrypt');

export class Bcrypt {
    static async hash(password: string): Promise<string> {
		console.log('bcrypt => ', bcrypt)
        return bcrypt
            .genSalt(12)
            .then((salt) => bcrypt.hash(password, salt))
            .then((hash) => hash);
    }

    static async compare(password: string, hashPassword): Promise<boolean> {
        return bcrypt.compare(password, hashPassword).then((resp) => resp);
    }
}

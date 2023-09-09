"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const usersDatabase = require("./Jsons/users.json");
const ErrorsMessages_1 = require("../Utils/ErrorsMessages");
const DateTime_1 = require("../Utils/DataTypes/DateTime");
const Bcrypt_1 = require("../Utils/Bcrypt");
class UsersRepository {
    constructor(users = usersDatabase) {
        this.users = users;
    }
    save(user, index) {
        try {
            if (user && index) {
                this.users.splice(index, 1, user);
            }
            fs.writeFileSync("./src/Repositories/Jsons/users.json", JSON.stringify(this.users, null, 4), "utf-8");
            this.users = JSON.parse(fs.readFileSync("./src/Repositories/Jsons/users.json", "utf-8"));
        }
        catch (error) {
            throw new Error(error);
        }
    }
    findById(userId) {
        return this.users.some((user) => user.id === userId);
    }
    findByEmail(email) {
        return this.users.some((user) => user.email === email);
    }
    getByEmail(email) {
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].email === email) {
                return { user: this.users[i], index: i };
            }
        }
        throw new Error(ErrorsMessages_1.ErrorsMessages.USER_NOT_FOUND);
    }
    getById(userId) {
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].id === userId) {
                return { user: this.users[i], index: i };
            }
        }
        throw new Error(ErrorsMessages_1.ErrorsMessages.USER_NOT_FOUND);
    }
    getByResetPasswordToken(resetPasswordToken) {
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].reset_password_token === resetPasswordToken) {
                return { user: this.users[i], index: i };
            }
        }
        throw new Error(ErrorsMessages_1.ErrorsMessages.USER_NOT_FOUND);
    }
    create(user) {
        this.users.push(user);
        this.save();
    }
    async update(userId, profileUpdateDTO) {
        var _a, _b, _c, _d;
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].id === userId) {
                this.users[i].username = (_a = profileUpdateDTO.username) !== null && _a !== void 0 ? _a : this.users[i].username;
                this.users[i].telegram_number = (_b = profileUpdateDTO.telegramNumber) !== null && _b !== void 0 ? _b : this.users[i].telegram_number;
                this.users[i].password = (_c = (await Bcrypt_1.Bcrypt.hash(profileUpdateDTO.newPassword))) !== null && _c !== void 0 ? _c : this.users[i].password;
                this.save();
                return {
                    username: this.users[i].username,
                    email: this.users[i].email,
                    telegramNumber: this.users[i].telegram_number,
                    password: this.users[i].password,
                    plain_password: (_d = profileUpdateDTO.newPassword) !== null && _d !== void 0 ? _d : null,
                };
            }
        }
    }
    deleteByEmail(email) {
        this.users = this.users.filter((user) => user.email !== email);
        this.save();
    }
    logout(userId) {
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].id === userId) {
                this.users[i].jwt_token = null;
                this.save();
                break;
            }
        }
    }
    saveResetPasswordToken(userId, resetPasswordToken) {
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].id === userId) {
                this.users[i].reset_password_token = resetPasswordToken;
                this.users[i].reset_password_token_expires_at = String(new Date(new Date().getTime() + 60 * 60 * 1000));
                this.save();
                break;
            }
        }
    }
    resetPassword(userId, newPassword) {
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].id === userId) {
                if (!DateTime_1.default.isExpired(new Date(this.users[i].reset_password_token_expires_at))) {
                    this.users[i].password = newPassword;
                    this.users[i].reset_password_token = null;
                    this.users[i].reset_password_token_expires_at = null;
                    this.save();
                    break;
                }
                else {
                    throw new Error(ErrorsMessages_1.ErrorsMessages.RESET_PASSWORD_TOKEN_EXPIRED);
                }
            }
        }
    }
    updateStripeSubscriptionInfo(user, stripeSubscriptionInfo) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].id === user.id) {
                this.users[i].api_token = (_a = stripeSubscriptionInfo.apiToken) !== null && _a !== void 0 ? _a : this.users[i].api_token;
                this.users[i].stripe.customer_id =
                    (_b = stripeSubscriptionInfo.customerId) !== null && _b !== void 0 ? _b : this.users[i].stripe.customer_id;
                this.users[i].stripe.subscription.active =
                    (_c = stripeSubscriptionInfo.paid) !== null && _c !== void 0 ? _c : this.users[i].stripe.subscription.active;
                this.users[i].stripe.subscription.charge_id =
                    (_d = stripeSubscriptionInfo.chargeId) !== null && _d !== void 0 ? _d : this.users[i].stripe.subscription.charge_id;
                this.users[i].stripe.subscription.name = stripeSubscriptionInfo.amount === 499 ? "PRO" : "CASUAL";
                this.users[i].stripe.subscription.receipt_url =
                    (_e = stripeSubscriptionInfo.receiptUrl) !== null && _e !== void 0 ? _e : this.users[i].stripe.subscription.receipt_url;
                this.users[i].stripe.subscription.hosted_invoice_url =
                    (_f = stripeSubscriptionInfo.hostedInvoiceUrl) !== null && _f !== void 0 ? _f : this.users[i].stripe.subscription.hosted_invoice_url;
                this.users[i].stripe.subscription.starts_at =
                    (_g = stripeSubscriptionInfo.startAt) !== null && _g !== void 0 ? _g : this.users[i].stripe.subscription.starts_at;
                this.users[i].stripe.subscription.ends_at =
                    (_h = stripeSubscriptionInfo.endsAt) !== null && _h !== void 0 ? _h : this.users[i].stripe.subscription.ends_at;
                this.users[i].stripe.updated_at = (_j = stripeSubscriptionInfo.createdAt) !== null && _j !== void 0 ? _j : this.users[i].stripe.updated_at;
                this.users[i].stripe.updated_at_pt_br =
                    (_k = stripeSubscriptionInfo.createdAtBrazil) !== null && _k !== void 0 ? _k : this.users[i].stripe.updated_at_pt_br;
                this.save();
                return;
            }
        }
        throw new Error(ErrorsMessages_1.ErrorsMessages.USER_NOT_FOUND);
    }
}
exports.default = UsersRepository;
//# sourceMappingURL=Users.repository.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const usersDatabase = require("./Jsons/users.json");
const ErrorsMessages_1 = require("../Utils/ErrorsMessages");
const DateTime_1 = require("../Utils/DataTypes/DateTime");
const Bcrypt_1 = require("../Utils/Bcrypt");
const common_1 = require("@nestjs/common");
const Database_1 = require("../Utils/Database");
require("dotenv/config");
let UsersRepository = class UsersRepository {
    constructor(users = usersDatabase, database) {
        this.users = users;
        this.database = database;
    }
    async save(user, index) {
        if (process.env.USE_DATABASE_JSON === "true") {
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
        await this.database.users.update({
            where: {
                id: user.id,
            },
            data: {
                id: user.id,
                username: user.username,
                email: user.email,
                telegram_number: user.telegram_number,
                password: user.password,
                jwt_token: user.jwt_token,
                api_token: user.api_token,
                reset_password_token: user.reset_password_token,
                reset_password_token_expires_at: user.reset_password_token_expires_at,
                stripe_customer_id: user.stripe.customer_id,
                stripe_subscription_active: user.stripe.subscription.active,
                stripe_subscription_name: user.stripe.subscription.name,
                stripe_subscription_starts_at: user.stripe.subscription.starts_at,
                stripe_subscription_ends_at: user.stripe.subscription.ends_at,
                stripe_subscription_charge_id: user.stripe.subscription.charge_id,
                stripe_subscription_receipt_url: user.stripe.subscription.receipt_url,
                stripe_subscription_hosted_invoice_url: user.stripe.subscription.hosted_invoice_url,
                stripe_updated_at: user.stripe.updated_at,
                stripe_updated_at_pt_br: user.stripe.updated_at_pt_br,
                created_at: user.created_at,
                updated_at: user.updated_at,
                created_at_pt_br: user.created_at_pt_br,
                updated_at_pt_br: user.updated_at_pt_br,
            },
        });
    }
    transformToUserResponse(user) {
        return {
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                telegram_number: user.telegram_number,
                password: user.password,
                jwt_token: user.jwt_token,
                api_token: user.api_token,
                reset_password_token: user.reset_password_token,
                reset_password_token_expires_at: user.reset_password_token_expires_at,
                stripe: {
                    customer_id: user.stripe_customer_id,
                    subscription: {
                        active: user.stripe_subscription_active,
                        name: user.stripe_subscription_name,
                        starts_at: user.stripe_subscription_starts_at,
                        ends_at: user.stripe_subscription_ends_at,
                        charge_id: user.stripe_subscription_charge_id,
                        receipt_url: user.stripe_subscription_receipt_url,
                        hosted_invoice_url: user.stripe_subscription_hosted_invoice_url,
                    },
                    updated_at: user.stripe_updated_at,
                    updated_at_pt_br: user.stripe_updated_at_pt_br,
                },
                created_at: user.created_at,
                updated_at: user.updated_at,
                created_at_pt_br: user.created_at_pt_br,
                updated_at_pt_br: user.updated_at_pt_br,
            },
            index: null,
        };
    }
    transformToUser(user) {
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            telegram_number: user.telegram_number,
            password: user.password,
            jwt_token: user.jwt_token,
            api_token: user.api_token,
            reset_password_token: user.reset_password_token,
            reset_password_token_expires_at: user.reset_password_token_expires_at,
            stripe: {
                customer_id: user.stripe_customer_id,
                subscription: {
                    active: user.stripe_subscription_active,
                    name: user.stripe_subscription_name,
                    starts_at: user.stripe_subscription_starts_at,
                    ends_at: user.stripe_subscription_ends_at,
                    charge_id: user.stripe_subscription_charge_id,
                    receipt_url: user.stripe_subscription_receipt_url,
                    hosted_invoice_url: user.stripe_subscription_hosted_invoice_url,
                },
                updated_at: user.stripe_updated_at,
                updated_at_pt_br: user.stripe_updated_at_pt_br,
            },
            created_at: user.created_at,
            updated_at: user.updated_at,
            created_at_pt_br: user.created_at_pt_br,
            updated_at_pt_br: user.updated_at_pt_br,
        };
    }
    async findById(userId) {
        if (process.env.USE_DATABASE_JSON === "true")
            return this.users.some((user) => user.id === userId);
        const userExist = await this.database.users.findUnique({
            where: {
                id: userId,
            },
        });
        if (userExist)
            return true;
        return false;
    }
    async findByEmail(email) {
        if (process.env.USE_DATABASE_JSON === "true")
            return this.users.some((user) => user.email === email);
        const userExist = await this.database.users.findUnique({
            where: {
                email,
            },
        });
        if (userExist)
            return true;
        return false;
    }
    async getByEmail(email) {
        if (process.env.USE_DATABASE_JSON === "true") {
            for (let i = 0; i < this.users.length; i++) {
                if (this.users[i].email === email) {
                    return { user: this.users[i], index: i };
                }
            }
            throw new Error(ErrorsMessages_1.ErrorsMessages.USER_NOT_FOUND);
        }
        try {
            const user = await this.database.users.findUnique({
                where: {
                    email,
                },
            });
            if (user)
                return this.transformToUserResponse(user);
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async getById(userId) {
        if (process.env.USE_DATABASE_JSON === "true") {
            for (let i = 0; i < this.users.length; i++) {
                if (this.users[i].id === userId) {
                    return { user: this.users[i], index: i };
                }
            }
            throw new Error(ErrorsMessages_1.ErrorsMessages.USER_NOT_FOUND);
        }
        const user = await this.database.users.findUnique({
            where: {
                id: userId,
            },
        });
        if (user)
            return this.transformToUserResponse(user);
        throw new Error(ErrorsMessages_1.ErrorsMessages.USER_NOT_FOUND);
    }
    async getByResetPasswordToken(resetPasswordToken) {
        if (process.env.USE_DATABASE_JSON === "true") {
            for (let i = 0; i < this.users.length; i++) {
                if (this.users[i].reset_password_token === resetPasswordToken) {
                    return { user: this.users[i], index: i };
                }
            }
            throw new Error(ErrorsMessages_1.ErrorsMessages.USER_NOT_FOUND);
        }
        const user = await this.database.users.findFirst({
            where: {
                reset_password_token: resetPasswordToken,
            },
        });
        if (user)
            return this.transformToUserResponse(user);
        throw new Error(ErrorsMessages_1.ErrorsMessages.USER_NOT_FOUND);
    }
    async create(user) {
        if (process.env.USE_DATABASE_JSON === "true") {
            this.users.push(user);
            this.save();
            return;
        }
        await this.database.users.create({
            data: {
                id: user.id,
                username: user.username,
                email: user.email,
                telegram_number: user.telegram_number,
                password: user.password,
                jwt_token: user.jwt_token,
                api_token: user.api_token,
                reset_password_token: user.reset_password_token,
                reset_password_token_expires_at: user.reset_password_token_expires_at,
                stripe_customer_id: user.stripe.customer_id,
                stripe_subscription_active: user.stripe.subscription.active,
                stripe_subscription_name: user.stripe.subscription.name,
                stripe_subscription_starts_at: user.stripe.subscription.starts_at,
                stripe_subscription_ends_at: user.stripe.subscription.ends_at,
                stripe_subscription_charge_id: user.stripe.subscription.charge_id,
                stripe_subscription_receipt_url: user.stripe.subscription.receipt_url,
                stripe_subscription_hosted_invoice_url: user.stripe.subscription.hosted_invoice_url,
                stripe_updated_at: user.stripe.updated_at,
                stripe_updated_at_pt_br: user.stripe.updated_at_pt_br,
                created_at: user.created_at,
                updated_at: user.updated_at,
                created_at_pt_br: user.created_at_pt_br,
                updated_at_pt_br: user.updated_at_pt_br,
            },
        });
    }
    async update(userId, profileUpdateDTO) {
        var _a, _b, _c, _d;
        if (process.env.USE_DATABASE_JSON === "true") {
            for (let i = 0; i < this.users.length; i++) {
                if (this.users[i].id === userId) {
                    this.users[i].username = (_a = profileUpdateDTO.username) !== null && _a !== void 0 ? _a : this.users[i].username;
                    this.users[i].telegram_number = (_b = profileUpdateDTO.telegramNumber) !== null && _b !== void 0 ? _b : this.users[i].telegram_number;
                    if (profileUpdateDTO.newPassword)
                        this.users[i].password = await Bcrypt_1.Bcrypt.hash(profileUpdateDTO.newPassword);
                    this.save();
                    return {
                        username: this.users[i].username,
                        email: this.users[i].email,
                        telegramNumber: this.users[i].telegram_number,
                        password: this.users[i].password,
                        plain_password: (_c = profileUpdateDTO.newPassword) !== null && _c !== void 0 ? _c : null,
                    };
                }
            }
        }
        const userUpdated = await this.database.users.update({
            where: {
                id: userId,
            },
            data: {
                username: profileUpdateDTO.username,
                telegram_number: profileUpdateDTO.telegramNumber,
                password: await Bcrypt_1.Bcrypt.hash(profileUpdateDTO.newPassword),
            },
        });
        return {
            username: userUpdated.username,
            email: userUpdated.email,
            telegramNumber: userUpdated.telegram_number,
            password: userUpdated.password,
            plain_password: (_d = profileUpdateDTO.newPassword) !== null && _d !== void 0 ? _d : null,
        };
    }
    async deleteByEmail(email) {
        if (process.env.USE_DATABASE_JSON === "true") {
            this.users = this.users.filter((user) => user.email !== email);
            this.save();
            return;
        }
        await this.database.users.delete({
            where: {
                email,
            },
        });
    }
    async logout(userId) {
        if (process.env.USE_DATABASE_JSON === "true") {
            for (let i = 0; i < this.users.length; i++) {
                if (this.users[i].id === userId) {
                    this.users[i].jwt_token = null;
                    this.save();
                    break;
                }
            }
            return;
        }
        await this.database.users.update({
            where: {
                id: userId,
            },
            data: {
                jwt_token: null,
            },
        });
    }
    async phoneAlreadyRegistred(userId, phoneNumber) {
        if (process.env.USE_DATABASE_JSON === "true") {
            return this.users.some((user) => {
                if (user.id !== userId && user.telegram_number === phoneNumber)
                    return true;
            });
        }
        const user = await this.database.users.findFirst({
            where: {
                telegram_number: phoneNumber,
            },
        });
        if (user) {
            if (user.id !== userId)
                return true;
        }
        return false;
    }
    async saveResetPasswordToken(userId, resetPasswordToken) {
        if (process.env.USE_DATABASE_JSON === "true") {
            for (let i = 0; i < this.users.length; i++) {
                if (this.users[i].id === userId) {
                    this.users[i].reset_password_token = resetPasswordToken;
                    this.users[i].reset_password_token_expires_at = String(new Date(new Date().getTime() + 60 * 60 * 1000));
                    this.save();
                    break;
                }
            }
        }
        await this.database.users.update({
            where: {
                id: userId,
            },
            data: {
                reset_password_token: resetPasswordToken,
                reset_password_token_expires_at: String(new Date(new Date().getTime() + 60 * 60 * 1000)),
            },
        });
    }
    async resetPassword(userId, newPassword) {
        if (process.env.USE_DATABASE_JSON === "true") {
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
        const user = await this.database.users.findUnique({
            where: {
                id: userId,
            },
        });
        if (user) {
            if (!DateTime_1.default.isExpired(new Date(user.reset_password_token_expires_at))) {
                await this.database.users.update({
                    where: {
                        id: userId,
                    },
                    data: {
                        password: newPassword,
                        reset_password_token: null,
                        reset_password_token_expires_at: null,
                    },
                });
            }
            else {
                throw new Error(ErrorsMessages_1.ErrorsMessages.RESET_PASSWORD_TOKEN_EXPIRED);
            }
        }
    }
    async findResetPasswordToken(resetPasswordToken) {
        if (process.env.USE_DATABASE_JSON === "true") {
            return this.users.some((user) => {
                if (user.reset_password_token === resetPasswordToken &&
                    !DateTime_1.default.isExpired(new Date(user.reset_password_token_expires_at))) {
                    return true;
                }
            });
        }
        const user = await this.database.users.findFirst({
            where: {
                reset_password_token: resetPasswordToken,
            },
        });
        if (user) {
            if (!DateTime_1.default.isExpired(new Date(user.reset_password_token_expires_at)))
                return true;
        }
        return false;
    }
    async updateStripeSubscriptionInfo(user, stripeSubscriptionInfo) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        if (process.env.USE_DATABASE_JSON === "true") {
            for (let i = 0; i < this.users.length; i++) {
                if (this.users[i].id === user.id) {
                    let subscriptionName = "NOOB";
                    if (stripeSubscriptionInfo.amount) {
                        subscriptionName = stripeSubscriptionInfo.amount === 499 ? "PRO" : "CASUAL";
                    }
                    this.users[i].api_token = (_a = stripeSubscriptionInfo.apiToken) !== null && _a !== void 0 ? _a : this.users[i].api_token;
                    this.users[i].stripe.customer_id =
                        (_b = stripeSubscriptionInfo.customerId) !== null && _b !== void 0 ? _b : this.users[i].stripe.customer_id;
                    this.users[i].stripe.subscription.active =
                        (_c = stripeSubscriptionInfo.paid) !== null && _c !== void 0 ? _c : this.users[i].stripe.subscription.active;
                    this.users[i].stripe.subscription.charge_id =
                        (_d = stripeSubscriptionInfo.chargeId) !== null && _d !== void 0 ? _d : this.users[i].stripe.subscription.charge_id;
                    this.users[i].stripe.subscription.name = subscriptionName;
                    this.users[i].stripe.subscription.receipt_url =
                        (_e = stripeSubscriptionInfo.receiptUrl) !== null && _e !== void 0 ? _e : this.users[i].stripe.subscription.receipt_url;
                    this.users[i].stripe.subscription.hosted_invoice_url =
                        (_f = stripeSubscriptionInfo.hostedInvoiceUrl) !== null && _f !== void 0 ? _f : this.users[i].stripe.subscription.hosted_invoice_url;
                    this.users[i].stripe.subscription.starts_at =
                        (_g = stripeSubscriptionInfo.startAt) !== null && _g !== void 0 ? _g : this.users[i].stripe.subscription.starts_at;
                    this.users[i].stripe.subscription.ends_at =
                        (_h = stripeSubscriptionInfo.endsAt) !== null && _h !== void 0 ? _h : this.users[i].stripe.subscription.ends_at;
                    this.users[i].stripe.updated_at =
                        (_j = stripeSubscriptionInfo.createdAt) !== null && _j !== void 0 ? _j : this.users[i].stripe.updated_at;
                    this.users[i].stripe.updated_at_pt_br =
                        (_k = stripeSubscriptionInfo.createdAtBrazil) !== null && _k !== void 0 ? _k : this.users[i].stripe.updated_at_pt_br;
                    this.save();
                    return this.users[i];
                }
            }
            throw new Error(ErrorsMessages_1.ErrorsMessages.USER_NOT_FOUND);
        }
        let subscriptionName = "NOOB";
        if (stripeSubscriptionInfo.amount) {
            subscriptionName = stripeSubscriptionInfo.amount === 499 ? "PRO" : "CASUAL";
        }
        const userUpdated = await this.database.users.update({
            where: {
                id: user.id,
            },
            data: {
                api_token: stripeSubscriptionInfo.apiToken,
                stripe_customer_id: stripeSubscriptionInfo.customerId,
                stripe_subscription_active: stripeSubscriptionInfo.paid,
                stripe_subscription_charge_id: stripeSubscriptionInfo.chargeId,
                stripe_subscription_name: subscriptionName,
                stripe_subscription_receipt_url: stripeSubscriptionInfo.receiptUrl,
                stripe_subscription_hosted_invoice_url: stripeSubscriptionInfo.hostedInvoiceUrl,
                stripe_subscription_starts_at: stripeSubscriptionInfo.startAt,
                stripe_subscription_ends_at: stripeSubscriptionInfo.endsAt,
                stripe_updated_at: stripeSubscriptionInfo.createdAt,
                stripe_updated_at_pt_br: stripeSubscriptionInfo.createdAtBrazil,
            },
        });
        return this.transformToUser(userUpdated);
    }
};
UsersRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Array, Database_1.Database])
], UsersRepository);
exports.default = UsersRepository;
//# sourceMappingURL=Users.repository.js.map
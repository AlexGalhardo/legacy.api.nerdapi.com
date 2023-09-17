import * as fs from "fs";
import * as usersDatabase from "./Jsons/users.json";
import { ErrorsMessages } from "src/Utils/ErrorsMessages";
import DateTime from "src/Utils/DataTypes/DateTime";
import { ProfileUpdateDTO } from "src/UseCases/ProfileUpdate.useCase";
import { Bcrypt } from "src/Utils/Bcrypt";
import { Injectable } from "@nestjs/common";
import { Database } from "src/Utils/Database";
import "dotenv/config";

export interface User {
    id: string;
    username: string;
    email: string;
    telegram_number: string | null;
    password: string;
    jwt_token: string;
    api_token: string | null;
    reset_password_token: string | null;
    reset_password_token_expires_at: string | null;
    stripe: {
        customer_id: string | null;
        subscription: {
            active: boolean;
            name: string | null;
            starts_at: string | null;
            ends_at: string | null;
            charge_id: string | null;
            receipt_url: string | null;
            hosted_invoice_url: string | null;
        };
        updated_at: string | null;
        updated_at_pt_br: string | null;
    };
    created_at: string;
    updated_at: string | null;
    created_at_pt_br: string;
    updated_at_pt_br: string | null;
}

export interface UserUpdated {
    username: string;
    email: string;
    telegramNumber: string;
    password: string;
    plain_password: string | null;
}

export interface UserResponse {
    user: User;
    index: number;
}

export interface StripeSubscriptionInfo {
    apiToken?: string | null;
    customerId: string | null;
    paid?: boolean | null;
    chargeId?: string | null;
    invoiceId?: string | null;
    amount?: number | null;
    receiptUrl?: string | null;
    hostedInvoiceUrl?: string | null;
    startAt?: string | null;
    endsAt?: string | null;
    createdAt: string | null;
    createdAtBrazil: string | null;
}
export interface UsersRepositoryPort {
    save(user?: any, index?: number): Promise<void>;
    transformToUserResponse(user): UserResponse;
    transformToUser(user): User;
    findById(userId: string): Promise<boolean>;
    findByEmail(email: string): Promise<boolean>;
    getByEmail(email: string): Promise<UserResponse>;
    getById(userId: string): Promise<UserResponse>;
    getByResetPasswordToken(resetPasswordToken: string): Promise<UserResponse>;
    create(user: User): Promise<void>;
    update(userId: string, profileUpdateDTO: ProfileUpdateDTO): Promise<UserUpdated>;
    deleteByEmail(email: string): Promise<void>;
    logout(userId: string): Promise<void>;
    saveResetPasswordToken(userId: string, resetPasswordToken: string): Promise<void>;
    resetPassword(userId: string, newPassword: string): Promise<void>;
    findResetPasswordToken(resetPasswordToken: string): Promise<boolean>;
    updateStripeSubscriptionInfo(user: User, stripeSubscriptionInfo: StripeSubscriptionInfo): Promise<User>;
    phoneAlreadyRegistred(userId: string, phoneNumber: string): Promise<boolean>;
    incrementAPIRequest(userAPIKey: string): Promise<{ success: boolean; api_requests_today: number }>;
}

@Injectable()
export default class UsersRepository implements UsersRepositoryPort {
    constructor(
        private users: User[] = usersDatabase,
        private readonly database: Database,
    ) {}

    public async save(user?: User, index?: number): Promise<void> {
        if (process.env.USE_DATABASE_JSON === "true") {
            try {
                if (user && index) {
                    this.users.splice(index, 1, user);
                }

                fs.writeFileSync("./src/Repositories/Jsons/users.json", JSON.stringify(this.users, null, 4), "utf-8");
                this.users = JSON.parse(fs.readFileSync("./src/Repositories/Jsons/users.json", "utf-8"));
            } catch (error) {
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

    public transformToUserResponse(user): UserResponse {
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

    public transformToUser(user): User {
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

    public async findById(userId: string): Promise<boolean> {
        if (process.env.USE_DATABASE_JSON === "true") return this.users.some((user: any) => user.id === userId);

        const userExist = await this.database.users.findUnique({
            where: {
                id: userId,
            },
        });

        if (userExist) return true;

        return false;
    }

    public async findByEmail(email: string): Promise<boolean> {
        if (process.env.USE_DATABASE_JSON === "true") return this.users.some((user: any) => user.email === email);

        const userExist = await this.database.users.findUnique({
            where: {
                email,
            },
        });

        if (userExist) return true;

        return false;
    }

    public async getByEmail(email: string): Promise<UserResponse> {
        if (process.env.USE_DATABASE_JSON === "true") {
            for (let i = 0; i < this.users.length; i++) {
                if (this.users[i].email === email) {
                    return { user: this.users[i], index: i };
                }
            }

            throw new Error(ErrorsMessages.USER_NOT_FOUND);
        }

        try {
            const user = await this.database.users.findUnique({
                where: {
                    email,
                },
            });

            if (user) return this.transformToUserResponse(user);
        } catch (error) {
            throw new Error(error);
        }
    }

    public async getById(userId: string): Promise<UserResponse> {
        if (process.env.USE_DATABASE_JSON === "true") {
            for (let i = 0; i < this.users.length; i++) {
                if (this.users[i].id === userId) {
                    return { user: this.users[i], index: i };
                }
            }

            throw new Error(ErrorsMessages.USER_NOT_FOUND);
        }

        const user = await this.database.users.findUnique({
            where: {
                id: userId,
            },
        });

        if (user) return this.transformToUserResponse(user);

        throw new Error(ErrorsMessages.USER_NOT_FOUND);
    }

    public async getByResetPasswordToken(resetPasswordToken: string): Promise<UserResponse> {
        if (process.env.USE_DATABASE_JSON === "true") {
            for (let i = 0; i < this.users.length; i++) {
                if (this.users[i].reset_password_token === resetPasswordToken) {
                    return { user: this.users[i], index: i };
                }
            }

            throw new Error(ErrorsMessages.USER_NOT_FOUND);
        }

        const user = await this.database.users.findFirst({
            where: {
                reset_password_token: resetPasswordToken,
            },
        });

        if (user) return this.transformToUserResponse(user);

        throw new Error(ErrorsMessages.USER_NOT_FOUND);
    }

    public async create(user: User): Promise<void> {
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

    public async update(userId: string, profileUpdateDTO: ProfileUpdateDTO): Promise<UserUpdated> {
        if (process.env.USE_DATABASE_JSON === "true") {
            for (let i = 0; i < this.users.length; i++) {
                if (this.users[i].id === userId) {
                    this.users[i].username = profileUpdateDTO.username ?? this.users[i].username;

                    this.users[i].telegram_number = profileUpdateDTO.telegramNumber ?? this.users[i].telegram_number;

                    if (profileUpdateDTO.newPassword)
                        this.users[i].password = await Bcrypt.hash(profileUpdateDTO.newPassword);

                    this.save();

                    return {
                        username: this.users[i].username,
                        email: this.users[i].email,
                        telegramNumber: this.users[i].telegram_number,
                        password: this.users[i].password,
                        plain_password: profileUpdateDTO.newPassword ?? null,
                    };
                }
            }
        }

        const userUpdated = await this.database.users.update({
            where: {
                id: userId,
            },
            data: {
                username: profileUpdateDTO.username ? profileUpdateDTO.username : undefined,
                telegram_number: profileUpdateDTO.telegramNumber ? profileUpdateDTO.telegramNumber : undefined,
                password: profileUpdateDTO.newPassword ? await Bcrypt.hash(profileUpdateDTO.newPassword) : undefined,
            },
        });

        return {
            username: userUpdated.username,
            email: userUpdated.email,
            telegramNumber: userUpdated.telegram_number,
            password: userUpdated.password,
            plain_password: profileUpdateDTO.newPassword ?? null,
        };
    }

    public async deleteByEmail(email: string): Promise<void> {
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

    public async logout(userId: string): Promise<void> {
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

    public async phoneAlreadyRegistred(userId: string, phoneNumber: string): Promise<boolean> {
        if (process.env.USE_DATABASE_JSON === "true") {
            return this.users.some((user) => {
                if (user.id !== userId && user.telegram_number === phoneNumber) return true;
            });
        }

        const user = await this.database.users.findFirst({
            where: {
                telegram_number: phoneNumber,
            },
        });

        if (user) {
            if (user.id !== userId) return true;
        }
        return false;
    }

    public async saveResetPasswordToken(userId: string, resetPasswordToken: string): Promise<void> {
        if (process.env.USE_DATABASE_JSON === "true") {
            for (let i = 0; i < this.users.length; i++) {
                if (this.users[i].id === userId) {
                    this.users[i].reset_password_token = resetPasswordToken;
                    this.users[i].reset_password_token_expires_at = String(
                        new Date(new Date().getTime() + 60 * 60 * 1000),
                    );
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

    public async resetPassword(userId: string, newPassword: string): Promise<void> {
        if (process.env.USE_DATABASE_JSON === "true") {
            for (let i = 0; i < this.users.length; i++) {
                if (this.users[i].id === userId) {
                    if (!DateTime.isExpired(new Date(this.users[i].reset_password_token_expires_at))) {
                        this.users[i].password = newPassword;
                        this.users[i].reset_password_token = null;
                        this.users[i].reset_password_token_expires_at = null;
                        this.save();
                        break;
                    } else {
                        throw new Error(ErrorsMessages.RESET_PASSWORD_TOKEN_EXPIRED);
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
            if (!DateTime.isExpired(new Date(user.reset_password_token_expires_at))) {
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
            } else {
                throw new Error(ErrorsMessages.RESET_PASSWORD_TOKEN_EXPIRED);
            }
        }
    }

    public async findResetPasswordToken(resetPasswordToken: string): Promise<boolean> {
        if (process.env.USE_DATABASE_JSON === "true") {
            return this.users.some((user) => {
                if (
                    user.reset_password_token === resetPasswordToken &&
                    !DateTime.isExpired(new Date(user.reset_password_token_expires_at))
                ) {
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
            if (!DateTime.isExpired(new Date(user.reset_password_token_expires_at))) return true;
        }
        return false;
    }

    public async updateStripeSubscriptionInfo(
        user: User,
        stripeSubscriptionInfo: StripeSubscriptionInfo,
    ): Promise<User> {
        if (process.env.USE_DATABASE_JSON === "true") {
            for (let i = 0; i < this.users.length; i++) {
                if (this.users[i].id === user.id) {
                    let subscriptionName = "NOOB";

                    if (stripeSubscriptionInfo.amount) {
                        subscriptionName = stripeSubscriptionInfo.amount === 499 ? "PRO" : "CASUAL";
                    }

                    this.users[i].api_token = stripeSubscriptionInfo.apiToken ?? this.users[i].api_token;
                    this.users[i].stripe.customer_id =
                        stripeSubscriptionInfo.customerId ?? this.users[i].stripe.customer_id;
                    this.users[i].stripe.subscription.active =
                        stripeSubscriptionInfo.paid ?? this.users[i].stripe.subscription.active;
                    this.users[i].stripe.subscription.charge_id =
                        stripeSubscriptionInfo.chargeId ?? this.users[i].stripe.subscription.charge_id;
                    this.users[i].stripe.subscription.name = subscriptionName;

                    this.users[i].stripe.subscription.receipt_url =
                        stripeSubscriptionInfo.receiptUrl ?? this.users[i].stripe.subscription.receipt_url;
                    this.users[i].stripe.subscription.hosted_invoice_url =
                        stripeSubscriptionInfo.hostedInvoiceUrl ?? this.users[i].stripe.subscription.hosted_invoice_url;
                    this.users[i].stripe.subscription.starts_at =
                        stripeSubscriptionInfo.startAt ?? this.users[i].stripe.subscription.starts_at;
                    this.users[i].stripe.subscription.ends_at =
                        stripeSubscriptionInfo.endsAt ?? this.users[i].stripe.subscription.ends_at;
                    this.users[i].stripe.updated_at =
                        stripeSubscriptionInfo.createdAt ?? this.users[i].stripe.updated_at;
                    this.users[i].stripe.updated_at_pt_br =
                        stripeSubscriptionInfo.createdAtBrazil ?? this.users[i].stripe.updated_at_pt_br;

                    this.save();

                    return this.users[i];
                }
            }

            throw new Error(ErrorsMessages.USER_NOT_FOUND);
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

    public async incrementAPIRequest(userAPIKey: string): Promise<{ success: boolean; api_requests_today: number }> {
        const user = await this.database.users.findUnique({
            where: {
                api_token: userAPIKey,
            },
        });

        if (user && user.stripe_subscription_name === "NOOB" && user.api_requests_today >= 10 && !DateTime.isNewDay()) {
            return {
                success: false,
                api_requests_today: user.api_requests_today,
            };
        }

        await this.database.users.update({
            where: {
                api_token: userAPIKey,
            },
            data: { api_requests_today: { increment: 1 } },
        });

        return {
            success: true,
            api_requests_today: user.api_requests_today,
        };
    }
}

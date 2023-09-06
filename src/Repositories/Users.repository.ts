import * as fs from "fs";
import * as usersDatabase from "./Jsons/users.json";
import { ErrorsMessages } from "src/Utils/ErrorsMessages";
import DateTime from "src/Utils/DataTypes/DateTime";
import { ProfileUpdateDTO } from "src/UseCases/ProfileUpdate.useCase";
import { Bcrypt } from "src/Utils/Bcrypt";

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
}

export interface UserResponse {
    user: User;
    index: number;
}

export interface StripeSubscriptionInfo {
    customerId: string | null;
    paid: boolean | null;
    chargeId: string | null;
    amount: number | null;
    receiptUrl: string | null;
    hostedInvoiceUrl: string | null;
    startAt: string | null;
    endsAt: string | null;
    createdAt: string | null;
    createdAtBrazil: string | null;
}
export interface UsersRepositoryPort {
    save(user?: any, index?: number): void;
    findById(userId: string): boolean;
    findByEmail(email: string): boolean;
    getByEmail(email: string): UserResponse;
    getById(userId: string): UserResponse;
    getByResetPasswordToken(resetPasswordToken: string): UserResponse;
    create(user: User): void;
    update(userId: string, profileUpdateDTO: ProfileUpdateDTO): Promise<UserUpdated>;
    deleteByEmail(email: string): void;
    logout(userId: string): void;
    saveResetPasswordToken(userId: string, resetPasswordToken: string): void;
    resetPassword(userId: string, newPassword: string): void;
    updateStripeSubscriptionInfo(user: User, stripeSubscriptionInfo: StripeSubscriptionInfo): void;
}

export default class UsersRepository implements UsersRepositoryPort {
    constructor(private users: User[] = usersDatabase) {}

    public save(user?: any, index?: number): void {
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

    public findById(userId: string): boolean {
        return this.users.some((user: any) => user.id === userId);
    }

    public findByEmail(email: string): boolean {
        return this.users.some((user: any) => user.email === email);
    }

    public getByEmail(email: string): UserResponse {
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].email === email) {
                return { user: this.users[i], index: i };
            }
        }

        throw new Error(ErrorsMessages.USER_NOT_FOUND);
    }

    public getById(userId: string): UserResponse {
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].id === userId) {
                return { user: this.users[i], index: i };
            }
        }

        throw new Error(ErrorsMessages.USER_NOT_FOUND);
    }

    public getByResetPasswordToken(resetPasswordToken: string): UserResponse {
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].reset_password_token === resetPasswordToken) {
                return { user: this.users[i], index: i };
            }
        }

        throw new Error(ErrorsMessages.USER_NOT_FOUND);
    }

    public create(user: User): void {
        this.users.push(user);
        this.save();
    }

    public async update(userId: string, profileUpdateDTO: ProfileUpdateDTO): Promise<UserUpdated> {
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].id === userId) {
                this.users[i].username = profileUpdateDTO.username ?? this.users[i].username;

                this.users[i].telegram_number = profileUpdateDTO.telegramNumber ?? this.users[i].telegram_number;

                this.users[i].password = (await Bcrypt.hash(profileUpdateDTO.newPassword)) ?? this.users[i].password;

                this.save();

                return {
                    username: this.users[i].username,
                    email: this.users[i].email,
                    telegramNumber: this.users[i].telegram_number,
                    password: profileUpdateDTO.newPassword ?? this.users[i].password,
                };
            }
        }
    }

    public deleteByEmail(email: string) {
        this.users = this.users.filter((user) => user.email !== email);
        this.save();
    }

    public logout(userId: string) {
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].id === userId) {
                this.users[i].jwt_token = null;
                this.save();
                break;
            }
        }
    }

    public saveResetPasswordToken(userId: string, resetPasswordToken: string) {
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].id === userId) {
                this.users[i].reset_password_token = resetPasswordToken;
                this.users[i].reset_password_token_expires_at = String(new Date(new Date().getTime() + 60 * 60 * 1000));
                this.save();
                break;
            }
        }
    }

    public resetPassword(userId: string, newPassword: string) {
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

    public updateStripeSubscriptionInfo(user: User, stripeSubscriptionInfo: StripeSubscriptionInfo) {
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].id === user.id) {
                this.users[i].stripe.customer_id =
                    stripeSubscriptionInfo.customerId ?? this.users[i].stripe.customer_id;
                this.users[i].stripe.subscription.active =
                    stripeSubscriptionInfo.paid ?? this.users[i].stripe.subscription.active;
                this.users[i].stripe.subscription.charge_id =
                    stripeSubscriptionInfo.chargeId ?? this.users[i].stripe.subscription.charge_id;
                this.users[i].stripe.subscription.name = stripeSubscriptionInfo.amount === 499 ? "PRO" : "CASUAL";
                this.users[i].stripe.subscription.receipt_url =
                    stripeSubscriptionInfo.receiptUrl ?? this.users[i].stripe.subscription.receipt_url;
                this.users[i].stripe.subscription.hosted_invoice_url =
                    stripeSubscriptionInfo.hostedInvoiceUrl ?? this.users[i].stripe.subscription.hosted_invoice_url;
                this.users[i].stripe.subscription.starts_at =
                    stripeSubscriptionInfo.startAt ?? this.users[i].stripe.subscription.starts_at;
                this.users[i].stripe.subscription.ends_at =
                    stripeSubscriptionInfo.endsAt ?? this.users[i].stripe.subscription.ends_at;
                this.users[i].stripe.updated_at = stripeSubscriptionInfo.createdAt ?? this.users[i].stripe.updated_at;
                this.users[i].stripe.updated_at_pt_br =
                    stripeSubscriptionInfo.createdAtBrazil ?? this.users[i].stripe.updated_at_pt_br;

                this.save();
                return;
            }
        }

        throw new Error(ErrorsMessages.USER_NOT_FOUND);
    }
}

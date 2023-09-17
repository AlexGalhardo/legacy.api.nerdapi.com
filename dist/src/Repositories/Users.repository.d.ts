import { ProfileUpdateDTO } from "src/UseCases/ProfileUpdate.useCase";
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
    transformToUserResponse(user: any): UserResponse;
    transformToUser(user: any): User;
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
    incrementAPIRequest(userAPIKey: string): Promise<{
        success: boolean;
        api_requests_today: number;
    }>;
}
export default class UsersRepository implements UsersRepositoryPort {
    private users;
    private readonly database;
    constructor(users: User[], database: Database);
    save(user?: User, index?: number): Promise<void>;
    transformToUserResponse(user: any): UserResponse;
    transformToUser(user: any): User;
    findById(userId: string): Promise<boolean>;
    findByEmail(email: string): Promise<boolean>;
    getByEmail(email: string): Promise<UserResponse>;
    getById(userId: string): Promise<UserResponse>;
    getByResetPasswordToken(resetPasswordToken: string): Promise<UserResponse>;
    create(user: User): Promise<void>;
    update(userId: string, profileUpdateDTO: ProfileUpdateDTO): Promise<UserUpdated>;
    deleteByEmail(email: string): Promise<void>;
    logout(userId: string): Promise<void>;
    phoneAlreadyRegistred(userId: string, phoneNumber: string): Promise<boolean>;
    saveResetPasswordToken(userId: string, resetPasswordToken: string): Promise<void>;
    resetPassword(userId: string, newPassword: string): Promise<void>;
    findResetPasswordToken(resetPasswordToken: string): Promise<boolean>;
    updateStripeSubscriptionInfo(user: User, stripeSubscriptionInfo: StripeSubscriptionInfo): Promise<User>;
    incrementAPIRequest(userAPIKey: string): Promise<{
        success: boolean;
        api_requests_today: number;
    }>;
}

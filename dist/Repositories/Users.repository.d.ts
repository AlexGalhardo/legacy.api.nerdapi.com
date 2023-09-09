import { ProfileUpdateDTO } from "src/UseCases/ProfileUpdate.useCase";
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
    apiToken: string | null;
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
    private users;
    constructor(users?: User[]);
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

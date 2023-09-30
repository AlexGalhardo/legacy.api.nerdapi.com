/// <reference types="node" />
import { ContactSendMessageDTO } from "src/UseCases/ContactSendMessage.useCase";
interface SubscriptionTransaction {
    charge_id: string;
    charge_paid: boolean;
    receipt_url: string;
    invoice_url: string;
    plan_name: string;
    plan_amount: number;
    starts_at: string;
    ends_at: string;
    customer_id: string;
    customer_name: string;
    customer_email: string;
    customer_subscription_active: boolean;
    customer_api_token: string;
}
declare class TelegramBOTLogger {
    private token;
    private channelName;
    private baseUrl;
    constructor(token: string, channelName: string);
    isThereToken(token: string): void;
    isThereChannel(channel: string): void;
    emojiMap(): {
        CONTACT: string;
        ERROR: string;
        SUBSCRIPTION: string;
    };
    logError(message: string): void;
    logContactSendMessage(contactObject: ContactSendMessageDTO): void;
    logSubscriptionTransaction(subscriptionTransaction: SubscriptionTransaction): void;
    sendRequest(url: string): import("http").ClientRequest;
}
declare const _default: TelegramBOTLogger;
export default _default;

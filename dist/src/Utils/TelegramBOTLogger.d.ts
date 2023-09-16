/// <reference types="node" />
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
    sendMessage(level: string, type: string, message: string): void;
    logContact(contactObject: any): void;
    logSubscriptionTransaction(subscriptionTransactionObject: any): void;
    sendRequest(url: string): import("node:http").ClientRequest;
}
declare const _default: TelegramBOTLogger;
export default _default;

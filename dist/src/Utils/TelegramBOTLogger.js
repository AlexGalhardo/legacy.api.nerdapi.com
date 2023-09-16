"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_https_1 = require("node:https");
const DateTime_1 = require("./DataTypes/DateTime");
class TelegramBOTLogger {
    constructor(token, channelName) {
        this.isThereToken(token);
        this.isThereChannel(channelName);
        this.token = token;
        this.channelName = channelName;
        this.baseUrl = `https://api.telegram.org/bot${token}`;
    }
    isThereToken(token) {
        if (!token)
            throw new Error("There is no Telegram Token in TelegramLogger Class Constructor");
    }
    isThereChannel(channel) {
        if (!channel)
            throw new Error("There is no Telegram Channel name in TelegramLogger Class Constructor");
    }
    emojiMap() {
        return {
            CONTACT: "💬",
            ERROR: "🚨",
            SUBSCRIPTION: "🏆",
        };
    }
    sendMessage(level, type, message) {
        const emoji = this.emojiMap()[level];
        const messageToSend = `${emoji} ${type} ${emoji}\n\n <b>CREATED_AT:</b> ${DateTime_1.default.getNow()}\n ${message}`;
        const urlParams = encodeURI(`chat_id=${this.channelName}&text=${messageToSend}&parse_mode=HTML`);
        const url = `${this.baseUrl}/sendMessage?${urlParams}`;
        this.sendRequest(url);
    }
    logContact(contactObject) {
        const emoji = this.emojiMap().CONTACT;
        const log = `
        <b>NAME:</b> ${contactObject.name}
        <b>EMAIL:</b> ${contactObject.email}
        <b>SUBJECT:</b> ${contactObject.subject}
        ---------------------------------------
        <b>MESSAGE:</b> ${contactObject.message}
                    `;
        const message = `${emoji} CONTACT ${emoji}\n\n <b>CREATED_AT:</b> ${DateTime_1.default.getNow()}\n ${log}`;
        const urlParams = encodeURI(`chat_id=${this.channelName}&text=${message}&parse_mode=HTML`);
        const url = `${this.baseUrl}/sendMessage?${urlParams}`;
        this.sendRequest(url);
    }
    logSubscriptionTransaction(subscriptionTransactionObject) {
        const emoji = this.emojiMap().SUBSCRIPTION;
        const log = `
        <b>STRIPE_TRANSACTION_ID:</b> ${subscriptionTransactionObject.transaction_id}
        ---------------------------------------------
        <b>PLAN_NAME:</b> ${subscriptionTransactionObject.plan_name}
        <b>PLAN_AMOUNT:</b> ${subscriptionTransactionObject.plan_amount}
        ---------------------------------------------
		<b>CUSTOMER_NAME:</b> ${subscriptionTransactionObject.user_name}
        <b>CUSTOMER_EMAIL:</b> ${subscriptionTransactionObject.user_email}
        <b>STRIPE_CUSTOMER__ID:</b> ${subscriptionTransactionObject.stripe_customer_id}
		<b>CUSTOMER_SUBSCRIPTION_ACTIVE: </b> ${subscriptionTransactionObject.status}
        `;
        const message = `${emoji} SUBSCRIPTION TRANSACTION ${emoji}\n\n <b>CREATED_AT:</b> ${DateTime_1.default.getNow()}\n ${log}`;
        const urlParams = encodeURI(`chat_id=${this.channelName}&text=${message}&parse_mode=HTML`);
        const url = `${this.baseUrl}/sendMessage?${urlParams}`;
        this.sendRequest(url);
    }
    sendRequest(url) {
        return node_https_1.default
            .get(url, (res) => {
            const { statusCode } = res;
            if (statusCode !== 200) {
                let data;
                res.on("data", (chunk) => {
                    data += chunk;
                });
                res.on("end", () => {
                    console.log(data);
                });
            }
        })
            .on("error", (e) => {
            console.log(e);
        });
    }
}
exports.default = new TelegramBOTLogger(process.env.TELEGRAM_BOT_HTTP_TOKEN, process.env.TELEGRAM_BOT_CHANNEL_ID);
//# sourceMappingURL=TelegramBOTLogger.js.map
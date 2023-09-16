"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const https = require("https");
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
    logError(message) {
        const emoji = this.emojiMap().ERROR;
        const messageToSend = `${emoji} ERROR ${emoji}\n\n <b>CREATED_AT:</b> ${DateTime_1.default.getNow()}\n ${message}`;
        const urlParams = encodeURI(`chat_id=${this.channelName}&text=${messageToSend}&parse_mode=HTML`);
        const url = `${this.baseUrl}/sendMessage?${urlParams}`;
        this.sendRequest(url);
    }
    logContactSendMessage(contactObject) {
        const emoji = this.emojiMap().CONTACT;
        const log = `
        <b>NAME:</b> ${contactObject.name}
        <b>EMAIL:</b> ${contactObject.email}
        <b>SUBJECT:</b> ${contactObject.subject}
        ---------------------------------------
        <b>MESSAGE:</b> ${contactObject.message}
        `;
        const message = `${emoji} CONTACT ${emoji}\n\n<b>CREATED_AT:</b> ${DateTime_1.default.getNow()}\n${log}`;
        const urlParams = encodeURI(`chat_id=${this.channelName}&text=${message}&parse_mode=HTML`);
        const url = `${this.baseUrl}/sendMessage?${urlParams}`;
        this.sendRequest(url);
    }
    logSubscriptionTransaction(subscriptionTransaction) {
        const emoji = this.emojiMap().SUBSCRIPTION;
        const log = `\n
		<b>STRIPE CHARGE ID:</b> ${subscriptionTransaction.charge_id}
		<b>STRIPE CHARGE PAID:</b> ${subscriptionTransaction.charge_paid}
		<b>STRIPE RECEIPT URL:</b> ${subscriptionTransaction.receipt_url}
		<b>STRIPE INVOICE URL:</b> ${subscriptionTransaction.invoice_url}
        ---------------------------------------------
        <b>SUBSCRIPTION NAME:</b> ${subscriptionTransaction.plan_name}
        <b>SUBSCRIPTION AMOUNT:</b> ${subscriptionTransaction.plan_amount}
		<b>SUBSCRIPTION START AT:</b> ${subscriptionTransaction.starts_at}
        <b>SUBSCRIPTION ENDS AT:</b> ${subscriptionTransaction.ends_at}
        ---------------------------------------------
		<b>STRIPE CUSTOMER ID:</b> ${subscriptionTransaction.customer_id}
		<b>CUSTOMER NAME:</b> ${subscriptionTransaction.customer_name}
        <b>CUSTOMER EMAIL:</b> ${subscriptionTransaction.customer_email}
		<b>CUSTOMER SUBSCRIPTION ACTIVE: </b> ${subscriptionTransaction.customer_subscription_active}
		<b>CUSTOMER API TOKEN: </b> ${subscriptionTransaction.customer_api_token}
        `;
        const message = `${emoji} SUBSCRIPTION TRANSACTION ${emoji}\n\n <b>CREATED_AT:</b> ${DateTime_1.default.getNow()}\n ${log}`;
        const urlParams = encodeURI(`chat_id=${this.channelName}&text=${message}&parse_mode=HTML`);
        const url = `${this.baseUrl}/sendMessage?${urlParams}`;
        this.sendRequest(url);
    }
    sendRequest(url) {
        return https
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
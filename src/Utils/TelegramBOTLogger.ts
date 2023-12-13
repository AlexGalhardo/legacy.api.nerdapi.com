/*
Access: https://core.telegram.org/bots
Create a new bot in BotFather in telegram, with /newbot prompt command
TELEGRAM_BOT_HTTP_TOKEN=6513526877:AAHj3nN9AEgRV1zjYFgfhLeuQNjOlwmm0UE

TO GET YOUR TELEGRAM_BOT_CHANNEL_ID
Send a aleatory message to your new bot
Access: https://api.telegram.org/bot<YOUR_TELEGRAM_BOT_HTTP_TOKEN_HERE>/getUpdates
Get the "chat.id"
TELEGRAM_BOT_CHANNEL_ID=chat.id here
*/

import * as https from "https";

import DateTime from "./DataTypes/DateTime";
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

class TelegramBOTLogger {
    private token: string;
    private channelName: string;
    private baseUrl: string;

    constructor(token: string, channelName: string) {
        this.isThereToken(token);
        this.isThereChannel(channelName);
        this.token = token;
        this.channelName = channelName;
        this.baseUrl = `https://api.telegram.org/bot${token}`;
    }

    isThereToken(token: string) {
        if (!token && process.env.ENV === 'production') throw new Error("There is no Telegram Token in TelegramLogger Class Constructor");
    }

    isThereChannel(channel: string) {
        if (!channel && process.env.ENV === 'production') throw new Error("There is no Telegram Channel name in TelegramLogger Class Constructor");
    }

    emojiMap() {
        return {
            CONTACT: "💬",
            ERROR: "🚨",
            SUBSCRIPTION: "🏆",
        };
    }

    logError(message: string) {
        const emoji = this.emojiMap().ERROR;

        const messageToSend = `${emoji} ERROR ${emoji}\n\n <b>CREATED_AT:</b> ${DateTime.getNow()}\n ${message}`;

        const urlParams = encodeURI(`chat_id=${this.channelName}&text=${messageToSend}&parse_mode=HTML`);

        const url = `${this.baseUrl}/sendMessage?${urlParams}`;

        this.sendRequest(url);
    }

    logContactSendMessage(contactObject: ContactSendMessageDTO) {
        const emoji = this.emojiMap().CONTACT;

        const log = `
        <b>NAME:</b> ${contactObject.name}
        <b>EMAIL:</b> ${contactObject.email}
        <b>SUBJECT:</b> ${contactObject.subject}
        ---------------------------------------
        <b>MESSAGE:</b> ${contactObject.message}
        `;

        const message = `${emoji} CONTACT ${emoji}\n\n<b>CREATED_AT:</b> ${DateTime.getNow()}\n${log}`;

        const urlParams = encodeURI(`chat_id=${this.channelName}&text=${message}&parse_mode=HTML`);

        const url = `${this.baseUrl}/sendMessage?${urlParams}`;

        this.sendRequest(url);
    }

    logSubscriptionTransaction(subscriptionTransaction: SubscriptionTransaction) {
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

        const message = `${emoji} SUBSCRIPTION TRANSACTION ${emoji}\n\n <b>CREATED_AT:</b> ${DateTime.getNow()}\n ${log}`;

        const urlParams = encodeURI(`chat_id=${this.channelName}&text=${message}&parse_mode=HTML`);

        const url = `${this.baseUrl}/sendMessage?${urlParams}`;

        this.sendRequest(url);
    }

    sendRequest(url: string) {
        return https
            .get(url, (res) => {
                const { statusCode } = res;
                if (statusCode !== 200) {
                    let data: string;
                    res.on("data", (chunk) => {
                        data += chunk;
                    });
                    res.on("end", () => {
                        console.log(data); // TODO: save log while in production
                    });
                }
            })
            .on("error", (e) => {
                console.log(e); // TODO: save log while in production
            });
    }
}

export default new TelegramBOTLogger(process.env.TELEGRAM_BOT_HTTP_TOKEN, process.env.TELEGRAM_BOT_CHANNEL_ID);

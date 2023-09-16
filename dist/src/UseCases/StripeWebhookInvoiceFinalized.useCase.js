"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DateTime_1 = require("../Utils/DataTypes/DateTime");
const Exception_1 = require("../Utils/Exception");
const ErrorsMessages_1 = require("../Utils/ErrorsMessages");
const RandomToken_1 = require("../Utils/RandomToken");
const TelegramBOTLogger_1 = require("../Utils/TelegramBOTLogger");
class StripeWebhookInvoiceFinalizedUseCase {
    constructor(stripeRepository, usersRepository) {
        this.stripeRepository = stripeRepository;
        this.usersRepository = usersRepository;
    }
    async execute(event) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        const { user } = await this.usersRepository.getByEmail(event.data.object.customer_email);
        if (user) {
            const userUpdated = await this.usersRepository.updateStripeSubscriptionInfo(user, {
                apiToken: event.data.object.paid ? (0, RandomToken_1.generateRandomToken)() : null,
                customerId: (_a = event.data.object.customer) !== null && _a !== void 0 ? _a : null,
                paid: (_b = event.data.object.paid) !== null && _b !== void 0 ? _b : null,
                chargeId: (_c = event.data.object.id) !== null && _c !== void 0 ? _c : null,
                amount: (_d = event.data.object.amount) !== null && _d !== void 0 ? _d : null,
                receiptUrl: (_e = event.data.object.receipt_url) !== null && _e !== void 0 ? _e : null,
                hostedInvoiceUrl: (_f = event.data.object.hosted_invoice_url) !== null && _f !== void 0 ? _f : null,
                startAt: (_g = DateTime_1.default.timestampToGetNow(event.data.object.lines.data[0].period.start)) !== null && _g !== void 0 ? _g : null,
                endsAt: (_h = DateTime_1.default.timestampToGetNow(event.data.object.lines.data[0].period.end)) !== null && _h !== void 0 ? _h : null,
                createdAt: (_j = String(new Date(event.created))) !== null && _j !== void 0 ? _j : null,
                createdAtBrazil: (_k = DateTime_1.default.timestampToGetNow(event.created)) !== null && _k !== void 0 ? _k : null,
            });
            this.stripeRepository.saveInvoiceWebhookEventLog(event);
            TelegramBOTLogger_1.default.logSubscriptionTransaction({
                charge_id: userUpdated.stripe.subscription.charge_id,
                charge_paid: userUpdated.stripe.subscription.active,
                receipt_url: userUpdated.stripe.subscription.receipt_url,
                invoice_url: userUpdated.stripe.subscription.hosted_invoice_url,
                plan_name: userUpdated.stripe.subscription.name,
                plan_amount: userUpdated.stripe.subscription.name === "CASUAL" ? 199 : 499,
                starts_at: userUpdated.stripe.subscription.starts_at,
                ends_at: userUpdated.stripe.subscription.ends_at,
                customer_id: userUpdated.stripe.customer_id,
                customer_name: userUpdated.username,
                customer_email: userUpdated.email,
                customer_subscription_active: userUpdated.stripe.subscription.active,
                customer_api_token: userUpdated.api_token
            });
        }
        throw new Exception_1.ClientException(ErrorsMessages_1.ErrorsMessages.USER_NOT_FOUND);
    }
}
exports.default = StripeWebhookInvoiceFinalizedUseCase;
//# sourceMappingURL=StripeWebhookInvoiceFinalized.useCase.js.map
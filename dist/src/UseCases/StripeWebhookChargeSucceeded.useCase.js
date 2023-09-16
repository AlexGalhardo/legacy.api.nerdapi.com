"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DateTime_1 = require("../Utils/DataTypes/DateTime");
const ErrorsMessages_1 = require("../Utils/ErrorsMessages");
const Exception_1 = require("../Utils/Exception");
const RandomToken_1 = require("../Utils/RandomToken");
class StripeWebhookChargeSucceededUseCase {
    constructor(stripeRepository, usersRepository) {
        this.stripeRepository = stripeRepository;
        this.usersRepository = usersRepository;
    }
    async execute(event) {
        var _a, _b, _c, _d, _e, _f, _g;
        const { user } = await this.usersRepository.getByEmail(event.data.object.billing_details.email);
        if (user) {
            await this.usersRepository.updateStripeSubscriptionInfo(user, {
                apiToken: event.data.object.paid ? (0, RandomToken_1.generateRandomToken)() : null,
                customerId: (_a = event.data.object.customer) !== null && _a !== void 0 ? _a : null,
                paid: (_b = event.data.object.paid) !== null && _b !== void 0 ? _b : null,
                chargeId: (_c = event.data.object.id) !== null && _c !== void 0 ? _c : null,
                amount: (_d = event.data.object.amount_due) !== null && _d !== void 0 ? _d : null,
                receiptUrl: (_e = event.data.object.receipt_url) !== null && _e !== void 0 ? _e : null,
                hostedInvoiceUrl: (_f = event.data.object.hosted_invoice_url) !== null && _f !== void 0 ? _f : null,
                startAt: undefined,
                endsAt: undefined,
                createdAt: String(new Date(event.created)),
                createdAtBrazil: (_g = DateTime_1.default.timestampToGetNow(event.created)) !== null && _g !== void 0 ? _g : null,
            });
            this.stripeRepository.saveChargeWebhookEventLog(event);
        }
        else {
            throw new Exception_1.ClientException(ErrorsMessages_1.ErrorsMessages.USER_NOT_FOUND);
        }
    }
}
exports.default = StripeWebhookChargeSucceededUseCase;
//# sourceMappingURL=StripeWebhookChargeSucceeded.useCase.js.map
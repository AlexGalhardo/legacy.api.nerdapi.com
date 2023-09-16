"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = require("../Utils/Constants");
const Stripe_1 = require("../Utils/Stripe");
const jwt = require("jsonwebtoken");
const ErrorsMessages_1 = require("../Utils/ErrorsMessages");
const Exception_1 = require("../Utils/Exception");
class StripeCreatePortalSessionUseCase {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute(jwtToken, stripeCreatePortalSessionDTO) {
        var _a;
        const { userID } = jwt.verify(jwtToken, process.env.JWT_SECRET);
        const { user } = await this.usersRepository.getById(userID);
        if (user) {
            if (user.stripe.subscription.active)
                throw new Exception_1.ClientException(ErrorsMessages_1.ErrorsMessages.USER_HAS_ACTIVE_PLAN);
            const { session_id } = stripeCreatePortalSessionDTO;
            const checkoutSession = await Stripe_1.stripe.checkout.sessions.retrieve(session_id);
            const portalSession = await Stripe_1.stripe.billingPortal.sessions.create({
                customer: (_a = checkoutSession.customer) !== null && _a !== void 0 ? _a : "cus_OZrXWOVtDiSJlB",
                return_url: `${Constants_1.APP_URL}/profile`,
            });
            return { success: true, redirect: portalSession.url };
        }
        throw new Exception_1.ClientException(ErrorsMessages_1.ErrorsMessages.USER_NOT_FOUND);
    }
}
exports.default = StripeCreatePortalSessionUseCase;
//# sourceMappingURL=StripeCreatePortalSession.useCase.js.map
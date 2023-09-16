"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = require("../Utils/Constants");
const Stripe_1 = require("../Utils/Stripe");
const jwt = require("jsonwebtoken");
const ErrorsMessages_1 = require("../Utils/ErrorsMessages");
const Exception_1 = require("../Utils/Exception");
class StripeCreateCheckoutSessionUseCase {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute(jwtToken, stripeCreateCheckoutSessionDTO) {
        const { userID } = jwt.verify(jwtToken, process.env.JWT_SECRET);
        const { user } = await this.usersRepository.getById(userID);
        if (user) {
            if (user.stripe.subscription.active)
                throw new Exception_1.ClientException(ErrorsMessages_1.ErrorsMessages.USER_HAS_ACTIVE_PLAN);
            let { lookup_key } = stripeCreateCheckoutSessionDTO;
            const prices = await Stripe_1.stripe.prices.list({
                lookup_keys: [lookup_key],
                expand: ["data.product"],
            });
            const session = await Stripe_1.stripe.checkout.sessions.create({
                billing_address_collection: "auto",
                line_items: [
                    {
                        price: prices.data[0].id,
                        quantity: 1,
                    },
                ],
                mode: "subscription",
                success_url: `${Constants_1.APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}&plan=${lookup_key.replace("plan_", "")}`,
                cancel_url: `${Constants_1.APP_URL}/pricing`,
            });
            return { success: true, redirect: session.url };
        }
        throw new Exception_1.ClientException(ErrorsMessages_1.ErrorsMessages.USER_NOT_FOUND);
    }
}
exports.default = StripeCreateCheckoutSessionUseCase;
//# sourceMappingURL=StripeCreateCheckoutSession.useCase.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripe = void 0;
const stripe_1 = require("stripe");
exports.stripe = new stripe_1.default(`${process.env.STRIPE_SK_TEST}`, {
    apiVersion: "2023-08-16",
});
//# sourceMappingURL=Stripe.js.map
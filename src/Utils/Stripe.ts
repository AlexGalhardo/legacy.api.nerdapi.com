import Stripe from "stripe";

export const stripe = new Stripe(`${process.env.STRIPE_SK_TEST}`, {
    apiVersion: "2024-04-10",
});

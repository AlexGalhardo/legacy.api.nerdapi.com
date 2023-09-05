import { Controller, Post, Res, Body, Inject, HttpStatus } from "@nestjs/common";
import { Response } from "express";
import { APP_URL } from "src/Utils/Constants";
import { stripe } from "src/Utils/Stripe";

interface StripeWebhookDTO {
    event: any;
}

interface StripeCreateCheckoutSessionDTO {
    lookup_key: string;
}

interface StripeCreatePortalSessionDTO {
    session_id: string;
}

interface StripeControllerPort {}

@Controller("stripe")
export class StripeController implements StripeControllerPort {
    constructor() {}

    @Post("/create-checkout-session")
    async createCheckoutSession(
        @Body() stripeCreateCheckoutSessionDTO: StripeCreateCheckoutSessionDTO,
        @Res() response: Response,
    ) {
        try {
            const { lookup_key } = stripeCreateCheckoutSessionDTO;
            const prices = await stripe.prices.list({
                lookup_keys: [lookup_key],
                expand: ["data.product"],
            });
            const session = await stripe.checkout.sessions.create({
                billing_address_collection: "auto",
                line_items: [
                    {
                        price: prices.data[0].id,
                        quantity: 1,
                    },
                ],
                mode: "subscription",
                success_url: `${APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}&plan=${lookup_key.replace(
                    "plan_",
                    "",
                )}`,
                cancel_url: `${APP_URL}/pricing`,
            });

            return response.status(HttpStatus.OK).json({
                success: true,
                redirect: session.url,
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    @Post("/create-portal-session")
    async createPortalSession(
        @Body() stripeCreatePortalSessionDTO: StripeCreatePortalSessionDTO,
        @Res() response: Response,
    ) {
        try {
            const { session_id } = stripeCreatePortalSessionDTO;
            const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

            const portalSession = await stripe.billingPortal.sessions.create({
                customer: checkoutSession.customer as string,
                return_url: `${APP_URL}/profile`,
            });

            return response.status(200).json({
                success: true,
                redirect: portalSession.url,
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    @Post("/webhook")
    async login(@Body() stripeWebhookDTO: StripeWebhookDTO, @Res() response: Response) {
        try {
            const { event } = stripeWebhookDTO;

            switch (event.type) {
                case "payment_intent.succeeded":
                    const payment_intent_succeeded = event.data.object;
                    break;
                case "invoice.paid":
                    const invoice_paid = event.data.object;
                    break;
                case "charge.succeeded":
                    const charge_succeeded = event.data.object;
                    break;
                case "invoice.finalized":
                    const invoice_finalized = event.data.object;
                    break;
                case "customer.created":
                    const customer_created = event.data.object;
                    break;
                case "customer.subscription.updated":
                    const customer_subscription_updated = event.data.object;
                    break;
                case "invoice.updated":
                    const invoice_updated = event.data.object;
                    break;
                case "customer.updated":
                    const customer_updated = event.data.object;
                    break;
                case "invoice.payment_succeeded":
                    const invoice_payment_succeeded = event.data.object;
                    break;
                case "customer.subscription.created":
                    const customer_subscription_created = event.data.object;
                    break;
                case "invoice.created":
                    const invoice_created = event.data.object;
                    break;
                case "payment_method.attached":
                    const payment_method_attached = event.data.object;
                    break;
                case "checkout.session.completed":
                    const checkout_session_completed = event.data.object;
                    break;
                case "billing_portal.session.created":
                    const billing_portal_session_created = event.data.object;
                    break;
                default:
                    console.log(`Unhandled event type ${event.type}`);
            }

            return response.json({ received: true });
        } catch (error) {
            throw new Error(error);
        }
    }
}

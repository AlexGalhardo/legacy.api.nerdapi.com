import { Controller, Post, Res, Body, Inject, HttpStatus } from "@nestjs/common";
import { Response } from "express";
import { StripeRepositoryPort } from "src/Repositories/Stripe.repository";
import { APP_URL } from "src/Utils/Constants";
import DateTime from "src/Utils/DataTypes/DateTime";
import { stripe } from "src/Utils/Stripe";

interface StripeWebhookDTO {
	id: string;
	type: string;
    event: any;
	data: any;
	created: number;
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
    constructor(@Inject("StripeRepositoryPort") private readonly stripeRepository: StripeRepositoryPort,) {}

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
    async login(@Body() event: StripeWebhookDTO, @Res() response: Response) {
        
		try {
            
			switch (event.type) {
                
				case "payment_intent.succeeded":
                    this.stripeRepository.savePaymentWebhookEventLog(event)
                    break;
                
				case "invoice.paid":
                    this.stripeRepository.saveInvoiceWebhookEventLog(event)
                    break;
                
				case "charge.succeeded":
					const chargeSucceededResume = {
						event_id: event.id,
						charge_id: event.data.object.id,
						amount: event.data.object.amount,
						customer_email: event.data.object.billing_details.email,
						customer_name: event.data.object.billing_details.name,
						stripe_customer_id: event.data.object.customer,
						paid: event.data.object.paid,
						receipt_url: event.data.object.receipt_url,
						created_at: DateTime.timestampToGetNow(event.created),
					}
					this.stripeRepository.saveChargeWebhookEventLog(event)
                    break;
                
				case "invoice.finalized":
					const invoiceFinalizedResume = {
						event_id: event.id,
						hosted_invoice_url: event.data.object.hosted_invoice_url,
						period_start: DateTime.timestampToGetNow(event.data.object.period_start),
						period_end: DateTime.timestampToGetNow(event.data.object.period_end),
						created_at: DateTime.timestampToGetNow(event.created),
					}
					this.stripeRepository.saveInvoiceWebhookEventLog(event)
                    break;
                
				case "customer.created":
                    this.stripeRepository.saveCustomerWebhookEventLog(event)
                    break;
                
				case "customer.subscription.updated":
                    this.stripeRepository.saveCustomerWebhookEventLog(event)
                    break;
                    
                case "invoice.updated":
                    this.stripeRepository.saveInvoiceWebhookEventLog(event)
                    break;
                
				case "customer.updated":
                    this.stripeRepository.saveCustomerWebhookEventLog(event)
                    break;
                
				case "invoice.payment_succeeded":
                    this.stripeRepository.saveInvoiceWebhookEventLog(event)
                    break;
                
				case "customer.subscription.created":
                    this.stripeRepository.saveCustomerWebhookEventLog(event)
                    break;
                
				case "invoice.created":
                    this.stripeRepository.saveInvoiceWebhookEventLog(event)
                    break;
                
				case "payment_method.attached":
                    this.stripeRepository.savePaymentWebhookEventLog(event)
                    break;
                
				case "checkout.session.completed":
                    this.stripeRepository.saveCheckoutSessionWebhookEventLog(event)
                    break;
                
				case "billing_portal.session.created":
                    this.stripeRepository.saveBillingPortalSessionWebhookEventLog(event)
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

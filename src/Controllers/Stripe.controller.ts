import { Controller, Post, Res, Body, Inject, HttpStatus } from "@nestjs/common";
import { Response } from "express";
import { StripeRepositoryPort } from "src/Repositories/Stripe.repository";
import {
    StripeCreateCheckoutSessionDTO,
    StripeCreateCheckoutSessionUseCasePort,
} from "src/UseCases/StripeCreateCheckoutSession.useCase";
import { StripeCreatePortalSessionUseCasePort } from "src/UseCases/StripeCreatePortalSession.useCase";
import { StripeWebhookChargeSucceededUseCasePort } from "src/UseCases/StripeWebhookChargeSucceeded.useCase";
import { StripeWebhookInvoiceFinalizedUseCasePort } from "src/UseCases/StripeWebhookInvoiceFinalized.useCase";
import TelegramBOTLogger from "src/Utils/TelegramBOTLogger";

interface StripeUseCaseResponse {
    success: boolean;
    redirect?: string;
    message?: string;
}

interface StripeWebhookEventDTO {
    id: string;
    type: string;
    event: any;
    data: any;
    created: number;
}

interface StripeCreatePortalSessionDTO {
    session_id: string;
}

interface StripeControllerPort {
    createCheckoutSession(
        stripeCreateCheckoutSessionDTO: StripeCreateCheckoutSessionDTO,
        response: Response,
    ): Promise<Response<StripeUseCaseResponse>>;
    createPortalSession(
        stripeCreatePortalSessionDTO: StripeCreatePortalSessionDTO,
        response: Response,
    ): Promise<Response<StripeUseCaseResponse>>;
    webhook(event: StripeWebhookEventDTO, response: Response): Promise<Response<{ received: boolean }>>;
}

@Controller("stripe")
export class StripeController implements StripeControllerPort {
    constructor(
        @Inject("StripeRepositoryPort") private readonly stripeRepository: StripeRepositoryPort,
        @Inject("StripeCreateCheckoutSessionUseCasePort")
        private readonly stripeCreateCheckoutSessionUseCase: StripeCreateCheckoutSessionUseCasePort,
        @Inject("StripeCreatePortalSessionUseCasePort")
        private readonly stripeCreatePortalSessionUseCase: StripeCreatePortalSessionUseCasePort,
        @Inject("StripeWebhookChargeSucceededUseCasePort")
        private readonly stripeWebhookChargeSucceededUseCase: StripeWebhookChargeSucceededUseCasePort,
        @Inject("StripeWebhookInvoiceFinalizedUseCasePort")
        private readonly stripeWebhookInvoiceFinalizedUseCase: StripeWebhookInvoiceFinalizedUseCasePort,
    ) {}

    @Post("/create-checkout-session")
    async createCheckoutSession(
        @Body() stripeCreateCheckoutSessionDTO: StripeCreateCheckoutSessionDTO,
        @Res() response: Response,
    ): Promise<Response<StripeUseCaseResponse>> {
        try {
            const { success, redirect } = await this.stripeCreateCheckoutSessionUseCase.execute(
                response.locals.jwt_token,
                stripeCreateCheckoutSessionDTO,
            );
            if (success) return response.status(HttpStatus.OK).json({ success: true, redirect });
        } catch (error) {
            return response.status(HttpStatus.BAD_REQUEST).json({ success: false, message: error.message });
        }
    }

    @Post("/create-portal-session")
    async createPortalSession(
        @Body() stripeCreatePortalSessionDTO: StripeCreatePortalSessionDTO,
        @Res() response: Response,
    ): Promise<Response<StripeUseCaseResponse>> {
        try {
            const { success, redirect } = await this.stripeCreatePortalSessionUseCase.execute(
                response.locals.jwt_token,
                stripeCreatePortalSessionDTO,
            );
            if (success) return response.status(HttpStatus.OK).json({ success: true, redirect });
        } catch (error) {
            return response.status(HttpStatus.BAD_REQUEST).json({ success: false, message: error.message });
        }
    }

	// https://github.com/stripe/stripe-cli
    @Post("/webhook")
    async webhook(
        @Body() event: StripeWebhookEventDTO,
        @Res() response: Response,
    ): Promise<Response<{ received: boolean }>> {
        try {
            switch (event.type) {
                case "payment_intent.succeeded":
                    this.stripeRepository.savePaymentWebhookEventLog(event);
                    break;

                case "invoice.paid":
                    this.stripeRepository.saveInvoiceWebhookEventLog(event);
                    break;

                case "charge.succeeded":
                    this.stripeWebhookChargeSucceededUseCase.execute(event);
                    break;

                case "invoice.finalized":
                    this.stripeWebhookInvoiceFinalizedUseCase.execute(event);
                    break;

                case "customer.created":
                    this.stripeRepository.saveCustomerWebhookEventLog(event);
                    break;

                case "customer.subscription.updated":
                    this.stripeRepository.saveCustomerWebhookEventLog(event);
                    break;

                case "invoice.updated":
                    this.stripeRepository.saveInvoiceWebhookEventLog(event);
                    break;

                case "customer.updated":
                    this.stripeRepository.saveCustomerWebhookEventLog(event);
                    break;

                case "invoice.payment_succeeded":
                    this.stripeRepository.saveInvoiceWebhookEventLog(event);
                    break;

                case "customer.subscription.created":
                    this.stripeRepository.saveCustomerWebhookEventLog(event);
                    break;

                case "invoice.created":
                    this.stripeRepository.saveInvoiceWebhookEventLog(event);
                    break;

                case "payment_method.attached":
                    this.stripeRepository.savePaymentWebhookEventLog(event);
                    break;

                case "checkout.session.completed":
                    this.stripeRepository.saveCheckoutSessionWebhookEventLog(event);
                    break;

                case "billing_portal.session.created":
                    this.stripeRepository.saveBillingPortalSessionWebhookEventLog(event);
                    break;

                default:
                    TelegramBOTLogger.logError(event.type)
            }

            return response.json({ received: true });
        } catch (error) {
            return response.json({ received: false });
        }
    }
}

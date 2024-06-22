import { Controller, Post, Res, Body, Inject, HttpStatus } from "@nestjs/common";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { StripeRepositoryPort } from "src/repositories/stripe.repository";
import {
    StripeCreateCheckoutSessionDTO,
    StripeCreateCheckoutSessionUseCasePort,
} from "src/use-cases/stripe-create-checkout-session.use-case";
import { StripeCreatePortalSessionUseCasePort } from "src/use-cases/stripe-create-portal-session.use-case";
import { StripeWebhookChargeSucceededUseCasePort } from "src/use-cases/stripe-webhook-charge-succeeded.use-case";
import { StripeWebhookInvoiceFinalizedUseCasePort } from "src/use-cases/stripe-webhook-invoice-finalized.use-case";
import TelegramLog from "src/config/telegram-logger.config";

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
@ApiTags("stripe")
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
    @ApiBearerAuth()
    async createCheckoutSession(
        @Body() stripeCreateCheckoutSessionDTO: StripeCreateCheckoutSessionDTO,
        @Res() response: Response,
    ): Promise<Response<StripeUseCaseResponse>> {
        try {
            const userJWTToken = response.locals.token;
            const { success, redirect } = await this.stripeCreateCheckoutSessionUseCase.execute(
                userJWTToken,
                stripeCreateCheckoutSessionDTO,
            );
            if (success) return response.status(HttpStatus.OK).json({ success: true, redirect });
        } catch (error: any) {
            return response.status(HttpStatus.BAD_REQUEST).json({ success: false, message: error.message });
        }
    }

    @Post("/create-portal-session")
    @ApiBearerAuth()
    async createPortalSession(
        @Body() stripeCreatePortalSessionDTO: StripeCreatePortalSessionDTO,
        @Res() response: Response,
    ): Promise<Response<StripeUseCaseResponse>> {
        try {
            const userJWTToken = response.locals.token;
            const { success, redirect } = await this.stripeCreatePortalSessionUseCase.execute(
                userJWTToken,
                stripeCreatePortalSessionDTO,
            );
            if (success) return response.status(HttpStatus.OK).json({ success: true, redirect });
        } catch (error: any) {
            return response.status(HttpStatus.BAD_REQUEST).json({ success: false, message: error.message });
        }
    }

    // https://github.com/stripe/stripe-cli
    // https://dashboard.stripe.com/webhooks
    @Post("/webhook")
    @ApiResponse({ status: 200 })
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

                case "payment_intent.created":
                    this.stripeRepository.savePaymentWebhookEventLog(event);
                    break;

                case "checkout.session.completed":
                    this.stripeRepository.saveCheckoutSessionWebhookEventLog(event);
                    break;

                case "checkout.session.expired":
                    this.stripeRepository.saveCheckoutSessionWebhookEventLog(event);
                    break;

                case "balance.available":
                    this.stripeRepository.savePaymentWebhookEventLog(event);
                    break;

                case "billing_portal.session.created":
                    this.stripeRepository.saveBillingPortalSessionWebhookEventLog(event);
                    break;

                case "account.updated":
                    this.stripeRepository.saveCustomerWebhookEventLog(event);
                    break;

                default:
                    TelegramLog.error(event.type);
            }

            return response.json({ received: true });
        } catch (error) {
            return response.json({ received: false });
        }
    }
}

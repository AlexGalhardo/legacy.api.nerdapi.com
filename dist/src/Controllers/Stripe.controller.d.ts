import { Response } from "express";
import { StripeRepositoryPort } from "src/Repositories/Stripe.repository";
import { StripeCreateCheckoutSessionDTO, StripeCreateCheckoutSessionUseCasePort } from "src/UseCases/StripeCreateCheckoutSession.useCase";
import { StripeCreatePortalSessionUseCasePort } from "src/UseCases/StripeCreatePortalSession.useCase";
import { StripeWebhookChargeSucceededUseCasePort } from "src/UseCases/StripeWebhookChargeSucceeded.useCase";
import { StripeWebhookInvoiceFinalizedUseCasePort } from "src/UseCases/StripeWebhookInvoiceFinalized.useCase";
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
    createCheckoutSession(stripeCreateCheckoutSessionDTO: StripeCreateCheckoutSessionDTO, response: Response): Promise<Response<StripeUseCaseResponse>>;
    createPortalSession(stripeCreatePortalSessionDTO: StripeCreatePortalSessionDTO, response: Response): Promise<Response<StripeUseCaseResponse>>;
    webhook(event: StripeWebhookEventDTO, response: Response): Promise<Response<{
        received: boolean;
    }>>;
}
export declare class StripeController implements StripeControllerPort {
    private readonly stripeRepository;
    private readonly stripeCreateCheckoutSessionUseCase;
    private readonly stripeCreatePortalSessionUseCase;
    private readonly stripeWebhookChargeSucceededUseCase;
    private readonly stripeWebhookInvoiceFinalizedUseCase;
    constructor(stripeRepository: StripeRepositoryPort, stripeCreateCheckoutSessionUseCase: StripeCreateCheckoutSessionUseCasePort, stripeCreatePortalSessionUseCase: StripeCreatePortalSessionUseCasePort, stripeWebhookChargeSucceededUseCase: StripeWebhookChargeSucceededUseCasePort, stripeWebhookInvoiceFinalizedUseCase: StripeWebhookInvoiceFinalizedUseCasePort);
    createCheckoutSession(stripeCreateCheckoutSessionDTO: StripeCreateCheckoutSessionDTO, response: Response): Promise<Response<StripeUseCaseResponse>>;
    createPortalSession(stripeCreatePortalSessionDTO: StripeCreatePortalSessionDTO, response: Response): Promise<Response<StripeUseCaseResponse>>;
    webhook(event: StripeWebhookEventDTO, response: Response): Promise<Response<{
        received: boolean;
    }>>;
}
export {};

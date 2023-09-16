"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeController = void 0;
const common_1 = require("@nestjs/common");
const TelegramBOTLogger_1 = require("../Utils/TelegramBOTLogger");
let StripeController = class StripeController {
    constructor(stripeRepository, stripeCreateCheckoutSessionUseCase, stripeCreatePortalSessionUseCase, stripeWebhookChargeSucceededUseCase, stripeWebhookInvoiceFinalizedUseCase) {
        this.stripeRepository = stripeRepository;
        this.stripeCreateCheckoutSessionUseCase = stripeCreateCheckoutSessionUseCase;
        this.stripeCreatePortalSessionUseCase = stripeCreatePortalSessionUseCase;
        this.stripeWebhookChargeSucceededUseCase = stripeWebhookChargeSucceededUseCase;
        this.stripeWebhookInvoiceFinalizedUseCase = stripeWebhookInvoiceFinalizedUseCase;
    }
    async createCheckoutSession(stripeCreateCheckoutSessionDTO, response) {
        try {
            const { success, redirect } = await this.stripeCreateCheckoutSessionUseCase.execute(response.locals.jwt_token, stripeCreateCheckoutSessionDTO);
            if (success)
                return response.status(common_1.HttpStatus.OK).json({ success: true, redirect });
        }
        catch (error) {
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({ success: false, message: error.message });
        }
    }
    async createPortalSession(stripeCreatePortalSessionDTO, response) {
        try {
            const { success, redirect } = await this.stripeCreatePortalSessionUseCase.execute(response.locals.jwt_token, stripeCreatePortalSessionDTO);
            if (success)
                return response.status(common_1.HttpStatus.OK).json({ success: true, redirect });
        }
        catch (error) {
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({ success: false, message: error.message });
        }
    }
    async webhook(event, response) {
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
                    TelegramBOTLogger_1.default.logError(event.type);
            }
            return response.json({ received: true });
        }
        catch (error) {
            return response.json({ received: false });
        }
    }
};
exports.StripeController = StripeController;
__decorate([
    (0, common_1.Post)("/create-checkout-session"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], StripeController.prototype, "createCheckoutSession", null);
__decorate([
    (0, common_1.Post)("/create-portal-session"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], StripeController.prototype, "createPortalSession", null);
__decorate([
    (0, common_1.Post)("/webhook"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], StripeController.prototype, "webhook", null);
exports.StripeController = StripeController = __decorate([
    (0, common_1.Controller)("stripe"),
    __param(0, (0, common_1.Inject)("StripeRepositoryPort")),
    __param(1, (0, common_1.Inject)("StripeCreateCheckoutSessionUseCasePort")),
    __param(2, (0, common_1.Inject)("StripeCreatePortalSessionUseCasePort")),
    __param(3, (0, common_1.Inject)("StripeWebhookChargeSucceededUseCasePort")),
    __param(4, (0, common_1.Inject)("StripeWebhookInvoiceFinalizedUseCasePort")),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
], StripeController);
//# sourceMappingURL=Stripe.controller.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeModule = void 0;
const common_1 = require("@nestjs/common");
const Stripe_controller_1 = require("../Controllers/Stripe.controller");
const Stripe_repository_1 = require("../Repositories/Stripe.repository");
const Users_repository_1 = require("../Repositories/Users.repository");
const StripeCreateCheckoutSession_useCase_1 = require("../UseCases/StripeCreateCheckoutSession.useCase");
const StripeCreatePortalSession_useCase_1 = require("../UseCases/StripeCreatePortalSession.useCase");
const StripeWebhookChargeSucceeded_useCase_1 = require("../UseCases/StripeWebhookChargeSucceeded.useCase");
const StripeWebhookInvoiceFinalized_useCase_1 = require("../UseCases/StripeWebhookInvoiceFinalized.useCase");
const Database_1 = require("../Utils/Database");
let StripeModule = class StripeModule {
};
exports.StripeModule = StripeModule;
exports.StripeModule = StripeModule = __decorate([
    (0, common_1.Module)({
        controllers: [Stripe_controller_1.StripeController],
        providers: [
            Database_1.Database,
            {
                provide: "StripeRepositoryPort",
                inject: [],
                useFactory: () => {
                    return new Stripe_repository_1.default();
                },
            },
            {
                provide: "UsersRepositoryPort",
                inject: [Database_1.Database],
                useFactory: (database) => {
                    return new Users_repository_1.default(undefined, database);
                },
            },
            {
                provide: "StripeCreateCheckoutSessionUseCasePort",
                inject: ["UsersRepositoryPort"],
                useFactory: (usersRepository) => {
                    return new StripeCreateCheckoutSession_useCase_1.default(usersRepository);
                },
            },
            {
                provide: "StripeCreatePortalSessionUseCasePort",
                inject: ["UsersRepositoryPort"],
                useFactory: (usersRepository) => {
                    return new StripeCreatePortalSession_useCase_1.default(usersRepository);
                },
            },
            {
                provide: "StripeWebhookChargeSucceededUseCasePort",
                inject: ["StripeRepositoryPort", "UsersRepositoryPort"],
                useFactory: (stripeRepository, usersRepository) => {
                    return new StripeWebhookChargeSucceeded_useCase_1.default(stripeRepository, usersRepository);
                },
            },
            {
                provide: "StripeWebhookInvoiceFinalizedUseCasePort",
                inject: ["StripeRepositoryPort", "UsersRepositoryPort"],
                useFactory: (stripeRepository, usersRepository) => {
                    return new StripeWebhookInvoiceFinalized_useCase_1.default(stripeRepository, usersRepository);
                },
            },
        ],
    })
], StripeModule);
//# sourceMappingURL=Stripe.module.js.map
import { Module } from "@nestjs/common";
import { StripeController } from "src/Controllers/Stripe.controller";
import StripeRepository, { StripeRepositoryPort } from "src/Repositories/Stripe.repository";
import UsersRepository, { UsersRepositoryPort } from "src/Repositories/Users.repository";
import StripeCreateCheckoutSessionUseCase from "src/UseCases/StripeCreateCheckoutSession.useCase";
import StripeCreatePortalSessionUseCase from "src/UseCases/StripeCreatePortalSession.useCase";
import StripeWebhookChargeSucceededUseCase from "src/UseCases/StripeWebhookChargeSucceeded.useCase";
import StripeWebhookInvoiceFinalizedUseCase from "src/UseCases/StripeWebhookInvoiceFinalized.useCase";

@Module({
    controllers: [StripeController],
    providers: [
        {
            inject: [],
            provide: "StripeRepositoryPort",
            useFactory: () => {
                return new StripeRepository();
            },
        },
        {
            inject: [],
            provide: "UsersRepositoryPort",
            useFactory: () => {
                return new UsersRepository();
            },
        },
        {
            provide: "StripeCreateCheckoutSessionUseCasePort",
            inject: ["UsersRepositoryPort"],
            useFactory: (usersRepository: UsersRepositoryPort) => {
                return new StripeCreateCheckoutSessionUseCase(usersRepository);
            },
        },
        {
            provide: "StripeCreatePortalSessionUseCasePort",
            inject: ["UsersRepositoryPort"],
            useFactory: (usersRepository: UsersRepositoryPort) => {
                return new StripeCreatePortalSessionUseCase(usersRepository);
            },
        },
        {
            provide: "StripeWebhookChargeSucceededUseCasePort",
            inject: ["StripeRepositoryPort", "UsersRepositoryPort"],
            useFactory: (stripeRepository: StripeRepositoryPort, usersRepository: UsersRepositoryPort) => {
                return new StripeWebhookChargeSucceededUseCase(stripeRepository, usersRepository);
            },
        },
        {
            provide: "StripeWebhookInvoiceFinalizedUseCasePort",
            inject: ["StripeRepositoryPort", "UsersRepositoryPort"],
            useFactory: (stripeRepository: StripeRepositoryPort, usersRepository: UsersRepositoryPort) => {
                return new StripeWebhookInvoiceFinalizedUseCase(stripeRepository, usersRepository);
            },
        },
    ],
})
export class StripeModule {}

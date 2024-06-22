import { Module } from "@nestjs/common";
import { StripeController } from "src/controllers/stripe.controller";
import StripeRepository, { StripeRepositoryPort } from "src/repositories/stripe.repository";
import UsersRepository, { UsersRepositoryPort } from "src/repositories/users.repository";
import StripeCreateCheckoutSessionUseCase from "src/use-cases/stripe-create-checkout-session.use-case";
import StripeCreatePortalSessionUseCase from "src/use-cases/stripe-create-portal-session.use-case";
import StripeWebhookChargeSucceededUseCase from "src/use-cases/stripe-webhook-charge-succeeded.use-case";
import StripeWebhookInvoiceFinalizedUseCase from "src/use-cases/stripe-webhook-invoice-finalized.use-case";
import { Database } from "src/config/database.config";

@Module({
    controllers: [StripeController],
    providers: [
        Database,
        {
            provide: "StripeRepositoryPort",
            inject: [Database],
            useFactory: (database: Database) => {
                return new StripeRepository(undefined, undefined, undefined, undefined, undefined, undefined, database);
            },
        },
        {
            provide: "UsersRepositoryPort",
            inject: [Database],
            useFactory: (database: Database) => {
                return new UsersRepository(undefined, database);
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

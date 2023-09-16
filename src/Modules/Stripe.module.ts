import { Module } from "@nestjs/common";
import { StripeController } from "src/Controllers/Stripe.controller";
import StripeRepository, { StripeRepositoryPort } from "src/Repositories/Stripe.repository";
import UsersRepository, { UsersRepositoryPort } from "src/Repositories/Users.repository";
import StripeCreateCheckoutSessionUseCase from "src/UseCases/StripeCreateCheckoutSession.useCase";
import StripeCreatePortalSessionUseCase from "src/UseCases/StripeCreatePortalSession.useCase";
import StripeWebhookChargeSucceededUseCase from "src/UseCases/StripeWebhookChargeSucceeded.useCase";
import StripeWebhookInvoiceFinalizedUseCase from "src/UseCases/StripeWebhookInvoiceFinalized.useCase";
import { Database } from "src/Utils/Database";

@Module({
    controllers: [StripeController],
    providers: [
		Database,
        {
            provide: "StripeRepositoryPort",
			inject: [],
            useFactory: () => {
                return new StripeRepository();
            },
        },
        {
            provide: "UsersRepositoryPort",
			inject: [Database],
            useFactory: (database: Database) => {
                return new UsersRepository(null, database);
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

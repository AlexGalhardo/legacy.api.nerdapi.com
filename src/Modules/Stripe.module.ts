import { Module } from "@nestjs/common";
import { StripeController } from "src/Controllers/Stripe.controller";
import StripeRepository from "src/Repositories/Stripe.repository";
import UsersRepository, { UsersRepositoryPort } from "src/Repositories/Users.repository";
import StripeCreateCheckoutSessionUseCase from "src/UseCases/StripeCreateCheckoutSession.useCase";
import StripeCreatePortalSessionUseCase from "src/UseCases/StripeCreatePortalSession.useCase";

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
    ],
})
export class StripeModule {}

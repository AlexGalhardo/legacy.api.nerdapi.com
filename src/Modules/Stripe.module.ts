import { Module } from "@nestjs/common";
import { StripeController } from "src/Controllers/Stripe.controller";
import StripeRepository from "src/Repositories/Stripe.repository";

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
	]
})
export class StripeModule {}

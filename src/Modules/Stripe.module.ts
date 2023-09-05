import { Module } from "@nestjs/common";
import { StripeController } from "src/Controllers/Stripe.controller";

@Module({
    controllers: [StripeController],
    providers: [],
})
export class StripeModule {}

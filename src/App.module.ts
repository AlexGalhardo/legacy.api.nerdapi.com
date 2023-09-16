import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { AuthModule } from "./Modules/Auth.module";
import { ProfileModule } from "./Modules/Profile.module";
import { ContactModule } from "./Modules/Contact.module";
import { StripeModule } from "./Modules/Stripe.module";
import { HealthCheckModule } from "./Modules/HealthCheck.module";
import { ConfigModule } from "@nestjs/config";
import { ValidateToken } from "./MIddlewares/ValidateToken.middleware";
import { GamesModule } from "./Modules/Games.module";

@Module({
    imports: [
        HealthCheckModule,
        AuthModule,
        ProfileModule,
        ContactModule,
        StripeModule,
        GamesModule,
        ConfigModule.forRoot({ isGlobal: true }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(ValidateToken)
            .forRoutes(
                { path: "/check-user-jwt-token", method: RequestMethod.POST },
                { path: "/logout", method: RequestMethod.POST },
                { path: "/profile", method: RequestMethod.PUT },
                { path: "/stripe/create-checkout-session", method: RequestMethod.POST },
                { path: "/stripe/create-portal-session", method: RequestMethod.POST },
            );
    }
}

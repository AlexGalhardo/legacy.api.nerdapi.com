import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { AuthModule } from "./Modules/Auth.module";
import UserRepository from "./Repositories/Users.repository";
import { ProfileModule } from "./Modules/Profile.module";
import { ContactModule } from "./Modules/Contact.module";
import { StripeModule } from "./Modules/Stripe.module";
import { HealthCheckModule } from "./Modules/HealthCheck.module";
import { ConfigModule } from "@nestjs/config";
import { ValidateToken } from "./MIddlewares/ValidateToken.middleware";

@Module({
    imports: [
        HealthCheckModule,
        AuthModule,
        ProfileModule,
        ContactModule,
        StripeModule,
        ConfigModule.forRoot({ isGlobal: true }),
    ],
    controllers: [],
    providers: [
        UserRepository,
        {
            provide: "UserRepositoryPort",
            useClass: UserRepository,
        },
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(ValidateToken).forRoutes(
			{ path: '/tokenUser', method: RequestMethod.GET },
			{ path: '/logout', method: RequestMethod.POST },
			{ path: '/profile', method: RequestMethod.PUT }
		);
    }
}

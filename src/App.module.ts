import { Module } from "@nestjs/common";
import { AuthModule } from './Modules/Auth.module'
import UserRepository from "./Repositories/Users.repository";
import { ProfileModule } from "./Modules/Profile.module";
import { ContactModule } from "./Modules/Contact.module";
import { StripeModule } from "./Modules/Stripe.module";
import { HealthCheckModule } from "./Modules/HealthCheck.module";
import { ConfigModule } from "@nestjs/config";

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
            provide: 'UserRepositoryPort',
            useClass: UserRepository,
        },
	],
})

export class AppModule {}

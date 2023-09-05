import { Module } from "@nestjs/common";
import { AuthController } from "./Controllers/Auth.controller";
import { AuthModule } from './Modules/Auth.module'
import UserRepository from "./Repositories/Users.repository";
import { ProfileModule } from "./Modules/Profile.module";
import { ContactModule } from "./Modules/Contact.module";
import { StripeModule } from "./Modules/Stripe.module";

@Module({
    imports: [
		AuthModule,
		ProfileModule,
		ContactModule,
		StripeModule,
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

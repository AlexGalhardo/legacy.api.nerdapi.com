import { Module } from "@nestjs/common";
import { AuthController } from "./Controllers/Auth.controller";
import { AuthModule } from './Modules/Auth.module'
import UserRepository from "./Repositories/Users.repository";

@Module({
    imports: [
		AuthModule,
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

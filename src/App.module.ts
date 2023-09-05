import { Module } from "@nestjs/common";
import { AuthController } from "./Controllers/Auth.controller";
import { AuthModule } from './Modules/Auth.module'

@Module({
    imports: [
		AuthModule,
	],
    controllers: [AuthController],
    providers: [],
})

export class AppModule {}

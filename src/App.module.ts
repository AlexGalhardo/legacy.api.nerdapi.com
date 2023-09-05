import { Module } from "@nestjs/common";
import { AuthController } from "./Controllers/Auth.controller";
import { UserModule } from './Modules/User.module'

@Module({
    imports: [
		UserModule,
	],
    controllers: [AuthController],
    providers: [AppService],
})
export class AppModule {}

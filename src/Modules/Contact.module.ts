import { Module } from '@nestjs/common'
import { ContactController } from "src/Controllers/Contact.controller";
import SendContactMessageUseCase from "src/UseCases/SendContactMessage.useCase";

@Module({
    controllers: [ContactController],
    providers: [
		{
            provide: 'SendContactMessageUseCasePort',
            inject: [],
            useFactory: () => {
                return new SendContactMessageUseCase()
            },
        }
	],
})

export class ContactModule {}
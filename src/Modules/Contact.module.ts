import { Module } from "@nestjs/common";
import { ContactController } from "src/Controllers/Contact.controller";
import ContactSendMessageUseCase from "src/UseCases/ContactSendMessage.useCase";

@Module({
    controllers: [ContactController],
    providers: [
        {
            provide: "ContactSendMessageUseCasePort",
            inject: [],
            useFactory: () => {
                return new ContactSendMessageUseCase();
            },
        },
    ],
})
export class ContactModule {}

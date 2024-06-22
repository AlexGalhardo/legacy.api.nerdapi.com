import { Module } from "@nestjs/common";
import { ContactController } from "src/controllers/contact.controller";
import ContactSendMessageUseCase from "src/use-cases/contact-send-message.use-case";

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

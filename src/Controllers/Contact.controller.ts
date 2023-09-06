import { Controller, Post, Res, Body, Inject, HttpStatus } from "@nestjs/common";
import { Response } from "express";
import { ContactDTO, ContactSendMessageUseCasePort } from "src/UseCases/ContactSendMessage.useCase";

interface ContactControllerPort {}

@Controller()
export class ContactController implements ContactControllerPort {
    constructor(
        @Inject("ContactSendMessageUseCasePort")
        private readonly contactSendMessageUseCase: ContactSendMessageUseCasePort,
    ) {}

    @Post("/contact")
    async login(@Body() contactDTO: ContactDTO, @Res() response: Response) {
        try {
            const { success } = await this.contactSendMessageUseCase.execute(contactDTO);
            if (success) return response.status(HttpStatus.OK).json({ success: true });
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

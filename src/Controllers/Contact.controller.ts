import { Controller, Post, Res, Body, Inject, HttpStatus } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { Contact } from "src/Entities/contact.entity";
import { ContactSendMessageDTO, ContactSendMessageUseCasePort } from "src/UseCases/ContactSendMessage.useCase";

interface ContactUseCaseResponse {
    success: boolean;
    message?: string;
}
interface ContactControllerPort {
    contactSendMessage(
        contactSendMessageDTO: ContactSendMessageDTO,
        response: Response,
    ): Promise<Response<ContactUseCaseResponse>>;
}

@Controller()
@ApiTags("contact")
export class ContactController implements ContactControllerPort {
    constructor(
        @Inject("ContactSendMessageUseCasePort")
        private readonly contactSendMessageUseCase: ContactSendMessageUseCasePort,
    ) {}

    @Post("/contact")
    @ApiResponse({ status: 200, type: Contact })
    async contactSendMessage(
        @Body() contactSendMessageDTO: ContactSendMessageDTO,
        @Res() response: Response,
    ): Promise<Response<ContactUseCaseResponse>> {
        try {
            const { success } = await this.contactSendMessageUseCase.execute(contactSendMessageDTO);
            if (success) return response.status(HttpStatus.OK).json({ success: true });
        } catch (error) {
            return response.status(HttpStatus.BAD_REQUEST).json({ success: false, message: error.message });
        }
    }
}

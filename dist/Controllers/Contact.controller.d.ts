import { Response } from "express";
import { ContactSendMessageDTO, ContactSendMessageUseCasePort } from "src/UseCases/ContactSendMessage.useCase";
interface ContactUseCaseResponse {
    success: boolean;
    message?: string;
}
interface ContactControllerPort {
    contactSendMessage(contactSendMessageDTO: ContactSendMessageDTO, response: Response): Promise<Response<ContactUseCaseResponse>>;
}
export declare class ContactController implements ContactControllerPort {
    private readonly contactSendMessageUseCase;
    constructor(contactSendMessageUseCase: ContactSendMessageUseCasePort);
    contactSendMessage(contactSendMessageDTO: ContactSendMessageDTO, response: Response): Promise<Response<ContactUseCaseResponse>>;
}
export {};

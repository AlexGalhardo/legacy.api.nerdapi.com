import { Controller, Post, Res, Body, Inject, HttpStatus } from "@nestjs/common";
import { Response } from "express";
import { ContactDTO, SendContactMessageUseCasePort } from "src/UseCases/SendContactMessage.useCase";

interface ContactControllerPort {}

@Controller()
export class ContactController implements ContactControllerPort {
    constructor(
        @Inject("SendContactMessageUseCasePort")
        private readonly sendContactMessageUseCase: SendContactMessageUseCasePort,
    ) {}

    @Post("/contact")
    async login(@Body() contactDTO: ContactDTO, @Res() response: Response) {
        try {
            const { success } = await this.sendContactMessageUseCase.execute(contactDTO);
            if (success) return response.status(HttpStatus.OK).json({ success: true });
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

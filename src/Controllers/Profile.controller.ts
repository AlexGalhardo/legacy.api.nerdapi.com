import { Body, Controller, HttpStatus, Inject, Put, Res } from "@nestjs/common";
import { Response } from "express";
import { ProfileUpdateDTO, ProfileUpdateUseCasePort } from "src/UseCases/ProfileUpdate.useCase";

interface ProfileUseCaseResponse {
    success: boolean;
    data?: any;
}

interface ProfileControllerPort {
    login(profileUpdateDTO: ProfileUpdateDTO, response: Response): Promise<Response<ProfileUseCaseResponse>>;
}

@Controller()
export class ProfileController implements ProfileControllerPort {
    constructor(@Inject("ProfileUpdateUseCasePort") private readonly profileUpdateUseCase: ProfileUpdateUseCasePort) {}

    @Put("/profile")
    async login(
        @Body() profileUpdateDTO: ProfileUpdateDTO,
        @Res() response: Response,
    ): Promise<Response<ProfileUseCaseResponse>> {
        try {
            const userJWTToken = response.locals.token;
            const { success, data } = await this.profileUpdateUseCase.execute(userJWTToken, profileUpdateDTO);
            if (success) return response.status(HttpStatus.OK).json({ success: true, data });
        } catch (error) {
            return response.status(HttpStatus.BAD_REQUEST).json({ success: false, message: error.message });
        }
    }
}

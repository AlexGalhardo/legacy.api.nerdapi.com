import { Body, Controller, HttpStatus, Inject, Put, Res } from "@nestjs/common";
import { Response } from "express";
import { ProfileUpdateUseCasePort } from "src/use-cases/profile-update.use-case";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ProfileUpdateDTO } from "src/dtos/profile-update.dto";
import { Profile } from "src/entities/profile.entity";

interface ProfileUseCaseResponse {
    success: boolean;
    data?: any;
}

interface ProfileControllerPort {
    update(profileUpdateDTO: ProfileUpdateDTO, response: Response): Promise<Response<ProfileUseCaseResponse>>;
}

@ApiBearerAuth()
@ApiTags("profile")
@Controller("profile")
export class ProfileController implements ProfileControllerPort {
    constructor(@Inject("ProfileUpdateUseCasePort") private readonly profileUpdateUseCase: ProfileUpdateUseCasePort) {}

    @Put("/")
    @ApiResponse({ status: 200, type: Profile })
    async update(
        @Body() profileUpdateDTO: ProfileUpdateDTO,
        @Res() response: Response,
    ): Promise<Response<ProfileUseCaseResponse>> {
        try {
            const userJWTToken = response.locals.token;
            const { success, data } = await this.profileUpdateUseCase.execute(userJWTToken, profileUpdateDTO);
            if (success) return response.status(HttpStatus.OK).json({ success: true, data });
        } catch (error: any) {
            return response.status(HttpStatus.BAD_REQUEST).json({ success: false, message: error.message });
        }
    }
}

import { Body, Controller, HttpStatus, Inject, Put, Res } from "@nestjs/common";
import { Response } from "express";
import { ProfileUpdateUseCasePort } from "src/UseCases/ProfileUpdate.useCase";
import {
	ApiBearerAuth,
	ApiOperation,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger';
import { ProfileUpdateDTO } from "src/DTOs/profile-update.dto";
import { Profile } from "src/Entities/profile.entity";

interface ProfileUseCaseResponse {
    success: boolean;
    data?: any;
}

interface ProfileControllerPort {
    update(profileUpdateDTO: ProfileUpdateDTO, response: Response): Promise<Response<ProfileUseCaseResponse>>;
}

@ApiBearerAuth()
@ApiTags('profile')
@Controller('profile')
export class ProfileController implements ProfileControllerPort {
    constructor(@Inject("ProfileUpdateUseCasePort") private readonly profileUpdateUseCase: ProfileUpdateUseCasePort) {}

    @Put("/")
	@ApiOperation({ summary: 'UPDATE PROFILE' })
	@ApiResponse({ status: 200, description: 'Profile updated!', type: Profile  })
	async update(
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

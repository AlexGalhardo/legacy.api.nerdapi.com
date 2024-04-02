import { Response } from "express";
import { ProfileUpdateUseCasePort } from "src/UseCases/ProfileUpdate.useCase";
import { ProfileUpdateDTO } from "src/DTOs/profile-update.dto";
interface ProfileUseCaseResponse {
    success: boolean;
    data?: any;
}
interface ProfileControllerPort {
    update(profileUpdateDTO: ProfileUpdateDTO, response: Response): Promise<Response<ProfileUseCaseResponse>>;
}
export declare class ProfileController implements ProfileControllerPort {
    private readonly profileUpdateUseCase;
    constructor(profileUpdateUseCase: ProfileUpdateUseCasePort);
    update(profileUpdateDTO: ProfileUpdateDTO, response: Response): Promise<Response<ProfileUseCaseResponse>>;
}
export {};

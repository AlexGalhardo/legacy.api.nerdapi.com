import { Response } from "express";
import { ProfileUpdateDTO, ProfileUpdateUseCasePort } from "src/UseCases/ProfileUpdate.useCase";
interface ProfileUseCaseResponse {
    success: boolean;
    data?: any;
}
interface ProfileControllerPort {
    login(profileUpdateDTO: ProfileUpdateDTO, response: Response): Promise<Response<ProfileUseCaseResponse>>;
}
export declare class ProfileController implements ProfileControllerPort {
    private readonly profileUpdateUseCase;
    constructor(profileUpdateUseCase: ProfileUpdateUseCasePort);
    login(profileUpdateDTO: ProfileUpdateDTO, response: Response): Promise<Response<ProfileUseCaseResponse>>;
}
export {};

import { UsersRepositoryPort, UserUpdated } from "src/Repositories/Users.repository";
import { ProfileUpdateDTO } from "src/DTOs/profile-update.dto";
interface ProfileUpdateUseCaseResponse {
    success: boolean;
    data?: UserUpdated;
}
export interface ProfileUpdateUseCasePort {
    execute(jwtToken: string, profileUpdateDTO: ProfileUpdateDTO): Promise<ProfileUpdateUseCaseResponse>;
}
export default class ProfileUpdateUseCase implements ProfileUpdateUseCasePort {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepositoryPort);
    execute(jwtToken: string, profileUpdateDTO: ProfileUpdateDTO): Promise<ProfileUpdateUseCaseResponse>;
}
export {};

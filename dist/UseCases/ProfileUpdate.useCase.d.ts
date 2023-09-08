import { UsersRepositoryPort, UserUpdated } from "src/Repositories/Users.repository";
interface ProfileUpdateUseCaseResponse {
    success: boolean;
    data?: UserUpdated;
}
export interface ProfileUpdateUseCasePort {
    execute(jwtToken: string, profileUpdateDTO: ProfileUpdateDTO): Promise<ProfileUpdateUseCaseResponse>;
}
export interface ProfileUpdateDTO {
    username: string | null;
    telegramNumber: string | null;
    olderPassword: string | null;
    newPassword: string | null;
}
export default class ProfileUpdateUseCase implements ProfileUpdateUseCasePort {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepositoryPort);
    execute(jwtToken: string, profileUpdateDTO: ProfileUpdateDTO): Promise<ProfileUpdateUseCaseResponse>;
}
export {};

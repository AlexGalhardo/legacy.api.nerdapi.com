import { UsersRepositoryPort } from "src/Repositories/Users.repository";
export interface CheckResetPasswordTokenDTO {
    resetPasswordToken: string;
}
export interface AuthCheckResetPasswordTokenUseCasePort {
    execute(resetPasswordToken: string): Promise<AuthCheckResetPasswordTokenUseCaseResponse>;
}
interface AuthCheckResetPasswordTokenUseCaseResponse {
    success: boolean;
}
export default class AuthCheckResetPasswordTokenUseCase implements AuthCheckResetPasswordTokenUseCasePort {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepositoryPort);
    execute(resetPasswordToken: string): Promise<AuthCheckResetPasswordTokenUseCaseResponse>;
}
export {};

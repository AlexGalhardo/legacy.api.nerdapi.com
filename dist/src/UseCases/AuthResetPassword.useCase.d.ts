import { UsersRepositoryPort } from "src/Repositories/Users.repository";
export interface AuthResetPasswordUseCasePort {
    execute(resetPasswordToken: string, authResetPasswordDTO: AuthResetPasswordDTO): Promise<AuthResetPasswordUseCaseResponse>;
}
export interface AuthResetPasswordDTO {
    newPassword: string;
    confirmNewPassword: string;
}
interface AuthResetPasswordUseCaseResponse {
    success: boolean;
}
export default class AuthResetPasswordUseCase implements AuthResetPasswordUseCasePort {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepositoryPort);
    execute(resetPasswordToken: string, authResetPasswordDTO: AuthResetPasswordDTO): Promise<AuthResetPasswordUseCaseResponse>;
}
export {};

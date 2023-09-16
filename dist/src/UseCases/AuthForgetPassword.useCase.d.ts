import "dotenv/config";
import { UsersRepositoryPort } from "src/Repositories/Users.repository";
export interface AuthForgetPasswordUseCasePort {
    execute(authForgetPasswordDTO: AuthForgetPasswordDTO): Promise<AuthForgetPasswordUseCaseResponse>;
}
export interface AuthForgetPasswordDTO {
    email: string;
}
interface AuthForgetPasswordUseCaseResponse {
    success: boolean;
    reset_password_token?: string;
}
export default class AuthForgetPasswordUseCase implements AuthForgetPasswordUseCasePort {
    private readonly usersRepository;
    private readonly smtp;
    constructor(usersRepository: UsersRepositoryPort, smtp?: import("nodemailer").Transporter<import("nodemailer/lib/smtp-transport").SentMessageInfo>);
    execute(authForgetPasswordDTO: AuthForgetPasswordDTO): Promise<AuthForgetPasswordUseCaseResponse>;
}
export {};

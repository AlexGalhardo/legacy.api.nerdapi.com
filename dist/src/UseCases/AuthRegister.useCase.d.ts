import "dotenv/config";
import { UsersRepositoryPort } from "src/Repositories/Users.repository";
interface AuthRegisterUseCaseResponse {
    success: boolean;
    jwt_token?: string;
}
export interface AuthRegisterDTO {
    username: string;
    email: string;
    telegramNumber: string | null;
    password: string;
}
export declare enum SubscriptionName {
    NOOB = "NOOB",
    CASUAL = "CASUAL",
    PRO = "PRO"
}
export interface AuthRegisterUseCasePort {
    execute(authRegisterDTO: AuthRegisterDTO): Promise<AuthRegisterUseCaseResponse>;
}
export default class AuthRegisterUseCase implements AuthRegisterUseCasePort {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepositoryPort);
    execute(authRegisterDTO: AuthRegisterDTO): Promise<AuthRegisterUseCaseResponse>;
}
export {};

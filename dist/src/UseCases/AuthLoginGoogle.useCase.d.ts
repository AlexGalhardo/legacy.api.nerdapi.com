import { UsersRepositoryPort } from "src/Repositories/Users.repository";
import { Request } from "express";
export interface AuthLoginGoogleUseCasePort {
    execute(request: Request): Promise<AuthLoginGoogleUseCaseResponse>;
}
export interface AuthLoginDTO {
    email: string;
    password: string;
}
interface AuthLoginGoogleUseCaseResponse {
    success: boolean;
    redirect: string;
    jwt_token?: string;
}
export default class AuthLoginGoogleUseCase implements AuthLoginGoogleUseCasePort {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepositoryPort);
    execute(request: Request): Promise<AuthLoginGoogleUseCaseResponse>;
}
export {};

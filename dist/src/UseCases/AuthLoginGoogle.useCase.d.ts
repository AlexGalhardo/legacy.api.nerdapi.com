import { UsersRepositoryPort } from "src/Repositories/Users.repository";
export interface AuthLoginGoogleUseCasePort {
    execute(idToken: string): Promise<AuthLoginGoogleUseCaseResponse>;
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
    execute(idToken: string): Promise<AuthLoginGoogleUseCaseResponse>;
}
export {};

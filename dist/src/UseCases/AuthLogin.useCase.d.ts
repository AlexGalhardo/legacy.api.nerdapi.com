import { UsersRepositoryPort } from "src/Repositories/Users.repository";
export interface AuthLoginUseCasePort {
    execute(authLoginDTO: AuthLoginDTO): Promise<UserLoginUseCaseResponse>;
}
export interface AuthLoginDTO {
    email: string;
    password: string;
}
interface UserLoginUseCaseResponse {
    success: boolean;
    jwt_token?: string;
    message?: string;
}
export default class AuthLoginUseCase implements AuthLoginUseCasePort {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepositoryPort);
    execute(authLoginPayload: AuthLoginDTO): Promise<UserLoginUseCaseResponse>;
}
export {};

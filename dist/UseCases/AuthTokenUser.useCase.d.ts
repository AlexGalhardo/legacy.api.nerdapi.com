import { User, UsersRepositoryPort } from "src/Repositories/Users.repository";
export interface AuthTokenUserUseCasePort {
    execute(token: string): Promise<AuthTokenUserUseCaseResponse>;
}
interface AuthTokenUserUseCaseResponse {
    success: boolean;
    data: User;
}
export default class AuthTokenUserUseCase implements AuthTokenUserUseCasePort {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepositoryPort);
    execute(token: string): Promise<AuthTokenUserUseCaseResponse>;
}
export {};

import { User, UsersRepositoryPort } from "src/Repositories/Users.repository";
export interface AuthCheckUserJWTTokenUseCasePort {
    execute(token: string): Promise<AuthCheckUserJWTTokenUseCaseResponse>;
}
interface AuthCheckUserJWTTokenUseCaseResponse {
    success: boolean;
    data: User;
}
export default class AuthCheckUserJWTTokenUseCase implements AuthCheckUserJWTTokenUseCasePort {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepositoryPort);
    execute(token: string): Promise<AuthCheckUserJWTTokenUseCaseResponse>;
}
export {};

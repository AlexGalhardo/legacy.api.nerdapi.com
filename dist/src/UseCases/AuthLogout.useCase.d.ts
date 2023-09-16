import { UsersRepositoryPort } from "src/Repositories/Users.repository";
export interface AuthLogoutUseCasePort {
    execute(jwtToken: string): Promise<AuthLogoutUseCaseResponse>;
}
interface AuthLogoutUseCaseResponse {
    success: boolean;
}
export default class AuthLogoutUseCase implements AuthLogoutUseCasePort {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepositoryPort);
    execute(jwtToken: string): Promise<AuthLogoutUseCaseResponse>;
}
export {};

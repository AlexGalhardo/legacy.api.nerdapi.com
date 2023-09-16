import { UsersRepositoryPort } from "src/Repositories/Users.repository";
interface UserDeleteUseCaseResponse {
    success: boolean;
    jwt_token?: string;
}
export interface UserDeleteUseCasePort {
    execute(email: string): Promise<UserDeleteUseCaseResponse>;
}
export default class UserDeleteUseCase implements UserDeleteUseCasePort {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepositoryPort);
    execute(email: string): Promise<UserDeleteUseCaseResponse>;
}
export {};

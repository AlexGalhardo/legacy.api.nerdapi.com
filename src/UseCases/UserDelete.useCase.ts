import { UsersRepositoryPort } from "src/Repositories/Users.repository";
import { ErrorsMessages } from "src/Utils/ErrorsMessages";
import { ClientException } from "src/Utils/Exception";

interface UserDeleteUseCaseResponse {
    success: boolean;
    jwt_token?: string;
}

export interface UserDeleteUseCasePort {
    execute(email: string): Promise<UserDeleteUseCaseResponse>;
}

export default class UserDeleteUseCase implements UserDeleteUseCasePort {
    constructor(private readonly usersRepository: UsersRepositoryPort) {}

    async execute(email: string): Promise<UserDeleteUseCaseResponse> {
        if (this.usersRepository.findByEmail(email)) {
            await this.usersRepository.deleteByEmail(email);
            return { success: true };
        }

        throw new ClientException(ErrorsMessages.EMAIL_NOT_REGISTRED);
    }
}

import { UsersRepositoryPort } from "src/repositories/users.repository";
import { ErrorsMessages } from "src/utils/errors-messages.util";
import { ClientException } from "src/utils/exceptions.util";

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

import { UserRepositoryPort } from "src/Repositories/Users.repository";
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
    constructor(private readonly userRepository: UserRepositoryPort) {}

    async execute(email: string): Promise<UserDeleteUseCaseResponse> {
        if (this.userRepository.findByEmail(email)) {
            this.userRepository.deleteByEmail(email);
            return { success: true };
        }

        throw new ClientException(ErrorsMessages.EMAIL_NOT_REGISTRED);
    }
}

import { UserRepositoryPort } from "src/Repositories/Users.repository";
import { ErrorsMessages } from "src/Utils/ErrorsMessages";
import { ClientException } from "src/Utils/Exception";

interface DeleteUserUseCaseResponse {
    success: boolean;
    token?: string;
}

export interface DeleteUserUseCasePort {
    execute(email: string): Promise<DeleteUserUseCaseResponse>;
}

export default class DeleteUserUseCase implements DeleteUserUseCasePort {
    constructor(private readonly userRepository: UserRepositoryPort) {}

    async execute(email: string): Promise<DeleteUserUseCaseResponse> {
        if (this.userRepository.findByEmail(email)) {
            this.userRepository.deleteByEmail(email);
            return { success: true };
        }

        throw new ClientException(ErrorsMessages.EMAIL_NOT_REGISTRED);
    }
}

import { UsersRepositoryPort } from "src/repositories/users.repository";
import { ErrorsMessages } from "src/utils/errors-messages.util";
import { ClientException } from "src/utils/exceptions.util";

export interface CheckResetPasswordTokenDTO {
    resetPasswordToken: string;
}

export interface AuthCheckResetPasswordTokenUseCasePort {
    execute(resetPasswordToken: string): Promise<AuthCheckResetPasswordTokenUseCaseResponse>;
}

interface AuthCheckResetPasswordTokenUseCaseResponse {
    success: boolean;
}

export default class AuthCheckResetPasswordTokenUseCase implements AuthCheckResetPasswordTokenUseCasePort {
    constructor(private readonly usersRepository: UsersRepositoryPort) {}

    async execute(resetPasswordToken: string): Promise<AuthCheckResetPasswordTokenUseCaseResponse> {
        const resetPasswordTokenExist = await this.usersRepository.findResetPasswordToken(resetPasswordToken);

        if (resetPasswordTokenExist) return { success: true };

        throw new ClientException(ErrorsMessages.RESET_PASSWORD_TOKEN_INVALID);
    }
}

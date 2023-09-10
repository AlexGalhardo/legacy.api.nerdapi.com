import { UsersRepositoryPort } from "src/Repositories/Users.repository";
import { ErrorsMessages } from "src/Utils/ErrorsMessages";
import { ClientException } from "src/Utils/Exception";

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
        const resetPasswordTokenExist = this.usersRepository.findResetPasswordToken(resetPasswordToken);

        if (resetPasswordTokenExist) return { success: true };

        throw new ClientException(ErrorsMessages.RESET_PASSWORD_TOKEN_INVALID);
    }
}

import { UsersRepositoryPort } from "src/repositories/users.repository";
import { Bcrypt } from "src/utils/bcrypt.util";
import { ErrorsMessages } from "src/utils/errors-messages.util";
import { ClientException } from "src/utils/exceptions.util";
import PasswordValidator from "src/validators/password.validator";

export interface AuthResetPasswordUseCasePort {
    execute(
        resetPasswordToken: string,
        authResetPasswordDTO: AuthResetPasswordDTO,
    ): Promise<AuthResetPasswordUseCaseResponse>;
}

export interface AuthResetPasswordDTO {
    newPassword: string;
    confirmNewPassword: string;
}

interface AuthResetPasswordUseCaseResponse {
    success: boolean;
}

export default class AuthResetPasswordUseCase implements AuthResetPasswordUseCasePort {
    constructor(private readonly usersRepository: UsersRepositoryPort) {}

    async execute(
        resetPasswordToken: string,
        authResetPasswordDTO: AuthResetPasswordDTO,
    ): Promise<AuthResetPasswordUseCaseResponse> {
        const { newPassword, confirmNewPassword } = authResetPasswordDTO;

        if (!PasswordValidator.isEqual(newPassword, confirmNewPassword))
            throw new ClientException(ErrorsMessages.PASSWORDS_NOT_EQUAL);

        const { user } = await this.usersRepository.getByResetPasswordToken(resetPasswordToken);

        if (user) {
            const hashedPassword = await Bcrypt.hash(newPassword);

            await this.usersRepository.resetPassword(user.id, hashedPassword);

            return { success: true };
        }

        throw new ClientException(ErrorsMessages.RESET_PASSWORD_TOKEN_INVALID);
    }
}

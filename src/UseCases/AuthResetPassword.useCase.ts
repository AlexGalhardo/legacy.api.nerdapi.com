import { UsersRepositoryPort } from "src/Repositories/Users.repository";
import { Bcrypt } from "src/Utils/Bcrypt";
import { ErrorsMessages } from "src/Utils/ErrorsMessages";
import { ClientException } from "src/Utils/Exception";
import Validator from "src/Utils/Validator";

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

        if (!Validator.password.isEqual(newPassword, confirmNewPassword))
            throw new ClientException(ErrorsMessages.PASSWORDS_NOT_EQUAL);

        const { user } = this.usersRepository.getByResetPasswordToken(resetPasswordToken);

        if (user) {
            const hashedPassword = await Bcrypt.hash(newPassword);

            this.usersRepository.resetPassword(user.id, hashedPassword);

            return { success: true };
        }

        throw new ClientException(ErrorsMessages.USER_NOT_FOUND);
    }
}

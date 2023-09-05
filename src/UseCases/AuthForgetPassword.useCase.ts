import { UserRepositoryPort } from "src/Repositories/Users.repository";
import { ErrorsMessages } from "src/Utils/ErrorsMessages";
import { ClientException } from "src/Utils/Exception";
import Validator from "src/Utils/Validator";

export interface AuthForgetPasswordUseCasePort {
    execute(authForgetPasswordDTO: AuthForgetPasswordDTO): Promise<AuthForgetPasswordUseCaseResponse>;
}

export interface AuthForgetPasswordDTO {
    email: string;
}

interface AuthForgetPasswordUseCaseResponse {
    success: boolean;
    jwt_token?: string;
}

export default class AuthForgetPasswordUseCase implements AuthForgetPasswordUseCasePort {
    constructor(private readonly usersRepository: UserRepositoryPort) {}

    async execute(authForgetPasswordDTO: AuthForgetPasswordDTO): Promise<AuthForgetPasswordUseCaseResponse> {
        const { email } = authForgetPasswordDTO;

        if (!Validator.email.isValid(email)) throw new ClientException(ErrorsMessages.EMAIL_IS_INVALID);

        const { user, index } = this.usersRepository.getByEmail(email);

        if (user) {
            // enviar email com link de recuperação pro usuário

            return { success: true };
        }

        return { success: false };
    }
}

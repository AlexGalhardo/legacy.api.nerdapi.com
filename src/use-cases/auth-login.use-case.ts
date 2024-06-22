import { UsersRepositoryPort } from "src/repositories/users.repository";
import { Bcrypt } from "src/utils/bcrypt.util";
import { ErrorsMessages } from "src/utils/errors-messages.util";
import { ClientException } from "src/utils/exceptions.util";
import * as jwt from "jsonwebtoken";
import EmailValidator from "src/validators/email.validator";

export interface AuthLoginUseCasePort {
    execute(authLoginDTO: AuthLoginDTO): Promise<UserLoginUseCaseResponse>;
}

export interface AuthLoginDTO {
    email: string;
    password: string;
}

interface UserLoginUseCaseResponse {
    success: boolean;
    jwt_token?: string;
    message?: string;
}

export default class AuthLoginUseCase implements AuthLoginUseCasePort {
    constructor(private readonly usersRepository: UsersRepositoryPort) {}

    async execute(authLoginPayload: AuthLoginDTO): Promise<UserLoginUseCaseResponse> {
        const { email, password } = authLoginPayload;

        if (!EmailValidator.validate(email)) throw new ClientException(ErrorsMessages.EMAIL_IS_INVALID);

        if (email && password) {
            const { user, index } = await this.usersRepository.getByEmail(email);

            if (user) {
                if (!(await Bcrypt.compare(password, user.password))) {
                    return { success: false, message: ErrorsMessages.EMAIL_OR_PASSWORD_INVALID };
                }

                const jwt_token = jwt.sign({ userID: user.id }, process.env.JWT_SECRET);
                user.jwt_token = jwt_token;
                await this.usersRepository.save(user, index);

                return { success: true, jwt_token };
            }

            throw new ClientException(ErrorsMessages.USER_NOT_FOUND);
        }

        throw new ClientException(ErrorsMessages.EMAIL_OR_PASSWORD_INVALID);
    }
}

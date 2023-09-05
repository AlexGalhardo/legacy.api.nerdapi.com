import "dotenv/config";
import { randomUUID } from "crypto";
import { UserRepositoryPort } from "src/Repositories/Users.repository";
import { Bcrypt } from "src/Utils/Bcrypt";
import { ErrorsMessages } from "src/Utils/ErrorsMessages";
import { ClientException } from "src/Utils/Exception";
import Validator from "src/Utils/Validator";
import * as jwt from "jsonwebtoken";

interface AuthRegisterUseCaseResponse {
    success: boolean;
    jwt_token?: string;
}

export interface AuthRegisterDTO {
    username: string;
    email: string;
    password: string;
}

export interface AuthRegisterUseCasePort {
    execute(authRegisterDTO: AuthRegisterDTO): Promise<AuthRegisterUseCaseResponse>;
}

export default class AuthRegisterUseCase implements AuthRegisterUseCasePort {
    constructor(private readonly userRepository: UserRepositoryPort) {}

    async execute(authRegisterDTO: AuthRegisterDTO): Promise<AuthRegisterUseCaseResponse> {
        const { username, email } = authRegisterDTO;
        const { password } = authRegisterDTO;
        let hashedPassword = null;

        if (!Validator.email.isValid(email)) throw new ClientException(ErrorsMessages.EMAIL_IS_INVALID);

        if (password) hashedPassword = await Bcrypt.hash(password);

        if (!this.userRepository.findByEmail(email)) {
            const userId = randomUUID();

            const jwt_token = jwt.sign({ id: userId }, process.env.JWT_SECRET);

            this.userRepository.create({
                id: userId,
                username,
                email,
                password: hashedPassword,
                jwt_token,
                created_at: new Date(),
                updated_at: null,
            });

            return { success: true, jwt_token };
        }

        throw new ClientException(ErrorsMessages.EMAIL_ALREADY_REGISTRED);
    }
}

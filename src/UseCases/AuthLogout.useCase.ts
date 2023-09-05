import { UserRepositoryPort } from "src/Repositories/Users.repository";
import { ErrorsMessages } from "src/Utils/ErrorsMessages";
import { ClientException } from "src/Utils/Exception";
import * as jwt from "jsonwebtoken";

export interface AuthLogoutUseCasePort {
    execute(token: string): Promise<AuthLogoutUseCaseResponse>;
}

interface AuthLogoutUseCaseResponse {
    success: boolean;
}

export default class AuthLogoutUseCase implements AuthLogoutUseCasePort {
    constructor(private readonly usersRepository: UserRepositoryPort) {}

    async execute(token: string): Promise<AuthLogoutUseCaseResponse> {
        const { id } = jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload;

        if (id && this.usersRepository.findById(id)) {
            this.usersRepository.logout(id);
            return { success: true };
        }

        throw new ClientException(ErrorsMessages.TOKEN_EXPIRED_OR_INVALID);
    }
}

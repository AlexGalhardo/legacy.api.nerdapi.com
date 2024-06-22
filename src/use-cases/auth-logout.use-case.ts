import { UsersRepositoryPort } from "src/repositories/users.repository";
import { ErrorsMessages } from "src/utils/errors-messages.util";
import { ClientException } from "src/utils/exceptions.util";
import * as jwt from "jsonwebtoken";

export interface AuthLogoutUseCasePort {
    execute(jwtToken: string): Promise<AuthLogoutUseCaseResponse>;
}

interface AuthLogoutUseCaseResponse {
    success: boolean;
}

export default class AuthLogoutUseCase implements AuthLogoutUseCasePort {
    constructor(private readonly usersRepository: UsersRepositoryPort) {}

    async execute(jwtToken: string): Promise<AuthLogoutUseCaseResponse> {
        const { userID } = jwt.verify(jwtToken, process.env.JWT_SECRET) as jwt.JwtPayload;

        if (userID && (await this.usersRepository.findById(userID))) {
            await this.usersRepository.logout(userID);
            return { success: true };
        }

        throw new ClientException(ErrorsMessages.TOKEN_EXPIRED_OR_INVALID);
    }
}

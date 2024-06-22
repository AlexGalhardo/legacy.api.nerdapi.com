import { User, UsersRepositoryPort } from "src/repositories/users.repository";
import { ErrorsMessages } from "src/utils/errors-messages.util";
import { ClientException } from "src/utils/exceptions.util";
import * as jwt from "jsonwebtoken";

export interface AuthCheckUserJWTTokenUseCasePort {
    execute(token: string): Promise<AuthCheckUserJWTTokenUseCaseResponse>;
}

interface AuthCheckUserJWTTokenUseCaseResponse {
    success: boolean;
    data: User;
}

export default class AuthCheckUserJWTTokenUseCase implements AuthCheckUserJWTTokenUseCasePort {
    constructor(private readonly usersRepository: UsersRepositoryPort) {}

    async execute(token: string): Promise<AuthCheckUserJWTTokenUseCaseResponse> {
        const { userID } = jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload;

        if (userID && (await this.usersRepository.findById(userID))) {
            const { user } = await this.usersRepository.getById(userID);
            return { success: true, data: user };
        }

        throw new ClientException(ErrorsMessages.USER_NOT_FOUND);
    }
}

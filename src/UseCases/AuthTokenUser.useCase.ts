import { User, UserRepositoryPort } from "src/Repositories/Users.repository";
import { ErrorsMessages } from "src/Utils/ErrorsMessages";
import { ClientException } from "src/Utils/Exception";
import * as jwt from "jsonwebtoken";

export interface AuthTokenUserUseCasePort {
    execute(token: string): Promise<AuthTokenUserUseCaseResponse>;
}

interface AuthTokenUserUseCaseResponse {
    success: boolean;
    data: User;
}

export default class AuthTokenUserUseCase implements AuthTokenUserUseCasePort {
    constructor(private readonly usersRepository: UserRepositoryPort) {}

    async execute(token: string): Promise<AuthTokenUserUseCaseResponse> {
        const { userID } = jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload;

        if (userID && this.usersRepository.findById(userID)) {
            const { user } = this.usersRepository.getById(userID);
            return { success: true, data: user };
        }

        throw new ClientException(ErrorsMessages.USER_NOT_FOUND);
    }
}

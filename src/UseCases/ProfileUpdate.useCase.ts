import { UsersRepositoryPort, UserUpdated } from "src/Repositories/Users.repository";
import { ErrorsMessages } from "src/Utils/ErrorsMessages";
import { ClientException } from "src/Utils/Exception";
import * as jwt from "jsonwebtoken";
import Validator from "src/Utils/Validator";
import { Bcrypt } from "src/Utils/Bcrypt";

interface ProfileUpdateUseCaseResponse {
    success: boolean;
    data?: UserUpdated;
}

export interface ProfileUpdateUseCasePort {
    execute(jwtToken: string, profileUpdateDTO: ProfileUpdateDTO): Promise<ProfileUpdateUseCaseResponse>;
}

export interface ProfileUpdateDTO {
    username: string | null;
    telegramNumber: string | null;
    olderPassword: string | null;
    newPassword: string | null;
}

export default class ProfileUpdateUseCase implements ProfileUpdateUseCasePort {
    constructor(private readonly usersRepository: UsersRepositoryPort) {}

    async execute(jwtToken: string, profileUpdateDTO: ProfileUpdateDTO): Promise<ProfileUpdateUseCaseResponse> {
        const { userID } = jwt.verify(jwtToken, process.env.JWT_SECRET) as jwt.JwtPayload;

        const { user } = this.usersRepository.getById(userID);

        if (user) {
            if (profileUpdateDTO.telegramNumber) {
                if (!Validator.phone.isValid(profileUpdateDTO.telegramNumber)) {
                    throw new ClientException(ErrorsMessages.INVALID_PHONE_NUMBER);
                }
            }

            if (profileUpdateDTO.olderPassword && profileUpdateDTO.newPassword) {
                if (!(await Bcrypt.compare(profileUpdateDTO.olderPassword, user.password))) {
                    throw new ClientException(ErrorsMessages.INVALID_OLDER_PASSWORD);
                }

                if (!Validator.password.isSecure(profileUpdateDTO.newPassword)) {
                    throw new ClientException(ErrorsMessages.NEW_PASSWORD_IS_INSECURE);
                }
            }

            const userUpdated = await this.usersRepository.update(userID, profileUpdateDTO);

            return { success: true, data: userUpdated };
        }

        throw new ClientException(ErrorsMessages.TOKEN_EXPIRED_OR_INVALID);
    }
}

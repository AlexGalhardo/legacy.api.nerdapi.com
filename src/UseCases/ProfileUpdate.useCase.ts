import { UsersRepositoryPort, UserUpdated } from "src/Repositories/Users.repository";
import { ErrorsMessages } from "src/Utils/ErrorsMessages";
import { ClientException } from "src/Utils/Exception";
import * as jwt from "jsonwebtoken";
import Validator from "src/Utils/Validator";

interface ProfileUpdateUseCaseResponse {
    success: boolean;
    data?: UserUpdated;
}

export interface ProfileUpdateUseCasePort {
    execute(jwtToken: string, profileUpdateDTO: ProfileUpdateDTO): Promise<ProfileUpdateUseCaseResponse>;
}

export interface ProfileUpdateDTO {
    username?: string | null;
    telegramNumber?: string | null;
    newPassword?: string | null;
    confirmNewPassword?: string | null;
}

export default class ProfileUpdateUseCase implements ProfileUpdateUseCasePort {
    constructor(private readonly usersRepository: UsersRepositoryPort) {}

    async execute(jwtToken: string, profileUpdateDTO: ProfileUpdateDTO): Promise<ProfileUpdateUseCaseResponse> {
        const { userID } = jwt.verify(jwtToken, process.env.JWT_SECRET) as jwt.JwtPayload;

        const { user } = await this.usersRepository.getById(userID);

        if (user) {
            if (profileUpdateDTO.username) {
                if (!Validator.username.isValid(profileUpdateDTO.username)) {
                    throw new ClientException(ErrorsMessages.INVALID_USERNAME);
                }
            }

            if (profileUpdateDTO.telegramNumber) {
                if (!Validator.phone.isValid(profileUpdateDTO.telegramNumber)) {
                    throw new ClientException(ErrorsMessages.INVALID_PHONE_NUMBER);
                }

                if (await this.usersRepository.phoneAlreadyRegistred(user.id, profileUpdateDTO.telegramNumber)) {
                    throw new ClientException(ErrorsMessages.PHONE_NUMBER_ALREADY_REGISTRED);
                }
            }

            if (profileUpdateDTO.newPassword && profileUpdateDTO.confirmNewPassword) {
                if (!Validator.password.isEqual(profileUpdateDTO.newPassword, profileUpdateDTO.confirmNewPassword)) {
                    throw new ClientException(ErrorsMessages.PASSWORDS_NOT_EQUAL);
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

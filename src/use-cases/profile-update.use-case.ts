import { UsersRepositoryPort, UserUpdated } from "src/repositories/users.repository";
import { ErrorsMessages } from "src/utils/errors-messages.util";
import { ClientException } from "src/utils/exceptions.util";
import * as jwt from "jsonwebtoken";
import { ProfileUpdateDTO } from "src/dtos/profile-update.dto";
import PhoneValidator from "src/validators/phone.validator";
import PasswordValidator from "src/validators/password.validator";
import UsernameValidator from "src/validators/user-name.validator";

interface ProfileUpdateUseCaseResponse {
    success: boolean;
    data?: UserUpdated;
}

export interface ProfileUpdateUseCasePort {
    execute(jwtToken: string, profileUpdateDTO: ProfileUpdateDTO): Promise<ProfileUpdateUseCaseResponse>;
}

export default class ProfileUpdateUseCase implements ProfileUpdateUseCasePort {
    constructor(private readonly usersRepository: UsersRepositoryPort) {}

    async execute(jwtToken: string, profileUpdateDTO: ProfileUpdateDTO): Promise<ProfileUpdateUseCaseResponse> {
        const { userID } = jwt.verify(jwtToken, process.env.JWT_SECRET) as jwt.JwtPayload;

        const { user } = await this.usersRepository.getById(userID);

        if (user) {
            if (profileUpdateDTO.username) {
                if (!UsernameValidator.validate(profileUpdateDTO.username)) {
                    throw new ClientException(ErrorsMessages.INVALID_USERNAME);
                }
            }

            if (profileUpdateDTO.telegramNumber) {
                if (!PhoneValidator.validate(profileUpdateDTO.telegramNumber)) {
                    throw new ClientException(ErrorsMessages.INVALID_PHONE_NUMBER);
                }

                if (await this.usersRepository.phoneAlreadyRegistred(user.id, profileUpdateDTO.telegramNumber)) {
                    throw new ClientException(ErrorsMessages.PHONE_NUMBER_ALREADY_REGISTRED);
                }
            }

            if (profileUpdateDTO.newPassword && profileUpdateDTO.confirmNewPassword) {
                if (!PasswordValidator.isEqual(profileUpdateDTO.newPassword, profileUpdateDTO.confirmNewPassword)) {
                    throw new ClientException(ErrorsMessages.PASSWORDS_NOT_EQUAL);
                }

                if (!PasswordValidator.validate(profileUpdateDTO.newPassword)) {
                    throw new ClientException(ErrorsMessages.NEW_PASSWORD_IS_INSECURE);
                }
            }

            const userUpdated = await this.usersRepository.update(userID, profileUpdateDTO);

            return { success: true, data: userUpdated };
        }

        throw new ClientException(ErrorsMessages.TOKEN_EXPIRED_OR_INVALID);
    }
}

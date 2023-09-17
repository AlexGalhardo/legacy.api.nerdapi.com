"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorsMessages_1 = require("../Utils/ErrorsMessages");
const Exception_1 = require("../Utils/Exception");
const jwt = require("jsonwebtoken");
const Validator_1 = require("../Utils/Validator");
class ProfileUpdateUseCase {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute(jwtToken, profileUpdateDTO) {
        const { userID } = jwt.verify(jwtToken, process.env.JWT_SECRET);
        const { user } = await this.usersRepository.getById(userID);
        if (user) {
            if (profileUpdateDTO.username) {
                if (!Validator_1.default.username.isValid(profileUpdateDTO.username)) {
                    throw new Exception_1.ClientException(ErrorsMessages_1.ErrorsMessages.INVALID_USERNAME);
                }
            }
            if (profileUpdateDTO.telegramNumber) {
                if (!Validator_1.default.phone.isValid(profileUpdateDTO.telegramNumber)) {
                    throw new Exception_1.ClientException(ErrorsMessages_1.ErrorsMessages.INVALID_PHONE_NUMBER);
                }
                if (await this.usersRepository.phoneAlreadyRegistred(user.id, profileUpdateDTO.telegramNumber)) {
                    throw new Exception_1.ClientException(ErrorsMessages_1.ErrorsMessages.PHONE_NUMBER_ALREADY_REGISTRED);
                }
            }
            if (profileUpdateDTO.newPassword && profileUpdateDTO.confirmNewPassword) {
                if (!Validator_1.default.password.isEqual(profileUpdateDTO.newPassword, profileUpdateDTO.confirmNewPassword)) {
                    throw new Exception_1.ClientException(ErrorsMessages_1.ErrorsMessages.PASSWORDS_NOT_EQUAL);
                }
                if (!Validator_1.default.password.isSecure(profileUpdateDTO.newPassword)) {
                    throw new Exception_1.ClientException(ErrorsMessages_1.ErrorsMessages.NEW_PASSWORD_IS_INSECURE);
                }
            }
            const userUpdated = await this.usersRepository.update(userID, profileUpdateDTO);
            return { success: true, data: userUpdated };
        }
        throw new Exception_1.ClientException(ErrorsMessages_1.ErrorsMessages.TOKEN_EXPIRED_OR_INVALID);
    }
}
exports.default = ProfileUpdateUseCase;
//# sourceMappingURL=ProfileUpdate.useCase.js.map
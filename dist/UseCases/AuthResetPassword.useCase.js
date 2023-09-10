"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Bcrypt_1 = require("../Utils/Bcrypt");
const ErrorsMessages_1 = require("../Utils/ErrorsMessages");
const Exception_1 = require("../Utils/Exception");
const Validator_1 = require("../Utils/Validator");
class AuthResetPasswordUseCase {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute(resetPasswordToken, authResetPasswordDTO) {
        const { newPassword, confirmNewPassword } = authResetPasswordDTO;
        if (!Validator_1.default.password.isEqual(newPassword, confirmNewPassword))
            throw new Exception_1.ClientException(ErrorsMessages_1.ErrorsMessages.PASSWORDS_NOT_EQUAL);
        const { user } = this.usersRepository.getByResetPasswordToken(resetPasswordToken);
        if (user) {
            const hashedPassword = await Bcrypt_1.Bcrypt.hash(newPassword);
            this.usersRepository.resetPassword(user.id, hashedPassword);
            return { success: true };
        }
        throw new Exception_1.ClientException(ErrorsMessages_1.ErrorsMessages.RESET_PASSWORD_TOKEN_INVALID);
    }
}
exports.default = AuthResetPasswordUseCase;
//# sourceMappingURL=AuthResetPassword.useCase.js.map
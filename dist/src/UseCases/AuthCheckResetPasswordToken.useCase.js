"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorsMessages_1 = require("../Utils/ErrorsMessages");
const Exception_1 = require("../Utils/Exception");
class AuthCheckResetPasswordTokenUseCase {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute(resetPasswordToken) {
        const resetPasswordTokenExist = await this.usersRepository.findResetPasswordToken(resetPasswordToken);
        if (resetPasswordTokenExist)
            return { success: true };
        throw new Exception_1.ClientException(ErrorsMessages_1.ErrorsMessages.RESET_PASSWORD_TOKEN_INVALID);
    }
}
exports.default = AuthCheckResetPasswordTokenUseCase;
//# sourceMappingURL=AuthCheckResetPasswordToken.useCase.js.map
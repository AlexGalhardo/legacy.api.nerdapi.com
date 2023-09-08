"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorsMessages_1 = require("../Utils/ErrorsMessages");
const Exception_1 = require("../Utils/Exception");
const jwt = require("jsonwebtoken");
class AuthLogoutUseCase {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute(jwtToken) {
        const { userID } = jwt.verify(jwtToken, process.env.JWT_SECRET);
        if (userID && this.usersRepository.findById(userID)) {
            this.usersRepository.logout(userID);
            return { success: true };
        }
        throw new Exception_1.ClientException(ErrorsMessages_1.ErrorsMessages.TOKEN_EXPIRED_OR_INVALID);
    }
}
exports.default = AuthLogoutUseCase;
//# sourceMappingURL=AuthLogout.useCase.js.map
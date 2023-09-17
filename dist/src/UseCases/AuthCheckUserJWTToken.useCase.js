"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorsMessages_1 = require("../Utils/ErrorsMessages");
const Exception_1 = require("../Utils/Exception");
const jwt = require("jsonwebtoken");
class AuthCheckUserJWTTokenUseCase {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute(token) {
        const { userID } = jwt.verify(token, process.env.JWT_SECRET);
        if (userID && (await this.usersRepository.findById(userID))) {
            const { user } = await this.usersRepository.getById(userID);
            return { success: true, data: user };
        }
        throw new Exception_1.ClientException(ErrorsMessages_1.ErrorsMessages.USER_NOT_FOUND);
    }
}
exports.default = AuthCheckUserJWTTokenUseCase;
//# sourceMappingURL=AuthCheckUserJWTToken.useCase.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorsMessages_1 = require("../Utils/ErrorsMessages");
const Exception_1 = require("../Utils/Exception");
class UserDeleteUseCase {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute(email) {
        if (this.usersRepository.findByEmail(email)) {
            await this.usersRepository.deleteByEmail(email);
            return { success: true };
        }
        throw new Exception_1.ClientException(ErrorsMessages_1.ErrorsMessages.EMAIL_NOT_REGISTRED);
    }
}
exports.default = UserDeleteUseCase;
//# sourceMappingURL=UserDeleteUseCase.useCase.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Bcrypt_1 = require("../Utils/Bcrypt");
const ErrorsMessages_1 = require("../Utils/ErrorsMessages");
const Exception_1 = require("../Utils/Exception");
const Validator_1 = require("../Utils/Validator");
const jwt = require("jsonwebtoken");
class AuthLoginUseCase {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute(authLoginDTO) {
        const { email, password } = authLoginDTO;
        if (!Validator_1.default.email.isValid(email))
            throw new Exception_1.ClientException(ErrorsMessages_1.ErrorsMessages.EMAIL_IS_INVALID);
        if (email && password) {
            const { user, index } = await this.usersRepository.getByEmail(email);
            if (user) {
                if (!(await Bcrypt_1.Bcrypt.compare(password, user.password))) {
                    return { success: false };
                }
                const jwt_token = jwt.sign({ userID: user.id }, process.env.JWT_SECRET);
                user.jwt_token = jwt_token;
                this.usersRepository.save(user, index);
                return { success: true, jwt_token };
            }
        }
        throw new Exception_1.ClientException(ErrorsMessages_1.ErrorsMessages.EMAIL_OR_PASSWORD_INVALID);
    }
}
exports.default = AuthLoginUseCase;
//# sourceMappingURL=AuthLogin.useCase.js.map
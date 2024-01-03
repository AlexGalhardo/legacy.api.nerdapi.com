"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionName = void 0;
require("dotenv/config");
const crypto_1 = require("crypto");
const Bcrypt_1 = require("../Utils/Bcrypt");
const ErrorsMessages_1 = require("../Utils/ErrorsMessages");
const Exception_1 = require("../Utils/Exception");
const Validator_1 = require("../Utils/Validator");
const jwt = require("jsonwebtoken");
const DateTime_1 = require("../Utils/DataTypes/DateTime");
const GenerateRandomToken_1 = require("../Utils/GenerateRandomToken");
var SubscriptionName;
(function (SubscriptionName) {
    SubscriptionName["NOOB"] = "NOOB";
    SubscriptionName["CASUAL"] = "CASUAL";
    SubscriptionName["PRO"] = "PRO";
})(SubscriptionName || (exports.SubscriptionName = SubscriptionName = {}));
class AuthRegisterUseCase {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute(authRegisterDTO) {
        const { username, email, telegramNumber, password } = authRegisterDTO;
        if (email && !Validator_1.default.email.isValid(email))
            throw new Exception_1.ClientException(ErrorsMessages_1.ErrorsMessages.EMAIL_IS_INVALID);
        if (telegramNumber && !Validator_1.default.phone.isValid(telegramNumber))
            throw new Exception_1.ClientException(ErrorsMessages_1.ErrorsMessages.INVALID_PHONE_NUMBER);
        if (password && !Validator_1.default.password.isSecure(password))
            throw new Exception_1.ClientException(ErrorsMessages_1.ErrorsMessages.PASSWORD_INSECURE);
        const hashedPassword = await Bcrypt_1.Bcrypt.hash(password);
        if (!(await this.usersRepository.findByEmail(email))) {
            const userId = (0, crypto_1.randomUUID)();
            const jwt_token = jwt.sign({ userID: userId }, process.env.JWT_SECRET);
            await this.usersRepository.create({
                id: userId,
                username,
                email,
                telegram_number: telegramNumber,
                password: hashedPassword,
                jwt_token,
                api_key: (0, GenerateRandomToken_1.default)(),
                reset_password_token: null,
                reset_password_token_expires_at: null,
                stripe: {
                    customer_id: null,
                    subscription: {
                        active: false,
                        name: SubscriptionName.NOOB,
                        starts_at: null,
                        ends_at: null,
                        charge_id: null,
                        receipt_url: null,
                        hosted_invoice_url: null,
                    },
                    updated_at: null,
                    updated_at_pt_br: null,
                },
                created_at: String(new Date()),
                updated_at: null,
                created_at_pt_br: DateTime_1.default.getNow(),
                updated_at_pt_br: null,
            });
            return { success: true, jwt_token };
        }
        throw new Exception_1.ClientException(ErrorsMessages_1.ErrorsMessages.EMAIL_ALREADY_REGISTRED);
    }
}
exports.default = AuthRegisterUseCase;
//# sourceMappingURL=AuthRegister.useCase.js.map
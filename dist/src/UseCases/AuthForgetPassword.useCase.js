"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const Constants_1 = require("../Utils/Constants");
const ErrorsMessages_1 = require("../Utils/ErrorsMessages");
const Exception_1 = require("../Utils/Exception");
const RandomToken_1 = require("../Utils/RandomToken");
const SMTP_1 = require("../Utils/SMTP");
const Validator_1 = require("../Utils/Validator");
class AuthForgetPasswordUseCase {
    constructor(usersRepository, smtp = SMTP_1.SMTP) {
        this.usersRepository = usersRepository;
        this.smtp = smtp;
    }
    async execute(authForgetPasswordDTO) {
        const { email } = authForgetPasswordDTO;
        if (!Validator_1.default.email.isValid(email))
            throw new Exception_1.ClientException(ErrorsMessages_1.ErrorsMessages.EMAIL_IS_INVALID);
        const { user } = await this.usersRepository.getByEmail(email);
        if (user) {
            const reset_password_token = (0, RandomToken_1.generateRandomToken)();
            await this.usersRepository.saveResetPasswordToken(user.id, reset_password_token);
            const resetPasswordLink = `${Constants_1.APP_URL}/reset-password/${reset_password_token}`;
            const sendEmailForgetPasswordResponse = await this.smtp.sendMail({
                from: process.env.SMTP_EMAIL_FROM,
                to: "aleexgvieira@gmail.com",
                subject: `NerdAPI: Forget Password Link To ${email}`,
                html: `
					<p>Hello ${user.username},</p>
					<p>To recover your password, click on this link do reset your password: </p>
					<p><strong>${resetPasswordLink}</strong></p>
					<hr>
					<p>NerdAPI</p>
				`,
            });
            if (sendEmailForgetPasswordResponse) {
                return { success: true, reset_password_token };
            }
            else {
                throw new Exception_1.ClientException(ErrorsMessages_1.ErrorsMessages.PROCESSING_ERROR);
            }
        }
        throw new Exception_1.ClientException(ErrorsMessages_1.ErrorsMessages.USER_NOT_FOUND);
    }
}
exports.default = AuthForgetPasswordUseCase;
//# sourceMappingURL=AuthForgetPassword.useCase.js.map
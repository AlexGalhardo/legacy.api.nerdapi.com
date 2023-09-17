import "dotenv/config";
import { UsersRepositoryPort } from "src/Repositories/Users.repository";
import { APP_URL } from "src/Utils/Constants";
import { ErrorsMessages } from "src/Utils/ErrorsMessages";
import { ClientException } from "src/Utils/Exception";
import GenerateRandomToken from "src/Utils/GenerateRandomToken";
import { SMTP } from "src/Utils/SMTP";
import Validator from "src/Utils/Validator";

export interface AuthForgetPasswordUseCasePort {
    execute(authForgetPasswordDTO: AuthForgetPasswordDTO): Promise<AuthForgetPasswordUseCaseResponse>;
}

export interface AuthForgetPasswordDTO {
    email: string;
}

interface AuthForgetPasswordUseCaseResponse {
    success: boolean;
    reset_password_token?: string;
}

export default class AuthForgetPasswordUseCase implements AuthForgetPasswordUseCasePort {
    constructor(
        private readonly usersRepository: UsersRepositoryPort,
        private readonly smtp = SMTP,
    ) {}

    async execute(authForgetPasswordDTO: AuthForgetPasswordDTO): Promise<AuthForgetPasswordUseCaseResponse> {
        const { email } = authForgetPasswordDTO;

        if (!Validator.email.isValid(email)) throw new ClientException(ErrorsMessages.EMAIL_IS_INVALID);

        const { user } = await this.usersRepository.getByEmail(email);

        if (user) {
            const reset_password_token = GenerateRandomToken();

            await this.usersRepository.saveResetPasswordToken(user.id, reset_password_token);

            const resetPasswordLink = `${APP_URL}/reset-password/${reset_password_token}`;

            const sendEmailForgetPasswordResponse = await this.smtp.sendMail({
                from: process.env.SMTP_EMAIL_FROM,
                to: "aleexgvieira@gmail.com", // email
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
            } else {
                throw new ClientException(ErrorsMessages.PROCESSING_ERROR);
            }
        }

        throw new ClientException(ErrorsMessages.USER_NOT_FOUND);
    }
}

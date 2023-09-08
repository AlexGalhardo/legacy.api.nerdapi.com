import { UsersRepositoryPort } from "src/Repositories/Users.repository";
import { Bcrypt } from "src/Utils/Bcrypt";
import { ErrorsMessages } from "src/Utils/ErrorsMessages";
import { ClientException } from "src/Utils/Exception";
import Validator from "src/Utils/Validator";
import * as jwt from "jsonwebtoken";
import { Request } from "express";
import { OAuth2Client } from "google-auth-library";
import { randomUUID } from "node:crypto";
import DateTime from "src/Utils/DataTypes/DateTime";
import { APP_URL } from "src/Utils/Constants";

export interface AuthLoginGoogleUseCasePort {
    execute(request: Request): Promise<AuthLoginGoogleUseCaseResponse>;
}

export interface AuthLoginDTO {
    email: string;
    password: string;
}

interface AuthLoginGoogleUseCaseResponse {
    success: boolean;
    redirect: string;
}

export default class AuthLoginGoogleUseCase implements AuthLoginGoogleUseCasePort {
    constructor(private readonly usersRepository: UsersRepositoryPort) {}

    async execute(request: Request): Promise<AuthLoginGoogleUseCaseResponse> {
        try {
            const { credential } = request.body;

            const googleResponse = await new OAuth2Client().verifyIdToken({
                idToken: credential,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
            const payload = googleResponse.getPayload();
            const { email, name } = payload;

            if (!Validator.email.isValid(email)) throw new ClientException(ErrorsMessages.EMAIL_IS_INVALID);

            const userExists = this.usersRepository.findByEmail(email);

            if (userExists) {
                const { user, index } = this.usersRepository.getByEmail(email);
                const jwt_token = jwt.sign({ userID: user.id }, process.env.JWT_SECRET);
                user.jwt_token = jwt_token;
                this.usersRepository.save(user, index);

                return { success: true, redirect: `${APP_URL}/profile?token=${jwt_token}&registred=${false}` };
            } else {
                const userId = randomUUID();

                const jwt_token = jwt.sign({ userID: userId }, process.env.JWT_SECRET);

                this.usersRepository.create({
                    id: userId,
                    username: name,
                    email,
                    telegram_number: null,
                    password: await Bcrypt.hash(email),
                    jwt_token,
                    api_token: null,
                    reset_password_token: null,
                    reset_password_token_expires_at: null,
                    stripe: {
                        customer_id: null,
                        subscription: {
                            active: false,
                            name: null,
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
                    created_at_pt_br: DateTime.getNow(),
                    updated_at_pt_br: null,
                });

                return { success: true, redirect: `${APP_URL}/profile?token=${jwt_token}&registred=${false}` };
            }
        } catch (error) {
            throw new ClientException(error);
        }
    }
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Bcrypt_1 = require("../Utils/Bcrypt");
const ErrorsMessages_1 = require("../Utils/ErrorsMessages");
const Exception_1 = require("../Utils/Exception");
const Validator_1 = require("../Utils/Validator");
const jwt = require("jsonwebtoken");
const node_crypto_1 = require("node:crypto");
const DateTime_1 = require("../Utils/DataTypes/DateTime");
const Constants_1 = require("../Utils/Constants");
require("dotenv/config");
class AuthLoginGitHubUseCase {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute(request) {
        try {
            const requestToken = request.query.code;
            const githubResponse = await fetch(`https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${requestToken}`, {
                method: "POST",
                headers: {
                    accept: "application/json",
                },
            });
            const githubResponseJson = await githubResponse.json();
            const responseGithubProfile = await fetch(`https://api.github.com/user`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${githubResponseJson.access_token}`,
                },
            });
            const responseGithubProfileJSON = await responseGithubProfile.json();
            if (!Validator_1.default.email.isValid(responseGithubProfileJSON.email))
                throw new Exception_1.ClientException(ErrorsMessages_1.ErrorsMessages.EMAIL_IS_INVALID);
            const userExists = await this.usersRepository.findByEmail(responseGithubProfileJSON.email);
            if (userExists) {
                const { user, index } = await this.usersRepository.getByEmail(responseGithubProfileJSON.email);
                const jwt_token = jwt.sign({ userID: user.id }, process.env.JWT_SECRET);
                user.jwt_token = jwt_token;
                this.usersRepository.save(user, index);
                return {
                    success: true,
                    jwt_token,
                    redirect: `${Constants_1.APP_URL}/profile?token=${jwt_token}&registred=${false}`,
                };
            }
            else {
                const userId = (0, node_crypto_1.randomUUID)();
                const jwt_token = jwt.sign({ userID: userId }, process.env.JWT_SECRET);
                this.usersRepository.create({
                    id: userId,
                    username: responseGithubProfileJSON.name,
                    email: responseGithubProfileJSON.email,
                    telegram_number: null,
                    password: await Bcrypt_1.Bcrypt.hash(responseGithubProfileJSON.email),
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
                    created_at_pt_br: DateTime_1.default.getNow(),
                    updated_at_pt_br: null,
                });
                return {
                    success: true,
                    jwt_token,
                    redirect: `${Constants_1.APP_URL}/profile?token=${jwt_token}&registred=${true}`,
                };
            }
        }
        catch (error) {
            throw new Exception_1.ClientException(error);
        }
    }
}
exports.default = AuthLoginGitHubUseCase;
//# sourceMappingURL=AuthLoginGitHubUseCase.useCase.js.map
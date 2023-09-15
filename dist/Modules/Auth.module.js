"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const Auth_controller_1 = require("../Controllers/Auth.controller");
const Users_repository_1 = require("../Repositories/Users.repository");
const AuthCheckResetPasswordToken_useCase_1 = require("../UseCases/AuthCheckResetPasswordToken.useCase");
const AuthForgetPassword_useCase_1 = require("../UseCases/AuthForgetPassword.useCase");
const AuthLogin_useCase_1 = require("../UseCases/AuthLogin.useCase");
const AuthLoginGitHubUseCase_useCase_1 = require("../UseCases/AuthLoginGitHubUseCase.useCase");
const AuthLoginGoogle_useCase_1 = require("../UseCases/AuthLoginGoogle.useCase");
const AuthLogout_useCase_1 = require("../UseCases/AuthLogout.useCase");
const AuthRegister_useCase_1 = require("../UseCases/AuthRegister.useCase");
const AuthResetPassword_useCase_1 = require("../UseCases/AuthResetPassword.useCase");
const AuthTokenUser_useCase_1 = require("../UseCases/AuthTokenUser.useCase");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        controllers: [Auth_controller_1.AuthController],
        providers: [
            {
                inject: [],
                provide: "UsersRepositoryPort",
                useFactory: () => {
                    return new Users_repository_1.default();
                },
            },
            {
                provide: "AuthLoginUseCasePort",
                inject: ["UsersRepositoryPort"],
                useFactory: (usersRepository) => {
                    return new AuthLogin_useCase_1.default(usersRepository);
                },
            },
            {
                provide: "AuthLoginGoogleUseCasePort",
                inject: ["UsersRepositoryPort"],
                useFactory: (usersRepository) => {
                    return new AuthLoginGoogle_useCase_1.default(usersRepository);
                },
            },
            {
                provide: "AuthLoginGitHubUseCasePort",
                inject: ["UsersRepositoryPort"],
                useFactory: (usersRepository) => {
                    return new AuthLoginGitHubUseCase_useCase_1.default(usersRepository);
                },
            },
            {
                provide: "AuthRegisterUseCasePort",
                inject: ["UsersRepositoryPort"],
                useFactory: (usersRepository) => {
                    return new AuthRegister_useCase_1.default(usersRepository);
                },
            },
            {
                provide: "AuthLogoutUseCasePort",
                inject: ["UsersRepositoryPort"],
                useFactory: (usersRepository) => {
                    return new AuthLogout_useCase_1.default(usersRepository);
                },
            },
            {
                provide: "AuthTokenUserUseCasePort",
                inject: ["UsersRepositoryPort"],
                useFactory: (usersRepository) => {
                    return new AuthTokenUser_useCase_1.default(usersRepository);
                },
            },
            {
                provide: "AuthForgetPasswordUseCasePort",
                inject: ["UsersRepositoryPort"],
                useFactory: (usersRepository) => {
                    return new AuthForgetPassword_useCase_1.default(usersRepository);
                },
            },
            {
                provide: "AuthResetPasswordUseCasePort",
                inject: ["UsersRepositoryPort"],
                useFactory: (usersRepository) => {
                    return new AuthResetPassword_useCase_1.default(usersRepository);
                },
            },
            {
                provide: "AuthCheckResetPasswordTokenUseCasePort",
                inject: ["UsersRepositoryPort"],
                useFactory: (usersRepository) => {
                    return new AuthCheckResetPasswordToken_useCase_1.default(usersRepository);
                },
            },
        ],
    })
], AuthModule);
//# sourceMappingURL=Auth.module.js.map
import { Module } from "@nestjs/common";
import { AuthController } from "src/Controllers/Auth.controller";
import UsersRepository, { UsersRepositoryPort } from "src/Repositories/Users.repository";
import AuthCheckResetPasswordTokenUseCase from "src/UseCases/AuthCheckResetPasswordToken.useCase";
import AuthForgetPasswordUseCase from "src/UseCases/AuthForgetPassword.useCase";
import AuthLoginUseCase from "src/UseCases/AuthLogin.useCase";
import AuthLoginGitHubUseCase from "src/UseCases/AuthLoginGitHub.useCase";
import AuthLoginGoogleUseCase from "src/UseCases/AuthLoginGoogle.useCase";
import AuthLogoutUseCase from "src/UseCases/AuthLogout.useCase";
import AuthRegisterUseCase from "src/UseCases/AuthRegister.useCase";
import AuthResetPasswordUseCase from "src/UseCases/AuthResetPassword.useCase";
import { Database } from "src/Utils/Database";
import AuthCheckUserJWTTokenUseCase from "src/UseCases/AuthCheckUserJWTToken.useCase";

@Module({
    controllers: [AuthController],
    providers: [
        Database,
        {
            provide: "UsersRepositoryPort",
            inject: [Database],
            useFactory: (database: Database) => {
                return new UsersRepository(undefined, database);
            },
        },
        {
            provide: "AuthLoginUseCasePort",
            inject: ["UsersRepositoryPort"],
            useFactory: (usersRepository: UsersRepositoryPort) => {
                return new AuthLoginUseCase(usersRepository);
            },
        },
        {
            provide: "AuthLoginGoogleUseCasePort",
            inject: ["UsersRepositoryPort"],
            useFactory: (usersRepository: UsersRepositoryPort) => {
                return new AuthLoginGoogleUseCase(usersRepository);
            },
        },
        {
            provide: "AuthLoginGitHubUseCasePort",
            inject: ["UsersRepositoryPort"],
            useFactory: (usersRepository: UsersRepositoryPort) => {
                return new AuthLoginGitHubUseCase(usersRepository);
            },
        },
        {
            provide: "AuthRegisterUseCasePort",
            inject: ["UsersRepositoryPort"],
            useFactory: (usersRepository: UsersRepositoryPort) => {
                return new AuthRegisterUseCase(usersRepository);
            },
        },
        {
            provide: "AuthLogoutUseCasePort",
            inject: ["UsersRepositoryPort"],
            useFactory: (usersRepository: UsersRepositoryPort) => {
                return new AuthLogoutUseCase(usersRepository);
            },
        },
        {
            provide: "AuthCheckUserJWTTokenUseCasePort",
            inject: ["UsersRepositoryPort"],
            useFactory: (usersRepository: UsersRepositoryPort) => {
                return new AuthCheckUserJWTTokenUseCase(usersRepository);
            },
        },
        {
            provide: "AuthForgetPasswordUseCasePort",
            inject: ["UsersRepositoryPort"],
            useFactory: (usersRepository: UsersRepositoryPort) => {
                return new AuthForgetPasswordUseCase(usersRepository);
            },
        },
        {
            provide: "AuthResetPasswordUseCasePort",
            inject: ["UsersRepositoryPort"],
            useFactory: (usersRepository: UsersRepositoryPort) => {
                return new AuthResetPasswordUseCase(usersRepository);
            },
        },
        {
            provide: "AuthCheckResetPasswordTokenUseCasePort",
            inject: ["UsersRepositoryPort"],
            useFactory: (usersRepository: UsersRepositoryPort) => {
                return new AuthCheckResetPasswordTokenUseCase(usersRepository);
            },
        },
    ],
})
export class AuthModule {}

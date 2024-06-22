import { Module } from "@nestjs/common";
import { AuthController } from "src/controllers/auth.controller";
import UsersRepository, { UsersRepositoryPort } from "src/repositories/users.repository";
import AuthCheckResetPasswordTokenUseCase from "src/use-cases/auth-check-reset-password-token.use-case";
import AuthForgetPasswordUseCase from "src/use-cases/auth-forget-password.use-case";
import AuthLoginUseCase from "src/use-cases/auth-login.use-case";
import AuthLoginGitHubUseCase from "src/use-cases/auth-login-github.use-case";
import AuthLoginGoogleUseCase from "src/use-cases/auth-login-google.use-case";
import AuthLogoutUseCase from "src/use-cases/auth-logout.use-case";
import AuthRegisterUseCase from "src/use-cases/auth-register.use-case";
import AuthResetPasswordUseCase from "src/use-cases/auth-reset-password.use-case";
import { Database } from "src/config/database.config";
import AuthCheckUserJWTTokenUseCase from "src/use-cases/auth-check-user-jwt-token.use-case";

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

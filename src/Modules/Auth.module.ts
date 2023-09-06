import { Module } from "@nestjs/common";
import { AuthController } from "src/Controllers/Auth.controller";
import UsersRepository, { UsersRepositoryPort } from "src/Repositories/Users.repository";
import AuthForgetPasswordUseCase from "src/UseCases/AuthForgetPassword.useCase";
import AuthLoginUseCase from "src/UseCases/AuthLogin.useCase";
import AuthLoginGoogleUseCase from "src/UseCases/AuthLoginGoogle.useCase";
import AuthLogoutUseCase from "src/UseCases/AuthLogout.useCase";
import AuthRegisterUseCase from "src/UseCases/AuthRegister.useCase";
import AuthResetPasswordUseCase from "src/UseCases/AuthResetPassword.useCase";
import AuthTokenUserUseCase from "src/UseCases/AuthTokenUser.useCase";

@Module({
    controllers: [AuthController],
    providers: [
        {
            inject: [],
            provide: "UsersRepositoryPort",
            useFactory: () => {
                return new UsersRepository();
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
            provide: "AuthTokenUserUseCasePort",
            inject: ["UsersRepositoryPort"],
            useFactory: (usersRepository: UsersRepositoryPort) => {
                return new AuthTokenUserUseCase(usersRepository);
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
    ],
})
export class AuthModule {}

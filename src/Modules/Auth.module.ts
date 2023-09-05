import { Module } from '@nestjs/common'
import { AuthController } from 'src/Controllers/Auth.controller';
import UserRepository, { UserRepositoryPort } from 'src/Repositories/Users.repository';
import AuthForgetPasswordUseCase from 'src/UseCases/AuthForgetPassword.useCase';
import AuthLoginUseCase from 'src/UseCases/AuthLogin.useCase';
import AuthRegisterUseCase from 'src/UseCases/AuthRegister.useCase';
import AuthResetPasswordUseCase from 'src/UseCases/AuthResetPassword.useCase';

@Module({
    controllers: [AuthController],
    providers: [
		{
            inject: [],
            provide: 'UserRepositoryPort',
            useFactory: () => {
                return new UserRepository()
            },
        },
		{
            provide: 'AuthRegisterUseCasePort',
            inject: ['UserRepositoryPort'],
            useFactory: (userRepository: UserRepositoryPort) => {
                return new AuthRegisterUseCase(userRepository)
            },
        },
		{
            provide: 'AuthLoginUseCasePort',
            inject: ['UserRepositoryPort'],
            useFactory: (userRepository: UserRepositoryPort) => {
                return new AuthLoginUseCase(userRepository)
            },
        },
		{
            provide: 'AuthForgetPasswordUseCasePort',
            inject: ['UserRepositoryPort'],
            useFactory: (userRepository: UserRepositoryPort) => {
                return new AuthForgetPasswordUseCase(userRepository)
            },
        },
		{
            provide: 'AuthResetPasswordUseCasePort',
            inject: ['UserRepositoryPort'],
            useFactory: (userRepository: UserRepositoryPort) => {
                return new AuthResetPasswordUseCase(userRepository)
            },
        },
	],
})

export class AuthModule {}

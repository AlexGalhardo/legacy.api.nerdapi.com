import { Test, TestingModule } from "@nestjs/testing";
import usersRepository, { UsersRepositoryPort } from "src/Repositories/Users.repository";
import AuthRegisterUseCase, { AuthRegisterDTO, AuthRegisterUseCasePort } from "src/UseCases/AuthRegister.useCase";
import Validator from "src/Utils/Validator";
import UserDeleteUseCase, { UserDeleteUseCasePort } from "src/UseCases/UserDeleteUseCase.useCase";
import AuthForgetPasswordUseCase, {
    AuthForgetPasswordDTO,
    AuthForgetPasswordUseCasePort,
} from "src/UseCases/AuthForgetPassword.useCase";
import AuthResetPasswordUseCase, {
    AuthResetPasswordDTO,
    AuthResetPasswordUseCasePort,
} from "src/UseCases/AuthResetPassword.useCase";

describe("Test AuthForgetPasswordUseCase", () => {
    let authRegisterUseCase: AuthRegisterUseCasePort;
    let authForgetPasswordUseCase: AuthForgetPasswordUseCasePort;
    let authResetPasswordUseCase: AuthResetPasswordUseCasePort;
    let deleteUserByEmail: UserDeleteUseCasePort;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [],
            providers: [
                {
                    provide: "UsersRepositoryPort",
                    inject: [],
                    useFactory: () => {
                        return new UsersRepository();
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
                    provide: "UserDeleteUseCasePort",
                    inject: ["UsersRepositoryPort"],
                    useFactory: (usersRepository: UsersRepositoryPort) => {
                        return new UserDeleteUseCase(usersRepository);
                    },
                },
            ],
        }).compile();
        authRegisterUseCase = module.get<AuthRegisterUseCasePort>("AuthRegisterUseCasePort");
        authForgetPasswordUseCase = module.get<AuthForgetPasswordUseCasePort>("AuthForgetPasswordUseCasePort");
        authResetPasswordUseCase = module.get<AuthResetPasswordUseCasePort>("AuthResetPasswordUseCasePort");
        deleteUserByEmail = module.get<UserDeleteUseCasePort>("UserDeleteUseCasePort");
    });

    const userEmail = Validator.email.generate();
    let resetPasswordToken = null;

    it("should register a user", async () => {
        const authRegisterDTO: AuthRegisterDTO = {
            username: "Testing ResetPassword Test",
            email: userEmail,
            telegramNumber: Validator.phone.generate(),
            password: Validator.password.generate(),
        };
        const { success, jwt_token } = await authRegisterUseCase.execute(authRegisterDTO);

        expect(success).toBeTruthy();
        expect(jwt_token).toBeDefined();
    });

    it("should send a email with reset_password_token to user reset password", async () => {
        const authForgetPasswordDTO: AuthForgetPasswordDTO = { email: userEmail };
        const { success, reset_password_token } = await authForgetPasswordUseCase.execute(authForgetPasswordDTO);

        resetPasswordToken = reset_password_token;

        expect(success).toBeTruthy();
        expect(reset_password_token).toBeDefined();
    });

    it("should get reset_password_token in url params and reset user password", async () => {
        const newPassword = Validator.password.generate();

        const authResetPasswordDTO: AuthResetPasswordDTO = {
            newPassword,
            confirmNewPassword: newPassword,
        };
        const { success } = await authResetPasswordUseCase.execute(resetPasswordToken, authResetPasswordDTO);

        expect(success).toBeTruthy();
    });

    afterAll(async () => {
        await deleteUserByEmail.execute(userEmail);
    });
});

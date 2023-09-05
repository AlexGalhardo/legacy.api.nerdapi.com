import { Test, TestingModule } from "@nestjs/testing";
import UserRepository, { UserRepositoryPort } from "src/Repositories/Users.repository";
import AuthRegisterUseCase, { AuthRegisterDTO, AuthRegisterUseCasePort } from "src/UseCases/AuthRegister.useCase";
import Validator from "src/Utils/Validator";
import DeleteUserUseCase, { DeleteUserUseCasePort } from "src/UseCases/DeleteUserUseCase.useCase";
import AuthForgetPasswordUseCase, { AuthForgetPasswordDTO, AuthForgetPasswordUseCasePort } from "src/UseCases/AuthForgetPassword.useCase";
import AuthResetPasswordUseCase, { AuthResetPasswordDTO, AuthResetPasswordUseCasePort } from "src/UseCases/AuthResetPassword.useCase";

describe("Test AuthForgetPasswordUseCase", () => {
    let authRegisterUseCase: AuthRegisterUseCasePort;
	let authForgetPasswordUseCase: AuthForgetPasswordUseCasePort;
	let authResetPasswordUseCase: AuthResetPasswordUseCasePort;
    let deleteUserByEmail: DeleteUserUseCasePort;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [],
            providers: [
                {
                    provide: "UserRepositoryPort",
                    inject: [],
                    useFactory: () => {
                        return new UserRepository();
                    },
                },
                {
                    provide: "AuthRegisterUseCasePort",
                    inject: ["UserRepositoryPort"],
                    useFactory: (userRepository: UserRepositoryPort) => {
                        return new AuthRegisterUseCase(userRepository);
                    },
                },
				{
                    provide: "AuthForgetPasswordUseCasePort",
                    inject: ["UserRepositoryPort"],
                    useFactory: (userRepository: UserRepositoryPort) => {
                        return new AuthForgetPasswordUseCase(userRepository);
                    },
                },
				{
                    provide: "AuthResetPasswordUseCasePort",
                    inject: ["UserRepositoryPort"],
                    useFactory: (userRepository: UserRepositoryPort) => {
                        return new AuthResetPasswordUseCase(userRepository);
                    },
                },
				{
                    provide: "DeleteUserUseCasePort",
                    inject: ["UserRepositoryPort"],
                    useFactory: (userRepository: UserRepositoryPort) => {
                        return new DeleteUserUseCase(userRepository);
                    },
                },
            ],
        }).compile();
        authRegisterUseCase = module.get<AuthRegisterUseCasePort>("AuthRegisterUseCasePort");
		authForgetPasswordUseCase = module.get<AuthForgetPasswordUseCasePort>("AuthForgetPasswordUseCasePort");
		authResetPasswordUseCase = module.get<AuthResetPasswordUseCasePort>("AuthResetPasswordUseCasePort");
        deleteUserByEmail = module.get<DeleteUserUseCasePort>("DeleteUserUseCasePort");
    });

    const userEmail = Validator.email.generate();
	let resetPasswordToken = null;

    it("should register a user", async () => {
        const authRegisterDTO: AuthRegisterDTO = {
            username: "Testing ResetPassword Test",
            email: userEmail,
            password: Validator.password.generate()
        };
        const { success, jwt_token } = await authRegisterUseCase.execute(authRegisterDTO);

        expect(success).toBeTruthy();
        expect(jwt_token).toBeDefined();
    });

	it("should send a email with reset_password_token to user reset password", async () => {
        const authForgetPasswordDTO: AuthForgetPasswordDTO = { email: userEmail };
        const { success, reset_password_token } = await authForgetPasswordUseCase.execute(authForgetPasswordDTO);

		resetPasswordToken = reset_password_token

        expect(success).toBeTruthy();
        expect(reset_password_token).toBeDefined();
    });

	it("should get reset_password_token in url params and reset user password", async () => {
		const newPassword = Validator.password.generate()
        
		const authResetPasswordDTO: AuthResetPasswordDTO = { 
			newPassword,
			confirmNewPassword: newPassword
		};
        const { success } = await authResetPasswordUseCase.execute(resetPasswordToken, authResetPasswordDTO);

        expect(success).toBeTruthy();
    });

    afterAll(async () => {
        await deleteUserByEmail.execute(userEmail);
    });
});

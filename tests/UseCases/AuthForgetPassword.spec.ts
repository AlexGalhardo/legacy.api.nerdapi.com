import { Test, TestingModule } from "@nestjs/testing";
import UserRepository, { UserRepositoryPort } from "src/Repositories/Users.repository";
import AuthRegisterUseCase, { AuthRegisterDTO, AuthRegisterUseCasePort } from "src/UseCases/AuthRegister.useCase";
import Validator from "src/Utils/Validator";
import UserDeleteUseCase, { UserDeleteUseCasePort } from "src/UseCases/UserDeleteUseCase.useCase";
import AuthForgetPasswordUseCase, {
    AuthForgetPasswordDTO,
    AuthForgetPasswordUseCasePort,
} from "src/UseCases/AuthForgetPassword.useCase";

describe("Test AuthForgetPasswordUseCase", () => {
    let authRegisterUseCase: AuthRegisterUseCasePort;
    let authForgetPasswordUseCase: AuthForgetPasswordUseCasePort;
    let deleteUserByEmail: UserDeleteUseCasePort;

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
                    provide: "UserDeleteUseCasePort",
                    inject: ["UserRepositoryPort"],
                    useFactory: (userRepository: UserRepositoryPort) => {
                        return new UserDeleteUseCase(userRepository);
                    },
                },
            ],
        }).compile();
        authRegisterUseCase = module.get<AuthRegisterUseCasePort>("AuthRegisterUseCasePort");
        authForgetPasswordUseCase = module.get<AuthForgetPasswordUseCasePort>("AuthForgetPasswordUseCasePort");
        deleteUserByEmail = module.get<UserDeleteUseCasePort>("UserDeleteUseCasePort");
    });

    const userEmail = Validator.email.generate();

    it("should register a user", async () => {
        const authRegisterDTO: AuthRegisterDTO = {
            username: "Testing ForgetPassword Test",
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

        expect(success).toBeTruthy();
        expect(reset_password_token).toBeDefined();
    });

    afterAll(async () => {
        await deleteUserByEmail.execute(userEmail);
    });
});

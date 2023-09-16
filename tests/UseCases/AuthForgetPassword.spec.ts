import { Test, TestingModule } from "@nestjs/testing";
import UsersRepository, { UsersRepositoryPort } from "src/Repositories/Users.repository";
import AuthRegisterUseCase, { AuthRegisterDTO, AuthRegisterUseCasePort } from "src/UseCases/AuthRegister.useCase";
import Validator from "src/Utils/Validator";
import UserDeleteUseCase, { UserDeleteUseCasePort } from "src/UseCases/UserDeleteUseCase.useCase";
import AuthForgetPasswordUseCase, {
    AuthForgetPasswordDTO,
    AuthForgetPasswordUseCasePort,
} from "src/UseCases/AuthForgetPassword.useCase";
import { Database } from "src/Utils/Database";

describe("Test AuthForgetPasswordUseCase", () => {
    let authRegisterUseCase: AuthRegisterUseCasePort;
    let authForgetPasswordUseCase: AuthForgetPasswordUseCasePort;
    let deleteUserByEmail: UserDeleteUseCasePort;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [],
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

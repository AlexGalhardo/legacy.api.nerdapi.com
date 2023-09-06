import { Test, TestingModule } from "@nestjs/testing";
import UserRepository, { UserRepositoryPort } from "src/Repositories/Users.repository";
import Validator from "src/Utils/Validator";
import AuthLoginUseCase, { AuthLoginDTO, AuthLoginUseCasePort } from "src/UseCases/AuthLogin.useCase";
import AuthRegisterUseCase, { AuthRegisterDTO, AuthRegisterUseCasePort } from "src/UseCases/AuthRegister.useCase";
import { UserDeleteUseCasePort } from "src/UseCases/UserDeleteUseCase.useCase";
import UserDeleteUseCase from "src/UseCases/UserDeleteUseCase.useCase";

describe("Test AuthLoginUseCase", () => {
    let authRegisterUseCase: AuthRegisterUseCasePort;
    let authLoginUseCase: AuthLoginUseCasePort;
    let deleteUserByEmail: UserDeleteUseCasePort;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [],
            providers: [
                {
                    inject: [],
                    provide: "UserRepositoryPort",
                    useFactory: () => {
                        return new UserRepository();
                    },
                },
                {
                    provide: "UserDeleteUseCasePort",
                    inject: ["UserRepositoryPort"],
                    useFactory: (userRepository: UserRepositoryPort) => {
                        return new UserDeleteUseCase(userRepository);
                    },
                },
                {
                    provide: "AuthLoginUseCasePort",
                    inject: ["UserRepositoryPort"],
                    useFactory: (userRepository: UserRepositoryPort) => {
                        return new AuthLoginUseCase(userRepository);
                    },
                },
                {
                    provide: "AuthRegisterUseCasePort",
                    inject: ["UserRepositoryPort"],
                    useFactory: (userRepository: UserRepositoryPort) => {
                        return new AuthRegisterUseCase(userRepository);
                    },
                },
            ],
        }).compile();
        authRegisterUseCase = module.get<AuthRegisterUseCasePort>("AuthRegisterUseCasePort");
        authLoginUseCase = module.get<AuthLoginUseCasePort>("AuthLoginUseCasePort");
        deleteUserByEmail = module.get<UserDeleteUseCasePort>("UserDeleteUseCasePort");
    });

    const userEmail = Validator.email.generate();
    const userPassword = Validator.password.generate();

    it("should register a user", async () => {
        const authRegisterDTO: AuthRegisterDTO = {
            username: "Testing Login Test",
            email: userEmail,
			telegramNumber: Validator.phone.generate(),
            password: userPassword,
        };
        const { success, jwt_token } = await authRegisterUseCase.execute(authRegisterDTO);

        expect(success).toBeTruthy();
        expect(jwt_token).toBeDefined();
    });

    it("should login a user", async () => {
        const authLoginDTO: AuthLoginDTO = {
            email: userEmail,
            password: userPassword,
        };
        const { success, jwt_token } = await authLoginUseCase.execute(authLoginDTO);

        expect(success).toBeTruthy();
        expect(jwt_token).toBeDefined();
    });

    afterAll(async () => {
        await deleteUserByEmail.execute(userEmail);
    });
});

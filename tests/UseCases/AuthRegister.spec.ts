import { Test, TestingModule } from "@nestjs/testing";
import UserRepository, { UserRepositoryPort } from "src/Repositories/Users.repository";
import AuthRegisterUseCase, { AuthRegisterDTO, AuthRegisterUseCasePort } from "src/UseCases/AuthRegister.useCase";
import Validator from "src/Utils/Validator";
import UserDeleteUseCase, { UserDeleteUseCasePort } from "src/UseCases/UserDeleteUseCase.useCase";

describe("Test AuthRegisterUseCase", () => {
    let authRegisterUseCase: AuthRegisterUseCasePort;
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
                    provide: "UserDeleteUseCasePort",
                    inject: ["UserRepositoryPort"],
                    useFactory: (userRepository: UserRepositoryPort) => {
                        return new UserDeleteUseCase(userRepository);
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
        deleteUserByEmail = module.get<UserDeleteUseCasePort>("UserDeleteUseCasePort");
    });

    const userEmail = Validator.email.generate();

    it("should register a user", async () => {
        const authRegisterDTO: AuthRegisterDTO = {
            username: "Testing Register Test",
            email: userEmail,
            telegramNumber: Validator.phone.generate(),
            password: Validator.password.generate(),
        };
        const { success, jwt_token } = await authRegisterUseCase.execute(authRegisterDTO);

        expect(success).toBeTruthy();
        expect(jwt_token).toBeDefined();
    });

    afterAll(async () => {
        await deleteUserByEmail.execute(userEmail);
    });
});

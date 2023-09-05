import { Test, TestingModule } from "@nestjs/testing";
import UserRepository, { UserRepositoryPort } from "src/Repositories/Users.repository";
import AuthRegisterUseCase, { AuthRegisterDTO, AuthRegisterUseCasePort } from "src/UseCases/AuthRegister.useCase";
import Validator from "src/Utils/Validator";
import DeleteUserUseCase, { DeleteUserUseCasePort } from "src/UseCases/DeleteUserUseCase.useCase";

describe("Test AuthRegisterUseCase", () => {
    let authRegisterUseCase: AuthRegisterUseCasePort;
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
                    provide: "DeleteUserUseCasePort",
                    inject: ["UserRepositoryPort"],
                    useFactory: (userRepository: UserRepositoryPort) => {
                        return new DeleteUserUseCase(userRepository);
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
        deleteUserByEmail = module.get<DeleteUserUseCasePort>("DeleteUserUseCasePort");
    });

    const userEmail = Validator.email.generate();

    it("should register a user", async () => {
        const authRegisterDTO: AuthRegisterDTO = {
            username: "Test Register User",
            email: userEmail,
            password: "randomPassword",
        };
        const { success, token } = await authRegisterUseCase.execute(authRegisterDTO);

        expect(success).toBeTruthy();
        expect(token).toBeDefined();
    });

    afterAll(async () => {
        await deleteUserByEmail.execute(userEmail);
    });
});

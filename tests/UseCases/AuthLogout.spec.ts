import { Test, TestingModule } from "@nestjs/testing";
import UserRepository, { UserRepositoryPort } from "src/Repositories/Users.repository";
import Validator from "src/Utils/Validator";
import AuthLoginUseCase, { AuthLoginDTO, AuthLoginUseCasePort } from "src/UseCases/AuthLogin.useCase";
import AuthRegisterUseCase, { AuthRegisterDTO, AuthRegisterUseCasePort } from "src/UseCases/AuthRegister.useCase";
import DeleteUserUseCase, { DeleteUserUseCasePort } from "src/UseCases/DeleteUserUseCase.useCase";
import AuthLogoutUseCase, { AuthLogoutUseCasePort } from "src/UseCases/AuthLogout.useCase";

describe("Test AuthLogoutUseCase", () => {
    let authRegisterUseCase: AuthRegisterUseCasePort;
    let authLoginUseCase: AuthLoginUseCasePort;
	let authLogoutUseCase: AuthLogoutUseCasePort;
    let deleteUserByEmail: DeleteUserUseCasePort;

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
				{
                    provide: "AuthLogoutUseCasePort",
                    inject: ["UserRepositoryPort"],
                    useFactory: (userRepository: UserRepositoryPort) => {
                        return new AuthLogoutUseCase(userRepository);
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
        authLoginUseCase = module.get<AuthLoginUseCasePort>("AuthLoginUseCasePort");
		authLogoutUseCase = module.get<AuthLogoutUseCasePort>("AuthLogoutUseCasePort");
        deleteUserByEmail = module.get<DeleteUserUseCasePort>("DeleteUserUseCasePort");
    });

    const userEmail = Validator.email.generate();
    const userPassword = "randomPassword";
	let loginToken = null

    it("should register a user", async () => {
        const authRegisterDTO: AuthRegisterDTO = {
            username: "Test Register User",
            email: userEmail,
            password: userPassword,
        };
        const { success, token } = await authRegisterUseCase.execute(authRegisterDTO);

        expect(success).toBeTruthy();
        expect(token).toBeDefined();
    });

    it("should login a user", async () => {
        const authLoginDTO: AuthLoginDTO = {
            email: userEmail,
            password: userPassword,
        };
        let { success, token } = await authLoginUseCase.execute(authLoginDTO);
		loginToken = token

        expect(success).toBeTruthy();
        expect(token).toBeDefined();
    });

	it("should logout a user", async () => {
        const { success } = await authLogoutUseCase.execute(loginToken);

        expect(success).toBeTruthy();
    });

    afterAll(async () => {
        await deleteUserByEmail.execute(userEmail);
    });
});

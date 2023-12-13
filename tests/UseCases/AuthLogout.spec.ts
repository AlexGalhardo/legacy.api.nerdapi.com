import { Test, TestingModule } from "@nestjs/testing";
import UsersRepository, { UsersRepositoryPort } from "src/Repositories/Users.repository";
import Validator from "src/Utils/Validator";
import AuthLoginUseCase, { AuthLoginDTO, AuthLoginUseCasePort } from "src/UseCases/AuthLogin.useCase";
import AuthRegisterUseCase, { AuthRegisterDTO, AuthRegisterUseCasePort } from "src/UseCases/AuthRegister.useCase";
import UserDeleteUseCase, { UserDeleteUseCasePort } from "src/UseCases/UserDelete.useCase";
import AuthLogoutUseCase, { AuthLogoutUseCasePort } from "src/UseCases/AuthLogout.useCase";
import { Database } from "src/Utils/Database";

describe("Test AuthLogoutUseCase", () => {
    let authRegisterUseCase: AuthRegisterUseCasePort;
    let authLoginUseCase: AuthLoginUseCasePort;
    let authLogoutUseCase: AuthLogoutUseCasePort;
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
                    provide: "AuthLoginUseCasePort",
                    inject: ["UsersRepositoryPort"],
                    useFactory: (usersRepository: UsersRepositoryPort) => {
                        return new AuthLoginUseCase(usersRepository);
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
                    provide: "UserDeleteUseCasePort",
                    inject: ["UsersRepositoryPort"],
                    useFactory: (usersRepository: UsersRepositoryPort) => {
                        return new UserDeleteUseCase(usersRepository);
                    },
                },
            ],
        }).compile();
        authRegisterUseCase = module.get<AuthRegisterUseCasePort>("AuthRegisterUseCasePort");
        authLoginUseCase = module.get<AuthLoginUseCasePort>("AuthLoginUseCasePort");
        authLogoutUseCase = module.get<AuthLogoutUseCasePort>("AuthLogoutUseCasePort");
        deleteUserByEmail = module.get<UserDeleteUseCasePort>("UserDeleteUseCasePort");
    });

    const userEmail = Validator.email.generate();
    const userPassword = Validator.password.generate();
    let loginToken = null;

    it("should register a user", async () => {
        const authRegisterDTO: AuthRegisterDTO = {
            username: "Testing Logout Test",
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
        let { success, jwt_token } = await authLoginUseCase.execute(authLoginDTO);
        loginToken = jwt_token;

        expect(success).toBeTruthy();
        expect(jwt_token).toBeDefined();
    });

    it("should logout a user", async () => {
        const { success } = await authLogoutUseCase.execute(loginToken);

        expect(success).toBeTruthy();
    });

    afterAll(async () => {
        await deleteUserByEmail.execute(userEmail);
    });
});

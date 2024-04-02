import { Test, TestingModule } from "@nestjs/testing";
import UsersRepository, { UsersRepositoryPort } from "src/Repositories/Users.repository";
import Validator from "src/Utils/Validator";
import AuthLoginUseCase, { AuthLoginDTO, AuthLoginUseCasePort } from "src/UseCases/AuthLogin.useCase";
import AuthRegisterUseCase, { AuthRegisterDTO, AuthRegisterUseCasePort } from "src/UseCases/AuthRegister.useCase";
import UserDeleteUseCase, { UserDeleteUseCasePort } from "src/UseCases/UserDelete.useCase";
import { Database } from "src/Utils/Database";

describe("Test AuthLoginUseCase", () => {
    let authRegisterUseCase: AuthRegisterUseCasePort;
    let authLoginUseCase: AuthLoginUseCasePort;
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
                    provide: "UserDeleteUseCasePort",
                    inject: ["UsersRepositoryPort"],
                    useFactory: (usersRepository: UsersRepositoryPort) => {
                        return new UserDeleteUseCase(usersRepository);
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

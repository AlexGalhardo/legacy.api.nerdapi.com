import { Test, TestingModule } from "@nestjs/testing";
import UsersRepository, { UsersRepositoryPort } from "src/Repositories/Users.repository";
import Validator from "src/Utils/Validator";
import AuthRegisterUseCase, { AuthRegisterDTO, AuthRegisterUseCasePort } from "src/UseCases/AuthRegister.useCase";
import UserDeleteUseCase, { UserDeleteUseCasePort } from "src/UseCases/UserDelete.useCase";
import ProfileUpdateUseCase, { ProfileUpdateUseCasePort } from "src/UseCases/ProfileUpdate.useCase";
import { Database } from "src/Utils/Database";
import { ProfileUpdateDTO } from "src/DTOs/profile-update.dto";

describe("Test ProfileUpdateUseCase", () => {
    let authRegisterUseCase: AuthRegisterUseCasePort;
    let profileUpdateUseCase: ProfileUpdateUseCasePort;
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
                    provide: "ProfileUpdateUseCasePort",
                    inject: ["UsersRepositoryPort"],
                    useFactory: (usersRepository: UsersRepositoryPort) => {
                        return new ProfileUpdateUseCase(usersRepository);
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
        profileUpdateUseCase = module.get<ProfileUpdateUseCasePort>("ProfileUpdateUseCasePort");
        deleteUserByEmail = module.get<UserDeleteUseCasePort>("UserDeleteUseCasePort");
    });

    const userEmail = Validator.email.generate();
    const userPassword = Validator.password.generate();
    let jwtToken = null;

    it("should register a user", async () => {
        const authRegisterDTO: AuthRegisterDTO = {
            username: "Testing Login Test",
            email: userEmail,
            telegramNumber: Validator.phone.generate(),
            password: userPassword,
        };
        const { success, jwt_token } = await authRegisterUseCase.execute(authRegisterDTO);
        jwtToken = jwt_token;

        expect(success).toBeTruthy();
        expect(jwt_token).toBeDefined();
    });

    const newUserName = "Testing Profile Updat";
    const newTelegramNumber = Validator.phone.generate();
    const newPassword = Validator.password.generate();

    it("should update profile", async () => {
        const profileUpdateDTO: ProfileUpdateDTO = {
            username: newUserName,
            telegramNumber: newTelegramNumber,
            newPassword: newPassword,
            confirmNewPassword: newPassword,
        };
        const { success, data } = await profileUpdateUseCase.execute(jwtToken, profileUpdateDTO);

        expect(success).toBeTruthy();
        expect(data.username).toBe(newUserName);
        expect(data.telegramNumber).toBe(newTelegramNumber);
        expect(data.password).toBeDefined();
    });

    afterAll(async () => {
        await deleteUserByEmail.execute(userEmail);
    });
});

import { Test, TestingModule } from "@nestjs/testing";
import UserRepository, { UserRepositoryPort } from "src/Repositories/Users.repository";
import Validator from "src/Utils/Validator";
import AuthRegisterUseCase, { AuthRegisterDTO, AuthRegisterUseCasePort } from "src/UseCases/AuthRegister.useCase";
import UserDeleteUseCase, { UserDeleteUseCasePort } from "src/UseCases/UserDeleteUseCase.useCase";
import ProfileUpdateUseCase, { ProfileUpdateDTO, ProfileUpdateUseCasePort } from "src/UseCases/ProfileUpdate.useCase";

describe("Test ProfileUpdateUseCase", () => {
    let authRegisterUseCase: AuthRegisterUseCasePort;
    let profileUpdateUseCase: ProfileUpdateUseCasePort;
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
                    provide: "AuthRegisterUseCasePort",
                    inject: ["UserRepositoryPort"],
                    useFactory: (userRepository: UserRepositoryPort) => {
                        return new AuthRegisterUseCase(userRepository);
                    },
                },
                {
                    provide: "ProfileUpdateUseCasePort",
                    inject: ["UserRepositoryPort"],
                    useFactory: (userRepository: UserRepositoryPort) => {
                        return new ProfileUpdateUseCase(userRepository);
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
            olderPassword: userPassword,
            newPassword: newPassword,
        };
        const { success, data } = await profileUpdateUseCase.execute(jwtToken, profileUpdateDTO);

        expect(success).toBeTruthy();
        expect(data.username).toBe(newUserName);
        expect(data.telegramNumber).toBe(newTelegramNumber);
        expect(data.password).toBe(newPassword);
    });

    afterAll(async () => {
        await deleteUserByEmail.execute(userEmail);
    });
});

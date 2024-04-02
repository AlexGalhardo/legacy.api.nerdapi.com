import { Test } from "@nestjs/testing";
import { mock } from "jest-mock-extended";
import { AuthRegisterDTO, AuthRegisterUseCasePort } from "src/UseCases/AuthRegister.useCase";
import { ProfileUpdateUseCasePort } from "src/UseCases/ProfileUpdate.useCase";
import { UserDeleteUseCasePort } from "src/UseCases/UserDelete.useCase";
import { ProfileUpdateDTO } from "src/DTOs/profile-update.dto";
import { UsersRepositoryPort } from "src/Repositories/Users.repository";

describe("Test ProfileUpdateUseCase", () => {
    beforeAll(async () => {
        await Test.createTestingModule({
            controllers: [],
            providers: [
                { provide: "UsersRepositoryPort", useValue: mock<UsersRepositoryPort>() },
                { provide: "AuthRegisterUseCasePort", useValue: mock<AuthRegisterUseCasePort>() },
                { provide: "ProfileUpdateUseCasePort", useValue: mock<ProfileUpdateUseCasePort>() },
                { provide: "UserDeleteUseCasePort", useValue: mock<UserDeleteUseCasePort>() },
            ],
        }).compile();
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should register a user", async () => {
        const authRegisterDTO = mock<AuthRegisterDTO>();
        const mockAuthRegisterUseCase = mock<AuthRegisterUseCasePort>();
        mockAuthRegisterUseCase.execute.mockResolvedValueOnce({ success: true, jwt_token: "jwttoken" });
        const response = await mockAuthRegisterUseCase.execute(authRegisterDTO);

        expect(response).toStrictEqual({
            success: true,
            jwt_token: "jwttoken",
        });
    });

    it("should update profile", async () => {
        const mockProfileUpdateUseCase = mock<ProfileUpdateUseCasePort>();
        const mockProfileUpdateDTO = mock<ProfileUpdateDTO>();
        mockProfileUpdateUseCase.execute.mockResolvedValueOnce({ success: true, data: mockProfileUpdateDTO });

        const response = await mockProfileUpdateUseCase.execute("jwttoken", mockProfileUpdateDTO);

        expect(response).toStrictEqual({
            success: true,
            data: mockProfileUpdateDTO,
        });
    });
});

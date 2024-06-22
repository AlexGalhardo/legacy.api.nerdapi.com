import { Test } from "@nestjs/testing";
import { User, UsersRepositoryPort } from "src/repositories/users.repository";
import { AuthRegisterDTO, AuthRegisterUseCasePort } from "src/use-cases/auth-register.use-case";
import { mock } from "jest-mock-extended";
import { AuthCheckUserJWTTokenUseCasePort } from "src/use-cases/auth-check-user-jwt-token.use-case";

describe("Test AuthRegisterUseCase", () => {
    beforeAll(async () => {
        await Test.createTestingModule({
            controllers: [],
            providers: [
                { provide: "UsersRepositoryPort", useValue: mock<UsersRepositoryPort>() },
                { provide: "AuthRegisterUseCasePort", useValue: mock<AuthRegisterUseCasePort>() },
                { provide: "AuthCheckUserJWTTokenUseCasePort", useValue: mock<AuthCheckUserJWTTokenUseCasePort>() },
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

    it("should check token and return user", async () => {
        const mockAuthCheckUserJWTToken = mock<AuthCheckUserJWTTokenUseCasePort>();
        const mockUser = mock<User>();
        mockAuthCheckUserJWTToken.execute.mockResolvedValueOnce({ success: true, data: mockUser });

        const response = await mockAuthCheckUserJWTToken.execute("jwttoken");

        expect(response).toStrictEqual({
            success: true,
            data: mockUser,
        });
    });
});

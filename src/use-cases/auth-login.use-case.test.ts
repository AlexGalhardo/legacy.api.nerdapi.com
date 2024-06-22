import { Test } from "@nestjs/testing";
import { UsersRepositoryPort } from "src/repositories/users.repository";
import { AuthRegisterDTO, AuthRegisterUseCasePort } from "src/use-cases/auth-register.use-case";
import { mock } from "jest-mock-extended";
import { randomUUID } from "node:crypto";
import * as jwt from "jsonwebtoken";
import { AuthLoginDTO, AuthLoginUseCasePort } from "src/use-cases/auth-login.use-case";
import { AuthLogoutUseCasePort } from "src/use-cases/auth-logout.use-case";
import PasswordValidator from "src/validators/password.validator";
import EmailValidator from "src/validators/email.validator";
import PhoneValidator from "src/validators/phone.validator";

describe("Test AuthLoginUseCase", () => {
    beforeAll(async () => {
        await Test.createTestingModule({
            controllers: [],
            providers: [
                { provide: "UsersRepositoryPort", useValue: mock<UsersRepositoryPort>() },
                { provide: "AuthRegisterUseCasePort", useValue: mock<AuthRegisterUseCasePort>() },
                { provide: "AuthLoginUseCasePort", useValue: mock<AuthLoginUseCasePort>() },
            ],
        }).compile();
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    const userEmail = EmailValidator.generate();
    const userPassword = PasswordValidator.generate();
    let loginToken = null;

    it("should register a user", async () => {
        const authRegisterDTO = mock<AuthRegisterDTO>({
            username: "Testing Logout Test",
            email: userEmail,
            telegramNumber: PhoneValidator.generate(),
            password: userPassword,
        });
        const mockAuthRegisterUseCase = mock<AuthRegisterUseCasePort>();
        const jwtToken = jwt.sign({ userID: randomUUID() }, "jwtsecret");
        mockAuthRegisterUseCase.execute.mockResolvedValueOnce({ success: true, jwt_token: jwtToken });
        const { success, jwt_token } = await mockAuthRegisterUseCase.execute(authRegisterDTO);

        expect(success).toBeTruthy();
        expect(jwt_token).toBe(jwtToken);
    });

    it("should login a user", async () => {
        const mockAuthLoginDTO = mock<AuthLoginDTO>({
            email: userEmail,
            password: userPassword,
        });
        const mockAuthLoginUseCasePort = mock<AuthLoginUseCasePort>();
        mockAuthLoginUseCasePort.execute.mockResolvedValueOnce({ success: true, jwt_token: "jwtotken" });

        let response = await mockAuthLoginUseCasePort.execute(mockAuthLoginDTO);

        loginToken = response.jwt_token;

        expect(response).toStrictEqual({
            success: true,
            jwt_token: loginToken,
        });
    });

    it("should logout a user", async () => {
        const mockAuthLogoutUseCasePort = mock<AuthLogoutUseCasePort>();
        mockAuthLogoutUseCasePort.execute.mockResolvedValueOnce({ success: true });
        const { success } = await mockAuthLogoutUseCasePort.execute(loginToken);

        expect(success).toBeTruthy();
    });
});

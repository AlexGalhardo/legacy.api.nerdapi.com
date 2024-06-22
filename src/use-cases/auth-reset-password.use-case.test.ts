import { Test } from "@nestjs/testing";
import { UsersRepositoryPort } from "src/repositories/users.repository";
import { AuthRegisterDTO, AuthRegisterUseCasePort } from "src/use-cases/auth-register.use-case";
import { AuthForgetPasswordUseCasePort } from "src/use-cases/auth-forget-password.use-case";
import { AuthResetPasswordDTO, AuthResetPasswordUseCasePort } from "src/use-cases/auth-reset-password.use-case";
import { mock } from "jest-mock-extended";
import { randomUUID } from "node:crypto";
import * as jwt from "jsonwebtoken";
import EmailValidator from "src/validators/email.validator";
import PasswordValidator from "src/validators/password.validator";

describe("Test AuthForgetPasswordUseCase", () => {
    beforeAll(async () => {
        await Test.createTestingModule({
            controllers: [],
            providers: [
                { provide: "UsersRepositoryPort", useValue: mock<UsersRepositoryPort>() },
                { provide: "AuthRegisterUseCasePort", useValue: mock<AuthRegisterUseCasePort>() },
                { provide: "AuthForgetPasswordUseCasePort", useValue: mock<AuthForgetPasswordUseCasePort>() },
                { provide: "AuthResetPasswordUseCasePort", useValue: mock<AuthResetPasswordUseCasePort>() },
            ],
        }).compile();
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    const userEmail = EmailValidator.generate();
    let resetPasswordToken = null;

    it("should register a user", async () => {
        const authRegisterDTO = mock<AuthRegisterDTO>();
        const mockAuthRegisterUseCase = mock<AuthRegisterUseCasePort>();
        const jwtToken = jwt.sign({ userID: randomUUID() }, "jwtsecret");
        mockAuthRegisterUseCase.execute.mockResolvedValueOnce({ success: true, jwt_token: jwtToken });
        const { success, jwt_token } = await mockAuthRegisterUseCase.execute(authRegisterDTO);

        expect(success).toBeTruthy();
        expect(jwt_token).toBe(jwtToken);
    });

    it("should send a email with reset_password_token to user reset password", async () => {
        const mockAuthForgetPasswordUseCase = mock<AuthForgetPasswordUseCasePort>();

        mockAuthForgetPasswordUseCase.execute.mockResolvedValueOnce({
            success: true,
            reset_password_token: "resetpasswordtoken",
        });

        const { success, reset_password_token } = await mockAuthForgetPasswordUseCase.execute({ email: userEmail });

        resetPasswordToken = reset_password_token;

        expect(success).toBeTruthy();
        expect(reset_password_token).toBeDefined();
    });

    it("should get reset_password_token in url params and reset user password", async () => {
        const newPassword = PasswordValidator.generate();

        const mockAuthResetPasswordUseCase = mock<AuthResetPasswordUseCasePort>();

        mockAuthResetPasswordUseCase.execute.mockResolvedValueOnce({ success: true });

        const authResetPasswordDTO: AuthResetPasswordDTO = {
            newPassword,
            confirmNewPassword: newPassword,
        };
        const { success } = await mockAuthResetPasswordUseCase.execute(resetPasswordToken, authResetPasswordDTO);

        expect(success).toBeTruthy();
    });
});

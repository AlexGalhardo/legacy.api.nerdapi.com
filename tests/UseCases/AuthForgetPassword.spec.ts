import { Test } from "@nestjs/testing";
import { UsersRepositoryPort } from "src/Repositories/Users.repository";
import { AuthRegisterDTO, AuthRegisterUseCasePort } from "src/UseCases/AuthRegister.useCase";
import { mock } from "jest-mock-extended";
import { randomUUID } from "node:crypto";
import * as jwt from "jsonwebtoken";
import { AuthForgetPasswordDTO, AuthForgetPasswordUseCasePort } from "src/UseCases/AuthForgetPassword.useCase";

describe("Test AuthForgetPasswordUseCase", () => {
	beforeAll(async () => {
		await Test.createTestingModule({
			controllers: [],
			providers: [
				{ provide: "UsersRepositoryPort", useValue: mock<UsersRepositoryPort>() },
				{ provide: "AuthRegisterUseCasePort", useValue: mock<AuthRegisterUseCasePort>() },
				{ provide: "AuthForgetPasswordUseCasePort", useValue: mock<AuthForgetPasswordUseCasePort>() },
			],
		}).compile();
	});

	beforeEach(() => {
		jest.clearAllMocks()
	})

	it("should register a user", async () => {
		const authRegisterDTO = mock<AuthRegisterDTO>()
		const mockAuthRegisterUseCase = mock<AuthRegisterUseCasePort>();
		const jwtToken = jwt.sign({ userID: randomUUID() }, 'jwtsecret')
		mockAuthRegisterUseCase.execute.mockResolvedValueOnce({ success: true, jwt_token: jwtToken });
		const { success, jwt_token } = await mockAuthRegisterUseCase.execute(authRegisterDTO);

		expect(success).toBeTruthy();
		expect(jwt_token).toBe(jwtToken);
	});

	it("should send a email with reset_password_token to user reset his password", async () => {
		const authForgetPasswordDTO = mock<AuthForgetPasswordDTO>()
		const mockAuthForgetPasswordUseCase = mock<AuthForgetPasswordUseCasePort>();
		mockAuthForgetPasswordUseCase.execute.mockResolvedValueOnce({ success: true, reset_password_token: 'resetpasswordtoken' });

		const response = await mockAuthForgetPasswordUseCase.execute(authForgetPasswordDTO);

		expect(response).toStrictEqual({
			success: true,
			reset_password_token: 'resetpasswordtoken'
		})
	});
});

import { Test, TestingModule } from "@nestjs/testing";
import { mock } from 'jest-mock-extended';
import { AuthRegisterDTO, AuthRegisterUseCasePort } from "src/UseCases/AuthRegister.useCase";
import { ProfileUpdateUseCasePort } from "src/UseCases/ProfileUpdate.useCase";
import { UserDeleteUseCasePort } from "src/UseCases/UserDelete.useCase";
import { ProfileUpdateDTO } from "src/DTOs/profile-update.dto";
import { UsersRepositoryPort } from "src/Repositories/Users.repository";
import Validator from "src/Utils/Validator";

describe("Test ProfileUpdateUseCase", () => {
	let authRegisterUseCase: AuthRegisterUseCasePort;
	let profileUpdateUseCase: ProfileUpdateUseCasePort;
	let deleteUserByEmail: UserDeleteUseCasePort;
	let mockUsersRepository: any;

	beforeAll(async () => {
		mockUsersRepository = mock<UsersRepositoryPort>();

		const module: TestingModule = await Test.createTestingModule({
			controllers: [],
			providers: [
				{ provide: "UsersRepositoryPort", useValue: mockUsersRepository },
				{ provide: "AuthRegisterUseCasePort", useValue: mock<AuthRegisterUseCasePort>() },
				{ provide: "ProfileUpdateUseCasePort", useValue: mock<ProfileUpdateUseCasePort>() },
				{ provide: "UserDeleteUseCasePort", useValue: mock<UserDeleteUseCasePort>() },
			],
		}).compile();

		authRegisterUseCase = module.get<AuthRegisterUseCasePort>("AuthRegisterUseCasePort");
		profileUpdateUseCase = module.get<ProfileUpdateUseCasePort>("ProfileUpdateUseCasePort");
	});

	const userEmail = Validator.email.generate();
	const userPassword = Validator.password.generate();
	let jwtToken = null;

	it("should register a user", async () => {
		const mockAuthRegisterUseCase = authRegisterUseCase as jest.Mocked<AuthRegisterUseCasePort>;
		const expectedJwtToken = 'generated-jwt-token';
		mockAuthRegisterUseCase.execute.mockResolvedValueOnce({ success: true, jwt_token: expectedJwtToken });

		const authRegisterDTO: AuthRegisterDTO = {
			username: "Testing Login Test",
			email: userEmail,
			telegramNumber: Validator.phone.generate(),
			password: userPassword,
		};
		const { success, jwt_token } = await mockAuthRegisterUseCase.execute(authRegisterDTO);
		jwtToken = jwt_token;

		expect(success).toBeTruthy();
		expect(jwt_token).toBe(expectedJwtToken);
	});

	const newUserName = "Testing Profile Updat";
	const newTelegramNumber = Validator.phone.generate();
	const newPassword = Validator.password.generate();

	it("should update profile", async () => {
		const mockProfileUpdateUseCase = mock<ProfileUpdateUseCasePort>()
		const expectedData = {
			username: newUserName,
			telegramNumber: newTelegramNumber
		};
		mockProfileUpdateUseCase.execute.mockResolvedValueOnce({ success: true, data: expectedData });

		const profileUpdateDTO: ProfileUpdateDTO = {
			username: newUserName,
			telegramNumber: newTelegramNumber,
			newPassword: newPassword,
			confirmNewPassword: newPassword,
		};
		const { success, data } = await mockProfileUpdateUseCase.execute(jwtToken, profileUpdateDTO);

		expect(success).toBeTruthy();
		expect(data.username).toBe(newUserName);
		expect(data.telegramNumber).toBe(newTelegramNumber);
	});
});

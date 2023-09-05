import { Test, TestingModule } from '@nestjs/testing'
import UserRepository, { UserRepositoryPort } from 'src/Repositories/Users.repository'
import Validator from 'src/Utils/Validator'
import AuthLoginUseCase, { AuthLoginDTO, AuthLoginUseCasePort } from 'src/UseCases/AuthLogin.useCase'
import AuthRegisterUseCase, { AuthRegisterDTO, AuthRegisterUseCasePort } from 'src/UseCases/AuthRegister.useCase'
import DeleteUserUseCase, { DeleteUserUseCasePort } from 'src/UseCases/DeleteUserUseCase.useCase'

describe('Test AuthLoginUseCase', () => {
	let authRegisterUseCase: AuthRegisterUseCasePort
	let authLoginUseCase: AuthLoginUseCasePort
	let deleteUserByEmail: DeleteUserUseCasePort

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [],
            providers: [
                {
					inject: [],
					provide: 'UserRepositoryPort',
					useFactory: () => {
						return new UserRepository()
					},
				},
				{
					provide: 'DeleteUserUseCasePort',
					inject: ['UserRepositoryPort'],
					useFactory: (userRepository: UserRepositoryPort) => {
						return new DeleteUserUseCase(userRepository)
					},
				},
				{
					provide: 'AuthLoginUseCasePort',
					inject: ['UserRepositoryPort'],
					useFactory: (userRepository: UserRepositoryPort) => {
						return new AuthLoginUseCase(userRepository)
					},
				},
				{
					provide: 'AuthRegisterUseCasePort',
					inject: ['UserRepositoryPort'],
					useFactory: (userRepository: UserRepositoryPort) => {
						return new AuthRegisterUseCase(userRepository)
					},
				},
            ],
        }).compile()
        authRegisterUseCase = module.get<AuthRegisterUseCasePort>('AuthRegisterUseCasePort')
		authLoginUseCase = module.get<AuthLoginUseCasePort>('AuthLoginUseCasePort')
		deleteUserByEmail = module.get<DeleteUserUseCasePort>('DeleteUserUseCasePort')
    })

    const userEmail = Validator.email.generate()
	const userPassword = 'randomPassword';

    it('should register a user',
        async () => {
            const authRegisterDTO: AuthRegisterDTO = {
                username: 'Test Register User',
                email: userEmail,
                password: userPassword,
            }
            const { success, token } = await authRegisterUseCase.execute(authRegisterDTO)

            expect(success).toBeTruthy()
            expect(token).toBeDefined()
        },
    )

    it('should login a user',
        async () => {
            const authLoginDTO:AuthLoginDTO = {
                email: userEmail,
                password: userPassword,
            }
            const { success, token } = await authLoginUseCase.execute(authLoginDTO)

            expect(success).toBeTruthy()
            expect(token).toBeDefined()
        },
    )

	afterAll(async () => {
		await deleteUserByEmail.execute(userEmail)
	})
})

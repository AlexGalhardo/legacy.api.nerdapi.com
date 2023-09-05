import { UserRepositoryPort } from "src/Repositories/Users.repository";

interface AuthResetPasswordUseCasePort {
	execute(authResetPasswordDTO: AuthResetPasswordDTO): Promise<AuthResetPasswordUseCaseResponse>
}

interface AuthResetPasswordDTO {
	resetPasswordToken: string;
    password: string;
	confirmPassword: string;
}

interface AuthResetPasswordUseCaseResponse {
	success: boolean
}

export default class AuthResetPasswordUseCase implements AuthResetPasswordUseCasePort {
    constructor(private readonly usersRepository: UserRepositoryPort) {}

    async execute(authResetPasswordDTO: AuthResetPasswordDTO): Promise<AuthResetPasswordUseCaseResponse> {
        const { resetPasswordToken, password, confirmPassword } = authResetPasswordDTO;
			
		// const { user, index } = this.usersRepository.getByResetPasswordToken(resetPasswordToken)
		const user = true;

		if(user){
			return { success: true }
		}

        return { success: false };
	}
}
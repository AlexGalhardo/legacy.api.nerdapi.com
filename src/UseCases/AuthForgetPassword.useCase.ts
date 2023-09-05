import { UserRepositoryPort } from "src/Repositories/Users.repository";
import { ErrorsMessages } from "src/Utils/ErrorsMessages";
import { ClientException } from "src/Utils/Exception";
import Validator from "src/Utils/Validator";

interface AuthForgetPasswordUseCasePort {
	execute(authForgetPasswordDTO: AuthForgetPasswordDTO): Promise<AuthForgetPasswordUseCaseResponse>
}

interface AuthForgetPasswordDTO {
    name: string;
    email: string;
    password: string;
}

interface AuthForgetPasswordUseCaseResponse {
	success: boolean
	token?: string
}

export default class AuthForgetPasswordUseCase implements AuthForgetPasswordUseCasePort {
    constructor(private readonly usersRepository: UserRepositoryPort) {}

    async execute(authForgetPasswordDTO: AuthForgetPasswordDTO): Promise<AuthForgetPasswordUseCaseResponse> {
        const { email } = authForgetPasswordDTO;

        if (!Validator.email.isValid(email)) throw new ClientException(ErrorsMessages.EMAIL_IS_INVALID);
			
		const { user, index } = this.usersRepository.getByEmail(email)
		
		if(user){

			// enviar email com link de recuperação pro usuário

			return { success: true }
		}

        return { success: false };
    }
}
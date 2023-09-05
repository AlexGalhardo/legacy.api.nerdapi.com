import { UserRepositoryPort } from "src/Repositories/Users.repository";
import { Bcrypt } from "src/Utils/Bcrypt";
import { ErrorsMessages } from "src/Utils/ErrorsMessages";
import { ClientException } from "src/Utils/Exception";
import Validator from "src/Utils/Validator";
import jwt from 'jsonwebtoken'

interface AuthLoginUseCasePort {
	execute(authLoginDTO: AuthLoginDTO): Promise<UserLoginUseCaseResponse>
}

interface AuthLoginDTO {
    name: string;
    email: string;
    password: string;
}

interface UserLoginUseCaseResponse {
	success: boolean
	token?: string
}

export default class AuthLoginUseCase implements AuthLoginUseCasePort {
    constructor(private readonly usersRepository: UserRepositoryPort) {}

    async execute(authLoginDTO: AuthLoginDTO): Promise<UserLoginUseCaseResponse> {
        const { email, password } = authLoginDTO;

        if (!Validator.email.isValid(email)) throw new ClientException(ErrorsMessages.EMAIL_IS_INVALID);

		if(email && password){
			
			const { user, index } = this.usersRepository.getByEmail(email)
			
			if(user){

				if(!await Bcrypt.compare(password, user.password)){
					return { success: false }
				}

				const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
				user.token = token
				this.usersRepository.save(user, index)

				return { success: true, token }
			}
		}

        return { success: false };
    }
}
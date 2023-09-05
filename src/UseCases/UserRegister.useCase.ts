import { Bcrypt } from "src/Utils/Bcrypt";

interface UserRegisterUseCasePort {}
interface UserRegisterDTO {
    name: string;
    email: string;
    password: string;
}
interface UserRegisterUseCaseResponse {}

interface UserRepositoryResponse {}
interface UserRepositoryPort {
    create: (name: string, email: string, password: string) => UserRepositoryResponse;
}

export default class UserRegisterUseCase implements UserRegisterUseCasePort {
    constructor(private readonly userRepository: UserRepositoryPort) {}

    async execute(user: UserRegisterDTO): Promise<UserRegisterUseCaseResponse> {
        const { name, email } = user;
        let { password } = user;

        if (!DataManager.email.isValid(email)) throw new ClientException(Errors.EMAIL_IS_INVALID);

        if (!DataManager.names.isValidFullName(name)) throw new ClientException(Errors.NAME_IS_INVALID);

        if (password) password = await Bcrypt.hash(password);

        const userRepositoryResponse = await this.userRepository.create(name, email, password);

        if (userRepositoryResponse) return { success: true };

        return { success: false };
    }
}

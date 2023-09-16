import { UsersRepositoryPort } from "src/Repositories/Users.repository";
interface StripeCreatePortalSessionUseCaseResponse {
    success: boolean;
    redirect: string;
}
export interface StripeCreatePortalSessionDTO {
    session_id: string;
}
export interface StripeCreatePortalSessionUseCasePort {
    execute(jwtToken: string, stripeCreatePortalSessionDTO: StripeCreatePortalSessionDTO): Promise<StripeCreatePortalSessionUseCaseResponse>;
}
export default class StripeCreatePortalSessionUseCase implements StripeCreatePortalSessionUseCasePort {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepositoryPort);
    execute(jwtToken: string, stripeCreatePortalSessionDTO: StripeCreatePortalSessionDTO): Promise<StripeCreatePortalSessionUseCaseResponse>;
}
export {};

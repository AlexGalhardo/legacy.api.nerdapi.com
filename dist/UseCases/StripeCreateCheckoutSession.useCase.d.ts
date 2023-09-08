import { UsersRepositoryPort } from "src/Repositories/Users.repository";
interface StripeCreateCheckoutSessionUseCaseResponse {
    success: boolean;
    redirect: string;
}
export interface StripeCreateCheckoutSessionDTO {
    lookup_key: string;
}
export interface StripeCreateCheckoutSessionUseCasePort {
    execute(jwtToken: string, stripeCreateCheckoutSessionDTO: StripeCreateCheckoutSessionDTO): Promise<StripeCreateCheckoutSessionUseCaseResponse>;
}
export default class StripeCreateCheckoutSessionUseCase implements StripeCreateCheckoutSessionUseCasePort {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepositoryPort);
    execute(jwtToken: string, stripeCreateCheckoutSessionDTO: StripeCreateCheckoutSessionDTO): Promise<StripeCreateCheckoutSessionUseCaseResponse>;
}
export {};

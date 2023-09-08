import { StripeRepositoryPort } from "src/Repositories/Stripe.repository";
import { UsersRepositoryPort } from "src/Repositories/Users.repository";
export interface StripeWebhookInvoiceFinalizedUseCasePort {
    execute(event: any): void;
}
export default class StripeWebhookInvoiceFinalizedUseCase implements StripeWebhookInvoiceFinalizedUseCasePort {
    private readonly stripeRepository;
    private readonly usersRepository;
    constructor(stripeRepository: StripeRepositoryPort, usersRepository: UsersRepositoryPort);
    execute(event: any): Promise<void>;
}

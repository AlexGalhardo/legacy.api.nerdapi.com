import DateTime from "src/Utils/DataTypes/DateTime";
import { StripeRepositoryPort } from "src/Repositories/Stripe.repository";
import { UsersRepositoryPort } from "src/Repositories/Users.repository";
import { ErrorsMessages } from "src/Utils/ErrorsMessages";
import { ClientException } from "src/Utils/Exception";

export interface StripeWebhookChargeSucceededUseCasePort {
    execute(event: any): void;
}

export default class StripeWebhookChargeSucceededUseCase implements StripeWebhookChargeSucceededUseCasePort {
    constructor(
        private readonly stripeRepository: StripeRepositoryPort,
        private readonly usersRepository: UsersRepositoryPort,
    ) {}

    async execute(event: any) {
        const { user } = this.usersRepository.getByEmail(event.data.object.billing_details.email);

        if (user) {
            this.usersRepository.updateStripeSubscriptionInfo(user, {
                customerId: event.data.object.customer ?? null,
                paid: event.data.object.paid ?? null,
                chargeId: event.data.object.id ?? null,
                amount: (event.data.object.amount as number) ?? null,
                receiptUrl: event.data.object.receipt_url ?? null,
                hostedInvoiceUrl: event.data.object.hosted_invoice_url ?? null,
                startAt: undefined,
                endsAt: undefined,
                createdAt: String(new Date(event.created)) ?? null,
                createdAtBrazil: DateTime.timestampToGetNow(event.created) ?? null,
            });

            this.stripeRepository.saveChargeWebhookEventLog(event);
        }

        throw new ClientException(ErrorsMessages.USER_NOT_FOUND);
    }
}

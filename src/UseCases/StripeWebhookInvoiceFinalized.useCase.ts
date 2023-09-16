import DateTime from "src/Utils/DataTypes/DateTime";
import { StripeRepositoryPort } from "src/Repositories/Stripe.repository";
import { UsersRepositoryPort } from "src/Repositories/Users.repository";
import { ClientException } from "src/Utils/Exception";
import { ErrorsMessages } from "src/Utils/ErrorsMessages";
import { generateRandomToken } from "src/Utils/RandomToken";

export interface StripeWebhookInvoiceFinalizedUseCasePort {
    execute(event: any): void;
}

export default class StripeWebhookInvoiceFinalizedUseCase implements StripeWebhookInvoiceFinalizedUseCasePort {
    constructor(
        private readonly stripeRepository: StripeRepositoryPort,
        private readonly usersRepository: UsersRepositoryPort,
    ) {}

    async execute(event: any) {
        const { user } = await this.usersRepository.getByEmail(event.data.object.customer_email);

        if (user) {
            this.usersRepository.updateStripeSubscriptionInfo(user, {
                apiToken: event.data.object.paid ? generateRandomToken() : null,
                customerId: event.data.object.customer ?? null,
                paid: event.data.object.paid ?? null,
                chargeId: event.data.object.id ?? null,
                amount: event.data.object.amount ?? null,
                receiptUrl: event.data.object.receipt_url ?? null,
                hostedInvoiceUrl: event.data.object.hosted_invoice_url ?? null,
                startAt: DateTime.timestampToGetNow(event.data.object.lines.data[0].period.start) ?? null,
                endsAt: DateTime.timestampToGetNow(event.data.object.lines.data[0].period.end) ?? null,
                createdAt: String(new Date(event.created)) ?? null,
                createdAtBrazil: DateTime.timestampToGetNow(event.created) ?? null,
            });

            this.stripeRepository.saveInvoiceWebhookEventLog(event);
        }

        throw new ClientException(ErrorsMessages.USER_NOT_FOUND);
    }
}

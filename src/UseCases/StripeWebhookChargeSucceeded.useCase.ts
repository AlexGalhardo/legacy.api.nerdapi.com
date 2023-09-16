import DateTime from "src/Utils/DataTypes/DateTime";
import { StripeRepositoryPort } from "src/Repositories/Stripe.repository";
import { UsersRepositoryPort } from "src/Repositories/Users.repository";
import { ErrorsMessages } from "src/Utils/ErrorsMessages";
import { ClientException } from "src/Utils/Exception";
import { generateRandomToken } from "src/Utils/RandomToken";

export interface StripeWebhookChargeSucceededUseCasePort {
    execute(event: any): void;
}

export default class StripeWebhookChargeSucceededUseCase implements StripeWebhookChargeSucceededUseCasePort {
    constructor(
        private readonly stripeRepository: StripeRepositoryPort,
        private readonly usersRepository: UsersRepositoryPort,
    ) {}

    async execute(event: any) {
        const {user} = await this.usersRepository.getByEmail(event.data.object.billing_details.email);

        if (user) {
            await this.usersRepository.updateStripeSubscriptionInfo(user, {
                apiToken: event.data.object.paid ? generateRandomToken() : null,
                customerId: event.data.object.customer ?? null,
                paid: event.data.object.paid ?? null,
                chargeId: event.data.object.id ?? null,
                amount: Number(event.data.object.amount),
                receiptUrl: event.data.object.receipt_url ?? null,
                createdAt: String(new Date(event.created)),
                createdAtBrazil: DateTime.timestampToGetNow(event.created) ?? null,
            });

            this.stripeRepository.saveChargeWebhookEventLog(event);
        }
		else {
			throw new ClientException(ErrorsMessages.USER_NOT_FOUND);
		}
    }
}

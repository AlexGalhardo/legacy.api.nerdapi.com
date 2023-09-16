import DateTime from "src/Utils/DataTypes/DateTime";
import { StripeRepositoryPort } from "src/Repositories/Stripe.repository";
import { UsersRepositoryPort } from "src/Repositories/Users.repository";
import { ClientException } from "src/Utils/Exception";
import { ErrorsMessages } from "src/Utils/ErrorsMessages";
import { generateRandomToken } from "src/Utils/RandomToken";
import TelegramBOTLogger from "src/Utils/TelegramBOTLogger";

export interface StripeWebhookInvoiceFinalizedUseCasePort {
    execute(event: any): void;
}

export default class StripeWebhookInvoiceFinalizedUseCase implements StripeWebhookInvoiceFinalizedUseCasePort {
    constructor(
        private readonly stripeRepository: StripeRepositoryPort,
        private readonly usersRepository: UsersRepositoryPort,
    ) {}

    async execute(event: any) {
        const response = await this.usersRepository.getByEmail(event.data.object.customer_email);

		console.log('\n\n response StripeWebhookInvoiceFinalizedUseCase => ', StripeWebhookInvoiceFinalizedUseCase)

        if (response.user) {
            const userUpdated = await this.usersRepository.updateStripeSubscriptionInfo(response.user, {
                apiToken: event.data.object.paid ? generateRandomToken() : null,
                customerId: event.data.object.customer ?? null,
                paid: event.data.object.paid ?? null,
                chargeId: event.data.object.id ?? null,
                amount: event.data.object.amount ?? null,
                receiptUrl: event.data.object.receipt_url ?? null,
                hostedInvoiceUrl: event.data.object.hosted_invoice_url ?? null,
                startAt: DateTime.timestampToGetNow(event.data.object.lines.data[0].period.start) ?? null,
                endsAt: DateTime.timestampToGetNow(event.data.object.lines.data[0].period.end) ?? null,
                createdAt: String(new Date(event.created)),
                createdAtBrazil: DateTime.timestampToGetNow(event.created) ?? null,
            });

            this.stripeRepository.saveInvoiceWebhookEventLog(event);

			TelegramBOTLogger.logSubscriptionTransaction({
				charge_id: userUpdated.stripe.subscription.charge_id,
				charge_paid: userUpdated.stripe.subscription.active,
				receipt_url: userUpdated.stripe.subscription.receipt_url,
				invoice_url: userUpdated.stripe.subscription.hosted_invoice_url,
				plan_name: userUpdated.stripe.subscription.name,
				plan_amount: userUpdated.stripe.subscription.name === "CASUAL" ? 199 : 499,
				starts_at: userUpdated.stripe.subscription.starts_at,
				ends_at: userUpdated.stripe.subscription.ends_at,
				customer_id: userUpdated.stripe.customer_id,
				customer_name: userUpdated.username,
				customer_email: userUpdated.email,
				customer_subscription_active: userUpdated.stripe.subscription.active,
				customer_api_token: userUpdated.api_token
			})
        }

        throw new ClientException(ErrorsMessages.USER_NOT_FOUND);
    }
}

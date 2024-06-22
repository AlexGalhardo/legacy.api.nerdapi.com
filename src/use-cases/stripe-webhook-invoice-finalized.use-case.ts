import DateTime from "src/utils/date-time.util";
import { StripeRepositoryPort } from "src/repositories/stripe.repository";
import { UsersRepositoryPort } from "src/repositories/users.repository";
import { ClientException } from "src/utils/exceptions.util";
import { ErrorsMessages } from "src/utils/errors-messages.util";

export interface StripeWebhookInvoiceFinalizedUseCasePort {
	execute(event: any): void;
}

export default class StripeWebhookInvoiceFinalizedUseCase implements StripeWebhookInvoiceFinalizedUseCasePort {
	constructor(
		private readonly stripeRepository: StripeRepositoryPort,
		private readonly usersRepository: UsersRepositoryPort,
	) { }

	async execute(event: any) {
		const { user } = await this.usersRepository.getByEmail(event.data.object.customer_email);

		if (user) {
			const userUpdated = await this.usersRepository.updateStripeSubscriptionInfo(user, {
				customerId: event.data.object.customer ?? null,
				invoiceId: event.data.object.id ?? null,
				hostedInvoiceUrl: event.data.object.hosted_invoice_url ?? null,
				amount: event.data.object.amount_due,
				startAt: DateTime.timestampToGetNow(event.data.object.lines.data[0].period.start) ?? null,
				endsAt: DateTime.timestampToGetNow(event.data.object.lines.data[0].period.end) ?? null,
				createdAt: String(new Date(event.created)),
				createdAtBrazil: DateTime.timestampToGetNow(event.created) ?? null,
			});

			this.stripeRepository.saveInvoiceWebhookEventLog(event);

			// TelegramLog.info(`\n
			// 	<b>STRIPE CHARGE ID:</b> ${userUpdated.stripe.subscription.charge_id}
			// 	<b>STRIPE CHARGE PAID:</b> ${userUpdated.stripe.subscription.active}
			// 	<b>STRIPE RECEIPT URL:</b> ${userUpdated.stripe.subscription.receipt_url}
			// 	<b>STRIPE INVOICE URL:</b> ${userUpdated.stripe.subscription.hosted_invoice_url}
			// 	---------------------------------------------
			// 	<b>SUBSCRIPTION NAME:</b> ${userUpdated.stripe.subscription.name}
			// 	<b>SUBSCRIPTION AMOUNT:</b> ${userUpdated.stripe.subscription.name === "CASUAL" ? 199 : 499}
			// 	<b>SUBSCRIPTION START AT:</b> ${userUpdated.stripe.subscription.starts_at}
			// 	<b>SUBSCRIPTION ENDS AT:</b> ${userUpdated.stripe.subscription.ends_at}
			// 	---------------------------------------------
			// 	<b>STRIPE CUSTOMER ID:</b> ${userUpdated.stripe.customer_id}
			// 	<b>CUSTOMER NAME:</b> ${userUpdated.username}
			// 	<b>CUSTOMER EMAIL:</b> ${userUpdated.email}
			// 	<b>CUSTOMER SUBSCRIPTION ACTIVE: </b> ${userUpdated.stripe.subscription.active}
			// 	<b>CUSTOMER API TOKEN: </b> ${userUpdated.api_key}
			// 	`);
		} else {
			throw new ClientException(ErrorsMessages.USER_NOT_FOUND);
		}
	}
}

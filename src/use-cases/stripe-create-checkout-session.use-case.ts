import { UsersRepositoryPort } from "src/repositories/users.repository";
import { APP_URL } from "src/utils/constants.util";
import { stripe } from "src/config/stripe.config";
import * as jwt from "jsonwebtoken";
import { ErrorsMessages } from "src/utils/errors-messages.util";
import { ClientException } from "src/utils/exceptions.util";

interface StripeCreateCheckoutSessionUseCaseResponse {
    success: boolean;
    redirect: string;
}

export interface StripeCreateCheckoutSessionDTO {
    lookup_key: string;
}

export interface StripeCreateCheckoutSessionUseCasePort {
    execute(
        jwtToken: string,
        stripeCreateCheckoutSessionDTO: StripeCreateCheckoutSessionDTO,
    ): Promise<StripeCreateCheckoutSessionUseCaseResponse>;
}

export default class StripeCreateCheckoutSessionUseCase implements StripeCreateCheckoutSessionUseCasePort {
    constructor(private readonly usersRepository: UsersRepositoryPort) {}

    async execute(
        jwtToken: string,
        stripeCreateCheckoutSessionDTO: StripeCreateCheckoutSessionDTO,
    ): Promise<StripeCreateCheckoutSessionUseCaseResponse> {
        const { userID } = jwt.verify(jwtToken, process.env.JWT_SECRET) as jwt.JwtPayload;

        const { user } = await this.usersRepository.getById(userID);

        if (user) {
            if (user.stripe.subscription.active) throw new ClientException(ErrorsMessages.USER_HAS_ACTIVE_PLAN);

            const { lookup_key } = stripeCreateCheckoutSessionDTO;

            const prices = await stripe.prices.list({
                lookup_keys: [lookup_key],
                expand: ["data.product"],
            });

            const session = await stripe.checkout.sessions.create({
                billing_address_collection: "auto",
                line_items: [
                    {
                        price: prices.data[0].id,
                        quantity: 1,
                    },
                ],
                mode: "subscription",
                success_url: `${APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}&plan=${lookup_key.replace(
                    "plan_",
                    "",
                )}`,
                cancel_url: `${APP_URL}/pricing`,
            });

            return { success: true, redirect: session.url };
        }

        throw new ClientException(ErrorsMessages.USER_NOT_FOUND);
    }
}

import { UsersRepositoryPort } from "src/Repositories/Users.repository";
import { APP_URL } from "src/Utils/Constants";
import { stripe } from "src/Utils/Stripe";
import * as jwt from "jsonwebtoken";
import { ErrorsMessages } from "src/Utils/ErrorsMessages";
import { ClientException } from "src/Utils/Exception";

interface StripeCreatePortalSessionUseCaseResponse {
    success: boolean;
    redirect: string;
}

export interface StripeCreatePortalSessionDTO {
    session_id: string;
}

export interface StripeCreatePortalSessionUseCasePort {
    execute(
        jwtToken: string,
        stripeCreatePortalSessionDTO: StripeCreatePortalSessionDTO,
    ): Promise<StripeCreatePortalSessionUseCaseResponse>;
}

export default class StripeCreatePortalSessionUseCase implements StripeCreatePortalSessionUseCasePort {
    constructor(private readonly usersRepository: UsersRepositoryPort) {}

    async execute(
        jwtToken: string,
        stripeCreatePortalSessionDTO: StripeCreatePortalSessionDTO,
    ): Promise<StripeCreatePortalSessionUseCaseResponse> {
        const { userID } = jwt.verify(jwtToken, process.env.JWT_SECRET) as jwt.JwtPayload;

        const { user } = this.usersRepository.getById(userID);

        if (user) {
            if (user.stripe.subscription.active) throw new ClientException(ErrorsMessages.USER_HAS_ACTIVE_PLAN);

            const { session_id } = stripeCreatePortalSessionDTO;
            const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

            const portalSession = await stripe.billingPortal.sessions.create({
                customer: (checkoutSession.customer as string) ?? "cus_OZrXWOVtDiSJlB",
                return_url: `${APP_URL}/profile`,
            });

            return { success: true, redirect: portalSession.url };
        }

        throw new ClientException(ErrorsMessages.USER_NOT_FOUND);
    }
}

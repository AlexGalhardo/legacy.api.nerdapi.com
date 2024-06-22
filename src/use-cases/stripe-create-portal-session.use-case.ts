import { UsersRepositoryPort } from "src/repositories/users.repository";
import { APP_URL } from "src/utils/constants.util";
import { stripe } from "src/config/stripe.config";
import * as jwt from "jsonwebtoken";
import { ErrorsMessages } from "src/utils/errors-messages.util";
import { ClientException } from "src/utils/exceptions.util";

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

        const { user } = await this.usersRepository.getById(userID);

        if (user) {
            const { session_id } = stripeCreatePortalSessionDTO;
            const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

            const portalSession = await stripe.billingPortal.sessions.create({
                customer: checkoutSession.customer as string,
                return_url: `${APP_URL}/profile`,
            });

            return { success: true, redirect: portalSession.url };
        }

        throw new ClientException(ErrorsMessages.USER_NOT_FOUND);
    }
}

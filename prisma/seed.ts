import { PrismaClient } from "@prisma/client";
import { Bcrypt } from "../src/Utils/Bcrypt";

const prisma = new PrismaClient();

const main = async () => {
    await prisma.users.deleteMany({});

	await prisma.users.createMany({
        data: [
            {
				name: "TEST USER",
                email: "test@gmail.com",
                password: await Bcrypt.hash("test123"),
                reset_password_token: null,
                stripe_customer_id: null,
                stripe_currently_subscription_id: null,
                stripe_currently_subscription_name: "NOOB",
                stripe_subscription_start: null,
                stripe_subscription_end: null,
            },
        ],
        skipDuplicates: true,
    });
}

main()
import { PrismaClient } from "@prisma/client";
import { Bcrypt } from "../src/Utils/Bcrypt";
import Validator from "src/Utils/Validator";
import DateTime from "src/Utils/DataTypes/DateTime";

const prisma = new PrismaClient();

const seedDatabase = async () => {
    await prisma.users.deleteMany({});

	await prisma.users.createMany({
        data: [
            {
				username: "TEST USER",
                email: "test@gmail.com",
				telegram_number: Validator.phone.generate(),
				jwt_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiJmMDA1YTUyMy0yZDc4LTRlOGEtYjY5NC1lNDBlYmZmZDAzN2IiLCJpYXQiOjE2OTQyOTA4NTN9.-b4xsP1N0gFb3rdkIu_QfzNRJ-gsK-QIn9zhXtMRWbU',
				api_token: null,
                password: await Bcrypt.hash("test123"),
				reset_password_token: null,
				reset_password_token_expires_at: null,
                stripe_customer_id: null,
				stripe_subscription_active: false,
                stripe_subscription_name: null,
                stripe_subscription_starts_at: null,
				stripe_subscription_ends_at: null,
				stripe_subscription_charge_id: null,
				stripe_subscription_receipt_url: null,
				stripe_subscription_hosted_invoice_url: null,
				stripe_updated_at: null,
				stripe_updated_at_pt_br: null,
				created_at: String(new Date()),
				updated_at: null,
				created_at_pt_br: DateTime.getNow(),
				updated_at_pt_br: null,
            },
        ],
        skipDuplicates: true,
    });
}

seedDatabase()
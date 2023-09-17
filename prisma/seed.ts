import { PrismaClient } from "@prisma/client";
import { Bcrypt } from "../src/Utils/Bcrypt";
import Validator from "../src/Utils/Validator";
import DateTime from "../src/Utils/DataTypes/DateTime";
import * as gamesJSONDatabase from '../src/Repositories/Jsons/games.json';
import GenerateRandomToken from "../src/Utils/GenerateRandomToken";

const prisma = new PrismaClient({
    errorFormat: "pretty",
});

const gamesToSeedDatabase = []

gamesJSONDatabase.forEach((game) => {
	gamesToSeedDatabase.push({
		title: game.title,
		cover_image: game.cover_image,
		summary: game.summary,
		release_year: game.release.year,
		release_date: game.release.date,
		igdb_url: game.igdb.url,
		igdb_rating: game.igdb.rating,
		metacritic_url: game.metacritic.url,
		metacritic_rating: game.metacritic.rating,
		where_to_buy: JSON.stringify(game.where_to_buy),
		developer_id: game.developer.id,
		developer_name: game.developer.name,
		publisher_id: game.publisher.id,
		publisher_name: game.publisher.name,
		platforms_available: JSON.stringify(game.platforms_available),
		genres: JSON.stringify(game.genres),
		how_long_to_beat: JSON.stringify(game.how_long_to_beat),
		created_at: String(new Date()),
		updated_at: null,
		created_at_pt_br: DateTime.getNow(),
		updated_at_pt_br: null,
	})
})

const seedDatabase = async () => {
    await prisma.users.deleteMany({});
	await prisma.games.deleteMany({});

	await prisma.users.createMany({
        data: [
            {
				username: "TEST USER",
                email: "test@gmail.com",
				telegram_number: Validator.phone.generate(),
				jwt_token: null,
				api_token: GenerateRandomToken(),
                password: await Bcrypt.hash("testUSER!123"),
				reset_password_token: null,
				reset_password_token_expires_at: null,
                stripe_customer_id: null,
				stripe_subscription_active: false,
                stripe_subscription_name: "NOOB",
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

	await prisma.games.createMany({
        data: gamesToSeedDatabase,
        skipDuplicates: true,
    });
}

seedDatabase()

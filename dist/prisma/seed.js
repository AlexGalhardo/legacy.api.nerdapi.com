"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const Bcrypt_1 = require("../src/Utils/Bcrypt");
const Validator_1 = require("../src/Utils/Validator");
const DateTime_1 = require("../src/Utils/DataTypes/DateTime");
const gamesJSONDatabase = require("../src/Repositories/Jsons/games.json");
const prisma = new client_1.PrismaClient({
    errorFormat: "pretty",
});
const gamesToSeedDatabase = [];
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
        created_at_pt_br: DateTime_1.default.getNow(),
        updated_at_pt_br: null,
    });
});
const seedDatabase = async () => {
    await prisma.users.deleteMany({});
    await prisma.games.deleteMany({});
    await prisma.users.createMany({
        data: [
            {
                username: "TEST USER",
                email: "test@gmail.com",
                telegram_number: Validator_1.default.phone.generate(),
                jwt_token: null,
                api_token: null,
                password: await Bcrypt_1.Bcrypt.hash("testUSER!123"),
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
                created_at_pt_br: DateTime_1.default.getNow(),
                updated_at_pt_br: null,
            },
        ],
        skipDuplicates: true,
    });
    await prisma.games.createMany({
        data: gamesToSeedDatabase,
        skipDuplicates: true,
    });
};
seedDatabase();
//# sourceMappingURL=seed.js.map
import { Test, TestingModule } from "@nestjs/testing";
import { Database } from "src/Utils/Database";
import GamesRepository, { GamesRepositoryPort } from "src/Repositories/Games.repository";
import GameGetRandomUseCase, { GameGetRandomUseCasePort } from "src/UseCases/GameGetRandom.useCase";
import UsersRepository, { UsersRepositoryPort } from "src/Repositories/Users.repository";

describe("Test GameGetRandomUseCase", () => {
    let getGameRandomUseCase: GameGetRandomUseCasePort;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [],
            providers: [
                Database,
                {
                    provide: "GamesRepositoryPort",
                    inject: [Database],
                    useFactory: (database: Database) => {
                        return new GamesRepository(undefined, database);
                    },
                },
                {
                    provide: "UsersRepositoryPort",
                    inject: [Database],
                    useFactory: (database: Database) => {
                        return new UsersRepository(undefined, database);
                    },
                },
                {
                    provide: "GameGetRandomUseCasePort",
                    inject: ["GamesRepositoryPort"],
                    useFactory: (gamesRepository: GamesRepositoryPort, usersRepository: UsersRepositoryPort) => {
                        return new GameGetRandomUseCase(gamesRepository, usersRepository);
                    },
                },
            ],
        }).compile();
        getGameRandomUseCase = module.get<GameGetRandomUseCasePort>("GameGetRandomUseCasePort");
    });

    it("should return a random game with correct data", async () => {
        const { success, data } = await getGameRandomUseCase.execute(process.env.API_KEY_ADMIN);

        expect(success).toBeTruthy();
        expect(data).toBeDefined();
        expect(data.id).toBeDefined();
        expect(data.title).toBeDefined();
        expect(data.summary).toBeDefined();
        expect(data.cover_image).toBeDefined();
        expect(data.release.year).toBeDefined();
        expect(data.release.date).toBeDefined();
        expect(data.developer).toBeDefined();
        expect(data.publisher).toBeDefined();
        expect(data.genres).toBeDefined();
        expect(data.platforms_available).toBeDefined();
        expect(data.how_long_to_beat).toBeDefined();
        expect(data.created_at).toBeDefined();
        expect(data.created_at_pt_br).toBeDefined();
    });
});

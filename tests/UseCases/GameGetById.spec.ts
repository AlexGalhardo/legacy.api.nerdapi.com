import { Test, TestingModule } from "@nestjs/testing";
import { Database } from "src/Utils/Database";
import GamesRepository, { GamesRepositoryPort } from "src/Repositories/Games.repository";
import GameGetByIdUseCase, { GameGetByIdUseCasePort } from "src/UseCases/GameGetById.useCase";

describe("Test GameGetByIdUseCase", () => {
    let getGameByIdUseCase: GameGetByIdUseCasePort;

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
                    provide: "GameGetByIdUseCasePort",
                    inject: ["GamesRepositoryPort"],
                    useFactory: (gamesRepository: GamesRepositoryPort) => {
                        return new GameGetByIdUseCase(gamesRepository);
                    },
                },
            ],
        }).compile();
        getGameByIdUseCase = module.get<GameGetByIdUseCasePort>("GameGetByIdUseCasePort");
    });

    it("should return a game by id with correct data", async () => {
        const randomGame = await new GamesRepository(undefined, new Database()).getRandom();

        const { success, data } = await getGameByIdUseCase.execute(randomGame.id);

        expect(success).toBeTruthy();
        expect(data).toBeDefined();
        expect(data.id).toBe(randomGame.id);
        expect(data.title).toBe(randomGame.title);
        expect(data.summary).toBe(randomGame.summary);
        expect(data.cover_image).toBe(randomGame.cover_image);
        expect(data.release.year).toBe(randomGame.release.year);
        expect(data.release.date).toBe(randomGame.release.date);
        expect(data.developer).toEqual(randomGame.developer);
        expect(data.publisher).toEqual(randomGame.publisher);
        expect(data.genres).toEqual(randomGame.genres);
        expect(data.platforms_available).toEqual(randomGame.platforms_available);
        expect(data.how_long_to_beat).toEqual(randomGame.how_long_to_beat);
        expect(data.created_at).toBe(randomGame.created_at);
        expect(data.created_at_pt_br).toBe(randomGame.created_at_pt_br);
    });
});

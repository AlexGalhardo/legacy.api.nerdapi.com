import { Test, TestingModule } from "@nestjs/testing";
import { Database } from "src/Utils/Database";
import GamesRepository, { GamesRepositoryPort } from "src/Repositories/Games.repository";
import GameGetByTitleUseCase, { GameGetByTitleUseCasePort } from "src/UseCases/GameGetByTitle.useCase";
import { UsersRepositoryPort } from "src/Repositories/Users.repository";

describe("Test GameGetByTitleUseCase", () => {
    let getGameByTitleUseCase: GameGetByTitleUseCasePort;

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
                    provide: "GameGetByTitleUseCasePort",
                    inject: ["GamesRepositoryPort"],
                    useFactory: (gamesRepository: GamesRepositoryPort, usersRepository: UsersRepositoryPort) => {
                        return new GameGetByTitleUseCase(gamesRepository, usersRepository);
                    },
                },
            ],
        }).compile();
        getGameByTitleUseCase = module.get<GameGetByTitleUseCasePort>("GameGetByTitleUseCasePort");
    });

    it("should return a game by id with correct data", async () => {
        const searchGameTitle = "God Of";

        const { success, data } = await getGameByTitleUseCase.execute(searchGameTitle, process.env.API_KEY_ADMIN);

        expect(success).toBeTruthy();
        expect(data).toBeDefined();
        expect(data[0].id).toBeDefined();
        expect(data[0].title).toBeDefined();
        expect(data[0].summary).toBeDefined();
        expect(data[0].cover_image).toBeDefined();
        expect(data[0].release.year).toBeDefined();
        expect(data[0].release.date).toBeDefined();
        expect(data[0].developer).toBeDefined();
        expect(data[0].publisher).toBeDefined();
        expect(data[0].genres).toBeDefined();
        expect(data[0].platforms_available).toBeDefined();
        expect(data[0].how_long_to_beat).toBeDefined();
        expect(data[0].created_at).toBeDefined();
        expect(data[0].created_at_pt_br).toBeDefined();

        expect(data[1].id).toBeDefined();
        expect(data[1].title).toBeDefined();
        expect(data[1].summary).toBeDefined();
        expect(data[1].cover_image).toBeDefined();
        expect(data[1].release.year).toBeDefined();
        expect(data[1].release.date).toBeDefined();
        expect(data[1].developer).toBeDefined();
        expect(data[1].publisher).toBeDefined();
        expect(data[1].genres).toBeDefined();
        expect(data[1].platforms_available).toBeDefined();
        expect(data[1].how_long_to_beat).toBeDefined();
        expect(data[1].created_at).toBeDefined();
        expect(data[1].created_at_pt_br).toBeDefined();
    });
});

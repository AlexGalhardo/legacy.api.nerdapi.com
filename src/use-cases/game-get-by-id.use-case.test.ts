import { Test } from "@nestjs/testing";
import { Game, GamesRepositoryPort } from "src/repositories/games.repository";
import { GameGetByIdUseCasePort } from "src/use-cases/game-get-by-id.use-case";
import { mock } from "jest-mock-extended";

describe("Test GameGetByIdUseCase", () => {
    beforeAll(async () => {
        await Test.createTestingModule({
            controllers: [],
            providers: [
                { provide: "GameGetByIdUseCasePort", useValue: mock<GameGetByIdUseCasePort>() },
                { provide: "GamesRepositoryPort", useValue: mock<GamesRepositoryPort>() },
            ],
        }).compile();
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return a game by id with correct data", async () => {
        const mockGetGameByIdUseCase = mock<GameGetByIdUseCasePort>();
        const mockGame = mock<Game>();
        mockGetGameByIdUseCase.execute.mockResolvedValueOnce({ success: true, data: mockGame });

        const { success, data } = await mockGetGameByIdUseCase.execute(mockGame.id, process.env.API_KEY_ADMIN);

        expect(success).toBeTruthy();
        expect(data).toBe(mockGame);
    });
});

import { Test } from "@nestjs/testing";
import { mock } from "jest-mock-extended";
import { Game, GamesRepositoryPort } from "src/Repositories/Games.repository";
import { GameGetByTitleUseCasePort } from "src/UseCases/GameGetByTitle.useCase";

describe("Test GameGetByTitleUseCase", () => {
    beforeAll(async () => {
        await Test.createTestingModule({
            controllers: [],
            providers: [
                { provide: "GameGetByTitleUseCasePort", useValue: mock<GameGetByTitleUseCasePort>() },
                { provide: "GamesRepositoryPort", useValue: mock<GamesRepositoryPort>() },
            ],
        }).compile();
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return a game by title with correct data", async () => {
        const searchGameTitle = "God Of";
        const mockGetGameByTitleUseCase = mock<GameGetByTitleUseCasePort>();
        const mockGame = mock<Game>();
        mockGetGameByTitleUseCase.execute.mockResolvedValueOnce({ success: true, data: [mockGame] });

        const { success, data } = await mockGetGameByTitleUseCase.execute(searchGameTitle, process.env.API_KEY_ADMIN);

        expect(success).toBeTruthy();
        expect(data[0]).toBe(mockGame);
    });
});

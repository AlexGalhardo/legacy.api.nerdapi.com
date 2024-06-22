import { Test } from "@nestjs/testing";
import { mock } from "jest-mock-extended";
import { Game, GamesRepositoryPort } from "src/repositories/games.repository";
import { UsersRepositoryPort } from "src/repositories/users.repository";
import { GameGetRandomUseCasePort } from "src/use-cases/game-get-random.use-case";

describe("Test GameGetRandomUseCase", () => {
    beforeAll(async () => {
        await Test.createTestingModule({
            controllers: [],
            providers: [
                { provide: "UsersRepositoryPort", useValue: mock<UsersRepositoryPort>() },
                { provide: "GameGetRandomUseCasePort", useValue: mock<GameGetRandomUseCasePort>() },
                { provide: "GamesRepositoryPort", useValue: mock<GamesRepositoryPort>() },
            ],
        }).compile();
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return a random game with correct data", async () => {
        const mockGetGameRandomUseCase = mock<GameGetRandomUseCasePort>();
        const mockGame = mock<Game>();
        mockGetGameRandomUseCase.execute.mockResolvedValueOnce({ success: true, data: mockGame });

        const { success, data } = await mockGetGameRandomUseCase.execute(process.env.API_KEY_ADMIN);

        expect(success).toBeTruthy();
        expect(data).toEqual(mockGame);
    });
});

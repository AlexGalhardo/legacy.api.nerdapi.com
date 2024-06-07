import { Game, GamesRepositoryPort } from "src/Repositories/Games.repository";
import { UsersRepositoryPort } from "src/Repositories/Users.repository";
import { ErrorsMessages } from "src/Utils/ErrorsMessages";
import { ClientException } from "src/Utils/Exception";

export interface GameGetRandomUseCasePort {
    execute(userAPIKey: string): Promise<GameGetRandomUseCaseResponse>;
}

interface GameGetRandomUseCaseResponse {
    success: boolean;
    data?: Game;
    message?: string;
    api_requests_today?: number;
}

export default class GameGetRandomUseCase implements GameGetRandomUseCasePort {
    constructor(
        private readonly gamesRepository: GamesRepositoryPort,
        private readonly usersRepository: UsersRepositoryPort,
    ) {}

    private async returnRandomGame() {
        const randomGame = await this.gamesRepository.getRandom();
        if (randomGame) return { success: true, data: randomGame };
        throw new ClientException(ErrorsMessages.GET_RANDOM_GAME_ERROR);
    }

    async execute(userAPIKey: string): Promise<GameGetRandomUseCaseResponse> {
        if (!userAPIKey) throw new ClientException(ErrorsMessages.INVALID_API_KEY);

        if (userAPIKey === process.env.API_KEY_ADMIN) {
            return this.returnRandomGame();
        } else {
            const { success, found_api_key, api_requests_today } =
                await this.usersRepository.incrementAPIRequest(userAPIKey);

            if (success && found_api_key) {
                return this.returnRandomGame();
            } else if (!success && found_api_key) {
                return { success, message: "Your API Requests reached limit for today", api_requests_today };
            } else {
                return { success, message: ErrorsMessages.API_KEY_NOT_FOUND };
            }
        }
    }
}

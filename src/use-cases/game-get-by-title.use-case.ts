import { Game, GamesRepositoryPort } from "src/repositories/games.repository";
import { UsersRepositoryPort } from "src/repositories/users.repository";
import { ErrorsMessages } from "src/utils/errors-messages.util";
import { ClientException } from "src/utils/exceptions.util";

export interface GameGetByTitleUseCasePort {
    execute(gameId: string, userAPIKey: string): Promise<GameGetByTitleUseCaseResponse>;
}

interface GameGetByTitleUseCaseResponse {
    success: boolean;
    data?: Game[];
    message?: string;
    api_requests_today?: number;
}

export default class GameGetByTitleUseCase implements GameGetByTitleUseCasePort {
    constructor(
        private readonly gamesRepository: GamesRepositoryPort,
        private readonly usersRepository: UsersRepositoryPort,
    ) {}

    private async returnGamesByTitle(gameTitle: string) {
        const gameByTitle = await this.gamesRepository.getByTitle(gameTitle);
        if (gameByTitle) return { success: true, data: gameByTitle };
        throw new ClientException(ErrorsMessages.GET_GAME_BY_TITLE_ERROR);
    }

    async execute(gameTitle: string, userAPIKey: string): Promise<GameGetByTitleUseCaseResponse> {
        if (!userAPIKey) throw new ClientException(ErrorsMessages.INVALID_API_KEY);

        if (userAPIKey === process.env.API_KEY_ADMIN) {
            return this.returnGamesByTitle(gameTitle);
        } else {
            const { success, found_api_key, api_requests_today } =
                await this.usersRepository.incrementAPIRequest(userAPIKey);

            if (success && found_api_key) {
                return this.returnGamesByTitle(gameTitle);
            } else if (!success && found_api_key) {
                return { success, message: "Your API Requests reached limit for today", api_requests_today };
            } else {
                return { success, message: ErrorsMessages.API_KEY_NOT_FOUND };
            }
        }
    }
}

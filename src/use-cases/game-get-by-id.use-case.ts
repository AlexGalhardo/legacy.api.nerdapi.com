import { Game, GamesRepositoryPort } from "src/repositories/games.repository";
import { UsersRepositoryPort } from "src/repositories/users.repository";
import { ErrorsMessages } from "src/utils/errors-messages.util";
import { ClientException } from "src/utils/exceptions.util";

export interface GameGetByIdUseCasePort {
    execute(gameId: string, userAPIKey: string): Promise<GameGetByIdUseCaseResponse>;
}

interface GameGetByIdUseCaseResponse {
    success: boolean;
    data?: Game;
    message?: string;
    api_requests_today?: number;
}

export default class GameGetByIdUseCase implements GameGetByIdUseCasePort {
    constructor(
        private readonly gamesRepository: GamesRepositoryPort,
        private readonly usersRepository: UsersRepositoryPort,
    ) {}

    private async returnGameById(gameId: string) {
        const gameById = await this.gamesRepository.getById(gameId);
        if (gameById) return { success: true, data: gameById };
        throw new ClientException(ErrorsMessages.GET_GAME_BY_ID_ERROR);
    }

    async execute(gameId: string, userAPIKey: string): Promise<GameGetByIdUseCaseResponse> {
        if (!userAPIKey) throw new ClientException(ErrorsMessages.INVALID_API_KEY);

        if (userAPIKey === process.env.API_KEY_ADMIN) {
            return this.returnGameById(gameId);
        } else {
            const { success, found_api_key, api_requests_today } =
                await this.usersRepository.incrementAPIRequest(userAPIKey);

            if (success && found_api_key) {
                return this.returnGameById(gameId);
            } else if (!success && found_api_key) {
                return { success, message: "Your API Requests reached limit for today", api_requests_today };
            } else {
                return { success, message: ErrorsMessages.API_KEY_NOT_FOUND };
            }
        }
    }
}

import "dotenv/config";
import { Game, GamesRepositoryPort } from "src/Repositories/Games.repository";
import { UsersRepositoryPort } from "src/Repositories/Users.repository";
import { ErrorsMessages } from "src/Utils/ErrorsMessages";
import { ClientException } from "src/Utils/Exception";

export interface GameGetRandomUseCasePort {
    execute(apiToken: string): Promise<GameGetRandomUseCaseResponse>;
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

    async execute(apiKey: string): Promise<GameGetRandomUseCaseResponse> {
        if (!apiKey) throw new ClientException(ErrorsMessages.INVALID_API_KEY);

        console.log("\n\napiKey => ", apiKey);
        console.log("\n\n process.env.API_KEY_ADMIN => ", process.env.API_KEY_ADMIN);

        if (apiKey === process.env.API_KEY_ADMIN) {
            const randomGame = await this.gamesRepository.getRandom();

            if (randomGame) return { success: true, data: randomGame };

            throw new ClientException(ErrorsMessages.GET_RANDOM_GAME_ERROR);
        } else {
            const { success, found_api_key, api_requests_today } =
                await this.usersRepository.incrementAPIRequest(apiKey);

            if (success && found_api_key) {
                const randomGame = await this.gamesRepository.getRandom();
                if (randomGame) return { success, data: randomGame, api_requests_today };
                throw new ClientException(ErrorsMessages.GET_RANDOM_GAME_ERROR);
            } else if (!success && found_api_key) {
                return { success, message: "Your API Requests reached limit for today", api_requests_today };
            } else {
                return { success, message: ErrorsMessages.API_KEY_NOT_FOUND };
            }
        }
    }
}

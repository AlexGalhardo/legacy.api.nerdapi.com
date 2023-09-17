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

        if (apiKey === "nerdapiadmin") {
            const randomGame = await this.gamesRepository.getRandom();

            if (randomGame) return { success: true, data: randomGame };

            throw new ClientException(ErrorsMessages.GET_RANDOM_GAME_ERROR);
        } else {
            const { success, api_requests_today } = await this.usersRepository.incrementAPIRequest(apiKey);

            if (success) {
                const randomGame = await this.gamesRepository.getRandom();
                if (randomGame) return { success: true, data: randomGame };
                throw new ClientException(ErrorsMessages.GET_RANDOM_GAME_ERROR);
            } else {
                return { success: false, message: "Your API Requests reached limit for today", api_requests_today };
            }
        }
    }
}

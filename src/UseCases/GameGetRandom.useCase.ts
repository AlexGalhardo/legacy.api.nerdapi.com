import "dotenv/config";
import { Game, GamesRepositoryPort } from "src/Repositories/Games.repository";
import { ErrorsMessages } from "src/Utils/ErrorsMessages";
import { ClientException } from "src/Utils/Exception";

export interface GameGetRandomUseCasePort {
    execute(): Promise<GameGetRandomUseCaseResponse>;
}

interface GameGetRandomUseCaseResponse {
    success: boolean;
    data: Game;
}

export default class GameGetRandomUseCase implements GameGetRandomUseCasePort {
    constructor(private readonly gamesRepository: GamesRepositoryPort) {}

    async execute(): Promise<GameGetRandomUseCaseResponse> {
        const randomGame = this.gamesRepository.getRandom();

        if (randomGame) return { success: true, data: randomGame };

        throw new ClientException(ErrorsMessages.GET_RANDOM_GAME_ERROR);
    }
}

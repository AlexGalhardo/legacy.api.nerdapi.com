import "dotenv/config";
import { Game, GamesRepositoryPort } from "src/Repositories/Games.repository";
import { ErrorsMessages } from "src/Utils/ErrorsMessages";
import { ClientException } from "src/Utils/Exception";

export interface GameGetByTitleUseCasePort {
    execute(gameId: string): Promise<GameGetByTitleUseCaseResponse>;
}

interface GameGetByTitleUseCaseResponse {
    success: boolean;
    data: Game[];
}

export default class GameGetByTitleUseCase implements GameGetByTitleUseCasePort {
    constructor(private readonly gamesRepository: GamesRepositoryPort) {}

    async execute(gameTitle: string): Promise<GameGetByTitleUseCaseResponse> {
        const gameByTitle = this.gamesRepository.getByTitle(gameTitle);

        if (gameByTitle) return { success: true, data: gameByTitle };

        throw new ClientException(ErrorsMessages.GET_GAME_BY_TITLE_ERROR);
    }
}

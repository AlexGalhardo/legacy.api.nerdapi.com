import "dotenv/config";
import { Game, GamesRepositoryPort } from "src/Repositories/Games.repository";
import { ErrorsMessages } from "src/Utils/ErrorsMessages";
import { ClientException } from "src/Utils/Exception";

export interface GameGetByIdUseCasePort {
    execute(gameId: string): Promise<GameGetByIdUseCaseResponse>;
}

interface GameGetByIdUseCaseResponse {
    success: boolean;
    data: Game;
}

export default class GameGetByIdUseCase implements GameGetByIdUseCasePort {
    constructor(private readonly gamesRepository: GamesRepositoryPort) {}

    async execute(gameId: string): Promise<GameGetByIdUseCaseResponse> {
        const gameById = await this.gamesRepository.getById(gameId);

        if (gameById) return { success: true, data: gameById };

        throw new ClientException(ErrorsMessages.GET_GAME_BY_ID_ERROR);
    }
}

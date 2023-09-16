import "dotenv/config";
import { Game, GamesRepositoryPort } from "src/Repositories/Games.repository";
export interface GameGetByTitleUseCasePort {
    execute(gameId: string): Promise<GameGetByTitleUseCaseResponse>;
}
interface GameGetByTitleUseCaseResponse {
    success: boolean;
    data: Game[];
}
export default class GameGetByTitleUseCase implements GameGetByTitleUseCasePort {
    private readonly gamesRepository;
    constructor(gamesRepository: GamesRepositoryPort);
    execute(gameTitle: string): Promise<GameGetByTitleUseCaseResponse>;
}
export {};

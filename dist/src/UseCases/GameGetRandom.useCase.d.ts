import "dotenv/config";
import { Game, GamesRepositoryPort } from "src/Repositories/Games.repository";
export interface GameGetRandomUseCasePort {
    execute(): Promise<GameGetRandomUseCaseResponse>;
}
interface GameGetRandomUseCaseResponse {
    success: boolean;
    data: Game;
}
export default class GameGetRandomUseCase implements GameGetRandomUseCasePort {
    private readonly gamesRepository;
    constructor(gamesRepository: GamesRepositoryPort);
    execute(): Promise<GameGetRandomUseCaseResponse>;
}
export {};

import "dotenv/config";
import { Game, GamesRepositoryPort } from "src/Repositories/Games.repository";
export interface GameGetByIdUseCasePort {
    execute(gameId: string): Promise<GameGetByIdUseCaseResponse>;
}
interface GameGetByIdUseCaseResponse {
    success: boolean;
    data: Game;
}
export default class GameGetByIdUseCase implements GameGetByIdUseCasePort {
    private readonly gamesRepository;
    constructor(gamesRepository: GamesRepositoryPort);
    execute(gameId: string): Promise<GameGetByIdUseCaseResponse>;
}
export {};

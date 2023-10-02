import "dotenv/config";
import { Game, GamesRepositoryPort } from "src/Repositories/Games.repository";
import { UsersRepositoryPort } from "src/Repositories/Users.repository";
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
    private readonly gamesRepository;
    private readonly usersRepository;
    constructor(gamesRepository: GamesRepositoryPort, usersRepository: UsersRepositoryPort);
    private returnGamesByTitle;
    execute(gameTitle: string, userAPIKey: string): Promise<GameGetByTitleUseCaseResponse>;
}
export {};

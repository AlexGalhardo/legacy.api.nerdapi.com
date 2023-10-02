import "dotenv/config";
import { Game, GamesRepositoryPort } from "src/Repositories/Games.repository";
import { UsersRepositoryPort } from "src/Repositories/Users.repository";
export interface GameGetRandomUseCasePort {
    execute(userAPIKey: string): Promise<GameGetRandomUseCaseResponse>;
}
interface GameGetRandomUseCaseResponse {
    success: boolean;
    data?: Game;
    message?: string;
    api_requests_today?: number;
}
export default class GameGetRandomUseCase implements GameGetRandomUseCasePort {
    private readonly gamesRepository;
    private readonly usersRepository;
    constructor(gamesRepository: GamesRepositoryPort, usersRepository: UsersRepositoryPort);
    private returnRandomGame;
    execute(userAPIKey: string): Promise<GameGetRandomUseCaseResponse>;
}
export {};

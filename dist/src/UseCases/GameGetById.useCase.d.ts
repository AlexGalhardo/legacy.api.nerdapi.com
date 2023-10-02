import "dotenv/config";
import { Game, GamesRepositoryPort } from "src/Repositories/Games.repository";
import { UsersRepositoryPort } from "src/Repositories/Users.repository";
export interface GameGetByIdUseCasePort {
    execute(gameId: string, userAPIKey: string): Promise<GameGetByIdUseCaseResponse>;
}
interface GameGetByIdUseCaseResponse {
    success: boolean;
    data?: Game;
    message?: string;
    api_requests_today?: number;
}
export default class GameGetByIdUseCase implements GameGetByIdUseCasePort {
    private readonly gamesRepository;
    private readonly usersRepository;
    constructor(gamesRepository: GamesRepositoryPort, usersRepository: UsersRepositoryPort);
    private returnGameById;
    execute(gameId: string, userAPIKey: string): Promise<GameGetByIdUseCaseResponse>;
}
export {};

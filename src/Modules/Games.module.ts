import { Module } from "@nestjs/common";
import { GamesController } from "src/controllers/games.controller";
import GamesRepository, { GamesRepositoryPort } from "src/repositories/games.repository";
import UsersRepository, { UsersRepositoryPort } from "src/repositories/users.repository";
import GameGetByIdUseCase from "src/use-cases/game-get-by-id.use-case";
import GameGetByTitleUseCase from "src/use-cases/game-get-by-title.use-case";
import GameGetRandomUseCase from "src/use-cases/game-get-random.use-case";
import { Database } from "src/config/database.config";

@Module({
    controllers: [GamesController],
    providers: [
        Database,
        {
            provide: "GamesRepositoryPort",
            inject: [Database],
            useFactory: (database: Database) => {
                return new GamesRepository(undefined, database);
            },
        },
        {
            provide: "UsersRepositoryPort",
            inject: [Database],
            useFactory: (database: Database) => {
                return new UsersRepository(undefined, database);
            },
        },
        {
            provide: "GameGetRandomUseCasePort",
            inject: ["GamesRepositoryPort", "UsersRepositoryPort"],
            useFactory: (gamesRepository: GamesRepositoryPort, usersRepository: UsersRepositoryPort) => {
                return new GameGetRandomUseCase(gamesRepository, usersRepository);
            },
        },
        {
            provide: "GameGetByIdUseCasePort",
            inject: ["GamesRepositoryPort", "UsersRepositoryPort"],
            useFactory: (gamesRepository: GamesRepositoryPort, usersRepository: UsersRepositoryPort) => {
                return new GameGetByIdUseCase(gamesRepository, usersRepository);
            },
        },
        {
            provide: "GameGetByTitleUseCasePort",
            inject: ["GamesRepositoryPort", "UsersRepositoryPort"],
            useFactory: (gamesRepository: GamesRepositoryPort, usersRepository: UsersRepositoryPort) => {
                return new GameGetByTitleUseCase(gamesRepository, usersRepository);
            },
        },
    ],
})
export class GamesModule {}

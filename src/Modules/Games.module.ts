import { Module } from "@nestjs/common";
import { GamesController } from "src/Controllers/GamesController";
import GamesRepository, { GamesRepositoryPort } from "src/Repositories/Games.repository";
import UsersRepository, { UsersRepositoryPort } from "src/Repositories/Users.repository";
import GameGetByIdUseCase from "src/UseCases/GameGetById.useCase";
import GameGetByTitleUseCase from "src/UseCases/GameGetByTitle.useCase";
import GameGetRandomUseCase from "src/UseCases/GameGetRandom.useCase";
import { Database } from "src/Utils/Database";

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

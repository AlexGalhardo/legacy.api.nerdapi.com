import { Module } from "@nestjs/common";
import { GamesController } from "src/Controllers/GamesController";
import GamesRepository, { GamesRepositoryPort } from "src/Repositories/Games.repository";
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
            provide: "GameGetRandomUseCasePort",
            inject: ["GamesRepositoryPort"],
            useFactory: (gamesRepository: GamesRepositoryPort) => {
                return new GameGetRandomUseCase(gamesRepository);
            },
        },
        {
            provide: "GameGetByIdUseCasePort",
            inject: ["GamesRepositoryPort"],
            useFactory: (gamesRepository: GamesRepositoryPort) => {
                return new GameGetByIdUseCase(gamesRepository);
            },
        },
        {
            provide: "GameGetByTitleUseCasePort",
            inject: ["GamesRepositoryPort"],
            useFactory: (gamesRepository: GamesRepositoryPort) => {
                return new GameGetByTitleUseCase(gamesRepository);
            },
        },
    ],
})
export class GamesModule {}

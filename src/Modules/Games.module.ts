import { Module } from "@nestjs/common";
import { GamesController } from "src/Controllers/GamesController";
import GamesRepository, { GamesRepositoryPort } from "src/Repositories/Games.repository";
import GameGetByIdUseCase from "src/UseCases/GameGetById.useCase";
import GameGetByTitleUseCase from "src/UseCases/GameGetByTitle.useCase";
import GameGetRandomUseCase from "src/UseCases/GameGetRandom.useCase";

@Module({
    controllers: [GamesController],
    providers: [
        {
            inject: [],
            provide: "GamesRepositoryPort",
            useFactory: () => {
                return new GamesRepository();
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

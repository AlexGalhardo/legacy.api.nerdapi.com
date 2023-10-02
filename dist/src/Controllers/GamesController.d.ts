import { Request, Response } from "express";
import { Game } from "src/Repositories/Games.repository";
import { GameGetByIdUseCasePort } from "src/UseCases/GameGetById.useCase";
import { GameGetByTitleUseCasePort } from "src/UseCases/GameGetByTitle.useCase";
import { GameGetRandomUseCasePort } from "src/UseCases/GameGetRandom.useCase";
interface GameUseCaseResponse {
    success: boolean;
    message?: string;
    data?: Game | Game[];
    api_requests_today?: number;
}
interface GamesControllerPort {
    getRandom(response: Response): Promise<Response<GameUseCaseResponse>>;
    getById(request: Request, response: Response): Promise<Response<GameUseCaseResponse>>;
    getByTitle(request: Request, response: Response): Promise<Response<GameUseCaseResponse>>;
}
export declare class GamesController implements GamesControllerPort {
    private readonly gameGetRandomUseCase;
    private readonly gameGetByIdUseCase;
    private readonly gameGetByTitleUseCase;
    constructor(gameGetRandomUseCase: GameGetRandomUseCasePort, gameGetByIdUseCase: GameGetByIdUseCasePort, gameGetByTitleUseCase: GameGetByTitleUseCasePort);
    getRandom(response: Response): Promise<Response<GameUseCaseResponse>>;
    getById(request: Request, response: Response): Promise<Response<GameUseCaseResponse>>;
    getByTitle(request: Request, response: Response): Promise<Response<GameUseCaseResponse>>;
}
export {};

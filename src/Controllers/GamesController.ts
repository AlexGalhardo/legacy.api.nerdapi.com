import { Controller, Res, HttpStatus, Get, Inject, Req } from "@nestjs/common";
import { Request, Response } from "express";
import { Game } from "src/Repositories/Games.repository";
import { GameGetByIdUseCasePort } from "src/UseCases/GameGetById.useCase";
import { GameGetByTitleUseCasePort } from "src/UseCases/GameGetByTitle.useCase";
import { GameGetRandomUseCasePort } from "src/UseCases/GameGetRandom.useCase";

interface GameUseCaseResponse {
    success: boolean;
    message?: string;
	data?: Game | Game[]
}

interface GamesControllerPort {
    getRandom(response: Response): Promise<Response<GameUseCaseResponse>>;
	getById(request: Request, response: Response): Promise<Response<GameUseCaseResponse>>
	getByTitle(request: Request, response: Response): Promise<Response<GameUseCaseResponse>>
}

@Controller('games')
export class GamesController implements GamesControllerPort {
    constructor(
		@Inject("GameGetRandomUseCasePort") private readonly gameGetRandomUseCase: GameGetRandomUseCasePort,
		@Inject("GameGetByIdUseCasePort") private readonly gameGetByIdUseCase: GameGetByIdUseCasePort,
		@Inject("GameGetByTitleUseCasePort") private readonly gameGetByTitleUseCase: GameGetByTitleUseCasePort,
	) {}

    @Get("/random")
    async getRandom(@Res() response: Response): Promise<Response<GameUseCaseResponse>> {
        try {
            const { success, data } = await this.gameGetRandomUseCase.execute();
            if (success) return response.status(HttpStatus.OK).json({ success: true, data });
        } catch (error) {
            return response.status(HttpStatus.BAD_REQUEST).json({ success: false, message: error.message });
        }
    }

	@Get("/id/:game_id")
    async getById(@Req() request: Request, @Res() response: Response): Promise<Response<GameUseCaseResponse>> {
        try {
			const { game_id } = request.params;
            const { success, data } = await this.gameGetByIdUseCase.execute(game_id);
            if (success) return response.status(HttpStatus.OK).json({ success: true, data });
        } catch (error) {
            return response.status(HttpStatus.BAD_REQUEST).json({ success: false, message: error.message });
        }
    }

	@Get("/title/:game_title")
    async getByTitle(@Req() request: Request, @Res() response: Response): Promise<Response<GameUseCaseResponse>> {
        try {
			const { game_title } = request.params;
            const { success, data } = await this.gameGetByTitleUseCase.execute(game_title);
            if (success) return response.status(HttpStatus.OK).json({ success: true, data });
        } catch (error) {
            return response.status(HttpStatus.BAD_REQUEST).json({ success: false, message: error.message });
        }
    }
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const ErrorsMessages_1 = require("../Utils/ErrorsMessages");
const Exception_1 = require("../Utils/Exception");
class GameGetByTitleUseCase {
    constructor(gamesRepository, usersRepository) {
        this.gamesRepository = gamesRepository;
        this.usersRepository = usersRepository;
    }
    async returnGamesByTitle(gameTitle) {
        const gameByTitle = await this.gamesRepository.getByTitle(gameTitle);
        if (gameByTitle)
            return { success: true, data: gameByTitle };
        throw new Exception_1.ClientException(ErrorsMessages_1.ErrorsMessages.GET_GAME_BY_TITLE_ERROR);
    }
    async execute(gameTitle, userAPIKey) {
        if (!userAPIKey)
            throw new Exception_1.ClientException(ErrorsMessages_1.ErrorsMessages.INVALID_API_KEY);
        if (userAPIKey === process.env.API_KEY_ADMIN) {
            return this.returnGamesByTitle(gameTitle);
        }
        else {
            const { success, found_api_key, api_requests_today } = await this.usersRepository.incrementAPIRequest(userAPIKey);
            if (success && found_api_key) {
                return this.returnGamesByTitle(gameTitle);
            }
            else if (!success && found_api_key) {
                return { success, message: "Your API Requests reached limit for today", api_requests_today };
            }
            else {
                return { success, message: ErrorsMessages_1.ErrorsMessages.API_KEY_NOT_FOUND };
            }
        }
    }
}
exports.default = GameGetByTitleUseCase;
//# sourceMappingURL=GameGetByTitle.useCase.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const ErrorsMessages_1 = require("../Utils/ErrorsMessages");
const Exception_1 = require("../Utils/Exception");
class GameGetRandomUseCase {
    constructor(gamesRepository, usersRepository) {
        this.gamesRepository = gamesRepository;
        this.usersRepository = usersRepository;
    }
    async execute(apiKey) {
        if (!apiKey)
            throw new Exception_1.ClientException(ErrorsMessages_1.ErrorsMessages.INVALID_API_KEY);
        if (apiKey === process.env.API_KEY_ADMIN) {
            const randomGame = await this.gamesRepository.getRandom();
            if (randomGame)
                return { success: true, data: randomGame };
            throw new Exception_1.ClientException(ErrorsMessages_1.ErrorsMessages.GET_RANDOM_GAME_ERROR);
        }
        else {
            const { success, found_api_key, api_requests_today } = await this.usersRepository.incrementAPIRequest(apiKey);
            if (success && found_api_key) {
                const randomGame = await this.gamesRepository.getRandom();
                if (randomGame)
                    return { success, data: randomGame, api_requests_today };
                throw new Exception_1.ClientException(ErrorsMessages_1.ErrorsMessages.GET_RANDOM_GAME_ERROR);
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
exports.default = GameGetRandomUseCase;
//# sourceMappingURL=GameGetRandom.useCase.js.map
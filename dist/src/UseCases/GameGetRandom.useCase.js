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
        if (apiKey === 'nerdapiadmin') {
            const randomGame = await this.gamesRepository.getRandom();
            if (randomGame)
                return { success: true, data: randomGame };
            throw new Exception_1.ClientException(ErrorsMessages_1.ErrorsMessages.GET_RANDOM_GAME_ERROR);
        }
        else {
            const { success, api_requests_today } = await this.usersRepository.incrementAPIRequest(apiKey);
            if (success) {
                const randomGame = await this.gamesRepository.getRandom();
                if (randomGame)
                    return { success: true, data: randomGame };
                throw new Exception_1.ClientException(ErrorsMessages_1.ErrorsMessages.GET_RANDOM_GAME_ERROR);
            }
            else {
                return { success: false, message: 'Your API Requests reached limit for today', api_requests_today };
            }
        }
    }
}
exports.default = GameGetRandomUseCase;
//# sourceMappingURL=GameGetRandom.useCase.js.map
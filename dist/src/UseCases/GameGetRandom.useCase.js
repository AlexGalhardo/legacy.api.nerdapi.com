"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const ErrorsMessages_1 = require("../Utils/ErrorsMessages");
const Exception_1 = require("../Utils/Exception");
class GameGetRandomUseCase {
    constructor(gamesRepository) {
        this.gamesRepository = gamesRepository;
    }
    async execute() {
        const randomGame = await this.gamesRepository.getRandom();
        if (randomGame)
            return { success: true, data: randomGame };
        throw new Exception_1.ClientException(ErrorsMessages_1.ErrorsMessages.GET_RANDOM_GAME_ERROR);
    }
}
exports.default = GameGetRandomUseCase;
//# sourceMappingURL=GameGetRandom.useCase.js.map
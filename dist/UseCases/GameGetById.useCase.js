"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const ErrorsMessages_1 = require("../Utils/ErrorsMessages");
const Exception_1 = require("../Utils/Exception");
class GameGetByIdUseCase {
    constructor(gamesRepository) {
        this.gamesRepository = gamesRepository;
    }
    async execute(gameId) {
        const gameById = this.gamesRepository.getById(gameId);
        if (gameById)
            return { success: true, data: gameById };
        throw new Exception_1.ClientException(ErrorsMessages_1.ErrorsMessages.GET_GAME_BY_ID_ERROR);
    }
}
exports.default = GameGetByIdUseCase;
//# sourceMappingURL=GameGetById.useCase.js.map
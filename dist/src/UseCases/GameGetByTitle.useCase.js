"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const ErrorsMessages_1 = require("../Utils/ErrorsMessages");
const Exception_1 = require("../Utils/Exception");
class GameGetByTitleUseCase {
    constructor(gamesRepository) {
        this.gamesRepository = gamesRepository;
    }
    async execute(gameTitle) {
        const gameByTitle = this.gamesRepository.getByTitle(gameTitle);
        if (gameByTitle)
            return { success: true, data: gameByTitle };
        throw new Exception_1.ClientException(ErrorsMessages_1.ErrorsMessages.GET_GAME_BY_TITLE_ERROR);
    }
}
exports.default = GameGetByTitleUseCase;
//# sourceMappingURL=GameGetByTitle.useCase.js.map
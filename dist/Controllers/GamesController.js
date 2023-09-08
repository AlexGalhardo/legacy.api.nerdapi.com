"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamesController = void 0;
const common_1 = require("@nestjs/common");
let GamesController = class GamesController {
    constructor(gameGetRandomUseCase, gameGetByIdUseCase, gameGetByTitleUseCase) {
        this.gameGetRandomUseCase = gameGetRandomUseCase;
        this.gameGetByIdUseCase = gameGetByIdUseCase;
        this.gameGetByTitleUseCase = gameGetByTitleUseCase;
    }
    async getRandom(response) {
        try {
            const { success, data } = await this.gameGetRandomUseCase.execute();
            if (success)
                return response.status(common_1.HttpStatus.OK).json({ success: true, data });
        }
        catch (error) {
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({ success: false, message: error.message });
        }
    }
    async getById(request, response) {
        try {
            const { game_id } = request.params;
            const { success, data } = await this.gameGetByIdUseCase.execute(game_id);
            if (success)
                return response.status(common_1.HttpStatus.OK).json({ success: true, data });
        }
        catch (error) {
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({ success: false, message: error.message });
        }
    }
    async getByTitle(request, response) {
        try {
            const { game_title } = request.params;
            const { success, data } = await this.gameGetByTitleUseCase.execute(game_title);
            if (success)
                return response.status(common_1.HttpStatus.OK).json({ success: true, data });
        }
        catch (error) {
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({ success: false, message: error.message });
        }
    }
};
exports.GamesController = GamesController;
__decorate([
    (0, common_1.Get)("/random"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GamesController.prototype, "getRandom", null);
__decorate([
    (0, common_1.Get)("/id/:game_id"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GamesController.prototype, "getById", null);
__decorate([
    (0, common_1.Get)("/title/:game_title"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GamesController.prototype, "getByTitle", null);
exports.GamesController = GamesController = __decorate([
    (0, common_1.Controller)("games"),
    __param(0, (0, common_1.Inject)("GameGetRandomUseCasePort")),
    __param(1, (0, common_1.Inject)("GameGetByIdUseCasePort")),
    __param(2, (0, common_1.Inject)("GameGetByTitleUseCasePort")),
    __metadata("design:paramtypes", [Object, Object, Object])
], GamesController);
//# sourceMappingURL=GamesController.js.map
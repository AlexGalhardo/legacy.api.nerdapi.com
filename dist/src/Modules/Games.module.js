"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamesModule = void 0;
const common_1 = require("@nestjs/common");
const GamesController_1 = require("../Controllers/GamesController");
const Games_repository_1 = require("../Repositories/Games.repository");
const GameGetById_useCase_1 = require("../UseCases/GameGetById.useCase");
const GameGetByTitle_useCase_1 = require("../UseCases/GameGetByTitle.useCase");
const GameGetRandom_useCase_1 = require("../UseCases/GameGetRandom.useCase");
let GamesModule = class GamesModule {
};
exports.GamesModule = GamesModule;
exports.GamesModule = GamesModule = __decorate([
    (0, common_1.Module)({
        controllers: [GamesController_1.GamesController],
        providers: [
            {
                inject: [],
                provide: "GamesRepositoryPort",
                useFactory: () => {
                    return new Games_repository_1.default();
                },
            },
            {
                provide: "GameGetRandomUseCasePort",
                inject: ["GamesRepositoryPort"],
                useFactory: (gamesRepository) => {
                    return new GameGetRandom_useCase_1.default(gamesRepository);
                },
            },
            {
                provide: "GameGetByIdUseCasePort",
                inject: ["GamesRepositoryPort"],
                useFactory: (gamesRepository) => {
                    return new GameGetById_useCase_1.default(gamesRepository);
                },
            },
            {
                provide: "GameGetByTitleUseCasePort",
                inject: ["GamesRepositoryPort"],
                useFactory: (gamesRepository) => {
                    return new GameGetByTitle_useCase_1.default(gamesRepository);
                },
            },
        ],
    })
], GamesModule);
//# sourceMappingURL=Games.module.js.map
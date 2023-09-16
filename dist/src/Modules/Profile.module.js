"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileModule = void 0;
const common_1 = require("@nestjs/common");
const Profile_controller_1 = require("../Controllers/Profile.controller");
const Users_repository_1 = require("../Repositories/Users.repository");
const ProfileUpdate_useCase_1 = require("../UseCases/ProfileUpdate.useCase");
const Database_1 = require("../Utils/Database");
let ProfileModule = class ProfileModule {
};
exports.ProfileModule = ProfileModule;
exports.ProfileModule = ProfileModule = __decorate([
    (0, common_1.Module)({
        controllers: [Profile_controller_1.ProfileController],
        providers: [
            Database_1.Database,
            {
                provide: "UsersRepositoryPort",
                inject: [Database_1.Database],
                useFactory: (database) => {
                    return new Users_repository_1.default(undefined, database);
                },
            },
            {
                provide: "ProfileUpdateUseCasePort",
                inject: ["UsersRepositoryPort"],
                useFactory: (usersRepository) => {
                    return new ProfileUpdate_useCase_1.default(usersRepository);
                },
            },
        ],
    })
], ProfileModule);
//# sourceMappingURL=Profile.module.js.map
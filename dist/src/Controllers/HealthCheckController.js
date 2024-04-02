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
exports.HealthCheckController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const health_check_1 = require("../Entities/health-check");
let HealthCheckController = class HealthCheckController {
    async login(response) {
        return response.status(common_1.HttpStatus.OK).json({
            success: true,
            message: "Nerd API is on, lets goo!",
        });
    }
};
exports.HealthCheckController = HealthCheckController;
__decorate([
    (0, common_1.Get)("/"),
    (0, swagger_1.ApiResponse)({ status: 200, type: health_check_1.HealthCheck }),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HealthCheckController.prototype, "login", null);
exports.HealthCheckController = HealthCheckController = __decorate([
    (0, common_1.Controller)(),
    (0, swagger_1.ApiTags)("health-check")
], HealthCheckController);
//# sourceMappingURL=HealthCheckController.js.map
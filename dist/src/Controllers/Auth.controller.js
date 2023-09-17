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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
let AuthController = class AuthController {
    constructor(authLoginUseCase, authLoginGoogleUseCase, authLoginGitHubUseCase, authRegisterUseCase, authLogoutUseCase, authCheckUserJWTTokenUseCase, authForgetPasswordUseCase, authResetPasswordUseCase, authCheckResetPasswordTokenUseCase) {
        this.authLoginUseCase = authLoginUseCase;
        this.authLoginGoogleUseCase = authLoginGoogleUseCase;
        this.authLoginGitHubUseCase = authLoginGitHubUseCase;
        this.authRegisterUseCase = authRegisterUseCase;
        this.authLogoutUseCase = authLogoutUseCase;
        this.authCheckUserJWTTokenUseCase = authCheckUserJWTTokenUseCase;
        this.authForgetPasswordUseCase = authForgetPasswordUseCase;
        this.authResetPasswordUseCase = authResetPasswordUseCase;
        this.authCheckResetPasswordTokenUseCase = authCheckResetPasswordTokenUseCase;
    }
    async login(authLoginDTO, response) {
        try {
            const { success, jwt_token } = await this.authLoginUseCase.execute(authLoginDTO);
            if (success)
                return response.status(common_1.HttpStatus.OK).json({ success: true, jwt_token });
        }
        catch (error) {
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({ success: false, message: error.message });
        }
    }
    async register(authRegisterDTO, response) {
        try {
            const { success, jwt_token } = await this.authRegisterUseCase.execute(authRegisterDTO);
            if (success)
                return response.status(common_1.HttpStatus.OK).json({ success: true, jwt_token });
        }
        catch (error) {
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({ success: false, message: error.message });
        }
    }
    async logout(response) {
        try {
            const { success } = await this.authLogoutUseCase.execute(response.locals.jwt_token);
            if (success)
                return response.status(common_1.HttpStatus.OK).json({ success: true });
        }
        catch (error) {
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({ success: false, message: error.message });
        }
    }
    async tokenUser(response) {
        try {
            const { success, data } = await this.authCheckUserJWTTokenUseCase.execute(response.locals.jwt_token);
            if (success)
                return response.status(common_1.HttpStatus.OK).json({ success: true, data });
        }
        catch (error) {
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({ success: false, message: error.message });
        }
    }
    async forgetPassword(authForgetPasswordDTO, response) {
        try {
            const { success } = await this.authForgetPasswordUseCase.execute(authForgetPasswordDTO);
            if (success)
                return response.status(common_1.HttpStatus.OK).json({ success: true });
        }
        catch (error) {
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({ success: false, message: error.message });
        }
    }
    async resetPassword(authResetPasswordDTO, request, response) {
        try {
            const { reset_password_token } = request.params;
            const { success } = await this.authResetPasswordUseCase.execute(reset_password_token, authResetPasswordDTO);
            if (success)
                return response.status(common_1.HttpStatus.OK).json({ success: true });
        }
        catch (error) {
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({ success: false, message: error.message });
        }
    }
    async checkResetPasswordToken({ resetPasswordToken }, response) {
        try {
            const { success } = await this.authCheckResetPasswordTokenUseCase.execute(resetPasswordToken);
            if (success)
                return response.status(common_1.HttpStatus.OK).json({ success: true });
        }
        catch (error) {
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({ success: false, message: error.message });
        }
    }
    async loginGoogle(request, response) {
        try {
            const { success, redirect } = await this.authLoginGoogleUseCase.execute(request);
            if (success) {
                response.redirect(redirect);
            }
        }
        catch (error) {
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({ success: false, message: error.message });
        }
    }
    async loginGithub(request, response) {
        try {
            const { success, redirect } = await this.authLoginGitHubUseCase.execute(request);
            if (success) {
                response.redirect(redirect);
            }
        }
        catch (error) {
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({ success: false, message: error.message });
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)("/login"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)("/register"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)("/logout"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Post)("/check-user-jwt-token"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "tokenUser", null);
__decorate([
    (0, common_1.Post)("/forget-password"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgetPassword", null);
__decorate([
    (0, common_1.Post)("/reset-password/:reset_password_token"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Post)("/check-reset-password-token"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "checkResetPasswordToken", null);
__decorate([
    (0, common_1.Get)("/login/google/callback"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginGoogle", null);
__decorate([
    (0, common_1.Get)("/login/github/callback"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginGithub", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)(),
    __param(0, (0, common_1.Inject)("AuthLoginUseCasePort")),
    __param(1, (0, common_1.Inject)("AuthLoginGoogleUseCasePort")),
    __param(2, (0, common_1.Inject)("AuthLoginGitHubUseCasePort")),
    __param(3, (0, common_1.Inject)("AuthRegisterUseCasePort")),
    __param(4, (0, common_1.Inject)("AuthLogoutUseCasePort")),
    __param(5, (0, common_1.Inject)("AuthCheckUserJWTTokenUseCasePort")),
    __param(6, (0, common_1.Inject)("AuthForgetPasswordUseCasePort")),
    __param(7, (0, common_1.Inject)("AuthResetPasswordUseCasePort")),
    __param(8, (0, common_1.Inject)("AuthCheckResetPasswordTokenUseCasePort")),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object, Object, Object])
], AuthController);
//# sourceMappingURL=Auth.controller.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateToken = void 0;
const common_1 = require("@nestjs/common");
const ErrorsMessages_1 = require("../Utils/ErrorsMessages");
let ValidateToken = class ValidateToken {
    use(request, response, next) {
        var _a;
        if (!((_a = request.headers) === null || _a === void 0 ? void 0 : _a.authorization) ||
            !request.headers.authorization.startsWith("Bearer") ||
            !request.headers.authorization.split(" ")[1]) {
            return response
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json({ success: false, message: ErrorsMessages_1.ErrorsMessages.TOKEN_EXPIRED_OR_INVALID });
        }
        const token = request.headers.authorization.split(" ")[1];
        response.locals.token = token;
        next();
    }
};
exports.ValidateToken = ValidateToken;
exports.ValidateToken = ValidateToken = __decorate([
    (0, common_1.Injectable)()
], ValidateToken);
//# sourceMappingURL=ValidateToken.middleware.js.map
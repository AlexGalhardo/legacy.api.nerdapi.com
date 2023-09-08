"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomToken = void 0;
const crypto = require("crypto");
function generateRandomToken(tokenLength = 32) {
    return crypto
        .randomBytes(Math.ceil(tokenLength / 2))
        .toString("hex")
        .slice(0, tokenLength);
}
exports.generateRandomToken = generateRandomToken;
//# sourceMappingURL=RandomToken.js.map
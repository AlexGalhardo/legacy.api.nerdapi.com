"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
function GenerateRandomToken(tokenLength = 48) {
    return crypto
        .randomBytes(Math.ceil(tokenLength / 2))
        .toString("hex")
        .slice(0, tokenLength);
}
exports.default = GenerateRandomToken;
//# sourceMappingURL=GenerateRandomToken.js.map
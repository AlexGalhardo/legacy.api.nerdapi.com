"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SMTP = void 0;
const nodemailer = require("nodemailer");
require("dotenv/config");
exports.SMTP = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});
//# sourceMappingURL=SMTP.js.map
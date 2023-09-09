"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DateTime_1 = require("../Utils/DataTypes/DateTime");
const SMTP_1 = require("../Utils/SMTP");
class ContactSendMessageUseCase {
    constructor(smtp = SMTP_1.SMTP) {
        this.smtp = smtp;
    }
    async execute(contactSendMessageDTO) {
        const { name, email, subject, message } = contactSendMessageDTO;
        if (name && email && subject && message) {
            await this.smtp.sendMail({
                from: process.env.SMTP_EMAIL_FROM,
                to: "aleexgvieira@gmail.com",
                subject: `NerdAPI: Message from ${email}: ${subject}`,
                html: `
					<p><strong>DATE:</strong> ${new Date()}</p>
					<p><strong>DateTime PT-BR:</strong> ${DateTime_1.default.getNow()}</p>
					<p><strong>NAME:</strong> ${name}</p>
					<p><strong>EMAIL:</strong> ${email}</p>
					<p><strong>SUBJECT:</strong> ${subject}</p>
					<hr>
					<p><strong>MESSAGE:</strong> ${message}</p>
				`,
            });
            return { success: true };
        }
        return { success: false };
    }
}
exports.default = ContactSendMessageUseCase;
//# sourceMappingURL=ContactSendMessage.useCase.js.map
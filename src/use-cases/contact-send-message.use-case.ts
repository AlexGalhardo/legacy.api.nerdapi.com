import DateTime from "src/utils/date-time.util";
import { SMTP } from "src/config/smtp.config";
import TelegramLog from "src/config/telegram-logger.config";

export interface ContactSendMessageDTO {
    name: string;
    email: string;
    subject: string;
    message: string;
}

interface ContactSendMessageUseCaseResponse {
    success: boolean;
}

export interface ContactSendMessageUseCasePort {
    execute(contactSendMessageDTO: ContactSendMessageDTO): Promise<ContactSendMessageUseCaseResponse>;
}

export default class ContactSendMessageUseCase implements ContactSendMessageUseCasePort {
    constructor(private readonly smtp = SMTP) {}

    async execute(contactSendMessageDTO: ContactSendMessageDTO): Promise<ContactSendMessageUseCaseResponse> {
        const { name, email, subject, message } = contactSendMessageDTO;

        if (name && email && subject && message) {
            await this.smtp.sendMail({
                from: process.env.SMTP_EMAIL_FROM,
                to: "aleexgvieira@gmail.com", // email
                subject: `NerdAPI: Message from ${email}: ${subject}`,
                html: `
					<p><strong>DATE:</strong> ${new Date()}</p>
					<p><strong>DateTime PT-BR:</strong> ${DateTime.getNow()}</p>
					<p><strong>NAME:</strong> ${name}</p>
					<p><strong>EMAIL:</strong> ${email}</p>
					<p><strong>SUBJECT:</strong> ${subject}</p>
					<hr>
					<p><strong>MESSAGE:</strong> ${message}</p>
				`,
            });

            TelegramLog.info(`
				<b>NAME:</b> ${name}
				<b>EMAIL:</b> ${email}
				<b>SUBJECT:</b> ${subject}
				<b>MESSAGE:</b> ${message}`);

            return { success: true };
        }

        return { success: false };
    }
}

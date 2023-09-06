import { SMTP } from "src/Utils/SMTP";

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
                subject: `Galhardo MicroSaaS: Message from ${email}: ${subject}`,
                html: `
					<p><strong>DATE:</strong> ${new Date()}</p>
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

import * as nodemailer from "nodemailer";
import "dotenv/config";

export const SMTP = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
	port: Number(process.env.SMTP_PORT),
	secure: true,
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASSWORD,
	}
});
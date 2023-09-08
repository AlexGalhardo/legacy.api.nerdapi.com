import * as nodemailer from "nodemailer";
import "dotenv/config";
export declare const SMTP: nodemailer.Transporter<import("nodemailer/lib/smtp-transport").SentMessageInfo>;

import TelegramLogger from "@alexgalhardo/telegram-logger";

const TelegramLog = new TelegramLogger(
    process.env.TELEGRAM_BOT_HTTP_TOKEN,
    Number(process.env.TELEGRAM_BOT_CHANNEL_ID),
);

export default TelegramLog;

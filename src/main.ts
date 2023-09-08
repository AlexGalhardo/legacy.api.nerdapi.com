import { NestFactory } from "@nestjs/core";
import { AppModule } from "./App.module";
import "dotenv/config";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.listen(process.env.PORT || 3000, () => {
        console.log(`\n\nAPI.NERDAPI.COM running on http://localhost:${process.env.PORT || 3000}`);
    });
}

bootstrap();

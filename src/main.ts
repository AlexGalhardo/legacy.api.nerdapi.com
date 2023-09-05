import { NestFactory } from "@nestjs/core";
import { AppModule } from "./App.module";
import "dotenv/config";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(3000, () => {
        console.log("running on http://localhost:3000");
    });
}

bootstrap();

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./App.module";
import "dotenv/config";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });
	// app.enableCors({
	// 	origin: "http://localhost:5173/"
	// });
    await app.listen(process.env.PORT || 3000, () => {
        console.log(`\n\nGalhardo MicroSaaS API running on http://localhost:${process.env.PORT || 3000}`);
    });
}

bootstrap();

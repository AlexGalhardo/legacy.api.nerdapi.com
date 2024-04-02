import { NestFactory } from "@nestjs/core";
import { AppModule } from "./App.module";
import "dotenv/config";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();

    const config = new DocumentBuilder()
        .setTitle("Example")
        .setDescription("The Nerd API Documentation")
        .setVersion("1.0")
        .addTag("example")
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, document);

    await app.listen(process.env.PORT || 3000, () => {
        console.log(`\n\nAPI.NERDAPI.COM running on http://localhost:${process.env.PORT || 3000}`);
    });
}

bootstrap();

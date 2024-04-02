"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const App_module_1 = require("./App.module");
require("dotenv/config");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(App_module_1.AppModule);
    app.enableCors();
    const config = new swagger_1.DocumentBuilder()
        .setTitle("Example")
        .setDescription("The Nerd API Documentation")
        .setVersion("1.0")
        .addTag("example")
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup("api", app, document);
    await app.listen(process.env.PORT || 3000, () => {
        console.log(`\n\nAPI.NERDAPI.COM running on http://localhost:${process.env.PORT || 3000}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map
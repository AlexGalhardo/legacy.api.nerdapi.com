"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const App_module_1 = require("./App.module");
require("dotenv/config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(App_module_1.AppModule);
    app.enableCors();
    await app.listen(process.env.PORT || 3000, () => {
        console.log(`\n\nGalhardo MicroSaaS API running on http://localhost:${process.env.PORT || 3000}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map
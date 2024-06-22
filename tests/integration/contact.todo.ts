import * as request from "supertest";
import { Test } from "@nestjs/testing";
import { AppModule } from "../../src/app.module";
import { HttpStatus, INestApplication } from "@nestjs/common";

describe("AppController (e2e)", () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            controllers: [],
            imports: [AppModule],
            providers: [],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it("POST /contact endpoint should return HttpStatus.OK", () => {
        return request(app.getHttpServer())
            .post("/contact")
            .send({
                name: "Teste e2e",
                email: "teste_e2e@gmail.com",
                subject: "TESTE E2E",
                message: "Test message e2e",
            })
            .expect(HttpStatus.OK)
            .expect({
                success: true,
            });
    });
});

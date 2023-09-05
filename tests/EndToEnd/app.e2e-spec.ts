import * as request from "supertest";
import { Test } from "@nestjs/testing";
import { AppModule } from "../../src/App.module";
import { HttpStatus, INestApplication } from "@nestjs/common";
import { AuthController } from "../../src/Controllers/Auth.controller";
import UserRepository, { UserRepositoryPort } from "../../src/Repositories/Users.repository";
import AuthLoginUseCase from "../../src/UseCases/AuthLogin.useCase";
import AuthRegisterUseCase from "../../src/UseCases/AuthRegister.useCase";
import AuthForgetPasswordUseCase from "../../src/UseCases/AuthForgetPassword.useCase";
import AuthResetPasswordUseCase from "../../src/UseCases/AuthResetPassword.useCase";

describe("AppController (e2e)", () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            controllers: [AuthController],
            imports: [AppModule],
            providers: [
                {
                    inject: [],
                    provide: "UserRepositoryPort",
                    useFactory: () => {
                        return new UserRepository();
                    },
                },
                {
                    provide: "AuthRegisterUseCasePort",
                    inject: ["UserRepositoryPort"],
                    useFactory: (userRepository: UserRepositoryPort) => {
                        return new AuthRegisterUseCase(userRepository);
                    },
                },
                {
                    provide: "AuthLoginUseCasePort",
                    inject: ["UserRepositoryPort"],
                    useFactory: (userRepository: UserRepositoryPort) => {
                        return new AuthLoginUseCase(userRepository);
                    },
                },
                {
                    provide: "AuthForgetPasswordUseCasePort",
                    inject: ["UserRepositoryPort"],
                    useFactory: (userRepository: UserRepositoryPort) => {
                        return new AuthForgetPasswordUseCase(userRepository);
                    },
                },
                {
                    provide: "AuthResetPasswordUseCasePort",
                    inject: ["UserRepositoryPort"],
                    useFactory: (userRepository: UserRepositoryPort) => {
                        return new AuthResetPasswordUseCase(userRepository);
                    },
                },
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it("GET healthCheck / endpoint should return HttpStatus.OK", () => {
        return request(app.getHttpServer()).get("/").expect(HttpStatus.OK).expect({
            success: true,
            message: "Galhardo MicroSaaS API is on!",
        });
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

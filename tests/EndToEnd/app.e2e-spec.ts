import * as request from "supertest";
import { Test } from "@nestjs/testing";
import { AppModule } from "../../src/App.module";
import { HttpStatus, INestApplication } from "@nestjs/common";
import { AuthController } from "../../src/Controllers/Auth.controller";
import usersRepository, { UsersRepositoryPort } from "../../src/Repositories/Users.repository";
import AuthLoginUseCase from "../../src/UseCases/AuthLogin.useCase";
import AuthRegisterUseCase from "../../src/UseCases/AuthRegister.useCase";
import AuthForgetPasswordUseCase from "../../src/UseCases/AuthForgetPassword.useCase";
import AuthResetPasswordUseCase from "../../src/UseCases/AuthResetPassword.useCase";
import AuthLogoutUseCase from "src/UseCases/AuthLogout.useCase";
import AuthTokenUserUseCase from "src/UseCases/AuthTokenUser.useCase";

describe("AppController (e2e)", () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            controllers: [AuthController],
            imports: [AppModule],
            providers: [
                {
                    inject: [],
                    provide: "UsersRepositoryPort",
                    useFactory: () => {
                        return new UsersRepository();
                    },
                },
                {
                    provide: "AuthRegisterUseCasePort",
                    inject: ["UsersRepositoryPort"],
                    useFactory: (usersRepository: UsersRepositoryPort) => {
                        return new AuthRegisterUseCase(usersRepository);
                    },
                },
                {
                    provide: "AuthLoginUseCasePort",
                    inject: ["UsersRepositoryPort"],
                    useFactory: (usersRepository: UsersRepositoryPort) => {
                        return new AuthLoginUseCase(usersRepository);
                    },
                },
                {
                    provide: "AuthLogoutUseCasePort",
                    inject: ["UsersRepositoryPort"],
                    useFactory: (usersRepository: UsersRepositoryPort) => {
                        return new AuthLogoutUseCase(usersRepository);
                    },
                },
                {
                    provide: "AuthTokenUserUseCasePort",
                    inject: ["UsersRepositoryPort"],
                    useFactory: (usersRepository: UsersRepositoryPort) => {
                        return new AuthTokenUserUseCase(usersRepository);
                    },
                },
                {
                    provide: "AuthForgetPasswordUseCasePort",
                    inject: ["UsersRepositoryPort"],
                    useFactory: (usersRepository: UsersRepositoryPort) => {
                        return new AuthForgetPasswordUseCase(usersRepository);
                    },
                },
                {
                    provide: "AuthResetPasswordUseCasePort",
                    inject: ["UsersRepositoryPort"],
                    useFactory: (usersRepository: UsersRepositoryPort) => {
                        return new AuthResetPasswordUseCase(usersRepository);
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

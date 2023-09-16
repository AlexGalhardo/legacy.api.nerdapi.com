import * as request from "supertest";
import { Test } from "@nestjs/testing";
import { AppModule } from "../../src/App.module";
import { HttpStatus, INestApplication } from "@nestjs/common";
import { AuthController } from "../../src/Controllers/Auth.controller";
import UsersRepository, { UsersRepositoryPort } from "../../src/Repositories/Users.repository";
import AuthLoginUseCase from "../../src/UseCases/AuthLogin.useCase";
import AuthRegisterUseCase from "../../src/UseCases/AuthRegister.useCase";
import AuthForgetPasswordUseCase from "../../src/UseCases/AuthForgetPassword.useCase";
import AuthResetPasswordUseCase from "../../src/UseCases/AuthResetPassword.useCase";
import AuthLogoutUseCase from "src/UseCases/AuthLogout.useCase";
import AuthTokenUserUseCase from "src/UseCases/AuthTokenUser.useCase";
import AuthLoginGoogleUseCase from "src/UseCases/AuthLoginGoogle.useCase";
import AuthCheckResetPasswordTokenUseCase from "src/UseCases/AuthCheckResetPasswordToken.useCase";
import { Database } from "src/Utils/Database";
import AuthLoginGitHubUseCase from "src/UseCases/AuthLoginGitHubUseCase.useCase";

describe("AppController (e2e)", () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            controllers: [AuthController],
            imports: [AppModule],
            providers: [
				Database,
                {
                    provide: "UsersRepositoryPort",
                    inject: [Database],
                    useFactory: (database: Database) => {
                        return new UsersRepository(undefined, database);
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
                    provide: "AuthLoginGoogleUseCasePort",
                    inject: ["UsersRepositoryPort"],
                    useFactory: (usersRepository: UsersRepositoryPort) => {
                        return new AuthLoginGoogleUseCase(usersRepository);
                    },
                },
				{
                    provide: "AuthLoginGitHubUseCasePort",
                    inject: ["UsersRepositoryPort"],
                    useFactory: (usersRepository: UsersRepositoryPort) => {
                        return new AuthLoginGitHubUseCase(usersRepository);
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
                {
                    provide: "AuthCheckResetPasswordTokenUseCasePort",
                    inject: ["UsersRepositoryPort"],
                    useFactory: (usersRepository: UsersRepositoryPort) => {
                        return new AuthCheckResetPasswordTokenUseCase(usersRepository);
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
            message: "Nerd API is on, lets goo!",
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

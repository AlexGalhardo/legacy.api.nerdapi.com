import { Module } from "@nestjs/common";
import { ProfileController } from "src/Controllers/Profile.controller";
import UsersRepository, { UsersRepositoryPort } from "src/Repositories/Users.repository";
import ProfileUpdateUseCase from "src/UseCases/ProfileUpdate.useCase";

@Module({
    controllers: [ProfileController],
    providers: [
        {
            inject: [],
            provide: "UsersRepositoryPort",
            useFactory: () => {
                return new UsersRepository();
            },
        },
        {
            provide: "ProfileUpdateUseCasePort",
            inject: ["UsersRepositoryPort"],
            useFactory: (usersRepository: UsersRepositoryPort) => {
                return new ProfileUpdateUseCase(usersRepository);
            },
        },
    ],
})
export class ProfileModule {}

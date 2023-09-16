import { Module } from "@nestjs/common";
import { ProfileController } from "src/Controllers/Profile.controller";
import UsersRepository, { UsersRepositoryPort } from "src/Repositories/Users.repository";
import ProfileUpdateUseCase from "src/UseCases/ProfileUpdate.useCase";
import { Database } from "src/Utils/Database";

@Module({
    controllers: [ProfileController],
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
            provide: "ProfileUpdateUseCasePort",
            inject: ["UsersRepositoryPort"],
            useFactory: (usersRepository: UsersRepositoryPort) => {
                return new ProfileUpdateUseCase(usersRepository);
            },
        },
    ],
})
export class ProfileModule {}

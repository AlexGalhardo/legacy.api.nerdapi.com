import { Module } from "@nestjs/common";
import { ProfileController } from "src/controllers/profile.controller";
import UsersRepository, { UsersRepositoryPort } from "src/repositories/users.repository";
import ProfileUpdateUseCase from "src/use-cases/profile-update.use-case";
import { Database } from "src/config/database.config";

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

import { Module } from "@nestjs/common";
import { ProfileController } from "src/Controllers/Profile.controller";
import UserRepository, { UserRepositoryPort } from "src/Repositories/Users.repository";
import ProfileUpdateUseCase from "src/UseCases/ProfileUpdate.useCase";

@Module({
    controllers: [ProfileController],
    providers: [
        {
            inject: [],
            provide: "UserRepositoryPort",
            useFactory: () => {
                return new UserRepository();
            },
        },
        {
            provide: "ProfileUpdateUseCasePort",
            inject: ["UserRepositoryPort"],
            useFactory: (userRepository: UserRepositoryPort) => {
                return new ProfileUpdateUseCase(userRepository);
            },
        },
    ],
})
export class ProfileModule {}

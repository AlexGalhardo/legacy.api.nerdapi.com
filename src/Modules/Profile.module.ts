import { Module } from '@nestjs/common'
import { ProfileController } from "src/Controllers/Profile.controller";

@Module({
    controllers: [ProfileController],
    providers: [],
})

export class ProfileModule {}
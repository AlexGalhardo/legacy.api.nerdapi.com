import { Module } from '@nestjs/common'
import { HealthCheckController } from "src/Controllers/HealthCheckController";

@Module({
    controllers: [HealthCheckController],
    providers: [],
})

export class HealthCheckModule {}
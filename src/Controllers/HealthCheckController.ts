import { Controller, Res, HttpStatus, Get } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { HealthCheck } from "src/Entities/health-check";

@Controller()
@ApiTags("health-check")
export class HealthCheckController {
    @Get("/")
    @ApiResponse({ status: 200, type: HealthCheck })
    async login(@Res() response: Response) {
        return response.status(HttpStatus.OK).json({
            success: true,
            message: "Nerd API is on, lets goo!",
        });
    }
}

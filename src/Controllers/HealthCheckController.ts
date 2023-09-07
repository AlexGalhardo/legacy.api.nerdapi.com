import { Controller, Res, HttpStatus, Get } from "@nestjs/common";
import { Response } from "express";

@Controller()
export class HealthCheckController {
    @Get("/")
    async login(@Res() response: Response) {
        return response.status(HttpStatus.OK).json({
            success: true,
            message: "Nerd API is on, lets goo!",
        });
    }
}

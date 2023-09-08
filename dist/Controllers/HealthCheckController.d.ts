import { Response } from "express";
export declare class HealthCheckController {
    login(response: Response): Promise<Response<any, Record<string, any>>>;
}

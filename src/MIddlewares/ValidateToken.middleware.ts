import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { ErrorsMessages } from "src/Utils/ErrorsMessages";
import { ClientException } from "src/Utils/Exception";

@Injectable()
export class ValidateToken implements NestMiddleware {
    use(request: Request, response: Response, next: NextFunction) {
        if (
            !request.headers?.authorization ||
            !request.headers.authorization.startsWith("Bearer") ||
            !request.headers.authorization.split(" ")[1]
        ) {
            throw new ClientException(ErrorsMessages.TOKEN_EXPIRED_OR_INVALID);
        }

        const jwt_token = request.headers.authorization.split(" ")[1];

        response.locals.jwt_token = jwt_token;

		// response.locals.jwt_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiIyMmE3MTMxNS0yZGEwLTQ2NzYtYmNkNC1jMzRmMjRlMWM4OTUiLCJpYXQiOjE2OTQyMTQxOTh9.n3hiu645O1K1rVDbleJjZePL-FS5jX_6b29IqlSckgs';

        next();
    }
}

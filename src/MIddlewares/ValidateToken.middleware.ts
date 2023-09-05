import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ErrorsMessages } from 'src/Utils/ErrorsMessages';
import { ClientException } from 'src/Utils/Exception';

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

		const token = request.headers.authorization.split(" ")[1];

		response.locals.token = token;

    	next();
  	}
}

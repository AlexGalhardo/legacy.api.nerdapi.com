"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerException = exports.ForbiddenException = exports.UnauthorizedException = exports.ClientNotFoundException = exports.ClientException = exports.RequestException = void 0;
class RequestException extends Error {
    constructor(message, httpStatusCode) {
        super(message);
        this.HTTP_STATUS_CODE = 500;
        this.HTTP_STATUS_CODE = httpStatusCode;
        this.name = "RequestException";
    }
    get httpStatusCode() {
        return this.HTTP_STATUS_CODE;
    }
}
exports.RequestException = RequestException;
class ClientException extends RequestException {
    constructor(message) {
        super(message, 400);
        this.name = "ClientException";
    }
}
exports.ClientException = ClientException;
class ClientNotFoundException extends RequestException {
    constructor(message) {
        super(message, 404);
        this.name = "ClientNotFoundException";
    }
}
exports.ClientNotFoundException = ClientNotFoundException;
class UnauthorizedException extends RequestException {
    constructor(message) {
        super(message, 401);
        this.name = "UnauthorizedException";
    }
}
exports.UnauthorizedException = UnauthorizedException;
class ForbiddenException extends RequestException {
    constructor(message) {
        super(message, 403);
        this.name = "ForbiddenException";
    }
}
exports.ForbiddenException = ForbiddenException;
class ServerException extends RequestException {
    constructor(message) {
        super(message, 500);
        this.name = "ServerException";
    }
}
exports.ServerException = ServerException;
//# sourceMappingURL=Exception.js.map
export declare abstract class RequestException extends Error {
    private readonly HTTP_STATUS_CODE;
    constructor(message: string, httpStatusCode: number);
    get httpStatusCode(): number;
}
export declare class ClientException extends RequestException {
    constructor(message: string);
}
export declare class ClientNotFoundException extends RequestException {
    constructor(message: string);
}
export declare class UnauthorizedException extends RequestException {
    constructor(message: string);
}
export declare class ForbiddenException extends RequestException {
    constructor(message: string);
}
export declare class ServerException extends RequestException {
    constructor(message: string);
}

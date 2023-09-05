export enum ErrorsMessages {
    PROCESSING_ERROR = 'PROCESSING_ERROR',
    
    USER_ALREADY_EXISTS = 'User already exists',
    USER_NOT_FOUND = 'User not found',
    USER_CANNOT_AUTHENTICATE = 'Cannot authenticate user',

    INVALID_LOGIN_TOKEN = 'Invalid session token',
    
    TOKEN_EXPIRED_OR_INVALID = 'Token expired or invalid',
    
    PASSWORD_IS_INVALID = 'Password is invalid',
    PASSWORD_IS_REQUIRED = 'Password is required',
    EMAIL_IS_INVALID = 'Email is invalid',
    NAME_IS_INVALID = 'Name is invalid'
}
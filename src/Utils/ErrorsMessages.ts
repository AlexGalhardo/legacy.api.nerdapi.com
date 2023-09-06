export enum ErrorsMessages {
    PROCESSING_ERROR = "PROCESSING_ERROR",

    USER_ALREADY_EXISTS = "User already exists",
    USER_NOT_FOUND = "User not found",
    USER_CANNOT_AUTHENTICATE = "Cannot authenticate user",

    INVALID_LOGIN_TOKEN = "Invalid session token",

    INVALID_PHONE_NUMBER = "Invalid phone number",

    TOKEN_EXPIRED_OR_INVALID = "Token expired or invalid",

    NAME_IS_INVALID = "Name is invalid",

    INVALID_PASSWORD = "Invalid password",
    INVALID_OLDER_PASSWORD = "Invalid older password",
    PASSWORD_IS_REQUIRED = "Password is required",
    PASSWORDS_NOT_EQUAL = "Passwords not equal",
    NEW_PASSWORD_IS_INSECURE = "New password is insecure",
    PASSWORD_INSECURE = "Password is insecure",

    RESET_PASSWORD_TOKEN_EXPIRED = "Reset password token expired",

    EMAIL_IS_INVALID = "Email is invalid",
    EMAIL_ALREADY_REGISTRED = "Email already registred",

    EMAIL_OR_PASSWORD_INVALID = "Email or password invalid",
    EMAIL_NOT_REGISTRED = "Email not registred",

    USER_HAS_ACTIVE_PLAN = "User has active plan",
}

export enum ErrorsMessages {
    PROCESSING_ERROR = "PROCESSING_ERROR",

    INVALID_USERNAME = "Invalid username",

    USER_ALREADY_EXISTS = "User already exists",
    USER_NOT_FOUND = "User not found",
    USER_CANNOT_AUTHENTICATE = "Cannot authenticate user",

    INVALID_LOGIN_TOKEN = "Invalid session token",

    INVALID_PHONE_NUMBER = "Invalid telegram number",

    TOKEN_EXPIRED_OR_INVALID = "Header Authorization Bearer Token or API Key Expired Or Invalid",

    NAME_IS_INVALID = "Name is invalid",

    INVALID_PASSWORD = "Invalid password",
    INVALID_OLDER_PASSWORD = "Invalid older password",
    PASSWORD_IS_REQUIRED = "Password is required",
    PASSWORDS_NOT_EQUAL = "Passwords not equal",
    NEW_PASSWORD_IS_INSECURE = "New password is insecure",
    PASSWORD_INSECURE = "Password is insecure",

    PHONE_NUMBER_ALREADY_REGISTRED = "Phone number already registred",

    RESET_PASSWORD_TOKEN_EXPIRED = "Reset password token expired",

    EMAIL_IS_INVALID = "Email is invalid",
    EMAIL_ALREADY_REGISTRED = "Email already registred",

    EMAIL_OR_PASSWORD_INVALID = "Email and/or Password Invalid",
    EMAIL_NOT_REGISTRED = "Email not registred",

    USER_HAS_ACTIVE_PLAN = "User has active plan",

    GET_RANDOM_GAME_ERROR = "Get random game error",
    GET_GAME_BY_TITLE_ERROR = "Get game by title error",
    GET_GAME_BY_ID_ERROR = "Get game by id error",

    RESET_PASSWORD_TOKEN_INVALID = "Reset password token invalid",

    GAME_NOT_FOUND = "Game not found",

    INVALID_API_KEY = "You need to send request with a API Key",
    API_KEY_NOT_FOUND = "API Key not found",
}

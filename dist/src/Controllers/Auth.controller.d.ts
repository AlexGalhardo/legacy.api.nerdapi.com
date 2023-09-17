import { Request, Response } from "express";
import { AuthCheckResetPasswordTokenUseCasePort, CheckResetPasswordTokenDTO } from "src/UseCases/AuthCheckResetPasswordToken.useCase";
import { AuthForgetPasswordDTO, AuthForgetPasswordUseCasePort } from "src/UseCases/AuthForgetPassword.useCase";
import { AuthLoginDTO, AuthLoginUseCasePort } from "src/UseCases/AuthLogin.useCase";
import { AuthLoginGitHubUseCasePort } from "src/UseCases/AuthLoginGitHubUseCase.useCase";
import { AuthLoginGoogleUseCasePort } from "src/UseCases/AuthLoginGoogle.useCase";
import { AuthLogoutUseCasePort } from "src/UseCases/AuthLogout.useCase";
import { AuthRegisterDTO, AuthRegisterUseCasePort } from "src/UseCases/AuthRegister.useCase";
import { AuthResetPasswordDTO, AuthResetPasswordUseCasePort } from "src/UseCases/AuthResetPassword.useCase";
import { AuthCheckUserJWTTokenUseCasePort } from "src/UseCases/AuthCheckUserJWTToken.useCase";
interface AuthUseCaseResponse {
    success: boolean;
    jwt_token?: string;
    message?: string;
    redirect?: string;
}
interface AuthControllerPort {
    login(authLoginDTO: AuthLoginDTO, response: Response): Promise<Response<AuthUseCaseResponse>>;
    register(authRegisterDTO: AuthRegisterDTO, response: Response): Promise<Response<AuthUseCaseResponse>>;
    logout(response: Response): Promise<Response<AuthUseCaseResponse>>;
    tokenUser(response: Response): Promise<Response<AuthUseCaseResponse>>;
    forgetPassword(authForgetPasswordDTO: AuthForgetPasswordDTO, response: Response): Promise<Response<AuthUseCaseResponse>>;
    resetPassword(authResetPasswordDTO: AuthResetPasswordDTO, request: Request, response: Response): Promise<Response<AuthUseCaseResponse>>;
    loginGoogle(query: any, request: Request, response: Response): Promise<Response<AuthUseCaseResponse>>;
    loginGithub(request: Request, response: Response): Promise<Response<AuthUseCaseResponse>>;
}
export declare class AuthController implements AuthControllerPort {
    private readonly authLoginUseCase;
    private readonly authLoginGoogleUseCase;
    private readonly authLoginGitHubUseCase;
    private readonly authRegisterUseCase;
    private readonly authLogoutUseCase;
    private readonly authCheckUserJWTTokenUseCase;
    private readonly authForgetPasswordUseCase;
    private readonly authResetPasswordUseCase;
    private readonly authCheckResetPasswordTokenUseCase;
    constructor(authLoginUseCase: AuthLoginUseCasePort, authLoginGoogleUseCase: AuthLoginGoogleUseCasePort, authLoginGitHubUseCase: AuthLoginGitHubUseCasePort, authRegisterUseCase: AuthRegisterUseCasePort, authLogoutUseCase: AuthLogoutUseCasePort, authCheckUserJWTTokenUseCase: AuthCheckUserJWTTokenUseCasePort, authForgetPasswordUseCase: AuthForgetPasswordUseCasePort, authResetPasswordUseCase: AuthResetPasswordUseCasePort, authCheckResetPasswordTokenUseCase: AuthCheckResetPasswordTokenUseCasePort);
    login(authLoginDTO: AuthLoginDTO, response: Response): Promise<Response<AuthUseCaseResponse>>;
    register(authRegisterDTO: AuthRegisterDTO, response: Response): Promise<Response<AuthUseCaseResponse>>;
    logout(response: Response): Promise<Response<AuthUseCaseResponse>>;
    tokenUser(response: Response): Promise<Response<AuthUseCaseResponse>>;
    forgetPassword(authForgetPasswordDTO: AuthForgetPasswordDTO, response: Response): Promise<Response<AuthUseCaseResponse>>;
    resetPassword(authResetPasswordDTO: AuthResetPasswordDTO, request: Request, response: Response): Promise<Response<AuthUseCaseResponse>>;
    checkResetPasswordToken({ resetPasswordToken }: CheckResetPasswordTokenDTO, response: Response): Promise<Response<AuthUseCaseResponse>>;
    loginGoogle(query: any, request: Request, response: Response): Promise<Response<AuthUseCaseResponse>>;
    loginGithub(request: Request, response: Response): Promise<Response<AuthUseCaseResponse>>;
}
export {};

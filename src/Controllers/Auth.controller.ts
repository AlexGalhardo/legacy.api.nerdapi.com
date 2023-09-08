import { Controller, Post, Res, Body, Inject, HttpStatus, Req } from "@nestjs/common";
import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { AuthForgetPasswordDTO, AuthForgetPasswordUseCasePort } from "src/UseCases/AuthForgetPassword.useCase";
import { AuthLoginDTO, AuthLoginUseCasePort } from "src/UseCases/AuthLogin.useCase";
import { AuthLoginGoogleUseCasePort } from "src/UseCases/AuthLoginGoogle.useCase";
import { AuthLogoutUseCasePort } from "src/UseCases/AuthLogout.useCase";
import { AuthRegisterDTO, AuthRegisterUseCasePort } from "src/UseCases/AuthRegister.useCase";
import { AuthResetPasswordDTO, AuthResetPasswordUseCasePort } from "src/UseCases/AuthResetPassword.useCase";
import { AuthTokenUserUseCasePort } from "src/UseCases/AuthTokenUser.useCase";

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
    forgetPassword(
        authForgetPasswordDTO: AuthForgetPasswordDTO,
        response: Response,
    ): Promise<Response<AuthUseCaseResponse>>;
    resetPassword(
        authResetPasswordDTO: AuthResetPasswordDTO,
        request: Request,
        response: Response,
    ): Promise<Response<AuthUseCaseResponse>>;
    loginGoogle(request: Request, response: Response): Promise<Response<AuthUseCaseResponse>>;
}

@Controller()
export class AuthController implements AuthControllerPort {
    constructor(
        @Inject("AuthLoginUseCasePort") private readonly authLoginUseCase: AuthLoginUseCasePort,
        @Inject("AuthLoginGoogleUseCasePort") private readonly authLoginGoogleUseCase: AuthLoginGoogleUseCasePort,
        @Inject("AuthRegisterUseCasePort") private readonly authRegisterUseCase: AuthRegisterUseCasePort,
        @Inject("AuthLogoutUseCasePort") private readonly authLogoutUseCase: AuthLogoutUseCasePort,
        @Inject("AuthTokenUserUseCasePort") private readonly authTokenUserUseCase: AuthTokenUserUseCasePort,
        @Inject("AuthForgetPasswordUseCasePort")
        private readonly authForgetPasswordUseCase: AuthForgetPasswordUseCasePort,
        @Inject("AuthResetPasswordUseCasePort") private readonly authResetPasswordUseCase: AuthResetPasswordUseCasePort,
    ) {}
    googleLogin(
        request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
        response: Response<any, Record<string, any>>,
    ): void {
        throw new Error("Method not implemented.");
    }

    @Post("/login")
    async login(@Body() authLoginDTO: AuthLoginDTO, @Res() response: Response): Promise<Response<AuthUseCaseResponse>> {
        try {
            const { success, jwt_token } = await this.authLoginUseCase.execute(authLoginDTO);
            if (success) return response.status(HttpStatus.OK).json({ success: true, jwt_token });
        } catch (error) {
            return response.status(HttpStatus.BAD_REQUEST).json({ success: false, message: error.message });
        }
    }

    @Post("/register")
    async register(
        @Body() authRegisterDTO: AuthRegisterDTO,
        @Res() response: Response,
    ): Promise<Response<AuthUseCaseResponse>> {
        try {
            const { success, jwt_token } = await this.authRegisterUseCase.execute(authRegisterDTO);
            if (success) return response.status(HttpStatus.OK).json({ success: true, jwt_token });
        } catch (error) {
            return response.status(HttpStatus.BAD_REQUEST).json({ success: false, message: error.message });
        }
    }

    @Post("/logout")
    async logout(@Res() response: Response): Promise<Response<AuthUseCaseResponse>> {
        try {
            const { success } = await this.authLogoutUseCase.execute(response.locals.jwt_token);
            if (success) return response.status(HttpStatus.OK).json({ success: true });
        } catch (error) {
            return response.status(HttpStatus.BAD_REQUEST).json({ success: false, message: error.message });
        }
    }

    @Post("/tokenUser")
    async tokenUser(@Res() response: Response): Promise<Response<AuthUseCaseResponse>> {
        try {
            const { success, data } = await this.authTokenUserUseCase.execute(response.locals.jwt_token);
            if (success) return response.status(HttpStatus.OK).json({ success: true, data });
        } catch (error) {
            return response.status(HttpStatus.BAD_REQUEST).json({ success: false, message: error.message });
        }
    }

    @Post("/forget-password")
    async forgetPassword(
        @Body() authForgetPasswordDTO: AuthForgetPasswordDTO,
        @Res() response: Response,
    ): Promise<Response<AuthUseCaseResponse>> {
        try {
            const { success } = await this.authForgetPasswordUseCase.execute(authForgetPasswordDTO);
            if (success) return response.status(HttpStatus.OK).json({ success: true });
        } catch (error) {
            return response.status(HttpStatus.BAD_REQUEST).json({ success: false, message: error.message });
        }
    }

    @Post("/reset-password/:reset_password_token")
    async resetPassword(
        @Body() authResetPasswordDTO: AuthResetPasswordDTO,
        @Req() request: Request,
        @Res() response: Response,
    ): Promise<Response<AuthUseCaseResponse>> {
        try {
            const { reset_password_token } = request.params;
            const { success } = await this.authResetPasswordUseCase.execute(reset_password_token, authResetPasswordDTO);
            if (success) return response.status(HttpStatus.OK).json({ success: true });
        } catch (error) {
            return response.status(HttpStatus.BAD_REQUEST).json({ success: false, message: error.message });
        }
    }

    @Post("/callback/google/login")
    async loginGoogle(@Req() request: Request, @Res() response: Response): Promise<Response<AuthUseCaseResponse>> {
        try {
            const { success, redirect } = await this.authLoginGoogleUseCase.execute(request);
            if (success) {
                response.redirect(redirect);
            }
        } catch (error) {
            return response.status(HttpStatus.BAD_REQUEST).json({ success: false, message: error.message });
        }
    }
}

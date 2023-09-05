import { Controller, Post, Res, Req, Body, Inject, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";
import { AuthForgetPasswordDTO, AuthForgetPasswordUseCasePort } from "src/UseCases/AuthForgetPassword.useCase";
import { AuthLoginDTO, AuthLoginUseCasePort } from "src/UseCases/AuthLogin.useCase";
import { AuthLogoutUseCasePort } from "src/UseCases/AuthLogout.useCase";
import { AuthRegisterDTO, AuthRegisterUseCasePort } from "src/UseCases/AuthRegister.useCase";
import { AuthResetPasswordDTO, AuthResetPasswordUseCasePort } from "src/UseCases/AuthResetPassword.useCase";

interface AuthUseCaseResponse {
    success: boolean;
    token?: string;
    message?: string;
}

interface AuthControllerPort {
    login(authLoginDTO: AuthLoginDTO, response: Response): Promise<Response<AuthUseCaseResponse>>;
    register(authRegisterDTO: AuthRegisterDTO, response: Response): Promise<Response<AuthUseCaseResponse>>;
	logout(request: Request, response: Response): Promise<Response<AuthUseCaseResponse>>
    forgetPassword(
        authForgetPasswordDTO: AuthForgetPasswordDTO,
        response: Response,
    ): Promise<Response<AuthUseCaseResponse>>;
    resetPassword(
        authResetPasswordDTO: AuthResetPasswordDTO,
        response: Response,
    ): Promise<Response<AuthUseCaseResponse>>;
}

@Controller()
export class AuthController implements AuthControllerPort {
    constructor(
        @Inject("AuthLoginUseCasePort") private readonly authLoginUseCase: AuthLoginUseCasePort,
        @Inject("AuthRegisterUseCasePort") private readonly authRegisterUseCase: AuthRegisterUseCasePort,
		@Inject("AuthLogoutUseCasePort") private readonly authLogoutUseCase: AuthLogoutUseCasePort,
        @Inject("AuthForgetPasswordUseCasePort")
        private readonly authForgetPasswordUseCase: AuthForgetPasswordUseCasePort,
        @Inject("AuthResetPasswordUseCasePort") private readonly authResetPasswordUseCase: AuthResetPasswordUseCasePort,
    ) {}

    @Post("/login")
    async login(
        @Body() authLoginDTO: AuthLoginDTO,
        @Res() response: Response,
    ): Promise<Response<{ success: boolean; token?: string; message?: string }>> {
        try {
            const { success, token } = await this.authLoginUseCase.execute(authLoginDTO);
            if (success) return response.status(HttpStatus.OK).json({ success: true, token });
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
            const { success, token } = await this.authRegisterUseCase.execute(authRegisterDTO);
            if (success) return response.status(HttpStatus.OK).json({ success: true, token });
        } catch (error) {
            return response.status(HttpStatus.BAD_REQUEST).json({ success: false, message: error.message });
        }
    }

	@Post("/logout")
    async logout(
		@Req() request: Request,
        @Res() response: Response,
    ): Promise<Response<AuthUseCaseResponse>> {
        try {
            const { success } = await this.authLogoutUseCase.execute(response.locals.token);
            if (success) return response.status(HttpStatus.OK).json({ success: true });
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
            throw new Error(error);
        }
    }

    @Post("/reset-password")
    async resetPassword(
        @Body() authResetPasswordDTO: AuthResetPasswordDTO,
        @Res() response: Response,
    ): Promise<Response<AuthUseCaseResponse>> {
        try {
            const { success } = await this.authResetPasswordUseCase.execute(authResetPasswordDTO);
            if (success) return response.status(HttpStatus.OK).json({ success: true });
        } catch (error) {
            throw new Error(error);
        }
    }
}

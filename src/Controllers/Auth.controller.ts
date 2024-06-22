import { Controller, Post, Res, Body, Inject, HttpStatus, Req, Get } from "@nestjs/common";
import { Request, Response } from "express";
import {
    AuthCheckResetPasswordTokenUseCasePort,
    CheckResetPasswordTokenDTO,
} from "src/use-cases/auth-check-reset-password-token.use-case";
import { AuthForgetPasswordDTO, AuthForgetPasswordUseCasePort } from "src/use-cases/auth-forget-password.use-case";
import { AuthLoginDTO, AuthLoginUseCasePort } from "src/use-cases/auth-login.use-case";
import { AuthLoginGitHubUseCasePort } from "src/use-cases/auth-login-github.use-case";
import { AuthLoginGoogleUseCasePort } from "src/use-cases/auth-login-google.use-case";
import { AuthLogoutUseCasePort } from "src/use-cases/auth-logout.use-case";
import { AuthRegisterDTO, AuthRegisterUseCasePort } from "src/use-cases/auth-register.use-case";
import { AuthResetPasswordDTO, AuthResetPasswordUseCasePort } from "src/use-cases/auth-reset-password.use-case";
import { AuthCheckUserJWTTokenUseCasePort } from "src/use-cases/auth-check-user-jwt-token.use-case";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Auth } from "src/entities/auth.entity";

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
    loginGithub(request: Request, response: Response): Promise<Response<AuthUseCaseResponse>>;
}

@ApiTags("auth")
@Controller()
export class AuthController implements AuthControllerPort {
    constructor(
        @Inject("AuthLoginUseCasePort") private readonly authLoginUseCase: AuthLoginUseCasePort,
        @Inject("AuthLoginGoogleUseCasePort") private readonly authLoginGoogleUseCase: AuthLoginGoogleUseCasePort,
        @Inject("AuthLoginGitHubUseCasePort") private readonly authLoginGitHubUseCase: AuthLoginGitHubUseCasePort,
        @Inject("AuthRegisterUseCasePort") private readonly authRegisterUseCase: AuthRegisterUseCasePort,
        @Inject("AuthLogoutUseCasePort") private readonly authLogoutUseCase: AuthLogoutUseCasePort,
        @Inject("AuthCheckUserJWTTokenUseCasePort")
        private readonly authCheckUserJWTTokenUseCase: AuthCheckUserJWTTokenUseCasePort,
        @Inject("AuthForgetPasswordUseCasePort")
        private readonly authForgetPasswordUseCase: AuthForgetPasswordUseCasePort,
        @Inject("AuthResetPasswordUseCasePort") private readonly authResetPasswordUseCase: AuthResetPasswordUseCasePort,
        @Inject("AuthCheckResetPasswordTokenUseCasePort")
        private readonly authCheckResetPasswordTokenUseCase: AuthCheckResetPasswordTokenUseCasePort,
    ) {}

    @Post("/login")
    @ApiResponse({ status: 200, type: Auth })
    async login(
        @Body() authLoginPayload: AuthLoginDTO,
        @Res() response: Response,
    ): Promise<Response<AuthUseCaseResponse>> {
        try {
            const { success, jwt_token, message } = await this.authLoginUseCase.execute(authLoginPayload);
            if (success === true) return response.status(HttpStatus.OK).json({ success: true, jwt_token });
            return response.status(HttpStatus.BAD_REQUEST).json({ success: false, message });
        } catch (error) {
            return response.status(HttpStatus.BAD_REQUEST).json({ success: false, message: error.message });
        }
    }

    @Post("/register")
    @ApiResponse({ status: 201, type: Auth })
    async register(
        @Body() authRegisterPayload: AuthRegisterDTO,
        @Res() response: Response,
    ): Promise<Response<AuthUseCaseResponse>> {
        try {
            const { success, jwt_token } = await this.authRegisterUseCase.execute(authRegisterPayload);
            if (success === true) return response.status(HttpStatus.OK).json({ success: true, jwt_token });
        } catch (error) {
            return response.status(HttpStatus.BAD_REQUEST).json({ success: false, message: error.message });
        }
    }

    @Post("/logout")
    @ApiBearerAuth()
    @ApiResponse({ status: 200, type: Auth })
    async logout(@Res() response: Response): Promise<Response<AuthUseCaseResponse>> {
        try {
            const userJWTToken = response.locals.token;
            const { success } = await this.authLogoutUseCase.execute(userJWTToken);
            if (success) return response.status(HttpStatus.OK).json({ success: true });
        } catch (error) {
            return response.status(HttpStatus.BAD_REQUEST).json({ success: false, message: error.message });
        }
    }

    @Post("/check-user-jwt-token")
    @ApiBearerAuth()
    @ApiResponse({ status: 200, type: Auth })
    async tokenUser(@Res() response: Response): Promise<Response<AuthUseCaseResponse>> {
        try {
            const userJWTToken = response.locals.token;
            const { success, data } = await this.authCheckUserJWTTokenUseCase.execute(userJWTToken);
            if (success) return response.status(HttpStatus.OK).json({ success: true, data });
        } catch (error) {
            return response.status(HttpStatus.BAD_REQUEST).json({ success: false, message: error.message });
        }
    }

    @Post("/forget-password")
    @ApiResponse({ status: 200, type: Auth })
    async forgetPassword(
        @Body() authForgetPasswordPayload: AuthForgetPasswordDTO,
        @Res() response: Response,
    ): Promise<Response<AuthUseCaseResponse>> {
        try {
            const { success } = await this.authForgetPasswordUseCase.execute(authForgetPasswordPayload);
            if (success) return response.status(HttpStatus.OK).json({ success: true });
        } catch (error) {
            return response.status(HttpStatus.BAD_REQUEST).json({ success: false, message: error.message });
        }
    }

    @Post("/reset-password/:reset_password_token")
    @ApiResponse({ status: 200, type: Auth })
    async resetPassword(
        @Body() authResetPasswordPayload: AuthResetPasswordDTO,
        @Req() request: Request,
        @Res() response: Response,
    ): Promise<Response<AuthUseCaseResponse>> {
        try {
            const { reset_password_token } = request.params;
            const { success } = await this.authResetPasswordUseCase.execute(
                reset_password_token,
                authResetPasswordPayload,
            );
            if (success) return response.status(HttpStatus.OK).json({ success: true });
        } catch (error) {
            return response.status(HttpStatus.BAD_REQUEST).json({ success: false, message: error.message });
        }
    }

    @Post("/check-reset-password-token")
    @ApiResponse({ status: 200, type: Auth })
    async checkResetPasswordToken(
        @Body() { resetPasswordToken }: CheckResetPasswordTokenDTO,
        @Res() response: Response,
    ): Promise<Response<AuthUseCaseResponse>> {
        try {
            const { success } = await this.authCheckResetPasswordTokenUseCase.execute(resetPasswordToken);
            if (success) return response.status(HttpStatus.OK).json({ success: true });
        } catch (error) {
            return response.status(HttpStatus.BAD_REQUEST).json({ success: false, message: error.message });
        }
    }

    @Post("/login/google/callback")
    @ApiResponse({ status: 200, type: Auth })
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

    @Get("/login/github/callback")
    @ApiResponse({ status: 200, type: Auth })
    async loginGithub(@Req() request: Request, @Res() response: Response): Promise<Response<AuthUseCaseResponse>> {
        try {
            const { success, redirect } = await this.authLoginGitHubUseCase.execute(request);
            if (success) {
                response.redirect(redirect);
            }
        } catch (error) {
            return response.status(HttpStatus.BAD_REQUEST).json({ success: false, message: error.message });
        }
    }
}

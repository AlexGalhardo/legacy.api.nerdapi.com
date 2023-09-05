import { Controller, Post, Req, Res, Body, Inject, HttpStatus } from "@nestjs/common";

interface UserLoginUseCasePort {}

@Controller()
export class AuthController {
    constructor(@Inject("UserLoginUseCasePort") private readonly userLoginUseCase: UserLoginUseCasePort) {}

    @Post("/login")
    async login(
        @Body() loginDTO: { email: string; password: string },
        @Req() request,
        @Res() response,
    ): Promise<string> {
        try {
            await this.userLoginUseCase.execute(loginDTO);
            return response.status(HttpStatus.OK).send();
        } catch (error) {
            throw new Error(error);
        }
    }
}

import { Module } from '@nestjs/common'

@Module({
    controllers: [UserController],
    providers: [
        Database,
        TetrisBackendService,
        CRMService,
        {
            provide: 'ValidateJWTPort',
            useClass: ValidateJWTUseCase,
        },
        {
            provide: 'TetrisAuthServicePort',
            useClass: TetrisAuthService,
        },
    ],
})

export class UserModule {}

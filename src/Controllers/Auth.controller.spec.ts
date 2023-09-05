import { Test, TestingModule } from '@nestjs/testing'
import { AuthController } from './Auth.controller'

describe('AuthController', () => {
    let authController: AuthController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [],
        }).compile()

        authController = module.get<AuthController>(AuthController)
    })

    it('auth controller must defined', () => {
        expect(authController).toBeDefined()
    })
})

import { Controller } from "@nestjs/common";

interface ProfileControllerPort {}

@Controller()
export class ProfileController implements ProfileControllerPort {
    constructor() {}
}

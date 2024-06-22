import { z } from "zod";

export default class EmailValidator {
    static validate(email: string) {
        const emailSchema = z.string().email();
        try {
            return emailSchema.parse(email);
        } catch (e) {
            return false;
        }
    }

    static generate(): string {
        return `teste.${Math.random().toString().split(".")[1]}@teste.com.br`;
    }
}

import * as crypto from "crypto";

export default function GenerateRandomToken(tokenLength: number = 48): string {
    return crypto
        .randomBytes(Math.ceil(tokenLength / 2))
        .toString("hex")
        .slice(0, tokenLength);
}

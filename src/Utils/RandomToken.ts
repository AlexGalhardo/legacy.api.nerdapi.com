import * as crypto from 'crypto';

export function generateRandomToken(tokenLength: number = 32): string {
  	return crypto.randomBytes(Math.ceil(tokenLength / 2))
    	.toString('hex')
    	.slice(0, tokenLength);
}
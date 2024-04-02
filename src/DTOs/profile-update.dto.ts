import { IsString } from 'class-validator';

export class ProfileUpdateDTO {
	@IsString()
	readonly username: string;

	@IsString()
	readonly email: string;

	@IsString()
	readonly telegramNumber: string;

	@IsString()
	readonly newPassword: string;

	@IsString()
	readonly confirmNewPassword: string;
}

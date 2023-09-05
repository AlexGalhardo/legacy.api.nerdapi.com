import * as fs from "fs";
import * as usersDatabase from "./Jsons/users.json";
import { ErrorsMessages } from "src/Utils/ErrorsMessages";
import DateTime from "src/Utils/DataTypes/DateTime";

export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    jwt_token: string;
    api_token: string | null;
    reset_password_token: string | null;
	reset_password_token_expires_at: string | null;
    stripe: {
        customer_id: string | null;
        subscription: {
            active: boolean;
            starts_at: string | null;
            ends_at: string | null;
            transaction_id: string | null;
        };
    };
    created_at: string;
    updated_at: string | null;
    created_at_pt_br: string;
    updated_at_pt_br: string | null;
}

export interface UserResponse {
    user: User;
    index: number;
}

export interface UserRepositoryPort {
    save(user?: any, index?: number): void;
    findById(userId: string): boolean;
    findByEmail(email: string): boolean;
    getByEmail(email: string): UserResponse;
    getById(userId: string): UserResponse;
	getByResetPasswordToken(resetPasswordToken: string): UserResponse;
    create(user: User): void;
    deleteByEmail(email: string): void;
    logout(userId: string): void;
	saveResetPasswordToken(userId: string, resetPasswordToken: string): void;
	resetPassword(userId: string, newPassword: string): void;
}

export function sleepSync(milliseconds) {
	const start = new Date().getTime();
	while (true) {
		if (new Date().getTime() - start >= milliseconds) {
		break;
		}
	}
}

export default class UserRepository implements UserRepositoryPort {
    constructor(private users: User[] = usersDatabase) {}

    public save(user?: any, index?: number): void {
        try {
            if (user && index) {
                this.users.splice(index, 1, user);
            }

            fs.writeFileSync("./src/Repositories/Jsons/users.json", JSON.stringify(this.users, null, 4), "utf-8");
			this.users = JSON.parse(fs.readFileSync("./src/Repositories/Jsons/users.json", "utf-8"));
        } catch (error) {
            throw new Error(error);
        }
    }

    public findById(userId: string): boolean {
        return this.users.some((user: any) => user.id === userId);
    }

    public findByEmail(email: string): boolean {
        return this.users.some((user: any) => user.email === email);
    }

    public getByEmail(email: string): UserResponse {
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].email === email) {
                return { user: this.users[i], index: i };
            }
        }

        throw new Error(ErrorsMessages.USER_NOT_FOUND);
    }

    public getById(userId: string): UserResponse {
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].id === userId) {
                return { user: this.users[i], index: i };
            }
        }

        throw new Error(ErrorsMessages.USER_NOT_FOUND);
    }

	public getByResetPasswordToken(resetPasswordToken: string): UserResponse {
		for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].reset_password_token === resetPasswordToken) {
                return { user: this.users[i], index: i };
            }
        }

        throw new Error(ErrorsMessages.USER_NOT_FOUND);
	}

    public create(user: User): void {
        this.users.push(user);
        this.save();
    }

    public deleteByEmail(email: string) {
        this.users = this.users.filter((user) => user.email !== email);
        this.save();
    }

    public logout(userId: string) {
		for(let i = 0; i < this.users.length; i++){
            if (this.users[i].id === userId) {
                this.users[i].jwt_token = null;
                this.save();
                break;
            }
        }
    }

	public saveResetPasswordToken(userId: string, resetPasswordToken: string){
		for(let i = 0; i < this.users.length; i++){
            if (this.users[i].id === userId) {
                this.users[i].reset_password_token = resetPasswordToken;
				this.users[i].reset_password_token_expires_at = String(new Date(new Date().getTime() + (60 * 60 * 1000)));
                this.save();
                break;
            }
        }
	}

	public resetPassword(userId: string, newPassword: string){
		for(let i = 0; i < this.users.length; i++){
            if (this.users[i].id === userId) {
                if(!DateTime.isExpired(new Date(this.users[i].reset_password_token_expires_at))){
					this.users[i].password = newPassword;
					this.users[i].reset_password_token = null
					this.users[i].reset_password_token_expires_at = null
                	this.save();
                	break;
				}
				else {
					throw new Error(ErrorsMessages.RESET_PASSWORD_TOKEN_EXPIRED);
				}
            }
        }
	}
}

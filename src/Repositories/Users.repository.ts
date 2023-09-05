import * as fs from "fs";
import * as usersDatabase from "./Jsons/users.json";
import { ErrorsMessages } from "src/Utils/ErrorsMessages";

export interface User {
	id: string;
	username: string;
	email: string;
	password: string;
	token: string;
	created_at: string;
	updated_at: string;
}

export interface UserResponse {
	user: User
	index: number
}

export interface UserRepositoryPort {
    save(user?: any, index?: number): void;
    findById(userId: string): boolean;
    findByEmail(email: string): boolean;
    getByEmail(email: string): UserResponse;
	getById(userId: string): UserResponse;
    create(user: any): void;
    deleteByEmail(email: string): void;
	logout(userId: string): void;
}

export default class UserRepository implements UserRepositoryPort {
    constructor(private users = usersDatabase) {}

    public save(user?: any, index?: number): void {
		try {
			if (user && index) {
            	this.users.splice(index, 1, user);
        	}

			fs.writeFileSync("./src/Repositories/Jsons/users.json", JSON.stringify(this.users, null, 4), "utf-8");
		} catch (error) {
			throw new Error(error)
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

		throw new Error(ErrorsMessages.USER_NOT_FOUND)
    }

	public getById(userId: string): UserResponse {
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].id === userId) {
				return { user: this.users[i], index: i };
            }
        }

		throw new Error(ErrorsMessages.USER_NOT_FOUND)
    }

    public create(user: any): void {
        this.users.push(user);
        this.save();
    }

    public deleteByEmail(email: string) {
        this.users = this.users.filter((user) => user.email !== email);
        this.save();
    }

	public logout(userId: string) {
        for(const user of this.users){
			if(user.id === userId){
				user.token = null
				this.save();
				break
			}
		}
    }
}

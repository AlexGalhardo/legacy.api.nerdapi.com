import * as fs from "fs";
import * as usersDatabase from "./Jsons/users.json";
import { ErrorsMessages } from "src/Utils/ErrorsMessages";

export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    jwt_token: string;
    api_token: string | null;
    reset_password_token: string | null;
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
    create(user: any): void;
    deleteByEmail(email: string): void;
    logout(userId: string): void;
}

export default class UserRepository implements UserRepositoryPort {
    constructor(private users: User[] = usersDatabase) {}

    public save(user?: any, index?: number): void {
        try {
            if (user && index) {
                this.users.splice(index, 1, user);
            }

            fs.writeFileSync("./src/Repositories/Jsons/users.json", JSON.stringify(this.users, null, 4), "utf-8");
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

    public create(user: User): void {
        this.users.push(user);
        this.save();
    }

    public deleteByEmail(email: string) {
        this.users = this.users.filter((user) => user.email !== email);
        this.save();
    }

    public logout(userId: string) {
        for (const user of this.users) {
            if (user.id === userId) {
                user.jwt_token = null;
                this.save();
                break;
            }
        }
    }
}

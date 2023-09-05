import { Injectable } from '@nestjs/common'
import fs from 'fs'

export interface UserRepositoryPort {
	save(user?: any, index?: number): void
	findById(userId: string): boolean
	findByEmail(email: string): boolean
	getByEmail(email: string): any
    create(user: any): void
	login(email: string, password: string): Promise<UserRepositoryResponse>
}

interface UserRepositoryResponse {
	success: boolean
	token?: string
}

@Injectable()
export default class UserRepository implements UserRepositoryPort {
    constructor(private readonly users = JSON.parse(fs.readFileSync('./Jsons/users.json', 'utf-8'))) {}
	login(email: string, password: string): Promise<UserRepositoryResponse> {
		throw new Error('Method not implemented.')
	}

	public save(user?: any, index?: number): void {
		if(user && index){
			this.users.splice(index, 1, user)
		}

		fs.writeFileSync('./Jsons/users.json', JSON.stringify(this.users, null, 4), 'utf-8')
	}

	public findById(userId: string): boolean {
        return this.users.some((user: any) => user.id === userId);
    }

	public findByEmail(email: string): boolean {
        return this.users.some((user: any) => user.email === email);
    }

	public getByEmail(email: string) {
		let user = null, index = null

		for(let i = 0; i < this.users.length; i++){
			if(this.users[i].email === email){
				user = this.users[i]
				index = i
				break
			}
		}

		return { user, index }
	}

    public create(user: any): void {
		this.users.push(user).save()
    }
}
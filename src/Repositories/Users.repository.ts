import * as fs from 'fs'
import * as usersDatabase from './Jsons/users.json'

export interface UserRepositoryPort {
	save(user?: any, index?: number): void
	findById(userId: string): boolean
	findByEmail(email: string): boolean
	getByEmail(email: string): any
    create(user: any): void
	deleteByEmail(email: string): void
}

interface UserRepositoryResponse {
	success: boolean
	token?: string
}

export default class UserRepository implements UserRepositoryPort {
    constructor(private users = usersDatabase) {}

	public save(user?: any, index?: number): void {
		if(user && index){
			this.users.splice(index, 1, user)
		}

		fs.writeFileSync('./src/Repositories/Jsons/users.json', JSON.stringify(this.users, null, 4), 'utf-8')
		this.users = JSON.parse(fs.readFileSync('./src/Repositories/Jsons/users.json', 'utf-8'))
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
		this.users.push(user)
		this.save()
    }

	public deleteByEmail(email: string) {
		this.users = this.users.filter(user => user.email !== email)
		this.save()
	}
}
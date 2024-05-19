import { Kysely } from 'kysely'

import { User } from '../models/user'

export class UserRepository {
  private db: Kysely<any>

  constructor(db: Kysely<any>) {
    this.db = db
  }

  async createUser(userData: Partial<User>): Promise<User> {
    const [createdUser] = await this.db
      .insertInto('user')
      .values(userData)
      .returning('*')
      .execute()
    return createdUser
  }

  async getUserById(userId: number): Promise<User | null> {
    const user = await this.db
      .selectFrom('user')
      .selectAll()
      .where('id', '=', userId)
      .executeTakeFirst()
    return user || null
  }

  // Add other methods as needed
}

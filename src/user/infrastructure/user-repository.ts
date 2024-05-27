import { eq } from 'drizzle-orm'

import { db } from '@/config/database'
import { IUserRepository } from '@/user/domain/user-repository'
import { NewUser, User, users } from '@/user/infrastructure/schema/user-schema'

export class UserRepository implements IUserRepository {
  async createUser(userData: NewUser): Promise<any> {
    return db.insert(users).values({}).returning()
  }

  async getById({ id }: { id: string }): Promise<User | null> {
    return db.select().from(users).where(eq(users.id, id)).get() || null
  }
}

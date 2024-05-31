import { eq } from 'drizzle-orm'

import { db } from '@/config/database'
import { User } from '@/auth/domain/user'
import { UserRepository } from '@/auth/domain/user-repository'
import { users } from '@/auth/infrastructure/schema/user-schema'

export class UserRepositorySqlite implements UserRepository {
  createIfNotExists(user: { id: string }): Promise<User> {
    return db.transaction(async (trx) => {
      const [existingUser] = await trx
        .select()
        .from(users)
        .where(eq(users.id, user.id))

      if (!existingUser) {
        const [createdUser] = await trx.insert(users).values(user).returning()
        return createdUser
      } else {
        return existingUser
      }
    })
  }

  // updateLastLoginAt(id: string): Promise<void> {}
}

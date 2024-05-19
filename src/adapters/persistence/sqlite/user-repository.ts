import { v4 } from 'uuid'

import { UserRepository } from '../../../application/ports/user-repository'
import { db } from '../../../config/database'
import { NewUser, User } from '../../../domain/models/user'

export function SqliteUserRepository(): UserRepository {
  return {
    async createUser(user: NewUser) {
      const id = v4()
      return await db
        .insertInto('user')
        .values({ id, ...user })
        .returningAll()
        .executeTakeFirstOrThrow()
    },
    async getUserById(userId) {
      const user = await db
        .selectFrom('user')
        .where('id', '=', userId)
        .selectAll()
        .executeTakeFirst()
      return user || null
    },
  }
}

import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

import { users } from '@/user/infrastructure/schema/user-schema'

export const games = sqliteTable('games', {
  id: integer('id').primaryKey(),
  user: text('userId')
    .notNull()
    .references(() => users.id),
  createdAt: text('createdAt')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
})

import { sql } from 'drizzle-orm'
import { integer, sqliteTableCreator, text } from 'drizzle-orm/sqlite-core'
import { v4 } from 'uuid'

import { users } from '@/auth/infrastructure/schema/user-schema'

const sqliteTable = sqliteTableCreator((name) => `sb_${name}`)

export const games = sqliteTable('games', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => v4()),
  rows: integer('rows').notNull(),
  cols: integer('cols').notNull(),
  status: text('status', { enum: ['idle', 'started', 'finished'] })
    .notNull()
    .default('idle'),
  createdAt: text('createdAt')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updatedAt')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
})

export const usersToGames = sqliteTable('usersToGames', {
  userId: text('userId')
    .notNull()
    .references(() => users.id),
  gameId: text('gameId')
    .notNull()
    .references(() => games.id),
})

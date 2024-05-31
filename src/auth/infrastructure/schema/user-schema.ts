import { sql } from 'drizzle-orm'
import { sqliteTableCreator, text } from 'drizzle-orm/sqlite-core'

const sqliteTable = sqliteTableCreator((name) => `sb_${name}`)

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  createdAt: text('createdAt')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updatedAt')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
  lastLoginAt: text('lastLoginAt')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
})

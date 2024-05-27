import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable(
  'users',
  {
    id: integer('id').primaryKey(),
    // name: text('name').notNull(),
    // email: text('email').notNull(),
    createdAt: text('createdAt')
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  // (users) => ({
  //   nameIdx: uniqueIndex('nameIdx').on(users.name),
  // }),
)

export type User = typeof users.$inferSelect // return type when queried
export type NewUser = typeof users.$inferInsert // insert type

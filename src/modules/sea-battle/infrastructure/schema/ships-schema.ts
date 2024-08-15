import { integer, text } from 'drizzle-orm/sqlite-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { v4 } from 'uuid'

import { users } from '@/auth/infrastructure/schema/user-schema'
import { games } from '@/modules/sea-battle/infrastructure/schema/game-schema'
import { sbSqliteTable } from '@/modules/sea-battle/infrastructure/sqlite-table'

export const ships = sbSqliteTable('ships', {
  id: text('id')
    .notNull()
    .primaryKey()
    .$defaultFn(() => v4()),
  gameId: text('gameId')
    .notNull()
    .references(() => games.id),
  userId: text('userId')
    .notNull()
    .references(() => users.id),
  label: text('label').notNull(),
  size: integer('size').notNull(),
  orientation: text('orientation', {
    enum: ['horizontal', 'vertical'],
  }).notNull(),
  row: integer('row').notNull(),
  col: integer('col').notNull(),
  status: text('status', { enum: ['idle', 'placed', 'sunk'] })
    .notNull()
    .default('placed'),
})

// Schema for inserting a user - can be used to validate API requests
export const insertShipSchema = createInsertSchema(ships)
// Schema for selecting a user - can be used to validate API responses
export const selectShipSchema = createSelectSchema(ships)

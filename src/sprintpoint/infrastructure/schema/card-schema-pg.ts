import { deck } from '#sprintpoint/infrastructure/schema/deck-schema-pg.ts'
import { sprintPointPgTable } from '#sprintpoint/infrastructure/sprint-point-pg-table.ts'
import { sql } from 'drizzle-orm'
import {
  numeric,
  smallint,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'

export const card = sprintPointPgTable('card', {
  id: uuid('id').primaryKey().defaultRandom(),
  deckId: uuid('deckId').references(() => deck.id),
  title: varchar('title').notNull(),
  value: numeric('value'),
  order: smallint('orderIndex').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt')
    .notNull()
    .defaultNow()
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
})

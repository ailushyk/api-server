import { sql } from 'drizzle-orm'
import {
  numeric,
  smallint,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'

import { deck } from '@/apps/sprintpoint/infrastructure/schema/deck-schema-pg'
import { sprintPointPgTable } from '@/apps/sprintpoint/infrastructure/sprint-point-pg-table'

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

import { sql } from 'drizzle-orm'
import {
  smallint,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'

import { sprintPointPgTable } from '@/apps/sprintpoint/infrastructure/sprint-point-pg-table'

export const deck = sprintPointPgTable(
  'deck',
  {
    id: uuid('id').primaryKey(),
    name: varchar('name').notNull(),
    slug: varchar('slug').notNull().unique(),
    description: text('description'),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt')
      .notNull()
      .defaultNow()
      .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
  },
  (deck) => {
    return {
      uniqueSlug: uniqueIndex().on(deck.slug),
    }
  },
)

export const card = sprintPointPgTable('card', {
  id: uuid('id').primaryKey(),
  deckId: uuid('deckId').references(() => deck.id),
  value: smallint('value').notNull(),
  order: smallint('order').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt')
    .notNull()
    .defaultNow()
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
})

import { sql } from 'drizzle-orm'
import {
  numeric,
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
    id: uuid('id').primaryKey().defaultRandom(),
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

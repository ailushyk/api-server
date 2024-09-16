import { sql } from 'drizzle-orm'
import {
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

import { relations, sql } from 'drizzle-orm'
import { primaryKey, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

import { deck } from '@/apps/sprintpoint/infrastructure/schema/deck-schema-pg'
import { sprintPointPgTable } from '@/apps/sprintpoint/infrastructure/sprint-point-pg-table'

export const session = sprintPointPgTable('session', {
  id: uuid('id').primaryKey().defaultRandom(),
  deckId: uuid('deck_id').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt')
    .notNull()
    .defaultNow()
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
})

export const sessionRelations = relations(session, ({ one, many }) => ({
  deck: one(deck, {
    fields: [session.deckId],
    references: [deck.id],
  }),
  users: many(userToSession),
}))

export const userToSession = sprintPointPgTable(
  'user_to_session',
  {
    sessionId: uuid('session_id')
      .notNull()
      .references(() => session.id),
    userId: uuid('user_id').notNull(),
    name: varchar('name').notNull(),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt')
      .notNull()
      .defaultNow()
      .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
  },
  (table) => {
    return {
      pk: primaryKey({
        columns: [table.userId, table.sessionId],
      }),
    }
  },
)

export const userToSessionRelations = relations(userToSession, ({ one }) => ({
  session: one(session, {
    fields: [userToSession.sessionId],
    references: [session.id],
  }),
}))

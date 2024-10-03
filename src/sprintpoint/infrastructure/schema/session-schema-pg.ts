import { deck } from '#sprintpoint/infrastructure/schema/deck-schema-pg.ts'
import { sprintPointPgTable } from '#sprintpoint/infrastructure/sprint-point-pg-table.ts'
import { relations, sql } from 'drizzle-orm'
import { primaryKey, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

export const session = sprintPointPgTable('session', {
  id: uuid('id').primaryKey().defaultRandom(),
  deckId: uuid('deck_id').notNull(),
  // cards. This is a JSONB field that will store the cards in the session
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

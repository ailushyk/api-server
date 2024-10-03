import { db as database, db } from '#config/database.ts'
import { deck } from '#sprintpoint/infrastructure/schema/deck-schema-pg.ts'
import {
  session,
  userToSession,
} from '#sprintpoint/infrastructure/schema/session-schema-pg.ts'
import { desc, eq } from 'drizzle-orm'

export class SessionRepository {
  private db = database

  createSession(data: { userId: string; name: string; deckId: string }) {
    return this.db.transaction(async (trx) => {
      const [s] = await trx
        .insert(session)
        .values({
          deckId: data.deckId,
        })
        .returning({ id: session.id })
      if (!s) {
        throw new Error('Failed to create session')
      }
      await trx.insert(userToSession).values({
        sessionId: s.id,
        userId: data.userId,
        name: data.name,
      })
      return s
    })
  }

  public getSessionsByUserId = async (userId: string) => {
    return this.db
      .select({
        id: session.id,
        deck: {
          id: deck.id,
          name: deck.name,
          slug: deck.slug,
        },
        createdBy: userToSession.name,
        createdAt: session.createdAt,
        updateAt: session.updatedAt,
      })
      .from(session)
      .leftJoin(userToSession, eq(session.id, userToSession.sessionId))
      .leftJoin(deck, eq(session.deckId, deck.id))
      .where(eq(userToSession.userId, userId))
      .orderBy(desc(session.updatedAt))
  }

  public getSessionById = async ({ sessionId }: { sessionId: string }) => {
    const [result] = await db
      .select({
        id: session.id,
        deck: {
          id: deck.id,
          name: deck.name,
          slug: deck.slug,
        },
        createdBy: userToSession.name,
        createdAt: session.createdAt,
        updateAt: session.updatedAt,
      })
      .from(session)
      .leftJoin(userToSession, eq(session.id, userToSession.sessionId))
      .leftJoin(deck, eq(session.deckId, deck.id))
      // .where(and(eq(userToSession.userId, user.id), eq(session.id, sessionId)))
      .where(eq(session.id, sessionId))
      .limit(1)
    return result
  }
}

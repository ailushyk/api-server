import { and, desc, eq } from 'drizzle-orm'
import { Request, Response } from 'express'
import { z } from 'zod'

import { db } from '@/config/database'
import { getAuthorizedUser } from '@/lib/auth/auth'
import { deck } from '@/apps/sprintpoint/infrastructure/schema/deck-schema-pg'
import {
  session,
  userToSession,
} from '@/apps/sprintpoint/infrastructure/schema/session-schema-pg'

const sessionService = {
  startSession: async (data: {
    userId: string
    name: string
    deckId: string
  }) => {
    return await db.transaction(async (trx) => {
      const [s] = await trx
        .insert(session)
        .values({
          deckId: data.deckId,
        })
        .returning({ id: session.id })
      await trx.insert(userToSession).values({
        sessionId: s.id,
        userId: data.userId,
        name: data.name,
      })
      return s
    })
  },
}

const newSessionSchema = z.object({
  deckId: z.string(),
})

export const createSessionController = () => {
  const startSession = async (req: Request, res: Response) => {
    const { deckId } = newSessionSchema.parse(req.body)
    const user = getAuthorizedUser(req)

    const session = await sessionService.startSession({
      userId: user.id,
      name: user.name || user.email,
      deckId,
    })
    res.json({ data: session })
  }

  const getSessions = async (req: Request, res: Response) => {
    const user = getAuthorizedUser(req)
    const sessions = await db
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
      .where(eq(userToSession.userId, user.id))
      .orderBy(desc(session.updatedAt))

    res.json({ data: sessions })
  }

  /**
   * The user will be added to the session if not already added
   */
  const getSession = async (req: Request, res: Response) => {
    const user = getAuthorizedUser(req)
    const sessionId = req.params.sessionId
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

    res.json({ data: result })
  }

  return {
    startSession,
    getSessions,
    getSession,
  }
}

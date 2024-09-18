import { Request, Response } from 'express'
import { z } from 'zod'

import { db } from '@/config/database'
import { getAuthorizedUser } from '@/lib/auth/auth'
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
      name: user.name,
      deckId,
    })
    res.json({ data: session })
  }

  return {
    startSession,
  }
}

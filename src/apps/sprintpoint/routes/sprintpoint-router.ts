import { Request, Response, Router } from 'express'
import { z } from 'zod'

import { validateParams } from '@/lib/validate-middleware'
import {
  cardController,
  deckController,
  sessionController,
} from '@/apps/sprintpoint/sprintpoint-container'

const slugSchema = z.object({
  slug: z.string(),
})

export const setupSprintpointRouter = () => {
  const router = Router()

  router.get('/sessions/:sessionId', sessionController.getSession)
  router.get('/sessions', sessionController.getSessions)
  router.post('/sessions', sessionController.startSession)

  router.get('/decks', deckController.getDecks)

  router.get(
    '/decks/:slug',
    validateParams(slugSchema),
    (req: Request, res: Response) => deckController.getDeckWithCards(req, res),
  )

  router.get('/decks/:slug/cards', (req: Request, res: Response) =>
    cardController.getCardsByDeck(req, res),
  )

  return router
}

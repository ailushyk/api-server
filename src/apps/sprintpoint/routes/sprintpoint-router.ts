import { Request, Response, Router } from 'express'
import { z } from 'zod'

import { validateParams } from '@/lib/validate-middleware'
import {
  cardController,
  deckController,
} from '@/apps/sprintpoint/sprintpoint-container'

const slugSchema = z.object({
  slug: z.string(),
})

export const setupSprintpointRouter = () => {
  const router = Router()

  router.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Hello from Sprint Point API!' })
  })
  router.get('/decks', (req: Request, res: Response) =>
    deckController.getDecks(req, res),
  )
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

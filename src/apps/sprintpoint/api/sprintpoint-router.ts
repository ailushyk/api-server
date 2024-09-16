import { Request, Response, Router } from 'express'

import { createDeckController } from '@/apps/sprintpoint/api/deck-controller'
import { DeckService } from '@/apps/sprintpoint/application/deck-service'

export const setupSprintpointRouter = () => {
  const router = Router()

  const controller = createDeckController({
    deckService: new DeckService(),
  })
  router.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Hello from Sprint Point API!' })
  })
  router.get('/decks', (req: Request, res: Response) =>
    controller.getDecks(req, res),
  )
  return router
}

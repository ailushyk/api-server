import { Express, Request, Response, Router } from 'express'

import { DeckController } from '@/apps/sprintpoint/api/deck-controller'
import { DeckService } from '@/apps/sprintpoint/application/deck-service'

export const setupSprintpointRouter = (app: Express) => {
  const router = Router()
  const controller = new DeckController({
    deckService: new DeckService(),
  })
  router.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Hello from Sprint Point API!' })
  })
  router.get('/decks', (req: Request, res: Response) =>
    controller.getDecks(req, res),
  )
  app.use('/api/sprintpoint', router)
}

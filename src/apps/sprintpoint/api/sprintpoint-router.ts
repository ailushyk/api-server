import { Request, Response, Router } from 'express'

import { deckController } from '@/apps/sprintpoint/sprintpoint-container'

export const setupSprintpointRouter = () => {
  const router = Router()

  router.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Hello from Sprint Point API!' })
  })
  router.get('/decks', (req: Request, res: Response) =>
    deckController.getDecks(req, res),
  )
  return router
}

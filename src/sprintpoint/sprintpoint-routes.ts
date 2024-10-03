import type { AuthMiddleware } from '#lib/auth/auth-middleware.ts'
import { CardController } from '#sprintpoint/api/card-controller.ts'
import { DeckController } from '#sprintpoint/api/deck-controller.ts'
import { SessionController } from '#sprintpoint/api/session-controller.ts'
import { CardService } from '#sprintpoint/application/card-service.ts'
import { DeckService } from '#sprintpoint/application/deck-service.ts'
import { SessionService } from '#sprintpoint/application/session-service.ts'
import { CardRepositoryPg } from '#sprintpoint/infrastructure/card-repository-pg.ts'
import { DeckRepositoryPg } from '#sprintpoint/infrastructure/deck-repository-pg.ts'
import { SessionRepository } from '#sprintpoint/infrastructure/session-repository.ts'
import { Router, type Request, type Response } from 'express'

const createDeckRoutes = ({
  deckController,
}: {
  deckController: DeckController
}) => {
  const router = Router()
  router.get('/decks', deckController.getDecks)
  return router
}

const createCardsRoutes = ({
  cardController,
}: {
  cardController: CardController
}) => {
  const router = Router()
  router.get('/decks/:slug/cards', (req: Request, res: Response) =>
    cardController.getCardsByDeck(req, res),
  )
  return router
}

const createSessionRoutes = ({
  sessionController,
  auth,
}: {
  sessionController: SessionController
  auth: AuthMiddleware
}) => {
  const router = Router()
  router.get('/sessions/:sessionId', sessionController.getSession)
  router.get('/sessions', sessionController.getSessions)
  router.post('/sessions', auth.protect(), sessionController.startSession)
  return router
}

export const initializeSprintPointRoutes = (auth: AuthMiddleware): Router[] => {
  const sessionRepository = new SessionRepository()
  const sessionService = new SessionService({ repository: sessionRepository })
  const sessionController = new SessionController(sessionService)
  const sessionRoutes = createSessionRoutes({ sessionController, auth })

  const deckRepository = new DeckRepositoryPg()
  const deckService = new DeckService({
    deckRepository,
  })
  const deckController = new DeckController({ service: deckService })
  const deckRoutes = createDeckRoutes({ deckController })

  const cardRepository = new CardRepositoryPg()
  const cardService = new CardService({
    cardRepository,
  })
  const cardController = new CardController({ cardService })
  const cardRoutes = createCardsRoutes({ cardController })

  return [sessionRoutes, deckRoutes, cardRoutes]
}

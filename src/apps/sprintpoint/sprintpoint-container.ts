import { createCardController } from '#apps/sprintpoint/api/card-controller.ts'
import { createDeckController } from '#apps/sprintpoint/api/deck-controller.ts'
import { createSessionController } from '#apps/sprintpoint/api/session-controller.ts'
import { createCardService } from '#apps/sprintpoint/application/card-service.ts'
import { createDeckService } from '#apps/sprintpoint/application/deck-service.ts'
import { createCardRepositoryPg } from '#apps/sprintpoint/infrastructure/card-repository-pg.ts'
import { createDeckRepositoryPg } from '#apps/sprintpoint/infrastructure/deck-repository-pg.ts'

// Session
const sessionController = createSessionController()

// Deck
const deckRepository = createDeckRepositoryPg()
const deckService = createDeckService({
  deckRepository,
})
const deckController = createDeckController({
  deckService,
})
// Card
const cardRepository = createCardRepositoryPg()
const cardService = createCardService({
  cardRepository,
})
const cardController = createCardController({
  cardService,
})

export { sessionController, deckController, cardController }

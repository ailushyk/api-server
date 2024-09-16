import { createCardController } from '@/apps/sprintpoint/api/card-controller'
import { createDeckController } from '@/apps/sprintpoint/api/deck-controller'
import { createCardService } from '@/apps/sprintpoint/application/card-service'
import { createDeckService } from '@/apps/sprintpoint/application/deck-service'
import { createCardRepositoryPg } from '@/apps/sprintpoint/infrastructure/card-repository-pg'
import { createDeckRepositoryPg } from '@/apps/sprintpoint/infrastructure/deck-repository-pg'

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

export { deckController, cardController }

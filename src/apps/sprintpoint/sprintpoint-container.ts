import { createDeckController } from '@/apps/sprintpoint/api/deck-controller'
import { DeckService } from '@/apps/sprintpoint/application/deck-service'

const deckService = new DeckService()

const deckController = createDeckController({
  deckService,
})

export { deckController }

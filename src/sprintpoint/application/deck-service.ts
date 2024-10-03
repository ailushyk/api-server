import type { Deck } from '#sprintpoint/application/sprintpoint-models.ts'

export interface DeckRepository {
  getAllDecks: () => Promise<Deck[]>
  getDeck(param: { slug: string }): Promise<Deck | null>
}

export class DeckService {
  private deckRepository: DeckRepository
  constructor({ deckRepository }: { deckRepository: DeckRepository }) {
    this.deckRepository = deckRepository
  }

  async getAllDecks() {
    return this.deckRepository.getAllDecks()
  }

  async getDeck({ slug }: { slug: string }) {
    return this.deckRepository.getDeck({ slug })
  }
}

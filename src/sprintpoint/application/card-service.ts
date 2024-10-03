import type { Card } from '#sprintpoint/application/sprintpoint-models.ts'

type CardRepository = {
  getCardsByDeckSlug: ({ slug }: { slug: string }) => Promise<Card[]>
}

export class CardService {
  cardRepository: CardRepository

  constructor({ cardRepository }: { cardRepository: CardRepository }) {
    this.cardRepository = cardRepository
  }

  async getCardsByDeck({ slug }: { slug: string }) {
    return await this.cardRepository.getCardsByDeckSlug({ slug })
  }
}

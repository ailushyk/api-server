import type { Card } from '#apps/sprintpoint/application/sprintpoint-models.ts'

type CardRepository = {
  getCardsByDeckSlug: ({ slug }: { slug: string }) => Promise<Card[]>
}
type CardService = ReturnType<typeof createCardService>

const createCardService = ({
  cardRepository,
}: {
  cardRepository: CardRepository
}) => {
  const getCardsByDeck = async ({ slug }: { slug: string }) => {
    return await cardRepository.getCardsByDeckSlug({ slug })
  }

  return {
    getCardsByDeck,
  }
}

export { createCardService }
export type { CardService, CardRepository }

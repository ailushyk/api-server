import { Deck } from '@/apps/sprintpoint/application/sprintpoint-models'

export type DeckService = {
  getAllDecks: () => Promise<Deck[]>
  getDeck: ({ slug }: { slug: string }) => Promise<Deck>
}

export type DeckRepository = {
  getAllDecks: () => Promise<Deck[]>
  getDeck(param: { slug: string }): Promise<Deck>
}

export const createDeckService = ({
  deckRepository,
}: {
  deckRepository: DeckRepository
}): DeckService => {
  const getAllDecks = () => {
    return deckRepository.getAllDecks()
  }
  const getDeck = async ({ slug }: { slug: string }) => {
    return deckRepository.getDeck({ slug })
  }

  return {
    getAllDecks,
    getDeck,
  }
}

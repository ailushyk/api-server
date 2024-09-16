import { Request, Response } from 'express'

import { DeckService } from '@/apps/sprintpoint/application/deck-service'

type DeckDependencies = {
  deckService: DeckService
}

export const createDeckController = (dependencies: DeckDependencies) => {
  const getDecks = async (req: Request, res: Response) => {
    const data = await dependencies.deckService.getAllDecks()
    res.json({ message: 'Hello from Sprint Point Decks API!', data })
  }

  const getDeckWithCards = async (req: Request, res: Response) => {
    const data = await dependencies.deckService.getDeckWithCards()
    res.json({ data })
  }

  return {
    getDecks,
    getDeckWithCards,
  }
}

import type { DeckService } from '#apps/sprintpoint/application/deck-service.ts'
import type { Request, Response } from 'express'

type DeckDependencies = {
  deckService: DeckService
}

export const createDeckController = (dependencies: DeckDependencies) => {
  const getDecks = async (req: Request, res: Response) => {
    const data = await dependencies.deckService.getAllDecks()
    res.json({ message: 'Hello from Sprint Point Decks API!', data })
  }

  const getDeckWithCards = async (req: Request, res: Response) => {
    const { slug } = req.params
    if (!slug) {
      res.status(400).json({ error: 'Deck slug is required' })
      return
    }
    const data = await dependencies.deckService.getDeck({ slug })
    res.json({ data })
  }

  return {
    getDecks,
    getDeckWithCards,
  }
}

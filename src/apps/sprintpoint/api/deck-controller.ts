import { Request, Response } from 'express'

import { DeckService } from '@/apps/sprintpoint/application/deck-service'

type DeckDependencies = {
  deckService: DeckService
}

export function createDeckController(dependencies: DeckDependencies) {
  const getDecks = async (req: Request, res: Response) => {
    const data = await dependencies.deckService.all()
    res.json({ message: 'Hello from Sprint Point Decks API!', data })
  }

  return {
    getDecks,
  }
}

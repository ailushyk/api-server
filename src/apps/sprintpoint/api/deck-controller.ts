import { Request, Response } from 'express'

import { DeckService } from '@/apps/sprintpoint/application/deck-service'

export class DeckController {
  private deckService: DeckService

  constructor({ deckService }: { deckService: DeckService }) {
    this.deckService = deckService
  }

  async getDecks(req: Request, res: Response) {
    const data = await this.deckService.all()
    res.json({ message: 'Hello from Sprint Point Decks API!', data })
  }
}

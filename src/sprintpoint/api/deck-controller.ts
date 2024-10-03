import type { DeckService } from '#sprintpoint/application/deck-service.ts'
import type { Request, Response } from 'express'

export class DeckController {
  private service: DeckService
  constructor({ service }: { service: DeckService }) {
    this.service = service
  }

  public getDecks = async (req: Request, res: Response) => {
    const data = await this.service.getAllDecks()
    res.json({ message: 'Hello from Sprint Point Decks API!', data })
  }
}

import type { CardService } from '#sprintpoint/application/card-service.ts'
import type { Request, Response } from 'express'

export class CardController {
  private cardService: CardService

  constructor({ cardService }: { cardService: CardService }) {
    this.cardService = cardService
  }

  public getCardsByDeck = async (req: Request, res: Response) => {
    const { slug } = req.params
    if (!slug) {
      res.status(400).json({ error: 'slug is required' })
      return
    }
    const data = await this.cardService.getCardsByDeck({ slug })
    res.json({ data })
  }
}

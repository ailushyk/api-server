import type { CardService } from '#apps/sprintpoint/application/card-service.js'
import type { Request, Response } from 'express'

type Params = {
  cardService: CardService
}

export const createCardController = (dependencies: Params) => {
  const getCardsByDeck = async (req: Request, res: Response) => {
    const { slug } = req.params
    if (!slug) {
      res.status(400).json({ error: 'slug is required' })
      return
    }
    const data = await dependencies.cardService.getCardsByDeck({ slug })
    res.json({ data })
  }

  return {
    getCardsByDeck,
  }
}

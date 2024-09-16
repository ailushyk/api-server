import { Request, Response } from 'express'

import { CardService } from '@/apps/sprintpoint/application/card-service'

type Params = {
  cardService: CardService
}

export const createCardController = (dependencies: Params) => {
  const getCardsByDeck = async (req: Request, res: Response) => {
    const { slug } = req.params
    const data = await dependencies.cardService.getCardsByDeck({ slug })
    res.json({ data })
  }

  return {
    getCardsByDeck,
  }
}

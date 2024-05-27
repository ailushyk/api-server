import { Request, Response } from 'express'

import { GameService } from '@/sea-battle/application/game-service'

export class GameController {
  private gameService: GameService

  constructor({ gameService }: { gameService: GameService }) {
    this.gameService = gameService
  }

  async start(req: Request, res: Response) {
    const { username } = req.body
    const game = await this.gameService.start({ username })
    res.status(201).json(game)
  }

  async get(req: Request, res: Response) {
    const gameId = req.params.id
    const game = await this.gameService.getGameById(gameId)
    res.status(200).json(game)
  }
}

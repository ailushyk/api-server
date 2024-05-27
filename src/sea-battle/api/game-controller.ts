import { Request, Response } from 'express'

import { GameService } from '@/sea-battle/application/game-service'

export class GameController {
  private gameService: GameService

  constructor({ gameService }: { gameService: GameService }) {
    this.gameService = gameService
  }

  async create(req: Request, res: Response) {
    try {
      const user = req.user
      const gameConfig = req.body
      const game = await this.gameService.create(gameConfig, user!.username)
      res.status(201).json(game)
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message })
      }
    }
  }

  async get(req: Request, res: Response) {
    try {
      const params = req.params
      const game = await this.gameService.getGameById(params)
      if (!game) {
        res.status(404).json({ error: 'Game not found' })
        return
      }
      res.status(200).json(game)
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message })
      }
    }
  }
}

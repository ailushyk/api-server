import { Request, Response } from 'express'

import { GameService } from '@/sea-battle/application/game-service'
import {
  createGameSchema,
  getParamsSchema,
  startRequestSchema,
} from '@/sea-battle/application/game-validation-schema'
import { getAuthenticatedUser } from '@/utils/user'

export class GameController {
  private gameService: GameService

  constructor({ gameService }: { gameService: GameService }) {
    this.gameService = gameService
  }

  async create(req: Request, res: Response) {
    try {
      const user = getAuthenticatedUser(req)
      const gameConfig = createGameSchema.parse(req.body)
      const game = await this.gameService.create(gameConfig, user.id)
      res.status(201).json(game)
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message })
      }
    }
  }

  async allByUser(req: Request, res: Response) {
    try {
      const user = getAuthenticatedUser(req)
      const games = await this.gameService.getAllGames({
        userId: user.id,
      })
      res.status(200).json(games)
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message })
      }
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const user = getAuthenticatedUser(req)
      const params = getParamsSchema.parse(req.params)
      const game = await this.gameService.getGameById(params, user.id)
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

  async start(req: Request, res: Response) {
    try {
      const user = getAuthenticatedUser(req)
      const params = startRequestSchema.parse(req.params)
      await this.gameService.startGame(params, user.id)
      res.status(200).json({ message: 'Game started' })
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message })
      }
      throw error
    }
  }

  move(req: Request, res: Response) {
    throw new Error('Not implemented')
  }
}

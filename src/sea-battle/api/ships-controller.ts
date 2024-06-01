import { Request, Response } from 'express'

import { GameService } from '@/sea-battle/application/game-service'
import {
  deleteRequestShipsSchema,
  getRequestShipsSchema,
} from '@/sea-battle/application/game-validation-schema'
import { insertShipSchema } from '@/sea-battle/infrastructure/schema/ships-schema'
import { getAuthenticatedUser } from '@/utils/user'

export class ShipsController {
  private gameService: GameService

  constructor({ gameService }: { gameService: GameService }) {
    this.gameService = gameService
  }

  async addShip(req: Request, res: Response) {
    try {
      const gameId = req.params.id
      const user = getAuthenticatedUser(req)
      const params = insertShipSchema.parse({
        ...req.body,
        gameId: gameId,
        userId: user.id,
      })
      const ship = await this.gameService.addShip({ ...params })
      res.status(201).json(ship)
    } catch (error) {
      console.error('addShip error: ', error)
      if (error instanceof Error) {
        res.status(400).json({ error: error.message })
      }
    }
  }

  async getShips(req: Request, res: Response) {
    try {
      const user = getAuthenticatedUser(req)
      const params = getRequestShipsSchema.parse({
        ...req.params,
        userId: user.id,
      })
      const ships = await this.gameService.getShips(params)
      res.status(200).json(ships)
    } catch (error) {
      console.error('getShips error: ', error)
      if (error instanceof Error) {
        res.status(400).json({ error: error.message })
      }
    }
  }

  async removeShip(req: Request, res: Response) {
    try {
      const user = getAuthenticatedUser(req)
      const params = deleteRequestShipsSchema.parse({
        ...req.params,
        userId: user.id,
      })
      await this.gameService.removeShip(params)
      res.status(204).json({ message: 'Ship removed' })
    } catch (error) {
      console.error('getShips error: ', error)
      if (error instanceof Error) {
        res.status(500).json({ error: error.message })
      }
    }
  }
}

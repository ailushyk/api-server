import { Request, Response } from 'express'

import { getAuthenticatedUser } from '@/lib/user'
import {
  deleteRequestShipsSchema,
  getRequestShipsSchema,
} from '@/modules/sea-battle/application/game-validation-schema'
import { ShipService } from '@/modules/sea-battle/application/ship-service'
import { insertShipSchema } from '@/modules/sea-battle/infrastructure/schema/ships-schema'

export class ShipsController {
  private shipsService: ShipService

  constructor({ shipService }: { shipService: ShipService }) {
    this.shipsService = shipService
  }

  async getShipsByUser(req: Request, res: Response) {
    try {
      const user = getAuthenticatedUser(req)
      const params = getRequestShipsSchema.parse({
        ...req.params,
        userId: user.id,
      })
      const ships = await this.shipsService.getShips(params)
      res.status(200).json(ships)
    } catch (error) {
      console.error('getShips error: ', error)
      if (error instanceof Error) {
        res.status(400).json({ error: error.message })
      }
    }
  }

  async getAvailableShips(req: Request, res: Response) {
    try {
      const ships = await this.shipsService.getAvailableShips()
      res.status(200).json(ships)
    } catch (error) {
      console.error('getAvailableShips error: ', error)
      if (error instanceof Error) {
        res.status(500).json({ error: error.message })
      }
    }
  }

  async addShip(req: Request, res: Response) {
    try {
      const user = getAuthenticatedUser(req)
      const params = insertShipSchema.parse({
        ...req.body,
        userId: user.id,
      })
      const ship = await this.shipsService.addShip({ ...params })
      res.status(201).json(ship)
    } catch (error) {
      console.error('addShip error: ', error)
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
      await this.shipsService.removeShip(params)
      res.status(204).json({ message: 'Ship removed' })
    } catch (error) {
      console.error('getShips error: ', error)
      if (error instanceof Error) {
        res.status(500).json({ error: error.message })
      }
    }
  }
}

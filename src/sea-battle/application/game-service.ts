import { z } from 'zod'

import {
  getAllGamesParamsSchema,
  getParamsSchema,
  getRequestShipsSchema,
} from '@/sea-battle/application/game-validation-schema'
import { Game } from '@/sea-battle/domain/game'
import { IGameRepository } from '@/sea-battle/domain/game-repository'
import { insertShipSchema } from '@/sea-battle/infrastructure/schema/ships-schema'

export class GameService {
  private repository: IGameRepository

  constructor({ repository }: { repository: IGameRepository }) {
    this.repository = repository
  }

  async create(
    data: Pick<Game, 'rows' | 'cols'>,
    userId: string,
  ): Promise<Game | null> {
    return this.repository.create(data, userId)
  }

  async getGameById(
    params: z.infer<typeof getParamsSchema>,
    userId: string,
  ): Promise<Game | null> {
    return this.repository.getById({ ...params, userId })
  }

  async getAllGames(params: { userId: string }) {
    const parsedParams = getAllGamesParamsSchema.parse(params)
    return this.repository.getAll(parsedParams)
  }

  async addShip(params: z.infer<typeof insertShipSchema>) {
    return this.repository.ships.add({ ...params })
  }

  async getShips(params: z.infer<typeof getRequestShipsSchema>) {
    return this.repository.ships.get(params)
  }

  async removeShip(params: { gameId: string; userId: string; shipId: string }) {
    return this.repository.ships.remove(params)
  }
}

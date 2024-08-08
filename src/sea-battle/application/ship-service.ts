import { z } from 'zod'

import { GameService } from '@/sea-battle/application/game-service'
import { getRequestShipsSchema } from '@/sea-battle/application/game-validation-schema'
import { IShipRepository } from '@/sea-battle/domain/ship-repository'
import { insertShipSchema } from '@/sea-battle/infrastructure/schema/ships-schema'

export class ShipService {
  private shipRepository: IShipRepository
  private gameService: GameService

  constructor({
    shipRepository,
    gameService,
  }: {
    shipRepository: IShipRepository
    gameService: GameService
  }) {
    this.shipRepository = shipRepository
    this.gameService = gameService
  }

  async getShips(params: z.infer<typeof getRequestShipsSchema>) {
    return this.shipRepository.getAllByUser(params)
  }

  async getAvailableShips() {
    return this.shipRepository.getAvailableShips()
  }

  async addShip(params: z.infer<typeof insertShipSchema>) {
    const game = await this.gameService.getGameById(
      { id: params.gameId },
      params.userId,
    )
    if (!game || game.status !== 'idle') {
      throw new Error('Game not found or already started')
    }
    return await this.shipRepository.add({ ...params })
  }

  async removeShip(params: { userId: string; shipId: string }) {
    return this.shipRepository.remove(params)
  }
}

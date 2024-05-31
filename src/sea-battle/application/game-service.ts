import { z } from 'zod'

import {
  createGameSchema,
  getAllGamesParamsSchema,
  getParamsSchema,
} from '@/sea-battle/application/game-validation-schema'
import { Game } from '@/sea-battle/domain/game'
import { IGameRepository } from '@/sea-battle/domain/game-repository'

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
}

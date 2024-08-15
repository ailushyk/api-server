import { z } from 'zod'

import {
  getAllGamesParamsSchema,
  getParamsSchema,
} from '@/modules/sea-battle/application/game-validation-schema'
import { Game } from '@/modules/sea-battle/domain/game'
import { IGameRepository } from '@/modules/sea-battle/domain/game-repository'

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
    return this.repository.getAllByUser(parsedParams)
  }

  async startGame(params: { gameId: string }, id: string) {
    console.log('startGame', params, id)
    const game = await this.getGameById({ id: params.gameId }, id)
    console.log('game', game)
  }
}

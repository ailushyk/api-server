import {
  createGameSchema,
  getParamsSchema,
} from '@/sea-battle/application/validation-schema'
import { Game } from '@/sea-battle/domain/game'
import { IGameRepository } from '@/sea-battle/domain/game-repository'

export class GameService {
  private repository: IGameRepository

  constructor({ repository }: { repository: IGameRepository }) {
    this.repository = repository
  }

  async create(data: {
    userId: string
    rows: number
    cols: number
  }): Promise<Game | null> {
    const parsedData = createGameSchema.parse(data)
    return this.repository.create(parsedData)
  }

  async getGameById(params: unknown): Promise<Game | null> {
    const parsedParams = getParamsSchema.parse(params)
    return this.repository.getById(parsedParams)
  }
}

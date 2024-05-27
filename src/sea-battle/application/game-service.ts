import { v4 } from 'uuid'

import { Game } from '@/sea-battle/domain/game'
import { IGameRepository } from '@/sea-battle/domain/game-repository'

export class GameService {
  private repository: IGameRepository

  constructor({ repository }: { repository: IGameRepository }) {
    this.repository = repository
  }

  async start({ username }: { username: string }) {
    const game: Game = {
      id: v4(),
      players: [username],
    }
    await this.repository.save({ game })
  }

  async getGameById(gameId: string): Promise<Game> {
    // Get a game by ID
    return { id: gameId, players: [] }
  }
}

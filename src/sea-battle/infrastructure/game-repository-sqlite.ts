import { IGameRepository } from '@/sea-battle/domain/game-repository'

import { Game } from '../domain/game'

export class GameRepositorySQLite implements IGameRepository {
  async save({ game }: { game: Game }): Promise<void> {
    await Promise.resolve()
    console.log(`Saving game ${game.id}`)
  }
  async getById({ id }: { id: string }): Promise<Game> {
    console.log(`Getting game by ID ${id}`)
    return { id, players: [] }
  }
}

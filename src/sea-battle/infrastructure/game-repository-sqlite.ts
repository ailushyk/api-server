import { eq } from 'drizzle-orm'

import { db } from '@/config/database'
import { IGameRepository } from '@/sea-battle/domain/game-repository'
import {
  games,
  usersToGames,
} from '@/sea-battle/infrastructure/schema/game-schema'

import { Game } from '../domain/game'

/**
 * Game repository implementation for SQLite
 * @implements IGameRepository
 * TODO: userId should be obtained from the JWT token
 */
export class GameRepositorySQLite implements IGameRepository {
  create({
    userId,
    rows,
    cols,
  }: {
    userId: string
    rows: number
    cols: number
  }): Promise<Game> {
    return db.transaction(async (trx) => {
      const [game] = await trx
        .insert(games)
        .values({
          rows,
          cols,
          status: 'idle',
        })
        .returning()

      await trx.insert(usersToGames).values({
        gameId: game.id,
        userId,
      })
      return game
    })
  }

  async getById({ id }: { id: string }) {
    const game = db.select().from(games).where(eq(games.id, id)).get()
    return game || null
  }
}

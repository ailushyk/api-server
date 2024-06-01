import { and, eq, getTableColumns } from 'drizzle-orm'
import { z } from 'zod'

import { db } from '@/config/database'
import { IGameRepository } from '@/sea-battle/domain/game-repository'
import {
  games,
  usersToGames,
} from '@/sea-battle/infrastructure/schema/game-schema'
import {
  insertShipSchema,
  selectShipSchema,
  ships,
} from '@/sea-battle/infrastructure/schema/ships-schema'

import { Game } from '../domain/game'

/**
 * Game repository implementation for SQLite
 * @implements IGameRepository
 * TODO: userId should be obtained from the JWT token
 */
export class GameRepositorySQLite implements IGameRepository {
  create(
    {
      rows,
      cols,
    }: {
      rows: number
      cols: number
    },
    userId: string,
  ): Promise<Game> {
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

  async getById({ id, userId }: { id: string; userId: string }) {
    const gamesColumns = getTableColumns(games)
    const game = db
      .select(gamesColumns)
      .from(games)
      .leftJoin(usersToGames, eq(usersToGames.gameId, games.id))
      .where(and(eq(usersToGames.gameId, id), eq(usersToGames.userId, userId)))
      .get()
    return game || null
  }

  async getAll({ userId }: { userId: string }): Promise<Game[]> {
    const gamesColumns = getTableColumns(games)
    return db
      .select(gamesColumns)
      .from(games)
      .leftJoin(usersToGames, eq(usersToGames.gameId, games.id))
      .where(eq(usersToGames.userId, userId))
      .all()
  }

  ships = {
    add: this.addShip,
    get: this.getShips,
    remove: this.removeShip,
  }

  private async addShip(
    ship: z.infer<typeof insertShipSchema>,
  ): Promise<z.infer<typeof selectShipSchema>> {
    const [newShip] = await db.insert(ships).values(ship).returning()
    return newShip
  }

  private async getShips({
    gameId,
    userId,
  }: {
    gameId: string
    userId: string
  }): Promise<z.infer<typeof selectShipSchema>[]> {
    return db
      .select()
      .from(ships)
      .where(and(eq(ships.gameId, gameId), eq(ships.userId, userId)))
      .all()
  }

  private async removeShip({
    gameId,
    userId,
    shipId,
  }: {
    gameId: string
    userId: string
    shipId: string
  }) {
    return await db
      .delete(ships)
      .where(
        and(
          eq(ships.id, shipId),
          eq(ships.gameId, gameId),
          eq(ships.userId, userId),
        ),
      )
      .returning()
  }
}

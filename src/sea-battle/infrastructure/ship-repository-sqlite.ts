import { and, eq } from 'drizzle-orm'
import { z } from 'zod'

import { db } from '@/config/database'
import { Ship } from '@/sea-battle/domain/ship'
import { IShipRepository } from '@/sea-battle/domain/ship-repository'
import {
  insertShipSchema,
  selectShipSchema,
  ships,
} from '@/sea-battle/infrastructure/schema/ships-schema'

export class ShipRepositorySqlite implements IShipRepository {
  getAvailableShips(): { id: string; label: string; size: number }[] {
    return [
      {
        id: 'carrier',
        label: 'Carrier',
        size: 5,
      },
      {
        id: 'battleship',
        label: 'Battleship',
        size: 4,
      },
      {
        id: 'cruiser',
        label: 'Cruiser',
        size: 3,
      },
      {
        id: 'submarine',
        label: 'Submarine',
        size: 3,
      },
      {
        id: 'destroyer',
        label: 'Destroyer',
        size: 2,
      },
    ]
  }

  async getAllByUser({
    gameId,
    userId,
  }: {
    gameId: string
    userId: string
  }): Promise<Ship[]> {
    return db
      .select()
      .from(ships)
      .where(and(eq(ships.gameId, gameId), eq(ships.userId, userId)))
      .all()
  }

  async add(
    ship: z.infer<typeof insertShipSchema>,
  ): Promise<z.infer<typeof selectShipSchema>> {
    const [newShip] = await db.insert(ships).values(ship).returning()
    return newShip
  }

  async remove({ userId, shipId }: { userId: string; shipId: string }) {
    await db
      .delete(ships)
      .where(and(eq(ships.id, shipId), eq(ships.userId, userId)))
  }
}

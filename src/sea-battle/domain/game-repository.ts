import { Game, Ship } from '@/sea-battle/domain/game'

export interface IGameRepository {
  create(
    gameConfig: { rows: number; cols: number },
    userId: string,
  ): Promise<Game>

  getById(params: { id: string; userId: string }): Promise<Game | null>

  getAll(params: { userId: string }): Promise<Game[]>

  ships: {
    add: (ship: Omit<Ship, 'id' | 'status'>) => Promise<Ship>
    get: (params: { gameId: string; userId: string }) => Promise<Ship[]>
    remove: (params: {
      gameId: string
      userId: string
      shipId: string
    }) => Promise<void>
  }
}

import { Ship } from '@/modules/sea-battle/domain/ship'

export interface IShipRepository {
  getAvailableShips(): { id: string; label: string; size: number }[]

  getAllByUser(params: { gameId: string; userId: string }): Promise<Ship[]>

  add(ship: Omit<Ship, 'id' | 'status'>): Promise<Ship>

  remove(params: { userId: string; shipId: string }): Promise<void>
}

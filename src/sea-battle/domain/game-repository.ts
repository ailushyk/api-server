import { Game } from '@/sea-battle/domain/game'

export interface IGameRepository {
  create(params: { userId: string; rows: number; cols: number }): Promise<Game>
  getById({ id }: { id: string }): Promise<Game | null>
}

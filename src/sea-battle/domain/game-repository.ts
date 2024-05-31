import { Game } from '@/sea-battle/domain/game'

export interface IGameRepository {
  create(
    gameConfig: { rows: number; cols: number },
    userId: string,
  ): Promise<Game>

  getById(params: { id: string; userId: string }): Promise<Game | null>

  getAll(params: { userId: string }): Promise<Game[]>
}

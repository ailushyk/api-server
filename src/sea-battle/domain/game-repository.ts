import { Game } from '@/sea-battle/domain/game'

export interface IGameRepository {
  create(
    gameConfig: { rows: number; cols: number },
    userId: string,
  ): Promise<Game>
  getById({ id }: { id: string }): Promise<Game | null>
}

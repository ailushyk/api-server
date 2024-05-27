import { Game } from '@/sea-battle/domain/game'

export interface IGameRepository {
  save({ game }: { game: Game }): Promise<void>
  getById({ id }: { id: string }): Promise<Game>
}

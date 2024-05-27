export type GameStatus = 'idle' | 'started' | 'finished'

export interface Game {
  id: string
  rows: number
  cols: number
  status: GameStatus
  createdAt: string
  updatedAt: string
}

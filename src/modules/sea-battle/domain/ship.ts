export type ShipOrientation = 'horizontal' | 'vertical'
export type ShipStatus = 'idle' | 'placed' | 'sunk'

export interface Ship {
  id: string
  gameId: string
  userId: string
  label: string
  size: number
  orientation: ShipOrientation
  row: number
  col: number
  status: ShipStatus
}

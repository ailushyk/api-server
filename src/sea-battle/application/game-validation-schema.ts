import { z } from 'zod'

import { selectShipSchema } from '@/sea-battle/infrastructure/schema/ships-schema'

export const createGameSchema = z.object({
  rows: z.number(),
  cols: z.number(),
})

export const getAllGamesParamsSchema = z.object({
  userId: z.string(),
})

export const getParamsSchema = z.object({
  id: z.string(),
})

export const getRequestShipsSchema = selectShipSchema.pick({
  gameId: true,
  userId: true,
})

export const deleteRequestShipsSchema = z.object({
  userId: z.string(),
  gameId: z.string(),
  shipId: z.string(),
})

import { z } from 'zod'

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

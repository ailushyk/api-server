import { z } from 'zod'

export const createGameSchema = z.object({
  userId: z.string(),
  rows: z.number(),
  cols: z.number(),
})

export const getParamsSchema = z.object({
  id: z.string(),
})

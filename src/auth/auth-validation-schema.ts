import { z } from 'zod'

export const authGenerateAccessTokenSchema = z.object({
  id: z.string(),
})

export const authAccessTokenSchema = z.object({
  token: z.string(),
})

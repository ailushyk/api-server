import { z } from 'zod'

export const authGenerateAccessTokenSchema = z.object({
  username: z.string(),
})

export const authAccessTokenSchema = z.object({
  token: z.string(),
})

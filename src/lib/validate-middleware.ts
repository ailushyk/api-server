import type { Request, Response } from 'express'
import { ZodSchema } from 'zod'

export function validateParams(schema: ZodSchema) {
  return (req: Request, res: Response, next: () => void) => {
    try {
      schema.parse(req.params)
    } catch (error) {
      console.log(`Validate params error: ${req.originalUrl}`)
      console.log(error)
      return res.status(422).json({ error: 'Invalid data' })
    }
    next()
  }
}

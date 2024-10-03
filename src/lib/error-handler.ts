import { logger } from '#lib/logger.ts'
import type { NextFunction, Request, Response } from 'express'

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  logger.error(err.message, err.stack)
  res.status(500).send('Something went wrong!')
}

import { NextFunction, Request, Response } from 'express'

import { logger } from '@/lib/logger'

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.error(err.message, err.stack)
  res.status(500).send('Something broke!')
}

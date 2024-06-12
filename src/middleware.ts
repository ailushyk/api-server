import { NextFunction, Request, Response } from 'express'

import { AuthService } from '@/auth/application/auth-service'
import { UserRepositorySqlite } from '@/auth/infrastructure/user-repository-sqlite'

export function authenticateTokenMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) return res.sendStatus(401)
  try {
    req.user = new AuthService({
      userRepository: new UserRepositorySqlite(),
    }).verifyToken(token)
    next()
  } catch (error) {
    console.error(error)
    return res.sendStatus(403)
  }
}

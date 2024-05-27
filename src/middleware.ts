import { NextFunction, Request, Response } from 'express'
import { JwtPayload } from 'jsonwebtoken'

import { AuthService } from '@/auth/application/auth-service'

interface User extends JwtPayload {
  // Define the properties of your User here
  // For example, if your JWT payload includes a username and id:
  // id: string
  username: string
  // Add more properties as needed
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: User
    }
  }
}

export function authenticateTokenMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) return res.sendStatus(401)

  try {
    const user = new AuthService().verifyToken(token)
    req.user = user as User
    next()
  } catch (error) {
    console.error(error)
    return res.sendStatus(403)
  }
}

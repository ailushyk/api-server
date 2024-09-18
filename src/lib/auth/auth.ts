import { Request } from 'express'
import jwt from 'jsonwebtoken'

export type AuthUser = {
  id: string
  email: string
  name: string
}

export const getAuthorizedUser = (req: Request): AuthUser => {
  const user = req.kauth?.grant?.access_token?.content
  if (!user?.sub) {
    throw new Error('User not found in the request')
  }
  return {
    id: user.sub,
    email: user.email,
    name: user.name,
  }
}

// @deprecated
export function getUserIdFromRequest(req: Request) {
  const user = getAuthorizedUser(req)
  return user.id
}

export const decodeToken = (token: string) => {
  return jwt.decode(token)
}

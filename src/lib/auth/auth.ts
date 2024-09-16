import { Request } from 'express'
import jwt from 'jsonwebtoken'

export function getUserIdFromRequest(req: Request) {
  const userId = req.kauth?.grant?.access_token?.content.sub
  if (!userId) {
    throw new Error('User not found in the request')
  }
  return userId
}

export const decodeToken = (token: string) => {
  return jwt.decode(token)
}

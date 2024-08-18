import { Request } from 'express'

/**
 * @deprecated
 * @param req
 */
export function getAuthenticatedUser(req: Request) {
  const user = req.user
  if (!user) {
    throw new Error('Unauthorized')
  }
  return user
}

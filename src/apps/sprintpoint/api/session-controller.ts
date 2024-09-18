import { Request, Response } from 'express'

import { getUserIdFromRequest } from '@/lib/auth/auth'

const sessionService = {
  startSession: async ({ userId }: { userId: string }) => {
    console.log('Starting session for user:', userId)
    return {
      session: 'session',
    }
  },
}
export const createSessionController = () => {
  const startSession = async (req: Request, res: Response) => {
    const userId = getUserIdFromRequest(req)
    const session = await sessionService.startSession({ userId })
    res.json(session)
  }

  return {
    startSession,
  }
}

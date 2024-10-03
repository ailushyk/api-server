import { getAuthorizedUser } from '#lib/auth/auth.ts'
import type { SessionService } from '#sprintpoint/application/session-service.ts'
import type { Request, Response } from 'express'
import { z } from 'zod'

const newSessionSchema = z.object({
  deckId: z.string(),
})

export class SessionController {
  private service: SessionService
  constructor(service: SessionService) {
    this.service = service
  }

  public getSessions = async (req: Request, res: Response) => {
    const user = getAuthorizedUser(req)
    const sessions = await this.service.getUserSessions({ userId: user.id })
    res.json({ data: sessions })
  }

  /**
   * Get a session by ID and
   *    add the user to the session if not already added
   */
  public getSession = async (req: Request, res: Response) => {
    // const user = getAuthorizedUser(req)
    const sessionId = req.params.sessionId
    if (!sessionId) {
      res.status(400).json({ error: 'Session ID is required' })
      return
    }
    const result = await this.service.getSession({ sessionId })
    res.json({ data: result })
  }

  public startSession = async (req: Request, res: Response) => {
    const { deckId } = newSessionSchema.parse(req.body)
    const user = getAuthorizedUser(req)

    const session = await this.service.startSession({
      userId: user.id,
      name: user.name || user.email,
      deckId,
    })
    res.json({ data: session })
  }
}

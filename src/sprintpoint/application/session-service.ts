import { SessionRepository } from '#sprintpoint/infrastructure/session-repository.ts'

export class SessionService {
  private repository: SessionRepository

  constructor({ repository }: { repository: SessionRepository }) {
    this.repository = repository
  }

  public getUserSessions = async ({ userId }: { userId: string }) => {
    return this.repository.getSessionsByUserId(userId)
  }

  public startSession = async (data: {
    userId: string
    name: string
    deckId: string
  }) => {
    return this.repository.createSession(data)
  }

  public getSession = async (param: { sessionId: string }) => {
    return this.repository.getSessionById(param)
  }
}

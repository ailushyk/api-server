import { Request, Response } from 'express'

import { AuthService } from '@/auth/application/auth-service'

export class AuthController {
  authService: AuthService

  constructor(service: AuthService) {
    this.authService = service
  }

  login(req: Request, res: Response) {
    const { username } = req.body
    const accessToken = this.authService.generateAccessToken(username)
    const jwt = this.authService.verifyToken(accessToken)
    const refreshToken = this.authService.generateRefreshToken(username)
    res.json({ ...jwt, accessToken, refreshToken })
  }

  refresh(req: Request, res: Response) {
    const { token } = req.body
    const user = this.authService.verifyToken(token)
    if (user) {
      const accessToken = this.authService.generateAccessToken(user.username)
      const jwt = this.authService.verifyToken(accessToken)
      const refreshToken = this.authService.generateRefreshToken(user.username)
      return res.json({ ...jwt, accessToken, refreshToken })
    }
    res.status(401).json({ error: 'Unauthorized' })
  }
}

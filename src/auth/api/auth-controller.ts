import { Request, Response } from 'express'

import { AuthService } from '@/auth/application/auth-service'
import {
  authAccessTokenSchema,
  authGenerateAccessTokenSchema,
} from '@/auth/auth-validation-schema'

export class AuthController {
  authService: AuthService

  constructor(service: AuthService) {
    this.authService = service
  }

  async login(req: Request, res: Response) {
    const params = authGenerateAccessTokenSchema.parse(req.body)
    const jwt = await this.authService.jwt(params)
    res.json(jwt)
  }

  async refresh(req: Request, res: Response) {
    const { token } = authAccessTokenSchema.parse(req.body)
    const user = this.authService.verifyToken(token)
    if (user) {
      const params = authGenerateAccessTokenSchema.parse(user)
      const jwt = await this.authService.jwt(params)
      return res.json(jwt)
    }
    res.status(401).json({ error: 'Unauthorized' })
  }
}

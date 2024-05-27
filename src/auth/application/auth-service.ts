import jwt, { JwtPayload } from 'jsonwebtoken'

import {
  authAccessTokenSchema,
  authGenerateAccessTokenSchema,
} from '@/auth/application/auth-validation-schema'
import { AUTH_EXPIRES_IN, AUTH_SECRET } from '@/constans'

export class AuthService {
  generateAccessToken(username: unknown) {
    const parsedUsername = authGenerateAccessTokenSchema.parse({ username })
    return jwt.sign({ username: parsedUsername.username }, AUTH_SECRET, {
      expiresIn: AUTH_EXPIRES_IN,
    })
  }

  generateRefreshToken(username: unknown) {
    const parsedUsername = authGenerateAccessTokenSchema.parse({ username })
    return jwt.sign({ username: parsedUsername.username }, AUTH_SECRET)
  }

  verifyToken(token: unknown): JwtPayload {
    const parsedToken = authAccessTokenSchema.parse({ token })
    return jwt.verify(parsedToken.token, AUTH_SECRET) as JwtPayload
  }
}

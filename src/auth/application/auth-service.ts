import jwt, { JwtPayload } from 'jsonwebtoken'

import { UserRepository } from '@/auth/domain/user-repository'
import { AUTH_EXPIRES_IN, AUTH_SECRET } from '@/constans'

export class AuthService {
  private userRepository: UserRepository
  constructor({ userRepository }: { userRepository: UserRepository }) {
    this.userRepository = userRepository
  }

  private generateAccessToken(data: { id: string }) {
    return jwt.sign(data, AUTH_SECRET, {
      expiresIn: AUTH_EXPIRES_IN,
    })
  }

  private generateRefreshToken(data: { id: string }) {
    return jwt.sign(data, AUTH_SECRET)
  }

  // TODO: save the refresh token in the database with details
  verifyToken(token: string) {
    const user = jwt.verify(token, AUTH_SECRET)
    return user as JwtPayload
  }

  async jwt(user: { id: string }) {
    // TODO: temporary solution, should be replaced with a proper user creation
    await this.userRepository.createIfNotExists(user)
    const accessToken = this.generateAccessToken(user)
    const jwt = this.verifyToken(accessToken)
    const refreshToken = this.generateRefreshToken(user)
    return { ...jwt, accessToken, refreshToken }
  }
}

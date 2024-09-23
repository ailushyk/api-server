import type { JwtPayload } from 'jsonwebtoken'
import type { Token } from 'keycloak-connect'

declare module 'express' {
  interface Request {
    kauth?: {
      grant?: {
        access_token?: Token & {
          content: JwtPayload
        }
      }
    }
  }
}

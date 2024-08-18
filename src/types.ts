import { JwtPayload } from 'jsonwebtoken'
import { Token } from 'keycloak-connect'

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

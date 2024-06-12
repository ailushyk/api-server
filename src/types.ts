import { JwtPayload } from 'jsonwebtoken'

declare module 'jsonwebtoken' {
  export interface JwtPayload {
    id: string
  }
}

declare module 'express' {
  export interface Request {
    user?: JwtPayload
  }
}

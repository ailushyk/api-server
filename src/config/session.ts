// Configure session
import session from 'express-session'

import { env } from '@/env'

export const sessionMemoryStore = new session.MemoryStore()
export const authSession = () =>
  session({
    secret: env.AUTH_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionMemoryStore,
  })

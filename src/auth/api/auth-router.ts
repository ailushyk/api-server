import { Router } from 'express'

import { AuthController } from '@/auth/api/auth-controller'
import { AuthService } from '@/auth/application/auth-service'
import { UserRepositorySqlite } from '@/auth/infrastructure/user-repository-sqlite'

const userRepository = new UserRepositorySqlite()
const authService = new AuthService({ userRepository })
const authController = new AuthController(authService)

const router = Router()
router.post('/login', (req, res) => authController.login(req, res))
router.post('/refresh', (req, res) => authController.refresh(req, res))

export default router

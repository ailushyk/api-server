import { Router } from 'express'

import { AuthController } from '@/auth/api/auth-controller'
import { AuthService } from '@/auth/application/auth-service'

const authService = new AuthService()
const authController = new AuthController(authService)

const router = Router()
router.post('/login', (req, res) => authController.login(req, res))
router.post('/refresh', (req, res) => authController.refresh(req, res))

export default router

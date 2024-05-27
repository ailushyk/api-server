import { Router } from 'express'

import { UserService } from '@/user/application/user-service'
import { UserRepository } from '@/user/infrastructure/user-repository'

import { UserController } from './user-controller'

const userRepository = new UserRepository()
const userService = new UserService(userRepository)
const userController = new UserController(userService)

const router = Router()
router.post('/users', (req, res) => userController.createUser(req, res))
router.get('/users/:id', (req, res) => userController.getUserById(req, res))

export default router

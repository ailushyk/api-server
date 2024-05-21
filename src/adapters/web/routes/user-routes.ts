import { Router } from 'express'

import { UserService } from '@/application/services/user-service'

import { SqliteUserRepository } from '../../persistence/sqlite/user-repository'
import { UserController } from '../controllers/user-controller'

const router = Router()
const userRepository = SqliteUserRepository()
const userService = new UserService(userRepository)
const userController = new UserController(userService)

router.post('/users', (req, res) => userController.createUser(req, res))
router.get('/users/:id', (req, res) => userController.getUserById(req, res))

export default router

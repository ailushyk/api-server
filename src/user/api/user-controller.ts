import { Request, Response } from 'express'

import { UserService } from '@/user/application/user-service'

export class UserController {
  private userService: UserService

  constructor(userService: UserService) {
    this.userService = userService
  }

  async createUser(req: Request, res: Response) {
    try {
      const userData = req.body
      const newUser = await this.userService.createUser(userData)
      res.status(201).json(newUser)
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message })
      }
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const userId = req.params.id
      const user = await this.userService.getUserById(userId)
      if (user) {
        res.status(200).json(user)
      } else {
        res.status(404).json({ error: 'User not found' })
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message })
      }
    }
  }
}

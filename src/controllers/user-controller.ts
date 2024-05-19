import { Request, Response } from 'express'
import { z } from 'zod'

import { userSchema } from '../schemas/user-schema'
import { createUser, getUserById } from '../services/user-service'

export const createUserController = async (req: Request, res: Response) => {
  try {
    const userData = userSchema.parse(req.body)
    const newUser = await createUser(userData)
    res.status(201).json(newUser)
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.message })
    }
  }
}

export const getUserByIdController = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id, 10)
    const user = await getUserById(userId)
    if (user) {
      res.status(200).json(user)
    } else {
      res.status(404).json({ error: 'User not found' })
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.message })
    }
  }
}

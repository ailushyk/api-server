import { db } from '../config/database'
import { User } from '../models/user'
import { UserRepository } from '../repositories/user-repository'

const userRepository = new UserRepository(db)

export const createUser = async (userData: Partial<User>): Promise<User> => {
  return userRepository.createUser(userData)
}

export const getUserById = async (userId: number): Promise<User | null> => {
  return userRepository.getUserById(userId)
}

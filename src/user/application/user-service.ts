import { User } from '@/user/domain/user'
import { IUserRepository } from '@/user/domain/user-repository'

export class UserService {
  private userRepository: IUserRepository

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  private validateUser(user: User) {
    if (!user.id) {
      throw new Error('User ID is required')
    }
    // Add more validation as needed
  }

  async createUser(newUser: User): Promise<User> {
    // this.validateUser(newUser)
    try {
      return await this.userRepository.createUser(newUser)
    } catch (error) {
      console.error(error)
      if (error instanceof Error) {
        throw new Error(`Error creating user: ${error.message}`)
      }
      throw error
    }
  }

  async getUserById(userId: string): Promise<User | null> {
    if (!userId) {
      throw new Error('User ID is required')
    }

    try {
      return await this.userRepository.getById({ id: userId })
    } catch (error) {
      console.error(error)
      if (error instanceof Error) {
        throw new Error(`Error getting user by id: ${error.message}`)
      }
      throw error
    }
  }
}

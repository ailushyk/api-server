import { NewUser, User } from '../../domain/models/user'
import { UserRepository } from '../ports/user-repository'

export class UserService {
  private userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async createUser(userData: NewUser): Promise<User> {
    return this.userRepository.createUser(userData)
  }

  async getUserById(userId: string): Promise<User | null> {
    return this.userRepository.getUserById(userId)
  }
}

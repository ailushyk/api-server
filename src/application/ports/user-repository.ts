import { NewUser, User } from '../../domain/models/user'

export interface UserRepository {
  createUser(userData: NewUser): Promise<User>
  getUserById(userId: string): Promise<User | null>
}

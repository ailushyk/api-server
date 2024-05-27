import { User } from '@/user/domain/user'

export interface IUserRepository {
  createUser(userData: Partial<User>): Promise<User>
  getById({ id }: { id: string }): Promise<User | null>
}

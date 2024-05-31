import { User } from '@/auth/domain/user'

export interface UserRepository {
  createIfNotExists({ id }: { id: string }): Promise<User>
  // updateLastLoginAt(id: string): Promise<void>
}

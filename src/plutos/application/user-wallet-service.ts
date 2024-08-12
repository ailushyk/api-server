import { UserWalletsRepository } from '@/plutos/application/wallet'

export class UserWalletService {
  private repository: UserWalletsRepository
  constructor({ repository }: { repository: UserWalletsRepository }) {
    this.repository = repository
  }

  async getUserWallets() {
    return this.repository.all()
  }
}

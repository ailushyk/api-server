import type { WalletTypeRepository } from '#modules/plutos/application/wallet-type.ts'

export class WalletTypeService {
  private repository: WalletTypeRepository

  constructor(param: { repository: WalletTypeRepository }) {
    this.repository = param.repository
  }

  async all() {
    return this.repository.all()
  }
}

import { LanguageRepository } from '@/common/infrastructure/language-repository'

export class LanguageService {
  private repository: LanguageRepository
  constructor({ repository }: { repository: LanguageRepository }) {
    this.repository = repository
  }

  async all() {
    return this.repository.all()
  }
}

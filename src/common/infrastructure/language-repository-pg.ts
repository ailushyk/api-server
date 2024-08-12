import { db } from '@/config/database'
import { LanguageRepository } from '@/common/infrastructure/language-repository'
import { language } from '@/common/infrastructure/schema/language-schema'

export class LanguageRepositoryPg implements LanguageRepository {
  async all() {
    return db.select().from(language)
  }
}

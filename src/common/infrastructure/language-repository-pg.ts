import type { LanguageRepository } from '#common/infrastructure/language-repository.ts'
import { language } from '#common/infrastructure/schema/language-schema.ts'
import { db } from '#config/database.ts'

export class LanguageRepositoryPg implements LanguageRepository {
  async all() {
    return db.select().from(language)
  }
}

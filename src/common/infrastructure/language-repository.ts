import { language } from '#common/infrastructure/schema/language-schema.ts'

export interface LanguageRepository {
  all(): Promise<(typeof language.$inferSelect)[]>
}

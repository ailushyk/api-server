import { language } from '@/common/infrastructure/schema/language-schema'

export interface LanguageRepository {
  all(): Promise<(typeof language.$inferSelect)[]>
}
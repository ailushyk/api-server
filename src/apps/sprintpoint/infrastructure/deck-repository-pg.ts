import type { DeckRepository } from '#apps/sprintpoint/application/deck-service.ts'
import { deck } from '#apps/sprintpoint/infrastructure/schema/deck-schema-pg.ts'
import { db } from '#config/database.ts'
import { eq } from 'drizzle-orm'

export const createDeckRepositoryPg = (): DeckRepository => {
  return {
    getAllDecks: async () => {
      return db
        .select({
          id: deck.id,
          name: deck.name,
          slug: deck.slug,
        })
        .from(deck)
    },
    getDeck: async ({ slug }) => {
      const [deckData] = await db
        .select({
          id: deck.id,
          name: deck.name,
          slug: deck.slug,
        })
        .from(deck)
        .where(eq(deck.slug, slug))
      return deckData || null
    },
  }
}

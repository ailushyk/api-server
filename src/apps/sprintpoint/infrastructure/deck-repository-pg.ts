import { eq } from 'drizzle-orm'

import { db } from '@/config/database'
import { DeckRepository } from '@/apps/sprintpoint/application/deck-service'
import { deck } from '@/apps/sprintpoint/infrastructure/schema/deck-schema-pg'

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
      // const cards = await db
      //   .select()
      //   .from(card)
      //   .where(eq(card.deckId, deckData.id))
      return deckData
    },
  }
}

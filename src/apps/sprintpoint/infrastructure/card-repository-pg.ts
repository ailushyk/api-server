import { eq } from 'drizzle-orm'

import { db } from '@/config/database'
import { CardRepository } from '@/apps/sprintpoint/application/card-service'
import { card } from '@/apps/sprintpoint/infrastructure/schema/card-schema-pg'
import { deck } from '@/apps/sprintpoint/infrastructure/schema/deck-schema-pg'

export const createCardRepositoryPg = (): CardRepository => {
  return {
    getCardsByDeckSlug: async ({ slug }) => {
      return db
        .select({
          title: card.title,
          value: card.value,
          order: card.order,
        })
        .from(card)
        .leftJoin(deck, eq(card.deckId, deck.id))
        .where(eq(deck.slug, slug))
        .orderBy(card.order)
    },
  }
}

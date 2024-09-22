import { eq } from 'drizzle-orm'

import { db } from '@/config/database'
import { CardRepository } from '@/apps/sprintpoint/application/card-service'
import { card } from '@/apps/sprintpoint/infrastructure/schema/card-schema-pg'
import { deck } from '@/apps/sprintpoint/infrastructure/schema/deck-schema-pg'

export const createCardRepositoryPg = (): CardRepository => {
  return {
    getCardsByDeckSlug: async ({ slug }) => {
      const rawCards = await db
        .select({
          id: card.id,
          title: card.title,
          value: card.value,
          order: card.order,
        })
        .from(card)
        .leftJoin(deck, eq(card.deckId, deck.id))
        .where(eq(deck.slug, slug))
        .orderBy(card.order)

      // transform raw data to domain model
      return rawCards.map((r) => ({
        id: r.id,
        title: r.title,
        value: r.value ? Number(r.value) : null,
        order: r.order,
      }))
    },
  }
}

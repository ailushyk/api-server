import { db } from '#config/database.ts'
import type { CardRepository } from '#sprintpoint/application/card-service.ts'
import { card } from '#sprintpoint/infrastructure/schema/card-schema-pg.ts'
import { deck } from '#sprintpoint/infrastructure/schema/deck-schema-pg.ts'
import { eq } from 'drizzle-orm'

export class CardRepositoryPg implements CardRepository {
  public getCardsByDeckSlug = async ({ slug }: { slug: string }) => {
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
  }
}

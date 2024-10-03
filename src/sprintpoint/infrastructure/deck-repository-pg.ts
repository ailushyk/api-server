import { db } from '#config/database.ts'
import type { DeckRepository } from '#sprintpoint/application/deck-service.ts'
import { deck } from '#sprintpoint/infrastructure/schema/deck-schema-pg.ts'
import { eq } from 'drizzle-orm'

export class DeckRepositoryPg implements DeckRepository {
  public getAllDecks = async () =>
    db
      .select({
        id: deck.id,
        name: deck.name,
        slug: deck.slug,
      })
      .from(deck)

  public getDeck = async ({ slug }: { slug: string }) => {
    const [deckData] = await db
      .select({
        id: deck.id,
        name: deck.name,
        slug: deck.slug,
      })
      .from(deck)
      .where(eq(deck.slug, slug))
    return deckData || null
  }
}

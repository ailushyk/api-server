import { eq } from 'drizzle-orm'

import { db } from '@/config/database'
import {
  card,
  deck,
} from '@/apps/sprintpoint/infrastructure/schema/deck-pg-schema'

export class DeckService {
  async getAllDecks() {
    return db.select().from(deck)
  }
  async getDeckWithCards() {
    // return db.select().from(deck).leftJoin(card, eq(deck.id, card.deckId))
    const [deckData] = await db
      .select()
      .from(deck)
      .where(eq(deck.slug, 'standard'))
    const cards = await db
      .select()
      .from(card)
      .where(eq(card.deckId, deckData.id))
    return { deck: deckData, cards }
  }
}

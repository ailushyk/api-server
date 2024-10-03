export type Deck = {
  id: string
  name: string
  slug: string
}

export type Card = {
  title: string
  value: number | null
  order: number
}

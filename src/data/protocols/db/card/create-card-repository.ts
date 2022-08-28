import { Card } from '@domain/models/card'

export type CardCreateParams = Omit<Card, 'id'>

export interface CreateCardRespository {
  add: (card: CardCreateParams) => Promise<Card>
}

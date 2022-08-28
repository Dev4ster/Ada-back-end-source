import { Card } from '../../../../domain/models/card'

export interface GetCardRepository {
  get: (cardId: string) => Promise<Card>
}

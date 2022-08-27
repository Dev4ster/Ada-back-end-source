import { Card } from '../models/card'

export interface GetCards {
  getAll: () => Promise<Card[]>
}

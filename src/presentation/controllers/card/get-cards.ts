import { GetCards } from '../../../domain/usecases/get-cards'
import { ok, serverError } from '../../helpers'
import { Controller, HttpResponse } from '../../protocols'

export class GetCardsController implements Controller {
  constructor(private readonly getCards: GetCards) {}
  async handle(): Promise<HttpResponse> {
    try {
      const cards = await this.getCards.getAll()
      return ok(cards)
    } catch (error) {
      return serverError(new Error())
    }
  }
}

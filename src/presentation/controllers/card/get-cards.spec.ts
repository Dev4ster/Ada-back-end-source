import { GetCardsController } from './get-cards'
import { GetCards, Controller } from './get-cards-protocols'
import { Card } from 'domain/models/card'
import { serverError } from 'presentation/helpers'

interface SutType {
  sut: Controller
  getCards: GetCards
}

const makeGetCardsStub = (): GetCards => {
  class GetCardsStub implements GetCards {
    async getAll() {
      return [
        {
          conteudo: 'any_conteudo',
          id: 'any_id',
          lista: 'any_lista',
          titulo: 'any_titulo'
        }
      ] as Card[]
    }
  }
  return new GetCardsStub()
}
const makeSut = (): SutType => {
  const getCards = makeGetCardsStub()
  const sut = new GetCardsController(getCards)

  return { sut, getCards }
}

describe('get-cards usecase', () => {
  it('should return empty message if getCards returns empty', async () => {
    const { sut, getCards } = makeSut()
    jest.spyOn(getCards, 'getAll').mockResolvedValue([])
    const response = await sut.handle({})
    expect(response.body).toHaveLength(0)
  })

  it('should return server error if getCards Throws', async () => {
    const { sut, getCards } = makeSut()
    jest.spyOn(getCards, 'getAll').mockImplementationOnce(() => {
      throw new Error()
    })
    const response = await sut.handle({})
    expect(response).toEqual(serverError(new Error()))
  })
})

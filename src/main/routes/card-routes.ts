import { Router } from 'express'
import { DbGetCards } from '../../data/usecases/cards/db-get-cards'
import { JwtAdapter } from '../../infra/cryptography/jwt-adapter'
import { GetCardsSqliteRepository } from '../../infra/db/sqlite/card/get-cards-sqlite-repository'
import { GetCardsController } from '../../presentation/controllers/card/get-cards'
import { AuthMiddleware } from '../../presentation/middlewares/auth-middleware'
import { Controller } from '../../presentation/protocols'
import { Middleware } from '../../presentation/protocols/middleware'
import { adaptMiddleware } from '../adapters/express-middleware-adapter'
import { adaptRoute } from '../adapters/express-route-adapter'

const makeGetCards = (): Controller => {
  const getCardsSqliteRepository = new GetCardsSqliteRepository()
  const dbGetCards = new DbGetCards(getCardsSqliteRepository)
  return new GetCardsController(dbGetCards)
}

const makeAuthMiddleware = (): Middleware => {
  const jwt = new JwtAdapter('teste')
  return new AuthMiddleware(jwt)
}

const adaptMiddlewareAuth = adaptMiddleware(makeAuthMiddleware())

export default (router: Router): void => {
  router.get('/card', adaptMiddlewareAuth, adaptRoute(makeGetCards()))
}

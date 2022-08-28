import { Router } from 'express'

import { adaptRoute } from '@main/adapters/express-route-adapter'
import { makeAddCardController } from '@main/factories/controllers/cards/add-card-factory'
import { makeGetCardsController } from '@main/factories/controllers/cards/get-cards-factory'
import { adaptMiddlewareAuth } from '@main/factories/middlewares/auth-middleware-factory'

export default (router: Router): void => {
  router.get('/card', adaptMiddlewareAuth, adaptRoute(makeGetCardsController()))
  router.post('/card', adaptMiddlewareAuth, adaptRoute(makeAddCardController()))
}

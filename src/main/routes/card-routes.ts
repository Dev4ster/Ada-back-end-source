import { Router } from 'express'
import { EnvAuthentication } from '../../data/usecases/authentication/env-authentication'
import { JwtAdapter } from '../../infra/cryptography/jwt-adapter'
import { LoginController } from '../../presentation/controllers/login/login'
import { AuthMiddleware } from '../../presentation/middlewares/auth-middleware'
import { Controller } from '../../presentation/protocols'
import { Middleware } from '../../presentation/protocols/middleware'
import { adaptMiddleware } from '../adapters/express-middleware-adapter'
import { adaptRoute } from '../adapters/express-route-adapter'

const makeLoginController = (): Controller => {
  const jwt = new JwtAdapter('teste')
  const envAuth = new EnvAuthentication(jwt)
  return new LoginController(envAuth)
}

const makeAuthMiddleware = (): Middleware => {
  const jwt = new JwtAdapter('teste')
  return new AuthMiddleware(jwt)
}

const adaptMiddlewareAuth = adaptMiddleware(makeAuthMiddleware())

export default (router: Router): void => {
  router.get('/card', adaptMiddlewareAuth, adaptRoute(makeLoginController()))
}

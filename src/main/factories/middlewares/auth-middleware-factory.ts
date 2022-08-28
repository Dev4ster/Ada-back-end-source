import { JwtAdapter } from '@infra/cryptography/jwt-adapter'
import { adaptMiddleware } from '@main/adapters/express-middleware-adapter'
import { AuthMiddleware } from '@presentation/middlewares/auth-middleware'
import { Middleware } from '@presentation/protocols'

const makeAuthMiddleware = (): Middleware => {
  const jwt = new JwtAdapter('teste')
  return new AuthMiddleware(jwt)
}

export const adaptMiddlewareAuth = adaptMiddleware(makeAuthMiddleware())

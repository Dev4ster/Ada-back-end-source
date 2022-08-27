import { Router } from 'express'
import { EnvAuthentication } from '../../data/usecases/authentication/env-authentication'
import { JwtAdapter } from '../../infra/cryptography/jwt-adapter'
import { LoginController } from '../../presentation/controllers/login/login'
import { Controller } from '../../presentation/protocols'
import { adaptRoute } from '../adapters/express-route-adapter'

const makeLoginController = (): Controller => {
  const jwt = new JwtAdapter('teste')
  const envAuth = new EnvAuthentication(jwt)
  return new LoginController(envAuth)
}

export default (router: Router): void => {
  router.post('/login', adaptRoute(makeLoginController()))
}

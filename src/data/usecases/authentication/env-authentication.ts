import {
  Authentication,
  AuthenticationParams
} from '@domain/usecases/authentication'
import env from '@main/config/env'
import { UnauthorizedError } from '@presentation/errors'
import { Encrypter } from '@data/protocols'

export class EnvAuthentication implements Authentication {
  constructor(private readonly generateToken: Encrypter) {}
  async auth({ login, password }: AuthenticationParams) {
    if (login === env.login && password === env.password) {
      const token = await this.generateToken.encrypt(login)
      return token
    } else {
      return new UnauthorizedError()
    }
  }
}

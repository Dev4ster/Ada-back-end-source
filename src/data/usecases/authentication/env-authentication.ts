import {
  Authentication,
  AuthenticationParams
} from '../../../domain/usecases/authentication'
import env from '../../../main/config/env'
import { UnauthorizedError } from '../../../presentation/errors'
import { Encrypter } from '../../protocols/cryptography/encrypter'

export class EnvAuthentication implements Authentication {
  constructor(private readonly generateToken: Encrypter) {}
  async auth({ login, password }: AuthenticationParams) {
    if (login === env.login && password === env.password) {
      const token = await this.generateToken.encrypt('123')
      return token
    } else {
      return new UnauthorizedError()
    }
  }
}

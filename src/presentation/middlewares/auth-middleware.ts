import { Decrypter } from '../../data/protocols/cryptography/dencrypter'
import { AccessDeniedError } from '../errors/access-denied-error'
import { forbidden, ok, serverError } from '../helpers/http/http-helper'
import { HttpRequest, HttpResponse } from '../protocols'
import { Middleware } from '../protocols/middleware'

export class AuthMiddleware implements Middleware {
  constructor(private readonly decryptToken: Decrypter) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const header = httpRequest?.headers?.['authorization']
      if (header) {
        const [, token] = header.split(' ')
        if (token) {
          const auth = await this.decryptToken.decrypt(token)
          if (auth) {
            return ok(auth)
          }
        }
      }

      return forbidden(new AccessDeniedError())
    } catch (error) {
      return serverError(error as Error)
    }
  }
}

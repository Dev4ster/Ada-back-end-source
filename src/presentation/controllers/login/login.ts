import { Authentication } from '../../../domain/usecases/authentication'
import { MissingParamError, UnauthorizedError } from '../../errors'
import { badRequest, ok, serverError, unauthorized } from '../../helpers'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export class LoginController implements Controller {
  constructor(private readonly authentication: Authentication) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { login, password } = httpRequest.body
    if (!login) {
      return new Promise((resolve) =>
        resolve(badRequest(new MissingParamError('login')))
      )
    }
    if (!password) {
      return new Promise((resolve) =>
        resolve(badRequest(new MissingParamError('password')))
      )
    }

    try {
      const token = await this.authentication.auth({
        password,
        login
      })
      if (token instanceof UnauthorizedError) {
        return unauthorized()
      }

      return new Promise((resolve) => resolve(ok({ accessToken: token })))
    } catch {
      return serverError(new Error())
    }
  }
}

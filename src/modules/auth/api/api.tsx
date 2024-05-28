import * as API from 'constants/api'

import { Options, postRequest } from 'api/base-api'

interface DataResponse {
  readonly id: number
  readonly name: string
  readonly email: string
  readonly key: string
  readonly secret: string
}
export interface SignInResponse {
  readonly data: DataResponse
  readonly message: string
  readonly isOk: boolean
}

export const signUpApi = (options?: Options) => {
  return postRequest<SignInResponse>(API.SignUp, options)
}

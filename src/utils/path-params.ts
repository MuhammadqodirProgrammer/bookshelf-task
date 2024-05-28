import { curry } from 'ramda'

export const createPathWithParams = curry((url, params) => {
  try {
    return url.replace(/:([^]+)/g, (_: any, key: any) => params[key])
  } catch (error: any) {
    return new Error(`Params error: ${error.message}`)
  }
})

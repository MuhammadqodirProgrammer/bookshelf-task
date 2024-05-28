import { deleteRequest, getRequest, Options, patchRequest, postRequest } from '../../../api/base-api'
import * as API from '../../../constants/api'

export const createBook = (options?: Options) => {
  return postRequest<any>(API.CreateBook, options)
}
export const deleteBook = (options?: Options) => {
  return deleteRequest<any>(API.DeleteBook, options)
}
export const updateBook = (options?: Options) => {
  return patchRequest<any>(API.UpdateBook, options)
}

export const getListBook = (options?: Options) => {
  return getRequest<any>(API.GetAllBooks, options)
}

export const getUserDetail = (options?: Options) => {
  return getRequest<any>(API.GetUser, options)
}

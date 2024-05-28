import qs from 'qs'
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

import { createPathWithParams } from '../utils/path-params'

const md5 = require('md5')

export interface Options extends AxiosRequestConfig {
  readonly query?: object
  readonly params?: object
}

const queryToString = (query: object = {}): string => {
  return qs.stringify(query)
}

const createRequestOptions = (url: string, options: AxiosRequestConfig): AxiosRequestConfig => {
  const { headers, method, data } = options
  const token = localStorage.getItem('book-token')
  const dataSerialize = data ? JSON.stringify(data) : ''
  if (token) {
    const keys = JSON.parse(token || '')

    options.headers = {
      ...headers,
      Key: keys.key,
      Sign: md5(method?.toUpperCase() + url + dataSerialize + keys.secret)
    }
  }
  return {
    baseURL: 'https://no23.lavina.tech',
    ...options
  }
}

const createRequestUrl = (url: string, query: object = {}, params: object = {}): string => {
  const formattedUrl = createPathWithParams(url, params)

  return [formattedUrl, queryToString(query)].filter(Boolean).join('/')
}

export const request = <T>(url: string, options: Options = {}) => {
  return new Promise<T>((resolve, reject) => {
    const { query, params, ...rest } = options

    const formattedUrl = createRequestUrl(url, query, params)
    const formattedOptions = createRequestOptions(formattedUrl, rest)
    return axios
      .request({ url: formattedUrl, ...formattedOptions })
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          return response.data || {}
        }

        return {
          response
        }
      })
      .then((data) => {
        if (data.status === 204) {
          return resolve({} as T)
        }

        return resolve(data)
      })
      .catch((error: AxiosError) => {
        reject(error.response)
        if (error?.response?.status === 401) {
          const bookToken = localStorage.getItem('book-token')
          if (bookToken) {
            localStorage.setItem('book-token', '')
            location.reload()
          }
        }
      })
  })
}

export const getRequest = <T>(url: string, options: Options = {}) => {
  return request<T>(url, { ...options, method: 'get' })
}

export const postRequest = <T>(url: string, options: Options = {}) => {
  return request<T>(url, { ...options, method: 'post' })
}

export const putRequest = <T>(url: string, options: Options = {}) => {
  return request<T>(url, { ...options, method: 'put' })
}

export const deleteRequest = <T>(url: string, options: Options = {}) => {
  return request<T>(url, { ...options, method: 'delete' })
}

export const patchRequest = <T>(url: string, options: Options = {}) => {
  return request<T>(url, { ...options, method: 'patch' })
}

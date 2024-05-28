import { useCallback, useRef, useState } from 'react'
import { pathOr, prop, propOr } from 'ramda'

import { DataItem, GetListResponse } from '../api/base-DTO'
import { Options } from '../api/base-api'
import useAllSearchParams from '../utils/useAllSearchParams'
import { ALTER_ERROR, useSnackbar } from '../context/snackbar'

export const DEFAULT_PAGE_SIZE = 10
export const DEFAULT_PAGE_NUMBER = 0

export const useGetList = <T>(api: (options?: Options) => Promise<GetListResponse<T>>, listOptions?: Options) => {
  const searchParams = useAllSearchParams()
  const snackbar = useSnackbar()
  const [result, setResult] = useState({} as GetListResponse<T>)
  const [list, setList] = useState([] as DataItem[])
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState({}) as any
  const abortControllerRef = useRef(new AbortController())
  const getList = useCallback(
    (options?: Options) => {
      abortControllerRef.current.abort()
      abortControllerRef.current = new AbortController()
      const limit = prop('limit', searchParams) || DEFAULT_PAGE_SIZE
      const start = prop('start', searchParams) || DEFAULT_PAGE_NUMBER
      const defaultGetQuery = {
        query: {
          start: Number(start),
          limit: Number(limit),
          ...listOptions?.query,
          ...options?.query
        }
      }
      setLoading(true)
      return api({ ...listOptions, ...options, signal: abortControllerRef.current.signal })
        .then((response) => {
          setResult(response)
          setQuery(defaultGetQuery.query)
          const list = prop('data', response)
          if (list) {
            setList(response.data)
          } else {
            setList([])
          }
          setLoading(false)
          return response
        })
        .catch((error) => {
          setList([])
          setLoading(false)
          if (error) {
            const dataError = pathOr('Oops, Something went wrong', ['data', 'message'], error)
            const userMsg =
            typeof dataError === 'object' ? propOr('Oops, Something went wrong', 'user_msg', dataError) : dataError

            snackbar({ message: userMsg, type: ALTER_ERROR })
          }
          throw error
        })
    },
    [api, searchParams]
  )

  return { getList, result, loading, list, query }
}

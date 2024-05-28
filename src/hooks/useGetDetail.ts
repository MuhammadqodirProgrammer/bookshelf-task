import { useCallback, useEffect, useState } from 'react'
import { pathOr, propOr } from 'ramda'

import { UserDetailResponse } from '../api/base-DTO'
import { Options } from '../api/base-api'
import useAllSearchParams from '../utils/useAllSearchParams'
import { ALTER_ERROR, useSnackbar } from '../context/snackbar'

export const useGetDetail = <T>(api: (options?: Options) => Promise<UserDetailResponse<T>>, options?: Options) => {
  const searchParams = useAllSearchParams()
  const snackbar = useSnackbar()
  const [result, setResult] = useState({} as UserDetailResponse<T>)
  const [loading, setLoading] = useState(true)

  const getDetail = useCallback(
    (callOptions?: Options) => {
      setLoading(true)
      return api({ ...options, ...callOptions })
        .then((response) => {
          setResult(response)
          setLoading(false)
        })
        .catch((error) => {
          setLoading(false)
          const dataError = pathOr('Oops, Something went wrong', ['data', 'error'], error)
          const userMsg =
            typeof dataError === 'object' ? propOr('Oops, Something went wrong', 'user_msg', dataError) : dataError

          snackbar({ message: userMsg, type: ALTER_ERROR })
          throw error
        })
    },
    [api, searchParams]
  )

  useEffect(() => {
    getDetail(options)
  }, [])

  return { getDetail, result, loading }
}

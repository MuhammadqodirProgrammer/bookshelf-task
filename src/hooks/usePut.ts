import { useCallback, useState } from 'react'
import { pathOr } from 'ramda'

import { Options } from '../api/base-api'
import { useSnackbar, ALTER_ERROR } from '../context/snackbar'

export const usePut = (api: (options?: Options) => Promise<any>, options?: Options) => {
  const [loading, setLoading] = useState(false)
  const snackbar = useSnackbar()

  const putData = useCallback(
    (postOptions?: Options) => {
      setLoading(true)
      return api({ ...options, ...postOptions })
        .then((response) => {
          setLoading(false)
          return response
        })
        .catch((error) => {
          const userMsg = pathOr('Oops, Something went wrong', ['data', 'error', 'user_msg'], error)
          snackbar({ message: userMsg, type: ALTER_ERROR })
          setLoading(false)
          throw error
        })
    },
    [api]
  )

  return { putData, loading }
}

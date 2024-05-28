import { useCallback, useState } from 'react'
import { pathOr, propOr } from 'ramda'

import { Options } from '../api/base-api'
import { useSnackbar, ALTER_ERROR } from '../context/snackbar'

export const usePost = (api: (options?: Options) => Promise<any>, options?: Options) => {
  const [loading, setLoading] = useState(false)
  const snackbar = useSnackbar()

  const postData = useCallback(
    (postOptions?: Options) => {
      setLoading(true)
      return api({ ...options, ...postOptions })
        .then((response) => {
          setLoading(false)
          return response
        })
        .catch((error) => {
          console.log(error)
          const dataError = pathOr('Oops, Something went wrong', ['data', 'message'], error)
          const userMsg =
            typeof dataError === 'object' ? propOr('Oops, Something went wrong', 'user_msg', dataError) : dataError

          snackbar({ message: userMsg, type: ALTER_ERROR })
          setLoading(false)
          throw error
        })
    },
    [api]
  )

  return { postData, loading }
}

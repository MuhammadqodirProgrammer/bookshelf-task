import { useCallback, useState } from 'react'
import { pathOr, propOr } from 'ramda'

import { Options } from '../api/base-api'
import { ALTER_ERROR, useSnackbar } from '../context/snackbar'

export const useDelete = (api: (options?: Options) => Promise<any>, options?: Options) => {
  const [loading, setLoading] = useState(false)
  const snackbar = useSnackbar()

  const deleteData = useCallback(
    (deleteOptions?: Options) => {
      setLoading(true)
      return api({ ...options, ...deleteOptions })
        .then((response) => {
          setLoading(false)
          return response
        })
        .catch((error) => {
          const dataError = pathOr('Oops, Something went wrong', ['data', 'error'], error)
          const userMsg =
            typeof dataError === 'object' ? propOr('Oops, Something went wrong', 'user_msg', dataError) : dataError

          snackbar({ message: userMsg, type: ALTER_ERROR })
          setLoading(false)
          throw error
        })
    },
    [api]
  )

  return { deleteData, loading }
}

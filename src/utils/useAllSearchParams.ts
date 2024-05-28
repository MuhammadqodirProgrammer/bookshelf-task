import useSearchParams from './useSearchParams'

function useAllSearchParams () {
  const searchParams = useSearchParams()
  const params = {} as any

  for (const pair of searchParams.entries() as any) {
    params[pair[0]] = pair[1]
  }

  return params
}

export default useAllSearchParams

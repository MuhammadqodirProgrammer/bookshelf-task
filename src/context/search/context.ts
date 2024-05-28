import { createContext, Dispatch, SetStateAction, useContext } from 'react'

interface SearchContextValue {
  searchValue: { title: string }
  setSearchValue: Dispatch<SetStateAction<{ title: string }>>
}

export const SearchContext = createContext<SearchContextValue | null>(null)

export const useSearchContext = () => {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

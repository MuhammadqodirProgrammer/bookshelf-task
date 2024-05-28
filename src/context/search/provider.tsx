import React, { ReactNode, useState } from 'react'

import { SearchContext } from './context'
interface ProviderProps {
  children: ReactNode
}

const Provider: React.FC<ProviderProps> = ({ children }) => {
  const [searchValue, setSearchValue] = useState({ title: '' })

  return <SearchContext.Provider value={{ searchValue, setSearchValue }}>{children}</SearchContext.Provider>
}

export default Provider

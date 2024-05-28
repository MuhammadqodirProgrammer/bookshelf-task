import { createContext, useContext } from 'react'

interface ThemeContextProps {
  toggleColorMode: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  toggleColorMode: () => {}
})

export const useThemeContext = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

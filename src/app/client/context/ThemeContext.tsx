'use client'
import { ReactNode, createContext, useEffect, useState } from "react";
type Context = {
  theme: string,
  toggleTheme: () => void
}
export const ThemeContext = createContext<Context>({} as Context);

const getThemeLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const value = window.localStorage.getItem('theme')
    return value || 'light'
  }
  return 'light'
}

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState(() => {
    return getThemeLocalStorage()
  })
  const toggleTheme = () => { setTheme(theme => theme === 'light' ? 'dark' : 'light') }

  useEffect(() => {
    window.localStorage.setItem('theme', theme)    
  },[theme])

  return <ThemeContext.Provider value={{
    theme,
    toggleTheme
  }}>{children}</ThemeContext.Provider>
}
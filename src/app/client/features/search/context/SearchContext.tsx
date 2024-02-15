'use client'
import { createContext, useState } from "react"

export type SearchRecentItem = {
  id: string,
  value: string
}

type Context = {
  recents: SearchRecentItem[]
  setRecents: React.Dispatch<React.SetStateAction<SearchRecentItem[]>>
}

export const SEARCH_ITEMS_LOCAL_STORAGE = '__jhomublog_search_recents__'

const getRecentsFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const value = window.localStorage.getItem(SEARCH_ITEMS_LOCAL_STORAGE)
    const valueParsed: SearchRecentItem[] = value && JSON.parse(value)
    return valueParsed || [] as SearchRecentItem[]
  }
  return [] as SearchRecentItem[]
}

export const SearchContext = createContext<Context>({} as Context)

function SearchContextProvider({ children }: { children: React.ReactNode }) {
  const [recents, setRecents] = useState(() => {
    return getRecentsFromLocalStorage()
  })

  return (
    <SearchContext.Provider value={{
      recents,
      setRecents
    }}>
      {children}
    </SearchContext.Provider>
  )
}
export default SearchContextProvider
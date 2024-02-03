'use client'

import { useEffect, useState } from "react"
import SearchContextProvider from "../context/SearchContext"

function SearchProvider({children}: {children: React.ReactNode}) {
  const [mounted, setMounted] = useState(false)
  

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted && (
    <SearchContextProvider>
      {children}
    </SearchContextProvider>
  )
}
export default SearchProvider
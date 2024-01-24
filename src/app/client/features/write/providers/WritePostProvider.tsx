'use client'

import { useEffect, useState } from "react"
import { WritePostContextProvider } from "../context/WritePostContext"

function WritePostProvider({children}: {children: React.ReactNode}) {
  const [mounted, setMounted] = useState(false)
  

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted && (
    <WritePostContextProvider>
      {children}
    </WritePostContextProvider>
  )
  
}
export default WritePostProvider
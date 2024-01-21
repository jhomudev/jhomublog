'use client'

import { NextUIProvider } from "@nextui-org/system"
import { ThemeContext } from "../context/ThemeContext"
import { useContext, useEffect, useState } from "react"

function ThemeProvider({children}: {children: React.ReactNode}) {
  const { theme } = useContext(ThemeContext)
  const [mounted, setMounted] = useState(false)
  

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted && (
    <NextUIProvider>
      <div className={theme}>{children}</div>
    </NextUIProvider>
  )
  
}
export default ThemeProvider
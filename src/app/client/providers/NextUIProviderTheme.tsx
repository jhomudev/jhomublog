'use client'

import { NextUIProvider  } from "@nextui-org/system"
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { useEffect, useState } from "react"

function NextUIProviderTheme({children}: {children: React.ReactNode}) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted && (
    <NextUIProvider>
      <NextThemesProvider
        attribute="class"
        defaultTheme = 'light'
        storageKey="__jhomublog_theme__"
        themes={["light", "dark"]}
      >
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  )
  
}
export default NextUIProviderTheme
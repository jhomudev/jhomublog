'use client'

import { NextUIProvider  } from "@nextui-org/system"
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

function NextUIProviderTheme({children}: {children: React.ReactNode}) {
  const [mounted, setMounted] = useState(false)
  const { push } = useRouter()
  
  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted && (
    <NextUIProvider navigate={push}>
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
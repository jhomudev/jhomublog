'use client'

import SearchPage from "@/app/(pages)/search/page"
import { usePathname, useSearchParams } from "next/navigation"

type Props = {
  children: React.ReactNode
}

function SearchPageContent({ children }: Props) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const search = searchParams.get("q")

  const isOnSearchMainPage = pathname.endsWith("/search")

  return (
    <main className="mt-4 py-3">
      {
        (!isOnSearchMainPage && search) ? children : <SearchPage />
      }
    </main>
  )
}
export default SearchPageContent
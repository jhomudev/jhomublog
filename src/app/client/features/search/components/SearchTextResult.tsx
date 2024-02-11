'use client'

import { usePathname, useSearchParams } from "next/navigation"
import TabsSearch from "./TabsSearch"

function SearchTextResult() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const search = searchParams.get("q")

  const isOnSearchMainPage = pathname.endsWith("/search")

  return (
    <div className="mt-7 mb-5">
      {
        (!isOnSearchMainPage && search) ? (
          <h1 className="text-2xl md:text-5xl text-text_color_soft dark:text-text_color_soft_dark">Results for <span className="text-main_color font-bold">{search}</span></h1>
        ) : (
          <h1 className="text-2xl md:text-5xl text-text_color_soft dark:text-text_color_soft_dark">Recent searches</h1>
        )
      }
      {
        (!isOnSearchMainPage && search) && <TabsSearch />
      }
    </div>
  )
}
export default SearchTextResult
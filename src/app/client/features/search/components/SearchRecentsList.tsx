'use client'

import Link from "next/link"
import useSearchRecents from "../hooks/useSearchRecents"
import { Cross1Icon } from "@radix-ui/react-icons"

function SearchRecentsList() {
  const { recents, removeRecentItem } = useSearchRecents()
  const hasRecents = recents.length > 0

  const handleDeleteItem = (id: string) => { 
    removeRecentItem(id)
  }

  return (
    <div>
      {
        hasRecents ? (
          <ul className="flex flex-col divide-y-2 divide-bg_soft dark:divide-bg_soft_dark">
            {
              recents.map((item) => (
                <li key={item.id} className="flex gap-2 items-center justify-between py-3">
                  <Link href={`/search/posts?q=${item.value}`}>{item.value}</Link>
                  <button onClick={() => handleDeleteItem(item.id)}><Cross1Icon width={20} height={20} /></button>
                </li>
              ))
            }
          </ul>
        ) : <p className="text-text_color_soft dark:text-text_color_soft_dark">No recent searches</p>
      }
    </div>
  )
}
export default SearchRecentsList
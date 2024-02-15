'use client'
import Link from "next/link"
import useTags from "../hooks/useTags"
import TagsListSkeleton from "./TagsListSkeleton"

function TagsList() {
  const { response: {isLoading}, tags } = useTags()
  
  if (isLoading) return <TagsListSkeleton />

  return (
    <>
      <div className="flex flex-wrap gap-6">
        {
          tags?.map((tag) => (
            <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`} className="px-2 py-1 text-sm truncate bg-bg_soft dark:bg-bg_soft_dark rounded-md">#{ tag }</Link>
          ))
        }
      </div>
    </>
  )
}
export default TagsList
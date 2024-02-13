'use client'

import { useSearchParams } from "next/navigation"
import CategoryCardTop from "../features/categories/components/CategoryCardTop"
import PostsListGrid from "../features/posts/components/PostsListGrid"
import Menu from "./Menu"

function BlogPageContent() {
  const searchParams = useSearchParams()
  const cat = searchParams.get('cat')
  const tag = searchParams.get('tag')

  const isPerTag = !cat && tag

  return (
    <div>
      {
        isPerTag ? (
          <header className="w-full h-20 flex justify-center items-center gap-1">
            <p className="text-center text-text_color_soft  dark:text-text_color_soft_dark">
              Results found per Tag &nbsp;
              <strong className="text-main_color font-bold text-xl">{`"${tag}"`}</strong>
            </p>
          </header>
        ) : <CategoryCardTop />
      }
      <div className="flex flex-col lg:flex-row gap-16">
        <main className="flex-grow-[5] overflow-hidden">
          <h2 className="mt-3 mb-5 text-2xl font-semibold">Recent posts</h2>
          <PostsListGrid />
        </main>
        <Menu />
      </div>
    </div>
  )
}
export default BlogPageContent
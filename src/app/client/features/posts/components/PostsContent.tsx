'use client'
import { getURLWithParams } from "@client/utils"
import { Pagination } from "@nextui-org/pagination"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import usePosts from "../hooks/usePosts"
import PostsList from "./PostsList"
import PostsListGrid from "./PostsListGrid"

type Props = {
  view?: 'list' | 'grid'
  spToInclude?: {[key: string]: string},
  hidePagination?: boolean
}

function PostsContent({ view = 'list', spToInclude, hidePagination = false }: Props) {
  const { replace } = useRouter()
  const searchParams = useSearchParams()
  const sp = new URLSearchParams(searchParams)

  // Adding spToInclude to searchParams if exists
  if (spToInclude) {
    for (const key in spToInclude) {
      if (spToInclude.hasOwnProperty(key)) {
        sp.set(key, spToInclude[key]);
      }
    }
  }

  const pathname = usePathname()
  const { posts, response: { isLoading, data } } = usePosts({ searchParams: sp.toString() })

  const totalPages = data?.meta ? Math.ceil(data.meta.rowsObtained / data.meta.rowsPerPage) : 1

  const handleChangePage = (page: number) => { 
    const url = getURLWithParams({
      pathname, searchParams, newParams: {page},
      paramsDelete: page === 1 ? ['page'] : []
    })
    replace(url)
  }
  
  return (
    <>
      <div>
        {
          view === 'list' ? <PostsList posts={posts} isLoading={isLoading} /> : <PostsListGrid posts={posts} isLoading={isLoading} />
        }
      </div>
      {
        data?.meta &&
          (data.meta.rowsPerPage < data.meta.rowsObtained && !hidePagination) && (
            <div className="ml-0 md:ml-auto my-10 flex justify-end">
              <Pagination
                showControls
                total={ totalPages }
                page={data?.meta?.page || 1}
                onChange={handleChangePage}
                classNames={{
                  wrapper: "gap-0 overflow-visible h-8",
                  item: "w-8 h-8 text-small rounded-none bg-transparent",
                  cursor: "dark:bg-bg_main bg-bg_main_dark font-bold dark:text-text_color text-text_color_dark",
                  next: "bg-transparent hover:bg-bg_soft dark:hover:bg-bg_soft_dark",
                  prev: "bg-transparent hover:bg-bg_soft dark:hover:bg-bg_soft_dark"
                }}
                />
            </div>
          )
      }
    </>
  )
}
export default PostsContent
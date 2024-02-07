'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import usePosts from "../hooks/usePosts"
import { getURLWithParams } from "@/app/client/utils"
import PostsListGridSkeleton from "./PostsListGridSkeleton"
import PostCardSquare from "./PostCardSquare"
import { Pagination } from "@nextui-org/pagination"
import NoData from "@/app/client/components/molecules/NoData"

function PostsListGrid() {
  const {replace} = useRouter()
  const pathname = usePathname()
  const searchParams  = useSearchParams()
  const { posts, response: { isLoading, data } } = usePosts({ searchParams: searchParams.toString() })
  
  const hasPosts = posts.length > 0

  const handleChangePage = (page: number) => { 
    const url = getURLWithParams({
      pathname, searchParams, newParams: {page},
      paramsDelete: page === 1 ? ['page'] : []
    })
    replace(url)
  }
  
  if (isLoading) return <PostsListGridSkeleton/>

  if (!hasPosts) return <NoData title="No results" message={`No results found for your search`} />
  
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {
          posts.map(post => (
            <PostCardSquare key={post.id} post={post} />
          ))
        }
      </div>
      {
        posts.length > 10 && (
          <div className="ml-0 md:ml-auto my-10 flex justify-end">
            <Pagination
              showControls
              total={ data?.meta ? Math.ceil(data.meta.rowsObtained / data.meta.rowsPerPage) : 0}
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
export default PostsListGrid
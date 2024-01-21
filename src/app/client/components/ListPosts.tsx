'use client'
import { Pagination } from "@nextui-org/pagination"
import usePost from "../hooks/usePost"
import CardPost from "./CardPost"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { getURLWithParams } from "../libs/utils"
import LisPostsSkeleton from "./LisPostsSkeleton"

function ListPosts() {
  const { replace } = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { requestPosts: { posts, data, isLoading } } = usePost({searchParamsStr: searchParams.toString()})
  const hasPosts = posts.length > 0

  const handleChangePage = (page: number) => { 
    const url = getURLWithParams({
      pathname, searchParams, newParams: {page},
      paramsDelete: page === 1 ? ['page'] : []
    })
    replace(url)
  }
  
  if (isLoading) return <LisPostsSkeleton />

  if (!hasPosts) return <p className="text-text_color_soft dark:text-text_color_soft_dark">No posts</p>

  return (
    <>
      <div className="flex flex-col gap-10">
        {
          posts.map((post) => (
            <CardPost key={post.id} post={post} />
          ))
        }
      </div>
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
    </>
  )
}
export default ListPosts
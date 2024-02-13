'use client'
import NoData from "@/app/client/components/molecules/NoData"
import { getURLWithParams } from "@/app/client/utils"
import { Pagination } from "@nextui-org/pagination"
import { useSearchParams, usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import PostCard from "../../posts/components/PostCard"
import PostsListSkeleton from "../../posts/components/PostsListSkeleton"
import usePosts from "../../posts/hooks/usePosts"

function SearchPostsList() {
  const { replace } = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { posts, response: { isLoading, data } } = usePosts({ searchParams: searchParams.toString() })

  const hasPosts = posts.length > 0

  const handleChangePage = (page: number) => { 
    const url = getURLWithParams({
      pathname, searchParams, newParams: {page},
      paramsDelete: page === 1 ? ['page'] : []
    })
    replace(url)
  }
  
  if (isLoading) return <PostsListSkeleton />

  if (!hasPosts) return <NoData hideAction title="No posts" message="No posts found in your search" />

  return (
    <>
      <div className="flex flex-col gap-10">
        {
          posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))
        }
      </div>
      {
        posts.length >= 10 && (
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
export default SearchPostsList
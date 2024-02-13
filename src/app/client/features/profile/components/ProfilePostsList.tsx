'use client'
import { getURLWithParams } from "@client/utils"
import { Pagination } from "@nextui-org/pagination"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import usePosts from "../../posts/hooks/usePosts"
import StorieCardPost from "./ProfilePostCard"
import ProfilePostsListSkeleton from "./ProfilePostsListSkeleton"
import NoData from "@/app/client/components/molecules/NoData"

type Props = {
  username: string
}

function ProfilePostsList({username}: Props) {
  const { replace } = useRouter()
  const searchParams = useSearchParams()
  const sp = new URLSearchParams(searchParams.toString())
  sp.set('user', username)
  const pathname = usePathname()
  
  const { response:{ isLoading, data }, posts } = usePosts({ searchParams: sp.toString() })
  
  const hasPosts = posts.length > 0

  const totalPages = data?.meta ? Math.ceil(data.meta.rowsObtained / data.meta.rowsPerPage) : 0

  const handleChangePage = (page: number) => { 
    const url = getURLWithParams({
      pathname, searchParams, newParams: {page},
      paramsDelete: page === 1 ? ['page'] : []
    })
    replace(url)
  }
  
  if (isLoading) return <ProfilePostsListSkeleton />

  if (!hasPosts) return <NoData hideAction title="No posts" message="This user hasn't published a post yet" />

  return (
    <>
      <div className="flex flex-col gap-4">
        {
          posts.map((post) => (
            <StorieCardPost key={post.id} post={post}  />
          ))
        }
      </div>
      {
        totalPages >= 10 && (
          <div className="ml-0 md:ml-auto my-10 flex justify-end">
            <Pagination
              showControls
              total={totalPages}
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
export default ProfilePostsList
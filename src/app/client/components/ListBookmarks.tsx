'use client'
import { Pagination } from "@nextui-org/pagination"
import usePost from "../hooks/usePost"
import CardPost from "./CardPost"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { getURLWithParams } from "../libs/utils"
import LisPostsSkeleton from "./LisPostsSkeleton"
import CardPostBookmark from "./CardPostBookmark"
import useBookmark from "../hooks/useBookmark"
import { useSession } from "next-auth/react"

function ListBookmarks() {
  const { replace } = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const  {data: session} = useSession()
  const { requestBookmarks: { bookmarks, data, isLoading } } = useBookmark({searchParamsStr: searchParams.toString() +`&user=${session?.user?.email}`})
  const hasBookmarks = bookmarks.length > 0

  const totalPages = data?.meta ? Math.ceil(data.meta.rowsObtained / data.meta.rowsPerPage) : 0

  const handleChangePage = (page: number) => { 
    const url = getURLWithParams({
      pathname, searchParams, newParams: {page},
      paramsDelete: page === 1 ? ['page'] : []
    })
    replace(url)
  }
  
  if (isLoading) return <LisPostsSkeleton />

  if (!hasBookmarks) return <p className="text-text_color_soft dark:text-text_color_soft_dark">No bookmarks</p>

  return (
    <>
      <div className="flex flex-col divide-y-1">
        {
          bookmarks.map((bookmark) => (
            <CardPostBookmark key={bookmark.id} bookmark={bookmark} />
          ))
        }
      </div>
      {
        totalPages > 10 && (
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
export default ListBookmarks
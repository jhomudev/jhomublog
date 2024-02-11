'use client'
import { getURLWithParams } from "@client/utils"
import { Pagination } from "@nextui-org/pagination"
import { useSession } from "next-auth/react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import useBookmarks from "../hooks/useBookmarks"
import BookmarkCardPost from "./BookmarkCardPost"
import BookmarksListSkeleton from "./BookmarksListSkeleton"
import NoData from "@/app/client/components/molecules/NoData"
import { Button } from "@/app/client/components/ui/button"
import Link from "next/link"

function BookmarksList() {
  const { replace } = useRouter()
  const { data: session } = useSession()
  const searchParams = useSearchParams()
  const sp = new URLSearchParams(searchParams)
  sp.set('user', session?.user.username || '')
  const pathname = usePathname()
  
  const { response:{isLoading, data, mutate}, bookmarks } = useBookmarks({ searchParamsStr: sp.toString() })
  
  const hasBookmarks = bookmarks.length > 0

  const totalPages = data?.meta ? Math.ceil(data.meta.rowsObtained / data.meta.rowsPerPage) : 0

  const handleChangePage = (page: number) => { 
    const url = getURLWithParams({
      pathname, searchParams, newParams: {page},
      paramsDelete: page === 1 ? ['page'] : []
    })
    replace(url)
  }
  
  if (isLoading) return <BookmarksListSkeleton />

  if (!hasBookmarks) return (
    <NoData
      title="No bookmarks"
      message="Start by seeing interesting posts"
      actionNode={(
        <div className="mt-3">
          <Button variant={'primary'} asChild ><Link href="/blog?views=desc">Go to blog</Link></Button>
        </div>
      )}
    />)

  return (
    <>
      <div className="flex flex-col divide-y-2 divide-bg_soft dark:divide-bg_soft_dark">
        {
          bookmarks.map((bookmark) => (
            <BookmarkCardPost key={bookmark.id} bookmark={bookmark} updateBookmarks={mutate} />
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
export default BookmarksList
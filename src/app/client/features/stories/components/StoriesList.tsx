'use client'
import { getURLWithParams } from "@client/utils"
import { Pagination } from "@nextui-org/pagination"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import useStories from "../hooks/useStories"
import StorieCardPost from "./StorieCardPost"
import StoriesListSkeleton from "./StoriesListSkeleton"
import Link from "next/link"
import { Button } from "@/app/client/components/ui/button"
import NoData from "@/app/client/components/molecules/NoData"

function StoriesList() {
  const { replace } = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  
  const { response:{ isLoading, data, mutate }, stories } = useStories({ searchParams: searchParams.toString() })
  
  const hasStories = stories.length > 0

  const totalPages = data?.meta ? Math.ceil(data.meta.rowsObtained / data.meta.rowsPerPage) : 0

  const handleChangePage = (page: number) => { 
    const url = getURLWithParams({
      pathname, searchParams, newParams: {page},
      paramsDelete: page === 1 ? ['page'] : []
    })
    replace(url)
  }
  
  if (isLoading) return <StoriesListSkeleton />

  if (!hasStories) return (
    <NoData
      title="No stories"
      message="You do not have any stories"
      actionNode={(
        <div className="mt-3">
          <Button variant={'primary'} asChild ><Link href="/write">Write a new story</Link></Button>
        </div>
      )}
    />
  )

  return (
    <>
      <div className="flex flex-col divide-y-2 divide-bg_soft dark:divide-bg_soft_dark">
        {
          stories.map((storie) => (
            <StorieCardPost key={storie.id} storie={storie} updateStories={mutate} />
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
export default StoriesList
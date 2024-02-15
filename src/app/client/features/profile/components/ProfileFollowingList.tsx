'use client'
import UserCardFollow from "@client/components/UserCardFollow"
import NoData from "@client/components/molecules/NoData"
import { getURLWithParams } from "@client/utils"
import { Pagination } from "@nextui-org/pagination"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import SearchPeopleListSkeleton from "../../search/components/SearchPeopleListSkeleton"
import useFollowing from "../hooks/useFollowing"
import { User } from "../types"

type Props = {
  user: User
}
function ProfileFollowingList({user}: Props) {
  const { replace } = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { following, response: { isLoading, data, mutate } } = useFollowing({user})

  const hasFollowing = following.length > 0

  const handleChangePage = (page: number) => { 
    const url = getURLWithParams({
      pathname, searchParams, newParams: {page},
      paramsDelete: page === 1 ? ['page'] : []
    })
    replace(url)
  }
  
  if (isLoading) return <SearchPeopleListSkeleton />

  if (!hasFollowing) return <NoData hideAction title="No Following" message="This user doesn't follow anyone yet" />

  return (
    <>
      <div className="flex flex-col gap-10">
        {following.map((follow) => (
          <UserCardFollow
            key={user.id}
            user={follow.user}
          />
          ))
        }
      </div>
      {
        following.length >= 10 && (
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
export default ProfileFollowingList
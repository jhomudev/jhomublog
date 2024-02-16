'use client'
import UserCardFollow from "@/app/client/components/UserCardFollow"
import NoData from "@/app/client/components/molecules/NoData"
import { getURLWithParams } from "@/app/client/utils"
import { Pagination } from "@nextui-org/pagination"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import SearchPeopleListSkeleton from "../../search/components/SearchPeopleListSkeleton"
import useFollowers from "../hooks/useFollowers"
import { User } from "../types"

type Props = {
  user: User
}
function ProfileFollowersList({user}: Props) {
  const { replace } = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { followers, response: { isLoading, data } } = useFollowers({ user })
  
  if (isLoading) return <SearchPeopleListSkeleton />

  if (!(data && data.meta)) return
  
  const totalPages = Math.ceil(data.meta.rowsObtained / data.meta.rowsPerPage)
  const hasFollowers = followers.length > 0

  const handleChangePage = (page: number) => { 
    const url = getURLWithParams({
      pathname, searchParams, newParams: {page},
      paramsDelete: page === 1 ? ['page'] : []
    })
    replace(url)
  }

  if (!hasFollowers) return <NoData hideAction title="No Followers" message="This user has no followers yet" />

  return (
    <>
      <div className="flex flex-col gap-10">
        {followers.map((follow) => (
          <UserCardFollow
            key={user.id}
            user={follow.user}
          />
          ))
        }
      </div>
      {
        data.meta.rowsPerPage < data.meta.rowsObtained && (
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
export default ProfileFollowersList
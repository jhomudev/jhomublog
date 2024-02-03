'use client'
import NotFound from "@/app/client/components/NotFound"
import UserCardFollow from "@/app/client/components/UserCardFollow"
import { getURLWithParams } from "@/app/client/utils"
import { Pagination } from "@nextui-org/pagination"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import useUsers from "../../profile/hooks/useUsers"
import SearchPeopleListSkeleton from "./SearchPeopleListSkeleton"

function SearchPeopleList() {
  const { replace } = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { users, response: { isLoading, data } } = useUsers({ searchParams: searchParams.toString() })

  const hasUsers = users.length > 0

  const handleChangePage = (page: number) => { 
    const url = getURLWithParams({
      pathname, searchParams, newParams: {page},
      paramsDelete: page === 1 ? ['page'] : []
    })
    replace(url)
  }
  
  if (isLoading) return <SearchPeopleListSkeleton />

  if (!hasUsers) return <NotFound title="No users" message='No users found in your search' />

  return (
    <>
      <div className="flex flex-col gap-10">
        {users.map((user) => (
          <UserCardFollow
            key={user.id}
            avatar={user.image || ''}
            name={ user.name || ''}
            email={ user.email }
            description={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate molestiae explicabo corrupti aliquid amet similique nemo! Labore provident natus quidem, dignissimos autem quasi praesentium aliquam debitis, recusandae consequuntur saepe. Labore!'}
          />
          ))
        }
      </div>
      {
        users.length > 10 && (
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
export default SearchPeopleList
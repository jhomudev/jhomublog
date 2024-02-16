import { fetcher } from "@/app/client/lib/swr"
import { ApiReponseWithReturn } from "@/app/client/types"
import { useMemo } from "react"
import useSWR from "swr"
import { formatFollowingResponse } from "../adapters"
import { FollowingResponse, User } from "../types"

type Props = {
  user: User
}

function useFollowing({ user }: Props) {
  const response = useSWR<ApiReponseWithReturn<FollowingResponse[]>>(`${process.env.NEXT_PUBLIC_API_URL}/users/${user.username}/following`, fetcher, {
    keepPreviousData: true
  })

  if (response.error) console.log('Failed to fetch following', response.error)
  
  const { data  } = response
  const following = useMemo(() => data?.data?.map(follow => formatFollowingResponse(follow)) || [], [data])
  
  return {
    response,
    following
  }
}
export default useFollowing
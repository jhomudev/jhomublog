import { fetcher } from "@client/lib/swr"
import { ApiReponseWithReturn } from "@client/types"
import { useMemo } from "react"
import useSWR from "swr"
import { formatFollowerResponse } from "../adapters"
import { FollowerResponse, User } from "../types"

type Props = {
  user: User
}

function useFollowers({ user }: Props) {
  const response = useSWR<ApiReponseWithReturn<FollowerResponse[]>>(`${process.env.NEXT_PUBLIC_API_URL}/users/${user.username}/followers`, fetcher, {
    keepPreviousData: true
  })

  if (response.error) console.log('Failed to fetch followers', response.error)
  
  const { data  } = response
  const followers = useMemo(() => data?.data?.map(follow => formatFollowerResponse(follow)) || [], [data])
  
  return {
    response,
    followers
  }
}
export default useFollowers
import { fetcher } from "@/app/client/lib/swr"
import { ApiReponseWithReturn } from "@/app/client/types"
import { useMemo } from "react"
import useSWR from "swr"
import { formatUserResponse } from "../adapters"
import { UserResponse } from "../types"

type Props = {
  searchParams?: string
}

function useUsers({ searchParams }: Props) {
  const response = useSWR<ApiReponseWithReturn<UserResponse[]>>(`${process.env.NEXT_PUBLIC_API_URL}/users?${searchParams}`, fetcher, {
    keepPreviousData: true
  })

  if (response.error) console.log('Failed to fetch users', response.error)
  
  const { data  } = response
  const users = useMemo(() => data?.data?.map(user => formatUserResponse(user)) || [], [data])
  
  return {
    response,
    users
  }
}
export default useUsers
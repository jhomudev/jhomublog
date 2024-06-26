import { fetcher } from "@/app/client/lib/swr"
import { ApiReponseWithReturn } from "@/app/client/types"
import { useMemo } from "react"
import useSWR from "swr"
import { formatFollowResponse } from "../adapters"
import { FollowResponse } from "../types"
import { env } from "@/app/client/lib/env"

type Props = {
  searchParams: string
}

function useFollows({ searchParams}: Props) {

  const response = useSWR<ApiReponseWithReturn<FollowResponse[]>>(`${env.NEXT_PUBLIC_API_URL}/follows?${searchParams.toString()}`, fetcher, {
    keepPreviousData: true
  })

  if (response.error) console.log('Failed to fetch follows', response.error)
  
  const { data  } = response
  const follows = useMemo(() => data?.data?.map(follow => formatFollowResponse(follow)) || [], [data])
  
  return {
    response,
    follows
  }
}
export default useFollows
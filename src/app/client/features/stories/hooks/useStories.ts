import { useMemo } from "react"
import useSWR from "swr"
import { formatStorieResponse } from "../adapters"
import { fetcher } from "@/app/client/lib/swr"
import { StorieResponse } from "../types"
import { ApiReponseWithReturn } from "@/app/client/types"
import { useSession } from "next-auth/react"
import { env } from "@/app/client/lib/env"

type Props = {
  searchParams?: string
}

function useStories({ searchParams }: Props) {
  const {data: session } = useSession()
  const response = useSWR<ApiReponseWithReturn<StorieResponse[]>>(`${env.NEXT_PUBLIC_API_URL}/stories/${session?.user?.username}?${searchParams}`, fetcher, {
    keepPreviousData: true
  })
  
  if (response.error) console.log('Failed to fetch stories', response.error)
  
  const {data} = response
  const stories = useMemo(() => data?.data?.map(bookmark => formatStorieResponse(bookmark)) || [], [data])
  
  return {
    response,
    stories,
  }
}
export default useStories
import { useMemo } from "react"
import useSWR from "swr"
import { formatStorieResponse } from "../adapters"
import { fetcher } from "@client/lib/swr"
import { StorieResponse } from "../types"
import { ApiReponseWithReturn } from "@client/types"
import { useSession } from "next-auth/react"

type Props = {
  searchParams?: string
}

function useStories({ searchParams }: Props) {
  const {data: session } = useSession()
  const response = useSWR<ApiReponseWithReturn<StorieResponse[]>>(`${process.env.NEXT_PUBLIC_API_URL}/stories/${session?.user?.email}?${searchParams}`, fetcher, {
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